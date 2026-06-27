/**
 * Inject the POC search overlay into the cloned ADGM homepage.
 * Idempotent: replaces any previous injection (between the marker comments)
 * before adding the current one. Run standalone or via the mirror script.
 *
 * Run: node scripts/inject-search.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const INDEX = path.join(ROOT, "public", "adgm-clone", "index.html");
const SNIPPET = path.join(ROOT, "scripts", "clone-search-inject.html");

const START = "<!-- POC-SEARCH-INJECT:start";
const END = "POC-SEARCH-INJECT:end -->";

export async function injectSearch() {
  let html = await readFile(INDEX, "utf8");
  const snippet = (await readFile(SNIPPET, "utf8")).trim();

  // Drop any prior injection so re-runs don't stack.
  const s = html.indexOf(START);
  const e = html.indexOf(END);
  if (s !== -1 && e !== -1) {
    html = html.slice(0, s) + html.slice(e + END.length);
  }

  if (html.includes("</body>")) {
    html = html.replace("</body>", `${snippet}\n</body>`);
  } else {
    html += `\n${snippet}\n`;
  }

  await writeFile(INDEX, html, "utf8");
  console.log("→ injected POC search overlay into", path.relative(ROOT, INDEX));
}

// Run directly when invoked as a script.
if (process.argv[1] && process.argv[1].endsWith("inject-search.mjs")) {
  injectSearch().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
