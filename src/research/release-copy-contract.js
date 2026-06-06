const CURRENT_RELEASE_IDENTITY = Object.freeze({
  version: '1.4.0-alpha.49',
  title: 'Diagnosis Report Artifact Export + Operator Handoff Snapshot',
  release: 'v1.4.0-alpha.49 — Diagnosis Report Artifact Export + Operator Handoff Snapshot',
  publicLabel: 'v1.4.0-alpha.49 Diagnosis Report Artifact Export + Operator Handoff Snapshot',
  runtimeScope: 'diagnosis_report_artifact_export_operator_handoff_snapshot'
});

/* Jarbou3i Research Engine release copy contract 1.4.0-alpha.49. */
(function(global){
  'use strict';
  const contract = Object.freeze({
    version: '1.4.0-alpha.49',
    release: 'v1.4.0-alpha.49 — Diagnosis Report Artifact Export + Operator Handoff Snapshot',
    releaseTitle: 'v1.4.0-alpha.49 — Diagnosis Report Artifact Export + Operator Handoff Snapshot',
    milestone: 'Diagnosis Report Artifact Export + Operator Handoff Snapshot',
    publicVersionLabels: Object.freeze({
      en: 'v1.4.0-alpha.49 Diagnosis Report Artifact Export + Operator Handoff Snapshot',
      ar: 'v1.4.0-alpha.49 تصدير تقرير التشخيص + لقطة تسليم للمشغّل',
      fr: 'v1.4.0-alpha.49 Export du rapport diagnostic + instantané de passation opérateur'
    }),
    expectedCurrentReleaseDescriptionTokens: Object.freeze({
      en: Object.freeze(['diagnosis report JSON', 'operator handoff snapshot', 'artifact output contract']),
      ar: Object.freeze(['تقرير التشخيص', 'لقطة التسليم', 'عقد المخرجات']),
      fr: Object.freeze(['rapport diagnostic', 'instantané de passation', 'contrat d’artefact'])
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
      'v1.4.0-alpha.29 Adapter Replay Review Pack UI Polish + Export Preview'
    ]),
    copy: Object.freeze({
      en: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.49 Diagnosis Report Artifact Export + Operator Handoff Snapshot · artifact export',
        hostedDemoVerificationBody: 'Diagnosis Report Artifact Export + Operator Handoff Snapshot is ready for release evidence: diagnosis report JSON, operator handoff Markdown snapshot, failure-family summary, failed commands, affected files, likely root cause, recommended next command, and artifact output contract are verified before browser/no-browser gates. Hosted evidence must report 1.4.0-alpha.49 internally while showing v1.4.0-alpha.49 Diagnosis Report Artifact Export + Operator Handoff Snapshot to users. Evidence capture only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, live source fetching, automatic source verification, signoff, export lock, status persistence, batch mutation, navigation-state persistence, cryptographic signature claim, or publication permission is enabled.',
        analysisReleaseNote: '1.4.0-alpha.49 exports the bulk diagnosis report as stable JSON and an operator handoff Markdown snapshot while remaining no-network.',
        adapterReplayReviewPackPreviewTitle: 'Diagnosis Report Artifact Export + Operator Handoff Snapshot',
        adapterReplayReviewPackPreviewBody: 'Release governance view: diagnosis report JSON, operator handoff snapshot, artifact manifest, failure families, failed commands, likely root cause, and repair checklist. No live provider calls.',
        adapterReplayOperatorWorkflowTitle: 'Diagnosis Report Artifact Export + Operator Handoff Snapshot',
        adapterReplayOperatorWorkflowBody: 'Diagnosis Report Artifact Export + Operator Handoff Snapshot: stable report artifacts for operator handoff inside the operator control room stage board only. Metadata-only. No automatic verification, signoff, export lock, persistence, or publication permission.'
      }),
      ar: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.49 تصدير تقرير التشخيص + لقطة تسليم للمشغّل · تصدير التشخيص',
        hostedDemoVerificationBody: 'تصدير تقرير التشخيص + لقطة تسليم للمشغّل جاهز لأدلة الإصدار: يتم التحقق من ملخص تقرير التشخيص، والفحوصات المتأثرة، ولقطة التسليم، والأوامر الفاشلة، والسبب الجذري المحتمل، وعقد المخرجات، وقائمة إصلاح للمشغّل قبل بوابات المتصفح و no-browser. يجب أن تعلن أدلة الاستضافة داخلياً 1.4.0-alpha.49 مع عرض v1.4.0-alpha.49 تصدير تقرير التشخيص + لقطة تسليم للمشغّل للمستخدمين. التقاط أدلة فقط: دون نداءات مزوّد حية، دون طلبات شبكة مخفية، دون OAuth أو دورة رموز، دون تخزين بيانات اعتماد، دون جلب مصادر حي، ودون تحقق آلي من المصادر أو توقيع أو قفل تصدير أو حفظ حالة أو تعديل دفعات أو حفظ حالة التنقل أو تصريح نشر.',
        analysisReleaseNote: 'يحسن 1.4.0-alpha.49 تصدير التشخيص عبر ملخص تقرير التشخيص ولقطة التسليم والسبب الجذري المحتمل وعقد المخرجات وقائمة إصلاح للمشغل مع البقاء بلا شبكة.',
        adapterReplayReviewPackPreviewTitle: 'تصدير تقرير التشخيص + لقطة تسليم للمشغّل',
        adapterReplayReviewPackPreviewBody: 'عرض حوكمة الإصدار: ملخص تقرير التشخيص، الفحوصات ولقطة التسليم، الأوامر الفاشلة، السبب الجذري المحتمل، عقد المخرجات، وقائمة إصلاح للمشغل. دون نداءات مزوّد حية.',
        adapterReplayOperatorWorkflowTitle: 'تصدير تقرير التشخيص + لقطة تسليم للمشغّل',
        adapterReplayOperatorWorkflowBody: 'تصدير تقرير التشخيص + لقطة تسليم للمشغّل: تشخيص بوابات مقروء للمشغل فقط. metadata فقط. دون تحقق آلي أو اعتماد أو قفل تصدير أو حفظ حالة أو تصريح نشر.'
      }),
      fr: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.49 Export du rapport diagnostic + instantané de passation opérateur · export artefact',
        hostedDemoVerificationBody: 'Export du rapport diagnostic + instantané de passation opérateur est prêt pour les preuves de release : résumé des rapport diagnostic, checks affectés, instantané de passation, commandes échouées, cause racine probable, contrat d’artefact et checklist de réparation opérateur sont vérifiés avant les gates navigateur/no-browser. Les preuves hébergées doivent annoncer 1.4.0-alpha.49 en interne tout en affichant v1.4.0-alpha.49 Export du rapport diagnostic + instantané de passation opérateur aux utilisateurs. Capture de preuve uniquement : aucun appel fournisseur réel, requête réseau cachée, OAuth/cycle token, persistance d’identifiants, fetch source live, vérification automatique des sources, visa, verrou d’export, persistance de statut, mutation batch, persistance d’état de navigation, signature cryptographique ou permission de publication.',
        analysisReleaseNote: '1.4.0-alpha.49 améliore l’UX du diagnostic groupé avec rapport diagnostic, instantané de passation, cause racine probable, contrat d’artefact et checklist opérateur, tout en restant sans réseau.',
        adapterReplayReviewPackPreviewTitle: 'Export du rapport diagnostic + instantané de passation opérateur',
        adapterReplayReviewPackPreviewBody: 'Vue gouvernance release : rapport diagnostic, checks/instantané de passation, commandes échouées, cause racine probable, contrat d’artefact et checklist opérateur. Aucun appel fournisseur réel.',
        adapterReplayOperatorWorkflowTitle: 'Export du rapport diagnostic + instantané de passation opérateur',
        adapterReplayOperatorWorkflowBody: 'Export du rapport diagnostic + instantané de passation opérateur : diagnostic de gates lisible opérateur uniquement. Metadata only. Aucun auto-contrôle, visa, verrou export, persistance ou permission publication.'
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
    ar: 'v1.4.0-alpha.49 تصدير تقرير التشخيص + لقطة تسليم للمشغّل',
    fr: 'v1.4.0-alpha.49 Export du rapport diagnostic + instantané de passation opérateur'
  });
})();

