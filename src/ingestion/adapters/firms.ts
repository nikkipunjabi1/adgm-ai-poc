/**
 * FSRA Financial Firms register.
 * https://www.adgm.com/public-registers/fsra/firms
 *
 * The list renders client-side into <adgm-table id="financialFirmTable"> as
 * <adgm-table-row><adgm-table-cell>…</adgm-table-cell>…</adgm-table-row>. The
 * first cell carries an href to the firm's detail page + the company name; the
 * remaining cells are FSP number, status, address.
 *
 * Pagination has no URL — it's an <adgm-pagination> web component wired to
 * window.onPageChanged(page). We drive it by calling that function and waiting
 * for the first row's href to change.
 */
import { politeDelay, withPage } from "../core/browser.js";
import {
  findTableByHeader,
  pairsToObject,
  readAdgmTables,
  rowsToObjects,
} from "../core/dom.js";
import type { AdgmTable } from "../core/dom.js";
import type { CrawlContext, SourceAdapter } from "./base.js";
import type { NormalizedRecord, RawRecord } from "../core/types.js";

const LIST_URL = "https://www.adgm.com/public-registers/fsra/firms";

interface FirmRow {
  name: string;
  detailPath: string | null;
  fspNumber: string;
  status: string;
  address: string;
}

/** Enrichment scraped from a firm's detail page. */
interface FirmDetail {
  profile: Record<string, string>;
  activities: Record<string, string>[];
  individuals: Record<string, string>[];
}

/** rowsToObjects, tolerant of a missing table. */
function rowsToObjectsOrEmpty(table: AdgmTable | undefined): Record<string, string>[] {
  return table ? rowsToObjects(table) : [];
}

/** Read the currently-rendered rows of the financial-firms table. */
function readRows(): FirmRow[] {
  const table = document.querySelector("#financialFirmTable");
  if (!table) return [];
  const rows = [...table.querySelectorAll("adgm-table-row")];
  const out: FirmRow[] = [];
  for (const row of rows) {
    const cells = [...row.querySelectorAll("adgm-table-cell")];
    if (cells.length < 4) continue; // header row has header-cells, not cells
    const first = cells[0]!;
    out.push({
      name: (first.textContent || "").trim(),
      detailPath: first.getAttribute("href"),
      fspNumber: (cells[1]!.textContent || "").trim(),
      status: (cells[2]!.textContent || "").trim(),
      address: (cells[3]!.textContent || "").trim(),
    });
  }
  return out;
}

