import { NextRequest, NextResponse } from "next/server";
import { getPortalSessionFromRequest } from "@/lib/portal-auth";
import { buildXlsxWorkbook, parseSpreadsheetBuffer } from "@/lib/excel-io";
import { bulkImportStudents, getAdminOverview } from "@/lib/portal-store";

const STUDENT_HEADERS = [
  "Enrollment No",
  "University Roll No",
  "Full Name",
  "Father Name",
  "DOB (YYYY-MM-DD)",
  "Student Phone",
  "Guardian Phone",
  "Email",
  "Blood Group",
  "Course",
  "Semester",
  "Section",
  "Batch",
];

export async function GET(req: NextRequest) {
  const session = getPortalSessionFromRequest(req);
  if (!session || session.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Admin role required." }, { status: 403 });
  }

  const sp = req.nextUrl.searchParams;
  const courseParam = sp.get("course")?.toUpperCase() || "ALL";
  const course = courseParam === "BCA" || courseParam === "BBA" ? courseParam : "ALL";
  const semester = Number(sp.get("semester") ?? "0") || 0;
  const section = (sp.get("section") || "A").toUpperCase();
  const batch = sp.get("batch") || "2026–29";

  if (sp.get("export") === "1") {
    const overview = await getAdminOverview();
    const filtered = overview.studentSnapshots
      .map((s) => s.student)
      .filter((st) => (course === "ALL" || st.course === course) && (semester === 0 || st.semester === semester));

    const rows: (string | number)[][] = filtered.map((s) => [
      s.enrollmentNo,
      s.universityRollNo || "",
      s.fullName,
      s.fatherName,
      s.dob,
      s.phone,
      s.guardianPhone,
      s.email || "",
      s.bloodGroup || "",
      s.course,
      s.semester,
      s.section,
      s.batch,
    ]);

    const buf = buildXlsxWorkbook(
      `${course}_Sem${semester || "All"}`,
      STUDENT_HEADERS,
      rows
    );
    const filename = `MSITM_${course}_Sem${semester || "All"}_Students.xlsx`;
    return new NextResponse(new Uint8Array(buf), {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  }

  const sampleCourse = course === "ALL" ? "BCA" : course;
  const sampleSem = semester > 0 ? semester : 1;
  const yr = batch.slice(2, 4) || "26";
  const sampleRows: (string | number)[][] = [
    [
      `MSITM-${sampleCourse}-20${yr}-101`,
      `${yr}10${sampleCourse === "BCA" ? "84" : "42"}101`,
      "Aarav Shukla",
      "Shri Manoj Shukla",
      "2007-05-14",
      "+91-9450112233",
      "+91-9450112200",
      "aarav.shukla@student.msitm.edu.in",
      "B+",
      sampleCourse,
      sampleSem,
      section,
      batch,
    ],
    [
      `MSITM-${sampleCourse}-20${yr}-102`,
      `${yr}10${sampleCourse === "BCA" ? "84" : "42"}102`,
      "Kavya Mishra",
      "Shri Dinesh Mishra",
      "2007-09-21",
      "+91-9839445566",
      "+91-9839445500",
      "kavya.mishra@student.msitm.edu.in",
      "O+",
      sampleCourse,
      sampleSem,
      section,
      batch,
    ],
  ];

  const templateBuf = buildXlsxWorkbook(
    `${sampleCourse}_Sem${sampleSem}_${section}`,
    STUDENT_HEADERS,
    sampleRows
  );
  return new NextResponse(new Uint8Array(templateBuf), {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="MSITM_${sampleCourse}_Sem${sampleSem}_Import_Template.xlsx"`,
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const session = getPortalSessionFromRequest(req);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ ok: false, error: "Admin role required." }, { status: 403 });
    }

    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ ok: false, error: "Please attach a valid .xlsx or .csv file." }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ ok: false, error: "Spreadsheet file must be under 5 MB." }, { status: 400 });
    }

    const defaultCourse = form.get("course") === "BBA" ? "BBA" : "BCA";
    const defaultSemester = Math.min(6, Math.max(1, Number(form.get("semester") ?? 1) || 1));
    const defaultSection = String(form.get("section") || "A").toUpperCase().slice(0, 8) || "A";
    const defaultBatch = String(form.get("batch") || "2026–29").trim() || "2026–29";
    const updateExisting = form.get("updateExisting") === "true";
    const dryRun = form.get("dryRun") === "true";

    const arrayBuf = await file.arrayBuffer();
    const parsed = parseSpreadsheetBuffer(Buffer.from(arrayBuf), file.name);
    const result = await bulkImportStudents({
      rows: parsed.records,
      defaultCourse,
      defaultSemester,
      defaultSection,
      defaultBatch,
      updateExisting,
      dryRun,
    });

    return NextResponse.json({
      ok: true,
      dryRun,
      totalRows: parsed.records.length,
      ...result,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Could not parse spreadsheet." },
      { status: 400 }
    );
  }
}

