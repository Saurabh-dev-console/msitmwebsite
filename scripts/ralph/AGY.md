# Ralph Loop — Iteration Instruction for Antigravity

You are executing ONE user story from `prd.json`.

## Instructions:
1. Read `prd.json`, `progress.txt`, and `AGENTS.md`.
2. Find the highest priority story where `"passes": false`.
3. Implement ONLY that story. Do not attempt multiple stories in one iteration.
4. Follow project engineering rules:
   - Reuse existing components in `src/components/`.
   - Use `lucide-react` icons only.
   - Adhere to design tokens in `src/app/globals.css`.
5. Run verification gates:
   - `npm run typecheck`
   - `npm run lint`
   - `npm test`
   - UI stories: verify responsive layout at 360px, 768px, and 1280px.
6. If all checks pass:
   - Update `prd.json` to mark the story `"passes": true`.
   - Append concise summary to `progress.txt`.
   - Commit changes with message `feat(story-id): <title>`.
7. If all stories in `prd.json` now have `"passes": true`:
   - Output `<promise>COMPLETE</promise>`.

