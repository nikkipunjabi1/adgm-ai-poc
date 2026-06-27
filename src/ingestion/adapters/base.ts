/**
 * Source adapter contract.
 *
 * Each ADGM source (firms, cases, news, …) implements one `SourceAdapter`.
 * The runner handles browser lifecycle, the store, the manifest, and politeness
 * — an adapter only has to know how to crawl ITS pages and how to normalize ITS
 * records. This keeps every source small, testable, and replaceable.
 */
import type { BrowserContext } from "playwright";
import type { Logger } from "../core/logger.js";
import type { NormalizedRecord, RawRecord, SourceId } from "../core/types.js";

export interface CrawlContext {
  context: BrowserContext;
  log: Logger;
  /** Stop after N records (useful for quick dev runs). 0 = no limit. */
  limit: number;
  /**
   * Persist progress mid-crawl. Adapters should call this after the list phase
   * and periodically during enrichment so a long run never loses work and the
   * on-disk files grow live. Upserts by id — safe to call repeatedly. The final
   * save is still handled by the runner.
   */
  checkpoint: (records: RawRecord[]) => Promise<void>;
  /**
   * Raw records already on disk for this source (by id), loaded before the
   * crawl. Adapters use this to RESUME — skip re-fetching detail pages for
   * records already fully enriched. Empty on a first run.
   */
  existingRaw: Map<string, RawRecord>;
  /** When true, re-crawl everything ignoring `existingRaw`. */
  force: boolean;
}

export interface SourceAdapter {
  readonly sourceId: SourceId;
  /** Human label for logs. */
  readonly label: string;

  /**
   * Crawl the source into raw records. Should be idempotent (stable ids) and
   * respect `ctx.limit`. Politeness delays are applied by the helpers.
   */
  crawl(ctx: CrawlContext): Promise<RawRecord[]>;

  /**
   * Map raw records → normalized records. Pure (no network); can be re-run on
   * stored raw data without re-crawling.
   */
  normalize(raw: RawRecord[]): NormalizedRecord[];
}
