import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon, Icons } from "@/components/icons";
import { Blocks, PageHero, SidebarCard, SiblingNav } from "@/components/chrome";
import { NEWS_INDEX_EXTRA } from "@/data/content";
import { NEWS_POSTS } from "@/data/news";
import { SITE_IMAGES } from "@/data/site";
import { NEWS_VISUALS } from "@/data/visuals";

const SLUGS = ["college-news", ...Object.keys(NEWS_INDEX_EXTRA)];

const SIBLINGS = [
  { label: "News & Events", href: "/college-news-events" },
  { label: "College News", href: "/college-news-events/college-news" },
  { label: "Extra-Curricular Activities", href: "/college-news-events/extra-curricular-activities" },
  { label: "Farewell 2017", href: "/college-news-events/farewell-2017" },
  { label: "Student Corner", href: "/student-corner" },
];

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "college-news") {
    return { title: "College News", description: "Announcements, admissions updates and event reports from MSITM." };
  }
  const page = NEWS_INDEX_EXTRA[slug];
  if (!page) return {};
  return { title: page.title, description: page.description };
}

export default async function NewsSubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (slug === "college-news") {
    return (
      <>
        <PageHero
          eyebrow="News & Events · Updates"
          title="College News"
          description="Admissions announcements, competition reports and celebrations from across MSITM."
          trail={[
            { label: "Home", href: "/" },
            { label: "News & Events", href: "/college-news-events" },
            { label: "College News" },
          ]}
          image={SITE_IMAGES.fresherCelebration}
          imageAlt="Students receiving recognition awards on stage at MSITM"
          icon="Newspaper"
          badge="College Newsroom"
          subtitle="Announcements & Events"
          objectPosition="top"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
          <div className="grid gap-8 lg:gap-10 lg:grid-cols-[1fr_300px]">
            <div className="space-y-5 min-w-0">
              {NEWS_POSTS.map((n, i) => {
                const vis = NEWS_VISUALS[n.slug];
                return (
                  <Link
                    key={n.slug}
                    href={`/${n.slug}`}
                    className="card-line group grid md:grid-cols-[160px_1fr] gap-0 overflow-hidden min-w-0"
                  >
                    <div className="bg-navy-900 p-5 flex md:flex-col items-center md:items-start justify-between gap-3 text-white">
                      <span className="font-display text-2xl font-semibold text-gold-300">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {vis ? (
                        <div className="flex items-center gap-2 text-xs font-semibold text-navy-100">
                          <Icon name={vis.icon} className="h-4 w-4 text-gold-400 shrink-0" />
                          <span>{vis.badge}</span>
                        </div>
                      ) : null}
                    </div>
                    <div className="p-5 sm:p-6 min-w-0">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700 inline-flex items-center gap-1.5">
                        <Icons.Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{n.date}</span>
                      </p>
                      <p className="font-display mt-1.5 text-xl md:text-2xl font-semibold text-navy-900 group-hover:text-gold-700 leading-snug break-words">
                        {n.title}
                      </p>
                      <p className="mt-2 text-[0.95rem] text-muted leading-relaxed break-words">{n.excerpt}</p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900">
                        Read full story
                        <Icons.ArrowRight className="h-4 w-4 text-gold-600 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
            <aside className="space-y-6 self-start min-w-0">
              <SidebarCard title="News & events">
                <SiblingNav items={SIBLINGS} current="/college-news-events/college-news" />
              </SidebarCard>
            </aside>
          </div>
        </div>
      </>
    );
  }

  const page = NEWS_INDEX_EXTRA[slug];
  if (!page) notFound();

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        trail={[
          { label: "Home", href: "/" },
          { label: "News & Events", href: "/college-news-events" },
          { label: page.title },
        ]}
        image={page.image}
        imageAlt={page.imageAlt}
        icon={slug === "farewell-2017" ? "PartyPopper" : "Trophy"}
        objectPosition={slug === "farewell-2017" ? "top" : "center"}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[1fr_300px]">
          <div className="max-w-3xl min-w-0">
            <Blocks blocks={page.blocks} />
          </div>
          <aside className="space-y-6 self-start min-w-0">
            <SidebarCard title="News & events">
              <SiblingNav items={SIBLINGS} current={`/college-news-events/${slug}`} />
            </SidebarCard>
            <SidebarCard title="Recent news">
              <ul className="space-y-1.5 lg:space-y-3">
                {NEWS_POSTS.map((n) => (
                  <li key={n.slug}>
                    <Link
                      href={`/${n.slug}`}
                      className="inline-flex items-center min-h-[40px] lg:min-h-0 py-1 lg:py-0 text-sm font-semibold text-navy-900 hover:text-gold-700 leading-snug"
                    >
                      {n.title}
                    </Link>
                    <p className="text-xs text-muted mt-0.5">{n.date}</p>
                  </li>
                ))}
              </ul>
            </SidebarCard>
          </aside>
        </div>
      </div>
    </>
  );
}
