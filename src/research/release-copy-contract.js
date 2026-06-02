/* Jarbou3i Research Engine release copy contract v1.4.0-alpha.39. */
(function(global){
  'use strict';
  const contract = Object.freeze({
    version: '1.4.0-alpha.39',
    publicVersionLabels: Object.freeze({
      en: 'v1.4.0-alpha.39 Source-to-Brief Operator Control Room',
      ar: 'v1.4.0-alpha.39 غرفة تحكم المشغّل من المصدر إلى الموجز',
      fr: 'v1.4.0-alpha.39 Salle de contrôle opérateur source-vers-brief'
    }),
    expectedCurrentReleaseDescriptionTokens: Object.freeze({
      en: Object.freeze(['Source-to-Brief Operator Control Room','operator control room','stage board','intervention lanes','no live provider calls']),
      ar: Object.freeze(['غرفة تحكم المشغّل','لوحة المراحل','مسارات التدخل','دون نداءات مزوّد حية']),
      fr: Object.freeze(['Salle de contrôle opérateur','tableau des étapes','couloirs d’intervention','aucun appel fournisseur réel'])
    }),
    staleCurrentReleaseDescriptionTokens: Object.freeze(["v1.4.0-alpha.38 Console de continuité opérateur source-vers-brief", "v1.4.0-alpha.38 وحدة استمرارية المشغّل من المصدر إلى الموجز", "v1.4.0-alpha.38 — Source-to-Brief Operator Continuity Console", "v1.4.0-alpha.38 Source-to-Brief Operator Continuity Console", 'صندوق رمل محوّل المزوّد اليدوي + عقد الاستدعاء العابر جاهز لأدلة الإصدار', 'قمرة أمان التنفيذ اليدوي + سجل الجلسة جاهزة لأدلة الإصدار', 'النموذج الأولي المحدود للتنفيذ الحي اليدوي جاهز لأدلة الإصدار', "v1.4.0-alpha.36 Adapter Replay Review Pack Operator Review Console", "v1.4.0-alpha.36 وحدة مراجعة المشغّل لحزمة مراجعة إعادة التشغيل", "v1.4.0-alpha.36 Console de revue opérateur du pack de revue de rejeu", "v1.4.0-alpha.35 Dossier de handoff du pack de revue de rejeu", "v1.4.0-alpha.35 ملف تسليم حزمة مراجعة إعادة التشغيل", "v1.4.0-alpha.35 Adapter Replay Review Pack Handoff Dossier", "v1.4.0-alpha.34 Workbench de triage du pack de revue de rejeu", "v1.4.0-alpha.34 منضدة فرز حزمة مراجعة إعادة التشغيل", "v1.4.0-alpha.34 Adapter Replay Review Pack Triage Workbench", "v1.4.0-alpha.32 Lecteur de traces preuve du pack de revue de rejeu", "v1.4.0-alpha.32 قارئ تتبع الأدلة لحزمة مراجعة إعادة التشغيل", "v1.4.0-alpha.32 Adapter Replay Review Pack Evidence Trace Reader", "v1.4.0-alpha.33 File de décision du pack de revue de rejeu", "v1.4.0-alpha.33 قائمة قرارات حزمة مراجعة إعادة التشغيل", "v1.4.0-alpha.33 Adapter Replay Review Pack Decision Queue", "v1.4.0-alpha.30 Release Identity Single Source Contract", "v1.4.0-alpha.30 عقد هوية الإصدار من مصدر واحد", "v1.4.0-alpha.30 Contrat source unique d’identité de release", "v1.4.0-alpha.29 Adapter Replay Review Pack UI Polish + Export Preview", "v1.4.0-alpha.29 صقل واجهة حزمة المراجعة + معاينة التصدير", "v1.4.0-alpha.29 Polish UI du pack de revue + aperçu export", "v1.4.0-alpha.28 Adapter Replay Review Pack + Operator Handoff Export", "v1.4.0-alpha.27 Adapter Replay Decision Drilldown + Evidence Trace Links", "v1.4.0-alpha.26 Adapter Replay Insight UX + Operator Decision Surface", "v1.4.0-alpha.25 Release System Consolidation + Effective Diff Guard", "v1.4.0-alpha.37 Adapter Replay Review Pack Compact Navigation UX", "v1.4.0-alpha.37 — Adapter Replay Review Pack Compact Navigation UX", "v1.4.0-alpha.37 تجربة التنقل المختصر لحزمة مراجعة إعادة التشغيل", "v1.4.0-alpha.37 UX de navigation compacte du pack de revue de rejeu", ]),
    copy: Object.freeze({
      en: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.39 Source-to-Brief Operator Control Room · operator control room',
        hostedDemoVerificationBody: 'Source-to-Brief Operator Control Room is ready for release evidence: it consolidates the continuity console into a manual stage board, intervention lanes, blocker register, readiness scorecard, operator runbook, and export-ready control-room summary without changing provider execution. Hosted evidence must report 1.4.0-alpha.39 internally while showing v1.4.0-alpha.39 Source-to-Brief Operator Control Room to users. Operator control room only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, live source fetching, automatic verification, signoff, export lock, status persistence, batch mutation, navigation-state persistence, cryptographic signature claim, or publication permission is enabled.',
        analysisReleaseNote: '1.4.0-alpha.39 adds a metadata-only source-to-brief operator control room with stage board, intervention lanes, blockers, readiness scorecard, runbook, and export summary while remaining no-network.',
        adapterReplayReviewPackPreviewTitle: 'Source-to-Brief Operator Control Room',
        adapterReplayReviewPackPreviewBody: 'Control room view: stage board, intervention lanes, blocker register, readiness scorecard, operator runbook, export summary, no live provider calls.',
        adapterReplayOperatorWorkflowTitle: 'Source-to-Brief Operator Control Room',
        adapterReplayOperatorWorkflowBody: 'Manual operator control room for source-to-brief continuity. Metadata-only. No automatic verification, signoff, export lock, or publication permission.'
      }),
      ar: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.39 غرفة تحكم المشغّل من المصدر إلى الموجز · غرفة تحكم المشغّل',
        hostedDemoVerificationBody: 'غرفة تحكم المشغّل من المصدر إلى الموجز جاهزة لأدلة الإصدار: تجمع وحدة الاستمرارية في لوحة المراحل ومسارات التدخل وسجل العوائق وبطاقة الجاهزية ودليل تشغيل المشغّل وملخص غرفة التحكم الجاهز للتصدير دون تغيير تنفيذ المزوّد. يجب أن تعلن أدلة الاستضافة داخلياً 1.4.0-alpha.39 مع عرض v1.4.0-alpha.39 غرفة تحكم المشغّل من المصدر إلى الموجز للمستخدمين. غرفة تحكم المشغّل بلا شبكة فقط: دون نداءات مزوّد حية، دون طلبات شبكة مخفية، دون OAuth أو دورة رموز، دون تخزين بيانات اعتماد، دون جلب مصادر حي، ودون تحقق أو توقيع أو قفل تصدير أو حفظ حالة أو تعديل دفعات أو حفظ حالة التنقل أو نشر آلي.',
        analysisReleaseNote: 'يضيف 1.4.0-alpha.39 غرفة تحكم metadata فقط مع لوحة المراحل ومسارات التدخل وسجل العوائق وبطاقة الجاهزية ودليل التشغيل وملخص التصدير مع البقاء بلا شبكة.',
        adapterReplayReviewPackPreviewTitle: 'غرفة تحكم المشغّل من المصدر إلى الموجز',
        adapterReplayReviewPackPreviewBody: 'عرض غرفة التحكم: لوحة المراحل، مسارات التدخل، سجل العوائق، بطاقة الجاهزية، دليل تشغيل المشغّل، ملخص التصدير، دون نداءات مزوّد حية.',
        adapterReplayOperatorWorkflowTitle: 'غرفة تحكم المشغّل من المصدر إلى الموجز',
        adapterReplayOperatorWorkflowBody: 'غرفة تحكم يدوية لاستمرارية المصدر إلى الموجز. metadata فقط. دون تحقق آلي أو اعتماد أو قفل تصدير أو تصريح نشر.'
      }),
      fr: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.39 Salle de contrôle opérateur source-vers-brief · salle de contrôle opérateur',
        hostedDemoVerificationBody: 'Salle de contrôle opérateur source-vers-brief est prête pour les preuves de release : elle consolide la console de continuité en tableau des étapes, couloirs d’intervention, registre des bloqueurs, scorecard de préparation, runbook opérateur et résumé de salle de contrôle prêt pour export sans changer l’exécution fournisseur. Les preuves hébergées doivent annoncer 1.4.0-alpha.39 en interne tout en affichant v1.4.0-alpha.39 Salle de contrôle opérateur source-vers-brief aux utilisateurs. Salle de contrôle opérateur sans réseau uniquement : aucun appel fournisseur réel, requête réseau cachée, OAuth/cycle token, persistance d’identifiants, fetch source live, vérification, visa, verrou d’export, persistance de statut, mutation batch, persistance d’état de navigation, signature cryptographique ou permission de publication automatique.',
        analysisReleaseNote: '1.4.0-alpha.39 ajoute une salle de contrôle metadata-only avec tableau des étapes, couloirs d’intervention, bloqueurs, scorecard, runbook et résumé export, tout en restant sans réseau.',
        adapterReplayReviewPackPreviewTitle: 'Salle de contrôle opérateur source-vers-brief',
        adapterReplayReviewPackPreviewBody: 'Vue salle de contrôle : tableau des étapes, couloirs d’intervention, registre des bloqueurs, scorecard, runbook opérateur, résumé export, aucun appel fournisseur réel.',
        adapterReplayOperatorWorkflowTitle: 'Salle de contrôle opérateur source-vers-brief',
        adapterReplayOperatorWorkflowBody: 'Salle de contrôle manuelle pour la continuité source-vers-brief. Metadata only. Aucun auto-contrôle, visa, verrou export ou permission publication.'
      })
    })
  });
  global.Jarbou3iResearchReleaseCopyContract = contract;
})(typeof window !== 'undefined' ? window : globalThis);
