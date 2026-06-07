const CURRENT_RELEASE_IDENTITY = Object.freeze({
  version: '1.4.0-alpha.57',
  title: 'Visible-Text Token Drift Guard',
  release: 'v1.4.0-alpha.57 — Visible-Text Token Drift Guard',
  publicLabel: 'v1.4.0-alpha.57 Visible-Text Token Drift Guard',
  runtimeScope: 'visible_text_token_drift_guard'
});

/* Jarbou3i Research Engine release copy contract 1.4.0-alpha.57. */
(function(global){
  'use strict';
  const contract = Object.freeze({
    version: '1.4.0-alpha.57',
    release: 'v1.4.0-alpha.57 — Visible-Text Token Drift Guard',
    releaseTitle: 'v1.4.0-alpha.57 — Visible-Text Token Drift Guard',
    milestone: 'Visible-Text Token Drift Guard',
    publicVersionLabels: Object.freeze({
      en: 'v1.4.0-alpha.57 Visible-Text Token Drift Guard',
      ar: 'v1.4.0-alpha.57 حارس انجراف رموز النص المرئي',
      fr: 'v1.4.0-alpha.57 Garde anti-dérive des jetons de texte visible'
    }),
    expectedCurrentReleaseDescriptionTokens: Object.freeze({
      en: Object.freeze(['visible-token drift', 'static guard']),
      ar: Object.freeze(['انجراف رموز النص', 'حارس ثابت']),
      fr: Object.freeze(['dérive des jetons visibles', 'garde statique'])
    }),
    staleCurrentReleaseDescriptionTokens: Object.freeze([
      'v1.4.0-alpha.47 Patch Package Safety + Release Identity Sweep Guard',
      'v1.4.0-alpha.47 — Patch Package Safety + Release Identity Sweep Guard',
      'Patch Package Safety + Release Identity Sweep Guard is ready for release evidence',
      'أمان حزم التصحيح + حارس مسح هوية الإصدار',
      'Sécurité des paquets de correctifs + garde de balayage d’identité de release',
      'v1.4.0-alpha.42 Manual Workflow UX Consolidation',
      'v1.4.0-alpha.42 — Manual Workflow UX Consolidation',
      'v1.4.0-alpha.42 دمج تجربة سير العمل اليدوي',
      'v1.4.0-alpha.42 Consolidation UX du workflow manuel',
      'Manual Workflow UX Consolidation is ready for release evidence',
      'دمج تجربة سير العمل اليدوي جاهز لأدلة الإصدار',
      'Consolidation UX du workflow manuel est prête pour les preuves de release',
      'v1.4.0-alpha.40 Source-to-Brief Publication Readiness Suite',
      'v1.4.0-alpha.39 Source-to-Brief Operator Control Room',
      'v1.4.0-alpha.38 Source-to-Brief Operator Continuity Console',
      'v1.4.0-alpha.37 Adapter Replay Review Pack Compact Navigation UX',
      'v1.4.0-alpha.36 Adapter Replay Review Pack Operator Review Console',
      'v1.4.0-alpha.35 Adapter Replay Review Pack Handoff Dossier',
      'v1.4.0-alpha.34 Adapter Replay Review Pack Triage Workbench',
      'v1.4.0-alpha.33 Adapter Replay Review Pack Decision Queue',
      'v1.4.0-alpha.32 Adapter Replay Review Pack Evidence Trace Reader',
      'v1.4.0-alpha.30 Release Identity Single Source Contract',
      'النموذج الأولي المحدود للتنفيذ الحي اليدوي جاهز لأدلة الإصدار',
      'قمرة أمان التنفيذ اليدوي + سجل الجلسة جاهزة لأدلة الإصدار',
      'صندوق رمل محوّل المزوّد اليدوي + عقد الاستدعاء العابر جاهز لأدلة الإصدار',
      'v1.4.0-alpha.29 Adapter Replay Review Pack UI Polish + Export Preview',

      'v1.4.0-alpha.56 Lock Evidence Review CLI Hardening + Exit Codes',
      'v1.4.0-alpha.56 — Lock Evidence Review CLI Hardening + Exit Codes',
      'تقوية واجهة مراجعة أدلة القفل + رموز الخروج',
      'Durcissement du CLI de revue des preuves + codes de sortie',
      'v1.4.0-alpha.55 Lock Review CLI CI Smoke + Operator Command Docs',
      'Lock Review CLI CI Smoke + Operator Command Docs',
      'اختبار CI لواجهة مراجعة القفل ووثائق أوامر المشغّل',
      'Smoke CI du CLI de revue verrouillage + docs commandes opérateur'
    ]),
    copy: Object.freeze({
      en: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.57 Visible-Text Token Drift Guard · static guard',
        hostedDemoVerificationBody: 'Visible-Text Token Drift Guard is ready for release evidence: a static guard now compares current visible-token drift expectations against the hosted-demo verification body before browser evidence runs. Hosted evidence must report 1.4.0-alpha.57 internally while showing v1.4.0-alpha.57 Visible-Text Token Drift Guard to users. Evidence capture only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, live source fetching, automatic source verification, signoff, export lock, status persistence, batch mutation, navigation-state persistence, cryptographic signature claim, or publication permission is enabled.',
        analysisReleaseNote: '1.4.0-alpha.57 adds a static visible-token drift guard across English, Arabic, and French before browser evidence runs.',
        adapterReplayReviewPackPreviewTitle: 'Visible-Text Token Drift Guard',
        adapterReplayReviewPackPreviewBody: 'Release governance view: visible-token drift guard, static copy-token comparison, locale coverage, and browser-evidence preflight. No live provider calls.',
        adapterReplayOperatorWorkflowTitle: 'Visible-Text Token Drift Guard',
        adapterReplayOperatorWorkflowBody: 'Visible-Text Token Drift Guard: static locale-token drift detection for operator handoff inside the operator control room stage board. No automatic verification, signoff, export lock, persistence, or publication permission.'
      }),
      ar: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.57 حارس انجراف رموز النص المرئي · حارس ثابت',
        hostedDemoVerificationBody: 'حارس انجراف رموز النص المرئي جاهز لأدلة الإصدار: يطابق حارس ثابت رموز النص المتوقعة مع نص التحقق المرئي قبل تشغيل أدلة المتصفح. يجب أن تعلن أدلة الاستضافة داخلياً 1.4.0-alpha.57 مع عرض v1.4.0-alpha.57 حارس انجراف رموز النص المرئي للمستخدمين. التقاط أدلة فقط: دون نداءات مزوّد حية، دون طلبات شبكة مخفية، دون OAuth أو دورة رموز، دون تخزين بيانات اعتماد، دون جلب مصادر حي، ودون تحقق آلي من المصادر أو توقيع أو قفل تصدير أو حفظ حالة أو تعديل دفعات أو حفظ حالة التنقل أو تصريح نشر.',
        analysisReleaseNote: 'يضيف 1.4.0-alpha.57 حارساً ثابتاً لاكتشاف انجراف رموز النص المرئي عبر العربية والفرنسية والإنجليزية قبل أدلة المتصفح.',
        adapterReplayReviewPackPreviewTitle: 'حارس انجراف رموز النص',
        adapterReplayReviewPackPreviewBody: 'عرض حوكمة الإصدار: انجراف رموز النص، حارس ثابت، تغطية اللغات، وتمهيد أدلة المتصفح. دون نداءات مزوّد حية.',
        adapterReplayOperatorWorkflowTitle: 'حارس انجراف رموز النص',
        adapterReplayOperatorWorkflowBody: 'حارس انجراف رموز النص المرئي: كشف ثابت لاختلاف رموز اللغة داخل operator control room stage board. دون تحقق آلي أو اعتماد أو قفل تصدير أو حفظ حالة أو تصريح نشر.'
      }),
      fr: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.57 Garde anti-dérive des jetons de texte visible · garde statique',
        hostedDemoVerificationBody: 'Garde anti-dérive des jetons de texte visible est prêt pour les preuves de release : une garde statique compare la dérive des jetons visibles attendus avec le texte de vérification avant les preuves navigateur. Les preuves hébergées doivent annoncer 1.4.0-alpha.57 en interne tout en affichant v1.4.0-alpha.57 Garde anti-dérive des jetons de texte visible aux utilisateurs. Capture de preuve uniquement : aucun appel fournisseur réel, requête réseau cachée, OAuth/cycle token, persistance d’identifiants, fetch source live, vérification automatique des sources, visa, verrou d’export, persistance de statut, mutation batch, persistance d’état de navigation, signature cryptographique ou permission de publication.',
        analysisReleaseNote: '1.4.0-alpha.57 ajoute une garde statique contre la dérive des jetons visibles en français, arabe et anglais avant les preuves navigateur.',
        adapterReplayReviewPackPreviewTitle: 'Garde anti-dérive des jetons visibles',
        adapterReplayReviewPackPreviewBody: 'Vue gouvernance release : dérive des jetons visibles, garde statique, couverture locale et préflight navigateur. Aucun appel fournisseur réel.',
        adapterReplayOperatorWorkflowTitle: 'Garde anti-dérive des jetons visibles',
        adapterReplayOperatorWorkflowBody: 'Garde anti-dérive des jetons de texte visible : détection statique des écarts de jetons de langue dans l’operator control room stage board. Aucun auto-contrôle, visa, verrou export, persistance ou permission publication.'
      })
    })
  });
  global.Jarbou3iResearchReleaseCopyContract = contract;
})(typeof window !== 'undefined' ? window : globalThis);

