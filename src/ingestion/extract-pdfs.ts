/**
 * PDF text extraction for the document repository.
 *
 * Downloads each document's PDF from assets.adgm.com, extracts its text, and
 * writes it into the raw record's `data.pdfText`. Then re-normalizes documents
 * so the text lands in the searchable `body`. Resumable (skips already-done),
 * checkpointed, and polite. Run AFTER crawling; then run `--resolve` again.
 *
 *   npx tsx src/ingestion/extract-pdfs.ts
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { PDFParse } from "pdf-parse";
import { store } from "./core/store.js";
import { createLogger } from "./core/logger.js";
import { documentsAdapter } from "./adapters/documents.js";
import type { RawRecord } from "./core/types.js";

/** Extract text from a PDF buffer using pdf-parse v2's class API. */
async function extractText(buf: Buffer): Promise<string> {
  const parser = new PDFParse({ data: buf });
  try {
    const result = await parser.getText();
    return result.text || "";
  } finally {
    await parser.destroy().catch(() => {});
  }
}

const MAX_CHARS = 20_000; // plenty for embedding; keeps JSON manageable
const log = createLogger("pdf");

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const raw = await store.loadRaw("documents");
  if (raw.length === 0) {
    log.warn("no documents to extract — crawl documents first");
    return;
  }

  const pdfDir = path.resolve(process.cwd(), "data", "pdfs");
  await fs.mkdir(pdfDir, { recursive: true });

  let done = 0;
  let failed = 0;
  let skipped = 0;

  for (let i = 0; i < raw.length; i++) {
    const rec = raw[i]! as RawRecord;
    const data = rec.data as { pdfUrl?: string; pdfText?: string };
    if (typeof data.pdfText === "string") {
      skipped++;
      continue; // already extracted (resume)
    }
    const url = data.pdfUrl;
    if (!url) {
      data.pdfText = "";
      continue;
    }
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      const text = await extractText(buf);
      data.pdfText = text.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim().slice(0, MAX_CHARS);
      done++;
    } catch (err) {
      data.pdfText = ""; // mark attempted so resume skips it
      failed++;
      log.warn(`failed ${rec.id}: ${(err as Error).message}`);
    }

    if ((done + failed) % 25 === 0) {
      await store.saveRaw("documents", raw);
      log.info(`extracted ${done}, failed ${failed}, skipped ${skipped} (of ${raw.length})`);
    }
    await delay(400);
  }

  // Persist raw + re-normalize so pdfText reaches the searchable body.
  await store.saveRaw("documents", raw);
  const normalized = documentsAdapter.normalize(raw);
  await store.saveNormalized("documents", normalized);
  const withText = normalized.filter((r) => (r.fields as { hasPdfText?: boolean }).hasPdfText).length;
  log.success(`done — extracted ${done}, failed ${failed}, skipped ${skipped}; ${withText} docs now have text`);
  log.info("run `npm run ingest -- --resolve` to refresh relationship links");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
