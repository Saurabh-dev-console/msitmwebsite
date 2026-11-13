import {
  boolean,
  date,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

/** General enquiry / contact form submissions (replaces the WP contact widget). */
export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 80 }).notNull(),
  lastName: varchar("last_name", { length: 80 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 30 }),
  interest: varchar("interest", { length: 120 }),
  message: text("message").notNull(),
  source: varchar("source", { length: 80 }).notNull().default("website"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/** Admission application requests submitted through /admission-form. */
export const admissions = pgTable("admissions", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 160 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 30 }).notNull(),
  course: varchar("course", { length: 120 }).notNull(),
  qualification: varchar("qualification", { length: 120 }),
  city: varchar("city", { length: 120 }),
  message: text("message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/** Student feedback submissions from /student-corner. */
export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 80 }).notNull(),
  lastName: varchar("last_name", { length: 80 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  kind: varchar("kind", { length: 40 }).notNull().default("feedback"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/**
 * Certificate verification lookups.
 * The official certificate records are maintained by the MSITM office and were
 * not published on the reference website, so lookups are logged here and the
 * visitor is directed to the official helpline. No certificate data is faked.
 */
export const certificateLookups = pgTable("certificate_lookups", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  certificateId: varchar("certificate_id", { length: 80 }),
  event: varchar("event", { length: 160 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/* ---------------- UG (BCA & BBA) Student Portal & College ERP Tables ---------------- */

export const portalUsers = pgTable("portal_users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 64 }).notNull().unique(), // Enrollment No for students, staff handle for staff
  email: varchar("email", { length: 160 }).unique(),                 // Verified Gmail for students, office email for staff
  passwordHash: text("password_hash").notNull(),
  role: varchar("role", { length: 32 }).notNull(),                  // student | faculty | accounts | exam_cell | gate_guard | admin
  displayName: varchar("display_name", { length: 160 }).notNull(),
  tokenVersion: integer("token_version").notNull().default(1),      // Incremented on password change to revoke all active sessions
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => [
  uniqueIndex("idx_portal_users_email").on(table.email),
  uniqueIndex("idx_portal_users_username").on(table.username),
]);

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => portalUsers.id, { onDelete: "set null" }),
  enrollmentNo: varchar("enrollment_no", { length: 48 }).notNull().unique(),
  universityRollNo: varchar("university_roll_no", { length: 48 }),
  fullName: varchar("full_name", { length: 160 }).notNull(),
  fatherName: varchar("father_name", { length: 160 }).notNull(),
  course: varchar("course", { length: 16 }).notNull(), // BCA | BBA
  batch: varchar("batch", { length: 24 }).notNull(), // e.g., 2024-27
  semester: integer("semester").notNull().default(1), // 1..6
  section: varchar("section", { length: 16 }).notNull().default("A"),
  dob: date("dob").notNull(), // YYYY-MM-DD format
  phone: varchar("phone", { length: 30 }).notNull(),
  guardianPhone: varchar("guardian_phone", { length: 30 }).notNull(),
  email: varchar("email", { length: 160 }), // Nullable until student claims and registers their personal Gmail
  bloodGroup: varchar("blood_group", { length: 12 }),
  photoUrl: text("photo_url"), // Optional student profile photo URL
  importBatchId: varchar("import_batch_id", { length: 64 }), // Tracks Excel import batch for safe rollbacks
  idVerificationCode: varchar("id_verification_code", { length: 48 }).notNull().unique(),
  status: varchar("status", { length: 24 }).notNull().default("active"), // active | alumni | suspended
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => [
  index("idx_students_user_id").on(table.userId),
  index("idx_students_course_sem").on(table.course, table.semester),
  index("idx_students_import_batch").on(table.importBatchId),
]);

/**
 * Salted Scrypt OTP verifications for student Gmail registration.
 * Immune to rainbow-table brute force attacks.
 */
export const otpVerifications = pgTable("otp_verifications", {
  id: serial("id").primaryKey(),
  identifier: varchar("identifier", { length: 160 }).notNull(), // Student Gmail address
  salt: varchar("salt", { length: 64 }).notNull(),              // Per-OTP cryptographic salt
  otpHash: varchar("otp_hash", { length: 128 }).notNull(),      // scryptSync hash
  purpose: varchar("purpose", { length: 32 }).notNull(),        // 'STUDENT_REGISTRATION'
  attempts: integer("attempts").notNull().default(0),
  maxAttempts: integer("max_attempts").notNull().default(3),
  expiresAt: timestamp("expires_at").notNull(),                 // 5-minute TTL
  consumedAt: timestamp("consumed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => [
  index("idx_otp_identifier").on(table.identifier, table.expiresAt),
]);

/**
 * Single-link password reset tokens (zero dual-OTP confusion).
 */
export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => portalUsers.id, { onDelete: "cascade" }),
  tokenHash: varchar("token_hash", { length: 128 }).notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),                 // 15-minute TTL
  usedAt: timestamp("used_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/**
 * Serverless-safe atomic rate limiting table.
 * Unique constraint on rateKey prevents race conditions across serverless Lambdas.
 */
export const rateLimitHits = pgTable("rate_limit_hits", {
  id: serial("id").primaryKey(),
  rateKey: varchar("rate_key", { length: 160 }).notNull().unique(), // e.g., 'login:ip:103.21.24.2' or 'otp:user@gmail.com'
  action: varchar("action", { length: 32 }).notNull().default("GENERAL"), // 'LOGIN' | 'OTP_REQUEST' | 'FORGOT_PW' | 'GENERAL'
  hitCount: integer("hit_count").notNull().default(1),
  windowStart: timestamp("window_start").notNull().defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
}, (table) => [
  uniqueIndex("idx_rate_limit_key").on(table.rateKey),
  index("idx_rate_limit_expires").on(table.expiresAt),
]);

/**
 * Institutional audit log tracking all administrative and financial mutations.
 */
export const auditLogs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),
  actorUserId: integer("actor_user_id").references(() => portalUsers.id, { onDelete: "set null" }),
  actorName: varchar("actor_name", { length: 160 }).notNull(),
  actorRole: varchar("actor_role", { length: 32 }).notNull(),
  action: varchar("action", { length: 64 }).notNull(),           // e.g., 'FEE_PAYMENT', 'STUDENT_REGISTERED'
  entityType: varchar("entity_type", { length: 64 }).notNull(),  // 'student', 'fee_payment', 'admit_card'
  entityId: varchar("entity_id", { length: 64 }).notNull(),
  details: text("details"),                                      // JSON string metadata
  ipAddress: varchar("ip_address", { length: 48 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => [
  index("idx_audit_logs_created_at").on(table.createdAt),
  index("idx_audit_logs_actor").on(table.actorUserId),
]);

export const feeStructures = pgTable("fee_structures", {
  id: serial("id").primaryKey(),
  course: varchar("course", { length: 16 }).notNull(), // BCA | BBA
  semester: integer("semester").notNull(), // 1..6
  academicYear: varchar("academic_year", { length: 20 }).notNull(),
  tuitionFee: integer("tuition_fee").notNull(),
  labFee: integer("lab_fee").notNull().default(0),
  examFee: integer("exam_fee").notNull(),
  libraryFee: integer("library_fee").notNull().default(0),
  totalFee: integer("total_fee").notNull(),
  dueDate: varchar("due_date", { length: 24 }).notNull(),
});

export const feePayments = pgTable("fee_payments", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id")
    .notNull()
    .references(() => students.id, { onDelete: "cascade" }),
  semester: integer("semester").notNull(),
  amountPaid: integer("amount_paid").notNull(),
  concession: integer("concession").notNull().default(0),
  paymentMode: varchar("payment_mode", { length: 32 }).notNull(), // Cash | UPI | NEFT | Card | Scholarship
  transactionRef: varchar("transaction_ref", { length: 80 }),
  receiptNo: varchar("receipt_no", { length: 48 }).notNull().unique(),
  verificationToken: varchar("verification_token", { length: 48 }).notNull().unique(),
  recordedBy: varchar("recorded_by", { length: 120 }).notNull(),
  remarks: text("remarks"),
  paidAt: timestamp("paid_at").notNull().defaultNow(),
});

export const attendanceRecords = pgTable("attendance_records", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id")
    .notNull()
    .references(() => students.id, { onDelete: "cascade" }),
  semester: integer("semester").notNull(),
  subjectCode: varchar("subject_code", { length: 24 }).notNull(),
  subjectName: varchar("subject_name", { length: 160 }).notNull(),
  totalClasses: integer("total_classes").notNull().default(0),
  attendedClasses: integer("attended_classes").notNull().default(0),
  medicalLeaves: integer("medical_leaves").notNull().default(0),
  internalMarks: integer("internal_marks").notNull().default(0),
  maxInternalMarks: integer("max_internal_marks").notNull().default(25),
});

export const examSessions = pgTable("exam_sessions", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 160 }).notNull(),
  course: varchar("course", { length: 16 }).notNull(), // BCA | BBA
  semester: integer("semester").notNull(),
  examType: varchar("exam_type", { length: 32 }).notNull(), // University | Sessional
  examCentre: varchar("exam_centre", { length: 160 }).notNull(),
  minAttendancePct: integer("min_attendance_pct").notNull().default(75),
  active: boolean("active").notNull().default(true),
});

