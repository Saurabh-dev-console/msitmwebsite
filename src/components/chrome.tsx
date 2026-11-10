import Image from "next/image";
import Link from "next/link";
import { Icon, Icons, type IconName } from "@/components/icons";
import type { Block } from "@/data/content";
import { SITE_IMAGES } from "@/data/site";

/* ---------------- Section heading ---------------- */

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  light = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      <p className={`eyebrow ${light ? "eyebrow--light" : ""}`}>{eyebrow}</p>
      <h2
        className={`font-display mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight break-words ${
          light ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      <div className={`rule-gold mt-4 ${centered ? "mx-auto" : ""}`} aria-hidden="true" />
      {text ? (
        <p className={`mt-4 leading-relaxed ${light ? "text-navy-100" : "text-muted"}`}>{text}</p>
      ) : null}
    </div>
  );
}

/* ---------------- Breadcrumbs ---------------- */

export function Breadcrumbs({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[0.82rem]">
      <ol className="flex flex-wrap items-center gap-1.5">
        {trail.map((item, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {i > 0 ? (
                <span aria-hidden="true" className="text-gold-600">
                  /
                </span>
              ) : null}
              {last || !item.href ? (
                <span aria-current={last ? "page" : undefined} className="text-navy-900 font-semibold">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="inline-flex items-center min-h-[36px] lg:min-h-0 -my-1.5 lg:my-0 text-muted hover:text-navy-900 hover:underline underline-offset-4">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ---------------- Contextual Hero Image Mapper ---------------- */

interface HeroContext {
  src: string;
  alt: string;
  badge: string;
  subtitle: string;
  icon: IconName;
  objectPosition: "center" | "top";
}

function getContextualHeroImage(
  trail: { label: string; href?: string }[],
  title: string,
  eyebrow: string
): HeroContext {
  const text = [
    ...trail.map((t) => t.label.toLowerCase()),
    title.toLowerCase(),
    eyebrow.toLowerCase(),
  ].join(" ");

  if (text.includes("iqac") || text.includes("naac") || text.includes("rti") || text.includes("mou") || text.includes("aaa") || text.includes("perspective")) {
    return {
      src: SITE_IMAGES.coursesPostgrad,
      alt: "MSITM Internal Quality Assurance Cell and academic governance",
      badge: "IQAC · Quality Cell",
      subtitle: "NAAC Benchmarks & Standards",
      icon: "ShieldCheck",
      objectPosition: "center",
    };
  }
  if (text.includes("faculty") || text.includes("department") || text.includes("registration") || text.includes("staff")) {
    return {
      src: SITE_IMAGES.classroomLecture,
      alt: "MSITM faculty and academic instruction",
      badge: "Faculty & Mentors",
      subtitle: "Dedicated Academic Guidance",
      icon: "Users",
      objectPosition: "top",
    };
  }
  if (text.includes("postgraduate") || text.includes("mba") || text.includes("mca")) {
    return {
      src: SITE_IMAGES.coursesPostgrad,
      alt: "MSITM postgraduate MBA and MCA seminar",
      badge: "Postgraduate Study",
      subtitle: "MBA & MCA Programmes",
      icon: "Briefcase",
      objectPosition: "center",
    };
  }
  if (text.includes("diploma") || text.includes("nielit") || text.includes("caba") || text.includes("o-level") || text.includes("'o' level") || text.includes("'a' level")) {
    return {
      src: SITE_IMAGES.coursesDiploma,
      alt: "MSITM NIELIT and IT diploma laboratory",
      badge: "Accredited Diplomas",
      subtitle: "NIELIT · NCPUL · MSITM",
      icon: "Cpu",
      objectPosition: "center",
    };
  }
  if (text.includes("certificate") && !text.includes("independence") && !text.includes("bachpan")) {
    return {
      src: SITE_IMAGES.coursesCertificate,
      alt: "MSITM practical skill certificate workshop",
      badge: "Skill Certificates",
      subtitle: "Hands-On Short-Term Training",
      icon: "Award",
      objectPosition: "center",
    };
  }
  if (text.includes("course") || text.includes("academic") || text.includes("bca") || text.includes("bba")) {
    return {
      src: SITE_IMAGES.coursesUndergrad,
      alt: "MSITM students collaborating in academic classes",
      badge: "Academic Programmes",
      subtitle: "Practical Lab & Industry Training",
      icon: "GraduationCap",
      objectPosition: "center",
    };
  }
  if (text.includes("library")) {
    return {
      src: SITE_IMAGES.libraryHero,
      alt: "MSITM academic library shelves and quiet reading desks",
      badge: "Academic Library",
      subtitle: "Books, Journals & Digital Access",
      icon: "BookOpen",
      objectPosition: "center",
    };
  }
  if (text.includes("computer lab") || text.includes("computing")) {
    return {
      src: SITE_IMAGES.computerLab,
      alt: "MSITM computer and IoT laboratory workstations",
      badge: "Computer & IoT Lab",
      subtitle: "250+ Modern Workstations",
      icon: "Monitor",
      objectPosition: "center",
    };
  }
  if (text.includes("lecture hall")) {
    return {
      src: SITE_IMAGES.lectureHallAuthentic,
      alt: "MSITM lecture hall with faculty and students",
      badge: "Lecture Halls",
      subtitle: "Projector-Equipped Classrooms",
      icon: "Presentation",
      objectPosition: "top",
    };
  }
  if (text.includes("facility") || text.includes("facilities") || text.includes("campus")) {
    return {
      src: SITE_IMAGES.heroCampus,
      alt: "MSITM green campus architecture and lawns in Gonda",
      badge: "Campus Infrastructure",
      subtitle: "Wi-Fi Enabled Green Campus",
      icon: "Building2",
      objectPosition: "center",
    };
  }
  if (text.includes("admission") || text.includes("enrol") || text.includes("calender") || text.includes("process") || text.includes("form") || text.includes("contact")) {
    return {
      src: SITE_IMAGES.admissionsCounselling,
      alt: "MSITM admissions counselling and helpdesk",
      badge: "Admissions 2026–27",
      subtitle: "Counselling & Campus Guidance",
      icon: "ClipboardCheck",
      objectPosition: "center",
    };
  }
  if (text.includes("alumni") || text.includes("success stories") || text.includes("equity") || text.includes("inclusion")) {
    return {
      src: SITE_IMAGES.alumniSuccess,
      alt: "MSITM alumni mentors and students on campus",
      badge: "Alumni & Community",
      subtitle: "Connected Since 1998",
      icon: "HeartHandshake",
      objectPosition: "center",
    };
  }
  if (text.includes("placement") || text.includes("career") || text.includes("recruiter")) {
    return {
      src: SITE_IMAGES.placementCareers,
      alt: "MSITM graduates in campus placement interview panel",
      badge: "Placement Excellence",
      subtitle: "Leading Recruiters & Careers",
      icon: "Briefcase",
      objectPosition: "center",
    };
  }
  if (text.includes("ranking") || text.includes("accolade") || text.includes("independence") || text.includes("competition") || text.includes("bachpan")) {
    return {
      src: SITE_IMAGES.rankings,
      alt: "Convocation awards and student distinctions at MSITM",
      badge: "Honours & Awards",
      subtitle: "University Distinctions & Events",
      icon: "Trophy",
      objectPosition: "top",
    };
  }
  if (text.includes("farewell")) {
    return {
      src: SITE_IMAGES.fresherCelebration,
      alt: "Student stage celebration and awards at MSITM",
      badge: "Campus Traditions",
      subtitle: "Celebrations & Cultural Life",
      icon: "PartyPopper",
      objectPosition: "top",
    };
  }
  if (text.includes("news") || text.includes("event") || text.includes("celebrat") || text.includes("activity") || text.includes("student")) {
    return {
      src: SITE_IMAGES.eventsCultural,
      alt: "MSITM seminars, tech fests and student cultural events",
      badge: "Campus Life & Events",
      subtitle: "Seminars, Tech & Celebrations",
      icon: "Newspaper",
      objectPosition: "center",
    };
  }
  if (text.includes("leadership") || text.includes("president") || text.includes("founder")) {
    return {
      src: SITE_IMAGES.founder,
      alt: "Hazrat Mehboob Meena Shah, founder of MSITM",
      badge: "Institutional Heritage",
      subtitle: "Guiding Principles Since 1998",
      icon: "Landmark",
      objectPosition: "top",
    };
  }
  if (text.includes("search") || text.includes("sitemap") || text.includes("mission") || text.includes("vision")) {
    return {
      src: SITE_IMAGES.libraryHero,
      alt: "MSITM knowledge resources and academic directory",
      badge: "MSITM Directory",
      subtitle: "Knowledge & Institutional Vision",
      icon: "Compass",
      objectPosition: "center",
    };
  }
  if (text.includes("audit") || text.includes("design") || text.includes("privacy")) {
    return {
      src: SITE_IMAGES.computerLab,
      alt: "MSITM digital architecture, standards and transparency",
      badge: "Standards & Governance",
      subtitle: "Verified Documentation",
      icon: "ShieldCheck",
      objectPosition: "center",
    };
  }

  return {
    src: SITE_IMAGES.heroCampus,
    alt: "Meena Shah Institute of Technology & Management Campus, Gonda",
    badge: "MSITM Campus",
    subtitle: "Gonda, Uttar Pradesh · Est. 1998",
    icon: "GraduationCap",
    objectPosition: "center",
  };
}

/* ---------------- Page hero ---------------- */

export function PageHero({
  eyebrow,
  title,
  description,
  trail,
  image,
  imageAlt,
  icon,
  badge,
  subtitle,
  objectPosition,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  trail: { label: string; href?: string }[];
  image?: string;
  imageAlt?: string;
  icon?: IconName;
  badge?: string;
  subtitle?: string;
  objectPosition?: "center" | "top";
}) {
  const contextual = getContextualHeroImage(trail, title, eyebrow);
  const heroImage = image || contextual.src;
  const heroAlt = imageAlt || contextual.alt;
  const badgeLabel = badge || contextual.badge;
  const subtitleLabel = subtitle || contextual.subtitle;
  const heroIcon = icon || contextual.icon;
  const posClass = (objectPosition || contextual.objectPosition) === "top" ? "object-top" : "object-center";

  return (
    <header className="band-navy relative overflow-hidden">
      {/* Photographic hero backdrop + dark-green brand scrim */}
      <Image
        src={heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        aria-hidden="true"
        className={`object-cover ${posClass} opacity-45 md:opacity-35 scale-[1.01] pointer-events-none`}
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/90 to-navy-950/75 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-9 sm:py-12 md:py-16">
        <div className="grid gap-8 md:gap-10 md:grid-cols-[1.35fr_1fr] md:items-center">
          <div className="min-w-0">
            <div className="[&_a]:!text-navy-100 [&_span[aria-current]]:!text-gold-300 [&_span]:!text-navy-100">
              <Breadcrumbs trail={trail} />
            </div>
            <p className="eyebrow eyebrow--light mt-5 sm:mt-6 flex items-center gap-2">
              <Icon name={heroIcon} className="h-3.5 w-3.5 text-gold-400 shrink-0" />
              <span>{eyebrow}</span>
            </p>
            <h1 className="font-display mt-3 text-[1.75rem] min-[375px]:text-[2rem] sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-semibold leading-[1.08] text-white break-words">
              {title}
            </h1>
            <div className="rule-gold mt-4 sm:mt-5" aria-hidden="true" />
            {description ? (
              <p className="mt-4 sm:mt-5 max-w-2xl text-navy-100 leading-relaxed font-normal text-[0.95rem] sm:text-base md:text-[1.05rem]">
                {description}
              </p>
            ) : null}
          </div>
          <figure className="relative hidden md:block group min-w-0">
            <div
              className="absolute -inset-2 rounded-xl bg-gold-400/15 blur-[2px] transition-opacity duration-300 group-hover:bg-gold-400/25"
              aria-hidden="true"
            />
            <div className="relative rounded-xl overflow-hidden border border-gold-400/40 shadow-2xl bg-navy-950 ring-1 ring-white/10">
              <Image
                src={heroImage}
                alt={heroAlt}
                width={640}
                height={400}
                priority
                className={`relative w-full h-64 lg:h-72 object-cover ${posClass} transition-transform duration-700 ease-out group-hover:scale-105`}
                sizes="(max-width: 768px) 100vw, 460px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent pointer-events-none" />

              {/* Top status badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-navy-950/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-gold-400/35 text-[11px] font-semibold text-gold-300 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                MSITM Gonda
              </div>

              {/* Bottom info strip */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 text-xs text-navy-100 font-medium">
                <span className="flex items-center gap-1.5 bg-navy-950/90 backdrop-blur-md px-2.5 py-1.5 rounded-md border border-white/10 text-white font-semibold truncate">
                  <Icon name={heroIcon} className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                  <span className="truncate">{badgeLabel}</span>
                </span>
                <span className="hidden lg:inline-block text-[11px] text-white/95 bg-navy-950/75 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10 truncate shrink-0">
                  {subtitleLabel}
                </span>
              </div>
            </div>
          </figure>
        </div>
      </div>
      <div className="relative h-1 bg-gold-400" aria-hidden="true" />
    </header>
  );
}

/* ---------------- Block renderer ---------------- */

function Prose({ paragraphs, dropcap }: { paragraphs: string[]; dropcap?: boolean }) {
  return (
    <div className="space-y-4">
      {paragraphs.map((p, i) => (
        <p key={i} className={`leading-[1.85] text-ink/90 ${dropcap && i === 0 ? "dropcap" : ""}`}>
          {p}
        </p>
      ))}
    </div>
  );
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-8 min-w-0">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "lead":
            return (
              <p key={i} className="lede font-display text-navy-900">
                {block.text}
              </p>
            );
          case "prose":
            return <Prose key={i} paragraphs={block.paragraphs} dropcap={block.dropcap} />;
          case "heading":
            return (
              <h2 key={i} className="font-display text-2xl md:text-[1.7rem] font-semibold text-navy-900 pt-2 break-words">
                {block.text}
              </h2>
            );
          case "subheading":
            return (
              <h3 key={i} className="text-lg font-bold text-navy-900 pt-1">
                {block.text}
              </h3>
            );
          case "list":
            if (block.style === "check") {
              return (
                <ul key={i} className="check-list space-y-1 text-ink/90 leading-relaxed">
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              );
            }
            if (block.style === "ordered") {
              return (
                <ol key={i} className="space-y-3 text-ink/90 leading-relaxed list-none counter-reset-[step]">
                  {block.items.map((item, j) => (
                    <li key={j} className="flex gap-4">
                      <span
                        aria-hidden="true"
                        className="font-display shrink-0 w-9 h-9 flex items-center justify-center bg-navy-900 text-gold-300 font-semibold"
                      >
                        {j + 1}
                      </span>
                      <span className="pt-1.5">{item}</span>
                    </li>
                  ))}
                </ol>
              );
            }
            return (
              <ul key={i} className="space-y-2 text-ink/90 leading-relaxed list-disc pl-6 marker:text-gold-600">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <figure key={i} className="border-l-4 border-gold-400 bg-gold-50 px-6 py-5">
                <blockquote className="font-display text-xl md:text-2xl text-navy-900 leading-snug">
                  “{block.text}”
                </blockquote>
                {block.cite ? (
                  <figcaption className="mt-2 text-sm font-semibold tracking-wide text-gold-700 uppercase">
                    — {block.cite}
                  </figcaption>
                ) : null}
              </figure>
            );
          case "facts":
            return (
              <dl key={i} className="grid sm:grid-cols-2 gap-px bg-line border border-line min-w-0">
                {block.items.map((f, j) => (
                  <div key={j} className="bg-white p-4 sm:p-5 min-w-0">
                    <dt className="text-xs font-bold uppercase tracking-[0.14em] text-gold-700">{f.label}</dt>
                    <dd className="mt-1.5 font-semibold text-navy-900 leading-relaxed break-words">{f.value}</dd>
                  </div>
                ))}
              </dl>
            );
          case "table":
            return (
              <div key={i} className="overflow-x-auto max-w-full border border-line rounded-xl">
                <table className="table-msitm">
                  <thead>
                    <tr>
                      {block.head.map((h, j) => (
                        <th key={j} scope="col">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r}>
                        {row.map((cell, c) => (
                          <td key={c} className={c === 0 ? "font-semibold text-navy-900 sm:whitespace-nowrap" : ""}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "image":
            return (
              <figure key={i}>
                <Image
                  src={block.src}
                  alt={block.alt}
                  width={1200}
                  height={700}
                  className="w-full h-auto object-cover rounded-xl border border-line shadow-xs"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
                {block.caption ? (
                  <figcaption className="mt-2 text-sm text-muted italic">{block.caption}</figcaption>
                ) : null}
              </figure>
            );
          case "notice":
            return (
              <aside
                key={i}
                className={`rounded-xl border px-6 py-5 flex gap-3.5 items-start ${
                  block.tone === "warn" ? "border-gold-500 bg-gold-50" : "border-navy-100 bg-navy-50"
                }`}
              >
                {block.tone === "warn" ? (
                  <Icons.AlertTriangle className="h-5 w-5 text-gold-700 shrink-0 mt-0.5" aria-hidden="true" />
                ) : (
                  <Icons.Info className="h-5 w-5 text-navy-900 shrink-0 mt-0.5" aria-hidden="true" />
                )}
                <div>
                  {block.title ? (
                    <p className="text-sm font-bold uppercase tracking-[0.12em] text-navy-900">{block.title}</p>
                  ) : null}
                  <p className={`${block.title ? "mt-1.5" : ""} text-[0.95rem] leading-relaxed text-ink/85`}>{block.text}</p>
                </div>
              </aside>
            );
          case "cta":
            return (
              <div key={i} className="band-navy rounded-xl px-5 py-7 sm:px-6 sm:py-8 md:px-10 md:py-10 relative overflow-hidden min-w-0">
                <p className="eyebrow eyebrow--light">Next step</p>
                <h3 className="font-display mt-2 text-2xl md:text-3xl font-semibold text-white break-words">{block.title}</h3>
                <p className="mt-2 text-navy-100 max-w-xl">{block.text}</p>
                <Link href={block.href} className="btn btn-gold mt-5 w-full sm:w-auto">
                  {block.label}
                  <Icons.ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            );
          case "linkCards":
            return (
              <div key={i} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 not-prose min-w-0">
                {block.items.map((card, j) => (
                  <Link
                    key={j}
                    href={card.href}
                    className="card-line group p-5 flex flex-col transition-colors min-w-0"
                  >
                    <span className="font-display text-lg font-semibold text-navy-900 group-hover:text-gold-700 break-words">
                      {card.title}
                    </span>
                    <span className="mt-1.5 text-sm text-muted leading-relaxed flex-1 break-words">{card.text}</span>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700">
                      Open <Icons.ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            );
          case "message":
            return (
              <article key={i} className="rounded-xl overflow-hidden border border-line bg-white shadow-xs min-w-0">
                <div className="bg-navy-900 px-5 py-5 md:px-8 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    {block.from.includes("Meena Shah") ? (
                      <Image
                        src={SITE_IMAGES.founder}
                        alt={block.from}
                        width={56}
                        height={56}
                        className="h-14 w-14 rounded-full object-cover object-top border-2 border-gold-400/60 shrink-0"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="h-12 w-12 rounded-full bg-navy-950 border border-gold-400/40 text-gold-300 flex items-center justify-center font-display text-lg font-semibold shrink-0"
                      >
                        {block.from
                          .replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Shri)\s+/i, "")
                          .split(/\s+/)
                          .slice(0, 2)
                          .map((w) => w.charAt(0))
                          .join("")}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">{block.role}</p>
                      <h3 className="font-display mt-1 text-xl sm:text-2xl font-semibold text-white break-words">{block.from}</h3>
                    </div>
                  </div>
                  <Icons.Quote className="h-7 w-7 text-gold-400/35 shrink-0 hidden sm:block" aria-hidden="true" />
                </div>
                <div className="px-5 py-5 sm:px-6 sm:py-6 md:px-8 space-y-4">
                  {block.quote ? (
                    <p className="font-display text-lg text-gold-700 italic leading-relaxed">“{block.quote}”</p>
                  ) : null}
                  {block.paragraphs.map((p, j) => (
                    <p key={j} className="leading-[1.85] text-ink/90">
                      {p}
                    </p>
                  ))}
                </div>
              </article>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

/* ---------------- Sidebar ---------------- */

export function SidebarCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-line bg-white shadow-xs min-w-0">
      <p className="bg-navy-900 text-white text-xs font-bold uppercase tracking-[0.16em] px-5 py-3">{title}</p>
      <div className="p-5 min-w-0">{children}</div>
    </div>
  );
}

export function SiblingNav({ items, current }: { items: { label: string; href: string }[]; current: string }) {
  return (
    <ul className="divide-y divide-line">
      {items.map((item) => {
        const active = item.href === current;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center justify-between gap-2 px-1 min-h-[44px] py-2.5 text-[0.92rem] transition-colors ${
                active ? "text-gold-700 font-bold" : "text-ink/80 hover:text-navy-900"
              }`}
            >
              <span>{item.label}</span>
              <Icons.ArrowRight
                className={`h-4 w-4 shrink-0 ${active ? "text-gold-600" : "text-muted/40"}`}
                aria-hidden="true"
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
