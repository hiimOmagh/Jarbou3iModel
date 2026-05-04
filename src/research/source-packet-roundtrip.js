/* Jarbou3i Research Engine source packet export/import roundtrip QA v1.0.29. Local/manual only. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.0.29';
  const ROUNDTRIP_MODEL = 'source_packet_roundtrip.v1';
  const PACKET_SCHEMA = 'manual_source_packet.v1';
  function arr(value){ return Array.isArray(value) ? value : (value === undefined || value === null || value === '' ? [] : [value]); }
  function now(options = {}){ return options.now || new Date().toISOString(); }
  function text(value, fallback = ''){ return String(value ?? fallback).trim(); }
  function countPacketEvidence(packet){ return arr(packet?.source_packets).reduce((sum, sourcePacket) => sum + arr(sourcePacket?.evidence).length, 0); }
  function sourcePacketEvidence(packet){ return arr(packet?.source_packets).flatMap((sourcePacket) => arr(sourcePacket?.evidence)); }
  function scoringReviewPreserved(importedEvidence = []){
    const imported = arr(importedEvidence);
    if(!imported.length) return false;
    return imported.every((item) => {
      const review = item?.import_meta?.source_packet_scoring_review;
      return !!review && review.attention_is_truth_score === false && Number.isFinite(Number(review.reliability_score || 0));
    });
  }
  function buildRoundtripReport(packet, parsed, options = {}){
    const importedEvidence = arr(parsed?.evidence);
    const scoreReport = root.evidenceScorer?.scoreEvidenceSet ? root.evidenceScorer.scoreEvidenceSet(importedEvidence, {now: now(options), version: VERSION}) : null;
    const exportedCount = countPacketEvidence(packet);
    const importedCount = importedEvidence.length;
    const risks = [];
    if(packet?.source_packet_version !== PACKET_SCHEMA) risks.push('packet_schema_mismatch');
    if(packet?.builder_version !== 'source_packet_builder.v1') risks.push('builder_version_mismatch');
    if(packet?.builder_report?.live_fetching_performed !== false || parsed?.report?.live_fetching_performed !== false) risks.push('live_fetching_boundary_failed');
    if(packet?.builder_report?.verification_claimed !== false || parsed?.report?.verification_claimed !== false) risks.push('verification_claim_boundary_failed');
    if(exportedCount !== importedCount) risks.push('evidence_count_mismatch');
    if(!parsed?.report?.queue_only) risks.push('queue_only_not_preserved');
    if(!importedEvidence.every((item) => item?.import_meta?.live_fetching_performed === false && item?.import_meta?.verification_claimed === false)) risks.push('import_meta_boundary_failed');
    if(!importedEvidence.every((item) => item?.evidence_scoring?.attention_is_truth_score === false)) risks.push('attention_truth_guard_failed');
    if(!scoringReviewPreserved(importedEvidence)) risks.push('scoring_review_not_preserved');
    return {
      roundtrip_version: VERSION,
      roundtrip_model: ROUNDTRIP_MODEL,
      generated_at: now(options),
      builder_version: packet?.builder_version || 'unknown',
      packet_schema: packet?.source_packet_version || 'unknown',
      exported_packet_count: arr(packet?.source_packets).length,
      exported_evidence_item_count: exportedCount,
      reimported_evidence_item_count: importedCount,
      scored_reimported_evidence_item_count: importedEvidence.filter((item) => item?.evidence_scoring?.scoring_version === 'evidence_scoring.v1').length,
      review_queue_target: 'evidence_review_queue',
      live_fetching_performed: false,
      verification_claimed: false,
      attention_is_truth_score: false,
      scoring_review_preserved: scoringReviewPreserved(importedEvidence),
      queue_only_preserved: parsed?.report?.queue_only === true,
      privacy_boundary_preserved: !risks.includes('live_fetching_boundary_failed') && !risks.includes('verification_claim_boundary_failed') && !risks.includes('import_meta_boundary_failed'),
      score_report: scoreReport,
      release_gate: risks.length ? 'roundtrip_review_required' : 'roundtrip_qa_pass',
      risk_flags: risks,
      policy: 'local_manual_source_packet_export_import_roundtrip_no_fetch_no_verification'
    };
  }
  function runSourcePacketRoundtrip(items = [], options = {}){
    const builder = root.sourcePacketBuilder;
    const importer = root.sourcePacketImporter;
    if(!builder || typeof builder.buildSourcePacket !== 'function') throw new Error('source_packet_builder_missing');
    if(!importer || typeof importer.parseSourcePacketImportText !== 'function') throw new Error('source_packet_importer_missing');
    const packet = builder.buildSourcePacket(items, {now: now(options)});
    const exportedText = JSON.stringify(packet, null, 2);
    const parsed = importer.parseSourcePacketImportText(exportedText, {now: now(options)});
    const report = buildRoundtripReport(packet, parsed, options);
    return {ok: parsed.ok && report.release_gate === 'roundtrip_qa_pass', packet, exported_text: exportedText, parsed, report};
  }
  root.sourcePacketRoundtrip = Object.freeze({
    VERSION,
    ROUNDTRIP_MODEL,
    PACKET_SCHEMA,
    runSourcePacketRoundtrip,
    buildRoundtripReport,
    countPacketEvidence,
    sourcePacketEvidence,
    scoringReviewPreserved
  });
})(typeof window !== 'undefined' ? window : globalThis);
