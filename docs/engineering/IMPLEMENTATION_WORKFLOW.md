# Implementation Workflow & Task Decomposition Protocol (v3.0)

**Specification**: Antigravity Engineering Environment v3.0  
**Authority**: Mandatory protocol for planning, chunking, and verifying changes.

---

## 1. Execution Engine Routing

Before implementing, choose the right execution engine matching task shape (Section 3.4):

```text
Task Arrives
    │
    ├─► Fits in 1 context window; needs interactive steering ──► Session + /plan
    │
    ├─► One long objective with command-verifiable criteria  ──► Antigravity Native /goal
    │
    └─► Backlog of many small independent stories (unattended) ──► Ralph Loop (prd.json)
```

---

## 2. Six-Stage Chunking Protocol

Every non-trivial engineering task follows this chunked sequence:

```text
┌─────────────────────────────────────────────────────────────┐
│ Chunk 1: Architecture & Knowledge Graph Inspection           │
│         (npx @colbymchenry/codegraph query / impact)        │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ Chunk 2: Dependency, Interface & Scope Mapping              │
│         (Check existing components in src/components/)      │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ Chunk 3: Structured Implementation Plan Formulation         │
│         (Establish design brief for UI, API contracts)      │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ Chunk 4: Incremental Code Implementation (Ponytail Standard)│
│         (Smallest complete change; failing test first)      │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ Chunk 5: Verification Pipeline                              │
│         (npm run typecheck && npm run lint && npm test)     │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ Chunk 6: Production Build & Graph Sync                      │
│         (npm run build && codegraph sync)                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Pre-Flight & Verification Mandates

1. **Evidence Over Assertion**: Never declare completion without quoting the exact passing command output and exit code (0).
2. **Blast Radius Analysis**: Run `npx @colbymchenry/codegraph impact <symbol>` before altering any exported component, function, or schema.
3. **No Slop**: For UI work, confirm the Design Brief Gate and verify against the 14 anti-slop rules in `docs/engineering/UI_STANDARDS.md`.
