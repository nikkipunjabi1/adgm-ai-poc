/**
 * Retrieval layer: hybrid (vector + keyword) search via the Supabase
 * `match_documents` RPC, plus relationship expansion so a firm/case result
 * carries its connected records (people, funds, notices, court, documents).
 */
import { serverClient } from "./supabase";
import { embed } from "./embeddings";

export interface SearchRecord {
  uid: string;
  source_id: string;
  content_type: string;
  title: string;
  summary: string | null;
  url: string | null;
  date: string | null;
  fields: Record<string, unknown>;
  relations: { parentUid?: string; relatedUids?: string[] } | null;
  score?: number;
}

export interface RetrievalResult {
  /** Top-ranked primary matches. */
  primary: SearchRecord[];
  /** Related records pulled in via the graph, keyed by uid. */
  related: Record<string, SearchRecord>;
}

/** Queries asking for the "latest"/"recent" should be ordered by date, not just
 * semantic relevance. */
const RECENCY_RE =
  /\b(latest|most recent|recent(ly)?|newest|upcoming|up[- ]?to[- ]?date|this (year|month|week|quarter)|current)\b/i;

/** Best available date (ms) for a record. Falls back to date-bearing fields so
 * hearings (date in fields.when) and others still sort by recency. */
function recordDateMs(
  date: string | null | undefined,
  fields: Record<string, unknown> | null | undefined,
): number {
  const candidates = [
    date,
    fields?.when,
    fields?.dateCommenced,
    fields?.publicationDate,
    fields?.publishedDate,
    fields?.decisionDate,
    fields?.dateText,
  ].filter(Boolean) as string[];
  for (const c of candidates) {
    const m = String(c).match(/\b\d{1,2} [A-Za-z]{3,} \d{4}\b/);
    const t = Date.parse(m ? m[0] : String(c));
    if (!Number.isNaN(t)) return t;
  }
  return NaN;
}

function parseWhen(r: SearchRecord): number {
  const t = recordDateMs(r.date, r.fields);
  return Number.isNaN(t) ? -Infinity : t;
}

// Words that only signal recency, a record type, or are filler — stripped to
// decide whether a recency query is "generic" (just newest-of-type) or topical.
const NON_TOPIC_WORDS = new Set(
  (
    "adgm the a an of for in on at to from about by with and or what whats new news " +
    "latest most recent recently newest upcoming current update updates press release releases " +
    "announcement announcements give me show all any list tell us is are " +
    "notice notices event events conference forum summit case cases court courts litigation " +
    "dispute ruling rulings judgment judgments judgement judgements hearing hearings " +
    "firm firms company companies licence license licensed fund funds individual individuals " +
    "person people panelist panelists document documents pdf report reports this year month week quarter"
  ).split(/\s+/),
);

/** A record-type filter: by content_type, or by source_id for court subtypes
 * (cases / hearings / judgments all share content_type "court"). */
type TypeFilter = { types?: string[]; sources?: string[] };

/** Detect which record type a query is explicitly asking for (null if none). */
function detectType(query: string): TypeFilter | null {
  const q = query.toLowerCase();
  if (/\bnotice/.test(q)) return { types: ["notice"] };
  if (/\b(event|conference|forum|summit)/.test(q)) return { types: ["event"] };
  if (/\b(judgment|judgement|ruling)/.test(q)) return { sources: ["judgments"] };
  if (/\bhearing/.test(q)) return { sources: ["hearings"] };
  if (/\b(case|court|litigation|dispute)/.test(q)) return { sources: ["cases"] };
  if (/\bfund/.test(q)) return { types: ["fund"] };
  if (/\b(firm|compan|licen)/.test(q)) return { types: ["firm"] };
  if (/\b(individual|person|people|panelist)/.test(q)) return { types: ["person"] };
  if (/\b(document|pdf|report)/.test(q)) return { types: ["document"] };
  if (/\b(news|announce|press|release|update)/.test(q)) return { types: ["news"] };
  return null;
}

/** Non-filler topical tokens remaining after removing recency/type words. */
function topicalTokens(query: string): string[] {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !NON_TOPIC_WORDS.has(w));
}

/**
 * Fetch the newest records of the given type(s) ordered strictly by date. Used
 * for generic "latest X" queries, where similarity ranking would otherwise bury
 * the most recent items. Dates are stored as "DD Mon YYYY" text, so we pull a
 * lightweight (uid, date) index, sort in JS, then hydrate the top N.
 */
