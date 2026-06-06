const CURRENT_RELEASE_IDENTITY = Object.freeze({
  version: '1.4.0-alpha.51',
  title: 'Release Lock Dashboard Artifact + Evidence Digest',
  release: 'v1.4.0-alpha.51 — Release Lock Dashboard Artifact + Evidence Digest',
  publicLabel: 'v1.4.0-alpha.51 Release Lock Dashboard Artifact + Evidence Digest',
  runtimeScope: 'release_lock_dashboard_artifact_evidence_digest'
});

/* Jarbou3i Research Engine release copy contract 1.4.0-alpha.51. */
(function(global){
  'use strict';
  const contract = Object.freeze({
    version: '1.4.0-alpha.51',
    release: 'v1.4.0-alpha.51 — Release Lock Dashboard Artifact + Evidence Digest',
    releaseTitle: 'v1.4.0-alpha.51 — Release Lock Dashboard Artifact + Evidence Digest',
    milestone: 'Release Lock Dashboard Artifact + Evidence Digest',
    publicVersionLabels: Object.freeze({
      en: 'v1.4.0-alpha.51 Release Lock Dashboard Artifact + Evidence Digest',
      ar: 'v1.4.0-alpha.51 لوحة قفل الإصدار + ملخص الأدلة',
      fr: 'v1.4.0-alpha.51 Tableau de verrouillage de release + digest des preuves'
    }),
    expectedCurrentReleaseDescriptionTokens: Object.freeze({
      en: Object.freeze(['release lock dashboard', 'evidence digest', 'lockable reviewer decision']),
      ar: Object.freeze(['لوحة قفل الإصدار', 'ملخص الأدلة', 'قرار القفل']),
      fr: Object.freeze(['tableau de verrouillage', 'digest des preuves', 'décision de verrouillage'])
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
        alphaBadge: 'v1.4.0-alpha.51 Release Lock Dashboard Artifact + Evidence Digest · artifact export',
        hostedDemoVerificationBody: 'Release Lock Dashboard Artifact + Evidence Digest is ready for release evidence: a compact release-lock dashboard, evidence digest, no-browser/browser gate summary, matrix and hosted-capture counts, targeted-region proof, stale-residue status, and lockable reviewer decision are available for evidence review. Hosted evidence must report 1.4.0-alpha.51 internally while showing v1.4.0-alpha.51 Release Lock Dashboard Artifact + Evidence Digest to users. Evidence capture only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, live source fetching, automatic source verification, signoff, export lock, status persistence, batch mutation, navigation-state persistence, cryptographic signature claim, or publication permission is enabled.',
        analysisReleaseNote: '1.4.0-alpha.51 exports a compact release-lock dashboard evidence digest while remaining no-network.',
        adapterReplayReviewPackPreviewTitle: 'Release Lock Dashboard Artifact + Evidence Digest',
        adapterReplayReviewPackPreviewBody: 'Release governance view: lock dashboard digest, gate status, evidence matrix count, hosted capture proof, targeted region summary, and reviewer lock decision. No live provider calls.',
        adapterReplayOperatorWorkflowTitle: 'Release Lock Dashboard Artifact + Evidence Digest',
        adapterReplayOperatorWorkflowBody: 'Release Lock Dashboard Artifact + Evidence Digest: compact lock evidence digest for operator handoff inside the operator control room stage board only. Metadata-only. No automatic verification, signoff, export lock, persistence, or publication permission.'
      }),
      ar: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.51 لوحة قفل الإصدار + ملخص الأدلة · ملخص القفل',
        hostedDemoVerificationBody: 'لوحة قفل الإصدار + ملخص الأدلة جاهزة لأدلة الإصدار: يتم تلخيص بوابات no-browser والمتصفح، وعدّ صفوف مصفوفة الأدلة، ولقطات الاستضافة، ومناطق الإثبات المستهدفة، وحالة بقايا النسخ القديمة، وقرار القفل للمراجع في ملخص واحد. يجب أن تعلن أدلة الاستضافة داخلياً 1.4.0-alpha.51 مع عرض v1.4.0-alpha.51 لوحة قفل الإصدار + ملخص الأدلة للمستخدمين. التقاط أدلة فقط: دون نداءات مزوّد حية، دون طلبات شبكة مخفية، دون OAuth أو دورة رموز، دون تخزين بيانات اعتماد، دون جلب مصادر حي، ودون تحقق آلي من المصادر أو توقيع أو قفل تصدير أو حفظ حالة أو تعديل دفعات أو حفظ حالة التنقل أو تصريح نشر.',
        analysisReleaseNote: 'يضيف 1.4.0-alpha.51 لوحة قفل الإصدار وملخص الأدلة وقرار القفل للمراجع مع البقاء بلا شبكة.',
        adapterReplayReviewPackPreviewTitle: 'لوحة قفل الإصدار + ملخص الأدلة',
        adapterReplayReviewPackPreviewBody: 'عرض حوكمة الإصدار: ملخص بوابات القفل، مصفوفة الأدلة، لقطات الاستضافة، مناطق الإثبات، وقرار القفل للمراجع. دون نداءات مزوّد حية.',
        adapterReplayOperatorWorkflowTitle: 'لوحة قفل الإصدار + ملخص الأدلة',
        adapterReplayOperatorWorkflowBody: 'لوحة قفل الإصدار + ملخص الأدلة: ملخص أدلة القفل للمشغل فقط. metadata فقط. دون تحقق آلي أو اعتماد أو قفل تصدير أو حفظ حالة أو تصريح نشر.'
      }),
      fr: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.51 Tableau de verrouillage de release + digest des preuves · digest verrouillage',
        hostedDemoVerificationBody: 'Tableau de verrouillage de release + digest des preuves est prêt pour les preuves de release : le digest résume les gates no-browser/navigateur, les lignes de matrice, les captures hébergées, les régions ciblées, les résidus de version ancienne et la décision de verrouillage du reviewer. Les preuves hébergées doivent annoncer 1.4.0-alpha.51 en interne tout en affichant v1.4.0-alpha.51 Tableau de verrouillage de release + digest des preuves aux utilisateurs. Capture de preuve uniquement : aucun appel fournisseur réel, requête réseau cachée, OAuth/cycle token, persistance d’identifiants, fetch source live, vérification automatique des sources, visa, verrou d’export, persistance de statut, mutation batch, persistance d’état de navigation, signature cryptographique ou permission de publication.',
        analysisReleaseNote: '1.4.0-alpha.51 ajoute un tableau de verrouillage et un digest des preuves, tout en restant sans réseau.',
        adapterReplayReviewPackPreviewTitle: 'Tableau de verrouillage de release + digest des preuves',
        adapterReplayReviewPackPreviewBody: 'Vue gouvernance release : digest des gates, matrice de preuves, captures hébergées, régions ciblées et décision reviewer. Aucun appel fournisseur réel.',
        adapterReplayOperatorWorkflowTitle: 'Tableau de verrouillage de release + digest des preuves',
        adapterReplayOperatorWorkflowBody: 'Tableau de verrouillage de release + digest des preuves : digest de preuves de verrouillage uniquement. Metadata only. Aucun auto-contrôle, visa, verrou export, persistance ou permission publication.'
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
    ar: 'v1.4.0-alpha.51 لوحة قفل الإصدار + ملخص الأدلة',
    fr: 'v1.4.0-alpha.51 Tableau de verrouillage de release + digest des preuves'
  });
})();