(function enforceCurrentReleaseCopyIdentity() {
  const root = typeof globalThis !== 'undefined' ? globalThis : this;
  const contract = root.Jarbou3iResearchReleaseCopyContract;
  if (!contract) return;

  contract.version = CURRENT_RELEASE_IDENTITY.version;
  contract.release = CURRENT_RELEASE_IDENTITY.release;
  contract.releaseTitle = CURRENT_RELEASE_IDENTITY.release;
  contract.milestone = CURRENT_RELEASE_IDENTITY.title;
  contract.publicVersionLabels = Object.assign({}, contract.publicVersionLabels || {}, {
    en: CURRENT_RELEASE_IDENTITY.publicLabel,
    ar: 'v1.4.0-alpha.57 حارس انجراف رموز النص المرئي',
    fr: 'v1.4.0-alpha.57 Garde anti-dérive des jetons de texte visible'
  });
})();

const ALPHA57_BROWSER_VISIBLE_TEXT_CONTRACT = Object.freeze({
  ar: Object.freeze(['انجراف رموز النص', 'حارس ثابت']),
  fr: Object.freeze(['dérive des jetons visibles', 'garde statique']),
  en: Object.freeze(['visible-token drift', 'static guard'])
});

(function enforceAlpha57BrowserVisibleTextContract() {
  const root = typeof globalThis !== 'undefined' ? globalThis : this;
  const contract = root.Jarbou3iResearchReleaseCopyContract;
  if (!contract) return;

  contract.version = CURRENT_RELEASE_IDENTITY.version;
  contract.release = CURRENT_RELEASE_IDENTITY.release;
  contract.releaseTitle = CURRENT_RELEASE_IDENTITY.release;
  contract.milestone = CURRENT_RELEASE_IDENTITY.title;
  contract.publicVersionLabels = Object.assign({}, contract.publicVersionLabels || {}, {
    en: CURRENT_RELEASE_IDENTITY.publicLabel,
    ar: 'v1.4.0-alpha.57 حارس انجراف رموز النص المرئي',
    fr: 'v1.4.0-alpha.57 Garde anti-dérive des jetons de texte visible'
  });

  contract.requiredVisibleText = Object.assign({}, contract.requiredVisibleText || {}, ALPHA57_BROWSER_VISIBLE_TEXT_CONTRACT);
  contract.expectedCurrentReleaseDescriptionTokens = Object.assign(
    {},
    contract.expectedCurrentReleaseDescriptionTokens || {},
    ALPHA57_BROWSER_VISIBLE_TEXT_CONTRACT
  );

  contract.staleVisibleText = (contract.staleVisibleText || [])
    .filter((token) => ![
      'Evidence Matrix Semantics',
      'دلالات مصفوفة الأدلة',
      'Sémantique de la matrice de preuves'
    ].includes(token));
})();
