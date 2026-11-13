# UI/UX Engineering Standards & Anti-Slop Specification

**Specification**: Antigravity Engineering Environment v3.0  
**Authority**: Mandatory across all user interfaces, components, and pages.

---

## 1. Design Brief Gate (Mandatory Pre-Code Step)

Before authoring or refactoring any UI component or surface, the engineer or agent must establish and confirm a design brief answering these 6 questions:

| Dimension | Mandatory Specification |
| :--- | :--- |
| **Product & Job** | What the interface accomplishes and the primary user task in one concise sentence. |
| **Audience** | Who uses it, on what devices, in what environment (desktop, mobile, glare, high-distraction). |
| **Brand** | Existing design tokens, logo, tone. Three adjectives describing personality + one rejected aesthetic. |
| **Structure** | Key screens, viewports, or sections and why each exists. Real content or clearly marked placeholders. |
| **Constraints** | WCAG 2.2 AA accessibility level, Core Web Vitals budget, browser support, existing components. |
| **Differentiation** | One deliberate design choice that makes the interface bespoke and non-generic. |

*Agent Rule*: Without a confirmed brief, do not guess a style. State the proposed brief, confirm it, then build.

---

## 2. Tool Roles & Responsibilities

| Tool | Designated Role in UI Development |
| :--- | :--- |
| **Existing Components** | **First Priority**: Inspect `src/components/` and graph before writing any code. Reuse and extend existing abstractions. |
| **UI UX Pro Max** | Generates the foundational design system: style direction, palette, typography pairings, spacing scale, and stack tokens. |
| **Hallmark** | Builds structurally differentiated layouts; prevents template repetition; audits against visual anti-patterns. |
| **Impeccable** | Polishes, audits, critiques, and distills existing surfaces. Automated detector in CI via `npx impeccable detect src/`. |

---

## 3. System Foundations

1. **Design Tokens**:
   - All colors (surface, text, border, accent, muted, destructive), radii, shadows, and spacings must use CSS variables defined in `src/app/globals.css`.
   - Zero raw hex codes (`#1e293b`) or arbitrary Tailwind brackets (`p-[13px]`) in component files.
2. **Typography**:
   - Maximum 2 font families.
   - Body copy minimum 16px.
   - Line length strictly maintained between 45 and 75 characters.
   - Maximum 3 font weights across any single view.
3. **Spacing Scale**:
   - Base 4px or 8px scale (`gap-2`, `p-4`, `m-6`, `gap-8`). Never arbitrary off-scale values.
4. **Icons**:
   - **One icon library**: `lucide-react`.
   - Never use emoji, Unicode characters, or hand-drawn inline SVGs for standard iconography.
   - Every icon-only button must contain `aria-label` or visually hidden accessible text.
5. **Component Architecture**:
   - Follow layered hierarchy: Primitives (`@base-ui/react`) -> Components (`src/components/`) -> Patterns -> Pages (`src/app/`).
   - Favour props and variants (`class-variance-authority`) over duplicating component files.
6. **Theming**:
   - Redefine CSS variables for dark mode; never use crude colour inversion filters.

---

## 4. Motion & 3D Policy

- **Purposeful Motion**: Every animation must fulfill one of four explicit jobs: feedback, orientation, continuity, or attention. If it has no job, eliminate it.
- **Transform & Opacity Only**: Animate exclusively `transform` and `opacity` properties to prevent CPU layout reflows.
- **Accessibility**: Honor `@media (prefers-reduced-motion)`. Any motion running automatically for > 5 seconds must provide pause controls (WCAG 2.2.2).
- **3D Standards**: 3D canvas is permitted only when depth is intrinsic to product value. 3D canvas must never be the LCP element, must be lazy-loaded, and must provide a static poster image fallback.

---

## 5. Accessibility & Performance Gates

| Gate | Pass Criteria |
| :--- | :--- |
| **WCAG 2.2 AA Contrast** | Minimum 4.5:1 for standard text; 3:1 for large text and interactive UI borders. |
| **Focus Visibility** | All interactive elements must show a distinct, high-contrast `:focus-visible` ring never obscured by sticky bars. |
| **Touch Targets** | Minimum 24x24px bounding box; 44x44px preferred on touch devices. |
| **Core Web Vitals** | LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 at the 75th percentile. |
| **Responsive Range** | Explicitly tested and verified at 360px (mobile), 768px (tablet), and 1280px (desktop) without horizontal scrolling. |

---

## 6. Fourteen Strict Anti-UI-Slop Rules

Every PR or code review fails if any rule below is breached:

1. **Structural Variety**: Reject 3+ consecutive uniform card grids. Hero, features, CTA must follow functional purpose, not generic templates.
2. **Meaningful Gradients**: Gradients must trace to brand tokens. Ban generic purple-to-blue hero washes.
3. **Purposeful Glass**: Backdrop-blur may appear at most once per view (e.g. sticky nav). Never use purely decorative glass panels that harm contrast.
4. **Disciplined Type**: Never exceed 2 families; body under 16px or line lengths > 75 characters are rejected.
5. **Token Spacing & Color**: Zero hardcoded hex colors or arbitrary pixel values in TSX/JSX.
6. **One Icon System**: Lucide React only. Reject emoji or mismatched icon families.
7. **Purposeful Motion**: Ban floating/pulsing decorative animations without user action triggers.
8. **Real Content**: Ban "Lorem ipsum", placeholder company names, or fabricated testimonials.
9. **Reuse Before Create**: Reject duplicating existing widgets, modals, or buttons.
10. **Complete States**: Every interactive element must define hover, focus-visible, active, disabled, loading, and error states.
11. **Designed Responsiveness**: Mobile layout must be intentionally adapted, not just stacked desktop layouts.
12. **Honest Imagery**: Ban stock imagery without product context or fake dashboard screenshots.
13. **Accessible by Default**: Zero automated axe-core serious/critical violations.
14. **Performance Respected**: Heavy animations or unoptimized images that degrade Core Web Vitals are blocked.

---

## 7. Definition of Done for UI Work

A UI task is complete ONLY when:
- Confirmed design brief is documented.
- Verified responsive layout across 360px, 768px, and 1280px.
- Complete component states (hover, focus-visible, active, disabled, loading, error) verified.
- Zero accessibility regressions (keyboard navigation + contrast checks pass).
- Production build passes (`npm run build`).

---

## 8. External UI Library Governance

- **Skiper UI**: Component registry accessed via `npx shadcn add @skiper-ui/<component>`. Individual components installed only per approved requirement; free components require attribution.
- **Vengence UI**: Component registry accessed via vendor CLI on-demand.
- **Animaster**: Source unverified upstream (searches return unrelated packages). Status: **PENDING USER INPUT**. Do not install until official repository is provided.

