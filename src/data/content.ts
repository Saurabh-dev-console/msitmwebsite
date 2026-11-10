/** Structured page content migrated from the reference website. */
import { SITE_IMAGES } from "./site";

export type Block =
  | { type: "lead"; text: string }
  | { type: "prose"; paragraphs: string[]; dropcap?: boolean }
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "list"; style: "check" | "bullet" | "ordered"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "facts"; items: { label: string; value: string }[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "notice"; tone: "info" | "warn"; title?: string; text: string }
  | { type: "cta"; title: string; text: string; label: string; href: string }
  | { type: "linkCards"; items: { title: string; text: string; href: string }[] }
  | { type: "message"; from: string; role: string; quote?: string; paragraphs: string[] };

export interface PageContent {
  title: string;
  eyebrow: string;
  description: string;
  image?: string;
  imageAlt?: string;
  blocks: Block[];
}

export const ABOUT_PAGES: Record<string, PageContent> = {
  "why-choose-msitm": {
    title: "Why Choose MSITM",
    eyebrow: "About · Distinction",
    description:
      "The reasons students across Gonda and the Devipatan region choose the Meena Shah Institute of Technology and Management.",
    image: SITE_IMAGES.coursesUndergrad,
    imageAlt: "Students collaborating in a seminar hall at MSITM",
    blocks: [
      {
        type: "lead",
        text: "At the Meena Shah Institute of Technology and Management (MSITM), we take pride in being a trailblazer in professional education. Here is why MSITM stands out as the premier choice for students aspiring to excel in IT and Management.",
      },
      { type: "heading", text: "An established legacy" },
      {
        type: "list",
        style: "check",
        items: [
          "The 1st professional degree college in Gonda, delivering quality education since 1998.",
          "ISO 9001:2015 certified for maintaining high standards in education.",
          "Consistently maintaining an excellent academic record for over 27 years.",
        ],
      },
      { type: "heading", text: "Academic excellence" },
      {
        type: "list",
        style: "check",
        items: [
          "A pioneer in IT and Management education, shaping future leaders in professional domains.",
          "Produced Gold Medalists and University Toppers — a testament to the dedication of our students and faculty.",
          "Supported by a team of experienced and qualified full-time faculty members.",
        ],
      },
      { type: "heading", text: "State-of-the-art facilities" },
      {
        type: "list",
        style: "check",
        items: [
          "Modern infrastructure, including a dedicated IoT and computer lab.",
          "Wi-Fi-enabled campus, ensuring seamless access to digital resources.",
          "A well-stocked library with reference books and magazines to support in-depth learning.",
        ],
      },
      { type: "heading", text: "A career-focused approach" },
      {
        type: "list",
        style: "check",
        items: [
          "Associations with global brands for placement, ensuring students are career-ready.",
          "Our students have been successfully placed in top companies across various sectors.",
          "Focus on practical training sessions to equip students with real-world skills.",
          "A special emphasis on supporting students from rural backgrounds, providing equal opportunities for growth.",
        ],
      },
      { type: "heading", text: "Holistic development" },
      {
        type: "list",
        style: "check",
        items: [
          "Regular seminars and motivational sessions offering insight into personal and professional growth.",
          "Partnerships with English academies to enhance communication and soft skills.",
          "Comprehensive programs designed to foster technical expertise, personal growth, and professional excellence.",
        ],
      },
      { type: "heading", text: "Proven impact" },
      {
        type: "list",
        style: "check",
        items: [
          "Over 50,000 students enrolled, making MSITM a trusted name in education.",
          "A track record of producing professionals equipped to thrive in a competitive global landscape.",
        ],
      },
      {
        type: "cta",
        title: "Experience MSITM in person",
        text: "Visit our campus at Meena Nagar, Circular Road, Gonda — or speak with an admission counsellor today.",
        label: "Contact admissions",
        href: "/contact",
      },
    ],
  },
  "mission-vision": {
    title: "Mission & Vision",
    eyebrow: "About · Purpose",
    description: "The vision and mission that guide every classroom, laboratory and mentoring relationship at MSITM.",
    image: SITE_IMAGES.libraryHero,
    imageAlt: "Students reading and researching in the MSITM academic library",
    blocks: [
      { type: "heading", text: "Vision of MSITM" },
      {
        type: "prose",
        paragraphs: [
          "At MSITM, we envision a future where the skyline of the education system is radically transformed. We recognize that challenging times lie ahead, and we must be prepared to tackle any obstacles that come our way. Our vision is to propel MSITM to new heights of success, creating a world-class institution committed to excellence in learning. By doing so, we aim to contribute to the growth of society and the nation as a whole, ensuring that our students are well-equipped to thrive in an ever-evolving world.",
        ],
      },
      { type: "heading", text: "Mission of MSITM" },
      {
        type: "prose",
        paragraphs: [
          "Our mission is to cultivate a new breed of professionals — MSITMians — who are resilient in the face of the future. By designing, developing, and delivering cutting-edge education, we aim to broaden students' competence and ensure they are recognized for their high ethical standards and responsiveness to the social environment. We are dedicated to helping our students create a better world and transform their dreams into reality, making them future-ready and capable of tackling any challenge head-on.",
        ],
      },
      { type: "quote", text: "Together we rise.", cite: "The MSITM mission in four words" },
      {
        type: "linkCards",
        items: [
          { title: "Our core values", text: "Respect, humanity, honesty and dedication — the principles behind the mission.", href: "/about" },
          { title: "Messages from leadership", text: "Hear how our founders and leaders interpret this mission.", href: "/about/president-leadership" },
        ],
      },
    ],
  },
  "our-campus": {
    title: "Our Evergreen Campus",
    eyebrow: "About · Campus",
    description: "Classic, timeless, lush, modern, evergreen — the MSITM campus in Gonda.",
    image: SITE_IMAGES.heroCampus,
    imageAlt: "Meena Shah Institute of Technology and Management campus and green grounds",
    blocks: [
      { type: "lead", text: "Classic. Timeless. Lush. Modern. Evergreen." },
      {
        type: "prose",
        paragraphs: [
          "MSITM, Gonda now stands out and stands taller than the rest in the region, as a unique group. Its beyond-the-syllabus approach, innovative teaching, training and concept-building methodology, and holistic integrated action plan for the overall development of students and faculty provide the inspiring force for excellent growth.",
          "Our campus truly offers the best of two worlds: it is distinct from the surrounding city, yet intimately connected to the diverse and historic region we call home. The MSITM campus has also been ranked the safest college campus in Gonda.",
        ],
      },
      { type: "heading", text: "Affiliations & recognition" },
      {
        type: "prose",
        paragraphs: [
          "MSITM is affiliated to Dr. Ram Manohar Lohia Avadh University, Faizabad, which offers BBA & BCA. MSITM is also an authorized learning center of Integral University, which offers master's programs like MBA and MCA. MSITM is also an authorized center of NIELIT & NCPUL (autonomous bodies in IT and communication).",
        ],
      },
      {
        type: "image",
        src: SITE_IMAGES.campusCourtyard,
        alt: "MSITM students in courtyard",
        caption: "Students in the MSITM Gonda courtyard (photograph from msitm.edu.in).",
      },
      {
        type: "linkCards",
        items: [
          { title: "Campus facilities", text: "Library, computer labs and lecture halls.", href: "/facilities" },
          { title: "Visit us", text: "Meena Nagar, Circular Road, Gonda 271002.", href: "/contact" },
        ],
      },
    ],
  },
  "president-leadership": {
    title: "President & Leadership",
    eyebrow: "About · Leadership",
    description: "Messages from the founder, president, manager, dean and principal of MSITM.",
    image: SITE_IMAGES.founder,
    imageAlt: "Hazrat Mehboob Meena Shah, founder of MSITM",
    blocks: [
      {
        type: "lead",
        text: "Five voices, one purpose — the leaders who shaped MSITM from a seed of an idea in 1998 into the region's leading professional institute.",
      },
      {
        type: "message",
        from: "Hazrat Mehboob Meena Shah",
        role: "Founder",
        quote: "You don't have to be great to start, but you have to start to be great.",
        paragraphs: [
          "My heart fills with immense pleasure as I perceive the progress being made at MSITM. The seed of an idea sown in 1998 has now come to fruition and the institution is growing into a strong sapling — MSITM Degree College. I feel that the entire purpose of education is not to restrict itself to imparting bookish knowledge only, but to inculcate humanitarian values like wisdom, compassion, courage, humility, integrity, the spirit of service and reliability in a student.",
          "I would like to say to our students: “You are the nation-builders. You are the movers of technology. You are the source of change.” It is our fervent hope that the years you spend at MSITM will equip you with leadership and managerial skills. The knowledge you gain, the fine qualities you imbibe and the technical skills you learn to apply will be your major contribution to your parents, to society and to the nation.",
          "I extend my warm wishes to the staff and students of MSITM to continue this journey on the road of excellence.",
        ],
      },
      {
        type: "message",
        from: "Salman Jafri",
        role: "President, MSITM",
        quote: "It is quality and quantity that matters at MSITM.",
        paragraphs: [
          "Learning is the fundamental behaviour for creating competitive advantage. We cannot have an edge if our mental calibre remains static. Given the right circumstances — determination, liberty and opportunity — ordinary people can do extraordinary things.",
          "In our institution, the effort in IT as well as management programs is not only to produce quality professionals but complete personalities who are poised to grow by leaps and bounds, so as to become effective leaders tomorrow. Here learning is a matter of attitude and not aptitude.",
          "We identify that in a world of rapid and continuous change, knowledge of the latest developments becomes more crucial. Therefore the emphasis in our institution is on effectively developing students and tuning them to the rapidly changing environment.",
        ],
      },
      {
        type: "message",
        from: "Hasan Saeed",
        role: "Manager (CEO), MSITM",
        quote: "Thank you for considering us as the IT & Management college for your child.",
        paragraphs: [
          "Welcome to MSITM, Gonda! For over two decades, we have been a leading institution for IT and Management education. Our top-ranked programs emphasize teaching, industry training, and service, fostering a vibrant learning environment. Distinguished faculty, with strong industry ties, bring expert insights to our students.",
          "Our goal is national prominence. Talented staff ensure an optimal learning experience, and our faculty are renowned scholars and practitioners. We empower students — future innovators, engineers, managers, and leaders — through a unique blend of theory and practice, preparing them for global excellence.",
          "At MSITM, we instill a lifelong passion for learning and community contribution. We believe in a strong partnership between students, parents, and the college, which is key to student success.",
        ],
      },
      {
        type: "message",
        from: "Ajay Tandon",
        role: "Dean",
        quote: "Education is a shared commitment between dedicated teachers, motivated students and enthusiastic parents.",
        paragraphs: [
          "Today, the role of a college is not only to pursue academic excellence but also to motivate and empower its students to be lifelong learners, critical thinkers and productive members of an ever-changing global society.",
          "Education is not a preparation for life. Education is life itself. The need for character building and reviving ethical and moral values requires a balanced and harmonious environment. We prepare our students to face life and its challenges.",
          "Let the management, staff and parents join hands to accompany our wards in their endeavour to dream higher and achieve more. Let us give wings to their imagination and ignite their inquisitiveness.",
        ],
      },
      {
        type: "message",
        from: "Shri Prakash Pandey",
        role: "Principal",
        paragraphs: [
          "At Meena Shah Institute of Technology and Management, we believe in nurturing not just educated minds, but responsible, compassionate, and empowered individuals who can make meaningful contributions to society. Education, in our vision, is not merely about academic excellence but about holistic development — preparing our students to thrive in an ever-changing global landscape.",
          "Our dedicated faculty, modern infrastructure, and student-centric learning environment work in harmony to ensure that each student's potential is fully realized. We encourage curiosity, critical thinking, and creativity, alongside instilling strong ethical values and social responsibility.",
          "Thank you for your interest in Meena Shah Institute of Technology and Management. Together, let us build a brighter future.",
        ],
      },
    ],
  },
  "rankings-accolades": {
    title: "Rankings & Accolades",
    eyebrow: "About · Recognition",
    description: "Accreditations, affiliations and academic distinctions held by MSITM.",
    image: SITE_IMAGES.rankings,
    imageAlt: "Rankings and convocation accolades at MSITM",
    blocks: [
      {
        type: "lead",
        text: "MSITM's standing rests on recognised accreditations, university affiliations and the consistent achievements of its students.",
      },
      { type: "heading", text: "Accreditations & affiliations" },
      {
        type: "list",
        style: "check",
        items: [
          "ISO 9001:2015 certified for maintaining high standards in education.",
          "Affiliated to Dr. Ram Manohar Lohia Avadh University, Ayodhya — offering BBA & BCA.",
          "Affiliated to Maa Pateshwari University, Balrampur.",
          "Authorised learning centre of Integral University — offering MBA and MCA (online mode).",
          "Authorised centre of NIELIT for 'O' Level, 'A' Level, CCC and CHM courses.",
          "Authorised centre of NCPUL for the CABA-MDTP diploma.",
        ],
      },
      { type: "heading", text: "Student distinctions" },
      {
        type: "list",
        style: "check",
        items: [
          "Produced Gold Medalists and University Toppers.",
          "The No. 1 professional institute in the Devipatan Mandal.",
          "The 1st professional degree college in Gonda, serving since 1998.",
          "Ranked the safest college campus in Gonda.",
        ],
      },
      {
        type: "notice",
        tone: "info",
        title: "About this page",
        text: "The previous website's rankings page carried no detailed ranking tables. The distinctions above are drawn from verified statements published across the institute's official pages. Detailed ranking certificates may be requested from the institute office.",
      },
    ],
  },
  "university-profile": {
    title: "University Profile",
    eyebrow: "About · Profile",
    description: "Programmes offered at MSITM across management, information technology and diploma streams.",
    image: SITE_IMAGES.lectureHallAuthentic,
    imageAlt: "Faculty and students inside an MSITM lecture hall",
    blocks: [
      {
        type: "lead",
        text: "MSITM offers programmes across management, information technology and diploma streams through its university affiliations and authorised centres.",
      },
      { type: "heading", text: "Programmes by stream" },
      {
        type: "table",
        head: ["Stream", "Programmes"],
        rows: [
          ["Management", "BBA, MBA"],
          ["IT — Information Technology", "BCA, MCA"],
          ["Diploma", "CCC, 'O' Level, DCA, Tally, Fluent English"],
        ],
      },
      {
        type: "notice",
        tone: "info",
        title: "Programme availability",
        text: "Detailed pages on the previous website covered BBA, BCA, MBA, MCA, NIELIT diplomas, CABA-MDTP, DSA and certificate courses including Tally and English. Availability of library-science (B.Lib/M.Lib) and DCA intakes should be confirmed with the admissions office, as no detail pages were published for them.",
      },
      {
        type: "linkCards",
        items: [
          { title: "Undergraduate courses", text: "BBA and BCA degree programmes.", href: "/courses/undergraduate-courses" },
          { title: "Postgraduate courses", text: "MBA and MCA programmes.", href: "/courses/postgraduate-courses" },
          { title: "Diploma courses", text: "NIELIT, NCPUL and MSITM diplomas.", href: "/courses/diploma-courses" },
        ],
      },
    ],
  },
  "equity-and-inclusion": {
    title: "Equity and Inclusion",
    eyebrow: "About · Values",
    description: "MSITM's commitment to access, rural upliftment and an inclusive campus.",
    image: SITE_IMAGES.alumniSuccess,
    imageAlt: "Inclusive community of MSITM students and mentors outdoors",
    blocks: [
      { type: "heading", text: "Message from the Office of Equity and Inclusion" },
      {
        type: "prose",
        paragraphs: [
          "Mahboob Meena Shah, the great saint, visionary and social activist, is at the core of the Meena Shah Institute of Technology & Management, set up in 1998 and running on a self-financing basis since inception — popularly known as MSITM. The group has emerged as a torchbearer of IT & Management education in Gonda and the Devipatan region of U.P.",
          "MSITM is affiliated to Dr. Ram Manohar Lohia Avadh University, Faizabad, which offers BBA & BCA. MSITM is also an authorized learning center of Integral University, which offers master's programs like MBA and MCA, and an authorized center of NIELIT & NCPUL.",
        ],
      },
      { type: "heading", text: "Access for rural students" },
      {
        type: "prose",
        paragraphs: [
          "MSITM is dedicated to uplifting students from rural areas, offering an inclusive and supportive environment to overcome challenges and succeed academically and professionally. A special emphasis on supporting students from rural backgrounds ensures equal opportunities for growth — including quality education without requiring students to relocate to big cities.",
        ],
      },
      { type: "heading", text: "The value of student voices" },
      {
        type: "prose",
        paragraphs: [
          "Through our mission and the faith tradition of our institution, we have a call to hear the voices of the unrepresented and to create space at the table for those voices. Our undergraduate and graduate students are essential to this integrated approach. Our collaborative, relational, and student-centered approach provides avenues for our students to engage in diverse, equitable and inclusive practices.",
        ],
      },
      {
        type: "notice",
        tone: "info",
        title: "Editorial note",
        text: "The previous version of this page carried a dated 2020–2023 strategic-plan reference and a partner-office list from the old website template. Those template elements have been retired in this rebuild; current inclusion initiatives and the office directory are available from the institute. See the public audit report for details.",
      },
      {
        type: "linkCards",
        items: [{ title: "Read the audit report", text: "What was migrated, what was retired, and why.", href: "/audit" }],
      },
    ],
  },
};

