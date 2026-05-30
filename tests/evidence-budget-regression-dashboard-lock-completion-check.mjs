import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.4.0-alpha.20';
const RELEASE = 'v1.4.0-alpha.20 — Alpha.19 Lock Completion + Evidence Decision Ledger Handoff Audit';
const PUBLIC_LABEL = 'v1.4.0-alpha.20 Evidence Decision Ledger Handoff Audit';
const LOCKED_ALPHA16 = 'v1.4.0-alpha.16 — Alpha.15 Lock Completion + Evidence Surface Budget Enforcement';
const LOCKED_ALPHA15 = 'v1.4.0-alpha.15 — Roadmap Lock Completion + Manual Provider Adapter UX Compression';
const LOCKED_ALPHA14 = 'v1.4.0-alpha.14 — Adapter Replay Fixture Corpus + Coverage Matrix';
const RUN_ID_ALPHA16 = '26646993357';
const COMMIT_ALPHA16 = 'd40d2054060c14326c5871ec86bd7ef5d9aab2ed';
const RUN_ID_ALPHA15 = '26643746981';
const COMMIT_ALPHA15 = '4ba0f9db8020a9d0158ec95854ef10fbfe47694c';
const TARGET_MODULE = 'src/research/evidence-budget-regression-dashboard-evidence-runtime-budget.js';
const LEGACY_BUDGET_MODULE = 'src/research/manual-provider-adapter-ux-compression-evidence-runtime-budget.js';
const TARGET_CHECK = 'tests/evidence-budget-regression-dashboard-lock-completion-check.mjs';
const LEGACY_BUDGET_CHECK = 'tests/manual-provider-adapter-ux-compression-evidence-runtime-budget-check.mjs';

function read(path){ return fs.readFileSync(path, 'utf8'); }
function json(path){ return JSON.parse(read(path)); }
function section(markdown, heading){
  const index = markdown.indexOf(heading);
  assert.notEqual(index, -1, `missing section ${heading}`);
  const next = markdown.indexOf('\n## ', index + heading.length);
  return next === -1 ? markdown.slice(index) : markdown.slice(index, next);
}
function load(path){
  const context = { window:{ Jarbou3iResearchModules:{} }, globalThis:{} };
  context.globalThis = context.window;
  vm.createContext(context);
  vm.runInContext(read(path), context, { filename:path });
  return context.window.Jarbou3iResearchModules;
}

const pkg = json('package.json');
const manifest = json('MANIFEST.json');
const ciRegistry = json('tests/ci-gate-registry.json');
const versionRegistry = json('tests/version-suite-registry.json');
const evidenceConfig = json('tests/evidence/evidence-matrix.config.json');
const current = read('docs/current-release.md');
const roadmap = read('docs/roadmap.md');
const changelog = read('CHANGELOG.md');
const releaseHistory = read('docs/release-history.md');
const releaseEvidence = read('docs/release-and-evidence.md');
const qa = read('docs/qa-matrix.md');
const readme = read('README.md');
const publicDemo = read('PUBLIC_DEMO.md');
const index = read('index.html');
const helpers = read('src/research/render-helpers.js');
const workflow = read('.github/workflows/ci.yml');
const targetSource = read(TARGET_MODULE);
const legacyBudgetSource = read(LEGACY_BUDGET_MODULE);

assert.equal(pkg.version, VERSION);
assert.equal(manifest.version, VERSION);
assert.equal(manifest.release_title, RELEASE);
assert.equal(ciRegistry.ci_gate_registry_version, VERSION);
assert.equal(ciRegistry.release_title, RELEASE);
assert.equal(versionRegistry.version_suite_registry_version, VERSION);
assert.equal(versionRegistry.release_title, RELEASE);
assert.equal(evidenceConfig.internal_build_version, VERSION);
assert.equal(evidenceConfig.public_version_label, PUBLIC_LABEL);

