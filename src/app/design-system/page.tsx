import type { Metadata } from "next";
import { PageHero, SectionHeading } from "@/components/chrome";

export const metadata: Metadata = {
  title: "Design System",
  description: "MSITM visual identity — colours, typography, spacing, buttons, navigation and components.",
};

export default function DesignSystemPage() {
  return (
    <>
      <PageHero
        eyebrow="Identity · Specification"
        title="MSITM Design System"
        description="Premium academic institution, modern editorial website. Restrained navy, white and gold — strong photography, minimalist interface, excellent typography."
        trail={[{ label: "Home", href: "/" }, { label: "Design System" }]}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
        <section>
          <SectionHeading eyebrow="01 · Colour" title="Navy, white & gold" text="No gradients, no neon. Colour is used sparingly — navy for authority, gold for emphasis." />
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              ["Navy 950", "#060F24", "Utility bar, overlays"],
              ["Navy 900", "#0A1D3D", "Heroes, footer, tables"],
              ["Gold 400", "#C9A227", "CTAs, rules, accents"],
              ["Gold 700", "#7C5C12", "Eyebrows, labels"],
              ["Paper", "#FFFFFF", "Default surface"],
              ["Parchment", "#F6F4EC", "Alt bands"],
              ["Ink", "#1B2433", "Body text"],
              ["Line", "#E3DDCC", "Borders, hairlines"],
            ].map(([name, hex, use]) => (
              <div key={name} className="card-line overflow-hidden">
                <div className="h-20" style={{ background: hex }} />
                <div className="p-4">
                  <p className="font-bold text-navy-900 text-sm">{name}</p>
                  <p className="font-mono text-xs text-muted">{hex}</p>
                  <p className="text-xs text-muted mt-1">{use}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading eyebrow="02 · Typography" title="Editorial serif + grotesque sans" text="Fraunces for display, Inter for interface and body. Clear hierarchy: eyebrow → display → rule → lede → body." />
          <div className="mt-6 card-line p-6 md:p-10 space-y-6">
            <p className="eyebrow">Eyebrow · 12px · uppercase · tracked</p>
            <p className="font-display text-4xl md:text-5xl font-semibold text-navy-900">Display headline sets the academic tone</p>
            <div className="rule-gold" aria-hidden="true" />
            <p className="lede font-display text-navy-900">The lede carries the page promise in one or two sentences — larger, serif, navy.</p>
            <p className="leading-[1.85] text-ink/90 max-w-3xl">
              Body copy runs at a relaxed 1.85 line-height in warm ink. Long passages may open with a drop cap.
              Links use a gold underline that resolves to navy on hover.
            </p>
          </div>
        </section>

        <section>
          <SectionHeading eyebrow="03 · Controls" title="Buttons & forms" text="Sharp corners, honest labels, visible focus. Every button on this site performs a real action." />
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="btn btn-gold">Gold · primary <span aria-hidden="true">→</span></span>
            <span className="btn btn-navy">Navy · secondary</span>
            <span className="btn btn-outline-dark">Outline · tertiary</span>
            <span className="btn btn-navy btn-sm">Small</span>
          </div>
          <div className="mt-6 grid md:grid-cols-2 gap-4 max-w-3xl">
            <div>
              <label className="field-label" htmlFor="ds-demo">Field label</label>
              <input id="ds-demo" className="field-input" placeholder="Input with gold focus ring" />
            </div>
            <div>
              <label className="field-label" htmlFor="ds-demo2">Select</label>
              <select id="ds-demo2" className="field-select">
                <option>Option one</option>
              </select>
            </div>
          </div>
        </section>

        <section>
          <SectionHeading eyebrow="04 · Components" title="Reusable patterns" />
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="card-line p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700">Card · line</p>
              <p className="font-display mt-2 text-xl font-semibold text-navy-900">Hairline cards</p>
              <p className="mt-2 text-sm text-muted">1px line borders that warm to gold on hover. No rounded blobs, no shadows.</p>
            </div>
            <div className="border-l-4 border-gold-400 bg-gold-50 px-6 py-5">
              <p className="font-display text-xl text-navy-900">“Quotations carry institutional voice.”</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-gold-700">— Voice pattern</p>
            </div>
            <div className="band-navy p-6">
              <p className="eyebrow eyebrow--light">Band · navy</p>
              <p className="font-display mt-2 text-xl font-semibold text-white">Full-bleed navy sections</p>
              <p className="mt-2 text-sm text-navy-100">For heroes, placements and calls to action.</p>
            </div>
          </div>
        </section>

        <section>
          <SectionHeading eyebrow="05 · Layout" title="Grid & spacing" />
          <ul className="mt-6 check-list max-w-3xl text-ink/90 leading-relaxed">
            <li>Max content width 1280px (max-w-7xl) with 16–32px gutters; reading measure capped near 720px.</li>
            <li>Section rhythm 64–80px; page heroes 48–64px with a 4px gold base rule.</li>
            <li>Content + 300px sidebar on detail pages; sidebar stacks below content on mobile.</li>
            <li>Tables: navy header, zebra rows, horizontal scroll containment on small screens.</li>
            <li>Motion: one slow marquee (pausable, reduced-motion safe). No scroll-jacking, no fades-for-effect.</li>
          </ul>
        </section>
      </div>
    </>
  );
}
