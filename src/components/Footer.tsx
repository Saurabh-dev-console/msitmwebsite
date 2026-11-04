import Link from "next/link";
import { CONTACT } from "@/data/site";

export default function Footer() {
  return (
    <footer className="band-navy print-hidden">
      <div className="h-1 bg-gold-400" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <p className="eyebrow eyebrow--light">About us</p>
            <p className="font-display mt-3 text-xl font-semibold text-white leading-snug">
              Meena Shah Institute of Technology and Management
            </p>
            <p className="mt-3 text-sm text-navy-100 leading-relaxed">
              MSITM Degree College, Gonda, was established in 1998 by the visionary saint and social activist
              Hazrat Mehboob Meena Shah — the No. 1 professional institute in the Devipatan Mandal for IT and
              Management education.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-[0.72rem] font-semibold">
              {["Avadh University", "Maa Pateshwari University", "Integral University", "NIELIT", "NCPUL", "ISO 9001:2015"].map(
                (a) => (
                  <span key={a} className="border border-white/25 text-navy-100 px-2.5 py-1">
                    {a}
                  </span>
                )
              )}
            </div>
          </div>
          <nav aria-label="Footer quick links">
            <p className="eyebrow eyebrow--light">Quick links</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                ["About Us", "/about"],
                ["Why Choose MSITM", "/about/why-choose-msitm"],
                ["Mission & Vision", "/about/mission-vision"],
                ["President & Leadership", "/about/president-leadership"],
                ["Admissions 2026–27", "/admission-form"],
                ["Placements", "/placement"],
                ["College News", "/college-news-events/college-news"],
                ["IQAC", "/iqac"],
                ["Audit Report", "/audit"],
              ].map(([label, href]) => (
                <li key={href + label}>
                  <Link href={href} className="text-navy-100 hover:text-gold-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Footer courses">
            <p className="eyebrow eyebrow--light">Our courses</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                ["BCA", "/courses/undergraduate-courses/bca"],
                ["BBA", "/courses/undergraduate-courses/bba"],
                ["MBA", "/courses/postgraduate-courses/mba"],
                ["MCA", "/courses/postgraduate-courses/mca"],
                ["NIELIT 'O' / 'A' Level", "/courses/diploma-courses"],
                ["CCC & Certificates", "/courses/certificate-courses"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-navy-100 hover:text-gold-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="eyebrow eyebrow--light">Get in touch</p>
            <address className="mt-4 text-sm text-navy-100 leading-relaxed not-italic">
              {CONTACT.address}
            </address>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href={CONTACT.phonePrimaryHref} className="text-white font-semibold hover:text-gold-300">
                  {CONTACT.phonePrimary}
                </a>
                <span className="text-navy-100"> · </span>
                <a href={CONTACT.phoneAltHref} className="text-navy-100 hover:text-gold-300">
                  {CONTACT.phoneAlt}
                </a>
              </li>
              <li>
                <a href={CONTACT.emailHref} className="text-navy-100 hover:text-gold-300">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy-100 hover:text-gold-300"
                >
                  WhatsApp the institute →
                </a>
              </li>
            </ul>
            <Link href="/contact" className="btn btn-gold btn-sm mt-5">
              Enquire now
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-navy-100">
          <p>© {new Date().getFullYear()} Meena Shah Institute of Technology and Management, Gonda. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-gold-300">
              Privacy Policy
            </Link>
            <Link href="/sitemap-page" className="hover:text-gold-300">
              Sitemap
            </Link>
            <Link href="/audit" className="hover:text-gold-300">
              Rebuild Audit
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
