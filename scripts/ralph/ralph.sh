#!/usr/bin/env bash
# scripts/ralph/ralph.sh
# Autonomous Ralph Loop for Antigravity / Claude Code / Amp
# Rebuilt per Antigravity Engineering Environment v3.0

set -euo pipefail

TOOL="${1:-agy}"
MAX_ITERATIONS="${2:-10}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

PRD_FILE="$REPO_ROOT/prd.json"
PROGRESS_FILE="$REPO_ROOT/progress.txt"

if [[ ! -f "$PRD_FILE" ]]; then
  echo "Error: prd.json not found in repository root ($PRD_FILE)."
  echo "Copy scripts/ralph/prd.json.example to prd.json and customize your stories."
  exit 1
fi

BRANCH_NAME=$(jq -r '.branchName // empty' "$PRD_FILE")
if [[ -z "$BRANCH_NAME" ]]; then
  echo "Error: branchName missing in prd.json."
  exit 1
fi

CURRENT_BRANCH=$(git branch --show-current)
if [[ "$CURRENT_BRANCH" == "main" || "$CURRENT_BRANCH" == "master" ]]; then
  echo "Safety check: Switching to feature branch '$BRANCH_NAME'..."
  git checkout -B "$BRANCH_NAME"
fi

echo "=========================================================="
echo " Starting Ralph Loop (Tool: $TOOL, Max Iterations: $MAX_ITERATIONS)"
echo " Branch: $BRANCH_NAME"
echo "=========================================================="

ITERATION=0
STUCK_COUNTER=0
LAST_FAILED_STORY=""

while [[ $ITERATION -lt $MAX_ITERATIONS ]]; do
  ITERATION=$((ITERATION + 1))
  echo ""
  echo ">>> [Iteration $ITERATION / $MAX_ITERATIONS] Starting fresh agent context..."

  REMAINING=$(jq '[.userStories[] | select(.passes == false)] | length' "$PRD_FILE")
  if [[ "$REMAINING" -eq 0 ]]; then
    echo "All stories completed in prd.json! Loop finished successfully."
    exit 0
  fi

  CURRENT_STORY=$(jq -r '[.userStories[] | select(.passes == false)] | sort_by(.priority)[0].id' "$PRD_FILE")
  echo ">>> Active Story: $CURRENT_STORY (Remaining: $REMAINING)"

  OUTPUT=""
  if [[ "$TOOL" == "amp" ]]; then
    OUTPUT=$(cat "$SCRIPT_DIR/prompt.md" | amp run --dangerously-allow-all 2>&1 | tee /dev/stderr) || true
  elif [[ "$TOOL" == "claude" ]]; then
    OUTPUT=$(cat "$SCRIPT_DIR/CLAUDE.md" | claude -p --dangerously-skip-permissions 2>&1 | tee /dev/stderr) || true
  elif [[ "$TOOL" == "agy" ]]; then
    # Antigravity CLI adapter branch
    if command -v agy >/dev/null 2>&1; then
      OUTPUT=$(cat "$SCRIPT_DIR/AGY.md" | agy exec --non-interactive 2>&1 | tee /dev/stderr) || true
    else
      echo "Note: 'agy' CLI not found on PATH. Run story interactively with /goal or in session."
      exit 1
    fi
  else
    echo "Unknown tool: $TOOL. Supported tools: amp | claude | agy"
    exit 1
  fi

  # Check for completion string
  if echo "$OUTPUT" | grep -q "<promise>COMPLETE</promise>"; then
    echo ">>> Agent declared COMPLETE!"
    STILL_REMAINING=$(jq '[.userStories[] | select(.passes == false)] | length' "$PRD_FILE")
    if [[ "$STILL_REMAINING" -eq 0 ]]; then
      echo "Verified: All user stories marked passes=true. Ralph loop succeeded!"
      exit 0
    else
      echo "Warning: COMPLETE emitted but stories still pending in prd.json."
    fi
  fi

  # Guardrail: Stuck loop detection (per-story max 3 attempts)
  if [[ "$CURRENT_STORY" == "$LAST_FAILED_STORY" ]]; then
    STUCK_COUNTER=$((STUCK_COUNTER + 1))
    if [[ $STUCK_COUNTER -ge 3 ]]; then
      echo "Guardrail: Story $CURRENT_STORY failed 3 consecutive times. Marking blocked and proceeding."
      # Mark notes with blocked
      jq "(.userStories[] | select(.id == \"$CURRENT_STORY\")).notes |= \"BLOCKED after 3 failed attempts\"" "$PRD_FILE" > "$PRD_FILE.tmp" && mv "$PRD_FILE.tmp" "$PRD_FILE"
      STUCK_COUNTER=0
    fi
  else
    STUCK_COUNTER=0
    LAST_FAILED_STORY="$CURRENT_STORY"
  fi

done

echo "Iteration limit ($MAX_ITERATIONS) reached without completion."
exit 1