export const FACILITY_PAGES: Record<string, PageContent> = {
  campus: {
    title: "Campus",
    eyebrow: "Facilities · Campus",
    description: "Welcome to the MSITM campus — the torchbearer of IT & Management education in Gonda and Devipatan.",
    image: SITE_IMAGES.heroCampus,
    imageAlt: "MSITM campus building and green walkways",
    blocks: [
      { type: "heading", text: "Welcome to the MSITM campus" },
      {
        type: "prose",
        dropcap: true,
        paragraphs: [
          "Mahboob Meena Shah, the great saint, visionary and social activist, is at the core of the Meena Shah Institute of Technology & Management — set up in 1998 and running on a self-financing basis since inception, popularly known as MSITM. The group has emerged as a torchbearer of IT & Management education in Gonda and the Devipatan region of U.P.",
          "MSITM is affiliated to Dr. Ram Manohar Lohia Avadh University, Faizabad, which offers BBA & BCA. MSITM is also an authorized learning center of Integral University, which offers master's programs like MBA and MCA, and an authorized center of NIELIT & NCPUL.",
          "MSITM, Gonda now stands out and stands taller than the rest in the region as a unique group. Its beyond-the-syllabus curriculum approach, innovative teaching, training and concept-building methodology, and holistic integrated action plan for the overall development of students and faculty provide the inspiring force for excellent growth.",
        ],
      },
      {
        type: "image",
        src: SITE_IMAGES.campusCourtyard,
        alt: "MSITM students in uniform blazers on the campus courtyard",
        caption: "MSITM students between lectures in the Gonda campus courtyard (photograph from msitm.edu.in).",
      },
      {
        type: "linkCards",
        items: [
          { title: "Our evergreen campus", text: "The story of our Gonda campus.", href: "/about/our-campus" },
          { title: "Library", text: "The academic heart of the institution.", href: "/facilities/library" },
          { title: "Computer lab", text: "250+ advanced computer systems.", href: "/facilities/computer-lab" },
        ],
      },
    ],
  },
  library: {
    title: "Library",
    eyebrow: "Facilities · Library",
    description: "A rich, well-stocked library — the academic heart of MSITM since 1998.",
    image: SITE_IMAGES.libraryHero,
    imageAlt: "MSITM academic library study hall and shelves",
    blocks: [
      { type: "lead", text: "Since 1998, we have prided ourselves on excellence." },
      {
        type: "prose",
        paragraphs: [
          "A rich and well-stocked library with thousands of books in stock — making the path easier to richness in knowledge.",
          "The College Library is the academic heart of our institution, supporting students, faculty, and staff in their pursuit of knowledge and excellence. We offer a rich collection of physical and digital resources, including books and study materials across all disciplines.",
        ],
      },
      {
        type: "image",
        src: SITE_IMAGES.libraryAuthentic,
        alt: "MSITM students studying at group tables inside the college library",
        caption: "Students collaborating inside the MSITM library reading room (photograph from msitm.edu.in).",
      },
      { type: "heading", text: "Our library provides" },
      {
        type: "list",
        style: "check",
        items: [
          "A quiet and comfortable study environment",
          "A comprehensive collection of books and e-resources",
          "Quiet study zones and collaborative workspaces",
          "Access to computers and high-speed internet",
        ],
      },
      {
        type: "notice",
        tone: "info",
        title: "A note on figures",
        text: "The previous website stated the collection size differently on different pages (5,000, 4,000 and 2,500 volumes). The current verified catalogue figure should be confirmed with the librarian; the audit report documents this inconsistency.",
      },
    ],
  },
  "computer-lab": {
    title: "Computer Lab",
    eyebrow: "Facilities · Computing",
    description: "A well-structured computer lab with 250 advanced systems and internet connectivity.",
    image: SITE_IMAGES.computerLab,
    imageAlt: "MSITM computer and IoT laboratory workstations",
    blocks: [
      { type: "lead", text: "A well-structured computer lab with 250 advanced computer systems and internet connection." },
      {
        type: "prose",
        paragraphs: [
          "Our computer laboratories make our students' path easier to learn new things with the help of advanced technologies — from programming practice and database work to IoT experiments and online examinations.",
        ],
      },
      {
        type: "image",
        src: SITE_IMAGES.coursesDiploma,
        alt: "Advanced IT and DTP workstation hall at MSITM",
        caption: "Practical programming, web design and NIELIT training workstations.",
      },
      {
        type: "facts",
        items: [
          { label: "Computer systems", value: "250+" },
          { label: "Connectivity", value: "Internet & Wi-Fi-enabled campus" },
          { label: "Special labs", value: "Dedicated IoT and computer labs" },
          { label: "Support", value: "In-house hardware department" },
        ],
      },
      {
        type: "linkCards",
        items: [
          { title: "Hardware department", text: "Meet the team behind the labs.", href: "/faculty/hardware-department" },
          { title: "NIELIT courses", text: "'O' Level, 'A' Level and CCC run on these labs.", href: "/courses/diploma-courses" },
        ],
      },
    ],
  },
  "lecture-hall": {
    title: "Lecture Hall",
    eyebrow: "Facilities · Learning spaces",
    description: "Well-furnished lecture halls with projectors and Wi-Fi.",
    image: SITE_IMAGES.lectureHallAuthentic,
    imageAlt: "MSITM lecture hall during a student session",
    blocks: [
      { type: "lead", text: "Well-furnished lecture halls with projectors and Wi-Fi." },
      {
        type: "prose",
        paragraphs: [
          "We believe in giving full space to our students to groom their talent and knowledge — spacious, collaborative learning spaces designed for both theoretical and practical applications.",
        ],
      },
      {
        type: "image",
        src: SITE_IMAGES.classroomLecture,
        alt: "MSITM students attending a lecture inside the classroom",
        caption: "Students attending a formal lecture at MSITM, Gonda (photograph from msitm.edu.in).",
      },
      {
        type: "linkCards",
        items: [
          { title: "Campus", text: "Explore the wider campus.", href: "/facilities/campus" },
          { title: "Visit us", text: "See the halls in person.", href: "/contact" },
        ],
      },
    ],
  },
};

