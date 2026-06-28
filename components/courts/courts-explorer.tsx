"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Search,
  Scale,
  CalendarClock,
  Gavel,
  Sparkles,
  ArrowUpRight,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "cases" | "hearings" | "judgments";
type Mode = "classic" | "ai";

interface Item {
  uid: string;
  type: "case" | "hearing" | "judgment";
  title: string;
  caseNumber?: string;
  parties?: string;
  when?: string;
  judge?: string;
  citation?: string;
  date?: string;
  deepLink: string;
  score?: number;
}

interface Result {
  items: Item[];
  total: number;
  mode: Mode;
}

const TABS: { key: Tab; label: string; icon: typeof Scale }[] = [
  { key: "cases", label: "Cases", icon: Scale },
  { key: "hearings", label: "Hearings", icon: CalendarClock },
  { key: "judgments", label: "Judgments", icon: Gavel },
];

const TYPE_META: Record<Item["type"], { label: string; icon: typeof Scale; chip: string }> = {
  case: { label: "Case", icon: Scale, chip: "bg-adgm-blue/10 text-adgm-blue-600" },
  hearing: { label: "Hearing", icon: CalendarClock, chip: "bg-amber-500/10 text-amber-700" },
  judgment: { label: "Judgment", icon: Gavel, chip: "bg-adgm-navy/10 text-adgm-navy-700" },
};

const PAGE_SIZE = 12;
const VALID_TABS = new Set<Tab>(["cases", "hearings", "judgments"]);

function readInitialState(): { tab: Tab; query: string; mode: Mode; page: number } {
  if (typeof window === "undefined") return { tab: "cases", query: "", mode: "classic", page: 0 };
  const sp = new URLSearchParams(window.location.search);
  const t = sp.get("tab") as Tab | null;
  const urlPage = parseInt(sp.get("page") ?? "1", 10);
  return {
    tab: t && VALID_TABS.has(t) ? t : "cases",
    query: sp.get("q") ?? "",
    mode: sp.get("mode") === "ai" ? "ai" : "classic",
    page: Number.isFinite(urlPage) && urlPage > 1 ? urlPage - 1 : 0,
  };
}

/** Reflect the view in the host address bar (tab → path, q/mode/page → query). */
function syncUrl(tab: Tab, query: string, mode: Mode, page: number) {
  if (typeof window === "undefined") return;
  window.parent?.postMessage(
    { type: "poc-courts-state", tab, q: query, mode, page: page + 1 },
    "*",
  );
}

