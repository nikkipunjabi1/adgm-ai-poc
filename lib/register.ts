/**
 * Data layer for the FSRA Public Register explorer (/embed/register).
 *
 * Two modes:
 *  - "classic" — fast in-memory substring filter over the normalized JSON
 *    (mirrors the behaviour of the live register's keyword search).
 *  - "ai" — semantic search via local embeddings + the Supabase `match_documents`
 *    RPC, so a concept ("crypto trading", "real estate fund") surfaces relevant
 *    entities even without an exact keyword match.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { serverClient } from "./supabase";
import { embed } from "./embeddings";

export type RegisterTab = "all" | "firms" | "individuals" | "funds";
export type RegisterType = "firm" | "individual" | "fund";

export interface RegisterItem {
  uid: string;
  type: RegisterType;
  name: string;
  status?: string;
  url?: string;
  ref?: string; // FSP / PRN / fund reference number
  refLabel?: string; // "FSP" | "PRN" | "Ref"
  detail?: string; // legal status / role @ firm / fund manager
  detailLabel?: string;
  score?: number; // present in AI mode
}

export interface RegisterResult {
  items: RegisterItem[];
  total: number;
  mode: "classic" | "ai";
  counts: { firm: number; individual: number; fund: number };
}

type Raw = {
  uid: string;
  source_id?: string;
  sourceId?: string;
  content_type?: string;
  contentType?: string;
  title: string;
  url?: string;
  fields?: Record<string, unknown>;
};

const TAB_TYPES: Record<RegisterTab, RegisterType[]> = {
  all: ["firm", "individual", "fund"],
  firms: ["firm"],
  individuals: ["individual"],
  funds: ["fund"],
};

const TYPE_CONTENT: Record<RegisterType, string> = {
  firm: "firm",
  individual: "person",
  fund: "fund",
};

const FILES: Record<RegisterType, string> = {
  firm: "firms.json",
  individual: "individuals.json",
  fund: "funds.json",
};

// Module-level cache so we read each JSON file from disk only once.
const cache = new Map<RegisterType, Raw[]>();

async function load(type: RegisterType): Promise<Raw[]> {
  const hit = cache.get(type);
  if (hit) return hit;
  try {
    const file = path.join(process.cwd(), "data", "normalized", FILES[type]);
    const parsed = JSON.parse(await readFile(file, "utf8"));
    const arr: Raw[] = Array.isArray(parsed)
      ? parsed
      : (Object.values(parsed).find((v) => Array.isArray(v)) as Raw[]) ?? [];
    cache.set(type, arr);
    return arr;
  } catch {
    cache.set(type, []);
    return [];
  }
}

function s(fields: Record<string, unknown> | undefined, key: string): string | undefined {
  const v = fields?.[key];
  return v == null || v === "" ? undefined : String(v);
}

/** Shape a raw normalized record into a uniform register row. */
function toItem(r: Raw, type: RegisterType): RegisterItem {
  const f = r.fields ?? {};
  const base: RegisterItem = { uid: r.uid, type, name: r.title, url: r.url, status: s(f, "status") };
  if (type === "firm") {
    base.ref = s(f, "fspNumber");
    base.refLabel = "FSP";
    base.detail = s(f, "legalStatus");
    base.detailLabel = "Legal status";
  } else if (type === "individual") {
    base.ref = s(f, "prn");
    base.refLabel = "PRN";
    const firms = (f.firmNames as string[] | undefined)?.filter(Boolean) ?? [];
    base.detail = s(f, "type")
      ? `${s(f, "type")}${firms.length ? ` · ${firms[0]}` : ""}`
      : firms[0];
    base.detailLabel = "Role";
  } else {
    base.ref = s(f, "refNumber");
    base.refLabel = "Ref";
    base.detail = s(f, "fundType") ?? s(f, "fundManager");
    base.detailLabel = s(f, "fundType") ? "Type" : "Manager";
  }
  return base;
}

/** Classic in-memory keyword filter (instant, no DB round-trip). */
async function classic(tab: RegisterTab, query: string): Promise<RegisterItem[]> {
  const q = query.trim().toLowerCase();
  const types = TAB_TYPES[tab];
  const lists = await Promise.all(types.map((t) => load(t).then((rows) => ({ t, rows }))));
  const out: RegisterItem[] = [];
  for (const { t, rows } of lists) {
    for (const r of rows) {
      if (!q || matches(r, q)) out.push(toItem(r, t));
    }
  }
  // Stable alphabetical order when not relevance-ranked.
  out.sort((a, b) => a.name.localeCompare(b.name));
  return out;
}

function matches(r: Raw, q: string): boolean {
  if (r.title.toLowerCase().includes(q)) return true;
  const f = r.fields ?? {};
  for (const key of ["fspNumber", "prn", "refNumber", "fundManager"]) {
    const v = f[key];
    if (v && String(v).toLowerCase().includes(q)) return true;
  }
  return false;
}

/** Semantic search via embeddings + Supabase match_documents. */
async function ai(tab: RegisterTab, query: string): Promise<RegisterItem[]> {
  const types = TAB_TYPES[tab];
  const contentTypes = types.map((t) => TYPE_CONTENT[t]);
  const supabase = serverClient();
  const queryEmbedding = await embed(query);
  const { data, error } = await supabase.rpc("match_documents", {
    query_embedding: queryEmbedding,
    query_text: query,
    match_count: 60,
    filter_types: contentTypes,
  });
  if (error) throw new Error(`match_documents failed: ${error.message}`);

  const rows = (data ?? []) as (Raw & { source_id: string; content_type: string; score: number })[];
  const out: RegisterItem[] = [];
  for (const row of rows) {
    // The register only lists FSRA firms / individuals / funds — exclude
    // panelists and any other person/firm sources that share a content_type.
    const type = SRC_TYPE[row.source_id];
    if (!type || !types.includes(type)) continue;
    const item = toItem(row, type);
    item.score = row.score;
    out.push(item);
  }
  return out;
}

const SRC_TYPE: Record<string, RegisterType> = {
  firms: "firm",
  individuals: "individual",
  funds: "fund",
};

export async function searchRegister(opts: {
  tab?: RegisterTab;
  query?: string;
  mode?: "classic" | "ai";
  page?: number;
  pageSize?: number;
}): Promise<RegisterResult> {
  const tab = opts.tab ?? "all";
  const query = (opts.query ?? "").trim();
  const mode = opts.mode === "ai" && query ? "ai" : "classic";
  const page = Math.max(0, opts.page ?? 0);
  const pageSize = Math.min(48, Math.max(1, opts.pageSize ?? 12));

  const all = mode === "ai" ? await ai(tab, query) : await classic(tab, query);

  const counts = { firm: 0, individual: 0, fund: 0 };
  for (const it of all) counts[it.type]++;

  const start = page * pageSize;
  return {
    items: all.slice(start, start + pageSize),
    total: all.length,
    mode,
    counts,
  };
}
