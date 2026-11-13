import { NextRequest, NextResponse } from "next/server";
import { getPortalSessionFromRequest } from "@/lib/portal-auth";
import {
  addAttendanceSubject,
  deleteAttendanceRecord,
  deleteFacultyAllocation,
  deleteTimetableSlot,
  deleteUgNotice,
  markClassAttendanceBatch,
  publishUgNotice,
  updateAttendanceRecord,
  upsertFacultyAllocation,
  upsertTimetableSlot,
} from "@/lib/portal-store";
import type { TimetableSlotRecord, UgNoticeRecord } from "@/lib/portal-types";

export async function PATCH(req: NextRequest) {
  try {
    const session = getPortalSessionFromRequest(req);
    if (!session || (session.role !== "faculty" && session.role !== "admin")) {
      return NextResponse.json({ ok: false, error: "Faculty or Admin role required." }, { status: 403 });
    }

    const body = await req.json();

    if (body.action === "batch_attendance") {
      if (typeof body.subjectCode !== "string" || !Array.isArray(body.marks)) {
        return NextResponse.json({ ok: false, error: "Subject code and attendance marks required." }, { status: 400 });
      }
      const updated = await markClassAttendanceBatch({
        course: body.course === "BBA" ? "BBA" : "BCA",
        semester: Number(body.semester ?? 1),
        subjectCode: body.subjectCode,
        marks: body.marks,
      });
      return NextResponse.json({ ok: true, updated });
    }

    const recordId = Number(body.recordId);
    if (!recordId) return NextResponse.json({ ok: false, error: "Record ID required." }, { status: 400 });

    const updated = await updateAttendanceRecord({
      recordId,
      totalClasses: Number(body.totalClasses ?? 0),
      attendedClasses: Number(body.attendedClasses ?? 0),
      medicalLeaves: Number(body.medicalLeaves ?? 0),
      internalMarks: Number(body.internalMarks ?? 0),
    });

    return NextResponse.json({ ok: true, record: updated });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Server error." },
      { status: 400 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = getPortalSessionFromRequest(req);
    if (!session || (session.role !== "faculty" && session.role !== "admin")) {
      return NextResponse.json({ ok: false, error: "Faculty or Admin role required." }, { status: 403 });
    }

    const body = await req.json();

    if (body.action === "add_subject") {
      const studentId = Number(body.studentId);
      if (!studentId || typeof body.subjectCode !== "string" || typeof body.subjectName !== "string") {
        return NextResponse.json({ ok: false, error: "Student, subject code, and name required." }, { status: 400 });
      }
      const record = await addAttendanceSubject({
        studentId,
        semester: Number(body.semester ?? 1),
        subjectCode: body.subjectCode,
        subjectName: body.subjectName,
        totalClasses: Number(body.totalClasses ?? 0),
        attendedClasses: Number(body.attendedClasses ?? 0),
        internalMarks: Number(body.internalMarks ?? 0),
      });
      return NextResponse.json({ ok: true, record });
    }

    if (body.action === "upsert_timetable") {
      const validDays = new Set(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
      if (typeof body.subjectCode !== "string" || typeof body.subjectName !== "string" || !validDays.has(body.dayOfWeek)) {
        return NextResponse.json({ ok: false, error: "Day, subject code & subject name required." }, { status: 400 });
      }
      const slot = await upsertTimetableSlot({
        id: body.id ? Number(body.id) : undefined,
        course: body.course === "BBA" ? "BBA" : "BCA",
        semester: Number(body.semester ?? 1),
        dayOfWeek: body.dayOfWeek as TimetableSlotRecord["dayOfWeek"],
        slotTime: typeof body.slotTime === "string" ? body.slotTime : "09:30 – 10:30 AM",
        subjectCode: body.subjectCode,
        subjectName: body.subjectName,
        roomOrLab: typeof body.roomOrLab === "string" ? body.roomOrLab : "Hall 101",
        facultyName: typeof body.facultyName === "string" ? body.facultyName : session.displayName,
      });
      return NextResponse.json({ ok: true, slot });
    }

    if (body.action === "upsert_faculty") {
      if (typeof body.facultyName !== "string" || typeof body.subjectCode !== "string" || typeof body.subjectName !== "string") {
        return NextResponse.json({ ok: false, error: "Faculty name, subject code & title required." }, { status: 400 });
      }
      const allocation = await upsertFacultyAllocation({
        id: body.id ? Number(body.id) : undefined,
        facultyName: body.facultyName,
        department: typeof body.department === "string" ? body.department : "Computer Science",
        course: body.course === "BBA" ? "BBA" : "BCA",
        semester: Number(body.semester ?? 1),
        subjectCode: body.subjectCode,
        subjectName: body.subjectName,
        syllabusPct: Number(body.syllabusPct ?? 0),
        lastTopicCovered: typeof body.lastTopicCovered === "string" ? body.lastTopicCovered : "Unit 1",
        timetableSlot: typeof body.timetableSlot === "string" ? body.timetableSlot : "Mon · 10:30 AM",
      });
      return NextResponse.json({ ok: true, allocation });
    }

    if (typeof body.title !== "string" || !body.title.trim() || typeof body.body !== "string" || !body.body.trim()) {
      return NextResponse.json({ ok: false, error: "Title and message are required." }, { status: 400 });
    }

    const notice = await publishUgNotice({
      title: body.title,
      courseScope: (body.courseScope === "BCA" || body.courseScope === "BBA" ? body.courseScope : "ALL") as UgNoticeRecord["courseScope"],
      semesterScope: Number(body.semesterScope ?? 0),
      category: (["Exam", "Fee", "Scholarship", "Academic", "Urgent"].includes(body.category)
        ? body.category
        : "Academic") as UgNoticeRecord["category"],
      body: body.body,
    });

    return NextResponse.json({ ok: true, notice });
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
    if (!session || (session.role !== "faculty" && session.role !== "admin")) {
      return NextResponse.json({ ok: false, error: "Faculty or Admin role required." }, { status: 403 });
    }

    const sp = req.nextUrl.searchParams;
    const attendanceId = Number(sp.get("attendanceId") ?? "0");
    if (attendanceId) {
      await deleteAttendanceRecord(attendanceId);
      return NextResponse.json({ ok: true });
    }
    const timetableId = Number(sp.get("timetableId") ?? "0");
    if (timetableId) {
      await deleteTimetableSlot(timetableId);
      return NextResponse.json({ ok: true });
    }
    const noticeId = Number(sp.get("noticeId") ?? "0");
    if (noticeId) {
      await deleteUgNotice(noticeId);
      return NextResponse.json({ ok: true });
    }
    const facultyId = Number(sp.get("facultyId") ?? "0");
    if (facultyId) {
      await deleteFacultyAllocation(facultyId);
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: false, error: "Target ID parameter required." }, { status: 400 });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Server error." },
      { status: 400 }
    );
  }
}
