import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PageHero } from "@/components/chrome";
import { PortalLoginForm } from "@/components/portal-login";
import { getPortalSession } from "@/lib/portal-auth";

export const metadata: Metadata = {
  title: "Student & ERP Portal Login",
  description: "Sign in to the MSITM Undergraduate (BCA & BBA) Student Portal or Office ERP.",
};

export default async function PortalLoginPage() {
  const session = await getPortalSession();
  if (session) {
    redirect(session.role === "student" ? "/portal" : "/admin");
  }

  return (
    <>
      <PageHero
        eyebrow="UG Services · BCA & BBA"
        title="Student & Staff Portal"
        description="Access semester fee receipts, exam admit cards, sick-leave gate passes, attendance records, and academic notices."
        trail={[{ label: "Home", href: "/" }, { label: "Portal Login" }]}
        icon="KeyRound"
        badge="Role-Based Access"
        subtitle="Students · Faculty · Accounts · Exam Cell · Gate Security"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <PortalLoginForm />
      </div>
    </>
  );
}

