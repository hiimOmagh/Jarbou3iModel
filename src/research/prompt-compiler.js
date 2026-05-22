/* Jarbou3i Research Engine prompt compiler v1.1.0. Local/template-driven only. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.1.0-fix.2';
  const STOPWORDS = new Set('the a an and or but with without into from this that these those about for of in on to by is are was were be been being as at it its their his her our your they them he she we you i me my un une des les la le et ou mais avec sans dans sur de du en pour par est sont كان كانت تكون هذا هذه التي الذي من في على إلى عن مع ضد بين عبر وهو وهي هم نحن انا'.split(/\s+/));
  function text(value, fallback = ''){ return String(value ?? fallback).trim(); }
  function uniq(items, limit = 12){
    const out = [];
    for(const item of items || []){ const v = text(item); if(v && !out.some((x)=>x.toLowerCase()===v.toLowerCase())) out.push(v); if(out.length >= limit) break; }
    return out;
  }
  function words(value){
    return text(value).split(/[\s,;:،.!?()\[\]{}"'“”‘’/\\|]+/).map((w)=>w.trim()).filter((w)=>w.length > 2 && !STOPWORDS.has(w.toLowerCase()));
  }
  function keywords(topic, context){ return uniq(words(`${topic} ${context}`), 10); }
  function detectMode(raw, fallback){
    const t = text(raw).toLowerCase();
    if(/recent|today|latest|now|202[4-9]|آخر|حديث|حالي|actuel|récent/.test(t)) return 'recent';
    if(/source|evidence|citation|proof|مصدر|دليل|preuve|source/.test(t)) return 'source-heavy';
    if(/contradict|counter|risk|disprove|نقض|مضاد|risque|contre/.test(t)) return 'adversarial';
    return fallback || 'structural';
  }
  function scoreQuality(input){
    let score = 35;
    const topic = text(input.topic);
    const context = text(input.context);
    if(topic.length >= 24) score += 15;
    if(context.length >= 8 && !/not specified|غير محدد|non précisé/i.test(context)) score += 12;
    if((input.template?.required_layers || []).length >= 5) score += 10;
    if(words(`${topic} ${context}`).length >= 6) score += 10;
    if(/\d{4}|\bQ[1-4]\b|يناير|فبراير|مارس|avril|mai|juin/i.test(`${topic} ${context}`)) score += 8;
    if(/where|who|why|how|ما|من|كيف|لماذا|quoi|qui|comment|pourquoi/i.test(topic)) score += 5;
    return Math.max(0, Math.min(100, score));
  }
  function compile(input = {}){
    const topic = text(input.topic, 'Unspecified strategic research topic');
    const context = text(input.context, 'Context not specified');
    const template = input.template || {};
    const mode = detectMode(`${topic} ${context}`, input.mode);
    const kws = keywords(topic, context);
    const templateQuestions = uniq(template.plan_questions || [], 4);
    const templateSources = uniq(template.source_priorities || [], 6);
    const objective = `Explain the strategic structure behind ${topic} within ${context}, then identify evidence gaps, counter-arguments, and falsifiable scenarios before synthesis.`;
    const thesis = `${topic} should be treated as a system of incentives, actors, instruments, narratives, outcomes, and feedback loops rather than a single isolated event.`;
    const keyQuestions = uniq([
      `What is the clearest thesis that can be tested about ${topic}?`,
      `Which actors gain, lose, constrain, or amplify the outcome in ${context}?`,
      `Which tools or mechanisms convert actor incentives into observable results?`,
      `Which narrative could be wrong, incomplete, or strategically convenient?`,
      `Which evidence would disprove the current working thesis?`,
      ...templateQuestions
    ], 10);
    const evidenceNeeds = uniq([
      'primary official statement or document',
      'credible chronology with dates',
      'counter-position source',
      'actor behavior record',
      'implementation or outcome evidence',
      ...templateSources
    ], 10);
    const actors = uniq([...(template.output_focus || []).filter((x)=>/actor|platform|institution|coalition/i.test(x)), 'decision makers', 'affected groups', 'narrative brokers', 'external constraints'], 8);
    const tools = uniq(['legal/regulatory tools', 'financial incentives', 'media/narrative instruments', 'technical or operational constraints', 'institutional veto points'], 8);
    const counterarguments = uniq([
      'The apparent pattern may be explained by capacity limits rather than intent.',
      'The dominant narrative may overstate one actor’s control.',
      'Observed outcomes may come from second-order feedback, not original design.',
      ...(template.counter_evidence_targets || [])
    ], 8);
    const missingContext = [];
    if(!context || /not specified|غير محدد|non précisé/i.test(context)) missingContext.push('timeframe_or_geography');
    if(kws.length < 4) missingContext.push('specific_entities_or_keywords');
    if(!/\d{4}|last|recent|حالي|حديث|récent/i.test(`${topic} ${context}`)) missingContext.push('temporal_boundary');
    const planUpgrades = uniq([
      'convert broad topic into falsifiable working thesis',
      'add actor/incentive map before source collection',
      'collect counter-evidence before synthesis',
      'separate public attention from evidence reliability',
      'define disconfirming conditions for each scenario'
    ], 8);
    const outputPlan = uniq(['working thesis', 'key questions', 'actor/tool map', 'evidence needs', 'counter-evidence targets', 'scenario falsifiers', 'brief handoff'], 10);
    return {
      prompt_compiler_version: VERSION,
      generated_at: input.now || new Date().toISOString(),
      mode,
      topic_raw: topic,
      context_raw: context,
      refined_thesis: thesis,
      research_objective: objective,
      key_questions: keyQuestions,
      actor_hypotheses: actors,
      tool_hypotheses: tools,
      evidence_needs: evidenceNeeds,
      counterarguments,
      disconfirming_conditions: uniq([
        'credible evidence shows the main actor lacks capability or incentive',
        'opposite outcomes occur after the expected trigger',
        'primary-source chronology contradicts the inferred causal order',
        'counter-evidence explains the outcome with fewer assumptions'
      ], 8),
      missing_context: missingContext,
      keywords: kws,
      plan_upgrades: planUpgrades,
      output_plan: outputPlan,
      plan_quality_score: scoreQuality({topic, context, template}),
      next_action: missingContext.length ? 'tighten_scope_before_evidence_collection' : 'generate_research_plan_and_collect_evidence',
      live_ai_used: false,
      live_fetching_performed: false,
      release_gate: 'local_template_prompt_compiler_only'
    };
  }
  function toPlanSeed(compiled = {}){
    return {
      compiler_summary: compiled,
      questions: compiled.key_questions || [],
      target_actors: compiled.actor_hypotheses || [],
      target_sources: compiled.evidence_needs || [],
      keywords: compiled.keywords || [],
      counter_evidence_targets: compiled.counterarguments || [],
      early_warning_indicators: [
        'new primary-source evidence changes the actor/incentive map',
        'counter-evidence accumulates faster than supporting evidence',
        'implementation outcomes diverge from stated narrative',
        'public attention rises without reliability improvement'
      ],
      research_objective: compiled.research_objective,
      refined_thesis: compiled.refined_thesis,
      missing_context: compiled.missing_context || [],
      disconfirming_conditions: compiled.disconfirming_conditions || [],
      plan_quality_score: compiled.plan_quality_score,
      live_ai_used: false
    };
  }
  root.promptCompiler = Object.freeze({VERSION, compile, toPlanSeed});
})(window);
