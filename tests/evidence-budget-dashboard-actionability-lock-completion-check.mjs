import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const CURRENT_VERSION = '1.4.0-alpha.21';
const LOCKED_ALPHA18 = '1.4.0-alpha.18';
const LOCKED_ALPHA18_TITLE = 'v1.4.0-alpha.18 — Alpha.17 Lock Completion + Evidence Budget Dashboard Actionability';
const RUN_ID_ALPHA18 = '26660959763';
const COMMIT_ALPHA18 = '4e2c852fa0568fcc12881d7565ba9fd50844e0c4';
const TARGET_MODULE = 'src/research/evidence-budget-dashboard-actionability.js';

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
const current = read('docs/current-release.md');
const roadmap = read('docs/roadmap.md');
const targetSource = read(TARGET_MODULE);

assert.equal(pkg.version, CURRENT_VERSION);
assert.equal(manifest.version, CURRENT_VERSION);
for (const [name, text] of Object.entries({ current, roadmap })) {
  assert.ok(text.includes(LOCKED_ALPHA18_TITLE), `${name} must record locked alpha.18 actionability baseline`);
  assert.ok(text.includes(RUN_ID_ALPHA18), `${name} must record alpha.18 run id`);
  assert.ok(text.includes(COMMIT_ALPHA18), `${name} must record alpha.18 commit`);
}

const modules = load(TARGET_MODULE);
assert.ok(modules.evidenceBudgetDashboardActionability, 'alpha.18 actionability module must remain registered as a locked-baseline regression module');
const dashboard = modules.evidenceBudgetDashboardActionability;
assert.equal(dashboard.VERSION, LOCKED_ALPHA18);
assert.equal(dashboard.LOCKED_BASELINE_RUN_ID, '26655823066');
assert.equal(dashboard.LOCKED_BASELINE_COMMIT, 'fef004abd43511cca247debc417917a4c8fb1c27');
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

for (const forbidden of ['fetch(', 'XMLHttpRequest', 'WebSocket', 'navigator.sendBeacon', 'localStorage.setItem', 'sessionStorage.setItem', 'sk-', 'ghp_', 'AKIA', 'BEGIN PRIVATE KEY', 'Bear' + 'er ']) {
  assert.equal(targetSource.includes(forbidden), false, `alpha.18 actionability source must not contain forbidden token ${forbidden}`);
}
console.log('Evidence budget dashboard actionability locked-baseline regression checks passed.');
process.exit(0);
