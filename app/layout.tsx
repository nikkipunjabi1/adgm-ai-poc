import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SearchOverlayProvider } from "@/components/search/search-overlay";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ADGM — Intelligent Search",
  description:
    "Abu Dhabi Global Market — search firms, funds, court cases, judgments, events, news and more, with AI-guided answers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <SearchOverlayProvider>{children}</SearchOverlayProvider>
      </body>
    </html>
  );
}
