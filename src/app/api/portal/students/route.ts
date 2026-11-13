import { NextRequest, NextResponse } from "next/server";
import { getPortalSessionFromRequest } from "@/lib/portal-auth";
import {
  convertAdmissionLeadToStudent,
  deleteStaffAccount,
  deleteStudentRecord,
  onboardStudent,
  promoteStudentSemester,
  updateStudentRecord,
  upsertStaffAccount,
} from "@/lib/portal-store";
import type { PortalRole, StudentRecord } from "@/lib/portal-types";

const STAFF_ROLES = new Set<Exclude<PortalRole, "student">>([
  "faculty",
  "accounts",
  "exam_cell",
  "gate_guard",
  "admin",
]);

export async function POST(req: NextRequest) {
  try {
    const session = getPortalSessionFromRequest(req);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ ok: false, error: "Admin role required." }, { status: 403 });
    }

    const body = await req.json();

    if (body.action === "convert_lead") {
      const leadId = Number(body.leadId);
      if (!leadId) return NextResponse.json({ ok: false, error: "Lead ID required." }, { status: 400 });
      const student = await convertAdmissionLeadToStudent({
        leadId,
        course: body.course === "BBA" ? "BBA" : "BCA",
        semester: Number(body.semester) || 1,
        section: typeof body.section === "string" ? body.section : "A",
        batch: typeof body.batch === "string" ? body.batch : "2026–29",
      });
      return NextResponse.json({ ok: true, student });
    }

    if (body.action === "upsert_staff") {
      if (
        typeof body.username !== "string" ||
        !body.username.trim() ||
        typeof body.displayName !== "string" ||
        !body.displayName.trim() ||
        !STAFF_ROLES.has(body.role)
      ) {
        return NextResponse.json({ ok: false, error: "Valid username, display name, and staff role required." }, { status: 400 });
      }
      const staff = await upsertStaffAccount({
        id: body.id ? Number(body.id) : undefined,
        username: body.username,
        role: body.role as Exclude<PortalRole, "student">,
        displayName: body.displayName,
        password: typeof body.password === "string" ? body.password : undefined,
        active: typeof body.active === "boolean" ? body.active : true,
      });
      return NextResponse.json({ ok: true, staff });
    }

    const course = body.course === "BCA" || body.course === "BBA" ? body.course : null;
    if (
      !course ||
      typeof body.fullName !== "string" ||
      !body.fullName.trim() ||
      typeof body.fatherName !== "string" ||
      !body.fatherName.trim() ||
      typeof body.phone !== "string" ||
      !body.phone.trim()
    ) {
      return NextResponse.json({ ok: false, error: "Missing required student fields." }, { status: 400 });
    }

    const student = await onboardStudent({
      enrollmentNo: typeof body.enrollmentNo === "string" ? body.enrollmentNo : undefined,
      universityRollNo: typeof body.universityRollNo === "string" ? body.universityRollNo : undefined,
      fullName: body.fullName,
      fatherName: body.fatherName,
      course,
      batch: typeof body.batch === "string" && body.batch.trim() ? body.batch : "2026–29",
      semester: Number(body.semester) || 1,
      section: typeof body.section === "string" ? body.section : "A",
      dob: typeof body.dob === "string" && body.dob.trim() ? body.dob : "2007-01-01",
      phone: body.phone,
      guardianPhone: typeof body.guardianPhone === "string" && body.guardianPhone.trim() ? body.guardianPhone : body.phone,
      email: typeof body.email === "string" ? body.email : "",
      bloodGroup: typeof body.bloodGroup === "string" ? body.bloodGroup : "O+",
      password: typeof body.password === "string" ? body.password : undefined,
    });

    return NextResponse.json({ ok: true, student });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Server error." },
      { status: 400 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = getPortalSessionFromRequest(req);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ ok: false, error: "Admin role required." }, { status: 403 });
    }

    const body = await req.json();

    if (body.action === "upsert_staff") {
      const staff = await upsertStaffAccount({
        id: Number(body.id),
        username: String(body.username || ""),
        role: (STAFF_ROLES.has(body.role) ? body.role : "faculty") as Exclude<PortalRole, "student">,
        displayName: String(body.displayName || ""),
        password: typeof body.password === "string" ? body.password : undefined,
        active: typeof body.active === "boolean" ? body.active : undefined,
      });
      return NextResponse.json({ ok: true, staff });
    }

    const studentId = Number(body.studentId);
    if (!studentId) return NextResponse.json({ ok: false, error: "Student ID required." }, { status: 400 });

    if (body.action === "update") {
      const student = await updateStudentRecord({
        studentId,
        enrollmentNo: typeof body.enrollmentNo === "string" ? body.enrollmentNo : undefined,
        universityRollNo: typeof body.universityRollNo === "string" ? body.universityRollNo : undefined,
        fullName: typeof body.fullName === "string" ? body.fullName : undefined,
        fatherName: typeof body.fatherName === "string" ? body.fatherName : undefined,
        course: body.course === "BCA" || body.course === "BBA" ? body.course : undefined,
        batch: typeof body.batch === "string" ? body.batch : undefined,
        semester: typeof body.semester === "number" ? body.semester : undefined,
        section: typeof body.section === "string" ? body.section : undefined,
        dob: typeof body.dob === "string" ? body.dob : undefined,
        phone: typeof body.phone === "string" ? body.phone : undefined,
        guardianPhone: typeof body.guardianPhone === "string" ? body.guardianPhone : undefined,
        email: typeof body.email === "string" ? body.email : undefined,
        bloodGroup: typeof body.bloodGroup === "string" ? body.bloodGroup : undefined,
        status: (["active", "alumni", "suspended"].includes(body.status) ? body.status : undefined) as
          | StudentRecord["status"]
          | undefined,
        resetPassword: typeof body.resetPassword === "string" ? body.resetPassword : undefined,
      });
      return NextResponse.json({ ok: true, student });
    }

    const student = await promoteStudentSemester(studentId);
    return NextResponse.json({ ok: true, student });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Server error." },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = getPortalSessionFromRequest(req);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ ok: false, error: "Admin role required." }, { status: 403 });
    }

    const sp = req.nextUrl.searchParams;
    const staffId = Number(sp.get("staffId") ?? "0");
    if (staffId) {
      await deleteStaffAccount(staffId);
      return NextResponse.json({ ok: true });
    }

    const studentId = Number(sp.get("studentId") ?? "0");
    if (!studentId) {
      return NextResponse.json({ ok: false, error: "Student ID required." }, { status: 400 });
    }
    await deleteStudentRecord(studentId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Server error." },
      { status: 400 }
    );
  }
}
