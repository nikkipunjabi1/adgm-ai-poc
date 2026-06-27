# ADGM AI Search — POC Brainstorm & Brief

> Status: **Pre-development brainstorm.** This document captures the problem,
> decisions, and proposed architecture agreed before any code is written.
> Last updated: 2026-06-26

---

## 1. Problem Statement

ADGM (Abu Dhabi Global Market) publishes high-value content across **separate,
siloed, mostly JavaScript-rendered pages** with no unified search:

- Licensed financial-service firms, their individuals, and managed funds
- Court cases, hearings, and judgements
- Events, news/announcements, public notices
- Dispute-resolution panelists
- Hundreds of PDF documents hosted in a separate DAM (`assets.adgm.com`)

A user researching, for example, a fintech firm cannot in one place see the
firm, its people, its funds, related court rulings, and recent news. The
content is also **hard to ingest programmatically**: data is loaded dynamically
via JavaScript/AJAX, pagination has no stable URL, and PDFs live in a separate
asset domain.

**Goal:** Build a unified, intelligent search that ingests all ADGM content into
one searchable store and returns:

1. A **generative, grounded answer** (vector RAG), and
2. A **dynamically-composed layout of typed cards** (firm / person / court /
   event / news / notice) drawn **only** from retrieved data.

For a compelling **stakeholder demo**, on **entirely free infrastructure**,
hostable on **any free platform**.

---

## 2. Key Findings (from inspecting live pages)

Inspection of the live ADGM pages confirmed:

| Page | Rendering | Implication |
|------|-----------|-------------|
| Business areas (e.g. Banking/Money Services) | **Static HTML** | Easy crawl; carries `assets.adgm.com` PDF links |
| FSRA Firms register | **JS/AJAX** — static HTML shows "1-0 of 0 results" | Must render in a headless browser |
| Court Cases / Hearings / Judgements | Dynamic columns populate after load | Headless browser |
| Announcements / News | JS-filtered — "No Announcements Found" in static HTML | Headless browser |

**Most sources do not put data in the initial HTML** — it is fetched by
JavaScript after page load. The "pagination has no URL" issue is a symptom: page
navigation is an AJAX call, not a navigable link.

**Decision:** Use a **headless-browser crawl** (render the page, drive
pagination via DOM interaction, read the rendered DOM). We are **not** relying
on a backend JSON API.

---

## 3. Decisions Locked

| # | Decision | Choice |
|---|----------|--------|
| 1 | POC goal | **Stakeholder demo / buy-in** (polish + "wow" of generative cards) |
| 2 | Data sources | All ADGM sources below, real crawled data (no curated seed) |
| 3 | Layout logic | **LLM-driven** — model picks which card types to show and their order |
| 4 | Ingestion method | **Headless-browser crawl** (no backend JSON API) |
| 5 | Generation LLM | **Both Gemini and Claude**, switchable via env var |
| 6 | Embeddings | **Local, free** model at ingest time (no API cost) |
| 7 | Vector store | **Supabase** free tier (pgvector) |
| 8 | Raw data store | **JSON files** (portable, diffable, re-normalizable) |
| 9 | Hosting | **Standard Next.js**, portable to any free host (Vercel/Netlify/Cloudflare/Render) |
| 10 | Cost target | **$0** — LLM runs on a free tier (Gemini) by default |

---

## 4. Data Sources & Scope

| Category | Count | URL | Notes |
|----------|------:|-----|-------|
| Financial Service Firms | 400 | https://www.adgm.com/public-registers/fsra/firms | |
| Firm — Individuals | 500 | https://www.adgm.com/public-registers/fsra/individuals | Associated with Firms |
| Firm — Funds | 200 | https://www.adgm.com/public-registers/fsra/funds | Associated with Firms |
| Court Cases | 200 | https://www.adgm.com/adgm-courts/cases | |
| Court Hearings | 200 | https://www.adgm.com/adgm-courts/hearings | Belong to Cases |
| Court Judgements | 200 | https://www.adgm.com/adgm-courts/judgments | Belong to Cases |
| Events | 100 | https://www.adgm.com/events | |
| News Articles | 300 | https://www.adgm.com/media/announcements | |
| Panelists | 200 | https://disputeresolution.adgm.com/why-adgm/panels | **Different subdomain** |
| Public Notices | 200 | https://www.adgm.com/registration-authority/public-notices | |
| PDFs | 500 | `assets.adgm.com` | Fetched while crawling other pages |
| **Total** | **~3000** | | + 500 PDFs |

