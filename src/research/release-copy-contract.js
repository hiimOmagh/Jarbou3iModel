(function(global){
  'use strict';
  global.Jarbou3iResearchReleaseCopyContract = Object.freeze({
    version: '1.4.0-alpha.32',
    publicVersionLabels: Object.freeze({
      en: 'v1.4.0-alpha.32 Adapter Replay Review Pack Evidence Trace Reader',
      ar: 'v1.4.0-alpha.32 قارئ تتبع الأدلة لحزمة مراجعة إعادة التشغيل',
      fr: 'v1.4.0-alpha.32 Lecteur de traces preuve du pack de revue de rejeu'
    }),
    requiredVisibleText: Object.freeze({
      en: Object.freeze([
        'Adapter Replay Review Pack Evidence Trace Reader',
        'evidence trace reader',
        'trace cards',
        'no live provider calls'
      ]),
      ar: Object.freeze([
        'قارئ تتبع الأدلة لحزمة مراجعة إعادة التشغيل',
        'بطاقات التتبع',
        'ملخص التتبع الجاهز للتصدير',
        'دون نداءات مزوّد حية'
      ]),
      fr: Object.freeze([
        'Lecteur de traces preuve du pack de revue de rejeu',
        'cartes de trace',
        'résumé de trace prêt pour export',
        'aucun appel fournisseur réel'
      ])
    }),
    staleVisibleText: Object.freeze([
      'صندوق رمل محوّل المزوّد اليدوي + عقد الاستدعاء العابر جاهز لأدلة الإصدار',
      'قمرة أمان التنفيذ اليدوي + سجل الجلسة جاهزة لأدلة الإصدار',
      'النموذج الأولي المحدود للتنفيذ الحي اليدوي جاهز لأدلة الإصدار',
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
      'v1.4.0-alpha.26 Adapter Replay Insight UX + Operator Decision Surface'
    ]),
    copy: Object.freeze({
      en: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.32 Adapter Replay Review Pack Evidence Trace Reader · Evidence Trace Reader',
        hostedDemoVerificationBody: 'Adapter Replay Review Pack Evidence Trace Reader is ready for release evidence: it turns the review-pack workflow into trace cards, evidence trace IDs, missing-evidence summary, blocker reasons, recommended next action, and export-ready trace summary without changing provider execution. Hosted evidence must report 1.4.0-alpha.32 internally while showing v1.4.0-alpha.32 Adapter Replay Review Pack Evidence Trace Reader to users. Evidence trace reader only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, live source fetching, automatic verification, signoff, export lock, cryptographic signature claim, or publication permission is enabled.',
        analysisReleaseNote: '1.4.0-alpha.32 adds a metadata-only evidence trace reader with trace cards, blocker reasons, missing-evidence summary, and export-ready trace copy while remaining no-network.',
        adapterReplayReviewPackPreviewTitle: 'Adapter Replay Review Pack Evidence Trace Reader',
        adapterReplayReviewPackPreviewSubtitle: 'Inspect trace cards, evidence trace IDs, blocker reasons, missing-evidence summary, and export-ready trace summary before handoff.',
        adapterReplayReviewPackPreviewPolicyNote: 'Evidence trace reader only: metadata payloads do not execute providers, fetch sources, persist credentials, verify, sign off, lock exports, or publish.',
        adapterReplayOperatorWorkflowTitle: 'Adapter Replay Review Pack Evidence Trace Reader',
        adapterReplayOperatorWorkflowSubtitle: 'Read why review-pack decisions were made through trace cards, evidence links, missing-evidence state, and recommended manual next action.',
        adapterReplayOperatorWorkflowPolicyNote: 'No-network trace reader only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, source fetching, automatic verification, signoff, export lock, or publication permission.'
      }),
      ar: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.32 قارئ تتبع الأدلة لحزمة مراجعة إعادة التشغيل · قارئ التتبع',
        hostedDemoVerificationBody: 'قارئ تتبع الأدلة لحزمة مراجعة إعادة التشغيل جاهز لأدلة الإصدار: يحوّل سير حزمة المراجعة إلى بطاقات التتبع ومعرّفات تتبع الأدلة وملخص الأدلة الناقصة وأسباب العوائق والإجراء التالي المقترح وملخص التتبع الجاهز للتصدير دون تغيير تنفيذ المزوّد. يجب أن تعلن أدلة الاستضافة داخلياً 1.4.0-alpha.32 مع عرض v1.4.0-alpha.32 قارئ تتبع الأدلة لحزمة مراجعة إعادة التشغيل للمستخدمين. قارئ تتبع بلا شبكة فقط: دون نداءات مزوّد حية، دون طلبات شبكة مخفية، دون OAuth/دورة رموز، دون تخزين بيانات اعتماد، دون جلب مصادر حي، ودون تحقق أو توقيع أو قفل أو نشر آلي.',
        analysisReleaseNote: 'يضيف 1.4.0-alpha.32 قارئ تتبع أدلة metadata فقط مع بطاقات التتبع وأسباب العوائق وملخص الأدلة الناقصة ونسخة تتبع جاهزة للتصدير مع البقاء بلا شبكة.',
        adapterReplayReviewPackPreviewTitle: 'قارئ تتبع الأدلة لحزمة مراجعة إعادة التشغيل',
        adapterReplayReviewPackPreviewSubtitle: 'راجع بطاقات التتبع ومعرّفات الأدلة وأسباب العوائق وحالة الأدلة الناقصة وملخص التتبع الجاهز للتصدير قبل التسليم.',
        adapterReplayReviewPackPreviewPolicyNote: 'قارئ تتبع فقط: حمولات metadata لا تنفّذ مزوّدين ولا تجلب مصادر ولا تخزّن بيانات اعتماد ولا تتحقق أو توقّع أو تقفل أو تنشر.',
        adapterReplayOperatorWorkflowTitle: 'قارئ تتبع الأدلة لحزمة مراجعة إعادة التشغيل',
        adapterReplayOperatorWorkflowSubtitle: 'اقرأ لماذا اتُّخذت قرارات حزمة المراجعة عبر بطاقات التتبع وروابط الأدلة وحالة الأدلة الناقصة والإجراء اليدوي التالي.',
        adapterReplayOperatorWorkflowPolicyNote: 'قارئ تتبع بلا شبكة فقط: لا نداءات مزوّد حية ولا طلبات شبكة مخفية ولا OAuth/دورة رموز ولا تخزين بيانات اعتماد ولا جلب مصادر ولا تحقق أو توقيع أو قفل أو نشر آلي.'
      }),
      fr: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.32 Lecteur de traces preuve du pack de revue de rejeu · lecteur trace',
        hostedDemoVerificationBody: 'Lecteur de traces preuve du pack de revue de rejeu est prêt pour les preuves de release : il transforme le workflow du pack de revue en cartes de trace, identifiants de trace preuve, résumé de preuves manquantes, raisons de blocage, prochaine action recommandée et résumé de trace prêt pour export, sans changer l’exécution fournisseur. Les preuves hébergées doivent annoncer 1.4.0-alpha.32 en interne tout en affichant v1.4.0-alpha.32 Lecteur de traces preuve du pack de revue de rejeu aux utilisateurs. Lecteur de trace sans réseau uniquement : aucun appel fournisseur réel, requête réseau cachée, OAuth/cycle de token, persistance d’identifiants, fetch source live, vérification, visa, verrou d’export ou permission de publication automatique.',
        analysisReleaseNote: '1.4.0-alpha.32 ajoute un lecteur de traces preuve metadata-only avec cartes de trace, raisons de blocage, résumé de preuves manquantes et copie de trace prête pour export, tout en restant sans réseau.',
        adapterReplayReviewPackPreviewTitle: 'Lecteur de traces preuve du pack de revue de rejeu',
        adapterReplayReviewPackPreviewSubtitle: 'Inspectez cartes de trace, identifiants preuve, raisons de blocage, état des preuves manquantes et résumé de trace prêt pour export avant handoff.',
        adapterReplayReviewPackPreviewPolicyNote: 'Lecteur de trace uniquement : les payloads metadata n’exécutent aucun fournisseur, fetch, stockage d’identifiants, vérification, visa, verrou ou publication.',
        adapterReplayOperatorWorkflowTitle: 'Lecteur de traces preuve du pack de revue de rejeu',
        adapterReplayOperatorWorkflowSubtitle: 'Lisez pourquoi les décisions du pack de revue ont été prises via cartes de trace, liens preuve, état des preuves manquantes et prochaine action manuelle.',
        adapterReplayOperatorWorkflowPolicyNote: 'Lecteur de trace sans réseau uniquement : aucun appel fournisseur réel, requête réseau cachée, OAuth/cycle token, persistance d’identifiants, fetch source, vérification, visa, verrou ou publication.'
      })
    })
  });
})(typeof window !== 'undefined' ? window : globalThis);
