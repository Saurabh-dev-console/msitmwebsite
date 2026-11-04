import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT } from "@/data/site";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your message has been received by MSITM.",
};

export default function ThankYouPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-16 md:py-24 text-center">
      <p className="eyebrow">Received</p>
      <h1 className="font-display mt-3 text-4xl md:text-5xl font-semibold text-navy-900">Thank you!</h1>
      <div className="rule-gold mt-5 mx-auto" aria-hidden="true" />
      <p className="mt-5 text-lg text-muted leading-relaxed">
        Your message has been successfully sent. We appreciate you reaching out to us and will get back to you
        as soon as possible.
      </p>
      <p className="mt-3 text-muted">
        Need immediate assistance? Call{" "}
        <a href={CONTACT.phonePrimaryHref} className="font-semibold text-navy-900 link-underline">
          {CONTACT.phonePrimary}
        </a>
        .
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-navy">
          Back to home
        </Link>
        <Link href="/courses" className="btn btn-outline-dark">
          Browse courses
        </Link>
      </div>
    </div>
  );
}
