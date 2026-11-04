# MSITM Website Rebuild — Engineering Documentation

Welcome to the central engineering documentation for the Meena Shah Institute of Technology and Management (MSITM) website audit and rebuild project.

This directory serves as the definitive reference manual for all software architecture, coding standards, approved libraries, AI agent skills, and verification protocols.

---

## Documentation Index

| Document | Purpose | Primary Audience |
| :--- | :--- | :--- |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Architectural blueprint, tech stack, data layers, routing | Architects, Engineers |
| [ENGINEERING_RULES.md](./ENGINEERING_RULES.md) | 5 non-negotiable software engineering rules | All Engineers & Agents |
| [UI_LIBRARY_GUIDE.md](./UI_LIBRARY_GUIDE.md) | Approved UI libraries (Animaster, Skiper UI, Vengence UI) & registries | Frontend Engineers |
| [CODE_GRAPH_GUIDE.md](./CODE_GRAPH_GUIDE.md) | GitNexus knowledge graph traversal, impact checks, token economy | AI Agents & Engineers |
| [IMPLEMENTATION_WORKFLOW.md](./IMPLEMENTATION_WORKFLOW.md) | 6-stage task chunking workflow and execution protocol | All Contributors |
| [DEPENDENCY_POLICY.md](./DEPENDENCY_POLICY.md) | Dependency vetting, lockfile management, version locking | Tech Leads |
| [ICON_SYSTEM.md](./ICON_SYSTEM.md) | Centralized Lucide icon usage, no hardcoded icons rule | Frontend Engineers |
| [COMPONENT_REUSE.md](./COMPONENT_REUSE.md) | Component inventory, search-first protocol, zero duplicate code | Frontend Engineers |
| [SKILL_REGISTRY.md](./SKILL_REGISTRY.md) | Official inventory of all agent skills, sources, and verification states | AI Agents & Engineers |
| [DECISIONS.md](./DECISIONS.md) | Architecture Decision Records (ADR) for technical standards | Architects, Tech Leads |
| [ONYX_INTEGRATION.md](./ONYX_INTEGRATION.md) | Onyx enterprise search platform evaluation & deferred setup guide | Architects, DevOps |
| [TESTING_AND_VERIFICATION.md](./TESTING_AND_VERIFICATION.md) | TypeScript, ESLint, Next.js Turbopack build, regression testing | QA & CI/CD Engineers |
| [CHANGELOG.md](./CHANGELOG.md) | Permanent architectural decision record and change history | Tech Leads |

---

## Core Engineering Principles

1. **Ponytail Philosophy (Minimal Code)**: The best line of code is the one you did not write. Never introduce speculative abstractions, excessive wrappers, or unused utility functions.
2. **Decompose Tasks into Chunks**: Never tackle multi-step implementations in a single pass. Structure every task into verified, sequential chunks.
3. **Graph-First Code Intelligence**: Inspect call chains and compute blast radiuses with GitNexus before opening or modifying files.
4. **Accessible by Default**: Maintain WCAG 2.2 AA conformance across all forms, dialogs, semantic headings, and color contrasts.
5. **No Regressions**: Every pull request or agent modification must exit 0 on type checking, linting, production builds, and graph change analysis.

