import { PortalShell } from "@/components/portal-shell";
import { StudentMasterManager } from "@/components/portal-admin-students";
import { requireStaffContext } from "@/lib/portal-guards";

export const dynamic = "force-dynamic";

export default async function AdminStudentsPage() {
  const { session, overview } = await requireStaffContext(["admin"]);

  return (
    <PortalShell
      session={session}
      mode="admin"
      subtitle="Student Master CRUD, Class-Wise Excel Import/Export, Admissions & Staff Access"
    >
      <StudentMasterManager
        snapshots={overview.studentSnapshots}
        admissionLeads={overview.admissionLeads}
        staffUsers={overview.staffUsers}
      />
    </PortalShell>
  );
}
