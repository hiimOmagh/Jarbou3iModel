/* Jarbou3i Research Engine source packet importer v1.1.0-alpha.4. No live fetching. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.1.0-alpha.4';
  const PACKET_SCHEMA = 'manual_source_packet.v1';

  function text(value, fallback = ''){ return String(value ?? fallback).trim(); }
  function asArray(value){ return Array.isArray(value) ? value : (value === undefined || value === null || value === '' ? [] : [value]); }
  function stableHash(value){ const s = typeof value === 'string' ? value : JSON.stringify(value || {}); let h = 0; for(let i = 0; i < s.length; i += 1) h = Math.imul(31, h) + s.charCodeAt(i) | 0; return Math.abs(h).toString(36).padStart(6, '0'); }
  function clampScore(value, fallback = 3){ const n = Number(value); return Math.max(1, Math.min(5, Number.isFinite(n) ? n : fallback)); }
  function confidence(value){ const v = text(value || 'medium').toLowerCase(); return ['low','medium','high'].includes(v) ? v : 'medium'; }
  function normalizeDate(value){
    const raw = text(value);
    if(!raw) return 'unknown';
    const d = new Date(raw);
    if(Number.isFinite(d.getTime())) return d.toISOString().slice(0, 10);
    const iso = raw.match(/20\d{2}[-/.]\d{1,2}[-/.]\d{1,2}/);
    if(iso){ const [y,m,day] = iso[0].replace(/[/.]/g,'-').split('-'); return `${y}-${m.padStart(2,'0')}-${day.padStart(2,'0')}`; }
    return raw.slice(0, 32);
  }
  function sourceType(value){
    const v = text(value || 'other').toLowerCase();
    if(['official','government','regulator','institutional'].includes(v)) return 'official';
    if(['academic','paper','journal','study'].includes(v)) return 'academic';
    if(['news','article','web_article','press'].includes(v)) return 'news';
    if(['reddit_thread','reddit_comment','x_post','twitter_post','youtube_video','youtube_transcript','tiktok_video','hn_thread','social'].includes(v)) return 'social';
    if(['polymarket','prediction_market','market'].includes(v)) return 'market';
    if(['github','repo','release','commit','primary','primary_document'].includes(v)) return 'primary';
    if(['expert','interview','testimony','commentary'].includes(v)) return 'expert';
    return 'other';
  }
  function numeric(value){ const n = Number(value); return Number.isFinite(n) && n >= 0 ? n : 0; }
  function engagementScore(engagement = {}){
    const total = numeric(engagement.upvotes) + numeric(engagement.likes) + numeric(engagement.comments) + numeric(engagement.shares) + numeric(engagement.saves);
    const views = numeric(engagement.views);
    if(views >= 1000000 || total >= 20000) return 5;
    if(views >= 100000 || total >= 5000) return 4;
    if(views >= 10000 || total >= 1000) return 3;
    if(views > 0 || total > 0) return 2;
    return 1;
  }
  function evidenceStrength(packet, item){
    return clampScore(2 + (text(packet.url) ? 1 : 0) + (text(item.quote || item.excerpt) ? 1 : 0) + (text(packet.captured_at || packet.published_at) ? 1 : 0), 3);
  }
  function normalizeEvidencePacket(packet, item, index, packetIndex){
    const claim = text(item.claim || item.finding || item.summary || item.title);
    const quote = text(item.quote || item.excerpt || item.snippet);
    const title = text(packet.title || packet.source_title || packet.name, `Manual source packet ${packetIndex + 1}`);
    const url = text(packet.url || packet.source_url);
    const type = sourceType(packet.source_type || packet.type || item.source_type);
    const candidate = {
      evidence_id: `IMP${packetIndex + 1}-${index + 1}`,
      claim: claim || quote || title,
      source_title: title,
      source_url: url,
      source_type: type,
      source_date: normalizeDate(packet.captured_at || packet.published_at || packet.source_date),
      time_relevance_score: clampScore(packet.freshness_window_days ? 5 : 4, 4),
      evidence_strength: evidenceStrength(packet, item),
      public_signal_score: engagementScore(packet.engagement || item.engagement || {}),
      supports: asArray(item.supports).map(String),
      contradicts: asArray(item.contradicts).map(String),
      confidence: confidence(item.confidence),
      notes: [
        quote ? `Quote/excerpt: ${quote.slice(0, 220)}${quote.length > 220 ? '…' : ''}` : '',
        'Imported from manual source packet; review source metadata and claim before synthesis.'
      ].filter(Boolean).join(' '),
      import_meta: {
        format: 'source_packet',
        source_packet_schema: PACKET_SCHEMA,
        packet_id: text(packet.packet_id || packet.id, `packet-${packetIndex + 1}`),
        raw_fingerprint: stableHash({packet_id:packet.packet_id || packet.id, claim, quote, url}),
        verification_status: 'unverified_manual_import',
        live_fetching_performed: false,
        verification_claimed: false,
        source_packet_scoring_review: item.scoring_review && typeof item.scoring_review === 'object' ? Object.assign({}, item.scoring_review, {attention_is_truth_score:false}) : null,
        scoring_review_preserved: !!(item.scoring_review && typeof item.scoring_review === 'object'),
        engagement: Object.assign({}, packet.engagement || item.engagement || {})
      }
    };
    return root.evidenceScorer?.attachEvidenceScoring ? root.evidenceScorer.attachEvidenceScoring(candidate) : candidate;
  }
  function packetsFrom(value){
    if(Array.isArray(value)) return value;
    if(value && Array.isArray(value.source_packets)) return value.source_packets;
    if(value && Array.isArray(value.packets)) return value.packets;
    if(value && (Array.isArray(value.evidence) || Array.isArray(value.findings))) return [value];
    return [];
  }
  function parseJson(textValue){
    const raw = text(textValue);
    if(!raw) return {ok:false, data:null, error:'empty_packet_text'};
    try { return {ok:true, data:JSON.parse(raw), error:null}; }
    catch(error){ return {ok:false, data:null, error:'invalid_source_packet_json'}; }
  }
  function parseSourcePacketImportValue(value, options = {}){
    const warnings = [];
    const rejected = [];
    const packets = packetsFrom(value);
    if(!packets.length) warnings.push('no source packets detected');
    const evidence = [];
    packets.forEach((packet, packetIndex) => {
      const items = asArray(packet.evidence || packet.findings || packet.claims);
      if(!items.length){ rejected.push({packet_index:packetIndex + 1, reason:'packet_has_no_evidence'}); return; }
      items.forEach((item, evidenceIndex) => {
        if(!item || typeof item !== 'object'){ rejected.push({packet_index:packetIndex + 1, evidence_index:evidenceIndex + 1, reason:'evidence_item_not_object'}); return; }
        const candidate = normalizeEvidencePacket(packet, item, evidenceIndex, packetIndex);
        if(!candidate.claim || candidate.claim.length < 8){ rejected.push({packet_index:packetIndex + 1, evidence_index:evidenceIndex + 1, reason:'claim_too_short'}); return; }
        evidence.push(candidate);
      });
    });
    const sourceTypes = [...new Set(evidence.map((item) => item.source_type).filter(Boolean))];
    const report = {
      import_version: VERSION,
      imported_at: new Date().toISOString(),
      input_format: 'source_packet',
      source_packet_schema: PACKET_SCHEMA,
      live_fetching_performed: false,
      verification_claimed: false,
      raw_fingerprint: stableHash(value),
      packet_count: packets.length,
      detected_line_count: evidence.length,
      converted_count: evidence.length,
      rejected_count: rejected.length,
      source_type_count: sourceTypes.length,
      url_count: evidence.filter((item) => item.source_url).length,
      date_count: evidence.filter((item) => item.source_date && item.source_date !== 'unknown').length,
      source_types: sourceTypes,
      queue_only: true,
      warnings,
      rejected,
      policy: 'manual_import_only_no_fetch_no_verification'
    };
    return {ok:evidence.length > 0, evidence, report, warnings};
  }
  function parseSourcePacketImportText(textValue, options = {}){
    const parsed = parseJson(textValue);
    if(!parsed.ok){
      const report = {
        import_version: VERSION,
        imported_at: new Date().toISOString(),
        input_format: 'source_packet',
        source_packet_schema: PACKET_SCHEMA,
        live_fetching_performed: false,
        verification_claimed: false,
        raw_fingerprint: stableHash(textValue),
        packet_count: 0,
        detected_line_count: 0,
        converted_count: 0,
        rejected_count: 1,
        source_type_count: 0,
        url_count: 0,
        date_count: 0,
        source_types: [],
        queue_only: true,
        warnings: [parsed.error],
        rejected: [{reason: parsed.error}],
        policy: 'manual_import_only_no_fetch_no_verification'
      };
      return {ok:false, evidence:[], report, warnings:report.warnings};
    }
    return parseSourcePacketImportValue(parsed.data, options);
  }
  function examplePacket(){
    return {
      source_packet_version: PACKET_SCHEMA,
      source_packets: [{
        packet_id: 'example-reddit-2026-04-22',
        source_type: 'reddit_thread',
        title: 'Public discussion about an energy-policy vote',
        url: 'https://example.com/thread',
        captured_at: '2026-04-22T12:00:00.000Z',
        freshness_window_days: 30,
        engagement: {upvotes: 1200, comments: 340},
        evidence: [
          {claim: 'Public discourse concentrated on implementation risk rather than headline capacity targets.', quote: 'Most top comments focused on procurement opacity and grid readiness.', confidence: 'medium', supports: ['N1'], contradicts: []}
        ]
      }]
    };
  }

  root.sourcePacketImporter = Object.freeze({VERSION, PACKET_SCHEMA, parseSourcePacketImportText, parseSourcePacketImportValue, normalizeEvidencePacket, examplePacket});
})(typeof window !== 'undefined' ? window : globalThis);
