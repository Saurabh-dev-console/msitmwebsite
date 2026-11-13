# Master Engineering Rules & Standards

All engineers, contributors, and AI agents modifying this codebase must adhere strictly to these permanent engineering rules. Violations will result in automated PR rejection or agent rollback.

---

## 1. Core Engineering Principles

### 1.1 Minimal & Essential Code (Ponytail Philosophy)
- Write the smallest complete solution that fully solves the task.
- Zero speculative abstractions, excessive wrappers, or unrequested features.
- Avoid duplicate implementations; reuse existing functions and components.
- Maintain production-grade security, accessibility, validation, and error handling. Less code does not mean incomplete code.

### 1.2 Architecture & SOLID Principles
- **Single Responsibility Principle (SRP)**: Each component, route handler, and utility must serve a single clear purpose.
- **DRY (Don't Repeat Yourself)**: Shared logic belongs in centralized modules (`src/lib/`, `src/data/`, `src/components/`).
- **KISS & YAGNI**: Keep implementation simple and direct. Do not write code for theoretical future requirements.
- **Composition over Duplication**: Compose small, focused UI primitives rather than creating monolithic single-use components.
- **Strict TypeScript Typing**: No `any` types. Provide explicit interfaces for props, database models, and API responses.

### 1.3 Accessibility (WCAG 2.2 AA)
- **Keyboard Navigation**: All interactive elements must be operable via `Tab`, `Shift+Tab`, `Enter`, `Space`, and `Escape`.
- **Semantic HTML**: Use `<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`, `<article>`, `<button>`, and `<a>` elements properly.
- **Visible Focus States**: Maintain high-contrast focus rings (`focus:ring-2 focus:ring-gold-400 focus:outline-none`).
- **Form Controls & Labels**: Every input field must have an associated `<label>` or explicit `aria-label`. Link form errors via `role="alert"` or `aria-describedby`.
- **Contrast Ratios**: Minimum contrast ratios: 4.5:1 for normal text, 3:1 for large text.

### 1.4 Production Reliability & Security
- **Preserve Validation**: Never remove existing client-side or server-side input sanitization or honeypot spam protection.
- **Database Safety**: Never alter database schemas or delete fields in `src/db/schema.ts` without validating all dependent callers via the code graph (`npx @colbymchenry/codegraph impact <symbol>`).
- **Zero Secrets in Version Control**: Secrets, API keys, and connection strings must always be sourced from environment variables (`process.env.*`).
- **Robust Error Handling**: Route handlers must handle timeouts and database exceptions gracefully with appropriate HTTP status codes (`400`, `404`, `500`) and JSON payloads.
- **UI & Accessibility**: Adhere strictly to @[ui-standards](./UI_STANDARDS.md) and the 14 anti-slop rules.

---

## 2. Centralized Icon System Standard

### 2.1 Strictly Prohibited Icon Patterns
- **Hardcoded Unicode Characters**: e.g., `☰`, `✕`, `▶`, `▼`, `★`, `✓`.
- **Emoji Characters in UI Elements**: e.g., `📞`, `✉️`, `🎓`, `🏛️`.
- **Raw Inline SVG Blocks**: Copy-pasting arbitrary raw `<svg>...</svg>` markup directly into component files.
- **Repeated Manually Created Icon Markup**: Inconsistent inline SVG paths that diverge across pages.
- **Unapproved Icon Dependencies**: Installing secondary icon packages (such as `react-icons`, `@heroicons/react`, `font-awesome`) alongside Lucide.

### 2.2 Standard Centralized Convention (`src/components/icons.tsx`)
All icons are centralized in `src/components/icons.tsx` powered by `lucide-react`:
```tsx
// ✅ APPROVED: Import from centralized icons module
import { Icons } from "@/components/icons";

<Icons.Menu className="h-5 w-5" aria-hidden="true" />
<Icons.Phone className="h-4 w-4" aria-hidden="true" />
<Icons.Close className="h-4 w-4" aria-hidden="true" />
```

### 2.3 Sizing & Accessibility Standards
| Context | Tailwind Classes | Dimensions | Example |
| :--- | :--- | :--- | :--- |
| **Inline with Buttons/Text** | `h-3.5 w-3.5` or `h-4 w-4` | 14px–16px | `<Icons.Phone className="h-4 w-4" />` |
| **Standard Navigation / Badges** | `h-5 w-5` | 20px | `<Icons.Menu className="h-5 w-5" />` |
| **Feature Cards / Headers** | `h-6 w-6` or `h-8 w-8` | 24px–32px | `<Icons.GraduationCap className="h-8 w-8" />` |

- **Decorative Icons**: Accompanied by text must have `aria-hidden="true"`.
- **Standalone Interactive Icons**: Parent `<button>` or `<a>` must have an explicit `aria-label`.

---

## 3. Component Reuse Protocol

### 3.1 Search-First Protocol
Before creating any new component:
1. **Query the Code Graph**: `npx @colbymchenry/codegraph query <ConceptName>` or `npx @colbymchenry/codegraph impact <SymbolName>`.
2. **Inspect Existing Inventory**: Check `src/components/` (`chrome.tsx`, `widgets.tsx`, `forms.tsx`).
3. **Parameterize Instead of Forking**: If an existing component covers 80% of requirements, extend its props (e.g. optional `subtitle?: string`) instead of duplicating.

### 3.2 Existing Component Inventory
- **Site Chrome (`src/components/chrome.tsx`)**: `SectionHeading`, `Breadcrumbs`, `StatCard`, `Banner`, `CalloutBox`, `ContentBlockRenderer`.
- **Navigation & Layout**: `Header` (`src/components/Header.tsx`), `Footer` (`src/components/Footer.tsx`).
- **Interactive Forms & Security (`src/components/forms.tsx`)**: `EnquiryForm`, `AdmissionForm`, `FeedbackForm`, `Honeypot`, `FieldError`.
- **Visual Widgets (`src/components/widgets.tsx`)**: `RecruiterMarquee`, `PlacedGrid`, `TestimonialSlider`.
- **Icons (`src/components/icons.tsx`)**: Centralized `Icons` registry.
- **Utilities (`src/lib/utils.ts`)**: `cn()` conditional class merge.

---

## 4. Dependency Policy & Package Management

### 4.1 Approved Package Manager
- Exclusively use `npm` (v10.9+) with Node.js (v22.18+).
- `package-lock.json` is mandatory and committed.
- Never run `pnpm`, `yarn`, or `bun` inside this repository to prevent competing lockfiles.

### 4.2 Dependency Vetting Protocol
Before installing any new package:
1. **React 19 Compatibility**: Verify peer dependencies (`npm info <package> peerDependencies`).
2. **Next.js 16 Turbopack Compatibility**: Ensure ESM and React Server Component support.
3. **Ponytail Minimal-Code Test**: Can the feature be written in 10–20 lines of clean TypeScript? If yes, **do not install an external package**.
4. **Zero Capability Duplication**: Never install redundant libraries for icons, styling, class-merging, or database queries.

### 4.3 Approved Production Stack
- `next` (16.2.6), `react` & `react-dom` (19.2.6), `drizzle-orm` (0.45.2), `pg` (8.20.0), `dotenv` (17.3.1), `lucide-react`, `clsx`, `tailwind-merge`.
