"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { SearchExperience } from "./search-experience";
import { cn } from "@/lib/utils";

type Ctx = { open: () => void; close: () => void; isOpen: boolean };
const SearchCtx = createContext<Ctx | null>(null);

export function useSearchOverlay() {
  const ctx = useContext(SearchCtx);
  if (!ctx) throw new Error("useSearchOverlay must be used within SearchOverlayProvider");
  return ctx;
}

export function SearchOverlayProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((v) => !v);
      }
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  return (
    <SearchCtx.Provider value={{ open, close, isOpen }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[9vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <div
              className="absolute inset-0 bg-adgm-navy-900/55 backdrop-blur-sm"
              onClick={close}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/60 bg-white shadow-2xl"
            >
              <SearchExperience variant="overlay" onClose={close} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SearchCtx.Provider>
  );
}

/** A pill button that opens the overlay — used in the header and hero. */
export function SearchTrigger({
  className,
  label = "Search",
}: {
  className?: string;
  label?: string;
}) {
  const { open } = useSearchOverlay();
  return (
    <button onClick={open} className={cn("inline-flex items-center gap-2", className)}>
      <Search className="h-4 w-4" />
      {label}
    </button>
  );
}
