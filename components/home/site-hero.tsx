"use client";

import { Search, ArrowRight } from "lucide-react";
import { useSearchOverlay } from "@/components/search/search-overlay";

export function SiteHero() {
  const { open } = useSearchOverlay();
  return (
    <section className="relative isolate overflow-hidden bg-adgm-navy-900">
      {/* Backdrop image (ADGM public CDN) + gradient for legibility */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-45"
        style={{
          backgroundImage:
            "url(https://assets.adgm.com/images/assets/office_renovation_banner_2160x1287.jpg/Zz03YTViY2Q0NjA3MWMxMWYxOTI1OGNhZDQxZDc3N2Y4NQ==)",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-adgm-navy-900/85 via-adgm-navy-900/70 to-adgm-navy-900" />
      <div className="absolute -right-24 top-10 -z-10 h-[26rem] w-[26rem] rounded-full bg-adgm-blue/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="max-w-3xl">
          <p className="animate-fade-up text-sm font-medium uppercase tracking-[0.2em] text-adgm-blue-300">
            Abu Dhabi Global Market
          </p>
          <h1
            className="animate-fade-up mt-4 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "0.06s" }}
          >
            The world&apos;s premier international financial centre in the capital
            of the UAE
          </h1>
          <p
            className="animate-fade-up mt-5 max-w-2xl text-balance text-lg leading-relaxed text-white/70"
            style={{ animationDelay: "0.12s" }}
          >
            A broad and progressive financial centre — home to a thriving
            community of firms, funds and professionals operating within an
            independent legal framework.
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            style={{ animationDelay: "0.2s" }}
          >
            <button
              onClick={open}
              className="group flex w-full items-center gap-3 rounded-full bg-white/95 px-5 py-3.5 text-left shadow-glow transition-all hover:bg-white sm:w-[26rem]"
            >
              <Search className="h-5 w-5 text-adgm-blue" />
              <span className="flex-1 text-sm text-adgm-ink/60">
                Search firms, funds, cases, events…
              </span>
              <kbd className="hidden rounded border border-adgm-steel-light bg-adgm-brightgrey px-1.5 py-0.5 text-[11px] font-medium text-adgm-steel sm:inline">
                ⌘K
              </kbd>
            </button>
            <a
              href="/#explore"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-white"
            >
              Explore ADGM
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
