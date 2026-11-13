import type { IconName } from "@/components/icons";
import { SITE_IMAGES } from "@/data/site";

export interface VisualMeta {
  image?: string;
  imageAlt?: string;
  icon: IconName;
  badge: string;
  subtitle: string;
  objectPosition?: "center" | "top";
}

export const COURSE_LEVEL_VISUALS: Record<string, VisualMeta> = {
  "undergraduate-courses": {
    icon: "GraduationCap",
    badge: "Undergraduate Degrees",
    subtitle: "3-Year Full-Time · BBA & BCA",
  },
  "postgraduate-courses": {
    icon: "Briefcase",
    badge: "Postgraduate Degrees",
    subtitle: "MBA & MCA · Executive Learning",
  },
  "diploma-courses": {
    icon: "Cpu",
    badge: "Accredited Diplomas",
    subtitle: "NIELIT · NCPUL · MSITM",
  },
  "certificate-courses": {
    icon: "Award",
    badge: "Career Certificates",
    subtitle: "Focused 6–10 Week Skills",
  },
};

export const COURSE_VISUALS: Record<string, VisualMeta> = {
  bca: {
    icon: "Code2",
    badge: "BCA · Computing",
    subtitle: "Programming, Databases & Web",
  },
  bba: {
    icon: "Briefcase",
    badge: "BBA · Management",
    subtitle: "Business, Finance & Leadership",
  },
  mba: {
    icon: "TrendingUp",
    badge: "MBA · Executive",
    subtitle: "Strategy, HR, Finance & Marketing",
  },
  mca: {
    icon: "Terminal",
    badge: "MCA · Software",
    subtitle: "Advanced Computing & Systems",
  },
  "o-level": {
    icon: "Monitor",
    badge: "NIELIT 'O' Level",
    subtitle: "IT Tools, Web Design & C",
  },
  "a-level": {
    icon: "Layers",
    badge: "NIELIT 'A' Level",
    subtitle: "Advanced Computer Applications",
  },
  "caba-mdtp": {
    icon: "Calculator",
    badge: "NCPUL · CABA-MDTP",
    subtitle: "Accounting & Multilingual DTP",
  },
  "chm-o-level": {
    icon: "HardDrive",
    badge: "NIELIT CHM-O",
    subtitle: "Hardware Maintenance & Security",
  },
  dsa: {
    icon: "Laptop",
    badge: "MSITM · DSA",
    subtitle: "Office Suite, Tally, Web & DTP",
  },
  ccc: {
    icon: "CheckCircle2",
    badge: "NIELIT CCC",
    subtitle: "Essential Digital Literacy",
  },
  "english-academy": {
    icon: "Languages",
    badge: "English Academy",
    subtitle: "Communication & Soft Skills",
  },
  "tally-master": {
    icon: "Calculator",
    badge: "Tally Master",
    subtitle: "Computerised Accounting & GST",
  },
  wdt: {
    icon: "Globe",
    badge: "Web Development",
    subtitle: "10-Week Practical WDT",
  },
  dtp: {
    icon: "PenTool",
    badge: "Desktop Publishing",
    subtitle: "Print & Media Design",
  },
  ccn: {
    icon: "Network",
    badge: "Computer Networks",
    subtitle: "6-Week Networking Fundamentals",
  },
  cpt: {
    icon: "Keyboard",
    badge: "Computer Typing",
    subtitle: "Speed & Accuracy Training",
  },
  "course-on-net": {
    icon: "Layers",
    badge: "Microsoft .NET",
    subtitle: "6-Week Application Track",
  },
  "course-on-oracle": {
    icon: "Database",
    badge: "Oracle & SQL",
    subtitle: "Database Design & Querying",
  },
  "course-on-c": {
    icon: "Terminal",
    badge: "C++ Programming",
    subtitle: "Core & OOP Foundations",
  },
  "course-on-java": {
    icon: "Code2",
    badge: "Java Programming",
    subtitle: "Object-Oriented Development",
  },
  "laptop-mobile-reparing": {
    icon: "Wrench",
    badge: "Hardware Repair",
    subtitle: "10-Week Diagnostic Bench",
  },
};

