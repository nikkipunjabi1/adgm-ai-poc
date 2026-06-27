"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Claude-/ChatGPT-style status line: an animated glyph + a short, clean,
 * query-specific step label (generated up front), advancing one at a time,
 * plus an elapsed timer. The labels are tidy phrases like "Defining ADGM's
 * scope" — never raw reasoning.
 */
const GLYPHS = ["✶", "✳", "✻", "✺", "✸", "✷"];

export function ThinkingIndicator({ steps }: { steps: string[] }) {
  const [glyph, setGlyph] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [idx, setIdx] = useState(0);

  // Glyph spin + elapsed timer.
  useEffect(() => {
    const g = setInterval(() => setGlyph((i) => (i + 1) % GLYPHS.length), 110);
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => {
      clearInterval(g);
      clearInterval(t);
    };
  }, []);

  // Advance through the step labels (hold on the last one until results land).
  useEffect(() => {
    setIdx(0);
    if (steps.length <= 1) return;
    const id = setInterval(
      () => setIdx((i) => Math.min(i + 1, steps.length - 1)),
      1400,
    );
    return () => clearInterval(id);
  }, [steps]);

  const label = steps[idx] ?? "Searching ADGM records";

  return (
    <div className="flex items-center gap-2.5 py-4 text-sm">
      <span className="w-4 shrink-0 text-center font-mono text-adgm-blue">
        {GLYPHS[glyph]}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={label}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.25 }}
          className="min-w-0 flex-1 font-medium text-adgm-ink/75"
        >
          {label}
        </motion.span>
      </AnimatePresence>
      <span className="shrink-0 text-xs text-adgm-steel">{elapsed}s</span>
    </div>
  );
}
