import Link from "next/link";
import { Icons } from "@/components/icons";
import { PortalShell } from "@/components/portal-shell";
import { requireStaffContext } from "@/lib/portal-guards";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const { session, overview } = await requireStaffContext();
  const totalStudents = overview.studentSnapshots.length;
  const pendingGate = overview.gatePasses.filter((g) => g.status === "pending").length;
  const dueStudents = overview.studentSnapshots.filter((s) => !s.feeSummary.isCleared).length;
  const unlockedCards = overview.studentSnapshots.filter((s) => s.admitEligibility.canDownload).length;
  const totalCollected = overview.payments.reduce((sum, p) => sum + p.amountPaid, 0);
  const totalPendingDues = overview.studentSnapshots.reduce((sum, s) => sum + s.feeSummary.balance, 0);
  const totalReceivables = totalCollected + totalPendingDues;
  const collectionRate = totalReceivables > 0 ? Math.round((totalCollected / totalReceivables) * 100) : 100;
  const clearanceRate = totalStudents > 0 ? Math.round((unlockedCards / totalStudents) * 100) : 100;

  const openLabTickets = overview.labTickets.filter((t) => t.status !== "resolved").length;
  const openGrievances = overview.grievances.filter((g) => g.status !== "resolved").length;
  const overdueBooks = overview.libraryIssues.filter((b) => b.status === "overdue" || b.fineAmount > 0).length;
  const pendingLeaves = overview.staffLeaves.filter((l) => l.status === "pending").length;

  const bcaCount = overview.studentSnapshots.filter((s) => s.student.course === "BCA").length;
  const bbaCount = overview.studentSnapshots.filter((s) => s.student.course === "BBA").length;
  const bcaPct = totalStudents > 0 ? Math.round((bcaCount / totalStudents) * 100) : 50;

  return (
    <PortalShell
      session={session}
      mode="admin"
      subtitle={`Campus Operations Control Center · ${session.role.replace("_", " ").toUpperCase()}`}
    >
      <div className="space-y-8">
        {/* ================= 1. EXECUTIVE ERP HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-line">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-xs" />
              <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
                MSITM Campus ERP · Live Production System
              </p>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-navy-950 mt-1 tracking-tight">
              Executive Control Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Degree College Administrative Overview · BCA &amp; BBA Undergraduate Programmes
            </p>
          </div>

          {/* Quick Action ERP Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link
              href="/admin/students"
              className="btn btn-navy btn-sm shadow-xs flex items-center gap-2 font-bold"
            >
              <Icons.FileSpreadsheet className="h-4 w-4 text-gold-400" />
              Import Student Excel
            </Link>
            <Link
              href="/admin/gate"
              className="btn btn-gold btn-sm shadow-xs flex items-center gap-2 font-bold"
            >
              <Icons.Stethoscope className="h-4 w-4" />
              Gate Security Scanner
            </Link>
          </div>
        </div>

        {/* ================= 2. DECISION QUEUE (URGENT PENDING ITEMS) ================= */}
        {(pendingGate > 0 || pendingLeaves > 0 || openGrievances > 0) && (
          <div className="rounded-2xl border-2 border-amber-300/80 bg-gradient-to-r from-amber-50/90 via-amber-50/50 to-white p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-start gap-3.5">
              <div className="rounded-xl bg-amber-500 text-white p-2.5 shadow-xs shrink-0 mt-0.5">
                <Icons.AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-amber-900">
                  Administrative Items Requiring Review &amp; Decision
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs sm:text-sm font-bold text-navy-950 mt-1">
                  {pendingGate > 0 && (
                    <span className="inline-flex items-center gap-1.5 text-amber-900">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                      {pendingGate} Sick Gate Pass(es) awaiting coordinator sign-off
                    </span>
                  )}
                  {pendingLeaves > 0 && (
                    <span className="inline-flex items-center gap-1.5 text-amber-900">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                      {pendingLeaves} Faculty Leave application(s) pending approval
                    </span>
                  )}
                  {openGrievances > 0 && (
                    <span className="inline-flex items-center gap-1.5 text-amber-900">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                      {openGrievances} Student grievance ticket(s) in queue
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 self-start md:self-auto shrink-0">
              {pendingGate > 0 && (
                <Link href="/admin/gate" className="btn btn-navy btn-sm text-xs py-1.5">
                  Review Gate Passes
                </Link>
              )}
              {pendingLeaves > 0 && (
                <Link href="/admin/academics" className="btn btn-outline-dark btn-sm text-xs py-1.5">
                  Review Leaves
                </Link>
              )}
            </div>
          </div>
        )}

        {/* ================= 3. FOUR ENTERPRISE KPI CARDS ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* KPI 1: Active Student Strength */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)] hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  Enrolled Students
                </span>
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-700 flex items-center justify-center">
                  <Icons.Users className="h-4 w-4" />
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-extrabold text-navy-950 tracking-tight font-mono">
                  {totalStudents}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  100% Active
                </span>
              </div>

              {/* Segmented Class Breakdown Bar */}
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                  <span>BCA ({bcaCount})</span>
                  <span>BBA ({bbaCount})</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden flex">
                  <div className="bg-navy-900 h-full" style={{ width: `${bcaPct}%` }} title={`BCA: ${bcaCount}`} />
                  <div className="bg-gold-500 h-full" style={{ width: `${100 - bcaPct}%` }} title={`BBA: ${bbaCount}`} />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-500">{overview.admissionLeads.length} leads in funnel</span>
              <Link href="/admin/students" className="text-primary hover:underline flex items-center gap-1 font-bold">
                Student Roster <Icons.ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* KPI 2: Fees Realized */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)] hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  Fee Collection Rate
                </span>
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 flex items-center justify-center">
                  <Icons.Receipt className="h-4 w-4" />
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-extrabold text-navy-950 tracking-tight font-mono">
                  ₹{totalCollected.toLocaleString("en-IN")}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  {collectionRate}%
                </span>
              </div>

              {/* Collection Realization Progress */}
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                  <span>Collected</span>
                  <span className="text-rose-600">₹{totalPendingDues.toLocaleString("en-IN")} Due</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${Math.min(100, collectionRate)}%` }} />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-500">{dueStudents} accounts with dues</span>
              <Link href="/admin/fees" className="text-primary hover:underline flex items-center gap-1 font-bold">
                Fee Accounts <Icons.ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* KPI 3: Admit Card Compliance */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)] hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  Exam Clearances
                </span>
                <div className="w-9 h-9 rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-700 flex items-center justify-center">
                  <Icons.Ticket className="h-4 w-4" />
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-extrabold text-navy-950 tracking-tight font-mono">
                  {unlockedCards} <span className="text-lg text-slate-400 font-normal">/ {totalStudents}</span>
                </span>
                <span className="text-xs font-bold text-gold-800 bg-gold-50 border border-gold-300 px-2 py-0.5 rounded-full">
                  {clearanceRate}% Ready
                </span>
              </div>

              {/* Clearance Progress */}
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                  <span>3-Gate Verified</span>
                  <span className="text-amber-700">{totalStudents - unlockedCards} on Hold</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="bg-gold-500 h-full rounded-full" style={{ width: `${Math.min(100, clearanceRate)}%` }} />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-500">Hall ticket generation</span>
              <Link href="/admin/exams" className="text-primary hover:underline flex items-center gap-1 font-bold">
                Exam Cell <Icons.ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* KPI 4: Security Gate Passes */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)] hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  Security Gate Station
                </span>
                <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 flex items-center justify-center">
                  <Icons.Stethoscope className="h-4 w-4" />
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-extrabold text-navy-950 tracking-tight font-mono">
                  {pendingGate}
                </span>
                <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                  Pending Review
                </span>
              </div>

              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                  <span>Total Pass Requests</span>
                  <span className="text-navy-900 font-bold">{overview.gatePasses.length} Recorded</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="bg-rose-500 h-full rounded-full"
                    style={{ width: `${Math.min(100, (pendingGate / (overview.gatePasses.length || 1)) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-500">Guardian SMS &amp; QR</span>
              <Link href="/admin/gate" className="text-primary hover:underline flex items-center gap-1 font-bold">
                Gate Scanner <Icons.ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* ================= 4. CORE ERP MODULE LAUNCHPAD (BESPOKE CARDS) ================= */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="eyebrow">Enterprise Hubs</p>
              <h2 className="font-display text-xl font-extrabold text-navy-950">
                Core Administrative Centers
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              Role-authorized operational tools
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Module 1: Student Master */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)] hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-navy-900 text-gold-400 flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                    <Icons.Users className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                    EXCEL .XLSX
                  </span>
                </div>

                <h3 className="font-display text-base font-bold text-navy-950 group-hover:text-primary transition-colors">
                  Students &amp; Excel Master
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Bulk Excel student enrollment, search directory, credential resets &amp; student record CRUD.
                </p>

                {/* Sub-Actions */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5 text-xs font-semibold">
                  <Link
                    href="/admin/students"
                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                  >
                    Directory
                  </Link>
                  <Link
                    href="/admin/students"
                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                  >
                    Import Batch
                  </Link>
                </div>
              </div>

              <Link
                href="/admin/students"
                className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-primary flex items-center justify-between group-hover:translate-x-0.5 transition-transform"
              >
                <span>Launch Student Console</span>
                <Icons.ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Module 2: Fee Accounts */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)] hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                    <Icons.CreditCard className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md border border-emerald-200">
                    RECEIPTS
                  </span>
                </div>

                <h3 className="font-display text-base font-bold text-navy-950 group-hover:text-primary transition-colors">
                  Fee Accounts &amp; Ledgers
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Collect payments, configure semester fee slabs, student concessions &amp; verified PDF receipts.
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5 text-xs font-semibold">
                  <Link
                    href="/admin/fees"
                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                  >
                    Collect Fee
                  </Link>
                  <Link
                    href="/admin/fees"
                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                  >
                    Fee Structures
                  </Link>
                </div>
              </div>

              <Link
                href="/admin/fees"
                className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-primary flex items-center justify-between group-hover:translate-x-0.5 transition-transform"
              >
                <span>Launch Accounts Console</span>
                <Icons.ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Module 3: Exam Cell */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)] hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-gold-500 text-navy-950 flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                    <Icons.Ticket className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase bg-gold-50 text-gold-800 px-2.5 py-1 rounded-md border border-gold-300">
                    EXAM CELL
                  </span>
                </div>

                <h3 className="font-display text-base font-bold text-navy-950 group-hover:text-primary transition-colors">
                  Internal Exams &amp; University Clearance
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  MSITM internal sessional tests (PUT), 3-gate attendance &amp; fee clearances, internal assessment marks (30%) &amp; university forwarding.
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5 text-xs font-semibold">
                  <Link
                    href="/admin/exams"
                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                  >
                    Hall Tickets
                  </Link>
                  <Link
                    href="/admin/exams"
                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                  >
                    Results Ledger
                  </Link>
                </div>
              </div>

              <Link
                href="/admin/exams"
                className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-primary flex items-center justify-between group-hover:translate-x-0.5 transition-transform"
              >
                <span>Launch Exam Console</span>
                <Icons.ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Module 4: Campus Logistics & Labs */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)] hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-purple-700 text-white flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                    <Icons.BookMarked className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase bg-purple-50 text-purple-800 px-2.5 py-1 rounded-md border border-purple-200">
                    CAMPUS OPS
                  </span>
                </div>

                <h3 className="font-display text-base font-bold text-navy-950 group-hover:text-primary transition-colors">
                  Campus Ops, Labs &amp; Library
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Computer lab tickets ({openLabTickets}), library book circulation ({overdueBooks} overdue) &amp; anti-ragging support.
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5 text-xs font-semibold">
                  <Link
                    href="/admin/campus-ops"
                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                  >
                    Workstations
                  </Link>
                  <Link
                    href="/admin/campus-ops"
                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                  >
                    Library Ledger
                  </Link>
                </div>
              </div>

              <Link
                href="/admin/campus-ops"
                className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-primary flex items-center justify-between group-hover:translate-x-0.5 transition-transform"
              >
                <span>Launch Ops Console</span>
                <Icons.ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* ================= 5. LIVE STUDENT SNAPSHOT ROSTER TABLE ================= */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="eyebrow">Real-Time Operational Roster</p>
              <h2 className="font-display text-xl font-extrabold text-navy-950">
                Active Student Status (BCA &amp; BBA)
              </h2>
            </div>
            <Link
              href="/admin/students"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              Open Complete Student Database <Icons.ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto border border-slate-200/90 rounded-2xl bg-white shadow-xs">
            <table className="table-msitm min-w-[880px]">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th scope="col" className="font-extrabold uppercase text-[11px] tracking-wider">Enrollment No.</th>
                  <th scope="col" className="font-extrabold uppercase text-[11px] tracking-wider">Student Name &amp; Contact</th>
                  <th scope="col" className="font-extrabold uppercase text-[11px] tracking-wider">Programme</th>
                  <th scope="col" className="font-extrabold uppercase text-[11px] tracking-wider">Fee Balance</th>
                  <th scope="col" className="font-extrabold uppercase text-[11px] tracking-wider">Attendance</th>
                  <th scope="col" className="font-extrabold uppercase text-[11px] tracking-wider">Library / CGPA</th>
                  <th scope="col" className="font-extrabold uppercase text-[11px] tracking-wider">Admit Card</th>
                  <th scope="col" className="font-extrabold uppercase text-[11px] tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {overview.studentSnapshots.map((s) => (
                  <tr key={s.student.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="font-mono text-xs font-extrabold text-navy-950">
                      {s.student.enrollmentNo}
                    </td>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-navy-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {s.student.fullName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-extrabold text-navy-950 text-sm">{s.student.fullName}</p>
                          <p className="text-xs text-slate-500 font-mono">{s.student.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="rounded-md bg-navy-50 border border-navy-200/70 px-2 py-0.5 text-xs font-bold text-navy-900">
                        {s.student.course} · Sem {s.student.semester} ({s.student.section})
                      </span>
                    </td>
                    <td>
                      {s.feeSummary.isCleared ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                          <Icons.CheckCircle className="h-3 w-3" /> Cleared
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
                          <Icons.AlertCircle className="h-3 w-3" /> ₹{s.feeSummary.balance.toLocaleString("en-IN")} Due
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-extrabold font-mono ${s.overallAttendancePct >= 75 ? "text-emerald-700" : "text-rose-700"}`}>
                          {s.overallAttendancePct}%
                        </span>
                        <div className="w-14 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${s.overallAttendancePct >= 75 ? "bg-emerald-600" : "bg-rose-500"}`}
                            style={{ width: `${Math.min(100, s.overallAttendancePct)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="text-xs">
                      <span className={s.libraryCleared ? "text-emerald-700 font-bold" : "text-rose-700 font-bold"}>
                        {s.libraryCleared ? "Lib Clear" : "Lib Dues"}
                      </span>
                      <span className="text-slate-400"> · </span>
                      <span className="font-mono font-extrabold text-navy-950">CGPA {s.cgpa}</span>
                    </td>
                    <td>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-extrabold border ${
                          s.admitEligibility.canDownload
                            ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                            : "bg-amber-50 border-amber-300 text-amber-800"
                        }`}
                      >
                        {s.admitEligibility.canDownload ? "UNLOCKED" : "ON HOLD"}
                      </span>
                    </td>
                    <td className="text-right">
                      <Link
                        href="/admin/students"
                        className="btn btn-outline-dark btn-sm text-xs py-1 font-bold"
                      >
                        Inspect
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PortalShell>
  );
}
