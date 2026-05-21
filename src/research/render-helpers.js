/* Jarbou3i Research Engine render helpers v1.1.0-alpha.14. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const COPY = {
    en: {
      researchTitle:'Research Workflow Lab',
      researchSubtitle:'Experimental research-to-strategy pipeline. Manual mode remains untouched; this layer builds plan, evidence, causal links, mock AI, critique, and Quality Gate v3.',
      alphaBadge:'v1.1.0-alpha.14 · Evidence Workspace + Source Import V2',
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
      compilerTitle:'Analysis Compiler', compilerSubtitle:'Compile evidence, source clusters, coverage gaps, and causal links into a synthesis-ready analysis brief.', compileBrief:'Compile analysis brief', copySynthesisPrompt:'Copy synthesis prompt', exportAnalysisBrief:'Export analysis brief', clearAnalysisBrief:'Clear brief', noAnalysisBrief:'No analysis brief compiled yet.', clusterTitle:'Source clusters', gapsTitle:'Coverage gaps', diagnosticsTitle:'Validation diagnostics', compilerScore:'Compiler', statusCompiled:'Analysis brief compiled.', statusBriefExported:'Analysis brief exported.', statusBriefCleared:'Analysis brief cleared.',
      providerTitle:'Provider Harness', providerSubtitle:'Provider-ready request contracts with mock, BYOK, hosted backend proxy, and portable-account mock modes. Live calls require explicit opt-in.', providerName:'Provider', providerTask:'Task', providerEndpoint:'Endpoint', providerModel:'Model', providerApiKey:'API key', rememberProviderKey:'Remember locally on this device', enableLiveByok:'Enable live provider calls', providerSafety:'Safety: manual/private mode remains default. Keys are never exported into packets, reports, or run ledgers.', validateProviderSettings:'Validate provider settings', dryRunProviderRequest:'Build dry-run request', taskPlan:'Research plan', taskSynthesis:'Strategic synthesis', taskRepair:'JSON repair', taskCritique:'Critique', taskSourceDiscipline:'Source discipline', runProviderTask:'Run provider task', copyProviderPayload:'Copy provider payload', exportRunLedger:'Export run ledger', clearRunLedger:'Clear run ledger', runLedgerEmpty:'No provider runs yet.', providerScore:'Provider harness', byokScore:'BYOK safety', backendProxyScore:'Backend proxy', providerIdentityScore:'Provider identity', statusProviderRun:'Provider task completed.', statusProviderDryRun:'Provider payload built without live network call.', statusProviderSettingsSaved:'Provider settings validated and saved.', statusProviderLiveDisabled:'Live provider calls disabled; dry-run/mock response recorded.', statusProviderLiveError:'Live provider call failed; no key was stored in the run ledger.', statusBackendProxyReady:'Hosted backend proxy selected. Browser sends no provider key.', statusProviderValidationFailed:'Provider response rejected by contract validation.', statusProviderRepaired:'Provider response failed validation and was repaired through the controlled fallback.', responseValidationScore:'Response validation', statusLedgerExported:'Run ledger exported.', statusLedgerCleared:'Run ledger cleared.', previewProviderContract:'Preview contract', previewProviderPrompt:'Preview prompt', runProviderFixtureSuite:'Run fixture suite', exportProviderDiagnostics:'Export diagnostics', providerContractLabel:'Response contract', providerPromptLabel:'Prompt preview', providerDiagnosticsTitle:'Provider diagnostics', fixtureSuiteTitle:'Contract fixture suite', contractFixtureScore:'Contract fixtures', statusProviderContractPreviewed:'Provider response contract previewed.', statusProviderPromptPreviewed:'Provider prompt previewed.', statusProviderFixtureSuiteRun:'Provider fixture suite completed.', statusProviderDiagnosticsExported:'Provider diagnostics exported.', portableTitle:'Portable account mock', portableSubtitle:'Simulate OAuth/PKCE account linking without real tokens or vendor dependency.', connectPortable:'Connect mock portable account', refreshPortable:'Refresh mock token', disconnectPortable:'Disconnect portable account', exportPortableStatus:'Export portable status', portableScore:'Portable account', statusPortableConnected:'Mock portable account connected. No live OAuth or provider call was made.', statusPortableRefreshed:'Mock portable token refreshed. No raw token is stored or exported.', statusPortableDisconnected:'Portable account disconnected.', statusPortableExported:'Portable account status exported.', workflowTitle:'Mock AI Workflow', workflowSubtitle:'Legacy quick actions remain available, but provider harness is now the main AI integration path.', generateMock:'Generate mock analysis JSON', runMockRepair:'Run mock repair', runCritique:'Run mock critique', copyDeepPrompt:'Copy deep-research prompt',
      qualityTitle:'Quality Gate v3', planScore:'Plan', evidenceScore:'Evidence', causalScore:'Causal links', critiqueScore:'Critique', sourceScore:'Source discipline', diversityScore:'Source diversity', counterScore:'Counter-evidence', readiness:'Readiness',
      statusReady:'Research workflow ready for mock synthesis.', statusNeedPlan:'Generate a research plan first.', statusNeedEvidence:'Add evidence before synthesis.', statusGenerated:'Mock analysis JSON generated and placed in the import box.', statusRepaired:'Mock repair produced schema-compatible JSON.', statusCritiqued:'Mock critique generated.', statusImported:'Research packet imported.', statusExported:'Research packet exported.', statusEditing:'Evidence item loaded for editing.', statusLinkAdded:'Causal link added.', statusLinksInferred:'Causal links inferred from evidence.', statusInvalidPacket:'Invalid research packet.', statusInvalidLink:'Causal link requires From, To, and at least one evidence ID.', copied:'Copied.', copyFailed:'Copy failed. Use the visible text manually.',
      urlOptional:'https://example.com/source', claimPlaceholder:'Observable claim or research finding', sourcePlaceholder:'Publication, report, dataset, transcript, or note title', supportsPlaceholder:'I1,A1,T1', contradictsPlaceholder:'N1,R1', notesPlaceholder:'Why this evidence matters / uncertainty / limitations', sourcePlanningTitle:'Source Planning Layer', sourcePlanningSubtitle:'Plan future source-assisted research without live crawling or verification claims.', sourceConnector:'Connector', sourceTask:'Source task', sourceTaskPlan:'Source plan', sourceTaskQuery:'Query plan', sourceTaskClaim:'Claim extraction', sourceTaskScoring:'Evidence scoring', sourceTaskCluster:'Cluster plan', sourcePolicyNote:'Planning-only: no scraping, no live search, no source verification claims.', buildSourceTask:'Build source task', copySourceRequest:'Copy source request', runSourceFixtureSuite:'Run source fixture suite', exportSourcePolicy:'Export source policy', sourcePlanningScore:'Source planning', sourceFixtureScore:'Source fixtures', sourcePolicyScore:'Source policy', sourceDiagnosticsTitle:'Source diagnostics', sourceFixtureSuiteTitle:'Source fixture suite', statusSourceTaskBuilt:'Source task built. No live fetch was performed.', statusSourceRequestCopied:'Source request copied.', statusSourceFixtureSuiteRun:'Source fixture suite completed.', statusSourcePolicyExported:'Source policy exported.', sourceImportTitle:'Source Import Adapter', sourceImportSubtitle:'Paste deep-research / last30days-style outputs and convert them into Evidence Matrix candidates.', sourceImportFormat:'Import format', formatAuto:'Auto detect', sourceImportText:'Source output', sourceImportPlaceholder:'Paste external research output, source notes, links, or signal summaries here.', sourceImportPolicyNote:'Manual-only import: no fetch, no scraping, no verification claim.', previewSourceImport:'Preview import', importSourceEvidence:'Import as evidence', exportSourceImportReport:'Export import report', clearSourceImport:'Clear import', sourceImportScore:'Source import', sourceImportReportTitle:'Source import report', statusSourceImportPreviewed:'Source import preview generated.', statusSourceImported:'Source evidence imported into the matrix.', statusSourceImportCleared:'Source import cleared.', statusSourceImportReportExported:'Source import report exported.', statusSourceImportEmpty:'Paste source output before importing.'
    },
    ar: {
      researchTitle:'مختبر سير العمل البحثي',
      researchSubtitle:'طبقة تجريبية تربط البحث بالتحليل الاستراتيجي. النمط اليدوي يبقى كما هو؛ هذه الطبقة تضيف خطة، مصفوفة أدلة، روابط سببية، محاكاة AI، نقد، وبوابة جودة v2.',
      alphaBadge:'v1.1.0-alpha.14 · مُصرّف البرومبت وترقية خطة البحث' ,
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
      compilerTitle:'مُصرّف التحليل', compilerSubtitle:'حوّل الأدلة والعناقيد المصدرية والفجوات والروابط السببية إلى موجز جاهز للتوليف.', compileBrief:'تجميع موجز التحليل', copySynthesisPrompt:'نسخ برومبت التوليف', exportAnalysisBrief:'تصدير الموجز', clearAnalysisBrief:'مسح الموجز', noAnalysisBrief:'لا يوجد موجز تحليل بعد.', clusterTitle:'عناقيد المصادر', gapsTitle:'فجوات التغطية', diagnosticsTitle:'تشخيص التحقق', compilerScore:'المُصرّف', statusCompiled:'تم تجميع موجز التحليل.', statusBriefExported:'تم تصدير موجز التحليل.', statusBriefCleared:'تم مسح موجز التحليل.',
      workflowTitle:'سير AI تجريبي', workflowSubtitle:'تجريد المزوّد يبدأ بمزوّد وهمي. ينتج JSON صالحًا دون الاتصال بأي API خارجي.', generateMock:'توليد JSON تحليلي تجريبي', runMockRepair:'تشغيل إصلاح تجريبي', runCritique:'تشغيل نقد تجريبي', copyDeepPrompt:'نسخ برومبت البحث العميق', providerEndpoint:'Endpoint', providerModel:'Model', providerApiKey:'API key', rememberProviderKey:'Remember locally on this device', enableLiveByok:'Enable live provider calls', providerSafety:'Safety: manual/private mode remains default. Keys are never exported.', validateProviderSettings:'Validate provider settings', dryRunProviderRequest:'Build dry-run request', byokScore:'BYOK safety', backendProxyScore:'Backend proxy', providerIdentityScore:'Provider identity', statusProviderDryRun:'Provider payload built without live network call.', statusProviderSettingsSaved:'Provider settings validated and saved.', statusProviderLiveDisabled:'Live provider calls disabled; dry-run/mock response recorded.', statusProviderLiveError:'Live provider call failed; no key was stored in the run ledger.', statusBackendProxyReady:'Hosted backend proxy selected. Browser sends no provider key.',
      qualityTitle:'بوابة الجودة v3', planScore:'الخطة', evidenceScore:'الأدلة', causalScore:'الروابط السببية', critiqueScore:'النقد', sourceScore:'انضباط المصادر', diversityScore:'تنوع المصادر', counterScore:'الأدلة المضادة', readiness:'الجاهزية',
      statusReady:'سير العمل البحثي جاهز للمحاكاة.', statusNeedPlan:'ولّد خطة بحث أولًا.', statusNeedEvidence:'أضف أدلة قبل التوليف.', statusGenerated:'تم توليد JSON تجريبي ووضعه في خانة الاستيراد.', statusRepaired:'الإصلاح التجريبي أنتج JSON متوافقًا.', statusCritiqued:'تم توليد نقد تجريبي.', statusImported:'تم استيراد حزمة البحث.', statusExported:'تم تصدير حزمة البحث.', statusEditing:'تم تحميل الدليل للتعديل.', statusLinkAdded:'تمت إضافة الرابط السببي.', statusLinksInferred:'تم استنتاج الروابط السببية من الأدلة.', statusInvalidPacket:'حزمة البحث غير صالحة.', statusInvalidLink:'الرابط السببي يحتاج من/إلى وعلى الأقل ID دليل واحد.', copied:'تم النسخ.', copyFailed:'تعذر النسخ. استخدم النص الظاهر يدويًا.',
      urlOptional:'https://example.com/source', claimPlaceholder:'ادعاء قابل للملاحظة أو نتيجة بحثية', sourcePlaceholder:'تقرير، دراسة، قاعدة بيانات، تفريغ، أو ملاحظة', supportsPlaceholder:'I1,A1,T1', contradictsPlaceholder:'N1,R1', notesPlaceholder:'لماذا هذا الدليل مهم / عدم اليقين / الحدود'
    },
    fr: {
      researchTitle:'Laboratoire de workflow de recherche',
      researchSubtitle:'Couche expérimentale reliant la recherche à l’analyse stratégique. Le mode manuel reste intact; cette couche ajoute plan, matrice de preuves, liens causaux, IA simulée, critique et barrière qualité v2.',
      alphaBadge:'v1.1.0-alpha.14 · Compilateur de prompt et plan de recherche renforcé',
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
      compilerTitle:'Compilateur d’analyse', compilerSubtitle:'Compiler preuves, clusters de sources, lacunes et liens causaux dans un brief prêt pour synthèse.', compileBrief:'Compiler le brief', copySynthesisPrompt:'Copier prompt synthèse', exportAnalysisBrief:'Exporter le brief', clearAnalysisBrief:'Effacer le brief', noAnalysisBrief:'Aucun brief compilé.', clusterTitle:'Clusters de sources', gapsTitle:'Lacunes de couverture', diagnosticsTitle:'Diagnostics validation', compilerScore:'Compilateur', statusCompiled:'Brief d’analyse compilé.', statusBriefExported:'Brief exporté.', statusBriefCleared:'Brief effacé.',
      workflowTitle:'Workflow IA simulé', workflowSubtitle:'L’abstraction fournisseur commence par un fournisseur simulé. Il crée un JSON valide sans API externe.', generateMock:'Générer JSON simulé', runMockRepair:'Réparation simulée', runCritique:'Critique simulée', copyDeepPrompt:'Copier prompt deep-research', providerEndpoint:'Endpoint', providerModel:'Model', providerApiKey:'API key', rememberProviderKey:'Remember locally on this device', enableLiveByok:'Enable live provider calls', providerSafety:'Safety: manual/private mode remains default. Keys are never exported.', validateProviderSettings:'Validate provider settings', dryRunProviderRequest:'Build dry-run request', byokScore:'BYOK safety', backendProxyScore:'Backend proxy', providerIdentityScore:'Provider identity', statusProviderDryRun:'Provider payload built without live network call.', statusProviderSettingsSaved:'Provider settings validated and saved.', statusProviderLiveDisabled:'Live provider calls disabled; dry-run/mock response recorded.', statusProviderLiveError:'Live provider call failed; no key was stored in the run ledger.', statusBackendProxyReady:'Hosted backend proxy selected. Browser sends no provider key.',
      qualityTitle:'Barrière qualité v3', planScore:'Plan', evidenceScore:'Preuves', causalScore:'Liens causaux', critiqueScore:'Critique', sourceScore:'Discipline sources', diversityScore:'Diversité sources', counterScore:'Contre-preuves', readiness:'Préparation',
      statusReady:'Workflow prêt pour synthèse simulée.', statusNeedPlan:'Générez d’abord un plan.', statusNeedEvidence:'Ajoutez des preuves avant la synthèse.', statusGenerated:'JSON simulé généré et placé dans la zone d’import.', statusRepaired:'Réparation simulée compatible avec le schéma.', statusCritiqued:'Critique simulée générée.', statusImported:'Paquet de recherche importé.', statusExported:'Paquet de recherche exporté.', statusEditing:'Élément chargé pour édition.', statusLinkAdded:'Lien causal ajouté.', statusLinksInferred:'Liens causaux inférés.', statusInvalidPacket:'Paquet de recherche invalide.', statusInvalidLink:'Un lien causal exige De, Vers et au moins un ID preuve.', copied:'Copié.', copyFailed:'Copie impossible. Utilisez le texte visible manuellement.',
      urlOptional:'https://example.com/source', claimPlaceholder:'Énoncé observable ou résultat de recherche', sourcePlaceholder:'Publication, rapport, données, transcript ou note', supportsPlaceholder:'I1,A1,T1', contradictsPlaceholder:'N1,R1', notesPlaceholder:'Pourquoi cette preuve compte / incertitude / limites'
    }
  };

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
    hostedDemoVerificationBody:'Planning gate only: no live scraping, no real OAuth, no provider execution, and no automated source verification are enabled. v1.1.0-alpha.14 adds a local prompt compiler and research-plan upgrade while preserving hosted evidence, visible-text snapshots, and privacy boundaries.',
    hostedUrlChecked:'Hosted URL checked', desktopEvidence:'Desktop evidence', mobileEvidence:'Mobile evidence', providerExportEvidence:'Provider/export evidence',
    evidenceReviewGateEyebrow:'Evidence review gate', evidenceReviewGateTitle:'Review screenshots and metadata before publish',
    evidenceReviewGateBody:'v1.1.0-alpha.14 preserves the public-demo freeze while adding a local prompt compiler that converts messy topics into inspectable research-plan inputs. Source packets remain local/manual drafting scaffolds; screenshots, hosted evidence, ZIPs, and generated plans are not release approval by themselves.',
    hostedUrlSmoke:'Hosted URL smoke', noOverflowProof:'No overflow proof', metadataArtifact:'Metadata artifact', reviewedBeforePublish:'Reviewed before publish',
    stableWorkflowEyebrow:'Stable workflow', stableWorkflowTitle:'Next action: compile the prompt → review plan gaps → add evidence',
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
    hostedDemoVerificationBody:'بوابة تخطيط فقط: لا يوجد استخراج حي، ولا OAuth حقيقي، ولا تنفيذ لمزوّد خارجي، ولا تحقق آلي من المصادر. تضيف v1.1.0-alpha.14 مُصرّف برومبت محليًا وترقية لخطة البحث مع الحفاظ على أدلة الاستضافة ولقطات النص المرئي وحدود الخصوصية.',
    hostedUrlChecked:'تم فحص رابط الاستضافة', desktopEvidence:'دليل سطح المكتب', mobileEvidence:'دليل الهاتف', providerExportEvidence:'دليل المزوّد/التصدير',
    evidenceReviewGateEyebrow:'بوابة مراجعة الأدلة', evidenceReviewGateTitle:'راجع اللقطات والبيانات الوصفية قبل النشر',
    evidenceReviewGateBody:'تحافظ v1.1.0-alpha.14 على تجميد العرض العام مع إضافة مُصرّف برومبت محلي يحوّل الموضوعات غير المنظمة إلى مدخلات خطة بحث قابلة للفحص. تبقى حزم المصادر قوالب صياغة محلية/يدوية؛ ولا تكفي اللقطات أو أدلة الاستضافة أو ملفات ZIP أو الخطط المولّدة وحدها لاعتماد الإصدار.',
    hostedUrlSmoke:'اختبار دخان لرابط الاستضافة', noOverflowProof:'إثبات عدم وجود تجاوز أفقي', metadataArtifact:'أثر بيانات وصفية', reviewedBeforePublish:'تمت المراجعة قبل النشر',
    stableWorkflowEyebrow:'سير عمل مستقر', stableWorkflowTitle:'الإجراء التالي: صرّف البرومبت → راجع فجوات الخطة → أضف الأدلة',
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
    hostedDemoVerificationBody:'Barrière de planification uniquement : aucun scraping live, aucun OAuth réel, aucune exécution fournisseur et aucune vérification automatique des sources ne sont activés. v1.1.0-alpha.14 ajoute un compilateur de prompt local et une amélioration du plan de recherche tout en préservant les preuves hébergées, les snapshots de texte visible et les frontières de confidentialité.',
    hostedUrlChecked:'URL hébergée vérifiée', desktopEvidence:'Preuve desktop', mobileEvidence:'Preuve mobile', providerExportEvidence:'Preuve fournisseur/export',
    evidenceReviewGateEyebrow:'Barrière de revue des preuves', evidenceReviewGateTitle:'Revoir captures et métadonnées avant publication',
    evidenceReviewGateBody:'v1.1.0-alpha.14 préserve le gel de démo publique tout en ajoutant un compilateur de prompt local qui transforme des sujets bruts en entrées de plan de recherche vérifiables. Les paquets source restent des échafaudages locaux/manuels ; captures, preuves hébergées, ZIPs et plans générés ne valent pas approbation de release à eux seuls.',
    hostedUrlSmoke:'Smoke test URL hébergée', noOverflowProof:'Preuve sans débordement', metadataArtifact:'Artefact de métadonnées', reviewedBeforePublish:'Revu avant publication',
    stableWorkflowEyebrow:'Workflow stable', stableWorkflowTitle:'Action suivante : compiler le prompt → revoir les lacunes du plan → ajouter les preuves',
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
    providerTitle:'Harnais fournisseur', providerSubtitle:'Contrats de requête prêts pour fournisseur avec modes simulé, BYOK, proxy backend hébergé et compte portable de test. Les appels live exigent une activation explicite.', providerName:'Fournisseur', providerTask:'Tâche', taskPlan:'Plan de recherche', taskSynthesis:'Synthèse stratégique', taskRepair:'Réparation JSON', taskCritique:'Critique', taskSourceDiscipline:'Discipline des sources', runProviderTask:'Exécuter la tâche fournisseur', previewProviderContract:'Prévisualiser le contrat', previewProviderPrompt:'Prévisualiser le prompt', runProviderFixtureSuite:'Lancer les tests de contrat', exportProviderDiagnostics:'Exporter les diagnostics', copyProviderPayload:'Copier la charge fournisseur', exportRunLedger:'Exporter le journal d’exécution', clearRunLedger:'Effacer le journal d’exécution',
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
    analysisReleaseNote:'v1.1.0-alpha.14 adds a local prompt compiler and research-plan upgrade without live AI calls, scraping, OAuth, backend expansion, or source verification changes.',
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
    analysisReleaseNote:'تضيف v1.1.0-alpha.14 مُصرّف برومبت محليًا وترقية لخطة البحث دون استدعاءات AI حية أو جلب ويب أو OAuth أو توسيع للخلفية أو تغيير في تحقق المصادر.',
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
    analysisReleaseNote:'v1.1.0-alpha.14 ajoute un compilateur de prompt local et une amélioration du plan de recherche sans appels IA live, scraping, OAuth, extension backend ni changement de vérification des sources.',
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


  const SUPPORTED_LANGS = ['ar','en','fr'];
  function esc(value){ return String(value ?? '').replace(/[&<>'"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char])); }
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
