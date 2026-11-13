import { PortalShell } from "@/components/portal-shell";
import { PlacementDriveManager } from "@/components/portal-admin-controls";
import { CampusOpsManager } from "@/components/portal-admin-ops";
import { requireStaffContext } from "@/lib/portal-guards";

export const dynamic = "force-dynamic";

export default async function AdminCampusOpsPage() {
  const { session, overview } = await requireStaffContext(["admin", "faculty", "accounts"]);

  return (
    <PortalShell
      session={session}
      mode="admin"
      subtitle="Library Circulation, Lab Support Tickets, Grievances & Placement / Scholarship Drives"
    >
      <div className="space-y-8">
        <CampusOpsManager
          snapshots={overview.studentSnapshots}
          libraryIssues={overview.libraryIssues}
          labTickets={overview.labTickets}
          grievances={overview.grievances}
        />

        <PlacementDriveManager drives={overview.placementDrives} />
      </div>
    </PortalShell>
  );
}
