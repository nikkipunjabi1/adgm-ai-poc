/**
 * Central on/off gate for every AI-powered surface in the POC.
 *
 * Why this exists: the app is deployed publicly (Vercel) for stakeholder demos,
 * so the costly/abusable AI features must be lockable WITHOUT a code change —
 * purely through environment variables you can flip in the Vercel dashboard:
 *
 *   AI_ENABLED=false            → hard kill switch (AI off everywhere)
 *   ANTHROPIC_API_KEY missing   → AI off (nothing to call)
 *   ANTHROPIC_API_KEY invalid   → AI off, surfaced as "AI Key is not available."
 *
 * The classic (non-AI) keyword search / register / court filters are unaffected
 * by all of this — only the AI-branded paths consult these helpers.
 *
 * Note: of the three AI surfaces, only `/search` (Claude) actually spends the
 * Anthropic key; the register/courts "AI search" uses local embeddings. We still
 * gate ALL of them on the same switch + key so "AI" is a single, coherent state.
 */
import Anthropic from "@anthropic-ai/sdk";

/** The single user-facing message shown wherever AI is unavailable. */
export const AI_UNAVAILABLE_MESSAGE = "AI Key is not available.";

export type AiStatus = { ok: true } | { ok: false; message: string };

/** Treat these spellings of the kill switch as "off". */
function isOff(v: string | undefined): boolean {
  return v != null && /^(0|false|off|no|disabled?)$/i.test(v.trim());
}

/**
 * Synchronous gate: master switch on AND a key is present. No network call, so
 * it's safe to call on every request (drives whether the AI toggle is offered).
 */
export function aiConfigured(): boolean {
  if (isOff(process.env.AI_ENABLED)) return false;
  return Boolean(process.env.ANTHROPIC_API_KEY?.trim());
}

// Cache the auth probe so we hit Anthropic at most once per cold start. A failed
// probe is retried after a short TTL (a corrected key recovers without redeploy
// in local dev; on Vercel an env change redeploys and resets the cache anyway).
let probe: { ok: boolean; at: number } | null = null;
const FAIL_TTL_MS = 60_000;

/**
 * Full readiness: master switch + key present + key actually valid. The validity
 * check is a cached `models.list` call — it authenticates the key but spends no
 * tokens. Transient (non-auth) errors do NOT latch AI off; only a real auth
 * failure does.
 */
export async function aiReady(): Promise<AiStatus> {
  if (!aiConfigured()) return { ok: false, message: AI_UNAVAILABLE_MESSAGE };

  const now = Date.now();
  if (probe && (probe.ok || now - probe.at < FAIL_TTL_MS)) {
    return probe.ok ? { ok: true } : { ok: false, message: AI_UNAVAILABLE_MESSAGE };
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
    await client.models.list({ limit: 1 }); // free auth check (no tokens)
    probe = { ok: true, at: now };
    return { ok: true };
  } catch (err) {
    if (isAuthError(err)) {
      probe = { ok: false, at: now };
      return { ok: false, message: AI_UNAVAILABLE_MESSAGE };
    }
    // Network / 5xx / unsupported endpoint: don't cache, don't block — let the
    // real call proceed and fail (or succeed) on its own terms.
    return { ok: true };
  }
}

/** Did an error come back from Anthropic as an auth / permission failure? */
export function isAuthError(err: unknown): boolean {
  if (err instanceof Anthropic.AuthenticationError) return true;
  if (err instanceof Anthropic.PermissionDeniedError) return true;
  const status = (err as { status?: number } | null)?.status;
  return status === 401 || status === 403;
}

/** Map any thrown AI error to a user-facing message. */
export function aiErrorMessage(err: unknown): string {
  if (isAuthError(err)) return AI_UNAVAILABLE_MESSAGE;
  return err instanceof Error ? err.message : "AI request failed";
}
