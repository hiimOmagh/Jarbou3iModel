import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.4.0-alpha.18';
const RELEASE = 'v1.4.0-alpha.18 — Alpha.17 Lock Completion + Evidence Budget Dashboard Actionability';
const PUBLIC_LABEL = 'v1.4.0-alpha.18 Evidence Budget Dashboard Actionability';
const LOCKED_ALPHA17 = '1.4.0-alpha.17';
const LOCKED_ALPHA17_TITLE = 'v1.4.0-alpha.17 — Alpha.16 Lock Completion + Evidence Budget Regression Dashboard';
const RUN_ID_ALPHA17 = '26655823066';
const COMMIT_ALPHA17 = 'fef004abd43511cca247debc417917a4c8fb1c27';
const TARGET_MODULE = 'src/research/evidence-budget-dashboard-actionability.js';
const TARGET_CHECK = 'tests/evidence-budget-dashboard-actionability-lock-completion-check.mjs';

function read(path){ return fs.readFileSync(path, 'utf8'); }
function json(path){ return JSON.parse(read(path)); }
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

assert.equal(pkg.version, VERSION);
assert.ok(pkg.description.includes(PUBLIC_LABEL));
assert.ok(pkg.description.includes(LOCKED_ALPHA17_TITLE));
assert.ok(pkg.description.includes(RUN_ID_ALPHA17));
assert.ok(pkg.description.includes(COMMIT_ALPHA17));
assert.equal(manifest.version, VERSION);
assert.equal(manifest.release_title, RELEASE);
assert.equal(ciRegistry.ci_gate_registry_version, VERSION);
assert.equal(ciRegistry.release_title, RELEASE);
assert.equal(versionRegistry.version_suite_registry_version, VERSION);
assert.equal(versionRegistry.release_title, RELEASE);
assert.equal(evidenceConfig.internal_build_version, VERSION);
assert.equal(evidenceConfig.public_version_label, PUBLIC_LABEL);

for (const [name, text] of Object.entries({ current, roadmap, changelog, releaseHistory, releaseEvidence, qa, readme, publicDemo })) {
  assert.ok(text.includes(RELEASE) || text.includes(PUBLIC_LABEL), `${name} must expose alpha.18 current identity`);
  assert.ok(text.includes(LOCKED_ALPHA17_TITLE), `${name} must record locked alpha.17 baseline`);
  assert.ok(text.includes(RUN_ID_ALPHA17), `${name} must record alpha.17 run id`);
  assert.ok(text.includes(COMMIT_ALPHA17), `${name} must record alpha.17 commit`);
  assert.ok(text.includes('pass, warn, fail, and review-required'), `${name} must describe actionability statuses`);
}

assert.ok(current.includes('Status: current candidate. Lock is pending green no-browser CI'), 'alpha.18 must be current candidate before its own lock');
assert.equal(/alpha\.17[^\n.]*lock pending/i.test(current), false, 'current release must not contain alpha.17 lock pending wording');
assert.equal(/alpha\.17[^\n.]*Lock is pending/i.test(current), false, 'current release must not contain alpha.17 Lock is pending wording');
assert.equal(/Status: built locally\. Lock is pending/.test(current), false, 'stale local-build lock wording must not remain');
assert.equal((roadmap.match(/Current candidate/g) || []).length, 1, 'roadmap must have exactly one current candidate section');

assert.ok(index.includes(PUBLIC_LABEL));
assert.ok(helpers.includes(PUBLIC_LABEL));
assert.ok(index.includes('content="1.4.0-alpha.18"'));
assert.ok(index.includes('src="src/research/evidence-budget-dashboard-actionability.js" defer'));
assert.ok(index.includes('data-browser-qa="evidence-budget-dashboard-actionability"'));
assert.ok(helpers.includes('Evidence Budget Dashboard Actionability'));
assert.ok(helpers.includes('إجراءات المشغّل'));
assert.ok(helpers.includes('actions opérateur'));
assert.ok(workflow.includes('lock-evidence-bundle_1.4.0-alpha.18_${{ github.run_id }}'));
assert.ok(workflow.includes("summary.internal_build_version !== '1.4.0-alpha.18'"));

for (const gate of ['no-browser','current-no-browser','release']) {
  assert.ok(ciRegistry.gates[gate].node_checks.includes(TARGET_CHECK), `${gate} must run alpha.18 actionability check`);
}
assert.ok(ciRegistry.syntax_matrix.files.includes(TARGET_CHECK));
assert.ok(ciRegistry.syntax_matrix.files.includes(TARGET_MODULE));

