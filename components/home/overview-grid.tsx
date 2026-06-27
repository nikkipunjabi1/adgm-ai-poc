import { ArrowUpRight } from "lucide-react";

const ITEMS = [
  {
    title: "Business areas",
    desc: "Banking, capital markets, asset management, insurance and more.",
    image:
      "https://assets.adgm.com/images/assets/business_areas_616x348.jpg/Zz0wMDczZThlODExYzIxMWVmOWM3NTA2MTJlMmMzODRiNw==",
    href: "/search?q=ADGM business areas and financial services",
  },
  {
    title: "Setting up in ADGM",
    desc: "Establish your entity within a trusted, English-common-law jurisdiction.",
    image:
      "https://assets.adgm.com/images/assets/setting_up_616x348.jpg/Zz0wMzZhOWUxNjExYzIxMWVmOWU1MDA2MTJlMmMzODRiNw==",
    href: "/search?q=How do I set up in ADGM?",
  },
  {
    title: "Operating in ADGM",
    desc: "eServices, registrations and ongoing obligations for licensed entities.",
    image:
      "https://assets.adgm.com/images/assets/operating_in_616x348.jpg/Zz0wMmFmZjQ0NDExYzIxMWVmOWFlMGMyOGExOTM3MGQ1ZQ==",
    href: "/search?q=Operating in ADGM and eServices",
  },
  {
    title: "Public Registers",
    desc: "Search 471 firms, 260 funds and 2,800+ approved individuals.",
    image:
      "https://assets.adgm.com/images/assets/public_registers_616x348.jpg/Zz0wMzJkYWI1MDExYzIxMWVmODI0ZWNlYzNjMjc1YmVkYg==",
    href: "/search?q=Licensed firms in the ADGM public register",
  },
];

export function OverviewGrid() {
  return (
    <section id="explore" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-adgm-blue">
            Business
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-adgm-navy-900 sm:text-4xl">
            A platform of limitless opportunity
          </h2>
        </div>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item, i) => (
          <a
            key={item.title}
            href={item.href}
            className="group flex animate-fade-up flex-col overflow-hidden rounded-2xl border border-adgm-steel-mist bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-cardhover"
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <div className="relative h-40 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-adgm-navy-900/40 to-transparent" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-semibold text-adgm-navy-900">
                  {item.title}
                </h3>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-adgm-steel transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-adgm-blue" />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-adgm-ink/60">
                {item.desc}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
