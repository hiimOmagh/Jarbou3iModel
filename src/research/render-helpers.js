/* v1.2.0-alpha.2 Â· Source-to-Brief Intelligence Workbench; public surface displays v1.2.0-alpha.2 Source-to-Brief Intelligence Workbench.  Jarbou3i Research Engine render helpers v1.1.0. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const COPY = {
    en: {
      researchTitle:'Research Workflow Lab',
      researchSubtitle:'Experimental research-to-strategy pipeline. Manual mode remains untouched; this layer builds plan, evidence, source clusters, entity profiles, causal links, mock AI, critique, and Quality Gate v3.',
      alphaBadge:'v1.2.0-alpha.2 Source-to-Brief Intelligence Workbench Â· Source-to-Brief Intelligence Workbench',
      planTitle:'Research Plan',
      planSubtitle:'Convert the topic into research questions, source targets, actor targets, counter-evidence targets, and early-warning indicators.',
      planMode:'Research mode',
      modeStructural:'Structural', modeRecent:'Recent signals', modeSourceHeavy:'Source-heavy', modeAdversarial:'Adversarial',
      generatePlan:'Generate research plan', copyPlanPrompt:'Copy plan prompt', clearPlan:'Clear plan', noPlan:'No research plan yet.',
      evidenceTitle:'Evidence Matrix',
      evidenceSubtitle:'Evidence becomes a first-class object before analysis. Each claim can support or contradict model layers.',
      claim:'Claim', sourceTitle:'Source title', sourceUrl:'Source URL', sourceType:'Source type', sourceDate:'Source date', strength:'Strength', timeRelevance:'Time relevance', publicSignal:'Public signal', supports:'Supports IDs', contradicts:'Contradicts IDs', confidence:'Confidence', notes:'Notes',
      addEvidence:'Add evidence', updateEvidence:'Update evidence', cancelEdit:'Cancel edit', loadDemoEvidence:'Load demo evidence', exportWorkflow:'Export research packet', exportPackV2:'Export Pack v2', statusExportPackExported:'Export Pack v2 generated.', importWorkflow:'Import research packet', clearEvidence:'Clear evidence', matrixEmpty:'Evidence matrix is empty.', edit:'Edit', remove:'Remove',
      causalTitle:'Causal Links', causalSubtitle:'Connect interests, actors, tools, narratives, results, feedback, and evidence into explicit causal claims.', linkFrom:'From', linkTo:'To', relationship:'Relationship', evidenceIds:'Evidence IDs', addCausalLink:'Add causal link', inferCausalLinks:'Infer from evidence', clearCausalLinks:'Clear links', causalEmpty:'No causal links yet.',
      compilerTitle:'Analysis Compiler', compilerSubtitle:'Compile evidence, source clusters, coverage gaps, and causal links into a synthesis-ready analysis brief.', compileBrief:'Compile analysis brief', copySynthesisPrompt:'Copy synthesis prompt', exportAnalysisBrief:'Export analysis brief', clearAnalysisBrief:'Clear brief', noAnalysisBrief:'No analysis brief compiled yet.', clusterTitle:'Source clusters', entityTitle:'Entity profiles', gapsTitle:'Coverage gaps', diagnosticsTitle:'Validation diagnostics', compilerScore:'Compiler', statusCompiled:'Analysis brief compiled.', statusBriefExported:'Analysis brief exported.', statusBriefCleared:'Analysis brief cleared.',
      providerTitle:'Provider Harness', providerRouterTitle:'Provider Router', suitability:'Suitability', cost:'Cost', dryRun:'Dry-run', providerSubtitle:'Provider-ready request contracts with mock, BYOK, hosted backend proxy, and portable-account mock modes. Live calls require explicit opt-in.', providerName:'Provider', providerTask:'Task', providerEndpoint:'Endpoint', providerModel:'Model', providerApiKey:'API key', rememberProviderKey:'Remember locally on this device', enableLiveByok:'Enable live provider calls', providerSafety:'Safety: manual/private mode remains default. Keys are never exported into packets, reports, or run ledgers.', validateProviderSettings:'Validate provider settings', dryRunProviderRequest:'Build dry-run request', taskPlan:'Research plan', taskSynthesis:'Strategic synthesis', taskRepair:'JSON repair', taskCritique:'Critique', taskSourceDiscipline:'Source discipline', runProviderTask:'Run provider task', copyProviderPayload:'Copy provider payload', exportRunLedger:'Export run ledger', clearRunLedger:'Clear run ledger', runLedgerEmpty:'No provider runs yet.', providerScore:'Provider harness', byokScore:'BYOK safety', backendProxyScore:'Backend proxy', providerIdentityScore:'Provider identity', statusProviderRun:'Provider task completed.', statusProviderDryRun:'Provider payload built without live network call.', statusProviderSettingsSaved:'Provider settings validated and saved.', statusProviderLiveDisabled:'Live provider calls disabled; dry-run/mock response recorded.', statusProviderLiveError:'Live provider call failed; no key was stored in the run ledger.', statusBackendProxyReady:'Hosted backend proxy selected. Browser sends no provider key.', statusProviderValidationFailed:'Provider response rejected by contract validation.', statusProviderRepaired:'Provider response failed validation and was repaired through the controlled fallback.', responseValidationScore:'Response validation', statusLedgerExported:'Run ledger exported.', statusLedgerCleared:'Run ledger cleared.', previewProviderContract:'Preview contract', previewProviderPrompt:'Preview prompt', runProviderFixtureSuite:'Run fixture suite', exportProviderDiagnostics:'Export diagnostics', providerContractLabel:'Response contract', providerPromptLabel:'Prompt preview', providerDiagnosticsTitle:'Provider diagnostics', fixtureSuiteTitle:'Contract fixture suite', contractFixtureScore:'Contract fixtures', statusProviderContractPreviewed:'Provider response contract previewed.', statusProviderPromptPreviewed:'Provider prompt previewed.', statusProviderFixtureSuiteRun:'Provider fixture suite completed.', statusProviderDiagnosticsExported:'Provider diagnostics exported.', portableTitle:'Portable account mock', portableSubtitle:'Simulate OAuth/PKCE account linking without real tokens or vendor dependency.', connectPortable:'Connect mock portable account', refreshPortable:'Refresh mock token', disconnectPortable:'Disconnect portable account', exportPortableStatus:'Export portable status', portableScore:'Portable account', statusPortableConnected:'Mock portable account connected. No live OAuth or provider call was made.', statusPortableRefreshed:'Mock portable token refreshed. No raw token is stored or exported.', statusPortableDisconnected:'Portable account disconnected.', statusPortableExported:'Portable account status exported.', workflowTitle:'Mock AI Workflow', workflowSubtitle:'Legacy quick actions remain available, but provider harness is now the main AI integration path.', generateMock:'Generate mock analysis JSON', runMockRepair:'Run mock repair', runCritique:'Run mock critique', copyDeepPrompt:'Copy deep-research prompt',
      qualityTitle:'Quality Gate v3', planScore:'Plan', evidenceScore:'Evidence', causalScore:'Causal links', critiqueScore:'Critique', sourceScore:'Source discipline', diversityScore:'Source diversity', counterScore:'Counter-evidence', readiness:'Readiness',
      statusReady:'Research workflow ready for mock synthesis.', statusNeedPlan:'Generate a research plan first.', statusNeedEvidence:'Add evidence before synthesis.', statusGenerated:'Mock analysis JSON generated and placed in the import box.', statusRepaired:'Mock repair produced schema-compatible JSON.', statusCritiqued:'Mock critique generated.', statusImported:'Research packet imported.', statusExported:'Research packet exported.', statusEditing:'Evidence item loaded for editing.', statusLinkAdded:'Causal link added.', statusLinksInferred:'Causal links inferred from evidence.', statusInvalidPacket:'Invalid research packet.', statusInvalidLink:'Causal link requires From, To, and at least one evidence ID.', copied:'Copied.', copyFailed:'Copy failed. Use the visible text manually.',
      urlOptional:'https://example.com/source', claimPlaceholder:'Observable claim or research finding', sourcePlaceholder:'Publication, report, dataset, transcript, or note title', supportsPlaceholder:'I1,A1,T1', contradictsPlaceholder:'N1,R1', notesPlaceholder:'Why this evidence matters / uncertainty / limitations', sourcePlanningTitle:'Source Planning Layer', sourcePlanningSubtitle:'Plan future source-assisted research without live crawling or verification claims.', sourceConnector:'Connector', sourceTask:'Source task', sourceTaskPlan:'Source plan', sourceTaskQuery:'Query plan', sourceTaskClaim:'Claim extraction', sourceTaskScoring:'Evidence scoring', sourceTaskCluster:'Cluster plan', sourcePolicyNote:'Planning-only: no scraping, no live search, no source verification claims.', buildSourceTask:'Build source task', copySourceRequest:'Copy source request', runSourceFixtureSuite:'Run source fixture suite', exportSourcePolicy:'Export source policy', sourcePlanningScore:'Source planning', sourceFixtureScore:'Source fixtures', sourcePolicyScore:'Source policy', sourceDiagnosticsTitle:'Source diagnostics', sourceFixtureSuiteTitle:'Source fixture suite', statusSourceTaskBuilt:'Source task built. No live fetch was performed.', statusSourceRequestCopied:'Source request copied.', statusSourceFixtureSuiteRun:'Source fixture suite completed.', statusSourcePolicyExported:'Source policy exported.', sourceImportTitle:'Source Import Adapter', sourceImportSubtitle:'Paste deep-research / last30days-style outputs and convert them into Evidence Matrix candidates.', sourceImportFormat:'Import format', formatAuto:'Auto detect', sourceImportText:'Source output', sourceImportPlaceholder:'Paste external research output, source notes, links, or signal summaries here.', sourceImportPolicyNote:'Manual-only import: no fetch, no scraping, no verification claim.', previewSourceImport:'Preview import', importSourceEvidence:'Import as evidence', exportSourceImportReport:'Export import report', clearSourceImport:'Clear import', sourceImportScore:'Source import', sourceImportReportTitle:'Source import report', statusSourceImportPreviewed:'Source import preview generated.', statusSourceImported:'Source evidence imported into the matrix.', statusSourceImportCleared:'Source import cleared.', statusSourceImportReportExported:'Source import report exported.', statusSourceImportEmpty:'Paste source output before importing.'
    },
    ar: {
      researchTitle:'Ù…Ø®ØªØ¨Ø± Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„Ø¨Ø­Ø«ÙŠ',
      researchSubtitle:'Ø·Ø¨Ù‚Ø© ØªØ¬Ø±ÙŠØ¨ÙŠØ© ØªØ±Ø¨Ø· Ø§Ù„Ø¨Ø­Ø« Ø¨Ø§Ù„ØªØ­Ù„ÙŠÙ„ Ø§Ù„Ø§Ø³ØªØ±Ø§ØªÙŠØ¬ÙŠ. Ø§Ù„Ù†Ù…Ø· Ø§Ù„ÙŠØ¯ÙˆÙŠ ÙŠØ¨Ù‚Ù‰ ÙƒÙ…Ø§ Ù‡ÙˆØ› Ù‡Ø°Ù‡ Ø§Ù„Ø·Ø¨Ù‚Ø© ØªØ¶ÙŠÙ Ø®Ø·Ø©ØŒ Ù…ØµÙÙˆÙØ© Ø£Ø¯Ù„Ø©ØŒ ØªØ¬Ù…ÙŠØ¹Ø§Øª Ù…ØµØ§Ø¯Ø±ØŒ Ù…Ù„ÙØ§Øª ÙƒÙŠØ§Ù†Ø§ØªØŒ Ø±ÙˆØ§Ø¨Ø· Ø³Ø¨Ø¨ÙŠØ©ØŒ Ù†Ù‚Ø¯ØŒ ÙˆØ¨ÙˆØ§Ø¨Ø© Ø¬ÙˆØ¯Ø© v3.',
      alphaBadge:'v1.1.0 Ø§Ù„Ø¹Ø±Ø¶ Ø§Ù„Ø¹Ø§Ù… Ø§Ù„Ù…Ø³ØªÙ‚Ø± Â· Ø§Ù„Ø¹Ø±Ø¶ Ø§Ù„Ø¹Ø§Ù… Ø§Ù„Ù…Ø³ØªÙ‚Ø±' ,
      planTitle:'Ø®Ø·Ø© Ø§Ù„Ø¨Ø­Ø«',
      planSubtitle:'Ø­ÙˆÙ‘Ù„ Ø§Ù„Ù…ÙˆØ¶ÙˆØ¹ Ø¥Ù„Ù‰ Ø£Ø³Ø¦Ù„Ø© Ø¨Ø­Ø«ØŒ Ù…ØµØ§Ø¯Ø± Ù…Ø³ØªÙ‡Ø¯ÙØ©ØŒ ÙØ§Ø¹Ù„ÙŠÙ†ØŒ Ø£Ø¯Ù„Ø© Ù…Ø¶Ø§Ø¯Ø©ØŒ ÙˆÙ…Ø¤Ø´Ø±Ø§Øª Ø¥Ù†Ø°Ø§Ø± Ù…Ø¨ÙƒØ±.',
      planMode:'Ù†Ù…Ø· Ø§Ù„Ø¨Ø­Ø«',
      modeStructural:'Ù‡ÙŠÙƒÙ„ÙŠ', modeRecent:'Ø¥Ø´Ø§Ø±Ø§Øª Ø­Ø¯ÙŠØ«Ø©', modeSourceHeavy:'Ù…Ø±ØªÙƒØ² Ø¹Ù„Ù‰ Ø§Ù„Ù…ØµØ§Ø¯Ø±', modeAdversarial:'Ù†Ù‚Ø¯ÙŠ/Ø®ØµÙˆÙ…ÙŠ',
      generatePlan:'ØªÙˆÙ„ÙŠØ¯ Ø®Ø·Ø© Ø§Ù„Ø¨Ø­Ø«', copyPlanPrompt:'Ù†Ø³Ø® Ø¨Ø±ÙˆÙ…Ø¨Øª Ø§Ù„Ø®Ø·Ø©', clearPlan:'Ù…Ø³Ø­ Ø§Ù„Ø®Ø·Ø©', noPlan:'Ù„Ø§ ØªÙˆØ¬Ø¯ Ø®Ø·Ø© Ø¨Ø­Ø« Ø¨Ø¹Ø¯.',
      evidenceTitle:'Ù…ØµÙÙˆÙØ© Ø§Ù„Ø£Ø¯Ù„Ø©',
      evidenceSubtitle:'Ø§Ù„Ø¯Ù„ÙŠÙ„ ÙŠØµØ¨Ø­ ÙƒØ§Ø¦Ù†Ù‹Ø§ Ù…Ø³ØªÙ‚Ù„Ù‹Ø§ Ù‚Ø¨Ù„ Ø§Ù„ØªØ­Ù„ÙŠÙ„. ÙƒÙ„ Ø§Ø¯Ø¹Ø§Ø¡ ÙŠÙ…ÙƒÙ† Ø£Ù† ÙŠØ¯Ø¹Ù… Ø£Ùˆ ÙŠÙ†Ø§Ù‚Ø¶ Ø·Ø¨Ù‚Ø§Øª Ø§Ù„Ù†Ù…ÙˆØ°Ø¬.',
      claim:'Ø§Ù„Ø§Ø¯Ø¹Ø§Ø¡', sourceTitle:'Ø¹Ù†ÙˆØ§Ù† Ø§Ù„Ù…ØµØ¯Ø±', sourceUrl:'Ø±Ø§Ø¨Ø· Ø§Ù„Ù…ØµØ¯Ø±', sourceType:'Ù†ÙˆØ¹ Ø§Ù„Ù…ØµØ¯Ø±', sourceDate:'ØªØ§Ø±ÙŠØ® Ø§Ù„Ù…ØµØ¯Ø±', strength:'Ø§Ù„Ù‚ÙˆØ©', timeRelevance:'Ø§Ù„Ù…Ù„Ø§Ø¡Ù…Ø© Ø§Ù„Ø²Ù…Ù†ÙŠØ©', publicSignal:'Ø§Ù„Ø¥Ø´Ø§Ø±Ø© Ø§Ù„Ø¹Ø§Ù…Ø©', supports:'ÙŠØ¯Ø¹Ù… IDs', contradicts:'ÙŠÙ†Ø§Ù‚Ø¶ IDs', confidence:'Ø§Ù„Ø«Ù‚Ø©', notes:'Ù…Ù„Ø§Ø­Ø¸Ø§Øª',
      addEvidence:'Ø¥Ø¶Ø§ÙØ© Ø¯Ù„ÙŠÙ„', updateEvidence:'ØªØ­Ø¯ÙŠØ« Ø§Ù„Ø¯Ù„ÙŠÙ„', cancelEdit:'Ø¥Ù„ØºØ§Ø¡ Ø§Ù„ØªØ¹Ø¯ÙŠÙ„', loadDemoEvidence:'ØªØ­Ù…ÙŠÙ„ Ø£Ø¯Ù„Ø© ØªØ¬Ø±ÙŠØ¨ÙŠØ©', exportWorkflow:'ØªØµØ¯ÙŠØ± Ø­Ø²Ù…Ø© Ø§Ù„Ø¨Ø­Ø«', exportPackV2:'ØªØµØ¯ÙŠØ± Ø­Ø²Ù…Ø© v2', statusExportPackExported:'ØªÙ… Ø¥Ù†Ø´Ø§Ø¡ Ø­Ø²Ù…Ø© Ø§Ù„ØªØµØ¯ÙŠØ± v2.', importWorkflow:'Ø§Ø³ØªÙŠØ±Ø§Ø¯ Ø­Ø²Ù…Ø© Ø¨Ø­Ø«', clearEvidence:'Ù…Ø³Ø­ Ø§Ù„Ø£Ø¯Ù„Ø©', matrixEmpty:'Ù…ØµÙÙˆÙØ© Ø§Ù„Ø£Ø¯Ù„Ø© ÙØ§Ø±ØºØ©.', edit:'ØªØ¹Ø¯ÙŠÙ„', remove:'Ø­Ø°Ù',
      causalTitle:'Ø§Ù„Ø±ÙˆØ§Ø¨Ø· Ø§Ù„Ø³Ø¨Ø¨ÙŠØ©', causalSubtitle:'Ø§Ø±Ø¨Ø· Ø§Ù„Ù…ØµØ§Ù„Ø­ ÙˆØ§Ù„ÙØ§Ø¹Ù„ÙŠÙ† ÙˆØ§Ù„Ø£Ø¯ÙˆØ§Øª ÙˆØ§Ù„Ø³Ø±Ø¯ÙŠØ§Øª ÙˆØ§Ù„Ù†ØªØ§Ø¦Ø¬ ÙˆØ§Ù„ØªØºØ°ÙŠØ© Ø§Ù„Ø±Ø§Ø¬Ø¹Ø© ÙˆØ§Ù„Ø£Ø¯Ù„Ø© Ø¨Ø§Ø¯Ø¹Ø§Ø¡Ø§Øª Ø³Ø¨Ø¨ÙŠØ© ØµØ±ÙŠØ­Ø©.', linkFrom:'Ù…Ù†', linkTo:'Ø¥Ù„Ù‰', relationship:'Ø§Ù„Ø¹Ù„Ø§Ù‚Ø©', evidenceIds:'IDs Ø§Ù„Ø£Ø¯Ù„Ø©', addCausalLink:'Ø¥Ø¶Ø§ÙØ© Ø±Ø§Ø¨Ø· Ø³Ø¨Ø¨ÙŠ', inferCausalLinks:'Ø§Ø³ØªÙ†ØªØ§Ø¬ Ù…Ù† Ø§Ù„Ø£Ø¯Ù„Ø©', clearCausalLinks:'Ù…Ø³Ø­ Ø§Ù„Ø±ÙˆØ§Ø¨Ø·', causalEmpty:'Ù„Ø§ ØªÙˆØ¬Ø¯ Ø±ÙˆØ§Ø¨Ø· Ø³Ø¨Ø¨ÙŠØ© Ø¨Ø¹Ø¯.',
      compilerTitle:'Ù…ÙØµØ±Ù‘Ù Ø§Ù„ØªØ­Ù„ÙŠÙ„', compilerSubtitle:'Ø­ÙˆÙ‘Ù„ Ø§Ù„Ø£Ø¯Ù„Ø© ÙˆØ§Ù„Ø¹Ù†Ø§Ù‚ÙŠØ¯ Ø§Ù„Ù…ØµØ¯Ø±ÙŠØ© ÙˆØ§Ù„ÙØ¬ÙˆØ§Øª ÙˆØ§Ù„Ø±ÙˆØ§Ø¨Ø· Ø§Ù„Ø³Ø¨Ø¨ÙŠØ© Ø¥Ù„Ù‰ Ù…ÙˆØ¬Ø² Ø¬Ø§Ù‡Ø² Ù„Ù„ØªÙˆÙ„ÙŠÙ.', compileBrief:'ØªØ¬Ù…ÙŠØ¹ Ù…ÙˆØ¬Ø² Ø§Ù„ØªØ­Ù„ÙŠÙ„', copySynthesisPrompt:'Ù†Ø³Ø® Ø¨Ø±ÙˆÙ…Ø¨Øª Ø§Ù„ØªÙˆÙ„ÙŠÙ', exportAnalysisBrief:'ØªØµØ¯ÙŠØ± Ø§Ù„Ù…ÙˆØ¬Ø²', clearAnalysisBrief:'Ù…Ø³Ø­ Ø§Ù„Ù…ÙˆØ¬Ø²', noAnalysisBrief:'Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ù…ÙˆØ¬Ø² ØªØ­Ù„ÙŠÙ„ Ø¨Ø¹Ø¯.', clusterTitle:'Ø¹Ù†Ø§Ù‚ÙŠØ¯ Ø§Ù„Ù…ØµØ§Ø¯Ø±', entityTitle:'Ù…Ù„ÙØ§Øª Ø§Ù„ÙƒÙŠØ§Ù†Ø§Øª', gapsTitle:'ÙØ¬ÙˆØ§Øª Ø§Ù„ØªØºØ·ÙŠØ©', diagnosticsTitle:'ØªØ´Ø®ÙŠØµ Ø§Ù„ØªØ­Ù‚Ù‚', compilerScore:'Ø§Ù„Ù…ÙØµØ±Ù‘Ù', statusCompiled:'ØªÙ… ØªØ¬Ù…ÙŠØ¹ Ù…ÙˆØ¬Ø² Ø§Ù„ØªØ­Ù„ÙŠÙ„.', statusBriefExported:'ØªÙ… ØªØµØ¯ÙŠØ± Ù…ÙˆØ¬Ø² Ø§Ù„ØªØ­Ù„ÙŠÙ„.', statusBriefCleared:'ØªÙ… Ù…Ø³Ø­ Ù…ÙˆØ¬Ø² Ø§Ù„ØªØ­Ù„ÙŠÙ„.',
      workflowTitle:'Ø³ÙŠØ± AI ØªØ¬Ø±ÙŠØ¨ÙŠ', workflowSubtitle:'ØªØ¬Ø±ÙŠØ¯ Ø§Ù„Ù…Ø²ÙˆÙ‘Ø¯ ÙŠØ¨Ø¯Ø£ Ø¨Ù…Ø²ÙˆÙ‘Ø¯ ÙˆÙ‡Ù…ÙŠ. ÙŠÙ†ØªØ¬ JSON ØµØ§Ù„Ø­Ù‹Ø§ Ø¯ÙˆÙ† Ø§Ù„Ø§ØªØµØ§Ù„ Ø¨Ø£ÙŠ API Ø®Ø§Ø±Ø¬ÙŠ.', generateMock:'ØªÙˆÙ„ÙŠØ¯ JSON ØªØ­Ù„ÙŠÙ„ÙŠ ØªØ¬Ø±ÙŠØ¨ÙŠ', runMockRepair:'ØªØ´ØºÙŠÙ„ Ø¥ØµÙ„Ø§Ø­ ØªØ¬Ø±ÙŠØ¨ÙŠ', runCritique:'ØªØ´ØºÙŠÙ„ Ù†Ù‚Ø¯ ØªØ¬Ø±ÙŠØ¨ÙŠ', copyDeepPrompt:'Ù†Ø³Ø® Ø¨Ø±ÙˆÙ…Ø¨Øª Ø§Ù„Ø¨Ø­Ø« Ø§Ù„Ø¹Ù…ÙŠÙ‚', providerEndpoint:'Endpoint', providerModel:'Model', providerApiKey:'API key', rememberProviderKey:'Remember locally on this device', enableLiveByok:'Enable live provider calls', providerSafety:'Safety: manual/private mode remains default. Keys are never exported.', validateProviderSettings:'Validate provider settings', dryRunProviderRequest:'Build dry-run request', byokScore:'BYOK safety', backendProxyScore:'Backend proxy', providerIdentityScore:'Provider identity', statusProviderDryRun:'Provider payload built without live network call.', statusProviderSettingsSaved:'Provider settings validated and saved.', statusProviderLiveDisabled:'Live provider calls disabled; dry-run/mock response recorded.', statusProviderLiveError:'Live provider call failed; no key was stored in the run ledger.', statusBackendProxyReady:'Hosted backend proxy selected. Browser sends no provider key.',
      qualityTitle:'Ø¨ÙˆØ§Ø¨Ø© Ø§Ù„Ø¬ÙˆØ¯Ø© v3', planScore:'Ø§Ù„Ø®Ø·Ø©', evidenceScore:'Ø§Ù„Ø£Ø¯Ù„Ø©', causalScore:'Ø§Ù„Ø±ÙˆØ§Ø¨Ø· Ø§Ù„Ø³Ø¨Ø¨ÙŠØ©', critiqueScore:'Ø§Ù„Ù†Ù‚Ø¯', sourceScore:'Ø§Ù†Ø¶Ø¨Ø§Ø· Ø§Ù„Ù…ØµØ§Ø¯Ø±', diversityScore:'ØªÙ†ÙˆØ¹ Ø§Ù„Ù…ØµØ§Ø¯Ø±', counterScore:'Ø§Ù„Ø£Ø¯Ù„Ø© Ø§Ù„Ù…Ø¶Ø§Ø¯Ø©', readiness:'Ø§Ù„Ø¬Ø§Ù‡Ø²ÙŠØ©',
      statusReady:'Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„Ø¨Ø­Ø«ÙŠ Ø¬Ø§Ù‡Ø² Ù„Ù„Ù…Ø­Ø§ÙƒØ§Ø©.', statusNeedPlan:'ÙˆÙ„Ù‘Ø¯ Ø®Ø·Ø© Ø¨Ø­Ø« Ø£ÙˆÙ„Ù‹Ø§.', statusNeedEvidence:'Ø£Ø¶Ù Ø£Ø¯Ù„Ø© Ù‚Ø¨Ù„ Ø§Ù„ØªÙˆÙ„ÙŠÙ.', statusGenerated:'ØªÙ… ØªÙˆÙ„ÙŠØ¯ JSON ØªØ¬Ø±ÙŠØ¨ÙŠ ÙˆÙˆØ¶Ø¹Ù‡ ÙÙŠ Ø®Ø§Ù†Ø© Ø§Ù„Ø§Ø³ØªÙŠØ±Ø§Ø¯.', statusRepaired:'Ø§Ù„Ø¥ØµÙ„Ø§Ø­ Ø§Ù„ØªØ¬Ø±ÙŠØ¨ÙŠ Ø£Ù†ØªØ¬ JSON Ù…ØªÙˆØ§ÙÙ‚Ù‹Ø§.', statusCritiqued:'ØªÙ… ØªÙˆÙ„ÙŠØ¯ Ù†Ù‚Ø¯ ØªØ¬Ø±ÙŠØ¨ÙŠ.', statusImported:'ØªÙ… Ø§Ø³ØªÙŠØ±Ø§Ø¯ Ø­Ø²Ù…Ø© Ø§Ù„Ø¨Ø­Ø«.', statusExported:'ØªÙ… ØªØµØ¯ÙŠØ± Ø­Ø²Ù…Ø© Ø§Ù„Ø¨Ø­Ø«.', statusEditing:'ØªÙ… ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ø¯Ù„ÙŠÙ„ Ù„Ù„ØªØ¹Ø¯ÙŠÙ„.', statusLinkAdded:'ØªÙ…Øª Ø¥Ø¶Ø§ÙØ© Ø§Ù„Ø±Ø§Ø¨Ø· Ø§Ù„Ø³Ø¨Ø¨ÙŠ.', statusLinksInferred:'ØªÙ… Ø§Ø³ØªÙ†ØªØ§Ø¬ Ø§Ù„Ø±ÙˆØ§Ø¨Ø· Ø§Ù„Ø³Ø¨Ø¨ÙŠØ© Ù…Ù† Ø§Ù„Ø£Ø¯Ù„Ø©.', statusInvalidPacket:'Ø­Ø²Ù…Ø© Ø§Ù„Ø¨Ø­Ø« ØºÙŠØ± ØµØ§Ù„Ø­Ø©.', statusInvalidLink:'Ø§Ù„Ø±Ø§Ø¨Ø· Ø§Ù„Ø³Ø¨Ø¨ÙŠ ÙŠØ­ØªØ§Ø¬ Ù…Ù†/Ø¥Ù„Ù‰ ÙˆØ¹Ù„Ù‰ Ø§Ù„Ø£Ù‚Ù„ ID Ø¯Ù„ÙŠÙ„ ÙˆØ§Ø­Ø¯.', copied:'ØªÙ… Ø§Ù„Ù†Ø³Ø®.', copyFailed:'ØªØ¹Ø°Ø± Ø§Ù„Ù†Ø³Ø®. Ø§Ø³ØªØ®Ø¯Ù… Ø§Ù„Ù†Øµ Ø§Ù„Ø¸Ø§Ù‡Ø± ÙŠØ¯ÙˆÙŠÙ‹Ø§.',
      urlOptional:'https://example.com/source', claimPlaceholder:'Ø§Ø¯Ø¹Ø§Ø¡ Ù‚Ø§Ø¨Ù„ Ù„Ù„Ù…Ù„Ø§Ø­Ø¸Ø© Ø£Ùˆ Ù†ØªÙŠØ¬Ø© Ø¨Ø­Ø«ÙŠØ©', sourcePlaceholder:'ØªÙ‚Ø±ÙŠØ±ØŒ Ø¯Ø±Ø§Ø³Ø©ØŒ Ù‚Ø§Ø¹Ø¯Ø© Ø¨ÙŠØ§Ù†Ø§ØªØŒ ØªÙØ±ÙŠØºØŒ Ø£Ùˆ Ù…Ù„Ø§Ø­Ø¸Ø©', supportsPlaceholder:'I1,A1,T1', contradictsPlaceholder:'N1,R1', notesPlaceholder:'Ù„Ù…Ø§Ø°Ø§ Ù‡Ø°Ø§ Ø§Ù„Ø¯Ù„ÙŠÙ„ Ù…Ù‡Ù… / Ø¹Ø¯Ù… Ø§Ù„ÙŠÙ‚ÙŠÙ† / Ø§Ù„Ø­Ø¯ÙˆØ¯'
    },
    fr: {
      researchTitle:'Laboratoire de workflow de recherche',
      researchSubtitle:'Couche expÃ©rimentale reliant la recherche Ã  lâ€™analyse stratÃ©gique. Le mode manuel reste intact; cette couche ajoute plan, matrice de preuves, clusters de sources, profils dâ€™entitÃ©s, liens causaux, critique et barriÃ¨re qualitÃ© v3.',
      alphaBadge:'v1.1.0 DÃ©mo publique stable Â· DÃ©mo publique stable',
      planTitle:'Plan de recherche',
      planSubtitle:'Transformer le sujet en questions, sources cibles, acteurs, contre-preuves et signaux prÃ©coces.',
      planMode:'Mode de recherche',
      modeStructural:'Structurel', modeRecent:'Signaux rÃ©cents', modeSourceHeavy:'TrÃ¨s sourcÃ©', modeAdversarial:'Adversarial',
      generatePlan:'GÃ©nÃ©rer le plan', copyPlanPrompt:'Copier le prompt du plan', clearPlan:'Effacer le plan', noPlan:'Aucun plan de recherche.',
      evidenceTitle:'Matrice de preuves',
      evidenceSubtitle:'La preuve devient un objet avant lâ€™analyse. Chaque Ã©lÃ©ment peut soutenir ou contredire des couches du modÃ¨le.',
      claim:'Ã‰noncÃ©', sourceTitle:'Titre de source', sourceUrl:'URL source', sourceType:'Type de source', sourceDate:'Date source', strength:'Force', timeRelevance:'Pertinence temps', publicSignal:'Signal public', supports:'Soutient IDs', contradicts:'Contredit IDs', confidence:'Confiance', notes:'Notes',
      addEvidence:'Ajouter preuve', updateEvidence:'Mettre Ã  jour', cancelEdit:'Annuler Ã©dition', loadDemoEvidence:'Charger preuves dÃ©mo', exportWorkflow:'Exporter paquet recherche', importWorkflow:'Importer paquet recherche', clearEvidence:'Effacer preuves', matrixEmpty:'La matrice de preuves est vide.', edit:'Modifier', remove:'Supprimer',
      causalTitle:'Liens causaux', causalSubtitle:'Relier intÃ©rÃªts, acteurs, outils, narratifs, rÃ©sultats, feedback et preuves dans des affirmations causales explicites.', linkFrom:'De', linkTo:'Vers', relationship:'Relation', evidenceIds:'IDs preuve', addCausalLink:'Ajouter lien causal', inferCausalLinks:'InfÃ©rer depuis preuves', clearCausalLinks:'Effacer liens', causalEmpty:'Aucun lien causal.',
      compilerTitle:'Compilateur dâ€™analyse', compilerSubtitle:'Compiler preuves, clusters de sources, lacunes et liens causaux dans un brief prÃªt pour synthÃ¨se.', compileBrief:'Compiler le brief', copySynthesisPrompt:'Copier prompt synthÃ¨se', exportAnalysisBrief:'Exporter le brief', clearAnalysisBrief:'Effacer le brief', noAnalysisBrief:'Aucun brief compilÃ©.', clusterTitle:'Clusters de sources', entityTitle:'Profils dâ€™entitÃ©s', gapsTitle:'Lacunes de couverture', diagnosticsTitle:'Diagnostics validation', compilerScore:'Compilateur', statusCompiled:'Brief dâ€™analyse compilÃ©.', statusBriefExported:'Brief exportÃ©.', statusBriefCleared:'Brief effacÃ©.',
      workflowTitle:'Workflow IA simulÃ©', workflowSubtitle:'Lâ€™abstraction fournisseur commence par un fournisseur simulÃ©. Il crÃ©e un JSON valide sans API externe.', generateMock:'GÃ©nÃ©rer JSON simulÃ©', runMockRepair:'RÃ©paration simulÃ©e', runCritique:'Critique simulÃ©e', copyDeepPrompt:'Copier prompt deep-research', providerEndpoint:'Endpoint', providerModel:'Model', providerApiKey:'API key', rememberProviderKey:'Remember locally on this device', enableLiveByok:'Enable live provider calls', providerSafety:'Safety: manual/private mode remains default. Keys are never exported.', validateProviderSettings:'Validate provider settings', dryRunProviderRequest:'Build dry-run request', byokScore:'BYOK safety', backendProxyScore:'Backend proxy', providerIdentityScore:'Provider identity', statusProviderDryRun:'Provider payload built without live network call.', statusProviderSettingsSaved:'Provider settings validated and saved.', statusProviderLiveDisabled:'Live provider calls disabled; dry-run/mock response recorded.', statusProviderLiveError:'Live provider call failed; no key was stored in the run ledger.', statusBackendProxyReady:'Hosted backend proxy selected. Browser sends no provider key.',
      qualityTitle:'BarriÃ¨re qualitÃ© v3', planScore:'Plan', evidenceScore:'Preuves', causalScore:'Liens causaux', critiqueScore:'Critique', sourceScore:'Discipline sources', diversityScore:'DiversitÃ© sources', counterScore:'Contre-preuves', readiness:'PrÃ©paration',
      statusReady:'Workflow prÃªt pour synthÃ¨se simulÃ©e.', statusNeedPlan:'GÃ©nÃ©rez dâ€™abord un plan.', statusNeedEvidence:'Ajoutez des preuves avant la synthÃ¨se.', statusGenerated:'JSON simulÃ© gÃ©nÃ©rÃ© et placÃ© dans la zone dâ€™import.', statusRepaired:'RÃ©paration simulÃ©e compatible avec le schÃ©ma.', statusCritiqued:'Critique simulÃ©e gÃ©nÃ©rÃ©e.', statusImported:'Paquet de recherche importÃ©.', statusExported:'Paquet de recherche exportÃ©.', statusEditing:'Ã‰lÃ©ment chargÃ© pour Ã©dition.', statusLinkAdded:'Lien causal ajoutÃ©.', statusLinksInferred:'Liens causaux infÃ©rÃ©s.', statusInvalidPacket:'Paquet de recherche invalide.', statusInvalidLink:'Un lien causal exige De, Vers et au moins un ID preuve.', copied:'CopiÃ©.', copyFailed:'Copie impossible. Utilisez le texte visible manuellement.',
      urlOptional:'https://example.com/source', claimPlaceholder:'Ã‰noncÃ© observable ou rÃ©sultat de recherche', sourcePlaceholder:'Publication, rapport, donnÃ©es, transcript ou note', supportsPlaceholder:'I1,A1,T1', contradictsPlaceholder:'N1,R1', notesPlaceholder:'Pourquoi cette preuve compte / incertitude / limites'
    }
  };


  Object.assign(COPY.en, {
    researchPlannerEyebrow:'Research Planner V2',
    researchPlannerTitle:'Research Planner V2',
    researchPlannerBody:'Local-only planner: quick/standard/deep depth presets, source-type budgets, entity-aware query plans, counter-evidence targets, and connector-readiness dry-run diagnostics.',
    researchPlannerEmpty:'No planner report yet.',
    researchPlannerEmptyBody:'Generate a research plan to create depth presets, source budgets, entity-aware queries, and counter-evidence targets.',
    researchPlannerQueries:'Entity-aware query plan',
    researchPlannerCounterEvidence:'Counter-evidence targets'
  });
  Object.assign(COPY.ar, {
    researchPlannerEyebrow:'Ù…Ø®Ø·Ø· Ø§Ù„Ø¨Ø­Ø« V2',
    researchPlannerTitle:'Ù…Ø®Ø·Ø· Ø§Ù„Ø¨Ø­Ø« V2',
    researchPlannerBody:'Ù…Ø®Ø·Ø· Ù…Ø­Ù„ÙŠ ÙÙ‚Ø·: Ù…Ø³ØªÙˆÙŠØ§Øª Ø¹Ù…Ù‚ØŒ Ù…ÙŠØ²Ø§Ù†ÙŠØ§Øª Ù…ØµØ§Ø¯Ø±ØŒ Ø®Ø·Ø· Ø§Ø³ØªØ¹Ù„Ø§Ù… Ù…Ø±ØªØ¨Ø·Ø© Ø¨Ø§Ù„ÙƒÙŠØ§Ù†Ø§ØªØŒ Ø£Ù‡Ø¯Ø§Ù Ø£Ø¯Ù„Ø© Ù…Ø¶Ø§Ø¯Ø©ØŒ ÙˆØªØ´Ø®ÙŠØµ Ø¬Ø§Ù‡Ø²ÙŠØ© Ù…ÙˆØµÙ„Ø§Øª Ø¯ÙˆÙ† ØªÙ†ÙÙŠØ°.',
    researchPlannerEmpty:'Ù„Ø§ ÙŠÙˆØ¬Ø¯ ØªÙ‚Ø±ÙŠØ± Ù…Ø®Ø·Ø· Ø¨Ø­Ø« Ø¨Ø¹Ø¯.',
    researchPlannerEmptyBody:'ÙˆÙ„Ù‘Ø¯ Ø®Ø·Ø© Ø¨Ø­Ø« Ù„Ø¨Ù†Ø§Ø¡ Ù…Ø³ØªÙˆÙŠØ§Øª Ø§Ù„Ø¹Ù…Ù‚ ÙˆÙ…ÙŠØ²Ø§Ù†ÙŠØ§Øª Ø§Ù„Ù…ØµØ§Ø¯Ø± ÙˆØ§Ù„Ø§Ø³ØªØ¹Ù„Ø§Ù…Ø§Øª Ø§Ù„Ù…Ø±ØªØ¨Ø·Ø© Ø¨Ø§Ù„ÙƒÙŠØ§Ù†Ø§Øª ÙˆØ£Ù‡Ø¯Ø§Ù Ø§Ù„Ø£Ø¯Ù„Ø© Ø§Ù„Ù…Ø¶Ø§Ø¯Ø©.',
    researchPlannerQueries:'Ø®Ø·Ø© Ø§Ù„Ø§Ø³ØªØ¹Ù„Ø§Ù… Ø§Ù„Ù…Ø±ØªØ¨Ø·Ø© Ø¨Ø§Ù„ÙƒÙŠØ§Ù†Ø§Øª',
    researchPlannerCounterEvidence:'Ø£Ù‡Ø¯Ø§Ù Ø§Ù„Ø£Ø¯Ù„Ø© Ø§Ù„Ù…Ø¶Ø§Ø¯Ø©'
  });
  Object.assign(COPY.fr, {
    researchPlannerEyebrow:'Planificateur de recherche V2',
    researchPlannerTitle:'Planificateur de recherche V2',
    researchPlannerBody:'Planificateur local: niveaux quick/standard/deep, budgets de sources, requÃªtes liÃ©es aux entitÃ©s, contre-preuves et diagnostics de connecteurs en dry-run.',
    researchPlannerEmpty:'Aucun rapport de planification.',
    researchPlannerEmptyBody:'GÃ©nÃ©rez un plan de recherche pour crÃ©er profondeurs, budgets de sources, requÃªtes liÃ©es aux entitÃ©s et contre-preuves.',
    researchPlannerQueries:'Plan de requÃªtes liÃ© aux entitÃ©s',
    researchPlannerCounterEvidence:'Cibles de contre-preuves'
  });

  Object.assign(COPY.en, {
    importSourceEvidence:'Send to review queue',
    evidenceReviewTitle:'Evidence Review Queue',
    evidenceReviewSubtitle:'Imported source candidates must be accepted, edited, or rejected before entering the Evidence Matrix.',
    evidenceReviewEmpty:'No pending imported evidence. Paste a source output and send candidates to review.',
    evidenceReviewScore:'Evidence review',
    reviewStatus:'Review status',
    pending:'pending',
    accepted:'accepted',
    rejected:'rejected',
    needsEdit:'needs edit',
    accept:'Accept',
    reject:'Reject',
    editCandidate:'Edit candidate',
    acceptAllReviewEvidence:'Accept all pending',
    acceptEditedReviewEvidence:'Accept edited candidate',
    exportEvidenceReviewQueue:'Export review queue',
    clearResolvedReviewEvidence:'Clear resolved',
    statusSourceImported:'Imported candidates sent to the evidence review queue.',
    statusEvidenceAccepted:'Evidence candidate accepted into the matrix.',
    statusEvidenceRejected:'Evidence candidate rejected.',
    statusReviewEditing:'Evidence candidate loaded into the form for review editing.',
    statusReviewQueueExported:'Evidence review queue exported.',
    statusReviewQueueCleared:'Resolved evidence review items cleared.',
    statusNoReviewSelection:'Load a review candidate before accepting edited evidence.',
    sourcePacketBuilderTitle:'Source Packet Builder QA',
    sourcePacketBuilderSubtitle:'Build local manual source packet JSON from accepted evidence or review queue candidates.',
    sourcePacketBuilderPolicyNote:'Builder output is local/manual. It performs no live fetching and does not verify source truth.',
    buildSourcePacketFromEvidence:'Build from evidence matrix',
    buildSourcePacketFromReview:'Build from review queue',
    copySourcePacketBuilder:'Copy source packet',
    exportSourcePacketBuilder:'Export source packet',
    statusSourcePacketBuilt:'Manual source packet built. Review scoring flags before reuse.',
    statusSourcePacketEmpty:'No evidence available for source packet builder.',
    statusSourcePacketCopied:'Source packet copied.',
    statusSourcePacketExported:'Source packet exported.',
    statusEvidenceNeedsEdit:'Evidence candidate marked as needs edit by scoring review controls.'
  });
  Object.assign(COPY.ar, {
    importSourceEvidence:'Ø¥Ø±Ø³Ø§Ù„ Ø¥Ù„Ù‰ ØµÙ Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø©',
    evidenceReviewTitle:'ØµÙ Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ø£Ø¯Ù„Ø©',
    evidenceReviewSubtitle:'Ø§Ù„Ø£Ø¯Ù„Ø© Ø§Ù„Ù…Ø³ØªÙˆØ±Ø¯Ø© Ù„Ø§ ØªØ¯Ø®Ù„ Ø§Ù„Ù…ØµÙÙˆÙØ© Ù‚Ø¨Ù„ Ù‚Ø¨ÙˆÙ„Ù‡Ø§ Ø£Ùˆ ØªØ¹Ø¯ÙŠÙ„Ù‡Ø§ Ø£Ùˆ Ø±ÙØ¶Ù‡Ø§.',
    evidenceReviewEmpty:'Ù„Ø§ ØªÙˆØ¬Ø¯ Ø£Ø¯Ù„Ø© Ù…Ø³ØªÙˆØ±Ø¯Ø© Ø¨Ø§Ù†ØªØ¸Ø§Ø± Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø©.',
    evidenceReviewScore:'Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ø£Ø¯Ù„Ø©',
    reviewStatus:'Ø­Ø§Ù„Ø© Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø©',
    pending:'Ù‚ÙŠØ¯ Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø©',
    accepted:'Ù…Ù‚Ø¨ÙˆÙ„',
    rejected:'Ù…Ø±ÙÙˆØ¶',
    needsEdit:'ÙŠØ­ØªØ§Ø¬ ØªØ¹Ø¯ÙŠÙ„',
    accept:'Ù‚Ø¨ÙˆÙ„',
    reject:'Ø±ÙØ¶',
    editCandidate:'ØªØ¹Ø¯ÙŠÙ„ Ø§Ù„Ù…Ø±Ø´Ø­',
    acceptAllReviewEvidence:'Ù‚Ø¨ÙˆÙ„ ÙƒÙ„ Ø§Ù„Ù…Ø¹Ù„Ù‘Ù‚',
    acceptEditedReviewEvidence:'Ù‚Ø¨ÙˆÙ„ Ø§Ù„Ù…Ø±Ø´Ø­ Ø§Ù„Ù…Ø¹Ø¯Ù‘Ù„',
    exportEvidenceReviewQueue:'ØªØµØ¯ÙŠØ± ØµÙ Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø©',
    clearResolvedReviewEvidence:'Ù…Ø³Ø­ Ø§Ù„Ù…Ø­Ø³ÙˆÙ…',
    statusSourceImported:'ØªÙ… Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ù…Ø±Ø´Ø­Ø§Øª Ø¥Ù„Ù‰ ØµÙ Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ø£Ø¯Ù„Ø©.',
    statusEvidenceAccepted:'ØªÙ… Ù‚Ø¨ÙˆÙ„ Ø§Ù„Ø¯Ù„ÙŠÙ„ ÙÙŠ Ø§Ù„Ù…ØµÙÙˆÙØ©.',
    statusEvidenceRejected:'ØªÙ… Ø±ÙØ¶ Ø§Ù„Ù…Ø±Ø´Ø­.',
    statusReviewEditing:'ØªÙ… ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ù…Ø±Ø´Ø­ ÙÙŠ Ø§Ù„Ù†Ù…ÙˆØ°Ø¬ Ù„Ù„ØªØ¹Ø¯ÙŠÙ„.',
    statusReviewQueueExported:'ØªÙ… ØªØµØ¯ÙŠØ± ØµÙ Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø©.',
    statusReviewQueueCleared:'ØªÙ… Ù…Ø³Ø­ Ø¹Ù†Ø§ØµØ± Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ù…Ø­Ø³ÙˆÙ…Ø©.',
    statusNoReviewSelection:'Ø­Ù…Ù‘Ù„ Ù…Ø±Ø´Ø­ Ù…Ø±Ø§Ø¬Ø¹Ø© Ù‚Ø¨Ù„ Ù‚Ø¨ÙˆÙ„ Ø§Ù„Ù†Ø³Ø®Ø© Ø§Ù„Ù…Ø¹Ø¯Ù„Ø©.',
    sourcePacketBuilderTitle:'Ù…Ù†Ø´Ø¦ Ø­Ø²Ù…Ø© Ø§Ù„Ù…ØµØ§Ø¯Ø±',
    sourcePacketBuilderSubtitle:'Ø¨Ù†Ø§Ø¡ JSON Ù…Ø­Ù„ÙŠ Ù„Ø­Ø²Ù…Ø© Ù…ØµØ§Ø¯Ø± ÙŠØ¯ÙˆÙŠØ© Ù…Ù† Ø§Ù„Ø£Ø¯Ù„Ø© Ø£Ùˆ ØµÙ Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø©.',
    sourcePacketBuilderPolicyNote:'Ø§Ù„Ù…ÙÙ†Ø´Ø¦ Ù…Ø­Ù„ÙŠ ÙˆÙŠØ¯ÙˆÙŠ ÙÙ‚Ø·: Ù„Ø§ ÙŠØ¬Ù„Ø¨ ÙˆÙ„Ø§ ÙŠØªØ­Ù‚Ù‚ Ù…Ù† Ø§Ù„Ù…ØµØ§Ø¯Ø±.',
    buildSourcePacketFromEvidence:'Ø¨Ù†Ø§Ø¡ Ù…Ù† Ù…ØµÙÙˆÙØ© Ø§Ù„Ø£Ø¯Ù„Ø©',
    buildSourcePacketFromReview:'Ø¨Ù†Ø§Ø¡ Ù…Ù† ØµÙ Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø©',
    copySourcePacketBuilder:'Ù†Ø³Ø® Ø­Ø²Ù…Ø© Ø§Ù„Ù…ØµØ§Ø¯Ø±',
    exportSourcePacketBuilder:'ØªØµØ¯ÙŠØ± Ø­Ø²Ù…Ø© Ø§Ù„Ù…ØµØ§Ø¯Ø±',
    statusSourcePacketBuilt:'ØªÙ… Ø¨Ù†Ø§Ø¡ Ø­Ø²Ù…Ø© Ù…ØµØ§Ø¯Ø± ÙŠØ¯ÙˆÙŠØ©. Ø±Ø§Ø¬Ø¹ Ø£Ø¹Ù„Ø§Ù… Ø§Ù„ØªÙ‚ÙŠÙŠÙ… Ù‚Ø¨Ù„ Ø¥Ø¹Ø§Ø¯Ø© Ø§Ù„Ø§Ø³ØªØ®Ø¯Ø§Ù….',
    statusSourcePacketEmpty:'Ù„Ø§ ØªÙˆØ¬Ø¯ Ø£Ø¯Ù„Ø© Ù„Ø¨Ù†Ø§Ø¡ Ø­Ø²Ù…Ø© Ù…ØµØ§Ø¯Ø±.',
    statusSourcePacketCopied:'ØªÙ… Ù†Ø³Ø® Ø­Ø²Ù…Ø© Ø§Ù„Ù…ØµØ§Ø¯Ø±.',
    statusSourcePacketExported:'ØªÙ… ØªØµØ¯ÙŠØ± Ø­Ø²Ù…Ø© Ø§Ù„Ù…ØµØ§Ø¯Ø±.',
    statusEvidenceNeedsEdit:'ØªÙ… ÙˆØ³Ù… Ø§Ù„Ù…Ø±Ø´Ø­ Ø¨Ø£Ù†Ù‡ ÙŠØ­ØªØ§Ø¬ ØªØ¹Ø¯ÙŠÙ„ ÙˆÙÙ‚ Ø¶ÙˆØ§Ø¨Ø· Ø§Ù„ØªÙ‚ÙŠÙŠÙ….'
  });
  Object.assign(COPY.fr, {
    importSourceEvidence:'Envoyer en revue',
    evidenceReviewTitle:'File de revue des preuves',
    evidenceReviewSubtitle:'Les candidats importÃ©s doivent Ãªtre acceptÃ©s, modifiÃ©s ou rejetÃ©s avant dâ€™entrer dans la matrice.',
    evidenceReviewEmpty:'Aucune preuve importÃ©e en attente de revue.',
    evidenceReviewScore:'Revue des preuves',
    reviewStatus:'Statut de revue',
    pending:'en attente',
    accepted:'acceptÃ©',
    rejected:'rejetÃ©',
    needsEdit:'Ã  modifier',
    accept:'Accepter',
    reject:'Rejeter',
    editCandidate:'Modifier le candidat',
    acceptAllReviewEvidence:'Accepter tous les Ã©lÃ©ments en attente',
    acceptEditedReviewEvidence:'Accepter le candidat modifiÃ©',
    exportEvidenceReviewQueue:'Exporter la file de revue',
    clearResolvedReviewEvidence:'Effacer les Ã©lÃ©ments rÃ©solus',
    statusSourceImported:'Candidats envoyÃ©s dans la file de revue des preuves.',
    statusEvidenceAccepted:'Candidat acceptÃ© dans la matrice.',
    statusEvidenceRejected:'Candidat rejetÃ©.',
    statusReviewEditing:'Candidat chargÃ© dans le formulaire pour modification.',
    statusReviewQueueExported:'File de revue exportÃ©e.',
    statusReviewQueueCleared:'Ã‰lÃ©ments rÃ©solus effacÃ©s.',
    statusNoReviewSelection:'Chargez un candidat avant dâ€™accepter la version modifiÃ©e.',
    sourcePacketBuilderTitle:'Constructeur de paquet source',
    sourcePacketBuilderSubtitle:'Construire un paquet source manuel/local depuis les preuves ou la file de revue.',
    sourcePacketBuilderPolicyNote:'Le constructeur est local/manuel: aucun fetch live et aucune vÃ©rification de source.',
    buildSourcePacketFromEvidence:'Construire depuis la matrice',
    buildSourcePacketFromReview:'Construire depuis la revue',
    copySourcePacketBuilder:'Copier le paquet source',
    exportSourcePacketBuilder:'Exporter le paquet source',
    statusSourcePacketBuilt:'Paquet source manuel construit. VÃ©rifiez les alertes de score avant rÃ©utilisation.',
    statusSourcePacketEmpty:'Aucune preuve disponible pour construire un paquet source.',
    statusSourcePacketCopied:'Paquet source copiÃ©.',
    statusSourcePacketExported:'Paquet source exportÃ©.',
    statusEvidenceNeedsEdit:'Candidat marquÃ© Ã  modifier par les contrÃ´les de scoring.'
  });


  Object.assign(COPY.en, {
    qualityV3Score:'Quality v3',
    completenessScore:'Completeness',
    evidenceStrengthScore:'Evidence strength', evidenceReliabilityScore:'Evidence reliability', attentionSignalIntegrityScore:'Attention integrity',
    contradictionCoverageScore:'Contradiction coverage',
    sourceDiversityScore:'Source diversity',
    actorLayerCoverageScore:'Actor/layer coverage',
    causalLinkDensityScore:'Causal-link density',
    providerSafetyScore:'Provider safety',
    privacySafetyScore:'Privacy safety',
    migrationSafetyScore:'Migration safety',
    publicationReadiness:'Publication readiness',
    weakestDimensions:'Weakest dimensions',
    fixActions:'Fix actions',
    templateTitle:'Analysis Template',
    templateSubtitle:'Choose the analytical lens. Templates change prompts and diagnostics, not the shared evidence discipline.',
    analysisTemplate:'Analysis template',
    applyTemplate:'Apply template to plan',
    exportTemplateProfile:'Export template profile',
    templateScore:'Template fit',
    templateOutputFocus:'Output focus',
    templateRequiredLayers:'Required layers',
    templatePromptDirectives:'Prompt directives',
    statusTemplateApplied:'Analysis template applied to the research plan.',
    statusTemplateExported:'Analysis template profile exported.'
  });
  Object.assign(COPY.ar, {
    qualityV3Score:'Ø§Ù„Ø¬ÙˆØ¯Ø© v3',
    completenessScore:'Ø§Ù„Ø§ÙƒØªÙ…Ø§Ù„',
    evidenceStrengthScore:'Ù‚ÙˆØ© Ø§Ù„Ø£Ø¯Ù„Ø©', evidenceReliabilityScore:'Ù…ÙˆØ«ÙˆÙ‚ÙŠØ© Ø§Ù„Ø£Ø¯Ù„Ø©', attentionSignalIntegrityScore:'Ø³Ù„Ø§Ù…Ø© Ø¥Ø´Ø§Ø±Ø© Ø§Ù„Ø§Ù†ØªØ¨Ø§Ù‡',
    contradictionCoverageScore:'ØªØºØ·ÙŠØ© Ø§Ù„ØªÙ†Ø§Ù‚Ø¶Ø§Øª',
    sourceDiversityScore:'ØªÙ†ÙˆØ¹ Ø§Ù„Ù…ØµØ§Ø¯Ø±',
    actorLayerCoverageScore:'ØªØºØ·ÙŠØ© Ø§Ù„ÙØ§Ø¹Ù„ÙŠÙ†/Ø§Ù„Ø·Ø¨Ù‚Ø§Øª',
    causalLinkDensityScore:'ÙƒØ«Ø§ÙØ© Ø§Ù„Ø±ÙˆØ§Ø¨Ø· Ø§Ù„Ø³Ø¨Ø¨ÙŠØ©',
    providerSafetyScore:'Ø£Ù…Ø§Ù† Ø§Ù„Ù…Ø²ÙˆÙ‘Ø¯',
    privacySafetyScore:'Ø£Ù…Ø§Ù† Ø§Ù„Ø®ØµÙˆØµÙŠØ©',
    migrationSafetyScore:'Ø£Ù…Ø§Ù† Ø§Ù„ØªØ±Ø­ÙŠÙ„',
    publicationReadiness:'Ø¬Ø§Ù‡Ø²ÙŠØ© Ø§Ù„Ù†Ø´Ø±',
    weakestDimensions:'Ø£Ø¶Ø¹Ù Ø§Ù„Ø£Ø¨Ø¹Ø§Ø¯',
    fixActions:'Ø®Ø·ÙˆØ§Øª Ø§Ù„ØªØµØ­ÙŠØ­',
    templateTitle:'Ù‚Ø§Ù„Ø¨ Ø§Ù„ØªØ­Ù„ÙŠÙ„',
    templateSubtitle:'Ø§Ø®ØªØ± Ø¹Ø¯Ø³Ø© Ø§Ù„ØªØ­Ù„ÙŠÙ„. Ø§Ù„Ù‚ÙˆØ§Ù„Ø¨ ØªØºÙŠÙ‘Ø± Ø§Ù„Ø¨Ø±ÙˆÙ…Ø¨ØªØ§Øª ÙˆØ§Ù„ØªØ´Ø®ÙŠØµØ§Øª ÙÙ‚Ø·ØŒ ÙˆÙ„Ø§ ØªØªØ¬Ø§ÙˆØ² Ø§Ù†Ø¶Ø¨Ø§Ø· Ø§Ù„Ø£Ø¯Ù„Ø©.',
    analysisTemplate:'Ù‚Ø§Ù„Ø¨ Ø§Ù„ØªØ­Ù„ÙŠÙ„',
    applyTemplate:'ØªØ·Ø¨ÙŠÙ‚ Ø§Ù„Ù‚Ø§Ù„Ø¨ Ø¹Ù„Ù‰ Ø§Ù„Ø®Ø·Ø©',
    exportTemplateProfile:'ØªØµØ¯ÙŠØ± Ù…Ù„Ù Ø§Ù„Ù‚Ø§Ù„Ø¨',
    templateScore:'Ù…Ù„Ø§Ø¡Ù…Ø© Ø§Ù„Ù‚Ø§Ù„Ø¨',
    templateOutputFocus:'Ù…Ø­ÙˆØ± Ø§Ù„Ø¥Ø®Ø±Ø§Ø¬',
    templateRequiredLayers:'Ø§Ù„Ø·Ø¨Ù‚Ø§Øª Ø§Ù„Ù…Ø·Ù„ÙˆØ¨Ø©',
    templatePromptDirectives:'ØªÙˆØ¬ÙŠÙ‡Ø§Øª Ø§Ù„Ø¨Ø±ÙˆÙ…Ø¨Øª',
    statusTemplateApplied:'ØªÙ… ØªØ·Ø¨ÙŠÙ‚ Ù‚Ø§Ù„Ø¨ Ø§Ù„ØªØ­Ù„ÙŠÙ„ Ø¹Ù„Ù‰ Ø®Ø·Ø© Ø§Ù„Ø¨Ø­Ø«.',
    statusTemplateExported:'ØªÙ… ØªØµØ¯ÙŠØ± Ù…Ù„Ù Ù‚Ø§Ù„Ø¨ Ø§Ù„ØªØ­Ù„ÙŠÙ„.'
  });
  Object.assign(COPY.fr, {
    qualityV3Score:'QualitÃ© v3',
    completenessScore:'ComplÃ©tude',
    evidenceStrengthScore:'Force des preuves', evidenceReliabilityScore:'FiabilitÃ© des preuves', attentionSignalIntegrityScore:'IntÃ©gritÃ© du signal attention',
    contradictionCoverageScore:'Couverture contradictions',
    sourceDiversityScore:'DiversitÃ© sources',
    actorLayerCoverageScore:'Couverture acteurs/couches',
    causalLinkDensityScore:'DensitÃ© causale',
    providerSafetyScore:'SÃ©curitÃ© fournisseur',
    privacySafetyScore:'SÃ©curitÃ© confidentialitÃ©',
    migrationSafetyScore:'SÃ©curitÃ© migration',
    publicationReadiness:'PrÃ©paration publication',
    weakestDimensions:'Dimensions faibles',
    fixActions:'Actions correctives',
    templateTitle:'ModÃ¨le dâ€™analyse',
    templateSubtitle:'Choisissez la lentille analytique. Les modÃ¨les changent les prompts et diagnostics, pas la discipline des preuves.',
    analysisTemplate:'ModÃ¨le dâ€™analyse',
    applyTemplate:'Appliquer au plan',
    exportTemplateProfile:'Exporter le profil du modÃ¨le',
    templateScore:'AdÃ©quation modÃ¨le',
    templateOutputFocus:'Focus de sortie',
    templateRequiredLayers:'Couches requises',
    templatePromptDirectives:'Directives prompt',
    statusTemplateApplied:'ModÃ¨le dâ€™analyse appliquÃ© au plan de recherche.',
    statusTemplateExported:'Profil du modÃ¨le exportÃ©.'
  });


  Object.assign(COPY.en, {
    sourcePacketBuilderGuardrail:'Browser QA guardrail: generated packets remain local/manual, copy/export controls must stay visible, and warning chips must wrap without horizontal overflow.',
    sourcePacketBuilderQaNoLive:'No live fetching',
    sourcePacketBuilderQaLocalOnly:'Local/manual packet only',
    sourcePacketBuilderQaWrap:'Chips wrap on mobile',
    sourcePacketBuilderBrowserQaNote:'Browser QA: copy/export controls stay reachable; summary chips wrap; this preview is metadata only, not verification.',
    sourcePacketPackets:'packets',
    sourcePacketEvidence:'evidence',
    sourcePacketWarnings:'Warnings',
    sourcePacketWeakTraceability:'Weak traceability',
    sourcePacketAttentionReliabilityRisks:'Attention/reliability risks'
  });
  Object.assign(COPY.ar, {
    sourcePacketBuilderGuardrail:'Ø¶Ø§Ø¨Ø· QA Ù„Ù„Ù…ØªØµÙØ­: Ø§Ù„Ø­Ø²Ù… Ø§Ù„Ù…ÙˆÙ„Ù‘Ø¯Ø© ØªØ¨Ù‚Ù‰ Ù…Ø­Ù„ÙŠØ©/ÙŠØ¯ÙˆÙŠØ©ØŒ Ø£Ø²Ø±Ø§Ø± Ø§Ù„Ù†Ø³Ø® ÙˆØ§Ù„ØªØµØ¯ÙŠØ± ØªØ¨Ù‚Ù‰ Ø¸Ø§Ù‡Ø±Ø©ØŒ ÙˆØ±Ù‚Ø§Ø¦Ù‚ Ø§Ù„ØªØ­Ø°ÙŠØ± ØªÙ„ØªÙ Ø¯ÙˆÙ† ØªÙ…Ø¯Ø¯ Ø£ÙÙ‚ÙŠ.',
    sourcePacketBuilderQaNoLive:'Ù„Ø§ Ø¬Ù„Ø¨ Ù…Ø¨Ø§Ø´Ø±',
    sourcePacketBuilderQaLocalOnly:'Ø­Ø²Ù…Ø© Ù…Ø­Ù„ÙŠØ©/ÙŠØ¯ÙˆÙŠØ© ÙÙ‚Ø·',
    sourcePacketBuilderQaWrap:'Ø§Ù„Ø±Ù‚Ø§Ø¦Ù‚ ØªÙ„ØªÙ Ø¹Ù„Ù‰ Ø§Ù„Ù‡Ø§ØªÙ',
    sourcePacketBuilderBrowserQaNote:'QA Ø§Ù„Ù…ØªØµÙØ­: Ø£Ø²Ø±Ø§Ø± Ø§Ù„Ù†Ø³Ø® ÙˆØ§Ù„ØªØµØ¯ÙŠØ± ØªØ¨Ù‚Ù‰ Ù‚Ø§Ø¨Ù„Ø© Ù„Ù„ÙˆØµÙˆÙ„Ø› Ù…Ù„Ø®Øµ Ø§Ù„Ø±Ù‚Ø§Ø¦Ù‚ ÙŠÙ„ØªÙØ› Ù‡Ø°Ù‡ Ù…Ø¹Ø§ÙŠÙ†Ø© Ø¨ÙŠØ§Ù†Ø§Øª ÙÙ‚Ø· ÙˆÙ„ÙŠØ³Øª ØªØ­Ù‚Ù‚Ù‹Ø§.',
    sourcePacketPackets:'Ø­Ø²Ù…',
    sourcePacketEvidence:'Ø£Ø¯Ù„Ø©',
    sourcePacketWarnings:'ØªØ­Ø°ÙŠØ±Ø§Øª',
    sourcePacketWeakTraceability:'ØªØªØ¨Ù‘Ø¹ Ø¶Ø¹ÙŠÙ',
    sourcePacketAttentionReliabilityRisks:'Ù…Ø®Ø§Ø·Ø± Ø§Ù„Ø§Ù†ØªØ¨Ø§Ù‡/Ø§Ù„Ù…ÙˆØ«ÙˆÙ‚ÙŠØ©'
  });
  Object.assign(COPY.fr, {
    sourcePacketBuilderGuardrail:'Garde-fou QA navigateur : les paquets gÃ©nÃ©rÃ©s restent locaux/manuels, les contrÃ´les copier/exporter restent visibles, et les puces dâ€™alerte se replient sans dÃ©bordement horizontal.',
    sourcePacketBuilderQaNoLive:'Aucun fetch live',
    sourcePacketBuilderQaLocalOnly:'Paquet local/manuel',
    sourcePacketBuilderQaWrap:'Puces repliÃ©es mobile',
    sourcePacketBuilderBrowserQaNote:'QA navigateur : copier/exporter restent accessibles ; les puces se replient ; cet aperÃ§u est un mÃ©ta-rÃ©sumÃ©, pas une vÃ©rification.',
    sourcePacketPackets:'paquets',
    sourcePacketEvidence:'preuves',
    sourcePacketWarnings:'Alertes',
    sourcePacketWeakTraceability:'TraÃ§abilitÃ© faible',
    sourcePacketAttentionReliabilityRisks:'Risques attention/fiabilitÃ©'
  });


  Object.assign(COPY.en, {
    firstRunGuideEyebrow:'First-run guide',
    firstRunGuideTitle:'Start clean: topic â†’ plan â†’ evidence â†’ quality â†’ export',
    firstRunGuideBody:'A local-only onboarding layer keeps the first session operational without exposing advanced provider, OAuth, backend, or connector internals.',
    startGuidedSetup:'Start guided setup', goToNextStep:'Go to next step', hideGuide:'Hide guide',
    publicDemoReadyEyebrow:'Public demo ready',
    publicDemoReadyTitle:'Show the workflow without exposing unfinished internals',
    publicDemoReadyBody:'Use this build for a clean public walkthrough: manual/private mode stays default, the first-run path is visible, and release notes state what changed and what deliberately did not change.',
    localOnlyDefault:'Local-only default', safeExportBoundary:'Safe export boundary', noLiveProviderBehaviorChange:'No live-provider behavior change', releaseNotesReady:'Release notes ready',
    hostedDemoVerificationEyebrow:'Hosted demo verification', hostedDemoVerificationTitle:'Publish only after browser evidence exists',
    hostedDemoVerificationBody:'Source-to-Brief Intelligence Workbench is ready for release evidence: the public copy is stable, the golden workflow and Export Pack v3 remain locked, and hosted evidence must report 1.2.0-alpha.2 internally while showing v1.2.0-alpha.2 Source-to-Brief Intelligence Workbench to users. No live scraping, real OAuth, backend expansion, live provider execution, or automatic source verification is enabled.',
    hostedUrlChecked:'Hosted URL checked', desktopEvidence:'Desktop evidence', mobileEvidence:'Mobile evidence', providerExportEvidence:'Provider/export evidence',
    evidenceReviewGateEyebrow:'Evidence review gate', evidenceReviewGateTitle:'Review screenshots and metadata before publish',
    evidenceReviewGateBody:'Stable release evidence preserves the Evidence Review Queue, publication review gate, Export Pack v3, golden workflow, and privacy guards. Screenshots or ZIP files alone are insufficient for release approval.',
    hostedUrlSmoke:'Hosted URL smoke', noOverflowProof:'No overflow proof', metadataArtifact:'Metadata artifact', reviewedBeforePublish:'Reviewed before publish',
    stableWorkflowEyebrow:'Stable workflow', stableWorkflowTitle:'Next action: add evidence â†’ review clusters â†’ link entities and gaps',
    stableWorkflowBody:'Advanced provider, OAuth, backend, source, and release diagnostics are collapsed until a selected post-freeze lane has criteria, falsifiers, and review gates; implementation remains blocked.',
    analysisTab:'Analysis', evidenceTab:'Evidence', sourcesTab:'Sources', qualityExportTab:'Quality & Export', settingsAdvancedTab:'Settings / Advanced'
  });
  Object.assign(COPY.ar, {
    firstRunGuideEyebrow:'Ø¯Ù„ÙŠÙ„ Ø§Ù„Ø¨Ø¯Ø¡ Ø§Ù„Ø£ÙˆÙ„',
    firstRunGuideTitle:'Ø§Ø¨Ø¯Ø£ Ù…Ù† Ù…Ø³Ø§Ø± Ù†Ø¸ÙŠÙ: Ø§Ù„Ù…ÙˆØ¶ÙˆØ¹ â†’ Ø§Ù„Ø®Ø·Ø© â†’ Ø§Ù„Ø£Ø¯Ù„Ø© â†’ Ø§Ù„Ø¬ÙˆØ¯Ø© â†’ Ø§Ù„ØªØµØ¯ÙŠØ±',
    firstRunGuideBody:'Ø·Ø¨Ù‚Ø© Ø¨Ø¯Ø¡ Ù…Ø­Ù„ÙŠØ© ÙÙ‚Ø· ØªÙØ¨Ù‚ÙŠ Ø§Ù„Ø¬Ù„Ø³Ø© Ø§Ù„Ø£ÙˆÙ„Ù‰ Ù‚Ø§Ø¨Ù„Ø© Ù„Ù„ØªØ´ØºÙŠÙ„ Ø¯ÙˆÙ† ÙƒØ´Ù ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ù…Ø²ÙˆÙ‘Ø¯ Ø§Ù„Ù…ØªÙ‚Ø¯Ù… Ø£Ùˆ OAuth Ø£Ùˆ Ø§Ù„Ø®Ù„ÙÙŠØ© Ø£Ùˆ Ø§Ù„Ù…ÙˆØµÙ„Ø§Øª.',
    startGuidedSetup:'Ø§Ø¨Ø¯Ø£ Ø§Ù„Ø¥Ø¹Ø¯Ø§Ø¯ Ø§Ù„Ù…ÙˆØ¬Ù‘Ù‡', goToNextStep:'Ø§Ù†ØªÙ‚Ù„ Ø¥Ù„Ù‰ Ø§Ù„Ø®Ø·ÙˆØ© Ø§Ù„ØªØ§Ù„ÙŠØ©', hideGuide:'Ø¥Ø®ÙØ§Ø¡ Ø§Ù„Ø¯Ù„ÙŠÙ„',
    publicDemoReadyEyebrow:'Ø§Ù„Ø¹Ø±Ø¶ Ø§Ù„Ø¹Ø§Ù… Ø¬Ø§Ù‡Ø²',
    publicDemoReadyTitle:'Ø§Ø¹Ø±Ø¶ Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ Ø¯ÙˆÙ† ÙƒØ´Ù Ø§Ù„Ø£Ø¬Ø²Ø§Ø¡ Ø§Ù„Ø¯Ø§Ø®Ù„ÙŠØ© ØºÙŠØ± Ø§Ù„Ù…ÙƒØªÙ…Ù„Ø©',
    publicDemoReadyBody:'Ø§Ø³ØªØ®Ø¯Ù… Ù‡Ø°Ù‡ Ø§Ù„Ù†Ø³Ø®Ø© Ù„Ø¹Ø±Ø¶ Ø¹Ø§Ù… ÙˆØ§Ø¶Ø­: ÙŠØ¨Ù‚Ù‰ Ø§Ù„Ù†Ù…Ø· Ø§Ù„ÙŠØ¯ÙˆÙŠ/Ø§Ù„Ø®Ø§Øµ Ù‡Ùˆ Ø§Ù„Ø§ÙØªØ±Ø§Ø¶ÙŠØŒ ÙˆÙŠØ¸Ù„ Ù…Ø³Ø§Ø± Ø§Ù„Ø¨Ø¯Ø¡ Ø§Ù„Ø£ÙˆÙ„ Ø¸Ø§Ù‡Ø±Ù‹Ø§ØŒ ÙˆØªÙˆØ¶Ø­ Ù…Ù„Ø§Ø­Ø¸Ø§Øª Ø§Ù„Ø¥ØµØ¯Ø§Ø± Ù…Ø§ ØªØºÙŠÙ‘Ø± ÙˆÙ…Ø§ Ù„Ù… ÙŠØªØºÙŠÙ‘Ø± Ø¹Ù…Ø¯Ù‹Ø§.',
    localOnlyDefault:'Ø§ÙØªØ±Ø§Ø¶ÙŠ Ù…Ø­Ù„ÙŠ ÙÙ‚Ø·', safeExportBoundary:'Ø­Ø¯ÙˆØ¯ ØªØµØ¯ÙŠØ± Ø¢Ù…Ù†Ø©', noLiveProviderBehaviorChange:'Ù„Ø§ ØªØºÙŠÙŠØ± ÙÙŠ Ø³Ù„ÙˆÙƒ Ø§Ù„Ù…Ø²ÙˆÙ‘Ø¯ Ø§Ù„Ø­ÙŠ', releaseNotesReady:'Ù…Ù„Ø§Ø­Ø¸Ø§Øª Ø§Ù„Ø¥ØµØ¯Ø§Ø± Ø¬Ø§Ù‡Ø²Ø©',
    hostedDemoVerificationEyebrow:'Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ø§Ù„Ø¹Ø±Ø¶ Ø§Ù„Ù…Ø³ØªØ¶Ø§Ù', hostedDemoVerificationTitle:'Ù„Ø§ ØªÙ†Ø´Ø± Ø¥Ù„Ø§ Ø¨Ø¹Ø¯ ØªÙˆÙØ± Ø£Ø¯Ù„Ø© Ø§Ù„Ù…ØªØµÙØ­',
    hostedDemoVerificationBody:'Ø§Ù„Ø¹Ø±Ø¶ Ø§Ù„Ø¹Ø§Ù… Ø§Ù„Ù…Ø³ØªÙ‚Ø± Ø¬Ø§Ù‡Ø² Ù„Ø£Ø¯Ù„Ø© Ø§Ù„Ø¥ØµØ¯Ø§Ø±: Ø§Ù„Ù†Ø³Ø®Ø© Ø§Ù„Ø¹Ø§Ù…Ø© Ù…Ø³ØªÙ‚Ø±Ø©ØŒ Ø§Ù„Ù…Ø¬Ù…ÙˆØ¹Ø© Ø§Ù„Ø°Ù‡Ø¨ÙŠØ© ÙˆExport Pack v3 Ù…Ù‚ÙÙˆÙ„Ø§Ù†ØŒ ÙˆÙŠØ¬Ø¨ Ø£Ù† ØªØ¹Ù„Ù† Ø£Ø¯Ù„Ø© Ø§Ù„Ø§Ø³ØªØ¶Ø§ÙØ© Ø¯Ø§Ø®Ù„ÙŠÙ‹Ø§ 1.2.0-alpha.2 Ù…Ø¹ Ø¹Ø±Ø¶ v1.1.0 Ø§Ù„Ø¹Ø±Ø¶ Ø§Ù„Ø¹Ø§Ù… Ø§Ù„Ù…Ø³ØªÙ‚Ø± Ù„Ù„Ù…Ø³ØªØ®Ø¯Ù…ÙŠÙ†. Ù„Ø§ ÙŠÙˆØ¬Ø¯ scraping Ø£Ùˆ OAuth Ø­Ù‚ÙŠÙ‚ÙŠ Ø£Ùˆ ØªÙˆØ³ÙŠØ¹ Ø®Ù„ÙÙŠØ© Ø£Ùˆ ØªÙ†ÙÙŠØ° Ù…Ø²ÙˆØ¯ Ø­ÙŠ Ø£Ùˆ Ø§Ø¯Ø¹Ø§Ø¡ ØªØ­Ù‚Ù‚ Ø¢Ù„ÙŠ Ù…Ù† Ø§Ù„Ù…ØµØ§Ø¯Ø±.',
    hostedUrlChecked:'ØªÙ… ÙØ­Øµ Ø±Ø§Ø¨Ø· Ø§Ù„Ø§Ø³ØªØ¶Ø§ÙØ©', desktopEvidence:'Ø¯Ù„ÙŠÙ„ Ø³Ø·Ø­ Ø§Ù„Ù…ÙƒØªØ¨', mobileEvidence:'Ø¯Ù„ÙŠÙ„ Ø§Ù„Ù‡Ø§ØªÙ', providerExportEvidence:'Ø¯Ù„ÙŠÙ„ Ø§Ù„Ù…Ø²ÙˆÙ‘Ø¯/Ø§Ù„ØªØµØ¯ÙŠØ±',
    evidenceReviewGateEyebrow:'Ø¨ÙˆØ§Ø¨Ø© Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ø£Ø¯Ù„Ø©', evidenceReviewGateTitle:'Ø±Ø§Ø¬Ø¹ Ø§Ù„Ù„Ù‚Ø·Ø§Øª ÙˆØ§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„ÙˆØµÙÙŠØ© Ù‚Ø¨Ù„ Ø§Ù„Ù†Ø´Ø±',
    evidenceReviewGateBody:'ØªØ­Ø§ÙØ¸ Ø£Ø¯Ù„Ø© Ø§Ù„Ø¥ØµØ¯Ø§Ø± Ø§Ù„Ù…Ø³ØªÙ‚Ø± Ø¹Ù„Ù‰ ØµÙ Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ø£Ø¯Ù„Ø©ØŒ Ø¨ÙˆØ§Ø¨Ø© Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ù†Ø´Ø±ØŒ Export Pack v3ØŒ Ø§Ù„Ù…Ø¬Ù…ÙˆØ¹Ø© Ø§Ù„Ø°Ù‡Ø¨ÙŠØ©ØŒ ÙˆØ­Ø±Ø§Ø³ Ø§Ù„Ø®ØµÙˆØµÙŠØ©. Ù„Ø§ ØªÙƒÙÙŠ Ø§Ù„Ù„Ù‚Ø·Ø§Øª Ø£Ùˆ Ù…Ù„ÙØ§Øª ZIP ÙˆØ­Ø¯Ù‡Ø§ Ù„Ø§Ø¹ØªÙ…Ø§Ø¯ Ø§Ù„Ø¥ØµØ¯Ø§Ø±.',
    hostedUrlSmoke:'Ø§Ø®ØªØ¨Ø§Ø± Ø¯Ø®Ø§Ù† Ù„Ø±Ø§Ø¨Ø· Ø§Ù„Ø§Ø³ØªØ¶Ø§ÙØ©', noOverflowProof:'Ø¥Ø«Ø¨Ø§Øª Ø¹Ø¯Ù… ÙˆØ¬ÙˆØ¯ ØªØ¬Ø§ÙˆØ² Ø£ÙÙ‚ÙŠ', metadataArtifact:'Ø£Ø«Ø± Ø¨ÙŠØ§Ù†Ø§Øª ÙˆØµÙÙŠØ©', reviewedBeforePublish:'ØªÙ…Øª Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø© Ù‚Ø¨Ù„ Ø§Ù„Ù†Ø´Ø±',
    stableWorkflowEyebrow:'Ø³ÙŠØ± Ø¹Ù…Ù„ Ù…Ø³ØªÙ‚Ø±', stableWorkflowTitle:'Ø§Ù„Ø¥Ø¬Ø±Ø§Ø¡ Ø§Ù„ØªØ§Ù„ÙŠ: Ø£Ø¶Ù Ø§Ù„Ø£Ø¯Ù„Ø© â†’ Ø±Ø§Ø¬Ø¹ Ø§Ù„Ø¹Ù†Ø§Ù‚ÙŠØ¯ â†’ Ø§Ø±Ø¨Ø· Ø§Ù„ÙƒÙŠØ§Ù†Ø§Øª ÙˆØ§Ù„ÙØ¬ÙˆØ§Øª',
    stableWorkflowBody:'ØªØ¨Ù‚Ù‰ ØªØ´Ø®ÙŠØµØ§Øª Ø§Ù„Ù…Ø²ÙˆÙ‘Ø¯ Ø§Ù„Ù…ØªÙ‚Ø¯Ù… ÙˆOAuth ÙˆØ§Ù„Ø®Ù„ÙÙŠØ© ÙˆØ§Ù„Ù…ØµØ§Ø¯Ø± ÙˆØ§Ù„Ø¥ØµØ¯Ø§Ø± Ù…Ø·ÙˆÙŠØ© Ø­ØªÙ‰ ÙŠØ­ØµÙ„ Ù…Ø³Ø§Ø± Ù…Ø§ Ø¨Ø¹Ø¯ Ø§Ù„ØªØ¬Ù…ÙŠØ¯ Ø¹Ù„Ù‰ Ù…Ø¹Ø§ÙŠÙŠØ± Ù‚Ø¨ÙˆÙ„ ÙˆØ´Ø±ÙˆØ· Ø¥Ø¨Ø·Ø§Ù„ ÙˆØ¨ÙˆØ§Ø¨Ø§Øª Ù…Ø±Ø§Ø¬Ø¹Ø© ÙˆØ§Ø¶Ø­Ø©Ø› ÙˆÙŠØ¸Ù„ Ø§Ù„ØªÙ†ÙÙŠØ° Ù…Ø­Ø¸ÙˆØ±Ù‹Ø§.',
    analysisTab:'Ø§Ù„ØªØ­Ù„ÙŠÙ„', evidenceTab:'Ø§Ù„Ø£Ø¯Ù„Ø©', sourcesTab:'Ø§Ù„Ù…ØµØ§Ø¯Ø±', qualityExportTab:'Ø§Ù„Ø¬ÙˆØ¯Ø© ÙˆØ§Ù„ØªØµØ¯ÙŠØ±', settingsAdvancedTab:'Ø§Ù„Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª / Ø§Ù„Ù…ØªÙ‚Ø¯Ù…',
    providerEndpoint:'Ù†Ù‚Ø·Ø© Ø§Ù„Ù†Ù‡Ø§ÙŠØ©', providerModel:'Ø§Ù„Ù†Ù…ÙˆØ°Ø¬', providerApiKey:'Ù…ÙØªØ§Ø­ API', rememberProviderKey:'Ø­ÙØ¸ Ø§Ù„Ù…ÙØªØ§Ø­ Ù…Ø­Ù„ÙŠÙ‹Ø§ Ø¹Ù„Ù‰ Ù‡Ø°Ø§ Ø§Ù„Ø¬Ù‡Ø§Ø²', enableLiveByok:'ØªÙØ¹ÙŠÙ„ Ø§Ø³ØªØ¯Ø¹Ø§Ø¡Ø§Øª Ø§Ù„Ù…Ø²ÙˆÙ‘Ø¯ Ø§Ù„Ø­ÙŠØ©', providerSafety:'Ø§Ù„Ø£Ù…Ø§Ù†: ÙŠØ¨Ù‚Ù‰ Ø§Ù„Ù†Ù…Ø· Ø§Ù„ÙŠØ¯ÙˆÙŠ/Ø§Ù„Ø®Ø§Øµ Ù‡Ùˆ Ø§Ù„Ø§ÙØªØ±Ø§Ø¶ÙŠ. Ù„Ø§ ØªÙØµØ¯Ù‘ÙŽØ± Ø§Ù„Ù…ÙØ§ØªÙŠØ­ ÙÙŠ Ø§Ù„Ø­Ø²Ù… Ø£Ùˆ Ø§Ù„ØªÙ‚Ø§Ø±ÙŠØ± Ø£Ùˆ Ø³Ø¬Ù„ Ø§Ù„ØªØ´ØºÙŠÙ„.', validateProviderSettings:'Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ø§Ù„Ù…Ø²ÙˆÙ‘Ø¯', dryRunProviderRequest:'Ø¨Ù†Ø§Ø¡ Ø·Ù„Ø¨ ØªØ¬Ø±ÙŠØ¨ÙŠ Ø¯ÙˆÙ† ØªÙ†ÙÙŠØ°', byokScore:'Ø£Ù…Ø§Ù† Ù…ÙØªØ§Ø­Ùƒ Ø§Ù„Ø®Ø§Øµ', backendProxyScore:'ÙˆØ³ÙŠØ· Ø§Ù„Ø®Ù„ÙÙŠØ©', providerIdentityScore:'Ù‡ÙˆÙŠØ© Ø§Ù„Ù…Ø²ÙˆÙ‘Ø¯', statusProviderDryRun:'ØªÙ… Ø¨Ù†Ø§Ø¡ Ø­Ù…ÙˆÙ„Ø© Ø§Ù„Ù…Ø²ÙˆÙ‘Ø¯ Ø¯ÙˆÙ† Ø§Ø³ØªØ¯Ø¹Ø§Ø¡ Ø´Ø¨ÙƒÙŠ Ø­ÙŠ.', statusProviderSettingsSaved:'ØªÙ… Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ø§Ù„Ù…Ø²ÙˆÙ‘Ø¯ ÙˆØ­ÙØ¸Ù‡Ø§.', statusProviderLiveDisabled:'Ø§Ø³ØªØ¯Ø¹Ø§Ø¡Ø§Øª Ø§Ù„Ù…Ø²ÙˆÙ‘Ø¯ Ø§Ù„Ø­ÙŠØ© Ù…Ø¹Ø·Ù‘Ù„Ø©Ø› ØªÙ… ØªØ³Ø¬ÙŠÙ„ Ø§Ø³ØªØ¬Ø§Ø¨Ø© ØªØ¬Ø±ÙŠØ¨ÙŠØ©/ÙˆÙ‡Ù…ÙŠØ©.', statusProviderLiveError:'ÙØ´Ù„ Ø§Ø³ØªØ¯Ø¹Ø§Ø¡ Ø§Ù„Ù…Ø²ÙˆÙ‘Ø¯ Ø§Ù„Ø­ÙŠØ› Ù„Ù… ÙŠÙØ®Ø²Ù‘ÙŽÙ† Ø£ÙŠ Ù…ÙØªØ§Ø­ ÙÙŠ Ø³Ø¬Ù„ Ø§Ù„ØªØ´ØºÙŠÙ„.', statusBackendProxyReady:'ØªÙ… Ø§Ø®ØªÙŠØ§Ø± ÙˆØ³ÙŠØ· Ø§Ù„Ø®Ù„ÙÙŠØ© Ø§Ù„Ù…Ø³ØªØ¶Ø§Ù. Ù„Ø§ ÙŠØ±Ø³Ù„ Ø§Ù„Ù…ØªØµÙØ­ Ù…ÙØªØ§Ø­ Ø§Ù„Ù…Ø²ÙˆÙ‘Ø¯.'
  });
  Object.assign(COPY.fr, {
    firstRunGuideEyebrow:'Guide de premiÃ¨re utilisation',
    firstRunGuideTitle:'DÃ©marrer proprement : sujet â†’ plan â†’ preuves â†’ qualitÃ© â†’ export',
    firstRunGuideBody:'Une couche dâ€™onboarding locale maintient la premiÃ¨re session opÃ©rationnelle sans exposer les dÃ©tails avancÃ©s du fournisseur, dâ€™OAuth, du backend ou des connecteurs.',
    startGuidedSetup:'DÃ©marrer le guidage', goToNextStep:'Passer Ã  lâ€™Ã©tape suivante', hideGuide:'Masquer le guide',
    publicDemoReadyEyebrow:'DÃ©mo publique prÃªte',
    publicDemoReadyTitle:'Montrer le workflow sans exposer les internes inachevÃ©s',
    publicDemoReadyBody:'Utilisez cette version pour une dÃ©monstration publique claire : le mode manuel/privÃ© reste par dÃ©faut, le parcours de dÃ©marrage est visible, et les notes de version indiquent ce qui a changÃ© et ce qui nâ€™a volontairement pas changÃ©.',
    localOnlyDefault:'DÃ©faut local uniquement', safeExportBoundary:'FrontiÃ¨re dâ€™export sÃ»re', noLiveProviderBehaviorChange:'Aucun changement du fournisseur live', releaseNotesReady:'Notes de version prÃªtes',
    hostedDemoVerificationEyebrow:'VÃ©rification de la dÃ©mo hÃ©bergÃ©e', hostedDemoVerificationTitle:'Publier seulement aprÃ¨s preuve navigateur',
    hostedDemoVerificationBody:'La dÃ©mo publique stable est prÃªte pour les preuves de release : la copie publique est stable, le golden workflow et Export Pack v3 restent verrouillÃ©s, et les preuves hÃ©bergÃ©es doivent annoncer 1.2.0-alpha.2 en interne tout en affichant v1.1.0 DÃ©mo publique stable aux utilisateurs. Aucun scraping, OAuth rÃ©el, extension backend, fournisseur live ni vÃ©rification automatique des sources.',
    hostedUrlChecked:'URL hÃ©bergÃ©e vÃ©rifiÃ©e', desktopEvidence:'Preuve desktop', mobileEvidence:'Preuve mobile', providerExportEvidence:'Preuve fournisseur/export',
    evidenceReviewGateEyebrow:'BarriÃ¨re de revue des preuves', evidenceReviewGateTitle:'Revoir captures et mÃ©tadonnÃ©es avant publication',
    evidenceReviewGateBody:'Les preuves de release stable conservent la file de revue des preuves, la revue publication, Export Pack v3, le golden workflow et les garde-fous de confidentialitÃ©. Captures ou ZIP seuls sont insuffisants pour approuver la release.',
    hostedUrlSmoke:'Smoke test URL hÃ©bergÃ©e', noOverflowProof:'Preuve sans dÃ©bordement', metadataArtifact:'Artefact de mÃ©tadonnÃ©es', reviewedBeforePublish:'Revu avant publication',
    stableWorkflowEyebrow:'Workflow stable', stableWorkflowTitle:'Action suivante : ajouter des preuves â†’ revoir les clusters â†’ lier entitÃ©s et lacunes',
    stableWorkflowBody:'Les diagnostics fournisseur avancÃ©, OAuth, backend, source et release restent repliÃ©s jusquâ€™Ã  ce quâ€™un axe post-gel ait critÃ¨res, falsificateurs et barriÃ¨res de revue; lâ€™implÃ©mentation reste bloquÃ©e.',
    analysisTab:'Analyse', evidenceTab:'Preuves', sourcesTab:'Sources', qualityExportTab:'QualitÃ© & Export', settingsAdvancedTab:'ParamÃ¨tres / AvancÃ©',
    providerEndpoint:'Point de terminaison', providerModel:'ModÃ¨le', providerApiKey:'ClÃ© API', rememberProviderKey:'MÃ©moriser localement sur cet appareil', enableLiveByok:'Activer les appels fournisseur live', providerSafety:'SÃ©curitÃ© : le mode manuel/privÃ© reste par dÃ©faut. Les clÃ©s ne sont jamais exportÃ©es dans les paquets, rapports ou journaux.', validateProviderSettings:'Valider les paramÃ¨tres fournisseur', dryRunProviderRequest:'Construire une requÃªte Ã  blanc', byokScore:'SÃ©curitÃ© BYOK', backendProxyScore:'Proxy backend', providerIdentityScore:'IdentitÃ© fournisseur', statusProviderDryRun:'Charge fournisseur construite sans appel rÃ©seau live.', statusProviderSettingsSaved:'ParamÃ¨tres fournisseur validÃ©s et enregistrÃ©s.', statusProviderLiveDisabled:'Appels fournisseur live dÃ©sactivÃ©s; rÃ©ponse simulÃ©e enregistrÃ©e.', statusProviderLiveError:'Ã‰chec de lâ€™appel fournisseur live; aucune clÃ© nâ€™a Ã©tÃ© stockÃ©e dans le journal.', statusBackendProxyReady:'Proxy backend hÃ©bergÃ© sÃ©lectionnÃ©. Le navigateur nâ€™envoie aucune clÃ© fournisseur.'
  });


  Object.assign(COPY.en, {
    projectWorkspaceTitle:'Project Workspace', projectWorkspaceSubtitle:'Manage named local-only research projects in this browser.', projectName:'Project name', saveProject:'Save project locally', duplicateProject:'Duplicate project', exportProject:'Export project', importProject:'Import project', deleteProject:'Delete active project',
    sourcePacketTemplateLabel:'Template preset', buildSourcePacketFromTemplate:'Build from template preset',
    showCommandCenter:'Show Command Center', hideCommandCenter:'Hide Command Center', showEngineMap:'Show Engine Map', hideEngineMap:'Hide Engine Map',
    nextActionTitle:'Next action', startTitle:'Start', firstRunComplete:'First-run path complete', goToPrefix:'Go to', doneState:'done', nextState:'next', inProgressState:'in progress', firstRunSuccessState:'first-run success', notStartedState:'not started',
    nextActionGeneratePlan:'Generate the research plan.', nextActionReviewQueue:'Review pending source candidates before they enter the Evidence Matrix.', nextActionAddEvidence:'Add evidence manually, import source candidates, or load demo evidence.', nextActionCompileBrief:'Compile the analysis brief, then inspect Quality & Export.', nextActionExportPack:'Open Quality & Export and produce Export Pack v2 when privacy is safe.', nextActionDefault:'Generate a research plan, then add evidence and validate export readiness.', firstRunStartedStatus:'First-run guide started. Generate the research plan next.',
    onboardingTopic:'Define topic', onboardingPlan:'Generate research plan', onboardingEvidence:'Add or import evidence', onboardingReview:'Review queue discipline', onboardingQuality:'Check quality gate', onboardingExport:'Export safely',
    metricPlan:'Plan', metricEvidence:'Evidence', metricReview:'Review', metricQuality:'Quality', metricExport:'Export', metricReady:'ready', metricMissing:'missing', metricPending:'pending', metricClear:'clear', metricBlocked:'blocked', metricSafe:'safe',
    noPlanBody:'Generate a plan to create questions, source targets, and counter-evidence targets.', matrixEmptyBody:'Add evidence manually, load demo evidence, or import source candidates through the review queue.',
    questionsTitle:'Questions', targetSourcesTitle:'Target sources', earlyWarningTitle:'Early-warning indicators', reliability:'Reliability', attention:'Attention', flags:'flags',
    templateCoverageComplete:'Template layer coverage is currently complete.', missingTemplateLayers:'Missing template layers',
    critiqueNextActions:'Next actions', critiqueSummaryUsable:'The workflow has a usable research packet, but source verification remains outside this alpha.', critiqueSummaryWeak:'The workflow is still under-evidenced or under-linked and should not be published.', critiqueEvidenceVolumeOk:'Evidence volume is acceptable for alpha synthesis.', critiqueEvidenceVolumeWeak:'Add at least five evidence items before treating the analysis as serious.', critiqueSourceTraceabilityOk:'Source traceability exists, but still needs manual validation.', critiqueSourceTraceabilityWeak:'Strong outputs require source URL and dates; otherwise claims remain weakly traceable.', critiqueSourceDiversityOk:'Evidence is not concentrated in one or two source types.', critiqueSourceDiversityWeak:'Evidence is too concentrated in one or two source types.', critiqueCounterEvidenceOk:'At least one evidence item includes contradiction links.', critiqueCounterEvidenceWeak:'No evidence item clearly contradicts any claim or layer.', critiqueCausalRiskOk:'Causal links exist; still validate each relationship manually.', critiqueCausalRiskWeak:'Causal graph is too sparse for confident synthesis.', critiquePublicationRisk:'Alpha mock output is useful for architecture testing, not for final publication.', critiqueActionEvidence:'Add at least five evidence items from diverse source types.', critiqueActionSources:'Include source dates and URLs for source-based claims.', critiqueActionCounter:'Add counter-evidence before running final strategic synthesis.', critiqueActionCausal:'Use causal links to connect evidence to interests, actors, tools, narrative, results, and feedback.', critiqueActionFalsifiers:'Test whether scenarios are disproven by contrary indicators.',
    critiqueTypeEvidenceVolume:'Evidence volume', critiqueTypeSourceTraceability:'Source traceability', critiqueTypeSourceDiversity:'Source diversity', critiqueTypeCounterEvidenceGap:'Counter-evidence gap', critiqueTypeCausalRisk:'Causal risk', critiqueTypePublicationRisk:'Publication risk', severityLow:'low', severityMedium:'medium', severityHigh:'high',
    templateProfiles:{
      strategic_analysis_engine:{display_name:'Strategic Analysis Engine', description:'Default Interests â†’ Actors â†’ Tools â†’ Narrative â†’ Outcomes â†’ Feedback model with evidence review discipline.', output_focus:['interests','actors','tools','narrative','outcomes','feedback','contradictions','scenarios'], prompt_directives:['Use the full six-layer Jarbou3i model.','Separate observation, inference, and estimate.','Include falsifiable scenario conditions.']},
      geopolitical_event_analysis:{display_name:'Geopolitical Event Analysis', description:'Map power, escalation incentives, external actors, legitimacy claims, and observable event trajectories.'},
      policy_impact_analysis:{display_name:'Policy Impact Analysis', description:'Evaluate beneficiaries, implementation tools, distributional effects, second-order outcomes, and policy feedback.'},
      market_technology_trend_analysis:{display_name:'Market / Technology Trend Analysis', description:'Assess adoption incentives, platform actors, constraints, narratives, market outcomes, and weak signals.'},
      actor_incentive_map:{display_name:'Actor Incentive Map', description:'Prioritize actor incentives, constraints, leverage, coalition logic, and likely adaptation paths.'},
      contradiction_audit:{display_name:'Contradiction Audit', description:'Compare declared narratives against actions, incentives, outcomes, and counter-evidence.'},
      scenario_forecast:{display_name:'Scenario Forecast', description:'Produce competing futures with drivers, signals, probabilities, and falsification conditions.'}
    }
  });
  Object.assign(COPY.ar, {
    projectWorkspaceTitle:'Ù…Ø³Ø§Ø­Ø© Ø§Ù„Ù…Ø´Ø±ÙˆØ¹', projectWorkspaceSubtitle:'Ø¥Ø¯Ø§Ø±Ø© Ù…Ø´Ø§Ø±ÙŠØ¹ Ø¨Ø­Ø«ÙŠØ© Ù…Ø­Ù„ÙŠØ© ÙÙ‚Ø· Ø¯Ø§Ø®Ù„ Ù‡Ø°Ø§ Ø§Ù„Ù…ØªØµÙØ­.', projectName:'Ø§Ø³Ù… Ø§Ù„Ù…Ø´Ø±ÙˆØ¹', saveProject:'Ø­ÙØ¸ Ø§Ù„Ù…Ø´Ø±ÙˆØ¹ Ù…Ø­Ù„ÙŠÙ‹Ø§', duplicateProject:'Ù†Ø³Ø® Ø§Ù„Ù…Ø´Ø±ÙˆØ¹', exportProject:'ØªØµØ¯ÙŠØ± Ø§Ù„Ù…Ø´Ø±ÙˆØ¹', importProject:'Ø§Ø³ØªÙŠØ±Ø§Ø¯ Ù…Ø´Ø±ÙˆØ¹', deleteProject:'Ø­Ø°Ù Ø§Ù„Ù…Ø´Ø±ÙˆØ¹ Ø§Ù„Ù†Ø´Ø·',
    providerTitle:'Ù†Ø¸Ø§Ù… Ø§Ù„Ù…Ø²ÙˆÙ‘Ø¯', providerSubtitle:'Ø¹Ù‚ÙˆØ¯ Ø·Ù„Ø¨ Ø¬Ø§Ù‡Ø²Ø© Ù„Ù„Ù…Ø²ÙˆÙ‘Ø¯ Ù…Ø¹ ÙˆØ¶Ø¹ ÙˆÙ‡Ù…ÙŠ ÙˆBYOK ÙˆÙˆØ³ÙŠØ· Ø®Ù„ÙÙŠØ© ÙˆØ­Ø³Ø§Ø¨ Ù…Ø­Ù…ÙˆÙ„ ØªØ¬Ø±ÙŠØ¨ÙŠ. Ø§Ù„Ø§Ø³ØªØ¯Ø¹Ø§Ø¡Ø§Øª Ø§Ù„Ø­ÙŠØ© ØªØªØ·Ù„Ø¨ Ù…ÙˆØ§ÙÙ‚Ø© ØµØ±ÙŠØ­Ø©.', providerName:'Ø§Ù„Ù…Ø²ÙˆÙ‘Ø¯', providerTask:'Ø§Ù„Ù…Ù‡Ù…Ø©', taskPlan:'Ø®Ø·Ø© Ø¨Ø­Ø«', taskSynthesis:'ØªÙˆÙ„ÙŠÙ Ø§Ø³ØªØ±Ø§ØªÙŠØ¬ÙŠ', taskRepair:'Ø¥ØµÙ„Ø§Ø­ JSON', taskCritique:'Ù†Ù‚Ø¯', taskSourceDiscipline:'Ø§Ù†Ø¶Ø¨Ø§Ø· Ø§Ù„Ù…ØµØ§Ø¯Ø±', runProviderTask:'ØªØ´ØºÙŠÙ„ Ù…Ù‡Ù…Ø© Ø§Ù„Ù…Ø²ÙˆÙ‘Ø¯', previewProviderContract:'Ù…Ø¹Ø§ÙŠÙ†Ø© Ø§Ù„Ø¹Ù‚Ø¯', previewProviderPrompt:'Ù…Ø¹Ø§ÙŠÙ†Ø© Ø§Ù„Ø¨Ø±ÙˆÙ…Ø¨Øª', runProviderFixtureSuite:'ØªØ´ØºÙŠÙ„ Ø§Ø®ØªØ¨Ø§Ø±Ø§Øª Ø§Ù„Ø¹Ù‚ÙˆØ¯', exportProviderDiagnostics:'ØªØµØ¯ÙŠØ± Ø§Ù„ØªØ´Ø®ÙŠØµØ§Øª', copyProviderPayload:'Ù†Ø³Ø® Ø­Ù…ÙˆÙ„Ø© Ø§Ù„Ù…Ø²ÙˆÙ‘Ø¯', exportRunLedger:'ØªØµØ¯ÙŠØ± Ø³Ø¬Ù„ Ø§Ù„ØªØ´ØºÙŠÙ„', clearRunLedger:'Ù…Ø³Ø­ Ø³Ø¬Ù„ Ø§Ù„ØªØ´ØºÙŠÙ„',
    portableTitle:'Ø­Ø³Ø§Ø¨ Ù…Ø­Ù…ÙˆÙ„ ØªØ¬Ø±ÙŠØ¨ÙŠ', portableSubtitle:'Ù…Ø­Ø§ÙƒØ§Ø© Ø±Ø¨Ø· Ø­Ø³Ø§Ø¨ OAuth/PKCE Ø¯ÙˆÙ† Ø±Ù…ÙˆØ² Ø­Ù‚ÙŠÙ‚ÙŠØ© Ø£Ùˆ Ø§Ø¹ØªÙ…Ø§Ø¯ Ø¹Ù„Ù‰ Ù…Ø²ÙˆÙ‘Ø¯ Ø®Ø§Ø±Ø¬ÙŠ.', connectPortable:'Ø±Ø¨Ø· Ø­Ø³Ø§Ø¨ Ù…Ø­Ù…ÙˆÙ„ ÙˆÙ‡Ù…ÙŠ', refreshPortable:'ØªØ­Ø¯ÙŠØ« Ø§Ù„Ø±Ù…Ø² Ø§Ù„ÙˆÙ‡Ù…ÙŠ', disconnectPortable:'ÙØµÙ„ Ø§Ù„Ø­Ø³Ø§Ø¨ Ø§Ù„Ù…Ø­Ù…ÙˆÙ„', exportPortableStatus:'ØªØµØ¯ÙŠØ± Ø­Ø§Ù„Ø© Ø§Ù„Ø­Ø³Ø§Ø¨ Ø§Ù„Ù…Ø­Ù…ÙˆÙ„',
    sourcePlanningTitle:'Ø·Ø¨Ù‚Ø© ØªØ®Ø·ÙŠØ· Ø§Ù„Ù…ØµØ§Ø¯Ø±', sourcePlanningSubtitle:'Ø®Ø·Ù‘Ø· Ù„Ø¨Ø­Ø« Ù…Ø¯Ø¹ÙˆÙ… Ø¨Ø§Ù„Ù…ØµØ§Ø¯Ø± Ù…Ø³ØªÙ‚Ø¨Ù„Ù‹Ø§ Ø¯ÙˆÙ† Ø²Ø­Ù Ø­ÙŠ Ø£Ùˆ Ø§Ø¯Ø¹Ø§Ø¡Ø§Øª ØªØ­Ù‚Ù‚ Ø¢Ù„ÙŠ.', sourceConnector:'Ø§Ù„Ù…ÙˆØµÙ„', sourceTask:'Ù…Ù‡Ù…Ø© Ø§Ù„Ù…ØµØ¯Ø±', sourceTaskPlan:'Ø®Ø·Ø© Ù…ØµØ§Ø¯Ø±', sourceTaskQuery:'Ø®Ø·Ø© Ø§Ø³ØªØ¹Ù„Ø§Ù…', sourceTaskClaim:'Ø§Ø³ØªØ®Ø±Ø§Ø¬ Ø§Ù„Ø§Ø¯Ø¹Ø§Ø¡Ø§Øª', sourceTaskScoring:'ØªÙ‚ÙŠÙŠÙ… Ø§Ù„Ø£Ø¯Ù„Ø©', sourceTaskCluster:'Ø®Ø·Ø© ØªØ¬Ù…ÙŠØ¹', sourcePolicyNote:'ØªØ®Ø·ÙŠØ· ÙÙ‚Ø·: Ù„Ø§ Ø²Ø­ÙØŒ Ù„Ø§ Ø¨Ø­Ø« Ø­ÙŠØŒ ÙˆÙ„Ø§ Ø§Ø¯Ø¹Ø§Ø¡ ØªØ­Ù‚Ù‚ Ù…Ù† Ø§Ù„Ù…ØµØ§Ø¯Ø±.', buildSourceTask:'Ø¨Ù†Ø§Ø¡ Ù…Ù‡Ù…Ø© Ù…ØµØ¯Ø±', copySourceRequest:'Ù†Ø³Ø® Ø·Ù„Ø¨ Ø§Ù„Ù…ØµØ¯Ø±', runSourceFixtureSuite:'ØªØ´ØºÙŠÙ„ Ø§Ø®ØªØ¨Ø§Ø±Ø§Øª Ø§Ù„Ù…ØµØ¯Ø±', exportSourcePolicy:'ØªØµØ¯ÙŠØ± Ø³ÙŠØ§Ø³Ø© Ø§Ù„Ù…ØµØ¯Ø±',
    sourceImportTitle:'Ù…Ø­ÙˆÙ‘Ù„ Ø§Ø³ØªÙŠØ±Ø§Ø¯ Ø§Ù„Ù…ØµØ§Ø¯Ø±', sourceImportSubtitle:'Ø§Ù„ØµÙ‚ Ù…Ø®Ø±Ø¬Ø§Øª Ø¨Ø­Ø« Ø®Ø§Ø±Ø¬ÙŠ Ø£Ùˆ JSON Ø­Ø²Ù…Ø© Ù…ØµØ§Ø¯Ø± ÙŠØ¯ÙˆÙŠØ© ÙˆØ­ÙˆÙ‘Ù„Ù‡Ø§ Ø¥Ù„Ù‰ Ù…Ø±Ø´Ø­Ø§Øª Ù‚Ø§Ø¨Ù„Ø© Ù„Ù„Ù…Ø±Ø§Ø¬Ø¹Ø© Ø¯Ø§Ø®Ù„ Ù…ØµÙÙˆÙØ© Ø§Ù„Ø£Ø¯Ù„Ø©.', sourceImportFormat:'ØµÙŠØºØ© Ø§Ù„Ø§Ø³ØªÙŠØ±Ø§Ø¯', formatAuto:'ÙƒØ´Ù ØªÙ„Ù‚Ø§Ø¦ÙŠ', sourceImportText:'Ù…Ø®Ø±Ø¬Ø§Øª Ø§Ù„Ù…ØµØ¯Ø±', sourceImportPolicyNote:'Ø§Ù„Ø§Ø³ØªÙŠØ±Ø§Ø¯ ÙŠØ¯ÙˆÙŠ ÙÙ‚Ø·: ÙŠØ³ØªØ®Ø±Ø¬ Ù…Ø±Ø´Ø­Ø§Øª Ø£Ø¯Ù„Ø© Ù„ÙƒÙ†Ù‡ Ù„Ø§ ÙŠØªØ­Ù‚Ù‚ ÙˆÙ„Ø§ ÙŠØ¬Ù„Ø¨ ÙˆÙ„Ø§ ÙŠÙƒØ´Ø· Ø§Ù„Ù…ØµØ§Ø¯Ø±.', previewSourceImport:'Ù…Ø¹Ø§ÙŠÙ†Ø© Ø§Ù„Ø§Ø³ØªÙŠØ±Ø§Ø¯', exportSourceImportReport:'ØªØµØ¯ÙŠØ± ØªÙ‚Ø±ÙŠØ± Ø§Ù„Ø§Ø³ØªÙŠØ±Ø§Ø¯', clearSourceImport:'Ù…Ø³Ø­ Ø§Ù„Ø§Ø³ØªÙŠØ±Ø§Ø¯',
    sourcePacketTemplateLabel:'Ù‚Ø§Ù„Ø¨ Ø§Ù„Ø­Ø²Ù…Ø©', buildSourcePacketFromTemplate:'Ø¨Ù†Ø§Ø¡ Ù…Ù† Ø§Ù„Ù‚Ø§Ù„Ø¨ Ø§Ù„Ù…Ø­Ø¯Ø¯',
    showCommandCenter:'Ø¥Ø¸Ù‡Ø§Ø± Ù…Ø±ÙƒØ² Ø§Ù„Ù‚ÙŠØ§Ø¯Ø©', hideCommandCenter:'Ø¥Ø®ÙØ§Ø¡ Ù…Ø±ÙƒØ² Ø§Ù„Ù‚ÙŠØ§Ø¯Ø©', showEngineMap:'Ø¥Ø¸Ù‡Ø§Ø± Ø®Ø±ÙŠØ·Ø© Ø§Ù„Ù…Ø­Ø±Ùƒ', hideEngineMap:'Ø¥Ø®ÙØ§Ø¡ Ø®Ø±ÙŠØ·Ø© Ø§Ù„Ù…Ø­Ø±Ùƒ',
    nextActionTitle:'Ø§Ù„Ø®Ø·ÙˆØ© Ø§Ù„ØªØ§Ù„ÙŠØ©', startTitle:'Ø§Ø¨Ø¯Ø£', firstRunComplete:'Ø§ÙƒØªÙ…Ù„ Ù…Ø³Ø§Ø± Ø§Ù„Ø¨Ø¯Ø¡ Ø§Ù„Ø£ÙˆÙ„', goToPrefix:'Ø§Ù†ØªÙ‚Ù„ Ø¥Ù„Ù‰', doneState:'ØªÙ…', nextState:'Ø§Ù„ØªØ§Ù„ÙŠ', inProgressState:'Ù‚ÙŠØ¯ Ø§Ù„ØªÙ†ÙÙŠØ°', firstRunSuccessState:'Ù†Ø¬Ø§Ø­ Ø§Ù„Ø¨Ø¯Ø¡ Ø§Ù„Ø£ÙˆÙ„', notStartedState:'Ù„Ù… ÙŠØ¨Ø¯Ø£',
    nextActionGeneratePlan:'ÙˆÙ„Ù‘Ø¯ Ø®Ø·Ø© Ø§Ù„Ø¨Ø­Ø«.', nextActionReviewQueue:'Ø±Ø§Ø¬Ø¹ Ù…Ø±Ø´Ø­Ø§Øª Ø§Ù„Ù…ØµØ§Ø¯Ø± Ø§Ù„Ù…Ø¹Ù„Ù‘Ù‚Ø© Ù‚Ø¨Ù„ Ø¯Ø®ÙˆÙ„Ù‡Ø§ Ø¥Ù„Ù‰ Ù…ØµÙÙˆÙØ© Ø§Ù„Ø£Ø¯Ù„Ø©.', nextActionAddEvidence:'Ø£Ø¶Ù Ø¯Ù„ÙŠÙ„Ù‹Ø§ ÙŠØ¯ÙˆÙŠÙ‹Ø§ØŒ Ø£Ùˆ Ø§Ø³ØªÙˆØ±Ø¯ Ù…Ø±Ø´Ø­Ø§Øª Ù…ØµØ§Ø¯Ø±ØŒ Ø£Ùˆ Ø­Ù…Ù‘Ù„ Ø£Ø¯Ù„Ø© ØªØ¬Ø±ÙŠØ¨ÙŠØ©.', nextActionCompileBrief:'Ø¬Ù…Ù‘Ø¹ Ù…ÙˆØ¬Ø² Ø§Ù„ØªØ­Ù„ÙŠÙ„ØŒ Ø«Ù… Ø§ÙØ­Øµ Ø§Ù„Ø¬ÙˆØ¯Ø© ÙˆØ§Ù„ØªØµØ¯ÙŠØ±.', nextActionExportPack:'Ø§ÙØªØ­ Ø§Ù„Ø¬ÙˆØ¯Ø© ÙˆØ§Ù„ØªØµØ¯ÙŠØ± ÙˆØ£Ù†Ø´Ø¦ Ø­Ø²Ù…Ø© Export Pack v2 Ø¹Ù†Ø¯Ù…Ø§ ØªÙƒÙˆÙ† Ø§Ù„Ø®ØµÙˆØµÙŠØ© Ø¢Ù…Ù†Ø©.', nextActionDefault:'ÙˆÙ„Ù‘Ø¯ Ø®Ø·Ø© Ø¨Ø­Ø«ØŒ Ø«Ù… Ø£Ø¶Ù Ø£Ø¯Ù„Ø© ÙˆØªØ­Ù‚Ù‚ Ù…Ù† Ø¬Ø§Ù‡Ø²ÙŠØ© Ø§Ù„ØªØµØ¯ÙŠØ±.', firstRunStartedStatus:'Ø¨Ø¯Ø£ Ø¯Ù„ÙŠÙ„ Ø§Ù„ØªØ´ØºÙŠÙ„ Ø§Ù„Ø£ÙˆÙ„. ÙˆÙ„Ù‘Ø¯ Ø®Ø·Ø© Ø§Ù„Ø¨Ø­Ø« ÙƒØ®Ø·ÙˆØ© ØªØ§Ù„ÙŠØ©.',
    onboardingTopic:'ØªØ­Ø¯ÙŠØ¯ Ø§Ù„Ù…ÙˆØ¶ÙˆØ¹', onboardingPlan:'ØªÙˆÙ„ÙŠØ¯ Ø®Ø·Ø© Ø§Ù„Ø¨Ø­Ø«', onboardingEvidence:'Ø¥Ø¶Ø§ÙØ© Ø£Ùˆ Ø§Ø³ØªÙŠØ±Ø§Ø¯ Ø§Ù„Ø£Ø¯Ù„Ø©', onboardingReview:'Ø¶Ø¨Ø· ØµÙ Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø©', onboardingQuality:'ÙØ­Øµ Ø¨ÙˆØ§Ø¨Ø© Ø§Ù„Ø¬ÙˆØ¯Ø©', onboardingExport:'ØªØµØ¯ÙŠØ± Ø¢Ù…Ù†',
    metricPlan:'Ø§Ù„Ø®Ø·Ø©', metricEvidence:'Ø§Ù„Ø£Ø¯Ù„Ø©', metricReview:'Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø©', metricQuality:'Ø§Ù„Ø¬ÙˆØ¯Ø©', metricExport:'Ø§Ù„ØªØµØ¯ÙŠØ±', metricReady:'Ø¬Ø§Ù‡Ø²Ø©', metricMissing:'Ù†Ø§Ù‚Øµ', metricPending:'Ù…Ø¹Ù„Ù‘Ù‚', metricClear:'ØµØ§ÙÙ', metricBlocked:'Ù…Ø­Ø¸ÙˆØ±', metricSafe:'Ø¢Ù…Ù†',
    noPlanBody:'ÙˆÙ„Ù‘Ø¯ Ø®Ø·Ø© Ù„Ø¥Ù†Ø´Ø§Ø¡ Ø£Ø³Ø¦Ù„Ø© Ø§Ù„Ø¨Ø­Ø«ØŒ Ø£Ù‡Ø¯Ø§Ù Ø§Ù„Ù…ØµØ§Ø¯Ø±ØŒ ÙˆØ£Ù‡Ø¯Ø§Ù Ø§Ù„Ø£Ø¯Ù„Ø© Ø§Ù„Ù…Ø¶Ø§Ø¯Ø©.', matrixEmptyBody:'Ø£Ø¶Ù Ø£Ø¯Ù„Ø© ÙŠØ¯ÙˆÙŠÙ‹Ø§ØŒ Ø­Ù…Ù‘Ù„ Ø£Ø¯Ù„Ø© ØªØ¬Ø±ÙŠØ¨ÙŠØ©ØŒ Ø£Ùˆ Ø§Ø³ØªÙˆØ±Ø¯ Ù…Ø±Ø´Ø­Ø§Øª Ù…ØµØ§Ø¯Ø± Ø¹Ø¨Ø± ØµÙ Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø©.',
    questionsTitle:'Ø£Ø³Ø¦Ù„Ø© Ø§Ù„Ø¨Ø­Ø«', targetSourcesTitle:'Ø§Ù„Ù…ØµØ§Ø¯Ø± Ø§Ù„Ù…Ø³ØªÙ‡Ø¯ÙØ©', earlyWarningTitle:'Ù…Ø¤Ø´Ø±Ø§Øª Ø§Ù„Ø¥Ù†Ø°Ø§Ø± Ø§Ù„Ù…Ø¨ÙƒØ±', reliability:'Ø§Ù„Ù…ÙˆØ«ÙˆÙ‚ÙŠØ©', attention:'Ø§Ù„Ø§Ù†ØªØ¨Ø§Ù‡', flags:'Ø£Ø¹Ù„Ø§Ù…',
    templateCoverageComplete:'ØªØºØ·ÙŠØ© Ø·Ø¨Ù‚Ø§Øª Ø§Ù„Ù‚Ø§Ù„Ø¨ Ù…ÙƒØªÙ…Ù„Ø© Ø­Ø§Ù„ÙŠÙ‹Ø§.', missingTemplateLayers:'Ø·Ø¨Ù‚Ø§Øª Ø§Ù„Ù‚Ø§Ù„Ø¨ Ø§Ù„Ù†Ø§Ù‚ØµØ©',
    critiqueNextActions:'Ø§Ù„Ø¥Ø¬Ø±Ø§Ø¡Ø§Øª Ø§Ù„ØªØ§Ù„ÙŠØ©', critiqueSummaryUsable:'Ø­Ø²Ù…Ø© Ø§Ù„Ø¨Ø­Ø« Ù‚Ø§Ø¨Ù„Ø© Ù„Ù„Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø£ÙˆÙ„ÙŠÙ‹Ø§ØŒ Ù„ÙƒÙ† Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ø§Ù„Ù…ØµØ§Ø¯Ø± ÙŠØ¨Ù‚Ù‰ Ø®Ø§Ø±Ø¬ Ù†Ø·Ø§Ù‚ Ù‡Ø°Ù‡ Ø§Ù„Ù†Ø³Ø®Ø© Ø§Ù„ØªØ¬Ø±ÙŠØ¨ÙŠØ©.', critiqueSummaryWeak:'Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ Ù„Ø§ ÙŠØ²Ø§Ù„ Ø¶Ø¹ÙŠÙ Ø§Ù„Ø£Ø¯Ù„Ø© Ø£Ùˆ Ø§Ù„Ø±ÙˆØ§Ø¨Ø· ÙˆÙ„Ø§ ÙŠØµÙ„Ø­ Ù„Ù„Ù†Ø´Ø±.', critiqueEvidenceVolumeOk:'Ø­Ø¬Ù… Ø§Ù„Ø£Ø¯Ù„Ø© Ù…Ù‚Ø¨ÙˆÙ„ Ù„Ù„ØªÙˆÙ„ÙŠÙ Ø§Ù„ØªØ¬Ø±ÙŠØ¨ÙŠ.', critiqueEvidenceVolumeWeak:'Ø£Ø¶Ù Ø®Ù…Ø³Ø© Ø¹Ù†Ø§ØµØ± Ø£Ø¯Ù„Ø© Ø¹Ù„Ù‰ Ø§Ù„Ø£Ù‚Ù„ Ù‚Ø¨Ù„ Ø§Ù„ØªØ¹Ø§Ù…Ù„ Ù…Ø¹ Ø§Ù„ØªØ­Ù„ÙŠÙ„ Ø¨Ø¬Ø¯ÙŠØ©.', critiqueSourceTraceabilityOk:'ÙŠÙˆØ¬Ø¯ ØªØªØ¨Ø¹ Ù…ØµØ¯Ø±ÙŠØŒ Ù„ÙƒÙ†Ù‡ Ù…Ø§ Ø²Ø§Ù„ ÙŠØ­ØªØ§Ø¬ ØªØ­Ù‚Ù‚Ù‹Ø§ ÙŠØ¯ÙˆÙŠÙ‹Ø§.', critiqueSourceTraceabilityWeak:'Ø§Ù„Ù…Ø®Ø±Ø¬Ø§Øª Ø§Ù„Ù‚ÙˆÙŠØ© ØªØ­ØªØ§Ø¬ Ø±ÙˆØ§Ø¨Ø· ÙˆØªÙˆØ§Ø±ÙŠØ® Ù…ØµØ§Ø¯Ø±Ø› ÙˆØ¥Ù„Ø§ ØªØ¨Ù‚Ù‰ Ø§Ù„Ø§Ø¯Ø¹Ø§Ø¡Ø§Øª Ø¶Ø¹ÙŠÙØ© Ø§Ù„ØªØªØ¨Ø¹.', critiqueSourceDiversityOk:'Ø§Ù„Ø£Ø¯Ù„Ø© ØºÙŠØ± Ù…Ø­ØµÙˆØ±Ø© ÙÙŠ Ù†ÙˆØ¹ ÙˆØ§Ø­Ø¯ Ø£Ùˆ Ù†ÙˆØ¹ÙŠÙ† Ù…Ù† Ø§Ù„Ù…ØµØ§Ø¯Ø±.', critiqueSourceDiversityWeak:'Ø§Ù„Ø£Ø¯Ù„Ø© Ù…ØªØ±ÙƒØ²Ø© Ø£ÙƒØ«Ø± Ù…Ù† Ø§Ù„Ù„Ø§Ø²Ù… ÙÙŠ Ù†ÙˆØ¹ ÙˆØ§Ø­Ø¯ Ø£Ùˆ Ù†ÙˆØ¹ÙŠÙ† Ù…Ù† Ø§Ù„Ù…ØµØ§Ø¯Ø±.', critiqueCounterEvidenceOk:'ÙŠÙˆØ¬Ø¯ Ø¹Ù†ØµØ± Ø¯Ù„ÙŠÙ„ ÙˆØ§Ø­Ø¯ Ø¹Ù„Ù‰ Ø§Ù„Ø£Ù‚Ù„ ÙŠØªØ¶Ù…Ù† Ø±ÙˆØ§Ø¨Ø· ØªÙ†Ø§Ù‚Ø¶.', critiqueCounterEvidenceWeak:'Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ø¯Ù„ÙŠÙ„ ÙˆØ§Ø¶Ø­ ÙŠÙ†Ø§Ù‚Ø¶ Ø§Ø¯Ø¹Ø§Ø¡Ù‹ Ø£Ùˆ Ø·Ø¨Ù‚Ø© Ù…Ù† Ø§Ù„Ù†Ù…ÙˆØ°Ø¬.', critiqueCausalRiskOk:'ØªÙˆØ¬Ø¯ Ø±ÙˆØ§Ø¨Ø· Ø³Ø¨Ø¨ÙŠØ©ØŒ Ù„ÙƒÙ† ÙŠØ¬Ø¨ Ø§Ù„ØªØ­Ù‚Ù‚ ÙŠØ¯ÙˆÙŠÙ‹Ø§ Ù…Ù† ÙƒÙ„ Ø¹Ù„Ø§Ù‚Ø©.', critiqueCausalRiskWeak:'Ø§Ù„Ø±Ø³Ù… Ø§Ù„Ø³Ø¨Ø¨ÙŠ Ø¶Ø¹ÙŠÙ Ø¬Ø¯Ù‹Ø§ Ù„Ù„ØªÙˆÙ„ÙŠÙ Ø¨Ø«Ù‚Ø©.', critiquePublicationRisk:'Ø§Ù„Ù…Ø®Ø±Ø¬ Ø§Ù„ÙˆÙ‡Ù…ÙŠ ÙÙŠ Ø£Ù„ÙØ§ Ù…ÙÙŠØ¯ Ù„Ø§Ø®ØªØ¨Ø§Ø± Ø§Ù„Ø¨Ù†ÙŠØ©ØŒ ÙˆÙ„ÙŠØ³ Ù„Ù„Ù†Ø´Ø± Ø§Ù„Ù†Ù‡Ø§Ø¦ÙŠ.', critiqueActionEvidence:'Ø£Ø¶Ù Ø®Ù…Ø³Ø© Ø¹Ù†Ø§ØµØ± Ø£Ø¯Ù„Ø© Ø¹Ù„Ù‰ Ø§Ù„Ø£Ù‚Ù„ Ù…Ù† Ø£Ù†ÙˆØ§Ø¹ Ù…ØµØ§Ø¯Ø± Ù…ØªÙ†ÙˆØ¹Ø©.', critiqueActionSources:'Ø£Ø¯Ø±Ø¬ ØªÙˆØ§Ø±ÙŠØ® ÙˆØ±ÙˆØ§Ø¨Ø· Ø§Ù„Ù…ØµØ§Ø¯Ø± Ù„Ù„Ø§Ø¯Ø¹Ø§Ø¡Ø§Øª Ø§Ù„Ù…Ø¨Ù†ÙŠØ© Ø¹Ù„Ù‰ Ù…ØµØ§Ø¯Ø±.', critiqueActionCounter:'Ø£Ø¶Ù Ø£Ø¯Ù„Ø© Ù…Ø¶Ø§Ø¯Ø© Ù‚Ø¨Ù„ Ø§Ù„ØªÙˆÙ„ÙŠÙ Ø§Ù„Ø§Ø³ØªØ±Ø§ØªÙŠØ¬ÙŠ Ø§Ù„Ù†Ù‡Ø§Ø¦ÙŠ.', critiqueActionCausal:'Ø§Ø³ØªØ®Ø¯Ù… Ø§Ù„Ø±ÙˆØ§Ø¨Ø· Ø§Ù„Ø³Ø¨Ø¨ÙŠØ© Ù„Ø±Ø¨Ø· Ø§Ù„Ø£Ø¯Ù„Ø© Ø¨Ø§Ù„Ù…ØµØ§Ù„Ø­ ÙˆØ§Ù„ÙØ§Ø¹Ù„ÙŠÙ† ÙˆØ§Ù„Ø£Ø¯ÙˆØ§Øª ÙˆØ§Ù„Ø³Ø±Ø¯ÙŠØ© ÙˆØ§Ù„Ù†ØªØ§Ø¦Ø¬ ÙˆØ§Ù„ØªØºØ°ÙŠØ© Ø§Ù„Ø±Ø§Ø¬Ø¹Ø©.', critiqueActionFalsifiers:'Ø§Ø®ØªØ¨Ø± Ù…Ø§ Ø¥Ø°Ø§ ÙƒØ§Ù†Øª Ø§Ù„Ø³ÙŠÙ†Ø§Ø±ÙŠÙˆÙ‡Ø§Øª ØªÙØ¨Ø·ÙŽÙ„ Ø¨Ù…Ø¤Ø´Ø±Ø§Øª Ù…Ø®Ø§Ù„ÙØ©.',
    critiqueTypeEvidenceVolume:'Ø­Ø¬Ù… Ø§Ù„Ø£Ø¯Ù„Ø©', critiqueTypeSourceTraceability:'ØªØªØ¨Ø¹ Ø§Ù„Ù…ØµØ§Ø¯Ø±', critiqueTypeSourceDiversity:'ØªÙ†ÙˆØ¹ Ø§Ù„Ù…ØµØ§Ø¯Ø±', critiqueTypeCounterEvidenceGap:'ÙØ¬ÙˆØ© Ø§Ù„Ø£Ø¯Ù„Ø© Ø§Ù„Ù…Ø¶Ø§Ø¯Ø©', critiqueTypeCausalRisk:'Ù…Ø®Ø§Ø·Ø± Ø§Ù„Ø³Ø¨Ø¨ÙŠØ©', critiqueTypePublicationRisk:'Ù…Ø®Ø§Ø·Ø± Ø§Ù„Ù†Ø´Ø±', severityLow:'Ù…Ù†Ø®ÙØ¶', severityMedium:'Ù…ØªÙˆØ³Ø·', severityHigh:'Ù…Ø±ØªÙØ¹',
    templateProfiles:{
      strategic_analysis_engine:{display_name:'Ù…Ø­Ø±Ùƒ Ø§Ù„ØªØ­Ù„ÙŠÙ„ Ø§Ù„Ø§Ø³ØªØ±Ø§ØªÙŠØ¬ÙŠ', description:'Ù†Ù…ÙˆØ°Ø¬ Ø§Ù„Ù…ØµØ§Ù„Ø­ â†’ Ø§Ù„ÙØ§Ø¹Ù„ÙˆÙ† â†’ Ø§Ù„Ø£Ø¯ÙˆØ§Øª â†’ Ø§Ù„Ø³Ø±Ø¯ÙŠØ© â†’ Ø§Ù„Ù†ØªØ§Ø¦Ø¬ â†’ Ø§Ù„ØªØºØ°ÙŠØ© Ø§Ù„Ø±Ø§Ø¬Ø¹Ø© Ù…Ø¹ Ø§Ù†Ø¶Ø¨Ø§Ø· Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ø£Ø¯Ù„Ø©.', output_focus:['Ø§Ù„Ù…ØµØ§Ù„Ø­','Ø§Ù„ÙØ§Ø¹Ù„ÙˆÙ†','Ø§Ù„Ø£Ø¯ÙˆØ§Øª','Ø§Ù„Ø³Ø±Ø¯ÙŠØ©','Ø§Ù„Ù†ØªØ§Ø¦Ø¬','Ø§Ù„ØªØºØ°ÙŠØ© Ø§Ù„Ø±Ø§Ø¬Ø¹Ø©','Ø§Ù„ØªÙ†Ø§Ù‚Ø¶Ø§Øª','Ø§Ù„Ø³ÙŠÙ†Ø§Ø±ÙŠÙˆÙ‡Ø§Øª'], prompt_directives:['Ø§Ø³ØªØ®Ø¯Ù… Ù†Ù…ÙˆØ°Ø¬ Ø¬Ø±Ø¨ÙˆØ¹ÙŠ Ø°ÙŠ Ø§Ù„Ø·Ø¨Ù‚Ø§Øª Ø§Ù„Ø³Øª ÙƒØ§Ù…Ù„Ù‹Ø§.','Ø§ÙØµÙ„ Ø¨ÙŠÙ† Ø§Ù„Ù…Ù„Ø§Ø­Ø¸Ø© ÙˆØ§Ù„Ø§Ø³ØªÙ†ØªØ§Ø¬ ÙˆØ§Ù„ØªÙ‚Ø¯ÙŠØ±.','Ø£Ø¯Ø±Ø¬ Ø´Ø±ÙˆØ·Ù‹Ø§ ÙˆØ§Ø¶Ø­Ø© Ù„Ø¥Ø¨Ø·Ø§Ù„ Ø§Ù„Ø³ÙŠÙ†Ø§Ø±ÙŠÙˆÙ‡Ø§Øª.']},
      geopolitical_event_analysis:{display_name:'ØªØ­Ù„ÙŠÙ„ Ø­Ø¯Ø« Ø¬ÙŠÙˆØ³ÙŠØ§Ø³ÙŠ', description:'ÙŠØ±Ø³Ù… Ø§Ù„Ù‚ÙˆØ©ØŒ Ø­ÙˆØ§ÙØ² Ø§Ù„ØªØµØ¹ÙŠØ¯ØŒ Ø§Ù„ÙØ§Ø¹Ù„ÙŠÙ† Ø§Ù„Ø®Ø§Ø±Ø¬ÙŠÙŠÙ†ØŒ Ø§Ø¯Ø¹Ø§Ø¡Ø§Øª Ø§Ù„Ø´Ø±Ø¹ÙŠØ©ØŒ ÙˆÙ…Ø³Ø§Ø±Ø§Øª Ø§Ù„Ø­Ø¯Ø« Ø§Ù„Ù‚Ø§Ø¨Ù„Ø© Ù„Ù„Ù…Ù„Ø§Ø­Ø¸Ø©.'},
      policy_impact_analysis:{display_name:'ØªØ­Ù„ÙŠÙ„ Ø£Ø«Ø± Ø§Ù„Ø³ÙŠØ§Ø³Ø§Øª', description:'ÙŠÙ‚ÙŠÙ… Ø§Ù„Ù…Ø³ØªÙÙŠØ¯ÙŠÙ†ØŒ Ø£Ø¯ÙˆØ§Øª Ø§Ù„ØªÙ†ÙÙŠØ°ØŒ Ø¢Ø«Ø§Ø± Ø§Ù„ØªÙˆØ²ÙŠØ¹ØŒ Ù†ØªØ§Ø¦Ø¬ Ø§Ù„Ø¯Ø±Ø¬Ø© Ø§Ù„Ø«Ø§Ù†ÙŠØ©ØŒ ÙˆØ­Ù„Ù‚Ø§Øª Ø§Ù„ØªØºØ°ÙŠØ© Ø§Ù„Ø±Ø§Ø¬Ø¹Ø© Ù„Ù„Ø³ÙŠØ§Ø³Ø©.'},
      market_technology_trend_analysis:{display_name:'ØªØ­Ù„ÙŠÙ„ Ø³ÙˆÙ‚/ØªÙƒÙ†ÙˆÙ„ÙˆØ¬ÙŠØ§', description:'ÙŠÙØ­Øµ Ø­ÙˆØ§ÙØ² Ø§Ù„ØªØ¨Ù†ÙŠØŒ ÙØ§Ø¹Ù„ÙŠ Ø§Ù„Ù…Ù†ØµØ§ØªØŒ Ø§Ù„Ù‚ÙŠÙˆØ¯ØŒ Ø§Ù„Ø³Ø±Ø¯ÙŠØ§ØªØŒ Ù†ØªØ§Ø¦Ø¬ Ø§Ù„Ø³ÙˆÙ‚ØŒ ÙˆØ§Ù„Ø¥Ø´Ø§Ø±Ø§Øª Ø§Ù„Ø¶Ø¹ÙŠÙØ©.'},
      actor_incentive_map:{display_name:'Ø®Ø±ÙŠØ·Ø© Ø­ÙˆØ§ÙØ² Ø§Ù„ÙØ§Ø¹Ù„ÙŠÙ†', description:'ÙŠØ±ÙƒØ² Ø¹Ù„Ù‰ Ø­ÙˆØ§ÙØ² Ø§Ù„ÙØ§Ø¹Ù„ÙŠÙ†ØŒ Ø§Ù„Ù‚ÙŠÙˆØ¯ØŒ Ø§Ù„Ù†ÙÙˆØ°ØŒ Ù…Ù†Ø·Ù‚ Ø§Ù„ØªØ­Ø§Ù„ÙØ§ØªØŒ ÙˆÙ…Ø³Ø§Ø±Ø§Øª Ø§Ù„ØªÙƒÙŠÙ Ø§Ù„Ù…Ø­ØªÙ…Ù„Ø©.'},
      contradiction_audit:{display_name:'ØªØ¯Ù‚ÙŠÙ‚ Ø§Ù„ØªÙ†Ø§Ù‚Ø¶Ø§Øª', description:'ÙŠÙ‚Ø§Ø±Ù† Ø§Ù„Ø³Ø±Ø¯ÙŠØ§Øª Ø§Ù„Ù…Ø¹Ù„Ù†Ø© Ø¨Ø§Ù„Ø£ÙØ¹Ø§Ù„ ÙˆØ§Ù„Ø­ÙˆØ§ÙØ² ÙˆØ§Ù„Ù†ØªØ§Ø¦Ø¬ ÙˆØ§Ù„Ø£Ø¯Ù„Ø© Ø§Ù„Ù…Ø¶Ø§Ø¯Ø©.'},
      scenario_forecast:{display_name:'ØªÙˆÙ‚Ø¹ Ø§Ù„Ø³ÙŠÙ†Ø§Ø±ÙŠÙˆÙ‡Ø§Øª', description:'ÙŠÙ†ØªØ¬ Ù…Ø³ØªÙ‚Ø¨Ù„Ø§Øª Ù…ØªÙ†Ø§ÙØ³Ø© Ø¨Ù…Ø­Ø±ÙƒØ§Øª ÙˆØ¥Ø´Ø§Ø±Ø§Øª ÙˆØ§Ø­ØªÙ…Ø§Ù„Ø§Øª ÙˆØ´Ø±ÙˆØ· Ø¥Ø¨Ø·Ø§Ù„.'}
    }
  });
  Object.assign(COPY.fr, {
    projectWorkspaceTitle:'Espace projet', projectWorkspaceSubtitle:'GÃ©rer des projets de recherche nommÃ©s, locaux uniquement, dans ce navigateur.', projectName:'Nom du projet', saveProject:'Enregistrer localement', duplicateProject:'Dupliquer le projet', exportProject:'Exporter le projet', importProject:'Importer un projet', deleteProject:'Supprimer le projet actif', exportPackV2:'Exporter Pack v2',
    providerTitle:'Harnais fournisseur', providerRouterTitle:'Routeur fournisseur', suitability:'AdÃ©quation', cost:'CoÃ»t', dryRun:'Dry-run', providerSubtitle:'Contrats de requÃªte prÃªts pour fournisseur avec modes simulÃ©, BYOK, proxy backend hÃ©bergÃ© et compte portable de test. Les appels live exigent une activation explicite.', providerName:'Fournisseur', providerTask:'TÃ¢che', taskPlan:'Plan de recherche', taskSynthesis:'SynthÃ¨se stratÃ©gique', taskRepair:'RÃ©paration JSON', taskCritique:'Critique', taskSourceDiscipline:'Discipline des sources', runProviderTask:'ExÃ©cuter la tÃ¢che fournisseur', previewProviderContract:'PrÃ©visualiser le contrat', previewProviderPrompt:'PrÃ©visualiser le prompt', runProviderFixtureSuite:'Lancer les tests de contrat', exportProviderDiagnostics:'Exporter les diagnostics', copyProviderPayload:'Copier la charge fournisseur', exportRunLedger:'Exporter le journal dâ€™exÃ©cution', clearRunLedger:'Effacer le journal dâ€™exÃ©cution',
    portableTitle:'Compte portable simulÃ©', portableSubtitle:'Simuler une liaison OAuth/PKCE sans jetons rÃ©els ni dÃ©pendance fournisseur.', connectPortable:'Connecter un compte portable simulÃ©', refreshPortable:'RafraÃ®chir le jeton simulÃ©', disconnectPortable:'DÃ©connecter le compte portable', exportPortableStatus:'Exporter lâ€™Ã©tat du compte portable',
    sourcePlanningTitle:'Couche de planification des sources', sourcePlanningSubtitle:'Planifier une recherche assistÃ©e par sources sans crawling live ni revendication de vÃ©rification.', sourceConnector:'Connecteur', sourceTask:'TÃ¢che source', sourceTaskPlan:'Plan source', sourceTaskQuery:'Plan de requÃªtes', sourceTaskClaim:'Extraction dâ€™Ã©noncÃ©s', sourceTaskScoring:'Scoring des preuves', sourceTaskCluster:'Plan de regroupement', sourcePolicyNote:'Planification uniquement : pas de scraping, pas de recherche live, pas de revendication de vÃ©rification.', buildSourceTask:'Construire la tÃ¢che source', copySourceRequest:'Copier la demande source', runSourceFixtureSuite:'Lancer les tests source', exportSourcePolicy:'Exporter la politique source',
    sourceImportTitle:'Adaptateur dâ€™import de sources', sourceImportSubtitle:'Coller des sorties de recherche externe ou un paquet source JSON manuel et les convertir en candidats rÃ©visables pour la matrice des preuves.', sourceImportFormat:'Format dâ€™import', formatAuto:'DÃ©tection automatique', sourceImportText:'Sortie source', sourceImportPolicyNote:'Import manuel uniquement : extrait des candidats de preuve, sans vÃ©rifier, rÃ©cupÃ©rer ni scraper les sources.', previewSourceImport:'PrÃ©visualiser lâ€™import', exportSourceImportReport:'Exporter le rapport dâ€™import', clearSourceImport:'Effacer lâ€™import',
    sourcePacketTemplateLabel:'PrÃ©rÃ©glage de modÃ¨le', buildSourcePacketFromTemplate:'Construire depuis le prÃ©rÃ©glage',
    showCommandCenter:'Afficher le centre de commande', hideCommandCenter:'Masquer le centre de commande', showEngineMap:'Afficher la carte du moteur', hideEngineMap:'Masquer la carte du moteur',
    nextActionTitle:'Action suivante', startTitle:'DÃ©marrer', firstRunComplete:'Parcours de premiÃ¨re utilisation terminÃ©', goToPrefix:'Aller Ã ', doneState:'terminÃ©', nextState:'suivant', inProgressState:'en cours', firstRunSuccessState:'premiÃ¨re utilisation rÃ©ussie', notStartedState:'non dÃ©marrÃ©',
    nextActionGeneratePlan:'GÃ©nÃ©rez le plan de recherche.', nextActionReviewQueue:'Examinez les candidats source en attente avant leur entrÃ©e dans la matrice des preuves.', nextActionAddEvidence:'Ajoutez une preuve manuellement, importez des candidats source ou chargez des preuves de dÃ©mo.', nextActionCompileBrief:'Compilez le brief dâ€™analyse, puis inspectez QualitÃ© & Export.', nextActionExportPack:'Ouvrez QualitÃ© & Export et produisez Export Pack v2 lorsque la confidentialitÃ© est sÃ»re.', nextActionDefault:'GÃ©nÃ©rez un plan de recherche, puis ajoutez des preuves et validez la prÃ©paration Ã  lâ€™export.', firstRunStartedStatus:'Guide de premiÃ¨re utilisation lancÃ©. GÃ©nÃ©rez ensuite le plan de recherche.',
    onboardingTopic:'DÃ©finir le sujet', onboardingPlan:'GÃ©nÃ©rer le plan de recherche', onboardingEvidence:'Ajouter ou importer des preuves', onboardingReview:'Discipline de file de revue', onboardingQuality:'VÃ©rifier la barriÃ¨re qualitÃ©', onboardingExport:'Exporter en sÃ©curitÃ©',
    metricPlan:'Plan', metricEvidence:'Preuves', metricReview:'Revue', metricQuality:'QualitÃ©', metricExport:'Export', metricReady:'prÃªt', metricMissing:'manquant', metricPending:'en attente', metricClear:'clair', metricBlocked:'bloquÃ©', metricSafe:'sÃ»r',
    noPlanBody:'GÃ©nÃ©rez un plan pour crÃ©er questions, sources cibles et contre-preuves cibles.', matrixEmptyBody:'Ajoutez des preuves manuellement, chargez des preuves de dÃ©mo ou importez des candidats source via la file de revue.',
    questionsTitle:'Questions', targetSourcesTitle:'Sources cibles', earlyWarningTitle:'Signaux prÃ©coces', reliability:'FiabilitÃ©', attention:'Attention', flags:'alertes',
    templateCoverageComplete:'La couverture des couches du modÃ¨le est actuellement complÃ¨te.', missingTemplateLayers:'Couches de modÃ¨le manquantes',
    critiqueNextActions:'Actions suivantes', critiqueSummaryUsable:'Le workflow dispose dâ€™un paquet de recherche utilisable, mais la vÃ©rification des sources reste hors pÃ©rimÃ¨tre de cette alpha.', critiqueSummaryWeak:'Le workflow reste insuffisamment sourcÃ© ou reliÃ© et ne doit pas Ãªtre publiÃ©.', critiqueEvidenceVolumeOk:'Le volume de preuves est acceptable pour une synthÃ¨se alpha.', critiqueEvidenceVolumeWeak:'Ajoutez au moins cinq preuves avant de traiter lâ€™analyse comme sÃ©rieuse.', critiqueSourceTraceabilityOk:'La traÃ§abilitÃ© des sources existe, mais elle exige encore une validation manuelle.', critiqueSourceTraceabilityWeak:'Des sorties solides exigent URL et dates de sources ; sinon les Ã©noncÃ©s restent faiblement traÃ§ables.', critiqueSourceDiversityOk:'Les preuves ne sont pas concentrÃ©es dans un ou deux types de sources.', critiqueSourceDiversityWeak:'Les preuves sont trop concentrÃ©es dans un ou deux types de sources.', critiqueCounterEvidenceOk:'Au moins une preuve contient des liens de contradiction.', critiqueCounterEvidenceWeak:'Aucune preuve ne contredit clairement un Ã©noncÃ© ou une couche.', critiqueCausalRiskOk:'Des liens causaux existent ; validez encore chaque relation manuellement.', critiqueCausalRiskWeak:'Le graphe causal est trop pauvre pour une synthÃ¨se fiable.', critiquePublicationRisk:'La sortie simulÃ©e alpha sert aux tests dâ€™architecture, pas Ã  une publication finale.', critiqueActionEvidence:'Ajoutez au moins cinq preuves issues de types de sources divers.', critiqueActionSources:'Incluez dates et URL de sources pour les Ã©noncÃ©s fondÃ©s sur des sources.', critiqueActionCounter:'Ajoutez des contre-preuves avant toute synthÃ¨se stratÃ©gique finale.', critiqueActionCausal:'Utilisez les liens causaux pour relier preuves, intÃ©rÃªts, acteurs, outils, narratif, rÃ©sultats et rÃ©troaction.', critiqueActionFalsifiers:'Testez si les scÃ©narios sont rÃ©futÃ©s par des indicateurs contraires.',
    critiqueTypeEvidenceVolume:'Volume de preuves', critiqueTypeSourceTraceability:'TraÃ§abilitÃ© des sources', critiqueTypeSourceDiversity:'DiversitÃ© des sources', critiqueTypeCounterEvidenceGap:'Ã‰cart de contre-preuves', critiqueTypeCausalRisk:'Risque causal', critiqueTypePublicationRisk:'Risque de publication', severityLow:'faible', severityMedium:'moyen', severityHigh:'Ã©levÃ©',
    templateProfiles:{
      strategic_analysis_engine:{display_name:'Moteur dâ€™analyse stratÃ©gique', description:'ModÃ¨le IntÃ©rÃªts â†’ Acteurs â†’ Outils â†’ Narratif â†’ RÃ©sultats â†’ RÃ©troaction avec discipline de revue des preuves.', output_focus:['intÃ©rÃªts','acteurs','outils','narratif','rÃ©sultats','rÃ©troaction','contradictions','scÃ©narios'], prompt_directives:['Utiliser le modÃ¨le Jarbou3i complet Ã  six couches.','SÃ©parer observation, infÃ©rence et estimation.','Inclure des conditions de scÃ©nario falsifiables.']},
      geopolitical_event_analysis:{display_name:'Analyse dâ€™Ã©vÃ©nement gÃ©opolitique', description:'Cartographier pouvoir, incitations Ã  lâ€™escalade, acteurs externes, revendications de lÃ©gitimitÃ© et trajectoires observables.'},
      policy_impact_analysis:{display_name:'Analyse dâ€™impact de politique', description:'Ã‰valuer bÃ©nÃ©ficiaires, outils de mise en Å“uvre, effets distributifs, rÃ©sultats de second ordre et rÃ©troactions.'},
      market_technology_trend_analysis:{display_name:'Analyse marchÃ©/technologie', description:'Ã‰valuer incitations dâ€™adoption, acteurs de plateforme, contraintes, narratifs, rÃ©sultats de marchÃ© et signaux faibles.'},
      actor_incentive_map:{display_name:'Carte des incitations dâ€™acteurs', description:'Prioriser incitations, contraintes, leviers, logique de coalition et trajectoires dâ€™adaptation probables.'},
      contradiction_audit:{display_name:'Audit des contradictions', description:'Comparer les narratifs dÃ©clarÃ©s aux actions, incitations, rÃ©sultats et contre-preuves.'},
      scenario_forecast:{display_name:'PrÃ©vision par scÃ©narios', description:'Produire des futurs concurrents avec moteurs, signaux, probabilitÃ©s et conditions de rÃ©futation.'}
    }
  });



  Object.assign(COPY.en, {
    analysisReleaseNote:'1.2.0-alpha.2 corrects stable public localization: English, Arabic, and French release copy are language-pure, public copy shows v1.2.0-alpha.2 Source-to-Brief Intelligence Workbench, and internal evidence metadata reports 1.1.0.',
    oauthAuthorizationEndpoint:'OAuth authorization endpoint', oauthTokenEndpoint:'OAuth token endpoint', oauthClientId:'OAuth client ID', oauthRedirectUri:'OAuth redirect URI', oauthScopes:'OAuth scopes', oauthCallbackUrl:'OAuth callback URL', oauthCallbackPlaceholder:'Paste redirect URL with ?code=...&state=...', buildPortableOAuthUrl:'Build OAuth PKCE URL', completePortableOAuthCallback:'Complete OAuth callback', disconnectPortableOAuthSpike:'Disconnect OAuth spike',
    yes:'yes', no:'no', unknown:'unknown', none:'none', required:'required', chars:'chars', truncatedPreview:'truncated preview', providerPromptMissing:'No prompt preview yet.', providerPromptMissingHint:'Use preview or dry-run.', providerRunEmptyHint:'Use dry-run or mock provider execution to create auditable provider runs.',
    sourceTypesEmpty:'no source types', convertedLabel:'converted', rejectedLabel:'rejected',
    policyPrioritizationGuard:'Scores explain prioritization, not truth.',
    run:'Run', status:'Status', validation:'Validation', output:'Output', keyExported:'key exported', auth:'auth', billing:'billing', token:'token', mock:'mock', oauth:'OAuth', passed:'passed', fails:'fails', accepted:'accepted', issues:'issues', live:'live', verified:'verified', presets:'presets', blockers:'blockers', gaps:'gaps', migrationReportExported:'migration report exported',
    sourceRequestTitle:'Source request', sourcePolicyTitle:'Source policy', latestSourceResultTitle:'Latest source result', webSearchAbstractionTitle:'Web search abstraction', questions:'questions', sourceTargets:'source targets', keywords:'keywords', evidenceWord:'evidence', sourceTypes:'source types', candidates:'candidates', queued:'queued', queries:'queries', noSourceWarnings:'no source warnings',
    qualityScoringTitle:'Evidence scoring calibration', reliabilityLabel:'reliability', attentionLabel:'attention', traceabilityLabel:'traceability', calibrationWarnings:'calibration warnings', evidenceScoringPolicyNote:'Attention = public visibility only. Reliability = source strength, traceability, specificity, confidence, and recency. Synthesis weight = prioritization aid, not truth.', guardLabel:'Guard',
    qualityFixEvidence:'Add traceable evidence with URLs, dates, source types, and stronger evidence-strength values.', qualityFixContradiction:'Add counter-evidence and contradiction-linked claims before treating the analysis as robust.', qualityFixDiversity:'Diversify source types; avoid relying on one media or signal class.', qualityFixReliability:'Improve evidence reliability: prefer traceable official, primary, academic, or well-documented sources over attention-only signals.', qualityFixAttention:'Separate public attention from truth-value; high-engagement social items need independent corroboration before synthesis weight increases.', qualityFixCausal:'Add evidence-backed causal links across interests, actors, tools, narrative, results, and feedback.', qualityFixProvider:'Run provider dry-run/fixture validation and confirm key_exported remains false.', qualityFixPrivacy:'Run privacy export audit and resolve all post-redaction issues before sharing.', qualityFixMigration:'Re-import through the migration layer and confirm packet_migration_report.import_safe is true.', qualityFixProceed:'Proceed to publication review: manually verify sources, causal direction, and scenario falsifiers.',
    statusLabels:{review_required:'review required', template_presets_ready:'template presets ready', draft_only:'draft only', blocked:'blocked', pass:'pass', publication_candidate:'publication candidate', research_ready:'research ready', reviewable_draft:'reviewable draft', synthesis_ready:'synthesis ready', provider_ready:'provider ready', empty:'empty', review_resolved:'review resolved', high:'high', medium:'medium', low:'low', scores_explain_prioritization_not_truth:'Scores explain prioritization, not truth.'},
    dimensionLabels:{completeness:'completeness', evidence_strength:'evidence strength', evidence_reliability:'evidence reliability', attention_signal_integrity:'attention signal integrity', contradiction_coverage:'contradiction coverage', source_diversity:'source diversity', actor_layer_coverage:'actor layer coverage', causal_link_density:'causal link density', provider_safety:'provider safety', privacy_safety:'privacy safety', migration_safety:'migration safety', template_fit:'template fit'},
    bandLabels:{very_strong:'very strong', strong:'strong', moderate:'moderate', low:'low'},
    layerLabels:{interests:'interests', actors:'actors', tools:'tools', narrative:'narrative', outcomes:'outcomes', results:'results', feedback:'feedback', contradictions:'contradictions', scenarios:'scenarios'}
  });
  Object.assign(COPY.ar, {
    analysisReleaseNote:'ØªØµØ­Ø­ 1.2.0-alpha.2 ØªØ±Ø¬Ù…Ø© Ø§Ù„Ø³Ø·Ø­ Ø§Ù„Ø¹Ø§Ù… Ø§Ù„Ù…Ø³ØªÙ‚Ø±: Ù†Ø³Ø®Ø© Ø§Ù„Ø¥Ù†Ø¬Ù„ÙŠØ²ÙŠØ© ÙˆØ§Ù„Ø¹Ø±Ø¨ÙŠØ© ÙˆØ§Ù„ÙØ±Ù†Ø³ÙŠØ© ØµØ§Ø±Øª Ù†Ù‚ÙŠØ© Ù„ØºÙˆÙŠÙ‹Ø§ØŒ Ø§Ù„Ù†Ø³Ø®Ø© Ø§Ù„Ø¹Ø§Ù…Ø© ØªØ¹Ø±Ø¶ v1.1.0 Ø§Ù„Ø¹Ø±Ø¶ Ø§Ù„Ø¹Ø§Ù… Ø§Ù„Ù…Ø³ØªÙ‚Ø±ØŒ ÙˆØ¨ÙŠØ§Ù†Ø§Øª Ø£Ø¯Ù„Ø© Ø§Ù„Ø§Ø³ØªØ¶Ø§ÙØ© Ø§Ù„Ø¯Ø§Ø®Ù„ÙŠØ© ØªØ¹Ù„Ù† 1.1.0.',
    oauthAuthorizationEndpoint:'Ù†Ù‚Ø·Ø© ØªÙÙˆÙŠØ¶ OAuth', oauthTokenEndpoint:'Ù†Ù‚Ø·Ø© Ø±Ù…Ø² OAuth', oauthClientId:'Ù…Ø¹Ø±Ù‘Ù Ø¹Ù…ÙŠÙ„ OAuth', oauthRedirectUri:'Ø±Ø§Ø¨Ø· Ø¥Ø¹Ø§Ø¯Ø© ØªÙˆØ¬ÙŠÙ‡ OAuth', oauthScopes:'ØµÙ„Ø§Ø­ÙŠØ§Øª OAuth', oauthCallbackUrl:'Ø±Ø§Ø¨Ø· Ø¹ÙˆØ¯Ø© OAuth', oauthCallbackPlaceholder:'Ø§Ù„ØµÙ‚ Ø±Ø§Ø¨Ø· Ø§Ù„Ø¹ÙˆØ¯Ø© Ø§Ù„Ø°ÙŠ ÙŠØ­ØªÙˆÙŠ Ø¹Ù„Ù‰ ?code=...&state=...', buildPortableOAuthUrl:'Ø¨Ù†Ø§Ø¡ Ø±Ø§Ø¨Ø· OAuth/PKCE', completePortableOAuthCallback:'Ø¥ÙƒÙ…Ø§Ù„ Ø¹ÙˆØ¯Ø© OAuth', disconnectPortableOAuthSpike:'ÙØµÙ„ ØªØ¬Ø±Ø¨Ø© OAuth',
    yes:'Ù†Ø¹Ù…', no:'Ù„Ø§', unknown:'ØºÙŠØ± Ù…Ø¹Ø±ÙˆÙ', none:'Ù„Ø§ ÙŠÙˆØ¬Ø¯', required:'Ù…Ø·Ù„ÙˆØ¨', chars:'Ø­Ø±Ù', truncatedPreview:'Ù…Ø¹Ø§ÙŠÙ†Ø© Ù…Ø®ØªØµØ±Ø©', providerPromptMissing:'Ù„Ø§ ØªÙˆØ¬Ø¯ Ù…Ø¹Ø§ÙŠÙ†Ø© Ø¨Ø±ÙˆÙ…Ø¨Øª Ø¨Ø¹Ø¯.', providerPromptMissingHint:'Ø§Ø³ØªØ®Ø¯Ù… Ø§Ù„Ù…Ø¹Ø§ÙŠÙ†Ø© Ø£Ùˆ Ø§Ù„Ø·Ù„Ø¨ Ø§Ù„ØªØ¬Ø±ÙŠØ¨ÙŠ.', providerRunEmptyHint:'Ø§Ø³ØªØ®Ø¯Ù… Ø·Ù„Ø¨Ù‹Ø§ ØªØ¬Ø±ÙŠØ¨ÙŠÙ‹Ø§ Ø£Ùˆ ØªÙ†ÙÙŠØ° Ù…Ø²ÙˆÙ‘Ø¯ ÙˆÙ‡Ù…ÙŠÙ‹Ø§ Ù„Ø¥Ù†Ø´Ø§Ø¡ Ø³Ø¬Ù„ ØªØ´ØºÙŠÙ„ Ù‚Ø§Ø¨Ù„ Ù„Ù„ØªØ¯Ù‚ÙŠÙ‚.',
    runLedgerEmpty:'Ù„Ø§ ØªÙˆØ¬Ø¯ Ø¹Ù…Ù„ÙŠØ§Øª Ù…Ø²ÙˆÙ‘Ø¯ Ø¨Ø¹Ø¯.',
    sourceTypesEmpty:'Ù„Ø§ ØªÙˆØ¬Ø¯ Ø£Ù†ÙˆØ§Ø¹ Ù…ØµØ§Ø¯Ø±', convertedLabel:'Ù…Ø­ÙˆÙ‘Ù„Ø©', rejectedLabel:'Ù…Ø±ÙÙˆØ¶Ø©',
    policyPrioritizationGuard:'Ø§Ù„Ø£Ø±Ù‚Ø§Ù… ØªØ´Ø±Ø­ ØªØ±ØªÙŠØ¨ Ø§Ù„Ø£ÙˆÙ„ÙˆÙŠØ§Øª Ù„Ø§ Ø§Ù„Ø­Ù‚ÙŠÙ‚Ø©.',
    run:'Ø§Ù„ØªØ´ØºÙŠÙ„', status:'Ø§Ù„Ø­Ø§Ù„Ø©', validation:'Ø§Ù„ØªØ­Ù‚Ù‚', output:'Ø§Ù„Ù…Ø®Ø±Ø¬', keyExported:'ØªØµØ¯ÙŠØ± Ø§Ù„Ù…ÙØªØ§Ø­', auth:'Ø§Ù„Ù…ØµØ§Ø¯Ù‚Ø©', billing:'Ø§Ù„ÙÙˆØªØ±Ø©', token:'Ø§Ù„Ø±Ù…Ø²', mock:'ÙˆÙ‡Ù…ÙŠ', oauth:'OAuth', passed:'Ù†Ø§Ø¬Ø­', fails:'ÙØ´Ù„', accepted:'Ù…Ù‚Ø¨ÙˆÙ„', issues:'Ù…Ø´ÙƒÙ„Ø§Øª', live:'Ø­ÙŠ', verified:'Ù…ØªØ­Ù‚Ù‚', presets:'Ù‚ÙˆØ§Ù„Ø¨', blockers:'Ø¹ÙˆØ§Ø¦Ù‚', gaps:'ÙØ¬ÙˆØ§Øª', migrationReportExported:'ØªÙ… ØªØµØ¯ÙŠØ± ØªÙ‚Ø±ÙŠØ± Ø§Ù„Ù‡Ø¬Ø±Ø©',
    sourceRequestTitle:'Ø·Ù„Ø¨ Ø§Ù„Ù…ØµØ§Ø¯Ø±', sourcePolicyTitle:'Ø³ÙŠØ§Ø³Ø© Ø§Ù„Ù…ØµØ§Ø¯Ø±', latestSourceResultTitle:'Ø¢Ø®Ø± Ù†ØªÙŠØ¬Ø© Ù…ØµØ¯Ø±ÙŠØ©', webSearchAbstractionTitle:'ØªØ¬Ø±ÙŠØ¯ Ø¨Ø­Ø« Ø§Ù„ÙˆÙŠØ¨', questions:'Ø£Ø³Ø¦Ù„Ø©', sourceTargets:'Ø£Ù‡Ø¯Ø§Ù Ù…ØµØ§Ø¯Ø±', keywords:'ÙƒÙ„Ù…Ø§Øª Ù…ÙØªØ§Ø­ÙŠØ©', evidenceWord:'Ø¯Ù„ÙŠÙ„', sourceTypes:'Ø£Ù†ÙˆØ§Ø¹ Ù…ØµØ§Ø¯Ø±', candidates:'Ù…Ø±Ø´Ø­Ø§Øª', queued:'ÙÙŠ Ø§Ù„ØµÙ', queries:'Ø§Ø³ØªØ¹Ù„Ø§Ù…Ø§Øª', noSourceWarnings:'Ù„Ø§ ØªÙˆØ¬Ø¯ ØªØ­Ø°ÙŠØ±Ø§Øª Ù…ØµØ¯Ø±ÙŠØ©',
    qualityScoringTitle:'Ù…Ø¹Ø§ÙŠØ±Ø© ØªØ±Ø¬ÙŠØ­ Ø§Ù„Ø£Ø¯Ù„Ø©', reliabilityLabel:'Ø§Ù„Ù…ÙˆØ«ÙˆÙ‚ÙŠØ©', attentionLabel:'Ø§Ù„Ø§Ù†ØªØ¨Ø§Ù‡', traceabilityLabel:'Ø§Ù„ØªØªØ¨Ù‘Ø¹', calibrationWarnings:'ØªØ­Ø°ÙŠØ±Ø§Øª Ø§Ù„Ù…Ø¹Ø§ÙŠØ±Ø©', evidenceScoringPolicyNote:'Ø§Ù„Ø§Ù†ØªØ¨Ø§Ù‡ ÙŠØ¹Ù†ÙŠ Ø§Ù„Ø¸Ù‡ÙˆØ± Ø§Ù„Ø¹Ø§Ù… ÙÙ‚Ø·. Ø§Ù„Ù…ÙˆØ«ÙˆÙ‚ÙŠØ© ØªÙ‚ÙŠØ³ Ù‚ÙˆØ© Ø§Ù„Ù…ØµØ¯Ø± ÙˆØ§Ù„ØªØªØ¨Ù‘Ø¹ ÙˆØ§Ù„ØªØ­Ø¯ÙŠØ¯ ÙˆØ§Ù„Ø«Ù‚Ø© ÙˆØ§Ù„Ø­Ø¯Ø§Ø«Ø©. ÙˆØ²Ù† Ø§Ù„ØªÙˆÙ„ÙŠÙ Ø£Ø¯Ø§Ø© ØªØ±ØªÙŠØ¨ Ø£ÙˆÙ„ÙˆÙŠØ§Øª Ù„Ø§ Ø­ÙƒÙ… Ø­Ù‚ÙŠÙ‚Ø©.', guardLabel:'Ø§Ù„Ø­Ø§Ø±Ø³',
    qualityFixEvidence:'Ø£Ø¶Ù Ø£Ø¯Ù„Ø© Ù‚Ø§Ø¨Ù„Ø© Ù„Ù„ØªØªØ¨Ø¹ Ù…Ø¹ Ø±ÙˆØ§Ø¨Ø· ÙˆØªÙˆØ§Ø±ÙŠØ® ÙˆØ£Ù†ÙˆØ§Ø¹ Ù…ØµØ§Ø¯Ø± ÙˆÙ‚ÙŠÙ… Ø£Ù‚ÙˆÙ‰ Ù„Ù‚ÙˆØ© Ø§Ù„Ø¯Ù„ÙŠÙ„.', qualityFixContradiction:'Ø£Ø¶Ù Ø£Ø¯Ù„Ø© Ù…Ø¶Ø§Ø¯Ø© ÙˆØ§Ø¯Ø¹Ø§Ø¡Ø§Øª Ù…Ø±ØªØ¨Ø·Ø© Ø¨Ø§Ù„ØªÙ†Ø§Ù‚Ø¶ Ù‚Ø¨Ù„ Ø§Ø¹ØªØ¨Ø§Ø± Ø§Ù„ØªØ­Ù„ÙŠÙ„ Ù…ØªÙŠÙ†Ù‹Ø§.', qualityFixDiversity:'Ù†ÙˆÙ‘Ø¹ Ø£Ù†ÙˆØ§Ø¹ Ø§Ù„Ù…ØµØ§Ø¯Ø± ÙˆÙ„Ø§ ØªØ¹ØªÙ…Ø¯ Ø¹Ù„Ù‰ ÙØ¦Ø© Ø¥Ø¹Ù„Ø§Ù…ÙŠØ© Ø£Ùˆ Ø¥Ø´Ø§Ø±ÙŠØ© ÙˆØ§Ø­Ø¯Ø©.', qualityFixReliability:'Ø§Ø±ÙØ¹ Ù…ÙˆØ«ÙˆÙ‚ÙŠØ© Ø§Ù„Ø£Ø¯Ù„Ø© Ø¨ØªÙØ¶ÙŠÙ„ Ø§Ù„Ù…ØµØ§Ø¯Ø± Ø§Ù„Ø±Ø³Ù…ÙŠØ© Ø£Ùˆ Ø§Ù„Ø£ÙˆÙ„ÙŠØ© Ø£Ùˆ Ø§Ù„Ø£ÙƒØ§Ø¯ÙŠÙ…ÙŠØ© Ø£Ùˆ Ø§Ù„Ù…ÙˆØ«Ù‚Ø© Ø¬ÙŠØ¯Ù‹Ø§ Ø¨Ø¯Ù„ Ø¥Ø´Ø§Ø±Ø§Øª Ø§Ù„Ø§Ù†ØªØ¨Ø§Ù‡ ÙˆØ­Ø¯Ù‡Ø§.', qualityFixAttention:'Ø§ÙØµÙ„ Ø§Ù„Ø§Ù†ØªØ¨Ø§Ù‡ Ø§Ù„Ø¹Ø§Ù… Ø¹Ù† Ù‚ÙŠÙ…Ø© Ø§Ù„Ø­Ù‚ÙŠÙ‚Ø©Ø› Ø§Ù„Ø¹Ù†Ø§ØµØ± Ø§Ù„Ø§Ø¬ØªÙ…Ø§Ø¹ÙŠØ© Ø¹Ø§Ù„ÙŠØ© Ø§Ù„ØªÙØ§Ø¹Ù„ ØªØ­ØªØ§Ø¬ ØªØ«Ø¨ÙŠØªÙ‹Ø§ Ù…Ø³ØªÙ‚Ù„Ù‹Ø§ Ù‚Ø¨Ù„ Ø²ÙŠØ§Ø¯Ø© ÙˆØ²Ù†Ù‡Ø§ ÙÙŠ Ø§Ù„ØªÙˆÙ„ÙŠÙ.', qualityFixCausal:'Ø£Ø¶Ù Ø±ÙˆØ§Ø¨Ø· Ø³Ø¨Ø¨ÙŠØ© Ù…Ø¯Ø¹ÙˆÙ…Ø© Ø¨Ø§Ù„Ø£Ø¯Ù„Ø© Ø¹Ø¨Ø± Ø§Ù„Ù…ØµØ§Ù„Ø­ ÙˆØ§Ù„ÙØ§Ø¹Ù„ÙŠÙ† ÙˆØ§Ù„Ø£Ø¯ÙˆØ§Øª ÙˆØ§Ù„Ø³Ø±Ø¯ÙŠØ© ÙˆØ§Ù„Ù†ØªØ§Ø¦Ø¬ ÙˆØ§Ù„ØªØºØ°ÙŠØ© Ø§Ù„Ø±Ø§Ø¬Ø¹Ø©.', qualityFixProvider:'Ø´ØºÙ‘Ù„ Ø§Ù„ØªØ­Ù‚Ù‚ Ø§Ù„ØªØ¬Ø±ÙŠØ¨ÙŠ Ù„Ù„Ù…Ø²ÙˆÙ‘Ø¯ ÙˆØªØ£ÙƒØ¯ Ø£Ù† Ø§Ù„Ù…ÙØªØ§Ø­ Ù„Ø§ ÙŠØ¸Ù‡Ø± ÙÙŠ Ø§Ù„Ø­Ø²Ù… Ø£Ùˆ Ø§Ù„ØªÙ‚Ø§Ø±ÙŠØ± Ø£Ùˆ Ø³Ø¬Ù„ Ø§Ù„ØªØ´ØºÙŠÙ„.', qualityFixPrivacy:'Ø´ØºÙ‘Ù„ ØªØ¯Ù‚ÙŠÙ‚ ØªØµØ¯ÙŠØ± Ø§Ù„Ø®ØµÙˆØµÙŠØ© ÙˆØ­Ù„ ÙƒÙ„ Ù…Ø´ÙƒÙ„Ø§Øª Ù…Ø§ Ø¨Ø¹Ø¯ Ø§Ù„ØªÙ†Ù‚ÙŠØ­ Ù‚Ø¨Ù„ Ø§Ù„Ù…Ø´Ø§Ø±ÙƒØ©.', qualityFixMigration:'Ø£Ø¹Ø¯ Ø§Ù„Ø§Ø³ØªÙŠØ±Ø§Ø¯ Ø¹Ø¨Ø± Ø·Ø¨Ù‚Ø© Ø§Ù„Ù‡Ø¬Ø±Ø© ÙˆØªØ£ÙƒØ¯ Ø£Ù† packet_migration_report.import_safe ÙŠØ³Ø§ÙˆÙŠ true.', qualityFixProceed:'Ø§Ù†ØªÙ‚Ù„ Ø¥Ù„Ù‰ Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ù†Ø´Ø±: ØªØ­Ù‚Ù‚ ÙŠØ¯ÙˆÙŠÙ‹Ø§ Ù…Ù† Ø§Ù„Ù…ØµØ§Ø¯Ø± ÙˆØ§ØªØ¬Ø§Ù‡ Ø§Ù„Ø³Ø¨Ø¨ÙŠØ© ÙˆØ´Ø±ÙˆØ· Ø¥Ø¨Ø·Ø§Ù„ Ø§Ù„Ø³ÙŠÙ†Ø§Ø±ÙŠÙˆÙ‡Ø§Øª.',
    statusLabels:{review_required:'ØªØ­ØªØ§Ø¬ Ù…Ø±Ø§Ø¬Ø¹Ø©', template_presets_ready:'Ø§Ù„Ù‚ÙˆØ§Ù„Ø¨ Ø¬Ø§Ù‡Ø²Ø©', draft_only:'Ù…Ø³ÙˆØ¯Ø© ÙÙ‚Ø·', blocked:'Ù…Ø­Ø¸ÙˆØ±', pass:'Ù†Ø§Ø¬Ø­', publication_candidate:'Ù…Ø±Ø´Ø­ Ù„Ù„Ù†Ø´Ø±', research_ready:'Ø¬Ø§Ù‡Ø² Ø¨Ø­Ø«ÙŠÙ‹Ø§', reviewable_draft:'Ù…Ø³ÙˆØ¯Ø© Ù‚Ø§Ø¨Ù„Ø© Ù„Ù„Ù…Ø±Ø§Ø¬Ø¹Ø©', synthesis_ready:'Ø¬Ø§Ù‡Ø² Ù„Ù„ØªÙˆÙ„ÙŠÙ', provider_ready:'Ø§Ù„Ù…Ø²ÙˆÙ‘Ø¯ Ø¬Ø§Ù‡Ø²', empty:'ÙØ§Ø±Øº', review_resolved:'Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø© Ù…Ø­Ù„ÙˆÙ„Ø©', high:'Ø¹Ø§Ù„Ù', medium:'Ù…ØªÙˆØ³Ø·', low:'Ù…Ù†Ø®ÙØ¶', scores_explain_prioritization_not_truth:'Ø§Ù„Ø£Ø±Ù‚Ø§Ù… ØªØ´Ø±Ø­ ØªØ±ØªÙŠØ¨ Ø§Ù„Ø£ÙˆÙ„ÙˆÙŠØ§Øª Ù„Ø§ Ø§Ù„Ø­Ù‚ÙŠÙ‚Ø©.'},
    dimensionLabels:{completeness:'Ø§Ù„Ø§ÙƒØªÙ…Ø§Ù„', evidence_strength:'Ù‚ÙˆØ© Ø§Ù„Ø£Ø¯Ù„Ø©', evidence_reliability:'Ù…ÙˆØ«ÙˆÙ‚ÙŠØ© Ø§Ù„Ø£Ø¯Ù„Ø©', attention_signal_integrity:'Ø³Ù„Ø§Ù…Ø© Ø¥Ø´Ø§Ø±Ø§Øª Ø§Ù„Ø§Ù†ØªØ¨Ø§Ù‡', contradiction_coverage:'ØªØºØ·ÙŠØ© Ø§Ù„ØªÙ†Ø§Ù‚Ø¶Ø§Øª', source_diversity:'ØªÙ†ÙˆØ¹ Ø§Ù„Ù…ØµØ§Ø¯Ø±', actor_layer_coverage:'ØªØºØ·ÙŠØ© Ø·Ø¨Ù‚Ø§Øª Ø§Ù„ÙØ§Ø¹Ù„ÙŠÙ†', causal_link_density:'ÙƒØ«Ø§ÙØ© Ø§Ù„Ø±ÙˆØ§Ø¨Ø· Ø§Ù„Ø³Ø¨Ø¨ÙŠØ©', provider_safety:'Ø£Ù…Ø§Ù† Ø§Ù„Ù…Ø²ÙˆÙ‘Ø¯', privacy_safety:'Ø£Ù…Ø§Ù† Ø§Ù„Ø®ØµÙˆØµÙŠØ©', migration_safety:'Ø³Ù„Ø§Ù…Ø© Ø§Ù„Ù‡Ø¬Ø±Ø©', template_fit:'Ù…Ù„Ø§Ø¡Ù…Ø© Ø§Ù„Ù‚Ø§Ù„Ø¨'},
    bandLabels:{very_strong:'Ù‚ÙˆÙŠ Ø¬Ø¯Ù‹Ø§', strong:'Ù‚ÙˆÙŠ', moderate:'Ù…ØªÙˆØ³Ø·', low:'Ù…Ù†Ø®ÙØ¶'},
    layerLabels:{interests:'Ø§Ù„Ù…ØµØ§Ù„Ø­', actors:'Ø§Ù„ÙØ§Ø¹Ù„ÙˆÙ†', tools:'Ø§Ù„Ø£Ø¯ÙˆØ§Øª', narrative:'Ø§Ù„Ø³Ø±Ø¯ÙŠØ©', outcomes:'Ø§Ù„Ù…Ø®Ø±Ø¬Ø§Øª', results:'Ø§Ù„Ù†ØªØ§Ø¦Ø¬', feedback:'Ø§Ù„ØªØºØ°ÙŠØ© Ø§Ù„Ø±Ø§Ø¬Ø¹Ø©', contradictions:'Ø§Ù„ØªÙ†Ø§Ù‚Ø¶Ø§Øª', scenarios:'Ø§Ù„Ø³ÙŠÙ†Ø§Ø±ÙŠÙˆÙ‡Ø§Øª'}
  });
  Object.assign(COPY.fr, {
    analysisReleaseNote:'1.2.0-alpha.2 corrige la localisation publique stable : les copies anglaise, arabe et franÃ§aise restent dans leur langue, la surface publique affiche v1.1.0 DÃ©mo publique stable, et les mÃ©tadonnÃ©es internes de preuve annoncent 1.1.0.',
    oauthAuthorizationEndpoint:'Endpoint dâ€™autorisation OAuth', oauthTokenEndpoint:'Endpoint de jeton OAuth', oauthClientId:'ID client OAuth', oauthRedirectUri:'URI de redirection OAuth', oauthScopes:'Scopes OAuth', oauthCallbackUrl:'URL de retour OAuth', oauthCallbackPlaceholder:'Collez lâ€™URL de retour avec ?code=...&state=...', buildPortableOAuthUrl:'Construire lâ€™URL OAuth/PKCE', completePortableOAuthCallback:'Finaliser le retour OAuth', disconnectPortableOAuthSpike:'DÃ©connecter lâ€™essai OAuth',
    yes:'oui', no:'non', unknown:'inconnu', none:'aucun', required:'requis', chars:'caractÃ¨res', truncatedPreview:'aperÃ§u tronquÃ©', providerPromptMissing:'Aucun aperÃ§u de prompt.', providerPromptMissingHint:'Utilisez lâ€™aperÃ§u ou le dry-run.', providerRunEmptyHint:'Utilisez un dry-run ou une exÃ©cution fournisseur simulÃ©e pour crÃ©er des runs auditables.',
    runLedgerEmpty:'Aucune exÃ©cution fournisseur pour lâ€™instant.',
    sourceTypesEmpty:'aucun type de source', convertedLabel:'convertis', rejectedLabel:'rejetÃ©s',
    policyPrioritizationGuard:'Les scores expliquent la priorisation, pas la vÃ©ritÃ©.',
    run:'Run', status:'Statut', validation:'Validation', output:'Sortie', keyExported:'clÃ© exportÃ©e', auth:'auth', billing:'facturation', token:'jeton', mock:'simulÃ©', oauth:'OAuth', passed:'rÃ©ussis', fails:'Ã©checs', accepted:'acceptÃ©', issues:'problÃ¨mes', live:'live', verified:'vÃ©rifiÃ©', presets:'prÃ©rÃ©glages', blockers:'blocages', gaps:'lacunes', migrationReportExported:'rapport de migration exportÃ©',
    sourceRequestTitle:'RequÃªte source', sourcePolicyTitle:'Politique sources', latestSourceResultTitle:'Dernier rÃ©sultat source', webSearchAbstractionTitle:'Abstraction recherche web', questions:'questions', sourceTargets:'cibles sources', keywords:'mots-clÃ©s', evidenceWord:'preuve', sourceTypes:'types de sources', candidates:'candidats', queued:'en file', queries:'requÃªtes', noSourceWarnings:'aucune alerte source',
    qualityScoringTitle:'Calibration du score des preuves', reliabilityLabel:'fiabilitÃ©', attentionLabel:'attention', traceabilityLabel:'traÃ§abilitÃ©', calibrationWarnings:'alertes de calibration', evidenceScoringPolicyNote:'Lâ€™attention indique seulement la visibilitÃ© publique. La fiabilitÃ© mesure la force de la source, la traÃ§abilitÃ©, la spÃ©cificitÃ©, la confiance et la rÃ©cence. Le poids de synthÃ¨se aide Ã  prioriser, pas Ã  Ã©tablir la vÃ©ritÃ©.', guardLabel:'Garde-fou',
    qualityFixEvidence:'Ajoutez des preuves traÃ§ables avec URLs, dates, types de sources et valeurs evidence_strength plus fortes.', qualityFixContradiction:'Ajoutez des contre-preuves et des Ã©noncÃ©s liÃ©s aux contradictions avant de traiter lâ€™analyse comme robuste.', qualityFixDiversity:'Diversifiez les types de sources ; Ã©vitez de dÃ©pendre dâ€™une seule classe mÃ©dia ou signal.', qualityFixReliability:'AmÃ©liorez la fiabilitÃ© des preuves : privilÃ©giez les sources officielles, primaires, acadÃ©miques ou bien documentÃ©es plutÃ´t que les seuls signaux dâ€™attention.', qualityFixAttention:'SÃ©parez lâ€™attention publique de la valeur de vÃ©ritÃ© ; les items sociaux trÃ¨s engagÃ©s exigent une corroboration indÃ©pendante avant de peser davantage dans la synthÃ¨se.', qualityFixCausal:'Ajoutez des liens causaux appuyÃ©s par preuves entre intÃ©rÃªts, acteurs, outils, narratif, rÃ©sultats et rÃ©troaction.', qualityFixProvider:'ExÃ©cutez la validation fournisseur Ã  blanc et confirmez quâ€™aucune clÃ© nâ€™apparaÃ®t dans les paquets, rapports ou journaux.', qualityFixPrivacy:'Lancez lâ€™audit dâ€™export confidentialitÃ© et rÃ©solvez tous les problÃ¨mes post-rÃ©daction avant partage.', qualityFixMigration:'RÃ©importez via la couche migration et confirmez que packet_migration_report.import_safe vaut true.', qualityFixProceed:'Passez Ã  la revue de publication : vÃ©rifiez manuellement les sources, la direction causale et les falsificateurs de scÃ©narios.',
    statusLabels:{review_required:'revue requise', template_presets_ready:'prÃ©rÃ©glages prÃªts', draft_only:'brouillon seulement', blocked:'bloquÃ©', pass:'validÃ©', publication_candidate:'candidat publication', research_ready:'prÃªt recherche', reviewable_draft:'brouillon rÃ©visable', synthesis_ready:'prÃªt synthÃ¨se', provider_ready:'fournisseur prÃªt', empty:'vide', review_resolved:'revue rÃ©solue', high:'Ã©levÃ©', medium:'moyen', low:'faible', scores_explain_prioritization_not_truth:'Les scores expliquent la priorisation, pas la vÃ©ritÃ©.'},
    dimensionLabels:{completeness:'complÃ©tude', evidence_strength:'force des preuves', evidence_reliability:'fiabilitÃ© des preuves', attention_signal_integrity:'intÃ©gritÃ© du signal attention', contradiction_coverage:'couverture des contradictions', source_diversity:'diversitÃ© des sources', actor_layer_coverage:'couverture des acteurs', causal_link_density:'densitÃ© des liens causaux', provider_safety:'sÃ©curitÃ© fournisseur', privacy_safety:'sÃ©curitÃ© confidentialitÃ©', migration_safety:'sÃ©curitÃ© migration', template_fit:'adÃ©quation modÃ¨le'},
    bandLabels:{very_strong:'trÃ¨s fort', strong:'fort', moderate:'modÃ©rÃ©', low:'faible'},
    layerLabels:{interests:'intÃ©rÃªts', actors:'acteurs', tools:'outils', narrative:'narratif', outcomes:'rÃ©sultats', results:'rÃ©sultats', feedback:'rÃ©troaction', contradictions:'contradictions', scenarios:'scÃ©narios'}
  });


  Object.assign(COPY.en, {
    unspecifiedTopic:'Unspecified strategic analysis topic',
    contextNotSpecified:'Context not specified',
    analysisBriefEmptyBody:'Compile a brief after the plan and evidence matrix are ready.',
    sourceImportReviewEmptyBody:'Source imports appear here first. Review candidates before promoting them into the Evidence Matrix.',
    untitledResearchProject:'Untitled research project',
    projectSavedLocally:'Project saved locally.',
    projectLoadedLocally:'Project loaded from local workspace.',
    projectDuplicatedLocally:'Project duplicated locally.',
    noProjectToDuplicate:'No project to duplicate.',
    noActiveProjectToDelete:'No active project to delete.',
    deleteActiveLocalProject:'Delete active local project?',
    localProjectDeleted:'Local project deleted.',
    noLocalProjectDeleted:'No local project deleted.',
    projectExportGenerated:'Project export generated.',
    workspaceLocalOnly:'local-only',
    workspaceProjects:'projects',
    workspaceBytes:'bytes',
    workspaceStorageAvailable:'storage available',
    workspaceStorageUnavailable:'storage unavailable',
    workspaceProject:'Project',
    workspaceVersion:'Version',
    workspaceUpdated:'Updated',
    workspaceAction:'Action',
    workspaceLoad:'Load',
    workspaceEmpty:'No saved local projects yet.',
    workspaceWarning:'Projects are stored only in this browser localStorage.',
    evidenceScoringCalibrationShort:'Attention = public visibility only. Synthesis weight = prioritization aid, not truth.',
    advancedDetailsCollapsed:'Advanced details collapsed â€” open only when configuring this subsystem.',
    show:'Show', hide:'Hide',
    sourceTemplateOfficialReport:'Official report / institutional document',
    sourceTemplateRedditThread:'Reddit thread / public discussion',
    sourceTemplateYoutubeTranscript:'YouTube video / transcript',
    sourceTemplateMarketSignal:'Prediction market / market signal',
    sourceTemplateGithubRelease:'GitHub release / repository signal',
    sourceTemplateGenericArticle:'Generic article / web source',
    sourcePacketTemplatePresetAria:'Source packet template preset',
    providerModeGuideTitle:'Provider mode guide', providerModeColumnMode:'Mode', providerModeColumnAuth:'Auth', providerModeColumnBilling:'Billing', providerModeColumnPrivacy:'Privacy', providerModeColumnStatus:'Status',
    providerModeMockName:'MockProvider', providerModeMockAuth:'None', providerModeMockBilling:'None', providerModeMockPrivacy:'local / deterministic', providerModeMockStatus:'safe default',
    providerModeByokName:'OpenAI-compatible BYOK', providerModeByokAuth:'User API key', providerModeByokBilling:'user-owned', providerModeByokPrivacy:'key never exported', providerModeByokStatus:'opt-in live calls',
    providerModeBackendName:'Hosted backend proxy', providerModeBackendAuth:'server-side key', providerModeBackendBilling:'app/backend owner', providerModeBackendPrivacy:'browser sends no key', providerModeBackendStatus:'requires deployment hardening',
    providerModePortableName:'Portable account mock', providerModePortableAuth:'mock OAuth seam', providerModePortableBilling:'portable account owner', providerModePortablePrivacy:'token hash only', providerModePortableStatus:'mock-only',
    sourcePacketTemplateReportTitle:'Source packet templates',
    localizedSourceTemplatePolicy:'Local manual source packet templates. No live fetching and no verification claim.',
    statusScoreTheaterGuard:'score-theater guard active', reviewable:'reviewable', verifiedLabel:'verified', manualReview:'manual review'
  });
  Object.assign(COPY.ar, {
    unspecifiedTopic:'Ù…ÙˆØ¶ÙˆØ¹ ØªØ­Ù„ÙŠÙ„ Ø§Ø³ØªØ±Ø§ØªÙŠØ¬ÙŠ ØºÙŠØ± Ù…Ø­Ø¯Ø¯',
    contextNotSpecified:'Ø§Ù„Ø³ÙŠØ§Ù‚ ØºÙŠØ± Ù…Ø­Ø¯Ø¯',
    analysisBriefEmptyBody:'Ø£ÙƒÙ…Ù„ Ø§Ù„Ù…Ù„Ø®Ù‘Øµ Ø¨Ø¹Ø¯ Ø£Ù† ØªØµØ¨Ø­ Ø§Ù„Ø®Ø·Ø© ÙˆÙ…ØµÙÙˆÙØ© Ø§Ù„Ø£Ø¯Ù„Ø© Ø¬Ø§Ù‡Ø²ØªÙŠÙ†.',
    sourceImportReviewEmptyBody:'ØªØ¸Ù‡Ø± ÙˆØ§Ø±Ø¯Ø§Øª Ø§Ù„Ù…ØµØ§Ø¯Ø± Ù‡Ù†Ø§ Ø£ÙˆÙ„Ù‹Ø§. Ø±Ø§Ø¬Ø¹ Ø§Ù„Ù…Ø±Ø´Ø­Ø§Øª Ù‚Ø¨Ù„ ØªØ±Ù‚ÙŠØªÙ‡Ø§ Ø¥Ù„Ù‰ Ù…ØµÙÙˆÙØ© Ø§Ù„Ø£Ø¯Ù„Ø©.',
    untitledResearchProject:'Ù…Ø´Ø±ÙˆØ¹ Ø¨Ø­Ø« ØºÙŠØ± Ù…Ø³Ù…Ù‘Ù‰',
    projectSavedLocally:'ØªÙ… Ø­ÙØ¸ Ø§Ù„Ù…Ø´Ø±ÙˆØ¹ Ù…Ø­Ù„ÙŠÙ‹Ø§.',
    projectLoadedLocally:'ØªÙ… ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ù…Ø´Ø±ÙˆØ¹ Ù…Ù† Ù…Ø³Ø§Ø­Ø© Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„Ù…Ø­Ù„ÙŠØ©.',
    projectDuplicatedLocally:'ØªÙ… ØªÙƒØ±Ø§Ø± Ø§Ù„Ù…Ø´Ø±ÙˆØ¹ Ù…Ø­Ù„ÙŠÙ‹Ø§.',
    noProjectToDuplicate:'Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ù…Ø´Ø±ÙˆØ¹ Ù„ØªÙƒØ±Ø§Ø±Ù‡.',
    noActiveProjectToDelete:'Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ù…Ø´Ø±ÙˆØ¹ Ù†Ø´Ø· Ù„Ø­Ø°ÙÙ‡.',
    deleteActiveLocalProject:'Ù‡Ù„ ØªØ±ÙŠØ¯ Ø­Ø°Ù Ø§Ù„Ù…Ø´Ø±ÙˆØ¹ Ø§Ù„Ù…Ø­Ù„ÙŠ Ø§Ù„Ù†Ø´Ø·ØŸ',
    localProjectDeleted:'ØªÙ… Ø­Ø°Ù Ø§Ù„Ù…Ø´Ø±ÙˆØ¹ Ø§Ù„Ù…Ø­Ù„ÙŠ.',
    noLocalProjectDeleted:'Ù„Ù… ÙŠØªÙ… Ø­Ø°Ù Ø£ÙŠ Ù…Ø´Ø±ÙˆØ¹ Ù…Ø­Ù„ÙŠ.',
    projectExportGenerated:'ØªÙ… Ø¥Ù†Ø´Ø§Ø¡ ØªØµØ¯ÙŠØ± Ø§Ù„Ù…Ø´Ø±ÙˆØ¹.',
    workspaceLocalOnly:'Ù…Ø­Ù„ÙŠ ÙÙ‚Ø·',
    workspaceProjects:'Ù…Ø´Ø§Ø±ÙŠØ¹',
    workspaceBytes:'Ø¨Ø§ÙŠØª',
    workspaceStorageAvailable:'Ø§Ù„ØªØ®Ø²ÙŠÙ† Ù…ØªØ§Ø­',
    workspaceStorageUnavailable:'Ø§Ù„ØªØ®Ø²ÙŠÙ† ØºÙŠØ± Ù…ØªØ§Ø­',
    workspaceProject:'Ø§Ù„Ù…Ø´Ø±ÙˆØ¹',
    workspaceVersion:'Ø§Ù„Ø¥ØµØ¯Ø§Ø±',
    workspaceUpdated:'Ø¢Ø®Ø± ØªØ­Ø¯ÙŠØ«',
    workspaceAction:'Ø§Ù„Ø¥Ø¬Ø±Ø§Ø¡',
    workspaceLoad:'ØªØ­Ù…ÙŠÙ„',
    workspaceEmpty:'Ù„Ø§ ØªÙˆØ¬Ø¯ Ù…Ø´Ø§Ø±ÙŠØ¹ Ù…Ø­Ù„ÙŠØ© Ù…Ø­ÙÙˆØ¸Ø© Ø¨Ø¹Ø¯.',
    workspaceWarning:'ØªÙØ­ÙØ¸ Ø§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹ Ø¯Ø§Ø®Ù„ localStorage ÙÙŠ Ù‡Ø°Ø§ Ø§Ù„Ù…ØªØµÙØ­ ÙÙ‚Ø·.',
    evidenceScoringCalibrationShort:'Ø§Ù„Ø§Ù†ØªØ¨Ø§Ù‡ ÙŠØ¹Ù†ÙŠ Ø§Ù„Ø¸Ù‡ÙˆØ± Ø§Ù„Ø¹Ø§Ù… ÙÙ‚Ø·. ÙˆØ²Ù† Ø§Ù„ØªÙˆÙ„ÙŠÙ Ø£Ø¯Ø§Ø© ØªØ±ØªÙŠØ¨ Ø£ÙˆÙ„ÙˆÙŠØ§Øª Ù„Ø§ Ø­ÙƒÙ… Ø­Ù‚ÙŠÙ‚Ø©.',
    advancedDetailsCollapsed:'Ø§Ù„ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ù…ØªÙ‚Ø¯Ù…Ø© Ù…Ø·ÙˆÙŠØ© â€” Ø§ÙØªØ­Ù‡Ø§ ÙÙ‚Ø· Ø¹Ù†Ø¯ Ø¥Ø¹Ø¯Ø§Ø¯ Ù‡Ø°Ø§ Ø§Ù„Ø¬Ø²Ø¡.',
    show:'Ø¥Ø¸Ù‡Ø§Ø±', hide:'Ø¥Ø®ÙØ§Ø¡',
    sourceTemplateOfficialReport:'ØªÙ‚Ø±ÙŠØ± Ø±Ø³Ù…ÙŠ / ÙˆØ«ÙŠÙ‚Ø© Ù…Ø¤Ø³Ø³ÙŠØ©',
    sourceTemplateRedditThread:'Ù†Ù‚Ø§Ø´ Reddit / Ø­ÙˆØ§Ø± Ø¹Ø§Ù…',
    sourceTemplateYoutubeTranscript:'ÙÙŠØ¯ÙŠÙˆ YouTube / Ù†Øµ ØªÙØ±ÙŠØº',
    sourceTemplateMarketSignal:'Ø³ÙˆÙ‚ ØªÙˆÙ‚Ø¹Ø§Øª / Ø¥Ø´Ø§Ø±Ø© Ø³ÙˆÙ‚ÙŠØ©',
    sourceTemplateGithubRelease:'Ø¥ØµØ¯Ø§Ø± GitHub / Ø¥Ø´Ø§Ø±Ø© Ù…Ø³ØªÙˆØ¯Ø¹',
    sourceTemplateGenericArticle:'Ù…Ù‚Ø§Ù„ Ø¹Ø§Ù… / Ù…ØµØ¯Ø± ÙˆÙŠØ¨',
    sourcePacketTemplatePresetAria:'Ù‚Ø§Ù„Ø¨ Ø­Ø²Ù…Ø© Ø§Ù„Ù…ØµØ§Ø¯Ø±',
    providerModeGuideTitle:'Ø¯Ù„ÙŠÙ„ Ø£Ù†Ù…Ø§Ø· Ø§Ù„Ù…Ø²ÙˆÙ‘Ø¯', providerModeColumnMode:'Ø§Ù„Ù†Ù…Ø·', providerModeColumnAuth:'Ø§Ù„Ù…ØµØ§Ø¯Ù‚Ø©', providerModeColumnBilling:'Ø§Ù„ÙÙˆØªØ±Ø©', providerModeColumnPrivacy:'Ø§Ù„Ø®ØµÙˆØµÙŠØ©', providerModeColumnStatus:'Ø§Ù„Ø­Ø§Ù„Ø©',
    providerModeMockName:'Ù…Ø²ÙˆÙ‘Ø¯ ÙˆÙ‡Ù…ÙŠ', providerModeMockAuth:'Ù„Ø§ Ø´ÙŠØ¡', providerModeMockBilling:'Ù„Ø§ Ø´ÙŠØ¡', providerModeMockPrivacy:'Ù…Ø­Ù„ÙŠ / Ø­ØªÙ…ÙŠ', providerModeMockStatus:'Ø§ÙØªØ±Ø§Ø¶ÙŠ Ø¢Ù…Ù†',
    providerModeByokName:'Ù…ØªÙˆØ§ÙÙ‚ Ù…Ø¹ OpenAI Ø¹Ø¨Ø± Ù…ÙØªØ§Ø­ Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…', providerModeByokAuth:'Ù…ÙØªØ§Ø­ API Ù…Ù† Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…', providerModeByokBilling:'Ø¹Ù„Ù‰ Ø­Ø³Ø§Ø¨ Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…', providerModeByokPrivacy:'Ù„Ø§ ÙŠØªÙ… ØªØµØ¯ÙŠØ± Ø§Ù„Ù…ÙØªØ§Ø­', providerModeByokStatus:'Ù†Ø¯Ø§Ø¡Ø§Øª Ø­ÙŠØ© Ø¨Ø§Ø®ØªÙŠØ§Ø± ØµØ±ÙŠØ­',
    providerModeBackendName:'ÙˆØ³ÙŠØ· Ø®Ù„ÙÙŠ Ù…Ø³ØªØ¶Ø§Ù', providerModeBackendAuth:'Ù…ÙØªØ§Ø­ Ø¹Ù„Ù‰ Ø§Ù„Ø®Ø§Ø¯Ù…', providerModeBackendBilling:'Ù…Ø§Ù„Ùƒ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚/Ø§Ù„Ø®Ù„ÙÙŠØ©', providerModeBackendPrivacy:'Ø§Ù„Ù…ØªØµÙØ­ Ù„Ø§ ÙŠØ±Ø³Ù„ Ù…ÙØªØ§Ø­ Ø§Ù„Ù…Ø²ÙˆÙ‘Ø¯', providerModeBackendStatus:'ÙŠØªØ·Ù„Ø¨ ØªÙ‚ÙˆÙŠØ© Ù†Ø´Ø±',
    providerModePortableName:'Ø­Ø³Ø§Ø¨ Ù…Ø­Ù…ÙˆÙ„ ÙˆÙ‡Ù…ÙŠ', providerModePortableAuth:'ÙˆØµÙ„Ø© OAuth ÙˆÙ‡Ù…ÙŠØ©', providerModePortableBilling:'Ù…Ø§Ù„Ùƒ Ø§Ù„Ø­Ø³Ø§Ø¨ Ø§Ù„Ù…Ø­Ù…ÙˆÙ„', providerModePortablePrivacy:'Ø¨ØµÙ…Ø© Ø±Ù…Ø² ÙÙ‚Ø·', providerModePortableStatus:'ÙˆÙ‡Ù…ÙŠ ÙÙ‚Ø·',
    sourcePacketTemplateReportTitle:'Ù‚ÙˆØ§Ù„Ø¨ Ø­Ø²Ù…Ø© Ø§Ù„Ù…ØµØ§Ø¯Ø±',
    localizedSourceTemplatePolicy:'Ù‚ÙˆØ§Ù„Ø¨ Ù…Ø­Ù„ÙŠØ© ÙŠØ¯ÙˆÙŠØ© Ù„Ø­Ø²Ù… Ø§Ù„Ù…ØµØ§Ø¯Ø±: Ù„Ø§ Ø¬Ù„Ø¨ Ø­ÙŠ ÙˆÙ„Ø§ Ø§Ø¯Ø¹Ø§Ø¡ ØªØ­Ù‚Ù‚.',
    statusScoreTheaterGuard:'Ø­Ø§Ø±Ø³ Ù…Ù†Ø¹ Ø§Ø³ØªØ¹Ø±Ø§Ø¶ Ø§Ù„Ø£Ø±Ù‚Ø§Ù… Ù…ÙØ¹Ù‘Ù„', reviewable:'Ù‚Ø§Ø¨Ù„ Ù„Ù„Ù…Ø±Ø§Ø¬Ø¹Ø©', verifiedLabel:'Ù…ØªØ­Ù‚Ù‚', manualReview:'Ù…Ø±Ø§Ø¬Ø¹Ø© ÙŠØ¯ÙˆÙŠØ©'
  });
  Object.assign(COPY.fr, {
    unspecifiedTopic:'Sujet dâ€™analyse stratÃ©gique non prÃ©cisÃ©',
    contextNotSpecified:'Contexte non prÃ©cisÃ©',
    analysisBriefEmptyBody:'Compilez un brief lorsque le plan et la matrice de preuves sont prÃªts.',
    sourceImportReviewEmptyBody:'Les imports de sources apparaissent dâ€™abord ici. RÃ©visez les candidats avant de les promouvoir dans la matrice de preuves.',
    untitledResearchProject:'Projet de recherche sans titre',
    projectSavedLocally:'Projet enregistrÃ© localement.',
    projectLoadedLocally:'Projet chargÃ© depuis lâ€™espace local.',
    projectDuplicatedLocally:'Projet dupliquÃ© localement.',
    noProjectToDuplicate:'Aucun projet Ã  dupliquer.',
    noActiveProjectToDelete:'Aucun projet actif Ã  supprimer.',
    deleteActiveLocalProject:'Supprimer le projet local actif ?',
    localProjectDeleted:'Projet local supprimÃ©.',
    noLocalProjectDeleted:'Aucun projet local supprimÃ©.',
    projectExportGenerated:'Export du projet gÃ©nÃ©rÃ©.',
    workspaceLocalOnly:'local seulement',
    workspaceProjects:'projets',
    workspaceBytes:'octets',
    workspaceStorageAvailable:'stockage disponible',
    workspaceStorageUnavailable:'stockage indisponible',
    workspaceProject:'Projet',
    workspaceVersion:'Version',
    workspaceUpdated:'Mis Ã  jour',
    workspaceAction:'Action',
    workspaceLoad:'Charger',
    workspaceEmpty:'Aucun projet local enregistrÃ©.',
    workspaceWarning:'Les projets sont stockÃ©s uniquement dans le localStorage de ce navigateur.',
    evidenceScoringCalibrationShort:'Lâ€™attention indique seulement la visibilitÃ© publique. Le poids de synthÃ¨se aide Ã  prioriser, pas Ã  Ã©tablir la vÃ©ritÃ©.',
    advancedDetailsCollapsed:'DÃ©tails avancÃ©s repliÃ©s â€” ouvrez-les seulement pour configurer ce sous-systÃ¨me.',
    show:'Afficher', hide:'Masquer',
    sourceTemplateOfficialReport:'Rapport officiel / document institutionnel',
    sourceTemplateRedditThread:'Fil Reddit / discussion publique',
    sourceTemplateYoutubeTranscript:'VidÃ©o YouTube / transcription',
    sourceTemplateMarketSignal:'MarchÃ© de prÃ©diction / signal de marchÃ©',
    sourceTemplateGithubRelease:'Release GitHub / signal de dÃ©pÃ´t',
    sourceTemplateGenericArticle:'Article gÃ©nÃ©ral / source web',
    sourcePacketTemplatePresetAria:'PrÃ©rÃ©glage de paquet source',
    providerModeGuideTitle:'Guide des modes fournisseur', providerModeColumnMode:'Mode', providerModeColumnAuth:'Auth', providerModeColumnBilling:'Facturation', providerModeColumnPrivacy:'ConfidentialitÃ©', providerModeColumnStatus:'Statut',
    providerModeMockName:'Fournisseur simulÃ©', providerModeMockAuth:'aucune', providerModeMockBilling:'aucune', providerModeMockPrivacy:'local / dÃ©terministe', providerModeMockStatus:'dÃ©faut sÃ»r',
    providerModeByokName:'Compatible OpenAI avec clÃ© utilisateur', providerModeByokAuth:'clÃ© API utilisateur', providerModeByokBilling:'compte utilisateur', providerModeByokPrivacy:'clÃ© jamais exportÃ©e', providerModeByokStatus:'appels live sur opt-in',
    providerModeBackendName:'Proxy backend hÃ©bergÃ©', providerModeBackendAuth:'clÃ© cÃ´tÃ© serveur', providerModeBackendBilling:'propriÃ©taire app/backend', providerModeBackendPrivacy:'le navigateur nâ€™envoie aucune clÃ©', providerModeBackendStatus:'durcissement requis',
    providerModePortableName:'Compte portable simulÃ©', providerModePortableAuth:'couture OAuth simulÃ©e', providerModePortableBilling:'propriÃ©taire du compte portable', providerModePortablePrivacy:'empreinte de jeton seulement', providerModePortableStatus:'simulÃ© seulement',
    sourcePacketTemplateReportTitle:'PrÃ©rÃ©glages de paquet source',
    localizedSourceTemplatePolicy:'ModÃ¨les locaux et manuels de paquets sources. Aucun fetch live et aucune revendication de vÃ©rification.',
    statusScoreTheaterGuard:'garde-fou anti-score-theater actif', reviewable:'rÃ©visable', verifiedLabel:'vÃ©rifiÃ©', manualReview:'revue manuelle'
  });


  Object.assign(COPY.en, {
    sourceTypeOfficial:'official', sourceTypeAcademic:'academic', sourceTypeNews:'news', sourceTypeSocial:'social', sourceTypeMarket:'market', sourceTypeExpert:'expert', sourceTypePrimary:'primary', sourceTypeOther:'other',
    confidenceLow:'low', confidenceMedium:'medium', confidenceHigh:'high',
    relationshipMotivates:'motivates', relationshipEnables:'enables', relationshipConstrains:'constrains', relationshipContradicts:'contradicts', relationshipAmplifies:'amplifies',
    sourceConnectorManualMock:'Manual / Mock', sourceConnectorWebSearchApi:'Web Search API abstraction', sourceConnectorWebSearchPlanned:'Web Search planned legacy', sourceConnectorGithubRepo:'GitHub public repo metadata', sourceConnectorGithubPlanned:'GitHub planned legacy', sourceConnectorHnPlanned:'HN planned', sourceConnectorYoutubePlanned:'YouTube planned', sourceConnectorRedditPlanned:'Reddit planned', sourceConnectorPolymarketPlanned:'Polymarket planned',
    searchProviderMock:'Mock Search', searchProviderBrave:'Brave Search API planned', searchProviderTavily:'Tavily Search API planned', searchProviderSerpApi:'SerpApi planned', searchProviderCustom:'Custom Search API planned',
    formatLast30Days:'last30days-style', formatDeepResearch:'Deep research-style', formatGenericReport:'Generic report', formatSourcePacket:'Manual source packet JSON'
  });
  Object.assign(COPY.ar, {
    providerPromptLabel:'Ù…Ø¹Ø§ÙŠÙ†Ø© Ø§Ù„Ø¨Ø±ÙˆÙ…Ø¨Øª',
    providerContractLabel:'Ø¹Ù‚Ø¯ Ø§Ù„Ø§Ø³ØªØ¬Ø§Ø¨Ø©',
    responseValidationScore:'ØªØ­Ù‚Ù‚ Ø§Ù„Ø§Ø³ØªØ¬Ø§Ø¨Ø©',
    contractFixtureScore:'Ø§Ø®ØªØ¨Ø§Ø±Ø§Øª Ø§Ù„Ø¹Ù‚ÙˆØ¯',
    sourcePlanningScore:'ØªØ®Ø·ÙŠØ· Ø§Ù„Ù…ØµØ§Ø¯Ø±',
    sourcePolicyScore:'Ø³ÙŠØ§Ø³Ø© Ø§Ù„Ù…ØµØ§Ø¯Ø±',
    sourceFixtureScore:'Ø§Ø®ØªØ¨Ø§Ø±Ø§Øª Ø§Ù„Ù…ØµØ§Ø¯Ø±',
    sourceImportScore:'Ø§Ø³ØªÙŠØ±Ø§Ø¯ Ø§Ù„Ù…ØµØ§Ø¯Ø±',
    providerIdentityScore:'Ù‡ÙˆÙŠØ© Ø§Ù„Ù…Ø²ÙˆÙ‘Ø¯',
    sourceTypeOfficial:'Ø±Ø³Ù…ÙŠ', sourceTypeAcademic:'Ø£ÙƒØ§Ø¯ÙŠÙ…ÙŠ', sourceTypeNews:'Ø¥Ø®Ø¨Ø§Ø±ÙŠ', sourceTypeSocial:'Ø§Ø¬ØªÙ…Ø§Ø¹ÙŠ', sourceTypeMarket:'Ø³ÙˆÙ‚ÙŠ', sourceTypeExpert:'Ø®Ø¨ÙŠØ±', sourceTypePrimary:'Ø£ÙˆÙ„ÙŠ', sourceTypeOther:'Ø¢Ø®Ø±',
    confidenceLow:'Ù…Ù†Ø®ÙØ¶Ø©', confidenceMedium:'Ù…ØªÙˆØ³Ø·Ø©', confidenceHigh:'Ø¹Ø§Ù„ÙŠØ©',
    relationshipMotivates:'ÙŠØ¯ÙØ¹', relationshipEnables:'ÙŠÙ…ÙƒÙ‘Ù†', relationshipConstrains:'ÙŠÙ‚ÙŠÙ‘Ø¯', relationshipContradicts:'ÙŠÙ†Ø§Ù‚Ø¶', relationshipAmplifies:'ÙŠØ¶Ø®Ù‘Ù…',
    sourceConnectorManualMock:'ÙŠØ¯ÙˆÙŠ / ÙˆÙ‡Ù…ÙŠ', sourceConnectorWebSearchApi:'ØªØ¬Ø±ÙŠØ¯ API Ø¨Ø­Ø« Ø§Ù„ÙˆÙŠØ¨', sourceConnectorWebSearchPlanned:'Ø¨Ø­Ø« ÙˆÙŠØ¨ Ù…Ø®Ø·Ø· Ù‚Ø¯ÙŠÙ…', sourceConnectorGithubRepo:'Ø¨ÙŠØ§Ù†Ø§Øª Ù…Ø³ØªÙˆØ¯Ø¹ GitHub Ø§Ù„Ø¹Ø§Ù…', sourceConnectorGithubPlanned:'GitHub Ù…Ø®Ø·Ø· Ù‚Ø¯ÙŠÙ…', sourceConnectorHnPlanned:'HN Ù…Ø®Ø·Ø·', sourceConnectorYoutubePlanned:'YouTube Ù…Ø®Ø·Ø·', sourceConnectorRedditPlanned:'Reddit Ù…Ø®Ø·Ø·', sourceConnectorPolymarketPlanned:'Polymarket Ù…Ø®Ø·Ø·',
    searchProviderMock:'Ø¨Ø­Ø« ÙˆÙ‡Ù…ÙŠ', searchProviderBrave:'Brave Search API Ù…Ø®Ø·Ø·', searchProviderTavily:'Tavily Search API Ù…Ø®Ø·Ø·', searchProviderSerpApi:'SerpApi Ù…Ø®Ø·Ø·', searchProviderCustom:'API Ø¨Ø­Ø« Ù…Ø®ØµØµ Ù…Ø®Ø·Ø·',
    formatLast30Days:'Ù†Ù…Ø· last30days', formatDeepResearch:'Ù†Ù…Ø· Ø§Ù„Ø¨Ø­Ø« Ø§Ù„Ø¹Ù…ÙŠÙ‚', formatGenericReport:'ØªÙ‚Ø±ÙŠØ± Ø¹Ø§Ù…', formatSourcePacket:'JSON Ø­Ø²Ù…Ø© Ù…ØµØ§Ø¯Ø± ÙŠØ¯ÙˆÙŠØ©'
  });
  Object.assign(COPY.fr, {
    providerPromptLabel:'AperÃ§u du prompt',
    providerContractLabel:'Contrat de rÃ©ponse',
    responseValidationScore:'Validation de rÃ©ponse',
    contractFixtureScore:'Tests de contrat',
    sourcePlanningScore:'Planification sources',
    sourcePolicyScore:'Politique sources',
    sourceFixtureScore:'Tests sources',
    sourceImportScore:'Import sources',
    providerIdentityScore:'IdentitÃ© fournisseur',
    sourceTypeOfficial:'officiel', sourceTypeAcademic:'acadÃ©mique', sourceTypeNews:'presse', sourceTypeSocial:'rÃ©seau social', sourceTypeMarket:'marchÃ©', sourceTypeExpert:'expert', sourceTypePrimary:'primaire', sourceTypeOther:'autre',
    confidenceLow:'faible', confidenceMedium:'moyenne', confidenceHigh:'Ã©levÃ©e',
    relationshipMotivates:'motive', relationshipEnables:'permet', relationshipConstrains:'contraint', relationshipContradicts:'contredit', relationshipAmplifies:'amplifie',
    sourceConnectorManualMock:'Manuel / simulÃ©', sourceConnectorWebSearchApi:'Abstraction API recherche web', sourceConnectorWebSearchPlanned:'Recherche web planifiÃ©e legacy', sourceConnectorGithubRepo:'MÃ©tadonnÃ©es dÃ©pÃ´t GitHub public', sourceConnectorGithubPlanned:'GitHub planifiÃ© legacy', sourceConnectorHnPlanned:'HN planifiÃ©', sourceConnectorYoutubePlanned:'YouTube planifiÃ©', sourceConnectorRedditPlanned:'Reddit planifiÃ©', sourceConnectorPolymarketPlanned:'Polymarket planifiÃ©',
    searchProviderMock:'Recherche simulÃ©e', searchProviderBrave:'Brave Search API planifiÃ©', searchProviderTavily:'Tavily Search API planifiÃ©', searchProviderSerpApi:'SerpApi planifiÃ©', searchProviderCustom:'API recherche personnalisÃ©e planifiÃ©e',
    formatLast30Days:'style last30days', formatDeepResearch:'style recherche approfondie', formatGenericReport:'rapport gÃ©nÃ©rique', formatSourcePacket:'paquet source JSON manuel'
  });


  Object.assign(COPY.en, {
    promptCompilerEyebrow:'Prompt compiler',
    promptCompilerBody:'Local-only upgrade: refine raw topic input into thesis, questions, evidence needs, counterarguments, and falsifiers before plan generation.',
    compilePrompt:'Compile prompt',
    copyCompiledPrompt:'Copy compiled prompt',
    noCompiledPrompt:'No compiled prompt yet.',
    noCompiledPromptBody:'Compile the topic first to expose thesis, missing context, evidence needs, and falsifiers.',
    compiledThesisTitle:'Compiled thesis',
    qualityLabel:'Quality',
    missingContextTitle:'Missing context',
    outputPlanTitle:'Output plan',
    counterargumentsTitle:'Counterarguments',
    disconfirmingConditionsTitle:'Disconfirming conditions',
    none:'none',
    statusPromptCompiled:'Prompt compiled locally. No AI provider or live fetch was used.',
    timeframe_or_geography:'timeframe/geography',
    specific_entities_or_keywords:'specific entities/keywords',
    temporal_boundary:'temporal boundary'
  });
  Object.assign(COPY.ar, {
    promptCompilerEyebrow:'Ù…ÙØµØ±Ù‘Ù Ø§Ù„Ø¨Ø±ÙˆÙ…Ø¨Øª',
    promptCompilerBody:'ØªØ±Ù‚ÙŠØ© Ù…Ø­Ù„ÙŠØ© ÙÙ‚Ø·: Ø­ÙˆÙ‘Ù„ Ø§Ù„Ù…ÙˆØ¶ÙˆØ¹ Ø§Ù„Ø®Ø§Ù… Ø¥Ù„Ù‰ Ø£Ø·Ø±ÙˆØ­Ø© ÙˆØ£Ø³Ø¦Ù„Ø© ÙˆØ§Ø­ØªÙŠØ§Ø¬Ø§Øª Ø£Ø¯Ù„Ø© ÙˆØ­Ø¬Ø¬ Ù…Ø¶Ø§Ø¯Ø© ÙˆØ´Ø±ÙˆØ· Ø¥Ø¨Ø·Ø§Ù„ Ù‚Ø¨Ù„ ØªÙˆÙ„ÙŠØ¯ Ø§Ù„Ø®Ø·Ø©.',
    compilePrompt:'ØªØµØ±ÙŠÙ Ø§Ù„Ø¨Ø±ÙˆÙ…Ø¨Øª',
    copyCompiledPrompt:'Ù†Ø³Ø® Ø§Ù„Ø¨Ø±ÙˆÙ…Ø¨Øª Ø§Ù„Ù…ÙØµØ±Ù‘Ù',
    noCompiledPrompt:'Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ø¨Ø±ÙˆÙ…Ø¨Øª Ù…ÙØµØ±Ù‘Ù Ø¨Ø¹Ø¯.',
    noCompiledPromptBody:'ØµØ±Ù‘Ù Ø§Ù„Ù…ÙˆØ¶ÙˆØ¹ Ø£ÙˆÙ„Ù‹Ø§ Ù„Ø¥Ø¸Ù‡Ø§Ø± Ø§Ù„Ø£Ø·Ø±ÙˆØ­Ø© ÙˆØ§Ù„Ø³ÙŠØ§Ù‚ Ø§Ù„Ù†Ø§Ù‚Øµ ÙˆØ§Ø­ØªÙŠØ§Ø¬Ø§Øª Ø§Ù„Ø£Ø¯Ù„Ø© ÙˆØ´Ø±ÙˆØ· Ø§Ù„Ø¥Ø¨Ø·Ø§Ù„.',
    compiledThesisTitle:'Ø§Ù„Ø£Ø·Ø±ÙˆØ­Ø© Ø§Ù„Ù…ÙØµØ±Ù‘ÙØ©',
    qualityLabel:'Ø§Ù„Ø¬ÙˆØ¯Ø©',
    missingContextTitle:'Ø§Ù„Ø³ÙŠØ§Ù‚ Ø§Ù„Ù†Ø§Ù‚Øµ',
    outputPlanTitle:'Ø®Ø·Ø© Ø§Ù„Ù…Ø®Ø±Ø¬Ø§Øª',
    counterargumentsTitle:'Ø§Ù„Ø­Ø¬Ø¬ Ø§Ù„Ù…Ø¶Ø§Ø¯Ø©',
    disconfirmingConditionsTitle:'Ø´Ø±ÙˆØ· Ø§Ù„Ø¥Ø¨Ø·Ø§Ù„',
    none:'Ù„Ø§ Ø´ÙŠØ¡',
    statusPromptCompiled:'ØªÙ… ØªØµØ±ÙŠÙ Ø§Ù„Ø¨Ø±ÙˆÙ…Ø¨Øª Ù…Ø­Ù„ÙŠÙ‹Ø§. Ù„Ù… ÙŠÙØ³ØªØ®Ø¯Ù… Ù…Ø²ÙˆÙ‘Ø¯ AI Ø£Ùˆ Ø¬Ù„Ø¨ Ø­ÙŠ.',
    timeframe_or_geography:'Ø§Ù„Ø¥Ø·Ø§Ø± Ø§Ù„Ø²Ù…Ù†ÙŠ/Ø§Ù„Ø¬ØºØ±Ø§ÙÙŠ',
    specific_entities_or_keywords:'ÙƒÙŠØ§Ù†Ø§Øª Ø£Ùˆ ÙƒÙ„Ù…Ø§Øª Ù…ÙØªØ§Ø­ÙŠØ© Ù…Ø­Ø¯Ø¯Ø©',
    temporal_boundary:'Ø­Ø¯ Ø²Ù…Ù†ÙŠ ÙˆØ§Ø¶Ø­'
  });
  Object.assign(COPY.fr, {
    promptCompilerEyebrow:'Compilateur de prompt',
    promptCompilerBody:'AmÃ©lioration locale uniquement : transformer le sujet brut en thÃ¨se, questions, besoins de preuves, contre-arguments et conditions de rÃ©futation avant le plan.',
    compilePrompt:'Compiler le prompt',
    copyCompiledPrompt:'Copier le prompt compilÃ©',
    noCompiledPrompt:'Aucun prompt compilÃ©.',
    noCompiledPromptBody:'Compilez dâ€™abord le sujet pour exposer la thÃ¨se, le contexte manquant, les besoins de preuves et les rÃ©futations.',
    compiledThesisTitle:'ThÃ¨se compilÃ©e',
    qualityLabel:'QualitÃ©',
    missingContextTitle:'Contexte manquant',
    outputPlanTitle:'Plan de sortie',
    counterargumentsTitle:'Contre-arguments',
    disconfirmingConditionsTitle:'Conditions de rÃ©futation',
    none:'aucun',
    statusPromptCompiled:'Prompt compilÃ© localement. Aucun fournisseur IA ni fetch live utilisÃ©.',
    timeframe_or_geography:'pÃ©rimÃ¨tre temporel/gÃ©ographique',
    specific_entities_or_keywords:'entitÃ©s ou mots-clÃ©s prÃ©cis',
    temporal_boundary:'limite temporelle claire'
  });



  Object.assign(COPY.en, {
    reviewThroughputTitle:'Review throughput', visible:'visible', all:'all', allSources:'All sources', allRelationships:'All relationships', resolved:'resolved', unresolved:'unresolved', unlinked:'unlinked', newest:'newest', oldest:'oldest', needsReviewFirst:'needs review first', reliability:'reliability', attention:'attention', contradictions:'contradictions', queueBypass:'queue bypass', reviewKeyboardHint:'Keyboard: / search Â· Enter accept Â· N needs edit Â· R reject Â· E edit.', reviewSearchPlaceholder:'Search review queue...', noVisibleReviewItems:'No review items match the current filters.', acceptVisibleReviewEvidence:'Accept visible', needsEditVisibleReviewEvidence:'Needs edit visible', rejectVisibleReviewEvidence:'Reject visible', statusEvidenceNeedsEdit:'Evidence marked as needs edit.'
  });
  Object.assign(COPY.ar, {
    reviewThroughputTitle:'Ø¥Ù†ØªØ§Ø¬ÙŠØ© Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø©', visible:'Ø¸Ø§Ù‡Ø±', all:'Ø§Ù„ÙƒÙ„', allSources:'ÙƒÙ„ Ø§Ù„Ù…ØµØ§Ø¯Ø±', allRelationships:'ÙƒÙ„ Ø§Ù„Ø¹Ù„Ø§Ù‚Ø§Øª', resolved:'Ù…Ø­Ø³ÙˆÙ…', unresolved:'ØºÙŠØ± Ù…Ø­Ø³ÙˆÙ…', unlinked:'ØºÙŠØ± Ù…Ø±Ø¨ÙˆØ·', newest:'Ø§Ù„Ø£Ø­Ø¯Ø«', oldest:'Ø§Ù„Ø£Ù‚Ø¯Ù…', needsReviewFirst:'Ø§Ù„Ø£ÙˆÙ„ÙˆÙŠØ© Ù„Ù„Ø§Ø­ØªÙŠØ§Ø¬ Ù„Ù„Ù…Ø±Ø§Ø¬Ø¹Ø©', reliability:'Ø§Ù„Ù…ÙˆØ«ÙˆÙ‚ÙŠØ©', attention:'Ø§Ù„Ø§Ù†ØªØ¨Ø§Ù‡', contradictions:'Ø§Ù„ØªÙ†Ø§Ù‚Ø¶Ø§Øª', queueBypass:'ØªØ¬Ø§ÙˆØ² Ø§Ù„ØµÙ', reviewKeyboardHint:'Ù„ÙˆØ­Ø© Ø§Ù„Ù…ÙØ§ØªÙŠØ­: / Ù„Ù„Ø¨Ø­Ø« Â· Enter Ù„Ù„Ù‚Ø¨ÙˆÙ„ Â· N ÙŠØ­ØªØ§Ø¬ ØªØ¹Ø¯ÙŠÙ„ Â· R Ø±ÙØ¶ Â· E ØªØ¹Ø¯ÙŠÙ„.', reviewSearchPlaceholder:'Ø§Ø¨Ø­Ø« ÙÙŠ ØµÙ Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø©...', noVisibleReviewItems:'Ù„Ø§ ØªÙˆØ¬Ø¯ Ø¹Ù†Ø§ØµØ± Ù…Ø±Ø§Ø¬Ø¹Ø© ØªØ·Ø§Ø¨Ù‚ Ø§Ù„ÙÙ„Ø§ØªØ± Ø§Ù„Ø­Ø§Ù„ÙŠØ©.', acceptVisibleReviewEvidence:'Ù‚Ø¨ÙˆÙ„ Ø§Ù„Ø¸Ø§Ù‡Ø±', needsEditVisibleReviewEvidence:'Ø§Ù„Ø¸Ø§Ù‡Ø± ÙŠØ­ØªØ§Ø¬ ØªØ¹Ø¯ÙŠÙ„', rejectVisibleReviewEvidence:'Ø±ÙØ¶ Ø§Ù„Ø¸Ø§Ù‡Ø±', statusEvidenceNeedsEdit:'ØªÙ… ÙˆØ³Ù… Ø§Ù„Ø¯Ù„ÙŠÙ„ Ø¨Ø£Ù†Ù‡ ÙŠØ­ØªØ§Ø¬ ØªØ¹Ø¯ÙŠÙ„.'
  });
  Object.assign(COPY.fr, {
    reviewThroughputTitle:'DÃ©bit de revue', visible:'visible', all:'tout', allSources:'Toutes sources', allRelationships:'Toutes relations', resolved:'rÃ©solu', unresolved:'non rÃ©solu', unlinked:'non liÃ©', newest:'plus rÃ©cent', oldest:'plus ancien', needsReviewFirst:'revue prioritaire', reliability:'fiabilitÃ©', attention:'attention', contradictions:'contradictions', queueBypass:'contournement file', reviewKeyboardHint:'Clavier: / recherche Â· EntrÃ©e accepter Â· N Ã  modifier Â· R rejeter Â· E Ã©diter.', reviewSearchPlaceholder:'Rechercher dans la file...', noVisibleReviewItems:'Aucun Ã©lÃ©ment ne correspond aux filtres.', acceptVisibleReviewEvidence:'Accepter visible', needsEditVisibleReviewEvidence:'Visible Ã  modifier', rejectVisibleReviewEvidence:'Rejeter visible', statusEvidenceNeedsEdit:'Preuve marquÃ©e Ã  modifier.'
  });

  Object.assign(COPY.en, {
    sourceToBriefTitle:'Source-to-Brief Workbench',
    sourceToBriefSubtitle:'Connect the research question, plan, evidence cards, claim map, contradiction groups, source gaps, confidence review, and export package. No automatic source verification is claimed.',
    buildSourceToBrief:'Build source-to-brief package',
    exportSourceToBrief:'Export source-to-brief package',
    sourceToBriefEmpty:'Build the source-to-brief package after adding evidence or compiling a brief.',
    sourceToBriefEmptyBody:'Local package separates evidence, generated claims, inferred confidence, gaps, and blocked unavailable capabilities.',
    statusSourceToBriefBuilt:'Source-to-brief package built locally. No live fetch or provider execution was used.',
    statusSourceToBriefExported:'Source-to-brief package exported.',
    claimMapTitle:'Claim map',
    confidenceReviewTitle:'Confidence review',
    supportStrong:'strong',
    supportPartial:'partial',
    supportWeak:'weak',
    supportUnsupported:'unsupported',
    blockedCapabilitiesTitle:'Blocked capabilities'
  });
  Object.assign(COPY.ar, {
    sourceToBriefTitle:'Ù…Ù† Ø§Ù„Ù…ØµØ¯Ø± Ø¥Ù„Ù‰ Ø§Ù„Ù…ÙˆØ¬Ø²',
    sourceToBriefSubtitle:'Ø§Ø±Ø¨Ø· Ø³Ø¤Ø§Ù„ Ø§Ù„Ø¨Ø­Ø« ÙˆØ§Ù„Ø®Ø·Ø© ÙˆØ¨Ø·Ø§Ù‚Ø§Øª Ø§Ù„Ø£Ø¯Ù„Ø© ÙˆØ®Ø±ÙŠØ·Ø© Ø§Ù„Ø§Ø¯Ø¹Ø§Ø¡Ø§Øª ÙˆÙ…Ø¬Ù…ÙˆØ¹Ø§Øª Ø§Ù„ØªÙ†Ø§Ù‚Ø¶ ÙˆÙØ¬ÙˆØ§Øª Ø§Ù„Ù…ØµØ§Ø¯Ø± ÙˆÙ…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ø«Ù‚Ø© ÙˆØ­Ø²Ù…Ø© Ø§Ù„ØªØµØ¯ÙŠØ±. Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ø§Ø¯Ø¹Ø§Ø¡ ØªØ­Ù‚Ù‚ Ø¢Ù„ÙŠ Ù…Ù† Ø§Ù„Ù…ØµØ§Ø¯Ø±.',
    buildSourceToBrief:'Ø¨Ù†Ø§Ø¡ Ø­Ø²Ù…Ø© Ø§Ù„Ù…ØµØ¯Ø± Ø¥Ù„Ù‰ Ø§Ù„Ù…ÙˆØ¬Ø²',
    exportSourceToBrief:'ØªØµØ¯ÙŠØ± Ø­Ø²Ù…Ø© Ø§Ù„Ù…ØµØ¯Ø± Ø¥Ù„Ù‰ Ø§Ù„Ù…ÙˆØ¬Ø²',
    sourceToBriefEmpty:'Ø§Ø¨Ù† Ø­Ø²Ù…Ø© Ø§Ù„Ù…ØµØ¯Ø± Ø¥Ù„Ù‰ Ø§Ù„Ù…ÙˆØ¬Ø² Ø¨Ø¹Ø¯ Ø¥Ø¶Ø§ÙØ© Ø£Ø¯Ù„Ø© Ø£Ùˆ ØªØ¬Ù…ÙŠØ¹ Ù…ÙˆØ¬Ø².',
    sourceToBriefEmptyBody:'Ø§Ù„Ø­Ø²Ù…Ø© Ø§Ù„Ù…Ø­Ù„ÙŠØ© ØªÙØµÙ„ Ø§Ù„Ø£Ø¯Ù„Ø© ÙˆØ§Ù„Ø§Ø¯Ø¹Ø§Ø¡Ø§Øª Ø§Ù„Ù…ÙˆÙ„Ø¯Ø© ÙˆØ§Ù„Ø«Ù‚Ø© Ø§Ù„Ù…Ø³ØªÙ†ØªØ¬Ø© ÙˆØ§Ù„ÙØ¬ÙˆØ§Øª ÙˆØ§Ù„Ù‚Ø¯Ø±Ø§Øª ØºÙŠØ± Ø§Ù„Ù…ØªØ§Ø­Ø©.',
    statusSourceToBriefBuilt:'ØªÙ… Ø¨Ù†Ø§Ø¡ Ø­Ø²Ù…Ø© Ø§Ù„Ù…ØµØ¯Ø± Ø¥Ù„Ù‰ Ø§Ù„Ù…ÙˆØ¬Ø² Ù…Ø­Ù„ÙŠØ§. Ù„Ù… ÙŠØªÙ… Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø¬Ù„Ø¨ Ø­ÙŠ Ø£Ùˆ ØªÙ†ÙÙŠØ° Ù…Ø²ÙˆØ¯.',
    statusSourceToBriefExported:'ØªÙ… ØªØµØ¯ÙŠØ± Ø­Ø²Ù…Ø© Ø§Ù„Ù…ØµØ¯Ø± Ø¥Ù„Ù‰ Ø§Ù„Ù…ÙˆØ¬Ø².',
    claimMapTitle:'Ø®Ø±ÙŠØ·Ø© Ø§Ù„Ø§Ø¯Ø¹Ø§Ø¡Ø§Øª',
    confidenceReviewTitle:'Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ø«Ù‚Ø©',
    supportStrong:'Ù‚ÙˆÙŠ',
    supportPartial:'Ø¬Ø²Ø¦ÙŠ',
    supportWeak:'Ø¶Ø¹ÙŠÙ',
    supportUnsupported:'ØºÙŠØ± Ù…Ø¯Ø¹ÙˆÙ…',
    blockedCapabilitiesTitle:'Ù‚Ø¯Ø±Ø§Øª ØºÙŠØ± Ù…ØªØ§Ø­Ø©'
  });
  Object.assign(COPY.fr, {
    sourceToBriefTitle:'Atelier source vers brief',
    sourceToBriefSubtitle:'Relie question, plan, cartes de preuve, carte des affirmations, contradictions, lacunes source, revue de confiance et paquet export. Aucune verification automatique des sources nest revendiquee.',
    buildSourceToBrief:'Construire le paquet source vers brief',
    exportSourceToBrief:'Exporter le paquet source vers brief',
    sourceToBriefEmpty:'Construisez le paquet source vers brief apres ajout de preuves ou compilation du brief.',
    sourceToBriefEmptyBody:'Le paquet local separe preuves, affirmations generees, confiance inferee, lacunes et capacites indisponibles.',
    statusSourceToBriefBuilt:'Paquet source vers brief construit localement. Aucun fetch live ni execution fournisseur.',
    statusSourceToBriefExported:'Paquet source vers brief exporte.',
    claimMapTitle:'Carte des affirmations',
    confidenceReviewTitle:'Revue de confiance',
    supportStrong:'fort',
    supportPartial:'partiel',
    supportWeak:'faible',
    supportUnsupported:'non soutenu',
    blockedCapabilitiesTitle:'Capacites bloquees'
  });

  const SUPPORTED_LANGS = ['ar','en','fr'];
  function esc(value){ return String(value ?? '').replace(/[&<>'"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char])); }

  Object.assign(COPY.en, {

    strategicEvidenceGraphTitle:'Strategic Evidence Map',
    graphExportTitle:'Graph export report',
    graphQualityTitle:'Graph quality diagnostics',
    controlledConnectorTitle:'Controlled connectors',
    connectors:'connectors',
    urlListImport:'URL list import',
    manualTranscriptImport:'Manual transcript import',
    manualSourceListImport:'Manual source-list import'
  });
  Object.assign(COPY.ar, {
    strategicEvidenceGraphTitle:'Ø®Ø±ÙŠØ·Ø© Ø§Ù„Ø£Ø¯Ù„Ø© Ø§Ù„Ø§Ø³ØªØ±Ø§ØªÙŠØ¬ÙŠØ©',
    graphExportTitle:'ØªÙ‚Ø±ÙŠØ± ØªØµØ¯ÙŠØ± Ø§Ù„Ø±Ø³Ù…',
    graphQualityTitle:'ØªØ´Ø®ÙŠØµ Ø¬ÙˆØ¯Ø© Ø§Ù„Ø±Ø³Ù…',
    controlledConnectorTitle:'Ø§Ù„Ù…ÙˆØµÙ„Ø§Øª Ø§Ù„Ù…Ø¶Ø¨ÙˆØ·Ø©',
    connectors:'Ù…ÙˆØµÙ„Ø§Øª',
    urlListImport:'Ø§Ø³ØªÙŠØ±Ø§Ø¯ Ù‚Ø§Ø¦Ù…Ø© Ø±ÙˆØ§Ø¨Ø·',
    manualTranscriptImport:'Ø§Ø³ØªÙŠØ±Ø§Ø¯ Ù†Øµ ÙŠØ¯ÙˆÙŠ',
    manualSourceListImport:'Ø§Ø³ØªÙŠØ±Ø§Ø¯ Ù‚Ø§Ø¦Ù…Ø© Ù…ØµØ§Ø¯Ø± ÙŠØ¯ÙˆÙŠØ©'
  });
  Object.assign(COPY.fr, {
    strategicEvidenceGraphTitle:'Carte stratÃ©gique des preuves',
    graphExportTitle:'Rapport dâ€™export graphe',
    graphQualityTitle:'Diagnostics qualitÃ© du graphe',
    controlledConnectorTitle:'Connecteurs contrÃ´lÃ©s',
    connectors:'connecteurs',
    urlListImport:'Import liste URL',
    manualTranscriptImport:'Import transcript manuel',
    manualSourceListImport:'Import liste de sources'
  });

  function getLang(){
    const lang = (global.document?.documentElement?.lang || global.localStorage?.getItem('jarbou3i.lang') || 'ar').slice(0,2).toLowerCase();
    return SUPPORTED_LANGS.includes(lang) ? lang : 'en';
  }
  function tr(key){ return (COPY[getLang()] && COPY[getLang()][key]) || COPY.en[key] || key; }
  function applyLabels(documentRef, updateEvidenceButtonLabel){
    documentRef.querySelectorAll('[data-r-i18n]').forEach(el => { el.textContent = tr(el.getAttribute('data-r-i18n')); });
    documentRef.querySelectorAll('[data-r-placeholder]').forEach(el => { el.setAttribute('placeholder', tr(el.getAttribute('data-r-placeholder'))); });
    const projectInput = documentRef.getElementById('projectNameInput');
    if(projectInput) projectInput.setAttribute('placeholder', tr('untitledResearchProject'));
    const localizeSelectOptions = (selectId, optionKeys) => {
      const select = documentRef.getElementById(selectId);
      if(!select) return;
      Array.from(select.options || []).forEach(option => { option.textContent = tr(optionKeys[option.value] || option.value); });
    };
    const sourceTemplateSelect = documentRef.getElementById('sourcePacketTemplateSelect');
    if(sourceTemplateSelect){
      sourceTemplateSelect.setAttribute('aria-label', tr('sourcePacketTemplatePresetAria'));
      localizeSelectOptions('sourcePacketTemplateSelect', {official_report:'sourceTemplateOfficialReport', reddit_thread:'sourceTemplateRedditThread', youtube_transcript:'sourceTemplateYoutubeTranscript', market_signal:'sourceTemplateMarketSignal', github_release:'sourceTemplateGithubRelease', generic_article:'sourceTemplateGenericArticle'});
    }
    localizeSelectOptions('researchMode', {structural:'modeStructural', recent:'modeRecent', 'source-heavy':'modeSourceHeavy', adversarial:'modeAdversarial'});
    localizeSelectOptions('evSourceType', {official:'sourceTypeOfficial', academic:'sourceTypeAcademic', news:'sourceTypeNews', social:'sourceTypeSocial', market:'sourceTypeMarket', expert:'sourceTypeExpert', primary:'sourceTypePrimary', other:'sourceTypeOther'});
    localizeSelectOptions('evConfidence', {low:'confidenceLow', medium:'confidenceMedium', high:'confidenceHigh'});
    localizeSelectOptions('linkRelationship', {motivates:'relationshipMotivates', enables:'relationshipEnables', constrains:'relationshipConstrains', contradicts:'relationshipContradicts', amplifies:'relationshipAmplifies'});
    localizeSelectOptions('linkConfidence', {low:'confidenceLow', medium:'confidenceMedium', high:'confidenceHigh'});
    localizeSelectOptions('providerName', {mock:'providerModeMockName', openai_compatible:'providerModeByokName', backend_proxy:'providerModeBackendName', portable_oauth:'providerModePortableName'});
    localizeSelectOptions('providerTask', {plan:'taskPlan', synthesis:'taskSynthesis', repair:'taskRepair', critique:'taskCritique', source_discipline:'taskSourceDiscipline'});
    localizeSelectOptions('sourceConnector', {manual_mock:'sourceConnectorManualMock', web_search_api:'sourceConnectorWebSearchApi', web_search_planned:'sourceConnectorWebSearchPlanned', github_public_repo:'sourceConnectorGithubRepo', github_planned:'sourceConnectorGithubPlanned', hn_planned:'sourceConnectorHnPlanned', youtube_planned:'sourceConnectorYoutubePlanned', reddit_planned:'sourceConnectorRedditPlanned', polymarket_planned:'sourceConnectorPolymarketPlanned'});
    localizeSelectOptions('sourceTask', {source_plan:'sourceTaskPlan', query_plan:'sourceTaskQuery', claim_extraction:'sourceTaskClaim', evidence_scoring:'sourceTaskScoring', cluster_plan:'sourceTaskCluster'});
    localizeSelectOptions('searchProviderSelect', {mock_search:'searchProviderMock', brave_search_api:'searchProviderBrave', tavily_search_api:'searchProviderTavily', serpapi:'searchProviderSerpApi', custom_search_api:'searchProviderCustom'});
    localizeSelectOptions('sourceImportFormat', {auto:'formatAuto', last30days:'formatLast30Days', deep_research:'formatDeepResearch', generic_research_report:'formatGenericReport', source_packet:'formatSourcePacket'});
    documentRef.querySelectorAll('.researchCard').forEach(card => { card.setAttribute('data-collapse-note', tr('advancedDetailsCollapsed')); });
    documentRef.querySelectorAll('.researchCard.disciplineAccordion > h3').forEach(heading => {
      heading.setAttribute('data-accordion-show', tr('show'));
      heading.setAttribute('data-accordion-hide', tr('hide'));
    });
    documentRef.querySelectorAll('[data-r-toggle-show][data-r-toggle-hide]').forEach(button => {
      const expanded = String(button.getAttribute('data-expanded')) === 'true';
      const key = expanded ? button.getAttribute('data-r-toggle-hide') : button.getAttribute('data-r-toggle-show');
      button.textContent = tr(key);
    });
    if(typeof updateEvidenceButtonLabel === 'function') updateEvidenceButtonLabel();
  }
  root.renderHelpers = {COPY, SUPPORTED_LANGS, esc, getLang, tr, applyLabels};
})(window);

/* v1.2.0-alpha.2 Â· Source-to-Brief Intelligence Workbench */

/* legacy-test-token: Ù…Ø±Ø´Ø­ Ù…Ø³ØªÙ‚Ø±; candidat stable. Public visible stable labels are Ø§Ù„Ø¹Ø±Ø¶ Ø§Ù„Ø¹Ø§Ù… Ø§Ù„Ù…Ø³ØªÙ‚Ø± / DÃ©mo publique stable. */

/* legacy-release-test-token: Stable consolidation v1.1.0 */

/* legacy-release-test-token: Ø§Ù„Ø¯Ù…Ø¬ Ø§Ù„Ù…Ø³ØªÙ‚Ø± v1.1.0 */

/* legacy-release-test-token: consolidation stable v1.1.0 */

/* legacy-release-test-token: aucune recherche live */
