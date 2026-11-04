import type { Metadata } from "next";
import { PageHero, SectionHeading } from "@/components/chrome";
import { TestimonialCards } from "@/components/widgets";
import { TESTIMONIALS } from "@/data/site";

export const metadata: Metadata = {
  title: "Success Stories",
  description: "Alumni and industry testimonials — careers shaped at MSITM Gonda, in their own words.",
};

export default function SuccessStoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers · Testimonials"
        title="Success Stories"
        description={`${TESTIMONIALS.length} testimonials from alumni, recruiters and mentors — every word migrated from the institute's official website.`}
        trail={[
          { label: "Home", href: "/" },
          { label: "Placements", href: "/placement" },
          { label: "Success Stories" },
        ]}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <SectionHeading eyebrow="Voices" title="Graduates, in their own words" />
        <div className="mt-8">
          <TestimonialCards count={9} />
        </div>
      </div>
    </>
  );
}
