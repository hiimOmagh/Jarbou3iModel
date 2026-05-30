import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const VERSION = '1.4.0-alpha.23';
const RELEASE = 'v1.4.0-alpha.23 — Alpha.22 Lock Completion + Handoff Productivity Runbook Gate';
const PUBLIC_LABEL = 'v1.4.0-alpha.23 Handoff Productivity Runbook Gate';
const LOCKED_ALPHA22 = '1.4.0-alpha.22';
const LOCKED_ALPHA22_TITLE = 'v1.4.0-alpha.22 — Handoff Productivity Command Center';
const RUN_ID_ALPHA22 = '26683651807';
const COMMIT_ALPHA22 = 'a86d23efa3df7450c34d151f0dbb30fe3abdabef';
const TARGET_MODULE = 'src/research/handoff-productivity-runbook-gate.js';
const TARGET_CHECK = 'tests/handoff-productivity-runbook-gate-lock-completion-check.mjs';
const STALE_ALPHA22_CHECK = 'tests/handoff-productivity-command-center-lock-completion-check.mjs';

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
const source = read(TARGET_MODULE);

assert.equal(pkg.version, VERSION);
assert.ok(pkg.description.includes(PUBLIC_LABEL));
assert.ok(pkg.description.includes(LOCKED_ALPHA22_TITLE));
assert.ok(pkg.description.includes(RUN_ID_ALPHA22));
assert.ok(pkg.description.includes(COMMIT_ALPHA22));
assert.equal(manifest.version, VERSION);
assert.equal(manifest.release_title, RELEASE);
assert.equal(ciRegistry.ci_gate_registry_version, VERSION);
assert.equal(ciRegistry.release_title, RELEASE);
assert.equal(versionRegistry.version_suite_registry_version, VERSION);
assert.equal(versionRegistry.release_title, RELEASE);
assert.equal(evidenceConfig.internal_build_version, VERSION);
assert.equal(evidenceConfig.public_version_label, PUBLIC_LABEL);

for (const [name, text] of Object.entries({ current, roadmap, changelog, releaseHistory, releaseEvidence, qa, readme, publicDemo })) {
  assert.ok(text.includes(RELEASE) || text.includes(PUBLIC_LABEL), `${name} must expose alpha.23 current identity`);
  assert.ok(text.includes(LOCKED_ALPHA22_TITLE), `${name} must record locked alpha.22 baseline`);
  assert.ok(text.includes(RUN_ID_ALPHA22), `${name} must record alpha.22 run id`);
  assert.ok(text.includes(COMMIT_ALPHA22), `${name} must record alpha.22 commit`);
  assert.ok(/handoff productivity runbook gate|بوابة دليل تشغيل إنتاجية التسليم|porte de runbook/i.test(text), `${name} must describe handoff productivity runbook gate`);
}

assert.ok(current.includes('Status: current candidate. Lock is pending green no-browser CI'), 'alpha.23 must be current candidate before its own lock');
assert.equal(/alpha\.22[^\n.]*lock pending/i.test(current), false, 'current release must not contain alpha.22 lock pending wording');
assert.equal((roadmap.match(/Current candidate/g) || []).length, 1, 'roadmap must have exactly one current candidate section');
assert.equal(fs.existsSync(STALE_ALPHA22_CHECK), false, 'stale alpha.22 lock-completion check must be removed');

assert.ok(index.includes(PUBLIC_LABEL));
assert.ok(helpers.includes(PUBLIC_LABEL));
assert.ok(index.includes('content="1.4.0-alpha.23"'));
assert.ok(index.includes('src="src/research/handoff-productivity-runbook-gate.js" defer'));
assert.ok(index.includes('data-browser-qa="handoff-productivity-runbook-gate"'));
assert.ok(helpers.includes('Handoff Productivity Runbook Gate'));
assert.ok(helpers.includes('بوابة دليل تشغيل إنتاجية التسليم'));
assert.ok(helpers.includes('Porte de runbook de productivité'));
assert.ok(workflow.includes('lock-evidence-bundle_1.4.0-alpha.23_${{ github.run_id }}'));
assert.ok(workflow.includes("summary.internal_build_version !== '1.4.0-alpha.23'"));

for (const gate of ['no-browser','current-no-browser','release']) {
  assert.ok(ciRegistry.gates[gate].node_checks.includes(TARGET_CHECK), `${gate} must run alpha.23 handoff productivity runbook gate check`);
  assert.equal(ciRegistry.gates[gate].node_checks.includes(STALE_ALPHA22_CHECK), false, `${gate} must not run stale alpha.22 check`);
}
assert.ok(ciRegistry.syntax_matrix.files.includes(TARGET_CHECK));
assert.ok(ciRegistry.syntax_matrix.files.includes(TARGET_MODULE));
assert.equal(ciRegistry.syntax_matrix.files.includes(STALE_ALPHA22_CHECK), false);

