/* Jarbou3i Research Engine post-freeze expansion lane acceptance matrix v1.1.0. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.3.0-alpha.8';
  const PREVIOUS_VERSION = '1.1.0-alpha.1';
  const FREEZE_BASELINE = '1.0.30';
  const MIN_ACCEPTANCE_CRITERIA = 3;
  const MIN_FALSIFIERS = 2;

  const LANE_MATRIX = Object.freeze([
    {
      lane_id:'ux_polish',
      label:'UX polish and density reduction',
      mode:'design_debt',
      priority:'high',
      decision_owner:'product_release',
      requires_browser_evidence:true,
      capability_expansion:false,
      implementation_allowed:false,
      acceptance_criteria:[
        'Primary guided path remains visible on desktop and mobile without horizontal overflow.',
        'Advanced/provider panels remain collapsed by default unless the user opens them.',
        'Arabic RTL, English LTR, and French language controls remain reachable from the first screen.'
      ],
      falsifiers:[
        'Mobile first-screen evidence shows clipped primary controls or stretched brand geometry.',
        'A public-demo walkthrough requires opening an advanced panel before defining a topic.'
      ],
      evidence_required:['desktop capture','mobile capture','runtime accessibility smoke','RTL/mobile smoke'],
      blocked_until:['browser evidence regenerated','density-risk review complete'],
      success_metric:'first_run_primary_path_visible_without_advanced_dependency'
    },
    {
      lane_id:'real_provider_path',
      label:'Real provider path threat model',
      mode:'architecture_decision',
      priority:'high',
      decision_owner:'security_privacy',
      requires_browser_evidence:true,
      capability_expansion:false,
      implementation_allowed:false,
      acceptance_criteria:[
        'ADR defines hosted proxy, BYOK, mock provider, and portable account boundaries before UI exposure.',
        'No raw key, token, authorization header, or refresh credential can be exported from any mode.',
        'Provider execution cannot appear enabled unless a real validated backend path and failure UX exist.'
      ],
      falsifiers:[
        'A provider button can imply live execution while only mock/provider-safe mode is available.',
        'Any exported artifact contains a raw provider credential, bearer token, or unredacted API key.'
      ],
      evidence_required:['provider-mode browser capture','privacy export gate','credential leak scan','backend hardening check'],
      blocked_until:['ADR approved','privacy review complete','browser provider evidence green'],
      success_metric:'provider_claims_match_executable_capability'
    },
    {
      lane_id:'source_strategy',
      label:'Source and evidence strategy',
      mode:'research_design',
      priority:'high',
      decision_owner:'research_workflow',
      requires_browser_evidence:false,
      capability_expansion:false,
      implementation_allowed:false,
      acceptance_criteria:[
        'Manual source packets stay labeled as local drafting scaffolds with no verification claim.',
        'Each source class has an explicit reliability, traceability, and review status field.',
        'Search/reference expansion is separated from automated fetching and source truth verification.'
      ],
      falsifiers:[
        'A generated source packet is described as verified without human review.',
        'A source import path performs live fetching without an explicit implementation release and tests.'
      ],
      evidence_required:['source packet roundtrip','source template browser QA','evidence scoring calibration','review queue check'],
      blocked_until:['source taxonomy accepted','truth-claim wording reviewed'],
      success_metric:'source_claims_are_traceable_reviewed_and_not_overstated'
    },
    {
      lane_id:'privacy_security',
      label:'Privacy/security hardening backlog',
      mode:'risk_review',
      priority:'high',
      decision_owner:'security_privacy',
      requires_browser_evidence:false,
      capability_expansion:false,
      implementation_allowed:false,
      acceptance_criteria:[
        'Every new exportable field is classified as public, sensitive-derived, or prohibited.',
        'Generated artifacts, reports, screenshots, and local storage keys remain excluded from release packages unless explicitly allowed.',
        'Privacy audit gates fail on raw credentials, tokens, secrets, and unsupported storage expansion.'
      ],
      falsifiers:[
        'A new feature adds storage or export fields without privacy classification.',
        'A release package includes generated CI artifacts or secret-bearing files.'
      ],
      evidence_required:['privacy export guard','privacy audit','repo hygiene check','release packaging cleanup'],
      blocked_until:['field classification complete','release ignore boundary reviewed'],
      success_metric:'no_new_unclassified_export_or_storage_surface'
    },
    {
      lane_id:'release_ops',
      label:'Release operations and artifact discipline',
      mode:'release_engineering',
      priority:'medium',
      decision_owner:'release_engineering',
      requires_browser_evidence:true,
      capability_expansion:false,
      implementation_allowed:false,
      acceptance_criteria:[
        'Changed-files patch, full source package, checksums, and evidence metadata are version-aligned.',
        'Screenshots, ZIP files, and metadata are treated as evidence, not standalone approval.',
        'CI status is reviewed against the exact commit SHA that produced the evidence package.'
      ],
      falsifiers:[
        'A release is approved from screenshots or ZIP existence without matching green CI.',
        'Package version, runtime badge, schema const, fixture version, and release notes diverge.'
      ],
      evidence_required:['release apply integrity','release provenance ledger','hosted demo evidence manifest','CI result review'],
      blocked_until:['commit/evidence SHA linked','artifact checksum recorded'],
      success_metric:'release_evidence_is_commit_bound_and_version_consistent'
    }
  ]);

  const BLOCKED_CLAIMS = Object.freeze([
    'Do not claim live scraping or automatic source verification.',
    'Do not claim real OAuth/account login before a production threat model and backend are approved.',
    'Do not claim provider execution unless a real provider path is implemented and CI-covered.',
    'Do not expose roadmap concepts as available capabilities.',
    'Do not let screenshots, ZIPs, or metadata alone approve a release.',
    'Do not start implementation before the selected lane has criteria, falsifiers, evidence, and an owner.'
  ]);

  function nowIso(){ return new Date().toISOString(); }
  function unique(values){ return Array.from(new Set(values.filter(Boolean))); }
  function normalizeSelected(input){
    const raw = Array.isArray(input.selected_lanes) && input.selected_lanes.length ? input.selected_lanes : LANE_MATRIX.map(lane => lane.lane_id);
    return unique(raw.map(value => String(value || '').trim()).filter(Boolean));
  }
  function scoreLaneReadiness(lane){
    const criteriaOk = Array.isArray(lane.acceptance_criteria) && lane.acceptance_criteria.length >= MIN_ACCEPTANCE_CRITERIA;
    const falsifiersOk = Array.isArray(lane.falsifiers) && lane.falsifiers.length >= MIN_FALSIFIERS;
    const evidenceOk = Array.isArray(lane.evidence_required) && lane.evidence_required.length >= 2;
    const ownerOk = typeof lane.decision_owner === 'string' && lane.decision_owner.length > 0;
    const blockedOk = Array.isArray(lane.blocked_until) && lane.blocked_until.length >= 1;
    const passCount = [criteriaOk, falsifiersOk, evidenceOk, ownerOk, blockedOk].filter(Boolean).length;
    return {criteriaOk, falsifiersOk, evidenceOk, ownerOk, blockedOk, readiness_score:Math.round((passCount / 5) * 100)};
  }
  function buildPostFreezePlanningGate(input = {}, {version = VERSION, now = nowIso()} = {}){
    const selected = normalizeSelected(input);
    const lanes = LANE_MATRIX.map((lane, index) => {
      const readiness = scoreLaneReadiness(lane);
      return Object.assign({}, lane, {
        order:index + 1,
        selected:selected.includes(lane.lane_id),
        implementation_allowed:false,
        criteria_ready: readiness.readiness_score === 100,
        readiness_score: readiness.readiness_score,
        readiness,
        required_decision: lane.lane_id === 'real_provider_path'
          ? 'ADR + threat model + privacy review required before implementation.'
          : 'Lane note + acceptance criteria + falsifiers required before implementation.'
      });
    });
    const selectedCount = lanes.filter(lane => lane.selected).length;
    const criteriaReadyCount = lanes.filter(lane => lane.criteria_ready).length;
    return {
      post_freeze_planning_version:version,
      generated_at:now,
      previous_version:PREVIOUS_VERSION,
      freeze_baseline_version:FREEZE_BASELINE,
      baseline_version:PREVIOUS_VERSION,
      stage:'expansion_lane_acceptance_matrix',
      release_type:'alpha_planning_gate',
      implementation_allowed:false,
      runtime_capability_change:false,
      provider_behavior_changed:false,
      oauth_behavior_changed:false,
      backend_behavior_changed:false,
      source_behavior_changed:false,
      storage_behavior_changed:false,
      public_demo_freeze_preserved:true,
      lanes,
      selected_lane_count:selectedCount,
      criteria_ready_count:criteriaReadyCount,
      blocked_claims:BLOCKED_CLAIMS.slice(),
      decision_rules:[
        'Each selected lane must keep implementation_allowed=false until its criteria, falsifiers, owner, and evidence gate are explicit.',
        'Provider/OAuth/backend/source changes require ADR + privacy review + browser evidence before UI exposure.',
        'Manual/private mode remains the default until a production capability is implemented and tested.',
        'Public demo claims must describe current behavior only, not roadmap intent.',
        'A lane can move into implementation only in a later version that updates tests, docs, fixtures, and browser evidence together.'
      ],
      release_gate:selectedCount > 0 && criteriaReadyCount === LANE_MATRIX.length
        ? 'expansion_lane_criteria_ready'
        : 'expansion_lane_criteria_blocked'
    };
  }
  root.postFreezePlanningGate = Object.freeze({VERSION, PREVIOUS_VERSION, FREEZE_BASELINE, MIN_ACCEPTANCE_CRITERIA, MIN_FALSIFIERS, LANE_MATRIX, LANES:LANE_MATRIX, BLOCKED_CLAIMS, scoreLaneReadiness, buildPostFreezePlanningGate});
})(typeof window !== 'undefined' ? window : globalThis);
