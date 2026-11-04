import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks, PageHero, SidebarCard, SiblingNav } from "@/components/chrome";
import { FACILITY_PAGES } from "@/data/content";

const SIBLINGS = Object.entries(FACILITY_PAGES).map(([slug, p]) => ({
  label: p.title,
  href: `/facilities/${slug}`,
}));

export function generateStaticParams() {
  return Object.keys(FACILITY_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = FACILITY_PAGES[slug];
  if (!page) return {};
  return { title: page.title, description: page.description };
}

export default async function FacilityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = FACILITY_PAGES[slug];
  if (!page) notFound();

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        trail={[
          { label: "Home", href: "/" },
          { label: "Facilities", href: "/facilities" },
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
            <SidebarCard title="Facilities">
              <SiblingNav items={SIBLINGS} current={`/facilities/${slug}`} />
            </SidebarCard>
            <SidebarCard title="Visit the campus">
              <p className="text-sm text-muted leading-relaxed">Meena Nagar, Circular Road, Gonda 271002.</p>
              <Link href="/contact" className="btn btn-navy btn-sm mt-4 w-full">
                Plan a visit
              </Link>
            </SidebarCard>
          </aside>
        </div>
      </div>
    </>
  );
}