const modules = load(TARGET_MODULE);
assert.ok(modules.evidenceBudgetDashboardActionability, 'actionability module must be registered');
const dashboard = modules.evidenceBudgetDashboardActionability;
assert.equal(dashboard.VERSION, VERSION);
assert.equal(dashboard.MILESTONE, RELEASE);
assert.equal(dashboard.LOCKED_BASELINE, LOCKED_ALPHA17);
assert.equal(dashboard.LOCKED_BASELINE_RUN_ID, RUN_ID_ALPHA17);
assert.equal(dashboard.LOCKED_BASELINE_COMMIT, COMMIT_ALPHA17);
assert.equal(dashboard.EVIDENCE_BUDGET_BASELINE, '1.4.0-alpha.16');
assert.equal(dashboard.REGRESSION_DASHBOARD_BASELINE, '1.4.0-alpha.17');
assert.equal(dashboard.MODEL, 'evidence_budget_dashboard_actionability.v1');

const passReport = dashboard.buildEvidenceBudgetDashboardActionability({
  generated_at:'2026-05-29T00:00:00.000Z',
  observed_evidence:{
    browser_checks:17,
    hosted_language_count:3,
    hosted_surface_count:12,
    visible_snapshot_rows:36,
    evidence_matrix_passed_rows:39,
    evidence_matrix_failed_rows:0,
    horizontal_overflow_max_px:0,
    localization_passed:true,
    visible_text_snapshots_passed:true,
    artifact_identity_guard_passed:true,
    bundle_validation_passed:true
  }
});
assert.equal(passReport.status_summary.overall_dashboard_status, 'pass');
assert.ok(passReport.recommended_operator_actions.includes('lock_review_ready'));
assert.equal(dashboard.validateDashboardActionabilitySafety(passReport).ok, true);

const warnReport = dashboard.buildEvidenceBudgetDashboardActionability({
  generated_at:'2026-05-29T00:00:00.000Z',
  observed_evidence:{
    browser_checks:19,
    hosted_language_count:3,
    hosted_surface_count:13,
    visible_snapshot_rows:39,
    evidence_matrix_passed_rows:39,
    evidence_matrix_failed_rows:0,
    horizontal_overflow_max_px:0,
    localization_passed:true,
    visible_text_snapshots_passed:true,
    artifact_identity_guard_passed:true,
    bundle_validation_passed:true,
    warn_near_budget:true
  }
});
assert.ok(Object.values(warnReport.status_summary).includes('warn'));
assert.ok(warnReport.recommended_operator_actions.includes('review_budget_pressure_before_lock'));

const failReport = dashboard.buildEvidenceBudgetDashboardActionability({ observed_overrides:{ browser_checks:21 } });
assert.equal(failReport.status_summary.overall_dashboard_status, 'fail');
assert.ok(failReport.recommended_operator_actions.includes('block_lock_until_evidence_budget_regression_fixed'));

const missingReport = dashboard.buildEvidenceBudgetDashboardActionability({ observed_evidence:null });
assert.equal(missingReport.status_summary.overall_dashboard_status, 'review_required');
assert.ok(missingReport.recommended_operator_actions.includes('capture_current_evidence_before_lock'));

const unsafeKeys = [
  ['raw','credentials'],
  ['raw','tokens'],
  ['raw','api','keys'],
  ['authorization','headers'],
  ['authorization','header'],
  ['raw','request','body'],
  ['raw','response','body'],
  ['raw','source','fetch','results'],
  ['raw','network','trace'],
  ['browser','session','secrets'],
  ['provider','secret','value'],
  ['access','token'],
  ['refresh','token'],
  ['api','key'],
  ['bearer','token']
].map((parts) => parts.join('_'));
for (const key of unsafeKeys) {
  const unsafe = Object.assign({}, passReport, { [key]:'unsafe' });
  const validation = dashboard.validateDashboardActionabilitySafety(unsafe);
  assert.equal(validation.ok, false, `unsafe key must fail: ${key}`);
  assert.ok(validation.forbidden_present.some((finding) => finding.includes(key)), `unsafe key must be reported: ${key}`);
}

for (const forbidden of ['fetch(', 'XMLHttpRequest', 'WebSocket', 'navigator.sendBeacon', 'localStorage.setItem', 'sessionStorage.setItem', 'sk-', 'ghp_', 'AKIA', 'BEGIN PRIVATE KEY', 'Bear' + 'er ']) {
  assert.equal(targetSource.includes(forbidden), false, `target source must not contain forbidden token ${forbidden}`);
}
for (const forbidden of [['access','token'], ['refresh','token'], ['api','key'], ['bearer','token'], ['raw','credentials'], ['raw','tokens'], ['raw','api','keys']].map((parts) => parts.join('_'))) {
  assert.equal(targetSource.includes(forbidden), false, `target source must not contain forbidden field literal ${forbidden}`);
}

console.log('Evidence budget dashboard actionability and alpha.17 lock-completion checks passed.');
process.exit(0);
