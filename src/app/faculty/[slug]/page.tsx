import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon, Icons } from "@/components/icons";
import { PageHero, SidebarCard, SiblingNav } from "@/components/chrome";
import { FACULTY_GROUPS, facultyGroup } from "@/data/faculty";
import { FACULTY_VISUALS } from "@/data/visuals";

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
  const vis = FACULTY_VISUALS[slug];

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
        icon={vis?.icon}
        badge={vis?.badge}
        subtitle={vis?.subtitle}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[1fr_300px]">
          <div className="grid sm:grid-cols-2 gap-5 content-start min-w-0">
            {group.members.map((m) => (
              <article key={m.name} className="card-line p-5 sm:p-6 flex flex-col min-w-0">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="relative shrink-0">
                    <span
                      aria-hidden="true"
                      className="w-14 h-14 rounded-full bg-navy-900 border-2 border-gold-400/50 text-gold-300 flex items-center justify-center font-display text-lg font-semibold shadow-xs"
                    >
                      {initials(m.name)}
                    </span>
                    {vis ? (
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-white border border-line text-gold-700 flex items-center justify-center shadow-2xs"
                      >
                        <Icon name={vis.icon} className="h-3.5 w-3.5" />
                      </span>
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-display text-lg font-semibold text-navy-900 leading-tight break-words">{m.name}</h2>
                    {m.title ? <p className="text-xs font-bold uppercase tracking-[0.12em] text-gold-700 mt-0.5 break-words">{m.title}</p> : null}
                  </div>
                </div>
                <dl className="mt-5 pt-4 border-t border-line space-y-3 text-sm">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <Icons.GraduationCap className="h-4 w-4 text-gold-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <dt className="font-bold text-navy-900 text-xs uppercase tracking-wider">Qualifications</dt>
                      <dd className="text-ink/80 mt-0.5 leading-relaxed break-words">{m.qualification}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 min-w-0">
                    <Icons.Sparkles className="h-4 w-4 text-gold-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <dt className="font-bold text-navy-900 text-xs uppercase tracking-wider">Areas of expertise</dt>
                      <dd className="text-ink/80 mt-0.5 leading-relaxed break-words">{m.specialization}</dd>
                    </div>
                  </div>
                </dl>
              </article>
            ))}
          </div>
          <aside className="space-y-6 self-start min-w-0">
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
