/**
 * Generic pagination for ADGM list pages.
 *
 * Every source paginates via a different JS function wired to
 * <adgm-pagination onchange="SomeFn(this.getPage(), 'token')">. Instead of
 * hardcoding per source, we read that handler off the element, parse the
 * function name + any trailing literal args, and invoke it with the target page
 * number. Works for both table- and card-rendered lists since the caller
 * supplies how to extract + identify items.
 */
import type { Page } from "playwright";
import type { Logger } from "./logger.js";
import { politeDelay } from "./browser.js";

export interface PaginationInfo {
  total: number;
  perPage: number;
  /** Function name from the onchange handler, e.g. "IndividualListingPageUpdate". */
  fnName: string | null;
  /** Literal args following this.getPage(), e.g. ["9udk8"]. */
  extraArgs: (string | number)[];
}

/** Read pagination metadata (count, page size, handler) from the page. */
export async function readPaginationInfo(page: Page): Promise<PaginationInfo> {
  const raw = await page.evaluate(() => {
    const p = document.querySelector("adgm-pagination");
    return {
      total: Number(p?.getAttribute("total-items") ?? 0),
      perPage: Number(p?.getAttribute("items-per-page") ?? 10),
      onchange: p?.getAttribute("onchange") ?? null,
    };
  });

  let fnName: string | null = null;
  const extraArgs: (string | number)[] = [];
  if (raw.onchange) {
    const m = raw.onchange.match(/^\s*(\w+)\s*\((.*)\)\s*;?\s*$/s);
    if (m) {
      fnName = m[1]!;
      const argParts = m[2]!.split(",").map((s) => s.trim()).filter(Boolean);
      // First arg is this.getPage() — skip it; parse the rest as literals.
      for (const part of argParts.slice(1)) {
        const str = part.match(/^['"](.*)['"]$/);
        if (str) extraArgs.push(str[1]!);
        else if (/^-?\d+$/.test(part)) extraArgs.push(Number(part));
        else extraArgs.push(part.replace(/['"]/g, ""));
      }
    }
  }
  return { total: raw.total, perPage: raw.perPage, fnName, extraArgs };
}

export interface PaginateOptions<T> {
  page: Page;
  log: Logger;
  /** 0 = all pages. */
  limit: number;
  /** Extract the current page's items (runs page.evaluate internally). */
  extract: () => Promise<T[]>;
  /** Stable id for dedupe + change-detection. */
  idOf: (item: T) => string;
}

/**
 * Universal page navigation: drive the <adgm-pagination> component directly.
 *
 * Every ADGM list uses this component, which exposes an `onchange` *function
 * property* bound to the page's real (closure-scoped) data-fetch handler, plus
 * a `current-page` attribute that its `getPage()` reads. Setting current-page
 * and invoking onchange() reproduces exactly what a user click does — without
 * needing to know the per-source handler name, its token args, or whether its
 * requestData is global or closure-scoped. (The `onchange` attribute string
 * often names a function that isn't even on `window`.)
 */
async function goToPage(page: Page, pageNum: number): Promise<boolean> {
  return page.evaluate((n) => {
    const el = document.querySelector("adgm-pagination") as
      | (Element & { onchange?: () => void; currentPage?: number })
      | null;
    if (!el) return false;
    el.setAttribute("current-page", String(n));
    try {
      el.currentPage = n;
    } catch {
      /* read-only in some builds; the attribute is enough */
    }
    if (typeof el.onchange === "function") {
      el.onchange();
      return true;
    }
    return false;
  }, pageNum);
}

/** Wait until the first item's id changes (page re-rendered) or timeout. */
async function waitForPageChange<T>(
  opts: PaginateOptions<T>,
  prevFirstId: string,
  timeoutMs = 20_000,
): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    await opts.page.waitForTimeout(500);
    const items = await opts.extract();
    if (items.length > 0 && opts.idOf(items[0]!) !== prevFirstId) return;
  }
  opts.log.warn("page change not detected within timeout, continuing");
}

/**
 * Walk every page, collecting de-duplicated items. Stops at `limit` if set.
 */
export async function paginateAll<T>(opts: PaginateOptions<T>): Promise<T[]> {
  const { page, log, limit } = opts;
  const info = await readPaginationInfo(page);
  const totalPages = info.perPage > 0 ? Math.max(1, Math.ceil(info.total / info.perPage)) : 1;
  log.info(`${info.total} items across ${totalPages} pages (${info.perPage}/page)`);

  const seen = new Set<string>();
  const collected: T[] = [];
  let stalls = 0;

  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    const items = await opts.extract();
    const sizeBefore = collected.length;
    for (const item of items) {
      const id = opts.idOf(item);
      if (!id || seen.has(id)) continue;
      seen.add(id);
      collected.push(item);
    }
    log.info(`page ${pageNum}/${totalPages} — ${collected.length} collected`);

    if (limit && collected.length >= limit) return collected.slice(0, limit);
    if (pageNum >= totalPages) break;

    // Guard against a broken pager re-serving the same rows: bail after 3
    // consecutive pages that add nothing new.
    if (collected.length === sizeBefore) {
      if (++stalls >= 3) {
        log.warn(`no new records for ${stalls} pages — stopping pagination early`);
        break;
      }
    } else {
      stalls = 0;
    }

    const prevFirstId = items.length ? opts.idOf(items[0]!) : "";
    const advanced = await goToPage(page, pageNum + 1);
    if (!advanced) {
      log.warn("no adgm-pagination component to advance — single page");
      break;
    }
    await waitForPageChange(opts, prevFirstId);
    await politeDelay();
  }

  return collected;
}
