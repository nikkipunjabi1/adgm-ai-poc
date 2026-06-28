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

## Routes

| Route | What it is |
|---|---|
| `/` | **Exact mirror** of the live adgm.com homepage — a self-contained offline snapshot (HTML + all CSS/JS/images/fonts under `public/adgm-clone/`). Served via a Next.js rewrite. Its **search icon (and ⌘K) open the POC search** in an overlay. |
| `/demo` | The **same clone**, plus an interactive **demo-cards** strip beneath the hero (capability showcase whose cards open `/search?q=…`). Use this surface for demos; `/` stays pristine. |
| `/public-registers/fsra` (+ `/firms`, `/individuals`, `/funds`) | **Cloned FSRA Public Register** whose dead register widget is replaced by a working, AI-powered explorer over our firms/individuals/funds data — tabbed, with classic keyword **and** semantic (AI) search; results deep-link to the live ADGM detail pages. |
| `/embed/register` · `/api/register` | Chromeless register explorer (embedded inline by the FSRA clone) + its data endpoint. |
| `/adgm-courts/cases` (+ `/hearings`, `/judgments`) | **Cloned ADGM Courts** pages; the dead listing widget is replaced by a tabbed explorer over our cases/hearings/judgments data (classic + AI search), each card deep-linking to the filtered ADGM page. |
| `/embed/courts` · `/api/courts` | Chromeless courts explorer (embedded inline by the courts clones) + its data endpoint. |
| `/v1` | The **POC homepage** (ADGM-styled shell) with the AI search overlay (⌘K / Esc). |
| `/search` | Full-page search experience. |
| `/embed/search` | Chromeless search, embedded by the `/` clone via an `<iframe>`. |
| `/api/search` | Streaming NDJSON search endpoint. |
| `/api/suggestions` | Auto-updating suggested questions — derived from the week's most-asked queries (logged to `search_queries`), AI-polished by Claude; `?refresh=1` re-derives live (the UI **Regenerate** button). `DELETE` clears the log (the **Reset** button), gated by `SUGGESTIONS_RESET_TOKEN`. |

### Re-mirroring the homepage

```bash
npm run mirror         # re-renders adgm.com (homepage) and refreshes public/adgm-clone
npm run mirror:fsra    # re-renders the FSRA Public Register page + injects the AI explorer
npm run mirror:courts  # re-renders the ADGM Courts page + injects the AI explorer
```

The mirror keeps the page's scripts so its custom web components hydrate and style
themselves; third-party widgets (chat, analytics) are stripped or fail silently
offline. Root-relative asset paths the JS requests at runtime fall back to the
clone folder via rewrites in `next.config.mjs`.

After mirroring, `scripts/inject-search.mjs` injects two self-contained blocks
into the snapshot (idempotent, marker-bounded; the mirror runs it automatically,
or re-run standalone with `node scripts/inject-search.mjs`):

- **Search overlay** (`clone-search-inject.html`) — clicking the homepage's
  `search-button` (or ⌘K) opens an `<iframe>` of `/embed/search`, so the real POC
  search works directly from the `/` clone.
- **Hero slider** (`clone-hero-fix.html`) — the live hero is a lit web component
  (`<adgm-hero>`) that hydrates slowly offline, so the raw snapshot flashed a blue
  background and briefly stacked both slides. We hide it and render a lightweight
  crossfade slider built from the same slide data, so the two hero images always
  show with no flash (auto-rotates every 5s; clickable dots).
- **Demo cards** (`clone-demo-cards.html`) — an interactive strip beneath the hero
  showcasing the POC's capabilities (disambiguation, firm + connections, court
  matters, risk alerts, guided answers, events). Each card links to
  `/search?q=…`, which auto-runs the query — a quick way to demo the search. The
  block is **path-gated**: it renders only on **`/demo`** (or when `?demo` is in
  the URL), so the plain `/` clone stays pristine.

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
