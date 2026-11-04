---
name: reverse-engineering
description: Systematic reverse engineering protocol for analyzing target web applications, runtime behaviors, UI structures, and reference sites using legitimate observable evidence, structured reproduction plans, and clean-room implementation rules.
argument-hint: "[target-url|target-component]"
license: MIT
---

# Reverse Engineering Protocol (REA Standard)

This skill governs the investigation, analysis, and clean-room reconstruction of web interfaces, workflows, and application behaviors based on observable runtime evidence.

> **Scope Restriction**: REA must NOT be invoked for ordinary analysis of local source code when normal repository inspection or code knowledge graph queries are sufficient. Use REA only when analyzing reference websites, runtime bundles, or captured client behavior.

## Systematic Analysis Workflow

When inspecting a target website, audit URL, or reference UI:

1. **Observe Visible Behavior**: Inspect the target's live visual state, DOM tree, layout grid, CSS classes, typography scales, and responsive breakpoints.
2. **Examine Structure & Interactions**: Document layout hierarchy, interactive components (modals, accordions, dropdowns, navigation drawers, carousels), and form fields.
3. **Inspect Responsive Breakpoints**: Test and record layouts across standard viewports (Mobile: <640px, Tablet: 768px-1024px, Desktop: 1280px+).
4. **Identify User Flows**: Map primary interaction sequences (e.g., student inquiry flow, course catalog browsing, admission application submission).
5. **Record Functional Observations**: Note honeypots, client validation rules, error states, and accessibility affordances (ARIA roles, keyboard traps, focus rings).
6. **Identify Design Tokens & Assets**: Map color palettes, font pairings, spacing scales, and public visual assets where legitimately accessible.
7. **Formulate Reconstruction Plan**: Deconstruct the observed target into modern Next.js/React components matching our design system tokens.
8. **Minimal & Clean Implementation**: Implement only requested, legitimate features using our approved UI component registries and Ponytail standards.

## Strict Legal & Operational Boundaries

- **NEVER bypass security checks**: Do not circumvent authentication, paywalls, CAPTCHAs, or rate limits.
- **NEVER exfiltrate private data**: Do not collect credentials, session tokens, PII, internal emails, or database dumps.
- **NEVER duplicate proprietary code**: Clean-room implementation only. Rebuild components using our own modern, accessible stack (React 19, Tailwind CSS v4, Lucide React).
- **No Backend Assumptions**: Never claim that frontend observation proves how the original backend was architected. Implement standard, robust API routes backed by PostgreSQL/Drizzle.
- **Respect Copyright & Licensing**: Honor asset copyrights, intellectual property notices, and terms of service.

