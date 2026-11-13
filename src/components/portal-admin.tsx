"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";
import type {
  CertificateRequestRecord,
  FeePaymentRecord,
  GatePassRecord,
  PortalRole,
  StudentPortalSnapshot,
  StudentRecord,
} from "@/lib/portal-types";

export function GatePassManager({
  role,
  gatePasses,
  students,
}: {
  role: PortalRole;
  gatePasses: GatePassRecord[];
  students: StudentRecord[];
}) {
  const router = useRouter();
  const [guardCode, setGuardCode] = useState("");
  const [guardResult, setGuardResult] = useState<{ pass: GatePassRecord; student: StudentRecord } | null>(null);
  const [guardMsg, setGuardMsg] = useState("");
  const [guardErr, setGuardErr] = useState("");
  const [notifiedMap, setNotifiedMap] = useState<Record<number, boolean>>({});
  const [busyId, setBusyId] = useState<number | null>(null);

  const studentById = new Map(students.map((s) => [s.id, s]));

  async function handleGuardAction(action: "lookup" | "check_out" | "mark_returned") {
    setGuardErr("");
    setGuardMsg("");
    try {
      const res = await fetch("/api/portal/gate-pass", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "guard", code: guardCode, action }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setGuardErr(data.error || "Lookup failed.");
        return;
      }
      setGuardResult({ pass: data.pass, student: data.student });
      if (action === "check_out") setGuardMsg(`Campus exit recorded for ${data.student.fullName}.`);
      if (action === "mark_returned") setGuardMsg(`Campus re-entry recorded for ${data.student.fullName}.`);
      router.refresh();
    } catch {
      setGuardErr("Network error.");
    }
  }

  async function handleReview(passId: number, decision: "approve" | "reject") {
    setBusyId(passId);
    try {
      const res = await fetch("/api/portal/gate-pass", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passId,
          decision,
          guardianNotified: notifiedMap[passId] ?? true,
          validUntil: "Same Day · Immediate Exit",
          rejectionReason: decision === "reject" ? "Please meet the Coordinator in office." : undefined,
        }),
      });
      if (res.ok) router.refresh();
    } finally {
      setBusyId(null);
    }
  }

  const canGuard = role === "gate_guard" || role === "admin";
  const canApprove = role === "faculty" || role === "admin";

  return (
    <div className="space-y-8">
      {canGuard ? (
        <section className="card-line p-6 space-y-4">
          <div>
            <p className="eyebrow">Campus Security Desk</p>
            <h2 className="font-display text-xl font-semibold text-navy-900 mt-1">
              Verify Pass Code &amp; Log Campus Exit
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={guardCode}
              onChange={(e) => setGuardCode(e.target.value)}
              placeholder="Enter 6-digit pass code (e.g. GP773105 or GP482190)"
              className="field-input flex-1 font-mono uppercase"
            />
            <button type="button" onClick={() => void handleGuardAction("lookup")} className="btn btn-navy shrink-0">
              <Icons.Search className="h-4 w-4" aria-hidden="true" />
              Verify Pass
            </button>
          </div>
          {guardErr ? <p role="alert" className="text-sm text-destructive">{guardErr}</p> : null}
          {guardMsg ? <p role="status" className="text-sm font-semibold text-navy-900">{guardMsg}</p> : null}

          {guardResult ? (
            <div className="rounded-xl border border-gold-400/50 bg-gold-50 p-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gold-700">
                  {guardResult.pass.passCode} · {guardResult.pass.status.replace("_", " ").toUpperCase()}
                </p>
                <p className="font-display text-xl font-semibold text-navy-900 mt-1">
                  {guardResult.student.fullName} ({guardResult.student.course} Sem {guardResult.student.semester})
                </p>
                <p className="text-sm text-ink/85 mt-1">Reason: {guardResult.pass.reason}</p>
                <p className="text-xs text-muted mt-0.5">
                  Approved by: {guardResult.pass.approvedBy || "Not yet approved"} · Guardian Notified:{" "}
                  {guardResult.pass.guardianNotified ? "Yes" : "No"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {guardResult.pass.status === "approved" ? (
                  <button
                    type="button"
                    onClick={() => void handleGuardAction("check_out")}
                    className="btn btn-navy btn-sm"
                  >
                    <Icons.CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    Confirm Exit (Check Out)
                  </button>
                ) : null}
                {guardResult.pass.status === "checked_out" ? (
                  <button
                    type="button"
                    onClick={() => void handleGuardAction("mark_returned")}
                    className="btn btn-outline-dark btn-sm"
                  >
                    Mark Returned
                  </button>
                ) : null}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      {canApprove ? (
        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-navy-900">
            Sick-Leave &amp; Early-Exit Requests
          </h2>
          <div className="overflow-x-auto border border-line rounded-xl bg-white">
            <table className="table-msitm min-w-[780px]">
              <thead>
                <tr>
                  <th scope="col">Pass Code</th>
                  <th scope="col">Student</th>
                  <th scope="col">Reason &amp; Guardian Phone</th>
                  <th scope="col">Status</th>
                  <th scope="col">Coordinator Action</th>
                </tr>
              </thead>
              <tbody>
                {gatePasses.map((gp) => {
                  const st = studentById.get(gp.studentId);
                  return (
                    <tr key={gp.id}>
                      <td className="font-mono text-xs font-bold text-navy-900">{gp.passCode}</td>
                      <td>
                        <p className="font-semibold text-navy-900">{st?.fullName ?? `Student #${gp.studentId}`}</p>
                        <p className="text-xs text-muted">
                          {st ? `${st.course} · Sem ${st.semester}` : ""}
                        </p>
                      </td>
                      <td>
                        <p className="font-medium text-navy-900">{gp.reason}</p>
                        {gp.symptomsOrNotes ? <p className="text-xs text-muted">{gp.symptomsOrNotes}</p> : null}
                        <p className="text-xs text-gold-700 mt-1">Guardian: {gp.guardianPhone}</p>
                      </td>
                      <td>
                        <span className="rounded bg-navy-50 border border-navy-100 px-2 py-0.5 text-xs font-bold uppercase">
                          {gp.status.replace("_", " ")}
                        </span>
                      </td>
                      <td>
                        {gp.status === "pending" ? (
                          <div className="space-y-2">
                            <label className="flex items-center gap-1.5 text-xs text-ink/85">
                              <input
                                type="checkbox"
                                checked={notifiedMap[gp.id] ?? true}
                                onChange={(e) =>
                                  setNotifiedMap((m) => ({ ...m, [gp.id]: e.target.checked }))
                                }
                              />
                              Guardian informed on phone
                            </label>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                disabled={busyId === gp.id}
                                onClick={() => void handleReview(gp.id, "approve")}
                                className="btn btn-navy btn-sm"
                              >
                                Approve
                              </button>
                              <button
                                type="button"
                                disabled={busyId === gp.id}
                                onClick={() => void handleReview(gp.id, "reject")}
                                className="btn btn-outline-dark btn-sm"
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-muted">
                            {gp.approvedBy ? `By ${gp.approvedBy}` : "Processed"}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </div>
  );
}

export function FeeCollectorPanel({ snapshots }: { snapshots: StudentPortalSnapshot[] }) {
  const router = useRouter();
  const [studentId, setStudentId] = useState<number>(snapshots[1]?.student.id ?? snapshots[0]?.student.id ?? 1);
  const [amountPaid, setAmountPaid] = useState("6500");
  const [concession, setConcession] = useState("0");
  const [paymentMode, setPaymentMode] = useState<FeePaymentRecord["paymentMode"]>("UPI");
  const [transactionRef, setTransactionRef] = useState("");
  const [remarks, setRemarks] = useState("Balance semester fee cleared");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submitPayment(e: FormEvent) {
    e.preventDefault();
    setErr("");
    setMsg("");
    setBusy(true);
    try {
      const res = await fetch("/api/portal/fees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          amountPaid: Number(amountPaid),
          concession: Number(concession),
          paymentMode,
          transactionRef,
          remarks,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErr(data.error || "Failed to record payment.");
        return;
      }
      setMsg(`Receipt ${data.payment.receiptNo} generated (${data.payment.verificationToken}).`);
      setTransactionRef("");
      router.refresh();
    } catch {
      setErr("Network error.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submitPayment} className="card-line p-6 space-y-4">
      <div>
        <p className="eyebrow">Accounts Office</p>
        <h2 className="font-display text-xl font-semibold text-navy-900 mt-1">
          Record Semester Fee Payment &amp; Issue Receipt
        </h2>
      </div>
      {err ? <p role="alert" className="text-sm text-destructive">{err}</p> : null}
      {msg ? <p role="status" className="text-sm font-semibold text-navy-900">{msg}</p> : null}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label htmlFor="fee-student" className="field-label">Select Student</label>
          <select
            id="fee-student"
            className="field-select"
            value={studentId}
            onChange={(e) => setStudentId(Number(e.target.value))}
          >
            {snapshots.map((s) => (
              <option key={s.student.id} value={s.student.id}>
                {s.student.fullName} ({s.student.course} S{s.student.semester}) — Bal ₹{s.feeSummary.balance}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="fee-amount" className="field-label">Amount Paid (₹)</label>
          <input
            id="fee-amount"
            type="number"
            min={0}
            required
            className="field-input"
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="fee-concession" className="field-label">Concession / Scholarship (₹)</label>
          <input
            id="fee-concession"
            type="number"
            min={0}
            className="field-input"
            value={concession}
            onChange={(e) => setConcession(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="fee-mode" className="field-label">Payment Mode</label>
          <select
            id="fee-mode"
            className="field-select"
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value as FeePaymentRecord["paymentMode"])}
          >
            <option value="UPI">UPI</option>
            <option value="Cash">Cash Counter</option>
            <option value="NEFT">NEFT / Bank Transfer</option>
            <option value="Card">Debit / Credit Card</option>
            <option value="Scholarship">UP Scholarship Adjustment</option>
          </select>
        </div>
        <div>
          <label htmlFor="fee-ref" className="field-label">UTR / Transaction Ref</label>
          <input
            id="fee-ref"
            type="text"
            className="field-input"
            value={transactionRef}
            onChange={(e) => setTransactionRef(e.target.value)}
            placeholder="e.g. UPI/88392012"
          />
        </div>
        <div>
          <label htmlFor="fee-remarks" className="field-label">Remarks</label>
          <input
            id="fee-remarks"
            type="text"
            className="field-input"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>
      </div>

      <button type="submit" disabled={busy} className="btn btn-navy">
        <Icons.Receipt className="h-4 w-4" aria-hidden="true" />
        {busy ? "Recording…" : "Record Payment & Generate Receipt"}
      </button>
    </form>
  );
}

export function AdmitCardManager({ snapshots }: { snapshots: StudentPortalSnapshot[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<number | null>(null);
  const [overrideNote, setOverrideNote] = useState<Record<number, string>>({});

  async function updateCard(
    studentId: number,
    examSessionId: number,
    payload: { isReleased?: boolean; examFormVerified?: boolean; overrideApproved?: boolean; overrideReason?: string }
  ) {
    setBusyId(studentId);
    try {
      const res = await fetch("/api/portal/admit-cards", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, examSessionId, ...payload }),
      });
      if (res.ok) router.refresh();
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="overflow-x-auto border border-line rounded-xl bg-white">
      <table className="table-msitm min-w-[820px]">
        <thead>
          <tr>
            <th scope="col">Student</th>
            <th scope="col">Fee Status</th>
            <th scope="col">Attendance</th>
            <th scope="col">Admit Status</th>
            <th scope="col">Exam Cell Actions</th>
          </tr>
        </thead>
        <tbody>
          {snapshots.map((snap) => {
            const sessId = snap.examSession?.id ?? 1;
            const released = Boolean(snap.admitCard?.isReleased);
            const overridden = Boolean(snap.admitCard?.overrideApproved);
            return (
              <tr key={snap.student.id}>
                <td>
                  <p className="font-semibold text-navy-900">{snap.student.fullName}</p>
                  <p className="text-xs font-mono text-muted">
                    {snap.student.course} S{snap.student.semester} · {snap.student.enrollmentNo}
                  </p>
                </td>
                <td>
                  {snap.feeSummary.isCleared ? (
                    <span className="text-xs font-bold text-navy-900">Cleared</span>
                  ) : (
                    <span className="text-xs font-bold text-destructive">
                      Due ₹{snap.feeSummary.balance.toLocaleString("en-IN")}
                    </span>
                  )}
                </td>
                <td>
                  <span className={`text-xs font-bold ${snap.overallAttendancePct >= 75 ? "text-navy-900" : "text-destructive"}`}>
                    {snap.overallAttendancePct}%
                  </span>
                </td>
                <td>
                  <span className="rounded bg-navy-50 border border-navy-100 px-2 py-0.5 text-xs font-bold">
                    {snap.admitEligibility.canDownload ? "UNLOCKED" : "ON HOLD"}
                  </span>
                  {overridden ? <p className="text-[11px] text-gold-700 mt-1">Principal Override Active</p> : null}
                </td>
                <td>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      disabled={busyId === snap.student.id}
                      onClick={() => void updateCard(snap.student.id, sessId, { isReleased: !released })}
                      className="btn btn-outline-dark btn-sm"
                    >
                      {released ? "Withhold Release" : "Release Card"}
                    </button>
                    {!snap.admitEligibility.canDownload || overridden ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={overrideNote[snap.student.id] ?? "Medical / Principal Condonation"}
                          onChange={(e) =>
                            setOverrideNote((m) => ({ ...m, [snap.student.id]: e.target.value }))
                          }
                          className="field-input h-8 text-xs w-44"
                          aria-label={`Override reason for ${snap.student.fullName}`}
                        />
                        <button
                          type="button"
                          disabled={busyId === snap.student.id}
                          onClick={() =>
                            void updateCard(snap.student.id, sessId, {
                              overrideApproved: !overridden,
                              overrideReason: overrideNote[snap.student.id] ?? "Principal Condonation Approved",
                              isReleased: true,
                              examFormVerified: true,
                            })
                          }
                          className="btn btn-navy btn-sm"
                        >
                          {overridden ? "Revoke Override" : "Grant Override"}
                        </button>
                      </div>
                    ) : null}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function StudentOnboardingForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [course, setCourse] = useState<"BCA" | "BBA">("BCA");
  const [semester, setSemester] = useState("1");
  const [phone, setPhone] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr("");
    setMsg("");
    setBusy(true);
    try {
      const res = await fetch("/api/portal/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, fatherName, course, semester: Number(semester), phone, guardianPhone, email }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErr(data.error || "Could not onboard student.");
        return;
      }
      setMsg(`Enrolled ${data.student.fullName} · Login ID: ${data.student.enrollmentNo} (Pass: msitm@2026)`);
      setFullName("");
      setFatherName("");
      setPhone("");
      setGuardianPhone("");
      setEmail("");
      router.refresh();
    } catch {
      setErr("Network error.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card-line p-6 space-y-4">
      <div>
        <p className="eyebrow">Student Master</p>
        <h2 className="font-display text-xl font-semibold text-navy-900 mt-1">
          Enrol New Undergraduate Student (BCA / BBA)
        </h2>
      </div>
      {err ? <p role="alert" className="text-sm text-destructive">{err}</p> : null}
      {msg ? <p role="status" className="text-sm font-semibold text-navy-900">{msg}</p> : null}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label htmlFor="st-name" className="field-label">Full Name</label>
          <input id="st-name" required className="field-input" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="st-father" className="field-label">Father&apos;s Name</label>
          <input id="st-father" required className="field-input" value={fatherName} onChange={(e) => setFatherName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="st-course" className="field-label">Course</label>
          <select id="st-course" className="field-select" value={course} onChange={(e) => setCourse(e.target.value as "BCA" | "BBA")}>
            <option value="BCA">BCA (3-Year)</option>
            <option value="BBA">BBA (3-Year)</option>
          </select>
        </div>
        <div>
          <label htmlFor="st-sem" className="field-label">Semester</label>
          <select id="st-sem" className="field-select" value={semester} onChange={(e) => setSemester(e.target.value)}>
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <option key={s} value={s}>Semester {s}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="st-phone" className="field-label">Student Phone</label>
          <input id="st-phone" required className="field-input" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <label htmlFor="st-gphone" className="field-label">Guardian Phone</label>
          <input id="st-gphone" className="field-input" value={guardianPhone} onChange={(e) => setGuardianPhone(e.target.value)} />
        </div>
      </div>
      <button type="submit" disabled={busy} className="btn btn-navy">
        <Icons.UserCheck className="h-4 w-4" aria-hidden="true" />
        {busy ? "Enrolling…" : "Enrol Student & Generate ID"}
      </button>
    </form>
  );
}

export function PromoteButton({ studentId, semester }: { studentId: number; semester: number }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function promote() {
    setBusy(true);
    try {
      const res = await fetch("/api/portal/students", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId }),
      });
      if (res.ok) router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button type="button" disabled={busy} onClick={() => void promote()} className="btn btn-outline-dark btn-sm">
      {semester < 6 ? `Promote → Sem ${semester + 1}` : "Mark Graduated"}
    </button>
  );
}

export function NoticeAndCertManager({
  snapshots,
  certificates,
  notices,
}: {
  snapshots: StudentPortalSnapshot[];
  certificates: CertificateRequestRecord[];
  notices?: { id: number; title: string; courseScope: string; category: string; publishedAt: string }[];
}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [courseScope, setCourseScope] = useState<"ALL" | "BCA" | "BBA">("ALL");
  const [category, setCategory] = useState<"Exam" | "Fee" | "Scholarship" | "Academic" | "Urgent">("Academic");
  const [body, setBody] = useState("");
  const [noticeMsg, setNoticeMsg] = useState("");
  const studentById = new Map(snapshots.map((s) => [s.student.id, s.student]));

  async function postNotice(e: FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/portal/academics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, courseScope, semesterScope: 0, category, body }),
    });
    if (res.ok) {
      setNoticeMsg("Notice published to student portals.");
      setTitle("");
      setBody("");
      router.refresh();
    }
  }

  async function removeNotice(noticeId: number) {
    const res = await fetch(`/api/portal/academics?noticeId=${noticeId}`, { method: "DELETE" });
    if (res.ok) router.refresh();
  }

  async function updateCert(
    cert: CertificateRequestRecord,
    patch: Partial<Pick<CertificateRequestRecord, "status" | "accountsCleared" | "libraryCleared" | "labCleared">>
  ) {
    await fetch("/api/portal/certificates", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        certId: cert.id,
        status: patch.status ?? cert.status,
        accountsCleared: patch.accountsCleared ?? cert.accountsCleared,
        libraryCleared: patch.libraryCleared ?? cert.libraryCleared,
        labCleared: patch.labCleared ?? cert.labCleared,
      }),
    });
    router.refresh();
  }

  async function removeCert(certId: number) {
    await fetch(`/api/portal/certificates?certId=${certId}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="space-y-8">
      <section className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <form onSubmit={postNotice} className="card-line p-6 space-y-4">
            <h2 className="font-display text-xl font-semibold text-navy-900">Publish UG Notice</h2>
            {noticeMsg ? <p role="status" className="text-sm font-semibold text-navy-900">{noticeMsg}</p> : null}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="n-scope" className="field-label">Target Course</label>
                <select id="n-scope" className="field-select" value={courseScope} onChange={(e) => setCourseScope(e.target.value as "ALL" | "BCA" | "BBA")}>
                  <option value="ALL">All UG (BCA + BBA)</option>
                  <option value="BCA">BCA Only</option>
                  <option value="BBA">BBA Only</option>
                </select>
              </div>
              <div>
                <label htmlFor="n-cat" className="field-label">Category</label>
                <select id="n-cat" className="field-select" value={category} onChange={(e) => setCategory(e.target.value as "Exam" | "Fee" | "Scholarship" | "Academic" | "Urgent")}>
                  <option value="Academic">Academic</option>
                  <option value="Exam">Exam</option>
                  <option value="Fee">Fee</option>
                  <option value="Scholarship">Scholarship</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="n-title" className="field-label">Notice Title</label>
              <input id="n-title" required className="field-input" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <label htmlFor="n-body" className="field-label">Details</label>
              <textarea id="n-body" required className="field-textarea" value={body} onChange={(e) => setBody(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-navy">Publish Notice</button>
          </form>

          {notices && notices.length > 0 ? (
            <div className="card-line p-5 space-y-2">
              <p className="eyebrow">Active Notices ({notices.length})</p>
              <ul className="divide-y divide-line text-xs">
                {notices.map((n) => (
                  <li key={n.id} className="py-2 flex items-center justify-between gap-2">
                    <span className="font-medium text-navy-900">
                      [{n.courseScope} · {n.category}] {n.title}
                    </span>
                    <button type="button" onClick={() => void removeNotice(n.id)} className="text-destructive shrink-0" aria-label={`Delete notice ${n.title}`}>
                      <Icons.Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="card-line p-6 space-y-4">
          <h2 className="font-display text-xl font-semibold text-navy-900">Certificate &amp; No-Dues Clearance Queue</h2>
          <ul className="divide-y divide-line">
            {certificates.map((c) => {
              const st = studentById.get(c.studentId);
              return (
                <li key={c.id} className="py-3.5 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold text-navy-900 text-sm">
                        {st?.fullName} · {c.certType.replace(/_/g, " ")}
                      </p>
                      <p className="text-xs text-muted">{c.referenceNo} · {c.purpose}</p>
                    </div>
                    <span className="text-xs font-bold uppercase text-gold-700">{c.status}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input type="checkbox" checked={c.accountsCleared} onChange={(e) => void updateCert(c, { accountsCleared: e.target.checked })} />
                      Accounts OK
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input type="checkbox" checked={c.libraryCleared} onChange={(e) => void updateCert(c, { libraryCleared: e.target.checked })} />
                      Library OK
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input type="checkbox" checked={c.labCleared} onChange={(e) => void updateCert(c, { labCleared: e.target.checked })} />
                      Lab OK
                    </label>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {c.status !== "ready" && c.status !== "issued" ? (
                      <button type="button" onClick={() => void updateCert(c, { status: "ready" })} className="btn btn-navy btn-sm">
                        Mark Ready
                      </button>
                    ) : null}
                    {c.status === "ready" ? (
                      <button type="button" onClick={() => void updateCert(c, { status: "issued" })} className="btn btn-gold btn-sm">
                        Mark Issued
                      </button>
                    ) : null}
                    {c.status !== "rejected" ? (
                      <button type="button" onClick={() => void updateCert(c, { status: "rejected" })} className="btn btn-outline-dark btn-sm">
                        Reject
                      </button>
                    ) : null}
                    <button type="button" onClick={() => void removeCert(c.id)} className="btn btn-outline-dark btn-sm text-destructive" aria-label={`Delete ${c.referenceNo}`}>
                      <Icons.Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}

