/**
 * Reusable browser-side DOM readers for ADGM's custom web components.
 *
 * These functions are injected into the page via `page.evaluate(...)`, so they
 * must be fully self-contained (no module-scope references). ADGM renders most
 * structured data into <adgm-table> across firms, courts, etc., so a shared
 * reader avoids re-deriving the same extraction per adapter.
 */

export interface AdgmCell {
  text: string;
  href: string | null;
}

export interface AdgmTable {
  /** The table's id attribute, if any (pages may have several tables). */
  id: string;
  /** Texts of <adgm-table-header-cell> elements (may be empty for key/value tables). */
  headers: string[];
  /** Data rows: each is an array of <adgm-table-cell> values. */
  rows: AdgmCell[][];
  /** All cells flattened in document order (handy for key/value tables). */
  flat: AdgmCell[];
}

/** Read every <adgm-table> on the page into a structured, serializable form. */
export function readAdgmTables(): AdgmTable[] {
  const tables = [...document.querySelectorAll("adgm-table")];
  return tables.map((table) => {
    const id = table.getAttribute("id") || "";
    const headers = [...table.querySelectorAll("adgm-table-header-cell")].map((h) =>
      (h.textContent || "").replace(/\s+/g, " ").trim(),
    );
    const rows: AdgmCell[][] = [];
    const flat: AdgmCell[] = [];
    for (const row of table.querySelectorAll("adgm-table-row")) {
      const cells = [...row.querySelectorAll("adgm-table-cell")].map((c) => ({
        text: (c.textContent || "").replace(/\s+/g, " ").trim(),
        href: c.getAttribute("href"),
      }));
      if (cells.length === 0) continue;
      rows.push(cells);
      flat.push(...cells);
    }
    return { id, headers, rows, flat };
  });
}

/** Zip a flat label/value cell list into an object (label1, value1, label2, …). */
export function pairsToObject(flat: AdgmCell[]): Record<string, string> {
  const obj: Record<string, string> = {};
  for (let i = 0; i + 1 < flat.length; i += 2) {
    const key = flat[i]!.text;
    const val = flat[i + 1]!.text;
    if (key) obj[key] = val;
  }
  return obj;
}

/** Map a headered table's rows into objects keyed by header text. */
export function rowsToObjects(table: AdgmTable): Record<string, string>[] {
  if (table.headers.length === 0) return [];
  return table.rows
    .filter((r) => r.length === table.headers.length)
    .map((r) => {
      const obj: Record<string, string> = {};
      table.headers.forEach((h, i) => {
        obj[h] = r[i]!.text;
      });
      return obj;
    });
}

/** Find a table whose headers include the given (case-insensitive) label. */
export function findTableByHeader(tables: AdgmTable[], header: string): AdgmTable | undefined {
  const needle = header.toLowerCase();
  return tables.find((t) => t.headers.some((h) => h.toLowerCase().includes(needle)));
}
