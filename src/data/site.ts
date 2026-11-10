/** Site-wide constants migrated from the reference website (msitm.edu.in). */

export const CONTACT = {
  name: "Meena Shah Institute of Technology and Management",
  short: "MSITM",
  college: "MSITM Degree College",
  address: "Meena Nagar, Circular Road, Gonda 271002, Uttar Pradesh, India",
  phonePrimary: "+91-9565661505",
  phonePrimaryHref: "tel:+919565661505",
  phoneAlt: "+91-8707744749",
  phoneAltHref: "tel:+918707744749",
  helpline: "+91-9918942937",
  helplineHref: "tel:+919918942937",
  email: "info@msitm.edu.in",
  emailHref: "mailto:info@msitm.edu.in",
  /** Displayed on the original contact page as the institute's WhatsApp contact. */
  whatsapp: "https://wa.me/919565661505",
  established: 1998,
};

export const AFFILIATIONS = [
  "Dr. Ram Manohar Lohia Avadh University, Ayodhya",
  "Maa Pateshwari University, Balrampur",
  "Integral University (online programmes)",
  "NIELIT",
  "NCPUL",
  "ISO 9001:2015 Certified",
];

export interface NavChild {
  label: string;
  href: string;
  note?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children: NavChild[];
}

export const NAVIGATION: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Us", href: "/about", note: "Who we are since 1998" },
      { label: "Why Choose MSITM", href: "/about/why-choose-msitm", note: "Legacy, faculty & outcomes" },
      { label: "Mission & Vision", href: "/about/mission-vision" },
      { label: "Our Campus", href: "/about/our-campus" },
      { label: "President & Leadership", href: "/about/president-leadership", note: "Messages from our leaders" },
      { label: "Rankings & Accolades", href: "/about/rankings-accolades" },
      { label: "University Profile", href: "/about/university-profile" },
      { label: "Equity and Inclusion", href: "/about/equity-and-inclusion" },
    ],
  },
  {
    label: "Courses",
    href: "/courses",
    children: [
      { label: "All Courses", href: "/courses" },
      { label: "Undergraduate — BCA, BBA", href: "/courses/undergraduate-courses" },
      { label: "Postgraduate — MBA, MCA", href: "/courses/postgraduate-courses" },
      { label: "Diploma — NIELIT & more", href: "/courses/diploma-courses" },
      { label: "Certificate Courses", href: "/courses/certificate-courses" },
    ],
  },
  {
    label: "Admissions",
    href: "/admission-process",
    children: [
      { label: "Admission Process", href: "/admission-process" },
      { label: "Admission Calendar", href: "/admission-calender" },
      { label: "Admission Form", href: "/admission-form", note: "Apply for 2026–27" },
      { label: "Contact Admissions", href: "/contact" },
    ],
  },
  {
    label: "Faculty",
    href: "/faculty",
    children: [
      { label: "All Faculty", href: "/faculty" },
      { label: "IT Faculty", href: "/faculty/it-faculty" },
      { label: "Management Faculty", href: "/faculty/management-faculty" },
      { label: "Diploma Department", href: "/faculty/diploma-department" },
      { label: "Hardware Department", href: "/faculty/hardware-department" },
      { label: "Registration Department", href: "/faculty/registration-department" },
      { label: "Online Guest Faculty", href: "/faculty/online-guest-faculty" },
    ],
  },
  {
    label: "Facilities",
    href: "/facilities",
    children: [
      { label: "All Facilities", href: "/facilities" },
      { label: "Campus", href: "/facilities/campus" },
      { label: "Library", href: "/facilities/library" },
      { label: "Computer Lab", href: "/facilities/computer-lab" },
      { label: "Lecture Hall", href: "/facilities/lecture-hall" },
    ],
  },
  {
    label: "Placements",
    href: "/placement",
    children: [
      { label: "Placements Overview", href: "/placement" },
      { label: "About Placement Cell", href: "/placement/about-placement-cell" },
      { label: "Training & Placement", href: "/placement/traning-placement" },
      { label: "Success Stories", href: "/success-stories" },
      { label: "Alumni", href: "/alumni" },
    ],
  },
  {
    label: "News & Events",
    href: "/college-news-events",
    children: [
      { label: "News & Events", href: "/college-news-events" },
      { label: "College News", href: "/college-news-events/college-news" },
      { label: "Extra-Curricular Activities", href: "/college-news-events/extra-curricular-activities" },
      { label: "Farewell 2017", href: "/college-news-events/farewell-2017" },
      { label: "Student Corner", href: "/student-corner" },
    ],
  },
  {
    label: "IQAC",
    href: "/iqac",
    children: [
      { label: "IQAC Overview", href: "/iqac" },
      { label: "About IQAC", href: "/iqac/about-iqac" },
      { label: "Composition of IQAC", href: "/iqac/composition-of-iqac" },
      { label: "NAAC Steering Committee", href: "/iqac/naac-steering-committee" },
      { label: "Meetings and Minutes", href: "/iqac/meeting-and-minutes" },
      { label: "IQAC Activities", href: "/iqac/iqac-activity" },
      { label: "IQAC Reports", href: "/iqac/iqac-reports" },
      { label: "AAA Reports", href: "/iqac/academic-administrative-audit-aaa-reports" },
      { label: "Perspective Plans", href: "/iqac/perspective-plans" },
      { label: "RTI & Statutory Declaration", href: "/iqac/rti-statutory-declaration" },
      { label: "MoUs", href: "/iqac/mous" },
    ],
  },
];

