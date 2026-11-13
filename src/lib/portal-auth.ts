import crypto from "node:crypto";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import type { PortalRole, PortalSession } from "@/lib/portal-types";

export const PORTAL_COOKIE_NAME = "msitm_portal_session";
const SESSION_TTL_SEC = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  return process.env.PORTAL_SESSION_SECRET || "msitm-gonda-ug-portal-dev-secret-2026";
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split(":");
  if (parts.length !== 2) return false;
  const [salt, expectedHex] = parts;
  const actual = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(expectedHex, "hex");
  if (actual.length !== expected.length) return false;
  return crypto.timingSafeEqual(actual, expected);
}

export function signSessionToken(payload: Omit<PortalSession, "exp">): string {
  const full: PortalSession = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SEC,
  };
  const data = Buffer.from(JSON.stringify(full), "utf8").toString("base64url");
  const sig = crypto.createHmac("sha256", getSecret()).update(data).digest("base64url");
  return `${data}.${sig}`;
}

export function verifySessionToken(token: string | undefined): PortalSession | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [data, sig] = parts;
  const expectedSig = crypto.createHmac("sha256", getSecret()).update(data).digest("base64url");
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }
  try {
    const parsed = JSON.parse(Buffer.from(data, "base64url").toString("utf8")) as PortalSession;
    if (!parsed.exp || parsed.exp < Math.floor(Date.now() / 1000)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function getPortalSession(): Promise<PortalSession | null> {
  const store = await cookies();
  return verifySessionToken(store.get(PORTAL_COOKIE_NAME)?.value);
}

export function getPortalSessionFromRequest(req: NextRequest): PortalSession | null {
  return verifySessionToken(req.cookies.get(PORTAL_COOKIE_NAME)?.value);
}

export function isStaffRole(role: PortalRole): boolean {
  return role !== "student";
}

export function cookieOptionsForRequest(req: Request, maxAge = SESSION_TTL_SEC) {
  const proto = req.headers.get("x-forwarded-proto") || new URL(req.url).protocol.replace(":", "");
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge,
    secure: proto === "https",
  };
}

