import Link from "next/link";
import { Icons } from "@/components/icons";
import { PortalShell } from "@/components/portal-shell";
import { requireStudentContext } from "@/lib/portal-guards";

export const dynamic = "force-dynamic";

export default async function StudentDashboardPage() {
  const { session, snapshot } = await requireStudentContext();
  const {
    student,
    feeSummary,
    overallAttendancePct,
    admitEligibility,
    gatePasses,
    notices,
    cgpa,
  } = snapshot;

  const latestPass = gatePasses[0];
  const activeApprovedPass = gatePasses.find((g) => g.status === "approved");

  return (
    <PortalShell
      session={session}
      mode="student"
      subtitle={`${student.course} · Semester ${student.semester} (${student.batch})`}
    >
      <div className="space-y-8">
        {/* ================= 1. STUDENT HERO WELCOME BANNER ================= */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 p-6 sm:p-8 text-white shadow-md border border-navy-700/50">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-gold-400/20 border border-gold-400/40 px-3 py-0.5 text-xs font-semibold text-gold-300">
                  {student.course} · Semester {student.semester} (Sec {student.section})
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-0.5 text-xs font-semibold text-emerald-300">
                  <Icons.CheckCircle className="h-3.5 w-3.5" />
                  Active Student
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Namaste, {student.fullName}!
              </h2>

              <p className="text-xs sm:text-sm text-navy-200">
                Enrollment No: <strong className="font-mono text-white">{student.enrollmentNo}</strong> · University Roll: <strong className="font-mono text-white">{student.universityRollNo}</strong> · Session: <strong className="text-white">{student.batch}</strong>
              </p>
            </div>

            {/* Quick Action Buttons on Hero */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <Link
                href="/portal/id-card"
                className="btn btn-sm bg-white/10 hover:bg-white/20 text-white border border-white/20"
              >
                <Icons.IdCard className="h-4 w-4" />
                Digital ID Card
              </Link>
              <Link
                href="/portal/fees"
                className="btn btn-sm btn-gold"
              >
                <Icons.Receipt className="h-4 w-4" />
                Fee Receipts
              </Link>
            </div>
          </div>
        </section>

        {/* ================= 2. LIVE DYNAMIC ACTION ALERTS ================= */}
        {/* Approved Gate Pass Alert */}
        {activeApprovedPass && (
          <div className="rounded-xl border-2 border-gold-400 bg-gold-50 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-gold-500 p-2 text-white shrink-0 mt-0.5">
                <Icons.BadgeCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gold-900">
                  Gate Pass Approved · Valid For Exit Today
                </p>
                <p className="text-base font-bold text-navy-950 mt-0.5">
                  Pass Code: <span className="font-mono text-gold-700 font-extrabold">{activeApprovedPass.passCode}</span> ({activeApprovedPass.reason})
                </p>
                <p className="text-xs text-navy-800 mt-0.5">
                  Approved by {activeApprovedPass.approvedBy}. Show this code or QR verification link to the gate security guard.
                </p>
              </div>
            </div>
            <Link
              href="/portal/gate-pass"
              className="btn btn-navy btn-sm shrink-0 whitespace-nowrap self-start sm:self-auto"
            >
              Show Gate QR
              <Icons.ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* Admit Card Dynamic Notice */}
        {admitEligibility.canDownload ? (
          <div className="rounded-xl border border-emerald-500/40 bg-emerald-50/80 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-emerald-600 p-2 text-white shrink-0 mt-0.5">
                <Icons.Ticket className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  University Exam Clearance Cleared
                </p>
                <p className="text-base font-bold text-navy-950 mt-0.5">
                  Your Semester {student.semester} Examination Admit Card is Ready!
                </p>
                <p className="text-xs text-emerald-900 mt-0.5">
                  Both fee clearance and 75% attendance criteria are satisfied. Verified by Exam Cell.
                </p>
              </div>
            </div>
            <Link
              href="/portal/admit-card"
              className="btn btn-sm bg-emerald-700 hover:bg-emerald-800 text-white shrink-0 whitespace-nowrap self-start sm:self-auto"
            >
              Download Admit Card
              <Icons.ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="rounded-xl border border-amber-500/40 bg-amber-50/80 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-amber-500 p-2 text-white shrink-0 mt-0.5">
                <Icons.AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Admit Card Pending Action
                </p>
                <p className="text-base font-bold text-navy-950 mt-0.5">
                  Exam Hall Ticket is currently on hold ({admitEligibility.blockReasons.length} issue)
                </p>
                <p className="text-xs text-amber-950 mt-0.5">
                  {admitEligibility.blockReasons.join(" · ")}
                </p>
              </div>
            </div>
            <Link
              href={!admitEligibility.feeCleared ? "/portal/fees" : "/portal/academics"}
              className="btn btn-outline-dark btn-sm shrink-0 whitespace-nowrap self-start sm:self-auto"
            >
              Resolve Issue
              <Icons.ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* ================= 3. CORE 6 ACTION HUBS (BIG, CLEAR, TOUCH-FRIENDLY) ================= */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="eyebrow">Student Services</p>
              <h3 className="font-display text-xl font-bold text-navy-900">
                Self-Service Dashboard
              </h3>
            </div>
            <span className="text-xs font-medium text-muted">
              Tap any card to view full details
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* 1. ADMIT CARD CARD */}
            <Link
              href="/portal/admit-card"
              className="group card-line p-6 hover:border-navy-900 transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-100 border border-gold-300/50 flex items-center justify-center text-gold-700 group-hover:scale-105 transition-transform">
                    <Icons.Ticket className="h-6 w-6" />
                  </div>
                  {admitEligibility.canDownload ? (
                    <span className="rounded-full bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                      ✓ Ready for Print
                    </span>
                  ) : (
                    <span className="rounded-full bg-amber-100 border border-amber-300 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                      ⚠ On Hold
                    </span>
                  )}
                </div>

                <h4 className="font-display text-lg font-bold text-navy-900 group-hover:text-primary transition-colors">
                  Internal Admit Card &amp; Clearance
                </h4>
                <p className="text-xs text-gold-700 font-semibold mb-1">आंतरिक परीक्षा प्रवेश पत्र एवं कॉलेज एनओसी</p>
                <p className="text-xs text-muted leading-relaxed">
                  Hall ticket for MSITM sessional tests, practical viva and university exam clearance slip.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-line flex items-center justify-between text-xs font-semibold text-primary">
                <span>View Admit Card</span>
                <Icons.ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* 2. FEE & RECEIPTS CARD */}
            <Link
              href="/portal/fees"
              className="group card-line p-6 hover:border-navy-900 transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-300/50 flex items-center justify-center text-emerald-700 group-hover:scale-105 transition-transform">
                    <Icons.Receipt className="h-6 w-6" />
                  </div>
                  {feeSummary.isCleared ? (
                    <span className="rounded-full bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                      ✓ No Dues Pending
                    </span>
                  ) : (
                    <span className="rounded-full bg-rose-100 border border-rose-300 px-2.5 py-0.5 text-xs font-bold text-rose-800">
                      ₹{feeSummary.balance.toLocaleString("en-IN")} Due
                    </span>
                  )}
                </div>

                <h4 className="font-display text-lg font-bold text-navy-900 group-hover:text-primary transition-colors">
                  Fee Status &amp; Receipts
                </h4>
                <p className="text-xs text-emerald-700 font-semibold mb-1">फीस विवरण एवं रसीद</p>
                <p className="text-xs text-muted leading-relaxed">
                  Semester tuition, computer lab &amp; exam fee ledger. View and print verified PDF fee payment receipts.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-line flex items-center justify-between text-xs font-semibold text-primary">
                <span>Open Fee Ledger</span>
                <Icons.ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* 3. ATTENDANCE CARD */}
            <Link
              href="/portal/academics"
              className="group card-line p-6 hover:border-navy-900 transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 border border-blue-300/50 flex items-center justify-center text-blue-700 group-hover:scale-105 transition-transform">
                    <Icons.CalendarCheck className="h-6 w-6" />
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold border ${
                      overallAttendancePct >= 75
                        ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                        : "bg-rose-100 border-rose-300 text-rose-800"
                    }`}
                  >
                    {overallAttendancePct}% Attendance
                  </span>
                </div>

                <h4 className="font-display text-lg font-bold text-navy-900 group-hover:text-primary transition-colors">
                  Attendance &amp; Classes
                </h4>
                <p className="text-xs text-blue-700 font-semibold mb-1">उपस्थिति (Min. 75% Mandatory)</p>

                {/* Visual Progress Bar */}
                <div className="my-2">
                  <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        overallAttendancePct >= 75 ? "bg-emerald-600" : "bg-rose-500"
                      }`}
                      style={{ width: `${Math.min(100, overallAttendancePct)}%` }}
                    />
                  </div>
                </div>

                <p className="text-xs text-muted leading-relaxed">
                  {overallAttendancePct >= 75
                    ? "Your attendance meets university exam requirements."
                    : "Attendance is below 75%. Attend remaining lectures to avoid exam detention."}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-line flex items-center justify-between text-xs font-semibold text-primary">
                <span>View Subject Breakdown</span>
                <Icons.ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* 4. SICK GATE PASS CARD */}
            <Link
              href="/portal/gate-pass"
              className="group card-line p-6 hover:border-navy-900 transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-100 border border-rose-300/50 flex items-center justify-center text-rose-700 group-hover:scale-105 transition-transform">
                    <Icons.Stethoscope className="h-6 w-6" />
                  </div>
                  {activeApprovedPass ? (
                    <span className="rounded-full bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                      Approved ({activeApprovedPass.passCode})
                    </span>
                  ) : latestPass && latestPass.status === "pending" ? (
                    <span className="rounded-full bg-amber-100 border border-amber-300 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                      Awaiting HOD Approval
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-100 border border-slate-300 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                      Apply Anytime
                    </span>
                  )}
                </div>

                <h4 className="font-display text-lg font-bold text-navy-900 group-hover:text-primary transition-colors">
                  Sick Leave Gate Pass
                </h4>
                <p className="text-xs text-rose-700 font-semibold mb-1">आपातकालीन गेट पास</p>
                <p className="text-xs text-muted leading-relaxed">
                  Need to leave campus early due to sickness or medical emergency? Request online; approved digitally by HOD with parent alert.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-line flex items-center justify-between text-xs font-semibold text-primary">
                <span>Apply / Check Pass</span>
                <Icons.ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* 5. RESULTS & CGPA CARD */}
            <Link
              href="/portal/results"
              className="group card-line p-6 hover:border-navy-900 transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 border border-purple-300/50 flex items-center justify-center text-purple-700 group-hover:scale-105 transition-transform">
                    <Icons.Award className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-purple-100 border border-purple-300 px-2.5 py-0.5 text-xs font-bold text-purple-900 font-mono">
                    CGPA {cgpa}
                  </span>
                </div>

                <h4 className="font-display text-lg font-bold text-navy-900 group-hover:text-primary transition-colors">
                  Internal Sessional Marks &amp; Results
                </h4>
                <p className="text-xs text-purple-700 font-semibold mb-1">आंतरिक सेशनल अंक एवं विश्वविद्यालय परिणाम</p>
                <p className="text-xs text-muted leading-relaxed">
                  College internal assessment marks (30%), practical lab viva records and university SGPA/CGPA archive.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-line flex items-center justify-between text-xs font-semibold text-primary">
                <span>View Marksheets</span>
                <Icons.ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* 6. DIGITAL ID & CERTIFICATES CARD */}
            <Link
              href="/portal/id-card"
              className="group card-line p-6 hover:border-navy-900 transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 border border-indigo-300/50 flex items-center justify-center text-indigo-700 group-hover:scale-105 transition-transform">
                    <Icons.IdCard className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-indigo-100 border border-indigo-300 px-2.5 py-0.5 text-xs font-bold text-indigo-800">
                    QR Verified
                  </span>
                </div>

                <h4 className="font-display text-lg font-bold text-navy-900 group-hover:text-primary transition-colors">
                  Digital ID Card &amp; Forms
                </h4>
                <p className="text-xs text-indigo-700 font-semibold mb-1">डिजिटल पहचान पत्र</p>
                <p className="text-xs text-muted leading-relaxed">
                  Official digital campus student identity card with QR verification code, plus bonafide &amp; character certificate requests.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-line flex items-center justify-between text-xs font-semibold text-primary">
                <span>View Digital ID</span>
                <Icons.ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>

        {/* ================= 4. NOTICES & STUDENT PROFILE DETAILS ================= */}
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6 items-start">
          {/* Official Notices */}
          <section className="card-line p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-line">
              <div>
                <p className="eyebrow">College Announcements</p>
                <h3 className="font-display text-xl font-bold text-navy-900">
                  {student.course} Notice Board
                </h3>
              </div>
              <span className="rounded-full bg-navy-100 px-2.5 py-1 text-xs font-bold text-navy-900">
                {notices.length} Updates
              </span>
            </div>

            <ul className="divide-y divide-line">
              {notices.map((n) => (
                <li key={n.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span className="rounded-md bg-gold-100 border border-gold-300/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-800">
                      {n.category}
                    </span>
                    <span className="text-xs text-muted flex items-center gap-1">
                      <Icons.Clock className="h-3.5 w-3.5" />
                      {new Date(n.publishedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="font-display font-semibold text-navy-900 text-base">
                    {n.title}
                  </p>
                  <p className="text-sm text-muted mt-1 leading-relaxed">
                    {n.body}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* Student Profile & Quick Info */}
          <div className="space-y-6">
            <section className="card-line p-6 sm:p-7 space-y-4">
              <div className="pb-3 border-b border-line">
                <p className="eyebrow">College Records</p>
                <h3 className="font-display text-xl font-bold text-navy-900">
                  Student Information
                </h3>
              </div>

              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-xs font-semibold text-muted uppercase">Father&apos;s Name</dt>
                  <dd className="font-bold text-navy-900 mt-0.5">{student.fatherName}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-muted uppercase">Date of Birth</dt>
                  <dd className="font-mono text-navy-900 mt-0.5">{student.dob}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-muted uppercase">Student Mobile</dt>
                  <dd className="font-mono text-navy-900 mt-0.5">{student.phone}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-muted uppercase">Guardian Mobile</dt>
                  <dd className="font-mono text-navy-900 mt-0.5">{student.guardianPhone}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-xs font-semibold text-muted uppercase">Registered Gmail</dt>
                  <dd className="font-mono text-navy-900 mt-0.5 truncate">{student.email || "Not linked"}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-muted uppercase">Blood Group</dt>
                  <dd className="font-semibold text-navy-900 mt-0.5">{student.bloodGroup || "O+"}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-muted uppercase">Library Status</dt>
                  <dd className="font-semibold mt-0.5">
                    {snapshot.libraryCleared ? (
                      <span className="text-emerald-700 font-bold">✓ Clear (No Overdues)</span>
                    ) : (
                      <span className="text-rose-700 font-bold">⚠ Books Overdue</span>
                    )}
                  </dd>
                </div>
              </dl>
            </section>

            {/* Quick Contact & Office Helpdesk Box */}
            <div className="rounded-xl border border-navy-200 bg-white p-5 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-navy-900">
                <Icons.HelpCircle className="h-5 w-5 text-primary" />
                <h4 className="font-bold text-sm">Need Help or Correction?</h4>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                If your attendance, fee amount, or personal information requires updating, contact the college office during working hours (9:30 AM – 4:00 PM).
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <Link
                  href="/portal/campus-desk"
                  className="btn btn-outline-dark btn-sm"
                >
                  <Icons.BookOpen className="h-3.5 w-3.5" />
                  Library &amp; Lab Support
                </Link>
                <Link
                  href="/portal/certificates"
                  className="btn btn-outline-dark btn-sm"
                >
                  <Icons.FileCheck2 className="h-3.5 w-3.5" />
                  Request Bonafide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
