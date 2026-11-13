import type { Metadata } from "next";
import { PageHero } from "@/components/chrome";
import { Icons } from "@/components/icons";
import { VerifyLookupForm } from "@/components/verify-lookup";

export const metadata: Metadata = {
  title: "Verify Document",
  description: "Verify authenticity of MSITM Admit Cards, Fee Receipts, Gate Passes, Semester Results, and Student ID Cards.",
};

export default function VerifyIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Authenticity · QR & Code Check"
        title="Verify Official Document"
        description="Enter any Admit Card token, Fee Receipt number, Gate Pass code, Result token, or Student ID code issued by MSITM."
        trail={[{ label: "Home", href: "/" }, { label: "Verify Document" }]}
        icon="QrCode"
        badge="Tamper-Evident Check"
        subtitle="Admit Cards · Fee Receipts · Gate Passes · Results · ID Cards"
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <VerifyLookupForm />
        <div className="mt-8 rounded-xl border border-navy-100 bg-navy-50 p-5 text-sm text-ink/85 flex items-start gap-3">
          <Icons.Info className="h-5 w-5 text-navy-900 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-semibold text-navy-900">Sample verification codes (Demo mode)</p>
            <p className="text-xs text-muted mt-1 font-mono">
              MSITM-ADM-BCA4014 · MSITM-FEE-1042A · GP482190 · MSITM-RES-BCA403 · MSITM-ID-BCA24014
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

