# Strict Software Engineering Rules

All contributors, engineers, and AI agents modifying this codebase must adhere strictly to these five non-negotiable software engineering rules. Violations will result in automated PR rejection or agent rollback.

---

## Rule 1: No Hardcoded Icons

### Strictly Prohibited
- **Hardcoded Unicode Characters**: e.g., `☰`, `✕`, `▶`, `▼`, `★`, `✓`.
- **Emoji Characters in UI Elements**: e.g., `📞`, `✉️`, `🎓`, `🏛️`.
- **Random Inline SVG Blocks**: Copy-pasting arbitrary raw `<svg>...</svg>` markup directly into component files.
- **Repeated Manually Created Icon Markup**: Inconsistent inline SVG paths that diverge across pages.
- **Unapproved Icon Dependencies**: Installing secondary icon packages (such as `react-icons`, `@heroicons/react`, `font-awesome`) alongside Lucide.

### Standard Convention
- **Single Source of Truth**: All icons must be imported from `@/components/icons` (powered by `lucide-react`).
- **Consistent Sizing**: Apply standard Tailwind sizing classes: `h-4 w-4` for inline text/button icons, `h-5 w-5` for menu bars and list bullets, `h-6 w-6` for major feature headers.
- **Accessible Attributes**: Always include `aria-hidden="true"` when the icon is decorative alongside label text. When used as a standalone icon button, wrap it in an element with an explicit `aria-label`.

---

## Rule 2: No Duplicate Components

### Strictly Prohibited
- Creating duplicate card, button, modal, or form components that duplicate existing functionality.
- Re-implementing existing site chrome components (headers, footers, breadcrumbs, banners).
- Creating variant files with copy-pasted implementations instead of parameterizing props.

### Mandatory Pre-Creation Search Protocol
Before writing any new component:
1. Query the code knowledge graph: `node .gitnexus/run.cjs context <ConceptName>`.
2. Inspect `src/components/` for related implementations (`chrome.tsx`, `widgets.tsx`, `forms.tsx`).
3. Inspect `docs/engineering/COMPONENT_REUSE.md` to check existing registered abstractions.
4. If a matching component exists, extend its props or compose it. Only create a new abstraction when it serves a distinctly new architectural responsibility.

---

## Rule 3: Clean Component Architecture

- **Single Responsibility Principle (SRP)**: Each component, function, or route handler should fulfill one clearly defined role.
- **DRY (Don't Repeat Yourself)**: Shared logic, types, and presentation styles belong in centralized modules (`src/lib/`, `src/data/`, `src/components/`).
- **KISS (Keep It Simple, Stupid)**: Do not introduce excessive layers of abstraction, unnecessary context providers, or speculative factory functions.
- **YAGNI (You Aren't Gonna Need It)**: Do not write code for theoretical future requirements. Build the cleanest implementation for today's requirements.
- **Composition over Inheritance/Duplication**: Compose small, focused UI primitives rather than building giant monoliths.
- **Strict Typing**: No `any` types. Provide explicit TypeScript interfaces and prop definitions for all public components and functions.

---

## Rule 4: Accessibility (WCAG 2.2 AA)

Every user-facing interface must be accessible:
- **Keyboard Navigation**: All interactive elements (menus, dialogs, buttons, dropdowns) must be navigable and operable using `Tab`, `Shift+Tab`, `Enter`, `Space`, and `Escape`.
- **Semantic HTML**: Use `<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`, `<article>`, `<button>`, and `<a>` elements appropriately. Never attach click handlers to unadorned `<div>` or `<span>` elements.
- **Visible Focus States**: Maintain clear, high-contrast focus rings (`focus:ring-2 focus:ring-gold-400 focus:outline-none`).
- **Form Controls & Labels**: Every input field must have an associated `<label>` or explicit `aria-label`. Form errors must be linked using `role="alert"` or `aria-describedby`.
- **Contrast Ratios**: Text against backgrounds must meet minimum contrast ratios: 4.5:1 for normal text and 3:1 for large text.

---

## Rule 5: Production Reliability & Security

- **Preserve Validation**: Never remove existing client-side or server-side input sanitization and honeypot spam protection.
- **Database Safety**: Never alter database schemas or delete fields in `src/db/schema.ts` without validating all dependent callers via the code graph (`node .gitnexus/run.cjs impact <tableName> --direction upstream`).
- **Zero Secrets in Code**: Environment secrets, API tokens, and connection strings must always be sourced from environment variables (`process.env.*`). Never commit credentials to version control.
- **Robust Error Handling**: Route handlers must handle database connection timeouts and unexpected errors gracefully with proper HTTP status codes (`400`, `404`, `500`) and JSON error payloads.
- **Verification Checkpoints**: Never mark a task complete or push changes without running `npm run typecheck`, `npm run lint`, and `npm run build`.

