#!/usr/bin/env bash
set -euo pipefail

PLAYWRIGHT_CLI="node_modules/playwright/cli.js"

if [ ! -f "$PLAYWRIGHT_CLI" ]; then
  echo "Playwright Node CLI missing at $PLAYWRIGHT_CLI. Run npm install before browser CI." >&2
  exit 127
fi

if [ "${PLAYWRIGHT_SKIP_INSTALL:-0}" != "1" ]; then
  node "$PLAYWRIGHT_CLI" install --with-deps
else
  echo "Skipping Playwright browser install because PLAYWRIGHT_SKIP_INSTALL=1."
fi

export HOSTED_DEMO_EVIDENCE_DIR="${HOSTED_DEMO_EVIDENCE_DIR:-ci-artifacts/hosted-demo-evidence}"
mkdir -p "$HOSTED_DEMO_EVIDENCE_DIR"

node tests/ci-gate-runner.mjs browser
