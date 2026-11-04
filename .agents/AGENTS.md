# Antigravity Engineering Environment & Agent Standards (v2)

Welcome to the MSITM Website Audit & Rebuild Engineering Environment.
All AI agents, engineers, and contributors must adhere to this document and the central engineering documentation in `docs/engineering/`.

---

## 1. Central Documentation (10 Core Files)

The documentation suite in `docs/engineering/` has been consolidated into 10 definitive files:

```text
docs/engineering/
├── README.md                     # Master index & setup status
├── ARCHITECTURE.md               # System architecture, stack, data flow
├── ENGINEERING_RULES.md          # Master rules: Icons, Component Reuse, Dependency Policy
├── UI_LIBRARY_GUIDE.md           # Skiper UI, Vengence UI registries & Animaster
├── CODE_GRAPH_GUIDE.md           # GitNexus code knowledge graph protocol
├── IMPLEMENTATION_WORKFLOW.md    # 6-step task chunking execution flow
├── SKILL_REGISTRY.md             # Inventory of all agent skills and statuses
├── DECISIONS.md                  # Architecture Decision Records (ADRs)
├── ONYX_INTEGRATION.md           # Onyx enterprise platform evaluation & deferred guide
└── TESTING_AND_VERIFICATION.md   # Typecheck, lint, build, & regression checks
```

---

## 2. Token-Efficient Skill Routing

Never activate all skills simultaneously. Load only the specific skill matching task intent:

| Task Intent | Skills to Load |
| :--- | :--- |
| **Reverse engineer authorized runtime/app behavior** | `reverse-engineering` / `reverse-engineer-anything` |
| **Refactor, simplify, or implement code** | `ponytail` + relevant graph context |
| **Create or redesign a UI surface** | `ui-ux-pro-max` and/or `hallmark`; `impeccable` for audit |
| **Polish natural-language copy** | `humanizer` |
| **Recent technology / community research** | `last30days` |
| **Authorized website data extraction** | `scrapling-official` |
| **Architecture / sequence / technical diagrams** | `diagram-design` |
| **Search project knowledge base** | Onyx MCP (only if deployed & connected) |

---

## 3. Strict Pre-Coding Protocol

Before altering any code:
1. Consult `docs/engineering/README.md`.
2. Run graph impact check: `node .gitnexus/run.cjs impact <symbol> --direction upstream`.
3. Check for existing reusable components in `src/components/` and `docs/engineering/ENGINEERING_RULES.md`.
4. Decompose substantial tasks using `.agents/skills/task-chunking/SKILL.md`.

---

## 4. Post-Coding Verification Checklist

Every change must pass:
1. `npm run typecheck` (zero TypeScript errors)
2. `npm run lint` (zero ESLint errors)
3. `npm run build` (Turbopack production build check)
4. `node .gitnexus/run.cjs detect-changes --scope all` (graph regression detection)
5. `git diff` review before commit.
