/**
 * ADGM site content pages (background knowledge).
 *
 * Bounded breadth-first crawl starting from the homepage, following internal
 * navigation + footer + in-page links, to capture the key informational pages
 * (Setting Up, Business Areas, Operating in ADGM, Legal Framework, About, …).
 * This gives the RAG layer general context about ADGM's business, not just the
 * register/court/news records.
 *
 * Skips the dynamic list/register sources (already crawled by their own
 * adapters) and non-content links. Extracts readable main content by stripping
 * navigation, footer, and breadcrumbs.
 */
import { politeDelay } from "../core/browser.js";
import type { CrawlContext, SourceAdapter } from "./base.js";
import type { NormalizedRecord, RawRecord } from "../core/types.js";

const ORIGIN = "https://www.adgm.com";
const SEED = `${ORIGIN}/`;
const MAX_PAGES = 100;

/** Path prefixes already covered by dedicated adapters, or not useful as prose. */
const EXCLUDE = [
  "/public-registers",
  "/adgm-courts/cases",
  "/adgm-courts/hearings",
  "/adgm-courts/judgments",
  "/media/announcements",
  "/events",
  "/registration-authority/public-notices",
  "/document-repository",
];

function isContentPath(path: string): boolean {
  if (!path.startsWith("/")) return false;
  if (path === "/" || path.length < 2) return false;
  if (/\.(pdf|jpg|jpeg|png|zip|docx?|xlsx?)$/i.test(path)) return false;
  if (path.includes("#") || path.includes("?")) return false;
  return !EXCLUDE.some((p) => path.startsWith(p));
}

/** Browser-side: collect internal nav/footer/in-page links + readable content. */
function readPage(): { links: string[]; title: string; content: string } {
  const links = [...document.querySelectorAll("a[href], adgm-navigation-item[href]")]
    .map((a) => a.getAttribute("href") || "")
    .filter((h) => h.startsWith("/") || h.startsWith("https://www.adgm.com"));

  // Strip chrome, then read the remaining text.
  const clone = document.body.cloneNode(true) as HTMLElement;
  clone
    .querySelectorAll(
      "adgm-navigation, adgm-footer, adgm-breadcrumbs, adgm-breadcrumb, script, style, nav, header, footer",
    )
    .forEach((el) => el.remove());
  const content = (clone.innerText || "").replace(/\n{3,}/g, "\n\n").replace(/[ \t]+/g, " ").trim();
  const title = document.title.replace(/\s*\|\s*ADGM.*$/i, "").trim() || document.title;
  return { links, title, content };
}

export const pagesAdapter: SourceAdapter = {
  sourceId: "pages",
  label: "ADGM Site Content Pages",

  async crawl({ context, log, limit, checkpoint, existingRaw, force }: CrawlContext): Promise<RawRecord[]> {
    const cap = limit || MAX_PAGES;
    const page = await context.newPage();
    const records: RawRecord[] = [];
    const seen = new Set<string>();
    const queue: string[] = [SEED];
    seen.add("/");

    try {
      while (queue.length > 0 && records.length < cap) {
        const url = queue.shift()!;
        const pathOnly = new URL(url, ORIGIN).pathname;

        // Resume: reuse stored content, but still expand the BFS frontier from
        // the page's previously-discovered links (else the crawl can't grow).
        const prior = existingRaw.get(pathOnly);
        if (!force && prior) {
          records.push(prior);
          for (const href of (prior.data.links as string[] | undefined) ?? []) {
            const pp = new URL(href, ORIGIN).pathname;
            if (!seen.has(pp) && isContentPath(pp)) {
              seen.add(pp);
              queue.push(`${ORIGIN}${pp}`);
            }
          }
          continue;
        }

        try {
          await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
          await page.waitForTimeout(1200);
          const { links, title, content } = await page.evaluate(readPage);

          if (content.length > 200) {
            records.push({
              sourceId: "pages",
              id: pathOnly,
              url: new URL(url, ORIGIN).href,
              // Persist discovered links so a resumed run can re-expand the frontier.
              data: { title, content, links },
              crawledAt: new Date().toISOString(),
            });
            if (records.length % 10 === 0) {
              log.info(`crawled ${records.length}/${cap} pages`);
              await checkpoint(records);
            }
          }

          // Enqueue newly-discovered internal content links.
          for (const href of links) {
            const p = new URL(href, ORIGIN).pathname;
            if (!seen.has(p) && isContentPath(p)) {
              seen.add(p);
              queue.push(`${ORIGIN}${p}`);
            }
          }
        } catch (err) {
          log.warn(`page failed ${pathOnly}: ${(err as Error).message}`);
        }
        await politeDelay();
      }
      log.success(`captured ${records.length} content pages`);
      return records;
    } finally {
      await page.close();
    }
  },

  normalize(raw: RawRecord[]): NormalizedRecord[] {
    return raw.map((r) => {
      const d = r.data as { title: string; content: string };
      return {
        uid: `pages:${r.id}`,
        sourceId: "pages",
        contentType: "page",
        sourceNativeId: r.id,
        url: r.url,
        title: d.title,
        summary: d.content.slice(0, 180).replace(/\s+/g, " ").trim(),
        body: `${d.title}\n\n${d.content}`,
        fields: { path: r.id },
        crawledAt: r.crawledAt,
      };
    });
  },
};
