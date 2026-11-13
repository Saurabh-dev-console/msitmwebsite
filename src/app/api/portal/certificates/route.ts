import { NextRequest, NextResponse } from "next/server";
import { getPortalSessionFromRequest } from "@/lib/portal-auth";
import {
  deleteCertificateRequest,
  requestCertificate,
  updateCertificateStatus,
} from "@/lib/portal-store";
import type { CertificateRequestRecord } from "@/lib/portal-types";

const VALID_TYPES = new Set(["bonafide", "fee_structure", "character", "transfer_no_dues"]);
const VALID_STATUS = new Set(["pending", "processing", "ready", "issued", "rejected"]);

export async function POST(req: NextRequest) {
  try {
    const session = getPortalSessionFromRequest(req);
    if (!session) return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });

    const body = await req.json();
    const studentId = session.role === "student" ? session.studentId : Number(body.studentId);
    if (!studentId || !VALID_TYPES.has(body.certType) || typeof body.purpose !== "string" || !body.purpose.trim()) {
      return NextResponse.json({ ok: false, error: "Valid certificate type and purpose required." }, { status: 400 });
    }

    const cert = await requestCertificate({
      studentId,
      certType: body.certType as CertificateRequestRecord["certType"],
      purpose: body.purpose,
    });
    return NextResponse.json({ ok: true, cert });
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
    if (!session || (session.role !== "admin" && session.role !== "accounts")) {
      return NextResponse.json({ ok: false, error: "Admin or Accounts role required." }, { status: 403 });
    }

    const body = await req.json();
    const certId = Number(body.certId);
    if (!certId || !VALID_STATUS.has(body.status)) {
      return NextResponse.json({ ok: false, error: "Invalid status update." }, { status: 400 });
    }

    const cert = await updateCertificateStatus({
      certId,
      status: body.status as CertificateRequestRecord["status"],
      accountsCleared: typeof body.accountsCleared === "boolean" ? body.accountsCleared : undefined,
      libraryCleared: typeof body.libraryCleared === "boolean" ? body.libraryCleared : undefined,
      labCleared: typeof body.labCleared === "boolean" ? body.labCleared : undefined,
    });
    return NextResponse.json({ ok: true, cert });
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
    if (!session || (session.role !== "admin" && session.role !== "accounts")) {
      return NextResponse.json({ ok: false, error: "Admin or Accounts role required." }, { status: 403 });
    }
    const certId = Number(req.nextUrl.searchParams.get("certId") ?? "0");
    if (!certId) return NextResponse.json({ ok: false, error: "Certificate ID required." }, { status: 400 });
    await deleteCertificateRequest(certId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Server error." },
      { status: 400 }
    );
  }
}
