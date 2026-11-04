/** Course catalogue migrated from the reference website. */

export interface Course {
  slug: string;
  level: "undergraduate-courses" | "postgraduate-courses" | "diploma-courses" | "certificate-courses";
  levelLabel: string;
  kind: "Under Graduate Course" | "Post Graduate Course" | "Diploma Course" | "Certificate Course";
  title: string;
  fullName: string;
  duration?: string;
  eligibility?: string;
  awarding?: string;
  intro: string[];
  sections?: { heading: string; body: string[]; list?: string[] }[];
  table?: { head: string[]; rows: string[][] };
  note?: string;
}

export const LEVELS: Record<string, { title: string; eyebrow: string; intro: string; href: string }> = {
  "undergraduate-courses": {
    title: "Undergraduate Courses",
    eyebrow: "BBA · BCA",
    intro:
      "We invite you to explore our graduate programs and to discover where an MSITM Gonda degree college education can take you. Our graduate students are socially responsible leaders within their professions, and in their personal lives.",
    href: "/courses/undergraduate-courses",
  },
  "postgraduate-courses": {
    title: "Postgraduate Courses",
    eyebrow: "MBA · MCA",
    intro:
      "We invite you to explore our postgraduate programs and see where a degree from MSITM Degree College, Gonda, can take you. Our postgraduates emerge as socially responsible leaders — both in their careers and personal lives.",
    href: "/courses/postgraduate-courses",
  },
  "diploma-courses": {
    title: "Diploma Courses",
    eyebrow: "NIELIT · NCPUL · MSITM",
    intro:
      "Take the first step toward a brighter future with a diploma from MSITM Degree College, Gonda. Our diploma programs are designed to equip you with practical skills and real-world knowledge that can open doors to exciting career opportunities.",
    href: "/courses/diploma-courses",
  },
  "certificate-courses": {
    title: "Certificate Courses",
    eyebrow: "Short-term · Skill-focused",
    intro:
      "Enhance your skills and boost your career with our industry-relevant certificate courses at MSITM Degree College, Gonda. These short-term programs are designed to provide focused, practical training that fits into your busy schedule.",
    href: "/courses/certificate-courses",
  },
};

