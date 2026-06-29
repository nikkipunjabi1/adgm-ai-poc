import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { SearchExperience } from "@/components/search/search-experience";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <div className="flex min-h-screen flex-col bg-adgm-brightgrey/30">
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-adgm-ink/60 transition-colors hover:text-adgm-navy-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to ADGM
        </Link>

        <div className="mt-5 overflow-hidden rounded-2xl border border-adgm-steel-mist bg-white shadow-card">
          <SearchExperience variant="page" initialQuery={q ?? ""} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
