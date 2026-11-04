---
name: task-chunking
description: Dedicated task decomposition workflow for dividing substantial tasks into independently verifiable, sequential chunks with progress tracking, verification checkpoints, and dependency mapping.
argument-hint: "[task-name]"
license: MIT
---

# Task Chunking & Decomposition Workflow

This skill enforces systematic task decomposition for any substantial feature, refactor, bug fix, or architecture enhancement.

## Core Mandate

Never execute a multi-step or complex engineering task in a single monolithic pass. Large tasks must be partitioned into discrete, independently testable chunks.

## Standard Execution Blueprint

Every substantial engineering objective must follow this 6-stage lifecycle:

```text
Chunk 1: Inspect existing architecture and symbols
  ↓
Chunk 2: Identify affected components, routes, database schemas, and dependencies
  ↓
Chunk 3: Formulate a detailed, step-by-step implementation plan
  ↓
Chunk 4: Implement minimal, high-cohesion changes (chunk by chunk)
  ↓
Chunk 5: Run verification (tests, typecheck, lint, build)
  ↓
Chunk 6: Review diffs, detect regressions via graph analysis, and finalize
```

## Mandatory Task Execution Rules

1. **No Monolithic Execution**: Do not execute a large task without an explicit, structured plan.
2. **Independent Verifiability**: Every chunk must define clear completion criteria and verification checks.
3. **Explicit State Tracking**: Maintain status for each chunk (`PENDING`, `IN_PROGRESS`, `COMPLETED`, `BLOCKED`).
4. **Dependency Identification**: Map prerequisites before starting a chunk to avoid circular dependencies and rework.
5. **No Redundant Work**: Inspect existing components and utilities before creating new ones; do not re-implement existing behavior.
6. **Continuous Verification**: Run relevant tests (`npm run typecheck`, `npm run lint`, `npm run build`) after each logical chunk.
7. **Transparent Blockers**: If a blocker or broken dependency occurs, report it immediately with root-cause analysis—never silently skip tasks or falsify completion.

## Chunk Template Format

When starting a task, format the task chunks as follows:

```markdown
### Task: [Task Title]

- [ ] **Chunk 1: Architecture Inspection**
  - Scope: Inspect relevant symbols, callers, and dependencies via Code Graph.
  - Verification: Graph impact report generated.
- [ ] **Chunk 2: Dependency & Interface Mapping**
  - Scope: Map affected components, props, hooks, and API routes.
  - Verification: Interface contracts identified.
- [ ] **Chunk 3: Implementation Plan**
  - Scope: Detail minimal code modifications adhering to Ponytail guidelines.
  - Verification: User-facing or self-contained architectural plan approved.
- [ ] **Chunk 4: Core Implementation**
  - Scope: Execute planned modifications iteratively.
  - Verification: Clean syntax, no duplicate components, centralized icons.
- [ ] **Chunk 5: Validation & Testing**
  - Scope: Run typecheck, lint, build, and unit/integration tests.
  - Verification: All checks exit with code 0.
- [ ] **Chunk 6: Regression Review & Finalization**
  - Scope: Git diff analysis, graph change detection, documentation update.
  - Verification: Clean commit with no untracked regressions.
```

