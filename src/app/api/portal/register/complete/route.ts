import { NextResponse } from "next/server";
import { completeStudentRegistration } from "@/lib/portal-registration";
import {
  PORTAL_COOKIE_NAME,
  cookieOptionsForRequest,
  signSessionToken,
} from "@/lib/portal-auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const enrollmentNo = typeof body.enrollmentNo === "string" ? body.enrollmentNo : "";
    const dob = typeof body.dob === "string" ? body.dob : "";
    const phoneLast4 = typeof body.phoneLast4 === "string" ? body.phoneLast4 : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const otp = typeof body.otp === "string" ? body.otp.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!enrollmentNo || !dob || !phoneLast4 || !email || !otp || !password) {
      return NextResponse.json(
        { ok: false, error: "All registration fields are required." },
        { status: 400 }
      );
    }

    const regResult = await completeStudentRegistration({
      enrollmentNo,
      dob,
      phoneLast4,
      email,
      otp,
      password,
    });

    if (!regResult.success || !regResult.session) {
      return NextResponse.json(
        { ok: false, error: regResult.message },
        { status: 400 }
      );
    }

    // Sign session and set cookie for immediate seamless dashboard login
    const token = signSessionToken(regResult.session);
    const res = NextResponse.json({
      ok: true,
      message: regResult.message,
      redirect: "/portal",
    });
    res.cookies.set(PORTAL_COOKIE_NAME, token, cookieOptionsForRequest(req));
    return res;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Registration process encountered an unexpected error." },
      { status: 500 }
    );
  }
}

