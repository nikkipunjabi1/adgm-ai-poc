"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchOverlay } from "@/components/search/search-overlay";

// Mirrors the live adgm.com top nav (shown on the "/" homepage clone).
const NAV = [
  { label: "About", href: "/" },
  { label: "Business", href: "/" },
  { label: "eServices", href: "/" },
  { label: "Resources", href: "/" },
  { label: "Contact & Support", href: "/" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { open: openSearch } = useSearchOverlay();

  return (
    <header className="sticky top-0 z-50 bg-adgm-navy-900 text-white">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Logo: ADGM wordmark + 10 Years badge (matches the clone) */}
        <Link href="/" className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight text-white">ADGM</span>
          <span className="h-6 w-px bg-white/25" />
          <span className="flex items-center gap-1 text-xs font-medium text-white/70">
            <span className="text-base font-bold leading-none text-white">10</span>
            Years
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-1 text-sm font-medium text-white/85 transition-colors hover:text-white"
            >
              {item.label}
              <ChevronDown className="h-3.5 w-3.5 opacity-70" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={openSearch}
            aria-label="Search"
            className="grid h-9 w-9 place-items-center rounded-full text-white/90 transition-colors hover:bg-white/10"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            href="/"
            className="hidden rounded-full border border-white/70 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-adgm-navy-900 sm:inline-block"
          >
            Setting up in ADGM
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-md text-white lg:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-white/10 bg-adgm-navy-900 lg:hidden",
          open ? "max-h-96" : "max-h-0",
        )}
        style={{ transition: "max-height 0.3s ease" }}
      >
        <nav className="flex flex-col px-5 py-2">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-sm font-medium text-white/85 hover:bg-white/10"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full border border-white/70 px-5 py-2.5 text-center text-sm font-semibold text-white"
          >
            Setting up in ADGM
          </Link>
        </nav>
      </div>
    </header>
  );
}
