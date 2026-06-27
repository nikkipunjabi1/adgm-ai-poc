import { retrieve, toContext, type SearchRecord } from "@/lib/search";
import { generateSearch, generateThinkingSteps } from "@/lib/llm";

// Transformers.js (query embedding) needs the Node runtime, not Edge.
export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Streams newline-delimited JSON events:
 *   {type:"steps", steps}                        ← short, clean, query-specific
 *                                                  status phrases (Haiku-generated)
 *   {type:"meta", retrieved, primary, related}   ← internal counts (not shown)
 *   {type:"result", ...SearchResponse, records}  ← final payload
 *   {type:"error", error}
 */
export async function POST(req: Request) {
  const { query, selections } = (await req.json()) as {
    query?: string;
    selections?: string[];
  };

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const enc = new TextEncoder();
      const send = (obj: unknown) => controller.enqueue(enc.encode(JSON.stringify(obj) + "\n"));

      try {
        if (!query || !query.trim()) {
          send({ type: "error", error: "Empty query" });
          return;
        }

        const effectiveQuery = selections?.length
          ? `${query} — ${selections.join("; ")}`
          : query;

        // Generate the short status phrases in parallel with retrieval, and
        // stream them the moment they're ready (≈ instant with the fast model).
        const stepsPromise = generateThinkingSteps(query, selections)
          .then((steps) => send({ type: "steps", steps }))
          .catch(() => {});

        const { primary, related } = await retrieve(effectiveQuery, { count: 16 });
        const relatedCount = Object.keys(related).length;
        send({
          type: "meta",
          retrieved: primary.length + relatedCount,
          primary: primary.length,
          related: relatedCount,
        });

        const llm = await generateSearch({
          query,
          selections,
          primary: primary.map(toContext),
          related: Object.values(related).map(toContext),
        });
        await stepsPromise;

        const records: Record<string, SearchRecord> = {};
        for (const r of [...primary, ...Object.values(related)]) records[r.uid] = r;

        send({ type: "result", ...llm, records });
      } catch (err) {
        console.error("search error:", err);
        send({ type: "error", error: err instanceof Error ? err.message : "Search failed" });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "application/x-ndjson; charset=utf-8",
      "cache-control": "no-cache, no-transform",
    },
  });
}
