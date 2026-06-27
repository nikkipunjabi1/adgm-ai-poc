/**
 * Probe the real record count of every source list page, reusing one browser
 * session (polite). Reads <adgm-pagination total-items>, else a "of N results"
 * text, else visible row/card counts. Read-only planning aid.
 */
import { launchBrowser, newContext, politeDelay } from "../core/browser.js";

const SOURCES: { id: string; url: string }[] = [
  { id: "individuals", url: "https://www.adgm.com/public-registers/fsra/individuals" },
  { id: "funds", url: "https://www.adgm.com/public-registers/fsra/funds" },
  { id: "cases", url: "https://www.adgm.com/adgm-courts/cases" },
  { id: "hearings", url: "https://www.adgm.com/adgm-courts/hearings" },
  { id: "judgments", url: "https://www.adgm.com/adgm-courts/judgments" },
  { id: "events", url: "https://www.adgm.com/events" },
  { id: "news", url: "https://www.adgm.com/media/announcements" },
  { id: "panelists", url: "https://disputeresolution.adgm.com/why-adgm/panels" },
  { id: "notices", url: "https://www.adgm.com/registration-authority/public-notices" },
  { id: "documents", url: "https://www.adgm.com/document-repository" },
];

const browser = await launchBrowser();
const context = await newContext(browser);
const page = await context.newPage();

const results: Record<string, unknown>[] = [];
for (const s of SOURCES) {
  try {
    await page.goto(s.url, { waitUntil: "networkidle" });
    await page.waitForTimeout(3500);
    const info = await page.evaluate(() => {
      const p = document.querySelector("adgm-pagination");
      const totalItems = p?.getAttribute("total-items") ?? null;
      const perPage = p?.getAttribute("items-per-page") ?? null;
      const onchange = p?.getAttribute("onchange") ?? null;
      const m = document.body.innerText.match(/of\s+([\d,]+)\s+results?/i);
      const resultsText = m?.[1] ?? null;
      const tableRows = document.querySelectorAll("adgm-table adgm-table-row").length;
      return { totalItems, perPage, onchange, resultsText, tableRows };
    });
    results.push({ id: s.id, ...info });
    console.log(
      `${s.id.padEnd(12)} total=${info.totalItems ?? info.resultsText ?? "?"}  perPage=${info.perPage ?? "?"}  rows=${info.tableRows}  fn=${info.onchange ?? "-"}`,
    );
  } catch (err) {
    console.log(`${s.id.padEnd(12)} ERROR: ${(err as Error).message}`);
    results.push({ id: s.id, error: (err as Error).message });
  }
  await politeDelay();
}

await browser.close();
