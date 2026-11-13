import { PortalShell } from "@/components/portal-shell";
import { FeeReceiptViewer } from "@/components/portal-student";
import { requireStudentContext } from "@/lib/portal-guards";

export const dynamic = "force-dynamic";

export default async function StudentFeesPage() {
  const { session, snapshot } = await requireStudentContext();
  const { student, feeStructure, feeSummary, payments } = snapshot;

  return (
    <PortalShell
      session={session}
      mode="student"
      subtitle={`${student.course} · Semester ${student.semester} Fee Ledger & Official Receipts`}
    >
      <div className="space-y-8">
        <div className="grid sm:grid-cols-4 gap-4 print-hidden">
          <div className="card-line p-5">
            <p className="text-xs font-bold uppercase text-muted">Semester Total</p>
            <p className="stat-numeral text-2xl text-navy-900 mt-1">
              ₹{feeSummary.totalPayable.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-muted mt-1">Due {feeStructure.dueDate}</p>
          </div>
          <div className="card-line p-5">
            <p className="text-xs font-bold uppercase text-muted">Paid Till Date</p>
            <p className="stat-numeral text-2xl text-navy-900 mt-1">
              ₹{feeSummary.totalPaid.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="card-line p-5">
            <p className="text-xs font-bold uppercase text-muted">Concession / Scholarship</p>
            <p className="stat-numeral text-2xl text-navy-900 mt-1">
              ₹{feeSummary.totalConcession.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="card-line p-5">
            <p className="text-xs font-bold uppercase text-muted">Pending Balance</p>
            <p className={`stat-numeral text-2xl mt-1 ${feeSummary.isCleared ? "text-navy-900" : "text-destructive"}`}>
              ₹{feeSummary.balance.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-muted mt-1">
              {feeSummary.isCleared ? "No-Dues Cleared" : "Clear at Accounts Office"}
            </p>
          </div>
        </div>

        <section className="card-line p-6 print-hidden">
          <h2 className="font-display text-lg font-semibold text-navy-900">
            Semester {feeStructure.semester} Fee Breakdown ({feeStructure.academicYear})
          </h2>
          <dl className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <dt className="text-xs text-muted uppercase font-bold">Tuition Fee</dt>
              <dd className="font-semibold text-navy-900 mt-0.5">₹{feeStructure.tuitionFee.toLocaleString("en-IN")}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted uppercase font-bold">Computer / Lab Fee</dt>
              <dd className="font-semibold text-navy-900 mt-0.5">₹{feeStructure.labFee.toLocaleString("en-IN")}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted uppercase font-bold">Examination Fee</dt>
              <dd className="font-semibold text-navy-900 mt-0.5">₹{feeStructure.examFee.toLocaleString("en-IN")}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted uppercase font-bold">Library Fee</dt>
              <dd className="font-semibold text-navy-900 mt-0.5">₹{feeStructure.libraryFee.toLocaleString("en-IN")}</dd>
            </div>
          </dl>
        </section>

        <FeeReceiptViewer student={student} payments={payments} />
      </div>
    </PortalShell>
  );
}