export const PLACEMENT_PAGES: Record<string, PageContent> = {
  "about-placement-cell": {
    title: "About Placement Cell",
    eyebrow: "Placements · Placement cell",
    description: "How MSITM's Training & Placement Cell guides students from classroom to career.",
    image: SITE_IMAGES.placementCareers,
    imageAlt: "Graduating MSITM students during an on-campus corporate placement interview",
    blocks: [
      {
        type: "prose",
        paragraphs: [
          "The academic rigour of future leaders is made complete through the training and placement program that introduces them to the corporate atmosphere. It is an occasion for students to explore varied career opportunities in the areas of their interest and to get a better grasp of important industries.",
          "Since inception, MSITM continues to maintain an impressive and consistent training and placement record. At MSITM, placement is not an event — it is an ongoing process. MSITM is a preferred destination for on-campus recruitment among private institutions. The institute nurtures and encourages independent thinking and has an excellent track record in campus placements.",
          "Students receive excellent job offers from top-notch companies even before completing their degree programs. MSITM's training and placement centre provides information, advice, guidance and support to students.",
        ],
      },
      { type: "heading", text: "Training & Placement Officer (TPO)" },
      {
        type: "prose",
        paragraphs: [
          "The Training and Placement Officer (TPO) at MSITM leads the Placement Cell with a mission to guide students toward successful careers. The TPO acts as a bridge between students and industry, coordinating all placement and internship activities.",
        ],
      },
      { type: "heading", text: "Role of the Training & Placement Cell" },
      {
        type: "prose",
        paragraphs: ["The Training & Placement Cell guides and helps students reach their career goals. Its activities include:"],
      },
      {
        type: "list",
        style: "check",
        items: ["Job search", "Interview techniques", "CV preparation", "Covering letters", "Placement opportunities", "General advice and guidance"],
      },
      {
        type: "prose",
        paragraphs: [
          "The Training and Placement Cell is an integral part of the institute, with complete infrastructure for its effective functioning. Training activities are organized throughout the year to prepare prospective students for campus selection programs. The cell keeps inviting industries and reputed firms for campus recruitment.",
          "The placement office sends student data to companies and brings them for placements; it also selects eligible students for off-campus programs conducted by companies or other reputed colleges.",
        ],
      },
      {
        type: "linkCards",
        items: [
          { title: "Placed students", text: "Meet our newly placed students.", href: "/placement" },
          { title: "Success stories", text: "Alumni testimonials in their own words.", href: "/success-stories" },
        ],
      },
    ],
  },
  "traning-placement": {
    title: "Training & Placement",
    eyebrow: "Placements · Programme",
    description: "Training and placement at MSITM — an ongoing process, not an event.",
    image: SITE_IMAGES.alumniSuccess,
    imageAlt: "MSITM alumni mentors guiding students on career readiness",
    blocks: [
      {
        type: "prose",
        paragraphs: [
          "The academic rigour of future leaders is made complete through the training and placement program that introduces them to the corporate atmosphere. It is an occasion for students to explore varied career opportunities in the areas of their interest and to get a better grasp of important industries.",
          "Since inception, MSITM continues to maintain an impressive and consistent training and placement record. At MSITM, placement is not an event — it is an ongoing process. MSITM is a preferred destination for on-campus recruitment among private institutions, with an excellent track record in campus placements.",
          "Students receive excellent job offers from top-notch companies even before completing their degree programs. MSITM's training and placement centre provides information, advice, guidance and support to students.",
        ],
      },
      {
        type: "notice",
        tone: "info",
        title: "About this page's address",
        text: "This page keeps its original web address (/placement/traning-placement/) so existing links and bookmarks continue to work. Detailed cell information lives on the About Placement Cell page.",
      },
      {
        type: "linkCards",
        items: [
          { title: "About Placement Cell", text: "TPO, roles and how the cell works.", href: "/placement/about-placement-cell" },
          { title: "Placed students", text: "Our newly placed students.", href: "/placement" },
        ],
      },
    ],
  },
};

