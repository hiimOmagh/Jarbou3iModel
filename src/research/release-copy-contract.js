(function(global){
  'use strict';
  global.Jarbou3iResearchReleaseCopyContract = Object.freeze({
    version: '1.4.0-alpha.34',
    publicVersionLabels: Object.freeze({
      en: 'v1.4.0-alpha.34 Adapter Replay Review Pack Triage Workbench',
      ar: 'v1.4.0-alpha.34 منضدة فرز حزمة مراجعة إعادة التشغيل',
      fr: 'v1.4.0-alpha.34 Workbench de triage du pack de revue de rejeu'
    }),
    requiredVisibleText: Object.freeze({
      en: Object.freeze([
        'Adapter Replay Review Pack Triage Workbench',
        'triage workbench',
        'batch status',
        'no live provider calls'
      ]),
      ar: Object.freeze([
        'منضدة فرز حزمة مراجعة إعادة التشغيل',
        'بطاقات الفرز',
        'ملخص الفرز الجاهز للتصدير',
        'دون نداءات مزوّد حية'
      ]),
      fr: Object.freeze([
        'Workbench de triage du pack de revue de rejeu',
        'cartes de triage',
        'résumé de triage prêt pour export',
        'aucun appel fournisseur réel'
      ])
    }),
    staleVisibleText: Object.freeze([
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
        alphaBadge: 'v1.4.0-alpha.34 Adapter Replay Review Pack Triage Workbench · Batch Triage',
        hostedDemoVerificationBody: 'Adapter Replay Review Pack Triage Workbench is ready for release evidence: this triage workbench groups decision-queue items into manual triage batches, exposes batch status, blocker types, inline trace previews, fixture-only review history, filters, sorting, triage cards, and export-ready triage summaries without changing provider execution. Hosted evidence must report 1.4.0-alpha.34 internally while showing v1.4.0-alpha.34 Adapter Replay Review Pack Triage Workbench to users. Triage workbench only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, live source fetching, automatic verification, signoff, export lock, cryptographic signature claim, status persistence, or publication permission is enabled.',
        analysisReleaseNote: '1.4.0-alpha.34 adds a metadata-only triage workbench with batch triage, filters, inline trace preview, fixture-only review history, and export-ready triage summary while remaining no-network.',
        adapterReplayReviewPackPreviewTitle: 'Adapter Replay Review Pack Triage Workbench',
        adapterReplayReviewPackPreviewSubtitle: 'Group decision-queue items into manual batches, inspect inline trace previews, and export a triage summary before handoff.',
        adapterReplayReviewPackPreviewPolicyNote: 'Triage workbench only: metadata payloads do not execute providers, fetch sources, persist status, persist credentials, verify, sign off, lock exports, or publish.',
        adapterReplayOperatorWorkflowTitle: 'Adapter Replay Review Pack Triage Workbench',
        adapterReplayOperatorWorkflowSubtitle: 'Batch decision-queue items by blocker type, priority, evidence completeness, and recommended manual next action.',
        adapterReplayOperatorWorkflowPolicyNote: 'No-network triage workbench only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, source fetching, status persistence, automatic verification, signoff, export lock, or publication permission.'
      }),
      ar: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.34 منضدة فرز حزمة مراجعة إعادة التشغيل · فرز دفعي',
        hostedDemoVerificationBody: 'منضدة فرز حزمة مراجعة إعادة التشغيل جاهزة لأدلة الإصدار: تجمع عناصر قائمة القرارات في دفعات فرز يدوية وتعرض بطاقات الفرز وحالة الدفعة وأنواع العوائق ومعاينة تتبع داخلية وسجل مراجعة fixture فقط ومرشحات وترتيباً وملخص الفرز الجاهز للتصدير دون تغيير تنفيذ المزوّد. يجب أن تعلن أدلة الاستضافة داخلياً 1.4.0-alpha.34 مع عرض v1.4.0-alpha.34 منضدة فرز حزمة مراجعة إعادة التشغيل للمستخدمين. منضدة فرز بلا شبكة فقط: دون نداءات مزوّد حية، دون طلبات شبكة مخفية، دون OAuth/دورة رموز، دون تخزين بيانات اعتماد، دون جلب مصادر حي، ودون تحقق أو توقيع أو قفل أو حفظ حالة أو نشر آلي.',
        analysisReleaseNote: 'يضيف 1.4.0-alpha.34 منضدة فرز metadata فقط مع فرز دفعي ومرشحات ومعاينة تتبع داخلية وسجل مراجعة fixture فقط وملخص فرز جاهز للتصدير مع البقاء بلا شبكة.',
        adapterReplayReviewPackPreviewTitle: 'منضدة فرز حزمة مراجعة إعادة التشغيل',
        adapterReplayReviewPackPreviewSubtitle: 'اجمع عناصر قائمة القرارات في دفعات يدوية وراجع معاينات التتبع الداخلية وصدّر ملخص الفرز قبل التسليم.',
        adapterReplayReviewPackPreviewPolicyNote: 'منضدة فرز فقط: حمولات metadata لا تنفّذ مزوّدين ولا تجلب مصادر ولا تحفظ حالة أو بيانات اعتماد ولا تتحقق أو توقّع أو تقفل أو تنشر.',
        adapterReplayOperatorWorkflowTitle: 'منضدة فرز حزمة مراجعة إعادة التشغيل',
        adapterReplayOperatorWorkflowSubtitle: 'افرز عناصر قائمة القرارات حسب نوع العائق والأولوية واكتمال الأدلة والإجراء اليدوي التالي.',
        adapterReplayOperatorWorkflowPolicyNote: 'منضدة فرز بلا شبكة فقط: لا نداءات مزوّد حية ولا طلبات شبكة مخفية ولا OAuth/دورة رموز ولا تخزين بيانات اعتماد ولا جلب مصادر ولا حفظ حالة ولا تحقق أو توقيع أو قفل أو نشر آلي.'
      }),
      fr: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.34 Workbench de triage du pack de revue de rejeu · triage batch',
        hostedDemoVerificationBody: 'Workbench de triage du pack de revue de rejeu est prêt pour les preuves de release : il regroupe les éléments de file de décision en lots de triage manuel, expose cartes de triage, statut de lot, types de blocage, aperçu inline des traces, historique fixture-only, filtres, tri et résumé de triage prêt pour export, sans changer l’exécution fournisseur. Les preuves hébergées doivent annoncer 1.4.0-alpha.34 en interne tout en affichant v1.4.0-alpha.34 Workbench de triage du pack de revue de rejeu aux utilisateurs. Workbench de triage sans réseau uniquement : aucun appel fournisseur réel, requête réseau cachée, OAuth/cycle de token, persistance d’identifiants, fetch source live, vérification, visa, verrou d’export, persistance de statut ou permission de publication automatique.',
        analysisReleaseNote: '1.4.0-alpha.34 ajoute un workbench de triage metadata-only avec triage batch, filtres, aperçu inline des traces, historique fixture-only et résumé de triage prêt pour export, tout en restant sans réseau.',
        adapterReplayReviewPackPreviewTitle: 'Workbench de triage du pack de revue de rejeu',
        adapterReplayReviewPackPreviewSubtitle: 'Regroupez les éléments de file de décision en lots manuels, inspectez les aperçus de trace inline et exportez un résumé de triage avant handoff.',
        adapterReplayReviewPackPreviewPolicyNote: 'Workbench de triage uniquement : les payloads metadata n’exécutent aucun fournisseur, fetch, stockage de statut ou d’identifiants, vérification, visa, verrou ou publication.',
        adapterReplayOperatorWorkflowTitle: 'Workbench de triage du pack de revue de rejeu',
        adapterReplayOperatorWorkflowSubtitle: 'Triez les éléments de file de décision par type de blocage, priorité, complétude preuve et prochaine action manuelle recommandée.',
        adapterReplayOperatorWorkflowPolicyNote: 'Workbench de triage sans réseau uniquement : aucun appel fournisseur réel, requête réseau cachée, OAuth/cycle token, persistance d’identifiants, fetch source, statut persistant, vérification, visa, verrou ou publication.'
      })
    })
  });
})(typeof window !== 'undefined' ? window : globalThis);
