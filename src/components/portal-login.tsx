"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icons } from "@/components/icons";

const DEMO_ACCOUNTS = [
  { label: "Ananya Verma · BCA Sem IV (Cleared)", username: "MSITM-BCA-2024-014", email: "ananya.verma@student.msitm.edu.in", tag: "Student" },
  { label: "Rohan Tiwari · BBA Sem II (Fee Due + Pending Gate Pass)", username: "MSITM-BBA-2025-008", email: "rohan.tiwari@student.msitm.edu.in", tag: "Student" },
  { label: "Arjun Mishra · BCA Sem VI (Attendance Hold)", username: "MSITM-BCA-2023-031", email: "arjun.mishra@student.msitm.edu.in", tag: "Student" },
  { label: "Principal / Office Admin", username: "admin", email: "admin@msitm.edu.in", tag: "Admin" },
  { label: "Accounts & Fee Clerk", username: "accounts", email: "accounts@msitm.edu.in", tag: "Accounts" },
  { label: "Exam Cell Controller", username: "examcell", email: "examcell@msitm.edu.in", tag: "Exam Cell" },
  { label: "UG Coordinator / HOD (Gate Pass & Attendance)", username: "faculty", email: "faculty@msitm.edu.in", tag: "Faculty" },
  { label: "Main Campus Gate Guard", username: "guard", email: "guard@msitm.edu.in", tag: "Security" },
];

export function PortalLoginForm() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitCredentials(user: string, pass: string) {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/portal/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: user, password: pass }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Invalid credentials.");
        return;
      }
      router.push(data.redirect || "/portal");
      router.refresh();
    } catch {
      setError("Network error while signing in.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    void submitCredentials(identifier, password);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] items-start">
      <div className="space-y-6">
        {/* Registration Promotion Box */}
        <div className="rounded-xl border border-primary/25 bg-primary/5 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary">New Student Admission?</p>
            <p className="text-sm font-semibold text-navy-900 mt-0.5">Claim your account with your Gmail ID</p>
            <p className="text-xs text-muted mt-0.5">Use your Enrollment Number &amp; Date of Birth to activate portal access.</p>
          </div>
          <Link href="/portal/register" className="btn btn-primary btn-sm shrink-0 whitespace-nowrap">
            <Icons.UserCheck className="h-4 w-4" aria-hidden="true" />
            Register Here
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="card-line p-6 sm:p-8 space-y-5">
          <div>
            <p className="eyebrow">Secure Portal Access</p>
            <h2 className="font-display mt-2 text-2xl font-semibold text-navy-900">Sign in to MSITM Portal</h2>
            <p className="mt-1 text-sm text-muted">
              Log in using your verified Gmail address or Enrollment Number; staff use Office ID.
            </p>
          </div>

          {error ? (
            <div role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive flex items-center gap-2">
              <Icons.AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          ) : null}

          <div>
            <label htmlFor="portal-identifier" className="field-label">
              Enrollment No. / Verified Gmail / Staff ID
            </label>
            <input
              id="portal-identifier"
              type="text"
              required
              autoComplete="username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="e.g. MSITM-BCA-2024-014 or student@gmail.com"
              className="field-input"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="portal-password" className="field-label">
                Password
              </label>
              <Link
                href="/portal/forgot-password"
                className="text-xs font-medium text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <input
              id="portal-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="field-input"
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-navy w-full">
            <Icons.LogIn className="h-4 w-4" aria-hidden="true" />
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>

      <div className="card-line p-6 sm:p-8 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="eyebrow">Demo &amp; Verification Accounts</p>
            <h3 className="font-display mt-1 text-xl font-semibold text-navy-900">
              One-click role switcher
            </h3>
          </div>
          <span className="rounded bg-gold-100 border border-gold-400/50 px-2.5 py-1 text-xs font-mono font-bold text-gold-700">
            Pass: msitm@2026
          </span>
        </div>
        <p className="text-sm text-muted">
          Illustrative demonstration records for testing BCA/BBA Admit Cards, Fee Receipts, Sick-Leave Gate Passes, Attendance, and Office ERP roles.
        </p>

        {/* Demo Unregistered Student to test registration */}
        <div className="rounded-lg border border-dashed border-primary/40 bg-primary/5 p-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-bold text-navy-900">Vikramaditya Singh · BCA Sem I (Unregistered)</p>
            <p className="text-xs font-mono text-muted">Enr: MSITM-BCA-2026-001 | DOB: 2007-08-15 | Mobile: ...3456</p>
          </div>
          <Link
            href="/portal/register"
            className="btn btn-primary btn-sm shrink-0"
          >
            Test Register
          </Link>
        </div>

        <ul className="divide-y divide-line border-t border-line">
          {DEMO_ACCOUNTS.map((acc) => (
            <li key={acc.username} className="py-2.5 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-navy-900 truncate">{acc.label}</p>
                <p className="text-xs font-mono text-muted">{acc.username} · {acc.email}</p>
              </div>
              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  setIdentifier(acc.username);
                  setPassword("msitm@2026");
                  void submitCredentials(acc.username, "msitm@2026");
                }}
                className="btn btn-outline-dark btn-sm shrink-0"
              >
                {acc.tag} Login
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

