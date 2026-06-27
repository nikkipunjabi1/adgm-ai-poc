/**
 * ADGM Courts: cases, hearings, judgments. All three are list-only (no detail
 * links) and cross-reference each other by Case Number, which is the natural
 * join key resolved in a post-ingestion relation pass.
 *   cases:     https://www.adgm.com/adgm-courts/cases
 *   hearings:  https://www.adgm.com/adgm-courts/hearings
 *   judgments: https://www.adgm.com/adgm-courts/judgments
 */
import { createTableAdapter } from "./table-source.js";
import type { AdgmCell } from "../core/dom.js";
import type { NormalizedRecord, RawRecord } from "../core/types.js";

const cell = (cells: AdgmCell[], i: number) => cells[i]?.text ?? "";

export const casesAdapter = createTableAdapter({
  sourceId: "cases",
  label: "ADGM Courts — Cases",
  listUrl: "https://www.adgm.com/adgm-courts/cases",
  enrich: false,
  rowId: (cells) => cell(cells, 0) || null,
  rowHref: () => null,
  buildData: (cells) => ({
    caseNumber: cell(cells, 0),
    parties: cell(cells, 1),
    dateCommenced: cell(cells, 2),
    hasJudgments: !!cell(cells, 3),
    hasHearings: !!cell(cells, 4),
  }),
  toNormalized: (raw: RawRecord): NormalizedRecord => {
    const d = raw.data as { caseNumber: string; parties: string; dateCommenced: string };
    return {
      uid: `cases:${raw.id}`,
      sourceId: "cases",
      contentType: "court",
      sourceNativeId: raw.id,
      url: raw.url,
      title: `${d.caseNumber} — ${d.parties}`,
      summary: `Case commenced ${d.dateCommenced}`,
      body: [`Case Number: ${d.caseNumber}`, `Parties: ${d.parties}`, `Date Commenced: ${d.dateCommenced}`].join("\n"),
      date: d.dateCommenced || undefined,
      fields: { caseNumber: d.caseNumber, parties: d.parties, dateCommenced: d.dateCommenced, courtType: "case" },
      crawledAt: raw.crawledAt,
    };
  },
});

const CASE_NUM_RE = /ADGMC[A-Z]+-\d{4}-\d+/i;

export const hearingsAdapter = createTableAdapter({
  sourceId: "hearings",
  label: "ADGM Courts — Hearings",
  listUrl: "https://www.adgm.com/adgm-courts/hearings",
  enrich: false,
  // Columns: "Date, time, case number" | Event Type | Parties | Location | Judge.
  // The case number is embedded in the first cell's date/time string.
  rowId: (cells) => cell(cells, 0) || null,
  rowHref: () => null,
  buildData: (cells) => {
    const dateTimeCase = cell(cells, 0);
    const caseNumber = (dateTimeCase.match(CASE_NUM_RE)?.[0] ?? "").toUpperCase();
    const when = dateTimeCase.replace(CASE_NUM_RE, "").trim();
    return {
      caseNumber,
      when,
      eventType: cell(cells, 1),
      parties: cell(cells, 2),
      location: cell(cells, 3),
      judge: cell(cells, 4),
    };
  },
  toNormalized: (raw: RawRecord): NormalizedRecord => {
    const d = raw.data as {
      caseNumber: string;
      when: string;
      eventType: string;
      parties: string;
      location: string;
      judge: string;
    };
    return {
      uid: `hearings:${raw.id}`,
      sourceId: "hearings",
      contentType: "court",
      sourceNativeId: raw.id,
      url: raw.url,
      title: `${d.eventType || "Hearing"} — ${d.caseNumber}`,
      summary: [d.parties, d.when].filter(Boolean).join(" · "),
      body: [
        `Case Number: ${d.caseNumber}`,
        d.eventType ? `Event Type: ${d.eventType}` : "",
        d.parties ? `Parties: ${d.parties}` : "",
        d.when ? `When: ${d.when}` : "",
        d.judge ? `Judge: ${d.judge}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
      date: d.when || undefined,
      fields: {
        caseNumber: d.caseNumber,
        eventType: d.eventType,
        parties: d.parties,
        when: d.when,
        judge: d.judge,
        location: d.location,
        courtType: "hearing",
      },
      crawledAt: raw.crawledAt,
    };
  },
});

export const judgmentsAdapter = createTableAdapter({
  sourceId: "judgments",
  label: "ADGM Courts — Judgments",
  listUrl: "https://www.adgm.com/adgm-courts/judgments",
  enrich: false,
  // Date | Case Number | Case Name | Neutral Citation | Summary. Key on citation+case.
  rowId: (cells) => {
    const cn = cell(cells, 1);
    const cit = cell(cells, 3);
    return cn || cit ? `${cn}|${cit}` : null;
  },
  rowHref: () => null,
  buildData: (cells) => ({
    date: cell(cells, 0),
    caseNumber: cell(cells, 1),
    caseName: cell(cells, 2),
    citation: cell(cells, 3),
    summary: cell(cells, 4),
  }),
  toNormalized: (raw: RawRecord): NormalizedRecord => {
    const d = raw.data as {
      date: string;
      caseNumber: string;
      caseName: string;
      citation: string;
      summary: string;
    };
    return {
      uid: `judgments:${raw.id}`,
      sourceId: "judgments",
      contentType: "court",
      sourceNativeId: raw.id,
      url: raw.url,
      title: `${d.caseName}${d.citation ? ` ${d.citation}` : ""}`,
      summary: [d.citation, d.date].filter(Boolean).join(" · "),
      body: [
        `Case Name: ${d.caseName}`,
        `Case Number: ${d.caseNumber}`,
        d.citation ? `Neutral Citation: ${d.citation}` : "",
        `Date: ${d.date}`,
        d.summary ? `Summary: ${d.summary}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
      date: d.date || undefined,
      fields: {
        caseNumber: d.caseNumber,
        caseName: d.caseName,
        citation: d.citation,
        courtType: "judgment",
      },
      crawledAt: raw.crawledAt,
    };
  },
});
