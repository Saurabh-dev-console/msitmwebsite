import type { Metadata } from "next";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { PageHero, SidebarCard } from "@/components/chrome";
import { AdmissionForm } from "@/components/forms";

export const metadata: Metadata = {
  title: "Admission Form",
  description: "Apply online to MSITM for the 2026–27 academic session — undergraduate, postgraduate, diploma and certificate programmes.",
};

export default function AdmissionFormPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions · 2026–27"
        title="Admission Form"
        description="Start your journey towards a brighter future. Submit this form and our admission counsellors will guide you through enrolment."
        trail={[
          { label: "Home", href: "/" },
          { label: "Admissions", href: "/admission-process" },
          { label: "Admission Form" },
        ]}
        icon="FileCheck2"
        badge="Admissions 2026–27"
        subtitle="Online Application Desk"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="card-line p-5 sm:p-6 md:p-8 min-w-0">
            <AdmissionForm />
          </div>
          <aside className="space-y-6 self-start min-w-0">
            <SidebarCard title="Before you apply">
              <ul className="check-list text-sm text-ink/85 leading-relaxed">
                <li>Check programme eligibility on the course pages.</li>
                <li>Keep your qualification details and phone number ready.</li>
                <li>Final admission follows university &amp; institute norms.</li>
              </ul>
              <div className="mt-4 flex flex-col gap-0.5">
                <Link
                  href="/admission-process"
                  className="inline-flex items-center gap-1.5 min-h-[44px] lg:min-h-0 py-1 lg:py-0 text-sm font-semibold text-navy-900 hover:text-gold-700"
                >
                  <Icons.ArrowRight className="h-3.5 w-3.5 text-gold-600 shrink-0" aria-hidden="true" />
                  <span>How the process works</span>
                </Link>
                <Link
                  href="/admission-calender"
                  className="inline-flex items-center gap-1.5 min-h-[44px] lg:min-h-0 py-1 lg:py-0 text-sm font-semibold text-navy-900 hover:text-gold-700"
                >
                  <Icons.ArrowRight className="h-3.5 w-3.5 text-gold-600 shrink-0" aria-hidden="true" />
                  <span>Admission calendar</span>
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-1.5 min-h-[44px] lg:min-h-0 py-1 lg:py-0 text-sm font-semibold text-navy-900 hover:text-gold-700"
                >
                  <Icons.ArrowRight className="h-3.5 w-3.5 text-gold-600 shrink-0" aria-hidden="true" />
                  <span>Browse all courses</span>
                </Link>
              </div>
            </SidebarCard>
            <SidebarCard title="Prefer to talk?">
              <p className="text-sm text-muted">Call the admissions office directly.</p>
              <a
                href="tel:+919565661505"
                className="mt-2 inline-flex items-center gap-2 min-h-[44px] lg:min-h-0 font-display text-xl font-semibold text-navy-900 hover:text-gold-700 whitespace-nowrap"
              >
                <Icons.Phone className="h-4 w-4 text-gold-700 shrink-0" aria-hidden="true" />
                <span>+91-9565661505</span>
              </a>
            </SidebarCard>
          </aside>
        </div>
      </div>
    </>
  );
}
