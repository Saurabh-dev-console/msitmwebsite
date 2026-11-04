import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks, PageHero, SidebarCard, SiblingNav } from "@/components/chrome";
import { NEWS_INDEX_EXTRA } from "@/data/content";
import { NEWS_POSTS } from "@/data/news";

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
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
            <div className="space-y-5">
              {NEWS_POSTS.map((n, i) => (
                <Link
                  key={n.slug}
                  href={`/${n.slug}`}
                  className="card-line group grid md:grid-cols-[120px_1fr] gap-5 p-6"
                >
                  <div className="bg-navy-900 text-white p-4 text-center self-start">
                    <p className="font-display text-3xl font-semibold text-gold-300">{String(i + 1).padStart(2, "0")}</p>
                    <p className="mt-1 text-xs text-navy-100">{n.date}</p>
                  </div>
                  <div>
                    <p className="font-display text-xl md:text-2xl font-semibold text-navy-900 group-hover:text-gold-700 leading-snug">
                      {n.title}
                    </p>
                    <p className="mt-2 text-[0.95rem] text-muted leading-relaxed">{n.excerpt}</p>
                    <span className="mt-3 inline-block text-sm font-semibold text-navy-900">Read full story →</span>
                  </div>
                </Link>
              ))}
            </div>
            <aside className="space-y-6 self-start">
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
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          <div className="max-w-3xl">
            <Blocks blocks={page.blocks} />
          </div>
          <aside className="space-y-6 self-start">
            <SidebarCard title="News & events">
              <SiblingNav items={SIBLINGS} current={`/college-news-events/${slug}`} />
            </SidebarCard>
            <SidebarCard title="Recent news">
              <ul className="space-y-3">
                {NEWS_POSTS.map((n) => (
                  <li key={n.slug}>
                    <Link
                      href={`/${n.slug}`}
                      className="text-sm font-semibold text-navy-900 hover:text-gold-700 leading-snug"
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
