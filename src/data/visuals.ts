import type { IconName } from "@/components/icons";
import { SITE_IMAGES } from "@/data/site";

export interface VisualMeta {
  image: string;
  imageAlt: string;
  icon: IconName;
  badge: string;
  subtitle: string;
  objectPosition?: "center" | "top";
}

export const COURSE_LEVEL_VISUALS: Record<string, VisualMeta> = {
  "undergraduate-courses": {
    image: SITE_IMAGES.coursesUndergrad,
    imageAlt: "Undergraduate BBA and BCA students collaborating in a modern MSITM seminar hall",
    icon: "GraduationCap",
    badge: "Undergraduate Degrees",
    subtitle: "3-Year Full-Time · BBA & BCA",
  },
  "postgraduate-courses": {
    image: SITE_IMAGES.coursesPostgrad,
    imageAlt: "Postgraduate MBA and MCA students discussing business and software systems",
    icon: "Briefcase",
    badge: "Postgraduate Degrees",
    subtitle: "MBA & MCA · Executive Learning",
  },
  "diploma-courses": {
    image: SITE_IMAGES.coursesDiploma,
    imageAlt: "Students training in the NIELIT and IT diploma workstation laboratory",
    icon: "Cpu",
    badge: "Accredited Diplomas",
    subtitle: "NIELIT · NCPUL · MSITM",
  },
  "certificate-courses": {
    image: SITE_IMAGES.coursesCertificate,
    imageAlt: "Students in hands-on certificate workshop training on hardware and software tools",
    icon: "Award",
    badge: "Career Certificates",
    subtitle: "Focused 6–10 Week Skills",
  },
};

export const COURSE_VISUALS: Record<string, VisualMeta> = {
  bca: {
    image: SITE_IMAGES.computerLab,
    imageAlt: "BCA students coding and building applications in the MSITM computer laboratory",
    icon: "Code2",
    badge: "BCA · Computing",
    subtitle: "Programming, Databases & Web",
  },
  bba: {
    image: SITE_IMAGES.coursesUndergrad,
    imageAlt: "BBA students collaborating on management case studies",
    icon: "Briefcase",
    badge: "BBA · Management",
    subtitle: "Business, Finance & Leadership",
  },
  mba: {
    image: SITE_IMAGES.coursesPostgrad,
    imageAlt: "MBA executive management seminar and market analysis session",
    icon: "TrendingUp",
    badge: "MBA · Executive",
    subtitle: "Strategy, HR, Finance & Marketing",
  },
  mca: {
    image: SITE_IMAGES.computerLab,
    imageAlt: "MCA software engineering and systems development laboratory",
    icon: "Terminal",
    badge: "MCA · Software",
    subtitle: "Advanced Computing & Systems",
  },
  "o-level": {
    image: SITE_IMAGES.coursesDiploma,
    imageAlt: "NIELIT O-Level practical laboratory training",
    icon: "Monitor",
    badge: "NIELIT 'O' Level",
    subtitle: "IT Tools, Web Design & C",
  },
  "a-level": {
    image: SITE_IMAGES.computerLab,
    imageAlt: "NIELIT A-Level software engineering and architecture lab",
    icon: "Layers",
    badge: "NIELIT 'A' Level",
    subtitle: "Advanced Computer Applications",
  },
  "caba-mdtp": {
    image: SITE_IMAGES.lectureHallAuthentic,
    imageAlt: "CABA-MDTP students learning accounting and multilingual DTP at MSITM",
    icon: "Calculator",
    badge: "NCPUL · CABA-MDTP",
    subtitle: "Accounting & Multilingual DTP",
  },
  "chm-o-level": {
    image: SITE_IMAGES.coursesCertificate,
    imageAlt: "CHM-O hardware maintenance and diagnostic lab",
    icon: "HardDrive",
    badge: "NIELIT CHM-O",
    subtitle: "Hardware Maintenance & Security",
  },
  dsa: {
    image: SITE_IMAGES.classroomLecture,
    imageAlt: "Diploma in Software Applications lecture and lab batch",
    icon: "Laptop",
    badge: "MSITM · DSA",
    subtitle: "Office Suite, Tally, Web & DTP",
  },
  ccc: {
    image: SITE_IMAGES.studentsStudy,
    imageAlt: "Students preparing for NIELIT Course on Computer Concepts",
    icon: "CheckCircle2",
    badge: "NIELIT CCC",
    subtitle: "Essential Digital Literacy",
  },
  "english-academy": {
    image: SITE_IMAGES.alumniSuccess,
    imageAlt: "Students practising communication skills at English Academy MSITM",
    icon: "Languages",
    badge: "English Academy",
    subtitle: "Communication & Soft Skills",
  },
  "tally-master": {
    image: SITE_IMAGES.coursesPostgrad,
    imageAlt: "Computerised accounting and financial training session",
    icon: "Calculator",
    badge: "Tally Master",
    subtitle: "Computerised Accounting & GST",
  },
  wdt: {
    image: SITE_IMAGES.coursesDiploma,
    imageAlt: "Website development training workstations at MSITM",
    icon: "Globe",
    badge: "Web Development",
    subtitle: "10-Week Practical WDT",
  },
  dtp: {
    image: SITE_IMAGES.libraryHero,
    imageAlt: "Desktop and media publishing design studio training",
    icon: "PenTool",
    badge: "Desktop Publishing",
    subtitle: "Print & Media Design",
  },
  ccn: {
    image: SITE_IMAGES.coursesCertificate,
    imageAlt: "Computer networks cabling and router configuration workshop",
    icon: "Network",
    badge: "Computer Networks",
    subtitle: "6-Week Networking Fundamentals",
  },
  cpt: {
    image: SITE_IMAGES.studentsStudy,
    imageAlt: "Computer typing and office productivity session",
    icon: "Keyboard",
    badge: "Computer Typing",
    subtitle: "Speed & Accuracy Training",
  },
  "course-on-net": {
    image: SITE_IMAGES.computerLab,
    imageAlt: "Application development lab on the .NET platform",
    icon: "Layers",
    badge: "Microsoft .NET",
    subtitle: "6-Week Application Track",
  },
  "course-on-oracle": {
    image: SITE_IMAGES.coursesPostgrad,
    imageAlt: "Oracle database and SQL modelling seminar",
    icon: "Database",
    badge: "Oracle & SQL",
    subtitle: "Database Design & Querying",
  },
  "course-on-c": {
    image: SITE_IMAGES.coursesDiploma,
    imageAlt: "C++ programming and data structures practical lab",
    icon: "Terminal",
    badge: "C++ Programming",
    subtitle: "Core & OOP Foundations",
  },
  "course-on-java": {
    image: SITE_IMAGES.computerLab,
    imageAlt: "Java object-oriented programming workstation session",
    icon: "Code2",
    badge: "Java Programming",
    subtitle: "Object-Oriented Development",
  },
  "laptop-mobile-reparing": {
    image: SITE_IMAGES.coursesCertificate,
    imageAlt: "Students diagnosing laptop motherboards and mobile hardware",
    icon: "Wrench",
    badge: "Hardware Repair",
    subtitle: "10-Week Diagnostic Bench",
  },
};

