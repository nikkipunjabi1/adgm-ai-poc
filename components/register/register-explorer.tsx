"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Search,
  Building2,
  User,
  HandCoins,
  Sparkles,
  ArrowUpRight,
  Loader2,
  LayoutGrid,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "all" | "firms" | "individuals" | "funds";
type Mode = "classic" | "ai";

interface Item {
  uid: string;
  type: "firm" | "individual" | "fund";
  name: string;
  status?: string;
  url?: string;
  ref?: string;
  refLabel?: string;
  detail?: string;
  detailLabel?: string;
  score?: number;
}

interface Result {
  items: Item[];
  total: number;
  mode: Mode;
  counts: { firm: number; individual: number; fund: number };
}

const TABS: { key: Tab; label: string; icon: typeof Building2 }[] = [
  { key: "all", label: "All", icon: LayoutGrid },
  { key: "firms", label: "Firms", icon: Building2 },
  { key: "individuals", label: "Individuals", icon: User },
  { key: "funds", label: "Funds", icon: HandCoins },
];

const TYPE_META: Record<Item["type"], { label: string; icon: typeof Building2; chip: string }> = {
  firm: { label: "Firm", icon: Building2, chip: "bg-adgm-blue/10 text-adgm-blue-600" },
  individual: { label: "Individual", icon: User, chip: "bg-adgm-navy/10 text-adgm-navy-700" },
  fund: { label: "Fund", icon: HandCoins, chip: "bg-emerald-500/10 text-emerald-700" },
};

const PAGE_SIZE = 12;

function statusTone(status?: string): string {
  const s = (status ?? "").toLowerCase();
  if (s.includes("active")) return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
  if (s.includes("withdraw") || s.includes("cancel") || s.includes("revok"))
    return "bg-adgm-steel-mist text-adgm-ink/60 ring-adgm-steel/30";
  if (s.includes("prohibit") || s.includes("suspend"))
    return "bg-adgm-error/10 text-adgm-error ring-adgm-error/20";
  return "bg-adgm-blue/10 text-adgm-blue-600 ring-adgm-blue/20";
}

const VALID_TABS = new Set<Tab>(["all", "firms", "individuals", "funds"]);

/** Ask the host page to reflect the active tab in its address bar (deep links).
 *  We run inside an <iframe>, so the parent owns the visible URL. */
function pushTab(tab: Tab) {
  if (typeof window === "undefined") return;
  window.parent?.postMessage({ type: "poc-register-tab", tab }, "*");
}

/** The host injects the current tab as ?tab= on the iframe src. */
function tabFromQuery(): Tab {
  if (typeof window === "undefined") return "all";
  const t = new URLSearchParams(window.location.search).get("tab") as Tab | null;
  return t && VALID_TABS.has(t) ? t : "all";
}

