/* Jarbou3i Research Engine source import adapter v1.1.0-rc.0. Manual Source Import V2. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.1.0-rc.0';
  const URL_RE = /https?:\/\/[^\s)\]>"']+/gi;
  const DATE_RE = /\b(20\d{2}[-/.](0?[1-9]|1[0-2])[-/.](0?[1-9]|[12]\d|3[01])|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\s+\d{1,2},?\s+20\d{2}|\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\s+20\d{2})\b/i;
  const BULLET_RE = /^\s*(?:[-*•]|\d+[.)]|\[[x ]\])\s+/;

  function normalizeText(text){return String(text || '').replace(/\r\n/g,'\n').replace(/\t/g,'  ').trim();}
  function unique(values){return [...new Set((values || []).filter(Boolean))];}
  function stableHash(text){const s=String(text||''); let h=0; for(let i=0;i<s.length;i++) h=Math.imul(31,h)+s.charCodeAt(i)|0; return Math.abs(h).toString(36).padStart(6,'0');}
  function workspace(){return root.evidenceWorkspace || null;}
  function normalizeCandidate(candidate, context){return workspace()?.normalizeWorkspaceCandidate ? workspace().normalizeWorkspaceCandidate(candidate, context) : candidate;}
  function enhanceReport(report, evidence){return workspace()?.importReportEnhancement ? workspace().importReportEnhancement(report, evidence) : report;}
  function inferFormat(text, requested='auto'){
    if(requested && requested !== 'auto') return requested;
    const lower=String(text||'').toLowerCase();
    if(/^\s*[\[{]/.test(String(text||'')) && /source_packet_version|source_packets|packet_id|\"evidence\"/.test(String(text||''))) return 'source_packet';
    if(lower.includes('source_packet_version') || lower.includes('manual_source_packet')) return 'source_packet';
    if(lower.includes('last 30 days') || lower.includes('last30days') || lower.includes('engagement') || lower.includes('recency')) return 'last30days';
    if(lower.includes('deep research') || lower.includes('research plan') || lower.includes('sources') || lower.includes('findings')) return 'deep_research';
    return 'generic_research_report';
  }
  function inferSourceType(text, url){
    const blob=`${text||''} ${url||''}`.toLowerCase();
    if(/\.gov|government|ministry|commission|official|ec\.europa|europa\.eu|un\.org|worldbank|imf\.org/.test(blob)) return 'official';
    if(/doi\.org|journal|university|academic|paper|arxiv|ssrn|jstor|springer|nature|science/.test(blob)) return 'academic';
    if(/github\.com|release|commit|repository|repo\b/.test(blob)) return 'primary';
    if(/youtube|reddit|x\.com|twitter|tiktok|instagram|hacker news|news\.ycombinator|hn\.algolia/.test(blob)) return 'social';
    if(/polymarket|market|prediction|price|odds|betting/.test(blob)) return 'market';
    if(/reuters|apnews|bbc|guardian|ft\.com|nytimes|washingtonpost|politico|euronews|dw\.com|aljazeera|cnn|bloomberg/.test(blob)) return 'news';
    if(/expert|interview|testimony|analyst|commentary/.test(blob)) return 'expert';
    return 'other';
  }
  function normalizeDate(raw){
    if(!raw) return 'unknown';
    const s=String(raw).replace(/[/.]/g,'-').trim();
    const iso=s.match(/20\d{2}-\d{1,2}-\d{1,2}/);
    if(iso){const [y,m,d]=iso[0].split('-'); return `${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`;}
    return s;
  }
  function stripMarkup(line){return String(line||'').replace(BULLET_RE,'').replace(/[#*_`>]+/g,'').replace(/\[(.*?)\]\((https?:\/\/[^\s)]+)\)/g,'$1 $2').replace(/\s+/g,' ').trim();}
  function claimFromLine(line){const cleaned=stripMarkup(line).replace(URL_RE,'').replace(/\b(source|url|link|date|published|retrieved)\s*[:=]\s*/gi,'').trim(); return cleaned.length>260?`${cleaned.slice(0,257)}…`:cleaned;}
  function sourceTitleFromLine(line, url, idx){
    const md=String(line||'').match(/\[([^\]]{3,120})\]\(https?:\/\/[^\s)]+\)/); if(md) return md[1].trim();
    const after=String(line||'').match(/(?:source|title|publication)\s*[:=]\s*([^\n|;]{3,120})/i); if(after) return stripMarkup(after[1]);
    if(url){try{return new URL(url).hostname.replace(/^www\./,'');}catch(_){}}
    const cleaned=claimFromLine(line); return cleaned?cleaned.slice(0,90):`Imported source ${idx}`;
  }
  function extractCandidateLines(text){
    const lines=normalizeText(text).split('\n').map(x=>x.trim()).filter(Boolean);
    const candidates=[];
    for(const line of lines){
      const hasUrl=(line.match(URL_RE)||[]).length>0;
      const looksBullet=BULLET_RE.test(line);
      const hasClaimMarker=/\b(claim|finding|evidence|source|signal|observation|result|because|shows|indicates|reported|according|contradicts|counter)\b/i.test(line);
      if(hasUrl || looksBullet || hasClaimMarker){const cleaned=stripMarkup(line); if(cleaned.length>18) candidates.push(cleaned);}
    }
    if(!candidates.length && text.trim()) return text.split(/(?<=[.!?])\s+/).map(x=>x.trim()).filter(x=>x.length>35).slice(0,8);
    return candidates.slice(0,40);
  }
  function scoreLine(line, format){
    const hasUrl=(line.match(URL_RE)||[]).length>0;
    const hasDate=DATE_RE.test(line);
    const strongType=['official','academic','primary','news'].includes(inferSourceType(line,(line.match(URL_RE)||[])[0]||''));
    const publicSignal=/engagement|views|upvotes|likes|shares|comments|trend|viral|polymarket|odds|reddit|youtube|x\.com|twitter|tiktok/i.test(line)?4:1;
    return {
      evidence_strength:Math.max(1,Math.min(5,2+(hasUrl?1:0)+(hasDate?1:0)+(strongType?1:0))),
      public_signal_score:Math.max(1,Math.min(5,publicSignal)),
      time_relevance_score:format==='last30days'?5:(hasDate?4:3)
    };
  }
  function linkHints(line){
    const supports = [];
    const contradicts = [];
    const ids = String(line || '').match(/\b[IANRTFSC]\d+\b/g) || [];
    const isCounter = /\b(contradicts|counter[- ]?evidence|weakens|disputes|inconsistent|opposes)\b/i.test(line);
    ids.forEach((id) => (isCounter ? contradicts : supports).push(id));
    return {supports:unique(supports), contradicts:unique(contradicts)};
  }
  function parseSourceImportText(text, options={}){
    const raw=normalizeText(text);
    const format=inferFormat(raw, options.format || 'auto');
    if(format === 'source_packet'){
      const importer = root.sourcePacketImporter;
      if(!importer || typeof importer.parseSourcePacketImportText !== 'function'){
        const report = enhanceReport({import_version:VERSION, imported_at:new Date().toISOString(), input_format:'source_packet', source_packet_schema:'manual_source_packet.v1', live_fetching_performed:false, verification_claimed:false, raw_fingerprint:stableHash(raw), detected_line_count:0, converted_count:0, rejected_count:1, source_type_count:0, url_count:0, date_count:0, source_types:[], queue_only:true, warnings:['source_packet_importer_missing'], rejected:[{reason:'source_packet_importer_missing'}]}, []);
        return {ok:false, evidence:[], report, warnings:['source_packet_importer_missing']};
      }
      return importer.parseSourcePacketImportText(raw, options);
    }
    const lines=extractCandidateLines(raw);
    const warnings=[];
    if(!raw) warnings.push('empty import text');
    if(!lines.length) warnings.push('no importable claim lines detected');
    const evidence=[]; const rejected=[];
    lines.forEach((line,idx)=>{
      const urls=unique(line.match(URL_RE)||[]);
      const primaryUrl=urls[0]||'';
      const claim=claimFromLine(line);
      if(!claim || claim.length<12){rejected.push({line_index:idx+1, reason:'claim_too_short', preview:line.slice(0,120)}); return;}
      const dateMatch=line.match(DATE_RE);
      const scores=scoreLine(line, format);
      const sourceType=inferSourceType(line, primaryUrl);
      const links = linkHints(line);
      const candidate = {
        evidence_id:`IMP${evidence.length+1}`,
        claim,
        source_title:sourceTitleFromLine(line, primaryUrl, evidence.length+1),
        source_url:primaryUrl,
        source_type:sourceType,
        source_date:normalizeDate(dateMatch ? dateMatch[0] : ''),
        time_relevance_score:scores.time_relevance_score,
        evidence_strength:scores.evidence_strength,
        public_signal_score:scores.public_signal_score,
        supports:links.supports,
        contradicts:links.contradicts,
        confidence:primaryUrl?'medium':'low',
        notes:`Imported from ${format}; raw candidate must be reviewed, classified, linked, and accepted/rejected before synthesis.`,
        import_meta:{format, import_adapter_model:'source_import_v2', source_urls:urls, raw_hash:stableHash(line), verification_status:'unverified_manual_import', live_fetching_performed:false, verification_claimed:false}
      };
      const normalized = normalizeCandidate(candidate, {origin:format});
      evidence.push(root.evidenceScorer?.attachEvidenceScoring ? root.evidenceScorer.attachEvidenceScoring(normalized) : normalized);
    });
    const sourceTypes=unique(evidence.map(e=>e.source_type));
    const baseReport={
      import_version:VERSION,
      imported_at:new Date().toISOString(),
      input_format:format,
      live_fetching_performed:false,
      verification_claimed:false,
      raw_fingerprint:stableHash(raw),
      detected_line_count:lines.length,
      converted_count:evidence.length,
      rejected_count:rejected.length,
      source_type_count:sourceTypes.length,
      url_count:evidence.filter(e=>e.source_url).length,
      date_count:evidence.filter(e=>e.source_date && e.source_date!=='unknown').length,
      source_types:sourceTypes,
      warnings,
      rejected,
      queue_only:true,
      policy:'manual_source_import_v2_no_fetch_no_verification'
    };
    const report = enhanceReport(baseReport, evidence);
    return {ok:evidence.length>0, evidence, report, warnings};
  }
  function previewSourceImport(text, options={}){
    const parsed=parseSourceImportText(text, options);
    return {preview_version:VERSION, ok:parsed.ok, report:parsed.report, sample_evidence:parsed.evidence.slice(0,5), warnings:parsed.warnings};
  }
  root.sourceImportAdapter={VERSION,inferFormat,inferSourceType,parseSourceImportText,previewSourceImport};
})(typeof window !== 'undefined' ? window : globalThis);
