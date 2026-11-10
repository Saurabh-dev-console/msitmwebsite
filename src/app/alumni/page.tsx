import type { Metadata } from "next";
import Link from "next/link";
import { Icon, Icons, type IconName } from "@/components/icons";
import { PageHero, SectionHeading } from "@/components/chrome";
import { TestimonialCards } from "@/components/widgets";
import { PLACED_STUDENTS, SITE_IMAGES } from "@/data/site";

export const metadata: Metadata = {
  title: "Alumni",
  description: "MSITM alumni — forever connected by the university, the experience, and the love for MSITM.",
};

const ALUMNI_PILLARS: { title: string; text: string; icon: IconName }[] = [
  {
    title: "Stay connected",
    text: "Over 50,000 students have enrolled at MSITM since 1998. Alumni remain part of the family — mentoring juniors, returning for tech events, and hiring from campus.",
    icon: "Users",
  },
  {
    title: "Volunteer",
    text: "Serving as a volunteer is a terrific way to give back and make a lasting impact. Share your time, knowledge and skill for the benefit of students and fellow alumni.",
    icon: "HeartHandshake",
  },
  {
    title: "Hire from MSITM",
    text: "Leading organisations recognise MSITM as a reliable source of talent. Connect with the Training & Placement Cell for campus recruitment.",
    icon: "Briefcase",
  },
];

export default function AlumniPage() {
  return (
    <>
      <PageHero
        eyebrow="Community · Graduates"
        title="Alumni"
        description="Forever connected by our institution, our experience, and our love for MSITM."
        trail={[{ label: "Home", href: "/" }, { label: "Alumni" }]}
        image={SITE_IMAGES.alumniSuccess}
        imageAlt="MSITM alumni mentors conversing with students in the sunny campus courtyard"
        icon="Users"
        badge="Alumni Network"
        subtitle="50,000+ Enrolled Since 1998"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
        <section className="grid md:grid-cols-3 gap-4">
          {ALUMNI_PILLARS.map((item) => (
            <div key={item.title} className="card-line p-6">
              <span className="h-10 w-10 rounded-lg bg-navy-50 border border-navy-100 text-gold-700 flex items-center justify-center mb-3">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              <p className="font-display text-xl font-semibold text-navy-900">{item.title}</p>
              <p className="mt-2 text-sm text-muted leading-relaxed">{item.text}</p>
            </div>
          ))}
        </section>
        <section>
          <SectionHeading
            eyebrow={`${PLACED_STUDENTS.length} placed profiles`}
            title="Alumni at work"
            text="A selection of graduates and the organisations they joined — the full gallery lives on the placements page."
          />
          <div className="mt-6">
            <Link href="/placement" className="btn btn-navy w-full sm:w-auto">
              View placed students
              <Icons.ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
        <section>
          <SectionHeading eyebrow="In their own words" title="Alumni testimonials" />
          <div className="mt-8">
            <TestimonialCards count={6} />
          </div>
        </section>
        <aside className="rounded-xl border border-navy-100 bg-navy-50 px-6 py-5 flex gap-3.5 items-start">
          <Icons.Info className="h-5 w-5 text-navy-900 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-navy-900">Editorial note</p>
            <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink/85">
              The previous alumni page carried unreplaced template content (foreign-chapter events and unverifiable
              earnings statistics). Those elements have been retired rather than republished — see the{" "}
              <Link href="/audit" className="link-underline font-semibold">
                public audit report
              </Link>
              . Alumni event dates and the registered alumni count will be published here once verified by the institute.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
