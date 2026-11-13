import Image from "next/image";
import Link from "next/link";
import { Icon, Icons, type IconName } from "@/components/icons";
import { SectionHeading } from "@/components/chrome";
import { EnquiryForm } from "@/components/forms";
import { CourseCard, HeroSlider, PlacedGrid, RecruiterMarquee, TestimonialCards } from "@/components/widgets";
import { CAMPUS_IMAGES, CONTACT, HERO_SLIDES, PLACED_STUDENTS, SITE_IMAGES } from "@/data/site";
import { NEWS_POSTS } from "@/data/news";
import { COURSES } from "@/data/courses";
import { COURSE_LEVEL_VISUALS, COURSE_VISUALS, NEWS_VISUALS } from "@/data/visuals";

/* Shared layout tokens — keeps rhythm consistent across sections */
const WRAP = "mx-auto max-w-7xl px-5 sm:px-8 lg:px-12";
const SECTION_Y = "py-20 sm:py-24 lg:py-28";

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
      <HeroSlider
        slides={HERO_SLIDES}
        footer={
          <div className="border-t border-white/10 bg-navy-950/95 backdrop-blur-md">
            <div className={`${WRAP} py-3.5 flex flex-wrap items-center gap-x-7 gap-y-1.5 text-[0.8rem] font-medium text-navy-100/90`}>
              <span className="text-gold-300 inline-flex items-center gap-2 font-semibold">
                <Icons.Award className="h-4 w-4 text-gold-400" aria-hidden="true" />
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
        }
      >
        <div className="inline-flex items-center gap-2.5 rounded-full border border-gold-400/40 bg-navy-950/40 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-gold-200 mb-5">
          <span className="size-1.5 rounded-full bg-gold-400 animate-pulse shrink-0" />
          <span>Est. 1998 · Gonda, Uttar Pradesh</span>
        </div>
        <h1 className="font-display mt-1 text-[1.9rem] min-[375px]:text-[2.15rem] sm:text-[2.6rem] lg:text-[2.5rem] xl:text-[3.1rem] 2xl:text-[3.4rem] font-semibold leading-[1.06] tracking-[-0.015em] text-white text-balance break-words">
          Meena Shah Institute of Technology &amp; Management
        </h1>
        <p className="mt-5 text-sm sm:text-base xl:text-[1.0625rem] text-navy-100/90 leading-[1.7] max-w-xl">
          The first professional degree college in Gonda — shaping IT and management leaders for over
          27 years, from BBA &amp; BCA to NIELIT diplomas and industry-ready certificate courses.
        </p>
        <div className="mt-7 sm:mt-8 flex flex-col min-[420px]:flex-row flex-wrap gap-3">
          <Link href="/courses" className="btn btn-gold btn-lg btn-pill shadow-lg shadow-gold-500/20 w-full min-[420px]:w-auto">
            Explore courses
            <Icons.ArrowRight className="h-4 w-4 ml-1 shrink-0" aria-hidden="true" />
          </Link>
          <Link href="/admission-form" className="btn btn-outline btn-lg btn-pill w-full min-[420px]:w-auto">
            Admissions open 2026–27
          </Link>
        </div>
        <dl className="mt-9 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 max-w-xl rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-md divide-x divide-white/10 [&>div:nth-child(n+3)]:border-t [&>div:nth-child(n+3)]:border-white/10 sm:[&>div:nth-child(n+3)]:border-t-0 lg:[&>div:nth-child(n+3)]:border-t xl:[&>div:nth-child(n+3)]:border-t-0 overflow-hidden">
          {[
            ["27+", "Years of excellence"],
            ["50,000+", "Students enrolled"],
            ["250+", "Computer systems"],
            [`${PLACED_STUDENTS.length}`, "Placed profiles"],
          ].map(([num, label]) => (
            <div key={label} className="px-4 py-4 min-w-0">
              <dt className="sr-only">{label}</dt>
              <dd className="stat-numeral text-xl min-[380px]:text-2xl sm:text-[1.35rem] lg:text-[1.45rem] xl:text-[1.35rem] 2xl:text-[1.5rem] text-gold-200 whitespace-nowrap">
                {num}
              </dd>
              <dd className="text-xs text-navy-100/85 mt-1 leading-snug">{label}</dd>
            </div>
          ))}
        </dl>
      </HeroSlider>

      {/* ============ NEWS TICKER ============ */}
      <section aria-label="Latest announcements" className="bg-navy-950 text-navy-50 border-b border-white/10">
        <div className={`${WRAP} py-2.5 sm:py-3 flex items-center gap-4 sm:gap-5 text-sm overflow-hidden`}>
          <span className="shrink-0 font-semibold text-xs bg-gold-400 text-navy-950 px-3 py-1 rounded-full">
            Latest
          </span>
          <div className="flex gap-8 sm:gap-10 whitespace-nowrap overflow-x-auto no-scrollbar min-w-0 flex-1">
            {NEWS_POSTS.map((n) => (
              <Link
                key={n.slug}
                href={`/${n.slug}`}
                className="text-navy-50/90 hover:text-gold-300 transition-colors font-medium inline-flex items-center gap-2 min-h-[44px] lg:min-h-0 focus-visible:outline-2 focus-visible:outline-gold-400 rounded"
              >
                <span>{n.title}</span>
                <Icons.ArrowRight className="h-3.5 w-3.5 shrink-0 text-gold-400" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ABOUT / WHO WE ARE ============ */}
      <section className="pt-20 sm:pt-24 lg:pt-28 bg-white">
        <div className={`${WRAP} pb-16 sm:pb-20`}>
          {/* Main Heritage Header & Asymmetric Story Architecture */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/50 bg-gold-50/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold-700 mb-4">
                  <Icons.Award className="h-3.5 w-3.5 text-gold-600 shrink-0" aria-hidden="true" />
                  <span>Who We Are · Institutional Heritage</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-semibold leading-[1.14] tracking-tight text-navy-900 text-balance">
                  A pillar of professional education in Devipatan Mandal
                </h2>
                <div className="rule-gold mt-5" aria-hidden="true" />
                <p className="mt-5 text-base sm:text-lg text-ink/85 leading-relaxed font-medium">
                  Founded in 1998 by the visionary saint and social activist Hazrat Mehboob Meena Shah, MSITM rose to become the region&apos;s No. 1 professional institute for IT and Management.
                </p>
                <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">
                  For over 27 years, our degree college has bridged the gap between academic theory and industry demand in Eastern Uttar Pradesh — empowering thousands of students across Gonda, Bahraich, Balrampur, and Shravasti through modern computing infrastructure and university degrees.
                </p>
              </div>

              {/* CTAs & Accreditation chips */}
              <div className="mt-8 pt-6 border-t border-line">
                <div className="flex flex-col min-[380px]:flex-row flex-wrap gap-3.5">
                  <Link href="/about" className="btn btn-navy btn-pill shadow-xs w-full min-[380px]:w-auto group">
                    <span>Read our story</span>
                    <Icons.ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                  <Link href="/about/why-choose-msitm" className="btn btn-outline-dark btn-pill w-full min-[380px]:w-auto group">
                    <Icons.ShieldCheck className="h-4 w-4 text-gold-700" aria-hidden="true" />
                    <span>Why choose MSITM</span>
                  </Link>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2.5 text-xs text-muted">
                  <span className="font-semibold text-navy-900 inline-flex items-center gap-1.5">
                    <Icons.CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                    University Affiliated
                  </span>
                  <span className="text-line">•</span>
                  <span>NIELIT &amp; NCPUL Accredited</span>
                  <span className="text-line">•</span>
                  <span>ISO 9001:2015 Certified Campus</span>
                </div>
              </div>
            </div>

            {/* Campus Courtyard & Life Showcase */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border-2 border-navy-900/90 bg-navy-950 p-2 shadow-xl shadow-navy-950/15 overflow-hidden">
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-navy-900">
                  <Image
                    src={SITE_IMAGES.campusCourtyard}
                    alt="Students in the MSITM campus courtyard in Gonda"
                    fill
                    className="object-cover object-[50%_55%] transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent pointer-events-none" aria-hidden="true" />

                  {/* Floating location tag */}
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-navy-950/85 backdrop-blur-xs border border-white/20 px-3 py-1 text-[11px] font-medium text-white shadow-sm">
                    <Icons.MapPin className="h-3 w-3 text-gold-400" aria-hidden="true" />
                    <span>Gonda, Uttar Pradesh</span>
                  </div>

                  <div className="absolute bottom-3 inset-x-3 text-left">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold-300">Campus Courtyard &amp; Academic Quadrangle</p>
                    <p className="text-xs text-slate-200 mt-0.5 line-clamp-2">
                      MSITM Degree College, Meena Nagar, Circular Road, Gonda — campus life and academic courtyard.
                    </p>
                  </div>
                </div>

                <div className="px-3 py-3 flex items-center justify-between text-xs text-slate-300">
                  <span className="font-mono text-gold-300">ESTD. 1998</span>
                  <Link href="/about/our-campus" className="inline-flex items-center gap-1 text-gold-300 hover:text-white font-medium transition-colors">
                    <span>Explore Campus</span>
                    <Icons.ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* The Four Core Pillars (Architectural Values Colonnade) */}
          <div className="mt-16 pt-12 border-t border-line">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gold-700">Foundational Ethos</p>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-navy-900 mt-1">
                  The Four Pillars of Institutional Character
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-muted max-w-md">
                Guiding principles laid down by Hazrat Mehboob Meena Shah, shaping every student&apos;s personal and professional journey.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {coreValues.map((v, i) => {
                const hindiTitles = ["आदर", "इंसानियत", "ईमानदारी", "लगन"];
                const subscripts = [
                  "Reverence & Gratitude",
                  "Compassion & Social Service",
                  "Unwavering Integrity",
                  "Pursuit of Excellence",
                ];
                return (
                  <div
                    key={v.title}
                    className="group relative rounded-2xl border border-line bg-gradient-to-b from-white to-parchment/60 p-6 flex flex-col justify-between transition-all duration-300 hover:border-gold-500/60 hover:shadow-lg hover:shadow-gold-500/5 hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono font-bold text-xs text-gold-700/80 bg-gold-100/70 border border-gold-300/50 rounded px-2 py-0.5">
                        0{i + 1}
                      </span>
                      <span className="h-10 w-10 rounded-xl bg-navy-950 text-gold-300 flex items-center justify-center ring-1 ring-gold-400/30 group-hover:bg-gold-400 group-hover:text-navy-950 transition-colors">
                        <Icon name={v.icon} className="h-5 w-5" />
                      </span>
                    </div>

                    <div className="mt-5">
                      <div className="flex items-baseline gap-2">
                        <h4 className="font-display text-xl font-bold text-navy-900 group-hover:text-gold-700 transition-colors">
                          {v.title}
                        </h4>
                        <span className="text-xs font-bold text-slate-400 tracking-wide">({hindiTitles[i]})</span>
                      </div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-gold-600 mt-0.5">
                        {subscripts[i]}
                      </p>
                      <p className="mt-3 text-sm text-muted leading-relaxed break-words">
                        {v.text}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-line/60 flex items-center justify-between text-[11px] font-medium text-slate-500">
                      <span>Core Ethos</span>
                      <span className="group-hover:text-gold-700 transition-colors font-semibold">MSITM Pillar →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============ ACADEMICS ============ */}
      <section className="band-parchment border-y hairline">
        <div className={`${WRAP} ${SECTION_Y}`}>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-700 mb-2.5">
                <Icons.BookOpen className="h-3.5 w-3.5 text-gold-600" aria-hidden="true" />
                <span>Academics &amp; Study Streams</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight text-navy-900">
                Programmes that lead to professions
              </h2>
              <div className="rule-gold mt-4" aria-hidden="true" />
              <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed">
                Undergraduate and postgraduate degrees, NIELIT &amp; NCPUL diplomas, and skill-focused certificates.
              </p>
            </div>
            <Link
              href="/courses"
              className="btn btn-navy btn-pill btn-sm self-start md:self-end group shadow-xs shrink-0"
            >
              <span>View all {COURSES.length} courses</span>
              <span className="ml-1 rounded-full bg-gold-400 text-navy-950 px-1.5 py-0.2 text-[10px] font-bold">21</span>
              <Icons.ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>

          {/* Tier 1: 4 Study Streams (Academic Pathways) */}
          <div className="mt-10">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Explore By Level of Study
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {studyLevels.map((lvl) => {
                const vis = COURSE_LEVEL_VISUALS[lvl.slug];
                return (
                  <Link
                    key={lvl.href}
                    href={lvl.href}
                    className="card-line group p-5 sm:p-6 flex flex-col bg-white rounded-2xl hover:border-gold-500/70 hover:shadow-md transition-all duration-300 min-w-0"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="h-11 w-11 rounded-xl bg-navy-950 text-gold-300 ring-1 ring-gold-400/40 flex items-center justify-center shrink-0 group-hover:bg-gold-400 group-hover:text-navy-950 transition-colors">
                        <Icon name={vis.icon} className="h-5 w-5" />
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gold-700 bg-gold-50 border border-gold-200/80 px-2 py-0.5 rounded text-right">
                        {vis.badge}
                      </span>
                    </div>

                    <h3 className="font-display mt-5 text-lg font-bold text-navy-900 group-hover:text-gold-700 transition-colors">
                      {lvl.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed flex-1">
                      {lvl.text}
                    </p>

                    <div className="mt-5 pt-3 border-t border-line inline-flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-500 font-medium text-[11px] truncate max-w-[150px]">{vis.subtitle}</span>
                      <span className="inline-flex items-center gap-1 text-gold-700 group-hover:text-navy-950 font-bold shrink-0">
                        Explore
                        <Icons.ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Tier 2: Flagship Career Degree & Diploma Programmes */}
          <div className="mt-14 pt-10 border-t border-line">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gold-700">Flagship Programmes</p>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-navy-900 mt-0.5">
                  Top Enrolled Professional Degrees &amp; Diplomas
                </h3>
              </div>
              <span className="text-xs text-muted">
                Direct admissions open for 2026–27 academic session
              </span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featuredCourses.map((c) => {
                const vis = COURSE_VISUALS[c.slug];
                // Affiliated College distinctions
                const affiliationBadge =
                  c.slug === "bca" || c.slug === "bba"
                    ? "Affiliated: Dr. RML Avadh / Maa Pateshwari Univ."
                    : c.slug === "mca"
                    ? "Integral University Centre"
                    : "National Accreditation: NIELIT Govt. of India";

                const highlightSpecs =
                  c.slug === "bca"
                    ? "3 Years · 6 Semesters · 250+ System Lab"
                    : c.slug === "bba"
                    ? "3 Years · 6 Semesters · Corporate Case Studies"
                    : c.slug === "mca"
                    ? "2 Years · 4 Semesters · Cloud & AI Computing"
                    : "1 Year · 2 Semesters · IT Tools & Python IoT";

                return (
                  <Link
                    key={c.slug}
                    href={`/courses/${c.level}/${c.slug}`}
                    className="group relative rounded-2xl border-2 border-navy-900/15 bg-white p-6 flex flex-col justify-between shadow-sm hover:border-navy-900 hover:shadow-xl transition-all duration-300 min-w-0"
                  >
                    <div>
                      {/* Top ribbon: level & awarding authority */}
                      <div className="flex items-start justify-between gap-2 pb-3 border-b border-line">
                        <span className="inline-flex items-center gap-1.5 rounded bg-navy-900 text-gold-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                          <Icon name={vis?.icon || "GraduationCap"} className="h-3 w-3 text-gold-400" />
                          <span>{c.levelLabel}</span>
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500 font-mono text-right">
                          {c.slug === "o-level" ? "1-Year" : "3-Year / 2-Year"}
                        </span>
                      </div>

                      {/* Course Title & Full Name */}
                      <div className="mt-4">
                        <p className="font-display text-2xl font-bold text-navy-900 group-hover:text-gold-700 transition-colors">
                          {c.title}
                        </p>
                        <p className="text-sm font-semibold text-slate-700 mt-1 line-clamp-2">
                          {c.fullName}
                        </p>
                      </div>

                      {/* Institutional Affiliation */}
                      <p className="text-[11px] font-medium text-gold-700 bg-gold-50 border border-gold-200/80 rounded px-2.5 py-1 mt-3">
                        {affiliationBadge}
                      </p>

                      {/* Spec summary */}
                      <div className="mt-3 text-xs text-muted flex items-center gap-1.5">
                        <Icons.Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                        <span>{highlightSpecs}</span>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="mt-6 pt-4 border-t border-line flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 group-hover:text-gold-700 transition-colors">
                        View details
                        <Icons.ArrowRight className="h-3.5 w-3.5 text-gold-600 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                        Admissions Open
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOUNDER QUOTE ============ */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-12 items-stretch">
          <figure className="lg:col-span-5 relative min-h-[420px] sm:min-h-[500px] lg:min-h-[600px] bg-navy-950 overflow-hidden">
            <Image
              src={CAMPUS_IMAGES.founder}
              alt="Hazrat Mehboob Meena Shah, founder of MSITM"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/95 via-navy-950/60 to-transparent px-6 pt-16 pb-6 text-sm text-navy-100 italic">
              Hazrat Mehboob Meena Shah, Founder, MSITM Degree College.
            </figcaption>
          </figure>
          <div className="lg:col-span-7 px-5 sm:px-10 lg:px-16 py-16 sm:py-20 flex flex-col justify-center min-w-0">
            <p className="eyebrow inline-flex items-center gap-2.5">
              <Icons.Landmark className="h-4 w-4 text-gold-700" aria-hidden="true" />
              <span>Message from the founder</span>
            </p>
            <span aria-hidden="true" className="font-display mt-6 block text-7xl leading-none text-gold-400/80 select-none">“</span>
            <blockquote className="font-display -mt-4 text-[1.7rem] sm:text-4xl lg:text-[2.6rem] leading-[1.2] tracking-[-0.01em] text-navy-900 text-balance">
              You are the nation-builders. You are the movers of technology. You are the source of change.”
            </blockquote>
            <div className="mt-8 h-px w-16 bg-gold-400" aria-hidden="true" />
            <p className="mt-8 text-muted text-[1.02rem] leading-[1.8] max-w-xl">
              To stay in tune with industrial dynamics, MSITM provides the right ambience to attain excellence in
              IT and Management studies — through appropriate infrastructure, qualified and inspiring faculty, a
              well-established library, and sound teaching–learning systems.
            </p>
            <div className="mt-9">
              <Link href="/about/president-leadership" className="btn btn-navy btn-pill w-full sm:w-auto">
                Read all leadership messages
                <Icons.ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PLACEMENTS ============ */}
      <section className="band-navy relative overflow-hidden">
        <div className={`${WRAP} ${SECTION_Y} relative`}>
          <div className="max-w-3xl">
            <SectionHeading
              light
              eyebrow="Careers"
              title="Meet our newly placed students"
              text="From TCS, Wipro and Infosys to banks, consultancies and startups — MSITM graduates work across the country."
            />
          </div>
          <div className="mt-12 rounded-3xl bg-white p-5 md:p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] ring-1 ring-gold-400/30">
            <PlacedGrid count={12} linkToPlacement />
          </div>
          <div className="mt-14 pt-10 border-t border-white/10">
            <p className="text-sm font-semibold text-gold-300 mb-5 inline-flex items-center gap-2.5">
              <Icons.Building2 className="h-4 w-4 text-gold-400" aria-hidden="true" />
              <span>Our students placed in top companies</span>
            </p>
            <RecruiterMarquee />
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className={`${WRAP} ${SECTION_Y}`}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <SectionHeading
              eyebrow="Voices"
              title="What our alumni say"
              text="Testimonials from graduates, recruiters and visiting industry leaders — in their own words."
            />
          </div>
          <Link href="/success-stories" className="btn btn-outline-dark btn-pill btn-sm">
            All success stories
            <Icons.ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-12">
          <TestimonialCards count={6} />
        </div>
      </section>

      {/* ============ NEWS ============ */}
      <section className="band-parchment">
        <div className={`${WRAP} ${SECTION_Y}`}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="News & events" title="College news" />
            <Link href="/college-news-events/college-news" className="btn btn-outline-dark btn-pill btn-sm">
              All news
              <Icons.ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          {/* Editorial columns separated by rules, not boxed cards */}
          <div className="mt-12 grid md:grid-cols-3 md:divide-x divide-y md:divide-y-0 divide-line border-y border-line">
            {NEWS_POSTS.map((n) => {
              const vis = NEWS_VISUALS[n.slug];
              return (
                <Link
                  key={n.slug}
                  href={`/${n.slug}`}
                  className="group py-8 md:py-10 md:px-8 first:md:pl-0 last:md:pr-0 flex flex-col min-w-0 focus-visible:outline-2 focus-visible:outline-gold-500 rounded"
                >
                  <div className="flex items-center justify-between gap-3">
                    {vis ? (
                      <span className="inline-flex items-center gap-2 text-xs font-semibold text-gold-700">
                        <Icon name={vis.icon} className="h-4 w-4 shrink-0" />
                        <span>{vis.badge}</span>
                      </span>
                    ) : (
                      <span />
                    )}
                    <span className="text-xs font-medium text-muted inline-flex items-center gap-1.5 shrink-0">
                      <Icons.Calendar className="h-3.5 w-3.5 text-gold-600" aria-hidden="true" />
                      <span>{n.date}</span>
                    </span>
                  </div>
                  <p className="font-display mt-5 text-[1.55rem] font-semibold text-navy-900 leading-[1.25] group-hover:text-gold-700 transition-colors break-words">
                    {n.title}
                  </p>
                  <p className="mt-3 text-[0.95rem] text-muted leading-[1.75] flex-1 break-words">{n.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy-900">
                    <span className="border-b border-gold-400 pb-0.5 group-hover:border-navy-900 transition-colors">Read more</span>
                    <Icons.ArrowRight className="h-4 w-4 text-gold-600 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ VISIT + ENQUIRY ============ */}
      <section className={`${WRAP} ${SECTION_Y}`}>
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-start">
          <div className="min-w-0">
            <SectionHeading
              eyebrow="Connect & visit"
              title="Talk to an admission counsellor"
              text="We are thrilled you are interested in MSITM — and just as excited to learn about you. Reach out in whatever way works best."
            />
            <ul className="mt-9 border-t border-line">
              {[
                { label: "Email us", value: CONTACT.email, href: CONTACT.emailHref, icon: "Mail" as IconName },
                { label: "Call us", value: CONTACT.phonePrimary, href: CONTACT.phonePrimaryHref, icon: "Phone" as IconName },
                { label: "Visit us", value: CONTACT.address, href: undefined, icon: "MapPin" as IconName },
              ].map((item) => (
                <li key={item.label} className="flex items-start gap-4 border-b border-line py-5 min-w-0">
                  <span className="h-11 w-11 rounded-full bg-navy-900 text-gold-300 flex items-center justify-center shrink-0">
                    <Icon name={item.icon} className="h-4.5 w-4.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block text-xs font-semibold text-gold-700">{item.label}</span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-semibold text-lg text-navy-900 link-underline mt-0.5 inline-flex items-center min-h-[44px] lg:min-h-0 -my-1.5 lg:my-0 break-all sm:break-normal"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-ink/85 mt-0.5 block leading-relaxed break-words">{item.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col min-[380px]:flex-row flex-wrap gap-3">
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-navy btn-pill w-full min-[380px]:w-auto">
                <Icons.MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp the institute
              </a>
              <Link href="/contact" className="btn btn-outline-dark btn-pill w-full min-[380px]:w-auto">
                All contact options
              </Link>
            </div>
          </div>

          <div className="relative rounded-3xl bg-white border border-line p-6 sm:p-8 md:p-10 shadow-[0_30px_70px_-35px_rgba(10,25,60,0.45)] min-w-0 lg:sticky lg:top-28">
            <span className="absolute inset-x-8 top-0 h-1 rounded-b-full bg-gold-400" aria-hidden="true" />
            <p className="font-display text-3xl font-semibold text-navy-900">Enquiry form</p>
            <p className="mt-2 text-sm text-muted">We respond within one business day.</p>
            <div className="mt-7">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}