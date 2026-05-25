#!/usr/bin/env bash
# apply-patch.sh — apply the run-skill patch and push to claude/elegant-mendel-F4LbC
# Run this from the root of your local clone of hiimOmagh/Jarbou3iModel.
# The script self-deletes on success.
set -e

BRANCH="claude/elegant-mendel-F4LbC"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "==> Checking repo state..."
CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ "$CURRENT_BRANCH" != "$BRANCH" ]; then
  echo "    Switching from '$CURRENT_BRANCH' to '$BRANCH'..."
  git fetch origin main 2>/dev/null || true
  git checkout -B "$BRANCH" origin/main 2>/dev/null || git checkout -B "$BRANCH" main
fi

echo "==> Creating skill directory..."
mkdir -p .claude/skills/run-jarbou3i-research-engine

echo "==> Copying files..."
cp "$SCRIPT_DIR/.claude/skills/run-jarbou3i-research-engine/SKILL.md" \
   .claude/skills/run-jarbou3i-research-engine/SKILL.md
cp "$SCRIPT_DIR/.claude/skills/run-jarbou3i-research-engine/driver.mjs" \
   .claude/skills/run-jarbou3i-research-engine/driver.mjs

echo "==> Staging files..."
git add .claude/skills/run-jarbou3i-research-engine/SKILL.md \
        .claude/skills/run-jarbou3i-research-engine/driver.mjs

echo "==> Committing..."
git commit -m "chore: add run skill with headless driver for Jarbou3i Research Engine

Adds .claude/skills/run-jarbou3i-research-engine/ with a SKILL.md and
driver.mjs that let agents launch, screenshot, and drive the app using
the pre-installed Playwright Chromium. Verified: smoke pass, zero
overflow, AR/EN/FR language switching, mobile viewport, guided CTA.

https://claude.ai/code/session_01AKmvhshi5awxkrmSZbuwok"

echo "==> Pushing to origin/$BRANCH..."
git push -u origin "$BRANCH"

echo "==> Cleaning up patch files..."
rm -rf "$SCRIPT_DIR"
echo "==> Done. apply-patch.sh self-deleted."