const U = "https://msitm.edu.in/wp-content/uploads";

export interface Recruiter {
  name: string;
  logo: string;
}

export const RECRUITERS: Recruiter[] = [
  { name: "Tata Consultancy Services", logo: `${U}/2025/02/tcs.png` },
  { name: "Wipro", logo: `${U}/2025/02/wipro.png` },
  { name: "Infosys", logo: `${U}/2025/02/infosys.png` },
  { name: "HCL", logo: `${U}/2025/02/hcl.png` },
  { name: "Accenture", logo: `${U}/2025/02/accenture.png` },
  { name: "Capgemini", logo: `${U}/2025/02/capgemini.png` },
  { name: "Cognizant", logo: `${U}/2025/02/cognizant.png` },
  { name: "Genpact", logo: `${U}/2025/02/genpact.png` },
  { name: "Tech Mahindra", logo: `${U}/2025/02/tech-mahindra.png` },
  { name: "Chetu", logo: `${U}/2025/02/chetu.png` },
  { name: "Bajaj Capital", logo: `${U}/2025/02/bajaj-capital.png` },
  { name: "Canara Bank", logo: `${U}/2025/02/canara-bank.png` },
  { name: "Kotak Mahindra", logo: `${U}/2025/02/katak-mahindra.png` },
  { name: "Hexaware (via placement)", logo: `${U}/2025/02/barrownz.png` },
  { name: "Barrownz Group", logo: `${U}/2025/02/barrownz.png` },
  { name: "Cedcoss", logo: `${U}/2025/02/cedcoss.png` },
  { name: "Satel Systems", logo: `${U}/2025/02/satel.png` },
  { name: "Interior Elements", logo: `${U}/2025/02/enterior-elements.png` },
  { name: "Advent Insight Solutions", logo: `${U}/2025/02/advent.jpg` },
];

export interface PlacedStudent {
  name: string;
  company: string;
  img: string;
}

