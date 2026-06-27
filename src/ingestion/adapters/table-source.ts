/**
 * Factory for ADGM "register"-style sources that render an <adgm-table> list
 * with optional per-row detail pages. Covers firms/individuals/funds/cases/
 * hearings/judgments/notices/documents — they share the same shape, differing
 * only in field mapping, which table to read, and detail/relation extraction.
 *
 * The factory owns the mechanics (generic pagination, resume via existingRaw,
 * checkpointing, polite detail visits); each source supplies the small,
 * source-specific bits via config.
 */
import { politeDelay } from "../core/browser.js";
import { readAdgmTables, type AdgmCell, type AdgmTable } from "../core/dom.js";
import type { CrawlContext, SourceAdapter } from "./base.js";
import type { NormalizedRecord, RawRecord, SourceId } from "../core/types.js";

export interface TableSourceConfig {
  sourceId: SourceId;
  label: string;
  listUrl: string;
  /** Pick the data table from a page's tables. Default: first table with rows. */
  pickTable?: (tables: AdgmTable[]) => AdgmTable | undefined;
  /** Stable id from a list row's cells. Return null to skip the row. */
  rowId: (cells: AdgmCell[]) => string | null;
  /** Detail-page href from a list row's cells (relative or absolute). */
  rowHref: (cells: AdgmCell[]) => string | null;
  /** Whether to visit detail pages for enrichment. */
  enrich: boolean;
  /** Optional per-source cap, honored even under `--all` (CLI --limit overrides). */
  limit?: number;
  /**
   * Build the raw.data object. `detailTables` is null at list stage and the
   * detail page's tables after enrichment. Called again after enrichment, so
   * it should merge list + detail fields.
   */
  buildData: (cells: AdgmCell[], detailTables: AdgmTable[] | null) => Record<string, unknown>;
  /** Normalize one raw record into a search-ready record. */
  toNormalized: (raw: RawRecord) => NormalizedRecord;
}

const firstNonEmptyTable = (tables: AdgmTable[]): AdgmTable | undefined =>
  tables.find((t) => t.rows.length > 0);

export function createTableAdapter(cfg: TableSourceConfig): SourceAdapter {
  const pickTable = cfg.pickTable ?? firstNonEmptyTable;

  return {
    sourceId: cfg.sourceId,
    label: cfg.label,

    async crawl(ctx: CrawlContext): Promise<RawRecord[]> {
      const { context, log, checkpoint, existingRaw, force } = ctx;
      // CLI --limit (ctx.limit) wins for dev runs; otherwise honor the source cap.
      const limit = ctx.limit || cfg.limit || 0;
      const page = await context.newPage();
      try {
        await page.goto(cfg.listUrl, { waitUntil: "networkidle" });
        await page
          .waitForFunction(
            () => document.querySelectorAll("adgm-table adgm-table-cell").length > 0,
            { timeout: 30_000 },
          )
          .catch(() => log.warn("no table cells appeared on list page"));

        // --- List phase via the generic paginator. ---
        const { paginateAll } = await import("../core/paginate.js");
        type Row = { id: string; href: string | null; cells: AdgmCell[] };
        const rows = await paginateAll<Row>({
          page,
          log,
          limit,
          idOf: (r) => r.id,
          extract: async () => {
            const tables = await page.evaluate(readAdgmTables);
            const table = pickTable(tables);
            if (!table) return [];
            const out: Row[] = [];
            for (const cells of table.rows) {
              const id = cfg.rowId(cells);
              if (!id) continue;
              out.push({ id, href: cfg.rowHref(cells), cells });
            }
            return out;
          },
        });

        const cellsById = new Map(rows.map((r) => [r.id, r.cells] as const));
        const records: RawRecord[] = rows.map((r) => ({
          sourceId: cfg.sourceId,
          id: r.id,
          url: r.href ? new URL(r.href, cfg.listUrl).href : cfg.listUrl,
          data: cfg.buildData(r.cells, null),
          crawledAt: new Date().toISOString(),
        }));
        await checkpoint(records);

        if (!cfg.enrich) return records;

        // --- Detail enrichment phase (resumable). ---
        log.info(`enriching ${records.length} records from detail pages…`);
        let enriched = 0;
        let skipped = 0;
        for (const rec of records) {
          const prior = existingRaw.get(rec.id);
          if (!force && prior && (prior.data as Record<string, unknown>)._enriched) {
            rec.data = prior.data; // reuse stored enrichment
            skipped++;
            continue;
          }
          try {
            await page.goto(rec.url, { waitUntil: "networkidle" });
            await page
              .waitForFunction(
                () => document.querySelectorAll("adgm-table adgm-table-cell").length > 0,
                { timeout: 20_000 },
              )
              .catch(() => {});
            const detailTables = await page.evaluate(readAdgmTables);
            const cells = cellsById.get(rec.id) ?? [];
            rec.data = { ...cfg.buildData(cells, detailTables), _enriched: true };
            enriched++;
            if (enriched % 25 === 0) {
              log.info(`enriched ${enriched}/${records.length} (skipped ${skipped})`);
              await checkpoint(records);
            }
          } catch (err) {
            log.warn(`detail failed for ${rec.id}: ${(err as Error).message}`);
          }
          await politeDelay();
        }
        log.success(`enriched ${enriched}, reused ${skipped}`);
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
