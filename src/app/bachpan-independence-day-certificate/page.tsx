import type { Metadata } from "next";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { Blocks, PageHero, SidebarCard } from "@/components/chrome";
import { CertificateLookup } from "@/components/forms";
import { SITE_IMAGES } from "@/data/site";
import type { Block } from "@/data/content";

export const metadata: Metadata = {
  title: "Bachpan Independence Day Certificate",
  description: "Certificate verification desk for Meena Shah Pre School (Bachpan) Independence Day 2025 competitions.",
};

const blocks: Block[] = [
  { type: "lead", text: "Meena Shah Pre School · Bachpan — verify participation and request your certificate." },
  { type: "heading", text: "Competitions" },
  {
    type: "list",
    style: "bullet",
    items: [
      "Essay Competition (Class 5th) — Topic: “My India”. Express your love for India through words.",
      "Poster Making (Class 3rd & 4th) — Topic: “Unity and Diversity of India”. A creative poster celebrating unity in diversity.",
      "Painting (Class 1st & 2nd) — Theme: “National Flag (Tiranga)”. Show artistic skill and patriotic spirit.",
    ],
  },
  { type: "heading", text: "Event record" },
  {
    type: "facts",
    items: [
      { label: "Competition date", value: "13th August 2025, 03:00 PM" },
      { label: "Registration", value: "Free (6th–11th August 2025)" },
      { label: "Award distribution", value: "15th August 2025" },
      { label: "Venue", value: "Near Karbala, Circular Road, Gonda – 271002" },
    ],
  },
  {
    type: "notice",
    tone: "warn",
    title: "Please read before requesting",
    text: "The official certificate records are maintained offline by the school office and were not published on the website. This desk logs your verification request for the office to process — it cannot issue certificates instantly. No certificate data is fabricated here.",
  },
];

export default function BachpanCertificatePage() {
  return (
    <>
      <PageHero
        eyebrow="Certificates · Meena Shah Pre School"
        title="Independence Day — Claim Your Certificate"
        description="Verification desk for young participants of the Bachpan Independence Day 2025 competitions."
        trail={[{ label: "Home", href: "/" }, { label: "Certificate Desk" }]}
        image={SITE_IMAGES.campusCourtyard}
        imageAlt="MSITM campus celebration and student participation"
        icon="Award"
        badge="Bachpan Pre-School"
        subtitle="Independence Day 2025"
        objectPosition="top"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[1fr_380px]">
          <div className="max-w-3xl min-w-0">
            <Blocks blocks={blocks} />
            <p className="mt-8 text-sm">
              <Link
                href="/celebrate-independence-day-with-creativity-and-fun-at-meena-shah-pre-school"
                className="link-underline inline-flex items-center gap-1.5 min-h-[44px] lg:min-h-0 font-semibold text-navy-900"
              >
                <Icons.ArrowLeft className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Back to the event report</span>
              </Link>
            </p>
          </div>
          <aside className="self-start min-w-0">
            <SidebarCard title="Verify & download">
              <CertificateLookup event="Meena Shah Pre School (Bachpan) Independence Day 2025" />
              <p className="mt-4 text-xs text-muted leading-relaxed flex flex-wrap items-center gap-1.5">
                <Icons.Phone className="h-3.5 w-3.5 text-gold-700 shrink-0" aria-hidden="true" />
                <span>
                  Prefer to call? Call{" "}
                  <a href="tel:+919565661505" className="inline-flex items-center min-h-[44px] lg:min-h-0 font-semibold text-navy-900 whitespace-nowrap">
                    +91-9565661505
                  </a>
                </span>
              </p>
            </SidebarCard>
          </aside>
        </div>
      </div>
    </>
  );
}