async function recentByDate(
  supabase: ReturnType<typeof serverClient>,
  filter: TypeFilter,
  n: number,
): Promise<SearchRecord[]> {
  const PAGE = 1000;
  type Row = { uid: string; date: string | null; fields: Record<string, unknown> | null };
  const index: Row[] = [];
  for (let page = 0; page < 8; page++) {
    let q = supabase
      .from("documents")
      .select("uid,date,fields")
      .range(page * PAGE, page * PAGE + PAGE - 1);
    if (filter.sources) q = q.in("source_id", filter.sources);
    else if (filter.types) q = q.in("content_type", filter.types);
    const { data, error } = await q;
    if (error || !data || data.length === 0) break;
    index.push(...(data as Row[]));
    if (data.length < PAGE) break;
  }
  const newestUids = index
    .map((r) => ({ uid: r.uid, t: recordDateMs(r.date, r.fields) }))
    .filter((x) => !Number.isNaN(x.t))
    .sort((a, b) => b.t - a.t)
    .slice(0, n)
    .map((x) => x.uid);
  if (newestUids.length === 0) return [];

  const { data: rows } = await supabase.rpc("get_documents", { uids: newestUids });
  const byUid: Record<string, SearchRecord> = {};
  for (const r of (rows ?? []) as SearchRecord[]) byUid[r.uid] = r;
  return newestUids.map((u) => byUid[u]).filter((r): r is SearchRecord => Boolean(r));
}

/** Run hybrid retrieval and expand one hop of relationships. */
export async function retrieve(
  query: string,
  opts: { count?: number; filterTypes?: string[] } = {},
): Promise<RetrievalResult> {
  const supabase = serverClient();
  const baseCount = opts.count ?? 14;
  const wantsRecent = RECENCY_RE.test(query);
  const typeFilter = detectType(query);
  // A "listing" query is one with no extra topical terms — just a type and/or a
  // recency word (e.g. "latest judgments", "public notices", "recent court cases").
  const isListing = topicalTokens(query).length === 0 && (wantsRecent || typeFilter !== null);

  let primary: SearchRecord[] = [];

  // Listing query → order strictly by date (similarity can't surface newest, and
  // sparse subtypes like judgments/hearings get buried in relevance ranking).
  if (isListing) {
    const filter: TypeFilter = opts.filterTypes
      ? { types: opts.filterTypes }
      : (typeFilter ?? { types: ["news"] });
    primary = await recentByDate(supabase, filter, baseCount);
  }

  // Topical query (or recency fallback) → hybrid relevance, date-re-ranked when
  // recency was asked for so the newest on-topic records lead.
  if (primary.length === 0) {
    const queryEmbedding = await embed(query);
    const matchCount = wantsRecent ? Math.min(Math.max(baseCount * 4, 48), 80) : baseCount;
    const { data, error } = await supabase.rpc("match_documents", {
      query_embedding: queryEmbedding,
      query_text: query,
      match_count: matchCount,
      filter_types: opts.filterTypes ?? null,
    });
    if (error) throw new Error(`match_documents failed: ${error.message}`);
    primary = (data ?? []) as SearchRecord[];
    if (wantsRecent) {
      primary = [...primary].sort((a, b) => parseWhen(b) - parseWhen(a)).slice(0, baseCount);
    }
  }

  // Expand: collect related uids from the primary hits, fetch them in one call.
  const relatedUids = new Set<string>();
  for (const r of primary) {
    const rel = r.relations;
    if (rel?.parentUid) relatedUids.add(rel.parentUid);
    for (const u of rel?.relatedUids ?? []) relatedUids.add(u);
  }
  for (const r of primary) relatedUids.delete(r.uid); // don't refetch primaries

  const related: Record<string, SearchRecord> = {};
  if (relatedUids.size > 0) {
    const { data: relData, error: relErr } = await supabase.rpc("get_documents", {
      uids: [...relatedUids].slice(0, 60),
    });
    if (!relErr && relData) {
      for (const r of relData as SearchRecord[]) related[r.uid] = r;
    }
  }

  return { primary, related };
}

/** Compact representation passed to the LLM (keeps the prompt small). */
export function toContext(r: SearchRecord): Record<string, unknown> {
  return {
    uid: r.uid,
    type: r.content_type,
    source: r.source_id,
    title: r.title,
    summary: r.summary,
    date: r.date,
    // a few high-signal fields only
    status: r.fields?.status,
    fundManager: r.fields?.fundManager,
    company: r.fields?.company,
    caseNumber: r.fields?.caseNumber,
    relatedUids: r.relations?.relatedUids?.slice(0, 12),
    parentUid: r.relations?.parentUid,
  };
}
