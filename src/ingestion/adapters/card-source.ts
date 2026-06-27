/**
 * Factory for ADGM "card"-style sources (news, events, panelists, notices) that
 * render repeating card elements instead of <adgm-table>. All data lives on the
 * card itself, so there's no detail-enrichment phase — just paginate + extract.
 *
 * Each source supplies a self-contained browser function that reads its cards
 * into {id, url, data}; the factory owns pagination + checkpointing.
 */
import type { CrawlContext, SourceAdapter } from "./base.js";
import type { NormalizedRecord, RawRecord, SourceId } from "../core/types.js";

export interface CardItem {
  id: string;
  url: string | null;
  data: Record<string, unknown>;
}

export interface CardSourceConfig {
  sourceId: SourceId;
  label: string;
  listUrl: string;
  /** CSS selector that exists once cards have rendered. */
  waitSelector: string;
  /** Self-contained browser function returning the page's cards. */
  extractCards: () => CardItem[];
  toNormalized: (raw: RawRecord) => NormalizedRecord;
}

export function createCardAdapter(cfg: CardSourceConfig): SourceAdapter {
  return {
    sourceId: cfg.sourceId,
    label: cfg.label,

    async crawl(ctx: CrawlContext): Promise<RawRecord[]> {
      const { context, log, limit, checkpoint } = ctx;
      const page = await context.newPage();
      try {
        await page.goto(cfg.listUrl, { waitUntil: "networkidle" });
        await page
          .waitForSelector(cfg.waitSelector, { timeout: 30_000 })
          .catch(() => log.warn(`cards (${cfg.waitSelector}) did not appear`));

        const { paginateAll } = await import("../core/paginate.js");
        const items = await paginateAll<CardItem>({
          page,
          log,
          limit,
          idOf: (it) => it.id,
          extract: () => page.evaluate(cfg.extractCards),
        });

        const records: RawRecord[] = items.map((it) => ({
          sourceId: cfg.sourceId,
          id: it.id,
          url: it.url ? new URL(it.url, cfg.listUrl).href : cfg.listUrl,
          data: it.data,
          crawledAt: new Date().toISOString(),
        }));
        await checkpoint(records);
        return records;
      } finally {
        await page.close();
      }
    },

    normalize(raw: RawRecord[]): NormalizedRecord[] {
      return raw.map(cfg.toNormalized);
    },
  };
}
