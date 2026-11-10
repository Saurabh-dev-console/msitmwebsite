import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon, Icons } from "@/components/icons";
import { PageHero } from "@/components/chrome";
import { FACULTY_GROUPS } from "@/data/faculty";
import { SITE_IMAGES } from "@/data/site";
import { FACULTY_VISUALS } from "@/data/visuals";

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
        image={SITE_IMAGES.classroomLecture}
        imageAlt="Faculty mentoring MSITM students inside the lecture hall"
        icon="Users"
        badge={`${total} Faculty Members`}
        subtitle="Six Academic & Technical Departments"
        objectPosition="top"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FACULTY_GROUPS.map((g) => {
            const vis = FACULTY_VISUALS[g.slug];
            return (
              <Link key={g.slug} href={`/faculty/${g.slug}`} className="card-line group overflow-hidden flex flex-col">
                {vis ? (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-navy-950">
                    <Image
                      src={vis.image}
                      alt={vis.imageAlt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent" aria-hidden="true" />
                    <span className="absolute bottom-2.5 left-3 inline-flex items-center gap-1.5 rounded-md bg-navy-950/90 border border-gold-400/35 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-300">
                      <Icon name={vis.icon} className="h-3.5 w-3.5 text-gold-400" />
                      <span>{vis.badge}</span>
                    </span>
                  </div>
                ) : null}
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700">
                    {g.members.length} member{g.members.length === 1 ? "" : "s"}
                  </p>
                  <p className="font-display mt-2 text-2xl font-semibold text-navy-900 group-hover:text-gold-700">
                    {g.title}
                  </p>
                  <p className="mt-2 text-sm text-muted leading-relaxed flex-1">{g.intro}</p>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900">
                    Meet the department
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
