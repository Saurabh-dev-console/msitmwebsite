import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/chrome";
import { Icons } from "@/components/icons";
import { VerifyLookupForm } from "@/components/verify-lookup";
import { verifyDocumentByToken } from "@/lib/portal-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Document Verification Result",
  description: "Verification status of an MSITM Admit Card, Fee Receipt, Gate Pass, or Student ID.",
};

export default async function VerifyCodePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const decoded = decodeURIComponent(code);
  const result = await verifyDocumentByToken(decoded);

  return (
    <>
      <PageHero
        eyebrow="Document Verification"
        title={result.valid ? "Verified Authentic Document" : "Verification Notice"}
        description={`Checked reference code: ${result.code}`}
        trail={[
          { label: "Home", href: "/" },
          { label: "Verify", href: "/verify" },
          { label: result.code },
        ]}
        icon={result.valid ? "BadgeCheck" : "ShieldAlert"}
        badge={result.documentType ?? "Verification"}
        subtitle={result.statusLabel ?? "Invalid or Expired"}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div
          className={`rounded-xl border-2 p-6 sm:p-8 bg-white shadow-sm ${
            result.valid ? "border-navy-900" : "border-destructive"
          }`}
        >
          <div className="flex items-start gap-4">
            <span
              className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${
                result.valid
                  ? "bg-navy-900 text-gold-300"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              {result.valid ? (
                <Icons.BadgeCheck className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Icons.Ban className="h-6 w-6" aria-hidden="true" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-gold-700">
                {result.documentType ?? "Unmatched Token"}
              </p>
              <h2 className="font-display text-2xl font-bold text-navy-900 mt-0.5">
                {result.statusLabel ?? "No matching valid record found"}
              </h2>
              <p className="font-mono text-xs text-muted mt-1">Code: {result.code}</p>
            </div>
          </div>

          {result.holderName ? (
            <dl className="mt-6 pt-5 border-t border-line grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-xs uppercase font-bold text-muted">Student Name</dt>
                <dd className="font-semibold text-navy-900">{result.holderName}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase font-bold text-muted">Enrollment No.</dt>
                <dd className="font-mono font-semibold text-navy-900">{result.enrollmentNo}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase font-bold text-muted">Programme</dt>
                <dd className="font-semibold text-navy-900">{result.courseLabel}</dd>
              </div>
              {result.detail ? (
                <div>
                  <dt className="text-xs uppercase font-bold text-muted">Details</dt>
                  <dd className="text-ink/90">{result.detail}</dd>
                </div>
              ) : null}
            </dl>
          ) : (
            <p className="mt-4 text-sm text-muted">
              Check the exact code printed on the Admit Card, Fee Receipt, Gate Pass, or Student ID Card.
            </p>
          )}
        </div>

        <VerifyLookupForm initialCode={result.code} />

        <div className="text-center">
          <Link href="/portal" className="btn btn-outline-dark btn-sm">
            Go to Student &amp; ERP Portal
          </Link>
        </div>
      </div>
    </>
  );
}

