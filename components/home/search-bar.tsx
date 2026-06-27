"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const EXAMPLES = [
  "Fintech firms licensed in ADGM",
  "Recent court judgments against NMC Healthcare",
  "What do I need to set up a fund manager?",
  "Public notices for deregistered companies",
];

export function SearchBar({
  size = "lg",
  variant = "dark",
}: {
  size?: "lg" | "md";
  variant?: "dark" | "light";
}) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);
  const light = variant === "light";

  function submit(value: string) {
    const query = value.trim();
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(q);
        }}
        className={cn(
          "group relative flex items-center gap-2 rounded-2xl border bg-white transition-all",
          size === "lg" ? "p-2 pl-5" : "p-1.5 pl-4",
          focused
            ? "border-adgm-blue/40 shadow-glow"
            : "border-adgm-steel-light shadow-card",
        )}
      >
        <Sparkles
          className={cn(
            "shrink-0 transition-colors",
            size === "lg" ? "h-5 w-5" : "h-4 w-4",
            focused ? "text-adgm-blue" : "text-adgm-steel",
          )}
        />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Ask anything about ADGM — firms, funds, court cases, setting up…"
          className={cn(
            "w-full bg-transparent text-adgm-ink placeholder:text-adgm-steel focus:outline-none",
            size === "lg" ? "py-2 text-base" : "py-1.5 text-sm",
          )}
        />
        <button
          type="submit"
          className={cn(
            "flex shrink-0 items-center gap-1.5 rounded-xl bg-adgm-navy-900 font-semibold text-white transition-all hover:bg-adgm-navy-700 active:scale-95",
            size === "lg" ? "px-5 py-3 text-sm" : "px-4 py-2 text-sm",
          )}
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Search</span>
        </button>
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "text-xs font-medium",
            light ? "text-adgm-ink/45" : "text-white/50",
          )}
        >
          Try:
        </span>
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            onClick={() => submit(ex)}
            className={cn(
              "group inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs backdrop-blur-sm transition-all",
              light
                ? "border-adgm-steel-light bg-white text-adgm-ink/70 hover:border-adgm-blue/50 hover:text-adgm-navy-900"
                : "border-white/15 bg-white/5 text-white/75 hover:border-adgm-blue/50 hover:bg-white/10 hover:text-white",
            )}
          >
            {ex}
            <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        ))}
      </div>
    </div>
  );
}
