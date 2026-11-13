import crypto from "node:crypto";
import { db } from "@/db";
import { otpVerifications } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { checkRateLimit } from "@/lib/rate-limiter";

const OTP_SECRET = process.env.OTP_HASH_SECRET || "msitm-otp-cryptographic-secret-2026";
const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes

interface MemoryOtpRecord {
  id: number;
  identifier: string;
  salt: string;
  otpHash: string;
  purpose: string;
  attempts: number;
  maxAttempts: number;
  expiresAt: number;
  consumedAt?: number;
}

const memoryOtps: MemoryOtpRecord[] = [];
let nextMemoryOtpId = 1;

function hashOtpWithSalt(otp: string, salt: string): string {
  return crypto.scryptSync(otp, salt + OTP_SECRET, 32).toString("hex");
}

function verifyOtpHash(otp: string, salt: string, storedHash: string): boolean {
  const computed = hashOtpWithSalt(otp, salt);
  const a = Buffer.from(computed, "hex");
  const b = Buffer.from(storedHash, "hex");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/**
 * Dispatch an email with the verification OTP.
 * Uses Resend if RESEND_API_KEY is configured, or logs clearly in dev mode.
 */
async function dispatchOtpEmail(
  toEmail: string,
  otp: string,
  purposeLabel = "Student Portal Account Verification"
): Promise<{ dispatched: boolean; provider: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "MSITM Portal <noreply@msitm.edu.in>",
          to: toEmail,
          subject: `${otp} is your MSITM Portal verification code`,
          html: `
            <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h2 style="color: #0f172a; margin-top: 0;">MSITM Student Portal Verification</h2>
              <p style="color: #475569; font-size: 15px;">You requested a verification code for <strong>${purposeLabel}</strong>.</p>
              <div style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 6px; padding: 16px; text-align: center; margin: 24px 0;">
                <span style="font-size: 32px; font-weight: 700; letter-spacing: 6px; color: #1e3a8a;">${otp}</span>
              </div>
              <p style="color: #64748b; font-size: 13px;">This code is valid for 5 minutes. Never share this code with anyone. MSITM staff will never ask for your code.</p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
              <p style="color: #94a3b8; font-size: 11px;">M.S. Institute of Technology & Management, Lucknow Road, Gonda (U.P.)</p>
            </div>
          `,
        }),
      });

      if (res.ok) {
        return { dispatched: true, provider: "resend" };
      }
    } catch {
      // Fall through to dev console logger
    }
  }

  // Development logger
  console.info(`[DEV_OTP_DISPATCH] To: ${toEmail} | OTP: ${otp} | Purpose: ${purposeLabel}`);
  return { dispatched: false, provider: "console_dev" };
}

/**
 * Generate, salt, hash, store, and dispatch a 6-digit OTP to a student's Gmail.
 */
export async function createAndSendOtp(
  email: string,
  purpose: "STUDENT_REGISTRATION" | "PASSWORD_RESET" = "STUDENT_REGISTRATION"
): Promise<{
  success: boolean;
  message: string;
  cooldownSeconds?: number;
  devOtp?: string;
}> {
  const normalizedEmail = email.trim().toLowerCase();

  // 1. Rate Limiting: 60s cooldown per email
  const cooldownCheck = await checkRateLimit(`otp_cooldown:${normalizedEmail}`, 1, 60);
  if (!cooldownCheck.success) {
    return {
      success: false,
      message: `Please wait ${cooldownCheck.retryAfterSeconds} seconds before requesting a new OTP.`,
      cooldownSeconds: cooldownCheck.retryAfterSeconds,
    };
  }

  // 2. Daily Quota: Max 6 OTPs per day per email
  const dailyCheck = await checkRateLimit(`otp_daily:${normalizedEmail}`, 6, 86400);
  if (!dailyCheck.success) {
    return {
      success: false,
      message: "Daily OTP request limit reached. Please contact student affairs or try tomorrow.",
    };
  }

  // 3. Cryptographically strong 6-digit OTP
  const rawOtp = crypto.randomInt(100000, 999999).toString();
  const salt = crypto.randomBytes(16).toString("hex");
  const otpHash = hashOtpWithSalt(rawOtp, salt);
  const expiresAt = new Date(Date.now() + OTP_TTL_MS);

  // 4. Store OTP in DB or fallback
  if (db) {
    try {
      await db.insert(otpVerifications).values({
        identifier: normalizedEmail,
        salt,
        otpHash,
        purpose,
        attempts: 0,
        maxAttempts: 3,
        expiresAt,
      });
    } catch {
      // Fallback to memory
      memoryOtps.push({
        id: nextMemoryOtpId++,
        identifier: normalizedEmail,
        salt,
        otpHash,
        purpose,
        attempts: 0,
        maxAttempts: 3,
        expiresAt: expiresAt.getTime(),
      });
    }
  } else {
    memoryOtps.push({
      id: nextMemoryOtpId++,
      identifier: normalizedEmail,
      salt,
      otpHash,
      purpose,
      attempts: 0,
      maxAttempts: 3,
      expiresAt: expiresAt.getTime(),
    });
  }

  // 5. Dispatch email
  const { provider } = await dispatchOtpEmail(normalizedEmail, rawOtp);

  return {
    success: true,
    message: `Verification code sent to ${normalizedEmail}`,
    devOtp: provider === "console_dev" || process.env.NODE_ENV !== "production" ? rawOtp : undefined,
  };
}

