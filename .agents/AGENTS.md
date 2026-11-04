# Antigravity Engineering Environment & Agent Standards

Welcome to the MSITM Website Audit & Rebuild Engineering Environment.
All AI agents, engineers, and contributors must adhere to this document and the central engineering documentation in `docs/engineering/`.

---

## 1. Core Engineering Philosophy

- **Minimal & Essential Code**: We follow the Ponytail philosophy (`.agents/skills/ponytail/SKILL.md`). The best code is the code never written. Solve problems with the least code, zero unnecessary abstractions, and zero speculative features.
- **Task Chunking**: Substantial tasks MUST be decomposed into sequential, verifiable chunks (`.agents/skills/task-chunking/SKILL.md`).
- **Graph-First Intelligence**: Always query the GitNexus code knowledge graph (`.agents/skills/code-graph/SKILL.md`) before opening or editing files.
- **Centralized Design & Assets**: Strictly zero hardcoded icons (use `lucide-react`), zero duplicate components, and adherence to approved UI libraries (`Skiper UI`, `Vengence UI`, `Animaster`).
- **Production Reliability**: WCAG 2.2 AA accessibility, full TypeScript safety, strict Drizzle/Postgres schema consistency, and continuous build verification.

---

## 2. Directory Navigation & Central Documentation

```text
docs/
└── engineering/
    ├── README.md                     # Master engineering documentation index
    ├── ARCHITECTURE.md               # System architecture, stack, data flow
    ├── ENGINEERING_RULES.md          # 5 Non-negotiable software engineering rules
    ├── UI_LIBRARY_GUIDE.md           # Approved UI libraries & registry integration
    ├── CODE_GRAPH_GUIDE.md           # GitNexus code knowledge graph protocol
    ├── IMPLEMENTATION_WORKFLOW.md    # 6-step task chunking & implementation workflow
    ├── DEPENDENCY_POLICY.md          # Package management, auditing, and vetting
    ├── ICON_SYSTEM.md                # Centralized Lucide icon standard
    ├── COMPONENT_REUSE.md            # Discovery-first component reuse guide
    ├── TESTING_AND_VERIFICATION.md   # Testing, linting, typechecking, build verification
    └── CHANGELOG.md                  # Infrastructure & architectural decision record

.agents/
├── AGENTS.md                         # Agent instructions
└── skills/
    ├── ponytail/SKILL.md             # Minimal-code engineering
    ├── task-chunking/SKILL.md        # Verifiable step-by-step task chunking
    ├── reverse-engineering/SKILL.md  # Clean-room REA reverse engineering standard
    └── code-graph/SKILL.md           # Graph traversal & blast-radius impact analysis

.agent-data/
└── code-graph/                       # Graph data storage & workspace isolation
```

---

## 3. Strict Pre-Coding Protocol

Before altering any code:
1. Consult `docs/engineering/README.md`.
2. Run graph impact check: `node .gitnexus/run.cjs impact <symbol> --direction upstream`.
3. Check for existing reusable components in `src/components/` and `docs/engineering/COMPONENT_REUSE.md`.
4. Decompose the task into chunks using the template in `.agents/skills/task-chunking/SKILL.md`.

---

## 4. Post-Coding Verification Checklist

Every change must pass:
1. `npm run typecheck` (zero TypeScript errors)
2. `npm run lint` (zero ESLint errors)
3. `npm run build` (Turbopack production build check)
4. `node .gitnexus/run.cjs detect-changes --scope all` (graph regression detection)
5. `git diff` review before commit.

