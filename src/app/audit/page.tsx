import type { Metadata } from "next";
import Link from "next/link";
import { Icon, type IconName } from "@/components/icons";
import { PageHero, SectionHeading } from "@/components/chrome";
import { SITE_IMAGES } from "@/data/site";

export const metadata: Metadata = {
  title: "Forensic Audit & Rebuild Report",
  description:
    "Public audit of msitm.edu.in — full URL inventory, UI/UX findings, content migration notes and QA report.",
};

const INVENTORY: [string, string, string][] = [
  ["/", "/", "Migrated + redesigned"],
  ["/about/", "/about", "Migrated + redesigned"],
  ["/about/university-profile/", "/about/university-profile", "Migrated + annotated"],
  ["/about/mission-vision/", "/about/mission-vision", "Migrated + redesigned"],
  ["/about/president-leadership/", "/about/president-leadership", "Migrated + redesigned"],
  ["/about/our-campus/", "/about/our-campus", "Migrated + redesigned"],
  ["/about/equity-and-inclusion/", "/about/equity-and-inclusion", "Migrated; template list retired (noted)"],
  ["/about/why-choose-msitm/", "/about/why-choose-msitm", "Migrated + redesigned"],
  ["/about/rankings-accolades/", "/about/rankings-accolades", "Empty on original → rebuilt from verified statements"],
  ["/courses/", "/courses", "Empty on original → new catalogue index"],
  ["/courses/undergraduate-courses/", "/courses/undergraduate-courses", "Migrated + redesigned"],
  ["/courses/undergraduate-courses/bca/", "/courses/undergraduate-courses/bca", "Migrated + redesigned"],
  ["/courses/undergraduate-courses/bba/", "/courses/undergraduate-courses/bba", "Migrated + redesigned"],
  ["/courses/postgraduate-courses/", "/courses/postgraduate-courses", "Migrated + redesigned"],
  ["/courses/postgraduate-courses/mba/", "/courses/postgraduate-courses/mba", "Migrated + redesigned"],
  ["/courses/postgraduate-courses/mca/", "/courses/postgraduate-courses/mca", "Migrated + redesigned"],
  ["/courses/diploma-courses/", "/courses/diploma-courses", "Migrated + redesigned"],
  ["/courses/diploma-courses/o-level/", "/courses/diploma-courses/o-level", "Migrated + annotated"],
  ["/courses/diploma-courses/a-level/", "/courses/diploma-courses/a-level", "Migrated + redesigned"],
  ["/courses/diploma-courses/caba-mdtp/", "/courses/diploma-courses/caba-mdtp", "Migrated + redesigned"],
  ["/courses/diploma-courses/chm-o-level/", "/courses/diploma-courses/chm-o-level", "Migrated + redesigned"],
  ["/courses/diploma-courses/dsa/", "/courses/diploma-courses/dsa", "Migrated + redesigned"],
  ["/courses/certificate-courses/", "/courses/certificate-courses", "Migrated + redesigned"],
  ["/courses/certificate-courses/ccc/", "/courses/certificate-courses/ccc", "Migrated + redesigned"],
  ["/courses/certificate-courses/english-academy/", "/courses/certificate-courses/english-academy", "Migrated + redesigned"],
  ["/courses/certificate-courses/tally-master/", "/courses/certificate-courses/tally-master", "Title-only → page + office notice"],
  ["/courses/certificate-courses/wdt/", "/courses/certificate-courses/wdt", "Migrated (as published)"],
  ["/courses/certificate-courses/dtp/", "/courses/certificate-courses/dtp", "Migrated (as published)"],
  ["/courses/certificate-courses/ccn/", "/courses/certificate-courses/ccn", "Migrated (as published)"],
  ["/courses/certificate-courses/cpt/", "/courses/certificate-courses/cpt", "Migrated (as published)"],
  ["/courses/certificate-courses/course-on-net/", "/courses/certificate-courses/course-on-net", "Migrated (as published)"],
  ["/courses/certificate-courses/course-on-oracle/", "/courses/certificate-courses/course-on-oracle", "Migrated (as published)"],
  ["/courses/certificate-courses/course-on-c/", "/courses/certificate-courses/course-on-c", "Migrated (as published)"],
  ["/courses/certificate-courses/course-on-java/", "/courses/certificate-courses/course-on-java", "Migrated (as published)"],
  ["/courses/certificate-courses/laptop-mobile-reparing/", "/courses/certificate-courses/laptop-mobile-reparing", "Migrated; slug preserved"],
  ["/admission-calender/", "/admission-calender", "Empty on original → session page; slug preserved"],
  ["/admission-form/", "/admission-form", "Empty on original → working form (new functionality)"],
  ["/admission-process/", "/admission-process", "Empty on original → honest process page"],
  ["/faculty/", "/faculty", "Empty on original → new department index"],
  ["/faculty/it-faculty/", "/faculty/it-faculty", "Migrated + redesigned"],
  ["/faculty/management-faculty/", "/faculty/management-faculty", "Migrated + redesigned"],
  ["/faculty/registration-department/", "/faculty/registration-department", "Migrated + redesigned"],
  ["/faculty/online-guest-faculty/", "/faculty/online-guest-faculty", "Migrated + redesigned"],
  ["/faculty/hardware-department/", "/faculty/hardware-department", "Migrated + redesigned"],
  ["/faculty/diploma-department/", "/faculty/diploma-department", "Migrated + redesigned"],
  ["/facilities/", "/facilities", "Empty on original → new index"],
  ["/facilities/campus/", "/facilities/campus", "Migrated + redesigned"],
  ["/facilities/library/", "/facilities/library", "Migrated + inconsistency noted"],
  ["/facilities/computer-lab/", "/facilities/computer-lab", "Migrated + redesigned"],
  ["/facilities/lecture-hall/", "/facilities/lecture-hall", "Migrated + redesigned"],
  ["/placement/", "/placement", "Empty on original → overview + 52 placed profiles"],
  ["/placement/about-placement-cell/", "/placement/about-placement-cell", "Migrated + redesigned"],
  ["/placement/traning-placement/", "/placement/traning-placement", "Migrated; slug preserved"],
  ["/training-placement/", "/training-placement", "Empty duplicate → canonical hub page"],
  ["/college-news-events/", "/college-news-events", "Empty on original → new index"],
  ["/college-news-events/college-news/", "/college-news-events/college-news", "Migrated + redesigned"],
  ["/college-news-events/farewell-2017/", "/college-news-events/farewell-2017", "Migrated + redesigned"],
  ["/college-news-events/extra-curricular-activities/", "/college-news-events/extra-curricular-activities", "Empty → rebuilt from genuine fragments"],
  ["/iqac/", "/iqac", "Empty on original → new index"],
  ["/iqac/about-iqac/", "/iqac/about-iqac", "Migrated + redesigned"],
  ["/iqac/composition-of-iqac/", "/iqac/composition-of-iqac", "Empty → stub + office notice"],
  ["/iqac/naac-steering-committee/", "/iqac/naac-steering-committee", "Empty → stub + office notice"],
  ["/iqac/meeting-and-minutes/", "/iqac/meeting-and-minutes", "Empty → stub + office notice"],
  ["/iqac/iqac-activity/", "/iqac/iqac-activity", "Empty → stub + office notice"],
  ["/iqac/iqac-reports/", "/iqac/iqac-reports", "Empty → stub + office notice"],
  ["/iqac/rti-statutory-declaration/", "/iqac/rti-statutory-declaration", "Empty → stub + office notice"],
  ["/iqac/mous/", "/iqac/mous", "Empty → stub + office notice"],
  ["/iqac/academic-administrative-audit-aaa-reports/", "/iqac/academic-administrative-audit-aaa-reports", "Empty → stub + office notice"],
  ["/iqac/perspective-plans/", "/iqac/perspective-plans", "Empty → stub + office notice"],
  ["/alumni/", "/alumni", "Template content → rebuilt honestly; fake stats retired"],
  ["/contact/", "/contact", "Migrated + working form"],
  ["/success-stories/", "/success-stories", "Empty → 18 genuine testimonials"],
  ["/student-corner/", "/student-corner", "Migrated + working forms"],
  ["/privacy-policy/", "/privacy-policy", "WP template text → proper policy written"],
  ["/thank-you/", "/thank-you", "Migrated (form destination)"],
  ["/bachpan-independence-day-certificate/", "/bachpan-independence-day-certificate", "Migrated + honest verification desk"],
  ["/msitm-independence-day-certificate/", "/msitm-independence-day-certificate", "Migrated + honest verification desk"],
  ["/admissions-open-for-the-2025-2026-academic-session/", "/admissions-open-for-the-2025-2026-academic-session", "Migrated (URL preserved)"],
  ["/celebrate-independence-day-with-creativity-and-fun-at-meena-shah-pre-school/", "/celebrate-independence-day-with-creativity-and-fun-at-meena-shah-pre-school", "Migrated (URL preserved)"],
  ["/msitm-degree-college-mega-district-level-competition/", "/msitm-degree-college-mega-district-level-competition", "Migrated (URL preserved)"],
];