export function RegisterExplorer() {
  const [tab, setTab] = useState<Tab>("all");
  const [mode, setMode] = useState<Mode>("classic");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [shown, setShown] = useState(PAGE_SIZE);
  const reqId = useRef(0);

  // Pick up the tab from the iframe's ?tab= on mount (so /…/firms opens Firms).
  useEffect(() => {
    setTab(tabFromQuery());
  }, []);

  const run = useCallback(
    async (tab: Tab, query: string, mode: Mode) => {
      const id = ++reqId.current;
      setLoading(true);
      try {
        const params = new URLSearchParams({
          tab,
          q: query,
          mode,
          page: "0",
          pageSize: "200",
        });
        const res = await fetch(`/api/register?${params}`);
        const data = (await res.json()) as Result;
        if (id !== reqId.current) return;
        setResult(data);
        setShown(PAGE_SIZE);
      } catch {
        if (id === reqId.current) setResult({ items: [], total: 0, mode, counts: { firm: 0, individual: 0, fund: 0 } });
      } finally {
        if (id === reqId.current) setLoading(false);
      }
    },
    [],
  );

  // Debounced search whenever tab / query / mode changes.
  useEffect(() => {
    const t = setTimeout(() => run(tab, input, mode), mode === "ai" ? 350 : 150);
    return () => clearTimeout(t);
  }, [tab, input, mode, run]);

  const onTab = (t: Tab) => {
    setTab(t);
    pushTab(t);
  };

  const items = result?.items ?? [];
  const visible = items.slice(0, shown);

  return (
    <div className="font-sans">
      {/* Tabs ----------------------------------------------------------- */}
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

      {/* Search + AI toggle --------------------------------------------- */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-adgm-steel" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "ai"
                ? "Describe what you're looking for — e.g. “crypto trading firms”"
                : "Search by name or reference number"
            }
            className="w-full rounded-xl border border-adgm-steel-mist bg-white py-3.5 pl-12 pr-4 text-[15px] text-adgm-ink shadow-sm outline-none transition-colors placeholder:text-adgm-steel focus:border-adgm-blue/50 focus:ring-4 focus:ring-adgm-blue/10"
          />
        </div>

        <button
          onClick={() => setMode((m) => (m === "ai" ? "classic" : "ai"))}
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

      {/* Result meta line ------------------------------------------------ */}
      <div className="mt-4 flex min-h-[22px] items-center gap-3 text-[13px] text-adgm-ink/55">
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            {mode === "ai" ? "Thinking…" : "Searching…"}
          </span>
        ) : result ? (
          <>
            <span>
              <strong className="font-semibold text-adgm-ink/80">{result.total}</strong>{" "}
              {result.total === 1 ? "result" : "results"}
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
            {tab === "all" && result.total > 0 && (
              <span className="hidden sm:inline">
                {result.counts.firm} firms · {result.counts.individual} individuals ·{" "}
                {result.counts.fund} funds
              </span>
            )}
          </>
        ) : null}
      </div>

      {/* Results --------------------------------------------------------- */}
      {!loading && result && items.length === 0 ? (
        <div className="mt-6 rounded-xl border border-adgm-steel-mist bg-adgm-brightgrey/40 px-5 py-8 text-center">
          <p className="text-sm font-semibold text-adgm-ink/80">Nothing found</p>
          <p className="mt-1 text-sm text-adgm-ink/55">
            Try a different name{mode === "classic" ? ", or switch on AI search to match by concept." : "."}
          </p>
        </div>
      ) : (
        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
          {visible.map((it) => (
            <RegisterRow key={it.uid} item={it} />
          ))}
        </div>
      )}

      {items.length > shown && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShown((n) => n + PAGE_SIZE)}
            className="rounded-full border border-adgm-steel-mist bg-white px-6 py-2.5 text-sm font-semibold text-adgm-ink/70 transition-colors hover:border-adgm-blue/40 hover:text-adgm-blue-600"
          >
            Show more ({items.length - shown})
          </button>
        </div>
      )}
    </div>
  );
}

function RegisterRow({ item }: { item: Item }) {
  const meta = TYPE_META[item.type];
  const Icon = meta.icon;
  return (
    <a
      href={item.url ?? `/search?q=${encodeURIComponent(item.name)}`}
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
        {item.status && (
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset",
              statusTone(item.status),
            )}
          >
            {item.status}
          </span>
        )}
      </div>

      <h3 className="mt-2.5 line-clamp-2 text-sm font-semibold leading-snug text-adgm-navy-900">
        {item.name}
      </h3>

      <dl className="mt-1.5 space-y-0.5 text-xs">
        {item.ref && (
          <div className="flex gap-1.5">
            <dt className="shrink-0 font-medium text-adgm-steel">{item.refLabel}:</dt>
            <dd className="text-adgm-ink/70">{item.ref}</dd>
          </div>
        )}
        {item.detail && (
          <div className="flex gap-1.5">
            <dt className="shrink-0 font-medium text-adgm-steel">{item.detailLabel}:</dt>
            <dd className="line-clamp-1 text-adgm-ink/70">{item.detail}</dd>
          </div>
        )}
      </dl>

      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-adgm-blue-600">
        View details
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </a>
  );
}
