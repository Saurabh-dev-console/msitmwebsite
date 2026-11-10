import type { Metadata } from "next";
import { Icon, type IconName } from "@/components/icons";
import { PageHero } from "@/components/chrome";
import { EnquiryForm } from "@/components/forms";
import { CONTACT, SITE_IMAGES } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Connect with MSITM — email, phone, WhatsApp and campus visit. Our admission team responds within one business day.",
};

const CONTACT_ITEMS: {
  label: string;
  value: string;
  href?: string;
  secondary?: { value: string; href: string };
  note: string;
  external?: boolean;
  icon: IconName;
}[] = [
  {
    label: "Email us",
    value: CONTACT.email,
    href: CONTACT.emailHref,
    note: "For admissions, placements and general queries.",
    icon: "Mail",
  },
  {
    label: "Call us",
    value: CONTACT.phonePrimary,
    href: CONTACT.phonePrimaryHref,
    secondary: { value: CONTACT.phoneAlt, href: CONTACT.phoneAltHref },
    note: "Speak directly with the institute office.",
    icon: "Phone",
  },
  {
    label: "WhatsApp",
    value: CONTACT.phonePrimary,
    href: CONTACT.whatsapp,
    note: "Message the institute on WhatsApp.",
    external: true,
    icon: "MessageCircle",
  },
  {
    label: "Visit us",
    value: CONTACT.address,
    note: "Meena Nagar, Circular Road, Gonda 271002, Uttar Pradesh, India.",
    icon: "MapPin",
  },
  {
    label: "Event helpline",
    value: CONTACT.helpline,
    href: CONTACT.helplineHref,
    note: "For competitions and certificate queries.",
    icon: "HelpCircle",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Connect & visit"
        title="Contact MSITM"
        description="We are thrilled you are interested in Meena Shah Institute of Technology and Management — and just as excited to learn about you. Reach out any time, in whatever way works best."
        trail={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        image={SITE_IMAGES.admissionsCounselling}
        imageAlt="MSITM admissions and student support reception desk"
        icon="Phone"
        badge="Admissions Desk"
        subtitle="Meena Nagar, Circular Road, Gonda"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-4 min-w-0">
            {CONTACT_ITEMS.map((item) => (
              <div key={item.label} className="card-line p-4 sm:p-5 flex items-start gap-3.5 sm:gap-4 min-w-0">
                <span className="h-10 w-10 rounded-lg bg-navy-50 border border-navy-100 text-gold-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700">{item.label}</p>
                  {item.secondary && item.href ? (
                    <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      <a
                        href={item.href}
                        className="inline-flex items-center min-h-[44px] lg:min-h-0 -my-1.5 lg:my-0 font-display text-lg sm:text-xl font-semibold text-navy-900 link-underline whitespace-nowrap"
                      >
                        {item.value}
                      </a>
                      <span className="text-muted hidden min-[400px]:inline" aria-hidden="true">·</span>
                      <a
                        href={item.secondary.href}
                        className="inline-flex items-center min-h-[44px] lg:min-h-0 -my-1.5 lg:my-0 font-display text-lg sm:text-xl font-semibold text-navy-900 link-underline whitespace-nowrap"
                      >
                        {item.secondary.value}
                      </a>
                    </div>
                  ) : item.href ? (
                    <a
                      href={item.href}
                      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="mt-1 inline-flex items-center min-h-[44px] lg:min-h-0 -my-1.5 lg:my-0 font-display text-lg sm:text-xl font-semibold text-navy-900 link-underline max-w-full break-all sm:break-normal"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 font-display text-lg sm:text-xl font-semibold text-navy-900 break-words">{item.value}</p>
                  )}
                  <p className="mt-1 text-sm text-muted">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="card-line p-5 sm:p-6 md:p-8 self-start min-w-0">
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