const ALPHA51_BROWSER_VISIBLE_TEXT_CONTRACT = Object.freeze({
  ar: Object.freeze(['لوحة قفل الإصدار', 'ملخص الأدلة', 'قرار القفل']),
  fr: Object.freeze(['tableau de verrouillage', 'digest des preuves', 'décision de verrouillage']),
  en: Object.freeze(['release lock dashboard', 'evidence digest', 'lockable reviewer decision'])
});

(function enforceAlpha51BrowserVisibleTextContract() {
  const root = typeof globalThis !== 'undefined' ? globalThis : this;
  const contract = root.Jarbou3iResearchReleaseCopyContract;
  if (!contract) return;

  contract.version = CURRENT_RELEASE_IDENTITY.version;
  contract.release = CURRENT_RELEASE_IDENTITY.release;
  contract.releaseTitle = CURRENT_RELEASE_IDENTITY.release;
  contract.milestone = CURRENT_RELEASE_IDENTITY.title;
  contract.publicVersionLabels = Object.assign({}, contract.publicVersionLabels || {}, {
    en: CURRENT_RELEASE_IDENTITY.publicLabel,
    ar: 'v1.4.0-alpha.51 لوحة قفل الإصدار + ملخص الأدلة',
    fr: 'v1.4.0-alpha.51 Tableau de verrouillage de release + digest des preuves'
  });

  contract.requiredVisibleText = Object.assign({}, contract.requiredVisibleText || {}, ALPHA51_BROWSER_VISIBLE_TEXT_CONTRACT);
  contract.expectedCurrentReleaseDescriptionTokens = Object.assign(
    {},
    contract.expectedCurrentReleaseDescriptionTokens || {},
    ALPHA51_BROWSER_VISIBLE_TEXT_CONTRACT
  );

  contract.staleVisibleText = (contract.staleVisibleText || [])
    .filter((token) => ![
      'Evidence Matrix Semantics',
      'دلالات مصفوفة الأدلة',
      'Sémantique de la matrice de preuves'
    ].includes(token));
})();
