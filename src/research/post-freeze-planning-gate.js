/* Jarbou3i Research Engine post-freeze product expansion planning gate v1.1.0-alpha.1. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.1.0-alpha.1';
  const FREEZE_BASELINE = '1.0.30';
  const LANES = Object.freeze([
    {lane_id:'ux_polish', label:'UX polish and density reduction', mode:'design_debt', requires_browser_evidence:true, capability_expansion:false},
    {lane_id:'real_provider_path', label:'Real provider path threat model', mode:'architecture_decision', requires_browser_evidence:true, capability_expansion:false},
    {lane_id:'source_strategy', label:'Source and evidence strategy', mode:'research_design', requires_browser_evidence:false, capability_expansion:false},
    {lane_id:'privacy_security', label:'Privacy/security hardening backlog', mode:'risk_review', requires_browser_evidence:false, capability_expansion:false},
    {lane_id:'release_ops', label:'Release operations and artifact discipline', mode:'release_engineering', requires_browser_evidence:true, capability_expansion:false}
  ]);
  const BLOCKED_CLAIMS = Object.freeze([
    'Do not claim live scraping or automatic source verification.',
    'Do not claim real OAuth/account login before a production threat model and backend are approved.',
    'Do not claim provider execution unless a real provider path is implemented and CI-covered.',
    'Do not expose roadmap concepts as available capabilities.',
    'Do not let screenshots, ZIPs, or metadata alone approve a release.'
  ]);
  function nowIso(){ return new Date().toISOString(); }
  function buildPostFreezePlanningGate(input = {}, {version = VERSION, now = nowIso()} = {}){
    const selected = Array.isArray(input.selected_lanes) && input.selected_lanes.length ? input.selected_lanes : LANES.map(lane => lane.lane_id);
    const lanes = LANES.map((lane, index) => Object.assign({}, lane, {
      order:index + 1,
      selected:selected.includes(lane.lane_id),
      implementation_allowed:false,
      required_decision: lane.lane_id === 'real_provider_path'
        ? 'ADR required before implementation.'
        : 'Planning note required before implementation.'
    }));
    const selectedCount = lanes.filter(lane => lane.selected).length;
    return {
      post_freeze_planning_version:version,
      generated_at:now,
      baseline_version:FREEZE_BASELINE,
      stage:'post_freeze_planning_gate',
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
      blocked_claims:BLOCKED_CLAIMS.slice(),
      decision_rules:[
        'Each lane needs an explicit owner, acceptance criteria, and falsifier before implementation.',
        'Provider/OAuth/backend/source changes require ADR + privacy review + browser evidence before UI exposure.',
        'Manual/private mode remains the default until a production capability is implemented and tested.',
        'Public demo claims must describe current behavior only, not roadmap intent.'
      ],
      release_gate:selectedCount > 0 ? 'post_freeze_planning_ready' : 'post_freeze_planning_blocked'
    };
  }
  root.postFreezePlanningGate = Object.freeze({VERSION, FREEZE_BASELINE, LANES, BLOCKED_CLAIMS, buildPostFreezePlanningGate});
})(typeof window !== 'undefined' ? window : globalThis);
