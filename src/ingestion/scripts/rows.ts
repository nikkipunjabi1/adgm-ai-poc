/**
 * Print the first rows of every <adgm-table> on a page, with cell text + hrefs.
 *   tsx src/ingestion/scripts/rows.ts <url>
 */
import { launchBrowser, newContext } from "../core/browser.js";
import { readAdgmTables } from "../core/dom.js";

const url = process.argv[2]!;
const browser = await launchBrowser();
const context = await newContext(browser);
const page = await context.newPage();

await page.goto(url, { waitUntil: "networkidle" });
await page
  .waitForFunction(() => document.querySelectorAll("adgm-table adgm-table-cell").length > 0, {
    timeout: 20_000,
  })
  .catch(() => console.log("(no adgm-table-cell appeared)"));
await page.waitForTimeout(2000);

const tables = await page.evaluate(readAdgmTables);
tables.forEach((t, i) => {
  console.log(`\n=== TABLE ${i + 1} — headers: ${JSON.stringify(t.headers)} (${t.rows.length} rows) ===`);
  t.rows.slice(0, 10).forEach((r) => console.log("  " + JSON.stringify(r)));
});

await browser.close();
