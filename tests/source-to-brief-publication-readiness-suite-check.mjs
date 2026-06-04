import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { CURRENT_RELEASE } from './current-release-identity.mjs';


const VERSION = '1.4.0-alpha.43';
const MILESTONE = CURRENT_RELEASE;
const MODULE = 'src/research/source-to-brief-publication-readiness-suite.js';
const CHECK = 'tests/source-to-brief-publication-readiness-suite-check.mjs';
const DEPENDENCIES = [
  'src/research/evidence-workspace-ux.js',
  'src/research/operator-command-palette.js',
  'src/research/guided-research-session.js',
  'src/research/brief-template-system.js',
  'src/research/source-to-brief-workbench.js',
  'src/research/source-to-brief-operator-continuity-console.js',
  'src/research/source-to-brief-operator-control-room.js',
  MODULE
];

const sandbox = { console, TextEncoder, window: { Jarbou3iResearchModules: {} } };
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
for (const file of DEPENDENCIES) vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });

const root = sandbox.window.Jarbou3iResearchModules;
const workbenchApi = root.sourceToBriefWorkbench;
const continuityApi = root.sourceToBriefOperatorContinuityConsole;
const controlRoomApi = root.sourceToBriefOperatorControlRoom;
const mod = root.sourceToBriefPublicationReadinessSuite;
assert.ok(workbenchApi, 'source-to-brief workbench must remain available');
assert.ok(continuityApi, 'source-to-brief continuity console must remain available');
assert.ok(controlRoomApi, 'source-to-brief control room must remain available');
assert.ok(mod, 'alpha.40 source-to-brief publication readiness suite module must be registered');
assert.equal(mod.VERSION, VERSION);
assert.equal(mod.MILESTONE, MILESTONE);
assert.equal(mod.MODEL, 'targeted_hosted_evidence_capture.v1');
assert.equal(mod.SOURCE_TO_BRIEF_BASELINE, '1.3.0');
assert.equal(mod.CONTINUITY_CONSOLE_BASELINE, '1.4.0-alpha.38');
assert.equal(mod.CONTROL_ROOM_BASELINE, '1.4.0-alpha.39');
assert.equal(mod.COMPACT_NAVIGATION_BASELINE, '1.4.0-alpha.37');
assert.equal(typeof mod.buildSourceToBriefPublicationReadinessSuite, 'function');

const packet = {
  workflow_version:'1.3.0',
  research_mode:'source-heavy',
  research_plan:{ plan_version:'1.3.0', mode:'source-heavy', topic:'Publication readiness topic', questions:['Which claims block publication?'], counter_evidence_targets:[{target_id:'N1', label:'Narrative needs falsifier'}] },
  evidence_matrix:[
    {evidence_id:'E1', claim:'Supported claim', source_title:'Official source', source_type:'official', source_url:'https://example.com/official', source_date:'2026-05-01', supports:['I1'], contradicts:[], confidence:'high', evidence_strength:5},
    {evidence_id:'E2', claim:'Contradiction source', source_title:'Academic source', source_type:'academic', source_url:'https://example.com/academic', source_date:'2026-05-02', supports:[], contradicts:['I1'], confidence:'high', evidence_strength:4},
    {evidence_id:'E3', claim:'Unlinked background', source_title:'Background note', source_type:'other', source_url:'', source_date:'unknown', supports:[], contradicts:[], confidence:'low', evidence_strength:1}
  ],
  causal_links:[{from:'A1', to:'I1', relationship:'motivates', evidence_ids:[], confidence:'low'}],
  scenarios:{items:[{id:'S1', name:'Scenario missing falsifier', probability:35, timeframe:'near term', drivers:['D1']}]},
  analysis_brief:{brief_version:'1.3.0', topic:'Publication readiness topic', handoff_summary:'Manual publication readiness handoff.'},
  privacy_export:{release_gate:'pass'}
};

const workbench = workbenchApi.buildSourceToBriefWorkbench(packet, {version:'1.3.0', now:'2026-06-01T16:00:00.000Z'});
const continuity = continuityApi.buildSourceToBriefOperatorContinuityConsole({ source_to_brief_workbench: workbench, generated_at:'2026-06-01T16:00:00.000Z' });
const controlRoom = controlRoomApi.buildSourceToBriefOperatorControlRoom({ continuity_console: continuity, generated_at:'2026-06-01T16:00:00.000Z' });
const suite = mod.buildSourceToBriefPublicationReadinessSuite({ control_room: controlRoom, generated_at:'2026-06-01T16:00:00.000Z' });