const UX_FINDINGS: [string, string][] = [
  ["Outdated visual design", "Stock Beaver Builder/WordPress theme styling with default widgets; no coherent editorial identity. Fixed with a navy/white/gold design system."],
  ["Broken statistic counters", "Homepage animated counters rendered as “0k+ / 0+ / 0st” — a failed script shipping visible broken UI. Replaced with verified published figures."],
  ["Fake/template statistics", "Alumni page showed “Top 2% in the nation”, “700+ alumni”, “30% higher earnings” and New-York-chapter events — unreplaced demo content. Retired, not republished."],
  ["Weak information hierarchy", "Course details, faculty lists and news shared one undifferentiated template with oversized headings. Rebuilt with ledes, fact grids, tables and breadcrumbs."],
  ["Empty navigation destinations", "23 sitemap URLs rendered a bare H1 with no content (admissions, IQAC records, indexes). Each now has honest, useful content or a documented stub."],
  ["Duplicated content", "About Placement Cell vs Training & Placement repeated identical paragraphs; equity and university-profile pages shared theme boilerplate. Deduplicated with canonical cross-links."],
  ["Spelling & URL errors", "“Traning”, “Calender”, “Reparing”, “WDT … Traning”. Titles corrected on-page; original slugs preserved for link compatibility and documented here."],
  ["Inconsistent data", "Library stock stated as 5,000 / 4,000 / 2,500 books on different pages. Flagged on-page and here; awaiting librarian verification."],
  ["Unreplaced legal text", "Privacy policy was WordPress “Suggested text” boilerplate. A real policy for this site's forms was written."],
  ["Template residue", "US-theme leftovers (“ALANA Services”, “Campus Ministry”, “Ignatian Citizenship”) and 40+ empty /wpm-team/ URLs. Retired and reported."],
  ["Poor SEO foundations", "Homepage H1 was literally “Home”; no meta descriptions. Every page now has a unique title, description and semantic headings."],
  ["Accessibility gaps", "Missing skip links, ambiguous “Explore MSITM”/“Close” controls, icon-only buttons. Rebuilt with labelled controls, focus states and keyboard support."],
  ["No mobile-first IA", "Eight top-level menus with deep dropdowns overflowed small screens. Rebuilt with a full mobile drawer + desktop mega-menu."],
  ["Dead interactions", "Certificate pages implied instant downloads backed by no published records. Rebuilt as honest verification desks with helplines."],
];

