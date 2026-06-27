/**
 * ADGM News / Announcements.
 * https://www.adgm.com/media/announcements
 * Cards: <adgm-highlight-card class="announcementlisting" chip="<category>" href="…">
 *   with two <adgm-text> children: title, then date.
 */
import { createCardAdapter, type CardItem } from "./card-source.js";
import type { NormalizedRecord, RawRecord } from "../core/types.js";

export const newsAdapter = createCardAdapter({
  sourceId: "news",
  label: "ADGM News & Announcements",
  listUrl: "https://www.adgm.com/media/announcements",
  waitSelector: "adgm-highlight-card.announcementlisting",
  extractCards: (): CardItem[] =>
    [...document.querySelectorAll("adgm-highlight-card.announcementlisting")]
      .map((c) => {
        const href = c.getAttribute("href");
        const texts = [...c.querySelectorAll("adgm-text")].map((t) =>
          (t.textContent || "").replace(/\s+/g, " ").trim(),
        );
        return {
          id: href || "",
          url: href,
          data: { title: texts[0] || "", date: texts[1] || "", chip: c.getAttribute("chip") || "" },
        };
      })
      .filter((x) => x.id),
  toNormalized: (raw: RawRecord): NormalizedRecord => {
    const d = raw.data as { title: string; date: string; chip: string };
    return {
      uid: `news:${raw.id}`,
      sourceId: "news",
      contentType: "news",
      sourceNativeId: raw.id,
      url: raw.url,
      title: d.title,
      summary: [d.chip, d.date].filter(Boolean).join(" · "),
      body: [d.title, d.chip ? `Category: ${d.chip}` : "", d.date ? `Date: ${d.date}` : ""]
        .filter(Boolean)
        .join("\n"),
      date: d.date || undefined,
      fields: { category: d.chip, dateText: d.date },
      crawledAt: raw.crawledAt,
    };
  },
});