export const NEWS_INDEX_EXTRA: Record<string, PageContent> = {
  "farewell-2017": {
    title: "Farewell 2017",
    eyebrow: "News & Events · Archive",
    description: "Bidding farewell to the BBA & BCA batch of 2017 at MSITM.",
    image: SITE_IMAGES.fresherCelebration,
    imageAlt: "Students celebrating at an MSITM stage event",
    blocks: [
      {
        type: "prose",
        paragraphs: [
          "It was an incredible farewell party hosted and organized at the Meena Shah Institute of Technology & Management by the collective effort of the BBA & BCA second-year students, with the support and cooperation of the BBA & BCA first-year students.",
          "This program was held to bid farewell to the BBA & BCA third-year students — organized to refresh them and wish them a great future. The programme started with the inauguration ceremony of cutting the ribbon by Mr. Hasan Saeed (CEO, MSITM). Various cultural events like a play, welcome song, laughter show and games were organized.",
          "Finally the event ended with three farewell rounds. The first round was a quiz round; qualifiers reached the second round of putting bindi on posters; the selected students reached the final round of drinking an energy drink. Mr. Farewell was awarded to Mr. Shadab Alam and Miss Farewell to Miss Kahkashan Hasan, both of BCA third year.",
          "Honourable Saeed Sir blessed the students and gave a motivational speech that energized the final-year students. He gave his best wishes for their future and expressed his hope that students will continue holding the best positions. The program ended with group photographs of all the final-year students and teachers.",
        ],
      },
      {
        type: "linkCards",
        items: [
          { title: "Extra-curricular activities", text: "Competitions, events and celebrations.", href: "/college-news-events/extra-curricular-activities" },
          { title: "Alumni", text: "Stay connected after farewell.", href: "/alumni" },
        ],
      },
    ],
  },
  "extra-curricular-activities": {
    title: "Extra-Curricular Activities",
    eyebrow: "News & Events · Beyond class",
    description: "Competitions, celebrations, seminars and skill-building beyond the classroom at MSITM.",
    image: SITE_IMAGES.eventsCultural,
    imageAlt: "Students celebrating at an MSITM auditorium event",
    blocks: [
      {
        type: "lead",
        text: "Beyond academics, MSITM runs competitions, celebrations, seminars and skill-building sessions that shape confident, industry-ready graduates.",
      },
      { type: "heading", text: "Competitions & celebrations" },
      {
        type: "list",
        style: "check",
        items: [
          "Mega District Level Competition (Independence Day 2025) — online quiz for undergraduates, essay competition for Classes 9–12, and painting for Classes 6–8, with tablets, Alexa devices, smart watches and trophies for winners.",
          "Meena Shah Pre School Independence Day competitions — essay, poster-making and painting contests for young artists, with certificates downloadable online.",
          "Farewell celebrations honouring outgoing BBA & BCA batches with cultural events and awards.",
        ],
      },
      { type: "heading", text: "Seminars & skill-building" },
      {
        type: "list",
        style: "check",
        items: [
          "Regular seminars and motivational sessions on personal and professional growth.",
          "Personality development & skill-building sessions with industry experts — communication, leadership and confidence.",
          "Workshops on emerging technologies (AI, data science, cybersecurity, cloud) with career counselling.",
          "Mega tech events with industry leaders and academia on campus.",
        ],
      },
      {
        type: "linkCards",
        items: [
          { title: "College news", text: "Latest announcements and event reports.", href: "/college-news-events/college-news" },
          { title: "Farewell 2017", text: "A look back at a memorable farewell.", href: "/college-news-events/farewell-2017" },
          { title: "Student corner", text: "Sessions, workshops and feedback.", href: "/student-corner" },
        ],
      },
    ],
  },
};