for (const text of [current, roadmap, changelog, releaseEvidence, qa, readme, publicDemo]) {
  assert.ok(text.includes(RELEASE) || text.includes(PUBLIC_LABEL), 'alpha.18 current candidate identity missing');
  assert.ok(text.includes(LOCKED_ALPHA16), 'alpha.16 locked baseline missing');
  assert.ok(text.includes(RUN_ID_ALPHA16), 'alpha.16 run id missing');
  assert.ok(text.includes(COMMIT_ALPHA16), 'alpha.16 commit missing');
  assert.ok(text.includes(LOCKED_ALPHA15), 'alpha.15 locked baseline missing');
  assert.ok(text.includes(RUN_ID_ALPHA15), 'alpha.15 run id missing');
  assert.ok(text.includes(COMMIT_ALPHA15), 'alpha.15 commit missing');
  assert.ok(text.includes(LOCKED_ALPHA14), 'alpha.14 replay baseline missing');
}
assert.ok(releaseHistory.includes(RELEASE) || releaseHistory.includes(PUBLIC_LABEL), 'release history must include alpha.18 current candidate identity');
assert.ok(releaseHistory.includes('v1.4.0-alpha.17 — Alpha.16 Lock Completion + Evidence Budget Regression Dashboard'), 'release history must include alpha.17 locked baseline');
assert.ok(releaseHistory.includes('26655823066'), 'release history must include alpha.17 run id');
assert.ok(releaseHistory.includes('fef004abd43511cca247debc417917a4c8fb1c27'), 'release history must include alpha.17 commit');

assert.ok(current.includes('Status: current candidate. Lock is pending green no-browser CI'), 'alpha.17 must be current candidate before its own lock');
assert.equal(/alpha\.16[^\n.]*lock pending/i.test(current), false, 'current release must not contain alpha.16 lock pending wording');
assert.equal(/alpha\.16[^\n.]*Lock is pending/i.test(current), false, 'current release must not contain alpha.16 Lock is pending wording');
assert.equal(/alpha\.15[^\n.]*lock pending/i.test(current), false, 'current release must not contain alpha.15 lock pending wording');
assert.equal(/Status: built locally\. Lock is pending/.test(current), false, 'stale local-build lock wording must not remain');
assert.equal((roadmap.match(/Current candidate/g) || []).length, 1, 'roadmap must have exactly one current candidate section');
assert.ok(!roadmap.includes('v1.4.0-alpha.16 — Evidence Decision Ledger Handoff Audit'), 'roadmap must not reuse alpha.16 as current candidate');

