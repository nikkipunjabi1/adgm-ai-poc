/**
 * Inject the POC ADGM Courts explorer into the cloned courts page
 * (public/adgm-clone/adgm-courts/cases.html — one shell serves cases/hearings/
 * judgments). Idempotent. Run standalone or via mirror-courts.mjs.
 *
 * Run: node scripts/inject-courts.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const COURTS_HTML = path.join(ROOT, "public", "adgm-clone", "adgm-courts", "cases.html");
const SNIPPET = path.join(ROOT, "scripts", "clone-courts-inject.html");

const START = "<!-- POC-COURTS-INJECT:start";
const END = "POC-COURTS-INJECT:end -->";

export async function injectCourts() {
  let html = await readFile(COURTS_HTML, "utf8");
  const snippet = (await readFile(SNIPPET, "utf8")).trim();

  const s = html.indexOf(START);
  const e = html.indexOf(END);
  if (s !== -1 && e !== -1) html = html.slice(0, s) + html.slice(e + END.length);

  if (html.includes("</body>")) html = html.replace("</body>", `${snippet}\n</body>`);
  else html += `\n${snippet}\n`;

  await writeFile(COURTS_HTML, html, "utf8");
  console.log("→ injected POC courts explorer into", path.relative(ROOT, COURTS_HTML));
}

if (process.argv[1] && process.argv[1].endsWith("inject-courts.mjs")) {
  injectCourts().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
