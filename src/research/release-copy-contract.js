(function(global){
  'use strict';
  global.Jarbou3iResearchReleaseCopyContract = Object.freeze({
    version: '1.4.0-alpha.36',
    publicVersionLabels: Object.freeze({
      en: 'v1.4.0-alpha.36 Adapter Replay Review Pack Operator Review Console',
      ar: 'v1.4.0-alpha.36 وحدة مراجعة المشغّل لحزمة مراجعة إعادة التشغيل',
      fr: 'v1.4.0-alpha.36 Console de revue opérateur du pack de revue de rejeu'
    }),
    requiredVisibleText: Object.freeze({
      en: Object.freeze([
        'Adapter Replay Review Pack Operator Review Console',
        'operator review console',
        'handoff readiness',
        'no live provider calls'
      ]),
      ar: Object.freeze([
        'وحدة مراجعة المشغّل لحزمة مراجعة إعادة التشغيل',
        'وحدة مراجعة المشغّل',
        'جاهزية التسليم',
        'دون نداءات مزوّد حية'
      ]),
      fr: Object.freeze([
        'Console de revue opérateur du pack de revue de rejeu',
        'console de revue opérateur',
        'préparation du handoff',
        'aucun appel fournisseur réel'
      ])
    }),
    staleVisibleText: Object.freeze([
      'v1.4.0-alpha.35 Adapter Replay Review Pack Handoff Dossier',
      'v1.4.0-alpha.35 ملف تسليم حزمة مراجعة إعادة التشغيل',
      'v1.4.0-alpha.35 Dossier de handoff du pack de revue de rejeu',
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
        alphaBadge: 'v1.4.0-alpha.36 Adapter Replay Review Pack Operator Review Console · operator review console',
        hostedDemoVerificationBody: 'Adapter Replay Review Pack Operator Review Console is ready for release evidence: it unifies the decision queue, triage workbench, evidence trace reader, and handoff dossier into one operator review console with review tabs, unified review cards, trace navigation, batch controls, handoff readiness, and export review summary without changing provider execution. Hosted evidence must report 1.4.0-alpha.36 internally while showing v1.4.0-alpha.36 Adapter Replay Review Pack Operator Review Console to users. Operator review console only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, live source fetching, automatic verification, signoff, export lock, status persistence, batch mutation, cryptographic signature claim, or publication permission is enabled.',
        analysisReleaseNote: '1.4.0-alpha.36 adds a metadata-only operator review console with review tabs, unified review cards, trace navigation, batch controls, handoff readiness, and export review summary while remaining no-network.',
        adapterReplayReviewPackPreviewTitle: 'Adapter Replay Review Pack Operator Review Console',
        adapterReplayReviewPackPreviewSubtitle: 'Unify queue, triage, traces, and handoff dossier into one manual operator review console with handoff readiness.',
        adapterReplayReviewPackPreviewPolicyNote: 'Operator review console only: metadata payloads do not execute providers, fetch sources, mutate batches, persist status, persist credentials, verify, sign off, lock exports, or publish.',
        adapterReplayOperatorWorkflowTitle: 'Adapter Replay Review Pack Operator Review Console',
        adapterReplayOperatorWorkflowSubtitle: 'Review tabs, unified cards, trace navigation, batch controls, handoff readiness, and manual console copy from review-pack data.',
        adapterReplayOperatorWorkflowPolicyNote: 'No-network operator review console only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, source fetching, status persistence, batch mutation, automatic verification, signoff, export lock, or publication permission.'
      }),
      ar: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.36 وحدة مراجعة المشغّل لحزمة مراجعة إعادة التشغيل · وحدة مراجعة المشغّل',
        hostedDemoVerificationBody: 'وحدة مراجعة المشغّل لحزمة مراجعة إعادة التشغيل جاهزة لأدلة الإصدار: توحّد قائمة القرارات ومنضدة الفرز وقارئ تتبع الأدلة وملف التسليم في وحدة مراجعة المشغّل واحدة مع تبويبات مراجعة وبطاقات مراجعة موحّدة وتنقل التتبع وضوابط الدفعات وجاهزية التسليم وملخص مراجعة التصدير دون تغيير تنفيذ المزوّد. يجب أن تعلن أدلة الاستضافة داخلياً 1.4.0-alpha.36 مع عرض v1.4.0-alpha.36 وحدة مراجعة المشغّل لحزمة مراجعة إعادة التشغيل للمستخدمين. وحدة مراجعة المشغّل بلا شبكة فقط: دون نداءات مزوّد حية، دون طلبات شبكة مخفية، دون OAuth/دورة رموز، دون تخزين بيانات اعتماد، دون جلب مصادر حي، ودون تحقق أو توقيع أو قفل أو حفظ حالة أو تعديل دفعات أو نشر آلي.',
        analysisReleaseNote: 'يضيف 1.4.0-alpha.36 وحدة مراجعة المشغّل metadata فقط مع تبويبات مراجعة وبطاقات موحّدة وتنقل التتبع وضوابط الدفعات وجاهزية التسليم وملخص مراجعة التصدير مع البقاء بلا شبكة.',
        adapterReplayReviewPackPreviewTitle: 'وحدة مراجعة المشغّل لحزمة مراجعة إعادة التشغيل',
        adapterReplayReviewPackPreviewSubtitle: 'وحّد قائمة القرارات والفرز والتتبع وملف التسليم في وحدة مراجعة المشغّل اليدوية مع جاهزية التسليم.',
        adapterReplayReviewPackPreviewPolicyNote: 'وحدة مراجعة المشغّل فقط: حمولات metadata لا تنفّذ مزوّدين ولا تجلب مصادر ولا تعدّل دفعات ولا تحفظ حالة أو بيانات اعتماد ولا تتحقق أو توقّع أو تقفل أو تنشر.',
        adapterReplayOperatorWorkflowTitle: 'وحدة مراجعة المشغّل لحزمة مراجعة إعادة التشغيل',
        adapterReplayOperatorWorkflowSubtitle: 'تبويبات مراجعة وبطاقات موحّدة وتنقل التتبع وضوابط الدفعات وجاهزية التسليم ونسخة وحدة يدوية من بيانات حزمة المراجعة.',
        adapterReplayOperatorWorkflowPolicyNote: 'وحدة مراجعة المشغّل بلا شبكة فقط: لا نداءات مزوّد حية ولا طلبات شبكة مخفية ولا OAuth/دورة رموز ولا تخزين بيانات اعتماد ولا جلب مصادر ولا حفظ حالة ولا تعديل دفعات ولا تحقق أو توقيع أو قفل أو نشر آلي.'
      }),
      fr: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.36 Console de revue opérateur du pack de revue de rejeu · console de revue opérateur',
        hostedDemoVerificationBody: 'Console de revue opérateur du pack de revue de rejeu est prête pour les preuves de release : elle unifie file de décision, workbench de triage, lecteur de traces preuve et dossier de handoff dans une console de revue opérateur avec onglets de revue, cartes de revue unifiées, navigation trace, contrôles batch, préparation du handoff et résumé de revue export, sans changer l’exécution fournisseur. Les preuves hébergées doivent annoncer 1.4.0-alpha.36 en interne tout en affichant v1.4.0-alpha.36 Console de revue opérateur du pack de revue de rejeu aux utilisateurs. Console de revue opérateur sans réseau uniquement : aucun appel fournisseur réel, requête réseau cachée, OAuth/cycle token, persistance d’identifiants, fetch source live, vérification, visa, verrou d’export, persistance de statut, mutation batch, signature cryptographique ou permission de publication automatique.',
        analysisReleaseNote: '1.4.0-alpha.36 ajoute une console de revue opérateur metadata-only avec onglets de revue, cartes unifiées, navigation trace, contrôles batch, préparation du handoff et résumé de revue export, tout en restant sans réseau.',
        adapterReplayReviewPackPreviewTitle: 'Console de revue opérateur du pack de revue de rejeu',
        adapterReplayReviewPackPreviewSubtitle: 'Unifiez file de décision, triage, traces et dossier de handoff dans une console de revue opérateur manuelle avec préparation du handoff.',
        adapterReplayReviewPackPreviewPolicyNote: 'Console de revue opérateur uniquement : les payloads metadata n’exécutent aucun fournisseur, fetch, mutation batch, stockage de statut ou d’identifiants, vérification, visa, verrou ou publication.',
        adapterReplayOperatorWorkflowTitle: 'Console de revue opérateur du pack de revue de rejeu',
        adapterReplayOperatorWorkflowSubtitle: 'Onglets de revue, cartes unifiées, navigation trace, contrôles batch, préparation du handoff et copie console manuelle depuis les données du pack de revue.',
        adapterReplayOperatorWorkflowPolicyNote: 'Console de revue opérateur sans réseau uniquement : aucun appel fournisseur réel, requête réseau cachée, OAuth/cycle token, persistance d’identifiants, fetch source, statut persistant, mutation batch, vérification, visa, verrou ou publication.'
      })
    })
  });
})(typeof window !== 'undefined' ? window : globalThis);
