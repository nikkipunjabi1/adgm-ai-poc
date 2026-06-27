/**
 * ADGM Document Repository — the central PDF source for the whole site.
 * https://www.adgm.com/document-repository
 *
 * List: Document title (links to the assets.adgm.com PDF) | Tags | Date.
 * List-only: the row already carries the PDF URL, so no detail page. The actual
 * PDF download + text extraction is a separate, throttleable step. Documents
 * link back to judgments/notices by identifiers embedded in their titles
 * (e.g. case numbers), resolved in the relation pass.
 */
import { createTableAdapter } from "./table-source.js";
import type { AdgmCell } from "../core/dom.js";
import type { NormalizedRecord, RawRecord } from "../core/types.js";

/** Title cells repeat the filename twice; take the first ".pdf"-terminated run. */
function cleanTitle(text: string): string {
  const m = text.match(/^(.*?\.pdf)/i);
  return (m ? m[1]! : text).trim();
}

/** Asset hash is the last path segment of the download URL — a stable id. */
function assetId(href: string): string {
  return href.split("/").filter(Boolean).pop() ?? href;
}

export const documentsAdapter = createTableAdapter({
  sourceId: "documents",
  // (documents reuses the generic table flow; not in SourceId union by default)
  label: "ADGM Document Repository",
  listUrl: "https://www.adgm.com/document-repository",
  enrich: false,
  limit: 500, // repository has ~5,956; cap to the 500 most-recent for the POC
  rowId: (cells: AdgmCell[]) => {
    const href = cells[0]?.href ?? null;
    return href ? assetId(href) : null;
  },
  rowHref: (cells: AdgmCell[]) => cells[0]?.href ?? null,
  buildData: (cells: AdgmCell[]) => ({
    title: cleanTitle(cells[0]?.text ?? ""),
    pdfUrl: cells[0]?.href ?? "",
    tags: cells[1]?.text ?? "",
    date: cells[2]?.text ?? "",
  }),
  toNormalized: (raw: RawRecord): NormalizedRecord => {
    const d = raw.data as {
      title: string;
      pdfUrl: string;
      tags: string;
      date: string;
      pdfText?: string;
    };
    const pdfText = (d.pdfText || "").trim();
    return {
      uid: `documents:${raw.id}`,
      sourceId: "documents",
      contentType: "document",
      sourceNativeId: raw.id,
      url: d.pdfUrl || raw.url,
      title: d.title,
      summary: [d.tags, d.date].filter(Boolean).join(" · "),
      body: [
        d.title,
        d.tags ? `Tags: ${d.tags}` : "",
        d.date ? `Date: ${d.date}` : "",
        pdfText ? `\n${pdfText}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
      date: d.date || undefined,
      fields: { tags: d.tags, pdfUrl: d.pdfUrl, hasPdfText: pdfText.length > 0 },
      pdfs: d.pdfUrl ? [{ url: d.pdfUrl, label: d.title }] : undefined,
      crawledAt: raw.crawledAt,
    };
  },
});
