export type PortalRole =
  | "student"
  | "faculty"
  | "accounts"
  | "exam_cell"
  | "gate_guard"
  | "admin";

export interface PortalSession {
  userId: number;
  username: string;
  email?: string;
  role: PortalRole;
  displayName: string;
  studentId?: number;
  tokenVersion?: number;
  exp: number;
}

export interface StudentRecord {
  id: number;
  userId?: number | null;
  enrollmentNo: string;
  universityRollNo: string;
  fullName: string;
  fatherName: string;
  course: "BCA" | "BBA";
  batch: string;
  semester: number;
  section: string;
  dob: string;
  phone: string;
  guardianPhone: string;
  email?: string | null;
  bloodGroup: string;
  photoUrl?: string | null;
  importBatchId?: string | null;
  idVerificationCode: string;
  status: "active" | "alumni" | "suspended";
}

export interface FeeStructureRecord {
  id: number;
  course: "BCA" | "BBA";
  semester: number;
  academicYear: string;
  tuitionFee: number;
  labFee: number;
  examFee: number;
  libraryFee: number;
  totalFee: number;
  dueDate: string;
}

export interface FeePaymentRecord {
  id: number;
  studentId: number;
  semester: number;
  amountPaid: number;
  concession: number;
  paymentMode: "Cash" | "UPI" | "NEFT" | "Card" | "Scholarship";
  transactionRef: string;
  receiptNo: string;
  verificationToken: string;
  recordedBy: string;
  remarks: string;
  paidAt: string;
}

export interface AttendanceRecordItem {
  id: number;
  studentId: number;
  semester: number;
  subjectCode: string;
  subjectName: string;
  totalClasses: number;
  attendedClasses: number;
  medicalLeaves: number;
  internalMarks: number;
  maxInternalMarks: number;
}

export interface ExamScheduleItem {
  id: number;
  examSessionId: number;
  subjectCode: string;
  subjectName: string;
  examDate: string;
  shiftTime: string;
  roomNo: string;
}

export interface ExamSessionRecord {
  id: number;
  title: string;
  course: "BCA" | "BBA";
  semester: number;
  examType: "University" | "Sessional";
  examCentre: string;
  minAttendancePct: number;
  active: boolean;
  schedules: ExamScheduleItem[];
}

export interface AdmitCardRecord {
  id: number;
  studentId: number;
  examSessionId: number;
  examFormVerified: boolean;
  overrideApproved: boolean;
  overrideReason: string;
  isReleased: boolean;
  verificationToken: string;
  issuedAt: string | null;
}

export interface GatePassRecord {
  id: number;
  studentId: number;
  passCode: string;
  verificationToken: string;
  passType: "sick_leave" | "urgent_exit" | "medical_multiday";
  reason: string;
  symptomsOrNotes: string;
  guardianPhone: string;
  guardianNotified: boolean;
  requestedExitAt: string;
  validUntil: string;
  status: "pending" | "approved" | "rejected" | "checked_out" | "returned" | "expired";
  approvedBy: string;
  rejectionReason: string;
  checkedOutAt: string | null;
  returnedAt: string | null;
  createdAt: string;
}

export interface CertificateRequestRecord {
  id: number;
  studentId: number;
  certType: "bonafide" | "fee_structure" | "character" | "transfer_no_dues";
  purpose: string;
  accountsCleared: boolean;
  libraryCleared: boolean;
  labCleared: boolean;
  status: "pending" | "processing" | "ready" | "issued" | "rejected";
  referenceNo: string;
  createdAt: string;
}

export interface UgNoticeRecord {
  id: number;
  title: string;
  courseScope: "ALL" | "BCA" | "BBA";
  semesterScope: number;
  category: "Exam" | "Fee" | "Scholarship" | "Academic" | "Urgent";
  body: string;
  publishedAt: string;
}

export interface TimetableSlotRecord {
  id: number;
  course: "BCA" | "BBA";
  semester: number;
  dayOfWeek: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";
  slotTime: string;
  subjectCode: string;
  subjectName: string;
  roomOrLab: string;
  facultyName: string;
}

export type AssignmentKind = "Assignment" | "BCA Practical" | "BBA Internship" | "Study Notes";

export interface AssignmentRecord {
  id: number;
  course: "BCA" | "BBA";
  semester: number;
  subjectCode: string;
  title: string;
  kind: AssignmentKind;
  dueDate: string;
  resourceUrl: string;
  instructions: string;
  createdBy: string;
  createdAt: string;
}

export interface AssignmentSubmissionRecord {
  id: number;
  assignmentId: number;
  studentId: number;
  submissionNote: string;
  attachmentRef: string;
  marksAwarded: number | null;
  maxMarks: number;
  feedback: string;
  status: "pending" | "submitted" | "evaluated";
  submittedAt: string;
}

