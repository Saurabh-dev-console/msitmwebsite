import type { Metadata } from "next";
import Link from "next/link";
import { Icon, Icons } from "@/components/icons";
import { PageHero } from "@/components/chrome";
import { CourseCard } from "@/components/widgets";
import { COURSES, LEVELS, courseHref } from "@/data/courses";
import { COURSE_LEVEL_VISUALS, COURSE_VISUALS } from "@/data/visuals";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "All courses at MSITM — BBA, BCA, MBA, MCA, NIELIT diplomas, CABA-MDTP and career certificate courses.",
};

export default function CoursesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Academics · Catalogue"
        title="Courses at MSITM"
        description="From three-year degrees to six-week certificates — every programme is designed to turn study into profession."
        trail={[{ label: "Home", href: "/" }, { label: "Courses" }]}
        icon="GraduationCap"
        badge="21 Programmes"
        subtitle="Degrees, Diplomas & Certificates"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-14">
        {(Object.entries(LEVELS) as [keyof typeof LEVELS, (typeof LEVELS)[keyof typeof LEVELS]][]).map(
          ([slug, level]) => {
            const courses = COURSES.filter((c) => c.level === slug);
            const lvlVis = COURSE_LEVEL_VISUALS[slug];
            return (
              <section key={slug}>
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    {lvlVis ? (
                      <span className="h-11 w-11 rounded-xl bg-navy-900 text-gold-300 border border-gold-400/35 flex items-center justify-center shrink-0 mt-1">
                        <Icon name={lvlVis.icon} className="h-5 w-5" />
                      </span>
                    ) : null}
                    <div>
                      <p className="eyebrow">{level.eyebrow}</p>
                      <h2 className="font-display mt-1.5 text-3xl font-semibold text-navy-900">{level.title}</h2>
                    </div>
                  </div>
                  <Link href={`/courses/${slug}`} className="btn btn-outline-dark btn-sm">
                    Level overview
                    <Icons.ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
                <p className="mt-3 max-w-3xl text-muted leading-relaxed">{level.intro}</p>
                <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courses.map((c) => {
                    const cVis = COURSE_VISUALS[c.slug];
                    return (
                      <CourseCard
                        key={c.slug}
                        title={c.title}
                        fullName={c.fullName}
                        meta={`${c.kind}${c.duration ? ` · ${c.duration}` : ""}`}
                        href={courseHref(c)}
                        icon={cVis?.icon}
                      />
                    );
                  })}
                </div>
              </section>
            );
          }
        )}
        <div className="band-navy rounded-xl px-5 py-7 sm:px-6 sm:py-8 md:px-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="eyebrow eyebrow--light">Not sure which fits?</p>
            <p className="font-display mt-1 text-2xl font-semibold text-white">Talk to a counsellor first.</p>
          </div>
          <Link href="/contact" className="btn btn-gold w-full sm:w-auto shrink-0">
            Contact admissions
            <Icons.ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </>
  );
}