export function CourtsExplorer() {
  const [tab, setTab] = useState<Tab>("cases");
  const [mode, setMode] = useState<Mode>("classic");
  const [input, setInput] = useState("");
  const [page, setPage] = useState(0);
  const [ready, setReady] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const reqId = useRef(0);

  useEffect(() => {
    const init = readInitialState();
    setTab(init.tab);
    setMode(init.mode);
    setInput(init.query);
    setPage(init.page);
    setReady(true);
  }, []);

  const run = useCallback(async (tab: Tab, query: string, mode: Mode, page: number) => {
    const id = ++reqId.current;
    setLoading(true);
    try {
      const params = new URLSearchParams({
        tab,
        q: query,
        mode,
        page: String(page),
        pageSize: String(PAGE_SIZE),
      });
      const res = await fetch(`/api/courts?${params}`);
      const data = (await res.json()) as Result;
      if (id !== reqId.current) return;
      setResult(data);
    } catch {
      if (id === reqId.current) setResult({ items: [], total: 0, mode });
    } finally {
      if (id === reqId.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => run(tab, input, mode, page), mode === "ai" ? 350 : 150);
    return () => clearTimeout(t);
  }, [ready, tab, input, mode, page, run]);

  useEffect(() => {
    if (!ready) return;
    syncUrl(tab, input, mode, page);
  }, [ready, tab, input, mode, page]);

  const onTab = (t: Tab) => {
    setTab(t);
    setPage(0);
  };
  const onInput = (v: string) => {
    setInput(v);
    setPage(0);
  };
  const onMode = () => {
    setMode((m) => (m === "ai" ? "classic" : "ai"));
    setPage(0);
  };

  const items = result?.items ?? [];
  const total = result?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const from = total === 0 ? 0 : page * PAGE_SIZE + 1;
  const to = Math.min(total, page * PAGE_SIZE + items.length);

  const goTo = (p: number) => {
    const next = Math.min(totalPages - 1, Math.max(0, p));
    if (next !== page) {
      setPage(next);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="font-sans">
      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-1 border-b border-adgm-steel-mist">
        {TABS.map(({ key, label, icon: Icon }) => {
          const active = tab === key;
          return (
            <button
              key={key}
              onClick={() => onTab(key)}
              className={cn(
                "relative flex items-center gap-2 px-4 py-3 text-sm font-semibold tracking-wide transition-colors",
                active ? "text-adgm-blue-600" : "text-adgm-ink/55 hover:text-adgm-ink",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
              {active && (
                <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-adgm-blue" />
              )}
            </button>
          );
        })}
      </div>

      {/* Search + AI toggle */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-adgm-steel" />
          <input
            value={input}
            onChange={(e) => onInput(e.target.value)}
            placeholder={
              mode === "ai"
                ? "Describe a matter — e.g. “insolvency disputes involving NMC”"
                : "Search by case number, party or citation"
            }
            className="w-full rounded-xl border border-adgm-steel-mist bg-white py-3.5 pl-12 pr-4 text-[15px] text-adgm-ink shadow-sm outline-none transition-colors placeholder:text-adgm-steel focus:border-adgm-blue/50 focus:ring-4 focus:ring-adgm-blue/10"
          />
        </div>

        <button
          onClick={onMode}
          aria-pressed={mode === "ai"}
          title="Toggle AI semantic search"
          className={cn(
            "group flex shrink-0 items-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold transition-all",
            mode === "ai"
              ? "bg-gradient-to-r from-adgm-blue to-adgm-navy-500 text-white shadow-glow"
              : "border border-adgm-steel-mist bg-white text-adgm-ink/70 hover:border-adgm-blue/40 hover:text-adgm-blue-600",
          )}
        >
          <Sparkles className={cn("h-4 w-4", mode === "ai" && "animate-pulse")} />
          AI search
          <span
            className={cn(
              "ml-1 inline-flex h-4 w-7 items-center rounded-full p-0.5 transition-colors",
              mode === "ai" ? "bg-white/30" : "bg-adgm-steel-mist",
            )}
          >
            <span
              className={cn(
                "h-3 w-3 rounded-full bg-white shadow transition-transform",
                mode === "ai" ? "translate-x-3" : "translate-x-0",
              )}
            />
          </span>
        </button>
      </div>

      {/* Meta line */}
      <div className="mt-4 flex min-h-[22px] items-center gap-3 text-[13px] text-adgm-ink/55">
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            {mode === "ai" ? "Thinking…" : "Searching…"}
          </span>
        ) : result ? (
          <>
            <span>
              {total > 0 ? (
                <>
                  <strong className="font-semibold text-adgm-ink/80">
                    {from.toLocaleString()}–{to.toLocaleString()}
                  </strong>{" "}
                  of <strong className="font-semibold text-adgm-ink/80">{total.toLocaleString()}</strong>
                </>
              ) : (
                <strong className="font-semibold text-adgm-ink/80">0 results</strong>
              )}
              {input.trim() && (
                <>
                  {" "}
                  for <span className="text-adgm-ink/80">“{input.trim()}”</span>
                </>
              )}
            </span>
            {result.mode === "ai" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-adgm-blue/10 px-2 py-0.5 font-medium text-adgm-blue-600">
                <Sparkles className="h-3 w-3" />
                AI-ranked by relevance
              </span>
            )}
          </>
        ) : null}
      </div>

      {/* Results */}
      {!loading && result && items.length === 0 ? (
        <div className="mt-6 rounded-xl border border-adgm-steel-mist bg-adgm-brightgrey/40 px-5 py-8 text-center">
          <p className="text-sm font-semibold text-adgm-ink/80">Nothing found</p>
          <p className="mt-1 text-sm text-adgm-ink/55">
            Try a different case number or party
            {mode === "classic" ? ", or switch on AI search to match by concept." : "."}
          </p>
        </div>
      ) : (
        <div className={cn("mt-3 grid grid-cols-1 gap-3 transition-opacity md:grid-cols-2", loading && "opacity-50")}>
          {items.map((it) => (
            <CourtRow key={it.uid} item={it} />
          ))}
        </div>
      )}

      <Pager page={page} totalPages={totalPages} onGo={goTo} />
    </div>
  );
}

function CourtRow({ item }: { item: Item }) {
  const meta = TYPE_META[item.type];
  const Icon = meta.icon;

  const facts: { label: string; value?: string }[] =
    item.type === "hearing"
      ? [
          { label: "When", value: item.when },
          { label: "Judge", value: item.judge },
        ]
      : item.type === "judgment"
        ? [
            { label: "Citation", value: item.citation },
            { label: "Date", value: item.date },
          ]
        : [
            { label: "Parties", value: item.parties },
            { label: "Commenced", value: item.date },
          ];

  return (
    <a
      href={item.deepLink}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col rounded-xl border border-adgm-steel-mist bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-adgm-blue/30 hover:shadow-cardhover"
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-semibold",
            meta.chip,
          )}
        >
          <Icon className="h-3.5 w-3.5" />
          {meta.label}
        </span>
        {item.caseNumber && (
          <span className="rounded-full bg-adgm-steel-mist px-2 py-0.5 text-[11px] font-medium text-adgm-ink/60">
            {item.caseNumber}
          </span>
        )}
      </div>

      <h3 className="mt-2.5 line-clamp-2 text-sm font-semibold leading-snug text-adgm-navy-900">
        {item.title}
      </h3>

      <dl className="mt-1.5 space-y-0.5 text-xs">
        {facts.map(
          (f) =>
            f.value && (
              <div key={f.label} className="flex gap-1.5">
                <dt className="shrink-0 font-medium text-adgm-steel">{f.label}:</dt>
                <dd className="line-clamp-1 text-adgm-ink/70">{f.value}</dd>
              </div>
            ),
        )}
      </dl>

      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-adgm-blue-600">
        View on ADGM
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </a>
  );
}

