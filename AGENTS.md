# Project Engineering Contract

Commands: install=npm ci lint=npm run lint types=npm run typecheck test=npm test build=npm run build dev=npm run dev
Architecture: see docs/engineering/ARCHITECTURE.md (UI -> domain -> data; deps point inward)

## Non-Negotiables:
- Evidence before "done": run the command, quote the real exit code and output. Never say "should work".
- Reuse existing components/hooks/utilities; search code and graph (`codegraph` / `/codesearch`) first.
- Smallest complete change; brevity never overrides validation, security, a11y, error handling or tests.
- No new dependency, API/DB contract change, migration or deployment without explicit approval.
- No secrets in code, docs, prompts, indexes or logs. Check third-party licenses for commercial safety.
- UI work: follow docs/engineering/UI_STANDARDS.md and satisfy the design brief gate.

## Execution Routing:
- Codebase Search & Impact: Use CodeGraph (`npx @colbymchenry/codegraph`) or Antigravity `/codesearch`.
- Single Objective Tasks: Use interactive session + `/plan` or native `/goal` with command-verifiable criteria.
- Multi-Story Backlogs: Follow docs/engineering/RALPH_WORKFLOW.md with reviewed `prd.json`.
- Specialist Skills: Routing table in docs/engineering/SKILL_REGISTRY.md (load maximum 2 on match only).