export const FACILITY_VISUALS: Record<string, VisualMeta & { secondaryImage: string; secondaryAlt: string }> = {
  campus: {
    image: SITE_IMAGES.heroCampus,
    imageAlt: "Meena Shah Institute of Technology and Management campus building and green lawns",
    secondaryImage: SITE_IMAGES.campusCourtyard,
    secondaryAlt: "Students in the MSITM campus courtyard",
    icon: "Building2",
    badge: "Green Campus",
    subtitle: "Circular Road, Gonda · Since 1998",
  },
  library: {
    image: SITE_IMAGES.libraryHero,
    imageAlt: "MSITM academic library reading room and bookshelves",
    secondaryImage: SITE_IMAGES.libraryAuthentic,
    secondaryAlt: "Students studying together inside the MSITM library",
    icon: "BookOpen",
    badge: "Academic Library",
    subtitle: "Books, Journals & E-Resources",
  },
  "computer-lab": {
    image: SITE_IMAGES.computerLab,
    imageAlt: "MSITM computer and IoT laboratory with student workstations",
    secondaryImage: SITE_IMAGES.coursesDiploma,
    secondaryAlt: "Advanced IT and DTP workstations at MSITM",
    icon: "Monitor",
    badge: "250+ Workstations",
    subtitle: "High-Speed Lab & IoT Wing",
  },
  "lecture-hall": {
    image: SITE_IMAGES.lectureHallAuthentic,
    imageAlt: "Faculty addressing students inside an MSITM lecture hall",
    secondaryImage: SITE_IMAGES.classroomLecture,
    secondaryAlt: "Students attending a lecture session at MSITM",
    icon: "Presentation",
    badge: "Lecture Halls",
    subtitle: "Smart Projectors & Wi-Fi",
    objectPosition: "top",
  },
};

