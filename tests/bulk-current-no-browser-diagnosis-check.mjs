import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { CURRENT_RELEASE } from './current-release-identity.mjs';

const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
const currentGate = registry.gates?.['current-no-browser'];
assert.ok(currentGate, 'current-no-browser gate must exist in CI gate registry');
assert.ok(Array.isArray(currentGate.node_checks), 'current-no-browser gate must expose node checks');
assert.ok(currentGate.node_checks.length > 0, 'current-no-browser gate must not be empty');

const selfFile = 'tests/bulk-current-no-browser-diagnosis-check.mjs';
const checksToRun = currentGate.node_checks.filter((file) => file !== selfFile);

const FAILURE_FAMILIES = Object.freeze({
  current_release_identity_drift: {
    label: 'Current release identity drift',
    tokens: ['current-release', 'release identity', 'version mismatch', 'public label', 'runtime scope', 'internal_build_version'],
    likely_root_cause: 'Current-version metadata, public labels, release-copy text, or runtime scope are not aligned with tests/current-release-contract.json.',
    recommended_next_command: 'node tests/current-release-identity-sweep-check.mjs'
  },
  runtime_optimization_lineage_mismatch: {
    label: 'Runtime optimization lineage mismatch',
    tokens: ['runtime optimization', 'optimization_scope', 'current_candidate'],
    likely_root_cause: 'The CI gate registry runtime-optimization block no longer matches the current release identity or allowed scope.',
    recommended_next_command: 'node tests/test-matrix-runtime-optimization-check.mjs'
  },
  localized_public_labels_visible_copy_mismatch: {
    label: 'Localized public labels / visible copy mismatch',
    tokens: ['localized', 'locale', 'visible-text', 'publicVersionLabels', 'html_lang', 'arabic current-release description'],
    likely_root_cause: 'AR/FR/EN visible release copy or hosted-demo labels still expose stale milestone language.',
    recommended_next_command: 'node tests/localization-regression-matrix-check.mjs'
  },
  release_corpus_continuity_issue: {
    label: 'Release corpus continuity issue',
    tokens: ['release-history', 'corpus', 'timeline', 'ledger'],
    likely_root_cause: 'Release-history, roadmap, or evidence-ledger continuity text lost a required historical anchor.',
    recommended_next_command: 'node tests/release-truth-consistency-check.mjs'
  },
  module_extraction_stale_test_surface_assumption: {
    label: 'Module extraction / stale test-surface assumption',
    tokens: ['module boundary', 'research-engine.js', 'script order', 'extracted module'],
    likely_root_cause: 'A test still assumes moved renderer/orchestration tokens live in the old monolith surface.',
    recommended_next_command: 'node tests/module-boundary-regression-guard-check.mjs'
  },
  repo_hygiene_package_artifact_pollution: {
    label: 'Repo hygiene / package artifact pollution',
    tokens: ['hygiene', 'patch package', 'PACKAGE-MANIFEST', '_patch-', '.zip', 'playwright-report', 'test-results', 'root artifact'],
    likely_root_cause: 'Generated patch/browser/release artifacts were left in the repo before running a no-browser gate.',
    recommended_next_command: 'node tests/repo-file-hygiene-check.mjs'
  },
  real_runtime_product_regression: {
    label: 'Real runtime/product regression',
    tokens: ['runtime', 'provider', 'backend', 'source', 'storage', 'OAuth'],
    likely_root_cause: 'A behavior boundary check observed a runtime/provider/backend/source/storage/OAuth surface change.',
    recommended_next_command: 'npm run test:current:no-browser'
  }
});

const UNCLASSIFIED_GUIDANCE = Object.freeze({
  label: 'Unclassified failure',
  likely_root_cause: 'The failure did not match the known release-governance failure families; inspect the failed check output directly.',
  recommended_next_command: 'rerun the failed check directly with node <failed-check>.mjs'
});

function classifyFailure(output) {
  const normalized = output.toLowerCase();
  for (const [family, config] of Object.entries(FAILURE_FAMILIES)) {
    if (config.tokens.some((token) => normalized.includes(token.toLowerCase()))) return family;
  }
  return 'unclassified_failure';
}

function guidanceForFamily(family) {
  return FAILURE_FAMILIES[family] || UNCLASSIFIED_GUIDANCE;
}

