import { NextResponse } from "next/server";
import { db } from "@/db";
import { feedback } from "@/db/schema";

const emailOk = (v: unknown) => typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.website) return NextResponse.json({ ok: true }, { status: 200 }); // honeypot
    const { firstName, lastName, email, message, kind } = body;
    if (
      typeof firstName !== "string" || !firstName.trim() ||
      typeof lastName !== "string" || !lastName.trim() ||
      !emailOk(email) ||
      typeof message !== "string" || message.trim().length < 10
    ) {
      return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
    }
    if (!db) {
      return NextResponse.json({ ok: true, message: "Feedback received (offline mode)." }, { status: 200 });
    }
    await db.insert(feedback).values({
      firstName: firstName.trim().slice(0, 80),
      lastName: lastName.trim().slice(0, 80),
      email: String(email).trim().slice(0, 160),
      kind: kind === "survey" ? "survey" : "feedback",
      message: message.trim().slice(0, 5000),
    });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}
