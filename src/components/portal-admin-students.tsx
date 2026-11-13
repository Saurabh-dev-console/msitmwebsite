"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";
import type {
  BulkImportRowReport,
  PortalRole,
  StaffUserSummary,
  StudentPortalSnapshot,
  StudentRecord,
} from "@/lib/portal-types";

interface LeadItem {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  course: string;
  qualification: string | null;
  city: string | null;
  createdAt: string;
}

export function StudentMasterManager({
  snapshots,
  admissionLeads,
  staffUsers,
}: {
  snapshots: StudentPortalSnapshot[];
  admissionLeads: LeadItem[];
  staffUsers: StaffUserSummary[];
}) {
  const router = useRouter();

  // Class filters & search
  const [filterCourse, setFilterCourse] = useState<"ALL" | "BCA" | "BBA">("ALL");
  const [filterSem, setFilterSem] = useState<number>(0);
  const [filterSection, setFilterSection] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchText, setSearchText] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [busy, setBusy] = useState(false);

  // Create student state
  const [newForm, setNewForm] = useState({
    enrollmentNo: "",
    universityRollNo: "",
    fullName: "",
    fatherName: "",
    course: "BCA" as "BCA" | "BBA",
    semester: "1",
    section: "A",
    batch: "2026–29",
    dob: "2007-01-01",
    phone: "",
    guardianPhone: "",
    email: "",
    bloodGroup: "O+",
    password: "",
  });

  // Inline Edit Student Modal/Drawer State
  const [editing, setEditing] = useState<StudentRecord | null>(null);
  const [editForm, setEditForm] = useState({
    enrollmentNo: "",
    universityRollNo: "",
    fullName: "",
    fatherName: "",
    course: "BCA" as "BCA" | "BBA",
    semester: 1,
    section: "A",
    batch: "2026–29",
    dob: "2007-01-01",
    phone: "",
    guardianPhone: "",
    email: "",
    bloodGroup: "O+",
    status: "active" as StudentRecord["status"],
    resetPassword: "",
  });

  // Class-Wise Excel Import State
  const [impCourse, setImpCourse] = useState<"BCA" | "BBA">("BCA");
  const [impSem, setImpSem] = useState("1");
  const [impSection, setImpSection] = useState("A");
  const [impBatch, setImpBatch] = useState("2026–29");
  const [impUpdateExisting, setImpUpdateExisting] = useState(false);
  const [impFile, setImpFile] = useState<File | null>(null);
  const [impReport, setImpReport] = useState<{
    dryRun: boolean;
    importedCount: number;
    updatedCount: number;
    skippedCount: number;
    reports: BulkImportRowReport[];
  } | null>(null);

  // Staff Account Form
  const [staffForm, setStaffForm] = useState({
    username: "",
    displayName: "",
    role: "faculty" as Exclude<PortalRole, "student">,
    password: "",
  });

  const filteredStudents = snapshots
    .map((s) => s.student)
    .filter((st) => {
      if (filterCourse !== "ALL" && st.course !== filterCourse) return false;
      if (filterSem > 0 && st.semester !== filterSem) return false;
      if (filterSection !== "ALL" && st.section.toUpperCase() !== filterSection) return false;
      if (filterStatus !== "ALL" && st.status !== filterStatus) return false;
      if (searchText.trim()) {
        const q = searchText.trim().toLowerCase();
        const hay = `${st.enrollmentNo} ${st.universityRollNo} ${st.fullName} ${st.fatherName} ${st.phone} ${st.guardianPhone}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

  function startEdit(st: StudentRecord) {
    setEditing(st);
    setEditForm({
      enrollmentNo: st.enrollmentNo,
      universityRollNo: st.universityRollNo || "",
      fullName: st.fullName,
      fatherName: st.fatherName,
      course: st.course,
      semester: st.semester,
      section: st.section,
      batch: st.batch,
      dob: st.dob,
      phone: st.phone,
      guardianPhone: st.guardianPhone,
      email: st.email || "",
      bloodGroup: st.bloodGroup || "",
      status: st.status,
      resetPassword: "",
    });
    setStatusMsg("");
    setErrMsg("");
  }

  async function handleCreateStudent(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErrMsg("");
    setStatusMsg("");
    try {
      const res = await fetch("/api/portal/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newForm,
          semester: Number(newForm.semester),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrMsg(data.error || "Could not enrol student.");
        return;
      }
      setStatusMsg(
        `Enrolled ${data.student.fullName} (${data.student.course} Sem ${data.student.semester}) · ID: ${data.student.enrollmentNo}`
      );
      setNewForm((f) => ({
        ...f,
        enrollmentNo: "",
        universityRollNo: "",
        fullName: "",
        fatherName: "",
        phone: "",
        guardianPhone: "",
        email: "",
        password: "",
      }));
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function handleSaveEdit(e: FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setBusy(true);
    setErrMsg("");
    setStatusMsg("");
    try {
      const res = await fetch("/api/portal/students", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          studentId: editing.id,
          ...editForm,
          semester: Number(editForm.semester),
          resetPassword: editForm.resetPassword.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrMsg(data.error || "Failed to update student.");
        return;
      }
      setStatusMsg(`Updated record for ${data.student.fullName} (${data.student.enrollmentNo}).`);
      setEditing(null);
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function handleDeleteStudent(st: StudentRecord) {
    if (!window.confirm(`Delete student "${st.fullName}" (${st.enrollmentNo}) and all linked portal records?`)) {
      return;
    }
    setBusy(true);
    setErrMsg("");
    try {
      const res = await fetch(`/api/portal/students?studentId=${st.id}`, { method: "DELETE" });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setErrMsg(d.error || "Delete failed.");
        return;
      }
      if (editing?.id === st.id) setEditing(null);
      setStatusMsg(`Removed student ${st.fullName} (${st.enrollmentNo}).`);
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function handlePromote(studentId: number) {
    setBusy(true);
    try {
      const res = await fetch("/api/portal/students", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId }),
      });
      if (res.ok) router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function handleExcelImport(dryRun: boolean) {
    if (!impFile) {
      setErrMsg("Select an .xlsx or .csv file first.");
      return;
    }
    setBusy(true);
    setErrMsg("");
    setStatusMsg("");
    try {
      const fd = new FormData();
      fd.append("file", impFile);
      fd.append("course", impCourse);
      fd.append("semester", impSem);
      fd.append("section", impSection);
      fd.append("batch", impBatch);
      fd.append("updateExisting", String(impUpdateExisting));
      fd.append("dryRun", String(dryRun));

      const res = await fetch("/api/portal/students/import", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrMsg(data.error || "Import failed.");
        return;
      }
      setImpReport(data);
      if (!dryRun) {
        setStatusMsg(
          `Excel Class Import complete: ${data.importedCount} enrolled, ${data.updatedCount} updated, ${data.skippedCount} skipped.`
        );
        router.refresh();
      }
    } finally {
      setBusy(false);
    }
  }

  async function handleConvertLead(lead: LeadItem) {
    setBusy(true);
    setErrMsg("");
    try {
      const course: "BCA" | "BBA" = lead.course.toUpperCase().includes("BBA") ? "BBA" : "BCA";
      const res = await fetch("/api/portal/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "convert_lead",
          leadId: lead.id,
          course,
          semester: 1,
          section: "A",
          batch: "2026–29",
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatusMsg(`Converted ${lead.fullName} into ${data.student.course} Sem 1 (${data.student.enrollmentNo}).`);
        router.refresh();
      } else {
        setErrMsg(data.error || "Lead conversion failed.");
      }
    } finally {
      setBusy(false);
    }
  }

  async function handleCreateStaff(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErrMsg("");
    try {
      const res = await fetch("/api/portal/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "upsert_staff", ...staffForm }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrMsg(data.error || "Could not create staff login.");
        return;
      }
      setStatusMsg(`Staff account "${data.staff.username}" (${data.staff.role}) active.`);
      setStaffForm({ username: "", displayName: "", role: "faculty", password: "" });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function toggleStaffActive(st: StaffUserSummary) {
    await fetch("/api/portal/students", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "upsert_staff",
        id: st.id,
        username: st.username,
        role: st.role,
        displayName: st.displayName,
        active: !st.active,
      }),
    });
    router.refresh();
  }

  async function removeStaff(staffId: number) {
    const res = await fetch(`/api/portal/students?staffId=${staffId}`, { method: "DELETE" });
    if (res.ok) router.refresh();
    else {
      const d = await res.json().catch(() => ({}));
      setErrMsg(d.error || "Cannot remove user.");
    }
  }

  return (
    <div className="space-y-8">
      {errMsg ? (
        <div role="alert" className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
          {errMsg}
        </div>
      ) : null}
      {statusMsg ? (
        <div role="status" className="rounded-xl border border-gold-400 bg-white px-4 py-3 text-sm font-semibold text-navy-900">
          {statusMsg}
        </div>
      ) : null}

      {/* 1. CLASS-WISE EXCEL (.XLSX / .CSV) BULK IMPORT & EXPORT */}
      <section className="card-line p-6 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Bulk Roster Operations</p>
            <h2 className="font-display text-xl font-semibold text-navy-900 mt-1">
              Class-Wise Excel (.xlsx / .csv) Student Import &amp; Export
            </h2>
            <p className="text-xs text-muted mt-1">
              Choose default Class, Semester &amp; Section, download the ready-to-fill `.xlsx` template, preview parsed rows, and commit bulk admissions cleanly.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={`/api/portal/students/import?template=1&course=${impCourse}&semester=${impSem}&section=${encodeURIComponent(impSection)}&batch=${encodeURIComponent(impBatch)}`}
              className="btn btn-outline-dark btn-sm"
            >
              <Icons.FileSpreadsheet className="h-4 w-4" aria-hidden="true" />
              Download Class Template (.xlsx)
            </a>
            <a
              href={`/api/portal/students/import?export=1&course=${filterCourse}&semester=${filterSem}`}
              className="btn btn-gold btn-sm"
            >
              <Icons.Download className="h-4 w-4" aria-hidden="true" />
              Export Filtered Class (.xlsx)
            </a>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label htmlFor="imp-course" className="field-label">Default Class Course</label>
            <select id="imp-course" className="field-select" value={impCourse} onChange={(e) => setImpCourse(e.target.value as "BCA" | "BBA")}>
              <option value="BCA">BCA</option>
              <option value="BBA">BBA</option>
            </select>
          </div>
          <div>
            <label htmlFor="imp-sem" className="field-label">Default Semester</label>
            <select id="imp-sem" className="field-select" value={impSem} onChange={(e) => setImpSem(e.target.value)}>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>Semester {n}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="imp-sec" className="field-label">Default Section</label>
            <input id="imp-sec" className="field-input" value={impSection} onChange={(e) => setImpSection(e.target.value.toUpperCase())} />
          </div>
          <div>
            <label htmlFor="imp-batch" className="field-label">Default Batch</label>
            <input id="imp-batch" className="field-input" value={impBatch} onChange={(e) => setImpBatch(e.target.value)} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-line">
          <div className="flex-1 min-w-[240px]">
            <label htmlFor="imp-file" className="field-label">Upload Excel (.xlsx) or CSV (.csv)</label>
            <input
              id="imp-file"
              type="file"
              accept=".xlsx,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
              onChange={(e) => {
                setImpFile(e.target.files?.[0] ?? null);
                setImpReport(null);
              }}
              className="block w-full text-sm text-navy-900 file:mr-3 file:rounded-lg file:border file:border-navy-200 file:bg-navy-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-navy-900"
            />
          </div>
          <label className="flex items-center gap-2 text-xs font-medium text-navy-900 cursor-pointer pt-4">
            <input
              type="checkbox"
              checked={impUpdateExisting}
              onChange={(e) => setImpUpdateExisting(e.target.checked)}
              className="h-4 w-4 rounded border-line"
            />
            Overwrite matching Enrollment Nos.
          </label>
          <div className="flex flex-wrap gap-2 pt-4">
            <button type="button" disabled={busy || !impFile} onClick={() => void handleExcelImport(true)} className="btn btn-outline-dark btn-sm">
              Preview Rows
            </button>
            <button type="button" disabled={busy || !impFile} onClick={() => void handleExcelImport(false)} className="btn btn-navy btn-sm">
              <Icons.Upload className="h-3.5 w-3.5" aria-hidden="true" />
              Import Class Excel
            </button>
          </div>
        </div>

        {impReport ? (
          <div className="rounded-lg border border-line bg-parchment p-4 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-navy-900">
              {impReport.dryRun ? "Dry-Run Preview" : "Committed Import Summary"} — Imported: {impReport.importedCount} · Updated: {impReport.updatedCount} · Skipped: {impReport.skippedCount}
            </p>
            <div className="overflow-x-auto max-h-56 overflow-y-auto border border-line rounded bg-white">
              <table className="table-msitm text-xs min-w-[640px]">
                <thead>
                  <tr>
                    <th scope="col">Row</th>
                    <th scope="col">Enrollment No.</th>
                    <th scope="col">Student Name</th>
                    <th scope="col">Class</th>
                    <th scope="col">Status</th>
                    <th scope="col">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {impReport.reports.map((r) => (
                    <tr key={`${r.rowNumber}-${r.enrollmentNo}`}>
                      <td className="font-mono">{r.rowNumber}</td>
                      <td className="font-mono font-bold text-navy-900">{r.enrollmentNo}</td>
                      <td>{r.fullName}</td>
                      <td>{r.course} S{r.semester}</td>
                      <td>
                        <span className={`rounded px-2 py-0.5 font-bold uppercase ${r.status === "skipped" ? "bg-destructive/10 text-destructive" : "bg-navy-50 text-navy-900"}`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="text-muted">{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </section>

      {/* 2. INDIVIDUAL STUDENT ENROLMENT (CREATE) */}
      <form onSubmit={handleCreateStudent} className="card-line p-6 space-y-4">
        <div>
          <p className="eyebrow">Student Master · Create</p>
          <h2 className="font-display text-xl font-semibold text-navy-900 mt-1">
            Add Individual Student (Full Entry)
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label htmlFor="st-enr" className="field-label">Enrollment No. (Optional Auto)</label>
            <input id="st-enr" className="field-input font-mono" placeholder="Auto if blank" value={newForm.enrollmentNo} onChange={(e) => setNewForm((f) => ({ ...f, enrollmentNo: e.target.value }))} />
          </div>
          <div>
            <label htmlFor="st-roll" className="field-label">University Roll No.</label>
            <input id="st-roll" className="field-input font-mono" placeholder="Auto if blank" value={newForm.universityRollNo} onChange={(e) => setNewForm((f) => ({ ...f, universityRollNo: e.target.value }))} />
          </div>
          <div>
            <label htmlFor="st-name" className="field-label">Full Name *</label>
            <input id="st-name" required className="field-input" value={newForm.fullName} onChange={(e) => setNewForm((f) => ({ ...f, fullName: e.target.value }))} />
          </div>
          <div>
            <label htmlFor="st-father" className="field-label">Father&apos;s Name *</label>
            <input id="st-father" required className="field-input" value={newForm.fatherName} onChange={(e) => setNewForm((f) => ({ ...f, fatherName: e.target.value }))} />
          </div>
          <div>
            <label htmlFor="st-course" className="field-label">Course</label>
            <select id="st-course" className="field-select" value={newForm.course} onChange={(e) => setNewForm((f) => ({ ...f, course: e.target.value as "BCA" | "BBA" }))}>
              <option value="BCA">BCA (3-Year)</option>
              <option value="BBA">BBA (3-Year)</option>
            </select>
          </div>
          <div>
            <label htmlFor="st-sem" className="field-label">Semester</label>
            <select id="st-sem" className="field-select" value={newForm.semester} onChange={(e) => setNewForm((f) => ({ ...f, semester: e.target.value }))}>
              {[1, 2, 3, 4, 5, 6].map((s) => (
                <option key={s} value={s}>Semester {s}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="st-sec" className="field-label">Section &amp; Batch</label>
            <div className="grid grid-cols-2 gap-2">
              <input id="st-sec" className="field-input" value={newForm.section} onChange={(e) => setNewForm((f) => ({ ...f, section: e.target.value }))} aria-label="Section" />
              <input className="field-input" value={newForm.batch} onChange={(e) => setNewForm((f) => ({ ...f, batch: e.target.value }))} aria-label="Batch" />
            </div>
          </div>
          <div>
            <label htmlFor="st-dob" className="field-label">DOB &amp; Blood Group</label>
            <div className="grid grid-cols-[1.3fr_0.7fr] gap-2">
              <input id="st-dob" type="date" className="field-input" value={newForm.dob} onChange={(e) => setNewForm((f) => ({ ...f, dob: e.target.value }))} />
              <input className="field-input" value={newForm.bloodGroup} onChange={(e) => setNewForm((f) => ({ ...f, bloodGroup: e.target.value }))} aria-label="Blood Group" />
            </div>
          </div>
          <div>
            <label htmlFor="st-phone" className="field-label">Student Phone *</label>
            <input id="st-phone" required className="field-input" value={newForm.phone} onChange={(e) => setNewForm((f) => ({ ...f, phone: e.target.value }))} />
          </div>
          <div>
            <label htmlFor="st-gphone" className="field-label">Guardian Phone</label>
            <input id="st-gphone" className="field-input" value={newForm.guardianPhone} onChange={(e) => setNewForm((f) => ({ ...f, guardianPhone: e.target.value }))} />
          </div>
          <div>
            <label htmlFor="st-email" className="field-label">Student Email</label>
            <input id="st-email" type="email" className="field-input" value={newForm.email} onChange={(e) => setNewForm((f) => ({ ...f, email: e.target.value }))} />
          </div>
          <div>
            <label htmlFor="st-pass" className="field-label">Initial Password (Optional)</label>
            <input id="st-pass" className="field-input" placeholder="Default: msitm@2026" value={newForm.password} onChange={(e) => setNewForm((f) => ({ ...f, password: e.target.value }))} />
          </div>
        </div>
        <button type="submit" disabled={busy} className="btn btn-navy">
          <Icons.UserCheck className="h-4 w-4" aria-hidden="true" />
          {busy ? "Saving…" : "Enrol Student & Generate ID"}
        </button>
      </form>

      {/* 3. INLINE EDIT MODAL/PANEL WHEN EDITING A STUDENT */}
      {editing ? (
        <form onSubmit={handleSaveEdit} className="rounded-xl border-2 border-navy-900 bg-white p-6 space-y-4 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-line">
            <div>
              <p className="eyebrow">Editing Student Record</p>
              <h3 className="font-display text-xl font-semibold text-navy-900">
                {editing.fullName} ({editing.enrollmentNo})
              </h3>
            </div>
            <button type="button" onClick={() => setEditing(null)} className="btn btn-outline-dark btn-sm">
              <Icons.Close className="h-4 w-4" aria-hidden="true" />
              Close Editor
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label htmlFor="ed-enr" className="field-label">Enrollment No.</label>
              <input id="ed-enr" required className="field-input font-mono" value={editForm.enrollmentNo} onChange={(e) => setEditForm((f) => ({ ...f, enrollmentNo: e.target.value }))} />
            </div>
            <div>
              <label htmlFor="ed-roll" className="field-label">University Roll No.</label>
              <input id="ed-roll" required className="field-input font-mono" value={editForm.universityRollNo} onChange={(e) => setEditForm((f) => ({ ...f, universityRollNo: e.target.value }))} />
            </div>
            <div>
              <label htmlFor="ed-name" className="field-label">Full Name</label>
              <input id="ed-name" required className="field-input" value={editForm.fullName} onChange={(e) => setEditForm((f) => ({ ...f, fullName: e.target.value }))} />
            </div>
            <div>
              <label htmlFor="ed-father" className="field-label">Father&apos;s Name</label>
              <input id="ed-father" required className="field-input" value={editForm.fatherName} onChange={(e) => setEditForm((f) => ({ ...f, fatherName: e.target.value }))} />
            </div>
            <div>
              <label htmlFor="ed-course" className="field-label">Course</label>
              <select id="ed-course" className="field-select" value={editForm.course} onChange={(e) => setEditForm((f) => ({ ...f, course: e.target.value as "BCA" | "BBA" }))}>
                <option value="BCA">BCA</option>
                <option value="BBA">BBA</option>
              </select>
            </div>
            <div>
              <label htmlFor="ed-sem" className="field-label">Semester</label>
              <select id="ed-sem" className="field-select" value={editForm.semester} onChange={(e) => setEditForm((f) => ({ ...f, semester: Number(e.target.value) }))}>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>Semester {n}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="ed-sec" className="field-label">Section &amp; Batch</label>
              <div className="grid grid-cols-2 gap-2">
                <input id="ed-sec" className="field-input" value={editForm.section} onChange={(e) => setEditForm((f) => ({ ...f, section: e.target.value }))} />
                <input className="field-input" value={editForm.batch} onChange={(e) => setEditForm((f) => ({ ...f, batch: e.target.value }))} />
              </div>
            </div>
            <div>
              <label htmlFor="ed-stat" className="field-label">Status</label>
              <select id="ed-stat" className="field-select" value={editForm.status} onChange={(e) => setEditForm((f) => ({ ...f, status: e.target.value as StudentRecord["status"] }))}>
                <option value="active">Active</option>
                <option value="alumni">Alumni / Graduated</option>
                <option value="suspended">Suspended / Blocked</option>
              </select>
            </div>
            <div>
              <label htmlFor="ed-phone" className="field-label">Student Phone</label>
              <input id="ed-phone" required className="field-input" value={editForm.phone} onChange={(e) => setEditForm((f) => ({ ...f, phone: e.target.value }))} />
            </div>
            <div>
              <label htmlFor="ed-gphone" className="field-label">Guardian Phone</label>
              <input id="ed-gphone" required className="field-input" value={editForm.guardianPhone} onChange={(e) => setEditForm((f) => ({ ...f, guardianPhone: e.target.value }))} />
            </div>
            <div>
              <label htmlFor="ed-email" className="field-label">Email</label>
              <input id="ed-email" type="email" className="field-input" value={editForm.email} onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))} />
            </div>
            <div>
              <label htmlFor="ed-pwd" className="field-label">Reset Password (Optional)</label>
              <input id="ed-pwd" className="field-input" placeholder="Leave blank to keep" value={editForm.resetPassword} onChange={(e) => setEditForm((f) => ({ ...f, resetPassword: e.target.value }))} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="submit" disabled={busy} className="btn btn-navy">
              Save Student Changes
            </button>
            <button type="button" onClick={() => setEditing(null)} className="btn btn-outline-dark">
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      {/* 4. FILTERABLE ENROLLED STUDENTS REGISTRY (READ, EDIT, PROMOTE, DELETE) */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Student Master Registry ({filteredStudents.length} shown)</p>
            <h2 className="font-display text-xl font-semibold text-navy-900 mt-1">
              Class-Wise Enrolled UG Students
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select aria-label="Filter Course" className="field-select h-9 text-xs w-28" value={filterCourse} onChange={(e) => setFilterCourse(e.target.value as typeof filterCourse)}>
              <option value="ALL">All Courses</option>
              <option value="BCA">BCA</option>
              <option value="BBA">BBA</option>
            </select>
            <select aria-label="Filter Semester" className="field-select h-9 text-xs w-32" value={filterSem} onChange={(e) => setFilterSem(Number(e.target.value))}>
              <option value={0}>All Semesters</option>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>Sem {n}</option>
              ))}
            </select>
            <select aria-label="Filter Section" className="field-select h-9 text-xs w-28" value={filterSection} onChange={(e) => setFilterSection(e.target.value)}>
              <option value="ALL">All Sec</option>
              <option value="A">Sec A</option>
              <option value="B">Sec B</option>
            </select>
            <select aria-label="Filter Status" className="field-select h-9 text-xs w-28" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="ALL">All Status</option>
              <option value="active">Active</option>
              <option value="alumni">Alumni</option>
              <option value="suspended">Suspended</option>
            </select>
            <input
              type="search"
              placeholder="Search name, roll, phone…"
              className="field-input h-9 text-xs w-48"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto border border-line rounded-xl bg-white">
          <table className="table-msitm min-w-[920px]">
            <thead>
              <tr>
                <th scope="col">Enrollment &amp; Roll</th>
                <th scope="col">Student &amp; Father</th>
                <th scope="col">Class</th>
                <th scope="col">Contacts</th>
                <th scope="col">Status</th>
                <th scope="col">CRUD Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-6">
                    No students match the selected class filter.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((st) => (
                  <tr key={st.id}>
                    <td>
                      <p className="font-mono text-xs font-bold text-navy-900">{st.enrollmentNo}</p>
                      <p className="font-mono text-[11px] text-muted">Roll: {st.universityRollNo}</p>
                    </td>
                    <td>
                      <p className="font-semibold text-navy-900">{st.fullName}</p>
                      <p className="text-xs text-muted">{st.fatherName}</p>
                    </td>
                    <td>
                      {st.course} · Sem {st.semester} (Sec {st.section})
                      <span className="block text-[11px] text-muted">{st.batch}</span>
                    </td>
                    <td className="text-xs">
                      <p>{st.phone}</p>
                      <p className="text-muted">Guard: {st.guardianPhone}</p>
                    </td>
                    <td>
                      <span className={`rounded px-2 py-0.5 text-[11px] font-bold uppercase ${st.status === "suspended" ? "bg-destructive/10 text-destructive" : "bg-navy-50 text-navy-900"}`}>
                        {st.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <button type="button" onClick={() => startEdit(st)} className="btn btn-outline-dark btn-sm">
                          <Icons.Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                          Edit
                        </button>
                        <button type="button" disabled={busy} onClick={() => void handlePromote(st.id)} className="btn btn-navy btn-sm">
                          {st.semester < 6 ? `Sem ${st.semester + 1}` : "Grad"}
                        </button>
                        <button type="button" disabled={busy} onClick={() => void handleDeleteStudent(st)} className="btn btn-outline-dark btn-sm text-destructive border-destructive/40" aria-label={`Delete ${st.fullName}`}>
                          <Icons.Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. ADMISSION LEADS CONVERSION & STAFF ROLE ACCESS CONTROL */}
      <div className="grid lg:grid-cols-2 gap-6">
        <section className="card-line p-6 space-y-4">
          <div>
            <p className="eyebrow">Direct Intake</p>
            <h2 className="font-display text-xl font-semibold text-navy-900 mt-1">
              Online Admission Applications ({admissionLeads.length})
            </h2>
          </div>
          {admissionLeads.length === 0 ? (
            <p className="text-sm text-muted">All pending website applications have been processed.</p>
          ) : (
            <ul className="divide-y divide-line">
              {admissionLeads.map((lead) => (
                <li key={lead.id} className="py-3 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-navy-900 text-sm">
                      {lead.fullName} — {lead.course}
                    </p>
                    <p className="text-xs text-muted">
                      {lead.phone} · {lead.email} ({lead.qualification || "10+2"}, {lead.city || "Gonda"})
                    </p>
                  </div>
                  <button type="button" disabled={busy} onClick={() => void handleConvertLead(lead)} className="btn btn-navy btn-sm">
                    Enrol Lead → Student
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card-line p-6 space-y-4">
          <div>
            <p className="eyebrow">Admin Access Governance</p>
            <h2 className="font-display text-xl font-semibold text-navy-900 mt-1">
              Staff &amp; Role Portal Logins
            </h2>
          </div>
          <form onSubmit={handleCreateStaff} className="grid grid-cols-2 gap-2.5 pb-3 border-b border-line">
            <input required placeholder="Username (e.g. hod_bca)" className="field-input h-9 text-xs" value={staffForm.username} onChange={(e) => setStaffForm((s) => ({ ...s, username: e.target.value }))} />
            <input required placeholder="Display Name" className="field-input h-9 text-xs" value={staffForm.displayName} onChange={(e) => setStaffForm((s) => ({ ...s, displayName: e.target.value }))} />
            <select className="field-select h-9 text-xs" value={staffForm.role} onChange={(e) => setStaffForm((s) => ({ ...s, role: e.target.value as Exclude<PortalRole, "student"> }))}>
              <option value="faculty">Faculty / HOD</option>
              <option value="accounts">Accounts Office</option>
              <option value="exam_cell">Exam Cell</option>
              <option value="gate_guard">Gate Security</option>
              <option value="admin">Admin / Principal</option>
            </select>
            <div className="flex gap-2">
              <input placeholder="Password" className="field-input h-9 text-xs flex-1" value={staffForm.password} onChange={(e) => setStaffForm((s) => ({ ...s, password: e.target.value }))} />
              <button type="submit" disabled={busy} className="btn btn-navy btn-sm shrink-0">Add</button>
            </div>
          </form>
          <ul className="divide-y divide-line text-sm">
            {staffUsers.map((u) => (
              <li key={u.id} className="py-2.5 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold text-navy-900 text-xs">
                    {u.displayName} <span className="font-mono text-muted">(@{u.username})</span>
                  </p>
                  <p className="text-[11px] uppercase font-bold text-gold-700">{u.role.replace("_", " ")}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button type="button" onClick={() => void toggleStaffActive(u)} className="btn btn-outline-dark btn-sm">
                    {u.active ? "Disable" : "Enable"}
                  </button>
                  {u.username !== "admin" ? (
                    <button type="button" onClick={() => void removeStaff(u.id)} className="btn btn-outline-dark btn-sm text-destructive" aria-label={`Delete ${u.username}`}>
                      <Icons.Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