const QA_CHECKS: [string, string][] = [
  ["1440px desktop", "All templates checked: hero grids, 4-col cards, tables, mega-menu."],
  ["1280px laptop", "Navigation fits; sidebar layouts hold; marquee stable."],
  ["768px tablet", "Grids collapse to 2-col; drawer replaces dropdowns below xl."],
  ["390px / 375px mobile", "Single-column; forms full-width; tables scroll horizontally; no overflow."],
  ["Links & buttons", "Every nav item, card, CTA and footer link resolves; external links open safely."],
  ["Forms", "Enquiry, admission, feedback, survey and certificate lookups validate, submit and land on /thank-you."],
  ["Images", "Genuine MSITM photographs via msitm.edu.in CDN with alt text; logo served locally."],
  ["Build", "TypeScript, production build and health checks pass; sitemap.xml + robots served."],
];

export default function AuditPage() {
  const stats: { num: string; label: string; icon: IconName }[] = [
    { num: "80", label: "URLs crawled & mapped", icon: "Globe" },
    { num: "23", label: "Empty pages rebuilt honestly", icon: "FileCheck2" },
    { num: "52", label: "Placed-student profiles migrated", icon: "Users" },
    { num: "18", label: "Testimonials migrated verbatim", icon: "Quote" },
  ];
  return (
    <>
      <PageHero
        eyebrow="Transparency · Deliverable"
        title="Forensic Audit & Rebuild Report"
        description="Reference: msitm.edu.in — crawled in full (sitemap + link graph). 80 URLs inventoried, every page content-mapped, all findings documented below."
        trail={[{ label: "Home", href: "/" }, { label: "Audit Report" }]}
        image={SITE_IMAGES.computerLab}
        imageAlt="MSITM engineering and quality audit review"
        icon="ClipboardCheck"
        badge="Public Audit"
        subtitle="80 URLs Verified & Mapped"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16 space-y-12 sm:space-y-16">
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((s) => (
            <div key={s.label} className="card-line p-4 sm:p-6 text-center min-w-0">
              <span className="h-9 w-9 rounded-lg bg-navy-50 border border-navy-100 text-gold-700 flex items-center justify-center mx-auto mb-3">
                <Icon name={s.icon} className="h-4.5 w-4.5" />
              </span>
              <p className="stat-numeral text-3xl sm:text-4xl text-navy-900">{s.num}</p>
              <p className="mt-1 text-xs sm:text-sm text-muted leading-snug">{s.label}</p>
            </div>
          ))}
        </section>

        <section className="min-w-0">
          <SectionHeading eyebrow="Phase 1" title="Complete URL inventory & mapping" text="Old URL → new URL → disposition. Slugs with historic misspellings were deliberately preserved." />
          <div className="mt-6 overflow-x-auto max-w-full rounded-xl border border-line">
            <table className="table-msitm min-w-[720px]">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Original URL (msitm.edu.in)</th>
                  <th scope="col">New URL</th>
                  <th scope="col">Disposition</th>
                </tr>
              </thead>
              <tbody>
                {INVENTORY.map(([oldUrl, newUrl, status], i) => (
                  <tr key={oldUrl}>
                    <td>{i + 1}</td>
                    <td className="font-mono text-[0.8rem]">{oldUrl}</td>
                    <td>
                      <Link href={newUrl} className="link-underline font-mono text-[0.8rem]">
                        {newUrl}
                      </Link>
                    </td>
                    <td>{status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <SectionHeading eyebrow="Inaccessible" title="Reported — not silently omitted" />
          <div className="mt-6 space-y-3">
            {[
              ["/wpm-team/* (≈40 URLs: adam-smith, …)", "Returned empty HTTP 200 responses (0 bytes). Unlinked template residue from a team plugin — retired."],
              ["Certificate record database", "Competition pages referenced online certificates, but no verifiable record store was published. Desks rebuilt as honest request-logging with helplines."],
              ["Documents / PDFs", "Zero PDF/DOC/XLS links found anywhere on the reference site. “Print / Save as PDF” provided on course pages instead."],
              ["Official social profiles", "No Facebook/LinkedIn/YouTube profile links found (only share widgets). No social icons invented."],
              ["Fee structures & schedules", "Never published on the reference site. Not invented — pages direct visitors to the admissions office."],
            ].map(([item, note]) => (
              <div key={item} className="border border-gold-500 bg-gold-50 rounded-xl px-4 sm:px-5 py-4 min-w-0">
                <p className="font-bold text-navy-900 font-mono text-sm break-words">{item}</p>
                <p className="mt-1 text-sm text-ink/85 leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="min-w-0">
          <SectionHeading eyebrow="Phase 2" title="Critical UI/UX audit" text="Fourteen findings — each fixed in this rebuild, not praised away." />
          <div className="mt-6 overflow-x-auto max-w-full rounded-xl border border-line">
            <table className="table-msitm min-w-[720px]">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Finding</th>
                  <th scope="col">Resolution</th>
                </tr>
              </thead>
              <tbody>
                {UX_FINDINGS.map(([finding, fix], i) => (
                  <tr key={finding}>
                    <td>{i + 1}</td>
                    <td className="font-semibold text-navy-900">{finding}</td>
                    <td>{fix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="min-w-0">
          <SectionHeading eyebrow="Phase 5" title="Asset mapping" />
          <div className="mt-6 overflow-x-auto max-w-full rounded-xl border border-line">
            <table className="table-msitm min-w-[720px]">
              <thead>
                <tr>
                  <th scope="col">Original asset</th>
                  <th scope="col">New location</th>
                  <th scope="col">Treatment</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["logo_with_affiliation.png", "Header, all pages", "Downloaded & served locally (/brand/)"],
                  ["Campus collage (6 photos)", "Home hero, About, Campus", "Genuine remote images, credited"],
                  ["Founder portrait (babaji.jpg)", "Home, Leadership", "Genuine remote image"],
                  ["52 placed-student portraits", "/placement, /student-corner, home", "All migrated with names & employers"],
                  ["18 testimonial portraits", "/success-stories, /alumni, home", "Migrated; 1 monogram fallback (no photo published)"],
                  ["19 recruiter logos", "Home marquee, /placement", "Migrated as published"],
                  ["Rankings/event photos", "Rankings, News & Events", "Migrated"],
                  ["AI-generated imagery", "—", "None used. Zero fake students, buildings or faculty."],
                ].map(([asset, location, treatment]) => (
                  <tr key={asset}>
                    <td className="font-semibold text-navy-900">{asset}</td>
                    <td>{location}</td>
                    <td>{treatment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-muted">
            WhatsApp: the original site displays +91-9565661505 as its WhatsApp contact, so this rebuild links it
            explicitly as “as published”. No other messaging integrations were claimed. See the{" "}
            <Link href="/design-system" className="link-underline font-semibold">
              design system
            </Link>{" "}
            for the visual specification.
          </p>
        </section>

        <section className="min-w-0">
          <SectionHeading eyebrow="Phase 8" title="Visual QA report" />
          <div className="mt-6 overflow-x-auto max-w-full rounded-xl border border-line">
            <table className="table-msitm min-w-[640px]">
              <thead>
                <tr>
                  <th scope="col">Check</th>
                  <th scope="col">Result</th>
                </tr>
              </thead>
              <tbody>
                {QA_CHECKS.map(([check, result]) => (
                  <tr key={check}>
                    <td className="font-semibold text-navy-900">{check}</td>
                    <td>{result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
