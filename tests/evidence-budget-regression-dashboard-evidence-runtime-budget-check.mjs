import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.4.0-alpha.17';
const RELEASE = 'v1.4.0-alpha.17 — Alpha.16 Lock Completion + Evidence Budget Regression Dashboard';
const PUBLIC_LABEL = 'v1.4.0-alpha.17 Evidence Budget Regression Dashboard';
const LOCKED_ALPHA14 = 'v1.4.0-alpha.14 — Adapter Replay Fixture Corpus + Coverage Matrix';
const TARGET_MODULE = 'src/research/evidence-budget-regression-dashboard-evidence-runtime-budget.js';
const TARGET_CHECK = 'tests/evidence-budget-regression-dashboard-evidence-runtime-budget-check.mjs';
const ALPHA14_MODULE = 'src/research/adapter-replay-fixture-corpus-coverage-matrix.js';

function read(path){ return fs.readFileSync(path, 'utf8'); }
function json(path){ return JSON.parse(read(path)); }
function loadModules(paths){
  const context = { window:{ Jarbou3iResearchModules:{} }, globalThis:{} };
  context.globalThis = context.window;
  vm.createContext(context);
  for (const path of paths) vm.runInContext(read(path), context, { filename:path });
  return context.window.Jarbou3iResearchModules;
}

const pkg = json('package.json');
const manifest = json('MANIFEST.json');
const ciRegistry = json('tests/ci-gate-registry.json');
const versionRegistry = json('tests/version-suite-registry.json');
const evidenceConfig = json('tests/evidence/evidence-matrix.config.json');
const current = read('docs/current-release.md');
const roadmap = read('docs/roadmap.md');
const releaseHistory = read('docs/release-history.md');
const qa = read('docs/qa-matrix.md');
const releaseEvidence = read('docs/release-and-evidence.md');
const changelog = read('CHANGELOG.md');
const readme = read('README.md');
const publicDemo = read('PUBLIC_DEMO.md');
const index = read('index.html');
const helpers = read('src/research/render-helpers.js');
const workflow = read('.github/workflows/ci.yml');
const targetSource = read(TARGET_MODULE);
const alpha14Source = read(ALPHA14_MODULE);

assert.equal(pkg.version, VERSION);
assert.equal(manifest.version, VERSION);
assert.equal(manifest.release_title, RELEASE);
assert.equal(ciRegistry.ci_gate_registry_version, VERSION);
assert.equal(ciRegistry.release_title, RELEASE);
assert.equal(versionRegistry.version_suite_registry_version, VERSION);
assert.equal(versionRegistry.release_title, RELEASE);
assert.equal(evidenceConfig.internal_build_version, VERSION);
assert.equal(evidenceConfig.public_version_label, PUBLIC_LABEL);

for (const text of [current, roadmap, releaseHistory, qa, releaseEvidence, changelog, readme, publicDemo]) {
  assert.ok(text.includes(LOCKED_ALPHA14), 'alpha.14 must be recorded as locked baseline');
  assert.ok(text.includes(RELEASE) || text.includes(PUBLIC_LABEL), 'alpha.15 must be the current candidate/release label');
}
assert.ok(current.includes('Alpha.14 lock evidence: Run ID `26640076472`'), 'current release must record alpha.14 lock evidence');
assert.equal(/Status: built locally\. Lock is pending/.test(current), false, 'stale alpha.14 lock-pending wording must be removed');
assert.equal(/No alpha\.14 should start/.test(roadmap), false, 'roadmap must not list alpha.14 as blocked/current-next confusion');
assert.equal((roadmap.match(/Current candidate/g) || []).length, 1, 'roadmap must have one current-candidate section');
assert.ok(!roadmap.includes('v1.4.0-alpha.14 — Evidence Budget Regression Dashboard'), 'roadmap must not reuse alpha.14 for the next UX milestone');

for (const token of [
  'evidence_surface_budget_version: 1.4.0-alpha.17',
  'locked_baseline: 1.4.0-alpha.14',
  'browser_check_budget_max: 20',
  'hosted_language_count_expected: 3',
  'hosted_surface_count_expected_max: 13',
  'visible_snapshot_rows_expected_max: 39',
  'runtime_budget_policy: guardrail_only',
  'runtime_budget_enforced_without_network: true',
  'provider_execution_performed: false',
  'live_fetching_performed: false',
  'credential_persistence_allowed: false'
]) assert.ok(current.includes(token) || readme.includes(token) || releaseEvidence.includes(token) || qa.includes(token), `budget token missing: ${token}`);

assert.ok(index.includes('content="1.4.0-alpha.17"'));
assert.ok(index.includes(PUBLIC_LABEL));
assert.ok(index.includes('Evidence Budget Regression Dashboard'));
assert.ok(index.includes('src/research/evidence-budget-regression-dashboard-evidence-runtime-budget.js'));
assert.ok(index.includes('v1.4.0-alpha.14 Adapter Replay Fixture Corpus + Coverage Matrix'), 'alpha.14 browser QA baseline token must remain visible for regression');
assert.ok(helpers.includes(PUBLIC_LABEL));
assert.ok(helpers.includes('ضغط تجربة محوّل المزوّد اليدوي'));
assert.ok(helpers.includes('Compression UX de l’adaptateur fournisseur manuel'));
assert.ok(helpers.includes('bounded runtime surface'));

