import { NextRequest, NextResponse } from "next/server";
import { searchRegister, type RegisterTab } from "@/lib/register";

// Embeddings (AI mode) need the Node runtime.
export const runtime = "nodejs";

const TABS = new Set<RegisterTab>(["all", "firms", "individuals", "funds"]);

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const tabParam = (sp.get("tab") ?? "all") as RegisterTab;
  const tab = TABS.has(tabParam) ? tabParam : "all";
  const query = sp.get("q") ?? "";
  const mode = sp.get("mode") === "ai" ? "ai" : "classic";
  const page = Number(sp.get("page") ?? "0") || 0;
  const pageSize = Number(sp.get("pageSize") ?? "12") || 12;

  try {
    const result = await searchRegister({ tab, query, mode, page, pageSize });
    return NextResponse.json(result);
  } catch (err) {
    console.error("register search error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Register search failed" },
      { status: 500 },
    );
  }
}
