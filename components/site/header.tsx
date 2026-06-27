"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchOverlay } from "@/components/search/search-overlay";

const NAV = [
  { label: "Overview", href: "/" },
  { label: "Business", href: "/#explore" },
  { label: "Setting up", href: "/#explore" },
  { label: "Public Registers", href: "/#explore" },
  { label: "Legal Framework", href: "/#explore" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { open: openSearch } = useSearchOverlay();

  return (
    <header className="sticky top-0 z-50 border-b border-adgm-steel-mist/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-adgm-navy-900 text-sm font-bold tracking-tight text-white">
            A
          </span>
          <span className="text-lg font-semibold tracking-tight text-adgm-navy-900">
            ADGM
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-adgm-ink/70 transition-colors hover:bg-adgm-brightgrey hover:text-adgm-navy-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={openSearch}
            className="hidden items-center gap-2 rounded-full bg-adgm-blue px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-adgm-blue-600 hover:shadow-glow sm:flex"
          >
            <Search className="h-4 w-4" />
            Search
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-md text-adgm-navy-900 md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-adgm-steel-mist/80 bg-white md:hidden",
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
              className="rounded-md px-3 py-3 text-sm font-medium text-adgm-ink/80 hover:bg-adgm-brightgrey"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
