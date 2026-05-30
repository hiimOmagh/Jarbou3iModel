(function(global){
  'use strict';
  global.Jarbou3iResearchReleaseCopyContract = Object.freeze({
    version: '1.4.0-alpha.25',
    publicVersionLabels: Object.freeze({
      en: 'v1.4.0-alpha.25 Release System Consolidation + Effective Diff Guard',
      ar: 'v1.4.0-alpha.25 توحيد نظام الإصدار وحارس الفرق الفعلي',
      fr: 'v1.4.0-alpha.25 Consolidation du système de release + garde de diff effectif'
    }),
    requiredVisibleText: Object.freeze({
      en: Object.freeze([
        'Release System Consolidation + Effective Diff Guard',
        'current-release contract',
        'effective diff guard',
        'one release copy contract',
        'no live provider calls'
      ]),
      ar: Object.freeze([
        'توحيد نظام الإصدار وحارس الفرق الفعلي',
        'عقد الإصدار الحالي',
        'حارس الفرق الفعلي',
        'عقد نسخ واحد',
        'دون نداءات مزوّد حية'
      ]),
      fr: Object.freeze([
        'Consolidation du système de release + garde de diff effectif',
        'contrat de release courant',
        'garde de diff effectif',
        'contrat de copie unique',
        'aucun appel fournisseur réel'
      ])
    }),
    staleVisibleText: Object.freeze([
      'v1.4.0-alpha.24 Changed-Files Patch Hygiene Guard',
      'v1.4.0-alpha.24 توحيد نظام الإصدار وحارس الفرق الفعلي',
      'v1.4.0-alpha.24 Consolidation du système de release + garde de diff effectif',
      'Alpha.23 Lock Completion + Changed-Files Patch Hygiene Guard',
      'النموذج الأولي المحدود للتنفيذ الحي اليدوي جاهز لأدلة الإصدار',
      'قمرة أمان التنفيذ اليدوي + سجل الجلسة جاهزة لأدلة الإصدار',
      'صندوق رمل محوّل المزوّد اليدوي + عقد الاستدعاء العابر جاهز لأدلة الإصدار'
    ]),
    copy: Object.freeze({
      en: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.25 Release System Consolidation + Effective Diff Guard · Control-Plane Compression Only',
        hostedDemoVerificationBody: 'Release System Consolidation + Effective Diff Guard is ready for release evidence: it replaces version-specific lock-completion checks with a current-release contract, adds a cross-platform effective diff guard, routes visible-text evidence through one release copy contract, and preserves the Windows-safe Playwright runner without expanding product scope. Hosted evidence must report 1.4.0-alpha.25 internally while showing v1.4.0-alpha.25 Release System Consolidation + Effective Diff Guard to users. Consolidation layer only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, live source fetching, automatic verification, signoff, export lock, cryptographic signature claim, or publication permission is enabled.',
        analysisReleaseNote: '1.4.0-alpha.25 compresses release-system checks into a current-release contract and effective diff guard without product/runtime expansion.',
        adapterContractTestBenchTitle: 'Release System Consolidation + Effective Diff Guard',
        adapterContractTestBenchSubtitle: 'Compresses release-control checks into a generic current-release contract and hard effective-diff guard.',
        adapterContractTestBenchPolicyNote: 'Consolidation layer only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, live source fetching, automatic verification, signoff, export lock, or publication permission.'
      }),
      ar: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.25 توحيد نظام الإصدار وحارس الفرق الفعلي · ضغط طبقة التحكم فقط',
        hostedDemoVerificationBody: 'توحيد نظام الإصدار وحارس الفرق الفعلي جاهز لأدلة الإصدار: يستبدل اختبارات إكمال القفل الخاصة بكل إصدار بعقد الإصدار الحالي، ويضيف حارس الفرق الفعلي العابر للمنصات، ويمرّر أدلة النص المرئي عبر عقد نسخ واحد، ويحافظ على مشغّل Playwright الآمن على ويندوز دون توسيع نطاق المنتج. يجب أن تعلن أدلة الاستضافة داخلياً 1.4.0-alpha.25 مع عرض v1.4.0-alpha.25 توحيد نظام الإصدار وحارس الفرق الفعلي للمستخدمين. طبقة توحيد فقط: دون نداءات مزوّد حية، دون نداءات شبكة مخفية، دون OAuth/دورة رموز، دون تخزين بيانات اعتماد، دون جلب مصادر حي، ودون تحقق أو توقيع أو قفل أو نشر آلي.',
        analysisReleaseNote: 'يضغط 1.4.0-alpha.25 فحوص الإصدار داخل عقد الإصدار الحالي وحارس الفرق الفعلي دون توسيع المنتج أو وقت التشغيل.',
        adapterContractTestBenchTitle: 'توحيد نظام الإصدار وحارس الفرق الفعلي',
        adapterContractTestBenchSubtitle: 'يضغط فحوص طبقة التحكم في عقد إصدار حالي عام وحارس فرق فعلي صارم.',
        adapterContractTestBenchPolicyNote: 'طبقة توحيد فقط: لا نداءات مزوّد حية ولا طلبات شبكة مخفية ولا OAuth/دورة رموز ولا تخزين بيانات اعتماد ولا جلب مصادر حي ولا تحقق أو توقيع أو قفل تصدير أو إذن نشر آلي.'
      }),
      fr: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.25 Consolidation du système de release + garde de diff effectif · compression plan de contrôle',
        hostedDemoVerificationBody: 'La consolidation du système de release + garde de diff effectif est prête pour les preuves de release : elle remplace les contrôles de verrouillage propres à une version par un contrat de release courant, ajoute un garde de diff effectif multiplateforme, fait passer les preuves de texte visible par un contrat de copie unique, et conserve le runner Playwright compatible Windows sans élargir la portée produit. Les preuves hébergées doivent annoncer 1.4.0-alpha.25 en interne tout en affichant v1.4.0-alpha.25 Consolidation du système de release + garde de diff effectif aux utilisateurs. Couche de consolidation uniquement : aucun appel fournisseur réel, requête réseau cachée, OAuth/cycle de token, persistance d’identifiants, fetch source live, vérification, visa, verrou d’export ou permission de publication automatique.',
        analysisReleaseNote: '1.4.0-alpha.25 compresse les contrôles de release dans un contrat courant et un garde de diff effectif sans extension produit/runtime.',
        adapterContractTestBenchTitle: 'Consolidation du système de release + garde de diff effectif',
        adapterContractTestBenchSubtitle: 'Compresse les contrôles du plan de release dans un contrat courant générique et un garde de diff effectif.',
        adapterContractTestBenchPolicyNote: 'Couche de consolidation uniquement : aucun appel fournisseur réel, requête réseau cachée, OAuth/cycle de token, persistance d’identifiants, fetch source live, vérification, visa, verrou d’export ou permission de publication automatique.'
      })
    })
  });
})(typeof window !== 'undefined' ? window : globalThis);
