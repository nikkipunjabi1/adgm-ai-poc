/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hide the Next.js dev tools indicator (the floating "N" badge) in development.
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "assets.adgm.com" },
    ],
  },
  // Transformers.js (+ onnxruntime/sharp) are native/heavy — keep them as
  // runtime server externals rather than bundling them.
  serverExternalPackages: ["@xenova/transformers", "onnxruntime-node", "sharp"],
  // The ingestion code under src/ingestion is Node-only (Playwright etc.) and
  // is never imported by the app; keep the heavy/regenerable data out too.
  // NOTE: do NOT exclude data/normalized — the register/courts/v1 routes read
  // those JSON files at runtime via fs, and Next can't statically trace a
  // dynamic readFile(), so they must be force-included below.
  outputFileTracingExcludes: {
    "*": ["./src/ingestion/**", "./data/raw/**", "./data/pdfs/**", "./data/*.log"],
  },
  // Force the normalized dataset into the serverless bundles that read it (the
  // whole set is ~12 MB). Without this, register/courts return empty on Vercel.
  outputFileTracingIncludes: {
    "/api/register": ["./data/normalized/*.json"],
    "/api/courts": ["./data/normalized/*.json"],
    "/v1": ["./data/normalized/*.json"],
  },
  // "/" serves the exact mirrored ADGM homepage snapshot (public/adgm-clone).
  // "/demo" serves the SAME snapshot, but the injected demo-cards block only
  // renders there (it is path-gated), so "/" stays pristine. The working POC
  // homepage lives at "/v1".
  async rewrites() {
    // Root-relative asset paths that the cloned page's JS requests at runtime
    // (e.g. /images/icons/x.svg) — fall back to the mirrored copy under the
    // www.adgm.com clone folder so they resolve to local files.
    const assetDirs = [
      "images",
      "fonts",
      "css",
      "js",
      "content",
      "globalassets",
      "siteassets",
      "Static",
      "media",
    ];
    return {
      beforeFiles: [
        { source: "/", destination: "/adgm-clone/index.html" },
        { source: "/demo", destination: "/adgm-clone/index.html" },
        // "/search" reuses the SAME homepage snapshot so the real ADGM header +
        // footer render identically; an injected, path-gated block hides the
        // homepage content and embeds /embed/search in its place. (Requires no
        // app/search route — an app route would win over this rewrite.)
        { source: "/search", destination: "/adgm-clone/index.html" },
        // The FSRA Public Register clone — one snapshot serves all four tab URLs;
        // the injected explorer reads the path to set the active tab.
        { source: "/public-registers/fsra", destination: "/adgm-clone/public-registers/fsra.html" },
        { source: "/public-registers/fsra/firms", destination: "/adgm-clone/public-registers/fsra.html" },
        { source: "/public-registers/fsra/individuals", destination: "/adgm-clone/public-registers/fsra.html" },
        { source: "/public-registers/fsra/funds", destination: "/adgm-clone/public-registers/fsra.html" },
        // The ADGM Courts clone — one snapshot serves cases/hearings/judgments;
        // the injected explorer reads the path to set the active tab + title.
        { source: "/adgm-courts/cases", destination: "/adgm-clone/adgm-courts/cases.html" },
        { source: "/adgm-courts/hearings", destination: "/adgm-clone/adgm-courts/cases.html" },
        { source: "/adgm-courts/judgments", destination: "/adgm-clone/adgm-courts/cases.html" },
      ],
      afterFiles: assetDirs.map((d) => ({
        source: `/${d}/:path*`,
        destination: `/adgm-clone/www.adgm.com/${d}/:path*`,
      })),
      fallback: [],
    };
  },
};

export default nextConfig;
