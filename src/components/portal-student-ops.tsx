"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";
import type {
  AssignmentRecord,
  AssignmentSubmissionRecord,
  PlacementDriveRecord,
} from "@/lib/portal-types";

type StudentAssignment = AssignmentRecord & { submission: AssignmentSubmissionRecord | null };

export function AssignmentSubmissionList({ assignments }: { assignments: StudentAssignment[] }) {
  const router = useRouter();
  const [openId, setOpenId] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [attachmentRef, setAttachmentRef] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent, assignmentId: number) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const res = await fetch("/api/portal/learning", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "submit", assignmentId, submissionNote: note, attachmentRef }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error ?? "Submission failed.");
      } else {
        setMessage("Work submitted to subject faculty.");
        setOpenId(null);
        setNote("");
        setAttachmentRef("");
        router.refresh();
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      {message ? (
        <div role="status" className="rounded-xl border border-gold-400 bg-white px-4 py-3 text-sm font-semibold text-navy-900">
          {message}
        </div>
      ) : null}

      <div className="grid gap-4">
        {assignments.length === 0 ? (
          <div className="card-line p-6 text-sm text-muted">
            No active assignments, practicals, or study notes published for your semester yet.
          </div>
        ) : (
          assignments.map((item) => {
            const sub = item.submission;
            const isOpen = openId === item.id;
            const isNotesOnly = item.kind === "Study Notes";
            return (
              <div key={item.id} className="card-line p-5 sm:p-6 space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded bg-gold-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-gold-700">
                        {item.kind}
                      </span>
                      <span className="font-mono text-xs font-bold text-navy-900">{item.subjectCode}</span>
                      <span className="text-xs text-muted">Due {item.dueDate}</span>
                    </div>
                    <h3 className="font-display mt-1.5 text-lg font-semibold text-navy-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted leading-relaxed">{item.instructions}</p>
                    <p className="mt-1 text-xs text-muted">Faculty: {item.createdBy}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {sub ? (
                      <span
                        className={`rounded px-2.5 py-1 text-xs font-bold uppercase ${
                          sub.status === "evaluated"
                            ? "bg-navy-900 text-gold-300"
                            : "bg-navy-50 text-navy-900 border border-navy-100"
                        }`}
                      >
                        {sub.status === "evaluated" && sub.marksAwarded !== null
                          ? `Evaluated: ${sub.marksAwarded}/${sub.maxMarks}`
                          : "Submitted"}
                      </span>
                    ) : null}

                    {!isNotesOnly ? (
                      <button
                        type="button"
                        onClick={() => setOpenId(isOpen ? null : item.id)}
                        className="btn btn-navy btn-sm"
                      >
                        {sub ? "Update Submission" : "Submit Work"}
                      </button>
                    ) : null}
                  </div>
                </div>

                {sub ? (
                  <div className="rounded-lg bg-parchment border border-line px-4 py-3 text-xs space-y-1">
                    <p className="font-semibold text-navy-900">
                      Your Submission: <span className="font-mono">{sub.attachmentRef || "Note attached"}</span>
                    </p>
                    <p className="text-muted">{sub.submissionNote}</p>
                    {sub.feedback ? (
                      <p className="text-navy-900">
                        <strong>Faculty Remark:</strong> {sub.feedback}
                      </p>
                    ) : null}
                  </div>
                ) : null}

                {isOpen ? (
                  <form onSubmit={(e) => void handleSubmit(e, item.id)} className="pt-3 border-t border-line grid gap-3">
                    <div>
                      <label htmlFor={`ref-${item.id}`} className="field-label">
                        Project / Lab File Reference or URL
                      </label>
                      <input
                        id={`ref-${item.id}`}
                        className="field-input"
                        placeholder="e.g., GitHub repo URL, Google Drive PDF link, or Lab File Roll No."
                        value={attachmentRef}
                        onChange={(e) => setAttachmentRef(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor={`note-${item.id}`} className="field-label">
                        Submission Summary / Work Description *
                      </label>
                      <textarea
                        id={`note-${item.id}`}
                        required
                        className="field-textarea"
                        placeholder="Briefly describe programs executed, tables/models verified, or internship survey findings..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button type="submit" disabled={busy} className="btn btn-navy btn-sm">
                        {busy ? "Uploading…" : "Confirm Submission"}
                      </button>
                      <button type="button" onClick={() => setOpenId(null)} className="btn btn-outline-dark btn-sm">
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : null}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export function ResultTranscriptPrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn btn-navy btn-sm print-hidden">
      <Icons.Download className="h-3.5 w-3.5" aria-hidden="true" />
      Print Grade Sheet
    </button>
  );
}

export function LabAndGrievanceForms() {
  const router = useRouter();
  const [labName, setLabName] = useState<"Computer Lab 1" | "Computer Lab 2" | "IoT & Hardware Wing">("Computer Lab 1");
  const [workstationCode, setWorkstationCode] = useState("");
  const [labCategory, setLabCategory] = useState<"Hardware" | "Software/Compiler" | "Network/Wi-Fi" | "Projector">("Hardware");
  const [priority, setPriority] = useState<"Normal" | "Urgent">("Normal");
  const [labDesc, setLabDesc] = useState("");
  const [labMsg, setLabMsg] = useState("");
  const [labBusy, setLabBusy] = useState(false);

  const [grvCategory, setGrvCategory] = useState<
    "Academic" | "Infrastructure" | "Examination" | "Anti-Ragging (Confidential)" | "Fee & Scholarship"
  >("Academic");
  const [grvSubject, setGrvSubject] = useState("");
  const [grvDetails, setGrvDetails] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [grvMsg, setGrvMsg] = useState("");
  const [grvBusy, setGrvBusy] = useState(false);

  async function reportLab(e: FormEvent) {
    e.preventDefault();
    setLabBusy(true);
    setLabMsg("");
    try {
      const res = await fetch("/api/portal/campus-ops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "report_lab",
          labName,
          workstationCode,
          category: labCategory,
          priority,
          description: labDesc,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLabMsg(data.error ?? "Failed to log lab issue.");
      } else {
        setLabMsg(`Lab ticket #${data.ticket.id} logged for ${data.ticket.workstationCode}.`);
        setWorkstationCode("");
        setLabDesc("");
        router.refresh();
      }
    } finally {
      setLabBusy(false);
    }
  }

  async function submitGrievance(e: FormEvent) {
    e.preventDefault();
    setGrvBusy(true);
    setGrvMsg("");
    try {
      const res = await fetch("/api/portal/campus-ops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "submit_grievance",
          category: grvCategory,
          subject: grvSubject,
          details: grvDetails,
          isAnonymous,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setGrvMsg(data.error ?? "Failed to submit grievance.");
      } else {
        setGrvMsg(`Grievance registered (${data.grievance.ticketCode}). Track updates below.`);
        setGrvSubject("");
        setGrvDetails("");
        setIsAnonymous(false);
        router.refresh();
      }
    } finally {
      setGrvBusy(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <form onSubmit={reportLab} className="card-line p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="eyebrow">250+ Workstations</p>
            <h2 className="font-display text-xl font-semibold text-navy-900 mt-1">Computer Lab Hardware / Wi-Fi Desk</h2>
          </div>
          <Icons.Monitor className="h-5 w-5 text-gold-600" aria-hidden="true" />
        </div>
        {labMsg ? <p role="status" className="text-sm font-semibold text-navy-900">{labMsg}</p> : null}
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="lab-wing" className="field-label">Lab Wing</label>
            <select id="lab-wing" className="field-select" value={labName} onChange={(e) => setLabName(e.target.value as typeof labName)}>
              <option value="Computer Lab 1">Computer Lab 1</option>
              <option value="Computer Lab 2">Computer Lab 2</option>
              <option value="IoT & Hardware Wing">IoT &amp; Hardware Wing</option>
            </select>
          </div>
          <div>
            <label htmlFor="lab-pc" className="field-label">Workstation Code *</label>
            <input id="lab-pc" required className="field-input" placeholder="e.g., PC-L1-14" value={workstationCode} onChange={(e) => setWorkstationCode(e.target.value)} />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="lab-cat" className="field-label">Issue Type</label>
            <select id="lab-cat" className="field-select" value={labCategory} onChange={(e) => setLabCategory(e.target.value as typeof labCategory)}>
              <option value="Hardware">Hardware</option>
              <option value="Software/Compiler">Software/Compiler</option>
              <option value="Network/Wi-Fi">Network/Wi-Fi</option>
              <option value="Projector">Projector</option>
            </select>
          </div>
          <div>
            <label htmlFor="lab-pri" className="field-label">Priority</label>
            <select id="lab-pri" className="field-select" value={priority} onChange={(e) => setPriority(e.target.value as typeof priority)}>
              <option value="Normal">Normal</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="lab-desc" className="field-label">Fault Description *</label>
          <textarea id="lab-desc" required className="field-textarea" placeholder="Describe compiler missing, keyboard/mouse fault, or LAN drop..." value={labDesc} onChange={(e) => setLabDesc(e.target.value)} />
        </div>
        <button type="submit" disabled={labBusy} className="btn btn-navy w-full sm:w-auto">
          <Icons.Wrench className="h-4 w-4" aria-hidden="true" />
          {labBusy ? "Logging…" : "Report Lab Issue"}
        </button>
      </form>

      <form onSubmit={submitGrievance} className="card-line p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="eyebrow">IQAC &amp; Anti-Ragging Compliance</p>
            <h2 className="font-display text-xl font-semibold text-navy-900 mt-1">Student Grievance Redressal Desk</h2>
          </div>
          <Icons.ShieldAlert className="h-5 w-5 text-gold-600" aria-hidden="true" />
        </div>
        {grvMsg ? <p role="status" className="text-sm font-semibold text-navy-900">{grvMsg}</p> : null}
        <div>
          <label htmlFor="grv-cat" className="field-label">Committee / Category</label>
          <select id="grv-cat" className="field-select" value={grvCategory} onChange={(e) => setGrvCategory(e.target.value as typeof grvCategory)}>
            <option value="Academic">Academic</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Examination">Examination</option>
            <option value="Fee & Scholarship">Fee &amp; Scholarship</option>
            <option value="Anti-Ragging (Confidential)">Anti-Ragging (Confidential)</option>
          </select>
        </div>
        <div>
          <label htmlFor="grv-sub" className="field-label">Subject *</label>
          <input id="grv-sub" required className="field-input" placeholder="Short summary of concern" value={grvSubject} onChange={(e) => setGrvSubject(e.target.value)} />
        </div>
        <div>
          <label htmlFor="grv-det" className="field-label">Details *</label>
          <textarea id="grv-det" required className="field-textarea" placeholder="Provide complete facts, dates, or suggestions for resolution..." value={grvDetails} onChange={(e) => setGrvDetails(e.target.value)} />
        </div>
        <label className="flex items-center gap-2 text-sm text-navy-900 cursor-pointer">
          <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} className="h-4 w-4 rounded border-line" />
          <span>Hide my name in faculty review (Confidential / Anti-Ragging protection)</span>
        </label>
        <button type="submit" disabled={grvBusy} className="btn btn-gold w-full sm:w-auto">
          Submit Grievance
        </button>
      </form>
    </div>
  );
}

export function PrintDocumentButton({ label = "Print / Save PDF" }: { label?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className="btn btn-navy btn-sm print-hidden">
      <Icons.Download className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </button>
  );
}

export function PlacementDriveList({
  drives,
  studentId,
}: {
  drives: PlacementDriveRecord[];
  studentId: number;
}) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<number | null>(null);

  async function toggleRegister(driveId: number) {
    setBusyId(driveId);
    try {
      const res = await fetch("/api/portal/campus-ops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "register_drive", driveId }),
      });
      if (res.ok) router.refresh();
    } finally {
      setBusyId(null);
    }
  }

  return (
    <section className="space-y-3">
      <div>
        <p className="eyebrow">Careers, Drives &amp; Scholarships</p>
        <h2 className="font-display text-xl font-semibold text-navy-900 mt-1">
          Campus Placement Drives &amp; Scholarship Camps
        </h2>
      </div>
      {drives.length === 0 ? (
        <div className="card-line p-6 text-sm text-muted">No upcoming drives or scholarship camps posted for your course.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {drives.map((d) => {
            const registered = d.registeredStudentIds.includes(studentId);
            return (
              <div key={d.id} className="card-line p-5 flex flex-col justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded bg-gold-100 px-2 py-0.5 text-[11px] font-bold uppercase text-gold-700">
                      {d.kind}
                    </span>
                    <span className="text-xs font-mono text-muted">{d.driveDate}</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-navy-900 mt-2">{d.companyOrScheme}</h3>
                  <p className="text-xs font-semibold text-navy-900 mt-1">
                    {d.ctcOrBenefit} · {d.venue}
                  </p>
                  <p className="text-xs text-muted mt-1.5 leading-relaxed">{d.description}</p>
                </div>
                <div className="pt-2 border-t border-line flex items-center justify-between gap-2">
                  <span className="text-xs text-muted">Min CGPA: {d.minCgpa}</span>
                  <button
                    type="button"
                    disabled={busyId === d.id}
                    onClick={() => void toggleRegister(d.id)}
                    className={`btn btn-sm ${registered ? "btn-gold" : "btn-navy"}`}
                  >
                    {registered ? "Registered (Cancel)" : "Register Interest"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

