import Link from "next/link";
import { Icons } from "@/components/icons";
import { PortalShell } from "@/components/portal-shell";
import { GatePassRequestForm } from "@/components/portal-student";
import { PrintDocumentButton } from "@/components/portal-student-ops";
import { requireStudentContext } from "@/lib/portal-guards";

export const dynamic = "force-dynamic";

export default async function StudentGatePassPage() {
  const { session, snapshot } = await requireStudentContext();
  const { student, gatePasses } = snapshot;
  const approvedActive = gatePasses.find((g) => g.status === "approved");

  return (
    <PortalShell
      session={session}
      mode="student"
      subtitle="Medical / Sick-Leave & Urgent Early-Exit Gate Passes"
    >
      <div className="space-y-8">
        {approvedActive ? (
          <section className="rounded-xl border-2 border-gold-400 bg-navy-950 text-white p-6 shadow-lg">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-400 text-navy-950 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  <Icons.BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  Approved Gate Pass — Ready for Security Check-Out
                </span>
                <p className="font-display text-2xl sm:text-3xl font-bold text-white mt-3">
                  Pass Code: <span className="font-mono text-gold-300">{approvedActive.passCode}</span>
                </p>
                <p className="text-sm text-navy-100 mt-1">
                  {student.fullName} · {student.course} Sem {student.semester} · {approvedActive.reason}
                </p>
              </div>
              <div className="text-left sm:text-right text-xs text-navy-100 space-y-1">
                <p>Approved by: <strong className="text-white">{approvedActive.approvedBy}</strong></p>
                <p>Guardian Informed: <strong className="text-gold-300">{approvedActive.guardianNotified ? "Yes" : "Pending"}</strong></p>
                <p>Valid: <strong className="text-white">{approvedActive.validUntil}</strong></p>
                <div className="pt-1 flex flex-wrap items-center sm:justify-end gap-2">
                  <Link href={`/verify/${approvedActive.verificationToken}`} className="inline-block text-gold-300 underline font-mono">
                    /verify/{approvedActive.verificationToken}
                  </Link>
                  <PrintDocumentButton label="Print Gate Pass Slip" />
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <GatePassRequestForm defaultGuardianPhone={student.guardianPhone} />

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-navy-900">Your Gate Pass History</h2>
          <div className="overflow-x-auto border border-line rounded-xl bg-white">
            <table className="table-msitm min-w-[700px]">
              <thead>
                <tr>
                  <th scope="col">Pass Code</th>
                  <th scope="col">Type</th>
                  <th scope="col">Reason</th>
                  <th scope="col">Requested Exit</th>
                  <th scope="col">Guardian Alert</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {gatePasses.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center text-muted py-6">
                      No gate passes requested yet.
                    </td>
                  </tr>
                ) : (
                  gatePasses.map((gp) => (
                    <tr key={gp.id}>
                      <td className="font-mono text-xs font-bold text-navy-900">
                        <Link href={`/verify/${gp.verificationToken}`} className="link-underline">
                          {gp.passCode}
                        </Link>
                      </td>
                      <td className="capitalize">{gp.passType.replace("_", " ")}</td>
                      <td>
                        <p className="font-medium text-navy-900">{gp.reason}</p>
                        {gp.symptomsOrNotes ? <p className="text-xs text-muted">{gp.symptomsOrNotes}</p> : null}
                        {gp.rejectionReason ? <p className="text-xs text-destructive">{gp.rejectionReason}</p> : null}
                      </td>
                      <td>{gp.requestedExitAt}</td>
                      <td>{gp.guardianNotified ? "Confirmed" : "Pending"}</td>
                      <td>
                        <span className="inline-flex rounded px-2 py-0.5 text-xs font-bold uppercase tracking-wider bg-navy-50 text-navy-900 border border-navy-100">
                          {gp.status.replace("_", " ")}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PortalShell>
  );
}