export const IQAC_PAGES: Record<string, PageContent> = {
  "about-iqac": {
    title: "About IQAC",
    eyebrow: "IQAC · Overview",
    description: "The Internal Quality Assurance Cell at MSITM — introduction, functions, mission and vision.",
    blocks: [
      { type: "heading", text: "Internal Quality Assurance Cell (IQAC)" },
      { type: "subheading", text: "Introduction" },
      {
        type: "prose",
        paragraphs: [
          "India has one of the largest and most diverse education systems in the world. Privatization, widespread expansion, increased autonomy and the introduction of programs in new and emerging areas have improved access to higher education — and, at the same time, led to widespread concern about quality and relevance. To address these concerns, the National Policy on Education (NPE, 1986) and the Programme of Action (PoA, 1992) advocated the establishment of an independent national accreditation agency. Consequently, the National Assessment and Accreditation Council (NAAC) was established in 1994 as an autonomous institution of the University Grants Commission (UGC), with a mandate to make quality assurance an integral part of the functioning of Higher Education Institutions.",
        ],
      },
      { type: "subheading", text: "Functions of the IQAC" },
      {
        type: "list",
        style: "bullet",
        items: [
          "Development and application of quality benchmarks and parameters for the various academic and administrative activities of the college.",
          "Facilitating the creation of a learner-centric environment conducive to quality education, and faculty maturation to adopt the required knowledge and technology for a participatory teaching–learning process.",
        ],
      },
      { type: "subheading", text: "Mission & vision" },
      {
        type: "list",
        style: "bullet",
        items: [
          "To arrange for periodic assessment and accreditation of institutions of higher education, or units thereof, or specific academic programmes or projects.",
          "To stimulate the academic environment for the promotion of quality in teaching–learning and research in higher education institutions.",
          "To make quality the defining element of higher education in India through self and external quality evaluation, promotion and sustenance initiatives.",
        ],
      },
      { type: "heading", text: "Records & links" },
      {
        type: "list",
        style: "bullet",
        items: ["Student Satisfaction Survey (SSS) 2023–24 — published January 2025.", "Composition of the IQAC and minutes of IQAC meetings are maintained by the cell."],
      },
      {
        type: "linkCards",
        items: [
          { title: "Composition of IQAC", href: "/iqac/composition-of-iqac", text: "Members and structure of the cell." },
          { title: "Meetings and minutes", href: "/iqac/meeting-and-minutes", text: "Meeting records." },
          { title: "IQAC reports", href: "/iqac/iqac-reports", text: "Annual quality reports." },
        ],
      },
    ],
  },
  "composition-of-iqac": iqacStub(
    "Composition of IQAC",
    "The composition of the Internal Quality Assurance Cell — chairperson, coordinator, faculty, administration, student, alumni, employer and stakeholder nominees — is maintained by the IQAC office."
  ),
  "naac-steering-committee": iqacStub(
    "NAAC Steering Committee",
    "The NAAC Steering Committee coordinates the institute's assessment and accreditation work — criteria-wise teams, documentation and institutional data — under the guidance of the IQAC."
  ),
  "meeting-and-minutes": iqacStub(
    "Meeting and Minutes",
    "Minutes of IQAC meetings record the quality initiatives resolved, assigned and reviewed through the academic year."
  ),
  "iqac-activity": iqacStub(
    "IQAC Activity",
    "IQAC activities include quality audits, feedback collection and analysis, faculty development initiatives and best-practice documentation."
  ),
  "iqac-reports": iqacStub(
    "IQAC Reports",
    "Annual Quality Assurance Reports (AQAR) and related submissions document the institute's quality performance each year."
  ),
  "rti-statutory-declaration": iqacStub(
    "RTI Statutory Declaration",
    "The statutory declaration under the Right to Information Act — including the public information officer's details — is published by the institute as required."
  ),
  mous: iqacStub(
    "MoUs",
    "Memoranda of Understanding with academic, industry and training partners support placements, guest sessions, workshops and student opportunities."
  ),
  "academic-administrative-audit-aaa-reports": iqacStub(
    "Academic & Administrative Audit (AAA) Reports",
    "Academic and Administrative Audits periodically review departments and administrative units against defined quality benchmarks."
  ),
  "perspective-plans": iqacStub(
    "Perspective Plans",
    "Perspective plans set the institute's medium-term quality goals — academic growth, infrastructure, research culture and outreach."
  ),
};

