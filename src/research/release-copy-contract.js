(function(global){
  'use strict';
  global.Jarbou3iResearchReleaseCopyContract = Object.freeze({
    version: '1.4.0-alpha.31',
    publicVersionLabels: Object.freeze({
      en: 'v1.4.0-alpha.31 Adapter Replay Review Pack Operator Workflow Polish',
      ar: 'v1.4.0-alpha.31 صقل سير عمل المشغّل لحزمة مراجعة إعادة التشغيل',
      fr: 'v1.4.0-alpha.31 Polish workflow opérateur du pack de revue de rejeu'
    }),
    requiredVisibleText: Object.freeze({
      en: Object.freeze([
        'Adapter Replay Review Pack Operator Workflow Polish',
        'operator workflow polish',
        'manual next-step copy',
        'no live provider calls'
      ]),
      ar: Object.freeze([
        'صقل سير عمل المشغّل لحزمة مراجعة إعادة التشغيل',
        'أولوية قرار المشغّل',
        'نسخة الخطوة التالية اليدوية',
        'دون نداءات مزوّد حية'
      ]),
      fr: Object.freeze([
        'Polish workflow opérateur du pack de revue de rejeu',
        'priorité de décision opérateur',
        'copie manuelle de prochaine étape',
        'aucun appel fournisseur réel'
      ])
    }),
    staleVisibleText: Object.freeze([
      'صندوق رمل محوّل المزوّد اليدوي + عقد الاستدعاء العابر جاهز لأدلة الإصدار',
      'قمرة أمان التنفيذ اليدوي + سجل الجلسة جاهزة لأدلة الإصدار',
      'النموذج الأولي المحدود للتنفيذ الحي اليدوي جاهز لأدلة الإصدار',
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
        alphaBadge: 'v1.4.0-alpha.31 Adapter Replay Review Pack Operator Workflow Polish · Operator Workflow Polish',
        hostedDemoVerificationBody: 'Adapter Replay Review Pack Operator Workflow Polish is ready for release evidence: it improves the alpha.29 adapter replay review pack operator workflow with decision lane ordering, action priority ranking, review-focus summary, handoff checklist, and manual next-step copy without changing provider execution. Hosted evidence must report 1.4.0-alpha.31 internally while showing v1.4.0-alpha.31 Adapter Replay Review Pack Operator Workflow Polish to users. Operator workflow polish only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, live source fetching, automatic verification, signoff, export lock, cryptographic signature claim, or publication permission is enabled.',
        analysisReleaseNote: '1.4.0-alpha.31 improves adapter replay review-pack operator workflow readability, action priority, and manual handoff copy while remaining no-network.',
        adapterReplayReviewPackPreviewTitle: 'Adapter Replay Review Pack Operator Workflow Polish',
        adapterReplayReviewPackPreviewSubtitle: 'Review decision lanes, prioritized operator actions, handoff checklist, and manual next-step copy before export.',
        adapterReplayReviewPackPreviewPolicyNote: 'Workflow polish only: metadata payloads do not execute providers, fetch sources, persist credentials, sign off, lock exports, or publish.',
        adapterReplayOperatorWorkflowTitle: 'Adapter Replay Review Pack Operator Workflow Polish',
        adapterReplayOperatorWorkflowSubtitle: 'Order review-pack decisions into lanes, priority levels, handoff checklist items, and manual next-step copy for operator review.',
        adapterReplayOperatorWorkflowPolicyNote: 'No-network workflow polish only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, source fetching, automatic verification, signoff, export lock, or publication permission.'
      }),
      ar: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.31 صقل سير عمل المشغّل لحزمة مراجعة إعادة التشغيل · صقل سير العمل',
        hostedDemoVerificationBody: 'صقل سير عمل المشغّل لحزمة مراجعة إعادة التشغيل جاهز لأدلة الإصدار: يحسّن سير مراجعة المشغّل لحزمة إعادة التشغيل عبر ترتيب مسارات القرار، أولوية قرار المشغّل، ملخص تركيز المراجعة، قائمة تسليم، ونسخة الخطوة التالية اليدوية دون تغيير تنفيذ المزوّد. يجب أن تعلن أدلة الاستضافة داخلياً 1.4.0-alpha.31 مع عرض v1.4.0-alpha.31 صقل سير عمل المشغّل لحزمة مراجعة إعادة التشغيل للمستخدمين. صقل سير عمل فقط: دون نداءات مزوّد حية، دون طلبات شبكة مخفية، دون OAuth/دورة رموز، دون تخزين بيانات اعتماد، دون جلب مصادر حي، ودون تحقق أو توقيع أو قفل أو نشر آلي.',
        analysisReleaseNote: 'يحسّن 1.4.0-alpha.31 قابلية قراءة سير عمل المشغّل لحزمة مراجعة إعادة التشغيل وأولوية الإجراءات ونسخة التسليم اليدوية مع البقاء بلا شبكة.',
        adapterReplayReviewPackPreviewTitle: 'صقل سير عمل المشغّل لحزمة مراجعة إعادة التشغيل',
        adapterReplayReviewPackPreviewSubtitle: 'راجع مسارات القرار، أولوية إجراءات المشغّل، قائمة التسليم، ونسخة الخطوة التالية اليدوية قبل التصدير.',
        adapterReplayReviewPackPreviewPolicyNote: 'صقل سير العمل فقط: حمولات metadata لا تنفّذ مزوّدين ولا تجلب مصادر ولا تخزّن بيانات اعتماد ولا توقّع أو تقفل أو تنشر.',
        adapterReplayOperatorWorkflowTitle: 'صقل سير عمل المشغّل لحزمة مراجعة إعادة التشغيل',
        adapterReplayOperatorWorkflowSubtitle: 'رتّب قرارات حزمة المراجعة إلى مسارات وأولويات وقائمة تسليم ونسخة خطوة تالية يدوية للمراجعة.',
        adapterReplayOperatorWorkflowPolicyNote: 'صقل بلا شبكة فقط: لا نداءات مزوّد حية ولا طلبات شبكة مخفية ولا OAuth/دورة رموز ولا تخزين بيانات اعتماد ولا جلب مصادر ولا تحقق أو توقيع أو قفل أو نشر آلي.'
      }),
      fr: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.31 Polish workflow opérateur du pack de revue de rejeu · polish workflow',
        hostedDemoVerificationBody: 'Polish workflow opérateur du pack de revue de rejeu est prêt pour les preuves de release : il améliore le workflow opérateur du pack de revue avec ordre des lanes de décision, priorité de décision opérateur, résumé de focus revue, checklist de handoff et copie manuelle de prochaine étape, sans changer l’exécution fournisseur. Les preuves hébergées doivent annoncer 1.4.0-alpha.31 en interne tout en affichant v1.4.0-alpha.31 Polish workflow opérateur du pack de revue de rejeu aux utilisateurs. Polish workflow uniquement : aucun appel fournisseur réel, requête réseau cachée, OAuth/cycle de token, persistance d’identifiants, fetch source live, vérification, visa, verrou d’export ou permission de publication automatique.',
        analysisReleaseNote: '1.4.0-alpha.31 améliore la lisibilité du workflow opérateur du pack de revue, la priorité des actions et la copie de handoff manuel tout en restant sans réseau.',
        adapterReplayReviewPackPreviewTitle: 'Polish workflow opérateur du pack de revue de rejeu',
        adapterReplayReviewPackPreviewSubtitle: 'Passez en revue lanes de décision, priorités opérateur, checklist de handoff et copie manuelle de prochaine étape avant export.',
        adapterReplayReviewPackPreviewPolicyNote: 'Polish workflow uniquement : les payloads metadata n’exécutent aucun fournisseur, fetch, stockage d’identifiants, visa, verrou ou publication.',
        adapterReplayOperatorWorkflowTitle: 'Polish workflow opérateur du pack de revue de rejeu',
        adapterReplayOperatorWorkflowSubtitle: 'Ordonne les décisions du pack de revue en lanes, priorités, checklist de handoff et copie de prochaine étape pour revue opérateur.',
        adapterReplayOperatorWorkflowPolicyNote: 'Polish sans réseau uniquement : aucun appel fournisseur réel, requête réseau cachée, OAuth/cycle token, persistance d’identifiants, fetch source, vérification, visa, verrou ou publication.'
      })
    })
  });
})(typeof window !== 'undefined' ? window : globalThis);
