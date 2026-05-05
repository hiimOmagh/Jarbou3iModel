#!/usr/bin/env bash
set -euo pipefail

NODE_TIMEOUT_SECONDS="${CI_NODE_TEST_TIMEOUT_SECONDS:-60}"
run_node() {
  echo "RUN node $*"
  if command -v timeout >/dev/null 2>&1; then
    timeout "${NODE_TIMEOUT_SECONDS}s" node "$@"
  else
    node "$@"
  fi
}

echo "CI no-browser gate: static/schema/fixtures/research"
run_node tests/qa-check.mjs
run_node tests/static-check.mjs
run_node tests/schema-check.mjs
run_node tests/fixtures-check.mjs
run_node tests/research-workflow-check.mjs
run_node tests/a11y-static-check.mjs

echo "CI no-browser gate: privacy/export/release"
run_node tests/privacy-export-guard-check.mjs
run_node tests/privacy-export-check.mjs
run_node tests/privacy-audit-check.mjs
run_node tests/privacy-release-gate-check.mjs
run_node tests/export-pack-v2-check.mjs

echo "CI no-browser gate: migrations/modules/workspace/templates/quality/stable-patch"
run_node tests/migration-check.mjs
run_node tests/research-module-check.mjs
run_node tests/ux-reliability-check.mjs
run_node tests/project-workspace-check.mjs
run_node tests/analysis-template-check.mjs
run_node tests/quality-gate-v3-check.mjs
run_node tests/release-candidate-freeze-check.mjs
run_node tests/stable-release-check.mjs
run_node tests/patch-stabilization-check.mjs
run_node tests/ux-stabilization-patch-check.mjs
run_node tests/screen-discipline-patch-check.mjs
run_node tests/browser-qa-hardening-check.mjs
run_node tests/onboarding-first-run-check.mjs
run_node tests/release-packaging-cleanup-check.mjs
run_node tests/ci-workflow-install-check.mjs
run_node tests/node24-ci-compat-check.mjs
run_node tests/release-evidence-repo-hygiene-check.mjs
run_node tests/ci-result-review-browser-evidence-audit-check.mjs
run_node tests/repo-hygiene-execution-stale-docs-check.mjs
run_node tests/public-demo-release-lock-check.mjs
run_node tests/release-apply-integrity-check.mjs
run_node tests/release-provenance-ledger-check.mjs
run_node tests/lockfile-public-registry-check.mjs
run_node tests/browser-visual-project-scope-check.mjs
run_node tests/repo-file-hygiene-check.mjs
run_node tests/repository-hygiene-cleanup-check.mjs
run_node tests/public-demo-readiness-check.mjs
run_node tests/hosted-demo-deployment-check.mjs
run_node tests/hosted-demo-evidence-review-check.mjs
run_node tests/hosted-demo-evidence-manifest-check.mjs
run_node tests/final-public-demo-freeze-audit-check.mjs
run_node tests/mobile-header-logo-geometry-check.mjs
run_node tests/post-freeze-planning-gate-check.mjs
run_node tests/expansion-lane-acceptance-matrix-check.mjs
run_node tests/repository-consolidation-audit-check.mjs
run_node tests/fixture-registry-consolidation-check.mjs
run_node tests/version-suite-registry-check.mjs

echo "CI no-browser gate: provider/OAuth/backend/source"
run_node tests/provider-identity-check.mjs
run_node tests/portable-account-check.mjs
run_node tests/portable-oauth-spike-check.mjs
run_node tests/provider-response-check.mjs
run_node tests/provider-fixtures-check.mjs
run_node tests/backend-proxy-check.mjs
run_node tests/backend-hardening-check.mjs
run_node tests/backend-worker-smoke.mjs
run_node tests/module-type-warning-fix-check.mjs
run_node tests/source-planning-check.mjs
run_node tests/source-import-check.mjs
run_node tests/source-packet-import-check.mjs
run_node tests/evidence-scoring-check.mjs
run_node tests/evidence-scoring-calibration-check.mjs
run_node tests/source-packet-builder-check.mjs
run_node tests/source-packet-builder-browser-qa-check.mjs
run_node tests/source-packet-roundtrip-check.mjs
run_node tests/source-packet-template-presets-check.mjs
run_node tests/source-packet-template-browser-qa-check.mjs
run_node tests/evidence-review-queue-check.mjs
run_node tests/github-source-connector-check.mjs
run_node tests/web-search-provider-check.mjs
run_node tests/source-capability-registry-check.mjs

