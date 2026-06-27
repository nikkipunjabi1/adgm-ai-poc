/**
 * FSRA Funds register.
 * https://www.adgm.com/public-registers/fsra/funds
 *
 * The visible list table is "Fund Name (links to detail) | Reference Number |
 * Fund Status | Fund Type". The fund's managing firm is only on the detail page
 * (Table 1 key/value: "Fund Manager" → firm name), so we enrich to link it.
 */
import { pairsToObject, type AdgmCell, type AdgmTable } from "../core/dom.js";
import { createTableAdapter } from "./table-source.js";
import type { NormalizedRecord, RawRecord } from "../core/types.js";

const cell = (cells: AdgmCell[], i: number) => cells[i]?.text ?? "";

/** The fund profile is the first key/value table (no headers, label/value pairs). */
function readProfile(detail: AdgmTable[] | null): Record<string, string> {
  if (!detail) return {};
  const t = detail.find((tb) => tb.headers.filter(Boolean).length === 0 && tb.flat.length > 0);
  return t ? pairsToObject(t.flat) : {};
}

export const fundsAdapter = createTableAdapter({
  sourceId: "funds",
  label: "FSRA Funds register",
  listUrl: "https://www.adgm.com/public-registers/fsra/funds",
  enrich: true,

  rowId: (cells) => cell(cells, 1) || cells[0]?.href || null,
  rowHref: (cells) => cells[0]?.href ?? null,

  buildData: (cells, detail) => ({
    fundName: cell(cells, 0),
    refNumber: cell(cells, 1),
    status: cell(cells, 2),
    fundType: cell(cells, 3),
    profile: detail ? readProfile(detail) : undefined,
  }),

  toNormalized: (raw: RawRecord): NormalizedRecord => {
    const d = raw.data as {
      fundName: string;
      refNumber: string;
      status: string;
      fundType: string;
      profile?: Record<string, string>;
    };
    const p = d.profile ?? {};
    const fundManager = p["Fund Manager"] ?? "";

    return {
      uid: `funds:${raw.id}`,
      sourceId: "funds",
      contentType: "fund",
      sourceNativeId: raw.id,
      url: raw.url,
      title: d.fundName,
      summary: [d.fundType, d.status].filter(Boolean).join(" · "),
      body: [
        d.fundName,
        `Reference Number: ${d.refNumber}`,
        `Fund Type: ${d.fundType}`,
        `Status: ${d.status}`,
        fundManager ? `Fund Manager: ${fundManager}` : "",
        p["Date Established"] ? `Date Established: ${p["Date Established"]}` : "",
        p["Entity Type"] ? `Entity Type: ${p["Entity Type"]}` : "",
        p["Registered Address"] ? `Registered Address: ${p["Registered Address"]}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
      date: p["Date Established"] || undefined,
      fields: {
        refNumber: d.refNumber,
        status: d.status,
        fundType: d.fundType,
        fundManager,
        fundManagerDomicile: p["Fund Manager Domicile"] ?? null,
        entityType: p["Entity Type"] ?? null,
        registeredAddress: p["Registered Address"] ?? null,
        umbrellaFund: p["Umbrella Fund"] ?? null,
      },
      // Link to managing firm resolved by name in a post-ingestion pass.
      relations: fundManager ? { relatedUids: [] } : undefined,
      crawledAt: raw.crawledAt,
    };
  },
});
