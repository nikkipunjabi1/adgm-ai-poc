/**
 * Shared types for the ingestion pipeline.
 *
 * Every source adapter crawls a website into `RawRecord`s (verbatim, untouched)
 * and normalizes them into `NormalizedRecord`s (the common shape the search app
 * and embeddings consume). Keeping the two separate lets us re-normalize without
 * re-crawling.
 */

/** The card / content types the search UI knows how to render. */
export type ContentType =
  | "firm"
  | "fund"
  | "person"
  | "court"
  | "event"
  | "news"
  | "notice"
  | "document" // standalone PDF with no parent
  | "page"; // general ADGM site content page (background knowledge)

/** A source category — maps 1:1 to an adapter. */
export type SourceId =
  | "firms"
  | "individuals"
  | "funds"
  | "cases"
  | "hearings"
  | "judgments"
  | "events"
  | "news"
  | "panelists"
  | "notices"
  | "documents"
  | "pages";

/**
 * Raw record: exactly what the adapter scraped, before normalization.
 * `sourceId` + `id` together are the stable key used for idempotent upserts.
 */
export interface RawRecord {
  /** Which adapter produced this. */
  sourceId: SourceId;
  /** Stable, source-native identifier (FSP number, case number, URL slug, …). */
  id: string;
  /** Canonical URL this record was scraped from. */
  url: string;
  /** Verbatim scraped fields — adapter-specific shape. */
  data: Record<string, unknown>;
  /** ISO timestamp of when it was crawled. */
  crawledAt: string;
}

/** A PDF discovered while crawling, linked back to its parent record. */
export interface PdfRef {
  url: string; // assets.adgm.com/...
  label?: string; // anchor text, if any
}

/**
 * Normalized record: the common shape across all sources. This is what gets
 * chunked, embedded, and rendered as a card.
 */
export interface NormalizedRecord {
  /** Globally unique id: `${sourceId}:${id}`. */
  uid: string;
  sourceId: SourceId;
  contentType: ContentType;
  /** Source-native id (without the sourceId prefix). */
  sourceNativeId: string;
  url: string;
  title: string;
  /** Short human summary / subtitle for the card. */
  summary?: string;
  /** Full text used for embedding + full-text search. */
  body: string;
  /** ISO date most relevant to this record (published, commenced, event date…). */
  date?: string;
  /** Type-specific structured fields rendered on the card. */
  fields: Record<string, unknown>;
  /** Relationships to other records, by uid, for graph-aware layouts. */
  relations?: {
    /** e.g. an individual/fund → its firm; a hearing/judgment → its case. */
    parentUid?: string;
    /** Free-form related uids (panel members, related news, …). */
    relatedUids?: string[];
  };
  /** PDFs attached to this record (fetched + parsed separately). */
  pdfs?: PdfRef[];
  crawledAt: string;
}
