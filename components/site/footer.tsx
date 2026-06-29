import Link from "next/link";
import { Linkedin, Twitter, Instagram, Youtube } from "lucide-react";

// Mirrors the live adgm.com footer (shown on the "/" homepage clone).
const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "About",
    links: [
      "Overview",
      "Jurisdiction",
      "Authorities",
      "Initiatives",
      "ADGM Academy",
      "Dispute Resolution",
      "Careers",
      "ADGM Brand Book",
    ].map((label) => ({ label, href: "/" })),
  },
  {
    title: "Business",
    links: [
      { label: "Overview", href: "/" },
      { label: "Business areas", href: "/" },
      { label: "Setting up", href: "/" },
      { label: "Operating in", href: "/" },
      { label: "Public registers", href: "/public-registers/fsra" },
      { label: "Legal framework", href: "/" },
    ],
  },
  {
    title: "eServices",
    links: [
      "AccessRP",
      "ACCESSADGM",
      "Online Registry Solution",
      "Electronic Prudential Reporting",
      "FSRA Connect",
    ].map((label) => ({ label, href: "/" })),
  },
  {
    title: "Discover",
    links: ["Media", "News", "Events", "Spotlight", "Podcasts", "Publications", "Documents"].map(
      (label) => ({ label, href: "/" }),
    ),
  },
  {
    title: "Contact & Support",
    links: ["Make an enquiry", "Speaking Up", "Frequently Asked Questions"].map((label) => ({
      label,
      href: "/",
    })),
  },
];

const LEGAL = ["Sitemap", "Terms and conditions", "Privacy policy", "Cookies policy"];
const SOCIAL = [
  { Icon: Linkedin, label: "LinkedIn" },
  { Icon: Twitter, label: "X" },
  { Icon: Instagram, label: "Instagram" },
  { Icon: Youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-adgm-navy-900 text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-base font-semibold text-white">{col.title}</h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/55 transition-colors hover:text-adgm-blue-300"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-tight text-white">ADGM</span>
            <span className="h-6 w-px bg-white/25" />
            <span className="flex items-center gap-1 text-xs font-medium text-white/70">
              <span className="text-base font-bold leading-none text-white">10</span>
              Years
            </span>
          </div>

          <div className="flex flex-col gap-3 text-xs text-white/50 sm:flex-row sm:items-center sm:gap-5">
            <span>© 2026 ADGM. All rights reserved.</span>
            <span className="flex flex-wrap gap-x-4 gap-y-1">
              {LEGAL.map((l) => (
                <Link key={l} href="/" className="transition-colors hover:text-white">
                  {l}
                </Link>
              ))}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {SOCIAL.map(({ Icon, label }) => (
              <Link
                key={label}
                href="/"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-adgm-blue hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