/**
 * Verify a salted OTP submitted by the user.
 */
export async function verifyOtp(
  email: string,
  submittedOtp: string,
  purpose: "STUDENT_REGISTRATION" | "PASSWORD_RESET" = "STUDENT_REGISTRATION"
): Promise<{ valid: boolean; reason?: string }> {
  const normalizedEmail = email.trim().toLowerCase();
  const cleanedOtp = submittedOtp.trim();
  const now = new Date();
  const nowMs = now.getTime();

  if (!/^\d{6}$/.test(cleanedOtp)) {
    return { valid: false, reason: "OTP must be a 6-digit number." };
  }

  // Database path
  if (db) {
    try {
      const records = await db
        .select()
        .from(otpVerifications)
        .where(
          and(
            eq(otpVerifications.identifier, normalizedEmail),
            eq(otpVerifications.purpose, purpose)
          )
        )
        .orderBy(desc(otpVerifications.createdAt))
        .limit(1);

      if (records.length === 0) {
        return { valid: false, reason: "No active verification code found for this email." };
      }

      const rec = records[0];

      if (rec.consumedAt) {
        return { valid: false, reason: "This verification code has already been used." };
      }

      if (new Date(rec.expiresAt).getTime() <= nowMs) {
        return { valid: false, reason: "This verification code has expired. Please request a new one." };
      }

      if (rec.attempts >= rec.maxAttempts) {
        return { valid: false, reason: "Too many incorrect attempts. Please request a new code." };
      }

      const isMatch = verifyOtpHash(cleanedOtp, rec.salt, rec.otpHash);

      if (!isMatch) {
        await db
          .update(otpVerifications)
          .set({ attempts: rec.attempts + 1 })
          .where(eq(otpVerifications.id, rec.id));

        const remaining = rec.maxAttempts - (rec.attempts + 1);
        return {
          valid: false,
          reason: remaining > 0 ? `Incorrect code. ${remaining} attempt(s) remaining.` : "Incorrect code. Limit exceeded.",
        };
      }

      // Mark consumed
      await db
        .update(otpVerifications)
        .set({ consumedAt: now })
        .where(eq(otpVerifications.id, rec.id));

      return { valid: true };
    } catch {
      // Fallback through to memory
    }
  }

  // Memory path
  const matching = memoryOtps
    .filter((o) => o.identifier === normalizedEmail && o.purpose === purpose)
    .sort((a, b) => b.id - a.id);

  if (matching.length === 0) {
    return { valid: false, reason: "No active verification code found for this email." };
  }

  const rec = matching[0];

  if (rec.consumedAt) {
    return { valid: false, reason: "This verification code has already been used." };
  }

  if (rec.expiresAt <= nowMs) {
    return { valid: false, reason: "This verification code has expired. Please request a new one." };
  }

  if (rec.attempts >= rec.maxAttempts) {
    return { valid: false, reason: "Too many incorrect attempts. Please request a new code." };
  }

  const isMatch = verifyOtpHash(cleanedOtp, rec.salt, rec.otpHash);

  if (!isMatch) {
    rec.attempts += 1;
    const remaining = rec.maxAttempts - rec.attempts;
    return {
      valid: false,
      reason: remaining > 0 ? `Incorrect code. ${remaining} attempt(s) remaining.` : "Incorrect code. Limit exceeded.",
    };
  }

  rec.consumedAt = nowMs;
  return { valid: true };
}