echo "CI no-browser gate: syntax"
run_node --check src/research-engine.js
run_node --check src/research/public-demo-readiness.js
run_node --check src/research/post-freeze-planning-gate.js
run_node --check src/research/repository-consolidation-audit.js
run_node --check src/research/release-apply-integrity.js
run_node --check src/research/release-provenance-ledger.js
run_node --check src/research/hosted-demo-verification.js
run_node --check src/research/render-helpers.js
run_node --check src/research/release-candidate.js
run_node --check src/research/portable-oauth-spike.js
run_node --check src/research/search-provider-abstraction.js
run_node --check src/research/source-capability-registry.js
run_node --check src/research/source-packet-importer.js
run_node --check src/research/source-packet-builder.js
run_node --check src/research/source-packet-roundtrip.js
run_node --check src/research/source-packet-templates.js
run_node --check src/research/evidence-scorer.js
run_node --check src/research/source-connectors.js
run_node --check backend/cloudflare-worker.js
run_node --check tests/provider-mode-browser.spec.mjs
run_node --check tests/ux-stabilization-patch-check.mjs
run_node --check tests/screen-discipline-patch-check.mjs
run_node --check tests/browser-qa-hardening-check.mjs
run_node --check tests/browser-layout-persistence.spec.mjs
run_node --check tests/browser-visual-regression.spec.mjs
run_node --check tests/hosted-demo-browser-evidence.spec.mjs
run_node --check tests/hosted-demo-evidence-review-check.mjs
run_node --check tests/hosted-demo-evidence-manifest-check.mjs
run_node --check tests/final-public-demo-freeze-audit-check.mjs
run_node --check tests/mobile-header-logo-geometry-check.mjs
run_node --check tests/post-freeze-planning-gate-check.mjs
run_node --check tests/expansion-lane-acceptance-matrix-check.mjs
run_node --check tests/repository-consolidation-audit-check.mjs
run_node --check tests/fixture-registry-loader.mjs
run_node --check tests/fixture-registry-consolidation-check.mjs
run_node --check tests/version-suite-registry-check.mjs
run_node --check tests/current-no-browser-suite.mjs
run_node --check tests/module-type-warning-fix-check.mjs
run_node --check tests/ci-workflow-install-check.mjs
run_node --check tests/lockfile-public-registry-check.mjs
run_node --check tests/repository-hygiene-cleanup-check.mjs
run_node --check tests/source-packet-import-check.mjs
run_node --check tests/evidence-scoring-check.mjs
run_node --check tests/evidence-scoring-calibration-check.mjs
run_node --check tests/source-packet-builder-check.mjs
run_node --check tests/source-packet-builder-browser-qa-check.mjs
run_node --check tests/source-packet-roundtrip-check.mjs
run_node --check tests/source-packet-template-presets-check.mjs
run_node --check tests/source-packet-builder-browser.spec.mjs
run_node --check tests/node24-ci-compat-check.mjs
run_node --check tests/release-evidence-repo-hygiene-check.mjs
run_node --check tests/ci-result-review-browser-evidence-audit-check.mjs
run_node --check tests/repo-hygiene-execution-stale-docs-check.mjs
run_node --check tests/release-apply-integrity-check.mjs
run_node --check tests/release-provenance-ledger-check.mjs
run_node --check tests/source-packet-template-browser.spec.mjs
run_node --check tests/source-packet-template-browser-qa-check.mjs
run_node --check tests/browser-visual-project-scope-check.mjs

echo "CI no-browser gate passed."


