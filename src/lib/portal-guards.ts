import { redirect } from "next/navigation";
import { getPortalSession, isStaffRole } from "@/lib/portal-auth";
import { getAdminOverview, getStudentSnapshot } from "@/lib/portal-store";
import type { PortalRole } from "@/lib/portal-types";

export async function requireStudentContext() {
  const session = await getPortalSession();
  if (!session) redirect("/portal/login");
  if (session.role !== "student") redirect("/admin");
  if (!session.studentId) redirect("/portal/login");

  const snapshot = await getStudentSnapshot(session.studentId);
  if (!snapshot) redirect("/portal/login");
  return { session, snapshot };
}

export async function requireStaffContext(allowedRoles?: PortalRole[]) {
  const session = await getPortalSession();
  if (!session) redirect("/portal/login");
  if (!isStaffRole(session.role)) redirect("/portal");
  if (allowedRoles && session.role !== "admin" && !allowedRoles.includes(session.role)) {
    redirect("/admin");
  }
  const overview = await getAdminOverview();
  return { session, overview };
}

