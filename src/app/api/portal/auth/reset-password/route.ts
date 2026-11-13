import { NextResponse } from "next/server";
import { resetPasswordWithToken } from "@/lib/portal-recovery";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = typeof body.token === "string" ? body.token : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!token || !password) {
      return NextResponse.json(
        { ok: false, error: "Reset token and new password are required." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { ok: false, error: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    const result = await resetPasswordWithToken(token, password);

    if (!result.success) {
      return NextResponse.json(
        { ok: false, error: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: result.message,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to reset password." },
      { status: 500 }
    );
  }
}

