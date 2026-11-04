/** Faculty records migrated from the reference website. */

export interface FacultyMember {
  name: string;
  title?: string;
  qualification: string;
  specialization: string;
}

export interface FacultyGroup {
  slug: string;
  title: string;
  heading: string;
  intro: string;
  members: FacultyMember[];
}

export const FACULTY_GROUPS: FacultyGroup[] = [
  {
    slug: "it-faculty",
    title: "IT Faculty",
    heading: "IT Faculty & Experts",
    intro:
      "Our IT faculty combines academic qualifications with hands-on expertise across programming, networking, databases and emerging technologies.",
    members: [
      {
        name: "Vibhooti Mani Tripathi",
        title: "Assistant Professor",
        qualification: "B.Sc., MCA, PGDCA, 'O' Level",
        specialization: "Networking, Database, Python, C++",
      },
      {
        name: "Akhilesh Kumar Pathak",
        qualification: "MCA, 'O' Level, 'A' Level, CCC, M.A. (Economics)",
        specialization: "Language trainer — Java, Python, C, C++; web development — HTML, CSS, JavaScript",
      },
      {
        name: "Raghuvendra Pandey",
        qualification: "MCA (Master of Computer Applications)",
        specialization: "Soft Computing, Computer Graphics, DAA, Web Technology, IoT (Internet of Things)",
      },
      {
        name: "Mohd Talib",
        title: "IT Faculty",
        qualification: "M.C.A., M.A. (Education), B.Ed., CTET, 'O' Level, CCC, Certification in DTP, Certification in Adobe",
        specialization: "IT Tools, Web Development, Desktop Publishing",
      },
      {
        name: "Arif Ali",
        title: "Hardware Assistant",
        qualification: "B.Sc., 'O' Level",
        specialization: "Hardware security, troubleshooting and networking; online examination management",
      },
      {
        name: "Javed Alam",
        title: "Technical Support",
        qualification: "Pursuing Graduation, Diploma in Computer Hardware Maintenance",
        specialization: "Windows installation, troubleshooting and network management",
      },
    ],
  },
  {
    slug: "management-faculty",
    title: "Management Faculty",
    heading: "Management Faculty",
    intro:
      "Our management faculty brings together expertise in finance, marketing, human resources, operations and business law.",
    members: [
      {
        name: "Monika Tandon",
        title: "Assistant Professor",
        qualification: "B.Sc., 'A' Level, 'B' Level, MCA, DIM, PGDIM (IGNOU), MBA (GBTU), DNYS",
        specialization: "IT & HR, Operations Management, DBMS, Web Technologies",
      },
      {
        name: "Mr. Mohd. Firoz Khan",
        title: "Financial Analyst",
        qualification: "B.Com., M.B.A., L.L.B.",
        specialization: "Accounts & Taxation",
      },
      {
        name: "Mr. Ibarat Ali",
        title: "Maths Faculty",
        qualification: "M.Sc. (Mathematics), B.Ed., CTET",
        specialization: "Mathematics, Statistics",
      },
      {
        name: "Mrs. Urfi Begum",
        title: "Assistant Professor (Management Faculty)",
        qualification: "MBA, UGC NET",
        specialization: "Marketing Management, Sales Management, Advertising Management, Industrial Law, Entrepreneurship and Small Business Development",
      },
      {
        name: "Muddassir Alam",
        title: "Management Faculty",
        qualification: "BBA, MBA",
        specialization: "Finance and Human Resource",
      },
      {
        name: "Shalu Yadav",
        qualification: "B.Com., M.Com., B.Ed.",
        specialization: "Accounting and Finance",
      },
    ],
  },
  {
    slug: "diploma-department",
    title: "Diploma Department",
    heading: "Diploma Faculty",
    intro: "Faculty serving the diploma programmes — from NIELIT 'O'/'A' Level to CABA-MDTP and software applications.",
    members: [
      {
        name: "Mohd Talib",
        title: "IT Faculty",
        qualification: "M.C.A., M.A. (Education), B.Ed., CTET, 'O' Level, CCC, Certification in DTP, Certification in Adobe",
        specialization: "IT Tools, Web Development, Desktop Publishing",
      },
      {
        name: "Vishal Shukla",
        title: "IT Teacher",
        qualification: "M.C.A., B.Sc. (Mathematics), CCC & BCC",
        specialization: "Computer Programming, Database, Web Development, Machine Learning, Data Analytics & Data Science",
      },
    ],
  },
  {
    slug: "hardware-department",
    title: "Hardware Department",
    heading: "Hardware Department",
    intro: "The team that keeps MSITM's 250+ computer systems, networks and examination infrastructure running.",
    members: [
      {
        name: "Mr. Arif Ali",
        title: "Hardware Assistant · Hardware Engineer",
        qualification: "B.Sc., 'O' Level",
        specialization: "Hardware security, troubleshooting and networking; online examination management",
      },
      {
        name: "Javed Alam",
        title: "Lab Technician · Hardware Engineer Assistant",
        qualification: "Pursuing Graduation, Diploma in Computer Hardware Maintenance",
        specialization: "Windows installation, troubleshooting and network management; application technical support",
      },
    ],
  },
  {
    slug: "registration-department",
    title: "Registration Department",
    heading: "Registration Department",
    intro: "Our registration team assists students with admissions, enrolment and official documentation.",
    members: [
      { name: "Mr. Noor Ali", qualification: "B.A.", specialization: "Student registration & records" },
      { name: "Mrs. Poonam Rastogi", qualification: "M.A., B.Lib.", specialization: "Student registration & records" },
    ],
  },
  {
    slug: "online-guest-faculty",
    title: "Online Guest Faculty",
    heading: "Online Guest Faculty",
    intro: "Visiting experts who mentor MSITM students online from academia and industry.",
    members: [
      {
        name: "Ausaf Ahmad",
        title: "Guest Faculty",
        qualification: "Assistant Professor, Dept. of Computer Science & Engineering, Institute of Technology and Management, Gorakhpur",
        specialization: "Computer Science & Engineering",
      },
      {
        name: "Tanveer Alam Khan",
        title: "Guest Faculty",
        qualification: "Web Developer, Bin Laden Group, Dubai",
        specialization: "Web Development (industry practice)",
      },
    ],
  },
];

export function facultyGroup(slug: string): FacultyGroup | undefined {
  return FACULTY_GROUPS.find((g) => g.slug === slug);
}
