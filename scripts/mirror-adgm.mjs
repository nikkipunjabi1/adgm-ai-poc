/**
 * Mirror the live ADGM homepage into public/adgm-clone as a self-contained,
 * offline static snapshot:
 *  - render the page with a real browser (it is JS-heavy / web-component based)
 *  - capture every static asset it loads (css / js / img / font / media)
 *  - save them locally and rewrite all URLs in the HTML + CSS to local paths
 *
 * Run: node scripts/mirror-adgm.mjs
 */
import { chromium } from "playwright";
import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "adgm-clone");
const TARGET = "https://www.adgm.com/";
const ORIGIN_HOST = "www.adgm.com";

const SAVE_TYPES = new Set(["stylesheet", "image", "font", "media", "script"]);

/** Local web path (under /adgm-clone) for a captured absolute URL. */
function localWebPath(u) {
  const url = new URL(u);
  let p = url.pathname;
  if (p === "" || p.endsWith("/")) p += "index";
  if (url.search) {
    const h = createHash("md5").update(url.search).digest("hex").slice(0, 8);
    const slash = p.lastIndexOf("/");
    const dot = p.lastIndexOf(".");
    p = dot > slash ? `${p.slice(0, dot)}.${h}${p.slice(dot)}` : `${p}.${h}`;
  }
  return `/adgm-clone/${url.host}${p}`;
}

async function main() {
  const assets = new Map(); // absoluteUrl -> { body, webPath }
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36",
  });

  page.on("response", async (resp) => {
    try {
      const req = resp.request();
      if (!SAVE_TYPES.has(req.resourceType())) return;
      if (!resp.ok()) return;
      const url = resp.url();
      if (url.startsWith("data:") || assets.has(url)) return;
      const body = await resp.body();
      assets.set(url, { body, webPath: localWebPath(url) });
    } catch {
      /* some responses can't be read (redirects, opaque) — skip */
    }
  });

  console.log("→ loading", TARGET);
  await page.goto(TARGET, { waitUntil: "networkidle", timeout: 90000 });

  // Accept cookies so the consent overlay clears and gated assets load.
  for (const sel of [
    'button:has-text("Accept cookies")',
    'button:has-text("Accept all")',
    'text=Accept cookies',
  ]) {
    try {
      await page.click(sel, { timeout: 2000 });
      break;
    } catch {
      /* banner may be absent / shadow-DOM — ignore */
    }
  }
  await page.waitForTimeout(1500);

  // Slowly scroll the whole page so lazy / IntersectionObserver assets
  // (e.g. business-area icons) are requested and captured.
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await sleep(250);
    }
    window.scrollTo(0, document.body.scrollHeight);
    await sleep(1500);
  });
  await page.waitForTimeout(3000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  let html = await page.content();
  await browser.close();
  console.log(`→ captured ${assets.size} assets`);

  // Build URL → local replacements (full, protocol-relative, root-relative).
  const replacements = [];
  for (const [url, { webPath }] of assets) {
    const u = new URL(url);
    replacements.push([url, webPath]);
    replacements.push([`//${u.host}${u.pathname}${u.search}`, webPath]);
    if (u.host === ORIGIN_HOST) {
      replacements.push([`${u.pathname}${u.search}`, webPath]);
      if (u.search) replacements.push([u.pathname, webPath]);
    }
  }
  // longest source first so we don't rewrite a substring of a longer match
  replacements.sort((a, b) => b[0].length - a[0].length);

  const rewrite = (text) => {
    for (const [from, to] of replacements) {
      if (from && text.includes(from)) text = text.split(from).join(to);
    }
    return text;
  };

  // Save assets (rewriting url(...) inside CSS so nested fonts/images resolve).
  for (const [url, { body, webPath }] of assets) {
    const isCss = url.split("?")[0].endsWith(".css") || webPath.endsWith(".css");
    const out = path.join(ROOT, "public", webPath.replace(/^\//, ""));
    await mkdir(path.dirname(out), { recursive: true });
    await writeFile(out, isCss ? Buffer.from(rewrite(body.toString("utf8")), "utf8") : body);
  }

  // Rewrite the HTML. Keep scripts so the custom web components upgrade and apply
  // their (shadow-DOM) styling — without them the page renders unstyled. Strip
  // only SRI/crossorigin that would block the locally-served copies, plus a few
  // pure third-party trackers that just add console noise offline.
  html = rewrite(html);
  html = html.replace(/\sintegrity="[^"]*"/gi, "");
  html = html.replace(/\scrossorigin(="[^"]*")?/gi, "");
  for (const tracker of [
    "www.googletagmanager.com",
    "connect.facebook.net",
    "js.monitor.azure.com",
    "analytics.welcomesoftware.com",
  ]) {
    const re = new RegExp(
      `<script\\b[^>]*\\b(?:src|href)="[^"]*${tracker.replace(/\./g, "\\.")}[^"]*"[^>]*>\\s*</script>`,
      "gi",
    );
    html = html.replace(re, "");
  }
  // a tiny banner comment so it's clear this is the mirrored snapshot
  html = html.replace(/<head>/i, "<head>\n<!-- Mirrored snapshot of www.adgm.com for the ADGM AI Search POC -->");

  await mkdir(OUT, { recursive: true });
  await writeFile(path.join(OUT, "index.html"), html, "utf8");
  console.log("→ wrote", path.join(OUT, "index.html"));
  console.log("done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
