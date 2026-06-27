/**
 * ADGM Dispute Resolution panelists (separate subdomain).
 * https://disputeresolution.adgm.com/why-adgm/panels
 * Cards: <div class="panel-cards" onclick="OpenDetails(<id>,'<panel>')"> with
 *   <h3> name, <h4> panel, <p> affiliation, and an <adgm-image> photo.
 */
import { createCardAdapter, type CardItem } from "./card-source.js";
import type { NormalizedRecord, RawRecord } from "../core/types.js";

export const panelistsAdapter = createCardAdapter({
  sourceId: "panelists",
  label: "ADGM Dispute Resolution Panelists",
  listUrl: "https://disputeresolution.adgm.com/why-adgm/panels",
  waitSelector: ".panel-cards",
  extractCards: (): CardItem[] =>
    [...document.querySelectorAll(".panel-cards")]
      .map((c) => {
        const oc = c.getAttribute("onclick") || "";
        const m = oc.match(/OpenDetails\((\d+)\s*,\s*["']?(.*?)["']?\)/);
        const id = m ? m[1]! : "";
        const name = (c.querySelector("h3")?.textContent || "").trim();
        const panel = (c.querySelector("h4")?.textContent || "").trim() || (m ? m[2]! : "");
        const affiliation = (c.querySelector("p")?.textContent || "").trim();
        const photo = c.querySelector("adgm-image")?.getAttribute("src") || "";
        return { id, url: null, data: { name, panel, affiliation, photo } };
      })
      .filter((x) => x.id),
  toNormalized: (raw: RawRecord): NormalizedRecord => {
    const d = raw.data as { name: string; panel: string; affiliation: string; photo: string };
    return {
      uid: `panelists:${raw.id}`,
      sourceId: "panelists",
      contentType: "person",
      sourceNativeId: raw.id,
      url: raw.url,
      title: d.name,
      summary: [d.panel, d.affiliation].filter(Boolean).join(" · "),
      body: [d.name, d.panel ? `Panel: ${d.panel}` : "", d.affiliation ? `Affiliation: ${d.affiliation}` : ""]
        .filter(Boolean)
        .join("\n"),
      fields: { panel: d.panel, affiliation: d.affiliation, photo: d.photo, personType: "panelist" },
      crawledAt: raw.crawledAt,
    };
  },
});
