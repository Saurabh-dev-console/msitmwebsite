import { NextRequest, NextResponse } from "next/server";
import { getPortalSessionFromRequest } from "@/lib/portal-auth";
import {
  addExamScheduleItem,
  bulkReleaseAdmitCards,
  deleteExamScheduleItem,
  deleteExamSession,
  updateAdmitCardDecision,
  upsertExamSession,
} from "@/lib/portal-store";

export async function POST(req: NextRequest) {
  try {
    const session = getPortalSessionFromRequest(req);
    if (!session || (session.role !== "exam_cell" && session.role !== "admin")) {
      return NextResponse.json({ ok: false, error: "Exam Cell or Admin role required." }, { status: 403 });
    }

    const body = await req.json();

    if (body.action === "upsert_session") {
      if (typeof body.title !== "string" || !body.title.trim()) {
        return NextResponse.json({ ok: false, error: "Exam title is required." }, { status: 400 });
      }
      const exam = await upsertExamSession({
        id: body.id ? Number(body.id) : undefined,
        title: body.title,
        course: body.course === "BBA" ? "BBA" : "BCA",
        semester: Number(body.semester ?? 1),
        examType: body.examType === "Sessional" ? "Sessional" : "University",
        examCentre: typeof body.examCentre === "string" ? body.examCentre : "MSITM Degree College, Gonda",
        minAttendancePct: Number(body.minAttendancePct ?? 75),
        active: typeof body.active === "boolean" ? body.active : true,
      });
      return NextResponse.json({ ok: true, exam });
    }

    if (body.action === "add_schedule") {
      const examSessionId = Number(body.examSessionId);
      if (!examSessionId || typeof body.subjectCode !== "string" || typeof body.subjectName !== "string") {
        return NextResponse.json({ ok: false, error: "Exam session, subject code & name required." }, { status: 400 });
      }
      const paper = await addExamScheduleItem({
        examSessionId,
        subjectCode: body.subjectCode,
        subjectName: body.subjectName,
        examDate: typeof body.examDate === "string" ? body.examDate : "2026-12-01",
        shiftTime: typeof body.shiftTime === "string" ? body.shiftTime : "10:00 AM – 01:00 PM",
        roomNo: typeof body.roomNo === "string" ? body.roomNo : "Hall-101",
      });
      return NextResponse.json({ ok: true, paper });
    }

    if (body.action === "bulk_release") {
      const course = body.course === "BCA" || body.course === "BBA" ? body.course : "ALL";
      const updated = await bulkReleaseAdmitCards({
        course,
        semester: Number(body.semester ?? 0),
      });
      return NextResponse.json({ ok: true, updated });
    }

    return NextResponse.json({ ok: false, error: "Unsupported action." }, { status: 400 });
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
    if (!session || (session.role !== "exam_cell" && session.role !== "admin")) {
      return NextResponse.json({ ok: false, error: "Exam Cell or Admin role required." }, { status: 403 });
    }

    const body = await req.json();
    const studentId = Number(body.studentId);
    const examSessionId = Number(body.examSessionId);
    if (!studentId || !examSessionId) {
      return NextResponse.json({ ok: false, error: "Student and exam session are required." }, { status: 400 });
    }

    const card = await updateAdmitCardDecision({
      studentId,
      examSessionId,
      examFormVerified: typeof body.examFormVerified === "boolean" ? body.examFormVerified : undefined,
      isReleased: typeof body.isReleased === "boolean" ? body.isReleased : undefined,
      overrideApproved: typeof body.overrideApproved === "boolean" ? body.overrideApproved : undefined,
      overrideReason: typeof body.overrideReason === "string" ? body.overrideReason : undefined,
    });

    return NextResponse.json({ ok: true, card });
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
    if (!session || (session.role !== "exam_cell" && session.role !== "admin")) {
      return NextResponse.json({ ok: false, error: "Exam Cell or Admin role required." }, { status: 403 });
    }

    const sp = req.nextUrl.searchParams;
    const scheduleId = Number(sp.get("scheduleId") ?? "0");
    const examSessionId = Number(sp.get("examSessionId") ?? "0");
    if (scheduleId && examSessionId) {
      await deleteExamScheduleItem(examSessionId, scheduleId);
      return NextResponse.json({ ok: true });
    }

    const sessionId = Number(sp.get("sessionId") ?? "0");
    if (!sessionId) return NextResponse.json({ ok: false, error: "Exam session ID required." }, { status: 400 });
    await deleteExamSession(sessionId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Server error." },
      { status: 400 }
    );
  }
}
