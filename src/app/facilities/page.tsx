import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/chrome";
import { FACILITY_PAGES } from "@/data/content";

export const metadata: Metadata = {
  title: "Facilities",
  description: "Campus, library, computer labs and lecture halls — the infrastructure behind MSITM's learning.",
};

const ORDER = ["campus", "library", "computer-lab", "lecture-hall"];

export default function FacilitiesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Campus · Infrastructure"
        title="Facilities"
        description="Modern infrastructure — from a dedicated IoT lab and 250+ computer systems to a well-stocked library on a Wi-Fi-enabled campus."
        trail={[{ label: "Home", href: "/" }, { label: "Facilities" }]}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-4">
          {ORDER.map((slug) => {
            const p = FACILITY_PAGES[slug];
            return (
              <Link key={slug} href={`/facilities/${slug}`} className="card-line group p-6 md:p-8">
                <p className="eyebrow">{p.eyebrow}</p>
                <p className="font-display mt-2 text-2xl md:text-3xl font-semibold text-navy-900 group-hover:text-gold-700">
                  {p.title}
                </p>
                <p className="mt-2 text-muted leading-relaxed">{p.description}</p>
                <p className="mt-4 text-sm font-semibold text-navy-900">Explore →</p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
