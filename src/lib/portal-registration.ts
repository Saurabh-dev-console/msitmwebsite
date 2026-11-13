import { db } from "@/db";
import { portalUsers, students } from "@/db/schema";
import { eq, sql, and } from "drizzle-orm";
import { hashPassword } from "@/lib/portal-auth";
import { getStore, type PortalUserRow } from "@/lib/portal-store";
import { verifyOtp } from "@/lib/otp-service";
import type { PortalSession, StudentRecord } from "@/lib/portal-types";

export interface StudentEligibilityResult {
  eligible: boolean;
  message?: string;
  alreadyRegistered?: boolean;
  student?: {
    id: number;
    enrollmentNo: string;
    fullName: string;
    course: "BCA" | "BBA";
    batch: string;
    semester: number;
    maskedPhone: string;
  };
}

/**
 * Step 1: Verify student eligibility based on Enrollment No, DOB, and Phone Last 4.
 */
export async function verifyStudentEligibility(input: {
  enrollmentNo: string;
  dob: string; // YYYY-MM-DD
  phoneLast4: string;
}): Promise<StudentEligibilityResult> {
  const enrollment = input.enrollmentNo.trim().toUpperCase();
  const dobInput = input.dob.trim();
  const pLast4 = input.phoneLast4.trim();

  if (!enrollment || !dobInput || !pLast4) {
    return {
      eligible: false,
      message: "Please enter your Enrollment Number, Date of Birth, and the last 4 digits of your registered mobile number.",
    };
  }

  // Database Path
  if (db) {
    try {
      const rows = await db
        .select()
        .from(students)
        .where(sql`upper(${students.enrollmentNo}) = ${enrollment}`)
        .limit(1);

      if (rows.length > 0) {
        const s = rows[0];

        // Format dob to YYYY-MM-DD string
        const recordDob = typeof s.dob === "string" ? s.dob : new Date(s.dob).toISOString().split("T")[0];
        const cleanPhone = (s.phone || "").replace(/\D/g, "");
        const cleanGuardian = (s.guardianPhone || "").replace(/\D/g, "");
        const matchPhone = cleanPhone.endsWith(pLast4) || cleanGuardian.endsWith(pLast4);

        if (recordDob !== dobInput || !matchPhone) {
          return {
            eligible: false,
            message: "Student record details do not match college records. Please verify your DOB and registered mobile digits.",
          };
        }

        if (s.userId !== null) {
          return {
            eligible: false,
            alreadyRegistered: true,
            message: "This student account is already registered. Please proceed to login or use Forgot Password if you cannot remember your credentials.",
          };
        }

        const phoneDigits = s.phone.replace(/\D/g, "");
        const masked = phoneDigits.length >= 4 ? `******${phoneDigits.slice(-4)}` : "******";

        return {
          eligible: true,
          student: {
            id: s.id,
            enrollmentNo: s.enrollmentNo,
            fullName: s.fullName,
            course: s.course as "BCA" | "BBA",
            batch: s.batch,
            semester: s.semester,
            maskedPhone: masked,
          },
        };
      }
    } catch {
      // Fall through to memory
    }
  }

  // Fallback: In-memory store
  const store = getStore();
  const s = store.students.find((st: StudentRecord) => st.enrollmentNo.toUpperCase() === enrollment);

  if (!s) {
    return {
      eligible: false,
      message: "Enrollment Number not found in college records. Please check the number on your admission slip.",
    };
  }

  const cleanPhone = (s.phone || "").replace(/\D/g, "");
  const cleanGuardian = (s.guardianPhone || "").replace(/\D/g, "");
  const matchPhone = cleanPhone.endsWith(pLast4) || cleanGuardian.endsWith(pLast4);

  if (s.dob !== dobInput || !matchPhone) {
    return {
      eligible: false,
      message: "Student record details do not match college records. Please verify your DOB and registered mobile digits.",
    };
  }

  if (s.userId !== null && s.userId !== undefined) {
    return {
      eligible: false,
      alreadyRegistered: true,
      message: "This student account is already registered. Please proceed to login or use Forgot Password if you cannot remember your credentials.",
    };
  }

  const phoneDigits = s.phone.replace(/\D/g, "");
  const masked = phoneDigits.length >= 4 ? `******${phoneDigits.slice(-4)}` : "******";

  return {
    eligible: true,
    student: {
      id: s.id,
      enrollmentNo: s.enrollmentNo,
      fullName: s.fullName,
      course: s.course,
      batch: s.batch,
      semester: s.semester,
      maskedPhone: masked,
    },
  };
}

