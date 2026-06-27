/**
 * Embed every normalized record locally and upsert into Supabase `documents`.
 * Idempotent (upsert by uid), batched, resumable-by-rerun.
 *
 *   npx tsx src/ingestion/embed-upload.ts
 *
 * Requires the `documents` table to exist (run supabase/schema.sql first).
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { config as loadEnv } from "dotenv";
import { embed } from "../../lib/embeddings.js";
import { serverClient } from "../../lib/supabase.js";
import { createLogger } from "./core/logger.js";
import type { NormalizedRecord } from "./core/types.js";

loadEnv();
const log = createLogger("embed");
const NORM_DIR = path.resolve(process.cwd(), "data", "normalized");
const BATCH = 100;

/** Text we embed: title + summary + body (body dominates semantics). */
function embedText(r: NormalizedRecord): string {
  return [r.title, r.summary ?? "", r.body ?? ""].filter(Boolean).join("\n");
}

async function main() {
  const files = (await fs.readdir(NORM_DIR)).filter((f) => f.endsWith(".json"));
  const all: NormalizedRecord[] = [];
  for (const f of files) {
    const recs = JSON.parse(await fs.readFile(path.join(NORM_DIR, f), "utf8")) as NormalizedRecord[];
    all.push(...recs);
  }
  log.info(`embedding + uploading ${all.length} records from ${files.length} sources`);

  const supabase = serverClient();
  let uploaded = 0;
  let batch: Record<string, unknown>[] = [];

  async function flush() {
    if (batch.length === 0) return;
    const { error } = await supabase.from("documents").upsert(batch, { onConflict: "uid" });
    if (error) throw new Error(`upsert failed: ${error.message}`);
    uploaded += batch.length;
    log.info(`uploaded ${uploaded}/${all.length}`);
    batch = [];
  }

  for (const r of all) {
    const embedding = await embed(embedText(r));
    batch.push({
      uid: r.uid,
      source_id: r.sourceId,
      content_type: r.contentType,
      title: r.title,
      summary: r.summary ?? null,
      body: r.body ?? null,
      url: r.url ?? null,
      date: r.date ?? null,
      fields: r.fields ?? {},
      relations: r.relations ?? {},
      embedding,
    });
    if (batch.length >= BATCH) await flush();
  }
  await flush();
  log.success(`done — ${uploaded} records embedded + uploaded to Supabase`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
