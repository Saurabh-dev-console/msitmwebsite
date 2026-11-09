import Image from "next/image";
import Link from "next/link";
import type { Block } from "@/data/content";

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
  return (
    <header className="band-navy hero-graph-grid relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/25 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr] md:items-center">
          <div>
            <div className="[&_a]:!text-navy-100 [&_span[aria-current]]:!text-gold-300 [&_span]:!text-navy-100">
              <Breadcrumbs trail={trail} />
            </div>
            <p className="eyebrow eyebrow--light mt-6">{eyebrow}</p>
            <h1 className="font-display mt-3 text-4xl md:text-5xl font-semibold leading-[1.08] text-white">
              {title}
            </h1>
            <div className="rule-gold mt-5" aria-hidden="true" />
            {description ? <p className="mt-5 max-w-2xl text-navy-100 leading-relaxed">{description}</p> : null}
          </div>
          {image ? (
            <figure className="relative hidden md:block">
              <div className="absolute -inset-3 border border-gold-400/40" aria-hidden="true" />
              <Image
                src={image}
                alt={imageAlt ?? title}
                width={640}
                height={440}
                className="relative w-full h-64 object-cover"
                sizes="(max-width: 768px) 100vw, 420px"
              />
            </figure>
          ) : (
            <div className="hidden md:flex flex-col items-end justify-center gap-3 text-right" aria-hidden="true">
              <p className="font-display text-7xl text-white/10 font-semibold leading-none">1998</p>
              <p className="text-xs tracking-[0.3em] uppercase text-gold-300/80">Gonda · Uttar Pradesh</p>
            </div>
          )}
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