assert.equal(suite.targeted_hosted_evidence_capture_version, VERSION);
assert.equal(suite.milestone, MILESTONE);
assert.equal(suite.model, 'targeted_hosted_evidence_capture.v1');
assert.equal(suite.publication_readiness_ready, true);
assert.equal(suite.safe_metadata_only, true);
assert.ok(suite.publication_risk_matrix.length >= 4, 'publication readiness suite must expose risk matrix');
assert.ok(suite.publication_risk_matrix.some((risk)=>risk.risk_id === 'claim-boundary-overreach'), 'risk matrix must include claim-boundary overreach');
assert.ok(suite.claim_boundary_checklist.length >= 5, 'claim-boundary checklist must expose required checks');
assert.ok(suite.claim_boundary_checklist.some((check)=>check.check_id === 'no-publication-permission-claim' && check.passed), 'checklist must prevent publication permission claim');
assert.ok(suite.source_coverage_digest.sufficiency_band, 'source coverage digest must expose sufficiency band');
assert.equal(suite.source_coverage_digest.source_coverage_ready_for_publication, false);
assert.ok(suite.unresolved_gap_blocker_map.length >= 1, 'blocker map must expose unresolved blockers');
assert.ok(suite.evidence_sufficiency_bands.some((band)=>band.band_id === 'manual-decision-required' && band.active), 'sufficiency bands must keep manual decision active');
assert.equal(suite.operator_publication_decision_summary.manual_review_required, true);
assert.equal(suite.operator_publication_decision_summary.safe_to_publish, false);
assert.equal(suite.operator_publication_decision_summary.verification_claimed, false);
assert.equal(suite.operator_publication_decision_summary.signoff_performed, false);
assert.equal(suite.operator_publication_decision_summary.export_lock_performed, false);
assert.equal(suite.operator_publication_decision_summary.publication_permission_claimed, false);
assert.ok(suite.operator_publication_decision_summary.next_operator_action.includes('blockers'), 'decision summary must name blockers');
assert.equal(suite.export_readiness_report.manual_review_required, true);
assert.equal(suite.export_readiness_report.safe_to_publish, false);
assert.equal(suite.export_readiness_report.export_ready, true);
assert.equal(suite.export_readiness_report.export_allowed, false);
assert.equal(suite.export_readiness_report.publication_permission_claimed, false);
assert.ok(suite.manual_publication_readiness_copy.includes('Source-to-brief publication readiness verdict'), 'manual copy must summarize readiness verdict');
assert.ok(suite.manual_publication_readiness_copy.includes('no live provider calls'), 'manual copy must restate no-live-provider boundary');
assert.equal(suite.publication_readiness_safety_contract.targeted_hosted_evidence_capture_only, true);
assert.equal(suite.publication_readiness_safety_contract.metadata_only, true);
assert.equal(suite.publication_readiness_safety_contract.no_auto_verification, true);
assert.equal(suite.publication_readiness_safety_contract.no_auto_signoff, true);
assert.equal(suite.publication_readiness_safety_contract.no_auto_export_lock, true);
assert.equal(suite.publication_readiness_safety_contract.no_publication_permission_claim, true);
assert.equal(suite.boundary_flags.network_invocation_allowed, false);
assert.equal(suite.boundary_flags.live_provider_execution_performed, false);
assert.equal(suite.boundary_flags.live_source_fetching_performed, false);
assert.equal(suite.boundary_flags.status_persistence_enabled, false);
assert.equal(suite.boundary_flags.batch_mutation_enabled, false);
assert.equal(suite.boundary_flags.navigation_state_persistence_enabled, false);
assert.equal(suite.boundary_flags.publication_permission_claimed, false);

const index = fs.readFileSync('index.html', 'utf8');
assert.ok(index.includes('Targeted Hosted Evidence Capture'), 'index must expose current publication readiness title');
assert.ok(index.includes('src="src/research/targeted-hosted-evidence-capture.js" defer'), 'index must load current publication readiness module');
assert.ok(index.includes('data-browser-qa="targeted-hosted-evidence-capture"'), 'index must expose current publication readiness browser QA surface');

const registry = JSON.parse(fs.readFileSync('tests/ci-gate-registry.json', 'utf8'));
for (const gate of ['no-browser', 'current-no-browser', 'source', 'release', 'browser']) {
  assert.ok(registry.gates[gate].node_checks.includes(CHECK), `${gate} must run source-to-brief publication readiness suite check`);
}
assert.ok(registry.syntax_matrix.files.includes(MODULE), 'syntax matrix must cover publication readiness module');
assert.ok(registry.syntax_matrix.files.includes(CHECK), 'syntax matrix must cover publication readiness check');

console.log('Source-to-brief publication readiness suite checks passed.');
