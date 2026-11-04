import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionHeading } from "@/components/chrome";
import { PlacedGrid, RecruiterMarquee } from "@/components/widgets";
import { PLACED_STUDENTS } from "@/data/site";

export const metadata: Metadata = {
  title: "Placements",
  description:
    "Training & Placement Cell, recruiting companies and newly placed students of MSITM Gonda.",
};

export default function PlacementIndex() {
  return (
    <>
      <PageHero
        eyebrow="Careers · Training & Placement"
        title="Placements"
        description="At MSITM, placement is not an event — it is an ongoing process of training, guidance and industry connection."
        trail={[{ label: "Home", href: "/" }, { label: "Placements" }]}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
        <section className="grid md:grid-cols-3 gap-4">
          {[
            ["About Placement Cell", "The TPO, the cell's role, and how campus recruitment works.", "/placement/about-placement-cell"],
            ["Training & Placement", "The programme that introduces future leaders to the corporate atmosphere.", "/placement/traning-placement"],
            ["Success Stories", "Alumni testimonials — careers launched from Gonda.", "/success-stories"],
          ].map(([title, text, href]) => (
            <Link key={href} href={href} className="card-line group p-6">
              <p className="font-display text-xl font-semibold text-navy-900 group-hover:text-gold-700">{title}</p>
              <p className="mt-2 text-sm text-muted leading-relaxed">{text}</p>
              <p className="mt-3 text-sm font-semibold text-gold-700">Open →</p>
            </Link>
          ))}
        </section>

        <section>
          <SectionHeading
            eyebrow={`${PLACED_STUDENTS.length} profiles`}
            title="Meet our newly placed students"
            text="Genuine placement records published by the institute — students placed across IT, banking, finance and services."
          />
          <div className="mt-8">
            <PlacedGrid />
          </div>
        </section>

        <section>
          <SectionHeading eyebrow="Recruiters" title="Our students placed in top companies" />
          <div className="mt-6 border border-line bg-parchment p-4 md:p-6">
            <RecruiterMarquee />
          </div>
          <p className="mt-3 text-sm text-muted italic">Recruiter logos as published on msitm.edu.in.</p>
        </section>
      </div>
    </>
  );
}
