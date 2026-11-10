import Image from "next/image";
import Link from "next/link";
import { Icon, Icons, type IconName } from "@/components/icons";
import { SectionHeading } from "@/components/chrome";
import { EnquiryForm } from "@/components/forms";
import { CourseCard, PlacedGrid, RecruiterMarquee, TestimonialCards } from "@/components/widgets";
import { CAMPUS_IMAGES, CONTACT, PLACED_STUDENTS, SITE_IMAGES } from "@/data/site";
import { NEWS_POSTS } from "@/data/news";
import { COURSES } from "@/data/courses";
import { COURSE_LEVEL_VISUALS, COURSE_VISUALS, NEWS_VISUALS } from "@/data/visuals";

export default function Home() {
  const featuredCourses = [
    COURSES.find((c) => c.slug === "bca")!,
    COURSES.find((c) => c.slug === "bba")!,
    COURSES.find((c) => c.slug === "mca")!,
    COURSES.find((c) => c.slug === "o-level")!,
  ];

  const studyLevels: { slug: string; title: string; text: string; href: string }[] = [
    {
      slug: "undergraduate-courses",
      title: "Undergraduate Studies",
      text: "BBA · BCA — 3-year degrees affiliated to Avadh & Maa Pateshwari Universities.",
      href: "/courses/undergraduate-courses",
    },
    {
      slug: "postgraduate-courses",
      title: "Postgraduate Studies",
      text: "MBA · MCA via the authorised Integral University centre.",
      href: "/courses/postgraduate-courses",
    },
    {
      slug: "diploma-courses",
      title: "Diploma Studies",
      text: "NIELIT 'O'/'A' Level, CABA-MDTP, CHM & DSA.",
      href: "/courses/diploma-courses",
    },
    {
      slug: "certificate-courses",
      title: "Certificate Studies",
      text: "CCC, Tally, English, programming & hardware skills.",
      href: "/courses/certificate-courses",
    },
  ];

  const coreValues: { title: string; text: string; icon: IconName }[] = [
    { title: "Respect", text: "Gratitude towards parents, teachers and everyone who shapes our journey.", icon: "HeartHandshake" },
    { title: "Humanity", text: "Serving society and supporting the underprivileged, alongside academics.", icon: "Users" },
    { title: "Honesty", text: "Unwavering integrity in time, values and resources — at every stage of life.", icon: "ShieldCheck" },
    { title: "Dedication", text: "Recognising aptitudes, pursuing passions and committing to excellence.", icon: "Sparkles" },
  ];

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="band-navy relative overflow-hidden">
        <Image
          src={SITE_IMAGES.heroCampus}
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden="true"
          className="object-cover object-center opacity-35 scale-[1.01] pointer-events-none"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/88 to-navy-950/75 pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-20">
          <div className="grid gap-8 lg:gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white mb-4">
                <span className="size-1.5 rounded-full bg-gold-400 animate-pulse shrink-0" />
                <span>Est. 1998 · Gonda, Uttar Pradesh</span>
              </div>
              <h1 className="font-display mt-2 text-[1.9rem] min-[375px]:text-[2.15rem] sm:text-5xl xl:text-[3.5rem] font-semibold leading-[1.08] text-white break-words">
                Meena Shah Institute of Technology &amp; Management
              </h1>
              <p className="mt-4 sm:mt-5 text-base sm:text-lg text-navy-100 leading-relaxed max-w-xl">
                The first professional degree college in Gonda — shaping IT and management leaders for over
                27 years, from BBA &amp; BCA to NIELIT diplomas and industry-ready certificate courses.
              </p>
              <div className="mt-6 sm:mt-7 flex flex-col min-[420px]:flex-row flex-wrap gap-3">
                <Link href="/courses" className="btn btn-gold btn-lg btn-pill shadow-xs w-full min-[420px]:w-auto">
                  Explore courses
                  <Icons.ArrowRight className="h-4 w-4 ml-1 shrink-0" aria-hidden="true" />
                </Link>
                <Link href="/admission-form" className="btn btn-outline btn-lg btn-pill w-full min-[420px]:w-auto">
                  Admissions open 2026–27
                </Link>
              </div>
              <dl className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-5 max-w-2xl">
                {[
                  ["27+", "Years of excellence"],
                  ["50,000+", "Students enrolled"],
                  ["250+", "Computer systems"],
                  [`${PLACED_STUDENTS.length}`, "Placed profiles"],
                ].map(([num, label]) => (
                  <div key={label} className="border-l-2 border-gold-400 pl-3 min-w-0">
                    <dt className="sr-only">{label}</dt>
                    <dd className="stat-numeral text-xl min-[380px]:text-2xl sm:text-[1.35rem] lg:text-[1.4rem] xl:text-[1.8rem] text-white whitespace-nowrap">
                      {num}
                    </dd>
                    <dd className="text-xs text-navy-100 mt-1 leading-snug">{label}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="relative min-w-0">
              <div className="absolute -inset-3 rounded-2xl border border-gold-400/40 hidden sm:block" aria-hidden="true" />
              <figure className="relative grid grid-cols-2 gap-2.5 rounded-xl overflow-hidden bg-navy-950 p-2 border border-gold-400/25 shadow-2xl">
                <Image
                  src={CAMPUS_IMAGES.collageMain}
                  alt="Students collaborating with notebooks on the MSITM campus"
                  width={520}
                  height={640}
                  className="w-full h-52 sm:h-72 lg:h-[26rem] object-cover object-top row-span-2 rounded-lg"
                  priority
                />
                <Image
                  src={CAMPUS_IMAGES.collage1}
                  alt="MSITM students in formal blazers in the campus courtyard"
                  width={520}
                  height={310}
                  className="w-full h-[6.1875rem] sm:h-[8.6875rem] lg:h-[12.6875rem] object-cover object-center rounded-lg"
                />
                <Image
                  src={CAMPUS_IMAGES.collage3}
                  alt="Students attending a classroom session at MSITM Gonda"
                  width={520}
                  height={310}
                  className="w-full h-[6.1875rem] sm:h-[8.6875rem] lg:h-[12.6875rem] object-cover object-top rounded-lg"
                />
              </figure>
              <p className="mt-2.5 text-xs text-navy-100/85 italic">
                Campus photographs from msitm.edu.in
              </p>
            </div>
          </div>
        </div>
        {/* Affiliation strip */}
        <div className="relative border-t border-white/15 bg-navy-950/75 backdrop-blur-xs">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-x-6 gap-y-1 text-[0.78rem] font-semibold tracking-wide text-navy-100">
            <span className="text-gold-300 uppercase inline-flex items-center gap-1.5">
              <Icons.Award className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
              Affiliated · Recognised
            </span>
            <span>Dr. R.M.L. Avadh University, Ayodhya</span>
            <span>Maa Pateshwari University</span>
            <span>Integral University</span>
            <span>NIELIT</span>
            <span>NCPUL</span>
            <span>ISO 9001:2015</span>
          </div>
        </div>
      </section>

      {/* ============ NEWS TICKER ============ */}
      <section aria-label="Latest announcements" className="bg-gold-400 text-navy-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2.5 flex items-center gap-3 sm:gap-4 text-sm overflow-hidden">
          <span className="shrink-0 font-bold uppercase tracking-widest text-xs bg-navy-950 text-gold-300 px-2.5 py-1 rounded">
            Latest
          </span>
          <div className="flex gap-6 sm:gap-8 whitespace-nowrap overflow-x-auto no-scrollbar min-w-0 flex-1">
            {NEWS_POSTS.map((n) => (
              <Link
                key={n.slug}
                href={`/${n.slug}`}
                className="hover:underline underline-offset-4 font-medium inline-flex items-center gap-1.5 min-h-[44px] lg:min-h-0"
              >
                <span>{n.title}</span>
                <Icons.ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-2 lg:items-center">
          <div className="min-w-0">
            <SectionHeading
              eyebrow="Who we are"
              title="A pillar of professional education in Devipatan Mandal"
              text="Founded in 1998 by the visionary saint and social activist Hazrat Mehboob Meena Shah, MSITM rose to become the region's No. 1 professional institute for IT and Management."
            />
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {coreValues.map((v) => (
                <div key={v.title} className="card-line p-4 flex items-start gap-3 min-w-0">
                  <span className="h-9 w-9 rounded-lg bg-navy-50 border border-navy-100 text-navy-900 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name={v.icon} className="h-4.5 w-4.5 text-gold-700" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-lg font-semibold text-navy-900 break-words">{v.title}</p>
                    <p className="mt-1 text-sm text-muted leading-relaxed break-words">{v.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-col min-[380px]:flex-row flex-wrap gap-3">
              <Link href="/about" className="btn btn-navy w-full min-[380px]:w-auto">
                Read our story
                <Icons.ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/about/why-choose-msitm" className="btn btn-outline-dark w-full min-[380px]:w-auto">
                Why choose MSITM
              </Link>
            </div>
          </div>
          <figure className="relative min-w-0">
            <div className="rounded-xl overflow-hidden border border-line shadow-sm bg-navy-950">
              <Image
                src={SITE_IMAGES.campusCourtyard}
                alt="Students at the MSITM campus in Gonda"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>
            <figcaption className="mt-2.5 text-sm text-muted italic">
              MSITM Degree College, Meena Nagar, Circular Road, Gonda.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ============ COURSES ============ */}
      <section className="band-parchment border-y hairline">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Academics"
              title="Programmes that lead to professions"
              text="Undergraduate and postgraduate degrees, NIELIT & NCPUL diplomas, and skill-focused certificates."
            />
            <Link href="/courses" className="btn btn-outline-dark btn-sm">
              View all {COURSES.length} courses
              <Icons.ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {studyLevels.map((lvl) => {
              const vis = COURSE_LEVEL_VISUALS[lvl.slug];
              return (
                <Link key={lvl.href} href={lvl.href} className="card-line group overflow-hidden flex flex-col bg-white">
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-navy-950">
                    <Image
                      src={vis.image}
                      alt={vis.imageAlt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent" aria-hidden="true" />
                    <span className="absolute bottom-2.5 left-3 inline-flex items-center gap-1.5 rounded-md bg-navy-950/90 border border-gold-400/35 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-300">
                      <Icon name={vis.icon} className="h-3.5 w-3.5 text-gold-400" />
                      <span>{vis.badge}</span>
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="font-display text-xl font-semibold text-navy-900 group-hover:text-gold-700">
                      {lvl.title}
                    </span>
                    <span className="mt-2 text-sm text-muted leading-relaxed flex-1">{lvl.text}</span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700">
                      Explore
                      <Icons.ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredCourses.map((c) => {
              const vis = COURSE_VISUALS[c.slug];
              return (
                <CourseCard
                  key={c.slug}
                  title={c.title}
                  fullName={c.fullName}
                  meta={c.levelLabel}
                  href={`/courses/${c.level}/${c.slug}`}
                  icon={vis?.icon}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ FOUNDER QUOTE ============ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[1fr_1.5fr] items-center">
          <figure className="max-w-sm mx-auto lg:mx-0 w-full min-w-0">
            <div className="rounded-xl overflow-hidden border border-gold-400/35 shadow-md bg-navy-950">
              <Image
                src={CAMPUS_IMAGES.founder}
                alt="Hazrat Mehboob Meena Shah, founder of MSITM"
                width={480}
                height={560}
                className="w-full h-auto object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 380px"
              />
            </div>
            <figcaption className="mt-2.5 text-sm text-muted italic">
              Hazrat Mehboob Meena Shah, Founder, MSITM Degree College.
            </figcaption>
          </figure>
          <div className="min-w-0">
            <p className="eyebrow inline-flex items-center gap-2">
              <Icons.Landmark className="h-3.5 w-3.5 text-gold-700" aria-hidden="true" />
              <span>Message from the founder</span>
            </p>
            <blockquote className="font-display mt-4 text-2xl md:text-[2rem] leading-snug text-navy-900">
              “You are the nation-builders. You are the movers of technology. You are the source of change.”
            </blockquote>
            <p className="mt-5 text-muted leading-relaxed max-w-2xl">
              To stay in tune with industrial dynamics, MSITM provides the right ambience to attain excellence in
              IT and Management studies — through appropriate infrastructure, qualified and inspiring faculty, a
              well-established library, and sound teaching–learning systems.
            </p>
            <Link href="/about/president-leadership" className="btn btn-navy mt-6 w-full sm:w-auto">
              Read all leadership messages
              <Icons.ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ PLACEMENTS ============ */}
      <section className="band-navy">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <SectionHeading
            light
            eyebrow="Careers"
            title="Meet our newly placed students"
            text="From TCS, Wipro and Infosys to banks, consultancies and startups — MSITM graduates work across the country."
          />
          <div className="mt-8 rounded-xl bg-white p-4 md:p-6 shadow-lg">
            <PlacedGrid count={12} linkToPlacement />
          </div>
          <div className="mt-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-300 mb-4 inline-flex items-center gap-2">
              <Icons.Building2 className="h-4 w-4 text-gold-400" aria-hidden="true" />
              <span>Our students placed in top companies</span>
            </p>
            <RecruiterMarquee />
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Voices"
            title="What our alumni say"
            text="Testimonials from graduates, recruiters and visiting industry leaders — in their own words."
          />
          <Link href="/success-stories" className="btn btn-outline-dark btn-sm">
            All success stories
            <Icons.ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-8">
          <TestimonialCards count={6} />
        </div>
      </section>

      {/* ============ NEWS ============ */}
      <section className="band-parchment border-y hairline">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="News & events" title="College news" />
            <Link href="/college-news-events/college-news" className="btn btn-outline-dark btn-sm">
              All news
              <Icons.ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {NEWS_POSTS.map((n) => {
              const vis = NEWS_VISUALS[n.slug];
              return (
                <Link key={n.slug} href={`/${n.slug}`} className="card-line group overflow-hidden flex flex-col bg-white">
                  {vis ? (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-navy-950">
                      <Image
                        src={vis.image}
                        alt={vis.imageAlt}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className={`object-cover ${vis.objectPosition === "top" ? "object-top" : "object-center"} transition-transform duration-500 group-hover:scale-105`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" aria-hidden="true" />
                      <span className="absolute bottom-2.5 left-3 inline-flex items-center gap-1.5 rounded-md bg-navy-950/90 border border-gold-400/35 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-300">
                        <Icon name={vis.icon} className="h-3.5 w-3.5 text-gold-400" />
                        <span>{vis.badge}</span>
                      </span>
                    </div>
                  ) : null}
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700 inline-flex items-center gap-1.5">
                      <Icons.Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{n.date}</span>
                    </p>
                    <p className="font-display mt-2 text-xl font-semibold text-navy-900 leading-snug group-hover:text-gold-700">
                      {n.title}
                    </p>
                    <p className="mt-2 text-sm text-muted leading-relaxed flex-1">{n.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900">
                      Read more
                      <Icons.ArrowRight className="h-4 w-4 text-gold-600 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ VISIT + ENQUIRY ============ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-2">
          <div className="min-w-0">
            <SectionHeading
              eyebrow="Connect & visit"
              title="Talk to an admission counsellor"
              text="We are thrilled you are interested in MSITM — and just as excited to learn about you. Reach out in whatever way works best."
            />
            <ul className="mt-6 space-y-4">
              {[
                { label: "Email us", value: CONTACT.email, href: CONTACT.emailHref, icon: "Mail" as IconName },
                { label: "Call us", value: CONTACT.phonePrimary, href: CONTACT.phonePrimaryHref, icon: "Phone" as IconName },
                { label: "Visit us", value: CONTACT.address, href: undefined, icon: "MapPin" as IconName },
              ].map((item) => (
                <li key={item.label} className="flex items-start gap-3.5 border-b border-line pb-4 min-w-0">
                  <span className="h-9 w-9 rounded-lg bg-navy-50 border border-navy-100 text-gold-700 flex items-center justify-center shrink-0">
                    <Icon name={item.icon} className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block text-xs font-bold uppercase tracking-[0.14em] text-gold-700">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-semibold text-navy-900 link-underline mt-0.5 inline-flex items-center min-h-[44px] lg:min-h-0 -my-1.5 lg:my-0 break-all sm:break-normal"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-ink/85 mt-0.5 block break-words">{item.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col min-[380px]:flex-row flex-wrap gap-3">
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-navy w-full min-[380px]:w-auto">
                <Icons.MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp the institute
              </a>
              <Link href="/contact" className="btn btn-outline-dark w-full min-[380px]:w-auto">
                All contact options
              </Link>
            </div>
          </div>
          <div className="card-line p-5 sm:p-6 md:p-8 bg-white self-start min-w-0">
            <p className="font-display text-2xl font-semibold text-navy-900">Enquiry form</p>
            <p className="mt-1 text-sm text-muted">We respond within one business day.</p>
            <div className="mt-5">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
