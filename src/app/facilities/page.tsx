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
        image={SITE_IMAGES.campusCourtyard}
        imageAlt="MSITM students in the campus courtyard and academic grounds"
        icon="Building2"
        badge="Campus Infrastructure"
        subtitle="Labs, Library & Lecture Halls"
      />
      <div className="divide-y divide-line">
        {ORDER.map((slug) => {
          const p = FACILITY_PAGES[slug];
          const vis = FACILITY_VISUALS[slug];
          return (
            <section key={slug} className="w-full">
              {vis?.image ? (
                <div className="relative w-full aspect-[16/9] lg:aspect-[21/8] max-h-[500px] overflow-hidden bg-navy-950">
                  <Image
                    src={vis.image}
                    alt={vis.imageAlt ?? p.title}
                    fill
                    loading="lazy"
                    sizes="100vw"
                    className={`object-cover ${vis.objectPosition === "top" ? "object-[50%_20%]" : "object-center"}`}
                  />
                </div>
              ) : (
                <div className="w-full band-navy hero-graph-grid border-y border-gold-400/20 py-10 md:py-12">
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold-300">
                      <span>Computing Infrastructure</span>
                      <span>250+ Workstations · Exam Ready</span>
                    </div>
                    <div className="mt-6 grid sm:grid-cols-3 gap-4">
                      {[
                        { icon: "Monitor" as const, label: "Practical Labs", detail: "Dedicated student workstations" },
                        { icon: "Cpu" as const, label: "IoT Wing", detail: "Modern lab & embedded systems" },
                        { icon: "Network" as const, label: "Campus Wi-Fi", detail: "In-house hardware support" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-lg border border-white/15 bg-white/5 px-5 py-4 flex items-center gap-4"
                        >
                          <span className="h-10 w-10 rounded-lg bg-gold-400/15 border border-gold-400/35 flex items-center justify-center shrink-0">
                            <Icon name={item.icon} className="h-5 w-5 text-gold-300" />
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white">{item.label}</p>
                            <p className="text-xs text-navy-100/75 mt-0.5">{item.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div className="bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="max-w-3xl min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="eyebrow">{p.eyebrow}</p>
                      {vis ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gold-700">
                          <Icon name={vis.icon} className="h-3.5 w-3.5" />
                          <span>{vis.badge}</span>
                        </span>
                      ) : null}
                    </div>
                    <h2 className="font-display mt-2 text-2xl sm:text-3xl font-semibold text-navy-900">
                      {p.title}
                    </h2>
                    <p className="mt-2 text-muted leading-relaxed">{p.description}</p>
                  </div>
                  <Link href={`/facilities/${slug}`} className="btn btn-navy shrink-0 w-full sm:w-auto">
                    Explore {p.title}
                    <Icons.ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
