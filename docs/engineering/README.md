# MSITM Website Audit & Rebuild — Engineering Documentation (v3.0)

Welcome to the definitive engineering documentation for the Meena Shah Institute of Technology and Management (MSITM) website audit and rebuild project.

This directory conforms to **Antigravity Engineering Environment v3.0**, serving as the single source of truth for software architecture, coding standards, verified specialist skills, code intelligence, UI/UX anti-slop rules, and autonomous execution workflows.

---

## 1. Central Documentation Index (11 Core Files)

| Document | Purpose | Primary Audience |
| :--- | :--- | :--- |
| [README.md](./README.md) | Master documentation index, system principles, and directory orientation. | All Engineers & Agents |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Next.js 16 App Router architecture, PostgreSQL/Drizzle schema, layout hierarchy, and data flows. | Architects, Fullstack Engineers |
| [ENGINEERING_RULES.md](./ENGINEERING_RULES.md) | Master engineering rules, Ponytail simplicity, component reuse, and dependency policy. | All Contributors |
| [UI_STANDARDS.md](./UI_STANDARDS.md) | Design brief gate, token hierarchy, motion & 3D policy, WCAG 2.2 AA, and 14 strict anti-slop rules. | Frontend Engineers & Designers |
| [SKILL_REGISTRY.md](./SKILL_REGISTRY.md) | Inventory of all 16 evaluated skills and tools, statuses, licences, and routing tables. | All Agents & Engineers |
| [DECISIONS.md](./DECISIONS.md) | Architecture Decision Records (ADR-001 through ADR-009) detailing design choices. | Architects, Tech Leads |
| [TESTING_AND_VERIFICATION.md](./TESTING_AND_VERIFICATION.md) | 9 production engineering domains, verification gates, and evidence standards. | QA, CI/CD Engineers & Agents |
| [CODE_GRAPH_GUIDE.md](./CODE_GRAPH_GUIDE.md) | CodeGraph local SQLite code intelligence, symbol search, blast-radius impact analysis. | All Agents & Engineers |
| [RALPH_WORKFLOW.md](./RALPH_WORKFLOW.md) | Autonomous multi-story Ralph loop, Antigravity adapter, story format, and safety guardrails. | Autonomous Agents & Leads |
| [BASELINE.md](./BASELINE.md) | Phase 1 baseline inspection: git status, node/npm versions, typecheck, lint, build results. | All Contributors |
| [AUDIT.md](./AUDIT.md) | Codebase audit methodology, 10-point inspection sequence, severity matrix, and findings register. | Security, QA & Architects |

---

## 2. Core Engineering Principles

1. **Evidence Over Assertion**: Never declare a task complete or state that code "should work". Run the verification command (`npm run typecheck`, `npm run lint`, `npm test`, `npm run build`), quote the actual output, and record the exit code.
2. **Small Always-On Context**: Root `AGENTS.md` is strictly under 60 lines. Long guides use targeted triggers in `.agents/rules/*.md` (`glob`, `model_decision`, or `manual`) to preserve the 20,000-token context budget.
3. **Graph-First Code Intelligence**: Before modifying or refactoring any symbol or component, check callers, callees, and blast radius with CodeGraph (`npx @colbymchenry/codegraph impact <symbol>`).
4. **Ponytail Simplicity**: The best code is the code you didn't have to write. Reuse existing components in `src/components/`, avoid speculative abstractions, and keep functions small and focused.
5. **Strict Anti-UI-Slop**: All UI surfaces must pass the Design Brief Gate, consume design tokens only, use Lucide React icons, maintain WCAG 2.2 AA accessibility, and adhere to the 14 testable anti-slop rules in [UI_STANDARDS.md](./UI_STANDARDS.md).
6. **Task Shape Selection**:
   - Small interactive tasks -> Session + `/plan`.
   - Single long objective with command-verifiable criteria -> Native Antigravity `/goal`.
   - Multi-story backlog -> Autonomous Ralph loop with `prd.json` and safety caps.
