import Link from "next/link";
import { Icons } from "@/components/icons";
import { CONTACT } from "@/data/site";

export default function Footer() {
  return (
    <footer className="band-navy print-hidden">
      <div className="h-1 bg-highlight" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="min-w-0">
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
                  <span key={a} className="border border-white/20 text-brand-foreground/80 rounded-md px-2.5 py-1 font-mono text-[0.72rem]">
                    {a}
                  </span>
                )
              )}
            </div>
          </div>
          <nav aria-label="Footer quick links" className="min-w-0">
            <p className="eyebrow eyebrow--light">Quick links</p>
            <ul className="mt-4 space-y-0.5 lg:space-y-2.5 text-sm">
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
                  <Link href={href} className="inline-flex items-center min-h-[44px] min-w-[44px] lg:min-h-0 lg:min-w-0 py-1 lg:py-0 text-navy-100 hover:text-gold-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Footer courses" className="min-w-0">
            <p className="eyebrow eyebrow--light">Our courses</p>
            <ul className="mt-4 space-y-0.5 lg:space-y-2.5 text-sm">
              {[
                ["BCA", "/courses/undergraduate-courses/bca"],
                ["BBA", "/courses/undergraduate-courses/bba"],
                ["MBA", "/courses/postgraduate-courses/mba"],
                ["MCA", "/courses/postgraduate-courses/mca"],
                ["NIELIT 'O' / 'A' Level", "/courses/diploma-courses"],
                ["CCC & Certificates", "/courses/certificate-courses"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="inline-flex items-center min-h-[44px] min-w-[44px] lg:min-h-0 lg:min-w-0 py-1 lg:py-0 text-navy-100 hover:text-gold-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="min-w-0">
            <p className="eyebrow eyebrow--light">Get in touch</p>
            <address className="mt-4 text-sm text-navy-100 leading-relaxed not-italic flex items-start gap-2 min-w-0">
              <Icons.MapPin className="h-4 w-4 text-gold-400 shrink-0 mt-0.5" aria-hidden="true" />
              <span className="min-w-0 break-words">{CONTACT.address}</span>
            </address>
            <ul className="mt-4 space-y-1.5 lg:space-y-2.5 text-sm">
              <li className="flex items-start gap-2 min-w-0">
                <Icons.Phone className="h-4 w-4 text-gold-400 shrink-0 mt-3 lg:mt-0.5" aria-hidden="true" />
                <span className="flex flex-wrap items-center gap-x-2 gap-y-1 min-w-0">
                  <a
                    href={CONTACT.phonePrimaryHref}
                    className="inline-flex items-center min-h-[44px] lg:min-h-0 text-white font-semibold hover:text-gold-300 whitespace-nowrap"
                  >
                    {CONTACT.phonePrimary}
                  </a>
                  <span className="text-navy-100 hidden min-[400px]:inline" aria-hidden="true">·</span>
                  <a
                    href={CONTACT.phoneAltHref}
                    className="inline-flex items-center min-h-[44px] lg:min-h-0 text-navy-100 hover:text-gold-300 whitespace-nowrap"
                  >
                    {CONTACT.phoneAlt}
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-2 min-w-0">
                <Icons.Mail className="h-4 w-4 text-gold-400 shrink-0" aria-hidden="true" />
                <a
                  href={CONTACT.emailHref}
                  className="inline-flex items-center min-h-[44px] lg:min-h-0 text-navy-100 hover:text-gold-300 break-all sm:break-normal"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-2 min-w-0">
                <Icons.MessageCircle className="h-4 w-4 text-gold-400 shrink-0" aria-hidden="true" />
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy-100 hover:text-gold-300 inline-flex items-center gap-1 min-h-[44px] lg:min-h-0"
                >
                  WhatsApp the institute
                  <Icons.ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
            <Link href="/contact" className="btn btn-gold btn-sm btn-pill mt-5 w-full sm:w-auto">
              Enquire now
              <Icons.ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-navy-100">
          <p className="leading-relaxed">
            © {new Date().getFullYear()} Meena Shah Institute of Technology and Management, Gonda. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <Link href="/privacy-policy" className="inline-flex items-center min-h-[44px] lg:min-h-0 hover:text-gold-300">
              Privacy Policy
            </Link>
            <Link href="/sitemap-page" className="inline-flex items-center min-h-[44px] lg:min-h-0 hover:text-gold-300">
              Sitemap
            </Link>
            <Link href="/audit" className="inline-flex items-center min-h-[44px] lg:min-h-0 hover:text-gold-300">
              Rebuild Audit
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
