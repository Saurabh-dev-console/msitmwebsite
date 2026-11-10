import type { Metadata } from "next";
import Link from "next/link";
import { Icon, Icons, type IconName } from "@/components/icons";
import { PageHero, SectionHeading } from "@/components/chrome";
import { PlacedGrid, RecruiterMarquee } from "@/components/widgets";
import { PLACED_STUDENTS, SITE_IMAGES } from "@/data/site";

export const metadata: Metadata = {
  title: "Placements",
  description:
    "Training & Placement Cell, recruiting companies and newly placed students of MSITM Gonda.",
};

const PLACEMENT_CARDS: { title: string; text: string; href: string; icon: IconName }[] = [
  {
    title: "About Placement Cell",
    text: "The TPO, the cell's role, and how campus recruitment works.",
    href: "/placement/about-placement-cell",
    icon: "Building2",
  },
  {
    title: "Training & Placement",
    text: "The programme that introduces future leaders to the corporate atmosphere.",
    href: "/placement/traning-placement",
    icon: "Presentation",
  },
  {
    title: "Success Stories",
    text: "Alumni testimonials — careers launched from Gonda.",
    href: "/success-stories",
    icon: "Sparkles",
  },
];

export default function PlacementIndex() {
  return (
    <>
      <PageHero
        eyebrow="Careers · Training & Placement"
        title="Placements"
        description="At MSITM, placement is not an event — it is an ongoing process of training, guidance and industry connection."
        trail={[{ label: "Home", href: "/" }, { label: "Placements" }]}
        image={SITE_IMAGES.placementCareers}
        imageAlt="Graduating MSITM students in a campus placement interview"
        icon="Briefcase"
        badge="Campus Placements"
        subtitle="Corporate Drives & Training"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
        <section className="grid md:grid-cols-3 gap-4">
          {PLACEMENT_CARDS.map((card) => (
            <Link key={card.href} href={card.href} className="card-line group p-6 flex flex-col">
              <span className="h-10 w-10 rounded-lg bg-navy-50 border border-navy-100 text-gold-700 flex items-center justify-center mb-3 group-hover:bg-navy-900 group-hover:text-gold-300 transition-colors">
                <Icon name={card.icon} className="h-5 w-5" />
              </span>
              <p className="font-display text-xl font-semibold text-navy-900 group-hover:text-gold-700">{card.title}</p>
              <p className="mt-2 text-sm text-muted leading-relaxed flex-1">{card.text}</p>
              <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700">
                Open
                <Icons.ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </p>
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
          <div className="mt-6 rounded-xl border border-line bg-parchment p-4 md:p-6">
            <RecruiterMarquee />
          </div>
          <p className="mt-3 text-sm text-muted italic">Recruiter logos as published on msitm.edu.in.</p>
        </section>
      </div>
    </>
  );
}
