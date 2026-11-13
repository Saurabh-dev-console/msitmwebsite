"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, type ReactNode } from "react";
import { Icon, Icons, type IconName } from "@/components/icons";
import type { PortalSession } from "@/lib/portal-types";

interface NavItem {
  href: string;
  label: string;
  hint?: string;
  icon: IconName;
  roles?: PortalSession["role"][];
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const STUDENT_SECTIONS: NavSection[] = [
  {
    title: "DASHBOARD",
    items: [
      { href: "/portal", label: "Overview", hint: "Dashboard", icon: "LayoutGrid" },
    ],
  },
  {
    title: "EXAMS & ACADEMICS",
    items: [
      { href: "/portal/admit-card", label: "Admit Card", hint: "Hall Ticket", icon: "Ticket" },
      { href: "/portal/academics", label: "Attendance & Classes", hint: "75% Rule", icon: "CalendarCheck" },
      { href: "/portal/results", label: "Results & CGPA", hint: "Marksheets", icon: "Award" },
    ],
  },
  {
    title: "FINANCE & PERMISSION",
    items: [
      { href: "/portal/fees", label: "Fees & Receipts", hint: "Payment Ledger", icon: "Receipt" },
      { href: "/portal/gate-pass", label: "Sick Gate Pass", hint: "Exit Permission", icon: "Stethoscope" },
    ],
  },
  {
    title: "CAMPUS SERVICES",
    items: [
      { href: "/portal/id-card", label: "Digital Student ID", hint: "QR Identity", icon: "IdCard" },
      { href: "/portal/certificates", label: "Certificates", hint: "Bonafide", icon: "FileCheck2" },
      { href: "/portal/campus-desk", label: "Library & Helpdesk", hint: "Books & Labs", icon: "BookOpen" },
    ],
  },
];

const ADMIN_SECTIONS: NavSection[] = [
  {
    title: "EXECUTIVE ERP",
    items: [
      { href: "/admin", label: "ERP Overview", hint: "Live KPIs", icon: "LayoutGrid" },
    ],
  },
  {
    title: "STUDENT RECORDS",
    items: [
      { href: "/admin/students", label: "Student Master & Excel", hint: "Roster CRUD", icon: "Users", roles: ["admin"] },
    ],
  },
  {
    title: "FINANCE & ACADEMICS",
    items: [
      { href: "/admin/fees", label: "Fee Accounts", hint: "Ledgers & Dues", icon: "CreditCard", roles: ["admin", "accounts"] },
      { href: "/admin/exams", label: "Exam Cell & Hall Tickets", hint: "Admit Cards", icon: "Ticket", roles: ["admin", "exam_cell"] },
      { href: "/admin/academics", label: "Faculty & Timetable", hint: "Syllabus Progress", icon: "CalendarCheck", roles: ["admin", "faculty"] },
    ],
  },
  {
    title: "CAMPUS & SECURITY",
    items: [
      { href: "/admin/gate", label: "Gate Security Scanner", hint: "Medical Passes", icon: "Stethoscope", roles: ["admin", "faculty", "gate_guard"] },
      { href: "/admin/campus-ops", label: "Labs, Library & Grievance", hint: "Campus Ops", icon: "BookMarked", roles: ["admin", "faculty", "accounts"] },
    ],
  },
];

export function PortalShell({
  session,
  mode,
  subtitle,
  children,
}: {
  session: PortalSession;
  mode: "student" | "admin";
  subtitle: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  // Close drawer on escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileMenuOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  async function handleLogout() {
    setSigningOut(true);
    await fetch("/api/portal/login", { method: "DELETE" });
    router.push("/portal/login");
    router.refresh();
  }

  const sections =
    mode === "student"
      ? STUDENT_SECTIONS
      : ADMIN_SECTIONS.map((sec) => ({
          ...sec,
          items: sec.items.filter((item) => !item.roles || item.roles.includes(session.role)),
        })).filter((sec) => sec.items.length > 0);

  // Find active nav item for top breadcrumb
  const allItems = sections.flatMap((s) => s.items);
  const activeItem = allItems.find((i) => i.href === pathname) || allItems[0];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      {/* ================= 1. DESKTOP PERMANENT SIDEBAR ================= */}
      <aside className="hidden lg:flex lg:flex-col w-72 bg-navy-950 border-r border-navy-800 text-white shrink-0 select-none">
        {/* Brand Monogram Header */}
        <div className="h-20 flex items-center gap-3 px-6 border-b border-navy-800/80 bg-navy-950">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 flex items-center justify-center text-navy-950 font-black font-display text-lg shadow-md shrink-0">
            MS
          </div>
          <div className="min-w-0">
            <p className="font-display text-sm font-bold tracking-tight text-white leading-none">
              MSITM GONDA
            </p>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gold-400 mt-1">
              {mode === "student" ? "Student Self-Service" : "Degree Campus ERP"}
            </p>
          </div>
        </div>

        {/* Navigation Section List */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          {sections.map((section) => (
            <div key={section.title} className="space-y-1.5">
              <p className="px-3 text-[11px] font-extrabold uppercase tracking-wider text-gold-300/80">
                {section.title}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group flex items-center justify-between px-3.5 py-2.5 text-xs font-bold rounded-xl transition-all ${
                        active
                          ? "bg-navy-900 text-white shadow-sm border border-gold-400/40 text-gold-300"
                          : "text-slate-200 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          name={item.icon}
                          className={`h-4 w-4 shrink-0 transition-colors ${
                            active ? "text-gold-400" : "text-slate-300 group-hover:text-gold-300"
                          }`}
                        />
                        <div className="min-w-0">
                          <p className={`truncate leading-tight ${active ? "text-white font-bold" : "text-slate-200"}`}>
                            {item.label}
                          </p>
                          {item.hint && (
                            <p className="text-[10px] text-slate-400 font-normal truncate mt-0.5">
                              {item.hint}
                            </p>
                          )}
                        </div>
                      </div>
                      {active ? (
                        <span className="w-2 h-2 rounded-full bg-gold-400 shrink-0 shadow-xs" />
                      ) : (
                        <Icons.ChevronRight className="h-3 w-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Profile & Logout Footer */}
        <div className="p-4 border-t border-navy-800/80 bg-navy-950/90">
          <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-navy-900 border border-navy-800 shadow-xs">
            <div className="min-w-0 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-500 to-gold-700 text-navy-950 flex items-center justify-center text-xs font-black shrink-0 shadow-xs">
                {session.displayName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate leading-tight">
                  {session.displayName}
                </p>
                <p className="text-[11px] text-gold-300 font-mono capitalize truncate mt-0.5">
                  {session.role.replace("_", " ")}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              disabled={signingOut}
              title="Sign Out"
              aria-label="Sign Out"
              className="p-2 rounded-lg text-slate-300 hover:text-rose-400 hover:bg-white/10 transition-colors shrink-0"
            >
              <Icons.LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ================= 2. MOBILE RESPONSIVE DRAWER ================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-over Container */}
          <div className="relative w-80 max-w-[85vw] bg-navy-950 h-full flex flex-col z-10 border-r border-navy-800 shadow-2xl text-white">
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-5 border-b border-navy-800 bg-navy-950">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-gold-400 text-navy-950 font-black flex items-center justify-center font-display text-base">
                  MS
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-white">MSITM GONDA</p>
                  <p className="text-[10px] font-bold text-gold-400 uppercase">
                    {mode === "student" ? "Student Portal" : "Campus ERP"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
                aria-label="Close Navigation"
              >
                <Icons.Close className="h-5 w-5" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
              {sections.map((section) => (
                <div key={section.title} className="space-y-1">
                  <p className="px-3 text-[11px] font-extrabold uppercase tracking-wider text-gold-300/80">
                    {section.title}
                  </p>
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const active = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center justify-between px-3.5 py-3 text-xs font-bold rounded-xl ${
                            active
                              ? "bg-navy-900 text-white border border-gold-400/50 text-gold-300"
                              : "text-slate-200 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon name={item.icon} className={`h-4 w-4 ${active ? "text-gold-400" : "text-slate-300"}`} />
                            <div>
                              <p className="leading-tight">{item.label}</p>
                              {item.hint && <p className="text-[10px] text-slate-400 font-normal">{item.hint}</p>}
                            </div>
                          </div>
                          {active && <span className="w-2 h-2 rounded-full bg-gold-400" />}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Footer */}
            <div className="p-4 border-t border-navy-800 bg-navy-950">
              <button
                type="button"
                onClick={handleLogout}
                disabled={signingOut}
                className="w-full btn btn-sm bg-navy-900 hover:bg-navy-800 text-rose-300 border border-navy-700 flex items-center justify-center gap-2 py-2.5 font-bold"
              >
                <Icons.LogOut className="h-4 w-4" />
                {signingOut ? "Signing out…" : "Sign Out"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 3. TOP APP BAR & MAIN WORKSPACE ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top App Bar */}
        <header className="h-16 bg-white border-b border-line px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-xs print-hidden">
          {/* Left: Mobile Drawer Trigger + Breadcrumb */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-navy-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Open Navigation Menu"
            >
              <Icons.Menu className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-muted uppercase tracking-wider hidden sm:inline">
                {mode === "student" ? "Student Portal" : "Campus ERP"}
              </span>
              <Icons.ChevronRight className="h-3.5 w-3.5 text-slate-400 hidden sm:inline" />
              <span className="font-extrabold text-navy-900 text-sm truncate">
                {activeItem?.label || "Overview"}
              </span>
            </div>
          </div>

          {/* Right: Quick Tools */}
          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/verify"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border border-line text-navy-900 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <Icons.QrCode className="h-3.5 w-3.5 text-primary" />
              Verify Document
            </Link>

            <span className="rounded-full bg-gold-100 border border-gold-400/60 px-3 py-1 text-xs font-bold text-gold-800 capitalize shadow-2xs">
              {session.role.replace("_", " ")}
            </span>

            <button
              type="button"
              onClick={handleLogout}
              disabled={signingOut}
              className="btn btn-outline-dark btn-sm text-xs font-bold py-1.5"
            >
              <Icons.LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
