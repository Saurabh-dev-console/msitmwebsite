"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";
import type {
  AssignmentRecord,
  AssignmentSubmissionRecord,
  FacultyAllocationRecord,
  GrievanceRecord,
  LabTicketRecord,
  LibraryIssueRecord,
  SemesterResultRecord,
  StaffLeaveRecord,
  StudentPortalSnapshot,
} from "@/lib/portal-types";

export function SemesterResultManager({
  snapshots,
  results,
}: {
  snapshots: StudentPortalSnapshot[];
  results: SemesterResultRecord[];
}) {
  const router = useRouter();
  const [studentId, setStudentId] = useState(snapshots[0]?.student.id ?? 1);
  const [semester, setSemester] = useState(snapshots[0]?.student.semester ?? 4);
  const [academicYear, setAcademicYear] = useState("2026–27");
  const [sgpa, setSgpa] = useState("8.20");
  const [creditsEarned, setCreditsEarned] = useState("24");
  const [resultStatus, setResultStatus] = useState<SemesterResultRecord["resultStatus"]>("Pass");
  const [backPaperCodes, setBackPaperCodes] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const studentById = new Map(snapshots.map((s) => [s.student.id, s.student]));

  async function publishResult(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    try {
      const res = await fetch("/api/portal/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          semester,
          academicYear,
          sgpa,
          creditsEarned: Number(creditsEarned),
          resultStatus,
          backPaperCodes,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data.error ?? "Failed to update result.");
      } else {
        setMsg(`Published Result (${data.result.verificationToken}) for Semester ${data.result.semester}.`);
        router.refresh();
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="space-y-6">
      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6">
        <form onSubmit={publishResult} className="card-line p-6 space-y-4">
          <h2 className="font-display text-xl font-semibold text-navy-900">Publish / Update Semester Result</h2>
          {msg ? <p role="status" className="text-sm font-semibold text-navy-900">{msg}</p> : null}
          <div>
            <label htmlFor="res-stu" className="field-label">Student</label>
            <select id="res-stu" className="field-select" value={studentId} onChange={(e) => setStudentId(Number(e.target.value))}>
              {snapshots.map((s) => (
                <option key={s.student.id} value={s.student.id}>
                  {s.student.fullName} ({s.student.course} Sem {s.student.semester})
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="res-sem" className="field-label">Sem</label>
              <select id="res-sem" className="field-select" value={semester} onChange={(e) => setSemester(Number(e.target.value))}>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>Sem {n}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="res-sgpa" className="field-label">SGPA</label>
              <input id="res-sgpa" required className="field-input" value={sgpa} onChange={(e) => setSgpa(e.target.value)} />
            </div>
            <div>
              <label htmlFor="res-cred" className="field-label">Credits</label>
              <input id="res-cred" type="number" className="field-input" value={creditsEarned} onChange={(e) => setCreditsEarned(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="res-yr" className="field-label">Session</label>
              <input id="res-yr" className="field-input" value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} />
            </div>
            <div>
              <label htmlFor="res-stat" className="field-label">Result Status</label>
              <select id="res-stat" className="field-select" value={resultStatus} onChange={(e) => setResultStatus(e.target.value as typeof resultStatus)}>
                <option value="Pass">Pass</option>
                <option value="Pass with Grace">Pass with Grace</option>
                <option value="Back Paper">Back Paper</option>
                <option value="Result Awaited">Result Awaited</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="res-back" className="field-label">Back Paper Subject Codes (if any)</label>
            <input id="res-back" className="field-input" placeholder="e.g., BBA-104" value={backPaperCodes} onChange={(e) => setBackPaperCodes(e.target.value)} />
          </div>
          <button type="submit" disabled={busy} className="btn btn-navy w-full">
            {busy ? "Publishing…" : "Save Official Semester Result"}
          </button>
        </form>

        <div className="overflow-x-auto border border-line rounded-xl bg-white">
          <table className="table-msitm min-w-[600px]">
            <thead>
              <tr>
                <th scope="col">Student</th>
                <th scope="col">Semester</th>
                <th scope="col">SGPA</th>
                <th scope="col">Status</th>
                <th scope="col">Verify / Del</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => {
                const st = studentById.get(r.studentId);
                return (
                  <tr key={r.id}>
                    <td className="font-semibold text-navy-900">
                      {st?.fullName ?? `ID ${r.studentId}`}
                      <span className="block text-xs text-muted">{st?.course} · {r.academicYear}</span>
                    </td>
                    <td>Sem {r.semester}</td>
                    <td className="font-mono font-bold text-navy-900">{r.sgpa}</td>
                    <td>
                      <span className={`rounded px-2 py-0.5 text-xs font-bold uppercase ${r.resultStatus === "Back Paper" ? "bg-destructive/10 text-destructive" : "bg-navy-50 text-navy-900"}`}>
                        {r.resultStatus}
                      </span>
                      {r.backPaperCodes ? <p className="text-[11px] text-destructive mt-0.5">{r.backPaperCodes}</p> : null}
                    </td>
                    <td>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs">{r.verificationToken}</span>
                        <button
                          type="button"
                          onClick={async () => {
                            await fetch(`/api/portal/results?resultId=${r.id}`, { method: "DELETE" });
                            router.refresh();
                          }}
                          className="text-destructive"
                          aria-label={`Delete result ${r.verificationToken}`}
                        >
                          <Icons.Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function FacultyOpsManager({
  allocations,
  assignments,
  submissions,
  leaves,
  snapshots,
  isAdmin,
}: {
  allocations: FacultyAllocationRecord[];
  assignments: AssignmentRecord[];
  submissions: AssignmentSubmissionRecord[];
  leaves: StaffLeaveRecord[];
  snapshots: StudentPortalSnapshot[];
  isAdmin: boolean;
}) {
  const router = useRouter();
  const [course, setCourse] = useState<"BCA" | "BBA">("BCA");
  const [semester, setSemester] = useState(4);
  const [kind, setKind] = useState<AssignmentRecord["kind"]>("BCA Practical");
  const [subjectCode, setSubjectCode] = useState("BCA-405");
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("2026-12-02");
  const [instructions, setInstructions] = useState("");
  const [taskMsg, setTaskMsg] = useState("");

  const [leaveType, setLeaveType] = useState<StaffLeaveRecord["leaveType"]>("Casual");
  const [fromDate, setFromDate] = useState("2026-11-18");
  const [substituteFaculty, setSubstituteFaculty] = useState("Dr. R. K. Shukla");
  const [leaveReason, setLeaveReason] = useState("");
  const [leaveMsg, setLeaveMsg] = useState("");

  const studentById = new Map(snapshots.map((s) => [s.student.id, s.student]));
  const assignmentById = new Map(assignments.map((a) => [a.id, a]));

  async function updateSyllabus(allocationId: number, nextPct: number) {
    await fetch("/api/portal/learning", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "syllabus", allocationId, syllabusPct: nextPct, lastTopicCovered: "" }),
    });
    router.refresh();
  }

  async function createTask(e: FormEvent) {
    e.preventDefault();
    setTaskMsg("");
    const res = await fetch("/api/portal/learning", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ course, semester, subjectCode, title, kind, dueDate, instructions }),
    });
    if (res.ok) {
      setTaskMsg("Assignment / Practical task published to student portals.");
      setTitle("");
      setInstructions("");
      router.refresh();
    }
  }

  async function gradeSubmission(submissionId: number, marksAwarded: number) {
    await fetch("/api/portal/learning", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "evaluate", submissionId, marksAwarded, feedback: "Verified by subject faculty." }),
    });
    router.refresh();
  }

  async function submitStaffLeave(e: FormEvent) {
    e.preventDefault();
    setLeaveMsg("");
    const res = await fetch("/api/portal/learning", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "leave_request",
        leaveType,
        fromDate,
        toDate: fromDate,
        substituteFaculty,
        reason: leaveReason,
      }),
    });
    if (res.ok) {
      setLeaveMsg("Staff leave logged with substitute allocation.");
      setLeaveReason("");
      router.refresh();
    }
  }

  async function decideLeave(leaveId: number, status: "approved" | "rejected") {
    await fetch("/api/portal/learning", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "review_leave", leaveId, status }),
    });
    router.refresh();
  }

  return (
    <div className="space-y-8 pt-4 border-t border-line">
      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold text-navy-900">Faculty Subject Allocation &amp; Syllabus Tracker</h2>
        <div className="overflow-x-auto border border-line rounded-xl bg-white">
          <table className="table-msitm min-w-[780px]">
            <thead>
              <tr>
                <th scope="col">Faculty</th>
                <th scope="col">Course / Subject</th>
                <th scope="col">Timetable Slot</th>
                <th scope="col">Last Topic Covered</th>
                <th scope="col">Completion</th>
              </tr>
            </thead>
            <tbody>
              {allocations.map((f) => (
                <tr key={f.id}>
                  <td className="font-semibold text-navy-900">
                    {f.facultyName}
                    <span className="block text-xs text-muted">{f.department}</span>
                  </td>
                  <td>{f.course} Sem {f.semester} · {f.subjectCode} ({f.subjectName})</td>
                  <td className="text-xs">{f.timetableSlot}</td>
                  <td className="text-xs text-muted">{f.lastTopicCovered}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-navy-900">{f.syllabusPct}%</span>
                      <button type="button" onClick={() => void updateSyllabus(f.id, Math.min(100, f.syllabusPct + 5))} className="btn btn-outline-dark btn-sm">
                        +5%
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          await fetch(`/api/portal/academics?facultyId=${f.id}`, { method: "DELETE" });
                          router.refresh();
                        }}
                        className="text-destructive"
                        aria-label={`Remove ${f.subjectCode}`}
                      >
                        <Icons.Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {assignments.length > 0 ? (
          <div className="card-line p-5 space-y-2">
            <p className="eyebrow">Published Assignments, Practicals &amp; Notes ({assignments.length})</p>
            <ul className="divide-y divide-line text-xs">
              {assignments.map((a) => (
                <li key={a.id} className="py-2 flex items-center justify-between gap-2">
                  <span className="font-medium text-navy-900">
                    [{a.course} S{a.semester} · {a.kind}] {a.subjectCode} — {a.title} (Due {a.dueDate})
                  </span>
                  <button
                    type="button"
                    onClick={async () => {
                      await fetch(`/api/portal/learning?assignmentId=${a.id}`, { method: "DELETE" });
                      router.refresh();
                    }}
                    className="text-destructive shrink-0"
                    aria-label={`Delete ${a.title}`}
                  >
                    <Icons.Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      <section className="grid lg:grid-cols-2 gap-6">
        <form onSubmit={createTask} className="card-line p-6 space-y-4">
          <h2 className="font-display text-xl font-semibold text-navy-900">Publish Assignment / Practical / Study Notes</h2>
          {taskMsg ? <p role="status" className="text-sm font-semibold text-navy-900">{taskMsg}</p> : null}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="t-course" className="field-label">Course</label>
              <select id="t-course" className="field-select" value={course} onChange={(e) => setCourse(e.target.value as "BCA" | "BBA")}>
                <option value="BCA">BCA</option>
                <option value="BBA">BBA</option>
              </select>
            </div>
            <div>
              <label htmlFor="t-sem" className="field-label">Sem</label>
              <select id="t-sem" className="field-select" value={semester} onChange={(e) => setSemester(Number(e.target.value))}>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>Sem {n}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="t-kind" className="field-label">Type</label>
              <select id="t-kind" className="field-select" value={kind} onChange={(e) => setKind(e.target.value as typeof kind)}>
                <option value="BCA Practical">BCA Practical</option>
                <option value="BBA Internship">BBA Internship</option>
                <option value="Assignment">Assignment</option>
                <option value="Study Notes">Study Notes</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="t-code" className="field-label">Subject Code</label>
              <input id="t-code" className="field-input" value={subjectCode} onChange={(e) => setSubjectCode(e.target.value)} />
            </div>
            <div>
              <label htmlFor="t-due" className="field-label">Due Date</label>
              <input id="t-due" type="date" className="field-input" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
          </div>
          <div>
            <label htmlFor="t-title" className="field-label">Title *</label>
            <input id="t-title" required className="field-input" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label htmlFor="t-inst" className="field-label">Instructions *</label>
            <textarea id="t-inst" required className="field-textarea" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-navy">Publish to Students</button>
        </form>

        <div className="card-line p-6 space-y-4">
          <h2 className="font-display text-xl font-semibold text-navy-900">Student Practical &amp; Internship Submissions</h2>
          <ul className="divide-y divide-line">
            {submissions.map((sub) => {
              const st = studentById.get(sub.studentId);
              const task = assignmentById.get(sub.assignmentId);
              return (
                <li key={sub.id} className="py-3 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-navy-900 text-sm">
                      {st?.fullName} — {task?.title ?? `Task #${sub.assignmentId}`}
                    </p>
                    {sub.status === "evaluated" ? (
                      <span className="rounded bg-navy-900 text-gold-300 px-2 py-0.5 text-xs font-bold">
                        {sub.marksAwarded}/{sub.maxMarks}
                      </span>
                    ) : (
                      <button type="button" onClick={() => void gradeSubmission(sub.id, 22)} className="btn btn-navy btn-sm">
                        Award 22/25
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-muted">{sub.attachmentRef} · {sub.submissionNote}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-6">
        <form onSubmit={submitStaffLeave} className="card-line p-6 space-y-4">
          <h2 className="font-display text-xl font-semibold text-navy-900">Faculty Leave &amp; Substitute Arrangement</h2>
          {leaveMsg ? <p role="status" className="text-sm font-semibold text-navy-900">{leaveMsg}</p> : null}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="sl-type" className="field-label">Leave Type</label>
              <select id="sl-type" className="field-select" value={leaveType} onChange={(e) => setLeaveType(e.target.value as typeof leaveType)}>
                <option value="Casual">Casual</option>
                <option value="Medical">Medical</option>
                <option value="Duty">University Duty</option>
              </select>
            </div>
            <div>
              <label htmlFor="sl-date" className="field-label">Date</label>
              <input id="sl-date" type="date" className="field-input" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            </div>
          </div>
          <div>
            <label htmlFor="sl-sub" className="field-label">Substitute Faculty</label>
            <input id="sl-sub" className="field-input" value={substituteFaculty} onChange={(e) => setSubstituteFaculty(e.target.value)} />
          </div>
          <div>
            <label htmlFor="sl-reason" className="field-label">Reason *</label>
            <input id="sl-reason" required className="field-input" value={leaveReason} onChange={(e) => setLeaveReason(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-navy">Submit Staff Leave</button>
        </form>

        <div className="card-line p-6 space-y-4">
          <h2 className="font-display text-xl font-semibold text-navy-900">Staff Leave &amp; Substitution Log</h2>
          <ul className="divide-y divide-line">
            {leaves.map((l) => (
              <li key={l.id} className="py-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-navy-900 text-sm">
                    {l.facultyName} ({l.leaveType}) · {l.fromDate}
                  </p>
                  <p className="text-xs text-muted">
                    {l.reason} · Substitute: {l.substituteFaculty}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase text-gold-700">{l.status}</span>
                  {isAdmin && l.status === "pending" ? (
                    <>
                      <button type="button" onClick={() => void decideLeave(l.id, "approved")} className="btn btn-navy btn-sm">Approve</button>
                      <button type="button" onClick={() => void decideLeave(l.id, "rejected")} className="btn btn-outline-dark btn-sm">Reject</button>
                    </>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export function CampusOpsManager({
  snapshots,
  libraryIssues,
  labTickets,
  grievances,
}: {
  snapshots: StudentPortalSnapshot[];
  libraryIssues: LibraryIssueRecord[];
  labTickets: LabTicketRecord[];
  grievances: GrievanceRecord[];
}) {
  const router = useRouter();
  const [studentId, setStudentId] = useState(snapshots[0]?.student.id ?? 1);
  const [accessionNo, setAccessionNo] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [dueDate, setDueDate] = useState("2026-12-10");
  const [libMsg, setLibMsg] = useState("");
  const studentById = new Map(snapshots.map((s) => [s.student.id, s.student]));

  async function issueBook(e: FormEvent) {
    e.preventDefault();
    setLibMsg("");
    const res = await fetch("/api/portal/campus-ops", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "issue_book", studentId, accessionNo, bookTitle, author, dueDate }),
    });
    if (res.ok) {
      setLibMsg("Library book issued cleanly.");
      setAccessionNo("");
      setBookTitle("");
      setAuthor("");
      router.refresh();
    }
  }

  async function markBookReturned(issueId: number) {
    await fetch("/api/portal/campus-ops", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "update_book", issueId, status: "returned", fineAmount: 0 }),
    });
    router.refresh();
  }

  async function updateLab(ticketId: number, status: LabTicketRecord["status"], resolutionNote: string) {
    await fetch("/api/portal/campus-ops", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "update_lab", ticketId, status, resolutionNote }),
    });
    router.refresh();
  }

  async function resolveGrv(grievanceId: number) {
    await fetch("/api/portal/campus-ops", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "resolve_grievance",
        grievanceId,
        status: "resolved",
        actionTaken: "Reviewed & resolved by MSITM Grievance / IQAC Committee.",
      }),
    });
    router.refresh();
  }

  return (
    <div className="space-y-8">
      <section className="grid lg:grid-cols-[1fr_1.4fr] gap-6">
        <form onSubmit={issueBook} className="card-line p-6 space-y-4">
          <h2 className="font-display text-xl font-semibold text-navy-900">Issue Library Book</h2>
          {libMsg ? <p role="status" className="text-sm font-semibold text-navy-900">{libMsg}</p> : null}
          <div>
            <label htmlFor="lib-stu" className="field-label">Student</label>
            <select id="lib-stu" className="field-select" value={studentId} onChange={(e) => setStudentId(Number(e.target.value))}>
              {snapshots.map((s) => (
                <option key={s.student.id} value={s.student.id}>
                  {s.student.fullName} ({s.student.course} Sem {s.student.semester})
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="lib-acc" className="field-label">Accession No. *</label>
              <input id="lib-acc" required className="field-input" placeholder="LIB-CS-5420" value={accessionNo} onChange={(e) => setAccessionNo(e.target.value)} />
            </div>
            <div>
              <label htmlFor="lib-due" className="field-label">Return Due Date</label>
              <input id="lib-due" type="date" className="field-input" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
          </div>
          <div>
            <label htmlFor="lib-title" className="field-label">Book Title *</label>
            <input id="lib-title" required className="field-input" value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} />
          </div>
          <div>
            <label htmlFor="lib-auth" className="field-label">Author</label>
            <input id="lib-auth" className="field-input" value={author} onChange={(e) => setAuthor(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-navy w-full">Record Book Issue</button>
        </form>

        <div className="overflow-x-auto border border-line rounded-xl bg-white">
          <table className="table-msitm min-w-[640px]">
            <thead>
              <tr>
                <th scope="col">Accession &amp; Book</th>
                <th scope="col">Student</th>
                <th scope="col">Due Date</th>
                <th scope="col">Fine / Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {libraryIssues.map((b) => {
                const st = studentById.get(b.studentId);
                return (
                  <tr key={b.id}>
                    <td>
                      <p className="font-mono text-xs font-bold text-navy-900">{b.accessionNo}</p>
                      <p className="text-sm font-medium text-navy-900">{b.bookTitle}</p>
                    </td>
                    <td className="text-sm">{st?.fullName ?? `ID ${b.studentId}`}</td>
                    <td className="text-xs">{b.dueDate}</td>
                    <td>
                      <span className={`rounded px-2 py-0.5 text-xs font-bold uppercase ${b.status === "overdue" ? "bg-destructive/10 text-destructive" : "bg-navy-50 text-navy-900"}`}>
                        {b.status}
                      </span>
                      {b.fineAmount > 0 ? <p className="text-xs font-bold text-destructive mt-0.5">₹{b.fineAmount} fine</p> : null}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        {b.status !== "returned" ? (
                          <button type="button" onClick={() => void markBookReturned(b.id)} className="btn btn-navy btn-sm">
                            Return &amp; Clear
                          </button>
                        ) : (
                          <span className="text-xs text-muted">Cleared ({b.returnedDate})</span>
                        )}
                        <button
                          type="button"
                          onClick={async () => {
                            await fetch(`/api/portal/campus-ops?bookId=${b.id}`, { method: "DELETE" });
                            router.refresh();
                          }}
                          className="text-destructive"
                          aria-label={`Delete ${b.accessionNo}`}
                        >
                          <Icons.Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-6">
        <div className="card-line p-6 space-y-4">
          <h2 className="font-display text-xl font-semibold text-navy-900">Computer Lab 250+ Systems Ticket Queue</h2>
          <ul className="divide-y divide-line">
            {labTickets.map((t) => (
              <li key={t.id} className="py-3 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-navy-900 text-sm">
                    {t.workstationCode} · {t.labName} ({t.priority})
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase text-gold-700">{t.status.replace("_", " ")}</span>
                    {t.status !== "resolved" ? (
                      <button
                        type="button"
                        onClick={() => void updateLab(t.id, "resolved", "Serviced and verified by Lab Hardware Wing.")}
                        className="btn btn-navy btn-sm"
                      >
                        Resolve
                      </button>
                    ) : null}
                    <button
                      type="button"
                      onClick={async () => {
                        await fetch(`/api/portal/campus-ops?ticketId=${t.id}`, { method: "DELETE" });
                        router.refresh();
                      }}
                      className="text-destructive"
                      aria-label={`Delete ${t.workstationCode}`}
                    >
                      <Icons.Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-muted">{t.category}: {t.description} (Reported by {t.reportedBy})</p>
                {t.resolutionNote ? <p className="text-xs text-navy-900">Note: {t.resolutionNote}</p> : null}
              </li>
            ))}
          </ul>
        </div>

        <div className="card-line p-6 space-y-4">
          <h2 className="font-display text-xl font-semibold text-navy-900">Student Grievance &amp; Anti-Ragging Queue</h2>
          <ul className="divide-y divide-line">
            {grievances.map((g) => {
              const st = studentById.get(g.studentId);
              return (
                <li key={g.id} className="py-3 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-navy-900 text-sm">
                      {g.ticketCode} · {g.subject}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase text-gold-700">{g.status.replace("_", " ")}</span>
                      {g.status !== "resolved" ? (
                        <button type="button" onClick={() => void resolveGrv(g.id)} className="btn btn-navy btn-sm">
                          Mark Resolved
                        </button>
                      ) : null}
                    </div>
                  </div>
                  <p className="text-xs text-muted">
                    {g.category} · {g.isAnonymous ? "Confidential / Identity Protected" : st?.fullName} — {g.details}
                  </p>
                  {g.actionTaken ? <p className="text-xs text-navy-900">Action: {g.actionTaken}</p> : null}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}

