# Implementation Workflow & Task Chunking Protocol

This document establishes the official engineering lifecycle for executing features, enhancements, and bug fixes across the MSITM platform.

---

## 1. The 6-Stage Task Chunking Lifecycle

Every substantial engineering objective must be decomposed into six verifiable sequential chunks:

```text
┌─────────────────────────────────────────────────────────────┐
│ Chunk 1: Architecture & Knowledge Graph Inspection           │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ Chunk 2: Dependency, Interface & Scope Mapping              │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ Chunk 3: Structured Implementation Plan Formulation         │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ Chunk 4: Incremental Code Implementation (Ponytail Standard)│
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ Chunk 5: Validation Checkpoints (Typecheck, Lint, Build)    │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ Chunk 6: Regression Review, Graph Diff Analysis & Commit    │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Chunk-by-Chunk Responsibilities

### Chunk 1: Architecture & Knowledge Graph Inspection
- Query the GitNexus knowledge graph for relevant symbols and flows (`node .gitnexus/run.cjs context <symbol>`).
- Identify caller and callee hierarchies.
- Inspect current database schemas in `src/db/schema.ts` if data persistence is touched.

### Chunk 2: Dependency, Interface & Scope Mapping
- Determine all files, components, and route handlers within the blast radius.
- Calculate upstream risk: `node .gitnexus/run.cjs impact <symbol> --direction upstream`.
- Check `docs/engineering/COMPONENT_REUSE.md` to identify existing reusable elements.
- Verify whether external package installations are needed against `docs/engineering/DEPENDENCY_POLICY.md`.

### Chunk 3: Structured Implementation Plan Formulation
- Draft a concise, step-by-step implementation plan.
- Identify the smallest complete diff that satisfies requirements (Ponytail standard).
- Document design decisions, prop interfaces, and fallback strategies.

### Chunk 4: Incremental Code Implementation
- Apply modifications cleanly using `edit_file` or `write_file`.
- Adhere to design tokens in `src/app/globals.css`.
- Ensure all icons come from `@/components/icons`.
- Maintain honeypots and validation logic in form handlers.

### Chunk 5: Validation Checkpoints
- Execute TypeScript validation: `npm run typecheck`.
- Execute ESLint validation: `npm run lint`.
- Execute production build compilation: `npm run build`.
- If any check fails, resolve the failure immediately before moving to the next chunk.

### Chunk 6: Regression Review & Finalization
- Run graph diff impact analysis: `node .gitnexus/run.cjs detect-changes --scope all`.
- Inspect git status and working tree: `git diff`.
- Refresh graph index if new symbols were introduced: `node .gitnexus/run.cjs analyze --index-only`.
- Commit with a clear, conventional commit message (`feat:`, `fix:`, `refactor:`, `chore:`).

---

## 3. Mandatory Execution Rules

1. **No Monolithic Leaps**: Large features must not be written in one giant edit. Break them down.
2. **Independent Verifiability**: Each chunk must have a distinct test or verification command that confirms success.
3. **Transparent Blockers**: If an unexpected dependency error, missing database table, or type mismatch occurs, halt and report it with exact error logs. Never silently bypass failed tests.
4. **Never Repeat Completed Work**: Reuse existing helpers (`src/lib/utils.ts`, `src/data/`, `src/components/chrome.tsx`).

