import Link from "next/link";
import { PortalShell } from "@/components/portal-shell";
import { AssignmentSubmissionList } from "@/components/portal-student-ops";
import { requireStudentContext } from "@/lib/portal-guards";

export const dynamic = "force-dynamic";

export default async function StudentAcademicsPage() {
  const { session, snapshot } = await requireStudentContext();
  const { student, attendance, overallAttendancePct, timetable, assignments } = snapshot;

  return (
    <PortalShell
      session={session}
      mode="student"
      subtitle={`${student.course} · Semester ${student.semester} Timetable, Attendance & Lab Work`}
    >
      <div className="space-y-8">
        <div className="card-line p-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Overall Attendance</p>
            <p className={`stat-numeral text-3xl mt-1 ${overallAttendancePct >= 75 ? "text-navy-900" : "text-destructive"}`}>
              {overallAttendancePct}%
            </p>
            <p className="text-sm text-muted mt-1">
              Includes approved medical leaves. Minimum 75% required for University Admit Card release.
            </p>
          </div>
          <Link
            href={`/courses/undergraduate-courses/${student.course.toLowerCase()}`}
            className="btn btn-outline-dark btn-sm"
          >
            View {student.course} Sem I–VI Curriculum
          </Link>
        </div>

        <div className="overflow-x-auto border border-line rounded-xl bg-white">
          <table className="table-msitm min-w-[680px]">
            <thead>
              <tr>
                <th scope="col">Code</th>
                <th scope="col">Subject</th>
                <th scope="col">Attended / Total</th>
                <th scope="col">Medical Leaves</th>
                <th scope="col">Attendance %</th>
                <th scope="col">Internal Marks</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((row) => {
                const pct =
                  row.totalClasses > 0
                    ? Math.min(100, Math.round(((row.attendedClasses + row.medicalLeaves) / row.totalClasses) * 100))
                    : 0;
                return (
                  <tr key={row.id}>
                    <td className="font-mono text-xs font-bold text-navy-900">{row.subjectCode}</td>
                    <td>{row.subjectName}</td>
                    <td>{row.attendedClasses} / {row.totalClasses}</td>
                    <td>{row.medicalLeaves}</td>
                    <td className={`font-bold ${pct >= 75 ? "text-navy-900" : "text-destructive"}`}>{pct}%</td>
                    <td className="font-semibold">
                      {row.internalMarks} / {row.maxInternalMarks}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <section className="space-y-3">
          <div>
            <p className="eyebrow">Weekly Class &amp; Computer Lab Routine</p>
            <h2 className="font-display text-xl font-semibold text-navy-900 mt-1">
              {student.course} Semester {student.semester} Timetable (Mon – Sat)
            </h2>
          </div>
          <div className="overflow-x-auto border border-line rounded-xl bg-white">
            <table className="table-msitm min-w-[680px]">
              <thead>
                <tr>
                  <th scope="col">Day</th>
                  <th scope="col">Time</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Room / Lab</th>
                  <th scope="col">Faculty</th>
                </tr>
              </thead>
              <tbody>
                {timetable.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-muted py-6">
                      Weekly timetable for {student.course} Semester {student.semester} will be updated shortly.
                    </td>
                  </tr>
                ) : (
                  timetable.map((slot) => (
                    <tr key={slot.id}>
                      <td className="font-mono text-xs font-bold text-navy-900">{slot.dayOfWeek}</td>
                      <td className="text-xs font-semibold text-navy-900">{slot.slotTime}</td>
                      <td>
                        <span className="font-mono text-xs text-gold-700 font-bold mr-1.5">{slot.subjectCode}</span>
                        {slot.subjectName}
                      </td>
                      <td>{slot.roomOrLab}</td>
                      <td className="text-sm text-muted">{slot.facultyName}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-3">
          <div>
            <p className="eyebrow">Coursework &amp; Submissions</p>
            <h2 className="font-display text-xl font-semibold text-navy-900 mt-1">
              Assignments, {student.course === "BCA" ? "Practical Files" : "Internship Surveys"} &amp; Study Notes
            </h2>
          </div>
          <AssignmentSubmissionList assignments={assignments} />
        </section>
      </div>
    </PortalShell>
  );
}

