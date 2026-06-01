(function(global){
  'use strict';
  global.Jarbou3iResearchReleaseCopyContract = Object.freeze({
    version: '1.4.0-alpha.30',
    publicVersionLabels: Object.freeze({
      en: 'v1.4.0-alpha.30 Release Identity Single Source Contract',
      ar: 'v1.4.0-alpha.30 عقد هوية الإصدار من مصدر واحد',
      fr: 'v1.4.0-alpha.30 Contrat source unique d’identité de release'
    }),
    requiredVisibleText: Object.freeze({
      en: Object.freeze([
        'Release Identity Single Source Contract',
        'single identity contract',
        'no live provider calls'
      ]),
      ar: Object.freeze([
        'عقد هوية الإصدار من مصدر واحد',
        'عقد هوية واحد',
        'دون نداءات مزوّد حية'
      ]),
      fr: Object.freeze([
        'Contrat source unique d’identité de release',
        'contrat d’identité unique',
        'aucun appel fournisseur réel'
      ])
    }),
    staleVisibleText: Object.freeze([
      'صندوق رمل محوّل المزوّد اليدوي + عقد الاستدعاء العابر جاهز لأدلة الإصدار',
      'قمرة أمان التنفيذ اليدوي + سجل الجلسة جاهزة لأدلة الإصدار',
      'النموذج الأولي المحدود للتنفيذ الحي اليدوي جاهز لأدلة الإصدار',
      'v1.4.0-alpha.28 Adapter Replay Review Pack + Operator Handoff Export',
      'v1.4.0-alpha.28 حزمة مراجعة إعادة التشغيل + تصدير تسليم المشغّل',
      'v1.4.0-alpha.28 Pack de revue de rejeu + export de handoff opérateur',
      'v1.4.0-alpha.27 Adapter Replay Decision Drilldown + Evidence Trace Links',
      'v1.4.0-alpha.27 تفصيل قرار إعادة التشغيل وروابط تتبع الأدلة',
      'v1.4.0-alpha.27 Drilldown de décision de rejeu + liens de trace preuve',
      'v1.4.0-alpha.26 Adapter Replay Insight UX + Operator Decision Surface',
      'v1.4.0-alpha.25 Release System Consolidation + Effective Diff Guard',
      'v1.4.0-alpha.24 Changed-Files Patch Hygiene Guard'
    ]),
    copy: Object.freeze({
      en: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.30 Release Identity Single Source Contract · Identity Contract',
        hostedDemoVerificationBody: 'Release Identity Single Source Contract is ready for release evidence: it centralizes package, registry, evidence matrix, workflow, visible release labels, and runtime scope through a single identity contract without changing provider execution. Hosted evidence must report 1.4.0-alpha.30 internally while showing v1.4.0-alpha.30 Release Identity Single Source Contract to users. Single-source identity contract only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, live source fetching, automatic verification, signoff, export lock, cryptographic signature claim, or publication permission is enabled.',
        analysisReleaseNote: '1.4.0-alpha.30 centralizes release identity through one canonical contract while remaining no-network.',
        adapterReplayInsightTitle: 'Adapter Replay Insight UX + Operator Decision Surface',
        adapterReplayInsightSubtitle: 'Summarize replay coverage, gap groups, review-required cells, and operator readiness from the deterministic adapter replay corpus.',
        adapterReplayInsightPolicyNote: 'No-network insight layer only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, source fetching, automatic verification, signoff, export lock, or publication permission.',
        adapterReplayDrilldownTitle: 'Adapter Replay Decision Drilldown + Evidence Trace Links',
        adapterReplayDrilldownSubtitle: 'Open replay verdicts into fixture links, policy rows, evidence trace links, blocker explanations, and operator checklist items.',
        adapterReplayDrilldownPolicyNote: 'No-network drilldown only: trace links are metadata references and never execute providers, fetch sources, store credentials, sign off, lock exports, or publish.',
        adapterReplayReviewPackTitle: 'Adapter Replay Review Pack + Operator Handoff Export',
        adapterReplayReviewPackSubtitle: 'Convert replay trace links into a review pack, handoff export payload, required actions, and evidence trace bundle for manual operator review.',
        adapterReplayReviewPackPolicyNote: 'No-network review pack only: export payloads are metadata summaries and never execute providers, fetch sources, store credentials, sign off, lock exports, or publish.',
        adapterReplayReviewPackPreviewTitle: 'Release Identity Single Source Contract',
        adapterReplayReviewPackPreviewSubtitle: 'Preview Markdown, JSON, operator actions, and evidence-trace bundle payloads before manual copy/export.',
        adapterReplayReviewPackPreviewPolicyNote: 'Preview only: metadata payloads do not execute providers, fetch sources, persist credentials, sign off, lock exports, or publish.'
      }),
      ar: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.30 عقد هوية الإصدار من مصدر واحد · عقد الهوية',
        hostedDemoVerificationBody: 'عقد هوية الإصدار من مصدر واحد جاهز لأدلة الإصدار: يربط الحزمة والسجل ومصفوفة الأدلة وسير CI ونسخ الواجهة ونطاق التشغيل عبر عقد هوية واحد دون تغيير تنفيذ المزوّد. يجب أن تعلن أدلة الاستضافة داخلياً 1.4.0-alpha.30 مع عرض v1.4.0-alpha.30 عقد هوية الإصدار من مصدر واحد للمستخدمين. عقد هوية بلا شبكة فقط: دون نداءات مزوّد حية، دون طلبات شبكة مخفية، دون OAuth/دورة رموز، دون تخزين بيانات اعتماد، دون جلب مصادر حي، ودون تحقق أو توقيع أو قفل أو نشر آلي.',
        analysisReleaseNote: 'يركّز 1.4.0-alpha.30 هوية الإصدار في عقد واحد Canonical مع البقاء بلا شبكة.',
        adapterReplayInsightTitle: 'رؤى إعادة تشغيل المحوّل وسطح قرار المشغّل',
        adapterReplayInsightSubtitle: 'تلخّص تغطية إعادة التشغيل، فجوات التغطية، الخلايا التي تحتاج مراجعة، وجاهزية قرار المشغّل من corpus محلي حتمي.',
        adapterReplayInsightPolicyNote: 'طبقة رؤى بلا شبكة فقط: لا نداءات مزوّد حية ولا طلبات شبكة مخفية ولا OAuth/دورة رموز ولا تخزين بيانات اعتماد ولا جلب مصادر ولا تحقق أو توقيع أو قفل أو نشر آلي.',
        adapterReplayDrilldownTitle: 'تفصيل قرار إعادة التشغيل وروابط تتبع الأدلة',
        adapterReplayDrilldownSubtitle: 'افتح أحكام إعادة التشغيل إلى روابط fixtures وصفوف السياسة وروابط تتبع الأدلة وتفسيرات العوائق وقائمة المشغّل.',
        adapterReplayDrilldownPolicyNote: 'تفصيل بلا شبكة فقط: روابط التتبع مراجع metadata ولا تنفّذ مزوّدين ولا تجلب مصادر ولا تخزّن بيانات اعتماد ولا توقّع أو تقفل أو تنشر.',
        adapterReplayReviewPackTitle: 'حزمة مراجعة إعادة التشغيل + تصدير تسليم المشغّل',
        adapterReplayReviewPackSubtitle: 'حوّل روابط تتبع إعادة التشغيل إلى حزمة المراجعة وتصدير التسليم وإجراءات مطلوبة وحزمة تتبع الأدلة لمراجعة المشغّل اليدوية.',
        adapterReplayReviewPackPolicyNote: 'حزمة مراجعة بلا شبكة فقط: حمولات التصدير ملخصات metadata ولا تنفّذ مزوّدين ولا تجلب مصادر ولا تخزّن بيانات اعتماد ولا توقّع أو تقفل أو تنشر.',
        adapterReplayReviewPackPreviewTitle: 'صقل واجهة حزمة المراجعة + معاينة التصدير',
        adapterReplayReviewPackPreviewSubtitle: 'عاين Markdown وJSON وإجراءات المشغّل وحزمة تتبع الأدلة قبل النسخ أو التصدير اليدوي.',
        adapterReplayReviewPackPreviewPolicyNote: 'معاينة فقط: حمولات metadata لا تنفّذ مزوّدين ولا تجلب مصادر ولا تخزّن بيانات اعتماد ولا توقّع أو تقفل أو تنشر.'
      }),
      fr: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.30 Contrat source unique d’identité de release · contrat identité',
        hostedDemoVerificationBody: 'Contrat source unique d’identité de release est prêt pour les preuves de release : il aligne package, registre, matrice de preuves, workflow CI, libellés UI et scope runtime sur un contrat d’identité unique, sans changer l’exécution fournisseur. Les preuves hébergées doivent annoncer 1.4.0-alpha.30 en interne tout en affichant v1.4.0-alpha.30 Contrat source unique d’identité de release aux utilisateurs. Contrat sans réseau uniquement : aucun appel fournisseur réel, requête réseau cachée, OAuth/cycle de token, persistance d’identifiants, fetch source live, vérification, visa, verrou d’export ou permission de publication automatique.',
        analysisReleaseNote: '1.4.0-alpha.30 centralise l’identité de release dans un contrat canonique, tout en restant sans réseau.',
        adapterReplayInsightTitle: 'Insights de rejeu adaptateur + surface de décision opérateur',
        adapterReplayInsightSubtitle: 'Résume couverture de rejeu, groupes de lacunes, cellules à revoir et préparation opérateur depuis le corpus déterministe.',
        adapterReplayInsightPolicyNote: 'Couche d’insight sans réseau uniquement : aucun appel fournisseur live, appel réseau caché, OAuth/cycle token, persistance d’identifiants, fetch source, vérification, visa, verrou ou publication automatique.',
        adapterReplayDrilldownTitle: 'Drilldown de décision de rejeu + liens de trace preuve',
        adapterReplayDrilldownSubtitle: 'Ouvre les verdicts de rejeu vers liens de fixtures, lignes de politique, liens de trace preuve, explications de blocage et checklist opérateur.',
        adapterReplayDrilldownPolicyNote: 'Drilldown sans réseau uniquement : les liens de trace sont des références metadata et n’exécutent aucun fournisseur, fetch, stockage d’identifiants, visa, verrou ou publication.',
        adapterReplayReviewPackTitle: 'Pack de revue de rejeu + export de handoff opérateur',
        adapterReplayReviewPackSubtitle: 'Convertit les liens de trace de rejeu en pack de revue, export de handoff, actions requises et lot de traces preuve pour la revue opérateur manuelle.',
        adapterReplayReviewPackPolicyNote: 'Pack de revue sans réseau uniquement : les payloads d’export sont des résumés metadata et n’exécutent aucun fournisseur, fetch, stockage d’identifiants, visa, verrou ou publication.',
        adapterReplayReviewPackPreviewTitle: 'Polish UI du pack de revue + aperçu export',
        adapterReplayReviewPackPreviewSubtitle: 'Prévisualise Markdown, JSON, actions opérateur et lot de traces preuve avant copie ou export manuel.',
        adapterReplayReviewPackPreviewPolicyNote: 'Aperçu uniquement : les payloads metadata n’exécutent aucun fournisseur, fetch, stockage d’identifiants, visa, verrou ou publication.'
      })
    })
  });
})(typeof window !== 'undefined' ? window : globalThis);
