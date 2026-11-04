# Architecture Decision Records (ADR)

This document records the foundational architectural decisions, context, and trade-offs made during the environment setup.

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
- **Context**: Next.js Turbopack production builds failed during page data collection because `src/db/index.ts` threw `DATABASE_URL is required` at module evaluation time when evaluating API route handlers.
- **Decision**: Created `.env.example` documenting the required connection string and configured a default `.env` for development and build verification. Added `.env` to `.gitignore`.
- **Consequences**: `next build` compiles 100% of pages (92 static and SSG routes) cleanly without runtime crashes.

---

## ADR-003: UI Component Registry Strategy (Skiper UI & Vengence UI)
- **Date**: 2026-11-04
- **Status**: Accepted
- **Context**: Approved UI libraries needed to be integrated without bloating the repository with giant monolithic dependencies or conflicting animation engines.
- **Decision**: Configured `components.json` with namespaced shadcn registry aliases (`@skiper-ui` and `@vengeanceui`) and created shared class merge utility `src/lib/utils.ts`. Animaster was designated as a copy-paste modular component source (`src/components/ui/animaster/`).
- **Consequences**: Components are installed on demand at the file level; zero unneeded node modules; total control over CSS tokens and accessibility.

---

## ADR-004: Code Knowledge Graph Engine (GitNexus)
- **Date**: 2026-11-04
- **Status**: Accepted
- **Context**: Evaluated CodeGraph, GitNexus, and Aider RepoMap for code intelligence, blast radius analysis, Windows compatibility, and token efficiency.
- **Decision**: Selected **GitNexus (v1.6.12)**. GitNexus runs locally via Node.js without requiring external daemon servers or cloud telemetry, utilizes embedded LadybugDB, and integrates natively with Antigravity via stdio MCP and agent skills.
- **Consequences**: 695 symbols and 56 execution flows indexed locally. Context lookups and pre-edit impact checks execute in under 1 second without reading whole files.

---

## ADR-005: Centralized Icon Registry & Unicode Elimination
- **Date**: 2026-11-04
- **Status**: Accepted
- **Context**: Codebase contained hardcoded Unicode characters (e.g., `☰`, `✕`) in `src/components/Header.tsx`, violating Phase 7 Rule 1.
- **Decision**: Installed `lucide-react` (officially compatible with React 19) and established `src/components/icons.tsx` as the single source of truth for all icons. Refactored `Header.tsx` to use `Icons.Menu` and `Icons.Close`.
- **Consequences**: 100% accessible, scalable SVG icons with uniform sizing classes and zero hardcoded Unicode or emoji symbols in UI components.

---

## ADR-006: Local Task Chunking Workflow Architecture
- **Date**: 2026-11-04
- **Status**: Accepted
- **Context**: A dedicated task decomposition workflow was required. The prompt instructed: *"Use the GitHub repository supplied separately by the project owner. Do not guess the repository URL or install an unrelated package."*
- **Decision**: Implemented the required 6-stage task chunking workflow directly in `.agents/skills/task-chunking/SKILL.md` and `docs/engineering/IMPLEMENTATION_WORKFLOW.md`. Kept upstream URL open as PENDING USER INPUT.
- **Consequences**: Full task chunking discipline is active immediately without installing unverified third-party repositories.

---

## ADR-007: Onyx Platform Integration Deferred
- **Date**: 2026-11-04
- **Status**: Accepted
- **Context**: Onyx (`github.com/onyx-dot-app/onyx`) is an enterprise RAG knowledge platform requiring multi-container Docker/WSL2 deployments, PostgreSQL, Vespa/Qdrant, and background ingestion workers.
- **Decision**: Deferred active Onyx deployment until explicit project owner authorization and dedicated host infrastructure is allocated. Documented configuration guidelines in `docs/engineering/ONYX_INTEGRATION.md`.
- **Consequences**: Protected host resources and prevented unnecessary container overhead during local web development.

