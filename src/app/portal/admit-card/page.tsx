import Link from "next/link";
import { Icons } from "@/components/icons";
import { PortalShell } from "@/components/portal-shell";
import { PrintButton } from "@/components/widgets";
import { requireStudentContext } from "@/lib/portal-guards";

export const dynamic = "force-dynamic";

export default async function StudentAdmitCardPage() {
  const { session, snapshot } = await requireStudentContext();
  const { student, examSession, admitCard, admitEligibility, overallAttendancePct, feeSummary } = snapshot;

  return (
    <PortalShell
      session={session}
      mode="student"
      subtitle={`${student.course} · Semester ${student.semester} Examination Admit Card`}
    >
      <div className="space-y-6">
        {/* 3-Gate Eligibility Summary */}
        <section className="card-line p-6 print-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="eyebrow">Exam Eligibility Check</p>
              <h2 className="font-display text-xl font-semibold text-navy-900 mt-1">
                {admitEligibility.canDownload
                  ? "All checks cleared — Admit Card ready"
                  : "Admit Card currently on hold"}
              </h2>
            </div>
            {admitEligibility.canDownload ? <PrintButton /> : null}
          </div>

          <div className="mt-5 grid sm:grid-cols-3 gap-3">
            {[
              {
                label: "Fee Clearance",
                ok: admitEligibility.feeCleared,
                detail: feeSummary.isCleared ? "No dues pending" : `₹${feeSummary.balance.toLocaleString("en-IN")} pending`,
              },
              {
                label: "Attendance (>= 75%)",
                ok: admitEligibility.attendanceCleared,
                detail: `${overallAttendancePct}% recorded`,
              },
              {
                label: "Exam Form Verified",
                ok: admitEligibility.examFormVerified,
                detail: admitEligibility.examFormVerified ? "Verified by Exam Cell" : "Pending verification",
              },
            ].map((item) => (
              <div
                key={item.label}
                className={`rounded-lg border px-4 py-3 flex items-start gap-2.5 ${
                  item.ok ? "border-navy-200 bg-navy-50" : "border-gold-500 bg-gold-50"
                }`}
              >
                {item.ok ? (
                  <Icons.CheckCircle2 className="h-4 w-4 text-navy-900 shrink-0 mt-0.5" aria-hidden="true" />
                ) : (
                  <Icons.AlertTriangle className="h-4 w-4 text-gold-700 shrink-0 mt-0.5" aria-hidden="true" />
                )}
                <div>
                  <p className="text-sm font-semibold text-navy-900">{item.label}</p>
                  <p className="text-xs text-muted">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {!admitEligibility.canDownload && admitEligibility.blockReasons.length > 0 ? (
            <div className="mt-4 rounded-lg border border-gold-500 bg-gold-50 p-4 space-y-1.5">
              <p className="text-xs font-bold uppercase tracking-wider text-gold-700">Action required to unlock</p>
              <ul className="list-disc pl-5 text-sm text-ink/90 space-y-1">
                {admitEligibility.blockReasons.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <div className="pt-2 flex flex-wrap gap-3 text-xs font-semibold">
                <Link href="/portal/fees" className="link-underline text-navy-900">View Fee Ledger</Link>
                <Link href="/portal/academics" className="link-underline text-navy-900">View Attendance Breakdown</Link>
              </div>
            </div>
          ) : null}
        </section>

        {/* Printable A4 Admit Card */}
        {admitEligibility.canDownload && examSession && admitCard ? (
          <article className="rounded-xl border-2 border-navy-900 bg-white p-6 sm:p-8 shadow-sm">
            <header className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b-2 border-navy-900">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700">
                  Meena Shah Institute of Technology &amp; Management (MSITM), Gonda
                </p>
                <p className="text-[11px] font-semibold text-slate-500">
                  Affiliated to Dr. Rammanohar Lohia Avadh University (RMLAU Ayodhya) / Maa Pateshwari State University
                </p>
                <h2 className="font-display text-2xl font-bold text-navy-900 mt-1">
                  INTERNAL EXAMINATION ADMIT CARD &amp; UNIVERSITY CLEARANCE SLIP
                </h2>
                <p className="text-xs font-bold text-navy-800">
                  सत्रीय/प्री-यूनिवर्सिटी परीक्षा प्रवेश पत्र एवं विश्वविद्यालय परीक्षा अनापत्ति प्रमाण पत्र
                </p>
                <p className="text-sm font-medium text-ink/85 mt-0.5">{examSession.title}</p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 rounded bg-navy-900 text-gold-300 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  <Icons.BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  College Verified
                </span>
                <p className="font-mono text-xs text-muted mt-1.5">{admitCard.verificationToken}</p>
              </div>
            </header>

            <div className="mt-6 grid sm:grid-cols-[1fr_140px] gap-6 items-start">
              <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div>
                  <dt className="text-xs uppercase font-bold text-muted">Candidate Name</dt>
                  <dd className="font-semibold text-navy-900">{student.fullName}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase font-bold text-muted">Father&apos;s Name</dt>
                  <dd className="font-semibold text-navy-900">{student.fatherName}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase font-bold text-muted">University Roll No.</dt>
                  <dd className="font-mono font-bold text-navy-900">{student.universityRollNo}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase font-bold text-muted">Enrollment No.</dt>
                  <dd className="font-mono font-semibold text-navy-900">{student.enrollmentNo}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase font-bold text-muted">Programme &amp; Semester</dt>
                  <dd className="font-semibold text-navy-900">
                    {student.course} · Semester {student.semester} ({student.batch})
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase font-bold text-muted">Examination Centre</dt>
                  <dd className="font-semibold text-navy-900">{examSession.examCentre}</dd>
                </div>
              </dl>

              <div className="border border-navy-900/30 rounded-lg bg-parchment h-36 flex flex-col items-center justify-center text-center p-2">
                <Icons.User className="h-10 w-10 text-navy-900/40" aria-hidden="true" />
                <span className="text-[11px] font-semibold text-muted mt-1">Affix / Verified Photo</span>
              </div>
            </div>

            {admitCard.overrideApproved && admitCard.overrideReason ? (
              <p className="mt-4 rounded bg-gold-50 border border-gold-400 px-3 py-2 text-xs text-ink/85">
                <strong>Special Approval Note:</strong> {admitCard.overrideReason}
              </p>
            ) : null}

            <div className="mt-6 overflow-x-auto border border-line rounded-lg">
              <table className="table-msitm min-w-[600px]">
                <thead>
                  <tr>
                    <th scope="col">Code</th>
                    <th scope="col">Paper Title</th>
                    <th scope="col">Exam Date</th>
                    <th scope="col">Shift / Time</th>
                    <th scope="col">Room</th>
                    <th scope="col">Invigilator Sign</th>
                  </tr>
                </thead>
                <tbody>
                  {examSession.schedules.map((paper) => (
                    <tr key={paper.id}>
                      <td className="font-mono text-xs font-bold text-navy-900">{paper.subjectCode}</td>
                      <td>{paper.subjectName}</td>
                      <td>{paper.examDate}</td>
                      <td>{paper.shiftTime}</td>
                      <td>{paper.roomNo}</td>
                      <td className="w-28" />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 pt-5 border-t border-line grid sm:grid-cols-2 gap-6 text-xs text-muted">
              <div>
                <p className="font-bold uppercase tracking-wider text-navy-900 mb-1.5">Candidate &amp; Clearance Instructions</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Mandatory Hall Ticket for MSITM Internal Sessional / Pre-University Tests and Practical Viva.</li>
                  <li>Certifies that candidate has achieved &gt;= 75% college attendance and cleared all semester dues for university exam forwarding.</li>
                  <li>Carry this verified slip along with your MSITM Digital Student ID Card to the exam centre.</li>
                  <li>
                    Authenticity can be verified live by invigilators at{" "}
                    <Link href={`/verify/${admitCard.verificationToken}`} className="font-mono text-navy-900 underline">
                      /verify/{admitCard.verificationToken}
                    </Link>
                    .
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-end sm:text-right">
                <p className="font-semibold text-navy-900">Exam Superintendent &amp; Principal</p>
                <p>MSITM Degree College, Meena Nagar, Gonda</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Affiliated College Code · RMLAU Ayodhya / Maa Pateshwari University</p>
              </div>
            </div>
          </article>
        ) : null}
      </div>
    </PortalShell>
  );
}

