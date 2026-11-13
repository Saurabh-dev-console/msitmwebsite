import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks, PageHero, SidebarCard, SiblingNav } from "@/components/chrome";
import { Icons } from "@/components/icons";
import { CourseCard } from "@/components/widgets";
import { LEVELS, coursesByLevel, type Course } from "@/data/courses";
import { COURSE_LEVEL_VISUALS, COURSE_VISUALS } from "@/data/visuals";
import type { Block } from "@/data/content";

const LEVEL_EXTRA: Record<string, Block[]> = {
  "undergraduate-courses": [
    { type: "heading", text: "A legacy of excellence" },
    {
      type: "prose",
      paragraphs: [
        "With over 27 years of excellence, MSITM Degree College continues to be a pillar of professional education in Gonda. Guided by our core values and unwavering dedication, we strive to provide a transformative educational experience that empowers students to lead with confidence and purpose.",
      ],
    },
    { type: "heading", text: "Career support and industry visits" },
    {
      type: "prose",
      paragraphs: [
        "To bridge the gap between academia and industry, MSITM emphasizes practical learning and professional exposure. We organize industry visits, workshops, and guest lectures to prepare students for the demands of the job market.",
      ],
    },
    { type: "heading", text: "Empowering rural students" },
    {
      type: "prose",
      paragraphs: [
        "MSITM is dedicated to uplifting students from rural areas, offering an inclusive and supportive environment to overcome challenges and succeed academically and professionally.",
      ],
    },
  ],
  "postgraduate-courses": [
    {
      type: "notice",
      tone: "info",
      title: "How these programmes run",
      text: "MSITM is affiliated to R.M.L. University, Ayodhya / Maa Pateshwari University, Balrampur (BBA & BCA). For master's programmes, MSITM is an authorised learning centre of Integral University offering MBA and MCA in online mode. MSITM is also an authorised centre of NIELIT & NCPUL.",
    },
  ],
  "diploma-courses": [
    { type: "heading", text: "Together we rise" },
    {
      type: "prose",
      paragraphs: [
        "Our mission is to make MSITMians ready for the future — designing, developing and delivering cutting-edge education so that students' competence grows broader, they are recognised for high ethical standards and responsiveness to the social environment, and they can dream a better world and transform the dream into reality.",
      ],
    },
  ],
  "certificate-courses": [
    { type: "heading", text: "Career preparation" },
    {
      type: "prose",
      paragraphs: [
        "Discover and forge paths that connect your passions and values to your talents and professional aspirations with MSITM.",
      ],
    },
    { type: "heading", text: "Advising & mentorship" },
    {
      type: "prose",
      paragraphs: [
        "MSITM students are taught individually and as individuals. Deep, meaningful, and sustained mentorship and guidance are the anchor of an MSITM education.",
      ],
    },
  ],
};

export function generateStaticParams() {
  return Object.keys(LEVELS).map((level) => ({ level }));
}

export async function generateMetadata({ params }: { params: Promise<{ level: string }> }): Promise<Metadata> {
  const { level } = await params;
  const data = LEVELS[level];
  if (!data) return {};
  return { title: data.title, description: data.intro };
}

export default async function CourseLevelPage({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  const data = LEVELS[level];
  if (!data) notFound();
  const courses = coursesByLevel(level as Course["level"]);
  const siblings = Object.entries(LEVELS).map(([slug, l]) => ({
    label: l.title,
    href: `/courses/${slug}`,
  }));
  const lvlVis = COURSE_LEVEL_VISUALS[level];

  return (
    <>
      <PageHero
        eyebrow={`Courses · ${data.eyebrow}`}
        title={data.title}
        description={data.intro}
        trail={[{ label: "Home", href: "/" }, { label: "Courses", href: "/courses" }, { label: data.title }]}
        icon={lvlVis?.icon}
        badge={lvlVis?.badge}
        subtitle={lvlVis?.subtitle}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[1fr_300px]">
          <div className="space-y-10 min-w-0">
            <div className="grid sm:grid-cols-2 gap-4">
              {courses.map((c) => {
                const cVis = COURSE_VISUALS[c.slug];
                return (
                  <CourseCard
                    key={c.slug}
                    title={c.title}
                    fullName={c.fullName}
                    meta={`${c.kind}${c.duration ? ` · ${c.duration}` : ""}`}
                    href={`/courses/${level}/${c.slug}`}
                    icon={cVis?.icon}
                  />
                );
              })}
            </div>
            <div className="max-w-3xl min-w-0">
              <Blocks blocks={LEVEL_EXTRA[level] ?? []} />
            </div>
            <div className="band-navy rounded-xl px-5 py-7 sm:px-6 sm:py-8 md:px-10 min-w-0">
              <p className="eyebrow eyebrow--light">Admissions 2026–27</p>
              <p className="font-display mt-2 text-2xl font-semibold text-white">
                Ready to apply for {data.title.toLowerCase()}?
              </p>
              <div className="mt-4 flex flex-col min-[400px]:flex-row flex-wrap gap-3">
                <Link href="/admission-form" className="btn btn-gold w-full min-[400px]:w-auto">
                  Open admission form
                  <Icons.ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/contact" className="btn btn-outline w-full min-[400px]:w-auto">
                  Talk to a counsellor
                </Link>
              </div>
            </div>
          </div>
          <aside className="space-y-6 self-start min-w-0">
            <SidebarCard title="Course levels">
              <SiblingNav items={siblings} current={`/courses/${level}`} />
            </SidebarCard>
            <SidebarCard title="Programmes on this page">
              <ul className="space-y-0.5 lg:space-y-2">
                {courses.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/courses/${level}/${c.slug}`}
                      className="inline-flex items-center min-h-[44px] lg:min-h-0 py-1 lg:py-0 text-sm text-ink/80 hover:text-gold-700 hover:underline underline-offset-4"
                    >
                      {c.title} — {c.fullName}
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
