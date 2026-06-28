import { NextRequest, NextResponse } from "next/server";
import { getSuggestions } from "@/lib/suggestions";

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
