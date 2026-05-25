/* Jarbou3i Research Engine post-stable capability roadmap and expansion gate v1.3.0-alpha.7. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.3.0-alpha.7';
  const STABLE_BASELINE = '1.1.0';
  const RELEASE_TITLE = 'v1.3.0-alpha.7 — Release Truth Sweep + Roadmap Compression';
  const MIN_ACCEPTANCE_CRITERIA = 4;
  const MIN_FALSIFIERS = 3;
  const MIN_EVIDENCE_REQUIREMENTS = 3;

  const ROADMAP_LANES = Object.freeze([
    {
      lane_id:'source_strategy_v2',
      title:'Source Strategy V2',
      priority:1,
      owner:'research_workflow',
      class:'source_evidence',
      status:'planned_gate_only',
      implementation_allowed:false,
      capability_available:false,
      target_outcome:'Improve source taxonomy, review status, evidence-to-claim linking, and gap warnings before any live source retrieval is considered.',
      acceptance_criteria:[
        'Each source class has explicit type, confidence, traceability, review status, and claim-link fields.',
        'Manual source packets remain labeled as user-provided/local drafting scaffolds with no verification claim.',
        'Evidence-to-claim links expose unsupported claims and source gaps before synthesis or publication.',
        'Live fetching remains disabled unless a later implementation release adds dedicated tests, privacy review, and browser evidence.'
      ],
      falsifiers:[
        'A source packet or source card claims verification without human review.',
        'A source workflow performs live fetching during this alpha.',
        'A public copy string describes roadmap-only source expansion as an available capability.'
      ],
      evidence_required:['source packet roundtrip check','evidence workspace check','source capability registry check','privacy/export guard'],
      blocked_claims:['verified sources','live scraping','automatic source truth checking'],
      next_decision:'Approve source taxonomy + evidence-linking implementation plan only.'
    },
    {
      lane_id:'provider_execution_path',
      title:'Provider Execution Path',
      priority:2,
      owner:'security_privacy',
      class:'provider_backend',
      status:'planned_gate_only',
      implementation_allowed:false,
      capability_available:false,
      target_outcome:'Define BYOK, hosted proxy, mock mode, and failure UX boundaries before any broader live provider execution is exposed.',
      acceptance_criteria:[
        'ADR separates mock/manual mode, BYOK dry-run, hosted proxy, and production execution responsibilities.',
        'No raw API key, bearer token, refresh token, or authorization header can enter export payloads, run ledgers, or release artifacts.',
        'Provider controls cannot imply live execution unless a real validated backend path and failure UX are available.',
        'Browser evidence captures provider mode, disabled states, privacy warnings, and export redaction behavior.'
      ],
      falsifiers:[
        'A provider button appears executable without a safe configured provider path.',
        'Any artifact includes a raw credential, bearer token, or unredacted API key.',
        'The UI suggests production OAuth/account login is available in this alpha.'
      ],
      evidence_required:['provider mode browser capture','backend hardening check','privacy release gate','credential leak scan'],
      blocked_claims:['production OAuth','live provider execution','stored provider credentials'],
      next_decision:'Write ADR + threat model; do not implement until approved.'
    },
    {
      lane_id:'evidence_workspace_v2',
      title:'Evidence Workspace V2',
      priority:3,
      owner:'product_research',
      class:'workflow_ux',
      status:'planned_gate_only',
      implementation_allowed:false,
      capability_available:false,
      target_outcome:'Increase evidence review throughput while keeping contradiction review, source confidence, and publication gates explicit.',
      acceptance_criteria:[
        'Raw, reviewed, accepted, rejected, and needs-edit states remain distinguishable.',
        'Contradiction markers cannot be cleared without review status and rationale.',
        'Publication readiness exposes unresolved contradictions and weak evidence clusters.',
        'Desktop and mobile captures prove the review path remains usable without horizontal overflow.'
      ],
      falsifiers:[
        'An unresolved contradiction can be silently promoted into a publication-ready brief.',
        'Mobile evidence review hides primary controls or creates horizontal overflow.',
        'Evidence scoring is presented as truth instead of prioritization and reliability guidance.'
      ],
      evidence_required:['evidence workspace check','evidence scoring calibration','publication review gate','browser visual evidence'],
      blocked_claims:['publication-ready without review','truth score','automatic contradiction resolution'],
      next_decision:'Design a throughput patch that changes workflow surface only after browser proof.'
    },
    {
      lane_id:'export_publication_v4',
      title:'Export + Publication V4',
      priority:4,
      owner:'release_engineering',
      class:'publication_release',
      status:'planned_gate_only',
      implementation_allowed:false,
      capability_available:false,
      target_outcome:'Strengthen provenance, traceability, publication review, and release evidence before export/public claim expansion.',
      acceptance_criteria:[
        'Every exported claim can trace to accepted evidence, source class, and review state.',
        'Publication review rejects weak-source, unresolved-contradiction, and unsupported-claim bundles.',
        'Release metadata records package version, commit/evidence binding, artifact checksum, and validation gate status.',
        'Exports preserve privacy classification and credential redaction for every new field.'
      ],
      falsifiers:[
        'A publication pack contains unsupported claims without source-gap warnings.',
        'A release artifact is accepted without matching version metadata and gate evidence.',
        'A new exported field lacks privacy classification.'
      ],
      evidence_required:['export pack v3 check','publication review gate','release provenance ledger','privacy audit'],
      blocked_claims:['final publication without review','ZIP proves release','screenshots prove release'],
      next_decision:'Define export v4 schema delta only after traceability matrix is approved.'
    },
    {
      lane_id:'ux_density_polish',
      title:'UX Density Polish',
      priority:5,
      owner:'product_release',
      class:'ux_surface',
      status:'planned_gate_only',
      implementation_allowed:false,
      capability_available:false,
      target_outcome:'Reduce first-run cognitive load without redesigning the stable public-demo surface or hiding required safety boundaries.',
      acceptance_criteria:[
        'Primary first-run path remains visible without opening advanced panels.',
        'Provider, OAuth, backend, and source diagnostics remain collapsed until needed.',
        'Arabic RTL, English LTR, and French LTR language snapshots remain clean.',
        'The visible copy differentiates available features from roadmap-only lanes.'
      ],
      falsifiers:[
        'Advanced controls become required before defining a topic or generating a plan.',
        'Visible text snapshots show stale release labels or mixed-language residue.',
        'A roadmap-only lane is presented as available user capability.'
      ],
      evidence_required:['hosted demo browser evidence','visible-text snapshots','a11y static check','layout persistence check'],
      blocked_claims:['redesigned product','available roadmap feature','advanced setup required'],
      next_decision:'Run density audit; defer redesign.'
    },
    {
      lane_id:'release_ops_hardening',
      title:'Release Operations Hardening',
      priority:6,
      owner:'release_engineering',
      class:'ci_release',
      status:'planned_gate_only',
      implementation_allowed:false,
      capability_available:false,
      target_outcome:'Keep post-stable releases commit-bound, evidence-bound, and artifact-clean before selecting implementation lanes.',
      acceptance_criteria:[
        'CI gate registry includes the post-stable expansion gate check in no-browser release paths.',
        'Release artifacts are version-aligned with package, schema, fixtures, docs, and manifest.',
        'Screenshots, ZIP files, and metadata remain evidence inputs, not approval by themselves.',
        'Generated artifacts, logs, reports, and secret-bearing files remain excluded from release packages.'
      ],
      falsifiers:[
        'A release is approved from a ZIP or screenshot without green gate evidence.',
        'Package, schema, fixture, manifest, and visible version labels diverge.',
        'Generated evidence or secret-bearing files enter the source release archive.'
      ],
      evidence_required:['ci gate registry check','release provenance ledger','repo hygiene check','lockfile integrity check'],
      blocked_claims:['artifact-only approval','screenshot-only approval','unclean source package'],
      next_decision:'Keep gate registry as source of CI truth.'
    }
  ]);

  const GLOBAL_BLOCKERS = Object.freeze([
    'No live scraping or uncontrolled source fetching in this alpha.',
    'No automatic source verification claim in this alpha.',
    'No production OAuth or portable account login in this alpha.',
    'No provider execution expansion in this alpha.',
    'No backend behavior expansion in this alpha.',
    'No storage surface expansion in this alpha.',
    'No roadmap lane may be marketed as an available feature before implementation evidence exists.'
  ]);

  function nowIso(){ return new Date().toISOString(); }
  function asArray(value){ return Array.isArray(value) ? value : []; }
  function unique(values){ return [...new Set(asArray(values).map((value)=>String(value || '').trim()).filter(Boolean))]; }
  function selectedIds(input){
    const ids = unique(input && Array.isArray(input.selected_lanes) ? input.selected_lanes : []);
    return ids.length ? ids : ROADMAP_LANES.map((lane)=>lane.lane_id);
  }
  function readiness(lane){
    const checks = {
      acceptance_criteria: asArray(lane.acceptance_criteria).length >= MIN_ACCEPTANCE_CRITERIA,
      falsifiers: asArray(lane.falsifiers).length >= MIN_FALSIFIERS,
      evidence_required: asArray(lane.evidence_required).length >= MIN_EVIDENCE_REQUIREMENTS,
      owner: !!lane.owner,
      blocked_claims: asArray(lane.blocked_claims).length >= 2,
      implementation_blocked: lane.implementation_allowed === false && lane.capability_available === false
    };
    const passed = Object.values(checks).filter(Boolean).length;
    return {checks, passed, total:Object.keys(checks).length, score:Math.round((passed / Object.keys(checks).length) * 100)};
  }
  function rankLanes(lanes){
    return lanes.slice().sort((a,b)=>a.priority - b.priority).map((lane,index)=>Object.assign({}, lane, {rank:index + 1}));
  }
  function buildPostStableExpansionGate(input = {}, options = {}){
    const version = options.version || VERSION;
    const generatedAt = options.now || nowIso();
    const selected = selectedIds(input);
    const lanes = rankLanes(ROADMAP_LANES).map((lane)=>{
      const laneReadiness = readiness(lane);
      return Object.assign({}, lane, {
        selected:selected.includes(lane.lane_id),
        implementation_allowed:false,
        capability_available:false,
        readiness_score:laneReadiness.score,
        readiness:laneReadiness,
        gate_status:laneReadiness.score === 100 ? 'criteria_ready_implementation_blocked' : 'criteria_incomplete'
      });
    });
    const selectedLanes = lanes.filter((lane)=>lane.selected);
    const selectedReady = selectedLanes.every((lane)=>lane.readiness_score === 100);
    return {
      expansion_gate_version:version,
      release_title:RELEASE_TITLE,
      generated_at:generatedAt,
      stable_baseline_version:STABLE_BASELINE,
      stage:'post_stable_capability_roadmap_expansion_gate',
      release_type:'alpha_planning_gate',
      implementation_allowed:false,
      capability_expansion_enabled:false,
      runtime_capability_change:false,
      provider_behavior_changed:false,
      oauth_behavior_changed:false,
      backend_behavior_changed:false,
      source_behavior_changed:false,
      storage_behavior_changed:false,
      automatic_source_verification_claimed:false,
      live_scraping_enabled:false,
      lanes,
      selected_lane_count:selectedLanes.length,
      selected_lane_ids:selectedLanes.map((lane)=>lane.lane_id),
      global_blockers:GLOBAL_BLOCKERS.slice(),
      release_gate:selectedReady ? 'post_stable_expansion_gate_ready' : 'post_stable_expansion_gate_blocked',
      next_valid_action:selectedReady ? 'Select one lane for a later implementation-plan release; do not implement in this alpha.' : 'Complete missing criteria/falsifiers/evidence before lane selection.',
      disproven_if:[
        'Any live source fetching, provider execution expansion, OAuth production flow, backend behavior expansion, or storage expansion occurs in this alpha.',
        'Any public copy presents a roadmap lane as already available capability.',
        'Any export or release artifact contains raw credentials, bearer tokens, or unclassified new fields.'
      ]
    };
  }
  root.postStableExpansionGate = Object.freeze({VERSION, STABLE_BASELINE, RELEASE_TITLE, MIN_ACCEPTANCE_CRITERIA, MIN_FALSIFIERS, MIN_EVIDENCE_REQUIREMENTS, ROADMAP_LANES, GLOBAL_BLOCKERS, readiness, buildPostStableExpansionGate});
})(typeof window !== 'undefined' ? window : globalThis);
