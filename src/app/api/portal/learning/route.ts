import { NextRequest, NextResponse } from "next/server";
import { getPortalSessionFromRequest } from "@/lib/portal-auth";
import {
  createAssignmentTask,
  createStaffLeave,
  deleteAssignmentTask,
  evaluateAssignmentSubmission,
  reviewStaffLeave,
  submitAssignmentWork,
  updateSyllabusProgress,
} from "@/lib/portal-store";
import type { AssignmentRecord, StaffLeaveRecord } from "@/lib/portal-types";

export async function POST(req: NextRequest) {
  try {
    const session = getPortalSessionFromRequest(req);
    if (!session) return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });

    const body = await req.json();
    if (body.action === "submit") {
      const studentId = session.role === "student" ? session.studentId : Number(body.studentId);
      const assignmentId = Number(body.assignmentId);
      if (!studentId || !assignmentId || typeof body.submissionNote !== "string" || !body.submissionNote.trim()) {
        return NextResponse.json({ ok: false, error: "Assignment ID and submission note required." }, { status: 400 });
      }
      const submission = await submitAssignmentWork({
        assignmentId,
        studentId,
        submissionNote: body.submissionNote,
        attachmentRef: typeof body.attachmentRef === "string" ? body.attachmentRef : "Portal-Submission",
      });
      return NextResponse.json({ ok: true, submission });
    }

    if (session.role !== "faculty" && session.role !== "admin") {
      return NextResponse.json({ ok: false, error: "Faculty or Admin role required." }, { status: 403 });
    }

    if (body.action === "leave_request") {
      if (typeof body.fromDate !== "string" || typeof body.reason !== "string" || !body.reason.trim()) {
        return NextResponse.json({ ok: false, error: "Dates and reason required." }, { status: 400 });
      }
      const leave = await createStaffLeave({
        facultyName: typeof body.facultyName === "string" && body.facultyName.trim() ? body.facultyName : session.displayName,
        leaveType: (["Casual", "Medical", "Duty"].includes(body.leaveType) ? body.leaveType : "Casual") as StaffLeaveRecord["leaveType"],
        fromDate: body.fromDate,
        toDate: typeof body.toDate === "string" && body.toDate ? body.toDate : body.fromDate,
        reason: body.reason,
        substituteFaculty: typeof body.substituteFaculty === "string" ? body.substituteFaculty : "HOD Arrangement",
      });
      return NextResponse.json({ ok: true, leave });
    }

    if (typeof body.title !== "string" || !body.title.trim() || typeof body.instructions !== "string") {
      return NextResponse.json({ ok: false, error: "Title and instructions required." }, { status: 400 });
    }
    const task = await createAssignmentTask({
      course: body.course === "BBA" ? "BBA" : "BCA",
      semester: Number(body.semester ?? 4),
      subjectCode: typeof body.subjectCode === "string" ? body.subjectCode : "UG-CORE",
      title: body.title,
      kind: (["Assignment", "BCA Practical", "BBA Internship", "Study Notes"].includes(body.kind)
        ? body.kind
        : "Assignment") as AssignmentRecord["kind"],
      dueDate: typeof body.dueDate === "string" ? body.dueDate : "2026-12-01",
      resourceUrl: typeof body.resourceUrl === "string" ? body.resourceUrl : "",
      instructions: body.instructions,
      createdBy: session.displayName,
    });
    return NextResponse.json({ ok: true, task });
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
    if (!session || (session.role !== "faculty" && session.role !== "admin")) {
      return NextResponse.json({ ok: false, error: "Faculty or Admin role required." }, { status: 403 });
    }

    const body = await req.json();
    if (body.action === "evaluate") {
      const submission = await evaluateAssignmentSubmission({
        submissionId: Number(body.submissionId),
        marksAwarded: Number(body.marksAwarded ?? 0),
        feedback: typeof body.feedback === "string" ? body.feedback : "Evaluated",
      });
      return NextResponse.json({ ok: true, submission });
    }

    if (body.action === "syllabus") {
      const allocation = await updateSyllabusProgress({
        allocationId: Number(body.allocationId),
        syllabusPct: Number(body.syllabusPct ?? 0),
        lastTopicCovered: typeof body.lastTopicCovered === "string" ? body.lastTopicCovered : "",
      });
      return NextResponse.json({ ok: true, allocation });
    }

    if (body.action === "review_leave") {
      if (session.role !== "admin") {
        return NextResponse.json({ ok: false, error: "Principal/Admin approval required." }, { status: 403 });
      }
      const leave = await reviewStaffLeave({
        leaveId: Number(body.leaveId),
        status: body.status === "rejected" ? "rejected" : "approved",
      });
      return NextResponse.json({ ok: true, leave });
    }

    return NextResponse.json({ ok: false, error: "Unsupported action." }, { status: 400 });
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
    const assignmentId = Number(req.nextUrl.searchParams.get("assignmentId") ?? "0");
    if (!assignmentId) return NextResponse.json({ ok: false, error: "Assignment ID required." }, { status: 400 });
    await deleteAssignmentTask(assignmentId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Server error." },
      { status: 400 }
    );
  }
}

