"use client";

import { useEffect } from "react";
import { RegisterExplorer } from "@/components/register/register-explorer";

/**
 * Chromeless FSRA Public Register explorer, embedded inline by the cloned
 * "/public-registers/fsra" page. It reports its height to the parent so the
 * host <iframe> can grow/shrink to fit (no inner scrollbar).
 */
export default function EmbedRegisterPage() {
  useEffect(() => {
    const report = () => {
      const h = Math.ceil(document.documentElement.getBoundingClientRect().height);
      window.parent?.postMessage({ type: "poc-register-height", height: h }, "*");
    };
    report();
    const ro = new ResizeObserver(report);
    ro.observe(document.body);
    window.addEventListener("load", report);
    // a couple of late reports catch fonts/data settling after first paint
    const timers = [200, 600, 1200].map((ms) => window.setTimeout(report, ms));
    return () => {
      ro.disconnect();
      window.removeEventListener("load", report);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="bg-white">
      <RegisterExplorer />
    </div>
  );
}
