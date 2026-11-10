"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { COURSES } from "@/data/courses";

type Status = "idle" | "sending" | "error";

function useHoneypot() {
  const [value, setValue] = useState("");
  return { value, setValue };
}

function Honeypot({ value, setValue }: { value: string; setValue: (v: string) => void }) {
  return (
    <div className="hidden" aria-hidden="true">
      <label>
        Leave this field blank
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="field-error">
      {message}
    </p>
  );
}

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const phoneOk = (v: string) => v.trim() === "" || /^[+\d][\d\s-]{7,16}$/.test(v.trim());

/* ================= Enquiry form ================= */

export function EnquiryForm({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const hp = useHoneypot();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      firstName: String(fd.get("firstName") ?? "").trim(),
      lastName: String(fd.get("lastName") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      interest: String(fd.get("interest") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      website: hp.value,
    };
    const next: Record<string, string> = {};
    if (!data.firstName) next.firstName = "First name is required.";
    if (!data.lastName) next.lastName = "Last name is required.";
    if (!emailOk(data.email)) next.email = "Enter a valid email address.";
    if (!phoneOk(data.phone)) next.phone = "Enter a valid phone number.";
    if (!data.message || data.message.length < 10) next.message = "Please write at least a few words (10+ characters).";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      router.push("/thank-you");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4 min-w-0">
      <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div className="min-w-0">
          <label className="field-label" htmlFor="eq-first">First name *</label>
          <input className="field-input" id="eq-first" name="firstName" autoComplete="given-name" />
          <FieldError message={errors.firstName} />
        </div>
        <div className="min-w-0">
          <label className="field-label" htmlFor="eq-last">Last name *</label>
          <input className="field-input" id="eq-last" name="lastName" autoComplete="family-name" />
          <FieldError message={errors.lastName} />
        </div>
      </div>
      <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div className="min-w-0">
          <label className="field-label" htmlFor="eq-phone">Phone</label>
          <input className="field-input" id="eq-phone" name="phone" type="tel" autoComplete="tel" placeholder="+91-…" />
          <FieldError message={errors.phone} />
        </div>
        <div className="min-w-0">
          <label className="field-label" htmlFor="eq-email">Email *</label>
          <input className="field-input" id="eq-email" name="email" type="email" autoComplete="email" />
          <FieldError message={errors.email} />
        </div>
      </div>
      <div>
        <label className="field-label" htmlFor="eq-interest">I am interested in</label>
        <select className="field-select" id="eq-interest" name="interest" defaultValue="Undergraduate (BBA / BCA)">
          <option>Undergraduate (BBA / BCA)</option>
          <option>Postgraduate (MBA / MCA)</option>
          <option>Diploma courses</option>
          <option>Certificate courses</option>
          <option>Placements & careers</option>
          <option>Something else</option>
        </select>
      </div>
      <div>
        <label className="field-label" htmlFor="eq-msg">Message *</label>
        <textarea className="field-textarea" id="eq-msg" name="message" rows={4} />
        <FieldError message={errors.message} />
      </div>
      <Honeypot value={hp.value} setValue={hp.setValue} />
      {status === "error" ? (
        <p role="alert" className="field-error">
          Something went wrong while sending. Please call +91-9565661505 instead.
        </p>
      ) : null}
      <button type="submit" disabled={status === "sending"} className="btn btn-gold w-full disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Enquire now"}
      </button>
      <p className="text-xs text-muted text-center">We respond within one business day.</p>
    </form>
  );
}

/* ================= Admission form ================= */

export function AdmissionForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const hp = useHoneypot();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      fullName: String(fd.get("fullName") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      course: String(fd.get("course") ?? "").trim(),
      qualification: String(fd.get("qualification") ?? "").trim(),
      city: String(fd.get("city") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      website: hp.value,
    };
    const next: Record<string, string> = {};
    if (!data.fullName) next.fullName = "Full name is required.";
    if (!emailOk(data.email)) next.email = "Enter a valid email address.";
    if (!phoneOk(data.phone) || !data.phone) next.phone = "Enter a valid phone number.";
    if (!data.course) next.course = "Please choose a programme.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      router.push("/thank-you");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4 min-w-0">
      <div className="min-w-0">
        <label className="field-label" htmlFor="ad-name">Full name *</label>
        <input className="field-input" id="ad-name" name="fullName" autoComplete="name" />
        <FieldError message={errors.fullName} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <label className="field-label" htmlFor="ad-email">Email *</label>
          <input className="field-input" id="ad-email" name="email" type="email" autoComplete="email" />
          <FieldError message={errors.email} />
        </div>
        <div className="min-w-0">
          <label className="field-label" htmlFor="ad-phone">Phone *</label>
          <input className="field-input" id="ad-phone" name="phone" type="tel" autoComplete="tel" />
          <FieldError message={errors.phone} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <label className="field-label" htmlFor="ad-course">Programme applied for *</label>
          <select className="field-select" id="ad-course" name="course" defaultValue="">
            <option value="" disabled>Select a programme…</option>
            {COURSES.map((c) => (
              <option key={c.slug} value={`${c.title} — ${c.fullName}`}>
                {c.title} — {c.fullName}
              </option>
            ))}
          </select>
          <FieldError message={errors.course} />
        </div>
      <div className="min-w-0">
          <label className="field-label" htmlFor="ad-qual">Highest qualification</label>
          <select className="field-select" id="ad-qual" name="qualification" defaultValue="Class 12 (appearing / passed)">
            <option>Class 10</option>
            <option>Class 12 (appearing / passed)</option>
            <option>Diploma / ITI</option>
            <option>Graduation</option>
            <option>Post-graduation</option>
          </select>
        </div>
      </div>
      <div>
        <label className="field-label" htmlFor="ad-city">City / District</label>
        <input className="field-input" id="ad-city" name="city" autoComplete="address-level2" placeholder="e.g. Gonda" />
      </div>
      <div>
        <label className="field-label" htmlFor="ad-msg">Anything we should know? (optional)</label>
        <textarea className="field-textarea" id="ad-msg" name="message" rows={3} />
      </div>
      <Honeypot value={hp.value} setValue={hp.setValue} />
      {status === "error" ? (
        <p role="alert" className="field-error">
          Something went wrong while sending. Please call +91-9565661505 instead.
        </p>
      ) : null}
      <button type="submit" disabled={status === "sending"} className="btn btn-navy w-full disabled:opacity-60">
        {status === "sending" ? "Submitting…" : "Submit application request"}
      </button>
      <p className="text-xs text-muted text-center">
        This request notifies the admissions office. Final admission follows university &amp; institute norms.
      </p>
    </form>
  );
}

