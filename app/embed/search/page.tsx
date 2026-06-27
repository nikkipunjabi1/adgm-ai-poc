"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { SearchExperience } from "@/components/search/search-experience";

/**
 * Chromeless POC search, designed to be embedded in an <iframe> by the cloned
 * ADGM homepage ("/"). It posts {type:"poc-close"} to the parent window so the
 * host overlay can close (Esc or the X button).
 */
export default function EmbedSearchPage() {
  const close = () => window.parent?.postMessage({ type: "poc-close" }, "*");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <button
        onClick={close}
        aria-label="Close search"
        className="fixed right-3 top-3 z-50 grid h-9 w-9 place-items-center rounded-full bg-adgm-brightgrey text-adgm-ink/70 transition-colors hover:bg-adgm-steel-mist hover:text-adgm-ink"
      >
        <X className="h-5 w-5" />
      </button>
      <SearchExperience variant="page" />
    </div>
  );
}
