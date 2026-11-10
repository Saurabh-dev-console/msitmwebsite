import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks, PageHero, SidebarCard, SiblingNav } from "@/components/chrome";
import type { IconName } from "@/components/icons";
import { ABOUT_PAGES } from "@/data/content";
import { NAVIGATION, CONTACT } from "@/data/site";

const ABOUT_ICONS: Record<string, IconName> = {
  "why-choose-msitm": "Award",
  "mission-vision": "Compass",
  "our-campus": "Building2",
  "president-leadership": "Landmark",
  "rankings-accolades": "Trophy",
  "university-profile": "GraduationCap",
  "equity-and-inclusion": "HeartHandshake",
};

const ABOUT_NAV = NAVIGATION.find((n) => n.label === "About")!.children.map((c) => ({
  label: c.label,
  href: c.href,
}));

export function generateStaticParams() {
  return Object.keys(ABOUT_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = ABOUT_PAGES[slug];
  if (!page) return {};
  return { title: page.title, description: page.description };
}

export default async function AboutSubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = ABOUT_PAGES[slug];
  if (!page) notFound();

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        trail={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: page.title },
        ]}
        image={page.image}
        imageAlt={page.imageAlt}
        icon={ABOUT_ICONS[slug] ?? "Landmark"}
        objectPosition={slug === "president-leadership" || slug === "rankings-accolades" || slug === "university-profile" ? "top" : "center"}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[1fr_300px]">
          <div className="max-w-3xl min-w-0">
            <Blocks blocks={page.blocks} />
          </div>
          <aside className="space-y-6 self-start min-w-0">
            <SidebarCard title="In this section">
              <SiblingNav items={ABOUT_NAV} current={`/about/${slug}`} />
            </SidebarCard>
            <SidebarCard title="Admissions 2026–27">
              <p className="text-sm text-muted leading-relaxed">
                Applications are open. Our counsellors respond within one business day.
              </p>
              <Link href="/admission-form" className="btn btn-gold btn-sm mt-4 w-full">
                Apply now
              </Link>
              <a
                href={CONTACT.phonePrimaryHref}
                className="flex items-center justify-center min-h-[44px] lg:min-h-0 mt-2 text-center text-sm font-semibold text-navy-900"
              >
                {CONTACT.phonePrimary}
              </a>
            </SidebarCard>
          </aside>
        </div>
      </div>
    </>
  );
}
