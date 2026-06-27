/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "assets.adgm.com" },
    ],
  },
  // Transformers.js (+ onnxruntime/sharp) are native/heavy — keep them as
  // runtime server externals rather than bundling them.
  serverExternalPackages: ["@xenova/transformers", "onnxruntime-node", "sharp"],
  // The ingestion code under src/ingestion is Node-only (Playwright etc.) and
  // is never imported by the app; keep it out of the build graph.
  outputFileTracingExcludes: {
    "*": ["./src/ingestion/**", "./data/**"],
  },
};

export default nextConfig;
