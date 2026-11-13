import type { Metadata } from "next";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { PageHero } from "@/components/chrome";
import { COURSES, LEVELS, courseHref } from "@/data/courses";
import { FACULTY_GROUPS } from "@/data/faculty";
import { NEWS_POSTS } from "@/data/news";
import { NAVIGATION } from "@/data/site";
import { FACILITY_PAGES, IQAC_PAGES, PLACEMENT_PAGES } from "@/data/content";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Every page on the MSITM website, grouped by section.",
};

export default function SitemapPage() {
  return (
    <>
      <PageHero
        eyebrow="Index · Every page"
        title="Sitemap"
        description="The complete structure of this website — every section, course, and record."
        trail={[{ label: "Home", href: "/" }, { label: "Sitemap" }]}
        icon="Compass"
        badge="Site Index"
        subtitle="All Routes & Programmes"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {NAVIGATION.map((section) => (
            <nav key={section.label} aria-label={section.label} className="min-w-0">
              <Link href={section.href} className="font-display text-xl font-semibold text-navy-900 hover:text-gold-700 inline-flex items-center gap-2 min-h-[44px] lg:min-h-0">
                <Icons.Compass className="h-4 w-4 text-gold-600 shrink-0" aria-hidden="true" />
                <span>{section.label}</span>
              </Link>
              <div className="h-0.5 w-8 bg-gold-400 my-2" aria-hidden="true" />
              <ul className="space-y-0.5 lg:space-y-1.5">
                {section.children.map((child) => (
                  <li key={child.href + child.label}>
                    <Link href={child.href} className="inline-flex items-center min-h-[40px] lg:min-h-0 py-1 lg:py-0 text-sm text-ink/75 hover:text-gold-700 hover:underline underline-offset-4">
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <nav aria-label="All courses" className="min-w-0">
            <p className="font-display text-xl font-semibold text-navy-900">All {COURSES.length} courses</p>
            <div className="h-0.5 w-8 bg-gold-400 my-2" aria-hidden="true" />
            {Object.entries(LEVELS).map(([slug, level]) => (
              <div key={slug} className="mt-3">
                <Link href={`/courses/${slug}`} className="inline-flex items-center min-h-[40px] lg:min-h-0 text-sm font-bold text-navy-900 hover:text-gold-700">
                  {level.title}
                </Link>
                <ul className="mt-1 space-y-0.5 lg:space-y-1">
                  {COURSES.filter((c) => c.level === slug).map((c) => (
                    <li key={c.slug}>
                      <Link href={courseHref(c)} className="inline-flex items-center min-h-[40px] lg:min-h-0 py-1 lg:py-0 text-sm text-ink/75 hover:text-gold-700 hover:underline underline-offset-4 break-words">
                        {c.title} — {c.fullName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          <nav aria-label="More" className="min-w-0">
            <p className="font-display text-xl font-semibold text-navy-900">More</p>
            <div className="h-0.5 w-8 bg-gold-400 my-2" aria-hidden="true" />
            <ul className="space-y-0.5 lg:space-y-1.5">
              {[
                ["/", "Home"],
                ["/contact", "Contact"],
                ["/search", "Search"],
                ["/success-stories", "Success Stories"],
                ["/student-corner", "Student Corner"],
                ["/alumni", "Alumni"],
                ["/training-placement", "Training & Placement"],
                ["/msitm-independence-day-certificate", "MSITM Certificate Desk"],
                ["/bachpan-independence-day-certificate", "Bachpan Certificate Desk"],
                ["/privacy-policy", "Privacy Policy"],
                ["/audit", "Audit Report"],
                ["/design-system", "Design System"],
                ["/sitemap-page", "Sitemap"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="inline-flex items-center min-h-[40px] lg:min-h-0 py-1 lg:py-0 text-sm text-ink/75 hover:text-gold-700 hover:underline underline-offset-4">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm font-bold text-navy-900">News posts</p>
            <ul className="mt-1 space-y-0.5 lg:space-y-1">
              {NEWS_POSTS.map((n) => (
                <li key={n.slug}>
                  <Link href={`/${n.slug}`} className="inline-flex items-center min-h-[40px] lg:min-h-0 py-1 lg:py-0 text-sm text-ink/75 hover:text-gold-700 hover:underline underline-offset-4">
                    {n.title}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm font-bold text-navy-900">Departments & records</p>
            <ul className="mt-1 space-y-0.5 lg:space-y-1">
              {FACULTY_GROUPS.map((g) => (
                <li key={g.slug}>
                  <Link href={`/faculty/${g.slug}`} className="inline-flex items-center min-h-[40px] lg:min-h-0 py-1 lg:py-0 text-sm text-ink/75 hover:text-gold-700 hover:underline underline-offset-4">
                    {g.title}
                  </Link>
                </li>
              ))}
              {Object.keys(FACILITY_PAGES).map((s) => (
                <li key={s}>
                  <Link href={`/facilities/${s}`} className="inline-flex items-center min-h-[40px] lg:min-h-0 py-1 lg:py-0 text-sm text-ink/75 hover:text-gold-700 hover:underline underline-offset-4">
                    {FACILITY_PAGES[s].title}
                  </Link>
                </li>
              ))}
              {Object.keys(PLACEMENT_PAGES).map((s) => (
                <li key={s}>
                  <Link href={`/placement/${s}`} className="inline-flex items-center min-h-[40px] lg:min-h-0 py-1 lg:py-0 text-sm text-ink/75 hover:text-gold-700 hover:underline underline-offset-4">
                    {PLACEMENT_PAGES[s].title}
                  </Link>
                </li>
              ))}
              {Object.keys(IQAC_PAGES).map((s) => (
                <li key={s}>
                  <Link href={`/iqac/${s}`} className="inline-flex items-center min-h-[40px] lg:min-h-0 py-1 lg:py-0 text-sm text-ink/75 hover:text-gold-700 hover:underline underline-offset-4">
                    {IQAC_PAGES[s].title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
