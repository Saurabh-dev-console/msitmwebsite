import { NextRequest, NextResponse } from "next/server";
import { getPortalSessionFromRequest } from "@/lib/portal-auth";
import {
  createGatePass,
  guardGateAction,
  issueGatePassByStaff,
  reviewGatePass,
} from "@/lib/portal-store";

export async function POST(req: NextRequest) {
  try {
    const session = getPortalSessionFromRequest(req);
    if (!session) return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });

    const body = await req.json();
    const studentId =
      session.role === "student"
        ? session.studentId
        : Number(body.studentId);
    if (!studentId || Number.isNaN(studentId)) {
      return NextResponse.json({ ok: false, error: "Valid student ID is required." }, { status: 400 });
    }

    const passType = body.passType;
    if (passType !== "sick_leave" && passType !== "urgent_exit" && passType !== "medical_multiday") {
      return NextResponse.json({ ok: false, error: "Invalid pass type." }, { status: 400 });
    }
    if (typeof body.reason !== "string" || !body.reason.trim()) {
      return NextResponse.json({ ok: false, error: "Please enter a clear reason." }, { status: 400 });
    }

    if (body.issueImmediate && (session.role === "faculty" || session.role === "admin")) {
      const pass = await issueGatePassByStaff({
        studentId,
        passType,
        reason: body.reason,
        symptomsOrNotes: typeof body.symptomsOrNotes === "string" ? body.symptomsOrNotes : "",
        guardianNotified: Boolean(body.guardianNotified ?? true),
        approvedBy: session.displayName,
      });
      return NextResponse.json({ ok: true, pass });
    }

    if (typeof body.requestedExitAt !== "string" || !body.requestedExitAt.trim()) {
      return NextResponse.json({ ok: false, error: "Exit time or date is required." }, { status: 400 });
    }

    const pass = await createGatePass({
      studentId,
      passType,
      reason: body.reason,
      symptomsOrNotes: typeof body.symptomsOrNotes === "string" ? body.symptomsOrNotes : "",
      guardianPhone: typeof body.guardianPhone === "string" ? body.guardianPhone : "",
      requestedExitAt: body.requestedExitAt,
    });
    return NextResponse.json({ ok: true, pass });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Server error." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = getPortalSessionFromRequest(req);
    if (!session || session.role === "student") {
      return NextResponse.json({ ok: false, error: "Forbidden." }, { status: 403 });
    }

    const body = await req.json();

    if (body.mode === "guard") {
      if (session.role !== "gate_guard" && session.role !== "admin") {
        return NextResponse.json({ ok: false, error: "Security or Admin role required." }, { status: 403 });
      }
      const code = typeof body.code === "string" ? body.code.trim() : "";
      const action = body.action as "lookup" | "check_out" | "mark_returned";
      if (!code || (action !== "lookup" && action !== "check_out" && action !== "mark_returned")) {
        return NextResponse.json({ ok: false, error: "Invalid gate action." }, { status: 400 });
      }
      const result = await guardGateAction({ code, action });
      if (!result) return NextResponse.json({ ok: false, error: "Pass code not found." }, { status: 404 });
      return NextResponse.json({ ok: true, ...result });
    }

    if (session.role !== "faculty" && session.role !== "admin") {
      return NextResponse.json({ ok: false, error: "Faculty/HOD or Admin role required." }, { status: 403 });
    }

    const passId = Number(body.passId);
    const decision = body.decision === "approve" ? "approve" : body.decision === "reject" ? "reject" : null;
    if (!passId || !decision) {
      return NextResponse.json({ ok: false, error: "Invalid review request." }, { status: 400 });
    }

    const updated = await reviewGatePass({
      passId,
      decision,
      guardianNotified: Boolean(body.guardianNotified),
      validUntil: typeof body.validUntil === "string" ? body.validUntil : undefined,
      rejectionReason: typeof body.rejectionReason === "string" ? body.rejectionReason : undefined,
      approvedBy: session.displayName,
    });
    return NextResponse.json({ ok: true, pass: updated });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Server error." },
      { status: 400 }
    );
  }
}

