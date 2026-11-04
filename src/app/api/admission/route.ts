import { NextResponse } from "next/server";
import { db } from "@/db";
import { admissions } from "@/db/schema";

const emailOk = (v: unknown) => typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const phoneOk = (v: unknown) => typeof v === "string" && /^[+\d][\d\s-]{7,16}$/.test(v.trim());

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.website) return NextResponse.json({ ok: true }, { status: 200 }); // honeypot
    const { fullName, email, phone, course, qualification, city, message } = body;
    if (
      typeof fullName !== "string" || !fullName.trim() ||
      !emailOk(email) ||
      !phoneOk(phone) ||
      typeof course !== "string" || !course.trim()
    ) {
      return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
    }
    await db.insert(admissions).values({
      fullName: fullName.trim().slice(0, 160),
      email: String(email).trim().slice(0, 160),
      phone: String(phone).trim().slice(0, 30),
      course: course.trim().slice(0, 120),
      qualification: typeof qualification === "string" ? qualification.trim().slice(0, 120) || null : null,
      city: typeof city === "string" ? city.trim().slice(0, 120) || null : null,
      message: typeof message === "string" ? message.trim().slice(0, 5000) || null : null,
    });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}
