# Testing & Verification Protocol

This document outlines the mandatory verification pipeline that must pass before any code change is merged, committed, or reported as complete.

---

## 1. Automated Verification Pipeline

Every code modification must pass this four-stage quality gate:

```text
┌─────────────────────────────────────────────────────────────┐
│ 1. TypeScript Static Typecheck                              │
│    npm run typecheck  (tsc --noEmit)                        │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ 2. ESLint Static Analysis                                   │
│    npm run lint  (eslint .)                                 │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ 3. Next.js Turbopack Production Build                       │
│    npm run build  (next build)                              │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ 4. GitNexus Graph Regression & Blast Radius Check           │
│    node .gitnexus/run.cjs detect-changes --scope all        │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Command Details & Verification Checkpoints

### 2.1 TypeScript Typecheck
```bash
npm run typecheck
```
- **Execution**: Runs `tsc --noEmit`.
- **Target**: Compiles all `.ts` and `.tsx` files in `src/` against `tsconfig.json`.
- **Pass Criteria**: Zero errors (`exit code 0`). No `// @ts-ignore` bypasses are allowed without architectural sign-off.

### 2.2 ESLint Validation
```bash
npm run lint
```
- **Execution**: Runs `eslint .` via `eslint.config.mjs` (Next.js core web vitals and TypeScript rules).
- **Pass Criteria**: Zero errors and zero warnings (`exit code 0`).

### 2.3 Turbopack Production Build
```bash
npm run build
```
- **Execution**: Runs `next build` with Turbopack.
- **Environment Prerequisite**: Ensure `DATABASE_URL` is set (e.g., via `.env` or CI environment variable) so route handlers can evaluate without crashing data collection workers.
- **Pass Criteria**: 100% of static and dynamic pages compile successfully with zero build-time exceptions.

### 2.4 Code Knowledge Graph Impact & Regression Check
```bash
node .gitnexus/run.cjs detect-changes --scope all
```
- **Execution**: Maps the current git diff hunks against indexed symbols and execution flows.
- **Pass Criteria**: No unexpected broken call paths or unhandled dependencies across the 44 execution flows.

---

## 3. Mandatory Rule on Verification Integrity

> **CRITICAL RULE**: Never claim a test, typecheck, or build passed unless the command was actually executed in the current environment and returned exit code 0. If an error occurs, report the exact error log and the remediation steps taken.

