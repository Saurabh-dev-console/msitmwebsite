import crypto from "node:crypto";
import { db } from "@/db";
import { passwordResetTokens, portalUsers, students } from "@/db/schema";
import { eq, and, or, sql, desc } from "drizzle-orm";
import { hashPassword } from "@/lib/portal-auth";
import { getStore, type PortalUserRow } from "@/lib/portal-store";
import type { StudentRecord } from "@/lib/portal-types";
import { checkRateLimit } from "@/lib/rate-limiter";

const RESET_SECRET = process.env.PASSWORD_RESET_SECRET || "msitm-password-reset-salt-2026";
const RESET_TTL_MS = 15 * 60 * 1000; // 15 minutes

interface MemoryResetToken {
  id: number;
  userId: number;
  tokenHash: string;
  expiresAt: number;
  usedAt?: number;
}

const memoryResetTokens: MemoryResetToken[] = [];
let nextResetId = 1;

function hashToken(rawToken: string): string {
  return crypto.createHmac("sha256", RESET_SECRET).update(rawToken).digest("hex");
}

/**
 * Initiate a single-link password reset for a student or staff member.
 */
export async function createPasswordResetLink(
  identifierRaw: string,
  baseUrl: string
): Promise<{ success: boolean; message: string; devResetUrl?: string }> {
  const identifier = identifierRaw.trim().toLowerCase();
  if (!identifier) {
    return { success: false, message: "Please provide your enrollment number or registered email." };
  }

  // Rate limit: Max 3 password reset requests per hour per identifier
  const rate = await checkRateLimit(`pwd_reset:${identifier}`, 3, 3600);
  if (!rate.success) {
    return {
      success: false,
      message: `Too many password reset requests. Please try again in ${Math.ceil(rate.retryAfterSeconds / 60)} minutes.`,
    };
  }

  let matchedUserId: number | null = null;
  let targetEmail: string | null = null;
  let displayName: string = "";

  // 1. Database Lookup
  if (db) {
    try {
      const rows = await db
        .select({
          user: portalUsers,
          studentEmail: students.email,
        })
        .from(portalUsers)
        .leftJoin(students, eq(students.userId, portalUsers.id))
        .where(
          and(
            eq(portalUsers.active, true),
            or(
              sql`lower(${portalUsers.email}) = ${identifier}`,
              sql`lower(${portalUsers.username}) = ${identifier}`,
              sql`lower(${students.enrollmentNo}) = ${identifier}`
            )
          )
        )
        .limit(1);

      if (rows.length > 0) {
        matchedUserId = rows[0].user.id;
        targetEmail = rows[0].user.email || rows[0].studentEmail || null;
        displayName = rows[0].user.displayName;
      }
    } catch {
      // Fall through to memory
    }
  }

  // 2. Memory Store Lookup Fallback
  if (!matchedUserId) {
    const store = getStore();
    const user = store.users.find((u: PortalUserRow) => {
      if (!u.active) return false;
      if (u.username.toLowerCase() === identifier) return true;
      if (u.email && u.email.toLowerCase() === identifier) return true;
      const st = store.students.find((s: StudentRecord) => s.userId === u.id);
      if (st && st.enrollmentNo.toLowerCase() === identifier) return true;
      return false;
    });

    if (user) {
      matchedUserId = user.id;
      const st = store.students.find((s: StudentRecord) => s.userId === user.id);
      targetEmail = user.email || st?.email || null;
      displayName = user.displayName;
    }
  }

  // Generic message to prevent email enumeration
  const genericResponse = {
    success: true,
    message: "If an active account matches the details provided, a password reset link has been dispatched.",
  };

  if (!matchedUserId || !targetEmail) {
    return genericResponse;
  }

  // Generate secure token
  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + RESET_TTL_MS);

  if (db) {
    try {
      await db.insert(passwordResetTokens).values({
        userId: matchedUserId,
        tokenHash,
        expiresAt,
      });
    } catch {
      memoryResetTokens.push({
        id: nextResetId++,
        userId: matchedUserId,
        tokenHash,
        expiresAt: expiresAt.getTime(),
      });
    }
  } else {
    memoryResetTokens.push({
      id: nextResetId++,
      userId: matchedUserId,
      tokenHash,
      expiresAt: expiresAt.getTime(),
    });
  }

  const resetUrl = `${baseUrl.replace(/\/$/, "")}/portal/reset-password?token=${rawToken}`;

  // Dispatch Email
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "MSITM Portal <noreply@msitm.edu.in>",
          to: targetEmail,
          subject: "Reset your MSITM Portal Password",
          html: `
            <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h2 style="color: #0f172a; margin-top: 0;">Password Reset Request</h2>
              <p style="color: #475569; font-size: 15px;">Hello ${displayName},</p>
              <p style="color: #475569; font-size: 15px;">We received a request to reset the password for your MSITM Portal account. Click the secure link below to set a new password:</p>
              <div style="margin: 28px 0; text-align: center;">
                <a href="${resetUrl}" style="background-color: #1e3a8a; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; display: inline-block;">Reset Password</a>
              </div>
              <p style="color: #64748b; font-size: 13px;">This link will expire in 15 minutes. If you did not request this, you can safely ignore this email.</p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
              <p style="color: #94a3b8; font-size: 11px;">M.S. Institute of Technology & Management, Lucknow Road, Gonda (U.P.)</p>
            </div>
          `,
        }),
      });
    } catch {
      // Fall through to dev return
    }
  }

  console.info(`[DEV_RESET_DISPATCH] To: ${targetEmail} | URL: ${resetUrl}`);

  return {
    ...genericResponse,
    devResetUrl: process.env.NODE_ENV !== "production" ? resetUrl : undefined,
  };
}

