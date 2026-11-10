import Image from "next/image";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import type { Block } from "@/data/content";
import { CAMPUS_IMAGES } from "@/data/site";

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
        className={`font-display mt-3 text-3xl md:text-4xl font-semibold leading-tight ${
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
                <Link href={item.href} className="text-muted hover:text-navy-900 hover:underline underline-offset-4">
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

function getContextualHeroImage(
  trail: { label: string; href?: string }[],
  title: string,
  eyebrow: string
): { src: string; alt: string; badge: string; subtitle: string } {
  const text = [
    ...trail.map((t) => t.label.toLowerCase()),
    title.toLowerCase(),
    eyebrow.toLowerCase(),
  ].join(" ");

  if (text.includes("faculty") || text.includes("department") || text.includes("registration") || text.includes("proctorial") || text.includes("staff")) {
    return {
      src: CAMPUS_IMAGES.collageMain,
      alt: "MSITM Faculty & Administrative Wing",
      badge: "Faculty & Administration",
      subtitle: "Dedicated Academic Mentors",
    };
  }
  if (text.includes("course") || text.includes("academic") || text.includes("bca") || text.includes("bba") || text.includes("b.com") || text.includes("bsc") || text.includes("diploma")) {
    return {
      src: CAMPUS_IMAGES.collage1,
      alt: "MSITM Computer Labs & Academic Lectures",
      badge: "Academic Programmes",
      subtitle: "Practical Lab & Industry Training",
    };
  }
  if (text.includes("admission") || text.includes("enrol") || text.includes("calender") || text.includes("process") || text.includes("form") || text.includes("eligibility") || text.includes("fee")) {
    return {
      src: CAMPUS_IMAGES.about,
      alt: "MSITM Main Admissions Campus",
      badge: "Admissions 2026–27",
      subtitle: "Counselling & Campus Guidance",
    };
  }
  if (text.includes("placement") || text.includes("career") || text.includes("recruiter") || text.includes("ranking") || text.includes("alumni")) {
    return {
      src: CAMPUS_IMAGES.rankings,
      alt: "MSITM Career & Placement Wing",
      badge: "Placement Excellence",
      subtitle: "Leading Recruiters & Alumni",
    };
  }
  if (text.includes("facility") || text.includes("facilities") || text.includes("library") || text.includes("lab") || text.includes("sports") || text.includes("hostel") || text.includes("transport")) {
    return {
      src: CAMPUS_IMAGES.collage2,
      alt: "MSITM Campus Infrastructure & Labs",
      badge: "Campus Infrastructure",
      subtitle: "Modern Labs & Amenities",
    };
  }
  if (text.includes("news") || text.includes("event") || text.includes("celebrat") || text.includes("farewell") || text.includes("activity")) {
    return {
      src: CAMPUS_IMAGES.event,
      alt: "MSITM Campus Events & Celebrations",
      badge: "Campus Life & Events",
      subtitle: "Seminars, Sports & Celebrations",
    };
  }
  if (text.includes("student") || text.includes("club") || text.includes("council") || text.includes("welfare")) {
    return {
      src: CAMPUS_IMAGES.collage3,
      alt: "MSITM Student Community & Clubs",
      badge: "Student Community",
      subtitle: "Extra-Curricular Excellence",
    };
  }
  if (text.includes("leadership") || text.includes("president") || text.includes("founder") || text.includes("vision") || text.includes("mission")) {
    return {
      src: CAMPUS_IMAGES.founder,
      alt: "MSITM Leadership & Heritage",
      badge: "Institutional Heritage",
      subtitle: "Guiding Principles Since 1998",
    };
  }

  return {
    src: CAMPUS_IMAGES.about,
    alt: "Meena Shah Institute of Technology & Management Campus",
    badge: "MSITM Campus",
    subtitle: "Gonda, Uttar Pradesh · Est. 1998",
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
}: {
  eyebrow: string;
  title: string;
  description?: string;
  trail: { label: string; href?: string }[];
  image?: string;
  imageAlt?: string;
}) {
  const contextual = getContextualHeroImage(trail, title, eyebrow);
  const heroImage = image || contextual.src;
  const heroAlt = imageAlt || contextual.alt;
  const badgeLabel = contextual.badge;
  const subtitleLabel = contextual.subtitle;

  return (
    <header className="band-navy hero-graph-grid relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/35 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <div className="[&_a]:!text-navy-100 [&_span[aria-current]]:!text-gold-300 [&_span]:!text-navy-100">
              <Breadcrumbs trail={trail} />
            </div>
            <p className="eyebrow eyebrow--light mt-6">{eyebrow}</p>
            <h1 className="font-display mt-3 text-4xl md:text-5xl font-semibold leading-[1.08] text-white">
              {title}
            </h1>
            <div className="rule-gold mt-5" aria-hidden="true" />
            {description ? (
              <p className="mt-5 max-w-2xl text-navy-100 leading-relaxed font-normal text-base md:text-[1.05rem]">
                {description}
              </p>
            ) : null}
          </div>
          <figure className="relative hidden md:block group">
            <div className="absolute -inset-2 rounded-xl bg-gold-400/20 blur-[2px] transition-opacity duration-300 group-hover:bg-gold-400/30" aria-hidden="true" />
            <div className="relative rounded-lg overflow-hidden border border-gold-400/40 shadow-2xl bg-navy-950 ring-1 ring-white/10">
              <Image
                src={heroImage}
                alt={heroAlt}
                width={640}
                height={400}
                className="relative w-full h-64 lg:h-72 object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 460px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/20 to-transparent pointer-events-none" />

              {/* Top status badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-navy-900/90 backdrop-blur-md px-2.5 py-1 rounded border border-gold-400/30 text-[11px] font-semibold text-gold-300 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                MSITM Gonda
              </div>

              {/* Bottom info strip */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-navy-100 font-medium">
                <span className="flex items-center gap-1.5 bg-navy-900/90 backdrop-blur-md px-2.5 py-1.5 rounded border border-white/10 text-white font-semibold">
                  <GraduationCap className="w-3.5 h-3.5 text-gold-400" />
                  {badgeLabel}
                </span>
                <span className="text-[11px] text-white/90 bg-black/50 backdrop-blur-sm px-2 py-1 rounded border border-white/10">
                  {subtitleLabel}
                </span>
              </div>
            </div>
          </figure>
        </div>
      </div>
      <div className="h-1 bg-gold-400" aria-hidden="true" />
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
    <div className="space-y-8">
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
              <h2 key={i} className="font-display text-2xl md:text-[1.7rem] font-semibold text-navy-900 pt-2">
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
              <dl key={i} className="grid sm:grid-cols-2 gap-px bg-line border border-line">
                {block.items.map((f, j) => (
                  <div key={j} className="bg-white p-5">
                    <dt className="text-xs font-bold uppercase tracking-[0.14em] text-gold-700">{f.label}</dt>
                    <dd className="mt-1.5 font-semibold text-navy-900 leading-relaxed">{f.value}</dd>
                  </div>
                ))}
              </dl>
            );
          case "table":
            return (
              <div key={i} className="overflow-x-auto border border-line">
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
                          <td key={c} className={c === 0 ? "font-semibold text-navy-900 whitespace-nowrap" : ""}>
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
                  className="w-full h-auto object-cover border border-line"
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
                className={`border px-6 py-5 ${
                  block.tone === "warn" ? "border-gold-500 bg-gold-50" : "border-navy-100 bg-navy-50"
                }`}
              >
                {block.title ? (
                  <p className="text-sm font-bold uppercase tracking-[0.12em] text-navy-900">{block.title}</p>
                ) : null}
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink/85">{block.text}</p>
              </aside>
            );
          case "cta":
            return (
              <div key={i} className="band-navy px-6 py-8 md:px-10 md:py-10">
                <p className="eyebrow eyebrow--light">Next step</p>
                <h3 className="font-display mt-2 text-2xl md:text-3xl font-semibold text-white">{block.title}</h3>
                <p className="mt-2 text-navy-100 max-w-xl">{block.text}</p>
                <Link href={block.href} className="btn btn-gold mt-5">
                  {block.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            );
          case "linkCards":
            return (
              <div key={i} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 not-prose">
                {block.items.map((card, j) => (
                  <Link
                    key={j}
                    href={card.href}
                    className="card-line group p-5 flex flex-col transition-colors"
                  >
                    <span className="font-display text-lg font-semibold text-navy-900 group-hover:text-gold-700">
                      {card.title}
                    </span>
                    <span className="mt-1.5 text-sm text-muted leading-relaxed flex-1">{card.text}</span>
                    <span className="mt-3 text-sm font-semibold text-gold-700">
                      Open <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                ))}
              </div>
            );
          case "message":
            return (
              <article key={i} className="border border-line bg-white">
                <div className="bg-navy-900 px-6 py-5 md:px-8">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">{block.role}</p>
                  <h3 className="font-display mt-1 text-2xl font-semibold text-white">{block.from}</h3>
                </div>
                <div className="px-6 py-6 md:px-8 space-y-4">
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
    <div className="border border-line bg-white">
      <p className="bg-navy-900 text-white text-xs font-bold uppercase tracking-[0.16em] px-5 py-3">{title}</p>
      <div className="p-5">{children}</div>
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
              className={`flex items-center justify-between gap-2 px-1 py-2.5 text-[0.92rem] transition-colors ${
                active ? "text-gold-700 font-bold" : "text-ink/80 hover:text-navy-900"
              }`}
            >
              <span>{item.label}</span>
              <span aria-hidden="true" className={active ? "text-gold-500" : "text-line"}>
                →
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
