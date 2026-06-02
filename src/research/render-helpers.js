/* current public label: v1.4.0-alpha.39 Source-to-Brief Operator Control Room */
/* current-public-label: v1.4.0-alpha.39 Source-to-Brief Operator Control Room */
/* release-truth-public-label: v1.4.0-alpha.39 Source-to-Brief Operator Control Room */
/* current public release label:  */
/* current release public label:  */

/* v1.4.0-alpha.28 localized labels: ; v1.4.0-alpha.28 حزمة مراجعة إعادة التشغيل + تصدير تسليم المشغّل; v1.4.0-alpha.28 Pack de revue de rejeu + export de handoff opérateur. */
/* v1.4.0-alpha.28 · Source-to-Brief Operator Control Room. Runtime-budget guard only; disabled by default. */
/* continuity tokens for legacy alpha.15/alpha.17 release gates: ضغط تجربة محوّل المزوّد اليدوي; Compression UX de l’adaptateur fournisseur manuel; bounded runtime surface. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const COPY = {
    en: {
      researchTitle:'Research Workflow Lab',
      researchSubtitle:'Experimental research-to-strategy pipeline. Manual mode remains untouched; this layer builds plan, evidence, source clusters, entity profiles, causal links, mock AI, critique, and Quality Gate v3.',
      alphaBadge:' · Runtime-Budget Guard Only',
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
      researchTitle:'مختبر سير العمل البحثي',
      researchSubtitle:'طبقة تجريبية تربط البحث بالتحليل الاستراتيجي. النمط اليدوي يبقى كما هو؛ هذه الطبقة تضيف خطة، مصفوفة أدلة، تجميعات مصادر، ملفات كيانات، روابط سببية، نقد، وبوابة جودة v3.',
      alphaBadge:'v1.4.0-alpha.28 رؤى إعادة تشغيل المحوّل وسطح قرار المشغّل · مراجعة المشغّل' ,
      planTitle:'خطة البحث',
      planSubtitle:'حوّل الموضوع إلى أسئلة بحث، مصادر مستهدفة، فاعلين، أدلة مضادة، ومؤشرات إنذار مبكر.',
      planMode:'نمط البحث',
      modeStructural:'هيكلي', modeRecent:'إشارات حديثة', modeSourceHeavy:'مرتكز على المصادر', modeAdversarial:'نقدي/خصومي',
      generatePlan:'توليد خطة البحث', copyPlanPrompt:'نسخ برومبت الخطة', clearPlan:'مسح الخطة', noPlan:'لا توجد خطة بحث بعد.',
      evidenceTitle:'مصفوفة الأدلة',
      evidenceSubtitle:'الدليل يصبح كائنًا مستقلًا قبل التحليل. كل ادعاء يمكن أن يدعم أو يناقض طبقات النموذج.',
      claim:'الادعاء', sourceTitle:'عنوان المصدر', sourceUrl:'رابط المصدر', sourceType:'نوع المصدر', sourceDate:'تاريخ المصدر', strength:'القوة', timeRelevance:'الملاءمة الزمنية', publicSignal:'الإشارة العامة', supports:'يدعم IDs', contradicts:'يناقض IDs', confidence:'الثقة', notes:'ملاحظات',
      addEvidence:'إضافة دليل', updateEvidence:'تحديث الدليل', cancelEdit:'إلغاء التعديل', loadDemoEvidence:'تحميل أدلة تجريبية', exportWorkflow:'تصدير حزمة البحث', exportPackV2:'تصدير حزمة v2', statusExportPackExported:'تم إنشاء حزمة التصدير v2.', importWorkflow:'استيراد حزمة بحث', clearEvidence:'مسح الأدلة', matrixEmpty:'مصفوفة الأدلة فارغة.', edit:'تعديل', remove:'حذف',
      causalTitle:'الروابط السببية', causalSubtitle:'اربط المصالح والفاعلين والأدوات والسرديات والنتائج والتغذية الراجعة والأدلة بادعاءات سببية صريحة.', linkFrom:'من', linkTo:'إلى', relationship:'العلاقة', evidenceIds:'IDs الأدلة', addCausalLink:'إضافة رابط سببي', inferCausalLinks:'استنتاج من الأدلة', clearCausalLinks:'مسح الروابط', causalEmpty:'لا توجد روابط سببية بعد.',
      compilerTitle:'مُصرّف التحليل', compilerSubtitle:'حوّل الأدلة والعناقيد المصدرية والفجوات والروابط السببية إلى موجز جاهز للتوليف.', compileBrief:'تجميع موجز التحليل', copySynthesisPrompt:'نسخ برومبت التوليف', exportAnalysisBrief:'تصدير الموجز', clearAnalysisBrief:'مسح الموجز', noAnalysisBrief:'لا يوجد موجز تحليل بعد.', clusterTitle:'عناقيد المصادر', entityTitle:'ملفات الكيانات', gapsTitle:'فجوات التغطية', diagnosticsTitle:'تشخيص التحقق', compilerScore:'المُصرّف', statusCompiled:'تم تجميع موجز التحليل.', statusBriefExported:'تم تصدير موجز التحليل.', statusBriefCleared:'تم مسح موجز التحليل.',
      workflowTitle:'سير AI تجريبي', workflowSubtitle:'تجريد المزوّد يبدأ بمزوّد وهمي. ينتج JSON صالحًا دون الاتصال بأي API خارجي.', generateMock:'توليد JSON تحليلي تجريبي', runMockRepair:'تشغيل إصلاح تجريبي', runCritique:'تشغيل نقد تجريبي', copyDeepPrompt:'نسخ برومبت البحث العميق', providerEndpoint:'Endpoint', providerModel:'Model', providerApiKey:'API key', rememberProviderKey:'Remember locally on this device', enableLiveByok:'Enable live provider calls', providerSafety:'Safety: manual/private mode remains default. Keys are never exported.', validateProviderSettings:'Validate provider settings', dryRunProviderRequest:'Build dry-run request', byokScore:'BYOK safety', backendProxyScore:'Backend proxy', providerIdentityScore:'Provider identity', statusProviderDryRun:'Provider payload built without live network call.', statusProviderSettingsSaved:'Provider settings validated and saved.', statusProviderLiveDisabled:'Live provider calls disabled; dry-run/mock response recorded.', statusProviderLiveError:'Live provider call failed; no key was stored in the run ledger.', statusBackendProxyReady:'Hosted backend proxy selected. Browser sends no provider key.',
      qualityTitle:'بوابة الجودة v3', planScore:'الخطة', evidenceScore:'الأدلة', causalScore:'الروابط السببية', critiqueScore:'النقد', sourceScore:'انضباط المصادر', diversityScore:'تنوع المصادر', counterScore:'الأدلة المضادة', readiness:'الجاهزية',
      statusReady:'سير العمل البحثي جاهز للمحاكاة.', statusNeedPlan:'ولّد خطة بحث أولًا.', statusNeedEvidence:'أضف أدلة قبل التوليف.', statusGenerated:'تم توليد JSON تجريبي ووضعه في خانة الاستيراد.', statusRepaired:'الإصلاح التجريبي أنتج JSON متوافقًا.', statusCritiqued:'تم توليد نقد تجريبي.', statusImported:'تم استيراد حزمة البحث.', statusExported:'تم تصدير حزمة البحث.', statusEditing:'تم تحميل الدليل للتعديل.', statusLinkAdded:'تمت إضافة الرابط السببي.', statusLinksInferred:'تم استنتاج الروابط السببية من الأدلة.', statusInvalidPacket:'حزمة البحث غير صالحة.', statusInvalidLink:'الرابط السببي يحتاج من/إلى وعلى الأقل ID دليل واحد.', copied:'تم النسخ.', copyFailed:'تعذر النسخ. استخدم النص الظاهر يدويًا.',
      urlOptional:'https://example.com/source', claimPlaceholder:'ادعاء قابل للملاحظة أو نتيجة بحثية', sourcePlaceholder:'تقرير، دراسة، قاعدة بيانات، تفريغ، أو ملاحظة', supportsPlaceholder:'I1,A1,T1', contradictsPlaceholder:'N1,R1', notesPlaceholder:'لماذا هذا الدليل مهم / عدم اليقين / الحدود'
    },
    fr: {
      researchTitle:'Laboratoire de workflow de recherche',
      researchSubtitle:'Couche expérimentale reliant la recherche à l’analyse stratégique. Le mode manuel reste intact; cette couche ajoute plan, matrice de preuves, clusters de sources, profils d’entités, liens causaux, critique et barrière qualité v3.',
      alphaBadge:'v1.4.0-alpha.28 Insights de rejeu adaptateur + surface de décision opérateur · revue opérateur',
      planTitle:'Plan de recherche',
      planSubtitle:'Transformer le sujet en questions, sources cibles, acteurs, contre-preuves et signaux précoces.',
      planMode:'Mode de recherche',
      modeStructural:'Structurel', modeRecent:'Signaux récents', modeSourceHeavy:'Très sourcé', modeAdversarial:'Adversarial',
      generatePlan:'Générer le plan', copyPlanPrompt:'Copier le prompt du plan', clearPlan:'Effacer le plan', noPlan:'Aucun plan de recherche.',
      evidenceTitle:'Matrice de preuves',
      evidenceSubtitle:'La preuve devient un objet avant l’analyse. Chaque élément peut soutenir ou contredire des couches du modèle.',
      claim:'Énoncé', sourceTitle:'Titre de source', sourceUrl:'URL source', sourceType:'Type de source', sourceDate:'Date source', strength:'Force', timeRelevance:'Pertinence temps', publicSignal:'Signal public', supports:'Soutient IDs', contradicts:'Contredit IDs', confidence:'Confiance', notes:'Notes',
      addEvidence:'Ajouter preuve', updateEvidence:'Mettre à jour', cancelEdit:'Annuler édition', loadDemoEvidence:'Charger preuves démo', exportWorkflow:'Exporter paquet recherche', importWorkflow:'Importer paquet recherche', clearEvidence:'Effacer preuves', matrixEmpty:'La matrice de preuves est vide.', edit:'Modifier', remove:'Supprimer',
      causalTitle:'Liens causaux', causalSubtitle:'Relier intérêts, acteurs, outils, narratifs, résultats, feedback et preuves dans des affirmations causales explicites.', linkFrom:'De', linkTo:'Vers', relationship:'Relation', evidenceIds:'IDs preuve', addCausalLink:'Ajouter lien causal', inferCausalLinks:'Inférer depuis preuves', clearCausalLinks:'Effacer liens', causalEmpty:'Aucun lien causal.',
      compilerTitle:'Compilateur d’analyse', compilerSubtitle:'Compiler preuves, clusters de sources, lacunes et liens causaux dans un brief prêt pour synthèse.', compileBrief:'Compiler le brief', copySynthesisPrompt:'Copier prompt synthèse', exportAnalysisBrief:'Exporter le brief', clearAnalysisBrief:'Effacer le brief', noAnalysisBrief:'Aucun brief compilé.', clusterTitle:'Clusters de sources', entityTitle:'Profils d’entités', gapsTitle:'Lacunes de couverture', diagnosticsTitle:'Diagnostics validation', compilerScore:'Compilateur', statusCompiled:'Brief d’analyse compilé.', statusBriefExported:'Brief exporté.', statusBriefCleared:'Brief effacé.',
      workflowTitle:'Workflow IA simulé', workflowSubtitle:'L’abstraction fournisseur commence par un fournisseur simulé. Il crée un JSON valide sans API externe.', generateMock:'Générer JSON simulé', runMockRepair:'Réparation simulée', runCritique:'Critique simulée', copyDeepPrompt:'Copier prompt deep-research', providerEndpoint:'Endpoint', providerModel:'Model', providerApiKey:'API key', rememberProviderKey:'Remember locally on this device', enableLiveByok:'Enable live provider calls', providerSafety:'Safety: manual/private mode remains default. Keys are never exported.', validateProviderSettings:'Validate provider settings', dryRunProviderRequest:'Build dry-run request', byokScore:'BYOK safety', backendProxyScore:'Backend proxy', providerIdentityScore:'Provider identity', statusProviderDryRun:'Provider payload built without live network call.', statusProviderSettingsSaved:'Provider settings validated and saved.', statusProviderLiveDisabled:'Live provider calls disabled; dry-run/mock response recorded.', statusProviderLiveError:'Live provider call failed; no key was stored in the run ledger.', statusBackendProxyReady:'Hosted backend proxy selected. Browser sends no provider key.',
      qualityTitle:'Barrière qualité v3', planScore:'Plan', evidenceScore:'Preuves', causalScore:'Liens causaux', critiqueScore:'Critique', sourceScore:'Discipline sources', diversityScore:'Diversité sources', counterScore:'Contre-preuves', readiness:'Préparation',
      statusReady:'Workflow prêt pour synthèse simulée.', statusNeedPlan:'Générez d’abord un plan.', statusNeedEvidence:'Ajoutez des preuves avant la synthèse.', statusGenerated:'JSON simulé généré et placé dans la zone d’import.', statusRepaired:'Réparation simulée compatible avec le schéma.', statusCritiqued:'Critique simulée générée.', statusImported:'Paquet de recherche importé.', statusExported:'Paquet de recherche exporté.', statusEditing:'Élément chargé pour édition.', statusLinkAdded:'Lien causal ajouté.', statusLinksInferred:'Liens causaux inférés.', statusInvalidPacket:'Paquet de recherche invalide.', statusInvalidLink:'Un lien causal exige De, Vers et au moins un ID preuve.', copied:'Copié.', copyFailed:'Copie impossible. Utilisez le texte visible manuellement.',
      urlOptional:'https://example.com/source', claimPlaceholder:'Énoncé observable ou résultat de recherche', sourcePlaceholder:'Publication, rapport, données, transcript ou note', supportsPlaceholder:'I1,A1,T1', contradictsPlaceholder:'N1,R1', notesPlaceholder:'Pourquoi cette preuve compte / incertitude / limites'
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
    researchPlannerEyebrow:'مخطط البحث V2',
    researchPlannerTitle:'مخطط البحث V2',
    researchPlannerBody:'مخطط محلي فقط: مستويات عمق، ميزانيات مصادر، خطط استعلام مرتبطة بالكيانات، أهداف أدلة مضادة، وتشخيص جاهزية موصلات دون تنفيذ.',
    researchPlannerEmpty:'لا يوجد تقرير مخطط بحث بعد.',
    researchPlannerEmptyBody:'ولّد خطة بحث لبناء مستويات العمق وميزانيات المصادر والاستعلامات المرتبطة بالكيانات وأهداف الأدلة المضادة.',
    researchPlannerQueries:'خطة الاستعلام المرتبطة بالكيانات',
    researchPlannerCounterEvidence:'أهداف الأدلة المضادة'
  });
  Object.assign(COPY.fr, {
    researchPlannerEyebrow:'Planificateur de recherche V2',
    researchPlannerTitle:'Planificateur de recherche V2',
    researchPlannerBody:'Planificateur local: niveaux quick/standard/deep, budgets de sources, requêtes liées aux entités, contre-preuves et diagnostics de connecteurs en dry-run.',
    researchPlannerEmpty:'Aucun rapport de planification.',
    researchPlannerEmptyBody:'Générez un plan de recherche pour créer profondeurs, budgets de sources, requêtes liées aux entités et contre-preuves.',
    researchPlannerQueries:'Plan de requêtes lié aux entités',
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
    importSourceEvidence:'إرسال إلى صف المراجعة',
    evidenceReviewTitle:'صف مراجعة الأدلة',
    evidenceReviewSubtitle:'الأدلة المستوردة لا تدخل المصفوفة قبل قبولها أو تعديلها أو رفضها.',
    evidenceReviewEmpty:'لا توجد أدلة مستوردة بانتظار المراجعة.',
    evidenceReviewScore:'مراجعة الأدلة',
    reviewStatus:'حالة المراجعة',
    pending:'قيد المراجعة',
    accepted:'مقبول',
    rejected:'مرفوض',
    needsEdit:'يحتاج تعديل',
    accept:'قبول',
    reject:'رفض',
    editCandidate:'تعديل المرشح',
    acceptAllReviewEvidence:'قبول كل المعلّق',
    acceptEditedReviewEvidence:'قبول المرشح المعدّل',
    exportEvidenceReviewQueue:'تصدير صف المراجعة',
    clearResolvedReviewEvidence:'مسح المحسوم',
    statusSourceImported:'تم إرسال المرشحات إلى صف مراجعة الأدلة.',
    statusEvidenceAccepted:'تم قبول الدليل في المصفوفة.',
    statusEvidenceRejected:'تم رفض المرشح.',
    statusReviewEditing:'تم تحميل المرشح في النموذج للتعديل.',
    statusReviewQueueExported:'تم تصدير صف المراجعة.',
    statusReviewQueueCleared:'تم مسح عناصر المراجعة المحسومة.',
    statusNoReviewSelection:'حمّل مرشح مراجعة قبل قبول النسخة المعدلة.',
    sourcePacketBuilderTitle:'منشئ حزمة المصادر',
    sourcePacketBuilderSubtitle:'بناء JSON محلي لحزمة مصادر يدوية من الأدلة أو صف المراجعة.',
    sourcePacketBuilderPolicyNote:'المُنشئ محلي ويدوي فقط: لا يجلب ولا يتحقق من المصادر.',
    buildSourcePacketFromEvidence:'بناء من مصفوفة الأدلة',
    buildSourcePacketFromReview:'بناء من صف المراجعة',
    copySourcePacketBuilder:'نسخ حزمة المصادر',
    exportSourcePacketBuilder:'تصدير حزمة المصادر',
    statusSourcePacketBuilt:'تم بناء حزمة مصادر يدوية. راجع أعلام التقييم قبل إعادة الاستخدام.',
    statusSourcePacketEmpty:'لا توجد أدلة لبناء حزمة مصادر.',
    statusSourcePacketCopied:'تم نسخ حزمة المصادر.',
    statusSourcePacketExported:'تم تصدير حزمة المصادر.',
    statusEvidenceNeedsEdit:'تم وسم المرشح بأنه يحتاج تعديل وفق ضوابط التقييم.'
  });
  Object.assign(COPY.fr, {
    importSourceEvidence:'Envoyer en revue',
    evidenceReviewTitle:'File de revue des preuves',
    evidenceReviewSubtitle:'Les candidats importés doivent être acceptés, modifiés ou rejetés avant d’entrer dans la matrice.',
    evidenceReviewEmpty:'Aucune preuve importée en attente de revue.',
    evidenceReviewScore:'Revue des preuves',
    reviewStatus:'Statut de revue',
    pending:'en attente',
    accepted:'accepté',
    rejected:'rejeté',
    needsEdit:'à modifier',
    accept:'Accepter',
    reject:'Rejeter',
    editCandidate:'Modifier le candidat',
    acceptAllReviewEvidence:'Accepter tous les éléments en attente',
    acceptEditedReviewEvidence:'Accepter le candidat modifié',
    exportEvidenceReviewQueue:'Exporter la file de revue',
    clearResolvedReviewEvidence:'Effacer les éléments résolus',
    statusSourceImported:'Candidats envoyés dans la file de revue des preuves.',
    statusEvidenceAccepted:'Candidat accepté dans la matrice.',
    statusEvidenceRejected:'Candidat rejeté.',
    statusReviewEditing:'Candidat chargé dans le formulaire pour modification.',
    statusReviewQueueExported:'File de revue exportée.',
    statusReviewQueueCleared:'Éléments résolus effacés.',
    statusNoReviewSelection:'Chargez un candidat avant d’accepter la version modifiée.',
    sourcePacketBuilderTitle:'Constructeur de paquet source',
    sourcePacketBuilderSubtitle:'Construire un paquet source manuel/local depuis les preuves ou la file de revue.',
    sourcePacketBuilderPolicyNote:'Le constructeur est local/manuel: aucun fetch live et aucune vérification de source.',
    buildSourcePacketFromEvidence:'Construire depuis la matrice',
    buildSourcePacketFromReview:'Construire depuis la revue',
    copySourcePacketBuilder:'Copier le paquet source',
    exportSourcePacketBuilder:'Exporter le paquet source',
    statusSourcePacketBuilt:'Paquet source manuel construit. Vérifiez les alertes de score avant réutilisation.',
    statusSourcePacketEmpty:'Aucune preuve disponible pour construire un paquet source.',
    statusSourcePacketCopied:'Paquet source copié.',
    statusSourcePacketExported:'Paquet source exporté.',
    statusEvidenceNeedsEdit:'Candidat marqué à modifier par les contrôles de scoring.'
  });




  Object.assign(COPY.en, {
    diagnosticRepairQueueTitle:'Diagnostic Repair Queue',
    exportRiskResolutionTitle:'Export Risk Resolution',
    diagnosticRepairQueueClear:'Diagnostic repair queue clear',
    diagnosticRepairQueueClearBody:'No open weak-claim, contradiction, traceability, source-gap, or export-risk repairs are currently queued.',
    exportRiskClear:'Export risks cleared',
    exportRiskClearBody:'No blocker-level export risks are open in the local/manual resolution checklist.',
    openRepairs:'open repairs',
    requiredBeforeExport:'required before export',
    diagnosticRepairQueueBoundary:'Local/manual repair queue only. It does not verify sources, fetch live data, execute providers, or bypass review.',
    exportRiskResolutionBoundary:'Export-risk resolution is manual. It does not automatically verify evidence or permit export without operator review.',
    diagnostic_repair_queue_required_before_export:'repair required before export',
    diagnostic_repair_queue_open:'repair queue open',
    diagnostic_repair_queue_clear:'repair queue clear',
    export_risk_resolution_required:'export risk resolution required',
    export_risk_ready_with_manual_warnings:'export ready with manual warnings',
    export_risk_cleared:'export risk cleared',
    open_required_repair:'open required repair',
    failed_export_readiness_check:'failed export readiness check',
    export_polish_blocker:'export polish blocker'
  });
  Object.assign(COPY.ar, {
    diagnosticRepairQueueTitle:'صف إصلاح التشخيص',
    exportRiskResolutionTitle:'حل مخاطر التصدير',
    diagnosticRepairQueueClear:'صف إصلاح التشخيص صافٍ',
    diagnosticRepairQueueClearBody:'لا توجد إصلاحات مفتوحة للادعاءات الضعيفة أو التناقضات أو التتبّع أو فجوات المصادر أو مخاطر التصدير.',
    exportRiskClear:'مخاطر التصدير صافية',
    exportRiskClearBody:'لا توجد مخاطر تصدير مانعة مفتوحة في قائمة الحل اليدوية المحلية.',
    openRepairs:'إصلاحات مفتوحة',
    requiredBeforeExport:'مطلوب قبل التصدير',
    diagnosticRepairQueueBoundary:'صف إصلاح محلي/يدوي فقط. لا يتحقق من المصادر ولا يجلب بيانات حية ولا ينفذ مزودين ولا يتجاوز المراجعة.',
    exportRiskResolutionBoundary:'حل مخاطر التصدير يدوي. لا يتحقق آليًا من الأدلة ولا يسمح بالتصدير دون مراجعة المشغّل.',
    diagnostic_repair_queue_required_before_export:'إصلاح مطلوب قبل التصدير',
    diagnostic_repair_queue_open:'صف الإصلاح مفتوح',
    diagnostic_repair_queue_clear:'صف الإصلاح صافٍ',
    export_risk_resolution_required:'حل مخاطر التصدير مطلوب',
    export_risk_ready_with_manual_warnings:'التصدير جاهز مع تحذيرات يدوية',
    export_risk_cleared:'مخاطر التصدير صافية',
    open_required_repair:'إصلاح مطلوب مفتوح',
    failed_export_readiness_check:'فشل فحص جاهزية التصدير',
    export_polish_blocker:'مانع صقل التصدير'
  });
  Object.assign(COPY.fr, {
    diagnosticRepairQueueTitle:'File de réparation diagnostique',
    exportRiskResolutionTitle:'Résolution des risques export',
    diagnosticRepairQueueClear:'File de réparation diagnostique claire',
    diagnosticRepairQueueClearBody:'Aucune réparation ouverte pour affirmation faible, contradiction, traçabilité, lacune source ou risque export.',
    exportRiskClear:'Risques export clarifiés',
    exportRiskClearBody:'Aucun risque export bloquant n’est ouvert dans la checklist locale/manuelle.',
    openRepairs:'réparations ouvertes',
    requiredBeforeExport:'requis avant export',
    diagnosticRepairQueueBoundary:'File de réparation locale/manuelle uniquement. Elle ne vérifie pas les sources, ne récupère pas de données live, n’exécute pas de fournisseurs et ne contourne pas la revue.',
    exportRiskResolutionBoundary:'La résolution des risques export est manuelle. Elle ne vérifie pas automatiquement les preuves et n’autorise pas l’export sans revue opérateur.',
    diagnostic_repair_queue_required_before_export:'réparation requise avant export',
    diagnostic_repair_queue_open:'file de réparation ouverte',
    diagnostic_repair_queue_clear:'file de réparation claire',
    export_risk_resolution_required:'résolution des risques export requise',
    export_risk_ready_with_manual_warnings:'export prêt avec avertissements manuels',
    export_risk_cleared:'risque export clarifié',
    open_required_repair:'réparation requise ouverte',
    failed_export_readiness_check:'échec du contrôle de préparation export',
    export_polish_blocker:'bloqueur de finition export'
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
    qualityV3Score:'الجودة v3',
    completenessScore:'الاكتمال',
    evidenceStrengthScore:'قوة الأدلة', evidenceReliabilityScore:'موثوقية الأدلة', attentionSignalIntegrityScore:'سلامة إشارة الانتباه',
    contradictionCoverageScore:'تغطية التناقضات',
    sourceDiversityScore:'تنوع المصادر',
    actorLayerCoverageScore:'تغطية الفاعلين/الطبقات',
    causalLinkDensityScore:'كثافة الروابط السببية',
    providerSafetyScore:'أمان المزوّد',
    privacySafetyScore:'أمان الخصوصية',
    migrationSafetyScore:'أمان الترحيل',
    publicationReadiness:'جاهزية النشر',
    weakestDimensions:'أضعف الأبعاد',
    fixActions:'خطوات التصحيح',
    templateTitle:'قالب التحليل',
    templateSubtitle:'اختر عدسة التحليل. القوالب تغيّر البرومبتات والتشخيصات فقط، ولا تتجاوز انضباط الأدلة.',
    analysisTemplate:'قالب التحليل',
    applyTemplate:'تطبيق القالب على الخطة',
    exportTemplateProfile:'تصدير ملف القالب',
    templateScore:'ملاءمة القالب',
    templateOutputFocus:'محور الإخراج',
    templateRequiredLayers:'الطبقات المطلوبة',
    templatePromptDirectives:'توجيهات البرومبت',
    statusTemplateApplied:'تم تطبيق قالب التحليل على خطة البحث.',
    statusTemplateExported:'تم تصدير ملف قالب التحليل.'
  });
  Object.assign(COPY.fr, {
    qualityV3Score:'Qualité v3',
    completenessScore:'Complétude',
    evidenceStrengthScore:'Force des preuves', evidenceReliabilityScore:'Fiabilité des preuves', attentionSignalIntegrityScore:'Intégrité du signal attention',
    contradictionCoverageScore:'Couverture contradictions',
    sourceDiversityScore:'Diversité sources',
    actorLayerCoverageScore:'Couverture acteurs/couches',
    causalLinkDensityScore:'Densité causale',
    providerSafetyScore:'Sécurité fournisseur',
    privacySafetyScore:'Sécurité confidentialité',
    migrationSafetyScore:'Sécurité migration',
    publicationReadiness:'Préparation publication',
    weakestDimensions:'Dimensions faibles',
    fixActions:'Actions correctives',
    templateTitle:'Modèle d’analyse',
    templateSubtitle:'Choisissez la lentille analytique. Les modèles changent les prompts et diagnostics, pas la discipline des preuves.',
    analysisTemplate:'Modèle d’analyse',
    applyTemplate:'Appliquer au plan',
    exportTemplateProfile:'Exporter le profil du modèle',
    templateScore:'Adéquation modèle',
    templateOutputFocus:'Focus de sortie',
    templateRequiredLayers:'Couches requises',
    templatePromptDirectives:'Directives prompt',
    statusTemplateApplied:'Modèle d’analyse appliqué au plan de recherche.',
    statusTemplateExported:'Profil du modèle exporté.'
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
    sourcePacketBuilderGuardrail:'ضابط QA للمتصفح: الحزم المولّدة تبقى محلية/يدوية، أزرار النسخ والتصدير تبقى ظاهرة، ورقائق التحذير تلتف دون تمدد أفقي.',
    sourcePacketBuilderQaNoLive:'لا جلب مباشر',
    sourcePacketBuilderQaLocalOnly:'حزمة محلية/يدوية فقط',
    sourcePacketBuilderQaWrap:'الرقائق تلتف على الهاتف',
    sourcePacketBuilderBrowserQaNote:'QA المتصفح: أزرار النسخ والتصدير تبقى قابلة للوصول؛ ملخص الرقائق يلتف؛ هذه معاينة بيانات فقط وليست تحققًا.',
    sourcePacketPackets:'حزم',
    sourcePacketEvidence:'أدلة',
    sourcePacketWarnings:'تحذيرات',
    sourcePacketWeakTraceability:'تتبّع ضعيف',
    sourcePacketAttentionReliabilityRisks:'مخاطر الانتباه/الموثوقية'
  });
  Object.assign(COPY.fr, {
    sourcePacketBuilderGuardrail:'Garde-fou QA navigateur : les paquets générés restent locaux/manuels, les contrôles copier/exporter restent visibles, et les puces d’alerte se replient sans débordement horizontal.',
    sourcePacketBuilderQaNoLive:'Aucun fetch live',
    sourcePacketBuilderQaLocalOnly:'Paquet local/manuel',
    sourcePacketBuilderQaWrap:'Puces repliées mobile',
    sourcePacketBuilderBrowserQaNote:'QA navigateur : copier/exporter restent accessibles ; les puces se replient ; cet aperçu est un méta-résumé, pas une vérification.',
    sourcePacketPackets:'paquets',
    sourcePacketEvidence:'preuves',
    sourcePacketWarnings:'Alertes',
    sourcePacketWeakTraceability:'Traçabilité faible',
    sourcePacketAttentionReliabilityRisks:'Risques attention/fiabilité'
  });


  Object.assign(COPY.en, {
    firstRunGuideEyebrow:'First-run guide',
    firstRunGuideTitle:'Start clean: topic → plan → evidence → quality → export',
    firstRunGuideBody:'A local-only onboarding layer keeps the first session operational without exposing advanced provider, OAuth, backend, or connector internals.',
    startGuidedSetup:'Start guided setup', goToNextStep:'Go to next step', hideGuide:'Hide guide',
    publicDemoReadyEyebrow:'Public demo ready',
    publicDemoReadyTitle:'Show the workflow without exposing unfinished internals',
    publicDemoReadyBody:'Use this build for a clean public walkthrough: manual/private mode stays default, the first-run path is visible, and release notes state what changed and what deliberately did not change.',
    localOnlyDefault:'Local-only default', safeExportBoundary:'Safe export boundary', noLiveProviderBehaviorChange:'No live-provider behavior change', releaseNotesReady:'Release notes ready',
    hostedDemoVerificationEyebrow:'Hosted demo verification', hostedDemoVerificationTitle:'Publish only after browser evidence exists',
    hostedDemoVerificationBody:'Source-to-Brief Operator Control Room is ready for release evidence: it turns the adapter replay coverage matrix into an operator-facing decision surface with replay coverage, coverage gaps, failure reason groups, evidence links, and operator readiness without changing provider execution. Hosted evidence must report 1.4.0-alpha.28 internally while showing  to users. No-network replay insight layer only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, live source fetching, automatic verification, signoff, export lock, cryptographic signature claim, or publication permission is enabled.',
    hostedUrlChecked:'Hosted URL checked', desktopEvidence:'Desktop evidence', mobileEvidence:'Mobile evidence', providerExportEvidence:'Provider/export evidence',
    evidenceReviewGateEyebrow:'Evidence review gate', evidenceReviewGateTitle:'Review screenshots and metadata before publish',
    evidenceReviewGateBody:'Stable release evidence preserves the Evidence Review Queue, publication review gate, Export Pack v3, golden workflow, and privacy guards. Screenshots or ZIP files alone are insufficient for release approval.',
    hostedUrlSmoke:'Hosted URL smoke', noOverflowProof:'No overflow proof', metadataArtifact:'Metadata artifact', reviewedBeforePublish:'Reviewed before publish',
    stableWorkflowEyebrow:'Stable workflow', stableWorkflowTitle:'Next action: add evidence → review clusters → link entities and gaps',
    stableWorkflowBody:'Advanced provider, OAuth, backend, source, and release diagnostics are collapsed until a selected post-freeze lane has criteria, falsifiers, and review gates; implementation remains blocked.',
    analysisTab:'Analysis', evidenceTab:'Evidence', sourcesTab:'Sources', qualityExportTab:'Quality & Export', settingsAdvancedTab:'Settings / Advanced'
  });
  Object.assign(COPY.ar, {
    firstRunGuideEyebrow:'دليل البدء الأول',
    firstRunGuideTitle:'ابدأ من مسار نظيف: الموضوع → الخطة → الأدلة → الجودة → التصدير',
    firstRunGuideBody:'طبقة بدء محلية فقط تُبقي الجلسة الأولى قابلة للتشغيل دون كشف تفاصيل المزوّد المتقدم أو OAuth أو الخلفية أو الموصلات.',
    startGuidedSetup:'ابدأ الإعداد الموجّه', goToNextStep:'انتقل إلى الخطوة التالية', hideGuide:'إخفاء الدليل',
    publicDemoReadyEyebrow:'العرض العام جاهز',
    publicDemoReadyTitle:'اعرض سير العمل دون كشف الأجزاء الداخلية غير المكتملة',
    publicDemoReadyBody:'استخدم هذه النسخة لعرض عام واضح: يبقى النمط اليدوي/الخاص هو الافتراضي، ويظل مسار البدء الأول ظاهرًا، وتوضح ملاحظات الإصدار ما تغيّر وما لم يتغيّر عمدًا.',
    localOnlyDefault:'افتراضي محلي فقط', safeExportBoundary:'حدود تصدير آمنة', noLiveProviderBehaviorChange:'لا تغيير في سلوك المزوّد الحي', releaseNotesReady:'ملاحظات الإصدار جاهزة',
    hostedDemoVerificationEyebrow:'التحقق من العرض المستضاف', hostedDemoVerificationTitle:'لا تنشر إلا بعد توفر أدلة المتصفح',
    hostedDemoVerificationBody:'تفصيل قرار إعادة التشغيل وروابط تتبع الأدلة جاهز لأدلة الإصدار: يضيف تفصيلات من أحكام إعادة التشغيل وفجوات التغطية ومجموعات الخلايا المحجوبة أو التي تحتاج مراجعة إلى روابط fixtures وصفوف السياسة وروابط تتبع الأدلة داخل سطح إعادة التشغيل بلا شبكة ودون تغيير تنفيذ المزوّد. يجب أن تعلن أدلة الاستضافة داخلياً 1.4.0-alpha.28 مع عرض v1.4.0-alpha.28 تفصيل قرار إعادة التشغيل وروابط تتبع الأدلة للمستخدمين. تفصيل بلا شبكة فقط: دون نداءات مزوّد حية، دون طلبات شبكة مخفية، دون OAuth/دورة رموز، دون تخزين بيانات اعتماد، دون جلب مصادر حي، ودون تحقق أو توقيع أو قفل أو نشر آلي.',
    hostedUrlChecked:'تم فحص رابط الاستضافة', desktopEvidence:'دليل سطح المكتب', mobileEvidence:'دليل الهاتف', providerExportEvidence:'دليل المزوّد/التصدير',
    evidenceReviewGateEyebrow:'بوابة مراجعة الأدلة', evidenceReviewGateTitle:'راجع اللقطات والبيانات الوصفية قبل النشر',
    evidenceReviewGateBody:'تحافظ أدلة الإصدار المستقر على صف مراجعة الأدلة، بوابة مراجعة النشر، Export Pack v3، المجموعة الذهبية، وحراس الخصوصية. لا تكفي اللقطات أو ملفات ZIP وحدها لاعتماد الإصدار.',
    hostedUrlSmoke:'اختبار دخان لرابط الاستضافة', noOverflowProof:'إثبات عدم وجود تجاوز أفقي', metadataArtifact:'أثر بيانات وصفية', reviewedBeforePublish:'تمت المراجعة قبل النشر',
    stableWorkflowEyebrow:'سير عمل مستقر', stableWorkflowTitle:'الإجراء التالي: أضف الأدلة → راجع العناقيد → اربط الكيانات والفجوات',
    stableWorkflowBody:'تبقى تشخيصات المزوّد المتقدم وOAuth والخلفية والمصادر والإصدار مطوية حتى يحصل مسار ما بعد التجميد على معايير قبول وشروط إبطال وبوابات مراجعة واضحة؛ ويظل التنفيذ محظورًا.',
    analysisTab:'التحليل', evidenceTab:'الأدلة', sourcesTab:'المصادر', qualityExportTab:'الجودة والتصدير', settingsAdvancedTab:'الإعدادات / المتقدم',
    providerEndpoint:'نقطة النهاية', providerModel:'النموذج', providerApiKey:'مفتاح API', rememberProviderKey:'حفظ المفتاح محليًا على هذا الجهاز', enableLiveByok:'تفعيل استدعاءات المزوّد الحية', providerSafety:'الأمان: يبقى النمط اليدوي/الخاص هو الافتراضي. لا تُصدَّر المفاتيح في الحزم أو التقارير أو سجل التشغيل.', validateProviderSettings:'التحقق من إعدادات المزوّد', dryRunProviderRequest:'بناء طلب تجريبي دون تنفيذ', byokScore:'أمان مفتاحك الخاص', backendProxyScore:'وسيط الخلفية', providerIdentityScore:'هوية المزوّد', statusProviderDryRun:'تم بناء حمولة المزوّد دون استدعاء شبكي حي.', statusProviderSettingsSaved:'تم التحقق من إعدادات المزوّد وحفظها.', statusProviderLiveDisabled:'استدعاءات المزوّد الحية معطّلة؛ تم تسجيل استجابة تجريبية/وهمية.', statusProviderLiveError:'فشل استدعاء المزوّد الحي؛ لم يُخزَّن أي مفتاح في سجل التشغيل.', statusBackendProxyReady:'تم اختيار وسيط الخلفية المستضاف. لا يرسل المتصفح مفتاح المزوّد.'
  });
  Object.assign(COPY.fr, {
    firstRunGuideEyebrow:'Guide de première utilisation',
    firstRunGuideTitle:'Démarrer proprement : sujet → plan → preuves → qualité → export',
    firstRunGuideBody:'Une couche d’onboarding locale maintient la première session opérationnelle sans exposer les détails avancés du fournisseur, d’OAuth, du backend ou des connecteurs.',
    startGuidedSetup:'Démarrer le guidage', goToNextStep:'Passer à l’étape suivante', hideGuide:'Masquer le guide',
    publicDemoReadyEyebrow:'Démo publique prête',
    publicDemoReadyTitle:'Montrer le workflow sans exposer les internes inachevés',
    publicDemoReadyBody:'Utilisez cette version pour une démonstration publique claire : le mode manuel/privé reste par défaut, le parcours de démarrage est visible, et les notes de version indiquent ce qui a changé et ce qui n’a volontairement pas changé.',
    localOnlyDefault:'Défaut local uniquement', safeExportBoundary:'Frontière d’export sûre', noLiveProviderBehaviorChange:'Aucun changement du fournisseur live', releaseNotesReady:'Notes de version prêtes',
    hostedDemoVerificationEyebrow:'Vérification de la démo hébergée', hostedDemoVerificationTitle:'Publier seulement après preuve navigateur',
    hostedDemoVerificationBody:'Drilldown de décision de rejeu + liens de trace preuve est prêt pour les preuves de release : il ajoute des drilldowns depuis les verdicts de rejeu, lacunes de couverture, groupes bloqués/à revoir, liens de fixtures, lignes de politique et liens de trace preuve vers la surface de rejeu sans réseau, sans changer l’exécution fournisseur. Les preuves hébergées doivent annoncer 1.4.0-alpha.28 en interne tout en affichant v1.4.0-alpha.28 Drilldown de décision de rejeu + liens de trace preuve aux utilisateurs. Drilldown sans réseau uniquement : aucun appel fournisseur réel, requête réseau cachée, OAuth/cycle de token, persistance d’identifiants, fetch source live, vérification, visa, verrou d’export ou permission de publication automatique.',
    hostedUrlChecked:'URL hébergée vérifiée', desktopEvidence:'Preuve desktop', mobileEvidence:'Preuve mobile', providerExportEvidence:'Preuve fournisseur/export',
    evidenceReviewGateEyebrow:'Barrière de revue des preuves', evidenceReviewGateTitle:'Revoir captures et métadonnées avant publication',
    evidenceReviewGateBody:'Les preuves de release stable conservent la file de revue des preuves, la revue publication, Export Pack v3, le golden workflow et les garde-fous de confidentialité. Captures ou ZIP seuls sont insuffisants pour approuver la release.',
    hostedUrlSmoke:'Smoke test URL hébergée', noOverflowProof:'Preuve sans débordement', metadataArtifact:'Artefact de métadonnées', reviewedBeforePublish:'Revu avant publication',
    stableWorkflowEyebrow:'Workflow stable', stableWorkflowTitle:'Action suivante : ajouter des preuves → revoir les clusters → lier entités et lacunes',
    stableWorkflowBody:'Les diagnostics fournisseur avancé, OAuth, backend, source et release restent repliés jusqu’à ce qu’un axe post-gel ait critères, falsificateurs et barrières de revue; l’implémentation reste bloquée.',
    analysisTab:'Analyse', evidenceTab:'Preuves', sourcesTab:'Sources', qualityExportTab:'Qualité & Export', settingsAdvancedTab:'Paramètres / Avancé',
    providerEndpoint:'Point de terminaison', providerModel:'Modèle', providerApiKey:'Clé API', rememberProviderKey:'Mémoriser localement sur cet appareil', enableLiveByok:'Activer les appels fournisseur live', providerSafety:'Sécurité : le mode manuel/privé reste par défaut. Les clés ne sont jamais exportées dans les paquets, rapports ou journaux.', validateProviderSettings:'Valider les paramètres fournisseur', dryRunProviderRequest:'Construire une requête à blanc', byokScore:'Sécurité BYOK', backendProxyScore:'Proxy backend', providerIdentityScore:'Identité fournisseur', statusProviderDryRun:'Charge fournisseur construite sans appel réseau live.', statusProviderSettingsSaved:'Paramètres fournisseur validés et enregistrés.', statusProviderLiveDisabled:'Appels fournisseur live désactivés; réponse simulée enregistrée.', statusProviderLiveError:'Échec de l’appel fournisseur live; aucune clé n’a été stockée dans le journal.', statusBackendProxyReady:'Proxy backend hébergé sélectionné. Le navigateur n’envoie aucune clé fournisseur.'
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
      strategic_analysis_engine:{display_name:'Strategic Analysis Engine', description:'Default Interests → Actors → Tools → Narrative → Outcomes → Feedback model with evidence review discipline.', output_focus:['interests','actors','tools','narrative','outcomes','feedback','contradictions','scenarios'], prompt_directives:['Use the full six-layer Jarbou3i model.','Separate observation, inference, and estimate.','Include falsifiable scenario conditions.']},
      geopolitical_event_analysis:{display_name:'Geopolitical Event Analysis', description:'Map power, escalation incentives, external actors, legitimacy claims, and observable event trajectories.'},
      policy_impact_analysis:{display_name:'Policy Impact Analysis', description:'Evaluate beneficiaries, implementation tools, distributional effects, second-order outcomes, and policy feedback.'},
      market_technology_trend_analysis:{display_name:'Market / Technology Trend Analysis', description:'Assess adoption incentives, platform actors, constraints, narratives, market outcomes, and weak signals.'},
      actor_incentive_map:{display_name:'Actor Incentive Map', description:'Prioritize actor incentives, constraints, leverage, coalition logic, and likely adaptation paths.'},
      contradiction_audit:{display_name:'Contradiction Audit', description:'Compare declared narratives against actions, incentives, outcomes, and counter-evidence.'},
      scenario_forecast:{display_name:'Scenario Forecast', description:'Produce competing futures with drivers, signals, probabilities, and falsification conditions.'}
    }
  });
  Object.assign(COPY.ar, {
    projectWorkspaceTitle:'مساحة المشروع', projectWorkspaceSubtitle:'إدارة مشاريع بحثية محلية فقط داخل هذا المتصفح.', projectName:'اسم المشروع', saveProject:'حفظ المشروع محليًا', duplicateProject:'نسخ المشروع', exportProject:'تصدير المشروع', importProject:'استيراد مشروع', deleteProject:'حذف المشروع النشط',
    providerTitle:'نظام المزوّد', providerSubtitle:'عقود طلب جاهزة للمزوّد مع وضع وهمي وBYOK ووسيط خلفية وحساب محمول تجريبي. الاستدعاءات الحية تتطلب موافقة صريحة.', providerName:'المزوّد', providerTask:'المهمة', taskPlan:'خطة بحث', taskSynthesis:'توليف استراتيجي', taskRepair:'إصلاح JSON', taskCritique:'نقد', taskSourceDiscipline:'انضباط المصادر', runProviderTask:'تشغيل مهمة المزوّد', previewProviderContract:'معاينة العقد', previewProviderPrompt:'معاينة البرومبت', runProviderFixtureSuite:'تشغيل اختبارات العقود', exportProviderDiagnostics:'تصدير التشخيصات', copyProviderPayload:'نسخ حمولة المزوّد', exportRunLedger:'تصدير سجل التشغيل', clearRunLedger:'مسح سجل التشغيل',
    portableTitle:'حساب محمول تجريبي', portableSubtitle:'محاكاة ربط حساب OAuth/PKCE دون رموز حقيقية أو اعتماد على مزوّد خارجي.', connectPortable:'ربط حساب محمول وهمي', refreshPortable:'تحديث الرمز الوهمي', disconnectPortable:'فصل الحساب المحمول', exportPortableStatus:'تصدير حالة الحساب المحمول',
    sourcePlanningTitle:'طبقة تخطيط المصادر', sourcePlanningSubtitle:'خطّط لبحث مدعوم بالمصادر مستقبلًا دون زحف حي أو ادعاءات تحقق آلي.', sourceConnector:'الموصل', sourceTask:'مهمة المصدر', sourceTaskPlan:'خطة مصادر', sourceTaskQuery:'خطة استعلام', sourceTaskClaim:'استخراج الادعاءات', sourceTaskScoring:'تقييم الأدلة', sourceTaskCluster:'خطة تجميع', sourcePolicyNote:'تخطيط فقط: لا زحف، لا بحث حي، ولا ادعاء تحقق من المصادر.', buildSourceTask:'بناء مهمة مصدر', copySourceRequest:'نسخ طلب المصدر', runSourceFixtureSuite:'تشغيل اختبارات المصدر', exportSourcePolicy:'تصدير سياسة المصدر',
    sourceImportTitle:'محوّل استيراد المصادر', sourceImportSubtitle:'الصق مخرجات بحث خارجي أو JSON حزمة مصادر يدوية وحوّلها إلى مرشحات قابلة للمراجعة داخل مصفوفة الأدلة.', sourceImportFormat:'صيغة الاستيراد', formatAuto:'كشف تلقائي', sourceImportText:'مخرجات المصدر', sourceImportPolicyNote:'الاستيراد يدوي فقط: يستخرج مرشحات أدلة لكنه لا يتحقق ولا يجلب ولا يكشط المصادر.', previewSourceImport:'معاينة الاستيراد', exportSourceImportReport:'تصدير تقرير الاستيراد', clearSourceImport:'مسح الاستيراد',
    sourcePacketTemplateLabel:'قالب الحزمة', buildSourcePacketFromTemplate:'بناء من القالب المحدد',
    showCommandCenter:'إظهار مركز القيادة', hideCommandCenter:'إخفاء مركز القيادة', showEngineMap:'إظهار خريطة المحرك', hideEngineMap:'إخفاء خريطة المحرك',
    nextActionTitle:'الخطوة التالية', startTitle:'ابدأ', firstRunComplete:'اكتمل مسار البدء الأول', goToPrefix:'انتقل إلى', doneState:'تم', nextState:'التالي', inProgressState:'قيد التنفيذ', firstRunSuccessState:'نجاح البدء الأول', notStartedState:'لم يبدأ',
    nextActionGeneratePlan:'ولّد خطة البحث.', nextActionReviewQueue:'راجع مرشحات المصادر المعلّقة قبل دخولها إلى مصفوفة الأدلة.', nextActionAddEvidence:'أضف دليلًا يدويًا، أو استورد مرشحات مصادر، أو حمّل أدلة تجريبية.', nextActionCompileBrief:'جمّع موجز التحليل، ثم افحص الجودة والتصدير.', nextActionExportPack:'افتح الجودة والتصدير وأنشئ حزمة Export Pack v2 عندما تكون الخصوصية آمنة.', nextActionDefault:'ولّد خطة بحث، ثم أضف أدلة وتحقق من جاهزية التصدير.', firstRunStartedStatus:'بدأ دليل التشغيل الأول. ولّد خطة البحث كخطوة تالية.',
    onboardingTopic:'تحديد الموضوع', onboardingPlan:'توليد خطة البحث', onboardingEvidence:'إضافة أو استيراد الأدلة', onboardingReview:'ضبط صف المراجعة', onboardingQuality:'فحص بوابة الجودة', onboardingExport:'تصدير آمن',
    metricPlan:'الخطة', metricEvidence:'الأدلة', metricReview:'المراجعة', metricQuality:'الجودة', metricExport:'التصدير', metricReady:'جاهزة', metricMissing:'ناقص', metricPending:'معلّق', metricClear:'صافٍ', metricBlocked:'محظور', metricSafe:'آمن',
    noPlanBody:'ولّد خطة لإنشاء أسئلة البحث، أهداف المصادر، وأهداف الأدلة المضادة.', matrixEmptyBody:'أضف أدلة يدويًا، حمّل أدلة تجريبية، أو استورد مرشحات مصادر عبر صف المراجعة.',
    questionsTitle:'أسئلة البحث', targetSourcesTitle:'المصادر المستهدفة', earlyWarningTitle:'مؤشرات الإنذار المبكر', reliability:'الموثوقية', attention:'الانتباه', flags:'أعلام',
    templateCoverageComplete:'تغطية طبقات القالب مكتملة حاليًا.', missingTemplateLayers:'طبقات القالب الناقصة',
    critiqueNextActions:'الإجراءات التالية', critiqueSummaryUsable:'حزمة البحث قابلة للاستخدام أوليًا، لكن التحقق من المصادر يبقى خارج نطاق هذه النسخة التجريبية.', critiqueSummaryWeak:'سير العمل لا يزال ضعيف الأدلة أو الروابط ولا يصلح للنشر.', critiqueEvidenceVolumeOk:'حجم الأدلة مقبول للتوليف التجريبي.', critiqueEvidenceVolumeWeak:'أضف خمسة عناصر أدلة على الأقل قبل التعامل مع التحليل بجدية.', critiqueSourceTraceabilityOk:'يوجد تتبع مصدري، لكنه ما زال يحتاج تحققًا يدويًا.', critiqueSourceTraceabilityWeak:'المخرجات القوية تحتاج روابط وتواريخ مصادر؛ وإلا تبقى الادعاءات ضعيفة التتبع.', critiqueSourceDiversityOk:'الأدلة غير محصورة في نوع واحد أو نوعين من المصادر.', critiqueSourceDiversityWeak:'الأدلة متركزة أكثر من اللازم في نوع واحد أو نوعين من المصادر.', critiqueCounterEvidenceOk:'يوجد عنصر دليل واحد على الأقل يتضمن روابط تناقض.', critiqueCounterEvidenceWeak:'لا يوجد دليل واضح يناقض ادعاءً أو طبقة من النموذج.', critiqueCausalRiskOk:'توجد روابط سببية، لكن يجب التحقق يدويًا من كل علاقة.', critiqueCausalRiskWeak:'الرسم السببي ضعيف جدًا للتوليف بثقة.', critiquePublicationRisk:'المخرج الوهمي في ألفا مفيد لاختبار البنية، وليس للنشر النهائي.', critiqueActionEvidence:'أضف خمسة عناصر أدلة على الأقل من أنواع مصادر متنوعة.', critiqueActionSources:'أدرج تواريخ وروابط المصادر للادعاءات المبنية على مصادر.', critiqueActionCounter:'أضف أدلة مضادة قبل التوليف الاستراتيجي النهائي.', critiqueActionCausal:'استخدم الروابط السببية لربط الأدلة بالمصالح والفاعلين والأدوات والسردية والنتائج والتغذية الراجعة.', critiqueActionFalsifiers:'اختبر ما إذا كانت السيناريوهات تُبطَل بمؤشرات مخالفة.',
    critiqueTypeEvidenceVolume:'حجم الأدلة', critiqueTypeSourceTraceability:'تتبع المصادر', critiqueTypeSourceDiversity:'تنوع المصادر', critiqueTypeCounterEvidenceGap:'فجوة الأدلة المضادة', critiqueTypeCausalRisk:'مخاطر السببية', critiqueTypePublicationRisk:'مخاطر النشر', severityLow:'منخفض', severityMedium:'متوسط', severityHigh:'مرتفع',
    templateProfiles:{
      strategic_analysis_engine:{display_name:'محرك التحليل الاستراتيجي', description:'نموذج المصالح → الفاعلون → الأدوات → السردية → النتائج → التغذية الراجعة مع انضباط مراجعة الأدلة.', output_focus:['المصالح','الفاعلون','الأدوات','السردية','النتائج','التغذية الراجعة','التناقضات','السيناريوهات'], prompt_directives:['استخدم نموذج جربوعي ذي الطبقات الست كاملًا.','افصل بين الملاحظة والاستنتاج والتقدير.','أدرج شروطًا واضحة لإبطال السيناريوهات.']},
      geopolitical_event_analysis:{display_name:'تحليل حدث جيوسياسي', description:'يرسم القوة، حوافز التصعيد، الفاعلين الخارجيين، ادعاءات الشرعية، ومسارات الحدث القابلة للملاحظة.'},
      policy_impact_analysis:{display_name:'تحليل أثر السياسات', description:'يقيم المستفيدين، أدوات التنفيذ، آثار التوزيع، نتائج الدرجة الثانية، وحلقات التغذية الراجعة للسياسة.'},
      market_technology_trend_analysis:{display_name:'تحليل سوق/تكنولوجيا', description:'يفحص حوافز التبني، فاعلي المنصات، القيود، السرديات، نتائج السوق، والإشارات الضعيفة.'},
      actor_incentive_map:{display_name:'خريطة حوافز الفاعلين', description:'يركز على حوافز الفاعلين، القيود، النفوذ، منطق التحالفات، ومسارات التكيف المحتملة.'},
      contradiction_audit:{display_name:'تدقيق التناقضات', description:'يقارن السرديات المعلنة بالأفعال والحوافز والنتائج والأدلة المضادة.'},
      scenario_forecast:{display_name:'توقع السيناريوهات', description:'ينتج مستقبلات متنافسة بمحركات وإشارات واحتمالات وشروط إبطال.'}
    }
  });
  Object.assign(COPY.fr, {
    projectWorkspaceTitle:'Espace projet', projectWorkspaceSubtitle:'Gérer des projets de recherche nommés, locaux uniquement, dans ce navigateur.', projectName:'Nom du projet', saveProject:'Enregistrer localement', duplicateProject:'Dupliquer le projet', exportProject:'Exporter le projet', importProject:'Importer un projet', deleteProject:'Supprimer le projet actif', exportPackV2:'Exporter Pack v2',
    providerTitle:'Harnais fournisseur', providerRouterTitle:'Routeur fournisseur', suitability:'Adéquation', cost:'Coût', dryRun:'Dry-run', providerSubtitle:'Contrats de requête prêts pour fournisseur avec modes simulé, BYOK, proxy backend hébergé et compte portable de test. Les appels live exigent une activation explicite.', providerName:'Fournisseur', providerTask:'Tâche', taskPlan:'Plan de recherche', taskSynthesis:'Synthèse stratégique', taskRepair:'Réparation JSON', taskCritique:'Critique', taskSourceDiscipline:'Discipline des sources', runProviderTask:'Exécuter la tâche fournisseur', previewProviderContract:'Prévisualiser le contrat', previewProviderPrompt:'Prévisualiser le prompt', runProviderFixtureSuite:'Lancer les tests de contrat', exportProviderDiagnostics:'Exporter les diagnostics', copyProviderPayload:'Copier la charge fournisseur', exportRunLedger:'Exporter le journal d’exécution', clearRunLedger:'Effacer le journal d’exécution',
    portableTitle:'Compte portable simulé', portableSubtitle:'Simuler une liaison OAuth/PKCE sans jetons réels ni dépendance fournisseur.', connectPortable:'Connecter un compte portable simulé', refreshPortable:'Rafraîchir le jeton simulé', disconnectPortable:'Déconnecter le compte portable', exportPortableStatus:'Exporter l’état du compte portable',
    sourcePlanningTitle:'Couche de planification des sources', sourcePlanningSubtitle:'Planifier une recherche assistée par sources sans crawling live ni revendication de vérification.', sourceConnector:'Connecteur', sourceTask:'Tâche source', sourceTaskPlan:'Plan source', sourceTaskQuery:'Plan de requêtes', sourceTaskClaim:'Extraction d’énoncés', sourceTaskScoring:'Scoring des preuves', sourceTaskCluster:'Plan de regroupement', sourcePolicyNote:'Planification uniquement : pas de scraping, pas de recherche live, pas de revendication de vérification.', buildSourceTask:'Construire la tâche source', copySourceRequest:'Copier la demande source', runSourceFixtureSuite:'Lancer les tests source', exportSourcePolicy:'Exporter la politique source',
    sourceImportTitle:'Adaptateur d’import de sources', sourceImportSubtitle:'Coller des sorties de recherche externe ou un paquet source JSON manuel et les convertir en candidats révisables pour la matrice des preuves.', sourceImportFormat:'Format d’import', formatAuto:'Détection automatique', sourceImportText:'Sortie source', sourceImportPolicyNote:'Import manuel uniquement : extrait des candidats de preuve, sans vérifier, récupérer ni scraper les sources.', previewSourceImport:'Prévisualiser l’import', exportSourceImportReport:'Exporter le rapport d’import', clearSourceImport:'Effacer l’import',
    sourcePacketTemplateLabel:'Préréglage de modèle', buildSourcePacketFromTemplate:'Construire depuis le préréglage',
    showCommandCenter:'Afficher le centre de commande', hideCommandCenter:'Masquer le centre de commande', showEngineMap:'Afficher la carte du moteur', hideEngineMap:'Masquer la carte du moteur',
    nextActionTitle:'Action suivante', startTitle:'Démarrer', firstRunComplete:'Parcours de première utilisation terminé', goToPrefix:'Aller à', doneState:'terminé', nextState:'suivant', inProgressState:'en cours', firstRunSuccessState:'première utilisation réussie', notStartedState:'non démarré',
    nextActionGeneratePlan:'Générez le plan de recherche.', nextActionReviewQueue:'Examinez les candidats source en attente avant leur entrée dans la matrice des preuves.', nextActionAddEvidence:'Ajoutez une preuve manuellement, importez des candidats source ou chargez des preuves de démo.', nextActionCompileBrief:'Compilez le brief d’analyse, puis inspectez Qualité & Export.', nextActionExportPack:'Ouvrez Qualité & Export et produisez Export Pack v2 lorsque la confidentialité est sûre.', nextActionDefault:'Générez un plan de recherche, puis ajoutez des preuves et validez la préparation à l’export.', firstRunStartedStatus:'Guide de première utilisation lancé. Générez ensuite le plan de recherche.',
    onboardingTopic:'Définir le sujet', onboardingPlan:'Générer le plan de recherche', onboardingEvidence:'Ajouter ou importer des preuves', onboardingReview:'Discipline de file de revue', onboardingQuality:'Vérifier la barrière qualité', onboardingExport:'Exporter en sécurité',
    metricPlan:'Plan', metricEvidence:'Preuves', metricReview:'Revue', metricQuality:'Qualité', metricExport:'Export', metricReady:'prêt', metricMissing:'manquant', metricPending:'en attente', metricClear:'clair', metricBlocked:'bloqué', metricSafe:'sûr',
    noPlanBody:'Générez un plan pour créer questions, sources cibles et contre-preuves cibles.', matrixEmptyBody:'Ajoutez des preuves manuellement, chargez des preuves de démo ou importez des candidats source via la file de revue.',
    questionsTitle:'Questions', targetSourcesTitle:'Sources cibles', earlyWarningTitle:'Signaux précoces', reliability:'Fiabilité', attention:'Attention', flags:'alertes',
    templateCoverageComplete:'La couverture des couches du modèle est actuellement complète.', missingTemplateLayers:'Couches de modèle manquantes',
    critiqueNextActions:'Actions suivantes', critiqueSummaryUsable:'Le workflow dispose d’un paquet de recherche utilisable, mais la vérification des sources reste hors périmètre de cette alpha.', critiqueSummaryWeak:'Le workflow reste insuffisamment sourcé ou relié et ne doit pas être publié.', critiqueEvidenceVolumeOk:'Le volume de preuves est acceptable pour une synthèse alpha.', critiqueEvidenceVolumeWeak:'Ajoutez au moins cinq preuves avant de traiter l’analyse comme sérieuse.', critiqueSourceTraceabilityOk:'La traçabilité des sources existe, mais elle exige encore une validation manuelle.', critiqueSourceTraceabilityWeak:'Des sorties solides exigent URL et dates de sources ; sinon les énoncés restent faiblement traçables.', critiqueSourceDiversityOk:'Les preuves ne sont pas concentrées dans un ou deux types de sources.', critiqueSourceDiversityWeak:'Les preuves sont trop concentrées dans un ou deux types de sources.', critiqueCounterEvidenceOk:'Au moins une preuve contient des liens de contradiction.', critiqueCounterEvidenceWeak:'Aucune preuve ne contredit clairement un énoncé ou une couche.', critiqueCausalRiskOk:'Des liens causaux existent ; validez encore chaque relation manuellement.', critiqueCausalRiskWeak:'Le graphe causal est trop pauvre pour une synthèse fiable.', critiquePublicationRisk:'La sortie simulée alpha sert aux tests d’architecture, pas à une publication finale.', critiqueActionEvidence:'Ajoutez au moins cinq preuves issues de types de sources divers.', critiqueActionSources:'Incluez dates et URL de sources pour les énoncés fondés sur des sources.', critiqueActionCounter:'Ajoutez des contre-preuves avant toute synthèse stratégique finale.', critiqueActionCausal:'Utilisez les liens causaux pour relier preuves, intérêts, acteurs, outils, narratif, résultats et rétroaction.', critiqueActionFalsifiers:'Testez si les scénarios sont réfutés par des indicateurs contraires.',
    critiqueTypeEvidenceVolume:'Volume de preuves', critiqueTypeSourceTraceability:'Traçabilité des sources', critiqueTypeSourceDiversity:'Diversité des sources', critiqueTypeCounterEvidenceGap:'Écart de contre-preuves', critiqueTypeCausalRisk:'Risque causal', critiqueTypePublicationRisk:'Risque de publication', severityLow:'faible', severityMedium:'moyen', severityHigh:'élevé',
    templateProfiles:{
      strategic_analysis_engine:{display_name:'Moteur d’analyse stratégique', description:'Modèle Intérêts → Acteurs → Outils → Narratif → Résultats → Rétroaction avec discipline de revue des preuves.', output_focus:['intérêts','acteurs','outils','narratif','résultats','rétroaction','contradictions','scénarios'], prompt_directives:['Utiliser le modèle Jarbou3i complet à six couches.','Séparer observation, inférence et estimation.','Inclure des conditions de scénario falsifiables.']},
      geopolitical_event_analysis:{display_name:'Analyse d’événement géopolitique', description:'Cartographier pouvoir, incitations à l’escalade, acteurs externes, revendications de légitimité et trajectoires observables.'},
      policy_impact_analysis:{display_name:'Analyse d’impact de politique', description:'Évaluer bénéficiaires, outils de mise en œuvre, effets distributifs, résultats de second ordre et rétroactions.'},
      market_technology_trend_analysis:{display_name:'Analyse marché/technologie', description:'Évaluer incitations d’adoption, acteurs de plateforme, contraintes, narratifs, résultats de marché et signaux faibles.'},
      actor_incentive_map:{display_name:'Carte des incitations d’acteurs', description:'Prioriser incitations, contraintes, leviers, logique de coalition et trajectoires d’adaptation probables.'},
      contradiction_audit:{display_name:'Audit des contradictions', description:'Comparer les narratifs déclarés aux actions, incitations, résultats et contre-preuves.'},
      scenario_forecast:{display_name:'Prévision par scénarios', description:'Produire des futurs concurrents avec moteurs, signaux, probabilités et conditions de réfutation.'}
    }
  });



  Object.assign(COPY.en, {
    analysisReleaseNote:'1.4.0-alpha.28 converts evidence-budget regression results into pass, warn, fail, and review-required operator actions without network calls.',
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
    analysisReleaseNote:'يحوّل 1.4.0-alpha.28 نتائج انحدار ميزانية الأدلة إلى نجاح وتحذير وفشل ومراجعة مطلوبة مع إجراءات المشغّل دون نداءات شبكة.',
    oauthAuthorizationEndpoint:'نقطة تفويض OAuth', oauthTokenEndpoint:'نقطة رمز OAuth', oauthClientId:'معرّف عميل OAuth', oauthRedirectUri:'رابط إعادة توجيه OAuth', oauthScopes:'صلاحيات OAuth', oauthCallbackUrl:'رابط عودة OAuth', oauthCallbackPlaceholder:'الصق رابط العودة الذي يحتوي على ?code=...&state=...', buildPortableOAuthUrl:'بناء رابط OAuth/PKCE', completePortableOAuthCallback:'إكمال عودة OAuth', disconnectPortableOAuthSpike:'فصل تجربة OAuth',
    yes:'نعم', no:'لا', unknown:'غير معروف', none:'لا يوجد', required:'مطلوب', chars:'حرف', truncatedPreview:'معاينة مختصرة', providerPromptMissing:'لا توجد معاينة برومبت بعد.', providerPromptMissingHint:'استخدم المعاينة أو الطلب التجريبي.', providerRunEmptyHint:'استخدم طلبًا تجريبيًا أو تنفيذ مزوّد وهميًا لإنشاء سجل تشغيل قابل للتدقيق.',
    runLedgerEmpty:'لا توجد عمليات مزوّد بعد.',
    sourceTypesEmpty:'لا توجد أنواع مصادر', convertedLabel:'محوّلة', rejectedLabel:'مرفوضة',
    policyPrioritizationGuard:'الأرقام تشرح ترتيب الأولويات لا الحقيقة.',
    run:'التشغيل', status:'الحالة', validation:'التحقق', output:'المخرج', keyExported:'تصدير المفتاح', auth:'المصادقة', billing:'الفوترة', token:'الرمز', mock:'وهمي', oauth:'OAuth', passed:'ناجح', fails:'فشل', accepted:'مقبول', issues:'مشكلات', live:'حي', verified:'متحقق', presets:'قوالب', blockers:'عوائق', gaps:'فجوات', migrationReportExported:'تم تصدير تقرير الهجرة',
    sourceRequestTitle:'طلب المصادر', sourcePolicyTitle:'سياسة المصادر', latestSourceResultTitle:'آخر نتيجة مصدرية', webSearchAbstractionTitle:'تجريد بحث الويب', questions:'أسئلة', sourceTargets:'أهداف مصادر', keywords:'كلمات مفتاحية', evidenceWord:'دليل', sourceTypes:'أنواع مصادر', candidates:'مرشحات', queued:'في الصف', queries:'استعلامات', noSourceWarnings:'لا توجد تحذيرات مصدرية',
    qualityScoringTitle:'معايرة ترجيح الأدلة', reliabilityLabel:'الموثوقية', attentionLabel:'الانتباه', traceabilityLabel:'التتبّع', calibrationWarnings:'تحذيرات المعايرة', evidenceScoringPolicyNote:'الانتباه يعني الظهور العام فقط. الموثوقية تقيس قوة المصدر والتتبّع والتحديد والثقة والحداثة. وزن التوليف أداة ترتيب أولويات لا حكم حقيقة.', guardLabel:'الحارس',
    qualityFixEvidence:'أضف أدلة قابلة للتتبع مع روابط وتواريخ وأنواع مصادر وقيم أقوى لقوة الدليل.', qualityFixContradiction:'أضف أدلة مضادة وادعاءات مرتبطة بالتناقض قبل اعتبار التحليل متينًا.', qualityFixDiversity:'نوّع أنواع المصادر ولا تعتمد على فئة إعلامية أو إشارية واحدة.', qualityFixReliability:'ارفع موثوقية الأدلة بتفضيل المصادر الرسمية أو الأولية أو الأكاديمية أو الموثقة جيدًا بدل إشارات الانتباه وحدها.', qualityFixAttention:'افصل الانتباه العام عن قيمة الحقيقة؛ العناصر الاجتماعية عالية التفاعل تحتاج تثبيتًا مستقلًا قبل زيادة وزنها في التوليف.', qualityFixCausal:'أضف روابط سببية مدعومة بالأدلة عبر المصالح والفاعلين والأدوات والسردية والنتائج والتغذية الراجعة.', qualityFixProvider:'شغّل التحقق التجريبي للمزوّد وتأكد أن المفتاح لا يظهر في الحزم أو التقارير أو سجل التشغيل.', qualityFixPrivacy:'شغّل تدقيق تصدير الخصوصية وحل كل مشكلات ما بعد التنقيح قبل المشاركة.', qualityFixMigration:'أعد الاستيراد عبر طبقة الهجرة وتأكد أن packet_migration_report.import_safe يساوي true.', qualityFixProceed:'انتقل إلى مراجعة النشر: تحقق يدويًا من المصادر واتجاه السببية وشروط إبطال السيناريوهات.',
    statusLabels:{review_required:'تحتاج مراجعة', template_presets_ready:'القوالب جاهزة', draft_only:'مسودة فقط', blocked:'محظور', pass:'ناجح', publication_candidate:'مرشح للنشر', research_ready:'جاهز بحثيًا', reviewable_draft:'مسودة قابلة للمراجعة', synthesis_ready:'جاهز للتوليف', provider_ready:'المزوّد جاهز', empty:'فارغ', review_resolved:'المراجعة محلولة', high:'عالٍ', medium:'متوسط', low:'منخفض', scores_explain_prioritization_not_truth:'الأرقام تشرح ترتيب الأولويات لا الحقيقة.'},
    dimensionLabels:{completeness:'الاكتمال', evidence_strength:'قوة الأدلة', evidence_reliability:'موثوقية الأدلة', attention_signal_integrity:'سلامة إشارات الانتباه', contradiction_coverage:'تغطية التناقضات', source_diversity:'تنوع المصادر', actor_layer_coverage:'تغطية طبقات الفاعلين', causal_link_density:'كثافة الروابط السببية', provider_safety:'أمان المزوّد', privacy_safety:'أمان الخصوصية', migration_safety:'سلامة الهجرة', template_fit:'ملاءمة القالب'},
    bandLabels:{very_strong:'قوي جدًا', strong:'قوي', moderate:'متوسط', low:'منخفض'},
    layerLabels:{interests:'المصالح', actors:'الفاعلون', tools:'الأدوات', narrative:'السردية', outcomes:'المخرجات', results:'النتائج', feedback:'التغذية الراجعة', contradictions:'التناقضات', scenarios:'السيناريوهات'}
  });
  Object.assign(COPY.fr, {
    analysisReleaseNote:'1.4.0-alpha.28 convertit les résultats de régression du budget preuves en actions opérateur pass, warn, fail et revue requise sans appels réseau.',
    oauthAuthorizationEndpoint:'Endpoint d’autorisation OAuth', oauthTokenEndpoint:'Endpoint de jeton OAuth', oauthClientId:'ID client OAuth', oauthRedirectUri:'URI de redirection OAuth', oauthScopes:'Scopes OAuth', oauthCallbackUrl:'URL de retour OAuth', oauthCallbackPlaceholder:'Collez l’URL de retour avec ?code=...&state=...', buildPortableOAuthUrl:'Construire l’URL OAuth/PKCE', completePortableOAuthCallback:'Finaliser le retour OAuth', disconnectPortableOAuthSpike:'Déconnecter l’essai OAuth',
    yes:'oui', no:'non', unknown:'inconnu', none:'aucun', required:'requis', chars:'caractères', truncatedPreview:'aperçu tronqué', providerPromptMissing:'Aucun aperçu de prompt.', providerPromptMissingHint:'Utilisez l’aperçu ou le dry-run.', providerRunEmptyHint:'Utilisez un dry-run ou une exécution fournisseur simulée pour créer des runs auditables.',
    runLedgerEmpty:'Aucune exécution fournisseur pour l’instant.',
    sourceTypesEmpty:'aucun type de source', convertedLabel:'convertis', rejectedLabel:'rejetés',
    policyPrioritizationGuard:'Les scores expliquent la priorisation, pas la vérité.',
    run:'Run', status:'Statut', validation:'Validation', output:'Sortie', keyExported:'clé exportée', auth:'auth', billing:'facturation', token:'jeton', mock:'simulé', oauth:'OAuth', passed:'réussis', fails:'échecs', accepted:'accepté', issues:'problèmes', live:'live', verified:'vérifié', presets:'préréglages', blockers:'blocages', gaps:'lacunes', migrationReportExported:'rapport de migration exporté',
    sourceRequestTitle:'Requête source', sourcePolicyTitle:'Politique sources', latestSourceResultTitle:'Dernier résultat source', webSearchAbstractionTitle:'Abstraction recherche web', questions:'questions', sourceTargets:'cibles sources', keywords:'mots-clés', evidenceWord:'preuve', sourceTypes:'types de sources', candidates:'candidats', queued:'en file', queries:'requêtes', noSourceWarnings:'aucune alerte source',
    qualityScoringTitle:'Calibration du score des preuves', reliabilityLabel:'fiabilité', attentionLabel:'attention', traceabilityLabel:'traçabilité', calibrationWarnings:'alertes de calibration', evidenceScoringPolicyNote:'L’attention indique seulement la visibilité publique. La fiabilité mesure la force de la source, la traçabilité, la spécificité, la confiance et la récence. Le poids de synthèse aide à prioriser, pas à établir la vérité.', guardLabel:'Garde-fou',
    qualityFixEvidence:'Ajoutez des preuves traçables avec URLs, dates, types de sources et valeurs evidence_strength plus fortes.', qualityFixContradiction:'Ajoutez des contre-preuves et des énoncés liés aux contradictions avant de traiter l’analyse comme robuste.', qualityFixDiversity:'Diversifiez les types de sources ; évitez de dépendre d’une seule classe média ou signal.', qualityFixReliability:'Améliorez la fiabilité des preuves : privilégiez les sources officielles, primaires, académiques ou bien documentées plutôt que les seuls signaux d’attention.', qualityFixAttention:'Séparez l’attention publique de la valeur de vérité ; les items sociaux très engagés exigent une corroboration indépendante avant de peser davantage dans la synthèse.', qualityFixCausal:'Ajoutez des liens causaux appuyés par preuves entre intérêts, acteurs, outils, narratif, résultats et rétroaction.', qualityFixProvider:'Exécutez la validation fournisseur à blanc et confirmez qu’aucune clé n’apparaît dans les paquets, rapports ou journaux.', qualityFixPrivacy:'Lancez l’audit d’export confidentialité et résolvez tous les problèmes post-rédaction avant partage.', qualityFixMigration:'Réimportez via la couche migration et confirmez que packet_migration_report.import_safe vaut true.', qualityFixProceed:'Passez à la revue de publication : vérifiez manuellement les sources, la direction causale et les falsificateurs de scénarios.',
    statusLabels:{review_required:'revue requise', template_presets_ready:'préréglages prêts', draft_only:'brouillon seulement', blocked:'bloqué', pass:'validé', publication_candidate:'candidat publication', research_ready:'prêt recherche', reviewable_draft:'brouillon révisable', synthesis_ready:'prêt synthèse', provider_ready:'fournisseur prêt', empty:'vide', review_resolved:'revue résolue', high:'élevé', medium:'moyen', low:'faible', scores_explain_prioritization_not_truth:'Les scores expliquent la priorisation, pas la vérité.'},
    dimensionLabels:{completeness:'complétude', evidence_strength:'force des preuves', evidence_reliability:'fiabilité des preuves', attention_signal_integrity:'intégrité du signal attention', contradiction_coverage:'couverture des contradictions', source_diversity:'diversité des sources', actor_layer_coverage:'couverture des acteurs', causal_link_density:'densité des liens causaux', provider_safety:'sécurité fournisseur', privacy_safety:'sécurité confidentialité', migration_safety:'sécurité migration', template_fit:'adéquation modèle'},
    bandLabels:{very_strong:'très fort', strong:'fort', moderate:'modéré', low:'faible'},
    layerLabels:{interests:'intérêts', actors:'acteurs', tools:'outils', narrative:'narratif', outcomes:'résultats', results:'résultats', feedback:'rétroaction', contradictions:'contradictions', scenarios:'scénarios'}
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
    advancedDetailsCollapsed:'Advanced details collapsed — open only when configuring this subsystem.',
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
    unspecifiedTopic:'موضوع تحليل استراتيجي غير محدد',
    contextNotSpecified:'السياق غير محدد',
    analysisBriefEmptyBody:'أكمل الملخّص بعد أن تصبح الخطة ومصفوفة الأدلة جاهزتين.',
    sourceImportReviewEmptyBody:'تظهر واردات المصادر هنا أولًا. راجع المرشحات قبل ترقيتها إلى مصفوفة الأدلة.',
    untitledResearchProject:'مشروع بحث غير مسمّى',
    projectSavedLocally:'تم حفظ المشروع محليًا.',
    projectLoadedLocally:'تم تحميل المشروع من مساحة العمل المحلية.',
    projectDuplicatedLocally:'تم تكرار المشروع محليًا.',
    noProjectToDuplicate:'لا يوجد مشروع لتكراره.',
    noActiveProjectToDelete:'لا يوجد مشروع نشط لحذفه.',
    deleteActiveLocalProject:'هل تريد حذف المشروع المحلي النشط؟',
    localProjectDeleted:'تم حذف المشروع المحلي.',
    noLocalProjectDeleted:'لم يتم حذف أي مشروع محلي.',
    projectExportGenerated:'تم إنشاء تصدير المشروع.',
    workspaceLocalOnly:'محلي فقط',
    workspaceProjects:'مشاريع',
    workspaceBytes:'بايت',
    workspaceStorageAvailable:'التخزين متاح',
    workspaceStorageUnavailable:'التخزين غير متاح',
    workspaceProject:'المشروع',
    workspaceVersion:'الإصدار',
    workspaceUpdated:'آخر تحديث',
    workspaceAction:'الإجراء',
    workspaceLoad:'تحميل',
    workspaceEmpty:'لا توجد مشاريع محلية محفوظة بعد.',
    workspaceWarning:'تُحفظ المشاريع داخل localStorage في هذا المتصفح فقط.',
    evidenceScoringCalibrationShort:'الانتباه يعني الظهور العام فقط. وزن التوليف أداة ترتيب أولويات لا حكم حقيقة.',
    advancedDetailsCollapsed:'التفاصيل المتقدمة مطوية — افتحها فقط عند إعداد هذا الجزء.',
    show:'إظهار', hide:'إخفاء',
    sourceTemplateOfficialReport:'تقرير رسمي / وثيقة مؤسسية',
    sourceTemplateRedditThread:'نقاش Reddit / حوار عام',
    sourceTemplateYoutubeTranscript:'فيديو YouTube / نص تفريغ',
    sourceTemplateMarketSignal:'سوق توقعات / إشارة سوقية',
    sourceTemplateGithubRelease:'إصدار GitHub / إشارة مستودع',
    sourceTemplateGenericArticle:'مقال عام / مصدر ويب',
    sourcePacketTemplatePresetAria:'قالب حزمة المصادر',
    providerModeGuideTitle:'دليل أنماط المزوّد', providerModeColumnMode:'النمط', providerModeColumnAuth:'المصادقة', providerModeColumnBilling:'الفوترة', providerModeColumnPrivacy:'الخصوصية', providerModeColumnStatus:'الحالة',
    providerModeMockName:'مزوّد وهمي', providerModeMockAuth:'لا شيء', providerModeMockBilling:'لا شيء', providerModeMockPrivacy:'محلي / حتمي', providerModeMockStatus:'افتراضي آمن',
    providerModeByokName:'متوافق مع OpenAI عبر مفتاح المستخدم', providerModeByokAuth:'مفتاح API من المستخدم', providerModeByokBilling:'على حساب المستخدم', providerModeByokPrivacy:'لا يتم تصدير المفتاح', providerModeByokStatus:'نداءات حية باختيار صريح',
    providerModeBackendName:'وسيط خلفي مستضاف', providerModeBackendAuth:'مفتاح على الخادم', providerModeBackendBilling:'مالك التطبيق/الخلفية', providerModeBackendPrivacy:'المتصفح لا يرسل مفتاح المزوّد', providerModeBackendStatus:'يتطلب تقوية نشر',
    providerModePortableName:'حساب محمول وهمي', providerModePortableAuth:'وصلة OAuth وهمية', providerModePortableBilling:'مالك الحساب المحمول', providerModePortablePrivacy:'بصمة رمز فقط', providerModePortableStatus:'وهمي فقط',
    sourcePacketTemplateReportTitle:'قوالب حزمة المصادر',
    localizedSourceTemplatePolicy:'قوالب محلية يدوية لحزم المصادر: لا جلب حي ولا ادعاء تحقق.',
    statusScoreTheaterGuard:'حارس منع استعراض الأرقام مفعّل', reviewable:'قابل للمراجعة', verifiedLabel:'متحقق', manualReview:'مراجعة يدوية'
  });
  Object.assign(COPY.fr, {
    unspecifiedTopic:'Sujet d’analyse stratégique non précisé',
    contextNotSpecified:'Contexte non précisé',
    analysisBriefEmptyBody:'Compilez un brief lorsque le plan et la matrice de preuves sont prêts.',
    sourceImportReviewEmptyBody:'Les imports de sources apparaissent d’abord ici. Révisez les candidats avant de les promouvoir dans la matrice de preuves.',
    untitledResearchProject:'Projet de recherche sans titre',
    projectSavedLocally:'Projet enregistré localement.',
    projectLoadedLocally:'Projet chargé depuis l’espace local.',
    projectDuplicatedLocally:'Projet dupliqué localement.',
    noProjectToDuplicate:'Aucun projet à dupliquer.',
    noActiveProjectToDelete:'Aucun projet actif à supprimer.',
    deleteActiveLocalProject:'Supprimer le projet local actif ?',
    localProjectDeleted:'Projet local supprimé.',
    noLocalProjectDeleted:'Aucun projet local supprimé.',
    projectExportGenerated:'Export du projet généré.',
    workspaceLocalOnly:'local seulement',
    workspaceProjects:'projets',
    workspaceBytes:'octets',
    workspaceStorageAvailable:'stockage disponible',
    workspaceStorageUnavailable:'stockage indisponible',
    workspaceProject:'Projet',
    workspaceVersion:'Version',
    workspaceUpdated:'Mis à jour',
    workspaceAction:'Action',
    workspaceLoad:'Charger',
    workspaceEmpty:'Aucun projet local enregistré.',
    workspaceWarning:'Les projets sont stockés uniquement dans le localStorage de ce navigateur.',
    evidenceScoringCalibrationShort:'L’attention indique seulement la visibilité publique. Le poids de synthèse aide à prioriser, pas à établir la vérité.',
    advancedDetailsCollapsed:'Détails avancés repliés — ouvrez-les seulement pour configurer ce sous-système.',
    show:'Afficher', hide:'Masquer',
    sourceTemplateOfficialReport:'Rapport officiel / document institutionnel',
    sourceTemplateRedditThread:'Fil Reddit / discussion publique',
    sourceTemplateYoutubeTranscript:'Vidéo YouTube / transcription',
    sourceTemplateMarketSignal:'Marché de prédiction / signal de marché',
    sourceTemplateGithubRelease:'Release GitHub / signal de dépôt',
    sourceTemplateGenericArticle:'Article général / source web',
    sourcePacketTemplatePresetAria:'Préréglage de paquet source',
    providerModeGuideTitle:'Guide des modes fournisseur', providerModeColumnMode:'Mode', providerModeColumnAuth:'Auth', providerModeColumnBilling:'Facturation', providerModeColumnPrivacy:'Confidentialité', providerModeColumnStatus:'Statut',
    providerModeMockName:'Fournisseur simulé', providerModeMockAuth:'aucune', providerModeMockBilling:'aucune', providerModeMockPrivacy:'local / déterministe', providerModeMockStatus:'défaut sûr',
    providerModeByokName:'Compatible OpenAI avec clé utilisateur', providerModeByokAuth:'clé API utilisateur', providerModeByokBilling:'compte utilisateur', providerModeByokPrivacy:'clé jamais exportée', providerModeByokStatus:'appels live sur opt-in',
    providerModeBackendName:'Proxy backend hébergé', providerModeBackendAuth:'clé côté serveur', providerModeBackendBilling:'propriétaire app/backend', providerModeBackendPrivacy:'le navigateur n’envoie aucune clé', providerModeBackendStatus:'durcissement requis',
    providerModePortableName:'Compte portable simulé', providerModePortableAuth:'couture OAuth simulée', providerModePortableBilling:'propriétaire du compte portable', providerModePortablePrivacy:'empreinte de jeton seulement', providerModePortableStatus:'simulé seulement',
    sourcePacketTemplateReportTitle:'Préréglages de paquet source',
    localizedSourceTemplatePolicy:'Modèles locaux et manuels de paquets sources. Aucun fetch live et aucune revendication de vérification.',
    statusScoreTheaterGuard:'garde-fou anti-score-theater actif', reviewable:'révisable', verifiedLabel:'vérifié', manualReview:'revue manuelle'
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
    providerPromptLabel:'معاينة البرومبت',
    providerContractLabel:'عقد الاستجابة',
    responseValidationScore:'تحقق الاستجابة',
    contractFixtureScore:'اختبارات العقود',
    sourcePlanningScore:'تخطيط المصادر',
    sourcePolicyScore:'سياسة المصادر',
    sourceFixtureScore:'اختبارات المصادر',
    sourceImportScore:'استيراد المصادر',
    providerIdentityScore:'هوية المزوّد',
    sourceTypeOfficial:'رسمي', sourceTypeAcademic:'أكاديمي', sourceTypeNews:'إخباري', sourceTypeSocial:'اجتماعي', sourceTypeMarket:'سوقي', sourceTypeExpert:'خبير', sourceTypePrimary:'أولي', sourceTypeOther:'آخر',
    confidenceLow:'منخفضة', confidenceMedium:'متوسطة', confidenceHigh:'عالية',
    relationshipMotivates:'يدفع', relationshipEnables:'يمكّن', relationshipConstrains:'يقيّد', relationshipContradicts:'يناقض', relationshipAmplifies:'يضخّم',
    sourceConnectorManualMock:'يدوي / وهمي', sourceConnectorWebSearchApi:'تجريد API بحث الويب', sourceConnectorWebSearchPlanned:'بحث ويب مخطط قديم', sourceConnectorGithubRepo:'بيانات مستودع GitHub العام', sourceConnectorGithubPlanned:'GitHub مخطط قديم', sourceConnectorHnPlanned:'HN مخطط', sourceConnectorYoutubePlanned:'YouTube مخطط', sourceConnectorRedditPlanned:'Reddit مخطط', sourceConnectorPolymarketPlanned:'Polymarket مخطط',
    searchProviderMock:'بحث وهمي', searchProviderBrave:'Brave Search API مخطط', searchProviderTavily:'Tavily Search API مخطط', searchProviderSerpApi:'SerpApi مخطط', searchProviderCustom:'API بحث مخصص مخطط',
    formatLast30Days:'نمط last30days', formatDeepResearch:'نمط البحث العميق', formatGenericReport:'تقرير عام', formatSourcePacket:'JSON حزمة مصادر يدوية'
  });
  Object.assign(COPY.fr, {
    providerPromptLabel:'Aperçu du prompt',
    providerContractLabel:'Contrat de réponse',
    responseValidationScore:'Validation de réponse',
    contractFixtureScore:'Tests de contrat',
    sourcePlanningScore:'Planification sources',
    sourcePolicyScore:'Politique sources',
    sourceFixtureScore:'Tests sources',
    sourceImportScore:'Import sources',
    providerIdentityScore:'Identité fournisseur',
    sourceTypeOfficial:'officiel', sourceTypeAcademic:'académique', sourceTypeNews:'presse', sourceTypeSocial:'réseau social', sourceTypeMarket:'marché', sourceTypeExpert:'expert', sourceTypePrimary:'primaire', sourceTypeOther:'autre',
    confidenceLow:'faible', confidenceMedium:'moyenne', confidenceHigh:'élevée',
    relationshipMotivates:'motive', relationshipEnables:'permet', relationshipConstrains:'contraint', relationshipContradicts:'contredit', relationshipAmplifies:'amplifie',
    sourceConnectorManualMock:'Manuel / simulé', sourceConnectorWebSearchApi:'Abstraction API recherche web', sourceConnectorWebSearchPlanned:'Recherche web planifiée legacy', sourceConnectorGithubRepo:'Métadonnées dépôt GitHub public', sourceConnectorGithubPlanned:'GitHub planifié legacy', sourceConnectorHnPlanned:'HN planifié', sourceConnectorYoutubePlanned:'YouTube planifié', sourceConnectorRedditPlanned:'Reddit planifié', sourceConnectorPolymarketPlanned:'Polymarket planifié',
    searchProviderMock:'Recherche simulée', searchProviderBrave:'Brave Search API planifié', searchProviderTavily:'Tavily Search API planifié', searchProviderSerpApi:'SerpApi planifié', searchProviderCustom:'API recherche personnalisée planifiée',
    formatLast30Days:'style last30days', formatDeepResearch:'style recherche approfondie', formatGenericReport:'rapport générique', formatSourcePacket:'paquet source JSON manuel'
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
    promptCompilerEyebrow:'مُصرّف البرومبت',
    promptCompilerBody:'ترقية محلية فقط: حوّل الموضوع الخام إلى أطروحة وأسئلة واحتياجات أدلة وحجج مضادة وشروط إبطال قبل توليد الخطة.',
    compilePrompt:'تصريف البرومبت',
    copyCompiledPrompt:'نسخ البرومبت المُصرّف',
    noCompiledPrompt:'لا يوجد برومبت مُصرّف بعد.',
    noCompiledPromptBody:'صرّف الموضوع أولًا لإظهار الأطروحة والسياق الناقص واحتياجات الأدلة وشروط الإبطال.',
    compiledThesisTitle:'الأطروحة المُصرّفة',
    qualityLabel:'الجودة',
    missingContextTitle:'السياق الناقص',
    outputPlanTitle:'خطة المخرجات',
    counterargumentsTitle:'الحجج المضادة',
    disconfirmingConditionsTitle:'شروط الإبطال',
    none:'لا شيء',
    statusPromptCompiled:'تم تصريف البرومبت محليًا. لم يُستخدم مزوّد AI أو جلب حي.',
    timeframe_or_geography:'الإطار الزمني/الجغرافي',
    specific_entities_or_keywords:'كيانات أو كلمات مفتاحية محددة',
    temporal_boundary:'حد زمني واضح'
  });
  Object.assign(COPY.fr, {
    promptCompilerEyebrow:'Compilateur de prompt',
    promptCompilerBody:'Amélioration locale uniquement : transformer le sujet brut en thèse, questions, besoins de preuves, contre-arguments et conditions de réfutation avant le plan.',
    compilePrompt:'Compiler le prompt',
    copyCompiledPrompt:'Copier le prompt compilé',
    noCompiledPrompt:'Aucun prompt compilé.',
    noCompiledPromptBody:'Compilez d’abord le sujet pour exposer la thèse, le contexte manquant, les besoins de preuves et les réfutations.',
    compiledThesisTitle:'Thèse compilée',
    qualityLabel:'Qualité',
    missingContextTitle:'Contexte manquant',
    outputPlanTitle:'Plan de sortie',
    counterargumentsTitle:'Contre-arguments',
    disconfirmingConditionsTitle:'Conditions de réfutation',
    none:'aucun',
    statusPromptCompiled:'Prompt compilé localement. Aucun fournisseur IA ni fetch live utilisé.',
    timeframe_or_geography:'périmètre temporel/géographique',
    specific_entities_or_keywords:'entités ou mots-clés précis',
    temporal_boundary:'limite temporelle claire'
  });



  Object.assign(COPY.en, {
    reviewThroughputTitle:'Review throughput', visible:'visible', all:'all', allSources:'All sources', allRelationships:'All relationships', resolved:'resolved', unresolved:'unresolved', unlinked:'unlinked', newest:'newest', oldest:'oldest', needsReviewFirst:'needs review first', reliability:'reliability', attention:'attention', contradictions:'contradictions', queueBypass:'queue bypass', reviewKeyboardHint:'Keyboard: / search · Enter accept · N needs edit · R reject · E edit.', reviewSearchPlaceholder:'Search review queue...', noVisibleReviewItems:'No review items match the current filters.', acceptVisibleReviewEvidence:'Accept visible', needsEditVisibleReviewEvidence:'Needs edit visible', rejectVisibleReviewEvidence:'Reject visible', statusEvidenceNeedsEdit:'Evidence marked as needs edit.'
  });
  Object.assign(COPY.ar, {
    reviewThroughputTitle:'إنتاجية المراجعة', visible:'ظاهر', all:'الكل', allSources:'كل المصادر', allRelationships:'كل العلاقات', resolved:'محسوم', unresolved:'غير محسوم', unlinked:'غير مربوط', newest:'الأحدث', oldest:'الأقدم', needsReviewFirst:'الأولوية للاحتياج للمراجعة', reliability:'الموثوقية', attention:'الانتباه', contradictions:'التناقضات', queueBypass:'تجاوز الصف', reviewKeyboardHint:'لوحة المفاتيح: / للبحث · Enter للقبول · N يحتاج تعديل · R رفض · E تعديل.', reviewSearchPlaceholder:'ابحث في صف المراجعة...', noVisibleReviewItems:'لا توجد عناصر مراجعة تطابق الفلاتر الحالية.', acceptVisibleReviewEvidence:'قبول الظاهر', needsEditVisibleReviewEvidence:'الظاهر يحتاج تعديل', rejectVisibleReviewEvidence:'رفض الظاهر', statusEvidenceNeedsEdit:'تم وسم الدليل بأنه يحتاج تعديل.'
  });
  Object.assign(COPY.fr, {
    reviewThroughputTitle:'Débit de revue', visible:'visible', all:'tout', allSources:'Toutes sources', allRelationships:'Toutes relations', resolved:'résolu', unresolved:'non résolu', unlinked:'non lié', newest:'plus récent', oldest:'plus ancien', needsReviewFirst:'revue prioritaire', reliability:'fiabilité', attention:'attention', contradictions:'contradictions', queueBypass:'contournement file', reviewKeyboardHint:'Clavier: / recherche · Entrée accepter · N à modifier · R rejeter · E éditer.', reviewSearchPlaceholder:'Rechercher dans la file...', noVisibleReviewItems:'Aucun élément ne correspond aux filtres.', acceptVisibleReviewEvidence:'Accepter visible', needsEditVisibleReviewEvidence:'Visible à modifier', rejectVisibleReviewEvidence:'Rejeter visible', statusEvidenceNeedsEdit:'Preuve marquée à modifier.'
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
    sourceToBriefTitle:'من المصدر إلى الموجز',
    sourceToBriefSubtitle:'اربط سؤال البحث والخطة وبطاقات الأدلة وخريطة الادعاءات ومجموعات التناقض وفجوات المصادر ومراجعة الثقة وحزمة التصدير. لا يوجد ادعاء تحقق آلي من المصادر.',
    buildSourceToBrief:'بناء حزمة المصدر إلى الموجز',
    exportSourceToBrief:'تصدير حزمة المصدر إلى الموجز',
    sourceToBriefEmpty:'ابن حزمة المصدر إلى الموجز بعد إضافة أدلة أو تجميع موجز.',
    sourceToBriefEmptyBody:'الحزمة المحلية تفصل الأدلة والادعاءات المولدة والثقة المستنتجة والفجوات والقدرات غير المتاحة.',
    statusSourceToBriefBuilt:'تم بناء حزمة المصدر إلى الموجز محليا. لم يتم استخدام جلب حي أو تنفيذ مزود.',
    statusSourceToBriefExported:'تم تصدير حزمة المصدر إلى الموجز.',
    claimMapTitle:'خريطة الادعاءات',
    confidenceReviewTitle:'مراجعة الثقة',
    supportStrong:'قوي',
    supportPartial:'جزئي',
    supportWeak:'ضعيف',
    supportUnsupported:'غير مدعوم',
    blockedCapabilitiesTitle:'قدرات غير متاحة'
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


  Object.assign(COPY.en, {
    operatorFlowTitle:'Operator flow',
    preExportReadinessTitle:'Pre-export readiness',
    sourceGapWarningsTitle:'Source gap warnings',
    manualLocalDisclaimer:'Manual/local evidence only. No automatic source verification is claimed.',
    noEvidenceEmpty:'No evidence yet',
    noEvidenceEmptyBody:'Add or import evidence before claim mapping.',
    noClaimsEmpty:'No claims mapped',
    noClaimsEmptyBody:'Build the source-to-brief package after evidence is present.',
    noContradictionsEmpty:'No contradiction groups',
    noContradictionsEmptyBody:'Add counter-evidence or confirm that no conflict is currently visible.',
    noSourceGapWarnings:'No source gap warnings visible.',
    flowQuestion:'Question', flowPlan:'Plan', flowEvidence:'Evidence', flowClaims:'Claims', flowContradictions:'Contradictions', flowGaps:'Gaps', flowConfidence:'Confidence', flowExport:'Export',
    flowStatusComplete:'complete', flowStatusMissing:'missing', flowStatusReviewable:'reviewable', flowStatusReviewRequired:'review required', flowStatusEmptyReviewable:'empty reviewable', flowStatusWarning:'warning', flowStatusClear:'clear', flowStatusStrong:'strong', flowStatusPartial:'partial', flowStatusWeak:'weak', flowStatusUnsupported:'unsupported', flowStatusReadyWithManualReview:'ready with manual review', flowStatusNotReady:'not ready',
    readinessSupportedClaimsPresent:'Supported claims present',
    readinessWeakOrUnsupportedClaimsFlagged:'Weak or unsupported claims flagged',
    readinessContradictionsReviewed:'Contradictions reviewed',
    readinessSourceGapsReviewed:'Source gaps reviewed',
    readinessConfidenceNotesPresent:'Confidence notes present',
    readinessManualLocalDisclaimerPresent:'Manual/local evidence disclaimer present',
    readinessNoAutomaticVerificationClaim:'No automatic verification claim present'
  });
  Object.assign(COPY.ar, {
    operatorFlowTitle:'مسار المشغّل',
    preExportReadinessTitle:'جاهزية ما قبل التصدير',
    sourceGapWarningsTitle:'تحذيرات فجوات المصادر',
    manualLocalDisclaimer:'أدلة يدوية/محلية فقط. لا يوجد ادعاء تحقق آلي من المصادر.',
    noEvidenceEmpty:'لا توجد أدلة بعد',
    noEvidenceEmptyBody:'أضف أو استورد أدلة قبل ربط الادعاءات.',
    noClaimsEmpty:'لا توجد ادعاءات مربوطة',
    noClaimsEmptyBody:'ابن حزمة المصدر إلى الموجز بعد توفر الأدلة.',
    noContradictionsEmpty:'لا توجد مجموعات تناقض',
    noContradictionsEmptyBody:'أضف أدلة مضادة أو أكد أن لا تعارض ظاهر حاليا.',
    noSourceGapWarnings:'لا توجد تحذيرات فجوات مصادر ظاهرة.',
    flowQuestion:'السؤال', flowPlan:'الخطة', flowEvidence:'الأدلة', flowClaims:'الادعاءات', flowContradictions:'التناقضات', flowGaps:'الفجوات', flowConfidence:'الثقة', flowExport:'التصدير',
    flowStatusComplete:'مكتمل', flowStatusMissing:'ناقص', flowStatusReviewable:'قابل للمراجعة', flowStatusReviewRequired:'يتطلب مراجعة', flowStatusEmptyReviewable:'فارغ قابل للمراجعة', flowStatusWarning:'تحذير', flowStatusClear:'صاف', flowStatusStrong:'قوي', flowStatusPartial:'جزئي', flowStatusWeak:'ضعيف', flowStatusUnsupported:'غير مدعوم', flowStatusReadyWithManualReview:'جاهز مع مراجعة يدوية', flowStatusNotReady:'غير جاهز',
    readinessSupportedClaimsPresent:'وجود ادعاءات مدعومة',
    readinessWeakOrUnsupportedClaimsFlagged:'وسم الادعاءات الضعيفة أو غير المدعومة',
    readinessContradictionsReviewed:'مراجعة التناقضات',
    readinessSourceGapsReviewed:'مراجعة فجوات المصادر',
    readinessConfidenceNotesPresent:'وجود ملاحظات الثقة',
    readinessManualLocalDisclaimerPresent:'وجود تنبيه الأدلة اليدوية/المحلية',
    readinessNoAutomaticVerificationClaim:'لا يوجد ادعاء تحقق آلي'
  });
  Object.assign(COPY.fr, {
    operatorFlowTitle:'Flux opérateur',
    preExportReadinessTitle:'Préparation avant export',
    sourceGapWarningsTitle:'Alertes de lacunes source',
    manualLocalDisclaimer:'Preuves manuelles/locales uniquement. Aucune vérification automatique des sources nest revendiquée.',
    noEvidenceEmpty:'Aucune preuve',
    noEvidenceEmptyBody:'Ajoutez ou importez des preuves avant de relier les affirmations.',
    noClaimsEmpty:'Aucune affirmation reliée',
    noClaimsEmptyBody:'Construisez le paquet source vers brief quand les preuves existent.',
    noContradictionsEmpty:'Aucun groupe de contradiction',
    noContradictionsEmptyBody:'Ajoutez une contre-preuve ou confirmez quaucun conflit nest visible.',
    noSourceGapWarnings:'Aucune alerte de lacune source visible.',
    flowQuestion:'Question', flowPlan:'Plan', flowEvidence:'Preuves', flowClaims:'Affirmations', flowContradictions:'Contradictions', flowGaps:'Lacunes', flowConfidence:'Confiance', flowExport:'Export',
    flowStatusComplete:'complet', flowStatusMissing:'manquant', flowStatusReviewable:'revue possible', flowStatusReviewRequired:'revue requise', flowStatusEmptyReviewable:'vide révisable', flowStatusWarning:'alerte', flowStatusClear:'clair', flowStatusStrong:'fort', flowStatusPartial:'partiel', flowStatusWeak:'faible', flowStatusUnsupported:'non soutenu', flowStatusReadyWithManualReview:'prêt avec revue manuelle', flowStatusNotReady:'non prêt',
    readinessSupportedClaimsPresent:'Affirmations soutenues présentes',
    readinessWeakOrUnsupportedClaimsFlagged:'Affirmations faibles ou non soutenues signalées',
    readinessContradictionsReviewed:'Contradictions revues',
    readinessSourceGapsReviewed:'Lacunes source revues',
    readinessConfidenceNotesPresent:'Notes de confiance présentes',
    readinessManualLocalDisclaimerPresent:'Avertissement manuel/local présent',
    readinessNoAutomaticVerificationClaim:'Aucune revendication de vérification automatique'
  });



  Object.assign(COPY.en, {
    exportPolishTitle:'Export polish review',
    exportPolishBody:'Review handoff files, unresolved evidence items, blockers, warnings, and the manual/local evidence boundary before sharing.',
    exportGate:'export gate',
    files:'files',
    warnings:'warnings',
    blockers:'blockers',
    none:'none',
    reviewThroughputClear:'Review queue clear',
    reviewThroughputClearBody:'No open review lanes are visible. Export still requires manual boundary review.',
    exportReviewReadyAction:'Review export package and manual/local boundary before handoff.',
    reviewLanePriority:'Priority review',
    reviewLaneContradictions:'Contradictions',
    reviewLaneTraceability:'Traceability repairs',
    reviewLaneUnlinked:'Unlinked evidence',
    reviewLaneReadyToDecide:'Ready to decide'
  });
  Object.assign(COPY.ar, {
    exportPolishTitle:'مراجعة صقل التصدير',
    exportPolishBody:'راجع ملفات التسليم وعناصر الأدلة غير المحسومة والمعوقات والتحذيرات وحدود الأدلة اليدوية/المحلية قبل المشاركة.',
    exportGate:'بوابة التصدير',
    files:'ملفات',
    warnings:'تحذيرات',
    blockers:'معوقات',
    none:'لا شيء',
    reviewThroughputClear:'صف المراجعة صاف',
    reviewThroughputClearBody:'لا توجد مسارات مراجعة مفتوحة. يبقى التصدير محتاجا لمراجعة يدوية للحدود.',
    exportReviewReadyAction:'راجع حزمة التصدير وحدود الأدلة اليدوية/المحلية قبل التسليم.',
    reviewLanePriority:'مراجعة ذات أولوية',
    reviewLaneContradictions:'التناقضات',
    reviewLaneTraceability:'إصلاح التتبع',
    reviewLaneUnlinked:'أدلة غير مربوطة',
    reviewLaneReadyToDecide:'جاهز للقرار'
  });
  Object.assign(COPY.fr, {
    exportPolishTitle:'Revue de finition export',
    exportPolishBody:'Vérifiez fichiers de passation, éléments de preuve non résolus, bloqueurs, alertes et frontière manuelle/locale avant partage.',
    exportGate:'porte export',
    files:'fichiers',
    warnings:'alertes',
    blockers:'bloqueurs',
    none:'aucun',
    reviewThroughputClear:'File de revue claire',
    reviewThroughputClearBody:'Aucune piste de revue ouverte nest visible. Lexport exige toujours une revue manuelle des limites.',
    exportReviewReadyAction:'Revoyez le paquet export et la frontière manuelle/locale avant passation.',
    reviewLanePriority:'Revue prioritaire',
    reviewLaneContradictions:'Contradictions',
    reviewLaneTraceability:'Réparations traçabilité',
    reviewLaneUnlinked:'Preuves non reliées',
    reviewLaneReadyToDecide:'Prêt à décider'
  });


  Object.assign(COPY.en, {
    claimTraceabilityTitle:'Claim traceability console',
    decisionLedgerTitle:'Review decision ledger',
    claimTraceabilityClear:'No traceability rows visible',
    claimTraceabilityClearBody:'Build the source-to-brief package to map claims to evidence IDs and review decisions.',
    decisionLedgerEmpty:'No review decision entries recorded.',
    decisionLedgerBoundary:'Decision ledger is local/manual. It records review states only and does not verify source truth.',
    openDecisions:'open decisions',
    entries:'entries'
  });
  Object.assign(COPY.ar, {
    claimTraceabilityTitle:'لوحة تتبع الادعاءات',
    decisionLedgerTitle:'سجل قرارات المراجعة',
    claimTraceabilityClear:'لا توجد صفوف تتبع ظاهرة',
    claimTraceabilityClearBody:'ابن حزمة المصدر إلى الموجز لربط الادعاءات بمعرفات الأدلة ومراجعة القرارات.',
    decisionLedgerEmpty:'لا توجد إدخالات قرارات مراجعة.',
    decisionLedgerBoundary:'سجل القرارات محلي/يدوي. يسجل حالات المراجعة فقط ولا يتحقق من صحة المصادر.',
    openDecisions:'قرارات مفتوحة',
    entries:'إدخالات'
  });
  Object.assign(COPY.fr, {
    claimTraceabilityTitle:'Console de traçabilité des affirmations',
    decisionLedgerTitle:'Registre des décisions de revue',
    claimTraceabilityClear:'Aucune ligne de traçabilité visible',
    claimTraceabilityClearBody:'Construisez le paquet source vers brief pour relier les affirmations aux ID de preuve et revoir les décisions.',
    decisionLedgerEmpty:'Aucune entrée de décision de revue.',
    decisionLedgerBoundary:'Le registre est local/manuel. Il enregistre les états de revue et ne vérifie pas la véracité des sources.',
    openDecisions:'décisions ouvertes',
    entries:'entrées'
  });

  const SUPPORTED_LANGS = ['ar','en','fr'];
  function cp(...codes){ return String.fromCharCode(...codes); }
  const MOJIBAKE_REPAIR_MAP = Object.freeze([
    [cp(0xe2,0x20ac,0x201d),'—'], [cp(0xe2,0x20ac,0x201c),'–'], [cp(0xe2,0x20ac,0xa0),'†'],
    [cp(0xe2,0x2020,0x2019),'→'], [cp(0xe2,0x2020,0x0090),'←'], [cp(0xe2,0x20ac,0xa2),'•'],
    [cp(0xe2,0x20ac,0xa6),'…'], [cp(0xe2,0x20ac,0x0153),'“'], [cp(0xe2,0x20ac,0x009d),'”'],
    [cp(0xe2,0x20ac,0x02dc),'‘'], [cp(0xe2,0x20ac,0x2122),'’'], [cp(0x00c2,0x00b7),'·'],
    [cp(0x00c2,0x00a0),' '], [cp(0x00c2,0x20),' ']
  ]);
  function sanitizeUiText(value){
    let text = String(value ?? '');
    for(const [bad, good] of MOJIBAKE_REPAIR_MAP) text = text.replaceAll(bad, good);
    text = text.replace(/(^|[^\p{L}\p{M}])\u00c2(?=$|[^\p{L}\p{M}])/gu, '$1');
    return text;
  }
  function sanitizeUiTree(rootNode){
    const doc = rootNode?.ownerDocument || rootNode || global.document;
    const rootEl = rootNode?.nodeType ? rootNode : doc?.body;
    if(!doc || !rootEl || typeof doc.createTreeWalker !== 'function') return;
    const SHOW_TEXT = global.NodeFilter?.SHOW_TEXT || 4;
    const walker = doc.createTreeWalker(rootEl, SHOW_TEXT);
    const textNodes = [];
    while(walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach(node => {
      const repaired = sanitizeUiText(node.nodeValue);
      if(repaired !== node.nodeValue) node.nodeValue = repaired;
    });
    const elements = typeof rootEl.querySelectorAll === 'function' ? Array.from(rootEl.querySelectorAll('*')) : [];
    if(rootEl.nodeType === 1) elements.unshift(rootEl);
    elements.forEach(node => {
      Array.from(node.attributes || []).forEach(attr => {
        const repaired = sanitizeUiText(attr.value);
        if(repaired !== attr.value) node.setAttribute(attr.name, repaired);
      });
      if('value' in node && typeof node.value === 'string'){
        const repaired = sanitizeUiText(node.value);
        if(repaired !== node.value) node.value = repaired;
      }
      if(node.shadowRoot) sanitizeUiTree(node.shadowRoot);
    });
  }
  function installMojibakeGuard(documentRef = global.document){
    if(!documentRef || documentRef.__jarbou3iMojibakeGuardInstalled) return;
    documentRef.__jarbou3iMojibakeGuardInstalled = true;
    const run = () => sanitizeUiTree(documentRef.body || documentRef.documentElement);
    run();
    if(typeof global.MutationObserver === 'function'){
      let scheduled = false;
      const schedule = () => {
        if(scheduled) return;
        scheduled = true;
        const flush = () => { scheduled = false; run(); };
        if(typeof global.requestAnimationFrame === 'function') global.requestAnimationFrame(flush);
        else global.setTimeout(flush, 0);
      };
      const observer = new global.MutationObserver(schedule);
      observer.observe(documentRef.documentElement || documentRef.body, { childList:true, subtree:true, characterData:true, attributes:true, attributeFilter:['placeholder','title','aria-label','data-collapse-note','value'] });
      documentRef.__jarbou3iMojibakeGuardObserver = observer;
    }
  }
  function esc(value){ return sanitizeUiText(value).replace(/[&<>'"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char])); }

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
    strategicEvidenceGraphTitle:'خريطة الأدلة الاستراتيجية',
    graphExportTitle:'تقرير تصدير الرسم',
    graphQualityTitle:'تشخيص جودة الرسم',
    controlledConnectorTitle:'الموصلات المضبوطة',
    connectors:'موصلات',
    urlListImport:'استيراد قائمة روابط',
    manualTranscriptImport:'استيراد نص يدوي',
    manualSourceListImport:'استيراد قائمة مصادر يدوية'
  });
  Object.assign(COPY.fr, {
    strategicEvidenceGraphTitle:'Carte stratégique des preuves',
    graphExportTitle:'Rapport d’export graphe',
    graphQualityTitle:'Diagnostics qualité du graphe',
    controlledConnectorTitle:'Connecteurs contrôlés',
    connectors:'connecteurs',
    urlListImport:'Import liste URL',
    manualTranscriptImport:'Import transcript manuel',
    manualSourceListImport:'Import liste de sources'
  });


  Object.assign(COPY.en, {
    operatorCommandPaletteTitle:'Operator command palette',
    reviewNavigationShortcutsTitle:'Review navigation shortcuts',
    commandPaletteEmpty:'No navigation commands available',
    commandPaletteEmptyBody:'Build the source-to-brief package to expose review navigation commands.',
    shortcutNavigationEmpty:'No shortcuts available.',
    commandPaletteBoundary:'Navigation only. Commands do not fetch sources, verify claims, bypass review, or execute providers.',
    shortcutNavigationBoundary:'Shortcuts move the operator through local review surfaces only.',
    commands:'commands',
    priority:'priority',
    statusOperatorNavigationMoved:'Operator navigation moved to the selected review surface.',
    statusOperatorNavigationUnavailable:'Selected review surface is not available yet.',
    statusOperatorCommandPaletteFocused:'Operator command palette focused.'
  });
  Object.assign(COPY.ar, {
    operatorCommandPaletteTitle:'لوحة أوامر المشغّل',
    reviewNavigationShortcutsTitle:'اختصارات تنقل المراجعة',
    commandPaletteEmpty:'لا توجد أوامر تنقل متاحة',
    commandPaletteEmptyBody:'ابن حزمة المصدر إلى الموجز لإظهار أوامر تنقل المراجعة.',
    shortcutNavigationEmpty:'لا توجد اختصارات متاحة.',
    commandPaletteBoundary:'تنقل فقط. الأوامر لا تجلب مصادر ولا تتحقق من الادعاءات ولا تتجاوز المراجعة ولا تنفذ مزودين.',
    shortcutNavigationBoundary:'الاختصارات تنقل المشغّل بين أسطح المراجعة المحلية فقط.',
    commands:'أوامر',
    priority:'أولوية',
    statusOperatorNavigationMoved:'تم نقل التنقل إلى سطح المراجعة المحدد.',
    statusOperatorNavigationUnavailable:'سطح المراجعة المحدد غير متاح بعد.',
    statusOperatorCommandPaletteFocused:'تم التركيز على لوحة أوامر المشغّل.'
  });
  Object.assign(COPY.fr, {
    operatorCommandPaletteTitle:'Palette de commandes opérateur',
    reviewNavigationShortcutsTitle:'Raccourcis de navigation revue',
    commandPaletteEmpty:'Aucune commande de navigation disponible',
    commandPaletteEmptyBody:'Construisez le paquet source vers brief pour exposer les commandes de navigation revue.',
    shortcutNavigationEmpty:'Aucun raccourci disponible.',
    commandPaletteBoundary:'Navigation uniquement. Les commandes ne récupèrent pas de sources, ne vérifient pas les affirmations, ne contournent pas la revue et n’exécutent pas de fournisseurs.',
    shortcutNavigationBoundary:'Les raccourcis déplacent seulement l’opérateur entre les surfaces locales de revue.',
    commands:'commandes',
    priority:'priorité',
    statusOperatorNavigationMoved:'Navigation déplacée vers la surface de revue sélectionnée.',
    statusOperatorNavigationUnavailable:'Surface de revue sélectionnée indisponible.',
    statusOperatorCommandPaletteFocused:'Palette de commandes opérateur ciblée.'
  });



  Object.assign(COPY.en, {
    reviewQualityDiagnosticsTitle:'Review quality diagnostics',
    weakClaimRepairTitle:'Weak-claim repair suggestions',
    reviewQualityClear:'Review quality clear',
    reviewQualityClearBody:'No weak, unsupported, contradicted, or gap-heavy claims are open in the local diagnostics.',
    weakClaimRepairEmpty:'No weak-claim repair suggestions open.',
    reviewQualityBoundary:'Local/manual diagnostics only. Suggestions do not verify sources, fetch live data, execute providers, or replace operator judgment.',
    findings:'findings',
    weakClaims:'weak claims',
    workflow:'workflow'
  });
  Object.assign(COPY.ar, {
    reviewQualityDiagnosticsTitle:'تشخيص جودة المراجعة',
    weakClaimRepairTitle:'اقتراحات إصلاح الادعاءات الضعيفة',
    reviewQualityClear:'جودة المراجعة صافية',
    reviewQualityClearBody:'لا توجد ادعاءات ضعيفة أو غير مدعومة أو متناقضة أو مثقلة بفجوات مصادر في التشخيص المحلي.',
    weakClaimRepairEmpty:'لا توجد اقتراحات إصلاح مفتوحة للادعاءات الضعيفة.',
    reviewQualityBoundary:'تشخيص محلي/يدوي فقط. الاقتراحات لا تتحقق من المصادر ولا تجلب بيانات حية ولا تنفذ مزودين ولا تستبدل حكم المشغّل.',
    findings:'نتائج',
    weakClaims:'ادعاءات ضعيفة',
    workflow:'سير العمل'
  });
  Object.assign(COPY.fr, {
    reviewQualityDiagnosticsTitle:'Diagnostics qualité de revue',
    weakClaimRepairTitle:'Suggestions de réparation des affirmations faibles',
    reviewQualityClear:'Qualité de revue claire',
    reviewQualityClearBody:'Aucune affirmation faible, non soutenue, contradictoire ou chargée de lacunes n’est ouverte dans les diagnostics locaux.',
    weakClaimRepairEmpty:'Aucune suggestion de réparation d’affirmation faible ouverte.',
    reviewQualityBoundary:'Diagnostics locaux/manuels uniquement. Les suggestions ne vérifient pas les sources, ne récupèrent pas de données live, n’exécutent pas de fournisseurs et ne remplacent pas le jugement opérateur.',
    findings:'constats',
    weakClaims:'affirmations faibles',
    workflow:'workflow'
  });


  Object.assign(COPY.en, {
    guidedSessionTitle:'Guided Research Session',
    briefAssemblyTitle:'Brief Assembly Workflow',
    sessionProgress:'session progress',
    currentStep:'current step',
    nextBestAction:'next-best action',
    sessionCheckpoints:'manual checkpoints',
    briefAssemblyPreview:'brief assembly preview',
    guidedSessionBoundary:'Local/manual orchestration only. The session does not fetch live sources, execute providers, enable OAuth/backend behavior, or automatically verify evidence.',
    sessionState:'session state',
    readyToExport:'ready to export',
    notReadyToExport:'not ready to export'
  });
  Object.assign(COPY.ar, {
    guidedSessionTitle:'جلسة بحث موجّهة',
    briefAssemblyTitle:'سير تجميع الموجز',
    sessionProgress:'تقدم الجلسة',
    currentStep:'الخطوة الحالية',
    nextBestAction:'أفضل إجراء تالٍ',
    sessionCheckpoints:'نقاط تحقق يدوية',
    briefAssemblyPreview:'معاينة تجميع الموجز',
    guidedSessionBoundary:'تنسيق محلي/يدوي فقط. الجلسة لا تجلب مصادر حية ولا تنفذ مزودين ولا تفعّل OAuth/خلفية ولا تتحقق تلقائياً من الأدلة.',
    sessionState:'حالة الجلسة',
    readyToExport:'جاهز للتصدير',
    notReadyToExport:'غير جاهز للتصدير'
  });
  Object.assign(COPY.fr, {
    guidedSessionTitle:'Session de recherche guidée',
    briefAssemblyTitle:'Workflow d’assemblage du brief',
    sessionProgress:'progression session',
    currentStep:'étape actuelle',
    nextBestAction:'meilleure action suivante',
    sessionCheckpoints:'points de contrôle manuels',
    briefAssemblyPreview:'aperçu d’assemblage du brief',
    guidedSessionBoundary:'Orchestration locale/manuelle uniquement. La session ne récupère pas de sources live, n’exécute pas de fournisseurs, n’active pas OAuth/backend et ne vérifie pas automatiquement les preuves.',
    sessionState:'état de session',
    readyToExport:'prêt à exporter',
    notReadyToExport:'non prêt à exporter'
  });


  Object.assign(COPY.en, {
    guidedUxCompressionTitle:'Guided Session UX Compression',
    briefAssemblyExportQaTitle:'Brief Assembly Export QA',
    compactGroups:'compact groups',
    visibleSteps:'visible steps',
    primaryFocus:'primary focus',
    densityGate:'density gate',
    exportQaGate:'export QA gate',
    checksPassed:'checks passed',
    qaBlockers:'QA blockers',
    qaWarnings:'QA warnings',
    exportQaBoundary:'Brief assembly export QA is local/manual and does not verify source truth automatically.'
  });
  Object.assign(COPY.ar, {
    guidedUxCompressionTitle:'ضغط تجربة الجلسة الموجّهة',
    briefAssemblyExportQaTitle:'تدقيق تصدير تجميع الموجز',
    compactGroups:'مجموعات مضغوطة',
    visibleSteps:'خطوات مرئية',
    primaryFocus:'التركيز الأساسي',
    densityGate:'بوابة الكثافة',
    exportQaGate:'بوابة تدقيق التصدير',
    checksPassed:'فحوص ناجحة',
    qaBlockers:'عوائق التدقيق',
    qaWarnings:'تحذيرات التدقيق',
    exportQaBoundary:'تدقيق تصدير تجميع الموجز محلي/يدوي ولا يتحقق تلقائياً من صحة المصادر.'
  });
  Object.assign(COPY.fr, {
    guidedUxCompressionTitle:'Compression UX de session guidée',
    briefAssemblyExportQaTitle:'QA export assemblage du brief',
    compactGroups:'groupes compacts',
    visibleSteps:'étapes visibles',
    primaryFocus:'focus primaire',
    densityGate:'seuil de densité',
    exportQaGate:'seuil QA export',
    checksPassed:'contrôles réussis',
    qaBlockers:'bloqueurs QA',
    qaWarnings:'avertissements QA',
    exportQaBoundary:'La QA d’export d’assemblage du brief est locale/manuelle et ne vérifie pas automatiquement la vérité des sources.'
  });


  Object.assign(COPY.en, {
    alphaBadge:' · Runtime-Budget Guard Only',
    briefTemplateSystemTitle:'Brief Template System',
    assemblyVariantQaTitle:'Assembly Variant QA',
    briefTemplateUxPolishTitle:'Brief Template UX Polish',
    assemblyVariantComparisonTitle:'Assembly Variant Comparison',
    visibleDecisions:'visible decisions',
    templateComparisonHint:'Compare template purpose, risk band, section count, and QA coverage before export.',
    qaCoverage:'QA coverage',
    variantComparisonGate:'variant comparison gate',
    briefTemplateUxPolishBoundary:'Template UX polish is local/manual. It does not fetch sources or verify truth automatically.',
    assemblyVariantComparisonBoundary:'Assembly variant comparison is local/manual. No automatic source verification is claimed.',
    templates:'templates',
    selectedTemplate:'selected template',
    recommendedTemplate:'recommended template',
    sections:'sections',
    risk:'risk',
    variantQaGate:'variant QA gate',
    templateEmptyBody:'No brief templates are available yet. Build the source-to-brief package first.',
    briefTemplateBoundary:'Brief templates are local/manual assembly variants. They do not fetch sources or verify truth automatically.',
    assemblyVariantQaBoundary:'Assembly Variant QA checks local template coverage only. No automatic source verification is claimed.'
  });
  Object.assign(COPY.ar, {
    alphaBadge:'v1.4.0-alpha.28 رؤى إعادة تشغيل المحوّل وسطح قرار المشغّل · مراجعة المشغّل',
    briefTemplateSystemTitle:'نظام قوالب الموجز',
    assemblyVariantQaTitle:'تدقيق متغيرات التجميع',
    briefTemplateUxPolishTitle:'تحسين تجربة قوالب الموجز',
    assemblyVariantComparisonTitle:'مقارنة متغيرات التجميع',
    visibleDecisions:'قرارات مرئية',
    templateComparisonHint:'قارن هدف القالب ومستوى الخطر وعدد الأقسام وتغطية التدقيق قبل التصدير.',
    qaCoverage:'تغطية التدقيق',
    variantComparisonGate:'بوابة مقارنة المتغيرات',
    briefTemplateUxPolishBoundary:'تحسين تجربة القوالب محلي/يدوي ولا يجلب مصادر أو يتحقق من الحقيقة تلقائياً.',
    assemblyVariantComparisonBoundary:'مقارنة متغيرات التجميع محلية/يدوية ولا تدّعي التحقق التلقائي من المصادر.',
    templates:'قوالب',
    selectedTemplate:'القالب المختار',
    recommendedTemplate:'القالب الموصى به',
    sections:'أقسام',
    risk:'خطر',
    variantQaGate:'بوابة تدقيق المتغيرات',
    templateEmptyBody:'لا توجد قوالب موجز بعد. ابنِ حزمة المصدر إلى الموجز أولاً.',
    briefTemplateBoundary:'قوالب الموجز متغيرات تجميع محلية/يدوية. لا تجلب مصادر ولا تتحقق من الحقيقة تلقائياً.',
    assemblyVariantQaBoundary:'تدقيق متغيرات التجميع يفحص تغطية القوالب محلياً فقط ولا يدّعي التحقق التلقائي من المصادر.'
  });
  Object.assign(COPY.fr, {
    alphaBadge:'v1.4.0-alpha.28 Insights de rejeu adaptateur + surface de décision opérateur · revue opérateur',
    briefTemplateSystemTitle:'Système de modèles de brief',
    assemblyVariantQaTitle:'QA des variantes d’assemblage',
    briefTemplateUxPolishTitle:'Polish UX des modèles de brief',
    assemblyVariantComparisonTitle:'Comparaison des variantes d’assemblage',
    visibleDecisions:'décisions visibles',
    templateComparisonHint:'Comparez objectif, risque, sections et couverture QA avant export.',
    qaCoverage:'couverture QA',
    variantComparisonGate:'seuil comparaison variantes',
    briefTemplateUxPolishBoundary:'Le polish UX des modèles est local/manuel. Il ne récupère aucune source et ne vérifie pas automatiquement la vérité.',
    assemblyVariantComparisonBoundary:'La comparaison des variantes est locale/manuelle. Aucune vérification automatique des sources n’est revendiquée.',
    templates:'modèles',
    selectedTemplate:'modèle sélectionné',
    recommendedTemplate:'modèle recommandé',
    sections:'sections',
    risk:'risque',
    variantQaGate:'seuil QA variantes',
    templateEmptyBody:'Aucun modèle de brief disponible. Construisez d’abord le paquet source-to-brief.',
    briefTemplateBoundary:'Les modèles de brief sont des variantes d’assemblage locales/manuelles. Ils ne récupèrent aucune source et ne vérifient pas automatiquement la vérité.',
    assemblyVariantQaBoundary:'La QA des variantes d’assemblage contrôle seulement la couverture locale des modèles. Aucune vérification automatique des sources n’est revendiquée.'
  });


  Object.assign(COPY.en, {
    briefAssemblyPreviewDiffTitle:'Brief Assembly Preview Diff',
    exportReviewSignoffTitle:'Export Review Signoff',
    previewDiffGate:'preview diff gate',
    baselineAvailable:'baseline available',
    changes:'changes',
    previewDiffNoBaseline:'No previous preview baseline is attached; review the current preview manually.',
    previewDiffBoundary:'Preview diff is local/manual comparison metadata. It does not verify sources, fetch live data, execute providers, or sign off automatically.',
    signoffGate:'signoff gate',
    operatorSignedOff:'operator signed off',
    canExportAfterManualConfirmation:'can export after manual confirmation',
    exportReviewSignoffBoundary:'Export review signoff is a local/manual dossier. It records required confirmations but never signs off automatically.',
    operatorSignoffStateTitle:'Operator Signoff State',
    exportLockLedgerTitle:'Export Lock Ledger',
    signoffState:'signoff state',
    exportPermission:'export permission',
    lockStatus:'lock status',
    exportLocked:'export locked',
    exportAllowed:'export allowed',
    operatorSignoffStateBoundary:'Operator signoff state is local/manual and requires explicit operator input before a lock is allowed.',
    exportLockLedgerBoundary:'Export lock ledger records manual authorization state and never creates a lock without explicit operator signoff.',
    lockLedgerReviewSurfaceTitle:'Lock Ledger Review Surface',
    signedExportHandoffTitle:'Signed Export Handoff Pack',
    handoffStatus:'handoff status',
    lockGate:'lock gate',
    lockHash:'lock hash',
    cryptoSignatureClaimed:'crypto signature claimed',
    manualReviewRequired:'manual review required',
    reviewable:'reviewable',
    lockLedgerReviewSurfaceEmptyBody:'No lock-ledger review cards are available.',
    lockLedgerReviewSurfaceBoundary:'Lock-ledger review surface is local/manual. It exposes authorization state and blockers without source verification or cryptographic signing.',
    signedExportHandoffBoundary:'Signed export handoff is operator-signoff metadata only. It is not a cryptographic signature and does not verify source truth automatically.'
  });
  Object.assign(COPY.ar, {
    briefAssemblyPreviewDiffTitle:'فرق معاينة تجميع الموجز',
    exportReviewSignoffTitle:'اعتماد مراجعة التصدير',
    previewDiffGate:'بوابة فرق المعاينة',
    baselineAvailable:'خط أساس متوفر',
    changes:'تغييرات',
    previewDiffNoBaseline:'لا توجد معاينة سابقة مرفقة؛ راجع المعاينة الحالية يدوياً.',
    previewDiffBoundary:'فرق المعاينة بيانات مقارنة محلية/يدوية. لا يتحقق من المصادر ولا يجلب بيانات حية ولا ينفذ مزودين ولا يعتمد التصدير تلقائياً.',
    signoffGate:'بوابة الاعتماد',
    operatorSignedOff:'اعتماد المشغّل',
    canExportAfterManualConfirmation:'يمكن التصدير بعد تأكيد يدوي',
    exportReviewSignoffBoundary:'اعتماد مراجعة التصدير ملف محلي/يدوي. يسجل التأكيدات المطلوبة لكنه لا يعتمد تلقائياً.',
    operatorSignoffStateTitle:'حالة اعتماد المشغّل',
    exportLockLedgerTitle:'سجل قفل التصدير',
    signoffState:'حالة الاعتماد',
    exportPermission:'إذن التصدير',
    lockStatus:'حالة القفل',
    exportLocked:'التصدير مقفل',
    exportAllowed:'التصدير مسموح',
    operatorSignoffStateBoundary:'حالة اعتماد المشغّل محلية/يدوية وتتطلب إدخالاً صريحاً من المشغّل قبل السماح بالقفل.',
    exportLockLedgerBoundary:'سجل قفل التصدير يسجل حالة التفويض اليدوي ولا ينشئ قفلاً دون اعتماد صريح من المشغّل.',
    lockLedgerReviewSurfaceTitle:'سطح مراجعة سجل قفل التصدير',
    signedExportHandoffTitle:'حزمة تسليم التصدير المعتمدة',
    handoffStatus:'حالة التسليم',
    lockGate:'بوابة القفل',
    lockHash:'بصمة القفل',
    cryptoSignatureClaimed:'ادعاء توقيع تشفيري',
    manualReviewRequired:'مراجعة يدوية مطلوبة',
    reviewable:'قابل للمراجعة',
    lockLedgerReviewSurfaceEmptyBody:'لا توجد بطاقات مراجعة لسجل القفل.',
    lockLedgerReviewSurfaceBoundary:'سطح مراجعة سجل القفل محلي/يدوي. يعرض حالة التفويض والعوائق دون تحقق آلي من المصادر أو توقيع تشفيري.',
    signedExportHandoffBoundary:'تسليم التصدير المعتمد هو بيانات اعتماد من المشغّل فقط. ليس توقيعاً تشفيرياً ولا يتحقق من حقيقة المصادر تلقائياً.'
  });
  Object.assign(COPY.fr, {
    briefAssemblyPreviewDiffTitle:'Diff aperçu assemblage du brief',
    exportReviewSignoffTitle:'Visa de revue export',
    previewDiffGate:'seuil diff aperçu',
    baselineAvailable:'baseline disponible',
    changes:'changements',
    previewDiffNoBaseline:'Aucun aperçu précédent n’est attaché; révisez manuellement l’aperçu actuel.',
    previewDiffBoundary:'Le diff d’aperçu est une métadonnée de comparaison locale/manuelle. Il ne vérifie pas les sources, ne récupère rien en live, n’exécute aucun fournisseur et ne signe pas automatiquement.',
    signoffGate:'seuil visa',
    operatorSignedOff:'visa opérateur',
    canExportAfterManualConfirmation:'export possible après confirmation manuelle',
    exportReviewSignoffBoundary:'Le visa de revue export est un dossier local/manuel. Il enregistre les confirmations requises mais ne signe jamais automatiquement.',
    operatorSignoffStateTitle:'État de visa opérateur',
    exportLockLedgerTitle:'Registre de verrouillage export',
    signoffState:'état du visa',
    exportPermission:'permission export',
    lockStatus:'état du verrouillage',
    exportLocked:'export verrouillé',
    exportAllowed:'export autorisé',
    operatorSignoffStateBoundary:'L’état de visa opérateur reste local/manuel et exige une entrée opérateur explicite avant tout verrouillage.',
    exportLockLedgerBoundary:'Le registre de verrouillage export consigne l’autorisation manuelle et ne crée jamais de verrou sans visa opérateur explicite.',
    lockLedgerReviewSurfaceTitle:'Surface de revue du registre de verrouillage',
    signedExportHandoffTitle:'Pack de remise export signé',
    handoffStatus:'statut de remise',
    lockGate:'seuil verrouillage',
    lockHash:'empreinte verrou',
    cryptoSignatureClaimed:'signature crypto revendiquée',
    manualReviewRequired:'revue manuelle requise',
    reviewable:'révisable',
    lockLedgerReviewSurfaceEmptyBody:'Aucune carte de revue du registre de verrouillage n’est disponible.',
    lockLedgerReviewSurfaceBoundary:'La surface de revue du registre de verrouillage est locale/manuelle. Elle expose l’état d’autorisation et les blocages sans vérification de source ni signature cryptographique.',
    signedExportHandoffBoundary:'La remise export signée est une métadonnée de visa opérateur seulement. Ce n’est pas une signature cryptographique et elle ne vérifie pas automatiquement la vérité des sources.'
  });


  Object.assign(COPY.en, {
    alphaBadge:' · Runtime-Budget Guard Only',
    sourceToClaimGapClosureTitle:'Source-to-Claim Gap Closure Queue',
    openGaps:'open gaps',
    exportBlocking:'export blocking',
    sourceToClaimGapClosureClear:'Source-to-claim gaps clear',
    sourceToClaimGapClosureClearBody:'No weak claim linkage, unresolved contradiction, missing-evidence, or falsifier gaps are open before export.',
    sourceToClaimGapClosureBoundary:'Source-to-claim gap closure is local/manual. It exposes unresolved evidence, contradiction, and falsifier gaps before export but does not fetch, verify, or resolve sources automatically.'
  });
  Object.assign(COPY.ar, {
    alphaBadge:'v1.4.0-alpha.28 رؤى إعادة تشغيل المحوّل وسطح قرار المشغّل · مراجعة المشغّل',
    sourceToClaimGapClosureTitle:'قائمة إغلاق فجوات المصدر إلى الادعاء',
    openGaps:'فجوات مفتوحة',
    exportBlocking:'تعطيل التصدير',
    sourceToClaimGapClosureClear:'فجوات المصدر إلى الادعاء مغلقة',
    sourceToClaimGapClosureClearBody:'لا توجد فجوات دعم ضعيف أو تناقضات غير محسومة أو أدلة ناقصة أو شروط إبطال مفقودة قبل التصدير.',
    sourceToClaimGapClosureBoundary:'إغلاق فجوات المصدر إلى الادعاء محلي/يدوي. يعرض فجوات الأدلة والتناقضات وشروط الإبطال قبل التصدير لكنه لا يجلب المصادر ولا يتحقق منها ولا يحلها تلقائياً.'
  });
  Object.assign(COPY.fr, {
    alphaBadge:'v1.4.0-alpha.28 Insights de rejeu adaptateur + surface de décision opérateur · revue opérateur',
    sourceToClaimGapClosureTitle:'File de clôture des écarts source-affirmation',
    openGaps:'écarts ouverts',
    exportBlocking:'blocage export',
    sourceToClaimGapClosureClear:'Écarts source-affirmation fermés',
    sourceToClaimGapClosureClearBody:'Aucun lien faible, contradiction non résolue, preuve manquante ou falsificateur absent n’est ouvert avant export.',
    sourceToClaimGapClosureBoundary:'La fermeture des écarts source-affirmation est locale/manuelle. Elle expose les écarts de preuves, contradictions et falsificateurs avant export, sans récupérer, vérifier ni résoudre automatiquement les sources.'
  });


  Object.assign(COPY.en, {
    hostedDemoVerificationBody:'Source-to-Brief Operator Control Room is ready for release evidence: it turns the adapter replay coverage matrix into an operator-facing decision surface with replay coverage, coverage gaps, failure reason groups, evidence links, and operator readiness without changing provider execution. Hosted evidence must report 1.4.0-alpha.28 internally while showing  to users. No-network replay insight layer only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, live source fetching, automatic verification, signoff, export lock, cryptographic signature claim, or publication permission is enabled.',
    analysisReleaseNote:'1.4.0-alpha.28 converts evidence-budget regression results into pass, warn, fail, and review-required operator actions without network calls.',
  });
  Object.assign(COPY.ar, {
    hostedDemoVerificationBody:'تفصيل قرار إعادة التشغيل وروابط تتبع الأدلة جاهز لأدلة الإصدار: يضيف تفصيلات من أحكام إعادة التشغيل وفجوات التغطية ومجموعات الخلايا المحجوبة أو التي تحتاج مراجعة إلى روابط fixtures وصفوف السياسة وروابط تتبع الأدلة داخل سطح إعادة التشغيل بلا شبكة ودون تغيير تنفيذ المزوّد. يجب أن تعلن أدلة الاستضافة داخلياً 1.4.0-alpha.28 مع عرض v1.4.0-alpha.28 تفصيل قرار إعادة التشغيل وروابط تتبع الأدلة للمستخدمين. تفصيل بلا شبكة فقط: دون نداءات مزوّد حية، دون طلبات شبكة مخفية، دون OAuth/دورة رموز، دون تخزين بيانات اعتماد، دون جلب مصادر حي، ودون تحقق أو توقيع أو قفل أو نشر آلي.',
    analysisReleaseNote:'يحوّل 1.4.0-alpha.28 نتائج انحدار ميزانية الأدلة إلى نجاح وتحذير وفشل ومراجعة مطلوبة مع إجراءات المشغّل دون نداءات شبكة.',
  });
  Object.assign(COPY.fr, {
    hostedDemoVerificationBody:'Drilldown de décision de rejeu + liens de trace preuve est prêt pour les preuves de release : il ajoute des drilldowns depuis les verdicts de rejeu, lacunes de couverture, groupes bloqués/à revoir, liens de fixtures, lignes de politique et liens de trace preuve vers la surface de rejeu sans réseau, sans changer l’exécution fournisseur. Les preuves hébergées doivent annoncer 1.4.0-alpha.28 en interne tout en affichant v1.4.0-alpha.28 Drilldown de décision de rejeu + liens de trace preuve aux utilisateurs. Drilldown sans réseau uniquement : aucun appel fournisseur réel, requête réseau cachée, OAuth/cycle de token, persistance d’identifiants, fetch source live, vérification, visa, verrou d’export ou permission de publication automatique.',
    analysisReleaseNote:'1.4.0-alpha.28 convertit les résultats de régression du budget preuves en actions opérateur pass, warn, fail et revue requise sans appels réseau.',
  });


  Object.assign(COPY.en, {
    briefPublicationPackTitle:'Provider Execution Harness Mock-to-Live Equivalence',
    publicationPackStatus:'publication status',
    publicationReady:'publication ready',
    briefPublicationPackBoundary:'Provider Execution Harness Mock-to-Live Equivalence is local/manual. It consolidates the final brief and appendices without publishing, fetching, verifying, or signing cryptographically.'
  });
  Object.assign(COPY.ar, {
    briefPublicationPackTitle:'معادلة مسار التنفيذ الوهمي مع مسار التنفيذ الحي للمزوّد',
    publicationPackStatus:'حالة النشر',
    publicationReady:'جاهز للنشر',
    briefPublicationPackBoundary:'حزمة النشر v4 محلية/يدوية. تجمع المسودة النهائية والملاحق دون نشر أو جلب أو تحقق أو توقيع تشفيري.'
  });
  Object.assign(COPY.fr, {
    briefPublicationPackTitle:'Provider Execution Harness Mock-to-Live Equivalence',
    publicationPackStatus:'statut publication',
    publicationReady:'prêt publication',
    briefPublicationPackBoundary:'Provider Execution Harness Mock-to-Live Equivalence est local/manuel. Il consolide le brief final et les annexes sans publication, récupération, vérification ni signature cryptographique.'
  });


  Object.assign(COPY.en, {
    sourceAcquisitionTitle:'Source Acquisition Control Surface',
    sourceAcquisitionSubtitle:'Classify source candidates as manual, imported, fixture, provider-proposed, blocked, or future controlled fetch without live fetching or automatic verification.',
    sourceAcquisitionPolicyNote:'All modes preserve review queue routing, source-to-claim linkage, provenance/risk labels, and source-gap warnings. Provider-suggested sources cannot bypass review.',
    sourceModeManual:'Manual',
    sourceModeImported:'Imported',
    sourceModeFixture:'Fixture',
    sourceModeProviderProposed:'Provider-proposed',
    sourceModeBlocked:'Blocked',
    sourceModeFutureFetch:'Future controlled fetch'
  });
  Object.assign(COPY.en, {
    credentialBoundaryTitle:'Credential Boundary Runtime Drill',
    credentialBoundarySubtitle:'Run deterministic fake-secret drills for exports, logs, browser-visible text, fixtures, provider payloads, and release bundles.',
    credentialBoundaryPolicyNote:'Only redaction reports, booleans, and safe fingerprints may survive; no real OAuth, API keys, raw tokens, or token storage is enabled.',
    controlledExecutionCandidateTitle:'Controlled Execution Candidate Gate',
    controlledExecutionCandidateSubtitle:'Assemble a no-execution candidate report from credential, source, policy, readiness, replay, and approval evidence without enabling live execution.',
    controlledExecutionCandidatePolicyNote:'The gate lists manual preconditions and failure-to-enable reasons; it cannot authorize provider calls, source fetching, credentials, OAuth, signoff, export lock, or publication.',
    limitedManualLiveExecutionTitle:'Limited Manual Live-Execution Prototype',
    limitedManualLiveExecutionSubtitle:'Expose a disabled-by-default manual opt-in shell with operator preconditions and hard failure reasons without performing live execution.',
    limitedManualLiveExecutionPolicyNote:'No hidden network calls, credential persistence, OAuth/token lifecycle, automatic source fetching, background execution, auto-verification, signoff, export lock, or publication permission.'
  });
  Object.assign(COPY.ar, {
    sourceAcquisitionTitle:'سطح التحكم في اكتساب المصادر',
    sourceAcquisitionSubtitle:'يصنّف مرشحات المصادر إلى يدوي، مستورد، اختباري، مقترح من المزوّد، محظور، أو جلب مستقبلي مضبوط دون جلب حي أو تحقق آلي.',
    sourceAcquisitionPolicyNote:'كل الأنماط تحفظ مسار قائمة المراجعة وروابط المصدر بالادعاء وتسميات المنشأ/المخاطر وتحذيرات فجوات المصادر. المصادر المقترحة من المزوّد لا تتجاوز المراجعة.',
    sourceModeManual:'يدوي',
    sourceModeImported:'مستورد',
    sourceModeFixture:'اختباري',
    sourceModeProviderProposed:'مقترح من المزوّد',
    sourceModeBlocked:'محظور',
    sourceModeFutureFetch:'جلب مستقبلي مضبوط'
  });
  Object.assign(COPY.ar, {
    credentialBoundaryTitle:'تدريب حدود بيانات الاعتماد وقت التشغيل',
    credentialBoundarySubtitle:'يشغّل تدريبات أسرار وهمية للتصدير والسجلات والنص الظاهر والفيكستشرات وحمولات المزوّد وحزم الإصدار.',
    credentialBoundaryPolicyNote:'لا يبقى إلا تقارير التنقيح والقيم المنطقية والبصمات الآمنة؛ لا يوجد OAuth حقيقي أو مفاتيح API أو رموز خام أو تخزين رموز.',
    controlledExecutionCandidateTitle:'بوابة مرشح التنفيذ المضبوط',
    controlledExecutionCandidateSubtitle:'تجمع تقرير مرشح بلا تنفيذ من أدلة بيانات الاعتماد والمصادر والسياسات والجاهزية وإعادة التشغيل ومحاكاة الاعتماد دون تفعيل التنفيذ الحي.',
    controlledExecutionCandidatePolicyNote:'تعرض البوابة الشروط اليدوية وأسباب عدم التفعيل؛ ولا تفوض نداءات المزوّد أو جلب المصادر أو بيانات الاعتماد أو OAuth أو توقيع/قفل/نشر.',
    limitedManualLiveExecutionTitle:'نموذج أولي محدود للتنفيذ الحي اليدوي',
    limitedManualLiveExecutionSubtitle:'يعرض هيكل اشتراك يدوي معطّل افتراضياً مع شروط المشغّل وأسباب فشل صلبة دون تنفيذ حي.',
    limitedManualLiveExecutionPolicyNote:'لا توجد نداءات شبكة مخفية أو تخزين بيانات اعتماد أو دورة OAuth/رموز أو جلب مصادر آلي أو تنفيذ خلفي أو تحقق/توقيع/قفل/نشر آلي.'
  });
  Object.assign(COPY.fr, {
    sourceAcquisitionTitle:'Surface de contrôle d’acquisition des sources',
    sourceAcquisitionSubtitle:'Classe les candidats source comme manuels, importés, fixtures, proposés par fournisseur, bloqués ou futur fetch contrôlé sans récupération live ni vérification automatique.',
    sourceAcquisitionPolicyNote:'Tous les modes conservent le routage vers la revue, les liens source-vers-claim, les labels provenance/risque et les alertes d’écart. Les sources proposées par fournisseur ne peuvent pas contourner la revue.',
    sourceModeManual:'Manuel',
    sourceModeImported:'Importé',
    sourceModeFixture:'Fixture',
    sourceModeProviderProposed:'Proposé par fournisseur',
    sourceModeBlocked:'Bloqué',
    sourceModeFutureFetch:'Futur fetch contrôlé'
  });
  Object.assign(COPY.fr, {
    credentialBoundaryTitle:'Drill runtime de frontière des identifiants',
    credentialBoundarySubtitle:'Exécute des drills faux secrets pour exports, journaux, texte visible, fixtures, payloads fournisseur et bundles de release.',
    credentialBoundaryPolicyNote:'Seuls les rapports de caviardage, booléens et empreintes sûres peuvent survivre ; aucun OAuth réel, clé API, token brut ni stockage de token.',
    controlledExecutionCandidateTitle:'Porte de candidature d’exécution contrôlée',
    controlledExecutionCandidateSubtitle:'Assemble un rapport candidat sans exécution à partir des preuves d’identifiants, sources, politiques, readiness, replay et approbation sans activer le live.',
    controlledExecutionCandidatePolicyNote:'La porte liste préconditions manuelles et raisons de non-activation ; elle n’autorise ni fournisseur live, ni source live, ni OAuth, ni signature, verrou ou publication.',
    limitedManualLiveExecutionTitle:'Prototype limité d’exécution live manuelle',
    limitedManualLiveExecutionSubtitle:'Expose un shell opt-in manuel désactivé par défaut avec préconditions opérateur et raisons d’échec dures, sans exécution live.',
    limitedManualLiveExecutionPolicyNote:'Aucun appel réseau caché, stockage d’identifiants, cycle OAuth/token, fetch automatique, exécution arrière-plan, vérification, signature, verrou ou publication automatique.'
  });


  Object.assign(COPY.en, {
    manualExecutionSafetyCockpitTitle:'Manual Execution Safety Cockpit + Session Ledger',
    manualExecutionSafetyCockpitSubtitle:'Connect the safety layers into a simulation-only cockpit with session state, kill-switch drill, timeout/budget guardrails, safe ledger, and no-execution fallback reporting.',
    manualExecutionSafetyCockpitPolicyNote:'Simulation layer only: no live execution, hidden network calls, credentials, OAuth, token storage, source fetching, automatic verification, signoff, export lock, or publication permission.'
  });
  Object.assign(COPY.ar, {
    manualExecutionSafetyCockpitTitle:'قمرة أمان التنفيذ اليدوي + سجل الجلسة',
    manualExecutionSafetyCockpitSubtitle:'تربط طبقات الأمان في قمرة محاكاة فقط مع حالة الجلسة وتدريب مفتاح الإيقاف وحدود المهلة/الميزانية وسجل آمن وتقرير بديل بلا تنفيذ.',
    manualExecutionSafetyCockpitPolicyNote:'طبقة محاكاة فقط: لا تنفيذ حي ولا نداءات شبكة مخفية ولا بيانات اعتماد ولا OAuth ولا تخزين رموز ولا جلب مصادر ولا تحقق/اعتماد/قفل/نشر آلي.'
  });
  Object.assign(COPY.fr, {
    manualExecutionSafetyCockpitTitle:'Cockpit de sécurité d’exécution manuelle + registre de session',
    manualExecutionSafetyCockpitSubtitle:'Relie les couches de sécurité dans un cockpit de simulation avec état de session, kill-switch, limites délai/budget, registre sûr et rapport sans exécution.',
    manualExecutionSafetyCockpitPolicyNote:'Couche de simulation uniquement : aucune exécution live, appel réseau caché, identifiant, OAuth, stockage de token, fetch source, vérification, visa, verrou ou publication automatique.'
  });


  Object.assign(COPY.en, {
    manualProviderAdapterSandboxTitle:'Manual Provider Adapter Sandbox + Ephemeral Invocation Contract',
    manualProviderAdapterSandboxSubtitle:'Preview an ephemeral credential handoff, provider request envelope, no-network dry invocation transcript, adapter failure taxonomy, and safe metadata ledger.',
    manualProviderAdapterSandboxPolicyNote:'No-network sandbox only: no live provider calls, hidden network requests, credential persistence, OAuth/token lifecycle, source fetching, automatic verification, signoff, export lock, or publication permission.'
  });
  Object.assign(COPY.ar, {
    manualProviderAdapterSandboxTitle:'صندوق رمل محوّل المزوّد اليدوي + عقد الاستدعاء العابر',
    manualProviderAdapterSandboxSubtitle:'يعرض تسليم اعتماد عابر، ومعاينة غلاف طلب المزوّد، ونص استدعاء جاف بلا شبكة، وتصنيف فشل للمحوّل، وسجل بيانات وصفية آمن.',
    manualProviderAdapterSandboxPolicyNote:'صندوق رمل بلا شبكة فقط: لا نداءات مزوّد حية ولا طلبات شبكة مخفية ولا تخزين بيانات اعتماد ولا OAuth/دورة رموز ولا جلب مصادر ولا تحقق/توقيع/قفل/نشر آلي.'
  });
  Object.assign(COPY.fr, {
    manualProviderAdapterSandboxTitle:'Bac à sable d’adaptateur fournisseur manuel + contrat d’invocation éphémère',
    manualProviderAdapterSandboxSubtitle:'Prévisualise une remise d’identifiant éphémère, une enveloppe de requête fournisseur, une transcript sèche sans réseau, une taxonomie d’échec et un registre de métadonnées sûr.',
    manualProviderAdapterSandboxPolicyNote:'Bac à sable sans réseau uniquement : aucun appel fournisseur live, appel réseau caché, persistance d’identifiants, OAuth/cycle token, fetch source, vérification, visa, verrou ou publication automatique.'
  });


  Object.assign(COPY.en, {
    adapterContractTestBenchTitle:'Adapter Contract Test Bench + No-Network Invocation Replay QA',
    adapterContractTestBenchSubtitle:'Map evidence-dashboard status into lock-review-ready, budget-pressure-review, regression-blocked, and evidence-capture-required operator decisions without expanding browser scope.',
    adapterContractTestBenchPolicyNote:'Runbook gate layer only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, live source fetching, automatic verification, signoff, export lock, or publication permission.'
  });
  Object.assign(COPY.ar, {
    adapterContractTestBenchTitle:'رؤى إعادة تشغيل المحوّل وسطح قرار المشغّل',
    adapterContractTestBenchSubtitle:'تحوّل حالة لوحة الأدلة إلى مسارات قرار للمشغّل دون توسيع سطح المتصفح.',
    adapterContractTestBenchPolicyNote:'طبقة قائمة جاهزية فقط: لا نداءات مزوّد حقيقية ولا طلبات شبكة مخفية ولا OAuth/دورة رموز ولا تخزين بيانات اعتماد ولا جلب مصادر حي ولا تحقق أو توقيع أو قفل تصدير أو إذن نشر آلي.'
  });
  Object.assign(COPY.fr, {
    adapterContractTestBenchTitle:'Insights de rejeu adaptateur + surface de décision opérateur',
    adapterContractTestBenchSubtitle:'Convertit l’état du tableau preuves en chemins de décision opérateur sans élargir la portée navigateur.',
    adapterContractTestBenchPolicyNote:'Couche de consolidation uniquement : aucun appel fournisseur réel, requête réseau cachée, OAuth/cycle de token, persistance d’identifiants, fetch source live, vérification, visa, verrou d’export ou permission de publication automatique.'
  });


  Object.assign(COPY.en, {
    adapterReplayInsightTitle:'Adapter Replay Insight UX + Operator Decision Surface',
    adapterReplayInsightSubtitle:'Summarize replay coverage, gap groups, review-required cells, and operator readiness from the deterministic adapter replay corpus.',
    adapterReplayInsightPolicyNote:'No-network insight layer only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, source fetching, automatic verification, signoff, export lock, or publication permission.',
    adapterReplayDrilldownTitle:'Adapter Replay Decision Drilldown + Evidence Trace Links',
    adapterReplayDrilldownSubtitle:'Open replay verdicts into fixture links, policy rows, evidence trace links, blocker explanations, and operator checklist items.',
    adapterReplayDrilldownPolicyNote:'No-network drilldown only: trace links are metadata references and never execute providers, fetch sources, store credentials, sign off, lock exports, or publish.',
    adapterReplayReviewPackTitle:'Source-to-Brief Operator Control Room',
    adapterReplayReviewPackSubtitle:'Convert replay trace links into a review pack, handoff export payload, required actions, and evidence trace bundle for manual operator review.',
    adapterReplayReviewPackPolicyNote:'No-network review pack only: export payloads are metadata summaries and never execute providers, fetch sources, store credentials, sign off, lock exports, or publish.',
    adapterReplayExportPreviewTitle:'Source-to-Brief Operator Control Room',
    adapterReplayExportPreviewSubtitle:'Preview markdown, JSON, copy/export action metadata, and grouped operator actions before any manual handoff.',
    adapterReplayExportPreviewPolicyNote:'Export preview polish only: preview controls are metadata-only and never execute providers, fetch sources, store credentials, sign off, lock exports, or publish.'
  });
  Object.assign(COPY.ar, {
    adapterReplayInsightTitle:'رؤى إعادة تشغيل المحوّل وسطح قرار المشغّل',
    adapterReplayInsightSubtitle:'تلخّص تغطية إعادة التشغيل، فجوات التغطية، الخلايا التي تحتاج مراجعة، وجاهزية قرار المشغّل من corpus محلي حتمي.',
    adapterReplayInsightPolicyNote:'طبقة رؤى بلا شبكة فقط: لا نداءات مزوّد حية ولا طلبات شبكة مخفية ولا OAuth/دورة رموز ولا تخزين بيانات اعتماد ولا جلب مصادر ولا تحقق أو توقيع أو قفل أو نشر آلي.',
    adapterReplayDrilldownTitle:'تفصيل قرار إعادة التشغيل وروابط تتبع الأدلة',
    adapterReplayDrilldownSubtitle:'افتح أحكام إعادة التشغيل إلى روابط fixtures وصفوف السياسة وروابط تتبع الأدلة وتفسيرات العوائق وقائمة المشغّل.',
    adapterReplayDrilldownPolicyNote:'تفصيل بلا شبكة فقط: روابط التتبع مراجع metadata ولا تنفّذ مزوّدين ولا تجلب مصادر ولا تخزّن بيانات اعتماد ولا توقّع أو تقفل أو تنشر.',
    adapterReplayReviewPackTitle:'حزمة مراجعة إعادة التشغيل + تصدير تسليم المشغّل',
    adapterReplayReviewPackSubtitle:'حوّل روابط تتبع إعادة التشغيل إلى حزمة المراجعة وتصدير التسليم وإجراءات مطلوبة وحزمة تتبع الأدلة لمراجعة المشغّل اليدوية.',
    adapterReplayReviewPackPolicyNote:'حزمة مراجعة بلا شبكة فقط: حمولات التصدير ملخصات metadata ولا تنفّذ مزوّدين ولا تجلب مصادر ولا تخزّن بيانات اعتماد ولا توقّع أو تقفل أو تنشر.',
    adapterReplayExportPreviewTitle:'صقل واجهة حزمة المراجعة + معاينة التصدير',
    adapterReplayExportPreviewSubtitle:'عاين Markdown وJSON وبيانات إجراءات النسخ/التصدير وإجراءات المشغّل المجمّعة قبل أي تسليم يدوي.',
    adapterReplayExportPreviewPolicyNote:'صقل معاينة التصدير فقط: عناصر المعاينة metadata فقط ولا تنفّذ مزوّدين ولا تجلب مصادر ولا تخزّن بيانات اعتماد ولا توقّع أو تقفل أو تنشر.'
  });
  Object.assign(COPY.fr, {
    adapterReplayInsightTitle:'Insights de rejeu adaptateur + surface de décision opérateur',
    adapterReplayInsightSubtitle:'Résume couverture de rejeu, groupes de lacunes, cellules à revoir et préparation opérateur depuis le corpus déterministe.',
    adapterReplayInsightPolicyNote:'Couche d’insight sans réseau uniquement : aucun appel fournisseur live, appel réseau caché, OAuth/cycle token, persistance d’identifiants, fetch source, vérification, visa, verrou ou publication automatique.',
    adapterReplayDrilldownTitle:'Drilldown de décision de rejeu + liens de trace preuve',
    adapterReplayDrilldownSubtitle:'Ouvre les verdicts de rejeu vers liens de fixtures, lignes de politique, liens de trace preuve, explications de blocage et checklist opérateur.',
    adapterReplayDrilldownPolicyNote:'Drilldown sans réseau uniquement : les liens de trace sont des références metadata et n’exécutent aucun fournisseur, fetch, stockage d’identifiants, visa, verrou ou publication.',
    adapterReplayReviewPackTitle:'Pack de revue de rejeu + export de handoff opérateur',
    adapterReplayReviewPackSubtitle:'Convertit les liens de trace de rejeu en pack de revue, export de handoff, actions requises et lot de traces preuve pour la revue opérateur manuelle.',
    adapterReplayReviewPackPolicyNote:'Pack de revue sans réseau uniquement : les payloads d’export sont des résumés metadata et n’exécutent aucun fournisseur, fetch, stockage d’identifiants, visa, verrou ou publication.',
    adapterReplayExportPreviewTitle:'Polish UI du pack de revue + aperçu export',
    adapterReplayExportPreviewSubtitle:'Prévisualise Markdown, JSON, métadonnées copier/exporter et actions opérateur groupées avant tout handoff manuel.',
    adapterReplayExportPreviewPolicyNote:'Polish aperçu export uniquement : les contrôles de prévisualisation sont metadata-only et n’exécutent aucun fournisseur, fetch, stockage d’identifiants, visa, verrou ou publication.'
  });

  const releaseCopyContract = global.Jarbou3iResearchReleaseCopyContract || null;
  if(releaseCopyContract && releaseCopyContract.copy){
    Object.keys(releaseCopyContract.copy).forEach(locale => {
      if(COPY[locale]) Object.assign(COPY[locale], releaseCopyContract.copy[locale]);
    });
  }

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
  root.renderHelpers = {COPY, SUPPORTED_LANGS, sanitizeUiText, sanitizeUiTree, installMojibakeGuard, esc, getLang, tr, applyLabels};
})(window);


/* v1.4.0-alpha.28 · Source-to-Brief Operator Control Room */

/* legacy-test-token: مرشح مستقر; candidat stable. Public visible stable labels are العرض العام المستقر / Démo publique stable. */

/* legacy-release-test-token: Stable consolidation v1.1.0 */

/* legacy-release-test-token: الدمج المستقر v1.1.0 */

/* legacy-release-test-token: consolidation stable v1.1.0 */

/* legacy-release-test-token: aucune recherche live */
/* legacy-throughput-test-token: Diagnostic Repair Queue + Export Risk Resolution */

/* locked-baseline-token: v1.3.0 · Stable Manual Workflow Release */

/* legacy-release-test-token: v1.3.0 Stable Manual Workflow Release */
/* legacy-release-test-token: Diagnostic Repair Queue + Export Risk Resolution */
/* legacy-release-test-token: مرشح مستقر */
/* legacy-release-test-token: candidat stable */
/* legacy-release-test-token: no live search */

/* legacy alpha.19 localization continuity: سجل قرارات لوحة الأدلة; Registre de décision du tableau preuves */