/**
 * Step 3: Complete registration: verify OTP, create portal user, link student record.
 */
export async function completeStudentRegistration(input: {
  enrollmentNo: string;
  dob: string;
  phoneLast4: string;
  email: string; // Personal Gmail
  otp: string;
  password: string;
}): Promise<{
  success: boolean;
  message: string;
  session?: Omit<PortalSession, "exp">;
}> {
  const enrollment = input.enrollmentNo.trim().toUpperCase();
  const email = input.email.trim().toLowerCase();
  const password = input.password;

  if (!email.endsWith("@gmail.com")) {
    return { success: false, message: "Please provide a valid personal Gmail address (@gmail.com)." };
  }

  if (password.length < 8) {
    return { success: false, message: "Password must be at least 8 characters long." };
  }

  // 1. Verify OTP first
  const otpCheck = await verifyOtp(email, input.otp, "STUDENT_REGISTRATION");
  if (!otpCheck.valid) {
    return { success: false, message: otpCheck.reason || "Invalid OTP code." };
  }

  // 2. Re-verify student eligibility to prevent race conditions
  const eligibility = await verifyStudentEligibility({
    enrollmentNo: enrollment,
    dob: input.dob,
    phoneLast4: input.phoneLast4,
  });

  if (!eligibility.eligible || !eligibility.student) {
    return { success: false, message: eligibility.message || "Student is not eligible for registration." };
  }

  const student = eligibility.student;
  const passwordHash = hashPassword(password);
  const now = new Date();

  // 3. Database Path
  if (db) {
    try {
      // Check if email already registered
      const existingUser = await db
        .select()
        .from(portalUsers)
        .where(sql`lower(${portalUsers.email}) = ${email}`)
        .limit(1);

      if (existingUser.length > 0) {
        return { success: false, message: "This Gmail address is already registered to another portal user." };
      }

      // Insert Portal User
      const insertedUsers = await db
        .insert(portalUsers)
        .values({
          username: student.enrollmentNo,
          email,
          passwordHash,
          role: "student",
          displayName: student.fullName,
          tokenVersion: 1,
          active: true,
          createdAt: now,
          updatedAt: now,
        })
        .returning();

      const newUser = insertedUsers[0];

      // Link student record
      await db
        .update(students)
        .set({
          userId: newUser.id,
          email,
        })
        .where(eq(students.id, student.id));

      return {
        success: true,
        message: "Account registered successfully!",
        session: {
          userId: newUser.id,
          username: newUser.username,
          email: newUser.email ?? undefined,
          role: "student",
          displayName: newUser.displayName,
          studentId: student.id,
          tokenVersion: 1,
        },
      };
    } catch {
      // Fall through to memory store
    }
  }

  // Fallback: In-memory store
  const store = getStore();

  const emailTaken = store.users.some((u: PortalUserRow) => u.email?.toLowerCase() === email);
  if (emailTaken) {
    return { success: false, message: "This Gmail address is already registered to another portal user." };
  }

  const existingStudent = store.students.find((s: StudentRecord) => s.id === student.id);
  if (!existingStudent) {
    return { success: false, message: "Student record not found." };
  }

  const newUserId = store.nextId++;
  const newUser = {
    id: newUserId,
    username: student.enrollmentNo,
    email,
    passwordHash,
    role: "student" as const,
    displayName: student.fullName,
    tokenVersion: 1,
    active: true,
  };

  store.users.push(newUser);
  existingStudent.userId = newUserId;
  existingStudent.email = email;

  return {
    success: true,
    message: "Account registered successfully!",
    session: {
      userId: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: "student",
      displayName: newUser.displayName,
      studentId: existingStudent.id,
      tokenVersion: 1,
    },
  };
}
