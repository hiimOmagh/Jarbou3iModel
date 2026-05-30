(function(global){
  'use strict';
  global.Jarbou3iResearchReleaseCopyContract = Object.freeze({
    version: '1.4.0-alpha.26',
    publicVersionLabels: Object.freeze({
      en: 'v1.4.0-alpha.26 Adapter Replay Insight UX + Operator Decision Surface',
      ar: 'v1.4.0-alpha.26 رؤى إعادة تشغيل المحوّل وسطح قرار المشغّل',
      fr: 'v1.4.0-alpha.26 Insights de rejeu adaptateur + surface de décision opérateur'
    }),
    requiredVisibleText: Object.freeze({
      en: Object.freeze([
        'Adapter Replay Insight UX + Operator Decision Surface',
        'replay coverage',
        'operator readiness',
        'coverage gaps',
        'no live provider calls'
      ]),
      ar: Object.freeze([
        'رؤى إعادة تشغيل المحوّل وسطح قرار المشغّل',
        'تغطية إعادة التشغيل',
        'جاهزية قرار المشغّل',
        'فجوات التغطية',
        'دون نداءات مزوّد حية'
      ]),
      fr: Object.freeze([
        'Insights de rejeu adaptateur + surface de décision opérateur',
        'couverture de rejeu',
        'préparation opérateur',
        'lacunes de couverture',
        'aucun appel fournisseur réel'
      ])
    }),
    staleVisibleText: Object.freeze([
      'v1.4.0-alpha.25 Release System Consolidation + Effective Diff Guard',
      'v1.4.0-alpha.25 رؤى إعادة تشغيل المحوّل وسطح قرار المشغّل',
      'v1.4.0-alpha.25 Insights de rejeu adaptateur + surface de décision opérateur',
      'v1.4.0-alpha.24 Changed-Files Patch Hygiene Guard',
      'Alpha.23 Lock Completion + Changed-Files Patch Hygiene Guard',
      'النموذج الأولي المحدود للتنفيذ الحي اليدوي جاهز لأدلة الإصدار',
      'قمرة أمان التنفيذ اليدوي + سجل الجلسة جاهزة لأدلة الإصدار',
      'صندوق رمل محوّل المزوّد اليدوي + عقد الاستدعاء العابر جاهز لأدلة الإصدار'
    ]),
    copy: Object.freeze({
      en: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.26 Adapter Replay Insight UX + Operator Decision Surface · No-Network Replay Insight',
        hostedDemoVerificationBody: 'Adapter Replay Insight UX + Operator Decision Surface is ready for release evidence: it turns the adapter replay coverage matrix into an operator-facing decision surface with replay coverage, coverage gaps, failure reason groups, evidence links, and operator readiness without changing provider execution. Hosted evidence must report 1.4.0-alpha.26 internally while showing v1.4.0-alpha.26 Adapter Replay Insight UX + Operator Decision Surface to users. No-network replay insight layer only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, live source fetching, automatic verification, signoff, export lock, cryptographic signature claim, or publication permission is enabled.',
        analysisReleaseNote: '1.4.0-alpha.26 turns the adapter replay corpus into an operator decision surface for coverage, gaps, failure groups, and no-network readiness.',
        adapterReplayInsightTitle: 'Adapter Replay Insight UX + Operator Decision Surface',
        adapterReplayInsightSubtitle: 'Summarize replay coverage, gap groups, review-required cells, and operator readiness from the deterministic adapter replay corpus.',
        adapterReplayInsightPolicyNote: 'No-network insight layer only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, source fetching, automatic verification, signoff, export lock, or publication permission.'
      }),
      ar: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.26 رؤى إعادة تشغيل المحوّل وسطح قرار المشغّل · رؤى بلا شبكة',
        hostedDemoVerificationBody: 'رؤى إعادة تشغيل المحوّل وسطح قرار المشغّل جاهزة لأدلة الإصدار: تحوّل مصفوفة تغطية إعادة التشغيل إلى سطح قرار موجّه للمشغّل مع تغطية إعادة التشغيل، فجوات التغطية، مجموعات أسباب الفشل، روابط الأدلة، وجاهزية قرار المشغّل دون تغيير تنفيذ المزوّد. يجب أن تعلن أدلة الاستضافة داخلياً 1.4.0-alpha.26 مع عرض v1.4.0-alpha.26 رؤى إعادة تشغيل المحوّل وسطح قرار المشغّل للمستخدمين. طبقة رؤى بلا شبكة فقط: دون نداءات مزوّد حية، دون نداءات شبكة مخفية، دون OAuth/دورة رموز، دون تخزين بيانات اعتماد، دون جلب مصادر حي، ودون تحقق أو توقيع أو قفل أو نشر آلي.',
        analysisReleaseNote: 'يحوّل 1.4.0-alpha.26 corpus إعادة تشغيل المحوّل إلى سطح قرار للمشغّل للتغطية والفجوات ومجموعات الفشل والجاهزية بلا شبكة.',
        adapterReplayInsightTitle: 'رؤى إعادة تشغيل المحوّل وسطح قرار المشغّل',
        adapterReplayInsightSubtitle: 'تلخّص تغطية إعادة التشغيل، فجوات التغطية، الخلايا التي تحتاج مراجعة، وجاهزية قرار المشغّل من corpus محلي حتمي.',
        adapterReplayInsightPolicyNote: 'طبقة رؤى بلا شبكة فقط: لا نداءات مزوّد حية ولا طلبات شبكة مخفية ولا OAuth/دورة رموز ولا تخزين بيانات اعتماد ولا جلب مصادر ولا تحقق أو توقيع أو قفل أو نشر آلي.'
      }),
      fr: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.26 Insights de rejeu adaptateur + surface de décision opérateur · insight sans réseau',
        hostedDemoVerificationBody: 'Insights de rejeu adaptateur + surface de décision opérateur est prêt pour les preuves de release : il transforme la matrice de couverture de rejeu en surface de décision opérateur avec couverture de rejeu, lacunes de couverture, groupes de raisons d’échec, liens de preuve et préparation opérateur sans changer l’exécution fournisseur. Les preuves hébergées doivent annoncer 1.4.0-alpha.26 en interne tout en affichant v1.4.0-alpha.26 Insights de rejeu adaptateur + surface de décision opérateur aux utilisateurs. Couche d’insight sans réseau uniquement : aucun appel fournisseur réel, requête réseau cachée, OAuth/cycle de token, persistance d’identifiants, fetch source live, vérification, visa, verrou d’export ou permission de publication automatique.',
        analysisReleaseNote: '1.4.0-alpha.26 transforme le corpus de rejeu adaptateur en surface de décision opérateur pour couverture, lacunes, groupes d’échec et préparation sans réseau.',
        adapterReplayInsightTitle: 'Insights de rejeu adaptateur + surface de décision opérateur',
        adapterReplayInsightSubtitle: 'Résume couverture de rejeu, groupes de lacunes, cellules à revoir et préparation opérateur depuis le corpus déterministe.',
        adapterReplayInsightPolicyNote: 'Couche d’insight sans réseau uniquement : aucun appel fournisseur live, appel réseau caché, OAuth/cycle token, persistance d’identifiants, fetch source, vérification, visa, verrou ou publication automatique.'
      })
    })
  });
})(typeof window !== 'undefined' ? window : globalThis);
