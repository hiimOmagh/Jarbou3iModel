import { execFileSync } from 'node:child_process';

const tests = [
  'tests/qa-check.mjs',
  'tests/static-check.mjs',
  'tests/schema-check.mjs',
  'tests/fixtures-check.mjs',
  'tests/research-workflow-check.mjs',
  'tests/a11y-static-check.mjs',
  'tests/privacy-export-guard-check.mjs',
  'tests/privacy-export-check.mjs',
  'tests/privacy-audit-check.mjs',
  'tests/privacy-release-gate-check.mjs',
  'tests/migration-check.mjs',
  'tests/research-module-check.mjs',
  'tests/ux-reliability-check.mjs',
  'tests/project-workspace-check.mjs',
  'tests/analysis-template-check.mjs',
  'tests/quality-gate-v3-check.mjs',
  'tests/evidence-scoring-check.mjs',
  'tests/evidence-workspace-check.mjs',
  'tests/evidence-workspace-ux-throughput-check.mjs',
  'tests/source-to-brief-workbench-check.mjs',
  'tests/source-to-brief-ux-compression-check.mjs',
  'tests/source-to-brief-export-polish-check.mjs',
  'tests/source-to-brief-traceability-console-check.mjs',
  'tests/source-to-brief-command-palette-check.mjs',
  'tests/export-pack-v2-check.mjs',
  'tests/browser-qa-hardening-check.mjs',
  'tests/onboarding-first-run-check.mjs',
  'tests/backend-proxy-check.mjs',
  'tests/backend-hardening-check.mjs',
  'tests/public-demo-readiness-check.mjs',
  'tests/evidence-pack-v3-brief-traceability-check.mjs',
  'tests/publication-review-gate-check.mjs',
  'tests/golden-workflow-corpus-check.mjs',
  'tests/release-candidate-final-hygiene-check.mjs',
  'tests/provider-router-cost-ledger-check.mjs',
  'tests/strategic-evidence-graph-check.mjs',
  'tests/post-stable-capability-roadmap-check.mjs'
];

for (const file of tests) {
  try {
    execFileSync(process.execPath, [file], { stdio: 'inherit', timeout: 120000 });
  } catch (error) {
    console.error(`No-browser QA suite failed while running ${file}.`);
    process.exit(error.status || 1);
  }
}

console.log('No-browser QA suite passed. Run targeted provider/source/backend/browser scripts for full subsystem gates.');
process.exit(0);
