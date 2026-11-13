import type { Metadata } from "next";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { PageHero } from "@/components/chrome";
import { SearchBox } from "@/components/widgets";
import { searchSite } from "@/data/search";

export const metadata: Metadata = {
  title: "Search",
  description: "Search courses, faculty, placements, news and every page of the MSITM website.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const results = query ? searchSite(query) : [];

  return (
    <>
      <PageHero
        eyebrow="Find anything"
        title="Search MSITM"
        description="Search courses, faculty, placements, news and every page of this website."
        trail={[{ label: "Home", href: "/" }, { label: "Search" }]}
        icon="Search"
        badge="Site Directory"
        subtitle="Courses, Faculty & Records"
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <SearchBox initial={query} />
        {query ? (
          <div className="mt-8">
            <p className="text-sm text-muted" role="status">
              {results.length} result{results.length === 1 ? "" : "s"} for “<strong>{query}</strong>”
            </p>
            <ul className="mt-4 space-y-3">
              {results.map((r) => (
                <li key={r.href + r.title}>
                  <Link href={r.href} className="card-line group block p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold-700">{r.section}</p>
                    <p className="mt-1 font-display text-lg font-semibold text-navy-900 group-hover:text-gold-700">
                      {r.title}
                    </p>
                    <p className="mt-1 text-sm text-muted truncate">{r.href}</p>
                  </Link>
                </li>
              ))}
            </ul>
            {results.length === 0 ? (
              <div className="mt-6 rounded-xl border border-line bg-parchment p-8 text-center">
                <Icons.SearchX className="h-8 w-8 text-gold-700 mx-auto mb-2" aria-hidden="true" />
                <p className="font-semibold text-navy-900">No matches found.</p>
                <p className="mt-1 text-sm text-muted">
                  Try “BCA”, “NIELIT”, “placement”, “library” — or{" "}
                  <Link href="/contact" className="link-underline font-semibold">
                    ask a counsellor
                  </Link>
                  .
                </p>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="mt-8">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-gold-700">Popular searches</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["BCA", "MBA", "NIELIT O Level", "CCC", "Placements", "Fees", "Library", "Admission 2026"].map((t) => (
                <Link
                  key={t}
                  href={`/search?q=${encodeURIComponent(t)}`}
                  className="card-line inline-flex items-center gap-1.5 min-h-[44px] lg:min-h-0 px-4 py-2 text-sm font-semibold text-navy-900"
                >
                  <Icons.Tag className="h-3.5 w-3.5 text-gold-600" aria-hidden="true" />
                  <span>{t}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
