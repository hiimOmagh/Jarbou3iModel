#!/usr/bin/env bash
# apply-patch.sh — apply v1.4.0-alpha.6 patch and push to claude/elegant-mendel-F4LbC
# Run from the root of your local clone of hiimOmagh/Jarbou3iModel.
# Self-deletes on success.
set -e

BRANCH="claude/elegant-mendel-F4LbC"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "==> Checking repo state..."
CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ "$CURRENT_BRANCH" != "$BRANCH" ]; then
  echo "    Switching to '$BRANCH'..."
  git checkout "$BRANCH" 2>/dev/null || git checkout -B "$BRANCH" origin/main
fi

echo "==> Copying files..."
mkdir -p docs/adr src/research tests

cp "$SCRIPT_DIR/docs/adr/ADR-001-provider-execution-model.md"   docs/adr/
cp "$SCRIPT_DIR/docs/adr/ADR-002-source-acquisition-controls.md" docs/adr/
cp "$SCRIPT_DIR/docs/adr/ADR-003-credential-boundary.md"         docs/adr/
cp "$SCRIPT_DIR/src/research/provider-execution-threat-model.js" src/research/
cp "$SCRIPT_DIR/src/research/provider-execution-preflight.js"    src/research/
cp "$SCRIPT_DIR/tests/provider-execution-threat-model-check.mjs" tests/
cp "$SCRIPT_DIR/tests/provider-execution-preflight-check.mjs"    tests/
cp "$SCRIPT_DIR/tests/ci-gate-registry.json"                     tests/

echo "==> Staging files..."
git add \
  docs/adr/ADR-001-provider-execution-model.md \
  docs/adr/ADR-002-source-acquisition-controls.md \
  docs/adr/ADR-003-credential-boundary.md \
  src/research/provider-execution-threat-model.js \
  src/research/provider-execution-preflight.js \
  tests/provider-execution-threat-model-check.mjs \
  tests/provider-execution-preflight-check.mjs \
  tests/ci-gate-registry.json

echo "==> Committing..."
git commit -m "feat: v1.4.0-alpha.6 — Provider Execution Harness Mock-to-Live Equivalence

ADR scaffold, threat model, and preflight gate for controlled provider
execution. Planning-gate only: no live execution, no boundary flag
changes, no runtime capability expansion.

Deliverables:
- docs/adr/ADR-001-provider-execution-model.md
- docs/adr/ADR-002-source-acquisition-controls.md
- docs/adr/ADR-003-credential-boundary.md
- src/research/provider-execution-threat-model.js (7 threats, all live-prerequisite)
- src/research/provider-execution-preflight.js (8-check gate, planning-mode safe)
- tests/provider-execution-threat-model-check.mjs (registered in release gate)
- tests/provider-execution-preflight-check.mjs (registered in release gate)
- tests/ci-gate-registry.json: release gate 74->76 checks

All boundary flags remain false. release gate: 76 checks PASS.
current-no-browser: PASS. No regressions.

https://claude.ai/code/session_01AKmvhshi5awxkrmSZbuwok"

echo "==> Pushing to origin/$BRANCH..."
git push -u origin "$BRANCH"

echo "==> Cleaning up patch files..."
rm -rf "$SCRIPT_DIR"
echo "==> Done. apply-patch.sh self-deleted."
