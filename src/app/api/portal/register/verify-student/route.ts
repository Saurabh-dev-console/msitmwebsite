import { NextResponse } from "next/server";
import { verifyStudentEligibility } from "@/lib/portal-registration";
import { checkRateLimit } from "@/lib/rate-limiter";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const enrollmentNo = typeof body.enrollmentNo === "string" ? body.enrollmentNo : "";
    const dob = typeof body.dob === "string" ? body.dob : "";
    const phoneLast4 = typeof body.phoneLast4 === "string" ? body.phoneLast4 : "";

    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
    const rateCheck = await checkRateLimit(`reg_verify:${clientIp}`, 10, 300);
    if (!rateCheck.success) {
      return NextResponse.json(
        { ok: false, error: "Too many verification attempts. Please wait 5 minutes before trying again." },
        { status: 429 }
      );
    }

    const result = await verifyStudentEligibility({
      enrollmentNo,
      dob,
      phoneLast4,
    });

    if (!result.eligible) {
      return NextResponse.json(
        {
          ok: false,
          error: result.message || "Student details do not match college records.",
          alreadyRegistered: result.alreadyRegistered,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      ok: true,
      student: result.student,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to verify student record." },
      { status: 500 }
    );
  }
}

