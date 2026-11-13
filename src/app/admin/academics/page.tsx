import { PortalShell } from "@/components/portal-shell";
import { NoticeAndCertManager } from "@/components/portal-admin";
import { AcademicsControlPanel } from "@/components/portal-admin-controls";
import { FacultyOpsManager } from "@/components/portal-admin-ops";
import { requireStaffContext } from "@/lib/portal-guards";

export const dynamic = "force-dynamic";

export default async function AdminAcademicsPage() {
  const { session, overview } = await requireStaffContext(["admin", "faculty"]);

  return (
    <PortalShell
      session={session}
      mode="admin"
      subtitle="Class Attendance Register, Internal Marks, Timetable CRUD, Faculty Syllabus, Notices & Certificates"
    >
      <div className="space-y-8">
        <AcademicsControlPanel
          snapshots={overview.studentSnapshots}
          timetable={overview.timetable}
        />

        <NoticeAndCertManager
          snapshots={overview.studentSnapshots}
          certificates={overview.certificates}
          notices={overview.notices}
        />

        <FacultyOpsManager
          allocations={overview.facultyAllocations}
          assignments={overview.assignments}
          submissions={overview.submissions}
          leaves={overview.staffLeaves}
          snapshots={overview.studentSnapshots}
          isAdmin={session.role === "admin"}
        />
      </div>
    </PortalShell>
  );
}
