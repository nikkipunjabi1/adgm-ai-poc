/**
 * Server-side access to the crawled, normalized dataset (data/normalized/*.json).
 * Used by server components until the Supabase-backed search is wired in.
 */
import { promises as fs } from "node:fs";
import path from "node:path";

export interface Record {
  uid: string;
  sourceId: string;
  contentType: string;
  sourceNativeId: string;
  url: string;
  title: string;
  summary?: string;
  body: string;
  date?: string;
  fields: Record_Fields;
  relations?: { parentUid?: string; relatedUids?: string[] };
}
type Record_Fields = { [k: string]: unknown };

const DIR = path.join(process.cwd(), "data", "normalized");

export async function loadSource(id: string): Promise<Record[]> {
  try {
    const txt = await fs.readFile(path.join(DIR, `${id}.json`), "utf8");
    return JSON.parse(txt) as Record[];
  } catch {
    return [];
  }
}

/** Latest news, newest first (best-effort date parse). */
export async function latestNews(n: number): Promise<Record[]> {
  const news = await loadSource("news");
  return news
    .filter((r) => r.title)
    .sort((a, b) => parseDate(b.date) - parseDate(a.date))
    .slice(0, n);
}

export async function upcomingEvents(n: number): Promise<Record[]> {
  return (await loadSource("events")).slice(0, n);
}

function parseDate(d?: string): number {
  if (!d) return 0;
  const t = Date.parse(d);
  return Number.isNaN(t) ? 0 : t;
}