**Note:** Panelists live on a separate subdomain (`disputeresolution.adgm.com`) —
the crawler must allow that host.

---

## 5. The Data Is a Graph, Not a Flat List

Relationships are a key asset for the generative-UI demo:

```
Firm ─┬─ Individuals   (people at the firm)
      └─ Funds         (managed by the firm)

Court Case ─┬─ Hearings
            └─ Judgements ── PDF

Panel ── Panelists      (dispute-resolution panel members)

Public Notice ── PDF
News / Event ── (may carry PDF)
```

Capturing these relationships (foreign keys by source ID) lets the LLM assemble
rich, connected layouts — e.g. *"tell me about Firm X"* renders the firm card +
its people + its funds + related notices. This is the differentiator for the demo.

---

## 6. Card / Content-Type Model

| Card type | Source categories | Notes |
|-----------|-------------------|-------|
| `firm` | Financial Service Firms, Funds | Fund may be a firm subtype or its own card |
| `person` | Firm-Individuals, Panelists | Linked to a firm or a panel |
| `court` | Court Cases, Hearings, Judgements | Grouped under a case; judgement carries PDF |
| `event` | Events | |
| `news` | News Articles | |
| `notice` | Public Notices | May carry PDF |
| *(attachment)* | PDFs | **Child of a parent record — not its own card** |

**PDF rule:** PDFs are linked child source documents (carry `parent_id` +
`parent_type`), not orphan cards. They enrich the parent's retrieval context and
appear as attachments/excerpts on the parent card. Truly standalone PDFs get a
generic `document` type.

---

## 7. Architecture — Two Decoupled Phases

### Phase 1 — Ingestion → JSON store (offline, re-runnable)

```
[Source adapters: headless browser]      [Normalize]         [Store]
 ├─ firms / individuals / funds ─┐
 ├─ cases / hearings / judgments ─┤
 ├─ events / news / notices ──────┼─→ common schema ─→ /data/raw/*.json
 ├─ panelists (other subdomain) ──┤                    /data/normalized/*.json
 └─ PDF fetcher (assets.adgm.com)─┘                          │
                                                              └─→ embed (local) → Supabase pgvector
```

Re-runnability principles:

- **One adapter per source**, each **idempotent** — keyed by stable ID (FSP
  number, case number, URL slug) so re-runs **upsert**, not duplicate.
- **Raw JSON saved separately from normalized JSON** — re-normalize without re-crawling.
- **PDFs as linked children** — fetched when a crawled page links to `assets.adgm.com`.
- **Single CLI entry point**, e.g. `ingest --source firms` / `ingest --all` —
  re-run one source or everything, on demand.
- **Manifest/log** of what was fetched and when, to support incremental re-runs.
- This phase **runs locally**, never on the host — so crawl time and serverless
  timeouts are non-issues.

### Phase 2 — Search app (hosted)

```
Query
 → Query understanding (LLM): intent + entities + relevant content types
 → Hybrid retrieval (Supabase): pgvector similarity + full-text (tsvector)
 → (optional) re-rank
 → Generation (LLM): streamed grounded answer + layout spec JSON
 → Frontend: render answer + typed cards in the LLM-chosen order
```

**Layout spec** (the heart of the demo) — model emits structured JSON; frontend
maps each section to a React card component:

```json
{
  "answer": "ADGM has 40+ licensed fund managers...",
  "sections": [
    { "type": "firm",  "title": "Licensed firms", "ids": ["f_12","f_88"], "emphasis": "primary" },
    { "type": "court", "title": "Related rulings", "ids": ["c_4"] },
    { "type": "news",  "title": "Recent news",     "ids": ["n_2"] }
  ]
}
```