function extractAffectedFiles(failure) {
  const candidates = new Set([failure.file]);
  const output = failure.output || '';
  const pathPattern = /(?:(?:[A-Za-z0-9_.-]+[\\/])+)?[A-Za-z0-9_.-]+\.(?:json|mjs|js|md|yaml|yml|html|css)/g;
  for (const match of output.matchAll(pathPattern)) candidates.add(match[0].replace(/\\/g, '/'));
  return [...candidates].sort();
}

function runCheck(file) {
  const started = Date.now();
  const result = spawnSync(process.execPath, [file], {
    encoding: 'utf8',
    timeout: Number.parseInt(process.env.BULK_CURRENT_DIAGNOSIS_TIMEOUT_MS || '60000', 10)
  });
  const output = `${result.stdout || ''}\n${result.stderr || ''}`.trim();
  return {
    file,
    command: `${process.execPath} ${file}`,
    status: result.status,
    signal: result.signal,
    duration_ms: Date.now() - started,
    family: result.status === 0 ? null : classifyFailure(output),
    output
  };
}

function buildReport(results) {
  const failures = results.filter((result) => result.status !== 0);
  const familyBuckets = new Map();

  for (const failure of failures) {
    const family = failure.family || 'unclassified_failure';
    const guidance = guidanceForFamily(family);
    const bucket = familyBuckets.get(family) || {
      family,
      label: guidance.label,
      failure_count: 0,
      affected_checks: [],
      affected_files: new Set(),
      likely_root_cause: guidance.likely_root_cause,
      recommended_next_command: guidance.recommended_next_command
    };
    bucket.failure_count += 1;
    bucket.affected_checks.push(failure.file);
    for (const file of extractAffectedFiles(failure)) bucket.affected_files.add(file);
    familyBuckets.set(family, bucket);
  }

  const failureFamilySummary = [...familyBuckets.values()].map((bucket) => ({
    family: bucket.family,
    label: bucket.label,
    failure_count: bucket.failure_count,
    affected_checks: [...new Set(bucket.affected_checks)].sort(),
    affected_files: [...bucket.affected_files].sort(),
    likely_root_cause: bucket.likely_root_cause,
    recommended_next_command: bucket.recommended_next_command
  })).sort((a, b) => a.family.localeCompare(b.family));

  const failedCommands = failures.map((failure) => ({
    command: failure.command,
    file: failure.file,
    status: failure.status,
    signal: failure.signal,
    duration_ms: failure.duration_ms,
    family: failure.family || 'unclassified_failure'
  }));

  const operatorRepairChecklist = failureFamilySummary.length === 0
    ? ['No failures found. Continue to npm run test:current:no-browser or npm run test:ci:no-browser.']
    : failureFamilySummary.map((item, index) => `${index + 1}. ${item.label}: run ${item.recommended_next_command}; inspect ${item.affected_files.slice(0, 4).join(', ') || item.affected_checks.join(', ')}.`);

  return {
    release: CURRENT_RELEASE,
    total_checks_attempted: results.length,
    passed_checks: results.length - failures.length,
    failed_checks: failures.length,
    failure_family_summary: failureFamilySummary,
    failed_commands: failedCommands,
    operator_repair_checklist: operatorRepairChecklist,
    recommended_next_command: failures.length === 0 ? 'npm run test:current:no-browser' : failureFamilySummary[0]?.recommended_next_command,
    failures: failures.map((failure) => ({
      file: failure.file,
      status: failure.status,
      signal: failure.signal,
      duration_ms: failure.duration_ms,
      family: failure.family || 'unclassified_failure',
      affected_files: extractAffectedFiles(failure),
      output_tail: failure.output.split(/\r?\n/).slice(-20)
    }))
  };
}

