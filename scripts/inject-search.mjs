/**
 * Inject the POC enhancements into the cloned ADGM homepage:
 *   - the self-contained hero slider (clone-hero-fix.html), which replaces the
 *     flaky <adgm-hero> web-component so two images always show (no blue flash),
 *   - the interactive demo cards (clone-demo-cards.html) shown beneath the hero,
 *     each linking to /search?q=… to showcase the AI search, and
 *   - the search overlay (clone-search-inject.html).
 * Idempotent: each block is wrapped in marker comments and replaced in place on
 * re-runs. Run standalone or via the mirror script.
 *
 * Run: node scripts/inject-search.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const INDEX = path.join(ROOT, "public", "adgm-clone", "index.html");

// Each block: snippet file + the marker comments that bound it in the HTML.
const BLOCKS = [
  {
    file: "clone-hero-fix.html",
    start: "<!-- POC-HERO-INJECT:start",
    end: "POC-HERO-INJECT:end -->",
  },
  {
    file: "clone-demo-cards.html",
    start: "<!-- POC-DEMO-INJECT:start",
    end: "POC-DEMO-INJECT:end -->",
  },
  {
    file: "clone-search-inject.html",
    start: "<!-- POC-SEARCH-INJECT:start",
    end: "POC-SEARCH-INJECT:end -->",
  },
  {
    file: "clone-searchpage.html",
    start: "<!-- POC-SEARCHPAGE-INJECT:start",
    end: "POC-SEARCHPAGE-INJECT:end -->",
  },
];

export async function injectSearch() {
  let html = await readFile(INDEX, "utf8");

  for (const { file, start, end } of BLOCKS) {
    const snippet = (await readFile(path.join(ROOT, "scripts", file), "utf8")).trim();

    // Drop any prior injection of this block so re-runs don't stack.
    const s = html.indexOf(start);
    const e = html.indexOf(end);
    if (s !== -1 && e !== -1) {
      html = html.slice(0, s) + html.slice(e + end.length);
    }

    if (html.includes("</body>")) {
      html = html.replace("</body>", `${snippet}\n</body>`);
    } else {
      html += `\n${snippet}\n`;
    }
  }

  await writeFile(INDEX, html, "utf8");
  console.log("→ injected POC search overlay + hero slider into", path.relative(ROOT, INDEX));
}

// Run directly when invoked as a script.
if (process.argv[1] && process.argv[1].endsWith("inject-search.mjs")) {
  injectSearch().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
