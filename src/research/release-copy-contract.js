(function(global){
  'use strict';
  global.Jarbou3iResearchReleaseCopyContract = Object.freeze({
    version: '1.4.0-alpha.27',
    publicVersionLabels: Object.freeze({
      en: 'v1.4.0-alpha.27 Adapter Replay Decision Drilldown + Evidence Trace Links',
      ar: 'v1.4.0-alpha.27 تفصيل قرار إعادة التشغيل وروابط تتبع الأدلة',
      fr: 'v1.4.0-alpha.27 Drilldown de décision de rejeu + liens de trace preuve'
    }),
    requiredVisibleText: Object.freeze({
      en: Object.freeze([
        'Adapter Replay Decision Drilldown + Evidence Trace Links',
        'trace links',
        'policy rows',
        'evidence trace links',
        'no live provider calls'
      ]),
      ar: Object.freeze([
        'تفصيل قرار إعادة التشغيل وروابط تتبع الأدلة',
        'صفوف السياسة',
        'روابط تتبع الأدلة',
        'دون نداءات مزوّد حية'
      ]),
      fr: Object.freeze([
        'Drilldown de décision de rejeu + liens de trace preuve',
        'liens de trace',
        'lignes de politique',
        'liens de trace preuve',
        'aucun appel fournisseur réel'
      ])
    }),
    staleVisibleText: Object.freeze([
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
        alphaBadge: 'v1.4.0-alpha.27 Adapter Replay Decision Drilldown + Evidence Trace Links · No-Network Replay Drilldown',
        hostedDemoVerificationBody: 'Adapter Replay Decision Drilldown + Evidence Trace Links is ready for release evidence: it adds drilldowns from replay verdicts, coverage gaps, blocked/review-required groups, fixture links, policy rows, and evidence trace links to the no-network adapter replay surface without changing provider execution. Hosted evidence must report 1.4.0-alpha.27 internally while showing v1.4.0-alpha.27 Adapter Replay Decision Drilldown + Evidence Trace Links to users. No-network replay drilldown only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, live source fetching, automatic verification, signoff, export lock, cryptographic signature claim, or publication permission is enabled.',
        analysisReleaseNote: '1.4.0-alpha.27 adds drilldowns from replay verdicts to fixtures, policy rows, evidence trace links, blocker groups, and operator checklist items while remaining no-network.',
        adapterReplayInsightTitle: 'Adapter Replay Insight UX + Operator Decision Surface',
        adapterReplayInsightSubtitle: 'Summarize replay coverage, gap groups, review-required cells, and operator readiness from the deterministic adapter replay corpus.',
        adapterReplayInsightPolicyNote: 'No-network insight layer only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, source fetching, automatic verification, signoff, export lock, or publication permission.',
        adapterReplayDrilldownTitle: 'Adapter Replay Decision Drilldown + Evidence Trace Links',
        adapterReplayDrilldownSubtitle: 'Open replay verdicts into fixture links, policy rows, evidence trace links, blocker explanations, and operator checklist items.',
        adapterReplayDrilldownPolicyNote: 'No-network drilldown only: trace links are metadata references and never execute providers, fetch sources, store credentials, sign off, lock exports, or publish.'
      }),
      ar: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.27 تفصيل قرار إعادة التشغيل وروابط تتبع الأدلة · تفصيل بلا شبكة',
        hostedDemoVerificationBody: 'تفصيل قرار إعادة التشغيل وروابط تتبع الأدلة جاهز لأدلة الإصدار: يضيف تفصيلات من أحكام إعادة التشغيل وفجوات التغطية ومجموعات الخلايا المحجوبة أو التي تحتاج مراجعة إلى روابط fixtures وصفوف السياسة وروابط تتبع الأدلة داخل سطح إعادة التشغيل بلا شبكة ودون تغيير تنفيذ المزوّد. يجب أن تعلن أدلة الاستضافة داخلياً 1.4.0-alpha.27 مع عرض v1.4.0-alpha.27 تفصيل قرار إعادة التشغيل وروابط تتبع الأدلة للمستخدمين. تفصيل بلا شبكة فقط: دون نداءات مزوّد حية، دون طلبات شبكة مخفية، دون OAuth/دورة رموز، دون تخزين بيانات اعتماد، دون جلب مصادر حي، ودون تحقق أو توقيع أو قفل أو نشر آلي.',
        analysisReleaseNote: 'يضيف 1.4.0-alpha.27 تفصيلات من أحكام إعادة التشغيل إلى fixtures وصفوف السياسة وروابط تتبع الأدلة ومجموعات العوائق وقائمة المشغّل مع البقاء بلا شبكة.',
        adapterReplayInsightTitle: 'رؤى إعادة تشغيل المحوّل وسطح قرار المشغّل',
        adapterReplayInsightSubtitle: 'تلخّص تغطية إعادة التشغيل، فجوات التغطية، الخلايا التي تحتاج مراجعة، وجاهزية قرار المشغّل من corpus محلي حتمي.',
        adapterReplayInsightPolicyNote: 'طبقة رؤى بلا شبكة فقط: لا نداءات مزوّد حية ولا طلبات شبكة مخفية ولا OAuth/دورة رموز ولا تخزين بيانات اعتماد ولا جلب مصادر ولا تحقق أو توقيع أو قفل أو نشر آلي.',
        adapterReplayDrilldownTitle: 'تفصيل قرار إعادة التشغيل وروابط تتبع الأدلة',
        adapterReplayDrilldownSubtitle: 'افتح أحكام إعادة التشغيل إلى روابط fixtures وصفوف السياسة وروابط تتبع الأدلة وتفسيرات العوائق وقائمة المشغّل.',
        adapterReplayDrilldownPolicyNote: 'تفصيل بلا شبكة فقط: روابط التتبع مراجع metadata ولا تنفّذ مزوّدين ولا تجلب مصادر ولا تخزّن بيانات اعتماد ولا توقّع أو تقفل أو تنشر.'
      }),
      fr: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.27 Drilldown de décision de rejeu + liens de trace preuve · drilldown sans réseau',
        hostedDemoVerificationBody: 'Drilldown de décision de rejeu + liens de trace preuve est prêt pour les preuves de release : il ajoute des drilldowns depuis les verdicts de rejeu, lacunes de couverture, groupes bloqués/à revoir, liens de fixtures, lignes de politique et liens de trace preuve vers la surface de rejeu sans réseau, sans changer l’exécution fournisseur. Les preuves hébergées doivent annoncer 1.4.0-alpha.27 en interne tout en affichant v1.4.0-alpha.27 Drilldown de décision de rejeu + liens de trace preuve aux utilisateurs. Drilldown sans réseau uniquement : aucun appel fournisseur réel, requête réseau cachée, OAuth/cycle de token, persistance d’identifiants, fetch source live, vérification, visa, verrou d’export ou permission de publication automatique.',
        analysisReleaseNote: '1.4.0-alpha.27 ajoute des drilldowns des verdicts de rejeu vers fixtures, lignes de politique, liens de trace preuve, groupes de blocage et checklist opérateur, tout en restant sans réseau.',
        adapterReplayInsightTitle: 'Insights de rejeu adaptateur + surface de décision opérateur',
        adapterReplayInsightSubtitle: 'Résume couverture de rejeu, groupes de lacunes, cellules à revoir et préparation opérateur depuis le corpus déterministe.',
        adapterReplayInsightPolicyNote: 'Couche d’insight sans réseau uniquement : aucun appel fournisseur live, appel réseau caché, OAuth/cycle token, persistance d’identifiants, fetch source, vérification, visa, verrou ou publication automatique.',
        adapterReplayDrilldownTitle: 'Drilldown de décision de rejeu + liens de trace preuve',
        adapterReplayDrilldownSubtitle: 'Ouvre les verdicts de rejeu vers liens de fixtures, lignes de politique, liens de trace preuve, explications de blocage et checklist opérateur.',
        adapterReplayDrilldownPolicyNote: 'Drilldown sans réseau uniquement : les liens de trace sont des références metadata et n’exécutent aucun fournisseur, fetch, stockage d’identifiants, visa, verrou ou publication.'
      })
    })
  });
})(typeof window !== 'undefined' ? window : globalThis);
