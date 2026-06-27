/**
 * ADGM Registration Authority public notices.
 * https://www.adgm.com/registration-authority/public-notices
 * Items: <div class="aadgmra-content--wrap"> with a head of 4
 *   <div class="aadgmra-content--td"> (Publication Date, Company, Registered
 *   Number, Notice ID) and a content block (notice title + body, optional PDF).
 */
import { createCardAdapter, type CardItem } from "./card-source.js";
import type { NormalizedRecord, RawRecord } from "../core/types.js";

export const noticesAdapter = createCardAdapter({
  sourceId: "notices",
  label: "ADGM Public Notices",
  listUrl: "https://www.adgm.com/registration-authority/public-notices",
  waitSelector: ".aadgmra-content--wrap",
  extractCards: (): CardItem[] =>
    [...document.querySelectorAll(".aadgmra-content--wrap")]
      .map((w) => {
        const kv: Record<string, string> = {};
        for (const td of w.querySelectorAll(".aadgmra-content--td")) {
          const strong = (td.querySelector("strong")?.textContent || "").trim();
          const full = (td.querySelector("h3")?.textContent || "").replace(/\s+/g, " ").trim();
          if (strong) kv[strong] = full.replace(strong, "").trim();
        }
        const block = w.querySelector(".aadgmra-content--block");
        const title = (block?.querySelector("adgm-text")?.textContent || "").replace(/\s+/g, " ").trim();
        const body = (block?.textContent || "").replace(/\s+/g, " ").trim();
        const pdf = w.querySelector('a[href*="assets.adgm.com"]')?.getAttribute("href") || null;
        const id = kv["Notice ID"] || "";
        return {
          id,
          url: pdf,
          data: {
            publicationDate: kv["Publication Date"] || "",
            company: kv["Company"] || "",
            registeredNumber: kv["Registered Number"] || "",
            noticeId: id,
            title,
            body,
            pdf,
          },
        };
      })
      .filter((x) => x.id),
  toNormalized: (raw: RawRecord): NormalizedRecord => {
    const d = raw.data as {
      publicationDate: string;
      company: string;
      registeredNumber: string;
      noticeId: string;
      title: string;
      body: string;
      pdf: string | null;
    };
    return {
      uid: `notices:${raw.id}`,
      sourceId: "notices",
      contentType: "notice",
      sourceNativeId: raw.id,
      url: d.pdf || raw.url,
      title: d.title || `Notice ${d.noticeId}`,
      summary: [d.company, d.publicationDate].filter(Boolean).join(" · "),
      body: [
        d.title,
        `Company: ${d.company}`,
        d.registeredNumber ? `Registered Number: ${d.registeredNumber}` : "",
        `Notice ID: ${d.noticeId}`,
        `Publication Date: ${d.publicationDate}`,
        d.body,
      ]
        .filter(Boolean)
        .join("\n"),
      date: d.publicationDate || undefined,
      fields: {
        company: d.company,
        registeredNumber: d.registeredNumber,
        noticeId: d.noticeId,
        publicationDate: d.publicationDate,
      },
      pdfs: d.pdf ? [{ url: d.pdf, label: d.title }] : undefined,
      crawledAt: raw.crawledAt,
    };
  },
});