export const PLACED_STUDENTS: PlacedStudent[] = [
  { name: "Mahesh Yadav", company: "Annapurna Finance", img: `${U}/2026/07/mahesh_yadav.png` },
  { name: "Sakshi Jaiswal", company: "Tata Consultancy Services", img: `${U}/2026/07/Sakshi-Jaiswal.jpeg` },
  { name: "Zubair Khan", company: "Veyora IT Systems", img: `${U}/2025/10/zubair.jpeg` },
  { name: "Arti Mittal", company: "Axis Bank", img: `${U}/2025/10/Arti.jpeg` },
  { name: "Anmol Mittal", company: "SMS Global Securities", img: `${U}/2025/10/anmol.jpeg` },
  { name: "Amir Khan", company: "Wipro", img: `${U}/2025/07/AMIR-copy-1.jpg` },
  { name: "Fakhir Alam", company: "SBI Clerk", img: `${U}/2025/07/Fakir-Alam.jpeg` },
  { name: "Syed Ezhan Rahman", company: "CARAF India", img: `${U}/2025/05/Syed-Ezhan-Rahman.jpg` },
  { name: "Masood Ahmed", company: "Hexaware", img: `${U}/2025/02/masood.jpg` },
  { name: "Aman Mishra", company: "ICICI Home Finance", img: `${U}/2025/02/aman.jpg` },
  { name: "Nazaf Khan", company: "HR Intern", img: `${U}/2025/02/nazaf.jpg` },
  { name: "Riya Verma", company: "Advent Insight Solutions", img: `${U}/2025/02/Riya-verma.jpg` },
  { name: "Pratisthan Singh", company: "MSITM Alumnus", img: `${U}/2025/02/pratisthan.jpg` },
  { name: "Divyanshi Mishra", company: "MSITM Alumna", img: `${U}/2025/02/Divyanshi-Mishra.jpg` },
  { name: "Akanksha Dwivedi", company: "MSITM Alumna", img: `${U}/2025/02/akansha.jpg` },
  { name: "Shivi Srivastava", company: "Interior Elements", img: `${U}/2025/02/Shivi-Srivastava.jpg` },
  { name: "Muskan Kwatra", company: "Canara Bank", img: `${U}/2025/01/MUSKAN-KWATRA.jpg` },
  { name: "Riddhi Pandey", company: "Satel Systems", img: `${U}/2025/01/Riddhi-Pandey.jpg` },
  { name: "Yash Srivastava", company: "Wipro", img: `${U}/2025/01/Yash.jpg` },
  { name: "Gaurav Gupta", company: "TCS", img: `${U}/2025/01/gaurav.jpg` },
  { name: "Rehan", company: "MSITM Alumnus", img: `${U}/2025/01/Rohan.jpg` },
  { name: "Rohit Modanwal", company: "MSITM Alumnus", img: `${U}/2025/01/Rohit-modanwal.jpg` },
  { name: "Amit Sharma", company: "MSITM Alumnus", img: `${U}/2025/01/Amit.jpg` },
  { name: "Anjali Yadav", company: "STP", img: `${U}/2025/01/Anjali.jpg` },
  { name: "Arpita Sharma", company: "HCL", img: `${U}/2025/01/Arpita-img.jpg` },
  { name: "Shivam Modanwal", company: "TCS Ignite", img: `${U}/2025/01/shivam-img.jpg` },
  { name: "Abhishek Modanwal", company: "Capgemini", img: `${U}/2025/01/abhishek-img.jpg` },
  { name: "Murli Lal Chauhan", company: "MSITM Alumnus", img: `${U}/2025/01/murli-lal-img.jpg` },
  { name: "Lalit Prajapati", company: "Cognizant", img: `${U}/2025/01/lalit-img.jpg` },
  { name: "Harvindar Singh", company: "MSITM Alumnus", img: `${U}/2025/01/Harvinder-pic.jpg` },
  { name: "Jauwad Ali", company: "Infosys", img: `${U}/2025/01/jauwad-img.jpg` },
  { name: "Khushnoor", company: "Bajaj Capital", img: `${U}/2025/01/khusnoor-img.jpg` },
  { name: "Mohd. Afzal Firoz", company: "MSITM Alumnus", img: `${U}/2025/01/afzal-img.jpg` },
  { name: "Ranjan Jaiswal", company: "MSITM Alumnus", img: `${U}/2025/01/rajan-img.jpg` },
  { name: "Riya Modanwal", company: "Barrownz Group", img: `${U}/2025/01/riya-img.jpg` },
  { name: "Rohit Kumar Pandey", company: "Chetu", img: `${U}/2025/01/rohit-img.jpg` },
  { name: "Sayed Mohd. Hassan", company: "MSITM Alumnus", img: `${U}/2025/01/syed-img.jpg` },
  { name: "Shivam Jaiswal", company: "MSITM Alumnus", img: `${U}/2025/01/shivam-jaiswal-img.jpg` },
  { name: "Shreya Mishra", company: "iEnergizer", img: `${U}/2025/01/shreya-img.jpg` },
  { name: "Utkarsh Srivastava", company: "Kotak Mahindra", img: `${U}/2025/01/utkarsh-img.jpg` },
  { name: "Alafiya Sajid", company: "MSITM Alumna", img: `${U}/2025/01/alafiya-img.jpg` },
  { name: "Alhamed Khan", company: "MSITM Alumnus", img: `${U}/2025/01/alhamed-img.jpg` },
  { name: "Astha Srivastava", company: "Tech Mahindra", img: `${U}/2025/01/ashtha-img.jpg` },
  { name: "Devansh Srivastava", company: "TCS Ignite", img: `${U}/2025/01/devansh-img.jpg` },
  { name: "Dileep Vishwakarma", company: "Accenture", img: `${U}/2025/01/dileep-img.jpg` },
  { name: "Maham Khan", company: "MSITM Alumna", img: `${U}/2025/01/maham-img.jpg` },
  { name: "Mohd. Azeem", company: "MSITM Alumnus", img: `${U}/2025/01/azeem-img.jpg` },
  { name: "Nayan", company: "MSITM Alumnus", img: `${U}/2025/01/nayan-img.jpg` },
  { name: "Pranjali Kundu", company: "Cedcoss", img: `${U}/2025/01/pranjali-img.jpg` },
  { name: "Shubhankar Mishra", company: "MSITM Alumnus", img: `${U}/2025/01/shubhankar-img.jpg` },
  { name: "Shailja Vishwakarma", company: "MSITM Alumna", img: `${U}/2025/01/shailja-img.jpg` },
  { name: "Abhishek Kasaundhan", company: "Genpact", img: `${U}/2025/01/abhishek-kasaundhan-img.jpg` },
];

