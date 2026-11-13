import type { Metadata } from "next";
import Link from "next/link";
import { Icon, Icons } from "@/components/icons";
import { PageHero } from "@/components/chrome";
import { IQAC_PAGES } from "@/data/content";
import { IQAC_VISUALS } from "@/data/visuals";

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
        icon="ShieldCheck"
        badge="IQAC · NAAC"
        subtitle="Quality Benchmarks & Records"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(IQAC_PAGES).map(([slug, p]) => {
            const vis = IQAC_VISUALS[slug];
            return (
              <Link key={slug} href={`/iqac/${slug}`} className="card-line group p-6 flex flex-col">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700">{p.eyebrow}</p>
                  <span className="h-9 w-9 rounded-lg bg-navy-50 border border-navy-100 text-gold-700 flex items-center justify-center shrink-0 group-hover:bg-navy-900 group-hover:text-gold-300 transition-colors">
                    <Icon name={vis?.icon ?? "ShieldCheck"} className="h-4.5 w-4.5" />
                  </span>
                </div>
                <p className="font-display text-xl font-semibold text-navy-900 group-hover:text-gold-700">{p.title}</p>
                <p className="mt-2 text-sm text-muted leading-relaxed flex-1">{p.description}</p>
                <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900">
                  Open
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
