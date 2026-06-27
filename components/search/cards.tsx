"use client";

import {
  Building2,
  Landmark,
  User,
  Scale,
  Calendar,
  Newspaper,
  FileWarning,
  FileText,
  BookOpen,
  ExternalLink,
  TriangleAlert,
  MapPin,
} from "lucide-react";
import type { SearchRecord } from "@/lib/search";
import type { Alert } from "@/lib/llm";
import { cn } from "@/lib/utils";

const META: Record<
  string,
  { icon: typeof Building2; label: string; accent: string; chip: string }
> = {
  firm: { icon: Building2, label: "Firm", accent: "text-adgm-blue", chip: "bg-adgm-blue/10 text-adgm-blue-600" },
  fund: { icon: Landmark, label: "Fund", accent: "text-adgm-navy-500", chip: "bg-adgm-navy/10 text-adgm-navy-700" },
  person: { icon: User, label: "Individual", accent: "text-adgm-blue", chip: "bg-adgm-blue/10 text-adgm-blue-600" },
  court: { icon: Scale, label: "Court", accent: "text-adgm-error", chip: "bg-adgm-error/10 text-adgm-error" },
  event: { icon: Calendar, label: "Event", accent: "text-adgm-blue", chip: "bg-adgm-blue/10 text-adgm-blue-600" },
  news: { icon: Newspaper, label: "News", accent: "text-adgm-blue", chip: "bg-adgm-blue/10 text-adgm-blue-600" },
  notice: { icon: FileWarning, label: "Public Notice", accent: "text-adgm-error", chip: "bg-adgm-error/10 text-adgm-error" },
  document: { icon: FileText, label: "Document", accent: "text-adgm-steel", chip: "bg-adgm-steel/15 text-adgm-ink/70" },
  page: { icon: BookOpen, label: "ADGM", accent: "text-adgm-steel", chip: "bg-adgm-steel/15 text-adgm-ink/70" },
};

function f(rec: SearchRecord, key: string): string | undefined {
  const v = rec.fields?.[key];
  return v == null || v === "" ? undefined : String(v);
}

/**
 * Build a deep link to the live ADGM page for this record, using the same
 * ?q= search parameter the ADGM site expects. Court records share content_type
 * "court" and are distinguished by source_id (cases / hearings / judgments).
 */
function deepLink(rec: SearchRecord): string {
  const caseNumber = f(rec, "caseNumber");
  const enc = (v: string) => encodeURIComponent(v);

  if (rec.content_type === "court" && caseNumber) {
    switch (rec.source_id) {
      case "judgments":
        return `https://www.adgm.com/adgm-courts/judgments?q=${enc(caseNumber)}`;
      case "hearings":
        // Hearings need the full param set or the page won't filter correctly.
        return `https://www.adgm.com/adgm-courts/hearings?categoryfilter=Upcoming+hearings&psize=10&q=${enc(caseNumber)}&sortby=date%23asc`;
      default:
        return `https://www.adgm.com/adgm-courts/cases?q=${enc(caseNumber)}`;
    }
  }

  if (rec.content_type === "notice") {
    const noticeId = f(rec, "noticeId");
    if (noticeId)
      return `https://www.adgm.com/registration-authority/public-notices?q=${enc(noticeId)}`;
  }

  return rec.url ?? "#";
}

/** Card label — court records show their specific subtype (Case/Hearing/Judgment). */
function cardLabel(rec: SearchRecord, fallback: string): string {
  if (rec.content_type === "court") {
    const ct = f(rec, "courtType");
    if (ct === "hearing") return "Hearing";
    if (ct === "judgment") return "Judgment";
    if (ct === "case") return "Case";
  }
  return fallback;
}