export const COURSES: Course[] = [
  {
    slug: "bca",
    level: "undergraduate-courses",
    levelLabel: "Undergraduate",
    kind: "Under Graduate Course",
    title: "BCA",
    fullName: "Bachelor of Computer Applications",
    duration: "3 years (full-time)",
    eligibility: "Class 12 in any stream (admissions office confirms university norms each session)",
    awarding: "Dr. R.M.L. Avadh University, Faizabad (Ayodhya) / Maa Pateshwari University",
    intro: [
      "MSITM Degree College offers a full-time three-year program leading to a Bachelor's degree in Computer Application awarded by Dr. R.M.L. Avadh University, Faizabad (UP), and Maa Pateshwari University.",
      "In the modern professional world, the BCA program has become an important preparatory-level graduate course after completing Class 12, especially in the context of the IT industry. With the exponential growth in the IT sector in our country, and with the entry and investment of various multinational companies, it is reasonable to expect that the IT industry will require a large number of competent professionals in the coming years, particularly at the entry level. It is in this context that BCA assumes a significant role.",
    ],
  },
  {
    slug: "bba",
    level: "undergraduate-courses",
    levelLabel: "Undergraduate",
    kind: "Under Graduate Course",
    title: "BBA",
    fullName: "Bachelor of Business Administration",
    duration: "3 years (full-time)",
    eligibility: "Class 12 in any stream (admissions office confirms university norms each session)",
    awarding: "Dr. R.M.L. Avadh University, Faizabad (Ayodhya) / Maa Pateshwari University",
    intro: [
      "Bachelor of Business Administration (BBA) is a three-year full-time course designed to develop future professionals rather than mere “degree holders.” The program is designed to meet the evolving needs of the industry, where students ultimately seek employment and build successful careers. It follows a practical and industry-oriented approach to learning, combining theoretical knowledge with real-world applications.",
      "The BBA program at MSITM Degree College aims to produce skilled business executives, managers, and entrepreneurs with a strong foundation in management principles and practical expertise. The course equips students with the knowledge and skills required to take up challenging roles in the corporate sector and successfully establish their own ventures.",
    ],
  },
  {
    slug: "mba",
    level: "postgraduate-courses",
    levelLabel: "Postgraduate",
    kind: "Post Graduate Course",
    title: "MBA",
    fullName: "Master of Business Administration",
    duration: "2 years",
    eligibility: "A candidate must have passed 10+2+3 in any discipline with minimum 50% marks in aggregate from a recognized university.",
    awarding: "Integral University (online mode) via MSITM authorised learning centre",
    intro: [
      "MBA is a high-calibre postgraduate degree that is a global recognition of your management excellence. Firmly established as a world-leading business qualification, the MBA's appeal transcends international borders.",
      "Each year more than 100,000 MBA graduates enter the business world. Recruiters from the world's leading corporations search business schools for their future senior executives. The MBA can be a life-changing experience: recognised by students and employers as a high-quality study programme, it can provide the leverage to open up superb career opportunities in an intensely competitive, increasingly global business marketplace. While some students use the MBA as a stepping-stone on their previous career path, others view it as a chance to think about their future and change career direction.",
    ],
  },
  {
    slug: "mca",
    level: "postgraduate-courses",
    levelLabel: "Postgraduate",
    kind: "Post Graduate Course",
    title: "MCA",
    fullName: "Master of Computer Applications",
    duration: "3 years / 2 years (lateral entry)",
    eligibility:
      "First year: Bachelor's degree of minimum three years with Mathematics at 10+2 or graduate level, minimum 50% aggregate. Lateral entry: BCA / B.Sc. (IT/Computer Science) or equivalent with Mathematics at 10+2 or graduate level, minimum 50% aggregate.",
    awarding: "Integral University (online mode) via MSITM authorised learning centre",
    intro: [
      "In recent years, we saw the emergence of Master of Computer Applications (MCA) as one of the most sought-after courses among professional degrees. It has become a pre-requisite qualification for aspirants entering the software profession. The boom in the IT sector has turned the tide towards MCA, and now MCA graduates along with engineering graduates are ruling the software arena.",
      "Every company looks to run their communication systems and information technology in an improved and highly effective manner. In this endeavour they need experts who can implement computer science principles for solving the problems caused by the interface of technology and business. This requirement of the companies is perfectly satisfied by MCA graduates.",
    ],
  },
  {
    slug: "o-level",
    level: "diploma-courses",
    levelLabel: "Diploma",
    kind: "Diploma Course",
    title: "'O' Level",
    fullName: "NIELIT 'O' Level Course",
    awarding: "NIELIT (formerly DOEACC Society)",
    intro: [
      "The objective of the NIELIT 'O' Level Course is to enable students to acquire fundamental knowledge and skills in Information Technology. The course covers various areas of IT, including IT Tools and Business Systems, Internet Technology and Web Design, Programming and Problem Solving through 'C' Language, Application of .NET Technology, Introduction to Multimedia, ICT Resources, Practical Training, and Project Work.",
      "To meet the requirements of the growing IT industry, the NIELIT 'O' Level Course has been designed to develop essential technical skills and provide students with a strong foundation in Information Technology.",
      "The NIELIT 'O' Level Course consists of four theory modules (three compulsory modules and one elective module), one practical examination, and one project work.",
    ],
    note: "The detailed module-wise syllabus table was not published on the reference page. Contact the institute or visit NIELIT for the current R-series syllabus.",
  },
  {
    slug: "a-level",
    level: "diploma-courses",
    levelLabel: "Diploma",
    kind: "Diploma Course",
    title: "'A' Level",
    fullName: "NIELIT 'A' Level Course",
    duration: "1½ years (semester system)",
    eligibility: "'O' Level qualifiers OR any graduates OR a government-recognised Polytechnic Engineering Diploma after Class X/XII (no concurrency).",
    awarding: "NIELIT (formerly DOEACC Society)",
    intro: [
      "An 'A' Level qualifier is expected to be a key member of a software development team with all-round capabilities to manage and guide a software project. The 'A' Level course has been so designed that a student acquires in-depth knowledge of key areas: computer software, office automation products, developing business system modules using database packages, problem-solving skills using programming languages, computer architecture, software development life cycle, data structures, database management systems, operating systems, practical exposure to UNIX/LINUX, communication principles and computer networking, object-oriented programming using C++/Java, and multimedia applications.",
      "The objective of the course is to prepare candidates for the DOEACC examination by imparting the required knowledge and skills.",
      "Recognition has been given by the Government of India to the DOEACC 'A' Level examination conducted by the DOEACC Society as equivalent to an Advanced Diploma Course in Computer Applications for the purpose of employment to posts and services under the Central Government.",
    ],
    sections: [
      {
        heading: "Career options for NIELIT 'A' Level qualifiers",
        body: [],
        list: ["Programmer", "Web Administrator", "Training Faculty", "Web Content Developer", "Trouble Shooter"],
      },
    ],
    table: {
      head: ["Paper Code", "Subject"],
      rows: [
        ["A1-R4", "IT Tools and Business System"],
        ["A2-R4", "Internet Technology and Web Design"],
        ["A3-R4", "Programming and Problem Solving Through 'C' Language"],
        ["A4-R4", "Computer System Architecture"],
        ["A5-R4", "Structured System Analysis and Design"],
        ["A6-R4", "Data Structures through 'C++'"],
        ["A7-R4", "Introduction to Database Management System"],
        ["A8-R4", "Basics of OS, Unix and Shell Programming"],
        ["A9-R4", "Data Communication and Network Technologies"],
        ["A10-R4", "Elective (one of the following two subjects to be chosen)"],
        ["A10.1-R4", "Introduction to Object-Oriented Programming through Java"],
        ["A10.2-R4", "Software Testing and Quality Management"],
        ["PR-1", "Practical-1 (based on A1, A2, A3, A4 module syllabus)"],
        ["PR-2", "Practical-2 (based on A5, A6, A7, A8, A9, A10 module syllabus)"],
        ["Project", "Project Work"],
      ],
    },
  },
  {
    slug: "caba-mdtp",
    level: "diploma-courses",
    levelLabel: "Diploma",
    kind: "Diploma Course",
    title: "CABA-MDTP",
    fullName: "Diploma in Computer Applications, Business Accounting and Multilingual DTP",
    duration: "1 year",
    awarding: "NCPUL (National Council for Promotion of Urdu Language)",
    intro: [
      "One of the significant initiatives of the Council has been the transformation of the Urdu-speaking population into part of the employable technological workforce in the age of technology and computers. It not only provides job opportunities for Urdu-speaking people but also increases the computer literacy rate of the country. NCPUL launched the one-year course 'Diploma in Computer Applications, Business Accounting and Multilingual DTP' across the country.",
      "To transfer information technology to the language and make Urdu-speaking boys and girls part of the employable technology workforce of India, NCPUL establishes Computer Applications, Business Accounting and Multilingual DTP Centres (CABA-MDTP) across the country. At present, 511 CABA-MDTP centres run in 261 districts of 25 states, in which 24,462 students including 9,784 girls have been admitted. So far 172,934 students have been awarded the diploma in Computer Applications, Business Accounting and Multilingual DTP.",
    ],
  },
  {
    slug: "chm-o-level",
    level: "diploma-courses",
    levelLabel: "Diploma",
    kind: "Diploma Course",
    title: "CHM-O Level",
    fullName: "Certificate in Hardware Maintenance — 'O' Level (CHM-O)",
    eligibility: "10+2 pass or ITI (one year after Class 10), diploma, graduation, post-graduation or doctorate. The CHM-A Level requires CHM-O Level qualification.",
    awarding: "NIELIT",
    intro: [
      "The objective of the CHM-O Level course is to train 10+2, diploma, graduate and other degree qualifiers to acquire basic knowledge in computer hardware and peripherals for installation, troubleshooting and maintenance — including system software management and its backup — and to undertake disaster prevention, diagnosis and rectification of faults, besides personality development and communication skills.",
    ],
  },
  {
    slug: "dsa",
    level: "diploma-courses",
    levelLabel: "Diploma",
    kind: "Diploma Course",
    title: "DSA",
    fullName: "Diploma in Software Applications",
    awarding: "MSITM",
    intro: ["The Diploma in Software Applications (DSA) is a modular, practice-oriented programme covering office tools, accounting, web design and desktop publishing."],
    sections: [
      { heading: "Module 1 — IT Tools & Applications", body: [], list: ["MS Windows 7", "MS Word", "MS Excel", "MS PowerPoint"] },
      {
        heading: "Module 2 — Tally",
        body: [],
        list: ["Fundamentals of Accounting", "Introduction to Tally ERP 9", "Trial Balance", "Inventory Control System", "VAT & GST Introduction"],
      },
      { heading: "Module 3 — Internet & Web Designing", body: [], list: ["Fundamentals of Networks", "Internet", "HTML", "DHTML"] },
      { heading: "Module 4 — Desktop Publishing", body: [], list: ["Hindi Typing", "Adobe Photoshop", "CorelDRAW", "Audio-Video Editor"] },
    ],
  },
  {
    slug: "ccc",
    level: "certificate-courses",
    levelLabel: "Certificate",
    kind: "Certificate Course",
    title: "CCC",
    fullName: "Course on Computer Concepts (CCC)",
    duration: "80 hours — Theory 25 hrs · Tutorials 5 hrs · Practicals 50 hrs (ideally a two-week intensive)",
    eligibility:
      "Candidates sponsored by NIELIT-approved institutes; candidates sponsored by government-recognised schools/colleges with a NIELIT Unique Identity Number; or direct applicants — irrespective of educational qualifications.",
    awarding: "NIELIT",
    intro: [
      "The Course on Computer Concepts (CCC) is designed to provide a basic level of IT literacy to the common man. The program has been developed with the objective of providing an opportunity for individuals to acquire computer literacy and contribute towards increased and faster computer penetration in various areas of life.",
      "After completing the course, learners will be able to use computers for basic activities such as preparing personal and business letters, accessing information through the Internet, sending and receiving emails, creating business presentations, preparing small databases, and performing other day-to-day digital tasks. The course also helps small business communities, homemakers, and other users maintain basic accounts using computers and participate effectively in the world of Information Technology.",
      "The course is designed with a strong focus on practical learning and hands-on computer skills.",
    ],
    sections: [
      {
        heading: "Course modules",
        body: ["The CCC course covers the following modules:"],
        list: [
          "Module 1: Introduction to Computer",
          "Module 2: Introduction to GUI-Based Operating System",
          "Module 3: Elements of Word Processing (LibreOffice Writer)",
          "Module 4: Spreadsheets (LibreOffice Calc)",
          "Module 5: Computer Communication and Internet",
          "Module 6: WWW and Web Browsers",
          "Module 7: Communication and Collaboration",
          "Module 8: Making Small Presentations (LibreOffice Impress)",
          "Module 9: Application of Digital Financial Services",
          "Module 10: Overview of Future Skills and Cyber Security",
        ],
      },
      {
        heading: "Who can conduct the course",
        body: [
          "The education and training for CCC shall be provided by institutions specifically authorized by NIELIT to conduct CCC courses. Additionally, candidates may opt for self-learning and apply as direct candidates for appearing in the CCC examination conducted by NIELIT.",
        ],
      },
    ],
  },
  {
    slug: "english-academy",
    level: "certificate-courses",
    levelLabel: "Certificate",
    kind: "Certificate Course",
    title: "English Academy",
    fullName: "English Language Training — English Academy at MSITM",
    awarding: "MSITM",
    intro: [
      "English Academy, a vocational training centre, is now all set to provide quality training in the English language to every kind of curious learner coming from various walks of life. In this new age, a candidate is not merely rated on the basis of their academic or professional qualification — how impressively you can exchange words with others is one of the most crucial factors.",
      "English Academy offers very specific course modules for specific classes. Our aim is to educate everyone and enhance their understanding efficacy with advanced knowledge and its application. Our objective is to give you a strong platform where you can level yourself to the cutting edge.",
      "The trainee-friendly aura at MSITM promises to fetch all exactly what they are promised at the time of admission.",
    ],
  },
  {
    slug: "tally-master",
    level: "certificate-courses",
    levelLabel: "Certificate",
    kind: "Certificate Course",
    title: "Tally Master",
    fullName: "Tally Master — Computerised Accounting",
    awarding: "MSITM",
    intro: ["Tally Master is MSITM's certificate programme in computerised accounting with Tally."],
    note: "The reference page published only the course title. Detailed syllabus, duration and fee information is available from the institute office — please send an enquiry and the admissions team will respond within one business day.",
  },
  {
    slug: "wdt",
    level: "certificate-courses",
    levelLabel: "Certificate",
    kind: "Certificate Course",
    title: "WDT",
    fullName: "Website Development Training (WDT)",
    duration: "10 weeks",
    eligibility: "Class 10th & above",
    awarding: "MSITM",
    intro: ["WDT — Website Development Training — is a 10-week certificate course open to students of Class 10th and above, covering the practical foundations of building websites."],
  },
  {
    slug: "dtp",
    level: "certificate-courses",
    levelLabel: "Certificate",
    kind: "Certificate Course",
    title: "DTP",
    fullName: "Desktop and Media Publishing (DTP)",
    duration: "10 weeks",
    eligibility: "Class 8th & above",
    awarding: "MSITM",
    intro: ["DTP — Desktop and Media Publishing — is a 10-week certificate course open to students of Class 8th and above, covering design and publishing for print and media."],
  },
  {
    slug: "ccn",
    level: "certificate-courses",
    levelLabel: "Certificate",
    kind: "Certificate Course",
    title: "CCN",
    fullName: "Certificate Course on Computer Networks (CCN)",
    duration: "6 weeks",
    eligibility: "Class 10th & above",
    awarding: "MSITM",
    intro: ["CCN — the Certificate Course on Computer Networks — is a 6-week programme open to students of Class 10th and above, introducing the fundamentals of computer networking."],
  },
  {
    slug: "cpt",
    level: "certificate-courses",
    levelLabel: "Certificate",
    kind: "Certificate Course",
    title: "CPT",
    fullName: "Certificate Program on Computer Typing (CPT)",
    eligibility: "Class 10",
    awarding: "MSITM",
    intro: ["CPT — the Certificate Program on Computer Typing — builds accurate, professional typing skills. Eligibility: Class 10."],
  },
  {
    slug: "course-on-net",
    level: "certificate-courses",
    levelLabel: "Certificate",
    kind: "Certificate Course",
    title: "Course on .NET",
    fullName: "Course on .NET",
    duration: "6 weeks",
    eligibility: "Class 12th & above",
    awarding: "MSITM",
    intro: ["The Course on .NET is a 6-week certificate programme open to students of Class 12th and above, introducing application development on Microsoft's .NET platform."],
  },
  {
    slug: "course-on-oracle",
    level: "certificate-courses",
    levelLabel: "Certificate",
    kind: "Certificate Course",
    title: "Course on Oracle",
    fullName: "Course on Oracle",
    duration: "6 weeks",
    eligibility: "Class 12th & above",
    awarding: "MSITM",
    intro: ["The Course on Oracle is a 6-week certificate programme open to students of Class 12th and above, introducing Oracle database concepts and SQL."],
  },
  {
    slug: "course-on-c",
    level: "certificate-courses",
    levelLabel: "Certificate",
    kind: "Certificate Course",
    title: "Course on C++",
    fullName: "Course on C++",
    duration: "6 weeks",
    eligibility: "Class 12th & above",
    awarding: "MSITM",
    intro: ["The Course on C++ is a 6-week certificate programme open to students of Class 12th and above, covering programming fundamentals and object-oriented programming in C++."],
  },
  {
    slug: "course-on-java",
    level: "certificate-courses",
    levelLabel: "Certificate",
    kind: "Certificate Course",
    title: "Course on Java",
    fullName: "Course on Java",
    duration: "6 weeks",
    eligibility: "Class 12th & above",
    awarding: "MSITM",
    intro: ["The Course on Java is a 6-week certificate programme open to students of Class 12th and above, covering programming fundamentals and object-oriented programming in Java."],
  },
  {
    slug: "laptop-mobile-reparing",
    level: "certificate-courses",
    levelLabel: "Certificate",
    kind: "Certificate Course",
    title: "Laptop / Mobile Repairing",
    fullName: "Laptop / Mobile Repairing & Troubleshooting",
    duration: "10 weeks",
    eligibility: "Class 10th & above",
    awarding: "MSITM",
    intro: ["Laptop / Mobile Repairing & Troubleshooting is a 10-week certificate course open to students of Class 10th and above, covering diagnosis, repair and maintenance of laptops and mobile phones."],
  },
];

export function courseHref(c: Course): string {
  return `/courses/${c.level}/${c.slug}`;
}

export function coursesByLevel(level: Course["level"]): Course[] {
  return COURSES.filter((c) => c.level === level);
}
