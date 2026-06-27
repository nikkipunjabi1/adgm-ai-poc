import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { SiteHero } from "@/components/home/site-hero";
import { OverviewGrid } from "@/components/home/overview-grid";
import { Latest } from "@/components/home/latest";
import { Subscribe } from "@/components/home/subscribe";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <SiteHero />
        <OverviewGrid />
        <Latest />
        <Subscribe />
      </main>
      <Footer />
    </div>
  );
}
