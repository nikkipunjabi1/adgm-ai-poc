/**
 * Inject the POC FSRA Register explorer into the cloned register page
 * (public/adgm-clone/public-registers/fsra.html). Idempotent: replaces any prior
 * injection between the marker comments. Run standalone or via mirror-fsra.mjs.
 *
 * Run: node scripts/inject-register.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const FSRA_HTML = path.join(ROOT, "public", "adgm-clone", "public-registers", "fsra.html");
const SNIPPET = path.join(ROOT, "scripts", "clone-register-inject.html");

const START = "<!-- POC-REGISTER-INJECT:start";
const END = "POC-REGISTER-INJECT:end -->";

export async function injectRegister() {
  let html = await readFile(FSRA_HTML, "utf8");
  const snippet = (await readFile(SNIPPET, "utf8")).trim();

  const s = html.indexOf(START);
  const e = html.indexOf(END);
  if (s !== -1 && e !== -1) html = html.slice(0, s) + html.slice(e + END.length);

  if (html.includes("</body>")) html = html.replace("</body>", `${snippet}\n</body>`);
  else html += `\n${snippet}\n`;

  await writeFile(FSRA_HTML, html, "utf8");
  console.log("→ injected POC register explorer into", path.relative(ROOT, FSRA_HTML));
}

if (process.argv[1] && process.argv[1].endsWith("inject-register.mjs")) {
  injectRegister().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