const alpha15Sections = [...changelog.matchAll(/^## v1\.4\.0-alpha\.15 —/gm)];
assert.equal(alpha15Sections.length, 1, 'CHANGELOG must have exactly one alpha.15 section');
const alpha16Sections = [...changelog.matchAll(/^## v1\.4\.0-alpha\.16 —/gm)];
assert.equal(alpha16Sections.length, 1, 'CHANGELOG must have exactly one alpha.16 section');
const alpha16 = section(changelog, '## v1.4.0-alpha.16 — Alpha.15 Lock Completion + Evidence Surface Budget Enforcement');
for (const token of ['alpha.15', 'evidence surface budget', 'browser check budget max 20', 'hosted languages expected 3', 'visible snapshot rows max 39']) {
  assert.ok(alpha16.toLowerCase().includes(token.toLowerCase()), `alpha.16 changelog section missing ${token}`);
}
const alpha15 = section(changelog, '## v1.4.0-alpha.15 — Roadmap Lock Completion + Manual Provider Adapter UX Compression');
for (const token of [
  'roadmap lock completion',
  'manual provider adapter UX compression',
  'static evidence/runtime budget guard',
  'browser check budget max 20',
  'hosted languages expected 3',
  'hosted surfaces max 13',
  'visible snapshot rows max 39'
]) assert.ok(alpha15.toLowerCase().includes(token.toLowerCase()), `alpha.15 changelog section missing ${token}`);
for (const stale of [
  'deterministic provider adapter fixtures',
  'request/response envelope diffing',
  'no-network manual provider adapter sandbox',
  'ephemeral credential handoff contract',
  'provider request-envelope preview',
  'ADR-018'
]) assert.equal(alpha15.includes(stale), false, `alpha.15 changelog section contains stale scope: ${stale}`);

for (const token of [
  'browser_check_budget_max: 20',
  'hosted_language_count_expected: 3',
  'hosted_surface_count_expected_max: 13',
  'visible_snapshot_rows_expected_max: 39'
]) assert.ok([current, releaseEvidence, qa, readme, publicDemo, changelog].some((text) => text.includes(token)), `budget token missing: ${token}`);

const modules = load(TARGET_MODULE);
assert.ok(modules.manualProviderAdapterUxCompressionEvidenceRuntimeBudget, 'budget module registration must remain available for alpha.15 compatibility');
const budget = modules.manualProviderAdapterUxCompressionEvidenceRuntimeBudget.EVIDENCE_RUNTIME_BUDGET;
assert.equal(budget.browser_check_budget_max, 20);
assert.equal(budget.hosted_language_count_expected, 3);
assert.equal(budget.hosted_surface_count_expected_max, 13);
assert.equal(budget.visible_snapshot_rows_expected_max, 39);
assert.equal(budget.runtime_budget_policy, 'guardrail_only');
assert.equal(budget.runtime_budget_enforced_without_network, true);
assert.equal(budget.provider_execution_performed, false);
assert.equal(budget.live_fetching_performed, false);
assert.equal(budget.credential_persistence_allowed, false);

assert.ok(index.includes(PUBLIC_LABEL));
assert.ok(helpers.includes(PUBLIC_LABEL));
assert.ok(index.includes('content="1.4.0-alpha.20"'));
assert.ok(index.includes('src="src/research/evidence-budget-regression-dashboard-evidence-runtime-budget.js" defer'));
assert.ok(index.includes('v1.4.0-alpha.14 Adapter Replay Fixture Corpus + Coverage Matrix'));

for (const gate of ['no-browser','current-no-browser','release']) {
  assert.ok(ciRegistry.gates[gate].node_checks.includes(TARGET_CHECK), `${gate} must run alpha.16 evidence-surface lock completion check`);
}
for (const gate of ['no-browser','current-no-browser','provider','release']) {
  assert.ok(ciRegistry.gates[gate].node_checks.includes(LEGACY_BUDGET_CHECK) || ciRegistry.gates[gate].node_checks.includes('tests/evidence-budget-regression-dashboard-evidence-runtime-budget-check.mjs'), `${gate} must preserve alpha.15 budget compatibility check`);
}
assert.ok(ciRegistry.syntax_matrix.files.includes(TARGET_CHECK));
assert.ok(ciRegistry.syntax_matrix.files.includes(TARGET_MODULE));
assert.ok(ciRegistry.syntax_matrix.files.includes(LEGACY_BUDGET_MODULE));
assert.ok(workflow.includes('lock-evidence-bundle_1.4.0-alpha.20_${{ github.run_id }}'));
assert.ok(workflow.includes("summary.internal_build_version !== '1.4.0-alpha.20'"));

const forbidden = [
  'fetch(', 'XMLHttpRequest', 'WebSocket', 'navigator.sendBeacon',
  'localStorage.setItem', 'sessionStorage.setItem',
  'access_token', 'refresh_token', 'api_key', 'bearer_token', 'sk-', 'ghp_', 'AKIA', 'BEGIN PRIVATE KEY'
];
for (const [name, text] of Object.entries({ targetSource, legacyBudgetSource })) {
  for (const token of forbidden) assert.equal(text.includes(token), false, `${name} must not contain forbidden token ${token}`);
}

const dashboard = modules.evidenceBudgetRegressionDashboard;
assert.ok(dashboard, 'evidence budget regression dashboard module must be registered');
assert.equal(dashboard.LOCKED_ALPHA16_RUN_ID, RUN_ID_ALPHA16);
assert.equal(dashboard.LOCKED_ALPHA16_COMMIT, COMMIT_ALPHA16);
const dashboardReport = dashboard.buildEvidenceBudgetRegressionDashboard({ generated_at:'2026-05-29T00:00:00.000Z' });
assert.equal(dashboardReport.observed.browser_checks, 17);
assert.equal(dashboardReport.observed.hosted_language_count, 3);
assert.equal(dashboardReport.observed.hosted_surface_count, 13);
assert.equal(dashboardReport.observed.visible_snapshot_rows, 39);
assert.equal(dashboardReport.budget_status.browser_checks_over_budget, false);
assert.equal(dashboardReport.budget_status.hosted_languages_match_budget, true);
assert.equal(dashboardReport.budget_status.hosted_surfaces_over_budget, false);
assert.equal(dashboardReport.budget_status.visible_snapshot_rows_over_budget, false);
assert.equal(dashboard.validateEvidenceBudgetRegressionDashboard(dashboardReport).ok, true);
const overBudget = dashboard.buildEvidenceBudgetRegressionDashboard({ observed_overrides:{ browser_checks:21 } });
assert.equal(overBudget.budget_status.browser_checks_over_budget, true);
assert.equal(dashboard.validateEvidenceBudgetRegressionDashboard(overBudget).ok, false);

console.log('Evidence budget regression dashboard and alpha.16 lock-completion checks passed.');
process.exit(0);
