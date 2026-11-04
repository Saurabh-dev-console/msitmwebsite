import type { Metadata } from "next";
import Link from "next/link";
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
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="card-line p-6 md:p-8">
            <AdmissionForm />
          </div>
          <aside className="space-y-6 self-start">
            <SidebarCard title="Before you apply">
              <ul className="check-list text-sm text-ink/85 leading-relaxed">
                <li>Check programme eligibility on the course pages.</li>
                <li>Keep your qualification details and phone number ready.</li>
                <li>Final admission follows university &amp; institute norms.</li>
              </ul>
              <div className="mt-4 space-y-2">
                <Link href="/admission-process" className="block text-sm font-semibold text-navy-900 hover:text-gold-700">
                  → How the process works
                </Link>
                <Link href="/admission-calender" className="block text-sm font-semibold text-navy-900 hover:text-gold-700">
                  → Admission calendar
                </Link>
                <Link href="/courses" className="block text-sm font-semibold text-navy-900 hover:text-gold-700">
                  → Browse all courses
                </Link>
              </div>
            </SidebarCard>
            <SidebarCard title="Prefer to talk?">
              <p className="text-sm text-muted">Call the admissions office directly.</p>
              <a href="tel:+919565661505" className="mt-2 block font-display text-xl font-semibold text-navy-900">
                +91-9565661505
              </a>
            </SidebarCard>
          </aside>
        </div>
      </div>
    </>
  );
}