function Pager({
  page,
  totalPages,
  onGo,
}: {
  page: number;
  totalPages: number;
  onGo: (p: number) => void;
}) {
  if (totalPages <= 1) return null;

  const nums: number[] = [];
  const push = (n: number) => {
    if (n >= 0 && n < totalPages && !nums.includes(n)) nums.push(n);
  };
  push(0);
  for (let d = -1; d <= 1; d++) push(page + d);
  push(totalPages - 1);
  nums.sort((a, b) => a - b);
  const withGaps: number[] = [];
  nums.forEach((n, i) => {
    if (i > 0 && n - nums[i - 1]! > 1) withGaps.push(-1);
    withGaps.push(n);
  });

  const btn =
    "inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-2.5 text-sm font-medium transition-colors";

  return (
    <nav className="mt-7 flex items-center justify-center gap-1.5" aria-label="Court pages">
      <button
        onClick={() => onGo(page - 1)}
        disabled={page === 0}
        className={cn(
          btn,
          "border border-adgm-steel-mist text-adgm-ink/70 hover:border-adgm-blue/40 hover:text-adgm-blue-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-adgm-steel-mist disabled:hover:text-adgm-ink/70",
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {withGaps.map((n, i) =>
        n === -1 ? (
          <span key={`gap-${i}`} className="px-1 text-adgm-steel">
            …
          </span>
        ) : (
          <button
            key={n}
            onClick={() => onGo(n)}
            aria-current={n === page ? "page" : undefined}
            className={cn(
              btn,
              n === page
                ? "bg-adgm-blue text-white shadow-sm"
                : "border border-adgm-steel-mist text-adgm-ink/70 hover:border-adgm-blue/40 hover:text-adgm-blue-600",
            )}
          >
            {n + 1}
          </button>
        ),
      )}

      <button
        onClick={() => onGo(page + 1)}
        disabled={page >= totalPages - 1}
        className={cn(
          btn,
          "border border-adgm-steel-mist text-adgm-ink/70 hover:border-adgm-blue/40 hover:text-adgm-blue-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-adgm-steel-mist disabled:hover:text-adgm-ink/70",
        )}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
