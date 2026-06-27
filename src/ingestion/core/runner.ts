/**
 * Adapter runner — the one place that knows about browser lifecycle, the store,
 * timing, and the manifest. Adapters stay focused on their own pages.
 */
import { launchBrowser, newContext } from "./browser.js";
import { createLogger } from "./logger.js";
import { store } from "./store.js";
import type { RawRecord } from "./types.js";
import type { SourceAdapter } from "../adapters/base.js";

export interface RunOptions {
  /** Cap records (0 = no limit). */
  limit?: number;
  /** Re-normalize from stored raw data without crawling. */
  normalizeOnly?: boolean;
  /** Re-crawl everything, ignoring already-stored records. */
  force?: boolean;
}

export async function runAdapter(adapter: SourceAdapter, opts: RunOptions = {}): Promise<void> {
  const log = createLogger(adapter.sourceId);
  const limit = opts.limit ?? 0;
  const startedAt = Date.now();

  // Re-normalize path: skip the browser entirely.
  if (opts.normalizeOnly) {
    log.info("normalize-only: re-normalizing stored raw data");
    const raw = await store.loadRaw(adapter.sourceId);
    const normalized = adapter.normalize(raw);
    const total = await store.saveNormalized(adapter.sourceId, normalized);
    log.success(`normalized ${normalized.length} records (store total: ${total})`);
    return;
  }

  log.info(`starting crawl${limit ? ` (limit ${limit})` : ""} — ${adapter.label}`);
  const browser = await launchBrowser();
  try {
    const context = await newContext(browser);

    // Incremental persistence: adapters call this to save progress mid-crawl.
    const checkpoint = async (records: RawRecord[]): Promise<void> => {
      await store.saveRaw(adapter.sourceId, records);
      await store.saveNormalized(adapter.sourceId, adapter.normalize(records));
    };

    // Resume support: hand the adapter what's already stored.
    const force = opts.force ?? false;
    const existingRaw = new Map<string, RawRecord>();
    if (!force) {
      for (const r of await store.loadRaw(adapter.sourceId)) existingRaw.set(r.id, r);
      if (existingRaw.size > 0) log.info(`resume: ${existingRaw.size} records already stored`);
    }

    const raw = await adapter.crawl({ context, log, limit, checkpoint, existingRaw, force });
    log.info(`crawled ${raw.length} raw records`);

    const rawTotal = await store.saveRaw(adapter.sourceId, raw);
    const normalized = adapter.normalize(raw);
    const normTotal = await store.saveNormalized(adapter.sourceId, normalized);

    const durationMs = Date.now() - startedAt;
    await store.updateManifest({
      sourceId: adapter.sourceId,
      lastRunAt: new Date().toISOString(),
      rawCount: rawTotal,
      normalizedCount: normTotal,
      lastRunCount: raw.length,
      durationMs,
      ok: true,
    });
    log.success(
      `done in ${(durationMs / 1000).toFixed(1)}s — raw total ${rawTotal}, normalized total ${normTotal}`,
    );
  } catch (err) {
    const durationMs = Date.now() - startedAt;
    const message = err instanceof Error ? err.message : String(err);
    await store
      .updateManifest({
        sourceId: adapter.sourceId,
        lastRunAt: new Date().toISOString(),
        rawCount: 0,
        normalizedCount: 0,
        lastRunCount: 0,
        durationMs,
        ok: false,
        error: message,
      })
      .catch(() => {});
    log.error(`crawl failed: ${message}`);
    throw err;
  } finally {
    await browser.close();
  }
}
