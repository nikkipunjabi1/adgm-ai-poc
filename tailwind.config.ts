import type { Config } from "tailwindcss";

/**
 * ADGM brand palette, taken from the design tokens on adgm.com
 * (the site's :root --adgm-color-* variables captured during crawling).
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        adgm: {
          // citynight — deep navy used for headers/footers
          navy: {
            DEFAULT: "#001C7D",
            900: "#00092A",
            700: "#001C7D",
            500: "#002ED1",
          },
          // clearsky / sky — primary blue
          blue: {
            DEFAULT: "#0088FF",
            600: "#006DCC",
            500: "#0088FF",
            400: "#33A0FF",
            300: "#66B8FF",
            200: "#99CFFF",
            100: "#CCE7FF",
          },
          cool: "#B0FAFF", // coolglass accent
          steel: {
            DEFAULT: "#A3ADC2",
            light: "#DADEE7",
            mist: "#EDEFF3",
          },
          brightgrey: "#E5F0F0",
          sand: "#F5EDDE", // sunhaze
          ink: "#1A1F36",
          error: "#EB5757",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,54,0.04), 0 8px 24px rgba(16,24,54,0.06)",
        cardhover: "0 2px 4px rgba(16,24,54,0.06), 0 16px 40px rgba(16,24,54,0.12)",
        glow: "0 0 0 1px rgba(0,136,255,0.15), 0 12px 48px rgba(0,136,255,0.18)",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
