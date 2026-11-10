import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icons } from "@/components/icons";
import { Blocks, PageHero, SidebarCard } from "@/components/chrome";
import { NEWS_POSTS, newsPost } from "@/data/news";
import { NEWS_VISUALS } from "@/data/visuals";

export const dynamicParams = true;

export function generateStaticParams() {
  return NEWS_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = newsPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function NewsPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = newsPost(slug);
  if (!post) notFound();
  const others = NEWS_POSTS.filter((p) => p.slug !== slug);
  const vis = NEWS_VISUALS[slug];

  return (
    <>
      <PageHero
        eyebrow={`College news · ${post.date}`}
        title={post.title}
        description={post.excerpt}
        trail={[
          { label: "Home", href: "/" },
          { label: "News & Events", href: "/college-news-events" },
          { label: "College News", href: "/college-news-events/college-news" },
          { label: post.title.length > 40 ? `${post.title.slice(0, 40)}…` : post.title },
        ]}
        image={vis?.image}
        imageAlt={vis?.imageAlt}
        icon={vis?.icon ?? "Newspaper"}
        badge={vis?.badge}
        subtitle={vis?.subtitle}
        objectPosition={vis?.objectPosition}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[1fr_300px]">
          <div className="max-w-3xl min-w-0">
            <Blocks blocks={post.blocks} />
            <nav aria-label="Posts navigation" className="mt-10 pt-8 border-t border-line">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700">More news</p>
              <div className="mt-3 grid sm:grid-cols-2 gap-4">
                {others.map((o) => (
                  <Link key={o.slug} href={`/${o.slug}`} className="card-line group p-5 min-w-0">
                    <p className="text-xs text-muted inline-flex items-center gap-1.5">
                      <Icons.Calendar className="h-3.5 w-3.5 text-gold-700 shrink-0" aria-hidden="true" />
                      <span>{o.date}</span>
                    </p>
                    <p className="mt-1.5 font-display font-semibold text-navy-900 group-hover:text-gold-700 leading-snug break-words">
                      {o.title}
                    </p>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
          <aside className="space-y-6 self-start min-w-0">
            <SidebarCard title="Recent news">
              <ul className="space-y-1.5 lg:space-y-3">
                {NEWS_POSTS.map((n) => (
                  <li key={n.slug}>
                    <Link
                      href={`/${n.slug}`}
                      aria-current={n.slug === slug ? "page" : undefined}
                      className={`inline-flex items-center min-h-[40px] lg:min-h-0 py-1 lg:py-0 text-sm font-semibold leading-snug ${
                        n.slug === slug ? "text-gold-700" : "text-navy-900 hover:text-gold-700"
                      }`}
                    >
                      {n.title}
                    </Link>
                    <p className="text-xs text-muted mt-0.5">{n.date}</p>
                  </li>
                ))}
              </ul>
            </SidebarCard>
            <SidebarCard title="Admissions 2026–27">
              <Link href="/admission-form" className="btn btn-gold btn-sm w-full">
                Apply now
              </Link>
            </SidebarCard>
          </aside>
        </div>
      </div>
    </>
  );
}