export const FACULTY_VISUALS: Record<string, VisualMeta> = {
  "it-faculty": {
    image: SITE_IMAGES.computerLab,
    imageAlt: "IT faculty mentoring students in the computer science laboratory",
    icon: "Code2",
    badge: "IT & Computing",
    subtitle: "Programming, AI, IoT & Web",
  },
  "management-faculty": {
    image: SITE_IMAGES.coursesPostgrad,
    imageAlt: "Management faculty leading finance and business studies",
    icon: "Briefcase",
    badge: "Management Studies",
    subtitle: "Finance, Marketing, HR & Law",
  },
  "diploma-department": {
    image: SITE_IMAGES.coursesDiploma,
    imageAlt: "Diploma faculty instructing practical IT and DTP batches",
    icon: "Award",
    badge: "Diploma Wing",
    subtitle: "NIELIT, CABA-MDTP & DSA",
  },
  "hardware-department": {
    image: SITE_IMAGES.coursesCertificate,
    imageAlt: "Hardware engineers maintaining systems and networking labs",
    icon: "HardDrive",
    badge: "Hardware & Systems",
    subtitle: "250+ PCs & Exam Infrastructure",
  },
  "registration-department": {
    image: SITE_IMAGES.admissionsCounselling,
    imageAlt: "Registration and student records office team",
    icon: "ClipboardCheck",
    badge: "Student Records",
    subtitle: "Admissions & Documentation",
  },
  "online-guest-faculty": {
    image: SITE_IMAGES.alumniSuccess,
    imageAlt: "Visiting guest mentors from industry and academia",
    icon: "Video",
    badge: "Guest Mentors",
    subtitle: "Industry & Academic Experts",
  },
};

export const NEWS_VISUALS: Record<string, VisualMeta> = {
  "admissions-open-for-the-2025-2026-academic-session": {
    image: SITE_IMAGES.admissionsCounselling,
    imageAlt: "Admissions counselling desk welcoming new students for 2026–27",
    icon: "GraduationCap",
    badge: "Admissions 2026–27",
    subtitle: "UG, PG, Diploma & Certificates",
  },
  "celebrate-independence-day-with-creativity-and-fun-at-meena-shah-pre-school": {
    image: SITE_IMAGES.campusCourtyard,
    imageAlt: "Students celebrating creative activities on campus",
    icon: "Palette",
    badge: "Bachpan Pre-School",
    subtitle: "Independence Day Competitions",
    objectPosition: "top",
  },
  "msitm-degree-college-mega-district-level-competition": {
    image: SITE_IMAGES.rankings,
    imageAlt: "Award and recognition ceremony for student achievers",
    icon: "Trophy",
    badge: "District Competition",
    subtitle: "Quiz, Essay & Painting",
    objectPosition: "top",
  },
};

export const IQAC_VISUALS: Record<string, VisualMeta> = {
  "about-iqac": {
    image: SITE_IMAGES.coursesPostgrad,
    imageAlt: "Academic leadership meeting reviewing institutional quality benchmarks",
    icon: "ShieldCheck",
    badge: "IQAC · NAAC",
    subtitle: "Institutional Quality Mandate",
  },
  "composition-of-iqac": {
    image: SITE_IMAGES.lectureHallAuthentic,
    imageAlt: "Faculty and academic council gathering at MSITM",
    icon: "Users",
    badge: "IQAC Committee",
    subtitle: "Faculty, Alumni & Stakeholders",
  },
  "naac-steering-committee": {
    image: SITE_IMAGES.coursesUndergrad,
    imageAlt: "NAAC Steering Committee accreditation planning session",
    icon: "Award",
    badge: "NAAC Steering",
    subtitle: "Accreditation Coordination",
  },
  "meeting-and-minutes": {
    image: SITE_IMAGES.coursesPostgrad,
    imageAlt: "IQAC periodic review meetings and minutes archive",
    icon: "CalendarDays",
    badge: "Meetings & Minutes",
    subtitle: "Academic Quality Resolutions",
  },
  "iqac-activity": {
    image: SITE_IMAGES.eventsCultural,
    imageAlt: "Faculty development and quality enhancement programmes at MSITM",
    icon: "Lightbulb",
    badge: "Quality Initiatives",
    subtitle: "Audits, Feedback & FDPs",
  },
  "iqac-reports": {
    image: SITE_IMAGES.libraryHero,
    imageAlt: "Annual quality assurance archives and documentation",
    icon: "FileText",
    badge: "AQAR Reports",
    subtitle: "Annual Quality Performance",
  },
  "rti-statutory-declaration": {
    image: SITE_IMAGES.heroCampus,
    imageAlt: "MSITM campus administration and statutory governance",
    icon: "Scale",
    badge: "Statutory RTI",
    subtitle: "Public Transparency",
  },
  mous: {
    image: SITE_IMAGES.placementCareers,
    imageAlt: "Academic and industry partnership discussions",
    icon: "Handshake",
    badge: "Institutional MoUs",
    subtitle: "Industry & Training Partners",
  },
  "academic-administrative-audit-aaa-reports": {
    image: SITE_IMAGES.libraryAuthentic,
    imageAlt: "Departmental academic review and verification records",
    icon: "ClipboardCheck",
    badge: "AAA Reports",
    subtitle: "Departmental Quality Audits",
  },
  "perspective-plans": {
    image: SITE_IMAGES.heroCampus,
    imageAlt: "Long-term campus growth and academic vision at MSITM",
    icon: "Compass",
    badge: "Perspective Plans",
    subtitle: "Strategic Institutional Roadmap",
  },
};

