import crypto from "node:crypto";
import { and, eq, or, sql } from "drizzle-orm";
import { db } from "@/db";
import { admissions, portalUsers, students } from "@/db/schema";
import { hashPassword, verifyPassword } from "@/lib/portal-auth";
import { normalizeSpreadsheetDate } from "@/lib/excel-io";
import type {
  AdmitCardRecord,
  AssignmentRecord,
  AssignmentSubmissionRecord,
  AttendanceRecordItem,
  BulkImportRowReport,
  CertificateRequestRecord,
  ExamScheduleItem,
  ExamSessionRecord,
  FacultyAllocationRecord,
  FeePaymentRecord,
  FeeStructureRecord,
  GatePassRecord,
  GrievanceRecord,
  LabTicketRecord,
  LibraryIssueRecord,
  PlacementDriveRecord,
  PortalRole,
  PortalSession,
  SemesterResultRecord,
  StaffLeaveRecord,
  StaffUserSummary,
  StudentPortalSnapshot,
  StudentRecord,
  SubjectGradeItem,
  TimetableSlotRecord,
  UgNoticeRecord,
  VerificationLookupResult,
} from "@/lib/portal-types";

export interface PortalUserRow {
  id: number;
  username: string;
  email?: string;
  passwordHash: string;
  role: PortalRole;
  displayName: string;
  tokenVersion?: number;
  active: boolean;
}

interface AdmissionLeadRow {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  course: string;
  qualification: string | null;
  city: string | null;
  createdAt: string;
}

const STORE_SCHEMA_VERSION = 3;

export interface PortalStoreState {
  storeVersion: number;
  dbMode: "demo";
  nextId: number;
  users: PortalUserRow[];
  students: StudentRecord[];
  feeStructures: FeeStructureRecord[];
  feePayments: FeePaymentRecord[];
  attendance: AttendanceRecordItem[];
  examSessions: ExamSessionRecord[];
  admitCards: AdmitCardRecord[];
  gatePasses: GatePassRecord[];
  certificates: CertificateRequestRecord[];
  notices: UgNoticeRecord[];
  admissionLeads: AdmissionLeadRow[];
  timetable: TimetableSlotRecord[];
  assignments: AssignmentRecord[];
  submissions: AssignmentSubmissionRecord[];
  results: SemesterResultRecord[];
  facultyAllocations: FacultyAllocationRecord[];
  staffLeaves: StaffLeaveRecord[];
  libraryIssues: LibraryIssueRecord[];
  labTickets: LabTicketRecord[];
  grievances: GrievanceRecord[];
  placementDrives: PlacementDriveRecord[];
}

