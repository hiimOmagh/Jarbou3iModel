/* Jarbou3i Research Engine entity intelligence layer v1.1.0-alpha.16. Local-only, no model download. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.1.0-alpha.16';
  const MODEL = 'entity_intelligence_layer.v1';
  const DEFAULT_IGNORE = new Set(['the','this','that','these','those','source','evidence','report','analysis','claim','official','social','news','manual','public','thread','note','sample','demo','january','february','march','april','may','june','july','august','september','october','november','december']);
  const ORG_SUFFIX = /\b(inc|corp|corporation|company|co|ltd|llc|group|agency|department|ministry|commission|council|committee|university|institute|bank|fund|foundation|association|alliance|union|government|administration|office|organization|organisation)\b/i;
  const POLICY_HINT = /\b(policy|policies|regulation|regulatory|law|act|sanction|export control|controls|ban|tariff|rule|directive|framework|treaty|agreement|restriction|license|licence)\b/i;
  const TECH_HINT = /\b(ai|chip|chips|semiconductor|model|platform|api|software|hardware|cloud|gpu|compute|algorithm|dataset|repo|repository|release|commit|android|oauth|pkce|backend|provider)\b/i;
  const EVENT_HINT = /\b(war|crisis|election|summit|launch|release|incident|attack|protest|hearing|trial|meeting|conference|vote|strike|invasion|escalation)\b/i;
  const LOCATION_HINTS = new Set(['china','taiwan','united states','us','usa','europe','eu','germany','france','tunisia','koblenz','beijing','washington','brussels','indo-pacific','south china sea','global south']);

  function text(value, fallback = ''){ return String(value ?? fallback).trim(); }
  function asArray(value){ return Array.isArray(value) ? value.filter(Boolean) : (value === undefined || value === null || value === '' ? [] : [value]); }
  function unique(values){ return [...new Set((values || []).filter(Boolean).map(String))]; }
  function slug(value){ return text(value).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9\u0600-\u06ff]+/gi,' ').replace(/\s+/g,' ').trim(); }
  function canonical(value){ return slug(value).replace(/^the\s+/,''); }
  function initials(value){ return text(value).split(/\s+/).filter(Boolean).map((x)=>x[0]).join('').toUpperCase(); }
  function clamp(value, min = 0, max = 100, fallback = 0){ const n = Number(value); return Math.max(min, Math.min(max, Number.isFinite(n) ? n : fallback)); }
  function hostFromUrl(url){ try { return new URL(text(url)).hostname.replace(/^www\./,''); } catch (_) { return ''; } }
  function levenshtein(a,b){
    a=canonical(a); b=canonical(b); if(a===b) return 0; if(!a) return b.length; if(!b) return a.length;
    const dp=Array.from({length:a.length+1},(_,i)=>[i]);
    for(let j=1;j<=b.length;j++) dp[0][j]=j;
    for(let i=1;i<=a.length;i++) for(let j=1;j<=b.length;j++) dp[i][j]=Math.min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
    return dp[a.length][b.length];
  }
  function similarity(a,b){ const aa=canonical(a), bb=canonical(b); const max=Math.max(aa.length,bb.length,1); return 1-(levenshtein(aa,bb)/max); }
  function shouldIgnore(name, ignoreList){ const c=canonical(name); const all=new Set([...DEFAULT_IGNORE, ...asArray(ignoreList).map(canonical)]); return !c || c.length<2 || all.has(c) || /^\d+$/.test(c); }
  function sourceText(item){ return [item.claim, item.source_title, item.notes].map(text).filter(Boolean).join(' '); }
  function extractCandidateNames(value){
    const src=text(value).replace(/https?:\/\/\S+/g,' ');
    const out=[];
    const quoted=[...src.matchAll(/[“"']([^“"'\n]{2,80})[”"']/g)].map(m=>m[1]);
    out.push(...quoted);
    const caps=[...src.matchAll(/\b(?:[A-Z][A-Za-z0-9&.'’\-]+|[A-Z]{2,10})(?:\s+(?:[A-Z][A-Za-z0-9&.'’\-]+|[A-Z]{2,10})){0,5}\b/g)].map(m=>m[0]);
    out.push(...caps);
    const arabic=[...src.matchAll(/[\u0600-\u06ff]{3,}(?:\s+[\u0600-\u06ff]{3,}){0,4}/g)].map(m=>m[0]);
    out.push(...arabic);
    return unique(out.map((x)=>text(x).replace(/[,:;.!?()[\]{}]+$/,'')).filter((x)=>x.length>=2 && x.length<=90));
  }
  function classifyEntity(name, context=''){
    const blob=`${name} ${context}`.toLowerCase(); const c=canonical(name);
    if(LOCATION_HINTS.has(c) || /\b(sea|strait|city|province|state|region|republic|kingdom)\b/i.test(name)) return 'location';
    if(ORG_SUFFIX.test(name) || /^[A-Z]{2,10}$/.test(text(name)) || /\b(nato|eu|asean|tsmc|openai|github|youtube|reddit|google|microsoft|apple|nvidia|pla|imf|world bank|brics)\b/i.test(blob)) return 'organization';
    if(POLICY_HINT.test(blob)) return 'policy';
    if(TECH_HINT.test(blob)) return /\b(youtube|reddit|github|x|twitter|tiktok|platform)\b/i.test(blob) ? 'platform' : 'technology';
    if(EVENT_HINT.test(blob)) return 'event';
    if(/^[A-Z][a-z]+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?$/.test(text(name))) return 'person';
    return 'other';
  }
  function mergeKey(name, existingKeys){
    const c=canonical(name); const init=initials(name);
    for(const key of existingKeys){
      if(key===c) return key;
      const ki=initials(key);
      if(init && init.length>=2 && init===ki) return key;
      if(Math.min(c.length,key.length)>=5 && similarity(c,key)>=0.86) return key;
    }
    return c;
  }
  function clusterIdsForEvidence(evidenceId, clusters=[]){
    return (clusters||[]).filter((cluster)=>asArray(cluster.evidence_ids).includes(evidenceId)).map((cluster)=>cluster.cluster_id);
  }
  function buildEntityProfiles(evidence=[], clusters=[], options={}){
    const ignoreList=options.ignore_list || options.ignoreList || [];
    const map=new Map(); const ignored=[]; const aliasMerges=[];
    for(const item of evidence||[]){
      const src=sourceText(item); const candidates=extractCandidateNames(src);
      for(const raw of candidates){
        const name=text(raw).replace(/^['"“”]+|['"“”]+$/g,'');
        if(shouldIgnore(name, ignoreList)){ ignored.push(name); continue; }
        const key=mergeKey(name, [...map.keys()]);
        if(key!==canonical(name)) aliasMerges.push({alias:name, canonical:key});
        const profile=map.get(key) || {entity_id:`ENT${map.size+1}`, entity_version:VERSION, entity_model:MODEL, canonical_name:name, normalized_name:key, category:classifyEntity(name,src), aliases:[], mention_count:0, evidence_ids:[], cluster_ids:[], source_types:[], source_domains:[], claim_mentions:[], confidence_mix:[], first_seen_evidence_id:item.evidence_id||null, ignore_list_hit:false};
        if(profile.category==='other') profile.category=classifyEntity(name,src);
        if(canonical(profile.canonical_name).length>key.length && name.length<profile.canonical_name.length) profile.canonical_name=name;
        profile.aliases=unique([...profile.aliases, name, raw].filter((v)=>canonical(v)!==canonical(profile.canonical_name)));
        profile.mention_count+=1;
        profile.evidence_ids=unique([...profile.evidence_ids, item.evidence_id || 'UNNUMBERED']);
        profile.cluster_ids=unique([...profile.cluster_ids, ...clusterIdsForEvidence(item.evidence_id, clusters)]);
        profile.source_types=unique([...profile.source_types, item.source_type || 'other']);
        const host=hostFromUrl(item.source_url); if(host) profile.source_domains=unique([...profile.source_domains, host]);
        profile.claim_mentions=unique([...profile.claim_mentions, text(item.claim).slice(0,180)]).slice(0,8);
        profile.confidence_mix=unique([...profile.confidence_mix, item.confidence || 'medium']);
        map.set(key, profile);
      }
    }
    const profiles=[...map.values()].map((profile,idx)=>{
      const sourceDiversity=profile.source_types.length; const clusterLinks=profile.cluster_ids.length; const mentions=profile.mention_count;
      const reviewFlags=[];
      if(!profile.cluster_ids.length) reviewFlags.push('entity_cluster_link_missing');
      if(profile.source_types.length<=1 && profile.mention_count>1) reviewFlags.push('entity_source_type_concentration');
      if(profile.category==='other') reviewFlags.push('entity_category_review_required');
      const score=clamp(mentions*15 + sourceDiversity*15 + clusterLinks*20 + (profile.source_domains.length?10:0),0,100,0);
      return Object.assign(profile,{entity_id:`ENT${idx+1}`, strategic_relevance_score:score, review_flags:reviewFlags, review_gate:reviewFlags.length?'entity_review_required':'entity_reviewable', live_fetching_performed:false, verification_claimed:false});
    }).sort((a,b)=>b.strategic_relevance_score-a.strategic_relevance_score || b.mention_count-a.mention_count || a.canonical_name.localeCompare(b.canonical_name));
    return profiles.map((profile,idx)=>Object.assign({},profile,{entity_id:`ENT${idx+1}`}));
  }
  function categoryCounts(profiles=[]){ const out={}; for(const p of profiles) out[p.category]=(out[p.category]||0)+1; return out; }
  function buildEntityAliasReport(profiles=[], options={}){
    return {entity_alias_report_version:options.version||VERSION, entity_model:MODEL, generated_at:options.now||new Date().toISOString(), entity_count:profiles.length, alias_count:profiles.reduce((sum,p)=>sum+(p.aliases||[]).length,0), fuzzy_merge_policy:'canonical_normalization_initials_and_levenshtein_0_86', ignore_list_count:asArray(options.ignore_list || options.ignoreList).length, live_fetching_performed:false, verification_claimed:false};
  }
  function buildEntityMapReport(profiles=[], evidence=[], clusters=[], options={}){
    const category_count=categoryCounts(profiles); const review_required=profiles.filter(p=>p.review_gate!=='entity_reviewable').length;
    const flags=[]; if(!profiles.length) flags.push('entity_profiles_empty'); if(review_required) flags.push('entity_review_required'); if(!profiles.some(p=>p.category==='organization')) flags.push('organization_entity_gap'); if(!profiles.some(p=>p.cluster_ids.length)) flags.push('entity_cluster_links_missing');
    return {entity_map_report_version:options.version||VERSION, entity_model:MODEL, generated_at:options.now||new Date().toISOString(), entity_count:profiles.length, evidence_count:(evidence||[]).length, cluster_count:(clusters||[]).length, category_count, review_required_count:review_required, top_entities:profiles.slice(0,10).map(p=>({entity_id:p.entity_id, name:p.canonical_name, category:p.category, score:p.strategic_relevance_score, evidence_ids:p.evidence_ids, cluster_ids:p.cluster_ids})), entity_gap_flags:flags, recommendations:flags.map(flag=>({entity_profiles_empty:'Add reviewed evidence before relying on entity intelligence.',entity_review_required:'Review entity categories, aliases, and cluster links before publication.',organization_entity_gap:'Check whether key actors/organizations are missing from the evidence set.',entity_cluster_links_missing:'Link entities to source clusters before strategic synthesis.'}[flag]||`Review entity gap: ${flag}`)), release_gate:flags.length?'entity_review_required':'entity_map_ready', policy:'local_entity_extraction_no_external_model_no_fetch_no_verification', live_fetching_performed:false, verification_claimed:false};
  }
  function buildEntityIntelligence(evidence=[], clusters=[], options={}){
    const profiles=buildEntityProfiles(evidence, clusters, options);
    const entity_map_report=buildEntityMapReport(profiles, evidence, clusters, options);
    const entity_alias_report=buildEntityAliasReport(profiles, options);
    return {entity_intelligence_version:options.version||VERSION, entity_model:MODEL, entity_profiles:profiles, entity_map_report, entity_alias_report, live_fetching_performed:false, verification_claimed:false};
  }
  root.entityIntelligence = Object.freeze({VERSION, MODEL, buildEntityProfiles, buildEntityMapReport, buildEntityAliasReport, buildEntityIntelligence, extractCandidateNames, classifyEntity, similarity, levenshtein});
})(typeof window !== 'undefined' ? window : globalThis);
