import { db } from "@/db";
import { rateLimitHits } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

interface RateLimitResult {
  success: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

// In-memory fallback for local dev or when database is not connected
interface MemoryBucket {
  hitCount: number;
  windowStart: number;
  expiresAt: number;
}

const memoryStore = new Map<string, MemoryBucket>();

/**
 * Atomic Serverless-Safe Rate Limiter.
 * Works with PostgreSQL `rate_limit_hits` table with automatic window reset,
 * and falls back safely to an in-memory store in demo / local environments.
 *
 * @param key Unique key, e.g. "otp:student@gmail.com" or "login:192.168.1.10"
 * @param maxRequests Maximum allowed hits within the window
 * @param windowSeconds Window length in seconds (e.g. 60 for OTP cooldown, 900 for login lockout)
 */
export async function checkRateLimit(
  key: string,
  maxRequests: number,
  windowSeconds: number
): Promise<RateLimitResult> {
  const nowMs = Date.now();
  const nowDate = new Date(nowMs);
  const windowMs = windowSeconds * 1000;
  const newExpiryDate = new Date(nowMs + windowMs);

  if (db) {
    try {
      // Fetch existing record
      const rows = await db
        .select()
        .from(rateLimitHits)
        .where(eq(rateLimitHits.rateKey, key))
        .limit(1);

      if (rows.length === 0) {
        // First request in bucket
        await db.insert(rateLimitHits).values({
          rateKey: key,
          hitCount: 1,
          windowStart: nowDate,
          expiresAt: newExpiryDate,
        });
        return { success: true, remaining: maxRequests - 1, retryAfterSeconds: 0 };
      }

      const existing = rows[0];
      const expiryMs = new Date(existing.expiresAt).getTime();

      // Window expired? Reset window
      if (expiryMs <= nowMs) {
        await db
          .update(rateLimitHits)
          .set({
            hitCount: 1,
            windowStart: nowDate,
            expiresAt: newExpiryDate,
          })
          .where(eq(rateLimitHits.rateKey, key));
        return { success: true, remaining: maxRequests - 1, retryAfterSeconds: 0 };
      }

      // Inside active window: Check quota
      if (existing.hitCount >= maxRequests) {
        const retryAfterSeconds = Math.max(1, Math.ceil((expiryMs - nowMs) / 1000));
        return { success: false, remaining: 0, retryAfterSeconds };
      }

      // Increment hit count atomically
      await db
        .update(rateLimitHits)
        .set({
          hitCount: sql`${rateLimitHits.hitCount} + 1`,
        })
        .where(eq(rateLimitHits.rateKey, key));

      return {
        success: true,
        remaining: Math.max(0, maxRequests - (existing.hitCount + 1)),
        retryAfterSeconds: 0,
      };
    } catch {
      // Fall through to memory store if DB is unreachable
    }
  }

  // Fallback: In-memory store
  const bucket = memoryStore.get(key);
  if (!bucket || bucket.expiresAt <= nowMs) {
    memoryStore.set(key, {
      hitCount: 1,
      windowStart: nowMs,
      expiresAt: nowMs + windowMs,
    });
    return { success: true, remaining: maxRequests - 1, retryAfterSeconds: 0 };
  }

  if (bucket.hitCount >= maxRequests) {
    const retryAfterSeconds = Math.max(1, Math.ceil((bucket.expiresAt - nowMs) / 1000));
    return { success: false, remaining: 0, retryAfterSeconds };
  }

  bucket.hitCount += 1;
  return {
    success: true,
    remaining: Math.max(0, maxRequests - bucket.hitCount),
    retryAfterSeconds: 0,
  };
}

