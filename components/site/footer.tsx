import Link from "next/link";

const COLUMNS = [
  {
    title: "About",
    links: ["Overview", "Jurisdiction", "Authorities", "Initiatives"],
  },
  {
    title: "Business",
    links: ["Business Areas", "Setting up", "Operating in ADGM", "Public Registers"],
  },
  {
    title: "Discover",
    links: ["News", "Events", "Publications", "Dispute Resolution"],
  },
  {
    title: "Support",
    links: ["Contact us", "Make an enquiry", "FAQs"],
  },
];

export function Footer() {
  return (
    <footer className="bg-adgm-navy-900 text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-white text-sm font-bold text-adgm-navy-900">
                A
              </span>
              <span className="text-lg font-semibold">ADGM</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Abu Dhabi Global Market — an international financial centre and
              free zone.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white/90">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link
                      href="/#explore"
                      className="text-sm text-white/55 transition-colors hover:text-adgm-blue-300"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center">
          <p>POC demo · Generative search over public ADGM content.</p>
          <p>Not affiliated with ADGM. For demonstration only.</p>
        </div>
      </div>
    </footer>
  );
}
