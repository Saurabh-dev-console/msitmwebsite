import { NextResponse } from "next/server";
import { createPasswordResetLink } from "@/lib/portal-recovery";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const identifier = typeof body.identifier === "string" ? body.identifier : "";

    if (!identifier.trim()) {
      return NextResponse.json(
        { ok: false, error: "Please enter your Enrollment Number or registered Gmail address." },
        { status: 400 }
      );
    }

    const host = req.headers.get("host") || "localhost:3000";
    const proto = req.headers.get("x-forwarded-proto") || "http";
    const baseUrl = `${proto}://${host}`;

    const res = await createPasswordResetLink(identifier, baseUrl);

    return NextResponse.json({
      ok: res.success,
      message: res.message,
      devResetUrl: res.devResetUrl,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to initiate password reset." },
      { status: 500 }
    );
  }
}

