import type { Metadata } from "next";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { CONTACT } from "@/data/site";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your message has been received by MSITM.",
};

export default function ThankYouPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-16 md:py-24 text-center">
      <div className="h-16 w-16 rounded-2xl bg-navy-900 text-gold-400 border border-gold-400/40 flex items-center justify-center mx-auto mb-5 shadow-md">
        <Icons.CheckCircle2 className="h-8 w-8" aria-hidden="true" />
      </div>
      <p className="eyebrow">Received</p>
      <h1 className="font-display mt-3 text-4xl md:text-5xl font-semibold text-navy-900">Thank you!</h1>
      <div className="rule-gold mt-5 mx-auto" aria-hidden="true" />
      <p className="mt-5 text-lg text-muted leading-relaxed">
        Your message has been successfully sent. We appreciate you reaching out to us and will get back to you
        as soon as possible.
      </p>
      <p className="mt-3 text-muted">
        Need immediate assistance? Call{" "}
        <a
          href={CONTACT.phonePrimaryHref}
          className="font-semibold text-navy-900 link-underline inline-flex items-center min-h-[44px] lg:min-h-0 whitespace-nowrap"
        >
          {CONTACT.phonePrimary}
        </a>
        .
      </p>
      <div className="mt-8 flex flex-col min-[380px]:flex-row flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-navy w-full min-[380px]:w-auto">
          Back to home
          <Icons.ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link href="/courses" className="btn btn-outline-dark w-full min-[380px]:w-auto">
          Browse courses
        </Link>
      </div>
    </div>
  );
}
