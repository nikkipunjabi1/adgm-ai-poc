/**
 * Mirror the ADGM FSRA Public Register page into the clone, then inject the
 * working POC register explorer in place of the (offline-dead) live widget.
 *
 *   public/adgm-clone/public-registers/fsra.html  ← served at /public-registers/fsra
 *   (and /firms, /individuals, /funds via next.config.mjs rewrites)
 *
 * Run: node scripts/mirror-fsra.mjs   (or: npm run mirror:fsra)
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mirrorPage } from "./mirror-adgm.mjs";
import { injectRegister, FSRA_HTML } from "./inject-register.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function main() {
  await mirrorPage("https://www.adgm.com/public-registers/fsra", FSRA_HTML);
  await injectRegister();
  console.log("done.", path.relative(ROOT, FSRA_HTML));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