**Hard correctness rule:** Cards are populated **only** from retrieved rows. The
LLM chooses *which* `ids` and *how to lay them out* — it **never invents card
content**. This keeps generative UI honest and grounded.

---

## 8. The "All Free" Stack

| Layer | Free choice | Notes |
|-------|-------------|-------|
| Crawling | **Playwright / Crawl4AI** (headless) | Free; handles JS-rendered pages + pagination |
| PDF parsing | **Docling** or **pypdf** | Free; Tesseract OCR only if PDFs are scanned |
| Raw store | **JSON files** | Portable, diffable |
| Embeddings | **Local model** (`bge-small` / `gte-small`, 384-dim) at ingest | **Zero API cost**; ~90MB for ~60k vectors → fits free tier |
| Vector DB | **Supabase free tier** (pgvector + tsvector) | 500MB; fits with small embeddings |
| Generation LLM | **Gemini Flash (free tier)** default; **Claude** via env switch | The one component that uses an external API |
| Frontend / host | **Standard Next.js** on any free host | Vercel / Netlify / Cloudflare Pages / Render |

**Provider abstraction:**

```
LLM_PROVIDER=gemini        # or "claude"
GEMINI_API_KEY=...
ANTHROPIC_API_KEY=...
```

A single `generate()` interface with two adapters; flip provider without
touching app code. Embeddings stay fully local/free (no provider switch).

**Host-agnostic guardrail:** keep it a standard Next.js app — avoid host-locked
features (e.g. Vercel-only cron/edge specifics). Ingestion re-runs are triggered
manually via local CLI, not a hosted cron.

---

## 9. Demo-Specific Considerations

- **Latency theater:** stream the text answer immediately; let cards pop in after.
- **Golden queries:** curate 5–6 queries that hit good data across multiple card
  types (e.g. *"fintech firms in ADGM and recent rulings"* → firms + court + news).
- **Graceful weak/empty results:** design an intentional "here's what I found" state.
- **Visual polish carries the demo** more than retrieval recall at this stage.

---

## 10. Open Items / Risks

| Item | Risk | Mitigation |
|------|------|------------|
| Headless crawl of dynamic pagination | Brittle if DOM changes; slow | Idempotent adapters; raw snapshots; re-runnable |
| Scanned vs born-digital PDFs | Scanned PDFs need OCR | Spot-check a few judgement PDFs early; add Tesseract only if needed |
| Supabase free-tier 500MB | Could overflow with large PDFs chunked | Small (384-dim) embeddings; cap PDF chunking; monitor |
| Panelists on separate subdomain | Crawler scope | Allow `disputeresolution.adgm.com` host |
| Free LLM rate limits (Gemini) | Demo throttling | Cache golden-query results; Claude key as fallback |
| Crawl politeness / blocking | IP throttling | Rate-limit, respect robots, realistic delays |

---

## 11. Suggested Build Order (for when development starts)

1. **Schema + Supabase setup** — `documents` table, pgvector, `tsvector`,
   hybrid-search SQL function; relationship fields in `metadata` JSONB.
2. **Ingestion framework** — CLI, adapter interface, raw/normalized JSON layout,
   manifest/log, idempotent upsert.
3. **Source adapters** (headless) — firms → individuals → funds → courts →
   news/events/notices → panelists; then **PDF fetcher** for `assets.adgm.com`.
4. **Embedding + load step** — local embeddings → Supabase.
5. **Search API route** — query understanding → hybrid retrieval → LLM layout
   spec (streamed); provider abstraction (Gemini/Claude).
6. **Frontend** — search bar, streamed answer, the typed card components,
   generative section rendering.
7. **Polish + golden queries** — styling, loading states, demo script.

---

## 12. Glossary

- **ADGM** — Abu Dhabi Global Market (financial free zone).
- **FSRA** — Financial Services Regulatory Authority (ADGM's regulator).
- **FSP** — Financial Services Permission (firm identifier on the register).
- **RAG** — Retrieval-Augmented Generation.
- **Generative UI** — LLM emits a structured layout the frontend renders as components.
