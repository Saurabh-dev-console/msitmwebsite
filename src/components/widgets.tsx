"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PLACED_STUDENTS, RECRUITERS, TESTIMONIALS } from "@/data/site";

/* ---------------- Recruiter marquee ---------------- */

export function RecruiterMarquee() {
  const logos = [...RECRUITERS, ...RECRUITERS];
  return (
    <div className="overflow-hidden" aria-label="Recruiting companies">
      <div className="marquee-track items-center gap-10 pr-10">
        {logos.map((r, i) => (
          <div
            key={`${r.name}-${i}`}
            className="shrink-0 bg-white border border-line px-6 h-20 w-44 flex items-center justify-center"
            title={r.name}
          >
            <Image
              src={r.logo}
              alt={r.name}
              width={160}
              height={60}
              className="max-h-12 w-auto object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Placed students grid ---------------- */

export function PlacedGrid({ count, linkToPlacement = false }: { count?: number; linkToPlacement?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const list = count && !expanded ? PLACED_STUDENTS.slice(0, count) : count ? PLACED_STUDENTS : PLACED_STUDENTS;
  const shown = count && !expanded ? list.slice(0, count) : list;
  return (
    <div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {shown.map((s) => (
          <li key={s.name} className="card-line group overflow-hidden">
            <div className="aspect-square overflow-hidden bg-parchment">
              <Image
                src={s.img}
                alt={`${s.name} — ${s.company}`}
                width={300}
                height={300}
                loading="lazy"
                className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              <p className="font-semibold text-navy-900 text-sm leading-tight">{s.name}</p>
              <p className="text-xs text-gold-700 font-semibold mt-1 leading-tight">{s.company}</p>
            </div>
          </li>
        ))}
      </ul>
      {count && !expanded ? (
        <div className="mt-6 text-center">
          {linkToPlacement ? (
            <Link href="/placement" className="btn btn-outline-dark">
              Meet all {PLACED_STUDENTS.length} placed students
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

export function TestimonialCards({ count = 6 }: { count?: number }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? TESTIMONIALS : TESTIMONIALS.slice(0, count);
  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {shown.map((t) => (
          <figure key={t.name} className="card-line p-6 flex flex-col">
            <blockquote className="text-[0.93rem] leading-relaxed text-ink/85 flex-1">“{t.text}”</blockquote>
            <figcaption className="mt-5 pt-4 border-t border-line flex items-center gap-3">
              {t.img ? (
                <Image
                  src={t.img}
                  alt={t.name}
                  width={48}
                  height={48}
                  loading="lazy"
                  className="w-12 h-12 rounded-full object-cover object-top border border-line"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="w-12 h-12 rounded-full bg-navy-900 text-gold-300 flex items-center justify-center font-display font-semibold"
                >
                  {t.name.charAt(0)}
                </span>
              )}
              <span>
                <span className="block font-bold text-navy-900 text-sm">{t.name}</span>
                <span className="block text-xs text-muted">{t.role}</span>
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
    <form action="/search" method="get" role="search" className="flex gap-2">
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
        className="field-input flex-1"
      />
      <button type="submit" className="btn btn-navy shrink-0">
        Search
      </button>
    </form>
  );
}

/* ---------------- Print button ---------------- */

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn btn-outline-dark btn-sm print-hidden">
      <span aria-hidden="true">🖨</span> Print / Save as PDF
    </button>
  );
}

/* ---------------- Course card ---------------- */

export function CourseCard({
  title,
  fullName,
  meta,
  href,
}: {
  title: string;
  fullName: string;
  meta: string;
  href: string;
}) {
  return (
    <Link href={href} className="card-line group p-6 flex flex-col h-full">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700">{meta}</p>
      <p className="font-display mt-2 text-2xl font-semibold text-navy-900 group-hover:text-gold-700">{title}</p>
      <p className="mt-1 text-sm text-muted leading-relaxed flex-1">{fullName}</p>
      <span className="mt-4 text-sm font-semibold text-navy-900">
        View details <span aria-hidden="true" className="text-gold-600">→</span>
      </span>
    </Link>
  );
}