export interface SubjectGradeItem {
  code: string;
  name: string;
  theoryMarks: number;
  internalMarks: number;
  maxMarks: number;
  grade: string;
  credits: number;
}

export interface SemesterResultRecord {
  id: number;
  studentId: number;
  semester: number;
  academicYear: string;
  sgpa: string;
  creditsEarned: number;
  resultStatus: "Pass" | "Pass with Grace" | "Back Paper" | "Result Awaited";
  backPaperCodes: string;
  subjectGrades: SubjectGradeItem[];
  verificationToken: string;
  declaredAt: string;
}

export interface FacultyAllocationRecord {
  id: number;
  facultyName: string;
  department: string;
  course: "BCA" | "BBA";
  semester: number;
  subjectCode: string;
  subjectName: string;
  syllabusPct: number;
  lastTopicCovered: string;
  timetableSlot: string;
}

export interface StaffLeaveRecord {
  id: number;
  facultyName: string;
  leaveType: "Casual" | "Medical" | "Duty";
  fromDate: string;
  toDate: string;
  reason: string;
  substituteFaculty: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface LibraryIssueRecord {
  id: number;
  studentId: number;
  accessionNo: string;
  bookTitle: string;
  author: string;
  issuedDate: string;
  dueDate: string;
  returnedDate: string | null;
  fineAmount: number;
  status: "issued" | "overdue" | "returned";
}

export interface LabTicketRecord {
  id: number;
  labName: "Computer Lab 1" | "Computer Lab 2" | "IoT & Hardware Wing";
  workstationCode: string;
  category: "Hardware" | "Software/Compiler" | "Network/Wi-Fi" | "Projector";
  description: string;
  reportedBy: string;
  priority: "Normal" | "Urgent";
  status: "open" | "in_progress" | "resolved";
  resolutionNote: string;
  createdAt: string;
}

export interface GrievanceRecord {
  id: number;
  ticketCode: string;
  studentId: number;
  category:
    | "Academic"
    | "Infrastructure"
    | "Examination"
    | "Anti-Ragging (Confidential)"
    | "Fee & Scholarship";
  subject: string;
  details: string;
  isAnonymous: boolean;
  status: "submitted" | "under_review" | "resolved";
  actionTaken: string;
  createdAt: string;
}

export interface PlacementDriveRecord {
  id: number;
  companyOrScheme: string;
  kind: "Placement Drive" | "Scholarship" | "Workshop";
  eligibleCourses: "ALL" | "BCA" | "BBA";
  minCgpa: string;
  driveDate: string;
  venue: string;
  ctcOrBenefit: string;
  description: string;
  registeredStudentIds: number[];
  active: boolean;
  createdAt: string;
}

export interface StaffUserSummary {
  id: number;
  username: string;
  role: PortalRole;
  displayName: string;
  active: boolean;
}

export interface StudentPortalSnapshot {
  student: StudentRecord;
  feeStructure: FeeStructureRecord;
  payments: FeePaymentRecord[];
  feeSummary: {
    totalPayable: number;
    totalPaid: number;
    totalConcession: number;
    balance: number;
    isCleared: boolean;
  };
  attendance: AttendanceRecordItem[];
  overallAttendancePct: number;
  examSession: ExamSessionRecord | null;
  admitCard: AdmitCardRecord | null;
  admitEligibility: {
    feeCleared: boolean;
    attendanceCleared: boolean;
    examFormVerified: boolean;
    canDownload: boolean;
    blockReasons: string[];
  };
  gatePasses: GatePassRecord[];
  certificates: CertificateRequestRecord[];
  notices: UgNoticeRecord[];
  timetable: TimetableSlotRecord[];
  assignments: (AssignmentRecord & { submission: AssignmentSubmissionRecord | null })[];
  results: SemesterResultRecord[];
  cgpa: string;
  libraryIssues: LibraryIssueRecord[];
  libraryCleared: boolean;
  labTickets: LabTicketRecord[];
  grievances: GrievanceRecord[];
  placementDrives: PlacementDriveRecord[];
}

export interface BulkImportRowReport {
  rowNumber: number;
  enrollmentNo: string;
  fullName: string;
  course: "BCA" | "BBA";
  semester: number;
  status: "imported" | "updated" | "skipped";
  note: string;
}

export interface VerificationLookupResult {
  valid: boolean;
  documentType?: "Admit Card" | "Fee Receipt" | "Gate Pass" | "Student ID Card" | "Semester Result";
  code: string;
  holderName?: string;
  enrollmentNo?: string;
  courseLabel?: string;
  statusLabel?: string;
  detail?: string;
  issuedAt?: string;
}

