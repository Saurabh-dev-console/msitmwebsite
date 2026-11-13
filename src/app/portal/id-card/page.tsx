import Link from "next/link";
import { Icons } from "@/components/icons";
import { PortalShell } from "@/components/portal-shell";
import { PrintButton } from "@/components/widgets";
import { requireStudentContext } from "@/lib/portal-guards";

export const dynamic = "force-dynamic";

export default async function StudentIdCardPage() {
  const { session, snapshot } = await requireStudentContext();
  const { student } = snapshot;

  return (
    <PortalShell
      session={session}
      mode="student"
      subtitle="Official Digital Student Identity Card"
    >
      <div className="max-w-xl mx-auto space-y-5">
        <div className="flex items-center justify-between gap-3 print-hidden">
          <p className="text-sm text-muted">Present this digital or printed card at campus entry, library, and exam hall.</p>
          <PrintButton />
        </div>

        <article className="rounded-2xl overflow-hidden border-2 border-navy-900 bg-white shadow-lg">
          <div className="band-navy px-6 py-4 border-b-4 border-gold-400 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-300">
                MSITM Degree College · Gonda
              </p>
              <p className="font-display text-lg font-semibold text-white">Student Identity Card</p>
            </div>
            <Icons.GraduationCap className="h-7 w-7 text-gold-400 shrink-0" aria-hidden="true" />
          </div>

          <div className="p-6 grid sm:grid-cols-[120px_1fr] gap-5 items-center">
            <div className="h-32 w-28 mx-auto sm:mx-0 rounded-lg border border-line bg-parchment flex flex-col items-center justify-center text-navy-900">
              <Icons.User className="h-10 w-10 text-navy-900/45" aria-hidden="true" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted mt-1">{student.course}</span>
            </div>

            <dl className="space-y-2 text-sm">
              <div>
                <dt className="sr-only">Name</dt>
                <dd className="font-display text-xl font-bold text-navy-900">{student.fullName}</dd>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                <div>
                  <dt className="text-muted font-bold uppercase">Programme</dt>
                  <dd className="font-semibold text-navy-900">{student.course} · Sem {student.semester}</dd>
                </div>
                <div>
                  <dt className="text-muted font-bold uppercase">Batch</dt>
                  <dd className="font-semibold text-navy-900">{student.batch}</dd>
                </div>
                <div>
                  <dt className="text-muted font-bold uppercase">Enrollment No.</dt>
                  <dd className="font-mono font-semibold text-navy-900">{student.enrollmentNo}</dd>
                </div>
                <div>
                  <dt className="text-muted font-bold uppercase">Blood Group</dt>
                  <dd className="font-semibold text-navy-900">{student.bloodGroup}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-muted font-bold uppercase">Father&apos;s Name</dt>
                  <dd className="font-semibold text-navy-900">{student.fatherName}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-muted font-bold uppercase">Emergency Guardian Phone</dt>
                  <dd className="font-semibold text-navy-900">{student.guardianPhone}</dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="bg-parchment border-t border-line px-6 py-3 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-muted">Meena Nagar, Circular Road, Gonda 271002</span>
            <Link href={`/verify/${student.idVerificationCode}`} className="font-mono font-bold text-navy-900 link-underline">
              {student.idVerificationCode}
            </Link>
          </div>
        </article>
      </div>
    </PortalShell>
  );
}

