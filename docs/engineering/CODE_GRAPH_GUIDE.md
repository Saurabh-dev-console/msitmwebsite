# Code Knowledge Graph Guide (GitNexus Architecture)

This document outlines the code knowledge graph architecture, query protocols, blast-radius impact analysis, and token-optimization practices used in this workspace.

---

## 1. Engine Selection & Technical Evaluation

After evaluating graph solutions for token efficiency, local privacy, Windows compatibility, and Antigravity MCP integration, **GitNexus** was selected as the primary code intelligence engine.

| Criteria | GitNexus Evaluation |
| :--- | :--- |
| **Runtime & Platform** | Node.js native (`run.cjs` / CLI), runs cleanly on Windows x64 and Node v22.23.4. |
| **Database & Privacy** | Embedded LadybugDB zero-server graph database. 100% local, no external telemetry or cloud leakage. |
| **Language Support** | Full TypeScript, TSX, ECMAScript modules, React 19 JSX, and Next.js App Router AST parsing. |
| **Current Index Scale** | **551 symbols**, **1,074 relationships**, **13 clusters**, **44 execution flows**. |
| **Antigravity MCP** | Built-in stdio server (`gitnexus mcp`) and auto-configured skills & AfterTool hooks. |
| **Token Economy** | Enables 360-degree symbol lookups and caller tracing without loading hundreds of source lines into context. |

---

## 2. Graph Storage & Isolation

- **Runtime Index Storage**: `.gitnexus/` contains the compiled graph database (`lbug`), metadata (`gitnexus.json`), and AST parse caches.
- **Git Isolation**: `.gitnexus/.gitignore` contains `*` to ensure that generated binary database files are never committed to version control.
- **Persistent Workspace Metadata**: `.agent-data/code-graph/` preserves workspace-specific graph metadata, maintaining strict separation from application source files in `src/`.
- **Git Ignore Safeguard**: Root `.gitignore` explicitly excludes `.agent-data/code-graph/` and `.agent-data/`.

---

## 3. Essential Knowledge Graph Commands

All commands can be executed via the project runner: `node .gitnexus/run.cjs <command>` or `npx gitnexus <command>`.

### 3.1 Symbol Context (360° Architectural View)
Retrieve a symbol's declaration location, line boundaries, incoming callers, outgoing calls, property accesses, and execution flows:
```bash
node .gitnexus/run.cjs context <SymbolName>
```
*Example:* `node .gitnexus/run.cjs context EnquiryForm`

### 3.2 Impact Analysis (Blast Radius Check)
Determine what breaks before modifying or deleting a symbol:
```bash
node .gitnexus/run.cjs impact <SymbolName> --direction upstream
```
*Verification Rule:*
- If `risk` is `HIGH` or `CRITICAL`, you must review every upstream caller before modifying the symbol signature.
- If `risk` is `UNKNOWN`, the graph did not resolve static references (common with plain object access or dynamic dispatch). You must perform a text search to confirm safety before making destructive changes.

### 3.3 Semantic Flow Query
Search execution flows by domain or workflow concept:
```bash
node .gitnexus/run.cjs query "<Concept>"
```
*Example:* `node .gitnexus/run.cjs query "admission"`

### 3.4 Call Path Tracing
Discover the exact call sequence connecting two symbols:
```bash
node .gitnexus/run.cjs trace <StartSymbol> <EndSymbol>
```

### 3.5 Pre-Commit Diff Impact Analysis
Map pending git changes against the symbol graph:
```bash
node .gitnexus/run.cjs detect-changes --scope all
```

### 3.6 Re-indexing
Update the graph index after adding or renaming files:
```bash
node .gitnexus/run.cjs analyze --index-only
```

---

## 4. Token-Optimization Protocol for AI Agents

To minimize context token consumption and maximize accuracy:

1. **Graph First, File Second**: Never open a file to "see what's in there". Run `node .gitnexus/run.cjs context <Symbol>` first.
2. **Read Exact Line Ranges**: When editing is required, use `read_file` with `StartLine` and `EndLine` informed by the graph's `startLine` and `endLine`.
3. **Avoid Speculative Grepping**: Grepping across entire workspaces dumps thousands of irrelevant tokens into context. Use `impact` and `trace` for call chains.
4. **Targeted Diffs**: Review specific file diffs rather than entire workspace git outputs.

