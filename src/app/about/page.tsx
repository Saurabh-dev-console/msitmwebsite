import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero, SectionHeading, SidebarCard, SiblingNav } from "@/components/chrome";
import { CAMPUS_IMAGES, NAVIGATION } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meena Shah Institute of Technology and Management (MSITM) Degree College, Gonda — established 1998, the No. 1 professional institute in Devipatan Mandal.",
};

const ABOUT_NAV = NAVIGATION.find((n) => n.label === "About")!.children.map((c) => ({
  label: c.label,
  href: c.href,
}));

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About · Who we are"
        title="About MSITM"
        description="Established in 1998 by Hazrat Mehboob Meena Shah — a mission of quality education in IT and Management for Gonda and the Devipatan region."
        trail={[{ label: "Home", href: "/" }, { label: "About" }]}
        image={CAMPUS_IMAGES.collage1}
        imageAlt="Students at MSITM"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          <div className="space-y-12 max-w-3xl">
            <div className="space-y-4">
              <p className="lede font-display text-navy-900">
                Meena Shah Institute of Technology and Management (MSITM) Degree College, Gonda, was established
                in 1998 — and quickly rose to become the No. 1 professional institute in the entire Devipatan Mandal.
              </p>
              <p className="leading-[1.85] text-ink/90">
                Founded with a mission to provide quality education in the fields of IT and Management, MSITM is
                accredited by esteemed institutions such as NIELIT, NCPUL, Dr. R.M.L. Awadh University, and
                Integral University. Our commitment to discipline, professionalism, and a future-oriented approach
                sets us apart. We firmly believe that success stems from the core values and inherited traditions
                of an individual. Beyond imparting academic knowledge, we prioritize the holistic development of
                students, nurturing qualities essential for their personal and professional success.
              </p>
            </div>

            <section>
              <SectionHeading eyebrow="Principles" title="Core values" />
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {[
                  ["Respect", "Respect forms the foundation of personal and professional growth. We emphasize showing gratitude towards parents, teachers, and everyone who positively influences our journey."],
                  ["Humanity", "In a world increasingly driven by material pursuits, humanity remains at the heart of MSITM's mission. We encourage students to serve society and support the underprivileged."],
                  ["Honesty", "As the saying goes, “honesty is the best policy.” We strive to instill unwavering integrity in our students — in time, values and resources."],
                  ["Dedication", "Dedication is the key to success. We guide students to recognise their aptitudes and pursue their passions, fostering a love for learning and a commitment to excellence."],
                ].map(([title, text]) => (
                  <div key={title} className="card-line p-6">
                    <p className="font-display text-xl font-semibold text-navy-900">{title}</p>
                    <p className="mt-2 text-sm text-ink/80 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <SectionHeading eyebrow="Distinction" title="A legacy, a bridge, a mission" />
              <div className="mt-6 space-y-4">
                {[
                  ["A legacy of excellence", "With over 27 years of excellence, MSITM Degree College continues to be a pillar of professional education in Gonda — empowering students to lead with confidence and purpose."],
                  ["Career support and industry visits", "We organise industry visits, workshops, and guest lectures to prepare students for the demands of the job market."],
                  ["Empowering rural students", "MSITM is dedicated to uplifting students from rural areas, offering an inclusive and supportive environment to succeed academically and professionally."],
                ].map(([title, text]) => (
                  <div key={title} className="border-l-4 border-gold-400 bg-gold-50 px-6 py-4">
                    <p className="font-bold text-navy-900">{title}</p>
                    <p className="mt-1 text-[0.95rem] text-ink/85 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <SectionHeading eyebrow="Infrastructure" title="Infrastructure & facilities" text="A learning environment supported by modern infrastructure." />
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {[
                  ["Library", "A comprehensive collection of books to support academic growth."],
                  ["Computer labs", "250+ modern computers to explore cutting-edge technology."],
                  ["Online teaching", "Uninterrupted education through robust virtual platforms."],
                  ["Classrooms", "Spacious, collaborative spaces for theory and practice."],
                ].map(([title, text]) => (
                  <Link key={title} href="/facilities" className="card-line group p-6">
                    <p className="font-display text-lg font-semibold text-navy-900 group-hover:text-gold-700">{title}</p>
                    <p className="mt-1.5 text-sm text-muted leading-relaxed">{text}</p>
                  </Link>
                ))}
              </div>
            </section>

            <figure>
              <Image
                src={CAMPUS_IMAGES.collage4}
                alt="Campus life at MSITM"
                width={1200}
                height={640}
                className="w-full h-auto object-cover border border-line"
                sizes="(max-width: 1024px) 100vw, 720px"
              />
              <figcaption className="mt-2 text-sm text-muted italic">Life at MSITM, Gonda (photograph from msitm.edu.in).</figcaption>
            </figure>
          </div>
          <aside className="space-y-6 self-start">
            <SidebarCard title="In this section">
              <SiblingNav items={ABOUT_NAV} current="/about" />
            </SidebarCard>
            <SidebarCard title="Leadership">
              <p className="text-sm text-muted leading-relaxed">Messages from our founder, president, manager, dean and principal.</p>
              <Link href="/about/president-leadership" className="btn btn-navy btn-sm mt-4 w-full">
                Read messages
              </Link>
            </SidebarCard>
          </aside>
        </div>
      </div>
    </>
  );
}
