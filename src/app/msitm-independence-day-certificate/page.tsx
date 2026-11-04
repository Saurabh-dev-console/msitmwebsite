import type { Metadata } from "next";
import Link from "next/link";
import { Blocks, PageHero, SidebarCard } from "@/components/chrome";
import { CertificateLookup } from "@/components/forms";
import type { Block } from "@/data/content";

export const metadata: Metadata = {
  title: "MSITM Independence Day Certificate",
  description: "Certificate verification desk for the MSITM Mega District Level Competition (Independence Day 2025).",
};

const blocks: Block[] = [
  { type: "lead", text: "A mega district level competition — verify participation and request your certificate." },
  { type: "heading", text: "Competitions" },
  {
    type: "list",
    style: "bullet",
    items: [
      "Online Quiz (Under-Graduate) — Topic: “Know Your India”. Test your knowledge of India's heritage, geography and current affairs.",
      "Essay Competition (Class 9th to 12th) — Topic: “India After Independence”. An essay on India's journey since 1947.",
      "Painting Competition (Class 6th to 8th) — Theme: “My India My Pride”. Show creativity and patriotism through colours.",
    ],
  },
  { type: "heading", text: "Event record" },
  {
    type: "facts",
    items: [
      { label: "Competition date", value: "13th August 2025" },
      { label: "Registration", value: "Free (6th–11th August 2025)" },
      { label: "Certificates from", value: "15th August 2025, 9:00 AM" },
      { label: "Helpline", value: "+91-9918942937" },
    ],
  },
  {
    type: "notice",
    tone: "warn",
    title: "Please read before requesting",
    text: "The official certificate records are maintained offline by the MSITM office and were not published on the website. This desk logs your verification request for the office to process — it cannot issue certificates instantly. No certificate data is fabricated here.",
  },
];

export default function MsitmCertificatePage() {
  return (
    <>
      <PageHero
        eyebrow="Certificates · Independence Day 2025"
        title="Independence Day — Claim Your Certificate"
        description="Verification desk for participants of the MSITM Degree College Mega District Level Competition."
        trail={[{ label: "Home", href: "/" }, { label: "Certificate Desk" }]}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="max-w-3xl">
            <Blocks blocks={blocks} />
            <p className="mt-8 text-sm">
              <Link href="/msitm-degree-college-mega-district-level-competition" className="link-underline font-semibold text-navy-900">
                ← Back to the competition report
              </Link>
            </p>
          </div>
          <aside className="self-start">
            <SidebarCard title="Verify & download">
              <CertificateLookup event="MSITM Mega District Level Competition 2025" />
              <p className="mt-4 text-xs text-muted leading-relaxed">
                Prefer to call? Event helpline:{" "}
                <a href="tel:+919918942937" className="font-semibold text-navy-900">
                  +91-9918942937
                </a>
              </p>
            </SidebarCard>
          </aside>
        </div>
      </div>
    </>
  );
}
