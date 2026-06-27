/** Adapter registry. Add new sources here as they're built. */
import type { SourceId } from "../core/types.js";
import type { SourceAdapter } from "./base.js";
import { firmsAdapter } from "./firms.js";
import { individualsAdapter } from "./individuals.js";
import { fundsAdapter } from "./funds.js";
import { casesAdapter, hearingsAdapter, judgmentsAdapter } from "./courts.js";
import { documentsAdapter } from "./documents.js";
import { newsAdapter } from "./news.js";
import { eventsAdapter } from "./events.js";
import { panelistsAdapter } from "./panelists.js";
import { noticesAdapter } from "./notices.js";
import { pagesAdapter } from "./pages.js";

// Order matters for `--all`: fast/breadth sources first, the huge `individuals`
// enrichment (2,831 detail pages) LAST so it's what resumes in a later session.
export const adapters: Record<string, SourceAdapter> = {
  firms: firmsAdapter,
  funds: fundsAdapter,
  cases: casesAdapter,
  hearings: hearingsAdapter,
  judgments: judgmentsAdapter,
  documents: documentsAdapter,
  news: newsAdapter,
  events: eventsAdapter,
  panelists: panelistsAdapter,
  notices: noticesAdapter,
  pages: pagesAdapter,
  individuals: individualsAdapter,
};

export function getAdapter(sourceId: string): SourceAdapter | undefined {
  return adapters[sourceId];
}

export function allSourceIds(): SourceId[] {
  return Object.keys(adapters) as SourceId[];
}
