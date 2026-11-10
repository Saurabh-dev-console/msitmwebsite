"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Icon, Icons, type IconName } from "@/components/icons";
import { PLACED_STUDENTS, RECRUITERS, TESTIMONIALS } from "@/data/site";

function initialsFor(name: string) {
  return name
    .replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.)\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0))
    .join("")
    .toUpperCase();
}

/* ---------------- Recruiter marquee ---------------- */

function RecruiterItem({ name, logo }: { name: string; logo: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className="shrink-0 bg-white border border-line rounded-lg px-6 h-20 w-44 flex items-center justify-center shadow-2xs"
      title={name}
    >
      {failed ? (
        <span className="flex items-center gap-2 text-xs font-bold text-navy-900 text-center leading-tight">
          <Icons.Building2 className="h-4 w-4 text-gold-600 shrink-0" aria-hidden="true" />
          <span>{name}</span>
        </span>
      ) : (
        <Image
          src={logo}
          alt={name}
          width={160}
          height={60}
          className="max-h-12 w-auto object-contain"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

export function RecruiterMarquee() {
  const logos = [...RECRUITERS, ...RECRUITERS];
  return (
    <div className="overflow-hidden" aria-label="Recruiting companies">
      <div className="marquee-track items-center gap-6 pr-6">
        {logos.map((r, i) => (
          <RecruiterItem key={`${r.name}-${i}`} name={r.name} logo={r.logo} />
        ))}
      </div>
    </div>
  );
}

/* ---------------- Placed students grid ---------------- */

function PlacedCard({ name, company, img }: { name: string; company: string; img: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <li className="card-line group overflow-hidden min-w-0">
      <div className="aspect-square overflow-hidden bg-navy-900/5 relative">
        {failed ? (
          <div className="w-full h-full bg-navy-900 text-gold-300 flex flex-col items-center justify-center gap-2">
            <span className="font-display text-3xl font-semibold">{initialsFor(name)}</span>
            <Icons.GraduationCap className="h-5 w-5 text-gold-400/70" aria-hidden="true" />
          </div>
        ) : (
          <Image
            src={img}
            alt={`${name} — ${company}`}
            width={300}
            height={300}
            loading="lazy"
            onError={() => setFailed(true)}
            className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
          />
        )}
      </div>
      <div className="p-3 min-w-0">
        <p className="font-semibold text-navy-900 text-sm leading-tight break-words">{name}</p>
        <p className="text-xs text-gold-700 font-semibold mt-1 leading-tight flex items-center gap-1 min-w-0">
          <Icons.Briefcase className="h-3 w-3 shrink-0 text-gold-600" aria-hidden="true" />
          <span className="truncate">{company}</span>
        </p>
      </div>
    </li>
  );
}

export function PlacedGrid({ count, linkToPlacement = false }: { count?: number; linkToPlacement?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const shown = count && !expanded ? PLACED_STUDENTS.slice(0, count) : PLACED_STUDENTS;
  return (
    <div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {shown.map((s) => (
          <PlacedCard key={s.name} name={s.name} company={s.company} img={s.img} />
        ))}
      </ul>
      {count && !expanded ? (
        <div className="mt-6 text-center">
          {linkToPlacement ? (
            <Link href="/placement" className="btn btn-outline-dark">
              Meet all {PLACED_STUDENTS.length} placed students
              <Icons.ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : (
            <button type="button" onClick={() => setExpanded(true)} className="btn btn-outline-dark">
              Show all {PLACED_STUDENTS.length} placed students
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

/* ---------------- Testimonials ---------------- */

function TestimonialAvatar({ name, img }: { name: string; img?: string }) {
  const [failed, setFailed] = useState(false);
  if (!img || failed) {
    return (
      <span
        aria-hidden="true"
        className="w-12 h-12 shrink-0 rounded-full bg-navy-900 text-gold-300 border border-gold-400/35 flex items-center justify-center font-display font-semibold"
      >
        {initialsFor(name)}
      </span>
    );
  }
  return (
    <Image
      src={img}
      alt={name}
      width={48}
      height={48}
      loading="lazy"
      onError={() => setFailed(true)}
      className="w-12 h-12 shrink-0 rounded-full object-cover object-top border border-gold-400/35"
    />
  );
}

export function TestimonialCards({ count = 6 }: { count?: number }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? TESTIMONIALS : TESTIMONIALS.slice(0, count);
  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {shown.map((t) => (
          <figure key={t.name} className="card-line p-5 sm:p-6 flex flex-col min-w-0">
            <Icons.Quote className="h-5 w-5 text-gold-500/75 mb-3 shrink-0" aria-hidden="true" />
            <blockquote className="text-[0.93rem] leading-relaxed text-ink/85 flex-1 break-words">“{t.text}”</blockquote>
            <figcaption className="mt-5 pt-4 border-t border-line flex items-center gap-3 min-w-0">
              <TestimonialAvatar name={t.name} img={t.img} />
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-navy-900 text-sm break-words">{t.name}</span>
                <span className="block text-xs text-muted break-words">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      {!expanded && TESTIMONIALS.length > count ? (
        <div className="mt-6 text-center">
          <button type="button" onClick={() => setExpanded(true)} className="btn btn-outline-dark">
            Read all {TESTIMONIALS.length} testimonials
          </button>
        </div>
      ) : null}
    </div>
  );
}

/* ---------------- Search box ---------------- */

export function SearchBox({ initial = "" }: { initial?: string }) {
  const [q, setQ] = useState(initial);
  return (
    <form action="/search" method="get" role="search" className="flex flex-col min-[380px]:flex-row gap-2 min-w-0">
      <label htmlFor="site-search" className="sr-only">
        Search the website
      </label>
      <input
        id="site-search"
        name="q"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search courses, faculty, placements…"
        className="field-input flex-1 min-w-0"
      />
      <button type="submit" className="btn btn-navy shrink-0 w-full min-[380px]:w-auto">
        <Icons.Search className="h-4 w-4" aria-hidden="true" />
        Search
      </button>
    </form>
  );
}

/* ---------------- Print button ---------------- */

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn btn-outline-dark btn-sm print-hidden gap-1.5">
      <Icons.FileText className="h-4 w-4" aria-hidden="true" /> Print / Save as PDF
    </button>
  );
}

/* ---------------- Course card ---------------- */

export function CourseCard({
  title,
  fullName,
  meta,
  href,
  icon = "GraduationCap",
  image,
  imageAlt,
}: {
  title: string;
  fullName: string;
  meta: string;
  href: string;
  icon?: IconName;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <Link href={href} className="card-line group overflow-hidden flex flex-col h-full transition-all">
      {image ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-navy-950">
          <Image
            src={image}
            alt={imageAlt || `${title} — ${fullName}`}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent pointer-events-none"
            aria-hidden="true"
          />
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-navy-950/90 backdrop-blur-sm border border-gold-400/35 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-300">
            <Icon name={icon} className="h-3.5 w-3.5 text-gold-400" />
            <span>{title}</span>
          </span>
        </div>
      ) : null}
      <div className="p-5 sm:p-6 flex flex-col flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700 break-words">{meta}</p>
          {!image ? (
            <span className="h-8 w-8 rounded-lg bg-navy-50 border border-navy-100 text-navy-900 flex items-center justify-center shrink-0 group-hover:bg-navy-900 group-hover:text-gold-300 transition-colors">
              <Icon name={icon} className="h-4 w-4" />
            </span>
          ) : null}
        </div>
        <p className="font-display mt-2 text-xl sm:text-2xl font-semibold text-navy-900 group-hover:text-gold-700 break-words">
          {title}
        </p>
        <p className="mt-1 text-sm text-muted leading-relaxed flex-1 break-words">{fullName}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900">
          View details
          <Icons.ArrowRight className="h-4 w-4 text-gold-600 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
