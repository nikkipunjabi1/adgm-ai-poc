/**
 * Crawl status report — reads the manifest + normalized files and prints a
 * per-source summary (records, last run, duration, ok/failed). Read-only.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { allSourceIds } from "../adapters/index.js";
import type { ManifestEntry } from "./store.js";

const DATA_DIR = path.resolve(process.cwd(), "data");

async function countNormalized(sourceId: string): Promise<number> {
  try {
    const txt = await fs.readFile(path.join(DATA_DIR, "normalized", `${sourceId}.json`), "utf8");
    return (JSON.parse(txt) as unknown[]).length;
  } catch {
    return 0;
  }
}

export async function printStatus(): Promise<void> {
  let manifest: ManifestEntry[] = [];
  try {
    manifest = JSON.parse(await fs.readFile(path.join(DATA_DIR, "manifest.json"), "utf8"));
  } catch {
    /* no manifest yet */
  }
  const byId = new Map(manifest.map((m) => [m.sourceId, m] as const));

  console.log("\nADGM ingestion status");
  console.log("─".repeat(78));
  console.log(
    `${"source".padEnd(13)}${"records".padStart(8)}  ${"last run".padEnd(20)}${"dur".padStart(7)}  status`,
  );
  console.log("─".repeat(78));

  let total = 0;
  for (const id of allSourceIds()) {
    const count = await countNormalized(id);
    total += count;
    const m = byId.get(id);
    const last = m ? m.lastRunAt.replace("T", " ").slice(0, 19) : "—";
    const dur = m ? `${(m.durationMs / 1000).toFixed(0)}s` : "—";
    const status = m ? (m.ok ? "✓ ok" : `✗ ${m.error ?? "failed"}`) : "not run";
    console.log(
      `${id.padEnd(13)}${String(count).padStart(8)}  ${last.padEnd(20)}${dur.padStart(7)}  ${status}`,
    );
  }
  console.log("─".repeat(78));
  console.log(`${"TOTAL".padEnd(13)}${String(total).padStart(8)} records across ${allSourceIds().length} sources`);
}