export const examSchedules = pgTable("exam_schedules", {
  id: serial("id").primaryKey(),
  examSessionId: integer("exam_session_id")
    .notNull()
    .references(() => examSessions.id, { onDelete: "cascade" }),
  subjectCode: varchar("subject_code", { length: 24 }).notNull(),
  subjectName: varchar("subject_name", { length: 160 }).notNull(),
  examDate: varchar("exam_date", { length: 32 }).notNull(),
  shiftTime: varchar("shift_time", { length: 48 }).notNull(),
  roomNo: varchar("room_no", { length: 32 }).notNull(),
});

export const admitCards = pgTable("admit_cards", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id")
    .notNull()
    .references(() => students.id, { onDelete: "cascade" }),
  examSessionId: integer("exam_session_id")
    .notNull()
    .references(() => examSessions.id, { onDelete: "cascade" }),
  examFormVerified: boolean("exam_form_verified").notNull().default(false),
  overrideApproved: boolean("override_approved").notNull().default(false),
  overrideReason: text("override_reason"),
  isReleased: boolean("is_released").notNull().default(false),
  verificationToken: varchar("verification_token", { length: 48 }).notNull().unique(),
  issuedAt: timestamp("issued_at"),
});

export const gatePasses = pgTable("gate_passes", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id")
    .notNull()
    .references(() => students.id, { onDelete: "cascade" }),
  passCode: varchar("pass_code", { length: 16 }).notNull().unique(),
  verificationToken: varchar("verification_token", { length: 48 }).notNull().unique(),
  passType: varchar("pass_type", { length: 32 }).notNull(), // sick_leave | urgent_exit | medical_multiday
  reason: varchar("reason", { length: 200 }).notNull(),
  symptomsOrNotes: text("symptoms_or_notes"),
  guardianPhone: varchar("guardian_phone", { length: 30 }).notNull(),
  guardianNotified: boolean("guardian_notified").notNull().default(false),
  requestedExitAt: varchar("requested_exit_at", { length: 40 }).notNull(),
  validUntil: varchar("valid_until", { length: 40 }),
  status: varchar("status", { length: 24 }).notNull().default("pending"), // pending | approved | rejected | checked_out | returned | expired
  approvedBy: varchar("approved_by", { length: 120 }),
  rejectionReason: text("rejection_reason"),
  checkedOutAt: timestamp("checked_out_at"),
  returnedAt: timestamp("returned_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const certificateRequests = pgTable("certificate_requests", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id")
    .notNull()
    .references(() => students.id, { onDelete: "cascade" }),
  certType: varchar("cert_type", { length: 40 }).notNull(), // bonafide | fee_structure | character | transfer_no_dues
  purpose: text("purpose").notNull(),
  accountsCleared: boolean("accounts_cleared").notNull().default(false),
  libraryCleared: boolean("library_cleared").notNull().default(false),
  labCleared: boolean("lab_cleared").notNull().default(false),
  status: varchar("status", { length: 24 }).notNull().default("pending"), // pending | processing | ready | issued | rejected
  referenceNo: varchar("reference_no", { length: 48 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const ugNotices = pgTable("ug_notices", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  courseScope: varchar("course_scope", { length: 16 }).notNull().default("ALL"), // ALL | BCA | BBA
  semesterScope: integer("semester_scope").notNull().default(0), // 0 = all semesters
  category: varchar("category", { length: 32 }).notNull(), // Exam | Fee | Scholarship | Academic | Urgent
  body: text("body").notNull(),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
});

/* ---------------- Tier 2 & 3 ERP: Timetable, Practicals, Results, Faculty, Library, Labs & Grievances ---------------- */

export const timetables = pgTable("timetables", {
  id: serial("id").primaryKey(),
  course: varchar("course", { length: 16 }).notNull(), // BCA | BBA
  semester: integer("semester").notNull(),
  dayOfWeek: varchar("day_of_week", { length: 16 }).notNull(), // Mon | Tue | Wed | Thu | Fri | Sat
  slotTime: varchar("slot_time", { length: 32 }).notNull(),
  subjectCode: varchar("subject_code", { length: 24 }).notNull(),
  subjectName: varchar("subject_name", { length: 160 }).notNull(),
  roomOrLab: varchar("room_or_lab", { length: 48 }).notNull(),
  facultyName: varchar("faculty_name", { length: 120 }).notNull(),
});

export const assignments = pgTable("assignments", {
  id: serial("id").primaryKey(),
  course: varchar("course", { length: 16 }).notNull(),
  semester: integer("semester").notNull(),
  subjectCode: varchar("subject_code", { length: 24 }).notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  kind: varchar("kind", { length: 32 }).notNull(), // Assignment | BCA Practical | BBA Internship | Study Notes
  dueDate: varchar("due_date", { length: 32 }).notNull(),
  resourceUrl: text("resource_url"),
  instructions: text("instructions").notNull(),
  createdBy: varchar("created_by", { length: 120 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const assignmentSubmissions = pgTable("assignment_submissions", {
  id: serial("id").primaryKey(),
  assignmentId: integer("assignment_id")
    .notNull()
    .references(() => assignments.id, { onDelete: "cascade" }),
  studentId: integer("student_id")
    .notNull()
    .references(() => students.id, { onDelete: "cascade" }),
  submissionNote: text("submission_note").notNull(),
  attachmentRef: varchar("attachment_ref", { length: 240 }),
  marksAwarded: integer("marks_awarded"),
  maxMarks: integer("max_marks").notNull().default(25),
  feedback: text("feedback"),
  status: varchar("status", { length: 24 }).notNull().default("submitted"), // pending | submitted | evaluated
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
});

export const semesterResults = pgTable("semester_results", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id")
    .notNull()
    .references(() => students.id, { onDelete: "cascade" }),
  semester: integer("semester").notNull(),
  academicYear: varchar("academic_year", { length: 24 }).notNull(),
  sgpa: varchar("sgpa", { length: 12 }).notNull(),
  creditsEarned: integer("credits_earned").notNull(),
  resultStatus: varchar("result_status", { length: 32 }).notNull(), // Pass | Pass with Grace | Back Paper | Result Awaited
  backPaperCodes: varchar("back_paper_codes", { length: 120 }),
  subjectGradesJson: text("subject_grades_json").notNull(),
  verificationToken: varchar("verification_token", { length: 48 }).notNull().unique(),
  declaredAt: timestamp("declared_at").notNull().defaultNow(),
});

export const facultyAllocations = pgTable("faculty_allocations", {
  id: serial("id").primaryKey(),
  facultyName: varchar("faculty_name", { length: 120 }).notNull(),
  department: varchar("department", { length: 64 }).notNull(),
  course: varchar("course", { length: 16 }).notNull(),
  semester: integer("semester").notNull(),
  subjectCode: varchar("subject_code", { length: 24 }).notNull(),
  subjectName: varchar("subject_name", { length: 160 }).notNull(),
  syllabusPct: integer("syllabus_pct").notNull().default(0),
  lastTopicCovered: varchar("last_topic_covered", { length: 200 }).notNull(),
  timetableSlot: varchar("timetable_slot", { length: 80 }).notNull(),
});

export const staffLeaves = pgTable("staff_leaves", {
  id: serial("id").primaryKey(),
  facultyName: varchar("faculty_name", { length: 120 }).notNull(),
  leaveType: varchar("leave_type", { length: 24 }).notNull(), // Casual | Medical | Duty
  fromDate: varchar("from_date", { length: 24 }).notNull(),
  toDate: varchar("to_date", { length: 24 }).notNull(),
  reason: text("reason").notNull(),
  substituteFaculty: varchar("substitute_faculty", { length: 120 }).notNull(),
  status: varchar("status", { length: 24 }).notNull().default("pending"), // pending | approved | rejected
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const libraryIssues = pgTable("library_issues", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id")
    .notNull()
    .references(() => students.id, { onDelete: "cascade" }),
  accessionNo: varchar("accession_no", { length: 32 }).notNull(),
  bookTitle: varchar("book_title", { length: 200 }).notNull(),
  author: varchar("author", { length: 120 }).notNull(),
  issuedDate: varchar("issued_date", { length: 24 }).notNull(),
  dueDate: varchar("due_date", { length: 24 }).notNull(),
  returnedDate: varchar("returned_date", { length: 24 }),
  fineAmount: integer("fine_amount").notNull().default(0),
  status: varchar("status", { length: 24 }).notNull().default("issued"), // issued | overdue | returned
});

export const labTickets = pgTable("lab_tickets", {
  id: serial("id").primaryKey(),
  labName: varchar("lab_name", { length: 48 }).notNull(),
  workstationCode: varchar("workstation_code", { length: 32 }).notNull(),
  category: varchar("category", { length: 40 }).notNull(), // Hardware | Software/Compiler | Network/Wi-Fi | Projector
  description: text("description").notNull(),
  reportedBy: varchar("reported_by", { length: 120 }).notNull(),
  priority: varchar("priority", { length: 16 }).notNull().default("Normal"), // Normal | Urgent
  status: varchar("status", { length: 24 }).notNull().default("open"), // open | in_progress | resolved
  resolutionNote: text("resolution_note"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const grievances = pgTable("grievances", {
  id: serial("id").primaryKey(),
  ticketCode: varchar("ticket_code", { length: 24 }).notNull().unique(),
  studentId: integer("student_id")
    .notNull()
    .references(() => students.id, { onDelete: "cascade" }),
  category: varchar("category", { length: 48 }).notNull(), // Academic | Infrastructure | Examination | Anti-Ragging (Confidential) | Fee & Scholarship
  subject: varchar("subject", { length: 200 }).notNull(),
  details: text("details").notNull(),
  isAnonymous: boolean("is_anonymous").notNull().default(false),
  status: varchar("status", { length: 24 }).notNull().default("submitted"), // submitted | under_review | resolved
  actionTaken: text("action_taken"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const placementDrives = pgTable("placement_drives", {
  id: serial("id").primaryKey(),
  companyOrScheme: varchar("company_or_scheme", { length: 160 }).notNull(),
  kind: varchar("kind", { length: 32 }).notNull(), // Placement Drive | Scholarship | Workshop
  eligibleCourses: varchar("eligible_courses", { length: 16 }).notNull().default("ALL"), // ALL | BCA | BBA
  minCgpa: varchar("min_cgpa", { length: 12 }).notNull().default("6.0"),
  driveDate: varchar("drive_date", { length: 32 }).notNull(),
  venue: varchar("venue", { length: 120 }).notNull(),
  ctcOrBenefit: varchar("ctc_or_benefit", { length: 120 }).notNull(),
  description: text("description").notNull(),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Enquiry = typeof enquiries.$inferSelect;
export type Admission = typeof admissions.$inferSelect;
export type Feedback = typeof feedback.$inferSelect;
