# CLAUDE.md

Guidance for AI agents working in this repo. See `README.md` for the full
overview; this file captures the non-obvious conventions.

## What this is

A POC: generative RAG search over ADGM content. Next.js 15 app + Supabase
pgvector + local embeddings + Claude. The crawled dataset is already ingested;
most work is on the **search experience**, not the crawler.

## Commands

- `npm run dev` — run the app (port 3000)
- `npm run typecheck` — **run this after any TS change** (`tsc --noEmit`)
- `npm run build` — production build
- Re-ingest is rarely needed: `npm run ingest`, then `npx tsx src/ingestion/embed-upload.ts`

## Architecture (where things live)

- **Retrieval** — `lib/search.ts`. `retrieve()` does hybrid match → recency/listing
  override → one-hop relationship expansion. `toContext()` shrinks records for the prompt.
- **Generation** — `lib/llm.ts`. `generateSearch()` returns a structured
  `SearchResponse` via a **forced tool call** (`present_results`).
  `generateThinkingSteps()` uses a fast model for the status-line labels.
- **API** — `app/api/search/route.ts`. Streams NDJSON: `steps` → `meta` (internal) →
  `result`. Node runtime (Transformers.js needs it).
- **UI** — `components/search/`: `search-experience.tsx` (state + stream),
  `cards.tsx` (typed cards + deep links), `thinking.tsx`, `search-overlay.tsx`.

## Conventions & gotchas

- **Court subtypes**: cases, hearings, and judgments all have
  `content_type: "court"`. Distinguish them by `source_id`
  (`cases` / `hearings` / `judgments`) or `fields.courtType`. Hearings have **no
  `date` column** — their date is in `fields.when`.
- **Card deep links** (`cards.tsx` → `deepLink()`): link to the live ADGM page with
  the site's `?q=` param. Hearings need the **full** param set
  (`categoryfilter=Upcoming+hearings&psize=10&q=…&sortby=date%23asc`) or the page
  won't filter. Notice `?q=` values contain `/` → must be URL-encoded (`%2F`).
- **Recency**: generic "latest/upcoming \<type\>" queries must order by **date**, not
  similarity (vector top-K can't surface the newest). See `detectType()` /
  `recentByDate()` in `lib/search.ts`.
- **Guided flow**: broad opening query → one `clarify` question; otherwise always
  `answer` + post-answer follow-ups. Hard cap at 3 refinements. Do **not** show
  internal step counts or "step N of 3" to users.
- **Thinking labels**: short, clean, query-specific status phrases (like Claude/
  ChatGPT) — never raw chain-of-thought, never end-truncated.
- **Embeddings are 384-dim** (`all-MiniLM-L6-v2`). The Supabase `vector(384)` column
  must match — don't swap the model without updating the schema.
- **Animations** must be transform-only (never animate opacity to 0 on content),
  so nothing is invisible if an animation pauses in a background tab.
- **Grounding**: every card uid must come from retrieved records; never invent facts.

## Don't

- Don't commit `.env` or anything under `data/raw`, `data/pdfs`, or `data/*.log`.
- Don't add new crawler/CLI tooling — the existing ingestion is "good enough".