const ALPHA49_BROWSER_VISIBLE_TEXT_CONTRACT = Object.freeze({
  ar: Object.freeze(['تقرير التشخيص', 'لقطة التسليم', 'عقد المخرجات']),
  fr: Object.freeze(['rapport diagnostic', 'instantané de passation', 'contrat d’artefact']),
  en: Object.freeze(['diagnosis report JSON', 'operator handoff snapshot', 'artifact output contract'])
});

(function enforceAlpha49BrowserVisibleTextContract() {
  const root = typeof globalThis !== 'undefined' ? globalThis : this;
  const contract = root.Jarbou3iResearchReleaseCopyContract;
  if (!contract) return;

  contract.version = CURRENT_RELEASE_IDENTITY.version;
  contract.release = CURRENT_RELEASE_IDENTITY.release;
  contract.releaseTitle = CURRENT_RELEASE_IDENTITY.release;
  contract.milestone = CURRENT_RELEASE_IDENTITY.title;
  contract.publicVersionLabels = Object.assign({}, contract.publicVersionLabels || {}, {
    en: CURRENT_RELEASE_IDENTITY.publicLabel,
    ar: 'v1.4.0-alpha.49 تصدير تقرير التشخيص + لقطة تسليم للمشغّل',
    fr: 'v1.4.0-alpha.49 Export du rapport diagnostic + instantané de passation opérateur'
  });

  contract.requiredVisibleText = Object.assign({}, contract.requiredVisibleText || {}, ALPHA49_BROWSER_VISIBLE_TEXT_CONTRACT);
  contract.expectedCurrentReleaseDescriptionTokens = Object.assign(
    {},
    contract.expectedCurrentReleaseDescriptionTokens || {},
    ALPHA49_BROWSER_VISIBLE_TEXT_CONTRACT
  );

  contract.staleVisibleText = (contract.staleVisibleText || [])
    .filter((token) => ![
      'Evidence Matrix Semantics',
      'دلالات مصفوفة الأدلة',
      'Sémantique de la matrice de preuves'
    ].includes(token));
})();