/**
 * Complete password reset using token and update tokenVersion to revoke all active sessions.
 */
export async function resetPasswordWithToken(
  rawToken: string,
  newPassword: string
): Promise<{ success: boolean; message: string }> {
  if (!rawToken || !newPassword) {
    return { success: false, message: "Token and new password are required." };
  }

  if (newPassword.length < 8) {
    return { success: false, message: "Password must be at least 8 characters long." };
  }

  const tokenHash = hashToken(rawToken.trim());
  const now = new Date();
  const nowMs = now.getTime();
  const newHash = hashPassword(newPassword);

  // Database path
  if (db) {
    try {
      const records = await db
        .select()
        .from(passwordResetTokens)
        .where(eq(passwordResetTokens.tokenHash, tokenHash))
        .orderBy(desc(passwordResetTokens.createdAt))
        .limit(1);

      if (records.length === 0) {
        return { success: false, message: "Invalid or expired password reset link." };
      }

      const rec = records[0];
      if (rec.usedAt) {
        return { success: false, message: "This password reset link has already been used." };
      }

      if (new Date(rec.expiresAt).getTime() <= nowMs) {
        return { success: false, message: "This reset link has expired. Please request a new one." };
      }

      // 1. Update password and bump tokenVersion to invalidate existing cookies on all devices
      await db
        .update(portalUsers)
        .set({
          passwordHash: newHash,
          tokenVersion: sql`${portalUsers.tokenVersion} + 1`,
          updatedAt: now,
        })
        .where(eq(portalUsers.id, rec.userId));

      // 2. Mark token used
      await db
        .update(passwordResetTokens)
        .set({ usedAt: now })
        .where(eq(passwordResetTokens.id, rec.id));

      return { success: true, message: "Password updated successfully. You can now log in." };
    } catch {
      // Fall through to memory
    }
  }

  // Memory path
  const rec = memoryResetTokens.find((r) => r.tokenHash === tokenHash);
  if (!rec) {
    return { success: false, message: "Invalid or expired password reset link." };
  }

  if (rec.usedAt) {
    return { success: false, message: "This password reset link has already been used." };
  }

  if (rec.expiresAt <= nowMs) {
    return { success: false, message: "This reset link has expired. Please request a new one." };
  }

  const store = getStore();
  const user = store.users.find((u: PortalUserRow) => u.id === rec.userId);
  if (!user) {
    return { success: false, message: "User account not found." };
  }

  user.passwordHash = newHash;
  user.tokenVersion = (user.tokenVersion || 1) + 1;
  rec.usedAt = nowMs;

  return { success: true, message: "Password updated successfully. You can now log in." };
}
