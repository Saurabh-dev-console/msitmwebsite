import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";

// Test 1: Rate Limiter logic verification
test("Rate Limiter - window reset & hit counting logic", async () => {
  const store = new Map();
  function checkLimit(key, max, windowMs, now) {
    const bucket = store.get(key);
    if (!bucket || bucket.expiresAt <= now) {
      store.set(key, { hitCount: 1, expiresAt: now + windowMs });
      return { success: true, remaining: max - 1 };
    }
    if (bucket.hitCount >= max) {
      return { success: false, remaining: 0, retryAfter: Math.ceil((bucket.expiresAt - now) / 1000) };
    }
    bucket.hitCount++;
    return { success: true, remaining: max - bucket.hitCount };
  }

  let t = 1000000;
  // Hit 1: ok
  assert.equal(checkLimit("user1", 3, 60000, t).success, true);
  // Hit 2: ok
  assert.equal(checkLimit("user1", 3, 60000, t + 1000).success, true);
  // Hit 3: ok
  assert.equal(checkLimit("user1", 3, 60000, t + 2000).success, true);
  // Hit 4: blocked
  const blocked = checkLimit("user1", 3, 60000, t + 3000);
  assert.equal(blocked.success, false);
  assert.equal(blocked.retryAfter, 57);

  // After window expiration (t + 61000): reset!
  const reset = checkLimit("user1", 3, 60000, t + 61000);
  assert.equal(reset.success, true);
  assert.equal(reset.remaining, 2);
});

// Test 2: Salted Scrypt OTP Cryptographic Hashing
test("OTP Cryptography - Salted Scrypt is rainbow-table safe and timing-safe", () => {
  const OTP_SECRET = "test-secret-2026";
  const rawOtp = "482910";
  const salt = crypto.randomBytes(16).toString("hex");

  function hashOtp(otp, s) {
    return crypto.scryptSync(otp, s + OTP_SECRET, 32).toString("hex");
  }

  const hash1 = hashOtp(rawOtp, salt);
  const hash2 = hashOtp(rawOtp, salt);
  assert.equal(hash1, hash2);

  // Different salt produces completely different hash
  const otherSalt = crypto.randomBytes(16).toString("hex");
  const hashOtherSalt = hashOtp(rawOtp, otherSalt);
  assert.notEqual(hash1, hashOtherSalt);

  // Wrong OTP fails timing-safe compare
  const wrongHash = hashOtp("000000", salt);
  const bufA = Buffer.from(hash1, "hex");
  const bufWrong = Buffer.from(wrongHash, "hex");
  assert.equal(crypto.timingSafeEqual(bufA, bufWrong), false);
});

// Test 3: Password Reset Single-link HMAC Token Hashing & tokenVersion Revocation
test("Password Reset Token Hashing & Session Invalidation", () => {
  const RESET_SECRET = "reset-secret-2026";
  const rawToken = crypto.randomBytes(32).toString("hex");

  function hashToken(tok) {
    return crypto.createHmac("sha256", RESET_SECRET).update(tok).digest("hex");
  }

  const storedHash = hashToken(rawToken);
  assert.equal(storedHash.length, 64);
  assert.equal(hashToken(rawToken), storedHash);

  // Multi-device session revocation via tokenVersion
  const user = { id: 1, username: "MSITM-BCA-2024-014", tokenVersion: 1 };
  const activeSessionTokenVersion = user.tokenVersion;

  // On password change, tokenVersion is incremented
  user.tokenVersion += 1;
  assert.notEqual(activeSessionTokenVersion, user.tokenVersion);
  // Any session with tokenVersion < user.tokenVersion is automatically invalidated
  const isSessionValid = (sessVersion) => sessVersion === user.tokenVersion;
  assert.equal(isSessionValid(activeSessionTokenVersion), false);
  assert.equal(isSessionValid(user.tokenVersion), true);
});

// Test 4: Dual-Login Match Logic
test("Dual-Login Identifier Resolution", () => {
  const users = [
    { id: 1, username: "MSITM-BCA-2024-014", email: "ananya.verma@student.msitm.edu.in", active: true },
    { id: 4, username: "admin", email: "admin@msitm.edu.in", active: true },
  ];
  const students = [
    { id: 1, userId: 1, enrollmentNo: "MSITM-BCA-2024-014" },
  ];

  function findUser(identifier) {
    const lower = identifier.trim().toLowerCase();
    return users.find((u) => {
      if (!u.active) return false;
      if (u.username.toLowerCase() === lower) return true;
      if (u.email && u.email.toLowerCase() === lower) return true;
      const st = students.find((s) => s.userId === u.id);
      if (st && st.enrollmentNo.toLowerCase() === lower) return true;
      return false;
    });
  }

  // 1. Match by Enrollment Number (UPPERCASE)
  assert.equal(findUser("MSITM-BCA-2024-014")?.id, 1);
  // 2. Match by Enrollment Number (lowercase)
  assert.equal(findUser("msitm-bca-2024-014")?.id, 1);
  // 3. Match by Gmail / Email
  assert.equal(findUser("ananya.verma@student.msitm.edu.in")?.id, 1);
  // 4. Match by Staff ID
  assert.equal(findUser("admin")?.id, 4);
  // 5. Unknown returns undefined
  assert.equal(findUser("nonexistent@gmail.com"), undefined);
});

// Test 5: Student Registration Eligibility Rules
test("Student Eligibility Rules", () => {
  const students = [
    {
      id: 1,
      userId: 1,
      enrollmentNo: "MSITM-BCA-2024-014",
      dob: "2006-04-12",
      phone: "+91-9415011223",
      guardianPhone: "+91-9415011200",
      status: "active",
    },
    {
      id: 4,
      userId: null,
      enrollmentNo: "MSITM-BCA-2026-001",
      dob: "2007-08-15",
      phone: "+91-9450123456",
      guardianPhone: "+91-9450987654",
      status: "active",
    },
  ];

  function checkEligibility(enrollment, dob, phoneLast4) {
    const s = students.find((x) => x.enrollmentNo.toUpperCase() === enrollment.toUpperCase());
    if (!s) return { eligible: false, reason: "NOT_FOUND" };
    const p1 = s.phone.replace(/\D/g, "");
    const p2 = s.guardianPhone.replace(/\D/g, "");
    const matchPhone = p1.endsWith(phoneLast4) || p2.endsWith(phoneLast4);
    if (s.dob !== dob || !matchPhone) return { eligible: false, reason: "MISMATCH" };
    if (s.userId !== null) return { eligible: false, reason: "ALREADY_REGISTERED" };
    return { eligible: true, student: s };
  }

  // Unregistered student matching correctly
  const res1 = checkEligibility("MSITM-BCA-2026-001", "2007-08-15", "3456");
  assert.equal(res1.eligible, true);
  assert.equal(res1.student.id, 4);

  // Wrong DOB
  const res2 = checkEligibility("MSITM-BCA-2026-001", "2007-01-01", "3456");
  assert.equal(res2.eligible, false);
  assert.equal(res2.reason, "MISMATCH");

  // Wrong phone last 4
  const res3 = checkEligibility("MSITM-BCA-2026-001", "2007-08-15", "9999");
  assert.equal(res3.eligible, false);
  assert.equal(res3.reason, "MISMATCH");

  // Already registered student
  const res4 = checkEligibility("MSITM-BCA-2024-014", "2006-04-12", "1223");
  assert.equal(res4.eligible, false);
  assert.equal(res4.reason, "ALREADY_REGISTERED");
});

