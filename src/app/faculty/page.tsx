import type { Metadata } from "next";
import Link from "next/link";
import { Icon, Icons } from "@/components/icons";
import { PageHero } from "@/components/chrome";
import { FACULTY_GROUPS } from "@/data/faculty";
import { SITE_IMAGES } from "@/data/site";
import { FACULTY_VISUALS } from "@/data/visuals";

export const metadata: Metadata = {
  title: "Faculty",
  description: "Experienced, full-time faculty across IT, management, diploma, hardware and support departments.",
};

export default function FacultyIndex() {
  const total = FACULTY_GROUPS.reduce((n, g) => n + g.members.length, 0);
  return (
    <>
      <PageHero
        eyebrow="People · Faculty"
        title="Faculty"
        description={`MSITM is supported by experienced and qualified full-time faculty — ${total} members across six departments.`}
        trail={[{ label: "Home", href: "/" }, { label: "Faculty" }]}
        image={SITE_IMAGES.lectureHallAuthentic}
        imageAlt="MSITM faculty addressing students inside the lecture hall"
        icon="Users"
        badge={`${total} Faculty Members`}
        subtitle="Six Academic & Technical Departments"
        objectPosition="top"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FACULTY_GROUPS.map((g) => {
            const vis = FACULTY_VISUALS[g.slug];
            return (
              <Link key={g.slug} href={`/faculty/${g.slug}`} className="card-line group p-6 flex flex-col min-w-0">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700">
                    {g.members.length} member{g.members.length === 1 ? "" : "s"}
                  </p>
                  {vis ? (
                    <span className="h-9 w-9 rounded-lg bg-navy-50 border border-navy-100 text-gold-700 flex items-center justify-center shrink-0 group-hover:bg-navy-900 group-hover:text-gold-300 transition-colors">
                      <Icon name={vis.icon} className="h-4.5 w-4.5" />
                    </span>
                  ) : null}
                </div>
                <p className="font-display text-2xl font-semibold text-navy-900 group-hover:text-gold-700">
                  {g.title}
                </p>
                <p className="mt-2 text-sm text-muted leading-relaxed flex-1">{g.intro}</p>
                <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900">
                  Meet the department
                  <Icons.ArrowRight className="h-4 w-4 text-gold-600 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
