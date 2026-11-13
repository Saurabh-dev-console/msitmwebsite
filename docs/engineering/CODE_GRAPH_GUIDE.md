# Code Knowledge Graph Guide (CodeGraph Architecture v3.0)

**Specification**: Antigravity Engineering Environment v3.0  
**Primary Engine**: CodeGraph (`@colbymchenry/codegraph@1.6.2`)  
**Licence**: MIT / Apache-2.0 (Permissive for commercial use)

---

## 1. Engine Architecture & Licensing Evaluation

In Antigravity Engineering Environment v3.0, the codebase intelligence engine was upgraded to comply with strict open-source and commercial licensing criteria:

| Criteria | CodeGraph (Selected Primary Engine) | GitNexus (License Blocked) |
| :--- | :--- | :--- |
| **Licence** | **MIT / Apache-2.0 (Permissive)** | **PolyForm Noncommercial (BLOCKED)** |
| **Storage & Database** | Local SQLite index in `.codegraph/` | Local LadybugDB in `.gitnexus/` |
| **Parsing Engine** | Tree-sitter AST parsing with full-text search | Tree-sitter AST parsing |
| **Current Project Scale** | **284 files, 8,865 nodes, 24,219 edges** | 551 symbols, 1,074 edges |
| **Antigravity Integration** | Listed among supported MCP agents (`codegraph install`) | Manual stdio MCP |
| **Context Hygiene** | Zero file injections into `AGENTS.md` | Injects 44 lines into `AGENTS.md` (violates < 60 line rule) |

*Decision*: CodeGraph is established as the primary graph engine. GitNexus is maintained strictly as an isolated, unreferenced fallback for non-commercial research.

---

## 2. Before & After Code-Editing Protocol

### 2.1 Before Editing (Blast Radius Inspection)
1. **Search Symbols**: Use `npx @colbymchenry/codegraph query <symbol>` to find definitions and signatures.
2. **Impact Analysis**: Use `npx @colbymchenry/codegraph impact <symbol>` to see upstream callers and dependents.
3. **Inspect Callers/Callees**: Run `npx @colbymchenry/codegraph callers <symbol>` and `npx @colbymchenry/codegraph callees <symbol>`.
4. **Read Actual Source**: The code graph provides a map; always read the actual file range before making changes.

### 2.2 After Editing (Verification & Freshness)
1. **Sync Changes**: Run `npx @colbymchenry/codegraph sync` to refresh modified AST nodes.
2. **Execute Tests**: Run `npm test` and `npm run typecheck` to verify no broken contracts.
3. **Verify Index Freshness**: Run `npx @colbymchenry/codegraph status`.

---

## 3. Essential CodeGraph Commands

All commands run directly using `npx @colbymchenry/codegraph <command>`:

### 3.1 Symbol Search (`query`)
```bash
npx @colbymchenry/codegraph query Header
npx @colbymchenry/codegraph query Student
```
Finds symbol definitions, types, and file locations with line numbers.

### 3.2 Blast Radius & Impact Check (`impact`)
```bash
npx @colbymchenry/codegraph impact Header
npx @colbymchenry/codegraph impact students
```
Lists all functions, components, and pages that depend on the target symbol.

### 3.3 Callers & Callees Tracing
```bash
npx @colbymchenry/codegraph callers <symbol>
npx @colbymchenry/codegraph callees <symbol>
```

### 3.4 Deep Exploration (`explore`)
```bash
npx @colbymchenry/codegraph explore "portal authentication flow"
```
Returns relevant symbols, source snippets, and execution paths in a single shot.

### 3.5 Index Maintenance (`sync`, `status`, `index`)
```bash
# Check current index health
npx @colbymchenry/codegraph status

# Incrementally sync files modified since last index
npx @colbymchenry/codegraph sync

# Rebuild complete index from scratch
npx @colbymchenry/codegraph index
```

---

## 4. Storage & `.gitignore` Isolation

The SQLite index and AST cache live inside `.codegraph/`. This directory is strictly excluded from version control in `.gitignore`. No database binaries or secrets are ever tracked or committed.
