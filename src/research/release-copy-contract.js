(function(global){
  'use strict';
  global.Jarbou3iResearchReleaseCopyContract = Object.freeze({
    version: '1.4.0-alpha.33',
    publicVersionLabels: Object.freeze({
      en: 'v1.4.0-alpha.33 Adapter Replay Review Pack Decision Queue',
      ar: 'v1.4.0-alpha.33 قائمة قرارات حزمة مراجعة إعادة التشغيل',
      fr: 'v1.4.0-alpha.33 File de décision du pack de revue de rejeu'
    }),
    requiredVisibleText: Object.freeze({
      en: Object.freeze([
        'Adapter Replay Review Pack Decision Queue',
        'decision queue',
        'decision cards',
        'no live provider calls'
      ]),
      ar: Object.freeze([
        'قائمة قرارات حزمة مراجعة إعادة التشغيل',
        'بطاقات القرار',
        'ملخص القائمة الجاهز للتصدير',
        'دون نداءات مزوّد حية'
      ]),
      fr: Object.freeze([
        'File de décision du pack de revue de rejeu',
        'cartes de décision',
        'résumé de file prêt pour export',
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
      'v1.4.0-alpha.32 Adapter Replay Review Pack Evidence Trace Reader',
      'v1.4.0-alpha.32 قارئ تتبع الأدلة لحزمة مراجعة إعادة التشغيل',
      'v1.4.0-alpha.32 Lecteur de traces preuve du pack de revue de rejeu',
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
        alphaBadge: 'v1.4.0-alpha.33 Adapter Replay Review Pack Decision Queue · Decision Queue',
        hostedDemoVerificationBody: 'Adapter Replay Review Pack Decision Queue is ready for release evidence: it turns the review-pack workflow into decision cards, decision queue IDs, blocker summary, blocker reasons, recommended next action, and export-ready queue summary without changing provider execution. Hosted evidence must report 1.4.0-alpha.33 internally while showing v1.4.0-alpha.33 Adapter Replay Review Pack Decision Queue to users. Decision queue only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, live source fetching, automatic verification, signoff, export lock, cryptographic signature claim, or publication permission is enabled.',
        analysisReleaseNote: '1.4.0-alpha.33 adds a metadata-only decision queue with decision cards, blocker reasons, blocker summary, and export-ready queue copy while remaining no-network.',
        adapterReplayReviewPackPreviewTitle: 'Adapter Replay Review Pack Decision Queue',
        adapterReplayReviewPackPreviewSubtitle: 'Inspect decision cards, decision queue IDs, blocker reasons, blocker summary, and export-ready queue summary before handoff.',
        adapterReplayReviewPackPreviewPolicyNote: 'Decision queue only: metadata payloads do not execute providers, fetch sources, persist credentials, verify, sign off, lock exports, or publish.',
        adapterReplayOperatorWorkflowTitle: 'Adapter Replay Review Pack Decision Queue',
        adapterReplayOperatorWorkflowSubtitle: 'Read why review-pack decisions were made through decision cards, evidence links, missing-evidence state, and recommended manual next action.',
        adapterReplayOperatorWorkflowPolicyNote: 'No-network decision queue only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, source fetching, automatic verification, signoff, export lock, or publication permission.'
      }),
      ar: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.33 قائمة قرارات حزمة مراجعة إعادة التشغيل · قائمة القرارات',
        hostedDemoVerificationBody: 'قائمة قرارات حزمة مراجعة إعادة التشغيل جاهز لأدلة الإصدار: يحوّل سير حزمة المراجعة إلى بطاقات القرار ومعرّفات القرار وملخص العوائق وأسباب العوائق والإجراء التالي المقترح وملخص القائمة الجاهز للتصدير دون تغيير تنفيذ المزوّد. يجب أن تعلن أدلة الاستضافة داخلياً 1.4.0-alpha.33 مع عرض v1.4.0-alpha.33 قائمة قرارات حزمة مراجعة إعادة التشغيل للمستخدمين. قائمة قرارات بلا شبكة فقط: دون نداءات مزوّد حية، دون طلبات شبكة مخفية، دون OAuth/دورة رموز، دون تخزين بيانات اعتماد، دون جلب مصادر حي، ودون تحقق أو توقيع أو قفل أو نشر آلي.',
        analysisReleaseNote: 'يضيف 1.4.0-alpha.33 قائمة قرارات أدلة metadata فقط مع بطاقات القرار وأسباب العوائق وملخص العوائق ونسخة قائمة جاهزة للتصدير مع البقاء بلا شبكة.',
        adapterReplayReviewPackPreviewTitle: 'قائمة قرارات حزمة مراجعة إعادة التشغيل',
        adapterReplayReviewPackPreviewSubtitle: 'راجع بطاقات القرار ومعرّفات الأدلة وأسباب العوائق وحالة الأدلة الناقصة وملخص القائمة الجاهز للتصدير قبل التسليم.',
        adapterReplayReviewPackPreviewPolicyNote: 'قائمة قرارات فقط: حمولات metadata لا تنفّذ مزوّدين ولا تجلب مصادر ولا تخزّن بيانات اعتماد ولا تتحقق أو توقّع أو تقفل أو تنشر.',
        adapterReplayOperatorWorkflowTitle: 'قائمة قرارات حزمة مراجعة إعادة التشغيل',
        adapterReplayOperatorWorkflowSubtitle: 'اقرأ لماذا اتُّخذت قرارات حزمة المراجعة عبر بطاقات القرار وروابط الأدلة وحالة الأدلة الناقصة والإجراء اليدوي التالي.',
        adapterReplayOperatorWorkflowPolicyNote: 'قائمة قرارات بلا شبكة فقط: لا نداءات مزوّد حية ولا طلبات شبكة مخفية ولا OAuth/دورة رموز ولا تخزين بيانات اعتماد ولا جلب مصادر ولا تحقق أو توقيع أو قفل أو نشر آلي.'
      }),
      fr: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.33 File de décision du pack de revue de rejeu · file décision',
        hostedDemoVerificationBody: 'File de décision du pack de revue de rejeu est prêt pour les preuves de release : il transforme le workflow du pack de revue en cartes de décision, identifiants décision, résumé des bloqueurs, raisons de blocage, prochaine action recommandée et résumé de file prêt pour export, sans changer l’exécution fournisseur. Les preuves hébergées doivent annoncer 1.4.0-alpha.33 en interne tout en affichant v1.4.0-alpha.33 File de décision du pack de revue de rejeu aux utilisateurs. File de décision sans réseau uniquement : aucun appel fournisseur réel, requête réseau cachée, OAuth/cycle de token, persistance d’identifiants, fetch source live, vérification, visa, verrou d’export ou permission de publication automatique.',
        analysisReleaseNote: '1.4.0-alpha.33 ajoute un lecteur de traces preuve metadata-only avec cartes de décision, raisons de blocage, résumé des bloqueurs et copie de file prête pour export, tout en restant sans réseau.',
        adapterReplayReviewPackPreviewTitle: 'File de décision du pack de revue de rejeu',
        adapterReplayReviewPackPreviewSubtitle: 'Inspectez cartes de décision, identifiants preuve, raisons de blocage, état des preuves manquantes et résumé de file prêt pour export avant handoff.',
        adapterReplayReviewPackPreviewPolicyNote: 'File de décision uniquement : les payloads metadata n’exécutent aucun fournisseur, fetch, stockage d’identifiants, vérification, visa, verrou ou publication.',
        adapterReplayOperatorWorkflowTitle: 'File de décision du pack de revue de rejeu',
        adapterReplayOperatorWorkflowSubtitle: 'Lisez pourquoi les décisions du pack de revue ont été prises via cartes de décision, liens preuve, état des preuves manquantes et prochaine action manuelle.',
        adapterReplayOperatorWorkflowPolicyNote: 'File de décision sans réseau uniquement : aucun appel fournisseur réel, requête réseau cachée, OAuth/cycle token, persistance d’identifiants, fetch source, vérification, visa, verrou ou publication.'
      })
    })
  });
})(typeof window !== 'undefined' ? window : globalThis);