function makeCode(prefix: string): string {
  return `${prefix}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

function makePassCode(): string {
  const digits = crypto.randomInt(100000, 999999);
  return `GP${digits}`;
}

function buildSeedState(): PortalStoreState {
  const demoPassHash = hashPassword("msitm@2026");

  const users: PortalUserRow[] = [
    { id: 1, username: "MSITM-BCA-2024-014", email: "ananya.verma@student.msitm.edu.in", passwordHash: demoPassHash, role: "student", displayName: "Ananya Verma", tokenVersion: 1, active: true },
    { id: 2, username: "MSITM-BBA-2025-008", email: "rohan.tiwari@student.msitm.edu.in", passwordHash: demoPassHash, role: "student", displayName: "Rohan Tiwari", tokenVersion: 1, active: true },
    { id: 3, username: "MSITM-BCA-2023-031", email: "arjun.mishra@student.msitm.edu.in", passwordHash: demoPassHash, role: "student", displayName: "Arjun Mishra", tokenVersion: 1, active: true },
    { id: 4, username: "admin", email: "admin@msitm.edu.in", passwordHash: demoPassHash, role: "admin", displayName: "Dr. Principal / Office Admin", tokenVersion: 1, active: true },
    { id: 5, username: "accounts", email: "accounts@msitm.edu.in", passwordHash: demoPassHash, role: "accounts", displayName: "Accounts & Fee Office", tokenVersion: 1, active: true },
    { id: 6, username: "examcell", email: "examcell@msitm.edu.in", passwordHash: demoPassHash, role: "exam_cell", displayName: "Controller of Examinations", tokenVersion: 1, active: true },
    { id: 7, username: "faculty", email: "faculty@msitm.edu.in", passwordHash: demoPassHash, role: "faculty", displayName: "UG Coordinator / HOD", tokenVersion: 1, active: true },
    { id: 8, username: "guard", email: "guard@msitm.edu.in", passwordHash: demoPassHash, role: "gate_guard", displayName: "Main Campus Gate Security", tokenVersion: 1, active: true },
  ];

  const seededStudents: StudentRecord[] = [
    {
      id: 1,
      userId: 1,
      enrollmentNo: "MSITM-BCA-2024-014",
      universityRollNo: "241084014",
      fullName: "Ananya Verma",
      fatherName: "Shri Rajesh Kumar Verma",
      course: "BCA",
      batch: "2024–27",
      semester: 4,
      section: "A",
      dob: "2006-04-12",
      phone: "+91-9415011223",
      guardianPhone: "+91-9415011200",
      email: "ananya.verma@student.msitm.edu.in",
      bloodGroup: "B+",
      idVerificationCode: "MSITM-ID-BCA24014",
      status: "active",
    },
    {
      id: 2,
      userId: 2,
      enrollmentNo: "MSITM-BBA-2025-008",
      universityRollNo: "251042008",
      fullName: "Rohan Tiwari",
      fatherName: "Shri Arvind Tiwari",
      course: "BBA",
      batch: "2025–28",
      semester: 2,
      section: "A",
      dob: "2007-08-24",
      phone: "+91-9839022334",
      guardianPhone: "+91-9839022300",
      email: "rohan.tiwari@student.msitm.edu.in",
      bloodGroup: "O+",
      idVerificationCode: "MSITM-ID-BBA25008",
      status: "active",
    },
    {
      id: 3,
      userId: 3,
      enrollmentNo: "MSITM-BCA-2023-031",
      universityRollNo: "231084031",
      fullName: "Arjun Mishra",
      fatherName: "Shri Pradeep Mishra",
      course: "BCA",
      batch: "2023–26",
      semester: 6,
      section: "A",
      dob: "2005-11-05",
      phone: "+91-9794033445",
      guardianPhone: "+91-9794033400",
      email: "arjun.mishra@student.msitm.edu.in",
      bloodGroup: "A+",
      idVerificationCode: "MSITM-ID-BCA23031",
      status: "active",
    },
    {
      id: 4,
      userId: null,
      enrollmentNo: "MSITM-BCA-2026-001",
      universityRollNo: "261084001",
      fullName: "Vikramaditya Singh",
      fatherName: "Shri Mahendra Pratap Singh",
      course: "BCA",
      batch: "2026–29",
      semester: 1,
      section: "A",
      dob: "2007-08-15",
      phone: "+91-9450123456",
      guardianPhone: "+91-9450987654",
      email: null,
      bloodGroup: "B+",
      idVerificationCode: "MSITM-ID-BCA26001",
      status: "active",
    },
  ];

  const seededFeeStructures: FeeStructureRecord[] = [
    { id: 1, course: "BCA", semester: 4, academicYear: "2026–27", tuitionFee: 14500, labFee: 3000, examFee: 2000, libraryFee: 500, totalFee: 20000, dueDate: "2026-10-15" },
    { id: 2, course: "BBA", semester: 2, academicYear: "2026–27", tuitionFee: 15000, labFee: 1000, examFee: 2000, libraryFee: 500, totalFee: 18500, dueDate: "2026-10-15" },
    { id: 3, course: "BCA", semester: 6, academicYear: "2026–27", tuitionFee: 14500, labFee: 3000, examFee: 2500, libraryFee: 500, totalFee: 20500, dueDate: "2026-10-15" },
  ];

  const seededPayments: FeePaymentRecord[] = [
    {
      id: 1,
      studentId: 1,
      semester: 4,
      amountPaid: 20000,
      concession: 0,
      paymentMode: "UPI",
      transactionRef: "UPI/6289104431",
      receiptNo: "MSITM/FEE/2026-27/1042",
      verificationToken: "MSITM-FEE-1042A",
      recordedBy: "Accounts & Fee Office",
      remarks: "Full Semester IV fee received",
      paidAt: "2026-10-08T11:20:00Z",
    },
    {
      id: 2,
      studentId: 2,
      semester: 2,
      amountPaid: 12000,
      concession: 0,
      paymentMode: "Cash",
      transactionRef: "COUNTER-2026-883",
      receiptNo: "MSITM/FEE/2026-27/1048",
      verificationToken: "MSITM-FEE-1048B",
      recordedBy: "Accounts & Fee Office",
      remarks: "First installment paid; balance ₹6,500 due before exams",
      paidAt: "2026-10-11T14:05:00Z",
    },
    {
      id: 3,
      studentId: 3,
      semester: 6,
      amountPaid: 20500,
      concession: 0,
      paymentMode: "NEFT",
      transactionRef: "SBIN2629100342",
      receiptNo: "MSITM/FEE/2026-27/1051",
      verificationToken: "MSITM-FEE-1051C",
      recordedBy: "Accounts & Fee Office",
      remarks: "Full Semester VI fee received",
      paidAt: "2026-10-12T10:15:00Z",
    },
  ];

  const seededAttendance: AttendanceRecordItem[] = [
    // Student 1: BCA Sem 4 (84% overall)
    { id: 1, studentId: 1, semester: 4, subjectCode: "BCA-401", subjectName: "Java Programming", totalClasses: 38, attendedClasses: 32, medicalLeaves: 1, internalMarks: 22, maxInternalMarks: 25 },
    { id: 2, studentId: 1, semester: 4, subjectCode: "BCA-402", subjectName: "Computer Networks", totalClasses: 36, attendedClasses: 30, medicalLeaves: 0, internalMarks: 21, maxInternalMarks: 25 },
    { id: 3, studentId: 1, semester: 4, subjectCode: "BCA-403", subjectName: "Software Engineering", totalClasses: 34, attendedClasses: 29, medicalLeaves: 0, internalMarks: 23, maxInternalMarks: 25 },
    { id: 4, studentId: 1, semester: 4, subjectCode: "BCA-404P", subjectName: "Web Design & Java Lab", totalClasses: 28, attendedClasses: 24, medicalLeaves: 0, internalMarks: 24, maxInternalMarks: 25 },
    // Student 2: BBA Sem 2 (79% overall)
    { id: 5, studentId: 2, semester: 2, subjectCode: "BBA-201", subjectName: "Organisational Behaviour", totalClasses: 34, attendedClasses: 27, medicalLeaves: 0, internalMarks: 20, maxInternalMarks: 25 },
    { id: 6, studentId: 2, semester: 2, subjectCode: "BBA-202", subjectName: "Financial Accounting", totalClasses: 36, attendedClasses: 28, medicalLeaves: 1, internalMarks: 19, maxInternalMarks: 25 },
    { id: 7, studentId: 2, semester: 2, subjectCode: "BBA-203", subjectName: "Macroeconomics", totalClasses: 32, attendedClasses: 26, medicalLeaves: 0, internalMarks: 21, maxInternalMarks: 25 },
    { id: 8, studentId: 2, semester: 2, subjectCode: "BBA-204", subjectName: "Computer Applications in Mgmt", totalClasses: 30, attendedClasses: 23, medicalLeaves: 0, internalMarks: 22, maxInternalMarks: 25 },
    // Student 3: BCA Sem 6 (68% overall - attendance warning)
    { id: 9, studentId: 3, semester: 6, subjectCode: "BCA-601", subjectName: "Cloud & Information Security", totalClasses: 34, attendedClasses: 23, medicalLeaves: 0, internalMarks: 18, maxInternalMarks: 25 },
    { id: 10, studentId: 3, semester: 6, subjectCode: "BCA-602", subjectName: "Software Project & Viva", totalClasses: 28, attendedClasses: 19, medicalLeaves: 0, internalMarks: 20, maxInternalMarks: 25 },
  ];

  const seededSessions: ExamSessionRecord[] = [
    {
      id: 1,
      title: "BCA Semester IV End-Semester Examination — 2026–27",
      course: "BCA",
      semester: 4,
      examType: "University",
      examCentre: "MSITM Degree College Block-A, Gonda",
      minAttendancePct: 75,
      active: true,
      schedules: [
        { id: 1, examSessionId: 1, subjectCode: "BCA-401", subjectName: "Java Programming", examDate: "2026-11-24", shiftTime: "10:00 AM – 01:00 PM", roomNo: "Hall-101" },
        { id: 2, examSessionId: 1, subjectCode: "BCA-402", subjectName: "Computer Networks", examDate: "2026-11-26", shiftTime: "10:00 AM – 01:00 PM", roomNo: "Hall-101" },
        { id: 3, examSessionId: 1, subjectCode: "BCA-403", subjectName: "Software Engineering", examDate: "2026-11-28", shiftTime: "10:00 AM – 01:00 PM", roomNo: "Hall-102" },
        { id: 4, examSessionId: 1, subjectCode: "BCA-404P", subjectName: "Web Design & Java Practical", examDate: "2026-12-01", shiftTime: "09:30 AM – 12:30 PM", roomNo: "Comp Lab-1" },
      ],
    },
    {
      id: 2,
      title: "BBA Semester II End-Semester Examination — 2026–27",
      course: "BBA",
      semester: 2,
      examType: "University",
      examCentre: "MSITM Degree College Block-B, Gonda",
      minAttendancePct: 75,
      active: true,
      schedules: [
        { id: 5, examSessionId: 2, subjectCode: "BBA-201", subjectName: "Organisational Behaviour", examDate: "2026-11-25", shiftTime: "02:00 PM – 05:00 PM", roomNo: "Hall-201" },
        { id: 6, examSessionId: 2, subjectCode: "BBA-202", subjectName: "Financial Accounting", examDate: "2026-11-27", shiftTime: "02:00 PM – 05:00 PM", roomNo: "Hall-201" },
        { id: 7, examSessionId: 2, subjectCode: "BBA-203", subjectName: "Macroeconomics", examDate: "2026-11-29", shiftTime: "02:00 PM – 05:00 PM", roomNo: "Hall-202" },
        { id: 8, examSessionId: 2, subjectCode: "BBA-204", subjectName: "Computer Applications in Mgmt", examDate: "2026-12-02", shiftTime: "02:00 PM – 05:00 PM", roomNo: "Comp Lab-2" },
      ],
    },
    {
      id: 3,
      title: "BCA Semester VI Final Examination — 2026–27",
      course: "BCA",
      semester: 6,
      examType: "University",
      examCentre: "MSITM Degree College Block-A, Gonda",
      minAttendancePct: 75,
      active: true,
      schedules: [
        { id: 9, examSessionId: 3, subjectCode: "BCA-601", subjectName: "Cloud & Information Security", examDate: "2026-11-25", shiftTime: "10:00 AM – 01:00 PM", roomNo: "Hall-103" },
        { id: 10, examSessionId: 3, subjectCode: "BCA-602", subjectName: "Major Project Evaluation & Viva", examDate: "2026-12-03", shiftTime: "10:00 AM – 01:00 PM", roomNo: "Seminar Hall" },
      ],
    },
  ];

  const seededAdmitCards: AdmitCardRecord[] = [
    {
      id: 1,
      studentId: 1,
      examSessionId: 1,
      examFormVerified: true,
      overrideApproved: false,
      overrideReason: "",
      isReleased: true,
      verificationToken: "MSITM-ADM-BCA4014",
      issuedAt: "2026-11-05T09:00:00Z",
    },
    {
      id: 2,
      studentId: 2,
      examSessionId: 2,
      examFormVerified: true,
      overrideApproved: false,
      overrideReason: "",
      isReleased: true,
      verificationToken: "MSITM-ADM-BBA2008",
      issuedAt: null,
    },
    {
      id: 3,
      studentId: 3,
      examSessionId: 3,
      examFormVerified: true,
      overrideApproved: false,
      overrideReason: "",
      isReleased: true,
      verificationToken: "MSITM-ADM-BCA6031",
      issuedAt: null,
    },
  ];

  const seededGatePasses: GatePassRecord[] = [
    {
      id: 1,
      studentId: 1,
      passCode: "GP482190",
      verificationToken: "MSITM-GP-482190",
      passType: "sick_leave",
      reason: "Fever & severe headache during afternoon lab",
      symptomsOrNotes: "Spoke with guardian on registered phone; cleared for home rest.",
      guardianPhone: "+91-9415011200",
      guardianNotified: true,
      requestedExitAt: "2026-11-08 01:30 PM",
      validUntil: "2026-11-08 02:15 PM",
      status: "checked_out",
      approvedBy: "UG Coordinator / HOD",
      rejectionReason: "",
      checkedOutAt: "2026-11-08T08:08:00Z",
      returnedAt: null,
      createdAt: "2026-11-08T07:55:00Z",
    },
    {
      id: 2,
      studentId: 2,
      passCode: "GP773105",
      verificationToken: "MSITM-GP-773105",
      passType: "sick_leave",
      reason: "Stomach pain & dizziness after second lecture",
      symptomsOrNotes: "Requesting early leave to visit doctor with parent.",
      guardianPhone: "+91-9839022300",
      guardianNotified: false,
      requestedExitAt: "Today, 12:30 PM",
      validUntil: "",
      status: "pending",
      approvedBy: "",
      rejectionReason: "",
      checkedOutAt: null,
      returnedAt: null,
      createdAt: new Date().toISOString(),
    },
  ];

  const seededCertificates: CertificateRequestRecord[] = [
    {
      id: 1,
      studentId: 1,
      certType: "bonafide",
      purpose: "UP Post-Matric Scholarship Renewal 2026–27",
      accountsCleared: true,
      libraryCleared: true,
      labCleared: true,
      status: "ready",
      referenceNo: "MSITM/CERT/2026/0214",
      createdAt: "2026-11-02T10:30:00Z",
    },
  ];

  const seededNotices: UgNoticeRecord[] = [
    {
      id: 1,
      title: "University End-Semester Examination Schedule Published (BCA & BBA)",
      courseScope: "ALL",
      semesterScope: 0,
      category: "Exam",
      body: "Admit cards are downloadable through the Student Portal once semester fee dues and minimum 75% attendance eligibility are verified.",
      publishedAt: "2026-11-04T09:00:00Z",
    },
    {
      id: 2,
      title: "BCA Semester IV & VI Practical File & Major Project Submission Window",
      courseScope: "BCA",
      semesterScope: 0,
      category: "Academic",
      body: "All BCA students must complete lab record sign-offs with IT Faculty at Computer Lab-1 prior to practical viva dates.",
      publishedAt: "2026-11-06T11:30:00Z",
    },
    {
      id: 3,
      title: "UP Scholarship & Fee Balance Clearance Notice — BBA Semester II",
      courseScope: "BBA",
      semesterScope: 2,
      category: "Fee",
      body: "Students with pending second-installment fee balances are advised to clear dues at the Accounts Office before 18 November to avoid admit card holds.",
      publishedAt: "2026-11-07T13:00:00Z",
    },
  ];

  const seededTimetable: TimetableSlotRecord[] = [
    { id: 1, course: "BCA", semester: 4, dayOfWeek: "Mon", slotTime: "09:30 – 10:30 AM", subjectCode: "BCA-401", subjectName: "DBMS & SQL", roomOrLab: "Hall 102", facultyName: "Dr. R. K. Shukla" },
    { id: 2, course: "BCA", semester: 4, dayOfWeek: "Mon", slotTime: "10:30 – 12:30 PM", subjectCode: "BCA-405", subjectName: "DBMS & Web Lab", roomOrLab: "Computer Lab 1", facultyName: "Er. S. K. Pandey" },
    { id: 3, course: "BCA", semester: 4, dayOfWeek: "Tue", slotTime: "09:30 – 10:30 AM", subjectCode: "BCA-402", subjectName: "Operating Systems", roomOrLab: "Hall 102", facultyName: "Er. Neha Gupta" },
    { id: 4, course: "BCA", semester: 4, dayOfWeek: "Wed", slotTime: "11:30 – 12:30 PM", subjectCode: "BCA-403", subjectName: "Software Engineering", roomOrLab: "Hall 104", facultyName: "Dr. R. K. Shukla" },
    { id: 5, course: "BCA", semester: 4, dayOfWeek: "Thu", slotTime: "10:30 – 12:30 PM", subjectCode: "BCA-404", subjectName: "Optimization & Web Stack", roomOrLab: "Computer Lab 2", facultyName: "Er. S. K. Pandey" },
    { id: 6, course: "BCA", semester: 4, dayOfWeek: "Fri", slotTime: "09:30 – 11:30 AM", subjectCode: "BCA-401", subjectName: "Case Study & Coding Viva", roomOrLab: "Computer Lab 1", facultyName: "Er. S. K. Pandey" },
    { id: 7, course: "BCA", semester: 4, dayOfWeek: "Sat", slotTime: "10:00 – 12:00 PM", subjectCode: "BCA-SEC", subjectName: "Aptitude & Placement Training", roomOrLab: "Auditorium", facultyName: "Placement Cell" },
    { id: 8, course: "BBA", semester: 2, dayOfWeek: "Mon", slotTime: "09:30 – 10:30 AM", subjectCode: "BBA-201", subjectName: "Organizational Behaviour", roomOrLab: "Hall 201", facultyName: "Prof. Alok Mishra" },
    { id: 9, course: "BBA", semester: 2, dayOfWeek: "Tue", slotTime: "10:30 – 11:30 AM", subjectCode: "BBA-202", subjectName: "Business Finance", roomOrLab: "Hall 201", facultyName: "Prof. K. N. Srivastava" },
    { id: 10, course: "BBA", semester: 2, dayOfWeek: "Thu", slotTime: "11:30 – 01:00 PM", subjectCode: "BBA-203", subjectName: "Marketing Research & Survey", roomOrLab: "Seminar Hall", facultyName: "Prof. Alok Mishra" },
    { id: 11, course: "BCA", semester: 6, dayOfWeek: "Mon", slotTime: "10:30 – 01:00 PM", subjectCode: "BCA-601", subjectName: "Major Project & Viva Lab", roomOrLab: "Computer Lab 2", facultyName: "Er. S. K. Pandey" },
    { id: 12, course: "BCA", semester: 6, dayOfWeek: "Wed", slotTime: "09:30 – 11:30 AM", subjectCode: "BCA-602", subjectName: "Cloud Computing & Security", roomOrLab: "Hall 105", facultyName: "Er. Neha Gupta" },
  ];

  const seededAssignments: AssignmentRecord[] = [
    {
      id: 1,
      course: "BCA",
      semester: 4,
      subjectCode: "BCA-405",
      title: "DBMS Normalized Schema & 15 SQL Queries Lab File",
      kind: "BCA Practical",
      dueDate: "2026-11-20",
      resourceUrl: "/courses/undergraduate-courses/bca",
      instructions: "Upload GitHub/Drive link of tested ER diagram & SQL scripts and bring bound practical record to Lab-1.",
      createdBy: "Er. S. K. Pandey (IT Faculty)",
      createdAt: "2026-11-05T10:00:00Z",
    },
    {
      id: 2,
      course: "BCA",
      semester: 4,
      subjectCode: "BCA-402",
      title: "CPU Scheduling & Deadlock Avoidance Unit Notes",
      kind: "Study Notes",
      dueDate: "2026-11-30",
      resourceUrl: "/facilities/library",
      instructions: "Reference notes & solved numericals for Semester IV sessional & university theory examination.",
      createdBy: "Er. Neha Gupta (CS Dept)",
      createdAt: "2026-11-06T12:00:00Z",
    },
    {
      id: 3,
      course: "BBA",
      semester: 2,
      subjectCode: "BBA-203",
      title: "Gonda Retail Market Survey & Consumer Field Report",
      kind: "BBA Internship",
      dueDate: "2026-11-24",
      resourceUrl: "/courses/undergraduate-courses/bba",
      instructions: "Submit summary findings from 20 local enterprise interviews in Gonda Sadar / Station Road.",
      createdBy: "Prof. Alok Mishra (Management Dept)",
      createdAt: "2026-11-07T09:30:00Z",
    },
    {
      id: 4,
      course: "BCA",
      semester: 6,
      subjectCode: "BCA-601",
      title: "Final Year Major Software Project Synopsis & SRS",
      kind: "BCA Practical",
      dueDate: "2026-11-22",
      resourceUrl: "/courses/undergraduate-courses/bca",
      instructions: "Submit team architecture, ER model, and module breakdown prior to external viva schedule.",
      createdBy: "Er. S. K. Pandey (IT Faculty)",
      createdAt: "2026-11-04T11:00:00Z",
    },
  ];

  const seededSubmissions: AssignmentSubmissionRecord[] = [
    {
      id: 1,
      assignmentId: 1,
      studentId: 1,
      submissionNote: "Completed all 15 SQL joins, views, and normalized 3NF schema in PostgreSQL.",
      attachmentRef: "Lab1-File-BCA24014-Signed.pdf",
      marksAwarded: 23,
      maxMarks: 25,
      feedback: "Clean normalization; triggers tested well in Lab-1.",
      status: "evaluated",
      submittedAt: "2026-11-09T14:20:00Z",
    },
    {
      id: 2,
      assignmentId: 3,
      studentId: 2,
      submissionNote: "Submitted 20-respondent consumer survey summary from Gonda market.",
      attachmentRef: "BBA-Survey-RohanTiwari.pdf",
      marksAwarded: null,
      maxMarks: 25,
      feedback: "Pending faculty viva check.",
      status: "submitted",
      submittedAt: "2026-11-10T11:15:00Z",
    },
  ];

  const seededResults: SemesterResultRecord[] = [
    {
      id: 1,
      studentId: 1,
      semester: 3,
      academicYear: "2025–26",
      sgpa: "8.24",
      creditsEarned: 24,
      resultStatus: "Pass",
      backPaperCodes: "",
      verificationToken: "MSITM-RES-BCA403",
      declaredAt: "2026-07-18T12:00:00Z",
      subjectGrades: [
        { code: "BCA-301", name: "Computer Architecture", theoryMarks: 62, internalMarks: 21, maxMarks: 100, grade: "A", credits: 6 },
        { code: "BCA-302", name: "OOP with C++", theoryMarks: 66, internalMarks: 23, maxMarks: 100, grade: "A+", credits: 6 },
        { code: "BCA-303", name: "Operating Systems", theoryMarks: 59, internalMarks: 22, maxMarks: 100, grade: "A", credits: 6 },
        { code: "BCA-304", name: "Computer Practical Lab III", theoryMarks: 70, internalMarks: 24, maxMarks: 100, grade: "O", credits: 6 },
      ],
    },
    {
      id: 2,
      studentId: 1,
      semester: 2,
      academicYear: "2024–25",
      sgpa: "8.05",
      creditsEarned: 24,
      resultStatus: "Pass",
      backPaperCodes: "",
      verificationToken: "MSITM-RES-BCA402",
      declaredAt: "2025-07-12T12:00:00Z",
      subjectGrades: [
        { code: "BCA-201", name: "Data Structures using C", theoryMarks: 60, internalMarks: 21, maxMarks: 100, grade: "A", credits: 6 },
        { code: "BCA-202", name: "Digital Electronics", theoryMarks: 58, internalMarks: 20, maxMarks: 100, grade: "B+", credits: 6 },
      ],
    },
    {
      id: 3,
      studentId: 2,
      semester: 1,
      academicYear: "2025–26",
      sgpa: "6.85",
      creditsEarned: 20,
      resultStatus: "Back Paper",
      backPaperCodes: "BBA-104 (Business Accounting)",
      verificationToken: "MSITM-RES-BBA201",
      declaredAt: "2026-02-20T12:00:00Z",
      subjectGrades: [
        { code: "BBA-101", name: "Principles of Management", theoryMarks: 54, internalMarks: 18, maxMarks: 100, grade: "B+", credits: 6 },
        { code: "BBA-102", name: "Microeconomics", theoryMarks: 51, internalMarks: 17, maxMarks: 100, grade: "B", credits: 6 },
        { code: "BBA-104", name: "Business Accounting", theoryMarks: 21, internalMarks: 15, maxMarks: 100, grade: "F (Back)", credits: 0 },
      ],
    },
    {
      id: 4,
      studentId: 3,
      semester: 5,
      academicYear: "2025–26",
      sgpa: "8.65",
      creditsEarned: 24,
      resultStatus: "Pass",
      backPaperCodes: "",
      verificationToken: "MSITM-RES-BCA605",
      declaredAt: "2026-02-22T12:00:00Z",
      subjectGrades: [
        { code: "BCA-501", name: "Java Programming & JSP", theoryMarks: 68, internalMarks: 23, maxMarks: 100, grade: "O", credits: 6 },
        { code: "BCA-502", name: "Computer Networks", theoryMarks: 64, internalMarks: 22, maxMarks: 100, grade: "A+", credits: 6 },
      ],
    },
  ];

  const seededFacultyAllocations: FacultyAllocationRecord[] = [
    { id: 1, facultyName: "Dr. R. K. Shukla", department: "Computer Science", course: "BCA", semester: 4, subjectCode: "BCA-401", subjectName: "Database Management Systems", syllabusPct: 78, lastTopicCovered: "BCNF & Transaction Concurrency Control", timetableSlot: "Mon & Wed · 09:30 AM" },
    { id: 2, facultyName: "Er. S. K. Pandey", department: "Computer Science", course: "BCA", semester: 4, subjectCode: "BCA-405", subjectName: "DBMS & Web Practical Lab", syllabusPct: 84, lastTopicCovered: "PL/SQL Cursors & Dynamic Triggers", timetableSlot: "Mon & Thu · 10:30 AM" },
    { id: 3, facultyName: "Er. Neha Gupta", department: "Computer Science", course: "BCA", semester: 6, subjectCode: "BCA-602", subjectName: "Cloud Computing & Security", syllabusPct: 72, lastTopicCovered: "IAM Policies & Virtualization Hypervisors", timetableSlot: "Wed · 09:30 AM" },
    { id: 4, facultyName: "Prof. Alok Mishra", department: "Management", course: "BBA", semester: 2, subjectCode: "BBA-201", subjectName: "Organizational Behaviour", syllabusPct: 64, lastTopicCovered: "Motivation Theories & Group Dynamics", timetableSlot: "Mon & Thu · 09:30 AM" },
  ];

  const seededStaffLeaves: StaffLeaveRecord[] = [
    {
      id: 1,
      facultyName: "Er. Neha Gupta",
      leaveType: "Duty",
      fromDate: "2026-11-16",
      toDate: "2026-11-17",
      reason: "External Practical Examiner duty at RMLAU affiliated centre.",
      substituteFaculty: "Dr. R. K. Shukla",
      status: "pending",
      createdAt: "2026-11-10T09:15:00Z",
    },
    {
      id: 2,
      facultyName: "Prof. Alok Mishra",
      leaveType: "Casual",
      fromDate: "2026-11-05",
      toDate: "2026-11-05",
      reason: "Family personal engagement in Lucknow.",
      substituteFaculty: "Prof. K. N. Srivastava",
      status: "approved",
      createdAt: "2026-11-02T11:00:00Z",
    },
  ];

  const seededLibraryIssues: LibraryIssueRecord[] = [
    {
      id: 1,
      studentId: 1,
      accessionNo: "LIB-CS-4092",
      bookTitle: "Database System Concepts (7th Ed.)",
      author: "Silberschatz, Korth & Sudarshan",
      issuedDate: "2026-11-02",
      dueDate: "2026-11-28",
      returnedDate: null,
      fineAmount: 0,
      status: "issued",
    },
    {
      id: 2,
      studentId: 2,
      accessionNo: "LIB-MG-1834",
      bookTitle: "Financial Accounting & Analysis",
      author: "S. M. Shukla",
      issuedDate: "2026-10-04",
      dueDate: "2026-10-25",
      returnedDate: null,
      fineAmount: 120,
      status: "overdue",
    },
    {
      id: 3,
      studentId: 3,
      accessionNo: "LIB-CS-5120",
      bookTitle: "Core Java & Web Enterprise Systems",
      author: "Cay S. Horstmann",
      issuedDate: "2026-09-12",
      dueDate: "2026-09-30",
      returnedDate: "2026-09-29",
      fineAmount: 0,
      status: "returned",
    },
  ];

  const seededLabTickets: LabTicketRecord[] = [
    {
      id: 1,
      labName: "Computer Lab 1",
      workstationCode: "PC-L1-18",
      category: "Software/Compiler",
      description: "PostgreSQL & Node 20 PATH variable missing on Windows profile after update.",
      reportedBy: "Ananya Verma (BCA Sem 4)",
      priority: "Normal",
      status: "in_progress",
      resolutionNote: "Assigned to Hardware Support Wing for evening batch maintenance.",
      createdAt: "2026-11-09T11:45:00Z",
    },
    {
      id: 2,
      labName: "IoT & Hardware Wing",
      workstationCode: "PC-IOT-04",
      category: "Network/Wi-Fi",
      description: "LAN port intermittent link drop during Arduino / ESP32 serial test.",
      reportedBy: "Arjun Mishra (BCA Sem 6)",
      priority: "Urgent",
      status: "open",
      resolutionNote: "",
      createdAt: "2026-11-10T10:30:00Z",
    },
  ];

  const seededGrievances: GrievanceRecord[] = [
    {
      id: 1,
      ticketCode: "MSITM-GRV-101",
      studentId: 1,
      category: "Infrastructure",
      subject: "Drinking water cooler filter servicing on First Floor block",
      details: "First-floor water dispenser flow slowed during afternoon sessions.",
      isAnonymous: false,
      status: "resolved",
      actionTaken: "RO filter cartridge replaced and tested on 08 Nov 2026 by Maintenance Desk.",
      createdAt: "2026-11-06T13:10:00Z",
    },
  ];

  const seededPlacementDrives: PlacementDriveRecord[] = [
    {
      id: 1,
      companyOrScheme: "TCS Smart Hiring & Ignite Campus Drive 2026",
      kind: "Placement Drive",
      eligibleCourses: "BCA",
      minCgpa: "6.5",
      driveDate: "2026-12-08",
      venue: "MSITM Main Auditorium & Computer Lab 1",
      ctcOrBenefit: "₹3.36 LPA – ₹3.80 LPA",
      description: "Final-year & pre-final BCA aptitude assessment and technical programming round coordinated by MSITM Placement Cell.",
      registeredStudentIds: [3],
      active: true,
      createdAt: "2026-11-05T09:00:00Z",
    },
    {
      id: 2,
      companyOrScheme: "Axis Bank & Bajaj Finserv Management Trainee Drive",
      kind: "Placement Drive",
      eligibleCourses: "BBA",
      minCgpa: "6.0",
      driveDate: "2026-12-12",
      venue: "MSITM Seminar Hall",
      ctcOrBenefit: "₹3.00 LPA + Performance Incentives",
      description: "Campus selection for BBA banking operations, financial advisory, and branch management roles across UP.",
      registeredStudentIds: [],
      active: true,
      createdAt: "2026-11-06T10:30:00Z",
    },
    {
      id: 3,
      companyOrScheme: "UP Government Post-Matric Scholarship Biometric Camp",
      kind: "Scholarship",
      eligibleCourses: "ALL",
      minCgpa: "0.0",
      driveDate: "2026-11-26",
      venue: "Scholarship & Accounts Counter, Block-A",
      ctcOrBenefit: "State Tuition Fee Reimbursement",
      description: "Mandatory hardcopy Aadhaar-bank NPCI seeding & income certificate verification before District Social Welfare submission.",
      registeredStudentIds: [1, 2],
      active: true,
      createdAt: "2026-11-07T11:00:00Z",
    },
  ];

  return {
    storeVersion: STORE_SCHEMA_VERSION,
    dbMode: "demo",
    nextId: 200,
    users,
    students: seededStudents,
    feeStructures: seededFeeStructures,
    feePayments: seededPayments,
    attendance: seededAttendance,
    examSessions: seededSessions,
    admitCards: seededAdmitCards,
    gatePasses: seededGatePasses,
    certificates: seededCertificates,
    notices: seededNotices,
    timetable: seededTimetable,
    assignments: seededAssignments,
    submissions: seededSubmissions,
    results: seededResults,
    facultyAllocations: seededFacultyAllocations,
    staffLeaves: seededStaffLeaves,
    libraryIssues: seededLibraryIssues,
    labTickets: seededLabTickets,
    grievances: seededGrievances,
    placementDrives: seededPlacementDrives,
    admissionLeads: [
      {
        id: 1,
        fullName: "Priya Srivastava",
        email: "priya.s@example.in",
        phone: "+91-9450012345",
        course: "BCA",
        qualification: "10+2 (Science)",
        city: "Gonda",
        createdAt: "2026-11-09T10:15:00Z",
      },
    ],
  };
}

const g = globalThis as typeof globalThis & { __msitmPortalStore?: Partial<PortalStoreState> };

export function getStore(): PortalStoreState {
  const existing = g.__msitmPortalStore;
  if (!existing || existing.storeVersion !== STORE_SCHEMA_VERSION) {
    const fresh = buildSeedState();
    if (!existing) {
      g.__msitmPortalStore = fresh;
    } else {
      const migrated: PortalStoreState = {
        storeVersion: STORE_SCHEMA_VERSION,
        dbMode: "demo",
        nextId: Math.max(fresh.nextId, existing.nextId ?? 200),
        users: existing.users ?? fresh.users,
        students: existing.students ?? fresh.students,
        feeStructures: existing.feeStructures ?? fresh.feeStructures,
        feePayments: existing.feePayments ?? fresh.feePayments,
        attendance: existing.attendance ?? fresh.attendance,
        examSessions: existing.examSessions ?? fresh.examSessions,
        admitCards: existing.admitCards ?? fresh.admitCards,
        gatePasses: existing.gatePasses ?? fresh.gatePasses,
        certificates: existing.certificates ?? fresh.certificates,
        notices: existing.notices ?? fresh.notices,
        admissionLeads: existing.admissionLeads ?? fresh.admissionLeads,
        timetable: existing.timetable ?? fresh.timetable,
        assignments: existing.assignments ?? fresh.assignments,
        submissions: existing.submissions ?? fresh.submissions,
        results: existing.results ?? fresh.results,
        facultyAllocations: existing.facultyAllocations ?? fresh.facultyAllocations,
        staffLeaves: existing.staffLeaves ?? fresh.staffLeaves,
        libraryIssues: existing.libraryIssues ?? fresh.libraryIssues,
        labTickets: existing.labTickets ?? fresh.labTickets,
        grievances: existing.grievances ?? fresh.grievances,
        placementDrives: existing.placementDrives ?? fresh.placementDrives,
      };
      g.__msitmPortalStore = migrated;
    }
  }
  return g.__msitmPortalStore as PortalStoreState;
}

function nextSeq(): number {
  const s = getStore();
  s.nextId += 1;
  return s.nextId;
}

function defaultSubjectsFor(course: "BCA" | "BBA", semester: number): { code: string; name: string }[] {
  if (course === "BCA") {
    return [
      { code: `BCA-${semester}01`, name: semester <= 2 ? "Programming Fundamentals & Data Structures" : "Object-Oriented & Web Technologies" },
      { code: `BCA-${semester}02`, name: semester <= 2 ? "Computer Architecture & Digital Logic" : "Database & Operating Systems" },
      { code: `BCA-${semester}03`, name: "Mathematics / Software Engineering" },
      { code: `BCA-${semester}04P`, name: "Practical Computing & Lab Work" },
    ];
  }
  return [
    { code: `BBA-${semester}01`, name: semester <= 2 ? "Principles of Management & OB" : "Marketing & Human Resource Management" },
    { code: `BBA-${semester}02`, name: semester <= 2 ? "Financial & Cost Accounting" : "Financial Management & Business Law" },
    { code: `BBA-${semester}03`, name: "Business Economics & Quantitative Methods" },
    { code: `BBA-${semester}04`, name: "Business Communication & Case Seminar" },
  ];
}

function computeFeeStructure(course: "BCA" | "BBA", semester: number): FeeStructureRecord {
  const store = getStore();
  const exact = store.feeStructures.find((f) => f.course === course && f.semester === semester);
  if (exact) return exact;
  const tuitionFee = course === "BCA" ? 14500 : 15000;
  const labFee = course === "BCA" ? 3000 : 1000;
  const examFee = semester === 6 ? 2500 : 2000;
  const libraryFee = 500;
  return {
    id: 900 + semester,
    course,
    semester,
    academicYear: "2026–27",
    tuitionFee,
    labFee,
    examFee,
    libraryFee,
    totalFee: tuitionFee + labFee + examFee + libraryFee,
    dueDate: "2026-10-15",
  };
}

export async function authenticatePortalUser(
  identifierRaw: string,
  password: string
): Promise<Omit<PortalSession, "exp"> | null> {
  const identifier = identifierRaw.trim();
  if (!identifier || !password) return null;

  // Try live PostgreSQL first if reachable
  if (db) {
    try {
      const found = await db
        .select({
          user: portalUsers,
          studentId: students.id,
        })
        .from(portalUsers)
        .leftJoin(students, eq(students.userId, portalUsers.id))
        .where(
          and(
            eq(portalUsers.active, true),
            or(
              sql`lower(${portalUsers.email}) = lower(${identifier})`,
              sql`lower(${portalUsers.username}) = lower(${identifier})`,
              sql`lower(${students.enrollmentNo}) = lower(${identifier})`
            )
          )
        )
        .limit(1);

      if (found.length > 0) {
        const { user, studentId } = found[0];
        if (!user.active || !verifyPassword(password, user.passwordHash)) return null;
        return {
          userId: user.id,
          username: user.username,
          email: user.email ?? undefined,
          role: user.role as PortalRole,
          displayName: user.displayName,
          studentId: studentId ?? undefined,
          tokenVersion: user.tokenVersion ?? 1,
        };
      }
    } catch {
      // Fall through cleanly to offline seeded store when local PostgreSQL is inactive
    }
  }

  const store = getStore();
  const lower = identifier.toLowerCase();
  const user = store.users.find((u) => {
    if (!u.active) return false;
    if (u.username.toLowerCase() === lower) return true;
    if (u.email && u.email.toLowerCase() === lower) return true;
    const st = store.students.find((s) => s.userId === u.id);
    if (st && st.enrollmentNo.toLowerCase() === lower) return true;
    return false;
  });

  if (!user || !verifyPassword(password, user.passwordHash)) return null;
  const student = user.role === "student" ? store.students.find((s) => s.userId === user.id) : undefined;
  return {
    userId: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    displayName: user.displayName,
    studentId: student?.id,
    tokenVersion: user.tokenVersion ?? 1,
  };
}

export async function getStudentSnapshot(studentId: number): Promise<StudentPortalSnapshot | null> {
  const store = getStore();
  const student = store.students.find((s) => s.id === studentId);
  if (!student) return null;

  const feeStructure = computeFeeStructure(student.course, student.semester);
  const payments = store.feePayments
    .filter((p) => p.studentId === student.id && p.semester === student.semester)
    .sort((a, b) => (a.paidAt < b.paidAt ? 1 : -1));

  const totalPaid = payments.reduce((sum, p) => sum + p.amountPaid, 0);
  const totalConcession = payments.reduce((sum, p) => sum + p.concession, 0);
  const balance = Math.max(0, feeStructure.totalFee - totalPaid - totalConcession);
  const feeCleared = balance === 0;

  const attendance = store.attendance.filter(
    (a) => a.studentId === student.id && a.semester === student.semester
  );
  const totals = attendance.reduce(
    (acc, a) => ({
      total: acc.total + a.totalClasses,
      present: acc.present + a.attendedClasses + a.medicalLeaves,
    }),
    { total: 0, present: 0 }
  );
  const overallAttendancePct =
    totals.total > 0 ? Math.min(100, Math.round((totals.present / totals.total) * 100)) : 0;

  const examSession =
    store.examSessions.find(
      (e) => e.course === student.course && e.semester === student.semester && e.active
    ) ?? null;

  const admitCard = examSession
    ? store.admitCards.find((c) => c.studentId === student.id && c.examSessionId === examSession.id) ??
      null
    : null;

  const minAtt = examSession?.minAttendancePct ?? 75;
  const attendanceCleared = overallAttendancePct >= minAtt;
  const examFormVerified = Boolean(admitCard?.examFormVerified);

  const blockReasons: string[] = [];
  if (!examSession) blockReasons.push("No active examination schedule for your current semester yet.");
  if (!admitCard?.isReleased) blockReasons.push("Exam Cell has not released admit cards for this session yet.");
  if (!admitCard?.overrideApproved) {
    if (!feeCleared) {
      blockReasons.push(
        `₹${balance.toLocaleString("en-IN")} semester fee balance pending — clear dues at Accounts Office to unlock.`
      );
    }
    if (!attendanceCleared) {
      blockReasons.push(
        `Attendance is ${overallAttendancePct}% (minimum ${minAtt}% required — contact HOD for medical/condonation review).`
      );
    }
    if (!examFormVerified) {
      blockReasons.push("Examination form verification is pending with Exam Cell.");
    }
  }

  const canDownload = Boolean(
    examSession &&
      admitCard &&
      admitCard.isReleased &&
      (admitCard.overrideApproved || (feeCleared && attendanceCleared && examFormVerified))
  );

  const gatePasses = store.gatePasses
    .filter((gp) => gp.studentId === student.id)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  const certificates = store.certificates
    .filter((c) => c.studentId === student.id)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  const notices = store.notices
    .filter(
      (n) =>
        (n.courseScope === "ALL" || n.courseScope === student.course) &&
        (n.semesterScope === 0 || n.semesterScope === student.semester)
    )
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  const timetable = store.timetable.filter(
    (t) => t.course === student.course && t.semester === student.semester
  );

  const assignments = store.assignments
    .filter((a) => a.course === student.course && a.semester === student.semester)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .map((a) => ({
      ...a,
      submission: store.submissions.find((sub) => sub.assignmentId === a.id && sub.studentId === student.id) ?? null,
    }));

  const results = store.results
    .filter((r) => r.studentId === student.id)
    .sort((a, b) => b.semester - a.semester);

  const validSgpas = results
    .map((r) => Number.parseFloat(r.sgpa))
    .filter((n) => Number.isFinite(n) && n > 0);
  const cgpa =
    validSgpas.length > 0
      ? (validSgpas.reduce((sum, n) => sum + n, 0) / validSgpas.length).toFixed(2)
      : "—";

  const libraryIssues = store.libraryIssues
    .filter((b) => b.studentId === student.id)
    .sort((a, b) => (a.issuedDate < b.issuedDate ? 1 : -1));
  const libraryCleared = !libraryIssues.some((b) => b.status === "overdue" || b.fineAmount > 0);

  const labTickets = [...store.labTickets].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  const grievances = store.grievances
    .filter((g) => g.studentId === student.id)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  const placementDrives = store.placementDrives
    .filter((d) => d.active && (d.eligibleCourses === "ALL" || d.eligibleCourses === student.course))
    .sort((a, b) => (a.driveDate > b.driveDate ? 1 : -1));

  return {
    student,
    feeStructure,
    payments,
    feeSummary: {
      totalPayable: feeStructure.totalFee,
      totalPaid,
      totalConcession,
      balance,
      isCleared: feeCleared,
    },
    attendance,
    overallAttendancePct,
    examSession,
    admitCard,
    admitEligibility: {
      feeCleared,
      attendanceCleared,
      examFormVerified,
      canDownload,
      blockReasons,
    },
    gatePasses,
    certificates,
    notices,
    timetable,
    assignments,
    results,
    cgpa,
    libraryIssues,
    libraryCleared,
    labTickets,
    grievances,
    placementDrives,
  };
}

export async function getAdminOverview() {
  const store = getStore();
  const studentRows = await Promise.all(
    store.students.map(async (s) => {
      const snap = await getStudentSnapshot(s.id);
      return snap!;
    })
  );

  let dbAdmissions: AdmissionLeadRow[] = store.admissionLeads;
  if (db) {
    try {
      const rows = await db.select().from(admissions).limit(30);
      if (rows.length > 0) {
        dbAdmissions = rows.map((r) => ({
          id: r.id,
          fullName: r.fullName,
          email: r.email,
          phone: r.phone,
          course: r.course,
          qualification: r.qualification,
          city: r.city,
          createdAt: r.createdAt.toISOString(),
        }));
      }
    } catch {
      // Offline fallback already loaded
    }
  }

  const staffUsers: StaffUserSummary[] = store.users
    .filter((u) => u.role !== "student")
    .map((u) => ({
      id: u.id,
      username: u.username,
      role: u.role,
      displayName: u.displayName,
      active: u.active,
    }));

  return {
    studentSnapshots: studentRows,
    feeStructures: store.feeStructures,
    payments: [...store.feePayments].sort((a, b) => (a.paidAt < b.paidAt ? 1 : -1)),
    examSessions: store.examSessions,
    gatePasses: [...store.gatePasses].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    certificates: [...store.certificates].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    notices: [...store.notices].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1)),
    timetable: store.timetable,
    assignments: [...store.assignments].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    submissions: [...store.submissions].sort((a, b) => (a.submittedAt < b.submittedAt ? 1 : -1)),
    results: [...store.results].sort((a, b) => b.semester - a.semester),
    facultyAllocations: store.facultyAllocations,
    staffLeaves: [...store.staffLeaves].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    libraryIssues: [...store.libraryIssues].sort((a, b) => (a.issuedDate < b.issuedDate ? 1 : -1)),
    labTickets: [...store.labTickets].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    grievances: [...store.grievances].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    placementDrives: [...store.placementDrives].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    staffUsers,
    admissionLeads: dbAdmissions,
  };
}

export async function recordFeePayment(input: {
  studentId: number;
  amountPaid: number;
  concession?: number;
  paymentMode: FeePaymentRecord["paymentMode"];
  transactionRef?: string;
  remarks?: string;
  recordedBy: string;
}): Promise<FeePaymentRecord> {
  const store = getStore();
  const student = store.students.find((s) => s.id === input.studentId);
  if (!student) throw new Error("Student not found.");

  const id = nextSeq();
  const payment: FeePaymentRecord = {
    id,
    studentId: student.id,
    semester: student.semester,
    amountPaid: Math.max(0, Math.round(input.amountPaid)),
    concession: Math.max(0, Math.round(input.concession ?? 0)),
    paymentMode: input.paymentMode,
    transactionRef: (input.transactionRef || `OFFICE-${id}`).trim(),
    receiptNo: `MSITM/FEE/2026-27/${1050 + id}`,
    verificationToken: makeCode("MSITM-FEE"),
    recordedBy: input.recordedBy,
    remarks: (input.remarks || `Semester ${student.semester} fee payment`).trim(),
    paidAt: new Date().toISOString(),
  };
  store.feePayments.push(payment);
  return payment;
}

export async function updateAdmitCardDecision(input: {
  studentId: number;
  examSessionId: number;
  examFormVerified?: boolean;
  isReleased?: boolean;
  overrideApproved?: boolean;
  overrideReason?: string;
}): Promise<AdmitCardRecord> {
  const store = getStore();
  let card = store.admitCards.find(
    (c) => c.studentId === input.studentId && c.examSessionId === input.examSessionId
  );
  if (!card) {
    card = {
      id: nextSeq(),
      studentId: input.studentId,
      examSessionId: input.examSessionId,
      examFormVerified: true,
      overrideApproved: false,
      overrideReason: "",
      isReleased: true,
      verificationToken: makeCode("MSITM-ADM"),
      issuedAt: new Date().toISOString(),
    };
    store.admitCards.push(card);
  }
  if (typeof input.examFormVerified === "boolean") card.examFormVerified = input.examFormVerified;
  if (typeof input.isReleased === "boolean") card.isReleased = input.isReleased;
  if (typeof input.overrideApproved === "boolean") card.overrideApproved = input.overrideApproved;
  if (typeof input.overrideReason === "string") card.overrideReason = input.overrideReason.trim();
  if (card.isReleased && !card.issuedAt) card.issuedAt = new Date().toISOString();
  return card;
}

export async function createGatePass(input: {
  studentId: number;
  passType: GatePassRecord["passType"];
  reason: string;
  symptomsOrNotes?: string;
  guardianPhone?: string;
  requestedExitAt: string;
}): Promise<GatePassRecord> {
  const store = getStore();
  const student = store.students.find((s) => s.id === input.studentId);
  if (!student) throw new Error("Student not found.");

  const pass: GatePassRecord = {
    id: nextSeq(),
    studentId: student.id,
    passCode: makePassCode(),
    verificationToken: makeCode("MSITM-GP"),
    passType: input.passType,
    reason: input.reason.trim().slice(0, 200),
    symptomsOrNotes: (input.symptomsOrNotes || "").trim().slice(0, 600),
    guardianPhone: (input.guardianPhone || student.guardianPhone).trim().slice(0, 30),
    guardianNotified: false,
    requestedExitAt: input.requestedExitAt.trim().slice(0, 40),
    validUntil: "",
    status: "pending",
    approvedBy: "",
    rejectionReason: "",
    checkedOutAt: null,
    returnedAt: null,
    createdAt: new Date().toISOString(),
  };
  store.gatePasses.push(pass);
  return pass;
}

export async function reviewGatePass(input: {
  passId: number;
  decision: "approve" | "reject";
  guardianNotified?: boolean;
  validUntil?: string;
  rejectionReason?: string;
  approvedBy: string;
}): Promise<GatePassRecord> {
  const store = getStore();
  const pass = store.gatePasses.find((p) => p.id === input.passId);
  if (!pass) throw new Error("Gate pass not found.");

  if (input.decision === "approve") {
    pass.status = "approved";
    pass.guardianNotified = Boolean(input.guardianNotified);
    pass.approvedBy = input.approvedBy;
    pass.validUntil = (input.validUntil || "Same Day · End of Shift").trim();
    pass.rejectionReason = "";
  } else {
    pass.status = "rejected";
    pass.approvedBy = input.approvedBy;
    pass.rejectionReason = (input.rejectionReason || "Declined by Coordinator / HOD").trim();
  }
  return pass;
}

export async function guardGateAction(input: {
  code: string;
  action: "lookup" | "check_out" | "mark_returned";
}): Promise<{ pass: GatePassRecord; student: StudentRecord } | null> {
  const store = getStore();
  const clean = input.code.trim().toUpperCase();
  const pass = store.gatePasses.find(
    (p) => p.passCode.toUpperCase() === clean || p.verificationToken.toUpperCase() === clean
  );
  if (!pass) return null;
  const student = store.students.find((s) => s.id === pass.studentId);
  if (!student) return null;

  if (input.action === "check_out") {
    if (pass.status !== "approved") {
      throw new Error(`Pass cannot be checked out because status is "${pass.status}".`);
    }
    pass.status = "checked_out";
    pass.checkedOutAt = new Date().toISOString();
  } else if (input.action === "mark_returned") {
    if (pass.status !== "checked_out") {
      throw new Error(`Only a checked-out pass can be marked returned.`);
    }
    pass.status = "returned";
    pass.returnedAt = new Date().toISOString();
  }
  return { pass, student };
}

export async function onboardStudent(input: {
  enrollmentNo?: string;
  universityRollNo?: string;
  fullName: string;
  fatherName: string;
  course: "BCA" | "BBA";
  batch: string;
  semester: number;
  section?: string;
  dob: string;
  phone: string;
  guardianPhone: string;
  email: string;
  bloodGroup?: string;
  password?: string;
}): Promise<StudentRecord> {
  const store = getStore();
  const id = nextSeq();
  const yr = input.batch.slice(2, 4) || "26";
  const enrollmentNo = (
    input.enrollmentNo?.trim().toUpperCase() ||
    `MSITM-${input.course}-20${yr}-${String(id).padStart(3, "0")}`
  ).slice(0, 48);

  if (store.students.some((s) => s.enrollmentNo.toUpperCase() === enrollmentNo.toUpperCase())) {
    throw new Error(`Enrollment No. "${enrollmentNo}" already exists.`);
  }

  const universityRollNo = (
    input.universityRollNo?.trim() ||
    `${yr}10${input.course === "BCA" ? "84" : "42"}${String(id).padStart(3, "0")}`
  ).slice(0, 48);

  const userId = nextSeq();
  store.users.push({
    id: userId,
    username: enrollmentNo,
    passwordHash: hashPassword(input.password?.trim() || "msitm@2026"),
    role: "student",
    displayName: input.fullName.trim(),
    active: true,
  });

  const cleanCode = enrollmentNo.replace(/[^A-Z0-9]/g, "").slice(-10) || String(id);
  const student: StudentRecord = {
    id,
    userId,
    enrollmentNo,
    universityRollNo,
    fullName: input.fullName.trim(),
    fatherName: input.fatherName.trim(),
    course: input.course,
    batch: input.batch.trim() || "2026–29",
    semester: Math.min(6, Math.max(1, Math.round(input.semester))),
    section: (input.section || "A").trim().toUpperCase().slice(0, 8) || "A",
    dob: input.dob.trim() || "2007-01-01",
    phone: input.phone.trim(),
    guardianPhone: input.guardianPhone.trim() || input.phone.trim(),
    email: input.email.trim() || `${enrollmentNo.toLowerCase()}@student.msitm.edu.in`,
    bloodGroup: (input.bloodGroup || "O+").trim(),
    idVerificationCode: `MSITM-ID-${cleanCode}-${id}`,
    status: "active",
  };
  store.students.push(student);

  for (const subj of defaultSubjectsFor(student.course, student.semester)) {
    store.attendance.push({
      id: nextSeq(),
      studentId: student.id,
      semester: student.semester,
      subjectCode: subj.code,
      subjectName: subj.name,
      totalClasses: 20,
      attendedClasses: 16,
      medicalLeaves: 0,
      internalMarks: 20,
      maxInternalMarks: 25,
    });
  }

  return student;
}

export async function promoteStudentSemester(studentId: number): Promise<StudentRecord> {
  const store = getStore();
  const student = store.students.find((s) => s.id === studentId);
  if (!student) throw new Error("Student not found.");

  if (student.semester < 6) {
    student.semester += 1;
    const exists = store.attendance.some(
      (a) => a.studentId === student.id && a.semester === student.semester
    );
    if (!exists) {
      for (const subj of defaultSubjectsFor(student.course, student.semester)) {
        store.attendance.push({
          id: nextSeq(),
          studentId: student.id,
          semester: student.semester,
          subjectCode: subj.code,
          subjectName: subj.name,
          totalClasses: 0,
          attendedClasses: 0,
          medicalLeaves: 0,
          internalMarks: 0,
          maxInternalMarks: 25,
        });
      }
    }
  } else {
    student.status = "alumni";
  }
  return student;
}

export async function updateAttendanceRecord(input: {
  recordId: number;
  totalClasses: number;
  attendedClasses: number;
  medicalLeaves: number;
  internalMarks: number;
}): Promise<AttendanceRecordItem> {
  const store = getStore();
  const row = store.attendance.find((a) => a.id === input.recordId);
  if (!row) throw new Error("Attendance record not found.");
  row.totalClasses = Math.max(0, Math.round(input.totalClasses));
  row.attendedClasses = Math.min(row.totalClasses, Math.max(0, Math.round(input.attendedClasses)));
  row.medicalLeaves = Math.max(0, Math.round(input.medicalLeaves));
  row.internalMarks = Math.min(row.maxInternalMarks, Math.max(0, Math.round(input.internalMarks)));
  return row;
}

export async function requestCertificate(input: {
  studentId: number;
  certType: CertificateRequestRecord["certType"];
  purpose: string;
}): Promise<CertificateRequestRecord> {
  const store = getStore();
  const snap = await getStudentSnapshot(input.studentId);
  if (!snap) throw new Error("Student not found.");

  const id = nextSeq();
  const reqItem: CertificateRequestRecord = {
    id,
    studentId: input.studentId,
    certType: input.certType,
    purpose: input.purpose.trim().slice(0, 300),
    accountsCleared: snap.feeSummary.isCleared,
    libraryCleared: snap.libraryCleared,
    labCleared: true,
    status: "pending",
    referenceNo: `MSITM/CERT/2026/${String(200 + id).padStart(4, "0")}`,
    createdAt: new Date().toISOString(),
  };
  store.certificates.push(reqItem);
  return reqItem;
}

export async function updateCertificateStatus(input: {
  certId: number;
  status: CertificateRequestRecord["status"];
  accountsCleared?: boolean;
  libraryCleared?: boolean;
  labCleared?: boolean;
}): Promise<CertificateRequestRecord> {
  const store = getStore();
  const cert = store.certificates.find((c) => c.id === input.certId);
  if (!cert) throw new Error("Certificate request not found.");
  cert.status = input.status;
  if (typeof input.accountsCleared === "boolean") cert.accountsCleared = input.accountsCleared;
  if (typeof input.libraryCleared === "boolean") cert.libraryCleared = input.libraryCleared;
  if (typeof input.labCleared === "boolean") cert.labCleared = input.labCleared;
  return cert;
}

export async function publishUgNotice(input: {
  title: string;
  courseScope: UgNoticeRecord["courseScope"];
  semesterScope: number;
  category: UgNoticeRecord["category"];
  body: string;
}): Promise<UgNoticeRecord> {
  const store = getStore();
  const notice: UgNoticeRecord = {
    id: nextSeq(),
    title: input.title.trim().slice(0, 200),
    courseScope: input.courseScope,
    semesterScope: Math.max(0, Math.min(6, Math.round(input.semesterScope))),
    category: input.category,
    body: input.body.trim().slice(0, 1200),
    publishedAt: new Date().toISOString(),
  };
  store.notices.unshift(notice);
  return notice;
}

export async function verifyDocumentByToken(codeRaw: string): Promise<VerificationLookupResult> {
  const code = codeRaw.trim().toUpperCase();
  if (!code) return { valid: false, code };

  const store = getStore();

  // 1. Admit Card check
  const admit = store.admitCards.find((a) => a.verificationToken.toUpperCase() === code);
  if (admit) {
    const snap = await getStudentSnapshot(admit.studentId);
    if (!snap) return { valid: false, code };
    return {
      valid: snap.admitEligibility.canDownload,
      documentType: "Admit Card",
      code: admit.verificationToken,
      holderName: snap.student.fullName,
      enrollmentNo: snap.student.enrollmentNo,
      courseLabel: `${snap.student.course} · Semester ${snap.student.semester}`,
      statusLabel: snap.admitEligibility.canDownload ? "VALID FOR EXAMINATION" : "WITHHELD / NOT RELEASED",
      detail: snap.examSession?.title ?? "MSITM Examination",
      issuedAt: admit.issuedAt ?? undefined,
    };
  }

  // 2. Fee Receipt check
  const receipt = store.feePayments.find(
    (p) => p.verificationToken.toUpperCase() === code || p.receiptNo.toUpperCase() === code
  );
  if (receipt) {
    const student = store.students.find((s) => s.id === receipt.studentId);
    return {
      valid: true,
      documentType: "Fee Receipt",
      code: receipt.receiptNo,
      holderName: student?.fullName,
      enrollmentNo: student?.enrollmentNo,
      courseLabel: student ? `${student.course} · Semester ${receipt.semester}` : undefined,
      statusLabel: `VERIFIED · ₹${receipt.amountPaid.toLocaleString("en-IN")} (${receipt.paymentMode})`,
      detail: receipt.remarks,
      issuedAt: receipt.paidAt,
    };
  }

  // 3. Gate Pass check
  const pass = store.gatePasses.find(
    (g) => g.verificationToken.toUpperCase() === code || g.passCode.toUpperCase() === code
  );
  if (pass) {
    const student = store.students.find((s) => s.id === pass.studentId);
    const activePass = pass.status === "approved";
    return {
      valid: pass.status === "approved" || pass.status === "checked_out" || pass.status === "returned",
      documentType: "Gate Pass",
      code: pass.passCode,
      holderName: student?.fullName,
      enrollmentNo: student?.enrollmentNo,
      courseLabel: student ? `${student.course} · Semester ${student.semester}` : undefined,
      statusLabel: activePass ? "APPROVED FOR EXIT" : pass.status.replace("_", " ").toUpperCase(),
      detail: `${pass.reason} (${pass.requestedExitAt})`,
      issuedAt: pass.createdAt,
    };
  }

  // 4. Student ID check
  const student = store.students.find(
    (s) => s.idVerificationCode.toUpperCase() === code || s.enrollmentNo.toUpperCase() === code
  );
  if (student) {
    return {
      valid: student.status === "active",
      documentType: "Student ID Card",
      code: student.idVerificationCode,
      holderName: student.fullName,
      enrollmentNo: student.enrollmentNo,
      courseLabel: `${student.course} · Semester ${student.semester} (${student.batch})`,
      statusLabel: student.status === "active" ? "ACTIVE BONAFIDE STUDENT" : student.status.toUpperCase(),
      detail: `Roll No. ${student.universityRollNo}`,
    };
  }

  // 5. Semester Result check
  const res = store.results.find((r) => r.verificationToken.toUpperCase() === code);
  if (res) {
    const holder = store.students.find((s) => s.id === res.studentId);
    return {
      valid: res.resultStatus !== "Result Awaited",
      documentType: "Semester Result",
      code: res.verificationToken,
      holderName: holder?.fullName,
      enrollmentNo: holder?.enrollmentNo,
      courseLabel: holder ? `${holder.course} · Semester ${res.semester} (${res.academicYear})` : undefined,
      statusLabel: `${res.resultStatus.toUpperCase()} · SGPA ${res.sgpa}`,
      detail: res.backPaperCodes ? `Back Paper: ${res.backPaperCodes}` : `${res.creditsEarned} Credits Earned`,
      issuedAt: res.declaredAt,
    };
  }

  return { valid: false, code };
}

/* ---------------- Tier 2 & 3 Operations: Assignments, Results, Faculty, Library, Labs & Grievances ---------------- */

export async function submitAssignmentWork(input: {
  assignmentId: number;
  studentId: number;
  submissionNote: string;
  attachmentRef: string;
}): Promise<AssignmentSubmissionRecord> {
  const store = getStore();
  const assignment = store.assignments.find((a) => a.id === input.assignmentId);
  if (!assignment) throw new Error("Assignment or practical task not found.");

  const existing = store.submissions.find(
    (s) => s.assignmentId === input.assignmentId && s.studentId === input.studentId
  );
  const now = new Date().toISOString();
  if (existing) {
    existing.submissionNote = input.submissionNote.trim().slice(0, 600);
    existing.attachmentRef = input.attachmentRef.trim().slice(0, 200);
    existing.status = "submitted";
    existing.submittedAt = now;
    return existing;
  }

  const created: AssignmentSubmissionRecord = {
    id: nextSeq(),
    assignmentId: input.assignmentId,
    studentId: input.studentId,
    submissionNote: input.submissionNote.trim().slice(0, 600),
    attachmentRef: input.attachmentRef.trim().slice(0, 200),
    marksAwarded: null,
    maxMarks: 25,
    feedback: "Submitted; awaiting faculty evaluation.",
    status: "submitted",
    submittedAt: now,
  };
  store.submissions.push(created);
  return created;
}

export async function createAssignmentTask(input: {
  course: "BCA" | "BBA";
  semester: number;
  subjectCode: string;
  title: string;
  kind: AssignmentRecord["kind"];
  dueDate: string;
  resourceUrl: string;
  instructions: string;
  createdBy: string;
}): Promise<AssignmentRecord> {
  const store = getStore();
  const item: AssignmentRecord = {
    id: nextSeq(),
    course: input.course,
    semester: Math.max(1, Math.min(6, Math.round(input.semester))),
    subjectCode: input.subjectCode.trim().toUpperCase(),
    title: input.title.trim().slice(0, 200),
    kind: input.kind,
    dueDate: input.dueDate.trim() || "2026-12-01",
    resourceUrl: input.resourceUrl.trim() || "/portal/academics",
    instructions: input.instructions.trim().slice(0, 800),
    createdBy: input.createdBy,
    createdAt: new Date().toISOString(),
  };
  store.assignments.unshift(item);
  return item;
}

export async function evaluateAssignmentSubmission(input: {
  submissionId: number;
  marksAwarded: number;
  feedback: string;
}): Promise<AssignmentSubmissionRecord> {
  const store = getStore();
  const sub = store.submissions.find((s) => s.id === input.submissionId);
  if (!sub) throw new Error("Submission not found.");
  sub.marksAwarded = Math.min(sub.maxMarks, Math.max(0, Math.round(input.marksAwarded)));
  sub.feedback = input.feedback.trim().slice(0, 400);
  sub.status = "evaluated";
  return sub;
}

export async function upsertSemesterResult(input: {
  studentId: number;
  semester: number;
  academicYear: string;
  sgpa: string;
  creditsEarned: number;
  resultStatus: SemesterResultRecord["resultStatus"];
  backPaperCodes: string;
  subjectGrades?: SubjectGradeItem[];
}): Promise<SemesterResultRecord> {
  const store = getStore();
  const student = store.students.find((s) => s.id === input.studentId);
  if (!student) throw new Error("Student not found.");

  const sem = Math.max(1, Math.min(6, Math.round(input.semester)));
  const existing = store.results.find((r) => r.studentId === input.studentId && r.semester === sem);
  const now = new Date().toISOString();

  if (existing) {
    existing.academicYear = input.academicYear.trim() || existing.academicYear;
    existing.sgpa = input.sgpa.trim();
    existing.creditsEarned = Math.max(0, Math.round(input.creditsEarned));
    existing.resultStatus = input.resultStatus;
    existing.backPaperCodes = input.backPaperCodes.trim();
    if (input.subjectGrades?.length) existing.subjectGrades = input.subjectGrades;
    existing.declaredAt = now;
    return existing;
  }

  const subjects = defaultSubjectsFor(student.course, sem).map((s) => ({
    code: s.code,
    name: s.name,
    theoryMarks: input.resultStatus === "Back Paper" ? 36 : 58,
    internalMarks: 20,
    maxMarks: 100,
    grade: input.resultStatus === "Back Paper" ? "C" : "A",
    credits: 6,
  }));

  const created: SemesterResultRecord = {
    id: nextSeq(),
    studentId: input.studentId,
    semester: sem,
    academicYear: input.academicYear.trim() || "2026–27",
    sgpa: input.sgpa.trim(),
    creditsEarned: Math.max(0, Math.round(input.creditsEarned)),
    resultStatus: input.resultStatus,
    backPaperCodes: input.backPaperCodes.trim(),
    subjectGrades: input.subjectGrades?.length ? input.subjectGrades : subjects,
    verificationToken: makeCode("MSITM-RES"),
    declaredAt: now,
  };
  store.results.push(created);
  return created;
}

export async function updateSyllabusProgress(input: {
  allocationId: number;
  syllabusPct: number;
  lastTopicCovered: string;
}): Promise<FacultyAllocationRecord> {
  const store = getStore();
  const item = store.facultyAllocations.find((f) => f.id === input.allocationId);
  if (!item) throw new Error("Faculty subject allocation not found.");
  item.syllabusPct = Math.min(100, Math.max(0, Math.round(input.syllabusPct)));
  if (input.lastTopicCovered.trim()) {
    item.lastTopicCovered = input.lastTopicCovered.trim().slice(0, 200);
  }
  return item;
}

export async function createStaffLeave(input: {
  facultyName: string;
  leaveType: StaffLeaveRecord["leaveType"];
  fromDate: string;
  toDate: string;
  reason: string;
  substituteFaculty: string;
}): Promise<StaffLeaveRecord> {
  const store = getStore();
  const leave: StaffLeaveRecord = {
    id: nextSeq(),
    facultyName: input.facultyName.trim(),
    leaveType: input.leaveType,
    fromDate: input.fromDate.trim(),
    toDate: input.toDate.trim(),
    reason: input.reason.trim().slice(0, 400),
    substituteFaculty: input.substituteFaculty.trim() || "HOD Arrangement",
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  store.staffLeaves.unshift(leave);
  return leave;
}

export async function reviewStaffLeave(input: {
  leaveId: number;
  status: "approved" | "rejected";
}): Promise<StaffLeaveRecord> {
  const store = getStore();
  const leave = store.staffLeaves.find((l) => l.id === input.leaveId);
  if (!leave) throw new Error("Staff leave request not found.");
  leave.status = input.status;
  return leave;
}

export async function issueLibraryBook(input: {
  studentId: number;
  accessionNo: string;
  bookTitle: string;
  author: string;
  dueDate: string;
}): Promise<LibraryIssueRecord> {
  const store = getStore();
  const item: LibraryIssueRecord = {
    id: nextSeq(),
    studentId: input.studentId,
    accessionNo: input.accessionNo.trim().toUpperCase(),
    bookTitle: input.bookTitle.trim().slice(0, 180),
    author: input.author.trim().slice(0, 120),
    issuedDate: new Date().toISOString().slice(0, 10),
    dueDate: input.dueDate.trim() || "2026-12-05",
    returnedDate: null,
    fineAmount: 0,
    status: "issued",
  };
  store.libraryIssues.unshift(item);
  return item;
}

export async function updateLibraryIssue(input: {
  issueId: number;
  status: LibraryIssueRecord["status"];
  fineAmount?: number;
}): Promise<LibraryIssueRecord> {
  const store = getStore();
  const item = store.libraryIssues.find((b) => b.id === input.issueId);
  if (!item) throw new Error("Library issue record not found.");
  item.status = input.status;
  if (input.status === "returned") {
    item.returnedDate = new Date().toISOString().slice(0, 10);
    item.fineAmount = 0;
  } else if (typeof input.fineAmount === "number") {
    item.fineAmount = Math.max(0, Math.round(input.fineAmount));
  }
  return item;
}

export async function createLabTicket(input: {
  labName: LabTicketRecord["labName"];
  workstationCode: string;
  category: LabTicketRecord["category"];
  description: string;
  reportedBy: string;
  priority: LabTicketRecord["priority"];
}): Promise<LabTicketRecord> {
  const store = getStore();
  const ticket: LabTicketRecord = {
    id: nextSeq(),
    labName: input.labName,
    workstationCode: input.workstationCode.trim().toUpperCase(),
    category: input.category,
    description: input.description.trim().slice(0, 500),
    reportedBy: input.reportedBy.trim().slice(0, 120),
    priority: input.priority,
    status: "open",
    resolutionNote: "",
    createdAt: new Date().toISOString(),
  };
  store.labTickets.unshift(ticket);
  return ticket;
}

export async function updateLabTicket(input: {
  ticketId: number;
  status: LabTicketRecord["status"];
  resolutionNote: string;
}): Promise<LabTicketRecord> {
  const store = getStore();
  const ticket = store.labTickets.find((t) => t.id === input.ticketId);
  if (!ticket) throw new Error("Lab ticket not found.");
  ticket.status = input.status;
  if (input.resolutionNote.trim()) {
    ticket.resolutionNote = input.resolutionNote.trim().slice(0, 400);
  }
  return ticket;
}

export async function submitGrievance(input: {
  studentId: number;
  category: GrievanceRecord["category"];
  subject: string;
  details: string;
  isAnonymous: boolean;
}): Promise<GrievanceRecord> {
  const store = getStore();
  const id = nextSeq();
  const item: GrievanceRecord = {
    id,
    ticketCode: `MSITM-GRV-${200 + id}`,
    studentId: input.studentId,
    category: input.category,
    subject: input.subject.trim().slice(0, 180),
    details: input.details.trim().slice(0, 1000),
    isAnonymous: input.isAnonymous,
    status: "submitted",
    actionTaken: "",
    createdAt: new Date().toISOString(),
  };
  store.grievances.unshift(item);
  return item;
}

export async function resolveGrievance(input: {
  grievanceId: number;
  status: GrievanceRecord["status"];
  actionTaken: string;
}): Promise<GrievanceRecord> {
  const store = getStore();
  const item = store.grievances.find((g) => g.id === input.grievanceId);
  if (!item) throw new Error("Grievance record not found.");
  item.status = input.status;
  if (input.actionTaken.trim()) {
    item.actionTaken = input.actionTaken.trim().slice(0, 500);
  }
  return item;
}

/* ---------------- Full Admin Master CRUD, Class-Wise Excel Import & Operational Controls ---------------- */

export async function updateStudentRecord(input: {
  studentId: number;
  enrollmentNo?: string;
  universityRollNo?: string;
  fullName?: string;
  fatherName?: string;
  course?: "BCA" | "BBA";
  batch?: string;
  semester?: number;
  section?: string;
  dob?: string;
  phone?: string;
  guardianPhone?: string;
  email?: string;
  bloodGroup?: string;
  status?: StudentRecord["status"];
  resetPassword?: string;
}): Promise<StudentRecord> {
  const store = getStore();
  const student = store.students.find((s) => s.id === input.studentId);
  if (!student) throw new Error("Student record not found.");

  if (typeof input.enrollmentNo === "string" && input.enrollmentNo.trim()) {
    const nextEnr = input.enrollmentNo.trim().toUpperCase();
    const dup = store.students.find((s) => s.id !== student.id && s.enrollmentNo.toUpperCase() === nextEnr);
    if (dup) throw new Error(`Enrollment No. "${nextEnr}" belongs to another student.`);
    student.enrollmentNo = nextEnr;
    const u = store.users.find((x) => x.id === student.userId);
    if (u) u.username = nextEnr;
  }

  if (typeof input.universityRollNo === "string") student.universityRollNo = input.universityRollNo.trim();
  if (typeof input.fullName === "string" && input.fullName.trim()) {
    student.fullName = input.fullName.trim();
    const u = store.users.find((x) => x.id === student.userId);
    if (u) u.displayName = student.fullName;
  }
  if (typeof input.fatherName === "string" && input.fatherName.trim()) student.fatherName = input.fatherName.trim();
  if (input.course === "BCA" || input.course === "BBA") student.course = input.course;
  if (typeof input.batch === "string" && input.batch.trim()) student.batch = input.batch.trim();
  if (typeof input.semester === "number" && Number.isFinite(input.semester)) {
    const nextSem = Math.min(6, Math.max(1, Math.round(input.semester)));
    student.semester = nextSem;
    if (!store.attendance.some((a) => a.studentId === student.id && a.semester === nextSem)) {
      for (const subj of defaultSubjectsFor(student.course, nextSem)) {
        store.attendance.push({
          id: nextSeq(),
          studentId: student.id,
          semester: nextSem,
          subjectCode: subj.code,
          subjectName: subj.name,
          totalClasses: 0,
          attendedClasses: 0,
          medicalLeaves: 0,
          internalMarks: 0,
          maxInternalMarks: 25,
        });
      }
    }
  }
  if (typeof input.section === "string" && input.section.trim()) {
    student.section = input.section.trim().toUpperCase().slice(0, 8);
  }
  if (typeof input.dob === "string" && input.dob.trim()) student.dob = input.dob.trim();
  if (typeof input.phone === "string" && input.phone.trim()) student.phone = input.phone.trim();
  if (typeof input.guardianPhone === "string" && input.guardianPhone.trim()) student.guardianPhone = input.guardianPhone.trim();
  if (typeof input.email === "string" && input.email.trim()) student.email = input.email.trim();
  if (typeof input.bloodGroup === "string" && input.bloodGroup.trim()) student.bloodGroup = input.bloodGroup.trim();
  if (input.status === "active" || input.status === "alumni" || input.status === "suspended") {
    student.status = input.status;
    const u = store.users.find((x) => x.id === student.userId);
    if (u) u.active = input.status !== "suspended";
  }
  if (typeof input.resetPassword === "string" && input.resetPassword.trim().length >= 4) {
    const u = store.users.find((x) => x.id === student.userId);
    if (u) u.passwordHash = hashPassword(input.resetPassword.trim());
  }

  return student;
}

export async function deleteStudentRecord(studentId: number): Promise<void> {
  const store = getStore();
  const idx = store.students.findIndex((s) => s.id === studentId);
  if (idx === -1) throw new Error("Student record not found.");
  const [removed] = store.students.splice(idx, 1);

  store.users = store.users.filter((u) => u.id !== removed.userId);
  store.feePayments = store.feePayments.filter((p) => p.studentId !== studentId);
  store.attendance = store.attendance.filter((a) => a.studentId !== studentId);
  store.admitCards = store.admitCards.filter((c) => c.studentId !== studentId);
  store.gatePasses = store.gatePasses.filter((g) => g.studentId !== studentId);
  store.certificates = store.certificates.filter((c) => c.studentId !== studentId);
  store.submissions = store.submissions.filter((s) => s.studentId !== studentId);
  store.results = store.results.filter((r) => r.studentId !== studentId);
  store.libraryIssues = store.libraryIssues.filter((l) => l.studentId !== studentId);
  store.grievances = store.grievances.filter((g) => g.studentId !== studentId);
  for (const d of store.placementDrives) {
    d.registeredStudentIds = d.registeredStudentIds.filter((id) => id !== studentId);
  }
}

export async function bulkImportStudents(input: {
  rows: Record<string, string>[];
  defaultCourse: "BCA" | "BBA";
  defaultSemester: number;
  defaultSection: string;
  defaultBatch: string;
  updateExisting?: boolean;
  dryRun?: boolean;
}): Promise<{
  importedCount: number;
  updatedCount: number;
  skippedCount: number;
  reports: BulkImportRowReport[];
}> {
  const store = getStore();
  const reports: BulkImportRowReport[] = [];
  let importedCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;

  const pick = (row: Record<string, string>, keys: string[]): string => {
    for (const k of keys) {
      if (row[k]) return row[k].trim();
    }
    return "";
  };

  for (let i = 0; i < input.rows.length; i++) {
    const r = input.rows[i];
    const rowNumber = i + 2;
    const fullName = pick(r, ["full_name", "fullname", "student_name", "name"]);
    const fatherName = pick(r, ["father_name", "fathername", "father_s_name", "guardian_name"]) || "Shri Guardian";
    const rawCourse = pick(r, ["course", "programme", "class"]).toUpperCase();
    const course: "BCA" | "BBA" = rawCourse.includes("BBA") ? "BBA" : rawCourse.includes("BCA") ? "BCA" : input.defaultCourse;
    const rawSem = Number.parseInt(pick(r, ["semester", "sem"]), 10);
    const semester = Number.isFinite(rawSem) && rawSem >= 1 && rawSem <= 6 ? rawSem : input.defaultSemester;
    const section = (pick(r, ["section", "sec"]) || input.defaultSection || "A").toUpperCase().slice(0, 8);
    const batch = pick(r, ["batch", "session"]) || input.defaultBatch || "2026–29";
    const enrollmentNo = pick(r, ["enrollment_no", "enrollment_number", "enrollment", "enrol_no", "login_id"]).toUpperCase();
    const universityRollNo = pick(r, ["university_roll_no", "roll_no", "roll_number", "university_roll"]);
    const phone = pick(r, ["student_phone", "phone", "mobile", "contact"]);
    const guardianPhone = pick(r, ["guardian_phone", "parent_phone", "father_phone"]) || phone || "+91-9415000000";
    const dob = normalizeSpreadsheetDate(pick(r, ["dob", "dob_yyyy_mm_dd", "date_of_birth"]), "2007-01-01");
    const email = pick(r, ["email", "email_id"]);
    const bloodGroup = pick(r, ["blood_group", "blood"]) || "O+";

    if (!fullName || !phone) {
      skippedCount++;
      reports.push({
        rowNumber,
        enrollmentNo: enrollmentNo || "—",
        fullName: fullName || "(Blank Name)",
        course,
        semester,
        status: "skipped",
        note: "Missing required Full Name or Student Phone.",
      });
      continue;
    }

    const existing = enrollmentNo
      ? store.students.find((s) => s.enrollmentNo.toUpperCase() === enrollmentNo)
      : undefined;

    if (existing) {
      if (!input.updateExisting) {
        skippedCount++;
        reports.push({
          rowNumber,
          enrollmentNo: existing.enrollmentNo,
          fullName,
          course,
          semester,
          status: "skipped",
          note: "Duplicate Enrollment No. (enable Update Existing to overwrite).",
        });
        continue;
      }
      if (!input.dryRun) {
        await updateStudentRecord({
          studentId: existing.id,
          universityRollNo: universityRollNo || existing.universityRollNo,
          fullName,
          fatherName,
          course,
          batch,
          semester,
          section,
          dob,
          phone,
          guardianPhone,
          email: email || existing.email || undefined,
          bloodGroup,
        });
      }
      updatedCount++;
      reports.push({
        rowNumber,
        enrollmentNo: existing.enrollmentNo,
        fullName,
        course,
        semester,
        status: "updated",
        note: input.dryRun ? "Ready to update existing class student." : "Updated existing record.",
      });
      continue;
    }

    const assignedEnr = enrollmentNo || `MSITM-${course}-S${semester}-${String(store.nextId + i + 1).padStart(3, "0")}`;
    if (!input.dryRun) {
      await onboardStudent({
        enrollmentNo: assignedEnr,
        universityRollNo,
        fullName,
        fatherName,
        course,
        batch,
        semester,
        section,
        dob,
        phone,
        guardianPhone,
        email,
        bloodGroup,
      });
    }
    importedCount++;
    reports.push({
      rowNumber,
      enrollmentNo: assignedEnr,
      fullName,
      course,
      semester,
      status: "imported",
      note: input.dryRun ? `Will enrol in ${course} Sem ${semester} Sec ${section}` : `Enrolled (${course} S${semester})`,
    });
  }

  return { importedCount, updatedCount, skippedCount, reports };
}

export async function convertAdmissionLeadToStudent(input: {
  leadId: number;
  course: "BCA" | "BBA";
  semester: number;
  section: string;
  batch: string;
}): Promise<StudentRecord> {
  const store = getStore();
  const lead = store.admissionLeads.find((l) => l.id === input.leadId);
  if (!lead) throw new Error("Admission application not found.");

  const student = await onboardStudent({
    fullName: lead.fullName,
    fatherName: "Guardian of " + lead.fullName,
    course: input.course,
    semester: input.semester,
    section: input.section,
    batch: input.batch,
    dob: "2007-01-01",
    phone: lead.phone,
    guardianPhone: lead.phone,
    email: lead.email,
  });
  store.admissionLeads = store.admissionLeads.filter((l) => l.id !== input.leadId);
  return student;
}

export async function upsertStaffAccount(input: {
  id?: number;
  username: string;
  role: Exclude<PortalRole, "student">;
  displayName: string;
  password?: string;
  active?: boolean;
}): Promise<StaffUserSummary> {
  const store = getStore();
  if (input.id) {
    const existing = store.users.find((u) => u.id === input.id && u.role !== "student");
    if (!existing) throw new Error("Staff account not found.");
    existing.displayName = input.displayName.trim();
    existing.role = input.role;
    if (typeof input.active === "boolean") existing.active = input.active;
    if (input.password && input.password.trim().length >= 4) {
      existing.passwordHash = hashPassword(input.password.trim());
    }
    return {
      id: existing.id,
      username: existing.username,
      role: existing.role,
      displayName: existing.displayName,
      active: existing.active,
    };
  }

  const cleanUsername = input.username.trim().toLowerCase();
  if (store.users.some((u) => u.username.toLowerCase() === cleanUsername)) {
    throw new Error(`Username "${cleanUsername}" already exists.`);
  }
  const user: PortalUserRow = {
    id: nextSeq(),
    username: cleanUsername,
    passwordHash: hashPassword(input.password?.trim() || "msitm@2026"),
    role: input.role,
    displayName: input.displayName.trim(),
    active: input.active ?? true,
  };
  store.users.push(user);
  return {
    id: user.id,
    username: user.username,
    role: user.role,
    displayName: user.displayName,
    active: user.active,
  };
}

export async function deleteStaffAccount(userId: number): Promise<void> {
  const store = getStore();
  const target = store.users.find((u) => u.id === userId);
  if (!target || target.role === "student") throw new Error("Staff user not found.");
  if (target.username === "admin") throw new Error("Primary root admin account cannot be deleted.");
  store.users = store.users.filter((u) => u.id !== userId);
}

export async function upsertFeeStructure(input: {
  course: "BCA" | "BBA";
  semester: number;
  academicYear: string;
  tuitionFee: number;
  labFee: number;
  examFee: number;
  libraryFee: number;
  dueDate: string;
}): Promise<FeeStructureRecord> {
  const store = getStore();
  const sem = Math.min(6, Math.max(1, Math.round(input.semester)));
  const totalFee =
    Math.max(0, Math.round(input.tuitionFee)) +
    Math.max(0, Math.round(input.labFee)) +
    Math.max(0, Math.round(input.examFee)) +
    Math.max(0, Math.round(input.libraryFee));

  const existing = store.feeStructures.find((f) => f.course === input.course && f.semester === sem);
  if (existing) {
    existing.academicYear = input.academicYear.trim() || existing.academicYear;
    existing.tuitionFee = Math.max(0, Math.round(input.tuitionFee));
    existing.labFee = Math.max(0, Math.round(input.labFee));
    existing.examFee = Math.max(0, Math.round(input.examFee));
    existing.libraryFee = Math.max(0, Math.round(input.libraryFee));
    existing.totalFee = totalFee;
    existing.dueDate = input.dueDate.trim() || existing.dueDate;
    return existing;
  }

  const created: FeeStructureRecord = {
    id: nextSeq(),
    course: input.course,
    semester: sem,
    academicYear: input.academicYear.trim() || "2026–27",
    tuitionFee: Math.max(0, Math.round(input.tuitionFee)),
    labFee: Math.max(0, Math.round(input.labFee)),
    examFee: Math.max(0, Math.round(input.examFee)),
    libraryFee: Math.max(0, Math.round(input.libraryFee)),
    totalFee,
    dueDate: input.dueDate.trim() || "2026-11-30",
  };
  store.feeStructures.push(created);
  return created;
}

export async function deleteFeeStructure(structureId: number): Promise<void> {
  const store = getStore();
  store.feeStructures = store.feeStructures.filter((f) => f.id !== structureId);
}

export async function deleteFeePayment(paymentId: number): Promise<void> {
  const store = getStore();
  store.feePayments = store.feePayments.filter((p) => p.id !== paymentId);
}

export async function upsertExamSession(input: {
  id?: number;
  title: string;
  course: "BCA" | "BBA";
  semester: number;
  examType: "University" | "Sessional";
  examCentre: string;
  minAttendancePct: number;
  active: boolean;
}): Promise<ExamSessionRecord> {
  const store = getStore();
  const sem = Math.min(6, Math.max(1, Math.round(input.semester)));
  if (input.id) {
    const sess = store.examSessions.find((e) => e.id === input.id);
    if (!sess) throw new Error("Exam session not found.");
    sess.title = input.title.trim();
    sess.course = input.course;
    sess.semester = sem;
    sess.examType = input.examType;
    sess.examCentre = input.examCentre.trim();
    sess.minAttendancePct = Math.min(100, Math.max(0, Math.round(input.minAttendancePct)));
    sess.active = input.active;
    return sess;
  }
  const created: ExamSessionRecord = {
    id: nextSeq(),
    title: input.title.trim(),
    course: input.course,
    semester: sem,
    examType: input.examType,
    examCentre: input.examCentre.trim() || "MSITM Degree College Block-A, Gonda",
    minAttendancePct: Math.min(100, Math.max(0, Math.round(input.minAttendancePct))),
    active: input.active,
    schedules: [],
  };
  store.examSessions.unshift(created);
  return created;
}

export async function deleteExamSession(sessionId: number): Promise<void> {
  const store = getStore();
  store.examSessions = store.examSessions.filter((e) => e.id !== sessionId);
  store.admitCards = store.admitCards.filter((a) => a.examSessionId !== sessionId);
}

export async function addExamScheduleItem(input: {
  examSessionId: number;
  subjectCode: string;
  subjectName: string;
  examDate: string;
  shiftTime: string;
  roomNo: string;
}): Promise<ExamScheduleItem> {
  const store = getStore();
  const sess = store.examSessions.find((e) => e.id === input.examSessionId);
  if (!sess) throw new Error("Exam session not found.");
  const paper: ExamScheduleItem = {
    id: nextSeq(),
    examSessionId: sess.id,
    subjectCode: input.subjectCode.trim().toUpperCase(),
    subjectName: input.subjectName.trim(),
    examDate: input.examDate.trim(),
    shiftTime: input.shiftTime.trim() || "10:00 AM – 01:00 PM",
    roomNo: input.roomNo.trim() || "Hall-101",
  };
  sess.schedules.push(paper);
  return paper;
}

export async function deleteExamScheduleItem(examSessionId: number, scheduleId: number): Promise<void> {
  const store = getStore();
  const sess = store.examSessions.find((e) => e.id === examSessionId);
  if (!sess) throw new Error("Exam session not found.");
  sess.schedules = sess.schedules.filter((s) => s.id !== scheduleId);
}

export async function bulkReleaseAdmitCards(input: {
  course: "BCA" | "BBA" | "ALL";
  semester: number;
}): Promise<number> {
  const store = getStore();
  let updated = 0;
  for (const st of store.students) {
    if (input.course !== "ALL" && st.course !== input.course) continue;
    if (input.semester > 0 && st.semester !== input.semester) continue;
    const sess = store.examSessions.find((e) => e.course === st.course && e.semester === st.semester && e.active);
    if (!sess) continue;
    await updateAdmitCardDecision({
      studentId: st.id,
      examSessionId: sess.id,
      examFormVerified: true,
      isReleased: true,
    });
    updated++;
  }
  return updated;
}

export async function deleteSemesterResult(resultId: number): Promise<void> {
  const store = getStore();
  store.results = store.results.filter((r) => r.id !== resultId);
}

export async function addAttendanceSubject(input: {
  studentId: number;
  semester: number;
  subjectCode: string;
  subjectName: string;
  totalClasses?: number;
  attendedClasses?: number;
  internalMarks?: number;
}): Promise<AttendanceRecordItem> {
  const store = getStore();
  const row: AttendanceRecordItem = {
    id: nextSeq(),
    studentId: input.studentId,
    semester: Math.min(6, Math.max(1, Math.round(input.semester))),
    subjectCode: input.subjectCode.trim().toUpperCase(),
    subjectName: input.subjectName.trim(),
    totalClasses: Math.max(0, Math.round(input.totalClasses ?? 0)),
    attendedClasses: Math.max(0, Math.round(input.attendedClasses ?? 0)),
    medicalLeaves: 0,
    internalMarks: Math.min(25, Math.max(0, Math.round(input.internalMarks ?? 0))),
    maxInternalMarks: 25,
  };
  store.attendance.push(row);
  return row;
}

export async function deleteAttendanceRecord(recordId: number): Promise<void> {
  const store = getStore();
  store.attendance = store.attendance.filter((a) => a.id !== recordId);
}

export async function markClassAttendanceBatch(input: {
  course: "BCA" | "BBA";
  semester: number;
  subjectCode: string;
  marks: { studentId: number; status: "present" | "absent" | "medical" }[];
}): Promise<number> {
  const store = getStore();
  let count = 0;
  for (const m of input.marks) {
    const row = store.attendance.find(
      (a) =>
        a.studentId === m.studentId &&
        a.semester === input.semester &&
        a.subjectCode.toUpperCase() === input.subjectCode.trim().toUpperCase()
    );
    if (!row) continue;
    row.totalClasses += 1;
    if (m.status === "present") row.attendedClasses += 1;
    else if (m.status === "medical") row.medicalLeaves += 1;
    count++;
  }
  return count;
}

export async function upsertTimetableSlot(input: {
  id?: number;
  course: "BCA" | "BBA";
  semester: number;
  dayOfWeek: TimetableSlotRecord["dayOfWeek"];
  slotTime: string;
  subjectCode: string;
  subjectName: string;
  roomOrLab: string;
  facultyName: string;
}): Promise<TimetableSlotRecord> {
  const store = getStore();
  const sem = Math.min(6, Math.max(1, Math.round(input.semester)));
  if (input.id) {
    const slot = store.timetable.find((t) => t.id === input.id);
    if (!slot) throw new Error("Timetable slot not found.");
    slot.course = input.course;
    slot.semester = sem;
    slot.dayOfWeek = input.dayOfWeek;
    slot.slotTime = input.slotTime.trim();
    slot.subjectCode = input.subjectCode.trim().toUpperCase();
    slot.subjectName = input.subjectName.trim();
    slot.roomOrLab = input.roomOrLab.trim();
    slot.facultyName = input.facultyName.trim();
    return slot;
  }
  const slot: TimetableSlotRecord = {
    id: nextSeq(),
    course: input.course,
    semester: sem,
    dayOfWeek: input.dayOfWeek,
    slotTime: input.slotTime.trim(),
    subjectCode: input.subjectCode.trim().toUpperCase(),
    subjectName: input.subjectName.trim(),
    roomOrLab: input.roomOrLab.trim(),
    facultyName: input.facultyName.trim(),
  };
  store.timetable.push(slot);
  return slot;
}

export async function deleteTimetableSlot(slotId: number): Promise<void> {
  const store = getStore();
  store.timetable = store.timetable.filter((t) => t.id !== slotId);
}

export async function upsertFacultyAllocation(input: {
  id?: number;
  facultyName: string;
  department: string;
  course: "BCA" | "BBA";
  semester: number;
  subjectCode: string;
  subjectName: string;
  syllabusPct: number;
  lastTopicCovered: string;
  timetableSlot: string;
}): Promise<FacultyAllocationRecord> {
  const store = getStore();
  if (input.id) {
    const f = store.facultyAllocations.find((x) => x.id === input.id);
    if (!f) throw new Error("Allocation not found.");
    f.facultyName = input.facultyName.trim();
    f.department = input.department.trim();
    f.course = input.course;
    f.semester = Math.min(6, Math.max(1, Math.round(input.semester)));
    f.subjectCode = input.subjectCode.trim().toUpperCase();
    f.subjectName = input.subjectName.trim();
    f.syllabusPct = Math.min(100, Math.max(0, Math.round(input.syllabusPct)));
    f.lastTopicCovered = input.lastTopicCovered.trim();
    f.timetableSlot = input.timetableSlot.trim();
    return f;
  }
  const created: FacultyAllocationRecord = {
    id: nextSeq(),
    facultyName: input.facultyName.trim(),
    department: input.department.trim(),
    course: input.course,
    semester: Math.min(6, Math.max(1, Math.round(input.semester))),
    subjectCode: input.subjectCode.trim().toUpperCase(),
    subjectName: input.subjectName.trim(),
    syllabusPct: Math.min(100, Math.max(0, Math.round(input.syllabusPct))),
    lastTopicCovered: input.lastTopicCovered.trim() || "Unit 1 Introduction",
    timetableSlot: input.timetableSlot.trim() || "Mon · 10:30 AM",
  };
  store.facultyAllocations.push(created);
  return created;
}

export async function deleteFacultyAllocation(id: number): Promise<void> {
  const store = getStore();
  store.facultyAllocations = store.facultyAllocations.filter((f) => f.id !== id);
}

export async function deleteAssignmentTask(assignmentId: number): Promise<void> {
  const store = getStore();
  store.assignments = store.assignments.filter((a) => a.id !== assignmentId);
  store.submissions = store.submissions.filter((s) => s.assignmentId !== assignmentId);
}

export async function deleteUgNotice(noticeId: number): Promise<void> {
  const store = getStore();
  store.notices = store.notices.filter((n) => n.id !== noticeId);
}

export async function deleteCertificateRequest(certId: number): Promise<void> {
  const store = getStore();
  store.certificates = store.certificates.filter((c) => c.id !== certId);
}

export async function issueGatePassByStaff(input: {
  studentId: number;
  passType: GatePassRecord["passType"];
  reason: string;
  symptomsOrNotes?: string;
  guardianNotified: boolean;
  approvedBy: string;
}): Promise<GatePassRecord> {
  const created = await createGatePass({
    studentId: input.studentId,
    passType: input.passType,
    reason: input.reason,
    symptomsOrNotes: input.symptomsOrNotes,
    requestedExitAt: "Immediate Exit (Office Issued)",
  });
  return reviewGatePass({
    passId: created.id,
    decision: "approve",
    guardianNotified: input.guardianNotified,
    validUntil: "Same Day · Immediate Exit",
    approvedBy: input.approvedBy,
  });
}

export async function upsertPlacementDrive(input: {
  id?: number;
  companyOrScheme: string;
  kind: PlacementDriveRecord["kind"];
  eligibleCourses: PlacementDriveRecord["eligibleCourses"];
  minCgpa: string;
  driveDate: string;
  venue: string;
  ctcOrBenefit: string;
  description: string;
  active: boolean;
}): Promise<PlacementDriveRecord> {
  const store = getStore();
  if (input.id) {
    const drive = store.placementDrives.find((d) => d.id === input.id);
    if (!drive) throw new Error("Drive/Scheme not found.");
    drive.companyOrScheme = input.companyOrScheme.trim();
    drive.kind = input.kind;
    drive.eligibleCourses = input.eligibleCourses;
    drive.minCgpa = input.minCgpa.trim();
    drive.driveDate = input.driveDate.trim();
    drive.venue = input.venue.trim();
    drive.ctcOrBenefit = input.ctcOrBenefit.trim();
    drive.description = input.description.trim();
    drive.active = input.active;
    return drive;
  }
  const created: PlacementDriveRecord = {
    id: nextSeq(),
    companyOrScheme: input.companyOrScheme.trim(),
    kind: input.kind,
    eligibleCourses: input.eligibleCourses,
    minCgpa: input.minCgpa.trim() || "0.0",
    driveDate: input.driveDate.trim(),
    venue: input.venue.trim() || "MSITM Campus",
    ctcOrBenefit: input.ctcOrBenefit.trim() || "As per norms",
    description: input.description.trim(),
    registeredStudentIds: [],
    active: input.active,
    createdAt: new Date().toISOString(),
  };
  store.placementDrives.unshift(created);
  return created;
}

export async function deletePlacementDrive(driveId: number): Promise<void> {
  const store = getStore();
  store.placementDrives = store.placementDrives.filter((d) => d.id !== driveId);
}

export async function togglePlacementDriveRegistration(
  driveId: number,
  studentId: number
): Promise<PlacementDriveRecord> {
  const store = getStore();
  const drive = store.placementDrives.find((d) => d.id === driveId);
  if (!drive) throw new Error("Drive/Scheme not found.");
  if (drive.registeredStudentIds.includes(studentId)) {
    drive.registeredStudentIds = drive.registeredStudentIds.filter((id) => id !== studentId);
  } else {
    drive.registeredStudentIds.push(studentId);
  }
  return drive;
}

export async function deleteLibraryIssue(issueId: number): Promise<void> {
  const store = getStore();
  store.libraryIssues = store.libraryIssues.filter((b) => b.id !== issueId);
}

export async function deleteLabTicket(ticketId: number): Promise<void> {
  const store = getStore();
  store.labTickets = store.labTickets.filter((t) => t.id !== ticketId);
}
