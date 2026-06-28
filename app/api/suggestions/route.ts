import { NextRequest, NextResponse } from "next/server";
import { getSuggestions, resetSearchQueries } from "@/lib/suggestions";

// Supabase + (optional) Claude polish need the Node runtime.
export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * GET /api/suggestions          → current suggested questions (cached, ~10 min)
 * GET /api/suggestions?refresh=1 → force re-derive from the latest query log
 */
export async function GET(req: NextRequest) {
  const refresh = req.nextUrl.searchParams.get("refresh") === "1";
  try {
    return NextResponse.json(await getSuggestions({ refresh }));
  } catch (err) {
    console.error("suggestions error:", err);
    return NextResponse.json(
      { suggestions: [], source: "curated", generatedAt: new Date().toISOString() },
      { status: 200 },
    );
  }
}

/**
 * Is the caller allowed to reset? On a public deploy this must be locked down:
 *   - SUGGESTIONS_RESET_TOKEN set → the provided token must match it.
 *   - not set → allowed only in development (so local demos just work; a
 *     production deploy stays safe until you configure a token).
 */
function resetAllowed(token: string | null): boolean {
  const expected = process.env.SUGGESTIONS_RESET_TOKEN;
  if (expected) return token === expected;
  return process.env.NODE_ENV !== "production";
}

/**
 * DELETE /api/suggestions[?token=…]  → clear the query log + cache, returning
 * the fresh (curated) suggestion set. The demo "Reset" control.
 */
export async function DELETE(req: NextRequest) {
  const token =
    req.nextUrl.searchParams.get("token") ??
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ??
    null;

  if (!resetAllowed(token)) {
    return NextResponse.json(
      { ok: false, error: "Reset is not permitted on this deployment." },
      { status: 403 },
    );
  }

  try {
    await resetSearchQueries();
    return NextResponse.json({ ok: true, ...(await getSuggestions({ refresh: true })) });
  } catch (err) {
    console.error("suggestions reset error:", err);
    return NextResponse.json({ ok: false, error: "Reset failed" }, { status: 500 });
  }
}
