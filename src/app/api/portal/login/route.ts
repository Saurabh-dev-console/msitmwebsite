import { NextResponse } from "next/server";
import {
  PORTAL_COOKIE_NAME,
  cookieOptionsForRequest,
  signSessionToken,
} from "@/lib/portal-auth";
import { authenticatePortalUser } from "@/lib/portal-store";
import { checkRateLimit } from "@/lib/rate-limiter";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const identifier = (
      typeof body.identifier === "string"
        ? body.identifier
        : typeof body.username === "string"
        ? body.username
        : ""
    ).trim();
    const password = typeof body.password === "string" ? body.password : "";

    if (!identifier || !password) {
      return NextResponse.json(
        { ok: false, error: "Enrollment Number / Gmail and password are required." },
        { status: 400 }
      );
    }

    // Rate limiting: 5 attempts per 15 minutes per identifier
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
    const rateKey = `login_fail:${identifier.toLowerCase()}:${clientIp}`;
    const rateCheck = await checkRateLimit(rateKey, 5, 900);

    if (!rateCheck.success) {
      return NextResponse.json(
        {
          ok: false,
          error: `Too many failed attempts. Account temporarily locked for ${Math.ceil(
            rateCheck.retryAfterSeconds / 60
          )} minute(s).`,
        },
        { status: 429 }
      );
    }

    const user = await authenticatePortalUser(identifier, password);
    if (!user) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid credentials. Please verify your enrollment number or Gmail and password.",
        },
        { status: 401 }
      );
    }

    const token = signSessionToken(user);
    const res = NextResponse.json({
      ok: true,
      role: user.role,
      redirect: user.role === "student" ? "/portal" : "/admin",
    });
    res.cookies.set(PORTAL_COOKIE_NAME, token, cookieOptionsForRequest(req));
    return res;
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to sign in." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(PORTAL_COOKIE_NAME, "", cookieOptionsForRequest(req, 0));
  return res;
}

