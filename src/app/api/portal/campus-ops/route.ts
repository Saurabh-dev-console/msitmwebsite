import { NextRequest, NextResponse } from "next/server";
import { getPortalSessionFromRequest } from "@/lib/portal-auth";
import {
  createLabTicket,
  deleteLabTicket,
  deleteLibraryIssue,
  deletePlacementDrive,
  issueLibraryBook,
  resolveGrievance,
  submitGrievance,
  togglePlacementDriveRegistration,
  updateLabTicket,
  updateLibraryIssue,
  upsertPlacementDrive,
} from "@/lib/portal-store";
import type {
  GrievanceRecord,
  LabTicketRecord,
  LibraryIssueRecord,
  PlacementDriveRecord,
} from "@/lib/portal-types";

export async function POST(req: NextRequest) {
  try {
    const session = getPortalSessionFromRequest(req);
    if (!session) return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });

    const body = await req.json();

    if (body.action === "register_drive") {
      const studentId = session.role === "student" ? session.studentId : Number(body.studentId);
      const driveId = Number(body.driveId);
      if (!studentId || !driveId) {
        return NextResponse.json({ ok: false, error: "Student and drive ID required." }, { status: 400 });
      }
      const drive = await togglePlacementDriveRegistration(driveId, studentId);
      return NextResponse.json({ ok: true, drive });
    }

    if (body.action === "upsert_drive") {
      if (session.role === "student" || session.role === "gate_guard") {
        return NextResponse.json({ ok: false, error: "Staff role required." }, { status: 403 });
      }
      if (typeof body.companyOrScheme !== "string" || !body.companyOrScheme.trim()) {
        return NextResponse.json({ ok: false, error: "Title/company name required." }, { status: 400 });
      }
      const drive = await upsertPlacementDrive({
        id: body.id ? Number(body.id) : undefined,
        companyOrScheme: body.companyOrScheme,
        kind: (["Placement Drive", "Scholarship", "Workshop"].includes(body.kind)
          ? body.kind
          : "Placement Drive") as PlacementDriveRecord["kind"],
        eligibleCourses: (body.eligibleCourses === "BCA" || body.eligibleCourses === "BBA"
          ? body.eligibleCourses
          : "ALL") as PlacementDriveRecord["eligibleCourses"],
        minCgpa: typeof body.minCgpa === "string" ? body.minCgpa : "0.0",
        driveDate: typeof body.driveDate === "string" ? body.driveDate : "2026-12-15",
        venue: typeof body.venue === "string" ? body.venue : "MSITM Campus",
        ctcOrBenefit: typeof body.ctcOrBenefit === "string" ? body.ctcOrBenefit : "As per norms",
        description: typeof body.description === "string" ? body.description : "",
        active: typeof body.active === "boolean" ? body.active : true,
      });
      return NextResponse.json({ ok: true, drive });
    }

    if (body.action === "issue_book") {
      if (session.role === "student" || session.role === "gate_guard") {
        return NextResponse.json({ ok: false, error: "Staff role required." }, { status: 403 });
      }
      const studentId = Number(body.studentId);
      if (!studentId || typeof body.bookTitle !== "string" || !body.bookTitle.trim()) {
        return NextResponse.json({ ok: false, error: "Student ID and book title required." }, { status: 400 });
      }
      const issue = await issueLibraryBook({
        studentId,
        accessionNo: typeof body.accessionNo === "string" && body.accessionNo.trim() ? body.accessionNo : "LIB-UG-101",
        bookTitle: body.bookTitle,
        author: typeof body.author === "string" ? body.author : "Academic Press",
        dueDate: typeof body.dueDate === "string" ? body.dueDate : "2026-12-05",
      });
      return NextResponse.json({ ok: true, issue });
    }

    if (body.action === "report_lab") {
      if (typeof body.workstationCode !== "string" || !body.workstationCode.trim() || typeof body.description !== "string" || !body.description.trim()) {
        return NextResponse.json({ ok: false, error: "Workstation code and description required." }, { status: 400 });
      }
      const ticket = await createLabTicket({
        labName: (["Computer Lab 1", "Computer Lab 2", "IoT & Hardware Wing"].includes(body.labName)
          ? body.labName
          : "Computer Lab 1") as LabTicketRecord["labName"],
        workstationCode: body.workstationCode,
        category: (["Hardware", "Software/Compiler", "Network/Wi-Fi", "Projector"].includes(body.category)
          ? body.category
          : "Hardware") as LabTicketRecord["category"],
        description: body.description,
        reportedBy: session.displayName,
        priority: body.priority === "Urgent" ? "Urgent" : "Normal",
      });
      return NextResponse.json({ ok: true, ticket });
    }

    if (body.action === "submit_grievance") {
      const studentId = session.role === "student" ? session.studentId : Number(body.studentId);
      if (!studentId || typeof body.subject !== "string" || !body.subject.trim() || typeof body.details !== "string" || !body.details.trim()) {
        return NextResponse.json({ ok: false, error: "Subject and grievance details required." }, { status: 400 });
      }
      const grievance = await submitGrievance({
        studentId,
        category: ([
          "Academic",
          "Infrastructure",
          "Examination",
          "Anti-Ragging (Confidential)",
          "Fee & Scholarship",
        ].includes(body.category)
          ? body.category
          : "Academic") as GrievanceRecord["category"],
        subject: body.subject,
        details: body.details,
        isAnonymous: Boolean(body.isAnonymous),
      });
      return NextResponse.json({ ok: true, grievance });
    }

    return NextResponse.json({ ok: false, error: "Unsupported action." }, { status: 400 });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Server error." },
      { status: 400 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = getPortalSessionFromRequest(req);
    if (!session || session.role === "student" || session.role === "gate_guard") {
      return NextResponse.json({ ok: false, error: "Staff role required." }, { status: 403 });
    }

    const body = await req.json();

    if (body.action === "update_book") {
      const issue = await updateLibraryIssue({
        issueId: Number(body.issueId),
        status: (["issued", "overdue", "returned"].includes(body.status) ? body.status : "returned") as LibraryIssueRecord["status"],
        fineAmount: typeof body.fineAmount === "number" ? body.fineAmount : undefined,
      });
      return NextResponse.json({ ok: true, issue });
    }

    if (body.action === "update_lab") {
      const ticket = await updateLabTicket({
        ticketId: Number(body.ticketId),
        status: (["open", "in_progress", "resolved"].includes(body.status) ? body.status : "resolved") as LabTicketRecord["status"],
        resolutionNote: typeof body.resolutionNote === "string" ? body.resolutionNote : "Resolved by Hardware Wing",
      });
      return NextResponse.json({ ok: true, ticket });
    }

    if (body.action === "resolve_grievance") {
      const grievance = await resolveGrievance({
        grievanceId: Number(body.grievanceId),
        status: (["submitted", "under_review", "resolved"].includes(body.status) ? body.status : "resolved") as GrievanceRecord["status"],
        actionTaken: typeof body.actionTaken === "string" ? body.actionTaken : "Action logged by Committee",
      });
      return NextResponse.json({ ok: true, grievance });
    }

    return NextResponse.json({ ok: false, error: "Unsupported action." }, { status: 400 });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Server error." },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = getPortalSessionFromRequest(req);
    if (!session || session.role === "student" || session.role === "gate_guard") {
      return NextResponse.json({ ok: false, error: "Staff role required." }, { status: 403 });
    }

    const sp = req.nextUrl.searchParams;
    const driveId = Number(sp.get("driveId") ?? "0");
    if (driveId) {
      await deletePlacementDrive(driveId);
      return NextResponse.json({ ok: true });
    }
    const bookId = Number(sp.get("bookId") ?? "0");
    if (bookId) {
      await deleteLibraryIssue(bookId);
      return NextResponse.json({ ok: true });
    }
    const ticketId = Number(sp.get("ticketId") ?? "0");
    if (ticketId) {
      await deleteLabTicket(ticketId);
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: false, error: "ID parameter required." }, { status: 400 });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Server error." },
      { status: 400 }
    );
  }
}
