import { PortalShell } from "@/components/portal-shell";
import { AdmitCardManager } from "@/components/portal-admin";
import { ExamSessionManager } from "@/components/portal-admin-controls";
import { SemesterResultManager } from "@/components/portal-admin-ops";
import { requireStaffContext } from "@/lib/portal-guards";

export const dynamic = "force-dynamic";

export default async function AdminExamsPage() {
  const { session, overview } = await requireStaffContext(["admin", "exam_cell"]);

  return (
    <PortalShell
      session={session}
      mode="admin"
      subtitle="Exam Cell · Sessions, Date-Sheets, Admit Card Release & Result Publishing"
    >
      <div className="space-y-8">
        <ExamSessionManager examSessions={overview.examSessions} />

        <AdmitCardManager snapshots={overview.studentSnapshots} />

        <SemesterResultManager snapshots={overview.studentSnapshots} results={overview.results} />
      </div>
    </PortalShell>
  );
}
