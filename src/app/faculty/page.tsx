import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/chrome";
import { FACULTY_GROUPS } from "@/data/faculty";

export const metadata: Metadata = {
  title: "Faculty",
  description: "Experienced, full-time faculty across IT, management, diploma, hardware and support departments.",
};

export default function FacultyIndex() {
  const total = FACULTY_GROUPS.reduce((n, g) => n + g.members.length, 0);
  return (
    <>
      <PageHero
        eyebrow="People · Faculty"
        title="Faculty"
        description={`MSITM is supported by experienced and qualified full-time faculty — ${total} members across six departments.`}
        trail={[{ label: "Home", href: "/" }, { label: "Faculty" }]}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FACULTY_GROUPS.map((g) => (
            <Link key={g.slug} href={`/faculty/${g.slug}`} className="card-line group p-6 flex flex-col">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700">
                {g.members.length} member{g.members.length === 1 ? "" : "s"}
              </p>
              <p className="font-display mt-2 text-2xl font-semibold text-navy-900 group-hover:text-gold-700">
                {g.title}
              </p>
              <p className="mt-2 text-sm text-muted leading-relaxed flex-1">{g.intro}</p>
              <p className="mt-4 text-sm font-semibold text-navy-900">Meet the department →</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
