/**
 * Playwright browser lifecycle + politeness helpers.
 *
 * A single Chromium instance is shared across an adapter run. `withPage` hands
 * out a page, applies a polite randomized delay, and always cleans up.
 */
import { chromium, type Browser, type BrowserContext, type Page } from "playwright";
import { config } from "./config.js";

export async function launchBrowser(): Promise<Browser> {
  return chromium.launch({ headless: !config.headful });
}

export async function newContext(browser: Browser): Promise<BrowserContext> {
  const context = await browser.newContext({
    userAgent: config.userAgent,
    viewport: { width: 1440, height: 900 },
    locale: "en-US",
  });
  context.setDefaultNavigationTimeout(config.navTimeoutMs);
  context.setDefaultTimeout(config.navTimeoutMs);
  return context;
}

/** Random polite delay between requests, to avoid hammering ADGM. */
export function politeDelay(): Promise<void> {
  const { minDelayMs, maxDelayMs } = config;
  const ms = minDelayMs + Math.floor(Math.random() * Math.max(0, maxDelayMs - minDelayMs));
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Run `fn` with a fresh page, guaranteeing cleanup. */
export async function withPage<T>(
  context: BrowserContext,
  fn: (page: Page) => Promise<T>,
): Promise<T> {
  const page = await context.newPage();
  try {
    return await fn(page);
  } finally {
    await page.close();
  }
}
