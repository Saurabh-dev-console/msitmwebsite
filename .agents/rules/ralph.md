---
trigger: manual
description: "Autonomous Ralph loop execution instructions, story sizing, and safety guardrails."
---
# Ralph Loop Autonomous Execution Rules

Follow @[ralph-workflow](docs/engineering/RALPH_WORKFLOW.md).

## Non-Negotiables & Guardrails:
1. **Fresh Context Isolation**: Each Ralph iteration runs in an isolated, clean context. Cross-iteration state lives exclusively in `prd.json`, `progress.txt`, and git commit history.
2. **Iteration Caps & Stuck Detection**:
   - Hard iteration cap (default 10 iterations).
   - Per-story attempt limit: maximum 3 failed attempts before marking the story `blocked` and progressing.
   - Halt immediately on identical repeated failure patterns.
3. **Execution Safety**:
   - Run only in an isolated feature branch or worktree, never directly on `main`.
   - Never place production credentials, secrets, or destructive database operations (DROP/TRUNCATE) in stories.
4. **Acceptance Criteria**:
   - Stories must be right-sized (one component, one migration, one action).
   - Acceptance criteria must be checkable via shell commands (`npm run typecheck`, `npm test`, `npm run build`, browser viewport check).
5. **Completion Verification**:
   - Emit `<promise>COMPLETE</promise>` ONLY when all stories in `prd.json` have `passes: true` and all verification gates pass cleanly.

