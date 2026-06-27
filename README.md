# ADGM AI Search — POC

A unified, **generative RAG search** over [ADGM](https://www.adgm.com/) (Abu Dhabi
Global Market) content. One query returns a **grounded answer** plus a
**dynamically-composed layout of typed cards** — firms, funds, individuals, court
cases/hearings/judgments, events, news, and public notices — drawn only from
retrieved data, on **entirely free infrastructure** (the LLM aside).

> ADGM publishes high-value content across siloed, JavaScript-rendered pages with
> no unified search. A user researching a firm can't see, in one place, the firm,
> its people, its funds, related rulings, and recent news. This POC ingests it all
> into one vector store and makes it searchable and connected.

---

## What it does

- **Grounded answers** — hybrid (vector + keyword) retrieval over Supabase
  pgvector, answered by Claude using *only* retrieved records (no hallucinated facts).
- **Typed result cards** — the model composes a layout (firm + connected people +
  funds, court matters, notices, events…) and deep-links each card to the live
  ADGM page (e.g. `…/adgm-courts/cases?q=ADGMCFI-2026-421`).
- **Red alerts** — court matters and public notices connected to a subject are
  flagged as "things to be aware of".
- **Recency-aware** — "latest news", "upcoming hearings", "recent public notices"
  etc. are ordered by date (not just similarity), so the newest records surface.
- **Guided funnel** — a very broad opening query gets one narrowing question; after
  any answer, 2–3 context-aware follow-up questions let the user drill deeper
  (up to 3 levels).
- **Live "thinking" indicator** — a single-line, query-specific status (ChatGPT/
  Gemini style), generated up front by a fast model.
- **ADGM homepage clone** with the search as an **overlay** (⌘K / Esc).

## Stack

| Layer | Choice |
|---|---|
| App | Next.js 15 (App Router) · React 19 · Tailwind 3.4 · Framer Motion · lucide-react |
| LLM | Claude (Sonnet for answers, Haiku for step labels) via forced tool use |
| Embeddings | Local Transformers.js — `Xenova/all-MiniLM-L6-v2` (384-dim), zero cost |
| Vector store | Supabase Postgres + pgvector + tsvector (hybrid `match_documents` RPC) |
| Ingestion | Playwright headless crawler (driving ADGM's `<adgm-*>` web components) |

## Getting started

```bash
npm install
cp .env.example .env       # fill in ANTHROPIC_API_KEY + Supabase keys
npm run dev                # http://localhost:3000
```

The normalized dataset (`data/normalized/*.json`, ~8.5k linked records) is
committed, so the search app runs without re-crawling — you only need to embed +
upload it once (see below).

### One-time Supabase setup

1. Run [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL Editor
   (creates the `documents` table with `vector(384)` + fts, and the
   `match_documents` / `get_documents` functions).
2. Embed and upload the normalized data:
   ```bash
   npx tsx src/ingestion/embed-upload.ts
   ```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Run the Next.js app |
| `npm run build` / `start` | Production build / serve |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run ingest` | Re-run the crawler (Playwright) |
| `npm run extract-pdfs` | Extract text from document-repository PDFs |
| `npx tsx src/ingestion/embed-upload.ts` | Embed normalized data → Supabase |

## Project layout

```
app/                      Next.js routes (homepage clone, /search, /api/search)
components/
  home/  site/            ADGM homepage shell (header, hero, grids, footer)
  search/                 search overlay, experience, cards, thinking indicator
lib/
  search.ts               retrieval: hybrid match + recency + relationship expand
  llm.ts                  Claude calls (answer/cards/alerts/follow-ups, steps)
  embeddings.ts           local Transformers.js embeddings
  supabase.ts             server client
src/ingestion/            Playwright crawler, adapters, embed/upload, PDF extract
supabase/schema.sql       documents table + match_documents / get_documents
data/normalized/          crawled + linked records (committed; source of truth)
```

## How retrieval works

1. The query is embedded locally (Transformers.js).
2. `match_documents` returns a hybrid-ranked set (0.7 cosine + 0.3 `ts_rank`).
3. **Recency / listing queries** ("latest judgments", "upcoming hearings") bypass
   similarity and fetch the newest records of the detected type, ordered by date.
4. One hop of relationships is expanded (`get_documents`) so a firm result carries
   its people/funds, a case carries its hearings/judgments, etc.
5. Claude composes the answer + card layout + alerts + follow-ups (forced tool call).

## Notes

- `.env` and large/regenerable artifacts (`data/raw`, `data/pdfs`, logs,
  `node_modules`) are git-ignored. The normalized JSON is kept so the app is
  runnable out of the box.
- Court records (cases / hearings / judgments) share `content_type: "court"` and
  are distinguished by `source_id`.

This is a stakeholder-demo POC — see [`BRAINSTORM.md`](BRAINSTORM.md) for the
original problem framing and decisions.
