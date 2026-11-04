import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/chrome";
import { NEWS_POSTS } from "@/data/news";

export const metadata: Metadata = {
  title: "College News & Events",
  description: "News, events, celebrations and extra-curricular life at MSITM Gonda.",
};

export default function NewsEventsIndex() {
  return (
    <>
      <PageHero
        eyebrow="Campus life · Updates"
        title="College News & Events"
        description="Announcements, competitions, celebrations and everyday life beyond the classroom."
        trail={[{ label: "Home", href: "/" }, { label: "News & Events" }]}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
        <section className="grid md:grid-cols-3 gap-4">
          {[
            ["College News", "Admissions announcements and event reports.", "/college-news-events/college-news"],
            ["Extra-Curricular Activities", "Competitions, seminars and skill-building.", "/college-news-events/extra-curricular-activities"],
            ["Farewell 2017", "Bidding farewell to the BBA & BCA batch.", "/college-news-events/farewell-2017"],
          ].map(([title, text, href]) => (
            <Link key={href} href={href} className="card-line group p-6">
              <p className="font-display text-xl font-semibold text-navy-900 group-hover:text-gold-700">{title}</p>
              <p className="mt-2 text-sm text-muted leading-relaxed">{text}</p>
              <p className="mt-3 text-sm font-semibold text-gold-700">Open →</p>
            </Link>
          ))}
        </section>
        <section>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-navy-900">Latest stories</h2>
          <div className="mt-5 grid md:grid-cols-3 gap-4">
            {NEWS_POSTS.map((n) => (
              <Link key={n.slug} href={`/${n.slug}`} className="card-line group p-6 flex flex-col">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700">{n.date}</p>
                <p className="font-display mt-2 text-lg font-semibold text-navy-900 leading-snug group-hover:text-gold-700">
                  {n.title}
                </p>
                <p className="mt-2 text-sm text-muted leading-relaxed flex-1">{n.excerpt}</p>
                <span className="mt-4 text-sm font-semibold text-navy-900">Read more →</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
