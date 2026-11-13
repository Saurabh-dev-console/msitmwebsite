"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icons } from "@/components/icons";

interface VerifiedStudent {
  id: number;
  enrollmentNo: string;
  fullName: string;
  course: "BCA" | "BBA";
  batch: string;
  semester: number;
  maskedPhone: string;
}

export default function StudentRegisterPage() {
  const router = useRouter();

  // Wizard Step: 1 = Identity, 2 = Gmail & OTP, 3 = Password
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1 Form State
  const [enrollmentNo, setEnrollmentNo] = useState("MSITM-BCA-2026-001");
  const [dob, setDob] = useState("2007-08-15");
  const [phoneLast4, setPhoneLast4] = useState("3456");
  const [verifiedStudent, setVerifiedStudent] = useState<VerifiedStudent | null>(null);

  // Step 2 Form State
  const [gmail, setGmail] = useState("");
  const [otp, setOtp] = useState("");
  const [devOtp, setDevOtp] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  // Step 3 Form State
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Feedback State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Cooldown countdown effect
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // Step 1: Verify Student Record
  async function handleVerifyStudent(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/portal/register/verify-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enrollmentNo, dob, phoneLast4 }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "Unable to verify student details.");
        return;
      }

      setVerifiedStudent(data.student);
      setSuccessMsg("Student record verified! Please provide your personal Gmail ID.");
      setStep(2);
    } catch {
      setError("Network error while connecting to college verification server.");
    } finally {
      setLoading(false);
    }
  }

  // Step 2: Request OTP
  async function handleSendOtp() {
    if (!gmail || !gmail.endsWith("@gmail.com")) {
      setError("Please enter a valid personal Gmail address (@gmail.com).");
      return;
    }

    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/portal/register/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enrollmentNo, dob, phoneLast4, email: gmail }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "Failed to send OTP.");
        if (data.cooldownSeconds) setCooldown(data.cooldownSeconds);
        return;
      }

      setSuccessMsg(`Verification OTP dispatched to ${gmail}`);
      setCooldown(60);
      if (data.devOtp) {
        setDevOtp(data.devOtp);
      }
    } catch {
      setError("Network error while requesting verification OTP.");
    } finally {
      setLoading(false);
    }
  }

  // Step 3: Complete Registration
  async function handleCompleteRegistration(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!otp || otp.length !== 6) {
      setError("Please enter the 6-digit OTP received on your Gmail.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/portal/register/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enrollmentNo,
          dob,
          phoneLast4,
          email: gmail,
          otp,
          password,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "Registration failed.");
        return;
      }

      setSuccessMsg("Registration complete! Redirecting to your Student Dashboard…");
      setTimeout(() => {
        router.push("/portal");
        router.refresh();
      }, 1200);
    } catch {
      setError("Network error while finalizing account registration.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      {/* Breadcrumb / Back link */}
      <div className="mb-6">
        <Link
          href="/portal"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-navy-900"
        >
          <Icons.ArrowLeft className="h-4 w-4" />
          Back to Portal Login
        </Link>
      </div>

      <div className="card-line p-6 sm:p-10">
        {/* Header */}
        <div className="border-b border-line pb-6">
          <p className="eyebrow">Student Self-Service Portal</p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-navy-900 mt-1">
            Student Account Registration
          </h1>
          <p className="mt-2 text-sm text-muted">
            New or continuing BCA/BBA students can claim and activate their digital portal account using their official college enrollment details and personal Gmail.
          </p>

          {/* Stepper Indicator */}
          <div className="mt-8 flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-line z-0" />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-primary transition-all duration-300 z-0"
              style={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }}
            />

            {[
              { num: 1, label: "Identity Match" },
              { num: 2, label: "Gmail & OTP" },
              { num: 3, label: "Set Password" },
            ].map((s) => (
              <div key={s.num} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step >= s.num
                      ? "bg-navy-900 text-gold-400 border-2 border-navy-900"
                      : "bg-surface text-muted border-2 border-line"
                  }`}
                >
                  {step > s.num ? <Icons.Check className="h-4 w-4" /> : s.num}
                </div>
                <span className="mt-1.5 text-xs font-medium text-navy-900 whitespace-nowrap">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        {error ? (
          <div
            role="alert"
            className="mt-6 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive flex items-center gap-2"
          >
            <Icons.AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </div>
        ) : null}

        {successMsg ? (
          <div
            role="status"
            className="mt-6 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary flex items-center gap-2"
          >
            <Icons.CheckCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{successMsg}</span>
          </div>
        ) : null}

        {/* STEP 1: Verify Student Record */}
        {step === 1 && (
          <form onSubmit={handleVerifyStudent} className="mt-6 space-y-5">
            <div className="rounded-lg bg-navy-50/70 border border-navy-100 p-4 text-xs text-navy-800">
              <p className="font-semibold">Verification Instructions:</p>
              <p className="mt-1">
                Enter your official Enrollment Number as printed on your MSITM admission slip, your Date of Birth, and the last 4 digits of the mobile number given at admission time.
              </p>
            </div>

            <div>
              <label htmlFor="reg-enrollment" className="field-label">
                Enrollment Number
              </label>
              <input
                id="reg-enrollment"
                type="text"
                required
                value={enrollmentNo}
                onChange={(e) => setEnrollmentNo(e.target.value.toUpperCase())}
                placeholder="e.g. MSITM-BCA-2026-001"
                className="field-input font-mono"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="reg-dob" className="field-label">
                  Date of Birth
                </label>
                <input
                  id="reg-dob"
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="field-input"
                />
              </div>

              <div>
                <label htmlFor="reg-phone4" className="field-label">
                  Registered Mobile (Last 4 Digits)
                </label>
                <input
                  id="reg-phone4"
                  type="text"
                  maxLength={4}
                  pattern="\d{4}"
                  required
                  value={phoneLast4}
                  onChange={(e) => setPhoneLast4(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="e.g. 3456"
                  className="field-input font-mono"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-4">
              <Link href="/portal" className="text-xs text-muted hover:text-navy-900 font-medium">
                Already registered? Sign in
              </Link>
              <button type="submit" disabled={loading} className="btn btn-navy">
                <Icons.Search className="h-4 w-4" />
                {loading ? "Verifying Record…" : "Verify My Admission"}
              </button>
            </div>
          </form>
        )}

        {/* STEP 2 & 3: Verified Card & Gmail Verification */}
        {step >= 2 && verifiedStudent && (
          <div className="mt-6 space-y-6">
            {/* Student Confirmation Banner */}
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 flex items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                  <Icons.CheckCircle className="h-3 w-3" /> Record Matched
                </span>
                <p className="font-display text-lg font-bold text-navy-900 mt-0.5">
                  {verifiedStudent.fullName}
                </p>
                <p className="text-xs font-mono text-muted">
                  {verifiedStudent.enrollmentNo} · {verifiedStudent.course} Semester {verifiedStudent.semester} ({verifiedStudent.batch}) · Mobile: {verifiedStudent.maskedPhone}
                </p>
              </div>
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-muted hover:text-navy-900 underline shrink-0"
                >
                  Change
                </button>
              )}
            </div>

            {/* Gmail + OTP Form */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <label htmlFor="reg-gmail" className="field-label">
                    Your Personal Gmail Address (@gmail.com)
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="reg-gmail"
                      type="email"
                      required
                      value={gmail}
                      onChange={(e) => setGmail(e.target.value)}
                      placeholder="e.g. student.name@gmail.com"
                      className="field-input flex-1"
                    />
                    <button
                      type="button"
                      disabled={loading || cooldown > 0}
                      onClick={handleSendOtp}
                      className="btn btn-primary shrink-0"
                    >
                      {cooldown > 0 ? `Resend (${cooldown}s)` : "Send OTP"}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    We will send a 6-digit confirmation code to this Gmail address. You will use this Gmail to log in in the future.
                  </p>
                </div>

                {devOtp && (
                  <div className="rounded-lg border border-dashed border-amber-500 bg-amber-50 p-3 flex items-center justify-between gap-2">
                    <div className="text-xs text-amber-900">
                      <span className="font-bold">Dev/Test OTP:</span> <span className="font-mono text-sm font-extrabold">{devOtp}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOtp(devOtp)}
                      className="text-xs font-semibold text-amber-800 underline hover:text-amber-900"
                    >
                      Auto-fill OTP
                    </button>
                  </div>
                )}

                <div>
                  <label htmlFor="reg-otp" className="field-label">
                    6-Digit Verification Code
                  </label>
                  <input
                    id="reg-otp"
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="Enter 6-digit OTP"
                    className="field-input font-mono tracking-widest text-lg"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn btn-outline-dark btn-sm"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!otp || otp.length !== 6}
                    onClick={() => {
                      if (!otp || otp.length !== 6) return;
                      setStep(3);
                    }}
                    className="btn btn-navy"
                  >
                    Continue to Set Password
                    <Icons.ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Password Creation */}
            {step === 3 && (
              <form onSubmit={handleCompleteRegistration} className="space-y-5">
                <div className="rounded-lg bg-surface border border-line p-3 text-xs text-muted">
                  <p>
                    Verified Gmail: <strong className="text-navy-900 font-mono">{gmail}</strong>
                  </p>
                </div>

                <div>
                  <label htmlFor="reg-pass" className="field-label">
                    Create Portal Password
                  </label>
                  <input
                    id="reg-pass"
                    type="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="field-input"
                  />
                </div>

                <div>
                  <label htmlFor="reg-conf-pass" className="field-label">
                    Confirm Password
                  </label>
                  <input
                    id="reg-conf-pass"
                    type="password"
                    required
                    minLength={8}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="field-input"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="btn btn-outline-dark btn-sm"
                  >
                    Back to OTP
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-navy"
                  >
                    <Icons.CheckCircle className="h-4 w-4" />
                    {loading ? "Activating Account…" : "Complete Registration & Enter Portal"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

