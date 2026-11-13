# Architecture Decision Records (ADR)

This document records foundational architectural decisions, technical context, and trade-offs.

---

## ADR-001: Package Manager & Lockfile Standardization
- **Date**: 2026-11-04
- **Status**: Accepted
- **Context**: The project was initialized without an active lockfile, using `package.json` with Next.js 16 and React 19.
- **Decision**: Standardize exclusively on `npm` (v10.9+) with Node.js v22. Generated a clean `package-lock.json`. Prohibited alternative package managers (`pnpm`, `yarn`, `bun`) to prevent lockfile conflicts.
- **Consequences**: Deterministic builds, consistent CI/CD execution, zero conflicting package manager artifacts.

---

## ADR-002: DATABASE_URL Build Prerequisite & Environment Configuration
- **Date**: 2026-11-04
- **Status**: Accepted
- **Context**: Next.js Turbopack production builds evaluated route handlers requiring a database connection string.
- **Decision**: Created `.env.example` documenting the required connection string and configured a default `.env` for development and build verification. Added `.env` to `.gitignore`.
- **Consequences**: `next build` compiles 100% of pages cleanly without runtime crashes.

---

## ADR-003: UI Component Registry Strategy (Skiper UI & Vengence UI)
- **Date**: 2026-11-04
- **Status**: Accepted
- **Context**: Approved UI libraries needed to be integrated without bloating the repository with giant monolithic dependencies or conflicting animation engines.
- **Decision**: Configured `components.json` with namespaced shadcn registry aliases (`@skiper-ui` and `@vengeanceui`) and created shared class merge utility `src/lib/utils.ts`.
- **Consequences**: Components are installed on demand at the file level; zero unneeded node modules; total control over CSS tokens and accessibility.

---

## ADR-004: Icon Registry & Unicode Elimination
- **Date**: 2026-11-04
- **Status**: Accepted
- **Context**: Codebase contained hardcoded Unicode characters in `src/components/Header.tsx`.
- **Decision**: Installed `lucide-react` (officially compatible with React 19) and established `src/components/icons.tsx` as the single source of truth for all icons.
- **Consequences**: 100% accessible, scalable SVG icons with uniform sizing classes and zero hardcoded Unicode or emoji symbols in UI components.

---

## ADR-005: Onyx Enterprise Platform Evaluation (Deferred)
- **Date**: 2026-11-04
- **Status**: Deferred
- **Context**: Onyx (`github.com/onyx-dot-app/onyx`) is an enterprise RAG knowledge platform requiring multi-container Docker/WSL2 deployments, OpenSearch/Vespa, Postgres, Redis, and workers.
- **Decision**: Deferred active Onyx deployment until explicit project owner authorization and dedicated host infrastructure is allocated. Documented configuration guidelines in `docs/engineering/ONYX_INTEGRATION.md`.
- **Consequences**: Preserves host resources and avoids running heavy local clusters during web application development.

---

## ADR-006: Antigravity v3 Persistent Rules Architecture & AGENTS.md Size Limit
- **Date**: 2026-11-13
- **Status**: Accepted
- **Context**: In Antigravity Engineering Environment v3.0, Antigravity enforces strict rule constraints: rules must reside in `.agents/rules/*.md` with explicit YAML frontmatter (`trigger: always_on | model_decision | glob | manual`), each file must not exceed 24 KB, and `AGENTS.md` at root must be under 60 lines.
- **Decision**:
  1. Restructured `AGENTS.md` into a concise (<60 lines) contract of commands, architecture references, and non-negotiables.
  2. Created flat `.agents/rules/` containing `ui-engineering.md`, `security.md`, `database.md`, `testing.md`, and `ralph.md`, each configured with validated frontmatter.
- **Consequences**: Eliminates silent rule dropouts, respects the 20,000-token always-on budget, and enables progressive disclosure.

---

## ADR-007: CodeGraph Adopted as Primary Code Intelligence Engine
- **Date**: 2026-11-13
- **Status**: Accepted
- **Context**: Upstream research identified that GitNexus is licensed under PolyForm Noncommercial, blocking it for commercial deployment without a commercial license. Furthermore, GitNexus generates monolithic `AGENTS.md` blocks that exceed v3 line limits.
- **Decision**: Adopted **CodeGraph (`@colbymchenry/codegraph@1.6.2`)** under permissive licensing (MIT/Apache-2.0) as the primary local code graph engine. Indexed 284 files (8,865 nodes, 24,219 edges) into `.codegraph/`. Kept GitNexus files isolated strictly as an unreferenced fallback.
- **Consequences**: Zero licensing liability, instant symbol lookup (`codegraph query`), impact analysis (`codegraph impact`), and clean integration with Antigravity IDE.

---

## ADR-008: Ralph Loop Autonomous Architecture & Three Integration Modes
- **Date**: 2026-11-13
- **Status**: Accepted
- **Context**: Long-running autonomous loops require clean context resets to avoid context rot and hallucination. Upstream Ralph (`snarktank/ralph`) natively supports Amp and Claude Code, but lacks native Antigravity support, iteration limits, and stuck detection.
- **Decision**:
  1. Configured `scripts/ralph/` containing `ralph.sh` adapter, `AGY.md` prompt, `prd.json.example`, and `progress.txt.example`.
  2. Implemented Mode B (Antigravity adapter branch) with safety guardrails: max 10 iterations, 3 failed attempts per story before marking blocked, feature branch isolation, and command-verifiable criteria.
  3. Established selection logic: interactive `/plan` for single-session tasks, `/goal` for coherent single objectives, and Ralph loop for multi-story backlogs.
- **Consequences**: Safe, controllable autonomous execution with clear stop hooks and zero budget-burning runaway loops.

---

## ADR-009: Strict UI Anti-Slop Governance and Animaster Status
- **Date**: 2026-11-13
- **Status**: Accepted
- **Context**: Generic AI outputs frequently produce repetitive card grids, meaningless purple-to-blue gradients, decorative glassmorphism, and fake data. Additionally, "Animaster" has no verifiable upstream repository or npm package.
- **Decision**:
  1. Enforced 14 testable anti-UI-slop rules in `docs/engineering/UI_STANDARDS.md` and `.agents/rules/ui-engineering.md`.
  2. Formalized the Design Brief Gate (6 questions to answer before writing any UI code).
  3. Marked Animaster as `PENDING USER INPUT`. Prohibited substituting unverified similarly named packages to prevent typosquatting risks.
- **Consequences**: Premium, intentional, accessible (WCAG 2.2 AA) user interfaces with verified provenance.
