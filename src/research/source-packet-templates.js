/* Jarbou3i Research Engine source packet template presets v1.0.24. Local/manual only. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.0.24';
  const TEMPLATE_MODEL = 'source_packet_template_presets.v1';
  const PACKET_SCHEMA = 'manual_source_packet.v1';
  const BUILDER_VERSION = 'source_packet_builder.v1';
  function text(value, fallback = ''){ return String(value ?? fallback).trim() || fallback; }
  function now(options = {}){ return options.now || new Date().toISOString(); }
  function clone(value){ return JSON.parse(JSON.stringify(value)); }
  function stableHash(value){ const s = typeof value === 'string' ? value : JSON.stringify(value || {}); let h = 0; for(let i = 0; i < s.length; i += 1) h = Math.imul(31, h) + s.charCodeAt(i) | 0; return Math.abs(h).toString(36).padStart(6, '0'); }

  const TEMPLATES = Object.freeze([
    Object.freeze({
      template_id:'official_report',
      label:'Official report / institutional document',
      source_type:'official',
      evidence_type:'official_document',
      reliability_floor:'high_when_traceable',
      attention_hint:'usually_low_or_not_relevant',
      required_fields:['title','url','captured_at','claim','quote'],
      default_engagement:{upvotes:0, comments:0, views:0},
      evidence_stub:{claim:'Replace with a specific finding from the official report.', quote:'Replace with a short traceable excerpt from the report.', confidence:'high', supports:['I1'], contradicts:[]},
      warning:'Official status improves traceability but does not remove the need to check scope, date, and implementation reality.'
    }),
    Object.freeze({
      template_id:'reddit_thread',
      label:'Reddit thread / public discussion',
      source_type:'reddit_thread',
      evidence_type:'social_discussion',
      reliability_floor:'low_until_correlated',
      attention_hint:'engagement_signal_only',
      required_fields:['title','url','captured_at','claim','quote','engagement'],
      default_engagement:{upvotes:0, comments:0, views:0},
      evidence_stub:{claim:'Replace with the specific public-discourse pattern observed in the thread.', quote:'Replace with a short representative comment or thread excerpt.', confidence:'medium', supports:['N1'], contradicts:[]},
      warning:'Reddit engagement is an attention signal, not a truth signal. Corroborate before synthesis.'
    }),
    Object.freeze({
      template_id:'youtube_transcript',
      label:'YouTube video / transcript',
      source_type:'youtube_transcript',
      evidence_type:'transcript',
      reliability_floor:'medium_when_speaker_and_transcript_are_traceable',
      attention_hint:'views_are_reach_not_truth',
      required_fields:['title','url','captured_at','claim','quote','speaker_or_channel'],
      default_engagement:{upvotes:0, comments:0, views:0},
      evidence_stub:{claim:'Replace with the specific transcript-backed claim.', quote:'Replace with a timestampable transcript excerpt.', confidence:'medium', supports:['N1'], contradicts:[]},
      warning:'Transcript material requires speaker/context checks; views only measure reach.'
    }),
    Object.freeze({
      template_id:'market_signal',
      label:'Prediction market / market signal',
      source_type:'prediction_market',
      evidence_type:'market_odds',
      reliability_floor:'medium_for_expectations_not_facts',
      attention_hint:'odds_and_liquidity_are_separate',
      required_fields:['title','url','captured_at','claim','market_odds'],
      default_engagement:{upvotes:0, comments:0, views:0},
      evidence_stub:{claim:'Replace with the market-implied expectation and its limit.', quote:'Replace with the exact market question and current odds.', confidence:'medium', supports:['N1'], contradicts:[]},
      warning:'Market odds express priced expectations, not verified facts or causal proof.'
    }),
    Object.freeze({
      template_id:'github_release',
      label:'GitHub release / repository signal',
      source_type:'github_release',
      evidence_type:'code_release',
      reliability_floor:'high_for_repository_activity_medium_for_adoption_claims',
      attention_hint:'stars_and_forks_are_adoption_proxies_only',
      required_fields:['title','url','captured_at','claim','release_tag_or_commit'],
      default_engagement:{upvotes:0, comments:0, views:0},
      evidence_stub:{claim:'Replace with the specific shipped change, issue, release, or commit evidence.', quote:'Replace with release-note, commit, or issue text.', confidence:'high', supports:['I1'], contradicts:[]},
      warning:'Repository activity proves activity; it does not automatically prove adoption or quality.'
    }),
    Object.freeze({
      template_id:'generic_article',
      label:'Generic article / web source',
      source_type:'news',
      evidence_type:'article',
      reliability_floor:'medium_until_source_quality_checked',
      attention_hint:'not_available_by_default',
      required_fields:['title','url','captured_at','claim','quote'],
      default_engagement:{upvotes:0, comments:0, views:0},
      evidence_stub:{claim:'Replace with a specific article-backed claim.', quote:'Replace with a short excerpt from the article.', confidence:'medium', supports:['N1'], contradicts:[]},
      warning:'Article reliability depends on outlet, sourcing, date, and proximity to primary evidence.'
    })
  ]);

  function listTemplates(){ return clone(TEMPLATES); }
  function getTemplate(templateId){ const id = text(templateId || 'generic_article'); return clone(TEMPLATES.find((item) => item.template_id === id) || TEMPLATES.find((item) => item.template_id === 'generic_article')); }
  function sourcePacketFromTemplate(templateId, overrides = {}, options = {}){
    const template = getTemplate(templateId);
    const generatedAt = now(options);
    const title = text(overrides.title || template.label, template.label);
    const url = text(overrides.url || '', '');
    const claim = text(overrides.claim || template.evidence_stub.claim, template.evidence_stub.claim);
    const quote = text(overrides.quote || overrides.excerpt || template.evidence_stub.quote, template.evidence_stub.quote);
    const packetId = text(overrides.packet_id || `template-${template.template_id}-${stableHash({title,url,claim})}`);
    const evidence = Object.assign({}, template.evidence_stub, overrides.evidence || {}, {claim, quote, confidence:text(overrides.confidence || overrides.evidence?.confidence || template.evidence_stub.confidence, template.evidence_stub.confidence)});
    return {
      source_packet_version: PACKET_SCHEMA,
      builder_version: BUILDER_VERSION,
      workflow_version: VERSION,
      template_model: TEMPLATE_MODEL,
      built_at: generatedAt,
      source_packets: [{
        packet_id: packetId,
        template_id: template.template_id,
        source_type: template.source_type,
        evidence_type: template.evidence_type,
        title,
        url,
        captured_at: text(overrides.captured_at || generatedAt),
        freshness_window_days: Number(overrides.freshness_window_days || 30),
        engagement: Object.assign({}, template.default_engagement, overrides.engagement || {}),
        evidence: [evidence],
        template_warning: template.warning
      }],
      builder_report: {
        builder_version: VERSION,
        packet_schema: PACKET_SCHEMA,
        built_at: generatedAt,
        packet_count: 1,
        evidence_item_count: 1,
        live_fetching_performed: false,
        verification_claimed: false,
        queue_only_recommended: true,
        scoring_review: {
          review_version: VERSION,
          builder_version: BUILDER_VERSION,
          item_count: 1,
          high_reliability_count: 0,
          weak_traceability_count: url ? 0 : 1,
          attention_without_reliability_count: template.template_id === 'reddit_thread' ? 1 : 0,
          calibration_warning_count: 1,
          risk_flags: template.template_id === 'reddit_thread' ? ['attention_is_not_reliability'] : [],
          calibration_warnings: [template.warning],
          release_gate: 'review_required',
          explanation: 'Template output is a local drafting scaffold. It does not verify source truth or perform live fetching.'
        },
        template_id: template.template_id,
        template_model: TEMPLATE_MODEL,
        policy: 'local_manual_source_packet_template_no_fetch_no_verification'
      }
    };
  }
  function templateReport(activeTemplateId){
    const active = getTemplate(activeTemplateId || 'generic_article');
    return {
      template_report_version: VERSION,
      template_model: TEMPLATE_MODEL,
      generated_at: new Date().toISOString(),
      template_count: TEMPLATES.length,
      active_template_id: active.template_id,
      available_template_ids: TEMPLATES.map((item) => item.template_id),
      live_fetching_performed: false,
      verification_claimed: false,
      source_behavior_changed: false,
      provider_behavior_changed: false,
      release_gate: 'template_presets_ready',
      warnings: TEMPLATES.map((item) => `${item.template_id}: ${item.warning}`),
      policy: 'local_manual_source_packet_templates_no_fetch_no_verification'
    };
  }

  root.sourcePacketTemplates = Object.freeze({
    VERSION,
    TEMPLATE_MODEL,
    PACKET_SCHEMA,
    BUILDER_VERSION,
    listTemplates,
    getTemplate,
    sourcePacketFromTemplate,
    templateReport
  });
})(typeof window !== 'undefined' ? window : globalThis);