export interface Testimonial {
  name: string;
  role: string;
  img?: string;
  text: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Pramod Kushwaha",
    role: "Alumnus, MSITM",
    img: `${U}/2025/02/pramod.jpg`,
    text: "As a proud alumnus of MSITM, I am grateful for the invaluable learning experience this institution has provided. The faculty's dedication, expertise, and mentorship played a crucial role in shaping my academic and professional growth. MSITM's commitment to quality education, without requiring students to relocate to big cities, is truly commendable.",
  },
  {
    name: "Pratishtha Singh",
    role: "HR Manager, US-based company · BBA alumna",
    img: `${U}/2025/02/prsthistha.jpg`,
    text: "My name is Pratishtha Singh, an ex-student of MSITM College, where I completed my BBA. MSITM provided me with valuable knowledge, professional skills, and a holistic learning environment. Beyond academics, I learned punctuality and corporate culture, essential for my career. Now an HR Manager in a US-based company, I credit MSITM for shaping my career.",
  },
  {
    name: "Aanchal Meher",
    role: "Alumna, MSITM",
    img: `${U}/2025/02/Aanchal-Meher.jpg`,
    text: "My time at MSITM played a pivotal role in shaping my career. The college not only provided me with a solid academic foundation but strong hands-on learning opportunities, supportive faculty, and exposure to real-world challenges which instilled in me the confidence and problem-solving skills required in the IT industry.",
  },
  {
    name: "Anoop Srivastava",
    role: "Alumnus, MSITM",
    img: `${U}/2025/03/Anoop-Srivastava.jpeg`,
    text: "MSITM is a renowned educational hub in Gonda District, known for its quality education, expert faculty, and advanced facilities. MSITM ensures graduates have expertise in both current and emerging technologies by offering updated curriculum modules and world-class practical facilities.",
  },
  {
    name: "Akhil Srivastava",
    role: "Chief Technology Officer, Yugasa Software Labs",
    img: `${U}/2025/03/Chief-Technology-Officer-CTO-Yugasa-Software-Labs-Pvt.-Ltd.jpeg`,
    text: "MSITM is a pioneer in promoting IT, and I'm proud to be part of this dynamic institution. With a focus on quality education and core values, it reflects the vision of Respected Baba Ji. The journey has been inspiring — producing top students and contributing to employment.",
  },
  {
    name: "Puneet Rai",
    role: "Industry visitor",
    img: `${U}/2025/05/Puneet-Rai.jpg`,
    text: "Visiting MSITM is always refreshing and rewarding. I'm impressed by the curiosity, intellect, and enthusiasm of its students. Today, it is recognized by leading companies as a reliable source of talent, and renowned organizations regularly visit the campus with great job opportunities.",
  },
  {
    name: "Balram Verma",
    role: "Lead Engineer, Wipro Technologies",
    img: `${U}/2025/03/Balram-Verma-Wipro-technologies-Lead-Engineer.jpeg`,
    text: "MSITM has been a pioneer in Information Technology education, and I take immense pride in being part of this esteemed institution. From guiding students to producing university toppers and creating job opportunities, the journey has been remarkable.",
  },
  {
    name: "Abu Sufiyan",
    role: "Industry visitor",
    img: `${U}/2025/03/abu-sufiyan.jpg`,
    text: "Visiting MSITM has always been a refreshing experience. Leading organizations now recognize it as a key recruitment destination, with top brands regularly visiting the campus. MSITM is rapidly becoming a preferred hub for both emerging and established companies.",
  },
  {
    name: "Mohsin Dabeer Siddiqui",
    role: "First batch alumnus",
    img: `${U}/2025/03/Mohsin.jpg`,
    text: "It has been 23 years since I first received computer education from MSIT, now MSITM, as part of its first batch. With 18 years of experience, I've learned that honesty and dedication are key to success. Congratulations to MSITM's management, staff, and students for making it a renowned institution in Gonda.",
  },
  {
    name: "Shobhit Srivastava",
    role: "Guest mentor",
    text: "I urge students to focus on real-world skills, not just a degree. MSITM aligns its curriculum with modern advancements like AI and IoT, empowering students to compete and innovate in a tech-driven world.",
  },
  {
    name: "Nitu Narula",
    role: "Alumna, MSITM",
    img: `${U}/2025/03/Nitu_narula.jpg`,
    text: "It is happiness unlimited to see MSITM breaking barriers and moving forward confidently. I was part of MSITM 20 years back — the quality of faculty and the support they provided to each student was very appreciable. I wish everyone at the institute my very best.",
  },
  {
    name: "Smita Srivastava",
    role: "Alumna, MSITM",
    img: `${U}/2025/05/Smita-Srivastava.jpg`,
    text: "The past two years at MSITM have been truly enriching, helping me grow in knowledge, patience, and essential management skills. MSITM's strong academic focus, industry exposure, and skill development prepared us to aim high.",
  },
  {
    name: "Mohd Shadab Alam",
    role: "Application Developer, SA Group India",
    img: `${U}/2025/03/Mohd_shadab_alam.jpg`,
    text: "Thank you, MSITM, for shaping me into the professional I am today. I currently work as an Application Developer (Android & iOS) at SA Group India and recently received the “Star of the Month” award. I owe much of where I am today to MSITM.",
  },
  {
    name: "Vikas Srivastava",
    role: "A-Level alumnus",
    img: `${U}/2025/05/vikas-srivastava.jpg`,
    text: "MSITM is a place of knowledge and growth. Completing my A-Level at MSITM gave me the skills I needed. Proud to be an alumnus — my experience there was truly transformative.",
  },
  {
    name: "Saquib Ali",
    role: "Android Developer, Delhi · BCA & MCA alumnus",
    img: `${U}/2025/05/Saquib-Alam.jpg`,
    text: "I'm forever grateful to MSITM and its amazing faculty. Joining in 2013 without a computer background, I never imagined becoming a developer. My time at MSITM, where I learned C, C++, Java, .NET, and completed my BCA and MCA, shaped my career.",
  },
  {
    name: "Anahita Singh",
    role: "TCS professional · Alumna",
    img: `${U}/2025/03/Anahita_singh.jpg`,
    text: "MSITM — it's not just a name but the driving force behind my success. Getting selected in TCS was a dream come true for me, and it wouldn't have been possible without MSITM and its wonderful faculty.",
  },
  {
    name: "Nisar Ali",
    role: "Alumnus, MSITM",
    img: `${U}/2025/03/Nisar_ali.jpg`,
    text: "I would like to express my respect and special thanks of gratitude to Babaji for his effort and devotion to establish MSIT at Gonda. This institute gave me the golden opportunity to learn IT and soft skills which are the keys to achieve a successful career.",
  },
  {
    name: "Juhi Goel",
    role: "O-Level alumna",
    img: `${U}/2025/03/Juhi_goel.jpg`,
    text: "MSITM — a great platform for good opportunities and your overall development. I joined MSITM for the O-Level diploma course while pursuing my graduation. From enhancing my technical skills to my vocal skills, MSITM has played a major role.",
  },
];

