import type { Metadata } from "next";
import { Blocks, PageHero } from "@/components/chrome";
import { MISC_PAGES } from "@/data/content";

const page = MISC_PAGES["admission-process"];

export const metadata: Metadata = { title: page.title, description: page.description };

export default function AdmissionProcessPage() {
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        trail={[{ label: "Home", href: "/" }, { label: "Admissions" }, { label: page.title }]}
        image={page.image}
        imageAlt={page.imageAlt}
        icon="ClipboardCheck"
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Blocks blocks={page.blocks} />
      </div>
    </>
  );
}
