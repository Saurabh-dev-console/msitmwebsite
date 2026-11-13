import type { Metadata } from "next";
import Link from "next/link";
import { Icon, Icons, type IconName } from "@/components/icons";
import { PageHero } from "@/components/chrome";
import { NEWS_POSTS } from "@/data/news";
import { SITE_IMAGES } from "@/data/site";
import { NEWS_VISUALS } from "@/data/visuals";

export const metadata: Metadata = {
  title: "College News & Events",
  description: "News, events, celebrations and extra-curricular life at MSITM Gonda.",
};

const EVENT_STREAMS: { title: string; text: string; href: string; icon: IconName }[] = [
  { title: "College News", text: "Admissions announcements and event reports.", href: "/college-news-events/college-news", icon: "Newspaper" },
  { title: "Extra-Curricular Activities", text: "Competitions, seminars and skill-building.", href: "/college-news-events/extra-curricular-activities", icon: "Trophy" },
  { title: "Farewell 2017", text: "Bidding farewell to the BBA & BCA batch.", href: "/college-news-events/farewell-2017", icon: "PartyPopper" },
];

export default function NewsEventsIndex() {
  return (
    <>
      <PageHero
        eyebrow="Campus life · Updates"
        title="College News & Events"
        description="Announcements, competitions, celebrations and everyday life beyond the classroom."
        trail={[{ label: "Home", href: "/" }, { label: "News & Events" }]}
        image={SITE_IMAGES.fresherCelebration}
        imageAlt="Students receiving celebration awards on stage at MSITM"
        icon="Newspaper"
        badge="Campus Life & Events"
        subtitle="Announcements, Fests & Awards"
        objectPosition="top"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16 space-y-12">
        <section className="grid md:grid-cols-3 gap-4">
          {EVENT_STREAMS.map((item) => (
            <Link key={item.href} href={item.href} className="card-line group p-5 sm:p-6 flex flex-col min-w-0">
              <span className="h-10 w-10 rounded-lg bg-navy-50 border border-navy-100 text-gold-700 flex items-center justify-center mb-3 group-hover:bg-navy-900 group-hover:text-gold-300 transition-colors">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              <p className="font-display text-xl font-semibold text-navy-900 group-hover:text-gold-700 break-words">{item.title}</p>
              <p className="mt-2 text-sm text-muted leading-relaxed flex-1 break-words">{item.text}</p>
              <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700">
                Open
                <Icons.ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </p>
            </Link>
          ))}
        </section>
        <section>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-navy-900">Latest stories</h2>
          <div className="mt-5 grid md:grid-cols-3 gap-5">
            {NEWS_POSTS.map((n) => {
              const vis = NEWS_VISUALS[n.slug];
              return (
                <Link key={n.slug} href={`/${n.slug}`} className="card-line group p-6 flex flex-col min-w-0">
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-line">
                    {vis ? (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-gold-700">
                        <Icon name={vis.icon} className="h-3.5 w-3.5 shrink-0" />
                        <span>{vis.badge}</span>
                      </span>
                    ) : null}
                    <span className="text-xs font-medium text-muted inline-flex items-center gap-1.5 shrink-0">
                      <Icons.Calendar className="h-3.5 w-3.5 text-gold-600" aria-hidden="true" />
                      <span>{n.date}</span>
                    </span>
                  </div>
                  <p className="font-display mt-4 text-lg font-semibold text-navy-900 leading-snug group-hover:text-gold-700 break-words">
                    {n.title}
                  </p>
                  <p className="mt-2 text-sm text-muted leading-relaxed flex-1 break-words">{n.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900">
                    Read more
                    <Icons.ArrowRight className="h-4 w-4 text-gold-600 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
