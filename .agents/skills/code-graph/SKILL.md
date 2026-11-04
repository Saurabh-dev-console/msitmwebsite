---
name: code-graph
description: Code intelligence knowledge graph workflow powered by GitNexus. Enables symbol lookup, dependency traversal, upstream blast radius analysis, and diff-based change detection with zero token waste.
argument-hint: "[context|impact|query|status|analyze]"
license: MIT
---

# Code Knowledge Graph Protocol

This skill provides graph-based code intelligence for exploring architecture, analyzing call chains, calculating impact blast radiuses, and retrieving precise symbol context before editing.

## Primary Engine: GitNexus (v1.6.x)

- **Architecture**: Zero-server, client-side knowledge graph utilizing embedded LadybugDB graph database.
- **MCP Integration**: Fully configured for Antigravity stdio MCP server and interactive agent skills.
- **Index State**: 551 nodes, 1,074 edges, 13 clusters, 44 execution flows.
- **Storage Isolation**: `.gitnexus/` (runtime graph data, `.gitignore` isolated) and `.agent-data/code-graph/` (workspace metadata).

## Core Capabilities & Commands

Use the local runner `node .gitnexus/run.cjs` (or `npx gitnexus`):

### 1. Symbol Context (360° View)
Retrieve incoming callers, outgoing calls, property accesses, line numbers, and execution flows for any symbol:
```bash
node .gitnexus/run.cjs context <SymbolName>
```
*Example:* `node .gitnexus/run.cjs context Header`

### 2. Impact & Blast Radius Analysis (Mandatory Pre-Edit Check)
Inspect upstream callers and affected execution flows before altering any symbol or function:
```bash
node .gitnexus/run.cjs impact <SymbolName> --direction upstream
```
*Rules:*
- If `risk` is `HIGH` or `CRITICAL`, inspect all callers before proceeding.
- If `risk` is `UNKNOWN`, confirm with text search—an empty caller set in the graph does not guarantee absence of dynamic references.

### 3. Concept & Flow Query
Search execution flows by domain concepts (e.g., admissions, certificate verification, navigation):
```bash
node .gitnexus/run.cjs query "<concept>"
```

### 4. Path & Call-Chain Tracing
Find the shortest call path between two symbols:
```bash
node .gitnexus/run.cjs trace <SourceSymbol> <TargetSymbol>
```

### 5. Diff-to-Symbol Change Detection (Pre-Commit Check)
Map git changes to indexed symbols and downstream execution flows:
```bash
node .gitnexus/run.cjs detect-changes --scope all
```

### 6. Incremental Index Refresh
Re-index the codebase after significant modifications:
```bash
node .gitnexus/run.cjs analyze --index-only
```

## Token Optimization Best Practices

1. **Query Before Opening**: Always retrieve symbol context and caller paths via the graph before reading entire source files.
2. **Retrieve Targeted Context**: Read only the line ranges identified by `startLine` and `endLine` from the graph output.
3. **Avoid Reading Unchanged Files**: Let the graph verify whether dependent components are affected.
4. **Context Budget Discipline**: Do not dump the entire codebase into chat context; keep token utilization minimal and focused.

