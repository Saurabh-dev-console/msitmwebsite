import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks, PageHero, SidebarCard, SiblingNav } from "@/components/chrome";
import { PLACEMENT_PAGES } from "@/data/content";

export function generateStaticParams() {
  return Object.keys(PLACEMENT_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = PLACEMENT_PAGES[slug];
  if (!page) return {};
  return { title: page.title, description: page.description };
}

export default async function PlacementSubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = PLACEMENT_PAGES[slug];
  if (!page) notFound();

  const siblings = [
    { label: "Placements Overview", href: "/placement" },
    ...Object.entries(PLACEMENT_PAGES).map(([s, p]) => ({ label: p.title, href: `/placement/${s}` })),
    { label: "Success Stories", href: "/success-stories" },
    { label: "Alumni", href: "/alumni" },
  ];

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        trail={[
          { label: "Home", href: "/" },
          { label: "Placements", href: "/placement" },
          { label: page.title },
        ]}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          <div className="max-w-3xl">
            <Blocks blocks={page.blocks} />
          </div>
          <aside className="space-y-6 self-start">
            <SidebarCard title="Placements">
              <SiblingNav items={siblings} current={`/placement/${slug}`} />
            </SidebarCard>
            <SidebarCard title="For recruiters">
              <p className="text-sm text-muted leading-relaxed">
                Invite MSITM talent to your organisation through the Training &amp; Placement Cell.
              </p>
              <Link href="/contact" className="btn btn-navy btn-sm mt-4 w-full">
                Contact the cell
              </Link>
            </SidebarCard>
          </aside>
        </div>
      </div>
    </>
  );
}
