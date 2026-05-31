(function(global){
  'use strict';
  global.Jarbou3iResearchReleaseCopyContract = Object.freeze({
    version: '1.4.0-alpha.28',
    publicVersionLabels: Object.freeze({
      en: 'v1.4.0-alpha.28 Adapter Replay Review Pack + Operator Handoff Export',
      ar: 'v1.4.0-alpha.28 حزمة مراجعة إعادة التشغيل + تصدير تسليم المشغّل',
      fr: 'v1.4.0-alpha.28 Pack de revue de rejeu + export de handoff opérateur'
    }),
    requiredVisibleText: Object.freeze({
      en: Object.freeze([
        'Adapter Replay Review Pack + Operator Handoff Export',
        'review pack',
        'handoff export',
        'evidence trace bundle',
        'no live provider calls'
      ]),
      ar: Object.freeze([
        'حزمة مراجعة إعادة التشغيل + تصدير تسليم المشغّل',
        'حزمة المراجعة',
        'تصدير التسليم',
        'حزمة تتبع الأدلة',
        'دون نداءات مزوّد حية'
      ]),
      fr: Object.freeze([
        'Pack de revue de rejeu + export de handoff opérateur',
        'pack de revue',
        'export de handoff',
        'lot de traces preuve',
        'aucun appel fournisseur réel'
      ])
    }),
    staleVisibleText: Object.freeze([
      'v1.4.0-alpha.27 Adapter Replay Decision Drilldown + Evidence Trace Links',
      'v1.4.0-alpha.27 تفصيل قرار إعادة التشغيل وروابط تتبع الأدلة',
      'v1.4.0-alpha.27 Drilldown de décision de rejeu + liens de trace preuve',
      'v1.4.0-alpha.26 Adapter Replay Insight UX + Operator Decision Surface',
      'v1.4.0-alpha.26 رؤى إعادة تشغيل المحوّل وسطح قرار المشغّل',
      'v1.4.0-alpha.26 Insights de rejeu adaptateur + surface de décision opérateur',
      'v1.4.0-alpha.25 Release System Consolidation + Effective Diff Guard',
      'v1.4.0-alpha.24 Changed-Files Patch Hygiene Guard',
      'Alpha.23 Lock Completion + Changed-Files Patch Hygiene Guard',
      'النموذج الأولي المحدود للتنفيذ الحي اليدوي جاهز لأدلة الإصدار',
      'قمرة أمان التنفيذ اليدوي + سجل الجلسة جاهزة لأدلة الإصدار',
      'صندوق رمل محوّل المزوّد اليدوي + عقد الاستدعاء العابر جاهز لأدلة الإصدار'
    ]),
    copy: Object.freeze({
      en: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.28 Adapter Replay Review Pack + Operator Handoff Export · No-Network Review Pack',
        hostedDemoVerificationBody: 'Adapter Replay Review Pack + Operator Handoff Export is ready for release evidence: it turns the alpha.27 trace links into a review pack, handoff export, required operator actions, and evidence trace bundle without changing provider execution. Hosted evidence must report 1.4.0-alpha.28 internally while showing v1.4.0-alpha.28 Adapter Replay Review Pack + Operator Handoff Export to users. No-network review pack only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, live source fetching, automatic verification, signoff, export lock, cryptographic signature claim, or publication permission is enabled.',
        analysisReleaseNote: '1.4.0-alpha.28 adds a metadata-only adapter replay review pack, handoff export payload, required action list, and evidence trace bundle while remaining no-network.',
        adapterReplayInsightTitle: 'Adapter Replay Insight UX + Operator Decision Surface',
        adapterReplayInsightSubtitle: 'Summarize replay coverage, gap groups, review-required cells, and operator readiness from the deterministic adapter replay corpus.',
        adapterReplayInsightPolicyNote: 'No-network insight layer only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, source fetching, automatic verification, signoff, export lock, or publication permission.',
        adapterReplayDrilldownTitle: 'Adapter Replay Decision Drilldown + Evidence Trace Links',
        adapterReplayDrilldownSubtitle: 'Open replay verdicts into fixture links, policy rows, evidence trace links, blocker explanations, and operator checklist items.',
        adapterReplayDrilldownPolicyNote: 'No-network drilldown only: trace links are metadata references and never execute providers, fetch sources, store credentials, sign off, lock exports, or publish.',
        adapterReplayReviewPackTitle: 'Adapter Replay Review Pack + Operator Handoff Export',
        adapterReplayReviewPackSubtitle: 'Convert replay trace links into a review pack, handoff export payload, required actions, and evidence trace bundle for manual operator review.',
        adapterReplayReviewPackPolicyNote: 'No-network review pack only: export payloads are metadata summaries and never execute providers, fetch sources, store credentials, sign off, lock exports, or publish.'
      }),
      ar: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.28 حزمة مراجعة إعادة التشغيل + تصدير تسليم المشغّل · حزمة مراجعة بلا شبكة',
        hostedDemoVerificationBody: 'حزمة مراجعة إعادة التشغيل + تصدير تسليم المشغّل جاهزة لأدلة الإصدار: تحوّل روابط تتبع alpha.27 إلى حزمة المراجعة وتصدير التسليم وإجراءات المشغّل المطلوبة وحزمة تتبع الأدلة دون تغيير تنفيذ المزوّد. يجب أن تعلن أدلة الاستضافة داخلياً 1.4.0-alpha.28 مع عرض v1.4.0-alpha.28 حزمة مراجعة إعادة التشغيل + تصدير تسليم المشغّل للمستخدمين. حزمة مراجعة بلا شبكة فقط: دون نداءات مزوّد حية، دون طلبات شبكة مخفية، دون OAuth/دورة رموز، دون تخزين بيانات اعتماد، دون جلب مصادر حي، ودون تحقق أو توقيع أو قفل أو نشر آلي.',
        analysisReleaseNote: 'يضيف 1.4.0-alpha.28 حزمة مراجعة metadata فقط، وتصدير تسليم، وقائمة إجراءات مطلوبة، وحزمة تتبع الأدلة مع البقاء بلا شبكة.',
        adapterReplayInsightTitle: 'رؤى إعادة تشغيل المحوّل وسطح قرار المشغّل',
        adapterReplayInsightSubtitle: 'تلخّص تغطية إعادة التشغيل، فجوات التغطية، الخلايا التي تحتاج مراجعة، وجاهزية قرار المشغّل من corpus محلي حتمي.',
        adapterReplayInsightPolicyNote: 'طبقة رؤى بلا شبكة فقط: لا نداءات مزوّد حية ولا طلبات شبكة مخفية ولا OAuth/دورة رموز ولا تخزين بيانات اعتماد ولا جلب مصادر ولا تحقق أو توقيع أو قفل أو نشر آلي.',
        adapterReplayDrilldownTitle: 'تفصيل قرار إعادة التشغيل وروابط تتبع الأدلة',
        adapterReplayDrilldownSubtitle: 'افتح أحكام إعادة التشغيل إلى روابط fixtures وصفوف السياسة وروابط تتبع الأدلة وتفسيرات العوائق وقائمة المشغّل.',
        adapterReplayDrilldownPolicyNote: 'تفصيل بلا شبكة فقط: روابط التتبع مراجع metadata ولا تنفّذ مزوّدين ولا تجلب مصادر ولا تخزّن بيانات اعتماد ولا توقّع أو تقفل أو تنشر.',
        adapterReplayReviewPackTitle: 'حزمة مراجعة إعادة التشغيل + تصدير تسليم المشغّل',
        adapterReplayReviewPackSubtitle: 'حوّل روابط تتبع إعادة التشغيل إلى حزمة المراجعة وتصدير التسليم وإجراءات مطلوبة وحزمة تتبع الأدلة لمراجعة المشغّل اليدوية.',
        adapterReplayReviewPackPolicyNote: 'حزمة مراجعة بلا شبكة فقط: حمولات التصدير ملخصات metadata ولا تنفّذ مزوّدين ولا تجلب مصادر ولا تخزّن بيانات اعتماد ولا توقّع أو تقفل أو تنشر.'
      }),
      fr: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.28 Pack de revue de rejeu + export de handoff opérateur · pack sans réseau',
        hostedDemoVerificationBody: 'Pack de revue de rejeu + export de handoff opérateur est prêt pour les preuves de release : il transforme les liens de trace alpha.27 en pack de revue, export de handoff, actions opérateur requises et lot de traces preuve, sans changer l’exécution fournisseur. Les preuves hébergées doivent annoncer 1.4.0-alpha.28 en interne tout en affichant v1.4.0-alpha.28 Pack de revue de rejeu + export de handoff opérateur aux utilisateurs. Pack de revue sans réseau uniquement : aucun appel fournisseur réel, requête réseau cachée, OAuth/cycle de token, persistance d’identifiants, fetch source live, vérification, visa, verrou d’export ou permission de publication automatique.',
        analysisReleaseNote: '1.4.0-alpha.28 ajoute un pack de revue metadata, un export de handoff, une liste d’actions requises et un lot de traces preuve, tout en restant sans réseau.',
        adapterReplayInsightTitle: 'Insights de rejeu adaptateur + surface de décision opérateur',
        adapterReplayInsightSubtitle: 'Résume couverture de rejeu, groupes de lacunes, cellules à revoir et préparation opérateur depuis le corpus déterministe.',
        adapterReplayInsightPolicyNote: 'Couche d’insight sans réseau uniquement : aucun appel fournisseur live, appel réseau caché, OAuth/cycle token, persistance d’identifiants, fetch source, vérification, visa, verrou ou publication automatique.',
        adapterReplayDrilldownTitle: 'Drilldown de décision de rejeu + liens de trace preuve',
        adapterReplayDrilldownSubtitle: 'Ouvre les verdicts de rejeu vers liens de fixtures, lignes de politique, liens de trace preuve, explications de blocage et checklist opérateur.',
        adapterReplayDrilldownPolicyNote: 'Drilldown sans réseau uniquement : les liens de trace sont des références metadata et n’exécutent aucun fournisseur, fetch, stockage d’identifiants, visa, verrou ou publication.',
        adapterReplayReviewPackTitle: 'Pack de revue de rejeu + export de handoff opérateur',
        adapterReplayReviewPackSubtitle: 'Convertit les liens de trace de rejeu en pack de revue, export de handoff, actions requises et lot de traces preuve pour la revue opérateur manuelle.',
        adapterReplayReviewPackPolicyNote: 'Pack de revue sans réseau uniquement : les payloads d’export sont des résumés metadata et n’exécutent aucun fournisseur, fetch, stockage d’identifiants, visa, verrou ou publication.'
      })
    })
  });
})(typeof window !== 'undefined' ? window : globalThis);
