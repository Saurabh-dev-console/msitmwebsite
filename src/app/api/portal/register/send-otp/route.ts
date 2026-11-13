import { NextResponse } from "next/server";
import { verifyStudentEligibility } from "@/lib/portal-registration";
import { createAndSendOtp } from "@/lib/otp-service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const enrollmentNo = typeof body.enrollmentNo === "string" ? body.enrollmentNo : "";
    const dob = typeof body.dob === "string" ? body.dob : "";
    const phoneLast4 = typeof body.phoneLast4 === "string" ? body.phoneLast4 : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !email.endsWith("@gmail.com")) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid personal Gmail address (@gmail.com)." },
        { status: 400 }
      );
    }

    // Guard: Verify student eligibility first
    const eligibility = await verifyStudentEligibility({
      enrollmentNo,
      dob,
      phoneLast4,
    });

    if (!eligibility.eligible) {
      return NextResponse.json(
        { ok: false, error: eligibility.message || "Student is not eligible for registration." },
        { status: 400 }
      );
    }

    const otpRes = await createAndSendOtp(email, "STUDENT_REGISTRATION");

    if (!otpRes.success) {
      return NextResponse.json(
        {
          ok: false,
          error: otpRes.message,
          cooldownSeconds: otpRes.cooldownSeconds,
        },
        { status: 429 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: otpRes.message,
      devOtp: otpRes.devOtp, // Returned only in dev / local mode for instant testing
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to dispatch verification code." },
      { status: 500 }
    );
  }
}

