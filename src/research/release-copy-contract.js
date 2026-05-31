(function(global){
  'use strict';
  global.Jarbou3iResearchReleaseCopyContract = Object.freeze({
    version: '1.4.0-alpha.29',
    publicVersionLabels: Object.freeze({
      en:
      ar: 'v1.4.0-alpha.29 صقل واجهة حزمة المراجعة + معاينة التصدير',
      fr: 'v1.4.0-alpha.29 Polish UI du pack de revue + aperçu export'
    }),
    requiredVisibleText: Object.freeze({
      en: Object.freeze([
        'Adapter Replay Review Pack UI Polish + Export Preview',
        'export preview',
        'markdown preview',
        'JSON preview',
        'no live provider calls'
      ]),
      ar: Object.freeze([
        'صقل واجهة حزمة المراجعة + معاينة التصدير',
        'معاينة التصدير',
        'معاينة Markdown',
        'معاينة JSON',
        'دون نداءات مزوّد حية'
      ]),
      fr: Object.freeze([
        'Polish UI du pack de revue + aperçu export',
        'aperçu export',
        'aperçu Markdown',
        'aperçu JSON',
        'aucun appel fournisseur réel'
      ])
    }),
    staleVisibleText: Object.freeze([
      'v1.4.0-alpha.28 حزمة مراجعة إعادة التشغيل + تصدير تسليم المشغّل',
      'v1.4.0-alpha.28 Pack de revue de rejeu + export de handoff opérateur',
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
        alphaBadge: 'v1.4.0-alpha.29 Adapter Replay Review Pack UI Polish + Export Preview · Export Preview Polish',
        hostedDemoVerificationBody: 'Adapter Replay Review Pack UI Polish + Export Preview is ready for release evidence: it makes the alpha.28 review pack easier to inspect with an export preview, markdown preview, JSON preview, copy/export action metadata, and grouped operator action summary without changing provider execution. Hosted evidence must report 1.4.0-alpha.29 internally while showing v1.4.0-alpha.29 Adapter Replay Review Pack UI Polish + Export Preview to users. Export preview polish only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, live source fetching, automatic verification, signoff, export lock, cryptographic signature claim, or publication permission is enabled.',
        analysisReleaseNote: '1.4.0-alpha.29 adds metadata-only review-pack UI polish with markdown preview, JSON preview, copy/export action metadata, and grouped operator action summary while remaining no-network.',
        adapterReplayInsightTitle: 'Adapter Replay Insight UX + Operator Decision Surface',
        adapterReplayInsightSubtitle: 'Summarize replay coverage, gap groups, review-required cells, and operator readiness from the deterministic adapter replay corpus.',
        adapterReplayInsightPolicyNote: 'No-network insight layer only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, source fetching, automatic verification, signoff, export lock, or publication permission.',
        adapterReplayDrilldownTitle: 'Adapter Replay Decision Drilldown + Evidence Trace Links',
        adapterReplayDrilldownSubtitle: 'Open replay verdicts into fixture links, policy rows, evidence trace links, blocker explanations, and operator checklist items.',
        adapterReplayDrilldownPolicyNote: 'No-network drilldown only: trace links are metadata references and never execute providers, fetch sources, store credentials, sign off, lock exports, or publish.',
        adapterReplayReviewPackTitle: 'Adapter Replay Review Pack UI Polish + Export Preview',
        adapterReplayReviewPackSubtitle: 'Convert replay trace links into a review pack, handoff export payload, required actions, and evidence trace bundle for manual operator review.',
        adapterReplayReviewPackPolicyNote: 'No-network review pack only: export payloads are metadata summaries and never execute providers, fetch sources, store credentials, sign off, lock exports, or publish.',
        adapterReplayExportPreviewTitle: 'Adapter Replay Review Pack UI Polish + Export Preview',
        adapterReplayExportPreviewSubtitle: 'Preview markdown, JSON, copy/export action metadata, and grouped operator actions before any manual handoff.',
        adapterReplayExportPreviewPolicyNote: 'Export preview polish only: preview controls are metadata-only and never execute providers, fetch sources, store credentials, sign off, lock exports, or publish.'
      }),
      ar: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.29 صقل واجهة حزمة المراجعة + معاينة التصدير · صقل معاينة التصدير',
        hostedDemoVerificationBody: 'صقل واجهة حزمة المراجعة + معاينة التصدير جاهز لأدلة الإصدار: يجعل حزمة مراجعة alpha.28 أسهل للفحص عبر معاينة التصدير ومعاينة Markdown ومعاينة JSON وبيانات إجراءات النسخ/التصدير وملخص إجراءات المشغّل المجمّعة دون تغيير تنفيذ المزوّد. يجب أن تعلن أدلة الاستضافة داخلياً 1.4.0-alpha.29 مع عرض v1.4.0-alpha.29 صقل واجهة حزمة المراجعة + معاينة التصدير للمستخدمين. صقل معاينة التصدير فقط: دون نداءات مزوّد حية، دون طلبات شبكة مخفية، دون OAuth/دورة رموز، دون تخزين بيانات اعتماد، دون جلب مصادر حي، ودون تحقق أو توقيع أو قفل أو نشر آلي.',
        analysisReleaseNote: 'يضيف 1.4.0-alpha.29 صقل واجهة metadata فقط لحزمة المراجعة مع معاينة Markdown ومعاينة JSON وبيانات إجراءات النسخ/التصدير وملخص إجراءات المشغّل المجمّعة مع البقاء بلا شبكة.',
        adapterReplayInsightTitle: 'رؤى إعادة تشغيل المحوّل وسطح قرار المشغّل',
        adapterReplayInsightSubtitle: 'تلخّص تغطية إعادة التشغيل، فجوات التغطية، الخلايا التي تحتاج مراجعة، وجاهزية قرار المشغّل من corpus محلي حتمي.',
        adapterReplayInsightPolicyNote: 'طبقة رؤى بلا شبكة فقط: لا نداءات مزوّد حية ولا طلبات شبكة مخفية ولا OAuth/دورة رموز ولا تخزين بيانات اعتماد ولا جلب مصادر ولا تحقق أو توقيع أو قفل أو نشر آلي.',
        adapterReplayDrilldownTitle: 'تفصيل قرار إعادة التشغيل وروابط تتبع الأدلة',
        adapterReplayDrilldownSubtitle: 'افتح أحكام إعادة التشغيل إلى روابط fixtures وصفوف السياسة وروابط تتبع الأدلة وتفسيرات العوائق وقائمة المشغّل.',
        adapterReplayDrilldownPolicyNote: 'تفصيل بلا شبكة فقط: روابط التتبع مراجع metadata ولا تنفّذ مزوّدين ولا تجلب مصادر ولا تخزّن بيانات اعتماد ولا توقّع أو تقفل أو تنشر.',
        adapterReplayReviewPackTitle: 'حزمة مراجعة إعادة التشغيل + تصدير تسليم المشغّل',
        adapterReplayReviewPackSubtitle: 'حوّل روابط تتبع إعادة التشغيل إلى حزمة المراجعة وتصدير التسليم وإجراءات مطلوبة وحزمة تتبع الأدلة لمراجعة المشغّل اليدوية.',
        adapterReplayReviewPackPolicyNote: 'حزمة مراجعة بلا شبكة فقط: حمولات التصدير ملخصات metadata ولا تنفّذ مزوّدين ولا تجلب مصادر ولا تخزّن بيانات اعتماد ولا توقّع أو تقفل أو تنشر.',
        adapterReplayExportPreviewTitle: 'صقل واجهة حزمة المراجعة + معاينة التصدير',
        adapterReplayExportPreviewSubtitle: 'عاين Markdown وJSON وبيانات إجراءات النسخ/التصدير وإجراءات المشغّل المجمّعة قبل أي تسليم يدوي.',
        adapterReplayExportPreviewPolicyNote: 'صقل معاينة التصدير فقط: عناصر المعاينة metadata فقط ولا تنفّذ مزوّدين ولا تجلب مصادر ولا تخزّن بيانات اعتماد ولا توقّع أو تقفل أو تنشر.'
      }),
      fr: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.29 Polish UI du pack de revue + aperçu export · polish aperçu export',
        hostedDemoVerificationBody: 'Polish UI du pack de revue + aperçu export est prêt pour les preuves de release : il rend le pack de revue alpha.28 plus facile à inspecter avec aperçu export, aperçu Markdown, aperçu JSON, métadonnées des actions copier/exporter et résumé groupé des actions opérateur, sans changer l’exécution fournisseur. Les preuves hébergées doivent annoncer 1.4.0-alpha.29 en interne tout en affichant v1.4.0-alpha.29 Polish UI du pack de revue + aperçu export aux utilisateurs. Polish aperçu export uniquement : aucun appel fournisseur réel, requête réseau cachée, OAuth/cycle de token, persistance d’identifiants, fetch source live, vérification, visa, verrou d’export ou permission de publication automatique.',
        analysisReleaseNote: '1.4.0-alpha.29 ajoute un polish UI metadata du pack de revue avec aperçu Markdown, aperçu JSON, métadonnées copier/exporter et résumé groupé des actions opérateur, tout en restant sans réseau.',
        adapterReplayInsightTitle: 'Insights de rejeu adaptateur + surface de décision opérateur',
        adapterReplayInsightSubtitle: 'Résume couverture de rejeu, groupes de lacunes, cellules à revoir et préparation opérateur depuis le corpus déterministe.',
        adapterReplayInsightPolicyNote: 'Couche d’insight sans réseau uniquement : aucun appel fournisseur live, appel réseau caché, OAuth/cycle token, persistance d’identifiants, fetch source, vérification, visa, verrou ou publication automatique.',
        adapterReplayDrilldownTitle: 'Drilldown de décision de rejeu + liens de trace preuve',
        adapterReplayDrilldownSubtitle: 'Ouvre les verdicts de rejeu vers liens de fixtures, lignes de politique, liens de trace preuve, explications de blocage et checklist opérateur.',
        adapterReplayDrilldownPolicyNote: 'Drilldown sans réseau uniquement : les liens de trace sont des références metadata et n’exécutent aucun fournisseur, fetch, stockage d’identifiants, visa, verrou ou publication.',
        adapterReplayReviewPackTitle: 'Pack de revue de rejeu + export de handoff opérateur',
        adapterReplayReviewPackSubtitle: 'Convertit les liens de trace de rejeu en pack de revue, export de handoff, actions requises et lot de traces preuve pour la revue opérateur manuelle.',
        adapterReplayReviewPackPolicyNote: 'Pack de revue sans réseau uniquement : les payloads d’export sont des résumés metadata et n’exécutent aucun fournisseur, fetch, stockage d’identifiants, visa, verrou ou publication.',
        adapterReplayExportPreviewTitle: 'Polish UI du pack de revue + aperçu export',
        adapterReplayExportPreviewSubtitle: 'Prévisualise Markdown, JSON, métadonnées copier/exporter et actions opérateur groupées avant tout handoff manuel.',
        adapterReplayExportPreviewPolicyNote: 'Polish aperçu export uniquement : les contrôles de prévisualisation sont metadata-only et n’exécutent aucun fournisseur, fetch, stockage d’identifiants, visa, verrou ou publication.'
      })
    })
  });
})(typeof window !== 'undefined' ? window : globalThis);