export const FACILITY_VISUALS: Record<string, VisualMeta> = {
  campus: {
    image: SITE_IMAGES.campusCourtyard,
    imageAlt: "Students in the Meena Shah Institute of Technology and Management campus courtyard",
    icon: "Building2",
    badge: "Green Campus",
    subtitle: "Circular Road, Gonda · Since 1998",
    objectPosition: "center",
  },
  library: {
    image: SITE_IMAGES.libraryAuthentic,
    imageAlt: "Students studying together inside the MSITM library reading room",
    icon: "BookOpen",
    badge: "Academic Library",
    subtitle: "Books, Journals & E-Resources",
    objectPosition: "center",
  },
  "computer-lab": {
    icon: "Monitor",
    badge: "250+ Workstations",
    subtitle: "High-Speed Lab & IoT Wing",
  },
  "lecture-hall": {
    image: SITE_IMAGES.lectureHallAuthentic,
    imageAlt: "Faculty addressing students inside an MSITM lecture hall",
    icon: "Presentation",
    badge: "Lecture Halls",
    subtitle: "Smart Projectors & Wi-Fi",
    objectPosition: "top",
  },
};

export const FACULTY_VISUALS: Record<string, VisualMeta> = {
  "it-faculty": {
    icon: "Code2",
    badge: "IT & Computing",
    subtitle: "Programming, AI, IoT & Web",
  },
  "management-faculty": {
    icon: "Briefcase",
    badge: "Management Studies",
    subtitle: "Finance, Marketing, HR & Law",
  },
  "diploma-department": {
    icon: "Award",
    badge: "Diploma Wing",
    subtitle: "NIELIT, CABA-MDTP & DSA",
  },
  "hardware-department": {
    icon: "HardDrive",
    badge: "Hardware & Systems",
    subtitle: "250+ PCs & Exam Infrastructure",
  },
  "registration-department": {
    icon: "ClipboardCheck",
    badge: "Student Records",
    subtitle: "Admissions & Documentation",
  },
  "online-guest-faculty": {
    icon: "Video",
    badge: "Guest Mentors",
    subtitle: "Industry & Academic Experts",
  },
};

export const NEWS_VISUALS: Record<string, VisualMeta> = {
  "admissions-open-for-the-2025-2026-academic-session": {
    icon: "GraduationCap",
    badge: "Admissions 2026–27",
    subtitle: "UG, PG, Diploma & Certificates",
  },
  "celebrate-independence-day-with-creativity-and-fun-at-meena-shah-pre-school": {
    icon: "Palette",
    badge: "Bachpan Pre-School",
    subtitle: "Independence Day Competitions",
  },
  "msitm-degree-college-mega-district-level-competition": {
    icon: "Trophy",
    badge: "District Competition",
    subtitle: "Quiz, Essay & Painting",
  },
};

export const IQAC_VISUALS: Record<string, VisualMeta> = {
  "about-iqac": {
    icon: "ShieldCheck",
    badge: "IQAC · NAAC",
    subtitle: "Institutional Quality Mandate",
  },
  "composition-of-iqac": {
    icon: "Users",
    badge: "IQAC Committee",
    subtitle: "Faculty, Alumni & Stakeholders",
  },
  "naac-steering-committee": {
    icon: "Award",
    badge: "NAAC Steering",
    subtitle: "Accreditation Coordination",
  },
  "meeting-and-minutes": {
    icon: "CalendarDays",
    badge: "Meetings & Minutes",
    subtitle: "Academic Quality Resolutions",
  },
  "iqac-activity": {
    icon: "Lightbulb",
    badge: "Quality Initiatives",
    subtitle: "Audits, Feedback & FDPs",
  },
  "iqac-reports": {
    icon: "FileText",
    badge: "AQAR Reports",
    subtitle: "Annual Quality Performance",
  },
  "rti-statutory-declaration": {
    icon: "Scale",
    badge: "Statutory RTI",
    subtitle: "Public Transparency",
  },
  mous: {
    icon: "Handshake",
    badge: "Institutional MoUs",
    subtitle: "Industry & Training Partners",
  },
  "academic-administrative-audit-aaa-reports": {
    icon: "ClipboardCheck",
    badge: "AAA Reports",
    subtitle: "Departmental Quality Audits",
  },
  "perspective-plans": {
    icon: "Compass",
    badge: "Perspective Plans",
    subtitle: "Strategic Institutional Roadmap",
  },
};