export const firmsAdapter: SourceAdapter = {
  sourceId: "firms",
  label: "FSRA Financial Firms register",

  async crawl({ context, log, limit, checkpoint, existingRaw, force }: CrawlContext): Promise<RawRecord[]> {
    return withPage(context, async (page) => {
      await page.goto(LIST_URL, { waitUntil: "networkidle" });

      // Wait for the first data row to render.
      await page.waitForFunction(
        () =>
          (document.querySelectorAll("#financialFirmTable adgm-table-cell").length ?? 0) > 0,
        { timeout: 30_000 },
      );

      // Total items + page size from the pagination component.
      const { total, perPage } = await page.evaluate(() => {
        const p = document.querySelector("adgm-pagination");
        return {
          total: Number(p?.getAttribute("total-items") ?? 0),
          perPage: Number(p?.getAttribute("items-per-page") ?? 10),
        };
      });
      const totalPages = perPage > 0 ? Math.ceil(total / perPage) : 1;
      log.info(`register reports ${total} firms across ${totalPages} pages (${perPage}/page)`);

      const seen = new Set<string>();
      const records: RawRecord[] = [];

      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        const rows = await page.evaluate(readRows);
        for (const row of rows) {
          const id = row.fspNumber || row.detailPath || row.name;
          if (!id || seen.has(id)) continue;
          seen.add(id);
          records.push({
            sourceId: "firms",
            id,
            url: row.detailPath
              ? new URL(row.detailPath, LIST_URL).href
              : LIST_URL,
            data: { ...row },
            crawledAt: new Date().toISOString(),
          });
        }
        log.info(`page ${pageNum}/${totalPages} — collected ${records.length} firms`);

        if (limit && records.length >= limit) {
          log.info(`reached limit ${limit}, stopping list crawl`);
          break;
        }
        if (pageNum >= totalPages) break;

        // Advance to the next page and wait for the table to re-render.
        const firstHrefBefore = rows[0]?.detailPath ?? "";
        const next = pageNum + 1;
        await page.evaluate((n) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).onPageChanged?.(n);
        }, next);
        await page
          .waitForFunction(
            (prev) => {
              const first = document
                .querySelector("#financialFirmTable adgm-table-row + adgm-table-row adgm-table-cell")
                ?.getAttribute("href");
              return first !== null && first !== prev;
            },
            firstHrefBefore,
            { timeout: 20_000 },
          )
          .catch(() => log.warn(`page ${next}: row change not detected, continuing`));
        await politeDelay();
      }

      const list = limit ? records.slice(0, limit) : records;

      // Checkpoint after the list phase — list-level data is safe even if
      // enrichment is interrupted.
      await checkpoint(list);

      // --- Detail-page enrichment: visit each firm for profile, activities, individuals. ---
      log.info(`enriching ${list.length} firms from detail pages…`);
      let enriched = 0;
      let reused = 0;
      for (const rec of list) {
        const prior = existingRaw.get(rec.id);
        if (!force && prior && (prior.data as Record<string, unknown>).detail) {
          rec.data = prior.data; // resume: reuse stored enrichment
          reused++;
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
          const tables = await page.evaluate(readAdgmTables);
          const profileTable = tables.find((t) => t.headers.length === 0 && t.flat.length > 0);
          const detail: FirmDetail = {
            profile: profileTable ? pairsToObject(profileTable.flat) : {},
            activities: rowsToObjectsOrEmpty(findTableByHeader(tables, "Asset Type")),
            individuals: rowsToObjectsOrEmpty(findTableByHeader(tables, "Person Reference Number")),
          };
          (rec.data as Record<string, unknown>).detail = detail;
          enriched++;
          if (enriched % 25 === 0) {
            log.info(`enriched ${enriched}/${list.length}`);
            await checkpoint(list); // periodic save so progress survives a crash
          }
        } catch (err) {
          log.warn(`detail enrichment failed for ${rec.id}: ${(err as Error).message}`);
        }
        await politeDelay();
      }
      log.success(`enriched ${enriched}, reused ${reused} (of ${list.length})`);

      return list;
    });
  },

  normalize(raw: RawRecord[]): NormalizedRecord[] {
    return raw.map((r) => {
      const d = r.data as unknown as FirmRow & { detail?: FirmDetail };
      const detail = d.detail;
      const profile = detail?.profile ?? {};
      const activities = detail?.activities ?? [];
      const individuals = detail?.individuals ?? [];

      const activityNames = activities.map((a) => a["Type"]).filter(Boolean);

      // Graph links: associated individuals → person records (by Person Reference Number).
      const relatedUids = individuals
        .map((p) => p["Person Reference Number"])
        .filter(Boolean)
        .map((prn) => `individuals:${prn}`);

      const body = [
        d.name,
        `FSP Number: ${d.fspNumber}`,
        `Status: ${d.status}`,
        profile["Legal Status"] ? `Legal Status: ${profile["Legal Status"]}` : "",
        profile["FSP Date"] ? `FSP Date: ${profile["FSP Date"]}` : "",
        `Address: ${d.address}`,
        profile["Email"] ? `Email: ${profile["Email"]}` : "",
        profile["Phone"] ? `Phone: ${profile["Phone"]}` : "",
        activityNames.length ? `Regulated Activities: ${activityNames.join(", ")}` : "",
        individuals.length
          ? `Associated Individuals: ${individuals.map((p) => p["Name"]).filter(Boolean).join(", ")}`
          : "",
      ]
        .filter(Boolean)
        .join("\n");

      return {
        uid: `firms:${r.id}`,
        sourceId: "firms",
        contentType: "firm",
        sourceNativeId: r.id,
        url: r.url,
        title: d.name,
        summary: [d.status, `FSP ${d.fspNumber}`].filter(Boolean).join(" · "),
        body,
        date: profile["FSP Date"] || undefined,
        fields: {
          fspNumber: d.fspNumber,
          status: d.status,
          address: d.address,
          firmType: "financial",
          email: profile["Email"] ?? null,
          phone: profile["Phone"] ?? null,
          legalStatus: profile["Legal Status"] ?? null,
          fspDate: profile["FSP Date"] ?? null,
          regulatedActivities: activities,
          individuals,
        },
        relations: relatedUids.length ? { relatedUids } : undefined,
        crawledAt: r.crawledAt,
      };
    });
  },
};
