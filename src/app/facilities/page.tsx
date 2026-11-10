import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon, Icons } from "@/components/icons";
import { PageHero } from "@/components/chrome";
import { FACILITY_PAGES } from "@/data/content";
import { SITE_IMAGES } from "@/data/site";
import { FACILITY_VISUALS } from "@/data/visuals";

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
        image={SITE_IMAGES.heroCampus}
        imageAlt="MSITM green campus grounds and academic infrastructure"
        icon="Building2"
        badge="Campus Infrastructure"
        subtitle="Labs, Library & Lecture Halls"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {ORDER.map((slug) => {
            const p = FACILITY_PAGES[slug];
            const vis = FACILITY_VISUALS[slug];
            return (
              <Link key={slug} href={`/facilities/${slug}`} className="card-line group overflow-hidden flex flex-col">
                {vis ? (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-navy-950">
                    <Image
                      src={vis.image}
                      alt={vis.imageAlt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={`object-cover ${vis.objectPosition === "top" ? "object-top" : "object-center"} transition-transform duration-500 group-hover:scale-105`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent" aria-hidden="true" />
                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-navy-950/90 border border-gold-400/35 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-300">
                      <Icon name={vis.icon} className="h-3.5 w-3.5 text-gold-400" />
                      <span>{vis.badge}</span>
                    </span>
                  </div>
                ) : null}
                <div className="p-6 md:p-7 flex flex-col flex-1">
                  <p className="eyebrow">{p.eyebrow}</p>
                  <p className="font-display mt-2 text-2xl md:text-3xl font-semibold text-navy-900 group-hover:text-gold-700">
                    {p.title}
                  </p>
                  <p className="mt-2 text-muted leading-relaxed flex-1">{p.description}</p>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900">
                    Explore
                    <Icons.ArrowRight className="h-4 w-4 text-gold-600 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
