"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";
import type {
  ExamSessionRecord,
  FeeStructureRecord,
  PlacementDriveRecord,
  StudentPortalSnapshot,
  TimetableSlotRecord,
} from "@/lib/portal-types";

export function FeeStructureManager({ structures }: { structures: FeeStructureRecord[] }) {
  const router = useRouter();
  const [course, setCourse] = useState<"BCA" | "BBA">("BCA");
  const [semester, setSemester] = useState("1");
  const [academicYear, setAcademicYear] = useState("2026–27");
  const [tuitionFee, setTuitionFee] = useState("14500");
  const [labFee, setLabFee] = useState("3000");
  const [examFee, setExamFee] = useState("2000");
  const [libraryFee, setLibraryFee] = useState("500");
  const [dueDate, setDueDate] = useState("2026-11-30");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const previewTotal =
    (Number(tuitionFee) || 0) +
    (Number(labFee) || 0) +
    (Number(examFee) || 0) +
    (Number(libraryFee) || 0);

  function loadForEdit(fs: FeeStructureRecord) {
    setCourse(fs.course);
    setSemester(String(fs.semester));
    setAcademicYear(fs.academicYear);
    setTuitionFee(String(fs.tuitionFee));
    setLabFee(String(fs.labFee));
    setExamFee(String(fs.examFee));
    setLibraryFee(String(fs.libraryFee));
    setDueDate(fs.dueDate);
  }

  async function saveStructure(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    try {
      const res = await fetch("/api/portal/fees", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          course,
          semester: Number(semester),
          academicYear,
          tuitionFee: Number(tuitionFee),
          labFee: Number(labFee),
          examFee: Number(examFee),
          libraryFee: Number(libraryFee),
          dueDate,
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setMsg(`Saved fee structure for ${data.structure.course} Sem ${data.structure.semester} (₹${data.structure.totalFee.toLocaleString("en-IN")}).`);
        router.refresh();
      }
    } finally {
      setBusy(false);
    }
  }

  async function removeStructure(id: number) {
    await fetch(`/api/portal/fees?structureId=${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <section className="grid lg:grid-cols-[1fr_1.35fr] gap-6">
      <form onSubmit={saveStructure} className="card-line p-6 space-y-4">
        <div>
          <p className="eyebrow">Admin Fee Control</p>
          <h2 className="font-display text-xl font-semibold text-navy-900 mt-1">
            Configure Semester Fee Structure
          </h2>
        </div>
        {msg ? <p role="status" className="text-sm font-semibold text-navy-900">{msg}</p> : null}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label htmlFor="fs-course" className="field-label">Course</label>
            <select id="fs-course" className="field-select" value={course} onChange={(e) => setCourse(e.target.value as "BCA" | "BBA")}>
              <option value="BCA">BCA</option>
              <option value="BBA">BBA</option>
            </select>
          </div>
          <div>
            <label htmlFor="fs-sem" className="field-label">Semester</label>
            <select id="fs-sem" className="field-select" value={semester} onChange={(e) => setSemester(e.target.value)}>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>Sem {n}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="fs-yr" className="field-label">Session</label>
            <input id="fs-yr" className="field-input" value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="fs-tut" className="field-label">Tuition Fee (₹)</label>
            <input id="fs-tut" type="number" className="field-input" value={tuitionFee} onChange={(e) => setTuitionFee(e.target.value)} />
          </div>
          <div>
            <label htmlFor="fs-lab" className="field-label">Computer / Lab Fee (₹)</label>
            <input id="fs-lab" type="number" className="field-input" value={labFee} onChange={(e) => setLabFee(e.target.value)} />
          </div>
          <div>
            <label htmlFor="fs-exm" className="field-label">Exam Fee (₹)</label>
            <input id="fs-exm" type="number" className="field-input" value={examFee} onChange={(e) => setExamFee(e.target.value)} />
          </div>
          <div>
            <label htmlFor="fs-lib" className="field-label">Library Fee (₹)</label>
            <input id="fs-lib" type="number" className="field-input" value={libraryFee} onChange={(e) => setLibraryFee(e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 items-end">
          <div>
            <label htmlFor="fs-due" className="field-label">Due Date</label>
            <input id="fs-due" type="date" className="field-input" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>
          <p className="text-sm font-bold text-navy-900">Total: ₹{previewTotal.toLocaleString("en-IN")}</p>
        </div>
        <button type="submit" disabled={busy} className="btn btn-navy w-full">
          {busy ? "Saving…" : "Save / Update Fee Structure"}
        </button>
      </form>

      <div className="overflow-x-auto border border-line rounded-xl bg-white">
        <table className="table-msitm min-w-[600px]">
          <thead>
            <tr>
              <th scope="col">Course &amp; Sem</th>
              <th scope="col">Breakup (T / Lab / Exm / Lib)</th>
              <th scope="col">Total</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {structures.map((fs) => (
              <tr key={fs.id}>
                <td className="font-semibold text-navy-900">
                  {fs.course} Sem {fs.semester}
                  <span className="block text-xs text-muted">{fs.academicYear} · Due {fs.dueDate}</span>
                </td>
                <td className="text-xs">
                  ₹{fs.tuitionFee} + ₹{fs.labFee} + ₹{fs.examFee} + ₹{fs.libraryFee}
                </td>
                <td className="font-mono font-bold text-navy-900">₹{fs.totalFee.toLocaleString("en-IN")}</td>
                <td>
                  <div className="flex gap-1.5">
                    <button type="button" onClick={() => loadForEdit(fs)} className="btn btn-outline-dark btn-sm">Edit</button>
                    <button type="button" onClick={() => void removeStructure(fs.id)} className="btn btn-outline-dark btn-sm text-destructive" aria-label={`Delete ${fs.course} S${fs.semester}`}>
                      <Icons.Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function DeletePaymentButton({ paymentId }: { paymentId: number }) {
  const router = useRouter();
  async function del() {
    if (!window.confirm("Remove this fee receipt record from the ledger?")) return;
    const res = await fetch(`/api/portal/fees?paymentId=${paymentId}`, { method: "DELETE" });
    if (res.ok) router.refresh();
  }
  return (
    <button type="button" onClick={() => void del()} className="btn btn-outline-dark btn-sm text-destructive" aria-label="Delete receipt">
      <Icons.Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
    </button>
  );
}

export function ExamSessionManager({ examSessions }: { examSessions: ExamSessionRecord[] }) {
  const router = useRouter();
  const [course, setCourse] = useState<"BCA" | "BBA">("BCA");
  const [semester, setSemester] = useState("1");
  const [title, setTitle] = useState("");
  const [examType, setExamType] = useState<"University" | "Sessional">("University");
  const [examCentre, setExamCentre] = useState("MSITM Degree College Block-A, Gonda");
  const [minAtt, setMinAtt] = useState("75");
  const [sessMsg, setSessMsg] = useState("");

  const [targetSessId, setTargetSessId] = useState(examSessions[0]?.id ?? 1);
  const [subCode, setSubCode] = useState("");
  const [subName, setSubName] = useState("");
  const [examDate, setExamDate] = useState("2026-12-04");
  const [shiftTime, setShiftTime] = useState("10:00 AM – 01:00 PM");
  const [roomNo, setRoomNo] = useState("Hall-101");

  const [bulkCourse, setBulkCourse] = useState<"ALL" | "BCA" | "BBA">("ALL");
  const [bulkSem, setBulkSem] = useState("0");

  async function saveSession(e: FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/portal/admit-cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "upsert_session",
        title,
        course,
        semester: Number(semester),
        examType,
        examCentre,
        minAttendancePct: Number(minAtt),
        active: true,
      }),
    });
    if (res.ok) {
      setSessMsg("Exam session created cleanly.");
      setTitle("");
      router.refresh();
    }
  }

  async function addPaper(e: FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/portal/admit-cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "add_schedule",
        examSessionId: targetSessId,
        subjectCode: subCode,
        subjectName: subName,
        examDate,
        shiftTime,
        roomNo,
      }),
    });
    if (res.ok) {
      setSessMsg("Date-sheet paper added to examination schedule.");
      setSubCode("");
      setSubName("");
      router.refresh();
    }
  }

  async function bulkRelease() {
    const res = await fetch("/api/portal/admit-cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "bulk_release", course: bulkCourse, semester: Number(bulkSem) }),
    });
    const d = await res.json();
    if (res.ok) {
      setSessMsg(`Verified exam forms & enabled release for ${d.updated} student(s).`);
      router.refresh();
    }
  }

  async function deleteSession(id: number) {
    await fetch(`/api/portal/admit-cards?sessionId=${id}`, { method: "DELETE" });
    router.refresh();
  }

  async function deletePaper(examSessionId: number, scheduleId: number) {
    await fetch(`/api/portal/admit-cards?examSessionId=${examSessionId}&scheduleId=${scheduleId}`, {
      method: "DELETE",
    });
    router.refresh();
  }

  return (
    <section className="space-y-6">
      {sessMsg ? <p role="status" className="rounded-xl border border-gold-400 bg-white px-4 py-3 text-sm font-semibold text-navy-900">{sessMsg}</p> : null}

      <div className="grid lg:grid-cols-2 gap-6">
        <form onSubmit={saveSession} className="card-line p-6 space-y-4">
          <h2 className="font-display text-xl font-semibold text-navy-900">Create Exam Session &amp; Threshold</h2>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="es-course" className="field-label">Course</label>
              <select id="es-course" className="field-select" value={course} onChange={(e) => setCourse(e.target.value as "BCA" | "BBA")}>
                <option value="BCA">BCA</option>
                <option value="BBA">BBA</option>
              </select>
            </div>
            <div>
              <label htmlFor="es-sem" className="field-label">Sem</label>
              <select id="es-sem" className="field-select" value={semester} onChange={(e) => setSemester(e.target.value)}>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>Sem {n}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="es-min" className="field-label">Min Att %</label>
              <input id="es-min" type="number" className="field-input" value={minAtt} onChange={(e) => setMinAtt(e.target.value)} />
            </div>
          </div>
          <div>
            <label htmlFor="es-title" className="field-label">Examination Title *</label>
            <input id="es-title" required placeholder="e.g., BCA Semester I End-Semester Exam 2026" className="field-input" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="es-type" className="field-label">Type</label>
              <select id="es-type" className="field-select" value={examType} onChange={(e) => setExamType(e.target.value as "University" | "Sessional")}>
                <option value="University">University</option>
                <option value="Sessional">Sessional</option>
              </select>
            </div>
            <div>
              <label htmlFor="es-ctr" className="field-label">Exam Centre</label>
              <input id="es-ctr" className="field-input" value={examCentre} onChange={(e) => setExamCentre(e.target.value)} />
            </div>
          </div>
          <button type="submit" className="btn btn-navy">Create Exam Session</button>
        </form>

        <div className="space-y-6">
          <form onSubmit={addPaper} className="card-line p-6 space-y-3">
            <h2 className="font-display text-xl font-semibold text-navy-900">Add Paper to Date-Sheet</h2>
            <div>
              <label htmlFor="dp-sess" className="field-label">Exam Session</label>
              <select id="dp-sess" className="field-select" value={targetSessId} onChange={(e) => setTargetSessId(Number(e.target.value))}>
                {examSessions.map((es) => (
                  <option key={es.id} value={es.id}>{es.course} S{es.semester} — {es.title}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input required placeholder="Code (BCA-405)" className="field-input font-mono" value={subCode} onChange={(e) => setSubCode(e.target.value)} />
              <input required placeholder="Subject Paper Name" className="field-input" value={subName} onChange={(e) => setSubName(e.target.value)} />
              <input type="date" className="field-input" value={examDate} onChange={(e) => setExamDate(e.target.value)} />
              <input placeholder="10:00 AM – 01:00 PM" className="field-input" value={shiftTime} onChange={(e) => setShiftTime(e.target.value)} />
            </div>
            <div className="flex gap-3">
              <input placeholder="Room / Lab No." className="field-input flex-1" value={roomNo} onChange={(e) => setRoomNo(e.target.value)} />
              <button type="submit" className="btn btn-navy shrink-0">Add Paper</button>
            </div>
          </form>

          <div className="card-line p-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <select aria-label="Bulk Course" className="field-select h-9 text-xs w-28" value={bulkCourse} onChange={(e) => setBulkCourse(e.target.value as typeof bulkCourse)}>
                <option value="ALL">All UG</option>
                <option value="BCA">BCA</option>
                <option value="BBA">BBA</option>
              </select>
              <select aria-label="Bulk Semester" className="field-select h-9 text-xs w-28" value={bulkSem} onChange={(e) => setBulkSem(e.target.value)}>
                <option value="0">All Sem</option>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>Sem {n}</option>
                ))}
              </select>
            </div>
            <button type="button" onClick={() => void bulkRelease()} className="btn btn-gold btn-sm">
              Verify &amp; Bulk Release Class Cards
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {examSessions.map((es) => (
          <div key={es.id} className="card-line p-5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gold-700">
                  {es.course} · Semester {es.semester} ({es.examType}) · Min {es.minAttendancePct}%
                </p>
                <p className="font-display text-lg font-semibold text-navy-900 mt-1">{es.title}</p>
                <p className="text-xs text-muted mt-0.5">Centre: {es.examCentre}</p>
              </div>
              <button type="button" onClick={() => void deleteSession(es.id)} className="btn btn-outline-dark btn-sm text-destructive" aria-label={`Delete ${es.title}`}>
                <Icons.Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
            <ul className="mt-3 divide-y divide-line text-xs">
              {es.schedules.map((sc) => (
                <li key={sc.id} className="py-1.5 flex items-center justify-between gap-2">
                  <span className="font-medium text-navy-900">
                    {sc.subjectCode} · {sc.subjectName} <span className="text-muted">({sc.roomNo})</span>
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-muted">{sc.examDate}</span>
                    <button type="button" onClick={() => void deletePaper(es.id, sc.id)} className="text-destructive" aria-label={`Remove ${sc.subjectCode}`}>
                      <Icons.Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AcademicsControlPanel({
  snapshots,
  timetable,
}: {
  snapshots: StudentPortalSnapshot[];
  timetable: TimetableSlotRecord[];
}) {
  const router = useRouter();
  const [filterCourse, setFilterCourse] = useState<"ALL" | "BCA" | "BBA">("ALL");
  const [filterSem, setFilterSem] = useState(0);
  const [msg, setMsg] = useState("");

  // Inline attendance edits
  const [attDraft, setAttDraft] = useState<
    Record<number, { total: number; att: number; med: number; marks: number }>
  >({});

  // Batch class attendance
  const [batchCourse, setBatchCourse] = useState<"BCA" | "BBA">("BCA");
  const [batchSem, setBatchSem] = useState(4);
  const [batchSubCode, setBatchSubCode] = useState("BCA-401");
  const [batchStatus, setBatchStatus] = useState<Record<number, "present" | "absent" | "medical">>({});

  // Timetable create
  const [ttForm, setTtForm] = useState({
    course: "BCA" as "BCA" | "BBA",
    semester: "4",
    dayOfWeek: "Mon" as TimetableSlotRecord["dayOfWeek"],
    slotTime: "12:30 – 01:30 PM",
    subjectCode: "",
    subjectName: "",
    roomOrLab: "Hall 101",
    facultyName: "Dr. R. K. Shukla",
  });

  const matchingRows = snapshots.filter(
    (s) =>
      (filterCourse === "ALL" || s.student.course === filterCourse) &&
      (filterSem === 0 || s.student.semester === filterSem)
  );

  const batchClassStudents = snapshots.filter(
    (s) => s.student.course === batchCourse && s.student.semester === batchSem
  );

  async function saveAttendanceRow(
    recordId: number,
    defaults: { total: number; att: number; med: number; marks: number }
  ) {
    const d = attDraft[recordId] ?? defaults;
    const res = await fetch("/api/portal/academics", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recordId,
        totalClasses: d.total,
        attendedClasses: d.att,
        medicalLeaves: d.med,
        internalMarks: d.marks,
      }),
    });
    if (res.ok) {
      setMsg("Updated attendance & internal marks cleanly.");
      router.refresh();
    }
  }

  async function submitBatchAttendance(e: FormEvent) {
    e.preventDefault();
    const marks = batchClassStudents.map((s) => ({
      studentId: s.student.id,
      status: batchStatus[s.student.id] ?? "present",
    }));
    const res = await fetch("/api/portal/academics", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "batch_attendance",
        course: batchCourse,
        semester: batchSem,
        subjectCode: batchSubCode,
        marks,
      }),
    });
    const d = await res.json();
    if (res.ok) {
      setMsg(`Marked ${batchSubCode} attendance for ${d.updated} student(s) in ${batchCourse} Sem ${batchSem}.`);
      router.refresh();
    }
  }

  async function addTimetableSlot(e: FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/portal/academics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "upsert_timetable",
        ...ttForm,
        semester: Number(ttForm.semester),
      }),
    });
    if (res.ok) {
      setMsg("Added timetable routine slot.");
      setTtForm((f) => ({ ...f, subjectCode: "", subjectName: "" }));
      router.refresh();
    }
  }

  async function deleteTimetable(id: number) {
    await fetch(`/api/portal/academics?timetableId=${id}`, { method: "DELETE" });
    router.refresh();
  }

  const filteredTt = timetable.filter(
    (t) => (filterCourse === "ALL" || t.course === filterCourse) && (filterSem === 0 || t.semester === filterSem)
  );

  return (
    <div className="space-y-8">
      {msg ? <p role="status" className="rounded-xl border border-gold-400 bg-white px-4 py-3 text-sm font-semibold text-navy-900">{msg}</p> : null}

      {/* 1. BATCH CLASS ATTENDANCE REGISTER */}
      <form onSubmit={submitBatchAttendance} className="card-line p-6 space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Daily Class Register</p>
            <h2 className="font-display text-xl font-semibold text-navy-900 mt-1">
              Mark Class Attendance in 1 Click
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <select aria-label="Class Course" className="field-select h-9 text-xs w-28" value={batchCourse} onChange={(e) => setBatchCourse(e.target.value as "BCA" | "BBA")}>
              <option value="BCA">BCA</option>
              <option value="BBA">BBA</option>
            </select>
            <select aria-label="Class Semester" className="field-select h-9 text-xs w-28" value={batchSem} onChange={(e) => setBatchSem(Number(e.target.value))}>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>Sem {n}</option>
              ))}
            </select>
            <input aria-label="Subject Code" className="field-input h-9 text-xs w-32 font-mono" value={batchSubCode} onChange={(e) => setBatchSubCode(e.target.value.toUpperCase())} />
          </div>
        </div>
        {batchClassStudents.length === 0 ? (
          <p className="text-sm text-muted">No students currently in {batchCourse} Sem {batchSem}.</p>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-3">
              {batchClassStudents.map((s) => (
                <div key={s.student.id} className="flex items-center gap-2 rounded-lg border border-line bg-parchment px-3 py-2 text-xs">
                  <span className="font-semibold text-navy-900">{s.student.fullName}</span>
                  <select
                    aria-label={`Attendance status for ${s.student.fullName}`}
                    className="field-select h-7 text-xs w-24"
                    value={batchStatus[s.student.id] ?? "present"}
                    onChange={(e) =>
                      setBatchStatus((m) => ({
                        ...m,
                        [s.student.id]: e.target.value as "present" | "absent" | "medical",
                      }))
                    }
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="medical">Medical</option>
                  </select>
                </div>
              ))}
            </div>
            <button type="submit" className="btn btn-navy btn-sm">
              Submit Lecture Attendance
            </button>
          </div>
        )}
      </form>

      {/* 2. ALL SUBJECT ATTENDANCE & INTERNAL MARKS EDITOR */}
      <section className="space-y-3">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Full Subject-Wise Control</p>
            <h2 className="font-display text-xl font-semibold text-navy-900 mt-1">
              Edit Subject Attendance, Medical Leaves &amp; Internal Marks
            </h2>
          </div>
          <div className="flex gap-2">
            <select aria-label="Filter Class Course" className="field-select h-9 text-xs w-28" value={filterCourse} onChange={(e) => setFilterCourse(e.target.value as typeof filterCourse)}>
              <option value="ALL">All UG</option>
              <option value="BCA">BCA</option>
              <option value="BBA">BBA</option>
            </select>
            <select aria-label="Filter Class Semester" className="field-select h-9 text-xs w-28" value={filterSem} onChange={(e) => setFilterSem(Number(e.target.value))}>
              <option value={0}>All Sem</option>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>Sem {n}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto border border-line rounded-xl bg-white">
          <table className="table-msitm min-w-[860px]">
            <thead>
              <tr>
                <th scope="col">Student</th>
                <th scope="col">Subject</th>
                <th scope="col">Attended</th>
                <th scope="col">Total</th>
                <th scope="col">Medical</th>
                <th scope="col">Internal / 25</th>
                <th scope="col">Save</th>
              </tr>
            </thead>
            <tbody>
              {matchingRows.flatMap((s) =>
                s.attendance.map((row) => {
                  const cur = attDraft[row.id] ?? {
                    total: row.totalClasses,
                    att: row.attendedClasses,
                    med: row.medicalLeaves,
                    marks: row.internalMarks,
                  };
                  return (
                    <tr key={row.id}>
                      <td className="font-semibold text-navy-900 text-xs">
                        {s.student.fullName}
                        <span className="block text-muted">{s.student.course} S{s.student.semester}</span>
                      </td>
                      <td className="text-xs">{row.subjectCode} · {row.subjectName}</td>
                      <td>
                        <input
                          type="number"
                          className="field-input h-8 w-16 text-xs"
                          value={cur.att}
                          onChange={(e) => setAttDraft((d) => ({ ...d, [row.id]: { ...cur, att: Number(e.target.value) } }))}
                          aria-label={`Attended classes ${row.subjectCode}`}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="field-input h-8 w-16 text-xs"
                          value={cur.total}
                          onChange={(e) => setAttDraft((d) => ({ ...d, [row.id]: { ...cur, total: Number(e.target.value) } }))}
                          aria-label={`Total classes ${row.subjectCode}`}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="field-input h-8 w-16 text-xs"
                          value={cur.med}
                          onChange={(e) => setAttDraft((d) => ({ ...d, [row.id]: { ...cur, med: Number(e.target.value) } }))}
                          aria-label={`Medical leaves ${row.subjectCode}`}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          max={row.maxInternalMarks}
                          className="field-input h-8 w-16 text-xs"
                          value={cur.marks}
                          onChange={(e) => setAttDraft((d) => ({ ...d, [row.id]: { ...cur, marks: Number(e.target.value) } }))}
                          aria-label={`Internal marks ${row.subjectCode}`}
                        />
                      </td>
                      <td>
                        <button type="button" onClick={() => void saveAttendanceRow(row.id, cur)} className="btn btn-navy btn-sm">
                          Save
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. TIMETABLE BUILDER CRUD */}
      <section className="grid lg:grid-cols-[1fr_1.4fr] gap-6">
        <form onSubmit={addTimetableSlot} className="card-line p-6 space-y-3">
          <h2 className="font-display text-xl font-semibold text-navy-900">Add Class / Lab Timetable Slot</h2>
          <div className="grid grid-cols-3 gap-2">
            <select className="field-select" value={ttForm.course} onChange={(e) => setTtForm((f) => ({ ...f, course: e.target.value as "BCA" | "BBA" }))}>
              <option value="BCA">BCA</option>
              <option value="BBA">BBA</option>
            </select>
            <select className="field-select" value={ttForm.semester} onChange={(e) => setTtForm((f) => ({ ...f, semester: e.target.value }))}>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>Sem {n}</option>
              ))}
            </select>
            <select className="field-select" value={ttForm.dayOfWeek} onChange={(e) => setTtForm((f) => ({ ...f, dayOfWeek: e.target.value as TimetableSlotRecord["dayOfWeek"] }))}>
              {(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const).map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input required placeholder="Time (12:30 – 01:30 PM)" className="field-input" value={ttForm.slotTime} onChange={(e) => setTtForm((f) => ({ ...f, slotTime: e.target.value }))} />
            <input required placeholder="Room / Computer Lab" className="field-input" value={ttForm.roomOrLab} onChange={(e) => setTtForm((f) => ({ ...f, roomOrLab: e.target.value }))} />
            <input required placeholder="Code (BCA-406)" className="field-input font-mono" value={ttForm.subjectCode} onChange={(e) => setTtForm((f) => ({ ...f, subjectCode: e.target.value }))} />
            <input required placeholder="Subject Name" className="field-input" value={ttForm.subjectName} onChange={(e) => setTtForm((f) => ({ ...f, subjectName: e.target.value }))} />
          </div>
          <input required placeholder="Faculty Name" className="field-input" value={ttForm.facultyName} onChange={(e) => setTtForm((f) => ({ ...f, facultyName: e.target.value }))} />
          <button type="submit" className="btn btn-navy w-full">Add Timetable Slot</button>
        </form>

        <div className="overflow-x-auto border border-line rounded-xl bg-white max-h-[380px] overflow-y-auto">
          <table className="table-msitm text-xs min-w-[600px]">
            <thead>
              <tr>
                <th scope="col">Class &amp; Day</th>
                <th scope="col">Slot &amp; Subject</th>
                <th scope="col">Room / Faculty</th>
                <th scope="col">Del</th>
              </tr>
            </thead>
            <tbody>
              {filteredTt.map((slot) => (
                <tr key={slot.id}>
                  <td className="font-mono font-bold text-navy-900">
                    {slot.course} S{slot.semester} · {slot.dayOfWeek}
                  </td>
                  <td>
                    <p className="font-semibold text-navy-900">{slot.subjectCode} {slot.subjectName}</p>
                    <p className="text-muted">{slot.slotTime}</p>
                  </td>
                  <td>
                    {slot.roomOrLab}
                    <span className="block text-muted">{slot.facultyName}</span>
                  </td>
                  <td>
                    <button type="button" onClick={() => void deleteTimetable(slot.id)} className="text-destructive" aria-label={`Delete slot ${slot.subjectCode}`}>
                      <Icons.Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export function CoordinatorSickGatePassForm({ students }: { students: StudentPortalSnapshot[] }) {
  const router = useRouter();
  const [studentId, setStudentId] = useState(students[0]?.student.id ?? 1);
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [guardianNotified, setGuardianNotified] = useState(true);
  const [msg, setMsg] = useState("");

  async function issueNow(e: FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/portal/gate-pass", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId,
        passType: "sick_leave",
        reason,
        symptomsOrNotes: notes,
        issueImmediate: true,
        guardianNotified,
      }),
    });
    const d = await res.json();
    if (res.ok && d.ok) {
      setMsg(`Issued Approved Sick Pass ${d.pass.passCode} — Security Guard can check out immediately.`);
      setReason("");
      setNotes("");
      router.refresh();
    }
  }

  return (
    <form onSubmit={issueNow} className="card-line p-6 space-y-4">
      <div>
        <p className="eyebrow">Office / Sick Room Entry</p>
        <h2 className="font-display text-xl font-semibold text-navy-900 mt-1">
          Issue Immediate Approved Sick Gate Pass (Coordinator Desk)
        </h2>
      </div>
      {msg ? <p role="status" className="text-sm font-semibold text-navy-900">{msg}</p> : null}
      <div className="grid sm:grid-cols-3 gap-3">
        <div>
          <label htmlFor="cgp-stu" className="field-label">Unwell Student</label>
          <select id="cgp-stu" className="field-select" value={studentId} onChange={(e) => setStudentId(Number(e.target.value))}>
            {students.map((s) => (
              <option key={s.student.id} value={s.student.id}>
                {s.student.fullName} ({s.student.course} S{s.student.semester})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cgp-rsn" className="field-label">Symptoms / Reason *</label>
          <input id="cgp-rsn" required placeholder="Fever / Headache in class" className="field-input" value={reason} onChange={(e) => setReason(e.target.value)} />
        </div>
        <div>
          <label htmlFor="cgp-note" className="field-label">Parent Confirmation Note</label>
          <input id="cgp-note" placeholder="Spoke to parent / escorting" className="field-input" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm text-navy-900 cursor-pointer">
          <input type="checkbox" checked={guardianNotified} onChange={(e) => setGuardianNotified(e.target.checked)} className="h-4 w-4 rounded border-line" />
          Guardian informed on registered phone
        </label>
        <button type="submit" className="btn btn-navy">
          <Icons.Stethoscope className="h-4 w-4" aria-hidden="true" />
          Issue Approved Gate Pass
        </button>
      </div>
    </form>
  );
}

export function PlacementDriveManager({ drives }: { drives: PlacementDriveRecord[] }) {
  const router = useRouter();
  const [company, setCompany] = useState("");
  const [kind, setKind] = useState<PlacementDriveRecord["kind"]>("Placement Drive");
  const [eligible, setEligible] = useState<PlacementDriveRecord["eligibleCourses"]>("ALL");
  const [driveDate, setDriveDate] = useState("2026-12-18");
  const [venue, setVenue] = useState("MSITM Seminar Hall");
  const [ctc, setCtc] = useState("");
  const [desc, setDesc] = useState("");
  const [msg, setMsg] = useState("");

  async function saveDrive(e: FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/portal/campus-ops", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "upsert_drive",
        companyOrScheme: company,
        kind,
        eligibleCourses: eligible,
        minCgpa: "6.0",
        driveDate,
        venue,
        ctcOrBenefit: ctc || "As per norms",
        description: desc,
        active: true,
      }),
    });
    if (res.ok) {
      setMsg("Published Placement Drive / Scholarship Camp to eligible UG portals.");
      setCompany("");
      setCtc("");
      setDesc("");
      router.refresh();
    }
  }

  async function deleteDrive(driveId: number) {
    await fetch(`/api/portal/campus-ops?driveId=${driveId}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <section className="grid lg:grid-cols-[1fr_1.4fr] gap-6 pt-4 border-t border-line">
      <form onSubmit={saveDrive} className="card-line p-6 space-y-3">
        <div>
          <p className="eyebrow">T&amp;P &amp; Scholarships</p>
          <h2 className="font-display text-xl font-semibold text-navy-900 mt-1">Publish Drive / Scholarship Camp</h2>
        </div>
        {msg ? <p role="status" className="text-sm font-semibold text-navy-900">{msg}</p> : null}
        <input required placeholder="Company Name or Scholarship Scheme *" className="field-input" value={company} onChange={(e) => setCompany(e.target.value)} />
        <div className="grid grid-cols-2 gap-2">
          <select className="field-select" value={kind} onChange={(e) => setKind(e.target.value as PlacementDriveRecord["kind"])}>
            <option value="Placement Drive">Placement Drive</option>
            <option value="Scholarship">Scholarship</option>
            <option value="Workshop">Workshop</option>
          </select>
          <select className="field-select" value={eligible} onChange={(e) => setEligible(e.target.value as PlacementDriveRecord["eligibleCourses"])}>
            <option value="ALL">All UG (BCA + BBA)</option>
            <option value="BCA">BCA Only</option>
            <option value="BBA">BBA Only</option>
          </select>
          <input type="date" className="field-input" value={driveDate} onChange={(e) => setDriveDate(e.target.value)} />
          <input placeholder="Package / Benefit (₹3.5 LPA)" className="field-input" value={ctc} onChange={(e) => setCtc(e.target.value)} />
        </div>
        <input placeholder="Campus Venue" className="field-input" value={venue} onChange={(e) => setVenue(e.target.value)} />
        <textarea required placeholder="Eligibility instructions & selection rounds…" className="field-textarea" value={desc} onChange={(e) => setDesc(e.target.value)} />
        <button type="submit" className="btn btn-navy w-full">Publish Opportunity</button>
      </form>

      <div className="card-line p-6 space-y-3">
        <h2 className="font-display text-xl font-semibold text-navy-900">Active Drives &amp; Student Registrations</h2>
        <ul className="divide-y divide-line text-sm">
          {drives.map((d) => (
            <li key={d.id} className="py-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-navy-900">
                  {d.companyOrScheme} <span className="text-xs text-gold-700 font-bold">({d.kind})</span>
                </p>
                <p className="text-xs text-muted">
                  {d.eligibleCourses} · {d.driveDate} · {d.venue} · {d.ctcOrBenefit} · Registered:{" "}
                  <strong className="text-navy-900">{d.registeredStudentIds.length}</strong>
                </p>
              </div>
              <button type="button" onClick={() => void deleteDrive(d.id)} className="btn btn-outline-dark btn-sm text-destructive" aria-label={`Delete ${d.companyOrScheme}`}>
                <Icons.Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

