import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks, PageHero, SidebarCard, SiblingNav } from "@/components/chrome";
import { IQAC_PAGES } from "@/data/content";

const SIBLINGS = [
  { label: "IQAC Overview", href: "/iqac" },
  ...Object.entries(IQAC_PAGES).map(([slug, p]) => ({ label: p.title, href: `/iqac/${slug}` })),
];

export function generateStaticParams() {
  return Object.keys(IQAC_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = IQAC_PAGES[slug];
  if (!page) return {};
  return { title: `${page.title} — IQAC`, description: page.description };
}

export default async function IqacSubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = IQAC_PAGES[slug];
  if (!page) notFound();

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        trail={[
          { label: "Home", href: "/" },
          { label: "IQAC", href: "/iqac" },
          { label: page.title },
        ]}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          <div className="max-w-3xl">
            <Blocks blocks={page.blocks} />
          </div>
          <aside className="space-y-6 self-start">
            <SidebarCard title="IQAC sections">
              <SiblingNav items={SIBLINGS} current={`/iqac/${slug}`} />
            </SidebarCard>
            <SidebarCard title="IQAC office">
              <p className="text-sm text-muted leading-relaxed">
                Certified records are available from the IQAC office at the institute.
              </p>
              <Link href="/contact" className="btn btn-navy btn-sm mt-4 w-full">
                Contact the office
              </Link>
            </SidebarCard>
          </aside>
        </div>
      </div>
    </>
  );
}
