"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { SearchExperience } from "@/components/search/search-experience";

/**
 * Chromeless POC search, embedded in an <iframe> by the cloned ADGM homepage:
 *  - as an overlay (the "/" search icon / ⌘K), and
 *  - inline as the body of the "/search" clone page (with ?bare=1 to drop the
 *    close button, since there's no overlay to close there).
 * Reads ?q for an initial query. Posts {type:"poc-close"} (overlay close) and
 * {type:"poc-search-height"} (so the host can size the iframe to its content).
 */
export default function EmbedSearchPage() {
  const ref = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState("");
  const [bare, setBare] = useState(false);
  const close = () => window.parent?.postMessage({ type: "poc-close" }, "*");

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    setQ(sp.get("q") ?? "");
    setBare(sp.get("bare") === "1");
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const report = () =>
      window.parent?.postMessage({ type: "poc-search-height", height: el.offsetHeight }, "*");
    report();
    const ro = new ResizeObserver(report);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative bg-white">
      {!bare && (
        <button
          onClick={close}
          aria-label="Close search"
          className="fixed right-3 top-3 z-50 grid h-9 w-9 place-items-center rounded-full bg-adgm-brightgrey text-adgm-ink/70 transition-colors hover:bg-adgm-steel-mist hover:text-adgm-ink"
        >
          <X className="h-5 w-5" />
        </button>
      )}
      <SearchExperience variant="page" initialQuery={q} />
    </div>
  );
}
