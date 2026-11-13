import { PortalShell } from "@/components/portal-shell";
import { GatePassManager } from "@/components/portal-admin";
import { CoordinatorSickGatePassForm } from "@/components/portal-admin-controls";
import { requireStaffContext } from "@/lib/portal-guards";

export const dynamic = "force-dynamic";

export default async function AdminGatePage() {
  const { session, overview } = await requireStaffContext(["admin", "faculty", "gate_guard"]);
  const canIssue = session.role === "admin" || session.role === "faculty";

  return (
    <PortalShell
      session={session}
      mode="admin"
      subtitle="Sick-Leave Gate Pass Approvals, Coordinator Entry & Security Guard Exit Verification"
    >
      <div className="space-y-8">
        {canIssue ? <CoordinatorSickGatePassForm students={overview.studentSnapshots} /> : null}
        <GatePassManager
          role={session.role}
          gatePasses={overview.gatePasses}
          students={overview.studentSnapshots.map((s) => s.student)}
        />
      </div>
    </PortalShell>
  );
}
