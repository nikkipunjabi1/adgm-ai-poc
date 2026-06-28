/**
 * Auto-updating "suggested questions" for the search UI.
 *
 * Every top-level user query is logged to Supabase (`search_queries`). The
 * suggestions are then derived from the most-asked queries over a trailing
 * window (default 7 days):
 *   - AI on  → Claude dedupes + polishes the trending queries into clean,
 *              compelling suggestion phrases ("AI adds new suggestions").
 *   - AI off → the raw trending queries are used as-is.
 *   - no history yet (fresh DB) → a curated fallback set.
 *
 * Results are cached in-process with a short TTL so a normal page load is
 * instant; a manual `refresh` (the demo "Regenerate" button) bypasses the cache
 * and re-derives from the latest log.
 */
import Anthropic from "@anthropic-ai/sdk";
import { serverClient } from "./supabase";
import { aiReady } from "./ai";

export interface SuggestionResult {
  suggestions: string[];
  /** Where they came from — drives the UI label. */
  source: "trending" | "trending-ai" | "curated";
  /** ISO timestamp of when this set was derived. */
  generatedAt: string;
}

/** Shown before any query history exists (and as padding when it's thin). */
const CURATED: string[] = [
  "Fintech firms licensed in ADGM",
  "Court judgments involving NMC Healthcare",
  "What do I need to set up a fund manager?",
  "Public notices for deregistered companies",
  "Upcoming events at ADGM",
];

const COUNT = 5;
const WINDOW_DAYS = 7;
const TTL_MS = 10 * 60 * 1000; // 10 min

let cache: { at: number; data: SuggestionResult } | null = null;

/**
 * Clear the entire query log and the cached suggestions, returning suggestions
 * to the curated baseline. Powers the demo "Reset" control. Best-effort.
 */
export async function resetSearchQueries(): Promise<void> {
  try {
    // Supabase requires a filter on delete; id is a positive identity column.
    await serverClient().from("search_queries").delete().gte("id", 0);
  } catch {
    /* table may not exist — nothing to reset */
  }
  cache = null;
}

/** Fire-and-forget: record a top-level user query. Never throws. */
export async function logSearchQuery(query: string): Promise<void> {
  const q = query.trim();
  if (!q) return;
  try {
    await serverClient().from("search_queries").insert({ query: q.slice(0, 300) });
  } catch {
    /* table may not exist yet / offline — logging is best-effort */
  }
}

interface TrendingRow {
  query: string;
  hits: number;
}

async function fetchTrending(): Promise<TrendingRow[]> {
  try {
    const { data, error } = await serverClient().rpc("top_search_queries", {
      since_days: WINDOW_DAYS,
      max_rows: 25,
    });
    if (error) return [];
    return (data ?? []) as TrendingRow[];
  } catch {
    return [];
  }
}

/** Pad a list up to COUNT with curated items not already present. */
function pad(list: string[]): string[] {
  const seen = new Set(list.map((s) => s.toLowerCase().trim()));
  const out = [...list];
  for (const c of CURATED) {
    if (out.length >= COUNT) break;
    if (!seen.has(c.toLowerCase().trim())) out.push(c);
  }
  return out.slice(0, COUNT);
}

const POLISH_SCHEMA = {
  type: "object",
  properties: {
    suggestions: {
      type: "array",
      description: `Exactly ${COUNT} polished suggestion questions.`,
      items: { type: "string" },
    },
  },
  required: ["suggestions"],
} as const;

/** Use Claude to turn raw trending queries into clean suggestion phrases. */
async function polishWithAi(rows: TrendingRow[]): Promise<string[] | null> {
  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
    const model = process.env.CLAUDE_STEPS_MODEL ?? "claude-haiku-4-5-20251001";
    const list = rows.map((r) => `- "${r.query}" (asked ${r.hits}×)`).join("\n");
    const resp = await client.messages.create({
      model,
      max_tokens: 400,
      system:
        "You curate the 'suggested questions' shown on an ADGM (Abu Dhabi Global Market) search homepage. " +
        `Given the most-asked user queries this week, produce exactly ${COUNT} suggestions that reflect what people are searching for. ` +
        "Merge near-duplicates, fix casing/spelling/grammar, and make each a clean, compelling, standalone question or search phrase (≤70 chars). " +
        "Prefer the genuinely popular themes; keep them specific and ADGM-relevant. Do not invent unrelated topics. Return via the suggestions tool.",
      tools: [
        {
          name: "suggestions",
          description: "Return the curated suggestion phrases.",
          input_schema: POLISH_SCHEMA as unknown as Anthropic.Tool.InputSchema,
        },
      ],
      tool_choice: { type: "tool", name: "suggestions" },
      messages: [{ role: "user", content: `Most-asked queries this week:\n${list}` }],
    });
    const block = resp.content.find((b) => b.type === "tool_use");
    if (block && block.type === "tool_use") {
      const out = (block.input as { suggestions?: string[] }).suggestions;
      if (Array.isArray(out)) {
        const cleaned = out.map((s) => String(s).trim()).filter(Boolean);
        if (cleaned.length) return cleaned.slice(0, COUNT);
      }
    }
  } catch {
    /* fall through to raw trending */
  }
  return null;
}

/**
 * Derive the current suggestions. `refresh` bypasses the in-process cache so the
 * demo "Regenerate" button always reflects the very latest queries.
 */
export async function getSuggestions(opts?: { refresh?: boolean }): Promise<SuggestionResult> {
  const now = Date.now();
  if (!opts?.refresh && cache && now - cache.at < TTL_MS) return cache.data;

  const rows = await fetchTrending();
  let data: SuggestionResult;

  if (rows.length === 0) {
    data = { suggestions: CURATED.slice(0, COUNT), source: "curated", generatedAt: new Date().toISOString() };
  } else {
    const ai = await aiReady();
    const polished = ai.ok ? await polishWithAi(rows) : null;
    if (polished) {
      data = { suggestions: pad(polished), source: "trending-ai", generatedAt: new Date().toISOString() };
    } else {
      data = { suggestions: pad(rows.map((r) => r.query)), source: "trending", generatedAt: new Date().toISOString() };
    }
  }

  cache = { at: now, data };
  return data;
}
