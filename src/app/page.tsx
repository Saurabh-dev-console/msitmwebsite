import Image from "next/image";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { SectionHeading } from "@/components/chrome";
import { EnquiryForm } from "@/components/forms";
import { CourseCard, PlacedGrid, RecruiterMarquee, TestimonialCards } from "@/components/widgets";
import { CAMPUS_IMAGES, CONTACT, PLACED_STUDENTS } from "@/data/site";
import { NEWS_POSTS } from "@/data/news";
import { COURSES } from "@/data/courses";

export default function Home() {
  const featuredCourses = [
    COURSES.find((c) => c.slug === "bca")!,
    COURSES.find((c) => c.slug === "bba")!,
    COURSES.find((c) => c.slug === "mca")!,
    COURSES.find((c) => c.slug === "o-level")!,
  ];

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="band-navy hero-graph-grid relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/25 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white mb-4">
                <span className="size-1.5 rounded-full bg-gold-400 animate-pulse" />
                <span>Est. 1998 · Gonda, Uttar Pradesh</span>
              </div>
              <h1 className="font-display mt-2 text-4xl sm:text-5xl xl:text-[3.6rem] font-semibold leading-[1.06] text-white">
                Meena Shah Institute of Technology &amp; Management
              </h1>
              <p className="mt-5 text-lg text-navy-100 leading-relaxed max-w-xl">
                The first professional degree college in Gonda — shaping IT and management leaders for over
                27 years, from BBA &amp; BCA to NIELIT diplomas and industry-ready certificate courses.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/courses" className="btn btn-gold btn-lg btn-pill shadow-xs">
                  Explore courses
                  <Icons.ArrowRight className="h-4 w-4 ml-1" />
                </Link>
                <Link href="/admission-form" className="btn btn-outline btn-lg btn-pill">
                  Admissions open 2026–27
                </Link>
              </div>
              <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-xl">
                {[
                  ["27+", "Years of excellence"],
                  ["50,000+", "Students enrolled"],
                  ["250+", "Computer systems"],
                  [`${PLACED_STUDENTS.length}`, "Placed profiles"],
                ].map(([num, label]) => (
                  <div key={label} className="border-l-2 border-gold-400 pl-3">
                    <dt className="sr-only">{label}</dt>
                    <dd className="stat-numeral text-2xl md:text-3xl text-white">{num}</dd>
                    <dd className="text-xs text-navy-100 mt-1">{label}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="relative">
              <div className="absolute -inset-3 border border-gold-400/40 hidden sm:block" aria-hidden="true" />
              <figure className="relative grid grid-cols-2 gap-2">
                <Image
                  src={CAMPUS_IMAGES.collageMain}
                  alt="Students on the MSITM campus"
                  width={520}
                  height={640}
                  className="w-full h-64 sm:h-72 lg:h-[26rem] object-cover row-span-2"
                  priority
                />
                <Image
                  src={CAMPUS_IMAGES.collage2}
                  alt="Campus activities at MSITM"
                  width={520}
                  height={310}
                  className="w-full h-32 sm:h-[8.5rem] lg:h-51 object-cover"
                />
                <Image
                  src={CAMPUS_IMAGES.collage3}
                  alt="Student life at MSITM Gonda"
                  width={520}
                  height={310}
                  className="w-full h-32 sm:h-[8.5rem] lg:h-51 object-cover"
                />
              </figure>
              <p className="mt-2 text-xs text-navy-100/80 italic">Campus photographs from msitm.edu.in</p>
            </div>
          </div>
        </div>
        {/* Affiliation strip */}
        <div className="border-t border-white/15 bg-navy-950/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-x-6 gap-y-1 text-[0.78rem] font-semibold tracking-wide text-navy-100">
            <span className="text-gold-300 uppercase">Affiliated · Recognised</span>
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5 flex items-center gap-4 text-sm overflow-hidden">
          <span className="shrink-0 font-bold uppercase tracking-widest text-xs bg-navy-950 text-gold-300 px-2.5 py-1">
            Latest
          </span>
          <div className="flex gap-8 whitespace-nowrap overflow-x-auto no-scrollbar">
            {NEWS_POSTS.map((n) => (
              <Link key={n.slug} href={`/${n.slug}`} className="hover:underline underline-offset-4 font-medium">
                {n.title} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title="A pillar of professional education in Devipatan Mandal"
              text="Founded in 1998 by the visionary saint and social activist Hazrat Mehboob Meena Shah, MSITM rose to become the region's No. 1 professional institute for IT and Management."
            />
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                ["Respect", "Gratitude towards parents, teachers and everyone who shapes our journey."],
                ["Humanity", "Serving society and supporting the underprivileged, alongside academics."],
                ["Honesty", "Unwavering integrity in time, values and resources — at every stage of life."],
                ["Dedication", "Recognising aptitudes, pursuing passions and committing to excellence."],
              ].map(([title, text]) => (
                <div key={title} className="border-l-2 border-gold-400 pl-4">
                  <p className="font-display text-lg font-semibold text-navy-900">{title}</p>
                  <p className="mt-1 text-sm text-muted leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/about" className="btn btn-navy">
                Read our story
              </Link>
              <Link href="/about/why-choose-msitm" className="btn btn-outline-dark">
                Why choose MSITM
              </Link>
            </div>
          </div>
          <figure>
            <Image
              src={CAMPUS_IMAGES.about}
              alt="The MSITM campus in Gonda"
              width={800}
              height={600}
              className="w-full h-auto object-cover border border-line"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
            <figcaption className="mt-2 text-sm text-muted italic">
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
            </Link>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ["Undergraduate Studies", "BBA · BCA — 3-year degrees affiliated to Avadh & Maa Pateshwari Universities.", "/courses/undergraduate-courses"],
              ["Postgraduate Studies", "MBA · MCA via the authorised Integral University centre.", "/courses/postgraduate-courses"],
              ["Diploma Studies", "NIELIT 'O'/'A' Level, CABA-MDTP, CHM & DSA.", "/courses/diploma-courses"],
              ["Certificate Studies", "CCC, Tally, English, programming & hardware skills.", "/courses/certificate-courses"],
            ].map(([title, text, href]) => (
              <Link key={href} href={href} className="card-line group p-6 flex flex-col bg-white">
                <span className="font-display text-xl font-semibold text-navy-900 group-hover:text-gold-700">{title}</span>
                <span className="mt-2 text-sm text-muted leading-relaxed flex-1">{text}</span>
                <span className="mt-4 text-sm font-semibold text-gold-700">Explore →</span>
              </Link>
            ))}
          </div>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredCourses.map((c) => (
              <CourseCard
                key={c.slug}
                title={c.title}
                fullName={c.fullName}
                meta={c.levelLabel}
                href={`/courses/${c.level}/${c.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============ FOUNDER QUOTE ============ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] items-center">
          <figure className="max-w-sm">
            <Image
              src={CAMPUS_IMAGES.founder}
              alt="Hazrat Mehboob Meena Shah, founder of MSITM"
              width={480}
              height={560}
              className="w-full h-auto object-cover border border-line"
              sizes="(max-width: 1024px) 100vw, 380px"
            />
            <figcaption className="mt-2 text-sm text-muted italic">
              Hazrat Mehboob Meena Shah, Founder, MSITM Degree College.
            </figcaption>
          </figure>
          <div>
            <p className="eyebrow">Message from the founder</p>
            <blockquote className="font-display mt-4 text-2xl md:text-[2rem] leading-snug text-navy-900">
              “You are the nation-builders. You are the movers of technology. You are the source of change.”
            </blockquote>
            <p className="mt-5 text-muted leading-relaxed max-w-2xl">
              To stay in tune with industrial dynamics, MSITM provides the right ambience to attain excellence in
              IT and Management studies — through appropriate infrastructure, qualified and inspiring faculty, a
              well-established library, and sound teaching–learning systems.
            </p>
            <Link href="/about/president-leadership" className="btn btn-navy mt-6">
              Read all leadership messages
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
          <div className="mt-8 bg-white p-4 md:p-6">
            <PlacedGrid count={12} linkToPlacement />
          </div>
          <div className="mt-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-300 mb-4">
              Our students placed in top companies
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
            </Link>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {NEWS_POSTS.map((n) => (
              <Link key={n.slug} href={`/${n.slug}`} className="card-line group p-6 flex flex-col bg-white">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700">{n.date}</p>
                <p className="font-display mt-2 text-xl font-semibold text-navy-900 leading-snug group-hover:text-gold-700">
                  {n.title}
                </p>
                <p className="mt-2 text-sm text-muted leading-relaxed flex-1">{n.excerpt}</p>
                <span className="mt-4 text-sm font-semibold text-navy-900">Read more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VISIT + ENQUIRY ============ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Connect & visit"
              title="Talk to an admission counsellor"
              text="We are thrilled you are interested in MSITM — and just as excited to learn about you. Reach out in whatever way works best."
            />
            <ul className="mt-6 space-y-4">
              {[
                ["Email us", CONTACT.email, CONTACT.emailHref],
                ["Call us", CONTACT.phonePrimary, CONTACT.phonePrimaryHref],
                ["Visit us", CONTACT.address, undefined],
              ].map(([label, value, href]) => (
                <li key={label} className="flex gap-4 border-b border-line pb-4">
                  <span className="w-20 shrink-0 text-xs font-bold uppercase tracking-[0.14em] text-gold-700 pt-1">
                    {label}
                  </span>
                  {href ? (
                    <a href={href} className="font-semibold text-navy-900 link-underline">
                      {value}
                    </a>
                  ) : (
                    <span className="text-ink/85">{value}</span>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-navy">
                WhatsApp the institute
              </a>
              <Link href="/contact" className="btn btn-outline-dark">
                All contact options
              </Link>
            </div>
          </div>
          <div className="card-line p-6 md:p-8 bg-white self-start">
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