export const SITE_IMAGES = {
  // Generated bespoke MSITM editorial scenes
  heroCampus: "/images/generated/hero-campus.jpg",
  coursesUndergrad: "/images/generated/courses-undergrad.jpg",
  coursesPostgrad: "/images/generated/courses-postgrad.jpg",
  coursesDiploma: "/images/generated/courses-diploma.jpg",
  coursesCertificate: "/images/generated/courses-certificate.jpg",
  computerLab: "/images/generated/facility-computer-lab.jpg",
  libraryHero: "/images/generated/library-hero.jpg",
  placementCareers: "/images/generated/placement-careers.jpg",
  admissionsCounselling: "/images/generated/admissions-counselling.jpg",
  eventsCultural: "/images/generated/events-cultural.jpg",
  alumniSuccess: "/images/generated/alumni-success.jpg",
  // Verified authentic MSITM photographs served locally
  campusCourtyard: "/images/authentic/campus-courtyard.jpg",
  studentsStudy: "/images/authentic/students-study.jpg",
  fresherCelebration: "/images/authentic/fresher-celebration.jpg",
  classroomLecture: "/images/authentic/classroom-lecture.jpg",
  campusTour: "/images/authentic/campus-tour.jpg",
  libraryAuthentic: "/images/authentic/library-authentic.jpg",
  lectureHallAuthentic: "/images/authentic/lecture-hall-authentic.jpg",
  founder: "/images/authentic/founder-babaji.jpg",
  rankings: "/images/authentic/convocation-rankings.jpg",
} as const;

export const CAMPUS_IMAGES = {
  collageMain: SITE_IMAGES.studentsStudy,
  collage1: SITE_IMAGES.campusCourtyard,
  collage2: SITE_IMAGES.fresherCelebration,
  collage3: SITE_IMAGES.classroomLecture,
  collage4: SITE_IMAGES.campusTour,
  about: SITE_IMAGES.heroCampus,
  homeBg: SITE_IMAGES.lectureHallAuthentic,
  event: SITE_IMAGES.eventsCultural,
  founder: SITE_IMAGES.founder,
  rankings: SITE_IMAGES.rankings,
  library: SITE_IMAGES.libraryAuthentic,
};
