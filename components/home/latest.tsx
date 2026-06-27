import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { latestNews, upcomingEvents } from "@/lib/data";

export async function Latest() {
  const [news, events] = await Promise.all([latestNews(4), upcomingEvents(3)]);

  return (
    <section className="bg-adgm-brightgrey/40 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          {/* Latest News */}
          <div>
            <div className="flex items-end justify-between">
              <h2 className="text-2xl font-semibold tracking-tight text-adgm-navy-900 sm:text-3xl">
                Latest News
              </h2>
              <Link
                href="/search?q=Latest ADGM news"
                className="inline-flex items-center gap-1 text-sm font-semibold text-adgm-blue hover:text-adgm-blue-600"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 space-y-3">
              {news.map((n) => (
                <Link
                  key={n.uid}
                  href={`/search?q=${encodeURIComponent(n.title)}`}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-adgm-steel-mist bg-white p-5 shadow-card transition-all hover:border-adgm-blue/30 hover:shadow-cardhover"
                >
                  <div className="min-w-0">
                    {Boolean(n.fields?.category) && (
                      <span className="text-xs font-medium uppercase tracking-wide text-adgm-blue">
                        {String(n.fields.category)}
                      </span>
                    )}
                    <h3 className="mt-1 line-clamp-2 font-medium text-adgm-navy-900 group-hover:text-adgm-blue-600">
                      {n.title}
                    </h3>
                    {n.date && (
                      <p className="mt-1 text-xs text-adgm-steel">{n.date}</p>
                    )}
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-adgm-steel transition-all group-hover:translate-x-0.5 group-hover:text-adgm-blue" />
                </Link>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-adgm-navy-900 sm:text-3xl">
              Upcoming Events
            </h2>
            <div className="mt-6 space-y-3">
              {events.length === 0 && (
                <p className="rounded-xl border border-dashed border-adgm-steel-light bg-white/60 p-5 text-sm text-adgm-steel">
                  No upcoming events listed.
                </p>
              )}
              {events.map((ev) => (
                <Link
                  key={ev.uid}
                  href={`/search?q=${encodeURIComponent(ev.title)}`}
                  className="group block rounded-xl border border-adgm-steel-mist bg-adgm-navy-900 p-5 text-white shadow-card transition-all hover:shadow-cardhover"
                >
                  <h3 className="font-semibold leading-snug group-hover:text-adgm-blue-200">
                    {ev.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/60">
                    {Boolean(ev.fields?.dateText) && (
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {String(ev.fields.dateText)}
                      </span>
                    )}
                    {Boolean(ev.fields?.location) && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {String(ev.fields.location)}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
