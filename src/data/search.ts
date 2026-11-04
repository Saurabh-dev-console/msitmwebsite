/** Static site search index built from the migrated content. */
import { COURSES, LEVELS } from "./courses";
import { FACULTY_GROUPS } from "./faculty";
import { NEWS_POSTS } from "./news";
import { PLACED_STUDENTS, TESTIMONIALS } from "./site";

export interface SearchEntry {
  title: string;
  href: string;
  section: string;
  text: string;
}

function buildIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [
    { title: "Home", href: "/", section: "General", text: "MSITM Meena Shah Institute of Technology and Management Gonda admissions" },
    { title: "About Us", href: "/about", section: "About", text: "who we are history 1998 Hazrat Mehboob Meena Shah values respect humanity honesty dedication" },
    { title: "Why Choose MSITM", href: "/about/why-choose-msitm", section: "About", text: "legacy ISO 9001 academic excellence gold medalists toppers facilities placements 50000 students" },
    { title: "Mission & Vision", href: "/about/mission-vision", section: "About", text: "vision mission MSITMians future-ready education" },
    { title: "Our Campus", href: "/about/our-campus", section: "About", text: "evergreen campus Gonda safest campus affiliations" },
    { title: "President & Leadership", href: "/about/president-leadership", section: "About", text: "founder president manager dean principal Salman Jafri Hasan Saeed Ajay Tandon Prakash Pandey messages" },
    { title: "Rankings & Accolades", href: "/about/rankings-accolades", section: "About", text: "rankings accreditations ISO NIELIT NCPUL affiliations gold medalists" },
    { title: "University Profile", href: "/about/university-profile", section: "About", text: "programmes streams management IT diploma" },
    { title: "Equity and Inclusion", href: "/about/equity-and-inclusion", section: "About", text: "equity inclusion rural students access diversity" },
    { title: "All Courses", href: "/courses", section: "Courses", text: "courses programmes BBA BCA MBA MCA diploma certificate NIELIT" },
    { title: "Admission Process", href: "/admission-process", section: "Admissions", text: "how to apply admission steps eligibility enrolment" },
    { title: "Admission Calendar", href: "/admission-calender", section: "Admissions", text: "calendar session 2026-27 dates schedule" },
    { title: "Admission Form", href: "/admission-form", section: "Admissions", text: "apply online application form 2026-27" },
    { title: "All Faculty", href: "/faculty", section: "Faculty", text: "faculty teachers professors departments" },
    { title: "All Facilities", href: "/facilities", section: "Facilities", text: "facilities infrastructure campus library labs" },
    { title: "Campus", href: "/facilities/campus", section: "Facilities", text: "campus welcome MSITM 1998 self-financing" },
    { title: "Library", href: "/facilities/library", section: "Facilities", text: "library books e-resources study zones internet" },
    { title: "Computer Lab", href: "/facilities/computer-lab", section: "Facilities", text: "computer lab 250 systems internet IoT" },
    { title: "Lecture Hall", href: "/facilities/lecture-hall", section: "Facilities", text: "lecture hall projector wifi classrooms" },
    { title: "Placements", href: "/placement", section: "Placements", text: "placement recruiters TCS Wipro Infosys jobs careers placed students" },
    { title: "About Placement Cell", href: "/placement/about-placement-cell", section: "Placements", text: "placement cell TPO training cell CV interview" },
    { title: "Training & Placement", href: "/placement/traning-placement", section: "Placements", text: "training placement programme campus recruitment" },
    { title: "Training & Placement Overview", href: "/training-placement", section: "Placements", text: "training placement overview" },
    { title: "Success Stories", href: "/success-stories", section: "Placements", text: "success stories testimonials alumni reviews" },
    { title: "Alumni", href: "/alumni", section: "Placements", text: "alumni network graduates volunteer" },
    { title: "News & Events", href: "/college-news-events", section: "News", text: "news events announcements" },
    { title: "College News", href: "/college-news-events/college-news", section: "News", text: "college news admissions competition independence day" },
    { title: "Extra-Curricular Activities", href: "/college-news-events/extra-curricular-activities", section: "News", text: "extra-curricular competitions seminars workshops farewell" },
    { title: "Farewell 2017", href: "/college-news-events/farewell-2017", section: "News", text: "farewell 2017 BBA BCA party cultural" },
    { title: "Student Corner", href: "/student-corner", section: "News", text: "student corner personality development workshops feedback survey" },
    { title: "IQAC", href: "/iqac", section: "IQAC", text: "IQAC quality NAAC accreditation" },
    { title: "About IQAC", href: "/iqac/about-iqac", section: "IQAC", text: "internal quality assurance cell NAAC UGC functions mission" },
    { title: "Composition of IQAC", href: "/iqac/composition-of-iqac", section: "IQAC", text: "composition members" },
    { title: "NAAC Steering Committee", href: "/iqac/naac-steering-committee", section: "IQAC", text: "NAAC steering committee accreditation" },
    { title: "Meetings and Minutes", href: "/iqac/meeting-and-minutes", section: "IQAC", text: "meetings minutes" },
    { title: "IQAC Activities", href: "/iqac/iqac-activity", section: "IQAC", text: "activities audits feedback" },
    { title: "IQAC Reports", href: "/iqac/iqac-reports", section: "IQAC", text: "reports AQAR annual quality" },
    { title: "AAA Reports", href: "/iqac/academic-administrative-audit-aaa-reports", section: "IQAC", text: "academic administrative audit AAA" },
    { title: "Perspective Plans", href: "/iqac/perspective-plans", section: "IQAC", text: "perspective plans goals" },
    { title: "RTI Statutory Declaration", href: "/iqac/rti-statutory-declaration", section: "IQAC", text: "RTI right to information statutory declaration" },
    { title: "MoUs", href: "/iqac/mous", section: "IQAC", text: "MoU memoranda understanding partnerships" },
    { title: "Contact", href: "/contact", section: "General", text: "contact address phone email whatsapp enquiry Gonda" },
    { title: "Privacy Policy", href: "/privacy-policy", section: "General", text: "privacy policy data" },
    { title: "MSITM Certificate Desk", href: "/msitm-independence-day-certificate", section: "Certificates", text: "certificate download verify mega district level competition independence day" },
    { title: "Bachpan Certificate Desk", href: "/bachpan-independence-day-certificate", section: "Certificates", text: "certificate download verify pre school bachpan independence day" },
    { title: "Audit Report", href: "/audit", section: "General", text: "audit forensic rebuild report inventory" },
  ];

  for (const [slug, level] of Object.entries(LEVELS)) {
    entries.push({
      title: level.title,
      href: `/courses/${slug}`,
      section: "Courses",
      text: `${level.title} ${level.eyebrow} programmes`,
    });
  }
  for (const c of COURSES) {
    entries.push({
      title: `${c.title} — ${c.fullName}`,
      href: `/courses/${c.level}/${c.slug}`,
      section: `Courses · ${c.levelLabel}`,
      text: `${c.title} ${c.fullName} ${c.duration ?? ""} ${c.eligibility ?? ""} ${c.intro.join(" ").slice(0, 400)}`,
    });
  }
  for (const g of FACULTY_GROUPS) {
    entries.push({
      title: g.title,
      href: `/faculty/${g.slug}`,
      section: "Faculty",
      text: `${g.heading} ${g.members.map((m) => `${m.name} ${m.qualification} ${m.specialization}`).join(" ")}`,
    });
  }
  for (const post of NEWS_POSTS) {
    entries.push({ title: post.title, href: `/${post.slug}`, section: "News", text: post.excerpt });
  }
  for (const s of PLACED_STUDENTS) {
    entries.push({ title: `${s.name} — ${s.company}`, href: "/placement", section: "Placed Students", text: `${s.name} placed ${s.company}` });
  }
  for (const t of TESTIMONIALS) {
    entries.push({ title: `${t.name} testimonial`, href: "/success-stories", section: "Testimonials", text: `${t.name} ${t.role} ${t.text.slice(0, 300)}` });
  }
  return entries;
}

export const SEARCH_INDEX: SearchEntry[] = buildIndex();

export function searchSite(query: string, limit = 40): SearchEntry[] {
  const terms = query.toLowerCase().split(/\s+/).filter((t) => t.length > 1);
  if (terms.length === 0) return [];
  const scored = SEARCH_INDEX.map((entry) => {
    const hay = `${entry.title} ${entry.section} ${entry.text}`.toLowerCase();
    let score = 0;
    for (const term of terms) {
      if (entry.title.toLowerCase().includes(term)) score += 5;
      else if (hay.includes(term)) score += 1;
      else return { entry, score: -1 };
    }
    return { entry, score };
  }).filter((s) => s.score >= 0);
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.entry);
}
