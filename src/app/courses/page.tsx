import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/chrome";
import { CourseCard } from "@/components/widgets";
import { COURSES, LEVELS, courseHref } from "@/data/courses";

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
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-14">
        {(Object.entries(LEVELS) as [keyof typeof LEVELS, (typeof LEVELS)[keyof typeof LEVELS]][]).map(
          ([slug, level]) => {
            const courses = COURSES.filter((c) => c.level === slug);
            return (
              <section key={slug}>
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="eyebrow">{level.eyebrow}</p>
                    <h2 className="font-display mt-2 text-3xl font-semibold text-navy-900">{level.title}</h2>
                  </div>
                  <Link href={`/courses/${slug}`} className="btn btn-outline-dark btn-sm">
                    Level overview →
                  </Link>
                </div>
                <p className="mt-3 max-w-3xl text-muted leading-relaxed">{level.intro}</p>
                <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courses.map((c) => (
                    <CourseCard
                      key={c.slug}
                      title={c.title}
                      fullName={c.fullName}
                      meta={`${c.kind}${c.duration ? ` · ${c.duration}` : ""}`}
                      href={courseHref(c)}
                    />
                  ))}
                </div>
              </section>
            );
          }
        )}
        <div className="band-navy px-6 py-8 md:px-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow eyebrow--light">Not sure which fits?</p>
            <p className="font-display mt-1 text-2xl font-semibold text-white">Talk to a counsellor first.</p>
          </div>
          <Link href="/contact" className="btn btn-gold">
            Contact admissions
          </Link>
        </div>
      </div>
    </>
  );
}
