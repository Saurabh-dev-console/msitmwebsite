import { NextRequest, NextResponse } from "next/server";
import { getPortalSessionFromRequest } from "@/lib/portal-auth";
import {
  deleteFeePayment,
  deleteFeeStructure,
  recordFeePayment,
  upsertFeeStructure,
} from "@/lib/portal-store";
import type { FeePaymentRecord } from "@/lib/portal-types";

const ALLOWED_MODES = new Set(["Cash", "UPI", "NEFT", "Card", "Scholarship"]);

export async function POST(req: NextRequest) {
  try {
    const session = getPortalSessionFromRequest(req);
    if (!session || (session.role !== "accounts" && session.role !== "admin")) {
      return NextResponse.json({ ok: false, error: "Accounts or Admin role required." }, { status: 403 });
    }

    const body = await req.json();
    const studentId = Number(body.studentId);
    const amountPaid = Number(body.amountPaid);
    const concession = Number(body.concession ?? 0);
    const paymentMode = String(body.paymentMode || "");

    if (!studentId || Number.isNaN(amountPaid) || amountPaid < 0 || !ALLOWED_MODES.has(paymentMode)) {
      return NextResponse.json({ ok: false, error: "Invalid fee payment data." }, { status: 400 });
    }

    const payment = await recordFeePayment({
      studentId,
      amountPaid,
      concession: Number.isNaN(concession) ? 0 : concession,
      paymentMode: paymentMode as FeePaymentRecord["paymentMode"],
      transactionRef: typeof body.transactionRef === "string" ? body.transactionRef : undefined,
      remarks: typeof body.remarks === "string" ? body.remarks : undefined,
      recordedBy: session.displayName,
    });

    return NextResponse.json({ ok: true, payment });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Server error." },
      { status: 400 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = getPortalSessionFromRequest(req);
    if (!session || (session.role !== "accounts" && session.role !== "admin")) {
      return NextResponse.json({ ok: false, error: "Accounts or Admin role required." }, { status: 403 });
    }

    const body = await req.json();
    const structure = await upsertFeeStructure({
      course: body.course === "BBA" ? "BBA" : "BCA",
      semester: Number(body.semester ?? 1),
      academicYear: typeof body.academicYear === "string" ? body.academicYear : "2026–27",
      tuitionFee: Number(body.tuitionFee ?? 0),
      labFee: Number(body.labFee ?? 0),
      examFee: Number(body.examFee ?? 0),
      libraryFee: Number(body.libraryFee ?? 0),
      dueDate: typeof body.dueDate === "string" ? body.dueDate : "2026-11-30",
    });

    return NextResponse.json({ ok: true, structure });
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
    if (!session || (session.role !== "accounts" && session.role !== "admin")) {
      return NextResponse.json({ ok: false, error: "Accounts or Admin role required." }, { status: 403 });
    }

    const sp = req.nextUrl.searchParams;
    const structureId = Number(sp.get("structureId") ?? "0");
    if (structureId) {
      await deleteFeeStructure(structureId);
      return NextResponse.json({ ok: true });
    }

    const paymentId = Number(sp.get("paymentId") ?? "0");
    if (!paymentId) return NextResponse.json({ ok: false, error: "Payment or structure ID required." }, { status: 400 });
    await deleteFeePayment(paymentId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Server error." },
      { status: 400 }
    );
  }
}
