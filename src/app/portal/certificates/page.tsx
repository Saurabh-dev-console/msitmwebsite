import { PortalShell } from "@/components/portal-shell";
import { CertificateRequestForm } from "@/components/portal-student";
import { PrintDocumentButton } from "@/components/portal-student-ops";
import { requireStudentContext } from "@/lib/portal-guards";

export const dynamic = "force-dynamic";

export default async function StudentCertificatesPage() {
  const { session, snapshot } = await requireStudentContext();
  const { student, certificates } = snapshot;
  const printableCert = certificates.find((c) => c.status === "ready" || c.status === "issued");

  return (
    <PortalShell
      session={session}
      mode="student"
      subtitle={`${student.course} · Bonafide, Fee Letter & No-Dues Clearance Desk`}
    >
      <div className="space-y-8">
        <CertificateRequestForm />

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-navy-900">Your Certificate Requests</h2>
          <div className="overflow-x-auto border border-line rounded-xl bg-white">
            <table className="table-msitm min-w-[700px]">
              <thead>
                <tr>
                  <th scope="col">Reference No.</th>
                  <th scope="col">Document</th>
                  <th scope="col">Purpose</th>
                  <th scope="col">Accounts / Library / Lab</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {certificates.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-muted py-6">
                      No certificate requests submitted yet.
                    </td>
                  </tr>
                ) : (
                  certificates.map((c) => (
                    <tr key={c.id}>
                      <td className="font-mono text-xs font-bold text-navy-900">{c.referenceNo}</td>
                      <td className="capitalize">{c.certType.replace(/_/g, " ")}</td>
                      <td>{c.purpose}</td>
                      <td className="text-xs">
                        Acct: {c.accountsCleared ? "OK" : "Due"} · Lib: {c.libraryCleared ? "OK" : "Pending"} · Lab: {c.labCleared ? "OK" : "Pending"}
                      </td>
                      <td>
                        <span className="rounded bg-navy-50 border border-navy-100 px-2 py-0.5 text-xs font-bold uppercase">
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {printableCert ? (
          <section className="rounded-xl border-2 border-navy-900 bg-white p-6 sm:p-8 space-y-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-line">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-700">
                  Meena Shah Institute of Technology &amp; Management · Gonda
                </p>
                <h2 className="font-display text-2xl font-semibold text-navy-900 mt-1 capitalize">
                  Official {printableCert.certType.replace(/_/g, " ")} Certificate
                </h2>
                <p className="font-mono text-xs text-muted mt-0.5">
                  Ref: {printableCert.referenceNo} · Dated: {new Date(printableCert.createdAt).toLocaleDateString("en-IN")}
                </p>
              </div>
              <PrintDocumentButton label="Print Official Letter" />
            </div>
            <p className="text-sm leading-relaxed text-ink">
              This is to certify that <strong>{student.fullName}</strong> (S/o / D/o{" "}
              <strong>{student.fatherName}</strong>), bearing Enrollment No.{" "}
              <strong className="font-mono">{student.enrollmentNo}</strong> and University Roll No.{" "}
              <strong className="font-mono">{student.universityRollNo}</strong>, is a bonafide student of{" "}
              <strong>{student.course} (Semester {student.semester}, Batch {student.batch})</strong> at Meena Shah
              Institute of Technology &amp; Management, Meena Nagar, Circular Road, Gonda 271002.
            </p>
            <p className="text-sm text-muted">
              <strong>Stated Purpose:</strong> {printableCert.purpose}
            </p>
            <div className="pt-4 border-t border-line flex flex-wrap items-center justify-between gap-4 text-xs text-muted">
              <span>
                No-Dues Status — Accounts: {printableCert.accountsCleared ? "Cleared" : "Due"} · Library:{" "}
                {printableCert.libraryCleared ? "Cleared" : "Pending"} · Computer Lab:{" "}
                {printableCert.labCleared ? "Cleared" : "Pending"}
              </span>
              <span className="font-semibold text-navy-900">Authorised Signatory · Office of the Principal</span>
            </div>
          </section>
        ) : null}
      </div>
    </PortalShell>
  );
}

