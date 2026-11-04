import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, SidebarCard, SiblingNav } from "@/components/chrome";
import { FACULTY_GROUPS, facultyGroup } from "@/data/faculty";

export function generateStaticParams() {
  return FACULTY_GROUPS.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = facultyGroup(slug);
  if (!g) return {};
  return { title: `${g.title} | MSITM`, description: g.intro };
}

function initials(name: string) {
  return name
    .replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.)\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0))
    .join("")
    .toUpperCase();
}

export default async function FacultyGroupPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const group = facultyGroup(slug);
  if (!group) notFound();
  const siblings = FACULTY_GROUPS.map((g) => ({ label: g.title, href: `/faculty/${g.slug}` }));

  return (
    <>
      <PageHero
        eyebrow="Faculty · Departments"
        title={group.heading}
        description={group.intro}
        trail={[
          { label: "Home", href: "/" },
          { label: "Faculty", href: "/faculty" },
          { label: group.title },
        ]}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          <div className="grid sm:grid-cols-2 gap-5 content-start">
            {group.members.map((m) => (
              <article key={m.name} className="card-line p-6 flex flex-col">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="w-14 h-14 shrink-0 bg-navy-900 text-gold-300 flex items-center justify-center font-display text-xl font-semibold"
                  >
                    {initials(m.name)}
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-semibold text-navy-900 leading-tight">{m.name}</h2>
                    {m.title ? <p className="text-xs font-bold uppercase tracking-[0.12em] text-gold-700 mt-0.5">{m.title}</p> : null}
                  </div>
                </div>
                <dl className="mt-4 space-y-2.5 text-sm">
                  <div>
                    <dt className="font-bold text-navy-900 text-xs uppercase tracking-wider">Qualifications</dt>
                    <dd className="text-ink/80 mt-0.5 leading-relaxed">{m.qualification}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-navy-900 text-xs uppercase tracking-wider">Areas of expertise</dt>
                    <dd className="text-ink/80 mt-0.5 leading-relaxed">{m.specialization}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
          <aside className="space-y-6 self-start">
            <SidebarCard title="Departments">
              <SiblingNav items={siblings} current={`/faculty/${slug}`} />
            </SidebarCard>
            <SidebarCard title="Join MSITM">
              <p className="text-sm text-muted leading-relaxed">Learn from experienced, full-time faculty.</p>
              <Link href="/admission-form" className="btn btn-gold btn-sm mt-4 w-full">
                Apply now
              </Link>
            </SidebarCard>
          </aside>
        </div>
      </div>
    </>
  );
}
