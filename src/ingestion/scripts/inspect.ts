/**
 * Throwaway DOM-inspection helper. NOT part of the pipeline — it just renders a
 * page in a real browser and dumps enough structure to write an adapter against
 * the actual DOM instead of guessing selectors.
 *
 * Usage: npm run inspect -- <url>
 */
import { launchBrowser, newContext } from "../core/browser.js";

const url = process.argv[2] ?? "https://www.adgm.com/public-registers/fsra/firms";

const browser = await launchBrowser();
const context = await newContext(browser);
const page = await context.newPage();

console.log(`\n=== Navigating: ${url}\n`);
await page.goto(url, { waitUntil: "networkidle" });
// Give client-side rendering a beat to populate.
await page.waitForTimeout(4000);

const report = await page.evaluate(() => {
  const out: Record<string, unknown> = {};
  out.title = document.title;
  out.bodyTextLength = document.body.innerText.length;

  // Tables (court lists often render as tables).
  out.tables = [...document.querySelectorAll("table")].map((t) => ({
    headers: [...t.querySelectorAll("th")].map((th) => th.textContent?.trim()),
    rowCount: t.querySelectorAll("tbody tr").length,
    firstRow: [...(t.querySelector("tbody tr")?.querySelectorAll("td") ?? [])].map(
      (td) => td.textContent?.trim(),
    ),
  }));

  // Candidate "card/list item" containers: elements that repeat a lot.
  const tagClassCount = new Map<string, number>();
  document.querySelectorAll("[class]").forEach((el) => {
    const key = `${el.tagName.toLowerCase()}.${(el.getAttribute("class") || "")
      .split(/\s+/)
      .slice(0, 2)
      .join(".")}`;
    tagClassCount.set(key, (tagClassCount.get(key) ?? 0) + 1);
  });
  out.repeatedContainers = [...tagClassCount.entries()]
    .filter(([, n]) => n >= 5 && n <= 60)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 25)
    .map(([sel, n]) => ({ sel, count: n }));

  // Pagination-ish controls.
  out.paginationButtons = [...document.querySelectorAll("button, a")]
    .map((el) => ({
      text: el.textContent?.trim().slice(0, 30),
      cls: el.getAttribute("class")?.slice(0, 60),
      aria: el.getAttribute("aria-label"),
    }))
    .filter(
      (b) =>
        b.text &&
        /next|prev|page|\d+|more|load/i.test(`${b.text} ${b.aria ?? ""}`) &&
        b.text.length < 25,
    )
    .slice(0, 30);

  // PDF links to the asset DAM.
  out.pdfLinks = [...document.querySelectorAll('a[href*="assets.adgm.com"]')]
    .map((a) => (a as HTMLAnchorElement).href)
    .filter((h) => h.toLowerCase().includes(".pdf"))
    .slice(0, 10);

  // Results count text, if present.
  const bodyText = document.body.innerText;
  const m = bodyText.match(/showing[^\n]{0,60}|[\d,]+\s+results?/i);
  out.resultsText = m?.[0];

  return out;
});

console.log(JSON.stringify(report, null, 2));

await browser.close();
