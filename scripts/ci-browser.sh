#!/usr/bin/env bash
set -euo pipefail

if [ ! -x ./node_modules/.bin/playwright ]; then
  echo "Playwright Node CLI missing. Run npm install before browser CI." >&2
  exit 127
fi

if [ "${PLAYWRIGHT_SKIP_INSTALL:-0}" != "1" ]; then
  ./node_modules/.bin/playwright install --with-deps
else
  echo "Skipping Playwright browser install because PLAYWRIGHT_SKIP_INSTALL=1."
fi

export HOSTED_DEMO_EVIDENCE_DIR="${HOSTED_DEMO_EVIDENCE_DIR:-ci-artifacts/hosted-demo-evidence}"
mkdir -p "$HOSTED_DEMO_EVIDENCE_DIR"

npm run test:browser:provider
npm run test:browser:layout
npm run test:browser:visual
npm run test:browser:evidence
npm run test:browser:source-packet-builder
npm run test:browser:source-packet-template
npm run test:e2e
npm run test:rtl
./node_modules/.bin/playwright test tests/a11y.spec.js
