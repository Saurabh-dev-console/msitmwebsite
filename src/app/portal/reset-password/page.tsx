"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Icons } from "@/components/icons";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Reset token is missing or invalid. Please request a new link.");
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
      const res = await fetch("/api/portal/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "Failed to reset password.");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/portal");
      }, 2000);
    } catch {
      setError("Network error while resetting password.");
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="card-line p-6 sm:p-8 space-y-4 text-center">
        <Icons.AlertCircle className="h-10 w-10 text-destructive mx-auto" />
        <h2 className="font-display text-xl font-bold text-navy-900">Invalid Reset Link</h2>
        <p className="text-sm text-muted">
          No security token was found in your link. The link may have expired or was modified.
        </p>
        <Link href="/portal/forgot-password" className="btn btn-navy inline-flex">
          Request New Reset Link
        </Link>
      </div>
    );
  }

  return (
    <div className="card-line p-6 sm:p-8 space-y-6">
      <div>
        <p className="eyebrow">Secure Password Reset</p>
        <h1 className="font-display text-2xl font-bold text-navy-900 mt-1">
          Set New Password
        </h1>
        <p className="mt-2 text-sm text-muted">
          Choose a strong password with at least 8 characters. Setting a new password will automatically terminate any previous active sessions across all devices.
        </p>
      </div>

      {error ? (
        <div
          role="alert"
          className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive flex items-center gap-2"
        >
          <Icons.AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      ) : null}

      {success ? (
        <div
          role="status"
          className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-4 text-sm text-primary flex flex-col items-center gap-2 text-center"
        >
          <Icons.CheckCircle className="h-8 w-8 text-primary" />
          <p className="font-bold">Password Reset Successfully!</p>
          <p className="text-xs text-muted">Redirecting you to the login screen…</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="reset-pass" className="field-label">
              New Password
            </label>
            <input
              id="reset-pass"
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
            <label htmlFor="reset-conf-pass" className="field-label">
              Confirm New Password
            </label>
            <input
              id="reset-conf-pass"
              type="password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              className="field-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-navy w-full"
          >
            <Icons.Lock className="h-4 w-4" />
            {loading ? "Updating Password…" : "Update Password & Revoke Old Sessions"}
          </button>
        </form>
      )}

      <div className="border-t border-line pt-4 text-center">
        <Link
          href="/portal"
          className="text-xs font-medium text-muted hover:text-navy-900"
        >
          Return to Portal Login
        </Link>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-lg mx-auto">
      <Suspense
        fallback={
          <div className="card-line p-8 text-center text-sm text-muted">
            Loading security token…
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
