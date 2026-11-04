import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/chrome";
import { IQAC_PAGES } from "@/data/content";

export const metadata: Metadata = {
  title: "IQAC",
  description: "Internal Quality Assurance Cell at MSITM — quality benchmarks, reports and accreditation records.",
};

export default function IqacIndex() {
  return (
    <>
      <PageHero
        eyebrow="Quality · NAAC"
        title="Internal Quality Assurance Cell"
        description="Making quality assurance an integral part of the functioning of the institution — in the spirit of NAAC's national mandate."
        trail={[{ label: "Home", href: "/" }, { label: "IQAC" }]}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(IQAC_PAGES).map(([slug, p]) => (
            <Link key={slug} href={`/iqac/${slug}`} className="card-line group p-6 flex flex-col">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700">{p.eyebrow}</p>
              <p className="font-display mt-2 text-xl font-semibold text-navy-900 group-hover:text-gold-700">{p.title}</p>
              <p className="mt-2 text-sm text-muted leading-relaxed flex-1">{p.description}</p>
              <p className="mt-4 text-sm font-semibold text-navy-900">Open →</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
