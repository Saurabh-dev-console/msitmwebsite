import Link from "next/link";
import { Icons } from "@/components/icons";
import { PortalShell } from "@/components/portal-shell";
import { LabAndGrievanceForms, PlacementDriveList } from "@/components/portal-student-ops";
import { requireStudentContext } from "@/lib/portal-guards";

export const dynamic = "force-dynamic";

export default async function StudentCampusDeskPage() {
  const { session, snapshot } = await requireStudentContext();
  const { student, libraryIssues, libraryCleared, labTickets, grievances } = snapshot;

  return (
    <PortalShell
      session={session}
      mode="student"
      subtitle={`${student.course} · Library Circulation, Computer Lab Support & Grievance Redressal`}
    >
      <div className="space-y-8">
        <div className="card-line p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <span className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${libraryCleared ? "bg-navy-900 text-gold-300" : "bg-destructive/10 text-destructive"}`}>
              <Icons.BookOpen className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="eyebrow">Library No-Dues Status</p>
              <h2 className="font-display text-xl font-semibold text-navy-900 mt-0.5">
                {libraryCleared ? "Library Account Cleared" : "Overdue Library Book / Fine Pending"}
              </h2>
              <p className="text-xs text-muted mt-1">
                {libraryCleared
                  ? "Automatic Library No-Dues clearance is active for your Bonafide & Transfer Certificate requests."
                  : "Please return overdue textbook(s) and settle library fine at the Circulation Counter to unlock Certificate No-Dues."}
              </p>
            </div>
          </div>
          <Link href="/portal/certificates" className="btn btn-outline-dark btn-sm">
            Certificate &amp; No-Dues Status
          </Link>
        </div>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-navy-900">Your Issued Library Books</h2>
          <div className="overflow-x-auto border border-line rounded-xl bg-white">
            <table className="table-msitm min-w-[680px]">
              <thead>
                <tr>
                  <th scope="col">Accession No.</th>
                  <th scope="col">Book Title &amp; Author</th>
                  <th scope="col">Issued</th>
                  <th scope="col">Due Date</th>
                  <th scope="col">Fine / Status</th>
                </tr>
              </thead>
              <tbody>
                {libraryIssues.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-muted py-6">
                      No books currently issued from the Central Library.
                    </td>
                  </tr>
                ) : (
                  libraryIssues.map((b) => (
                    <tr key={b.id}>
                      <td className="font-mono text-xs font-bold text-navy-900">{b.accessionNo}</td>
                      <td>
                        <p className="font-medium text-navy-900">{b.bookTitle}</p>
                        <p className="text-xs text-muted">{b.author}</p>
                      </td>
                      <td className="text-xs">{b.issuedDate}</td>
                      <td className="text-xs">{b.dueDate}</td>
                      <td>
                        <span className={`rounded px-2 py-0.5 text-xs font-bold uppercase ${b.status === "overdue" ? "bg-destructive/10 text-destructive" : "bg-navy-50 text-navy-900"}`}>
                          {b.status}
                        </span>
                        {b.fineAmount > 0 ? <span className="ml-2 text-xs font-bold text-destructive">₹{b.fineAmount}</span> : null}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <LabAndGrievanceForms />

        <PlacementDriveList drives={snapshot.placementDrives} studentId={student.id} />

        <div className="grid lg:grid-cols-2 gap-6">
          <section className="card-line p-6 space-y-3">
            <h2 className="font-display text-xl font-semibold text-navy-900">Computer Lab Support Log</h2>
            <ul className="divide-y divide-line text-sm">
              {labTickets.slice(0, 5).map((t) => (
                <li key={t.id} className="py-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-navy-900">
                      {t.workstationCode} · {t.labName}
                    </span>
                    <span className="text-xs font-bold uppercase text-gold-700">{t.status.replace("_", " ")}</span>
                  </div>
                  <p className="text-xs text-muted mt-1">{t.description}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="card-line p-6 space-y-3">
            <h2 className="font-display text-xl font-semibold text-navy-900">Your Registered Grievances</h2>
            {grievances.length === 0 ? (
              <p className="text-sm text-muted">No grievances filed by you.</p>
            ) : (
              <ul className="divide-y divide-line text-sm">
                {grievances.map((g) => (
                  <li key={g.id} className="py-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-navy-900">
                        {g.ticketCode} · {g.subject}
                      </span>
                      <span className="text-xs font-bold uppercase text-gold-700">{g.status.replace("_", " ")}</span>
                    </div>
                    <p className="text-xs text-muted mt-1">{g.category}</p>
                    {g.actionTaken ? <p className="text-xs text-navy-900 mt-1">Committee Action: {g.actionTaken}</p> : null}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </PortalShell>
  );
}

