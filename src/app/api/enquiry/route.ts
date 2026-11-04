import { NextResponse } from "next/server";
import { db } from "@/db";
import { enquiries } from "@/db/schema";

const emailOk = (v: unknown) => typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.website) return NextResponse.json({ ok: true }, { status: 200 }); // honeypot
    const { firstName, lastName, email, phone, interest, message } = body;
    if (
      typeof firstName !== "string" || !firstName.trim() ||
      typeof lastName !== "string" || !lastName.trim() ||
      !emailOk(email) ||
      typeof message !== "string" || message.trim().length < 10
    ) {
      return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
    }
    await db.insert(enquiries).values({
      firstName: firstName.trim().slice(0, 80),
      lastName: lastName.trim().slice(0, 80),
      email: String(email).trim().slice(0, 160),
      phone: typeof phone === "string" ? phone.trim().slice(0, 30) || null : null,
      interest: typeof interest === "string" ? interest.trim().slice(0, 120) || null : null,
      message: message.trim().slice(0, 5000),
      source: "website-enquiry",
    });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}