const modules = loadModules([ALPHA14_MODULE, TARGET_MODULE]);
assert.ok(modules.adapterReplayFixtureCorpusCoverageMatrix, 'alpha.14 replay corpus module must remain present');
assert.ok(modules.manualProviderAdapterUxCompressionEvidenceRuntimeBudget, 'alpha.15 runtime budget module must be registered');
const alpha14Report = modules.adapterReplayFixtureCorpusCoverageMatrix.buildAdapterReplayFixtureCorpusCoverageMatrix({ generated_at:'2026-05-29T00:00:00.000Z' });
assert.equal(alpha14Report.safe_metadata_only, true);
assert.equal(alpha14Report.network_invocation_allowed, false);
assert.equal(alpha14Report.live_provider_execution_performed, false);
assert.equal(alpha14Report.live_source_fetching_performed, false);
assert.equal(alpha14Report.coverage_matrix.coverage_percentage, 100);
assert.equal(alpha14Report.corpus.length >= 21, true);

const runtimeBudget = modules.manualProviderAdapterUxCompressionEvidenceRuntimeBudget;
assert.equal(runtimeBudget.VERSION, VERSION);
assert.equal(runtimeBudget.MILESTONE, RELEASE);
assert.equal(runtimeBudget.MODEL, 'manual_provider_adapter_ux_compression_evidence_runtime_budget.v1');
assert.equal(runtimeBudget.LOCKED_BASELINE, '1.4.0-alpha.14');
assert.equal(runtimeBudget.EVIDENCE_RUNTIME_BUDGET.evidence_surface_budget_version, VERSION);
assert.equal(runtimeBudget.EVIDENCE_RUNTIME_BUDGET.browser_check_budget_max, 20);
assert.equal(runtimeBudget.EVIDENCE_RUNTIME_BUDGET.hosted_language_count_expected, 3);
assert.equal(runtimeBudget.EVIDENCE_RUNTIME_BUDGET.hosted_surface_count_expected_max, 13);
assert.equal(runtimeBudget.EVIDENCE_RUNTIME_BUDGET.visible_snapshot_rows_expected_max, 39);
assert.equal(runtimeBudget.EVIDENCE_RUNTIME_BUDGET.runtime_budget_policy, 'guardrail_only');
assert.equal(runtimeBudget.EVIDENCE_RUNTIME_BUDGET.runtime_budget_enforced_without_network, true);
assert.equal(runtimeBudget.EVIDENCE_RUNTIME_BUDGET.provider_execution_performed, false);
assert.equal(runtimeBudget.EVIDENCE_RUNTIME_BUDGET.live_fetching_performed, false);
assert.equal(runtimeBudget.EVIDENCE_RUNTIME_BUDGET.credential_persistence_allowed, false);

const reportA = runtimeBudget.buildEvidenceRuntimeBudgetReport({ generated_at:'2026-05-29T00:00:00.000Z' });
const reportB = runtimeBudget.buildEvidenceRuntimeBudgetReport({ generated_at:'2026-05-30T00:00:00.000Z' });
assert.equal(reportA.checksum, reportB.checksum, 'budget report checksum must exclude generated_at for deterministic release checks');
assert.equal(reportA.safe_metadata_only, true);
assert.equal(reportA.can_execute_now, false);
assert.equal(reportA.network_invocation_allowed, false);
assert.equal(reportA.hidden_network_calls_allowed, false);
assert.equal(reportA.provider_execution_performed, false);
assert.equal(reportA.live_fetching_performed, false);
assert.equal(reportA.credential_persistence_allowed, false);
assert.equal(reportA.boundary_flags.backend_behavior_changed, false);
assert.equal(reportA.boundary_flags.storage_behavior_changed, false);
assert.equal(reportA.boundary_flags.source_behavior_changed, false);
assert.equal(reportA.boundary_flags.real_api_credentials_stored, false);

for (const gate of ['no-browser','current-no-browser','provider','release']) {
  assert.ok(ciRegistry.gates[gate].node_checks.includes(TARGET_CHECK), `${gate} must run alpha.15 runtime budget check`);
}
assert.ok(ciRegistry.syntax_matrix.files.includes(TARGET_CHECK));
assert.ok(ciRegistry.syntax_matrix.files.includes(TARGET_MODULE));
assert.ok(workflow.includes('lock-evidence-bundle_1.4.0-alpha.17_${{ github.run_id }}'));
assert.ok(workflow.includes("summary.internal_build_version !== '1.4.0-alpha.17'"));

const scanTargets = { targetSource, index, helpers };
const forbiddenNetwork = ['fetch(', 'XMLHttpRequest', 'WebSocket', 'navigator.sendBeacon'];
const forbiddenStorage = ['localStorage.setItem', 'sessionStorage.setItem'];
for (const [name, text] of Object.entries(scanTargets)) {
  for (const token of [...forbiddenNetwork, ...forbiddenStorage]) {
    assert.equal(text.includes(token), false, `${name} must not contain forbidden token ${token}`);
  }
}
const forbiddenCredentialExpansion = ['access_token', 'refresh_token', 'api_key', 'bearer_token', 'sk-', 'ghp_', 'AKIA', 'BEGIN PRIVATE KEY'];
for (const token of forbiddenCredentialExpansion) {
  assert.equal(targetSource.includes(token), false, `alpha.15 runtime budget module must not contain forbidden credential token ${token}`);
}

console.log('Manual provider adapter UX compression evidence/runtime budget checks passed.');
process.exit(0);
