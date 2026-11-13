import Link from "next/link";
import { PortalShell } from "@/components/portal-shell";
import { FeeCollectorPanel } from "@/components/portal-admin";
import { DeletePaymentButton, FeeStructureManager } from "@/components/portal-admin-controls";
import { requireStaffContext } from "@/lib/portal-guards";

export const dynamic = "force-dynamic";

export default async function AdminFeesPage() {
  const { session, overview } = await requireStaffContext(["admin", "accounts"]);
  const studentById = new Map(overview.studentSnapshots.map((s) => [s.student.id, s.student]));

  return (
    <PortalShell
      session={session}
      mode="admin"
      subtitle="Fee Structures CRUD, Payment Recording & Official Receipts"
    >
      <div className="space-y-8">
        <FeeStructureManager structures={overview.feeStructures} />

        <FeeCollectorPanel snapshots={overview.studentSnapshots} />

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-navy-900">Recent Fee Receipts</h2>
          <div className="overflow-x-auto border border-line rounded-xl bg-white">
            <table className="table-msitm min-w-[780px]">
              <thead>
                <tr>
                  <th scope="col">Receipt No.</th>
                  <th scope="col">Student</th>
                  <th scope="col">Mode / Ref</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Verification Token</th>
                  <th scope="col">Del</th>
                </tr>
              </thead>
              <tbody>
                {overview.payments.map((p) => {
                  const st = studentById.get(p.studentId);
                  return (
                    <tr key={p.id}>
                      <td className="font-mono text-xs font-bold text-navy-900">{p.receiptNo}</td>
                      <td>
                        {st ? `${st.fullName} (${st.course} S${p.semester})` : `Student #${p.studentId}`}
                      </td>
                      <td>
                        {p.paymentMode} · <span className="font-mono text-xs">{p.transactionRef}</span>
                      </td>
                      <td className="font-semibold">₹{p.amountPaid.toLocaleString("en-IN")}</td>
                      <td>
                        <Link href={`/verify/${p.verificationToken}`} className="font-mono text-xs link-underline text-navy-900">
                          {p.verificationToken}
                        </Link>
                      </td>
                      <td>
                        <DeletePaymentButton paymentId={p.id} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PortalShell>
  );
}
