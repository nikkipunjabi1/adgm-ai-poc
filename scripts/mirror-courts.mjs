/**
 * Mirror the ADGM Courts "Cases" page into the clone as a single shell, then
 * inject the working POC courts explorer in place of the offline-dead widget.
 * One shell serves all three court URLs via next.config.mjs rewrites; the
 * injected script sets the active tab + hero title from the path.
 *
 *   public/adgm-clone/adgm-courts/cases.html
 *     ← served at /adgm-courts/cases, /adgm-courts/hearings, /adgm-courts/judgments
 *
 * Run: node scripts/mirror-courts.mjs   (or: npm run mirror:courts)
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mirrorPage } from "./mirror-adgm.mjs";
import { injectCourts, COURTS_HTML } from "./inject-courts.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function main() {
  await mirrorPage("https://www.adgm.com/adgm-courts/cases", COURTS_HTML);
  await injectCourts();
  console.log("done.", path.relative(ROOT, COURTS_HTML));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
