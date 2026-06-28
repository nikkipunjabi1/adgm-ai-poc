/**
 * Data layer for the ADGM Courts explorer (/embed/courts) — cases, hearings and
 * judgments. Mirrors lib/register.ts: a fast in-memory "classic" keyword filter
 * over the normalized JSON, plus an "ai" semantic mode (embeddings +
 * `match_documents`). All three share content_type "court" and are told apart by
 * source_id (cases / hearings / judgments).
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { serverClient } from "./supabase";
import { embed } from "./embeddings";
import { aiConfigured, aiReady } from "./ai";

export type CourtTab = "cases" | "hearings" | "judgments";
export type CourtType = "case" | "hearing" | "judgment";

export interface CourtItem {
  uid: string;
  type: CourtType;
  title: string;
  caseNumber?: string;
  parties?: string;
  when?: string; // hearings
  judge?: string; // hearings
  citation?: string; // judgments
  date?: string;
  deepLink: string;
  score?: number;
}

export interface CourtResult {
  items: CourtItem[];
  total: number;
  mode: "classic" | "ai";
  /** Whether the AI toggle should be offered at all (env switch + key present). */
  aiAvailable: boolean;
  /** Set when AI was requested but unavailable; results fell back to classic. */
  aiError?: string;
}

type Raw = {
  uid: string;
  source_id?: string;
  sourceId?: string;
  title: string;
  date?: string | null;
  url?: string;
  fields?: Record<string, unknown>;
};

const TAB_TYPE: Record<CourtTab, CourtType> = {
  cases: "case",
  hearings: "hearing",
  judgments: "judgment",
};
const SRC_TYPE: Record<string, CourtType> = { cases: "case", hearings: "hearing", judgments: "judgment" };
const FILES: Record<CourtTab, string> = {
  cases: "cases.json",
  hearings: "hearings.json",
  judgments: "judgments.json",
};

const cache = new Map<CourtTab, Raw[]>();

async function load(tab: CourtTab): Promise<Raw[]> {
  const hit = cache.get(tab);
  if (hit) return hit;
  try {
    const file = path.join(process.cwd(), "data", "normalized", FILES[tab]);
    const parsed = JSON.parse(await readFile(file, "utf8"));
    const arr: Raw[] = Array.isArray(parsed)
      ? parsed
      : (Object.values(parsed).find((v) => Array.isArray(v)) as Raw[]) ?? [];
    cache.set(tab, arr);
    return arr;
  } catch {
    cache.set(tab, []);
    return [];
  }
}

function s(fields: Record<string, unknown> | undefined, key: string): string | undefined {
  const v = fields?.[key];
  return v == null || v === "" ? undefined : String(v);
}

/** Deep link to the live ADGM court listing, filtered to this case via ?q=.
 *  Hearings need the full param set or the page won't filter (see CLAUDE.md). */
function deepLink(type: CourtType, caseNumber: string | undefined, fallback: string | undefined): string {
  if (!caseNumber) return fallback ?? "#";
  const q = encodeURIComponent(caseNumber);
  if (type === "judgment") return `https://www.adgm.com/adgm-courts/judgments?q=${q}`;
  if (type === "hearing")
    return `https://www.adgm.com/adgm-courts/hearings?categoryfilter=Upcoming+hearings&psize=10&q=${q}&sortby=date%23asc`;
  return `https://www.adgm.com/adgm-courts/cases?q=${q}`;
}

function toItem(r: Raw, type: CourtType): CourtItem {
  const f = r.fields ?? {};
  const caseNumber = s(f, "caseNumber");
  return {
    uid: r.uid,
    type,
    title: r.title,
    caseNumber,
    parties: s(f, "parties"),
    when: s(f, "when") ?? (type === "hearing" ? r.date ?? undefined : undefined),
    judge: s(f, "judge"),
    citation: s(f, "citation"),
    date: r.date ?? s(f, "dateCommenced"),
    deepLink: deepLink(type, caseNumber, r.url),
  };
}

function matches(r: Raw, q: string): boolean {
  if (r.title.toLowerCase().includes(q)) return true;
  const f = r.fields ?? {};
  for (const key of ["caseNumber", "parties", "caseName", "citation", "judge", "eventType"]) {
    const v = f[key];
    if (v && String(v).toLowerCase().includes(q)) return true;
  }
  return false;
}

async function classic(tab: CourtTab, query: string): Promise<CourtItem[]> {
  const q = query.trim().toLowerCase();
  const type = TAB_TYPE[tab];
  const rows = await load(tab);
  const out: CourtItem[] = [];
  for (const r of rows) if (!q || matches(r, q)) out.push(toItem(r, type));
  // newest first by date
  out.sort((a, b) => Date.parse(b.date ?? "") - Date.parse(a.date ?? "") || a.title.localeCompare(b.title));
  return out;
}

async function ai(tab: CourtTab, query: string): Promise<CourtItem[]> {
  const supabase = serverClient();
  const queryEmbedding = await embed(query);
  // match_documents only filters by content_type ("court"), so over-fetch and
  // post-filter to this tab's subtype — otherwise the 2,000+ cases crowd the
  // smaller hearings/judgments out of the result window.
  const { data, error } = await supabase.rpc("match_documents", {
    query_embedding: queryEmbedding,
    query_text: query,
    match_count: 400,
    filter_types: ["court"],
  });
  if (error) throw new Error(`match_documents failed: ${error.message}`);
  const rows = (data ?? []) as (Raw & { source_id: string; score: number })[];
  const out: CourtItem[] = [];
  for (const row of rows) {
    if (row.source_id !== tab) continue; // only this tab's court subtype
    const item = toItem(row, TAB_TYPE[tab]);
    item.score = row.score;
    out.push(item);
  }
  return out;
}

export async function searchCourts(opts: {
  tab?: CourtTab;
  query?: string;
  mode?: "classic" | "ai";
  page?: number;
  pageSize?: number;
}): Promise<CourtResult> {
  const tab = opts.tab ?? "cases";
  const query = (opts.query ?? "").trim();
  const page = Math.max(0, opts.page ?? 0);
  const pageSize = Math.min(48, Math.max(1, opts.pageSize ?? 12));
  const aiAvailable = aiConfigured();

  let mode: "classic" | "ai" = opts.mode === "ai" && query ? "ai" : "classic";
  let aiError: string | undefined;
  if (mode === "ai") {
    const status = await aiReady();
    if (!status.ok) {
      mode = "classic";
      aiError = status.message;
    }
  }

  const all = mode === "ai" ? await ai(tab, query) : await classic(tab, query);
  const start = page * pageSize;
  return { items: all.slice(start, start + pageSize), total: all.length, mode, aiAvailable, aiError };
}
