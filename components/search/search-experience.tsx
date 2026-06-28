"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Sparkles, Search, X, TriangleAlert, Loader2, ArrowRight, RefreshCw, TrendingUp, RotateCcw } from "lucide-react";
import type { SearchRecord } from "@/lib/search";
import type { SearchResponse, Alert } from "@/lib/llm";
import { SearchCard, EventPromo } from "./cards";
import { ThinkingIndicator } from "./thinking";
import { cn } from "@/lib/utils";

type ApiResult = SearchResponse & { records: Record<string, SearchRecord>; error?: string };

// Initial fallback shown instantly; replaced by the live (auto-updating) set
// fetched from /api/suggestions on mount.
const SUGGESTIONS = [
  "Fintech firms licensed in ADGM",
  "Court judgments involving NMC Healthcare",
  "What do I need to set up a fund manager?",
  "Public notices for deregistered companies",
  "Upcoming events at ADGM",
];

type SuggestionSource = "trending" | "trending-ai" | "curated";

export function SearchExperience({
  initialQuery = "",
  variant = "overlay",
  onClose,
}: {
  initialQuery?: string;
  variant?: "overlay" | "page";
  onClose?: () => void;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [input, setInput] = useState(initialQuery);
  const [selections, setSelections] = useState<string[]>([]);
  const [data, setData] = useState<ApiResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>(SUGGESTIONS);
  const [sugSource, setSugSource] = useState<SuggestionSource>("curated");
  const [sugLoading, setSugLoading] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const adminToken = useRef<string | null>(null);
  const reqId = useRef(0);

  // Operator-only controls (Regenerate + Reset). Hidden from normal visitors;
  // shown only after the demo operator opts in once via ?admin=<token> (kept in
  // localStorage). Toggle OFF again with ?admin= (empty). This is the same on
  // localhost and on Vercel, so what you test locally matches production. The
  // matching SUGGESTIONS_RESET_TOKEN must be set server-side for Reset to work.
  useEffect(() => {
    try {
      const raw = new URLSearchParams(window.location.search).get("admin");
      if (raw !== null) {
        if (raw) localStorage.setItem("adgm_admin", raw);
        else localStorage.removeItem("adgm_admin");
      }
      const tok = localStorage.getItem("adgm_admin");
      adminToken.current = tok;
      setAdminMode(Boolean(tok));
    } catch {
      /* no-op */
    }
  }, []);

  // Pull the auto-updating suggestions (derived from the week's top queries).
  // `refresh` forces a live re-derive — the demo "Regenerate" button.
  const loadSuggestions = useCallback(async (refresh: boolean) => {
    setSugLoading(true);
    try {
      const res = await fetch(`/api/suggestions${refresh ? "?refresh=1" : ""}`);
      const d = (await res.json()) as { suggestions?: string[]; source?: SuggestionSource };
      if (Array.isArray(d.suggestions) && d.suggestions.length) {
        setSuggestions(d.suggestions);
        setSugSource(d.source ?? "curated");
      }
    } catch {
      /* keep whatever's showing */
    } finally {
      setSugLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSuggestions(false);
  }, [loadSuggestions]);

  // Clear the logged queries → suggestions return to the curated baseline.
  const resetSuggestions = useCallback(async () => {
    if (
      !window.confirm(
        "Reset suggestions? This clears the logged search queries and returns to the default set.",
      )
    )
      return;
    setSugLoading(true);
    try {
      const tok = adminToken.current;
      const res = await fetch(`/api/suggestions${tok ? `?token=${encodeURIComponent(tok)}` : ""}`, {
        method: "DELETE",
      });
      const d = (await res.json()) as {
        ok?: boolean;
        error?: string;
        suggestions?: string[];
        source?: SuggestionSource;
      };
      if (res.ok && Array.isArray(d.suggestions)) {
        setSuggestions(d.suggestions);
        setSugSource(d.source ?? "curated");
      } else if (d.error) {
        window.alert(d.error);
      }
    } catch {
      /* keep current */
    } finally {
      setSugLoading(false);
    }
  }, []);

  const run = useCallback(async (q: string, sels: string[]) => {
    if (!q.trim()) return;
    const id = ++reqId.current;
    setLoading(true);
    setError(null);
    setData(null);
    setSteps([]);
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ query: q, selections: sels }),
      });
      if (!res.body) throw new Error("No response stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let finished = false;

      while (!finished) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buf.indexOf("\n")) >= 0) {
          const line = buf.slice(0, nl).trim();
          buf = buf.slice(nl + 1);
          if (!line) continue;
          let msg: Record<string, unknown>;
          try {
            msg = JSON.parse(line);
          } catch {
            continue;
          }
          if (id !== reqId.current) return; // superseded by a newer query
          // "meta" events are internal-only and not shown to users.
          if (msg.type === "steps") {
            if (Array.isArray(msg.steps)) setSteps(msg.steps as string[]);
          } else if (msg.type === "error") {
            setError((msg.error as string) || "Search failed");
            finished = true;
          } else if (msg.type === "result") {
            setData(msg as unknown as ApiResult);
            finished = true;
          }
        }
      }
    } catch {
      if (id === reqId.current) setError("Network error");
    } finally {
      if (id === reqId.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      setInput(initialQuery);
      run(initialQuery, []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  function submit(q: string) {
    setQuery(q);
    setSelections([]);
    setData(null);
    run(q, []);
  }
  function pick(value: string) {
    const next = [...selections, value];
    setSelections(next);
    run(query, next);
  }

  const alertByUid: Record<string, Alert> = {};
  for (const a of data?.alerts ?? []) alertByUid[a.uid] = a;
  const redAlerts = (data?.alerts ?? []).filter((a) => a.severity === "red");

  return (
    <div className={cn(variant === "page" && "mx-auto max-w-5xl")}>
      {/* Search input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(input);
        }}
        className="flex items-center gap-2.5 border-b border-adgm-steel-mist px-5 py-4"
      >
        <Sparkles className="h-5 w-5 shrink-0 text-adgm-blue" />
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about ADGM…"
          className="w-full bg-transparent text-base text-adgm-ink placeholder:text-adgm-steel focus:outline-none"
        />
        {loading && <Loader2 className="h-4 w-4 animate-spin text-adgm-blue" />}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-adgm-steel hover:bg-adgm-brightgrey hover:text-adgm-ink"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>

      {/* Selected refinements */}
      {selections.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 px-5 pt-4">
          <span className="text-xs text-adgm-steel">Refined:</span>
          {selections.map((s, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 rounded-full bg-adgm-blue/10 px-2.5 py-1 text-xs font-medium text-adgm-blue-600"
            >
              {s}
            </span>
          ))}
          <button
            onClick={() => {
              setSelections([]);
              run(query, []);
            }}
            className="text-xs text-adgm-steel underline hover:text-adgm-ink"
          >
            reset
          </button>
        </div>
      )}

      <div
        className={cn(
          "px-5 py-5",
          variant === "overlay" && "max-h-[62vh] overflow-y-auto",
        )}
      >
        {loading && <ThinkingIndicator steps={steps} />}
        {error && (
          <div className="rounded-xl border border-adgm-error/30 bg-adgm-error/5 p-4 text-sm text-adgm-error">
            {error}
          </div>
        )}

        {data && !loading && (
          <div className="space-y-6">
            {/* Critical alerts banner */}
            {redAlerts.length > 0 && (
              <div className="flex items-start gap-2.5 rounded-xl border border-adgm-error/30 bg-adgm-error/5 p-3.5">
                <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-adgm-error" />
                <div className="text-sm">
                  <p className="font-semibold text-adgm-error">Things to be aware of</p>
                  <ul className="mt-1 space-y-0.5 text-adgm-ink/70">
                    {redAlerts.slice(0, 4).map((a) => (
                      <li key={a.uid}>• {a.reason}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Upfront narrowing question — only for a very broad opening query */}
            {data.mode === "clarify" && data.questions && data.questions.length > 0 && (
              <div className="rounded-2xl border border-adgm-steel-mist bg-adgm-brightgrey/40 p-4">
                {data.questions.slice(0, 1).map((q, qi) => (
                  <div key={qi}>
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-adgm-navy-900 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
                        {q.header}
                      </span>
                      <p className="text-sm font-medium text-adgm-navy-900">{q.question}</p>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {q.options.map((o, oi) => (
                        <button
                          key={oi}
                          onClick={() => pick(o.value)}
                          className="group flex items-center justify-between gap-2 rounded-xl border border-adgm-steel-mist bg-white px-3.5 py-3 text-left text-sm text-adgm-ink/80 transition-all hover:-translate-y-0.5 hover:border-adgm-blue/40 hover:shadow-card"
                        >
                          <span className="line-clamp-2">{o.label}</span>
                          <ArrowRight className="h-4 w-4 shrink-0 text-adgm-steel transition-all group-hover:translate-x-0.5 group-hover:text-adgm-blue" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Grounded answer */}
            {data.answer && <Markdown text={data.answer} />}

            {/* Card sections */}
            {(data.sections ?? []).map((section, si) => {
              const recs = section.uids
                .map((u) => data.records[u])
                .filter((r): r is SearchRecord => Boolean(r));
              if (recs.length === 0) return null;
              const isEvent = section.type === "event";
              return (
                <div key={si}>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-adgm-steel">
                    {section.title}
                  </h3>
                  {isEvent ? (
                    <div className="space-y-2.5">
                      {recs.map((r) => (
                        <EventPromo key={r.uid} rec={r} />
                      ))}
                    </div>
                  ) : (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {recs.map((r) => (
                        <SearchCard key={r.uid} rec={r} alert={alertByUid[r.uid]} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Follow-up funnel — suggested next questions, max 3 levels deep */}
            {selections.length < 3 && (data.followUps ?? []).length > 0 && (
              <div className="rounded-2xl border border-adgm-steel-mist bg-adgm-brightgrey/40 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-adgm-blue" />
                  <span className="text-sm font-semibold text-adgm-navy-900">
                    Continue exploring
                  </span>
                </div>
                <div className="space-y-2">
                  {(data.followUps ?? []).slice(0, 3).map((q, qi) => (
                    <button
                      key={qi}
                      onClick={() => pick(q)}
                      className="group flex w-full items-center justify-between gap-3 rounded-xl border border-adgm-steel-mist bg-white px-4 py-3 text-left text-sm font-medium text-adgm-ink/85 transition-all hover:-translate-y-0.5 hover:border-adgm-blue/40 hover:text-adgm-navy-900 hover:shadow-card"
                    >
                      <span className="line-clamp-2">{q}</span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-adgm-steel transition-all group-hover:translate-x-0.5 group-hover:text-adgm-blue" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!data && !loading && !error && !query.trim() && (
          <div>
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-adgm-steel">
                {sugSource === "curated" ? (
                  "Suggestions"
                ) : (
                  <>
                    <TrendingUp className="h-3.5 w-3.5 text-adgm-blue" />
                    Trending this week
                    {sugSource === "trending-ai" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-adgm-blue/10 px-1.5 py-0.5 text-[10px] font-semibold normal-case tracking-normal text-adgm-blue-600">
                        <Sparkles className="h-2.5 w-2.5" />
                        AI-curated
                      </span>
                    )}
                  </>
                )}
              </p>
              {adminMode && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => loadSuggestions(true)}
                    disabled={sugLoading}
                    title="Regenerate suggestions from this week's searches"
                    className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-adgm-steel transition-colors hover:bg-adgm-brightgrey hover:text-adgm-blue-600 disabled:opacity-50"
                  >
                    <RefreshCw className={cn("h-3.5 w-3.5", sugLoading && "animate-spin")} />
                    Regenerate
                  </button>
                  <button
                    onClick={resetSuggestions}
                    disabled={sugLoading}
                    title="Clear the logged queries and reset suggestions to the default set"
                    className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-adgm-steel transition-colors hover:bg-adgm-error/10 hover:text-adgm-error disabled:opacity-50"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset
                  </button>
                </div>
              )}
            </div>
            <ul className="space-y-1">
              {suggestions.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => {
                      setInput(s);
                      submit(s);
                    }}
                    className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-adgm-ink/80 transition-colors hover:bg-adgm-brightgrey"
                  >
                    <Search className="h-4 w-4 text-adgm-steel" />
                    <span className="flex-1">{s}</span>
                    <ArrowRight className="h-4 w-4 text-adgm-steel opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

/** Compact markdown renderer: headings, bold/italic, lists, tables, rules. */
function Markdown({ text }: { text: string }) {
  const lines = text.split("\n");
  const out: React.ReactNode[] = [];
  let list: string[] = [];
  const flushList = () => {
    if (list.length) {
      out.push(
        <ul key={out.length} className="my-2 ml-4 list-disc space-y-1 text-sm text-adgm-ink/80">
          {list.map((li, i) => (
            <li key={i}>{inline(li)}</li>
          ))}
        </ul>,
      );
      list = [];
    }
  };

  const isTableRow = (l: string) => l.trim().startsWith("|") && l.includes("|");
  const isSep = (l: string) => /^\s*\|?[\s:|-]+\|?\s*$/.test(l) && l.includes("-");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!.trim();

    // Table block
    if (isTableRow(lines[i]!) && i + 1 < lines.length && isSep(lines[i + 1]!)) {
      flushList();
      const cells = (l: string) =>
        l.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      const header = cells(lines[i]!);
      const rows: string[][] = [];
      i += 2;
      while (i < lines.length && isTableRow(lines[i]!)) {
        rows.push(cells(lines[i]!));
        i++;
      }
      i--;
      out.push(
        <div key={out.length} className="my-3 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-adgm-steel-light">
                {header.map((h, hi) => (
                  <th key={hi} className="px-3 py-1.5 text-left font-semibold text-adgm-navy-900">
                    {inline(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri} className="border-b border-adgm-steel-mist">
                  {r.map((c, ci) => (
                    <td key={ci} className="px-3 py-1.5 text-adgm-ink/75">
                      {inline(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    if (!line) {
      flushList();
    } else if (/^---+$/.test(line)) {
      flushList();
      out.push(<hr key={out.length} className="my-3 border-adgm-steel-mist" />);
    } else if (line.startsWith("### ")) {
      flushList();
      out.push(
        <h4 key={out.length} className="mt-3 text-sm font-semibold text-adgm-navy-900">
          {inline(line.slice(4))}
        </h4>,
      );
    } else if (line.startsWith("## ")) {
      flushList();
      out.push(
        <h3 key={out.length} className="mt-3 text-base font-semibold text-adgm-navy-900">
          {inline(line.slice(3))}
        </h3>,
      );
    } else if (line.startsWith("# ")) {
      flushList();
      out.push(
        <h2 key={out.length} className="mt-3 text-lg font-semibold text-adgm-navy-900">
          {inline(line.slice(2))}
        </h2>,
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      list.push(line.slice(2));
    } else {
      flushList();
      out.push(
        <p key={out.length} className="text-sm leading-relaxed text-adgm-ink/80">
          {inline(line)}
        </p>,
      );
    }
  }
  flushList();
  return <div className="space-y-1">{out}</div>;
}

/** Inline **bold** and *italic*. */
function inline(s: string): React.ReactNode {
  const parts = s.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**"))
      return (
        <strong key={i} className="font-semibold text-adgm-navy-900">
          {p.slice(2, -2)}
        </strong>
      );
    if (p.startsWith("*") && p.endsWith("*") && p.length > 2)
      return (
        <em key={i} className="text-adgm-ink/70">
          {p.slice(1, -1)}
        </em>
      );
    return <span key={i}>{p}</span>;
  });
}
