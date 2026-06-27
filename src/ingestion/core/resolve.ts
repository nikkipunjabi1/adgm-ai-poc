/**
 * Relation resolver — a post-ingestion pass that links records across sources
 * into a graph, using natural keys captured during crawling:
 *
 *   funds        → firm   (by Fund Manager name)
 *   individuals  → firm   (by firm name / FSP from the firm href)
 *   hearings     → case   (by Case Number)
 *   judgments    → case   (by Case Number)
 *   documents    → case/judgment (by Case Number found in the document title)
 *
 * Reverse links are added too (firm → its individuals/funds, case → its
 * hearings/judgments/documents) so the search UI can render either direction.
 *
 * Operates on data/normalized/*.json and writes the augmented records back.
 * Run AFTER crawling (it both reads and writes those files).
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { createLogger } from "./logger.js";
import type { NormalizedRecord } from "./types.js";

const NORM_DIR = path.resolve(process.cwd(), "data", "normalized");

const normName = (s: string): string =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[.,'"()]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const CASE_RE = /ADGMC[A-Z]+-\d{4}-\d+/gi;

function addRelated(rec: NormalizedRecord, uid: string): void {
  if (uid === rec.uid) return;
  rec.relations ??= {};
  rec.relations.relatedUids ??= [];
  if (!rec.relations.relatedUids.includes(uid)) rec.relations.relatedUids.push(uid);
}

export async function resolveRelations(): Promise<void> {
  const log = createLogger("resolve");
  const files = (await fs.readdir(NORM_DIR).catch(() => [])).filter((f) => f.endsWith(".json"));
  if (files.length === 0) {
    log.warn("no normalized data found — crawl first");
    return;
  }

  // Load every source's records.
  const bySource = new Map<string, NormalizedRecord[]>();
  const byUid = new Map<string, NormalizedRecord>();
  for (const f of files) {
    const recs = JSON.parse(await fs.readFile(path.join(NORM_DIR, f), "utf8")) as NormalizedRecord[];
    bySource.set(f.replace(/\.json$/, ""), recs);
    for (const r of recs) byUid.set(r.uid, r);
  }

  // Indexes.
  const firmByName = new Map<string, string>();
  for (const firm of bySource.get("firms") ?? []) firmByName.set(normName(firm.title), firm.uid);

  const caseByNumber = new Map<string, string>();
  for (const c of bySource.get("cases") ?? []) {
    const cn = (c.fields.caseNumber as string) || c.sourceNativeId;
    if (cn) caseByNumber.set(cn.toUpperCase(), c.uid);
  }
  const judgmentByCase = new Map<string, string[]>();
  for (const j of bySource.get("judgments") ?? []) {
    const cn = (j.fields.caseNumber as string)?.toUpperCase();
    if (cn) (judgmentByCase.get(cn) ?? judgmentByCase.set(cn, []).get(cn)!).push(j.uid);
  }

  let fundLinks = 0,
    indLinks = 0,
    courtLinks = 0,
    docLinks = 0;

  // funds → firm
  for (const fund of bySource.get("funds") ?? []) {
    const fm = fund.fields.fundManager as string;
    const firmUid = fm ? firmByName.get(normName(fm)) : undefined;
    if (firmUid) {
      addRelated(fund, firmUid);
      addRelated(byUid.get(firmUid)!, fund.uid);
      fundLinks++;
    }
  }

  // individuals → firm (by name; FSP-based links from the crawler are kept)
  for (const ind of bySource.get("individuals") ?? []) {
    const names = (ind.fields.firmNames as string[]) ?? [];
    for (const name of names) {
      const firmUid = firmByName.get(normName(name));
      if (firmUid) {
        addRelated(ind, firmUid);
        addRelated(byUid.get(firmUid)!, ind.uid);
        indLinks++;
      }
    }
  }

  // hearings & judgments → case
  for (const src of ["hearings", "judgments"]) {
    for (const rec of bySource.get(src) ?? []) {
      const cn = (rec.fields.caseNumber as string)?.toUpperCase();
      const caseUid = cn ? caseByNumber.get(cn) : undefined;
      if (caseUid) {
        rec.relations ??= {};
        rec.relations.parentUid = caseUid;
        addRelated(byUid.get(caseUid)!, rec.uid);
        courtLinks++;
      }
    }
  }

  // documents → case / judgment (case numbers embedded in the title)
  for (const doc of bySource.get("documents") ?? []) {
    const found = new Set((doc.title.match(CASE_RE) ?? []).map((s) => s.toUpperCase()));
    for (const cn of found) {
      const caseUid = caseByNumber.get(cn);
      if (caseUid) {
        addRelated(doc, caseUid);
        addRelated(byUid.get(caseUid)!, doc.uid);
        docLinks++;
      }
      for (const jUid of judgmentByCase.get(cn) ?? []) {
        addRelated(doc, jUid);
        addRelated(byUid.get(jUid)!, doc.uid);
      }
    }
  }

  // Write everything back.
  for (const [src, recs] of bySource) {
    await fs.writeFile(path.join(NORM_DIR, `${src}.json`), JSON.stringify(recs, null, 2) + "\n", "utf8");
  }
  log.success(
    `linked — funds→firm ${fundLinks}, individuals→firm ${indLinks}, court→case ${courtLinks}, documents ${docLinks}`,
  );
}
