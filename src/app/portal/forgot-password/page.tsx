"use client";

import { useState } from "react";
import Link from "next/link";
import { Icons } from "@/components/icons";

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [devResetUrl, setDevResetUrl] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setDevResetUrl(null);
    setLoading(true);

    try {
      const res = await fetch("/api/portal/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "Failed to initiate password reset.");
        return;
      }

      setMessage(data.message || "A password reset link has been dispatched.");
      if (data.devResetUrl) {
        setDevResetUrl(data.devResetUrl);
      }
    } catch {
      setError("Network error while connecting to auth service.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-lg mx-auto">
      <div className="mb-6">
        <Link
          href="/portal"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-navy-900"
        >
          <Icons.ArrowLeft className="h-4 w-4" />
          Back to Portal Login
        </Link>
      </div>

      <div className="card-line p-6 sm:p-8 space-y-6">
        <div>
          <p className="eyebrow">Account Recovery</p>
          <h1 className="font-display text-2xl font-bold text-navy-900 mt-1">
            Forgot Your Password?
          </h1>
          <p className="mt-2 text-sm text-muted">
            Enter your Enrollment Number or registered Gmail address. We will send a secure single-use link to reset your credentials.
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

        {message ? (
          <div
            role="status"
            className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary flex items-center gap-2"
          >
            <Icons.CheckCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{message}</span>
          </div>
        ) : null}

        {devResetUrl && (
          <div className="rounded-lg border border-dashed border-amber-500 bg-amber-50 p-3 space-y-2">
            <p className="text-xs font-bold text-amber-900">Dev Mode Password Reset Link:</p>
            <Link
              href={devResetUrl}
              className="text-xs font-mono text-primary underline break-all block"
            >
              {devResetUrl}
            </Link>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="recovery-identifier" className="field-label">
              Enrollment No. or Registered Gmail
            </label>
            <input
              id="recovery-identifier"
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="e.g. MSITM-BCA-2024-014 or student@gmail.com"
              className="field-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-navy w-full"
          >
            <Icons.Mail className="h-4 w-4" />
            {loading ? "Sending Reset Link…" : "Send Reset Link"}
          </button>
        </form>

        <div className="border-t border-line pt-4 text-center">
          <Link
            href="/portal"
            className="text-xs font-medium text-muted hover:text-navy-900"
          >
            Remember your password? Return to login
          </Link>
        </div>
      </div>
    </div>
  );
}

