"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icons } from "@/components/icons";
import type {
  CertificateRequestRecord,
  FeePaymentRecord,
  GatePassRecord,
  StudentRecord,
} from "@/lib/portal-types";

export function GatePassRequestForm({ defaultGuardianPhone }: { defaultGuardianPhone: string }) {
  const router = useRouter();
  const [passType, setPassType] = useState<GatePassRecord["passType"]>("sick_leave");
  const [reason, setReason] = useState("");
  const [symptomsOrNotes, setSymptomsOrNotes] = useState("");
  const [guardianPhone, setGuardianPhone] = useState(defaultGuardianPhone);
  const [requestedExitAt, setRequestedExitAt] = useState("Today · Immediate Exit");
  const [statusMsg, setStatusMsg] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setStatusMsg("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/portal/gate-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passType,
          reason,
          symptomsOrNotes,
          guardianPhone,
          requestedExitAt,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Could not submit gate pass request.");
        return;
      }
      setStatusMsg(`Pass requested (${data.pass.passCode}). Awaiting Coordinator / HOD approval.`);
      setReason("");
      setSymptomsOrNotes("");
      router.refresh();
    } catch {
      setError("Network error while submitting request.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card-line p-6 space-y-4">
      <div>
        <p className="eyebrow">Medical / Early-Exit Request</p>
        <h2 className="font-display mt-1 text-xl font-semibold text-navy-900">
          Request Sick-Leave or Urgent Gate Pass
        </h2>
        <p className="mt-1 text-sm text-muted">
          Approved passes generate a single-use code &amp; verification slip for campus security gate exit.
        </p>
      </div>

      {error ? (
        <p role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive">
          {error}
        </p>
      ) : null}
      {statusMsg ? (
        <p role="status" className="rounded-lg border border-navy-200 bg-navy-50 px-3.5 py-2.5 text-sm font-medium text-navy-900">
          {statusMsg}
        </p>
      ) : null}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="gp-type" className="field-label">Leave / Exit Type</label>
          <select
            id="gp-type"
            className="field-select"
            value={passType}
            onChange={(e) => setPassType(e.target.value as GatePassRecord["passType"])}
          >
            <option value="sick_leave">Sick / Unwell Early Exit (Today)</option>
            <option value="urgent_exit">Urgent Family / Official Exit</option>
            <option value="medical_multiday">Multi-Day Medical Leave Application</option>
          </select>
        </div>
        <div>
          <label htmlFor="gp-time" className="field-label">Departure Time / Dates</label>
          <input
            id="gp-time"
            type="text"
            required
            className="field-input"
            value={requestedExitAt}
            onChange={(e) => setRequestedExitAt(e.target.value)}
            placeholder="e.g. Today 1:15 PM or 12–14 Nov"
          />
        </div>
      </div>

      <div>
        <label htmlFor="gp-reason" className="field-label">Primary Reason</label>
        <input
          id="gp-reason"
          type="text"
          required
          className="field-input"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="e.g. High fever & headache during lecture"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="gp-guardian" className="field-label">Guardian Phone (For Confirmation)</label>
          <input
            id="gp-guardian"
            type="tel"
            required
            className="field-input"
            value={guardianPhone}
            onChange={(e) => setGuardianPhone(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="gp-notes" className="field-label">Symptoms / Supporting Details</label>
          <input
            id="gp-notes"
            type="text"
            className="field-input"
            value={symptomsOrNotes}
            onChange={(e) => setSymptomsOrNotes(e.target.value)}
            placeholder="Optional doctor/symptom note"
          />
        </div>
      </div>

      <button type="submit" disabled={submitting} className="btn btn-navy w-full sm:w-auto">
        <Icons.Stethoscope className="h-4 w-4" aria-hidden="true" />
        {submitting ? "Submitting…" : "Submit Gate Pass Request"}
      </button>
    </form>
  );
}

export function CertificateRequestForm() {
  const router = useRouter();
  const [certType, setCertType] = useState<CertificateRequestRecord["certType"]>("bonafide");
  const [purpose, setPurpose] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr("");
    setMsg("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/portal/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ certType, purpose }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErr(data.error || "Could not submit certificate request.");
        return;
      }
      setMsg(`Request registered (${data.cert.referenceNo}).`);
      setPurpose("");
      router.refresh();
    } catch {
      setErr("Network error.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card-line p-6 space-y-4">
      <div>
        <p className="eyebrow">Official Documents &amp; No-Dues</p>
        <h2 className="font-display mt-1 text-xl font-semibold text-navy-900">
          Request Certificate or Fee Letter
        </h2>
      </div>
      {err ? <p role="alert" className="text-sm text-destructive">{err}</p> : null}
      {msg ? <p role="status" className="text-sm font-semibold text-navy-900">{msg}</p> : null}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cert-type" className="field-label">Document Type</label>
          <select
            id="cert-type"
            className="field-select"
            value={certType}
            onChange={(e) => setCertType(e.target.value as CertificateRequestRecord["certType"])}
          >
            <option value="bonafide">Bonafide Student Certificate</option>
            <option value="fee_structure">Fee Structure Letter (Loan / UP Scholarship)</option>
            <option value="character">Character Certificate</option>
            <option value="transfer_no_dues">Transfer Certificate (TC) &amp; No-Dues</option>
          </select>
        </div>
        <div>
          <label htmlFor="cert-purpose" className="field-label">Purpose / Authority</label>
          <input
            id="cert-purpose"
            type="text"
            required
            className="field-input"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="e.g. UP Scholarship Renewal / Bank Loan"
          />
        </div>
      </div>
      <button type="submit" disabled={submitting} className="btn btn-navy w-full sm:w-auto">
        <Icons.FileCheck2 className="h-4 w-4" aria-hidden="true" />
        {submitting ? "Submitting…" : "Submit Request"}
      </button>
    </form>
  );
}

export function FeeReceiptViewer({
  student,
  payments,
}: {
  student: StudentRecord;
  payments: FeePaymentRecord[];
}) {
  const [selected, setSelected] = useState<FeePaymentRecord | null>(payments[0] ?? null);

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto border border-line rounded-xl bg-white print-hidden">
        <table className="table-msitm min-w-[680px]">
          <thead>
            <tr>
              <th scope="col">Receipt No.</th>
              <th scope="col">Date</th>
              <th scope="col">Mode</th>
              <th scope="col">Reference</th>
              <th scope="col">Amount</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-muted py-6">
                  No payments recorded yet for Semester {student.semester}.
                </td>
              </tr>
            ) : (
              payments.map((p) => (
                <tr key={p.id}>
                  <td className="font-mono text-xs font-semibold text-navy-900">{p.receiptNo}</td>
                  <td>{new Date(p.paidAt).toLocaleDateString("en-IN")}</td>
                  <td>{p.paymentMode}</td>
                  <td className="font-mono text-xs">{p.transactionRef}</td>
                  <td className="font-semibold">₹{p.amountPaid.toLocaleString("en-IN")}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => setSelected(p)}
                      className="btn btn-outline-dark btn-sm"
                    >
                      View / Print
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selected ? (
        <div className="rounded-xl border-2 border-navy-900 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-line">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-700">
                Meena Shah Institute of Technology &amp; Management
              </p>
              <h3 className="font-display mt-1 text-2xl font-semibold text-navy-900">
                Official Fee Receipt
              </h3>
              <p className="text-xs text-muted mt-0.5">
                Meena Nagar, Circular Road, Gonda 271002 · Affiliated to RMLAU Ayodhya / Maa Pateshwari University
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-sm font-bold text-navy-900">{selected.receiptNo}</p>
              <p className="text-xs text-muted">
                Date: {new Date(selected.paidAt).toLocaleDateString("en-IN")}
              </p>
            </div>
          </div>

          <dl className="mt-5 grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-xs uppercase font-bold text-muted">Student Name</dt>
              <dd className="font-semibold text-navy-900">{student.fullName}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase font-bold text-muted">Enrollment / Roll No.</dt>
              <dd className="font-mono font-semibold text-navy-900">
                {student.enrollmentNo} ({student.universityRollNo})
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase font-bold text-muted">Course &amp; Semester</dt>
              <dd className="font-semibold text-navy-900">
                {student.course} · Semester {selected.semester} ({student.batch})
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase font-bold text-muted">Payment Mode &amp; Ref</dt>
              <dd className="font-semibold text-navy-900">
                {selected.paymentMode} · <span className="font-mono text-xs">{selected.transactionRef}</span>
              </dd>
            </div>
          </dl>

          <div className="mt-6 rounded-lg bg-parchment border border-line p-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted">Amount Received</p>
              <p className="stat-numeral text-3xl text-navy-900 mt-0.5">
                ₹{selected.amountPaid.toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-muted mt-1">{selected.remarks}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gold-700">Verification Token</p>
              <Link
                href={`/verify/${selected.verificationToken}`}
                className="font-mono text-sm font-bold text-navy-900 link-underline"
              >
                {selected.verificationToken}
              </Link>
              <p className="text-[11px] text-muted mt-2">Recorded by: {selected.recordedBy}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 print-hidden">
            <button type="button" onClick={() => window.print()} className="btn btn-navy btn-sm">
              <Icons.FileText className="h-4 w-4" aria-hidden="true" />
              Print Official Receipt
            </button>
            <Link href={`/verify/${selected.verificationToken}`} className="text-xs font-semibold text-gold-700 link-underline">
              Open QR / Token Verification Page
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

