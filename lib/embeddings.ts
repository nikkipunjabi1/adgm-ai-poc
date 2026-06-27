/**
 * Local, free text embeddings via Transformers.js (all-MiniLM-L6-v2, 384-dim,
 * mean-pooled + normalized → cosine similarity). The model loads once per
 * process and is cached; used both at ingest (bulk) and at query time.
 */
import { pipeline, type FeatureExtractionPipeline } from "@xenova/transformers";

export const EMBED_DIM = 384;
const MODEL = "Xenova/all-MiniLM-L6-v2";

let extractorPromise: Promise<FeatureExtractionPipeline> | null = null;

function getExtractor(): Promise<FeatureExtractionPipeline> {
  extractorPromise ??= pipeline("feature-extraction", MODEL);
  return extractorPromise;
}

/** Embed a single string into a normalized 384-d vector. */
export async function embed(text: string): Promise<number[]> {
  const extractor = await getExtractor();
  const output = await extractor(text.slice(0, 4000), {
    pooling: "mean",
    normalize: true,
  });
  return Array.from(output.data as Float32Array);
}

/** Embed many strings sequentially (keeps memory flat for large batches). */
export async function embedBatch(texts: string[]): Promise<number[][]> {
  const out: number[][] = [];
  for (const t of texts) out.push(await embed(t));
  return out;
}