function renderOperatorReport(report) {
  const lines = [];
  lines.push('Bulk diagnosis operator report');
  lines.push(`Release: ${report.release}`);
  lines.push(`Checks attempted: ${report.total_checks_attempted}`);
  lines.push(`Pass/fail count: ${report.passed_checks}/${report.failed_checks}`);
  lines.push('Failure family summary:');
  if (report.failure_family_summary.length === 0) {
    lines.push('- none');
  } else {
    for (const family of report.failure_family_summary) {
      lines.push(`- ${family.label} (${family.failure_count})`);
      lines.push(`  Affected checks: ${family.affected_checks.join(', ')}`);
      lines.push(`  Affected files: ${family.affected_files.join(', ') || 'n/a'}`);
      lines.push(`  Likely root cause: ${family.likely_root_cause}`);
      lines.push(`  Recommended next command: ${family.recommended_next_command}`);
    }
  }
  lines.push('Failed commands:');
  if (report.failed_commands.length === 0) {
    lines.push('- none');
  } else {
    for (const command of report.failed_commands) lines.push(`- ${command.command} => status ${command.status} (${command.family})`);
  }
  lines.push('Operator repair checklist:');
  for (const item of report.operator_repair_checklist) lines.push(`- ${item}`);
  lines.push('BULK_DIAGNOSIS_REPORT_JSON_START');
  lines.push(JSON.stringify(report, null, 2));
  lines.push('BULK_DIAGNOSIS_REPORT_JSON_END');
  return lines.join('\n');
}

function buildFixtureResults() {
  return [
    {
      file: 'tests/ci-gate-registry-check.mjs',
      command: `${process.execPath} tests/ci-gate-registry-check.mjs`,
      status: 0,
      signal: null,
      duration_ms: 4,
      family: null,
      output: 'CI gate registry checks passed.'
    },
    {
      file: 'tests/current-release-identity-sweep-check.mjs',
      command: `${process.execPath} tests/current-release-identity-sweep-check.mjs`,
      status: 1,
      signal: null,
      duration_ms: 7,
      family: 'current_release_identity_drift',
      output: 'AssertionError: public label mismatch in MANIFEST.json and src/research/release-copy-contract.js current-release visible copy'
    },
    {
      file: 'tests/repo-file-hygiene-check.mjs',
      command: `${process.execPath} tests/repo-file-hygiene-check.mjs`,
      status: 1,
      signal: null,
      duration_ms: 6,
      family: 'repo_hygiene_package_artifact_pollution',
      output: 'Repository hygiene failed: root artifact PACKAGE-MANIFEST.json and _patch-alpha47 folder found; remove playwright-report/test-results before no-browser.'
    }
  ];
}

const expectedStaticTokens = [
  'current_release_identity_drift',
  'runtime_optimization_lineage_mismatch',
  'localized_public_labels_visible_copy_mismatch',
  'release_corpus_continuity_issue',
  'module_extraction_stale_test_surface_assumption',
  'repo_hygiene_package_artifact_pollution',
  'real_runtime_product_regression',
  'unclassified_failure',
  'Failure family summary',
  'Affected checks',
  'Affected files',
  'Likely root cause',
  'Recommended next command',
  'Operator repair checklist',
  'BULK_DIAGNOSIS_REPORT_JSON_START'
];
const source = fs.readFileSync(selfFile, 'utf8');
for (const token of expectedStaticTokens) assert.ok(source.includes(token), `bulk diagnosis source must encode report token: ${token}`);
assert.ok(source.includes('RUN_BULK_CURRENT_DIAGNOSIS'), 'bulk diagnosis must be opt-in for full execution');
assert.ok(source.includes('spawnSync(process.execPath, [file]'), 'bulk diagnosis must execute checks independently, not via stop-on-first-failure gate runner');

if (process.argv.includes('--list')) {
  console.log(JSON.stringify({ release: CURRENT_RELEASE, check_count: checksToRun.length, checks: checksToRun }, null, 2));
  process.exit(0);
}

if (process.argv.includes('--fixture-failure-report')) {
  const report = buildReport(buildFixtureResults());
  console.log(renderOperatorReport(report));
  process.exit(process.argv.includes('--fixture-exit-zero') ? 0 : 1);
}

if (process.env.RUN_BULK_CURRENT_DIAGNOSIS !== '1') {
  const staticReport = buildReport([]);
  assert.equal(staticReport.failure_family_summary.length, 0, 'static report must expose an empty failure-family summary on no results');
  console.log(`Bulk current no-browser diagnosis UX check passed in static mode: ${checksToRun.length} checks available for ${CURRENT_RELEASE}.`);
  process.exit(0);
}

const results = checksToRun.map(runCheck);
const report = buildReport(results);
console.log(renderOperatorReport(report));
assert.equal(report.failed_checks, 0, 'bulk current no-browser diagnosis found failing checks');
