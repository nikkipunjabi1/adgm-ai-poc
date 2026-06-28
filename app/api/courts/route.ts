import { NextRequest, NextResponse } from "next/server";
import { searchCourts, type CourtTab } from "@/lib/courts";

export const runtime = "nodejs";
export const maxDuration = 60;

const TABS = new Set<CourtTab>(["cases", "hearings", "judgments"]);

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const tabParam = (sp.get("tab") ?? "cases") as CourtTab;
  const tab = TABS.has(tabParam) ? tabParam : "cases";
  const query = sp.get("q") ?? "";
  const mode = sp.get("mode") === "ai" ? "ai" : "classic";
  const page = Number(sp.get("page") ?? "0") || 0;
  const pageSize = Number(sp.get("pageSize") ?? "12") || 12;

  try {
    return NextResponse.json(await searchCourts({ tab, query, mode, page, pageSize }));
  } catch (err) {
    console.error("courts search error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Courts search failed" },
      { status: 500 },
    );
  }
}
