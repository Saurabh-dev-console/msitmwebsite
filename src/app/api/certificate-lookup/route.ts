import { NextResponse } from "next/server";
import { db } from "@/db";
import { certificateLookups } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, certificateId, event } = body;
    if (
      typeof name !== "string" || !name.trim() ||
      typeof event !== "string" || !event.trim()
    ) {
      return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
    }
    if (db) {
      await db.insert(certificateLookups).values({
        name: name.trim().slice(0, 160),
        certificateId: typeof certificateId === "string" ? certificateId.trim().slice(0, 80) || null : null,
        event: event.trim().slice(0, 160),
      });
    }
    // Honest response: records are held offline by the institute office.
    return NextResponse.json(
      { ok: true, verified: false, message: "Request logged for office verification." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}
