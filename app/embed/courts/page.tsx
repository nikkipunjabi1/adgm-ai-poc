"use client";

import { useEffect } from "react";
import { CourtsExplorer } from "@/components/courts/courts-explorer";

/**
 * Chromeless ADGM Courts explorer, embedded inline by the cloned
 * "/adgm-courts/{cases,hearings,judgments}" pages. Reports its height to the
 * parent so the host <iframe> grows/shrinks to fit (no inner scrollbar).
 */
export default function EmbedCourtsPage() {
  useEffect(() => {
    const report = () => {
      const h = Math.ceil(document.documentElement.getBoundingClientRect().height);
      window.parent?.postMessage({ type: "poc-courts-height", height: h }, "*");
    };
    report();
    const ro = new ResizeObserver(report);
    ro.observe(document.body);
    window.addEventListener("load", report);
    const timers = [200, 600, 1200].map((ms) => window.setTimeout(report, ms));
    return () => {
      ro.disconnect();
      window.removeEventListener("load", report);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="bg-white">
      <CourtsExplorer />
    </div>
  );
}
