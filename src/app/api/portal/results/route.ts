import { NextRequest, NextResponse } from "next/server";
import { getPortalSessionFromRequest } from "@/lib/portal-auth";
import { deleteSemesterResult, upsertSemesterResult } from "@/lib/portal-store";
import type { SemesterResultRecord } from "@/lib/portal-types";

const VALID_STATUS = new Set(["Pass", "Pass with Grace", "Back Paper", "Result Awaited"]);

export async function POST(req: NextRequest) {
  try {
    const session = getPortalSessionFromRequest(req);
    if (!session || (session.role !== "exam_cell" && session.role !== "admin")) {
      return NextResponse.json({ ok: false, error: "Exam Cell or Admin role required." }, { status: 403 });
    }

    const body = await req.json();
    const studentId = Number(body.studentId);
    const semester = Number(body.semester);
    if (!studentId || !semester || typeof body.sgpa !== "string" || !VALID_STATUS.has(body.resultStatus)) {
      return NextResponse.json({ ok: false, error: "Valid student, semester, SGPA and result status required." }, { status: 400 });
    }

    const result = await upsertSemesterResult({
      studentId,
      semester,
      academicYear: typeof body.academicYear === "string" ? body.academicYear : "2026–27",
      sgpa: body.sgpa,
      creditsEarned: Number(body.creditsEarned ?? 24),
      resultStatus: body.resultStatus as SemesterResultRecord["resultStatus"],
      backPaperCodes: typeof body.backPaperCodes === "string" ? body.backPaperCodes : "",
    });

    return NextResponse.json({ ok: true, result });
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
    const resultId = Number(req.nextUrl.searchParams.get("resultId") ?? "0");
    if (!resultId) return NextResponse.json({ ok: false, error: "Result ID required." }, { status: 400 });
    await deleteSemesterResult(resultId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Server error." },
      { status: 400 }
    );
  }
}

