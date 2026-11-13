import Link from "next/link";
import { Icons } from "@/components/icons";
import { PortalShell } from "@/components/portal-shell";
import { ResultTranscriptPrintButton } from "@/components/portal-student-ops";
import { requireStudentContext } from "@/lib/portal-guards";

export const dynamic = "force-dynamic";

export default async function StudentResultsPage() {
  const { session, snapshot } = await requireStudentContext();
  const { student, results, cgpa } = snapshot;
  const backPapers = results.filter((r) => r.resultStatus === "Back Paper" && r.backPaperCodes);

  return (
    <PortalShell
      session={session}
      mode="student"
      subtitle={`${student.course} · Semester Results, SGPA / CGPA & Back-Paper Record`}
    >
      <div className="space-y-8">
        <div className="card-line p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <p className="eyebrow">Cumulative CGPA</p>
              <p className="stat-numeral text-3xl text-navy-900 mt-1">{cgpa}</p>
            </div>
            <div className="border-l border-line pl-6">
              <p className="eyebrow">Semesters Declared</p>
              <p className="stat-numeral text-3xl text-navy-900 mt-1">{results.length}</p>
            </div>
            <div className="border-l border-line pl-6">
              <p className="eyebrow">Back-Paper Status</p>
              <p className={`text-sm font-bold mt-2 ${backPapers.length > 0 ? "text-destructive" : "text-navy-900"}`}>
                {backPapers.length > 0 ? `${backPapers.length} Semester(s) Flagged` : "All Cleared"}
              </p>
            </div>
          </div>
          <ResultTranscriptPrintButton />
        </div>

        {backPapers.length > 0 ? (
          <div className="rounded-xl border border-destructive/40 bg-white p-5 flex items-start gap-3">
            <Icons.AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-semibold text-navy-900 text-sm">Active Back-Paper Registration Notice</p>
              <ul className="mt-1 text-xs text-muted space-y-1">
                {backPapers.map((bp) => (
                  <li key={bp.id}>
                    Semester {bp.semester} ({bp.academicYear}):{" "}
                    <strong className="text-destructive">{bp.backPaperCodes}</strong> — Contact Exam Cell for supplementary form submission.
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}

        {results.length === 0 ? (
          <div className="card-line p-6 text-sm text-muted">
            No declared university semester results recorded yet for Semester 1–{student.semester}.
          </div>
        ) : (
          <div className="space-y-6">
            {results.map((res) => (
              <section key={res.id} className="rounded-xl border-2 border-navy-900 bg-white p-6 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-line">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gold-700">
                      {student.course} · Semester {res.semester} ({res.academicYear})
                    </p>
                    <h2 className="font-display text-xl font-semibold text-navy-900 mt-0.5">
                      Provisional Statement of Marks · {student.fullName}
                    </h2>
                    <p className="text-xs text-muted">
                      Roll No. {student.universityRollNo} · Credits Earned: {res.creditsEarned}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="stat-numeral text-2xl text-navy-900">SGPA {res.sgpa}</p>
                    <span className={`inline-block mt-1 rounded px-2 py-0.5 text-xs font-bold uppercase ${res.resultStatus === "Back Paper" ? "bg-destructive/10 text-destructive" : "bg-navy-900 text-gold-300"}`}>
                      {res.resultStatus}
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="table-msitm min-w-[600px]">
                    <thead>
                      <tr>
                        <th scope="col">Code</th>
                        <th scope="col">Subject Title</th>
                        <th scope="col">Theory</th>
                        <th scope="col">Internal</th>
                        <th scope="col">Total</th>
                        <th scope="col">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {res.subjectGrades.map((sg) => (
                        <tr key={sg.code}>
                          <td className="font-mono text-xs font-bold text-navy-900">{sg.code}</td>
                          <td>{sg.name}</td>
                          <td>{sg.theoryMarks}</td>
                          <td>{sg.internalMarks}</td>
                          <td className="font-semibold text-navy-900">
                            {sg.theoryMarks + sg.internalMarks} / {sg.maxMarks}
                          </td>
                          <td className="font-bold text-navy-900">{sg.grade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
                  <span>Declared: {new Date(res.declaredAt).toLocaleDateString("en-IN")}</span>
                  <Link href={`/verify/${res.verificationToken}`} className="font-mono font-bold text-navy-900 link-underline print-hidden">
                    Verify Transcript ({res.verificationToken})
                  </Link>
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </PortalShell>
  );
}