const modules = load(TARGET_MODULE);
assert.ok(modules.handoffProductivityRunbookGate, 'handoff productivity runbook gate module must be registered');
const gate = modules.handoffProductivityRunbookGate;
assert.equal(gate.VERSION, VERSION);
assert.equal(gate.MILESTONE, RELEASE);
assert.equal(gate.LOCKED_BASELINE, LOCKED_ALPHA22);
assert.equal(gate.LOCKED_BASELINE_RUN_ID, RUN_ID_ALPHA22);
assert.equal(gate.LOCKED_BASELINE_COMMIT, COMMIT_ALPHA22);
assert.equal(gate.PRODUCTIVITY_COMMAND_CENTER_BASELINE, LOCKED_ALPHA22);
assert.equal(gate.READINESS_CHECKLIST_BASELINE, '1.4.0-alpha.21');
assert.equal(gate.HANDOFF_AUDIT_BASELINE, '1.4.0-alpha.20');
assert.equal(gate.DECISION_LEDGER_BASELINE, '1.4.0-alpha.19');
assert.equal(gate.ACTIONABILITY_BASELINE, '1.4.0-alpha.18');
assert.equal(gate.MODEL, 'handoff_productivity_runbook_gate.v1');
assert.equal(gate.LOCKED_ALPHA22_OBSERVED.no_browser_checks, 150);
assert.equal(gate.LOCKED_ALPHA22_OBSERVED.browser_checks, 17);
assert.equal(gate.LOCKED_ALPHA22_OBSERVED.lockable, true);

const passingEvidence = Object.fromEntries(gate.REQUIRED_RUNBOOK_STEPS.map((item, index) => [item, { status:'pass', operator_minutes_at_risk:index + 1 }]));
const pass = gate.buildHandoffProductivityRunbookGate({ current_evidence: passingEvidence });
assert.equal(pass.overall_runbook_status, 'pass');
assert.ok(pass.recommended_operator_actions.includes('execute_operator_lock_runbook'));
assert.equal(pass.runbook_steps.length, gate.REQUIRED_RUNBOOK_STEPS.length);
assert.ok(pass.runbook_steps.every((entry) => entry.checksum.startsWith('fnv1a32:')));
assert.ok(pass.operator_runbook_queue.every((entry) => entry.checksum.startsWith('fnv1a32:')));
assert.equal(gate.validateRunbookGateSafety(pass).ok, true);

const warn = gate.buildHandoffProductivityRunbookGate({ current_evidence: Object.assign({}, passingEvidence, { verify_visible_text_snapshots_green:{ status:'warn', operator_minutes_at_risk:12 } }) });
assert.equal(warn.overall_runbook_status, 'warn');
assert.ok(warn.recommended_operator_actions.includes('review_budget_pressure_then_continue'));
assert.equal(warn.top_priority_step, 'verify_visible_text_snapshots_green');

const fail = gate.buildHandoffProductivityRunbookGate({ current_evidence: Object.assign({}, passingEvidence, { verify_artifact_identity_guard_green:false }) });
assert.equal(fail.overall_runbook_status, 'fail');
assert.ok(fail.recommended_operator_actions.includes('repair_blockers_before_runbook'));
assert.ok(fail.blocking_steps.includes('verify_artifact_identity_guard_green'));

const missing = gate.buildHandoffProductivityRunbookGate({});
assert.equal(missing.overall_runbook_status, 'review_required');
assert.ok(missing.recommended_operator_actions.includes('capture_missing_evidence_before_runbook'));
assert.ok(missing.review_required_steps.length >= 1);

const unsafeKeys = [
  ['raw','credentials'], ['raw','tokens'], ['raw','api','keys'], ['authorization','headers'], ['authorization','header'],
  ['raw','request','body'], ['raw','response','body'], ['raw','source','fetch','results'], ['raw','network','trace'],
  ['browser','session','secrets'], ['provider','secret','value'], ['access','token'], ['refresh','token'], ['api','key'], ['bearer','token']
].map((parts) => parts.join('_'));
for (const key of unsafeKeys) {
  const unsafe = Object.assign({}, pass, { [key]:'unsafe' });
  const validation = gate.validateRunbookGateSafety(unsafe);
  assert.equal(validation.ok, false, `unsafe key must fail: ${key}`);
  assert.ok(validation.forbidden_present.some((finding) => finding.includes(key)), `unsafe key must be reported: ${key}`);
}

for (const forbidden of ['fetch(', 'XMLHttpRequest', 'WebSocket', 'navigator.sendBeacon', 'localStorage.setItem', 'sessionStorage.setItem', 'sk-', 'ghp_', 'AKIA', 'BEGIN PRIVATE KEY', 'Bear' + 'er ']) {
  assert.equal(source.includes(forbidden), false, `target source must not contain forbidden token ${forbidden}`);
}
for (const forbidden of [['access','token'], ['refresh','token'], ['api','key'], ['bearer','token'], ['raw','credentials'], ['raw','tokens'], ['raw','api','keys']].map((parts) => parts.join('_'))) {
  assert.equal(source.includes(forbidden), false, `target source must not contain forbidden field literal ${forbidden}`);
}

console.log('Handoff productivity runbook gate and alpha.22 lock-completion checks passed.');
process.exit(0);
