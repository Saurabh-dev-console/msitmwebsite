import type { Metadata } from "next";
import { Icon, Icons, type IconName } from "@/components/icons";
import { PageHero, SectionHeading } from "@/components/chrome";
import { FeedbackForm } from "@/components/forms";
import { PlacedGrid } from "@/components/widgets";
import { SITE_IMAGES } from "@/data/site";

export const metadata: Metadata = {
  title: "Student Corner",
  description: "Life at MSITM — skill sessions, workshops, tech events, placed students and feedback forms.",
};

const STUDENT_HIGHLIGHTS: { title: string; text: string; icon: IconName }[] = [
  {
    title: "Personality development & skill-building",
    text: "Interactive sessions led by experienced industry experts and mentors — strengthening communication, leadership, confidence and career-readiness with practical insights from professionals.",
    icon: "Mic",
  },
  {
    title: "Workshops on emerging tech & career counselling",
    text: "Explore AI, data science, cybersecurity and cloud computing through expert-led sessions, with personalised career guidance to align your strengths with market opportunities.",
    icon: "Cpu",
  },
  {
    title: "Mega tech events",
    text: "Industry leaders, innovators and renowned academicians on campus — expert sessions, networking and exposure to real-world industry practices.",
    icon: "Sparkles",
  },
];

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
        image={SITE_IMAGES.eventsCultural}
        imageAlt="MSITM students engaging in campus tech and cultural sessions"
        icon="Mic"
        badge="Student Community"
        subtitle="Workshops, Seminars & Feedback"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
        <section className="grid md:grid-cols-3 gap-4">
          {STUDENT_HIGHLIGHTS.map((item) => (
            <div key={item.title} className="card-line p-6">
              <span className="h-10 w-10 rounded-lg bg-navy-50 border border-navy-100 text-gold-700 flex items-center justify-center mb-3">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              <p className="font-display text-xl font-semibold text-navy-900">{item.title}</p>
              <p className="mt-2 text-sm text-muted leading-relaxed">{item.text}</p>
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
          <div className="card-line p-5 sm:p-6 md:p-8 min-w-0">
            <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-gold-700">
              <Icons.MessageSquare className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Student Feedback</span>
            </div>
            <FeedbackForm kind="feedback" title="Student feedback form" />
          </div>
          <div className="card-line p-5 sm:p-6 md:p-8 min-w-0">
            <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-gold-700">
              <Icons.ClipboardCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>IQAC Quality Survey</span>
            </div>
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
