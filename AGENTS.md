<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **msitm-website-audit-rebuild** (551 symbols, 1074 relationships, 44 execution flows).

> Index stale? Run `node .gitnexus/run.cjs analyze --index-only` from the project root — it auto-selects an available runner. No `.gitnexus/run.cjs` yet? Bootstrap with `npx`, `bunx`, or `pnpm dlx` — e.g. `bunx gitnexus@latest analyze` (npm 11 npx crash; #1939).

## Always Do

- **MUST run impact before editing.** Use `impact({target: "symbolName", direction: "upstream"})` or `node .gitnexus/run.cjs impact "symbolName" --direction upstream --repo .`; report callers, processes, and risk. Never substitute grep for graph analysis.
- **MUST analyze graph changes before committing.** Use `detect_changes({scope: "all"})` (MCP) or `node .gitnexus/run.cjs detect-changes --scope all --repo .` (CLI fallback). `partial: true` or `truncated: true` is not a clean check — a zero means unseen, not unaffected; re-run it. For regression review: `detect_changes({scope: "compare", base_ref: "main"})` or `node .gitnexus/run.cjs detect-changes --scope compare --base-ref "main" --repo .`.
- MUST warn on HIGH/CRITICAL `risk` pre-edit; never use `riskSharedAxes` to waive a HIGH/CRITICAL `risk` warning. Compare File/symbol: MCP File omits axes; Graph-RAG expands File.
- **MUST treat `risk: UNKNOWN` as unresolved, not as low.** An empty caller set is not evidence the symbol is unused — it can also mean the callers are not resolvable by the index (plain-object property access, dynamic dispatch, cross-language calls). `impact` pairs `UNKNOWN` with a `riskNote` saying so. Confirm with a text search before treating the symbol as safe to change or delete; do not proceed on the strength of a zero.
- **MUST use `query({search_query: "concept"})` for concepts/flows, `context({name: "symbolName"})` for a named symbol, or `impact` for blast radius, on read-only callers, dependencies, imports, or execution flow.** Graph first; text search only for empty/`UNKNOWN`/literals.
- For security review, `explain({target: "fileOrSymbol"})` lists taint findings (source→sink flows; needs `analyze --pdg`).

## Never Do

- NEVER edit a function, class, or method before MCP/CLI impact analysis.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis, and never read `UNKNOWN` as an all-clear — it means the walk could not answer, which is the one verdict that requires confirming by other means.
- NEVER rename symbols with find-and-replace — use `rename` which understands the call graph.
- NEVER commit before MCP/CLI graph change analysis.

## Resources

| Resource | Use for |
| --- | --- |
| `gitnexus://repo/msitm-website-audit-rebuild/context` | Codebase overview, check index freshness |
| `gitnexus://repo/msitm-website-audit-rebuild/clusters` | All functional areas |
| `gitnexus://repo/msitm-website-audit-rebuild/processes` | All execution flows |
| `gitnexus://repo/msitm-website-audit-rebuild/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
| --- | --- |
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->

---

# Permanent Engineering Standards & Agent Execution Policy

All development and AI assistance in this workspace is governed by the permanent engineering rules and skills:

## 1. Central Documentation (10 Core Files)
Always consult the central documentation index at `docs/engineering/README.md` before making architectural decisions:
- `docs/engineering/README.md` — Master index & setup status
- `docs/engineering/ARCHITECTURE.md` — Stack overview & layout hierarchy
- `docs/engineering/ENGINEERING_RULES.md` — Master engineering mandates, icon standards, component reuse & dependency policy
- `docs/engineering/UI_LIBRARY_GUIDE.md` — Animaster, Skiper UI, Vengence UI registries
- `docs/engineering/CODE_GRAPH_GUIDE.md` — Code intelligence & token-efficient querying
- `docs/engineering/IMPLEMENTATION_WORKFLOW.md` — 6-step task chunking execution flow
- `docs/engineering/SKILL_REGISTRY.md` — Official inventory of all agent skills and statuses
- `docs/engineering/DECISIONS.md` — Architecture Decision Records (ADRs)
- `docs/engineering/ONYX_INTEGRATION.md` — Onyx enterprise platform evaluation & deferred guide
- `docs/engineering/TESTING_AND_VERIFICATION.md` — Typecheck, lint, build, & regression checks

## 2. Token-Efficient Skill Routing (v2)

Load only the specific skill matching task intent. Never activate all skills at once:

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

## 3. Standard Agent Workflow
1. **Before Coding**: Read `docs/engineering/README.md`, identify symbols in the code graph, calculate upstream impact, and plan chunks.
2. **During Coding**: Reuse existing components, follow Ponytail simplicity, use `lucide-react` icons only, preserve styling tokens (`globals.css`).
3. **After Coding**: Execute `npm run typecheck`, `npm run lint`, `npm run build`, `node .gitnexus/run.cjs detect-changes --scope all`, and verify diffs.
