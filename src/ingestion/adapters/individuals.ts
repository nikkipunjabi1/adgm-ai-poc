/**
 * FSRA Approved/Key Individuals register.
 * https://www.adgm.com/public-registers/fsra/individuals
 *
 * List: Name (links to detail) | Person Reference Number | Type | Status | Prohibited.
 * Detail page Table 2 ("Current Role | Firm Name | Status | Effective Start Date")
 * carries the firm relationship — the Firm Name cell links to the firm's page.
 */
import { findTableByHeader, rowsToObjects, type AdgmCell, type AdgmTable } from "../core/dom.js";
import { createTableAdapter } from "./table-source.js";
import type { NormalizedRecord, RawRecord } from "../core/types.js";

const cell = (cells: AdgmCell[], i: number) => cells[i]?.text ?? "";

/** Map a firm detail-page slug to a firm uid when it ends in an FSP number. */
function firmUidFromHref(href: string | null | undefined): string | null {
  if (!href) return null;
  const m = href.match(/-(\d{4,})\/?$/);
  return m ? `firms:${m[1]}` : null;
}

interface IndRole {
  role: string;
  firmName: string;
  firmHref: string | null;
  status: string;
  startDate: string;
}

/** Extract current roles (incl. firm links) from the detail tables. */
function readRoles(detail: AdgmTable[] | null): IndRole[] {
  if (!detail) return [];
  const t = findTableByHeader(detail, "Firm Name");
  if (!t) return [];
  const firmIdx = t.headers.findIndex((h) => h.toLowerCase().includes("firm name"));
  return t.rows.map((cells) => ({
    role: cells[0]?.text ?? "",
    firmName: firmIdx >= 0 ? (cells[firmIdx]?.text ?? "") : "",
    firmHref: firmIdx >= 0 ? (cells[firmIdx]?.href ?? null) : null,
    status: cells[t.headers.findIndex((h) => h.toLowerCase() === "status")]?.text ?? "",
    startDate: cells[cells.length - 1]?.text ?? "",
  }));
}

export const individualsAdapter = createTableAdapter({
  sourceId: "individuals",
  label: "FSRA Individuals register",
  listUrl: "https://www.adgm.com/public-registers/fsra/individuals",
  enrich: true,

  rowId: (cells) => cell(cells, 1) || cells[0]?.href || null,
  rowHref: (cells) => cells[0]?.href ?? null,

  buildData: (cells, detail) => ({
    name: cell(cells, 0),
    prn: cell(cells, 1),
    type: cell(cells, 2),
    status: cell(cells, 3),
    prohibited: cell(cells, 4),
    roles: detail ? readRoles(detail) : undefined,
    relatedItems: detail
      ? rowsToObjects(findTableByHeader(detail, "Category") ?? ({ headers: [], rows: [], flat: [], id: "" } as AdgmTable))
      : undefined,
  }),

  toNormalized: (raw: RawRecord): NormalizedRecord => {
    const d = raw.data as {
      name: string;
      prn: string;
      type: string;
      status: string;
      prohibited: string;
      roles?: IndRole[];
    };
    const roles = d.roles ?? [];
    const firmNames = [...new Set(roles.map((r) => r.firmName).filter(Boolean))];
    const relatedUids = [
      ...new Set(roles.map((r) => firmUidFromHref(r.firmHref)).filter((x): x is string => !!x)),
    ];
    const roleLine = roles.length
      ? roles.map((r) => `${r.role} at ${r.firmName} (${r.status})`).join("; ")
      : "";

    return {
      uid: `individuals:${raw.id}`,
      sourceId: "individuals",
      contentType: "person",
      sourceNativeId: raw.id,
      url: raw.url,
      title: d.name,
      summary: [d.type, d.status].filter(Boolean).join(" · "),
      body: [
        d.name,
        `Person Reference Number: ${d.prn}`,
        `Type: ${d.type}`,
        `Status: ${d.status}`,
        d.prohibited ? `Prohibited: ${d.prohibited}` : "",
        roleLine ? `Roles: ${roleLine}` : "",
        firmNames.length ? `Firms: ${firmNames.join(", ")}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
      fields: {
        prn: d.prn,
        type: d.type,
        status: d.status,
        prohibited: d.prohibited,
        roles,
        firmNames,
      },
      relations: relatedUids.length ? { relatedUids } : undefined,
      crawledAt: raw.crawledAt,
    };
  },
});
