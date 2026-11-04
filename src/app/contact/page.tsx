import type { Metadata } from "next";
import { PageHero } from "@/components/chrome";
import { EnquiryForm } from "@/components/forms";
import { CONTACT } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Connect with MSITM — email, phone, WhatsApp and campus visit. Our admission team responds within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Connect & visit"
        title="Contact MSITM"
        description="We are thrilled you are interested in Meena Shah Institute of Technology and Management — and just as excited to learn about you. Reach out any time, in whatever way works best."
        trail={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-4">
            {[
              ["Email us", CONTACT.email, CONTACT.emailHref, "For admissions, placements and general queries."],
              ["Call us", `${CONTACT.phonePrimary} · ${CONTACT.phoneAlt}`, CONTACT.phonePrimaryHref, "Speak directly with the institute office."],
              ["WhatsApp", CONTACT.phonePrimary, CONTACT.whatsapp, "Message the institute on WhatsApp.", true],
              ["Visit us", CONTACT.address, undefined, "Meena Nagar, Circular Road, Gonda 271002, Uttar Pradesh, India."],
              ["Event helpline", CONTACT.helpline, CONTACT.helplineHref, "For competitions and certificate queries."],
            ].map(([label, value, href, note, external]) => (
              <div key={label as string} className="card-line p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700">{label as string}</p>
                {href ? (
                  <a
                    href={href as string}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="mt-1 block font-display text-xl font-semibold text-navy-900 link-underline w-fit"
                  >
                    {value as string}
                  </a>
                ) : (
                  <p className="mt-1 font-display text-xl font-semibold text-navy-900">{value as string}</p>
                )}
                <p className="mt-1 text-sm text-muted">{note as string}</p>
              </div>
            ))}
          </div>
          <div className="card-line p-6 md:p-8 self-start">
            <p className="font-display text-2xl font-semibold text-navy-900">Enquiry form</p>
            <p className="mt-1 text-sm text-muted">We respond within one business day.</p>
            <div className="mt-5">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
