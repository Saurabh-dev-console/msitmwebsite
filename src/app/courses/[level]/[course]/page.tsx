import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks, PageHero, SidebarCard } from "@/components/chrome";
import { CourseCard, PrintButton } from "@/components/widgets";
import { COURSES, LEVELS, courseHref, coursesByLevel } from "@/data/courses";
import type { Block } from "@/data/content";

export function generateStaticParams() {
  return COURSES.map((c) => ({ level: c.level, course: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ level: string; course: string }>;
}): Promise<Metadata> {
  const { level, course } = await params;
  const c = COURSES.find((x) => x.level === level && x.slug === course);
  if (!c) return {};
  return { title: `${c.title} — ${c.fullName}`, description: c.intro[0]?.slice(0, 160) };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ level: string; course: string }>;
}) {
  const { level, course } = await params;
  const c = COURSES.find((x) => x.level === level && x.slug === course);
  if (!c) notFound();
  const levelData = LEVELS[c.level];
  const related = coursesByLevel(c.level).filter((x) => x.slug !== c.slug);

  const factItems = [
    ...(c.duration ? [{ label: "Duration", value: c.duration }] : []),
    ...(c.eligibility ? [{ label: "Eligibility", value: c.eligibility }] : []),
    ...(c.awarding ? [{ label: "Awarding / Authority", value: c.awarding }] : []),
    { label: "Level", value: `${c.levelLabel} · ${c.kind}` },
  ];

  const blocks: Block[] = [
    { type: "prose", paragraphs: c.intro },
    ...(c.sections ?? []).flatMap(
      (s): Block[] => [
        { type: "heading", text: s.heading },
        ...(s.body.length > 0 ? [{ type: "prose", paragraphs: s.body } as Block] : []),
        ...(s.list ? [{ type: "list", style: "check", items: s.list } as Block] : []),
      ]
    ),
    ...(c.table ? [{ type: "table", head: c.table.head, rows: c.table.rows } as Block] : []),
    ...(c.note ? [{ type: "notice", tone: "info", title: "Good to know", text: c.note } as Block] : []),
  ];

  return (
    <>
      <PageHero
        eyebrow={`Courses · ${c.kind}`}
        title={`${c.title} — ${c.fullName}`}
        description={c.intro[0]?.slice(0, 220)}
        trail={[
          { label: "Home", href: "/" },
          { label: "Courses", href: "/courses" },
          { label: levelData.title, href: `/courses/${c.level}` },
          { label: c.title },
        ]}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8 max-w-3xl">
            <dl className="grid sm:grid-cols-2 gap-px bg-line border border-line">
              {factItems.map((f) => (
                <div key={f.label} className="bg-white p-5">
                  <dt className="text-xs font-bold uppercase tracking-[0.14em] text-gold-700">{f.label}</dt>
                  <dd className="mt-1.5 font-semibold text-navy-900 leading-relaxed text-[0.95rem]">{f.value}</dd>
                </div>
              ))}
            </dl>
            <Blocks blocks={blocks} />
            <div className="flex flex-wrap gap-3 print-hidden">
              <PrintButton />
              <Link href="/admission-form" className="btn btn-gold btn-sm">
                Apply for this course
              </Link>
            </div>
            {related.length > 0 ? (
              <div>
                <h2 className="font-display text-2xl font-semibold text-navy-900">Related {c.levelLabel.toLowerCase()} programmes</h2>
                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                  {related.slice(0, 4).map((r) => (
                    <CourseCard
                      key={r.slug}
                      title={r.title}
                      fullName={r.fullName}
                      meta={r.kind}
                      href={courseHref(r)}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <aside className="space-y-6 self-start print-hidden">
            <SidebarCard title="Apply for 2026–27">
              <p className="text-sm text-muted leading-relaxed">
                Admissions are open. Submit the form and a counsellor will respond within one business day.
              </p>
              <Link href="/admission-form" className="btn btn-navy btn-sm mt-4 w-full">
                Open admission form
              </Link>
              <Link href="/contact" className="btn btn-outline-dark btn-sm mt-2 w-full">
                Ask a question
              </Link>
            </SidebarCard>
            <SidebarCard title={`More ${levelData.title.toLowerCase()}`}>
              <ul className="space-y-2">
                {coursesByLevel(c.level).map((x) => (
                  <li key={x.slug}>
                    <Link
                      href={courseHref(x)}
                      aria-current={x.slug === c.slug ? "page" : undefined}
                      className={`text-sm hover:text-gold-700 hover:underline underline-offset-4 ${
                        x.slug === c.slug ? "font-bold text-gold-700" : "text-ink/80"
                      }`}
                    >
                      {x.title} — {x.fullName}
                    </Link>
                  </li>
                ))}
              </ul>
            </SidebarCard>
          </aside>
        </div>
      </div>
    </>
  );
}
