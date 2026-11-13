# Ralph Loop Autonomous Workflow Guide (v3.0)

**Specification**: Antigravity Engineering Environment v3.0  
**Authority**: Mandatory protocol for multi-story autonomous deliveries.

---

## 1. What Ralph Is & Core Mechanism

Ralph (`snarktank/ralph`, MIT) is an autonomous iteration loop that executes user stories from a structured Product Requirements Document (`prd.json`) until all criteria are satisfied.

### The Fresh-Context Principle
Unlike a standard chat session where context window degrades over time, **each Ralph iteration executes in a completely fresh agent instance with a clean context window**.
State and memory persist strictly across four file-based channels:
1. **Git Commit History**: Clean commits per completed story.
2. `prd.json`: State machine tracking story priorities, passes status, and notes.
3. `progress.txt`: Append-only learnings and patterns recorded for subsequent iterations.
4. `AGENTS.md`: Project constraints, non-negotiables, and architecture references.

---

## 2. Tool Selection: Choosing the Right Execution Engine

Do not default to Ralph for every task. Choose the execution engine that matches the task shape:

```text
Task Arrives
    │
    ├─► Fits in 1 context window; needs interactive steering ──► Session + /plan
    │
    ├─► One long objective with command-verifiable criteria  ──► Antigravity Native /goal
    │
    └─► Backlog of many small independent stories (unattended) ──► Ralph Loop (prd.json)
```

| Dimension | `/plan` | Native `/goal` | Ralph Loop (`scripts/ralph/`) |
| :--- | :--- | :--- | :--- |
| **Context** | Current session | Single session (stop-hook audit) | **Fresh context every iteration** |
| **Stopping** | Interactive | When deliverables map to evidence | `<promise>COMPLETE</promise>` or iteration cap |
| **Memory** | Session history | Session history | `git`, `progress.txt`, `prd.json`, `AGENTS.md` |
| **Best For** | Aligning approach; design decisions | Coherent single objective | Unattended backlog; preventing context rot |

---

## 3. Ralph Loop Anatomy

| File | Purpose | Location |
| :--- | :--- | :--- |
| `ralph.sh` | Main execution loop driving fresh agent instances with guardrails. | `scripts/ralph/ralph.sh` |
| `AGY.md` | Single-story instruction template for Antigravity. | `scripts/ralph/AGY.md` |
| `prd.json` | Backlog state machine: user stories with priorities and `passes: false`. | Project root (`prd.json`) |
| `progress.txt` | Append-only learnings carried forward across iterations. | Project root (`progress.txt`) |

---

## 4. Upstream Limitations & Built-In Guardrails

| Upstream Limitation | Risk | Our Built-In Guardrail |
| :--- | :--- | :--- |
| **No native Antigravity support** | Tool incompatibility | Custom adapter branch (`agy` CLI) in `scripts/ralph/ralph.sh`. |
| **No stuck detection** | Story failure consumes all remaining iterations | **Max 3 attempts per story**: marks story `BLOCKED` and advances to next story. |
| **No iteration or cost cap** | Runaway spend overnight | **Strict cap (default 10 iterations)** configured in `ralph.sh`. |
| **Unattended shell execution** | Danger to main branch | **Dedicated feature branch isolation**: script blocks running directly on `main`. |
| **String match `<promise>COMPLETE</promise>`** | False positives | **Independent human gate**: CI must be green, full build must pass, diff reviewed before merging. |

---

## 5. Writing Stories Ralph Can Finish

### 5.1 Right-Sized Stories
- **Good (Right-sized)**:
  - Add a database column and migration for student roll numbers.
  - Add pagination controls to the student list component.
  - Implement export-to-CSV button on certificate verification page.
- **Bad (Too large — split them)**:
  - "Build the entire student portal."
  - "Refactor all APIs."
  - "Add full authentication and authorization."

### 5.2 Command-Verifiable Acceptance Criteria
Criteria must be testable via shell command or deterministic inspection:
- `"Typecheck passes: npm run typecheck"`
- `"Lint passes: npm run lint"`
- `"Tests pass: npm test"`
- `"Verified in browser at 360, 768, and 1280 px"`

### 5.3 `prd.json` Example
```json
{
  "branchName": "ralph/portal-pagination",
  "userStories": [
    {
      "id": "US-001",
      "title": "Add pagination controls to student directory",
      "acceptanceCriteria": [
        "Component renders 25 items per page with Next/Prev buttons",
        "npm run typecheck exits 0",
        "npm run lint exits 0",
        "Verified at 360px and 1280px viewports"
      ],
      "priority": 1,
      "passes": false,
      "notes": ""
    }
  ]
}
```

---

## 6. Pre-Flight Launch Checklist

Before executing `scripts/ralph/ralph.sh`:
- [ ] Baseline is green: `npm run typecheck`, `npm run lint`, `npm test`, `npm run build` all pass.
- [ ] Dedicated feature branch created (never run on `main`).
- [ ] `prd.json` reviewed by a human with small, ordered, command-verifiable stories.
- [ ] No secrets, credentials, or destructive migrations present in stories.
- [ ] Max iterations and per-story caps verified.
- [ ] Post-loop independent verification: Run full CI test suite and inspect git diff before merging.