function iqacStub(title: string, scope: string): PageContent {
  return {
    title,
    eyebrow: "IQAC · Records",
    description: `${title} — Internal Quality Assurance Cell, MSITM.`,
    blocks: [
      { type: "lead", text: scope },
      {
        type: "notice",
        tone: "info",
        title: "Records held by the IQAC office",
        text: "The previous website listed this section without publishing its documents. Certified copies of the current records are available from the IQAC office at the institute — please contact us and the team will respond within one business day.",
      },
      {
        type: "linkCards",
        items: [
          { title: "About IQAC", text: "Introduction, functions and mission.", href: "/iqac/about-iqac" },
          { title: "Contact the institute", text: "Reach the IQAC office.", href: "/contact" },
        ],
      },
    ],
  };
}

export const MISC_PAGES: Record<string, PageContent> = {
  "admission-process": {
    title: "Admission Process",
    eyebrow: "Admissions · How to apply",
    description: "How to apply to MSITM for the 2026–27 academic session.",
    image: SITE_IMAGES.admissionsCounselling,
    imageAlt: "MSITM admission counsellor guiding a prospective student and parent",
    blocks: [
      {
        type: "lead",
        text: "Admissions are open for the 2026–27 academic session. Applying to MSITM takes four simple steps.",
      },
      {
        type: "list",
        style: "ordered",
        items: [
          "Choose your programme — undergraduate (BBA, BCA), postgraduate (MBA, MCA), diploma or certificate courses.",
          "Check the eligibility for your chosen course on its course page.",
          "Submit the admission form online, call +91-9565661505, or visit the campus at Meena Nagar, Circular Road, Gonda.",
          "Our admission team responds within one business day to guide you through enrolment.",
        ],
      },
      { type: "heading", text: "Before you apply" },
      {
        type: "list",
        style: "check",
        items: [
          "BBA & BCA are affiliated to Dr. R.M.L. Avadh University / Maa Pateshwari University.",
          "MBA & MCA run through the authorised Integral University learning centre (online mode).",
          "NIELIT and NCPUL diploma admissions follow the respective council's examination calendar.",
        ],
      },
      {
        type: "notice",
        tone: "info",
        title: "Session schedule & fees",
        text: "The detailed admission schedule, document list and fee structure for each programme are published by the admissions office each session. Please contact the office for the current session's official schedule.",
      },
      {
        type: "linkCards",
        items: [
          { title: "Admission form", text: "Apply online for 2026–27.", href: "/admission-form" },
          { title: "Admission calendar", text: "Session dates and milestones.", href: "/admission-calender" },
          { title: "All courses", text: "Browse programmes and eligibility.", href: "/courses" },
        ],
      },
    ],
  },
  "admission-calender": {
    title: "Admission Calendar",
    eyebrow: "Admissions · 2026–27",
    description: "Admission calendar for the 2026–27 academic session at MSITM.",
    image: SITE_IMAGES.heroCampus,
    imageAlt: "MSITM campus welcoming new admission applicants",
    blocks: [
      {
        type: "lead",
        text: "Admissions are now open for the 2026–27 academic session — start your journey towards a brighter future.",
      },
      { type: "heading", text: "Programmes open for admission" },
      {
        type: "table",
        head: ["Level", "Programmes"],
        rows: [
          ["Undergraduate", "BBA, BCA"],
          ["Postgraduate", "MBA, MCA (online mode)"],
          ["Diploma", "'O' Level, 'A' Level, CABA-MDTP, CHM-O Level, DSA"],
          ["Certificate", "CCC, English Academy, Tally, WDT, DTP, CCN, CPT, .NET, Oracle, C++, Java, Laptop/Mobile Repairing"],
        ],
      },
      {
        type: "notice",
        tone: "info",
        title: "Detailed dates",
        text: "Counselling dates, document verification windows and last dates for each programme are announced by the admissions office. This page keeps its original web address (/admission-calender/) so existing links keep working.",
      },
      {
        type: "cta",
        title: "Apply now for 2026–27",
        text: "Seats are allotted with guidance from our admission counsellors — apply today.",
        label: "Open admission form",
        href: "/admission-form",
      },
    ],
  },
  "training-placement": {
    title: "Training & Placement",
    eyebrow: "Placements · Overview",
    description: "Training and placement at MSITM — guidance, recruiters and outcomes.",
    image: SITE_IMAGES.placementCareers,
    imageAlt: "MSITM students in corporate training and interview preparation",
    blocks: [
      {
        type: "lead",
        text: "At MSITM, placement is not an event — it is an ongoing process of training, guidance and industry connection.",
      },
      {
        type: "prose",
        paragraphs: [
          "The academic rigour of future leaders is made complete through the training and placement program that introduces them to the corporate atmosphere. MSITM is a preferred destination for on-campus recruitment among private institutions, and students receive offers from top companies even before completing their degree programs.",
        ],
      },
      {
        type: "linkCards",
        items: [
          { title: "About Placement Cell", text: "TPO, cell roles and activities.", href: "/placement/about-placement-cell" },
          { title: "Placed students", text: "Meet our newly placed students.", href: "/placement" },
          { title: "Success stories", text: "Alumni testimonials.", href: "/success-stories" },
        ],
      },
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy",
    eyebrow: "Legal · Privacy",
    description: "How MSITM collects, uses and protects information submitted through this website.",
    image: SITE_IMAGES.libraryHero,
    imageAlt: "Institutional records and academic archive at MSITM",
    blocks: [
      {
        type: "lead",
        text: "This policy explains what information this website collects and how the institute uses it.",
      },
      { type: "heading", text: "Information you provide" },
      {
        type: "prose",
        paragraphs: [
          "When you submit an enquiry, admission, feedback or certificate-lookup form, we collect the details you enter — such as your name, contact information and message — so the relevant office (admissions, placement, IQAC or administration) can respond to you.",
        ],
      },
      { type: "heading", text: "How we use it" },
      {
        type: "list",
        style: "bullet",
        items: [
          "To respond to enquiries and admission applications.",
          "To improve teaching, facilities and student services using feedback and survey responses.",
          "To log certificate-verification requests for follow-up by the institute office.",
        ],
      },
      { type: "heading", text: "Sharing & retention" },
      {
        type: "prose",
        paragraphs: [
          "We do not sell your personal information. Records are retained by the institute for administrative purposes and shared only with the university or statutory bodies where admission or examination rules require it.",
        ],
      },
      { type: "heading", text: "Your choices" },
      {
        type: "prose",
        paragraphs: [
          "You may request correction or deletion of your submitted information by writing to info@msitm.edu.in or calling +91-9565661505.",
        ],
      },
      { type: "heading", text: "Photographs & media" },
      {
        type: "prose",
        paragraphs: [
          "Student, alumni and campus photographs displayed on this website are the institute's own records migrated from its official website. Event participants who wish to update a published photograph may contact the institute office.",
        ],
      },
    ],
  },
};