/* ================= Feedback form ================= */

export function FeedbackForm({ kind, title }: { kind: "feedback" | "survey"; title: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const hp = useHoneypot();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      firstName: String(fd.get("firstName") ?? "").trim(),
      lastName: String(fd.get("lastName") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      kind,
      website: hp.value,
    };
    const next: Record<string, string> = {};
    if (!data.firstName) next.firstName = "First name is required.";
    if (!data.lastName) next.lastName = "Last name is required.";
    if (!emailOk(data.email)) next.email = "Enter a valid email address.";
    if (!data.message || data.message.length < 10) next.message = "Please write at least a few words (10+ characters).";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      router.push("/thank-you");
    } catch {
      setStatus("error");
    }
  }

  const idp = kind === "survey" ? "sv" : "fb";
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <p className="font-display text-xl font-semibold text-navy-900">{title}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor={`${idp}-first`}>First name *</label>
          <input className="field-input" id={`${idp}-first`} name="firstName" />
          <FieldError message={errors.firstName} />
        </div>
        <div>
          <label className="field-label" htmlFor={`${idp}-last`}>Last name *</label>
          <input className="field-input" id={`${idp}-last`} name="lastName" />
          <FieldError message={errors.lastName} />
        </div>
      </div>
      <div>
        <label className="field-label" htmlFor={`${idp}-email`}>Email *</label>
        <input className="field-input" id={`${idp}-email`} name="email" type="email" />
        <FieldError message={errors.email} />
      </div>
      <div>
        <label className="field-label" htmlFor={`${idp}-msg`}>Message *</label>
        <textarea className="field-textarea" id={`${idp}-msg`} name="message" rows={4} />
        <FieldError message={errors.message} />
      </div>
      <Honeypot value={hp.value} setValue={hp.setValue} />
      {status === "error" ? (
        <p role="alert" className="field-error">
          Something went wrong while sending. Please try again later.
        </p>
      ) : null}
      <button type="submit" disabled={status === "sending"} className="btn btn-navy w-full sm:w-auto disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}

/* ================= Certificate lookup ================= */

export function CertificateLookup({ event }: { event: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? "").trim(),
      certificateId: String(fd.get("certificateId") ?? "").trim(),
      event,
    };
    const next: Record<string, string> = {};
    if (!data.name) next.name = "Please enter the participant name.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/certificate-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setDone(true);
    } catch {
      setStatus("error");
    }
  }

  if (done) {
    return (
      <div className="border border-line bg-gold-50 p-6">
        <p className="font-display text-xl font-semibold text-navy-900">Request recorded</p>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/85">
          The institute&apos;s certificate records are maintained offline by the MSITM office and were not published
          on the website, so instant download is not available here. Your request has been logged — the office will
          verify and respond. For immediate help, call the event helpline{" "}
          <a href="tel:+919918942937" className="font-semibold text-navy-900 link-underline">
            +91-9918942937
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div>
        <label className="field-label" htmlFor="ct-name">Participant name *</label>
        <input className="field-input" id="ct-name" name="name" autoComplete="name" placeholder="As registered for the competition" />
        <FieldError message={errors.name} />
      </div>
      <div>
        <label className="field-label" htmlFor="ct-id">Certificate ID (if known)</label>
        <input className="field-input" id="ct-id" name="certificateId" placeholder="Optional" />
      </div>
      {status === "error" ? (
        <p role="alert" className="field-error">
          Something went wrong. Please call the helpline +91-9918942937.
        </p>
      ) : null}
      <button type="submit" disabled={status === "sending"} className="btn btn-navy w-full sm:w-auto disabled:opacity-60">
        {status === "sending" ? "Checking…" : "Verify & request certificate"}
      </button>
    </form>
  );
}
