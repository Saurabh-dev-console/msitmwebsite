---
trigger: glob
globs: "*.tsx, *.jsx, *.css, *.vue, *.svelte"
description: "UI engineering standards: tokens, a11y, motion, anti-slop rules."
---
# UI/UX Engineering Standards

Follow @[ui-standards](docs/engineering/UI_STANDARDS.md).

## Non-Negotiables:
1. **Design Tokens Only**: Consume semantic tokens from Tailwind / CSS variables (`src/app/globals.css`). Zero raw hex or arbitrary pixel values in components.
2. **One Icon Library**: `lucide-react` only. No emoji or Unicode glyphs as icons; no hand-written inline SVG for standard icons. Icon-only buttons must carry an `aria-label`.
3. **Complete States**: Every interactive element must provide visible hover, focus-visible, active, disabled, loading, and error states.
4. **Purposeful Motion**: Animate transform and opacity only. Honour `prefers-reduced-motion`. Animations lasting > 5s must be pausable (WCAG 2.2.2).
5. **Accessibility (WCAG 2.2 AA)**: Minimum 4.5:1 text contrast (3:1 large text and UI components); visible focus indicators; min 24x24px touch targets (44px on touch).
6. **14 Anti-UI-Slop Gates**:
   - Structural variety: no three consecutive card grids;
   - Meaningful gradients: brand-derived only;
   - Purposeful glass: maximum once per view;
   - Disciplined typography: max 2 families, body >= 16px;
   - Real content: zero lorem ipsum or fabricated stats;
   - Reuse before create: check existing components first.
7. **Responsive Verification**: Verified mobile-first at 360px, 768px, and 1280px breakpoints with no horizontal overflow.

