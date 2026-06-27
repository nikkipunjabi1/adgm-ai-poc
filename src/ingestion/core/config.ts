/** Crawler configuration, read from environment with sensible defaults. */

const num = (key: string, fallback: number): number => {
  const v = process.env[key];
  const n = v ? Number(v) : NaN;
  return Number.isFinite(n) ? n : fallback;
};

const bool = (key: string, fallback: boolean): boolean => {
  const v = process.env[key]?.toLowerCase();
  if (v === "true") return true;
  if (v === "false") return false;
  return fallback;
};

export const config = {
  /** Polite random delay between page navigations. */
  minDelayMs: num("CRAWL_MIN_DELAY_MS", 1200),
  maxDelayMs: num("CRAWL_MAX_DELAY_MS", 2500),
  /** Run the browser with a visible window (debugging). */
  headful: bool("CRAWL_HEADFUL", false),
  /** A realistic desktop user agent. */
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  /** Default per-page navigation timeout. */
  navTimeoutMs: num("CRAWL_NAV_TIMEOUT_MS", 45_000),
} as const;
