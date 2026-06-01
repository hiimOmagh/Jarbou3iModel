(function(global){
  'use strict';
  global.Jarbou3iResearchReleaseCopyContract = Object.freeze({
    version: '1.4.0-alpha.35',
    publicVersionLabels: Object.freeze({
      en: 'v1.4.0-alpha.35 Adapter Replay Review Pack Handoff Dossier',
      ar: 'v1.4.0-alpha.35 ملف تسليم حزمة مراجعة إعادة التشغيل',
      fr: 'v1.4.0-alpha.35 Dossier de handoff du pack de revue de rejeu'
    }),
    requiredVisibleText: Object.freeze({
      en: Object.freeze([
        'Adapter Replay Review Pack Handoff Dossier',
        'handoff dossier',
        'blocker appendix',
        'no live provider calls'
      ]),
      ar: Object.freeze([
        'ملف تسليم حزمة مراجعة إعادة التشغيل',
        'ملف التسليم',
        'ملحق العوائق',
        'دون نداءات مزوّد حية'
      ]),
      fr: Object.freeze([
        'Dossier de handoff du pack de revue de rejeu',
        'dossier de handoff',
        'annexe des blocages',
        'aucun appel fournisseur réel'
      ])
    }),
    staleVisibleText: Object.freeze([
      'v1.4.0-alpha.34 Adapter Replay Review Pack Triage Workbench',
      'v1.4.0-alpha.34 منضدة فرز حزمة مراجعة إعادة التشغيل',
      'v1.4.0-alpha.34 Workbench de triage du pack de revue de rejeu',
      'v1.4.0-alpha.33 Adapter Replay Review Pack Decision Queue',
      'v1.4.0-alpha.33 قائمة قرارات حزمة مراجعة إعادة التشغيل',
      'v1.4.0-alpha.33 File de décision du pack de revue de rejeu',
      'v1.4.0-alpha.32 Adapter Replay Review Pack Evidence Trace Reader',
      'v1.4.0-alpha.32 قارئ تتبع الأدلة لحزمة مراجعة إعادة التشغيل',
      'v1.4.0-alpha.32 Lecteur de traces preuve du pack de revue de rejeu',
      'v1.4.0-alpha.31 Adapter Replay Review Pack Operator Workflow Polish',
      'v1.4.0-alpha.31 صقل سير عمل المشغّل لحزمة مراجعة إعادة التشغيل',
      'v1.4.0-alpha.31 Polish workflow opérateur du pack de revue de rejeu',
      'v1.4.0-alpha.30 Release Identity Single Source Contract',
      'v1.4.0-alpha.30 عقد هوية الإصدار من مصدر واحد',
      'v1.4.0-alpha.30 Contrat source unique d’identité de release',
      'v1.4.0-alpha.29 Adapter Replay Review Pack UI Polish + Export Preview',
      'v1.4.0-alpha.29 صقل واجهة حزمة المراجعة + معاينة التصدير',
      'v1.4.0-alpha.29 Polish UI du pack de revue + aperçu export',
      'v1.4.0-alpha.28 Adapter Replay Review Pack + Operator Handoff Export',
      'v1.4.0-alpha.27 Adapter Replay Decision Drilldown + Evidence Trace Links',
      'النموذج الأولي المحدود للتنفيذ الحي اليدوي جاهز لأدلة الإصدار',
      'قمرة أمان التنفيذ اليدوي + سجل الجلسة جاهزة لأدلة الإصدار',
      'صندوق رمل محوّل المزوّد اليدوي + عقد الاستدعاء العابر جاهز لأدلة الإصدار',
      'v1.4.0-alpha.26 Adapter Replay Insight UX + Operator Decision Surface'
    ]),
    copy: Object.freeze({
      en: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.35 Adapter Replay Review Pack Handoff Dossier · Handoff Dossier',
        hostedDemoVerificationBody: 'Adapter Replay Review Pack Handoff Dossier is ready for release evidence: it turns the triage workbench into a handoff dossier with dossier sections, batch triage snapshot, blocker appendix, evidence trace digest, operator checklist, and export-ready handoff summary without changing provider execution. Hosted evidence must report 1.4.0-alpha.35 internally while showing v1.4.0-alpha.35 Adapter Replay Review Pack Handoff Dossier to users. Handoff dossier only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, live source fetching, automatic verification, signoff, export lock, cryptographic signature claim, status persistence, or publication permission is enabled.',
        analysisReleaseNote: '1.4.0-alpha.35 adds a metadata-only handoff dossier with dossier sections, batch triage snapshot, blocker appendix, evidence trace digest, operator checklist, and export-ready handoff summary while remaining no-network.',
        adapterReplayReviewPackPreviewTitle: 'Adapter Replay Review Pack Handoff Dossier',
        adapterReplayReviewPackPreviewSubtitle: 'Turn triage batches into a manual handoff dossier with blocker appendix, evidence trace digest, and export-ready summary.',
        adapterReplayReviewPackPreviewPolicyNote: 'Handoff dossier only: metadata payloads do not execute providers, fetch sources, persist status, persist credentials, verify, sign off, lock exports, or publish.',
        adapterReplayOperatorWorkflowTitle: 'Adapter Replay Review Pack Handoff Dossier',
        adapterReplayOperatorWorkflowSubtitle: 'Assemble dossier sections, blocker appendix, trace digest, checklist, and manual handoff copy from review-pack triage data.',
        adapterReplayOperatorWorkflowPolicyNote: 'No-network handoff dossier only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, source fetching, status persistence, automatic verification, signoff, export lock, or publication permission.'
      }),
      ar: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.35 ملف تسليم حزمة مراجعة إعادة التشغيل · ملف التسليم',
        hostedDemoVerificationBody: 'ملف تسليم حزمة مراجعة إعادة التشغيل جاهز لأدلة الإصدار: يحوّل منضدة الفرز إلى ملف التسليم مع أقسام الملف ولقطة الفرز الدفعي وملحق العوائق وملخص تتبع الأدلة وقائمة فحص المشغّل وملخص تسليم جاهز للتصدير دون تغيير تنفيذ المزوّد. يجب أن تعلن أدلة الاستضافة داخلياً 1.4.0-alpha.35 مع عرض v1.4.0-alpha.35 ملف تسليم حزمة مراجعة إعادة التشغيل للمستخدمين. ملف تسليم بلا شبكة فقط: دون نداءات مزوّد حية، دون طلبات شبكة مخفية، دون OAuth/دورة رموز، دون تخزين بيانات اعتماد، دون جلب مصادر حي، ودون تحقق أو توقيع أو قفل أو حفظ حالة أو نشر آلي.',
        analysisReleaseNote: 'يضيف 1.4.0-alpha.35 ملف تسليم metadata فقط مع أقسام الملف ولقطة الفرز الدفعي وملحق العوائق وملخص تتبع الأدلة وقائمة فحص المشغّل وملخص تسليم جاهز للتصدير مع البقاء بلا شبكة.',
        adapterReplayReviewPackPreviewTitle: 'ملف تسليم حزمة مراجعة إعادة التشغيل',
        adapterReplayReviewPackPreviewSubtitle: 'حوّل دفعات الفرز إلى ملف التسليم اليدوي مع ملحق العوائق وملخص تتبع الأدلة وملخص جاهز للتصدير.',
        adapterReplayReviewPackPreviewPolicyNote: 'ملف تسليم فقط: حمولات metadata لا تنفّذ مزوّدين ولا تجلب مصادر ولا تحفظ حالة أو بيانات اعتماد ولا تتحقق أو توقّع أو تقفل أو تنشر.',
        adapterReplayOperatorWorkflowTitle: 'ملف تسليم حزمة مراجعة إعادة التشغيل',
        adapterReplayOperatorWorkflowSubtitle: 'اجمع أقسام الملف وملحق العوائق وملخص التتبع وقائمة الفحص ونسخة التسليم اليدوية من بيانات فرز حزمة المراجعة.',
        adapterReplayOperatorWorkflowPolicyNote: 'ملف تسليم بلا شبكة فقط: لا نداءات مزوّد حية ولا طلبات شبكة مخفية ولا OAuth/دورة رموز ولا تخزين بيانات اعتماد ولا جلب مصادر ولا حفظ حالة ولا تحقق أو توقيع أو قفل أو نشر آلي.'
      }),
      fr: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.35 Dossier de handoff du pack de revue de rejeu · dossier de handoff',
        hostedDemoVerificationBody: 'Dossier de handoff du pack de revue de rejeu est prêt pour les preuves de release : il transforme le workbench de triage en dossier de handoff avec sections du dossier, instantané de triage batch, annexe des blocages, digest de traces preuve, checklist opérateur et résumé de handoff prêt pour export, sans changer l’exécution fournisseur. Les preuves hébergées doivent annoncer 1.4.0-alpha.35 en interne tout en affichant v1.4.0-alpha.35 Dossier de handoff du pack de revue de rejeu aux utilisateurs. Dossier de handoff sans réseau uniquement : aucun appel fournisseur réel, requête réseau cachée, OAuth/cycle token, persistance d’identifiants, fetch source live, vérification, visa, verrou d’export, persistance de statut ou permission de publication automatique.',
        analysisReleaseNote: '1.4.0-alpha.35 ajoute un dossier de handoff metadata-only avec sections du dossier, instantané de triage batch, annexe des blocages, digest de traces preuve, checklist opérateur et résumé de handoff prêt pour export, tout en restant sans réseau.',
        adapterReplayReviewPackPreviewTitle: 'Dossier de handoff du pack de revue de rejeu',
        adapterReplayReviewPackPreviewSubtitle: 'Transformez les lots de triage en dossier de handoff manuel avec annexe des blocages, digest des traces et résumé prêt pour export.',
        adapterReplayReviewPackPreviewPolicyNote: 'Dossier de handoff uniquement : les payloads metadata n’exécutent aucun fournisseur, fetch, stockage de statut ou d’identifiants, vérification, visa, verrou ou publication.',
        adapterReplayOperatorWorkflowTitle: 'Dossier de handoff du pack de revue de rejeu',
        adapterReplayOperatorWorkflowSubtitle: 'Assemblez sections du dossier, annexe des blocages, digest des traces, checklist et copie de handoff manuel depuis les données de triage du pack de revue.',
        adapterReplayOperatorWorkflowPolicyNote: 'Dossier de handoff sans réseau uniquement : aucun appel fournisseur réel, requête réseau cachée, OAuth/cycle token, persistance d’identifiants, fetch source, statut persistant, vérification, visa, verrou ou publication.'
      })
    })
  });
})(typeof window !== 'undefined' ? window : globalThis);
