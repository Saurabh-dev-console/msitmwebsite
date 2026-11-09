"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icons } from "@/components/icons";
import { CONTACT, NAVIGATION } from "@/data/site";

export default function Header() {
  const [exploreOpen, setExploreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExploreOpen(false);
        setMobileOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = exploreOpen || mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [exploreOpen, mobileOpen]);

  return (
    <>
      {/* Utility bar */}
      <div className="bg-navy-950 text-white text-[0.8rem] print-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 py-2">
          <p className="hidden md:block text-navy-100">
            Est. 1998 · Affiliated to Dr. R.M.L. Avadh University &amp; Maa Pateshwari University
          </p>
          <p className="md:hidden text-navy-100">Est. 1998 · Gonda, U.P.</p>
          <div className="flex items-center gap-4 shrink-0">
            <a href={CONTACT.phonePrimaryHref} className="hover:text-gold-300 font-semibold">
              {CONTACT.phonePrimary}
            </a>
            <span aria-hidden="true" className="text-white/25">
              |
            </span>
            <a href={CONTACT.emailHref} className="hidden sm:inline hover:text-gold-300">
              {CONTACT.email}
            </a>
            <Link
              href="/admission-form"
              className="hidden sm:inline-block bg-highlight text-highlight-foreground font-bold px-3 py-1 rounded-full text-xs hover:brightness-95"
            >
              Admissions 2026–27
            </Link>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border print-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 py-3">
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="MSITM home">
            <Image
              src="/brand/msitm-logo.png"
              alt="MSITM — Meena Shah Institute of Technology and Management"
              width={362}
              height={64}
              className="h-12 md:h-14 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden xl:flex items-center gap-1">
            {NAVIGATION.slice(0, 7).map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  aria-haspopup="true"
                  aria-expanded={openDropdown === item.label}
                  onFocus={() => setOpenDropdown(item.label)}
                  className={`px-3 py-2.5 text-[0.86rem] font-semibold tracking-wide transition-colors ${
                    openDropdown === item.label ? "text-gold-700" : "text-navy-900 hover:text-gold-700"
                  }`}
                >
                  {item.label.toUpperCase()}
                </Link>
                {openDropdown === item.label ? (
                  <div className="absolute left-0 top-full pt-1 min-w-72">
                    <ul className="bg-white border border-line shadow-[0_18px_50px_-12px_rgba(6,15,36,0.35)] py-2">
                      {item.children.map((child) => (
                        <li key={child.href + child.label}>
                          <Link
                            href={child.href}
                            onClick={() => setOpenDropdown(null)}
                            className="block px-5 py-2.5 text-sm text-ink/85 hover:bg-gold-50 hover:text-navy-900"
                          >
                            <span className="font-semibold">{child.label}</span>
                            {child.note ? <span className="block text-xs text-muted">{child.note}</span> : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ))}
            <button
              type="button"
              onClick={() => setExploreOpen(true)}
              className="ml-2 btn btn-navy btn-sm btn-pill flex items-center gap-1.5"
              aria-haspopup="dialog"
            >
              <Icons.Menu className="h-4 w-4" aria-hidden="true" /> Explore MSITM
            </button>
          </nav>

          {/* Tablet / mobile actions */}
          <div className="flex xl:hidden items-center gap-2">
            <Link href="/search" className="btn btn-outline-dark btn-sm rounded-lg" aria-label="Search the website">
              Search
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="btn btn-navy btn-sm btn-pill flex items-center gap-1.5"
              aria-haspopup="dialog"
              aria-label="Open menu"
            >
              <Icons.Menu className="h-4 w-4" aria-hidden="true" /> Menu
            </button>
          </div>
        </div>
      </div>

      {/* Explore mega menu (desktop) */}
      {exploreOpen ? (
        <div role="dialog" aria-modal="true" aria-label="Explore MSITM" className="fixed inset-0 z-50 overflow-y-auto">
          <div className="absolute inset-0 bg-navy-950/70" onClick={() => setExploreOpen(false)} aria-hidden="true" />
          <div className="relative bg-white mx-auto my-4 md:my-8 max-w-6xl w-[calc(100%-2rem)] border-t-4 border-gold-400 shadow-2xl">
            <div className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-line">
              <div>
                <p className="eyebrow">Site index</p>
                <p className="font-display text-2xl text-navy-900 font-semibold mt-1">Explore MSITM</p>
              </div>
              <button
                type="button"
                onClick={() => setExploreOpen(false)}
                className="btn btn-outline-dark btn-sm flex items-center gap-1.5"
                autoFocus
              >
                Close <Icons.Close className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-10 py-8">
              {NAVIGATION.map((section) => (
                <nav key={section.label} aria-label={section.label}>
                  <Link
                    href={section.href}
                    onClick={() => setExploreOpen(false)}
                    className="font-display text-lg font-semibold text-navy-900 hover:text-gold-700"
                  >
                    {section.label}
                  </Link>
                  <div className="h-0.5 w-8 bg-gold-400 my-2" aria-hidden="true" />
                  <ul className="space-y-1.5">
                    {section.children.map((child) => (
                      <li key={child.href + child.label}>
                        <Link
                          href={child.href}
                          onClick={() => setExploreOpen(false)}
                          className="text-sm text-ink/75 hover:text-gold-700 hover:underline underline-offset-4"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
            <div className="band-navy px-6 md:px-10 py-5 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm">
              <a href={CONTACT.phonePrimaryHref} className="font-semibold text-white hover:text-gold-300">
                Call {CONTACT.phonePrimary}
              </a>
              <a href={CONTACT.emailHref} className="text-navy-100 hover:text-gold-300">
                {CONTACT.email}
              </a>
              <Link href="/search" onClick={() => setExploreOpen(false)} className="text-navy-100 hover:text-gold-300">
                Search the site →
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 xl:hidden">
          <div className="absolute inset-0 bg-navy-950/70" onClick={() => setMobileOpen(false)} aria-hidden="true" />
          <div className="relative bg-white h-full w-[88%] max-w-sm ml-auto flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-line">
              <p className="font-display text-xl font-semibold text-navy-900">Menu</p>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="btn btn-outline-dark btn-sm p-1.5"
                aria-label="Close menu"
                autoFocus
              >
                <Icons.Close className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-4 space-y-1">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="block py-2.5 font-display text-lg font-semibold text-navy-900"
              >
                Home
              </Link>
              {NAVIGATION.map((section) => {
                const open = openSection === section.label;
                return (
                  <div key={section.label} className="border-t border-line">
                    <div className="flex items-center justify-between">
                      <Link
                        href={section.href}
                        onClick={() => setMobileOpen(false)}
                        className="py-3 font-semibold text-navy-900"
                      >
                        {section.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setOpenSection(open ? null : section.label)}
                        aria-expanded={open}
                        aria-label={`${open ? "Collapse" : "Expand"} ${section.label}`}
                        className="px-3 py-2 text-gold-700 font-bold"
                      >
                        {open ? "−" : "+"}
                      </button>
                    </div>
                    {open ? (
                      <ul className="pb-3 space-y-1">
                        {section.children.map((child) => (
                          <li key={child.href + child.label}>
                            <Link
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="block py-1.5 pl-3 text-[0.93rem] text-ink/80 border-l-2 border-gold-100 hover:text-navy-900 hover:border-gold-400"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                );
              })}
              <div className="border-t border-line pt-3 pb-1">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block py-2.5 font-semibold text-navy-900"
                >
                  Contact
                </Link>
                <Link href="/search" onClick={() => setMobileOpen(false)} className="block py-2.5 text-ink/80">
                  Search the site →
                </Link>
              </div>
            </nav>
            <div className="band-navy px-5 py-4 text-sm space-y-1.5">
              <a href={CONTACT.phonePrimaryHref} className="block font-semibold text-gold-300">
                {CONTACT.phonePrimary}
              </a>
              <a href={CONTACT.emailHref} className="block text-navy-100">
                {CONTACT.email}
              </a>
              <Link href="/admission-form" onClick={() => setMobileOpen(false)} className="btn btn-gold btn-sm mt-2 w-full">
                Apply for 2026–27
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
