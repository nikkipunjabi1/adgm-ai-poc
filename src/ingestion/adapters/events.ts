/**
 * ADGM Events.
 * https://www.adgm.com/events
 * Cards: <adgm-event-card date-month="Jul" date-day="07" location="…" href="…">
 *   Title</adgm-event-card>. Only current/upcoming events are listed.
 */
import { createCardAdapter, type CardItem } from "./card-source.js";
import type { NormalizedRecord, RawRecord } from "../core/types.js";

export const eventsAdapter = createCardAdapter({
  sourceId: "events",
  label: "ADGM Events",
  listUrl: "https://www.adgm.com/events",
  waitSelector: "adgm-event-card",
  extractCards: (): CardItem[] =>
    [...document.querySelectorAll("adgm-event-card")]
      .map((c) => {
        const href = c.getAttribute("href");
        const title = (c.textContent || "").replace(/\s+/g, " ").trim();
        const month = c.getAttribute("date-month") || "";
        const day = c.getAttribute("date-day") || "";
        const location = c.getAttribute("location") || "";
        return {
          id: href || title,
          url: href,
          data: { title, dateText: `${day} ${month}`.trim(), location },
        };
      })
      .filter((x) => x.id),
  toNormalized: (raw: RawRecord): NormalizedRecord => {
    const d = raw.data as { title: string; dateText: string; location: string };
    return {
      uid: `events:${raw.id}`,
      sourceId: "events",
      contentType: "event",
      sourceNativeId: raw.id,
      url: raw.url,
      title: d.title,
      summary: [d.location, d.dateText].filter(Boolean).join(" · "),
      body: [d.title, d.location ? `Location: ${d.location}` : "", d.dateText ? `Date: ${d.dateText}` : ""]
        .filter(Boolean)
        .join("\n"),
      date: d.dateText || undefined,
      fields: { location: d.location, dateText: d.dateText },
      crawledAt: raw.crawledAt,
    };
  },
});
