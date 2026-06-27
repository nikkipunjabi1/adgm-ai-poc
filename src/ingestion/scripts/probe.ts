/**
 * Dump fully-rendered HTML of a page to data/debug/<name>.html for inspection.
 *   tsx src/ingestion/scripts/probe.ts <url> <name>
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { launchBrowser, newContext } from "../core/browser.js";

const url = process.argv[2] ?? "https://www.adgm.com/public-registers/fsra/firms";
const name = process.argv[3] ?? "firms";

const browser = await launchBrowser();
const context = await newContext(browser);
const page = await context.newPage();

await page.goto(url, { waitUntil: "networkidle" });
await page
  .waitForFunction(
    () => /showing\s+1-\d+\s+of\s+[1-9]/i.test(document.body.innerText),
    { timeout: 20000 },
  )
  .catch(() => console.log("(results-count wait timed out)"));
await page.waitForTimeout(3000);

const html = await page.content();
const dir = path.resolve(process.cwd(), "data", "debug");
await fs.mkdir(dir, { recursive: true });
const file = path.join(dir, `${name}.html`);
await fs.writeFile(file, html, "utf8");
console.log(`Wrote ${html.length} bytes -> ${file}`);

await browser.close();
