import { Mail } from "lucide-react";

export function Subscribe() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-adgm-navy-900 px-8 py-12 lg:px-14 lg:py-14">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-adgm-blue/20 blur-3xl" />
        <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Stay informed
            </h2>
            <p className="mt-2 text-white/65">
              Get the latest ADGM news, events and regulatory updates.
            </p>
          </div>
          <form className="flex w-full max-w-md items-center gap-2 lg:w-auto">
            <div className="relative flex-1">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-adgm-steel" />
              <input
                type="email"
                placeholder="Your email address"
                className="w-full rounded-full border border-white/15 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:border-adgm-blue/50 focus:outline-none"
              />
            </div>
            <button
              type="button"
              className="shrink-0 rounded-full bg-adgm-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-adgm-blue-600"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