/** Type-specific key facts for the card body. */
function facts(rec: SearchRecord): { label: string; value: string }[] {
  const out: { label: string; value: string }[] = [];
  const add = (label: string, value?: string) => value && out.push({ label, value });
  switch (rec.content_type) {
    case "firm":
      add("Status", f(rec, "status"));
      add("FSP", f(rec, "fspNumber"));
      add("Address", f(rec, "address"));
      break;
    case "fund":
      add("Manager", f(rec, "fundManager"));
      add("Type", f(rec, "fundType"));
      add("Status", f(rec, "status"));
      break;
    case "person":
      add("Role", f(rec, "type") ?? f(rec, "panel"));
      add("Status", f(rec, "status"));
      add("Firms", (rec.fields?.firmNames as string[] | undefined)?.join(", "));
      break;
    case "court":
      add("Case", f(rec, "caseNumber"));
      if (f(rec, "courtType") === "hearing") {
        add("When", f(rec, "when"));
        add("Judge", f(rec, "judge"));
      } else if (f(rec, "courtType") === "judgment") {
        add("Citation", f(rec, "citation"));
        add("Parties", f(rec, "caseName") ?? f(rec, "parties"));
      } else {
        add("Parties", f(rec, "parties"));
        add("Commenced", f(rec, "dateCommenced"));
      }
      break;
    case "event":
      add("When", f(rec, "dateText"));
      add("Location", f(rec, "location"));
      break;
    case "notice":
      add("Company", f(rec, "company"));
      add("Notice", f(rec, "noticeId"));
      add("Published", f(rec, "publicationDate"));
      break;
    case "news":
      add("Category", f(rec, "category"));
      add("Date", rec.date ?? undefined);
      break;
  }
  return out.slice(0, 3);
}

export function SearchCard({
  rec,
  alert,
}: {
  rec: SearchRecord;
  alert?: Alert;
}) {
  const meta = META[rec.content_type] ?? META.document!;
  const Icon = meta.icon;
  const red = alert?.severity === "red";
  const amber = alert?.severity === "amber";

  return (
    <a
      href={deepLink(rec)}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "group relative flex flex-col rounded-xl border bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-cardhover",
        red
          ? "border-adgm-error/40 ring-1 ring-adgm-error/20"
          : amber
            ? "border-amber-300/60"
            : "border-adgm-steel-mist hover:border-adgm-blue/30",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className={cn("inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-semibold", meta.chip)}>
          <Icon className="h-3.5 w-3.5" />
          {cardLabel(rec, meta.label)}
        </span>
        <ExternalLink className="h-3.5 w-3.5 text-adgm-steel opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <h4 className="mt-2.5 line-clamp-2 text-sm font-semibold leading-snug text-adgm-navy-900">
        {rec.title}
      </h4>

      <dl className="mt-2 space-y-0.5">
        {facts(rec).map((fact) => (
          <div key={fact.label} className="flex gap-1.5 text-xs">
            <dt className="shrink-0 font-medium text-adgm-steel">{fact.label}:</dt>
            <dd className="line-clamp-1 text-adgm-ink/70">{fact.value}</dd>
          </div>
        ))}
      </dl>

      {alert && (
        <div
          className={cn(
            "mt-3 flex items-start gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium",
            red ? "bg-adgm-error/10 text-adgm-error" : "bg-amber-50 text-amber-700",
          )}
        >
          <TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>{alert.reason}</span>
        </div>
      )}
    </a>
  );
}

/** Compact event promo banner. */
export function EventPromo({ rec }: { rec: SearchRecord }) {
  return (
    <a
      href={rec.url ?? "#"}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-4 rounded-xl border border-adgm-blue/30 bg-gradient-to-r from-adgm-blue/5 to-transparent p-4 transition-all hover:shadow-card"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-adgm-blue/10">
        <Calendar className="h-5 w-5 text-adgm-blue" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-adgm-blue">
          Upcoming event
        </p>
        <h4 className="truncate text-sm font-semibold text-adgm-navy-900">{rec.title}</h4>
        <p className="mt-0.5 flex items-center gap-2 text-xs text-adgm-ink/60">
          {Boolean(rec.fields?.dateText) && <span>{String(rec.fields.dateText)}</span>}
          {Boolean(rec.fields?.location) && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {String(rec.fields.location)}
            </span>
          )}
        </p>
      </div>
    </a>
  );
}
