import type { Metadata } from "next";
import { PageHero, SectionHeading } from "@/components/chrome";
import { FeedbackForm } from "@/components/forms";
import { PlacedGrid } from "@/components/widgets";

export const metadata: Metadata = {
  title: "Student Corner",
  description: "Life at MSITM — skill sessions, workshops, tech events, placed students and feedback forms.",
};

export default function StudentCornerPage() {
  return (
    <>
      <PageHero
        eyebrow="Campus life · Students"
        title="Life @ MSITM: Learn, Grow & Lead"
        description="Sessions, workshops, mega tech events — and your voice through feedback and satisfaction surveys."
        trail={[
          { label: "Home", href: "/" },
          { label: "News & Events", href: "/college-news-events" },
          { label: "Student Corner" },
        ]}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
        <section className="grid md:grid-cols-3 gap-4">
          {[
            ["Personality development & skill-building", "Interactive sessions led by experienced industry experts and mentors — strengthening communication, leadership, confidence and career-readiness with practical insights from professionals."],
            ["Workshops on emerging tech & career counselling", "Explore AI, data science, cybersecurity and cloud computing through expert-led sessions, with personalised career guidance to align your strengths with market opportunities."],
            ["Mega tech events", "Industry leaders, innovators and renowned academicians on campus — expert sessions, networking and exposure to real-world industry practices."],
          ].map(([title, text]) => (
            <div key={title} className="card-line p-6">
              <p className="font-display text-xl font-semibold text-navy-900">{title}</p>
              <p className="mt-2 text-sm text-muted leading-relaxed">{text}</p>
            </div>
          ))}
        </section>
        <section>
          <SectionHeading
            eyebrow="Hear from our students"
            title="Our students placed in top companies"
            text="A selection of placed students — the complete gallery is on the placements page."
          />
          <div className="mt-8">
            <PlacedGrid count={12} linkToPlacement />
          </div>
        </section>
        <section className="grid lg:grid-cols-2 gap-6">
          <div className="card-line p-6 md:p-8">
            <FeedbackForm kind="feedback" title="Student feedback form" />
          </div>
          <div className="card-line p-6 md:p-8">
            <FeedbackForm kind="survey" title="Student satisfaction survey" />
            <p className="mt-3 text-xs text-muted">
              Survey responses support the IQAC&apos;s Student Satisfaction Survey (SSS) process.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
