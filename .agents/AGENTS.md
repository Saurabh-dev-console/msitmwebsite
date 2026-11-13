# Project Engineering Contract (v3)

Commands: install=npm ci lint=npm run lint types=npm run typecheck test=npm test build=npm run build dev=npm run dev
Architecture: see docs/engineering/ARCHITECTURE.md (UI -> domain -> data; deps point inward)

## Non-Negotiables:
- Evidence before "done": run the command, quote the real exit code and output. Never say "should work".
- Reuse existing components/hooks/utilities; search code and graph (`codegraph` / `/codesearch`) first.
- Smallest complete change; brevity never overrides validation, security, a11y, error handling or tests.
- No new dependency, API/DB contract change, migration or deployment without explicit approval.
- No secrets in code, docs, prompts, indexes or logs. Check third-party licenses for commercial safety.
- UI work: follow docs/engineering/UI_STANDARDS.md and satisfy the design brief gate.

## Persistent Rules:
- UI Standards: `.agents/rules/ui-engineering.md` (glob: *.tsx, *.jsx, *.css)
- Security: `.agents/rules/security.md` (model_decision)
- Database: `.agents/rules/database.md` (model_decision)
- Testing: `.agents/rules/testing.md` (glob: *.test.*, *.spec.*)
- Ralph Loop: `.agents/rules/ralph.md` (manual)

## Execution & Skills:
- Code Intelligence: CodeGraph MCP (`npx @colbymchenry/codegraph`) or Antigravity `/codesearch`.
- Backlog Automation: `scripts/ralph/ralph.sh` per `docs/engineering/RALPH_WORKFLOW.md`.
- Skills Inventory: `docs/engineering/SKILL_REGISTRY.md` (maximum 2 skills loaded on match).
