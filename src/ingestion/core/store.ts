/**
 * JSON-file data store.
 *
 * Layout:
 *   data/raw/<sourceId>.json          verbatim scraped records
 *   data/normalized/<sourceId>.json   normalized records (search-ready)
 *   data/manifest.json                per-source run metadata
 *
 * Records are keyed by stable id, so re-running an adapter UPSERTS (replaces by
 * id) rather than appending duplicates. Raw and normalized are kept separate so
 * a parser change can re-normalize without re-crawling.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import type { NormalizedRecord, RawRecord, SourceId } from "./types.js";

const DATA_DIR = path.resolve(process.cwd(), "data");
const RAW_DIR = path.join(DATA_DIR, "raw");
const NORM_DIR = path.join(DATA_DIR, "normalized");
const MANIFEST = path.join(DATA_DIR, "manifest.json");

async function ensureDirs(): Promise<void> {
  await fs.mkdir(RAW_DIR, { recursive: true });
  await fs.mkdir(NORM_DIR, { recursive: true });
}

async function readJsonArray<T>(file: string): Promise<T[]> {
  try {
    const txt = await fs.readFile(file, "utf8");
    return JSON.parse(txt) as T[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function writeJson(file: string, data: unknown): Promise<void> {
  await fs.writeFile(file, JSON.stringify(data, null, 2) + "\n", "utf8");
}

/** Merge incoming records into existing by `key`, incoming wins. */
function upsertBy<T>(existing: T[], incoming: T[], key: (r: T) => string): T[] {
  const map = new Map<string, T>();
  for (const r of existing) map.set(key(r), r);
  for (const r of incoming) map.set(key(r), r);
  return [...map.values()];
}

export interface ManifestEntry {
  sourceId: SourceId;
  lastRunAt: string;
  rawCount: number;
  normalizedCount: number;
  /** Records produced by the most recent run (for incremental visibility). */
  lastRunCount: number;
  durationMs: number;
  ok: boolean;
  error?: string;
}

export const store = {
  rawPath: (sourceId: SourceId) => path.join(RAW_DIR, `${sourceId}.json`),
  normalizedPath: (sourceId: SourceId) => path.join(NORM_DIR, `${sourceId}.json`),

  /** Upsert raw records for a source, returns the new total count. */
  async saveRaw(sourceId: SourceId, records: RawRecord[]): Promise<number> {
    await ensureDirs();
    const file = store.rawPath(sourceId);
    const existing = await readJsonArray<RawRecord>(file);
    const merged = upsertBy(existing, records, (r) => r.id);
    await writeJson(file, merged);
    return merged.length;
  },

  /** Upsert normalized records for a source, returns the new total count. */
  async saveNormalized(sourceId: SourceId, records: NormalizedRecord[]): Promise<number> {
    await ensureDirs();
    const file = store.normalizedPath(sourceId);
    const existing = await readJsonArray<NormalizedRecord>(file);
    const merged = upsertBy(existing, records, (r) => r.uid);
    await writeJson(file, merged);
    return merged.length;
  },

  async loadRaw(sourceId: SourceId): Promise<RawRecord[]> {
    return readJsonArray<RawRecord>(store.rawPath(sourceId));
  },

  async updateManifest(entry: ManifestEntry): Promise<void> {
    await ensureDirs();
    const all = await readJsonArray<ManifestEntry>(MANIFEST).catch(() => []);
    const map = new Map(all.map((e) => [e.sourceId, e] as const));
    map.set(entry.sourceId, entry);
    await writeJson(MANIFEST, [...map.values()]);
  },
};
