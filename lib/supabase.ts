/**
 * Supabase clients. The secret key is server-only (full access); never import
 * this from a client component. Env is read lazily (at call time) so it works
 * both in Next.js (auto-loaded .env) and in tsx scripts (dotenv-loaded).
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Server-side client with the secret key (ingest + search). */
export function serverClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const secret = process.env.SUPABASE_SECRET_KEY;
  if (!url) throw new Error("SUPABASE_URL is not set");
  if (!secret) throw new Error("SUPABASE_SECRET_KEY is not set");
  return createClient(url, secret, { auth: { persistSession: false } });
}
