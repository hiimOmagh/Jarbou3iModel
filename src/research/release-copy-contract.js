const CURRENT_RELEASE_IDENTITY = Object.freeze({
  version: '1.4.0-alpha.54',
  title: 'Lock Evidence Review CLI + Digest Reader',
  release: 'v1.4.0-alpha.54 — Lock Evidence Review CLI + Digest Reader',
  publicLabel: 'v1.4.0-alpha.54 Lock Evidence Review CLI + Digest Reader',
  runtimeScope: 'lock_evidence_review_cli_digest_reader'
});

/* Jarbou3i Research Engine release copy contract 1.4.0-alpha.54. */
(function(global){
  'use strict';
  const contract = Object.freeze({
    version: '1.4.0-alpha.54',
    release: 'v1.4.0-alpha.54 — Lock Evidence Review CLI + Digest Reader',
    releaseTitle: 'v1.4.0-alpha.54 — Lock Evidence Review CLI + Digest Reader',
    milestone: 'Lock Evidence Review CLI + Digest Reader',
    publicVersionLabels: Object.freeze({
      en: 'v1.4.0-alpha.54 Lock Evidence Review CLI + Digest Reader',
      ar: 'v1.4.0-alpha.54 واجهة مراجعة أدلة القفل وقراءة الملخص',
      fr: 'v1.4.0-alpha.54 CLI de revue des preuves de verrouillage + lecteur de digest'
    }),
    expectedCurrentReleaseDescriptionTokens: Object.freeze({
      en: Object.freeze(['review CLI', 'digest reader', 'next action']),
      ar: Object.freeze(['واجهة مراجعة أدلة القفل', 'قراءة الملخص', 'الإجراء التالي']),
      fr: Object.freeze(['CLI de revue', 'lecteur de digest', 'prochaine action'])
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
        alphaBadge: 'v1.4.0-alpha.54 Lock Evidence Review CLI + Digest Reader · artifact export',
        hostedDemoVerificationBody: 'Lock Evidence Review CLI + Digest Reader is ready for release evidence: operators can read a lock bundle ZIP or extracted bundle, print the reviewer decision, gate status, evidence counts, checksum coverage, stale-residue state, and next action from the dashboard digest. Hosted evidence must report 1.4.0-alpha.54 internally while showing v1.4.0-alpha.54 Lock Evidence Review CLI + Digest Reader to users. Evidence capture only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, live source fetching, automatic source verification, signoff, export lock, status persistence, batch mutation, navigation-state persistence, cryptographic signature claim, or publication permission is enabled.',
        analysisReleaseNote: '1.4.0-alpha.54 adds a read-only lock evidence review CLI and digest reader while remaining no-network.',
        adapterReplayReviewPackPreviewTitle: 'Lock Evidence Review CLI + Digest Reader',
        adapterReplayReviewPackPreviewBody: 'Release governance view: read-only lock evidence review CLI, digest reader, checksum coverage, stale-residue status, and next action. No live provider calls.',
        adapterReplayOperatorWorkflowTitle: 'Lock Evidence Review CLI + Digest Reader',
        adapterReplayOperatorWorkflowBody: 'Lock Evidence Review CLI + Digest Reader: read-only digest review for operator handoff inside the operator control room stage board only. Metadata-only. No automatic verification, signoff, export lock, persistence, or publication permission.'
      }),
      ar: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.54 واجهة مراجعة أدلة القفل وقراءة الملخص · ملخص القفل',
        hostedDemoVerificationBody: 'واجهة مراجعة أدلة القفل وقراءة الملخص جاهزة لأدلة الإصدار: يمكن للمشغّل قراءة حزمة ZIP أو مجلد مستخرج، وإظهار قرار المراجع، حالة البوابات، أعداد الأدلة، تغطية checksum، حالة البقايا القديمة، وملخص الأدلة والإجراء التالي من ملخص اللوحة. يجب أن تعلن أدلة الاستضافة داخلياً 1.4.0-alpha.54 مع عرض v1.4.0-alpha.54 واجهة مراجعة أدلة القفل وقراءة الملخص للمستخدمين. التقاط أدلة فقط: دون نداءات مزوّد حية، دون طلبات شبكة مخفية، دون OAuth أو دورة رموز، دون تخزين بيانات اعتماد، دون جلب مصادر حي، ودون تحقق آلي من المصادر أو توقيع أو قفل تصدير أو حفظ حالة أو تعديل دفعات أو حفظ حالة التنقل أو تصريح نشر.',
        analysisReleaseNote: 'يضيف 1.4.0-alpha.54 واجهة مراجعة أدلة القفل وقراءة الملخص دون شبكة.',
        adapterReplayReviewPackPreviewTitle: 'واجهة مراجعة أدلة القفل وقراءة الملخص',
        adapterReplayReviewPackPreviewBody: 'عرض حوكمة الإصدار: واجهة قراءة ZIP أو مجلد الحزمة، قرار المراجع، حالة البوابات، أعداد الأدلة، والإجراء التالي. دون نداءات مزوّد حية.',
        adapterReplayOperatorWorkflowTitle: 'واجهة مراجعة أدلة القفل وقراءة الملخص',
        adapterReplayOperatorWorkflowBody: 'واجهة مراجعة أدلة القفل وقراءة الملخص: قراءة metadata فقط لحزمة القفل ومساعدة المراجعة المحلية. دون تحقق آلي أو اعتماد أو قفل تصدير أو حفظ حالة أو تصريح نشر.'
      }),
      fr: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.54 CLI de revue des preuves de verrouillage + lecteur de digest · digest verrouillage',
        hostedDemoVerificationBody: 'CLI de revue des preuves de verrouillage + lecteur de digest est prête pour les preuves de release : les opérateurs peuvent lire un ZIP ou un dossier extrait, afficher la décision reviewer, les statuts de gates, les compteurs de preuve, la couverture checksum, le résidu de version et la prochaine action depuis le dashboard digest. Les preuves hébergées doivent annoncer 1.4.0-alpha.54 en interne tout en affichant v1.4.0-alpha.54 CLI de revue des preuves de verrouillage + lecteur de digest aux utilisateurs. Capture de preuve uniquement : aucun appel fournisseur réel, requête réseau cachée, OAuth/cycle token, persistance d’identifiants, fetch source live, vérification automatique des sources, visa, verrou d’export, persistance de statut, mutation batch, persistance d’état de navigation, signature cryptographique ou permission de publication.',
        analysisReleaseNote: '1.4.0-alpha.54 ajoute un CLI de revue des preuves et un lecteur de digest, tout en restant sans réseau.',
        adapterReplayReviewPackPreviewTitle: 'CLI de revue des preuves de verrouillage + lecteur de digest',
        adapterReplayReviewPackPreviewBody: 'Vue gouvernance release : CLI de lecture ZIP/dossier, décision reviewer, gates, compteurs de preuve, checksum et prochaine action. Aucun appel fournisseur réel.',
        adapterReplayOperatorWorkflowTitle: 'CLI de revue des preuves de verrouillage + lecteur de digest',
        adapterReplayOperatorWorkflowBody: 'CLI de revue des preuves de verrouillage + lecteur de digest : revue locale metadata-only du bundle et prochaine action. Aucun auto-contrôle, visa, verrou export, persistance ou permission publication.'
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
    ar: 'v1.4.0-alpha.54 واجهة مراجعة أدلة القفل وقراءة الملخص',
    fr: 'v1.4.0-alpha.54 CLI de revue des preuves de verrouillage + lecteur de digest'
  });
})();

const ALPHA54_BROWSER_VISIBLE_TEXT_CONTRACT = Object.freeze({
  ar: Object.freeze(['واجهة مراجعة أدلة القفل', 'قراءة الملخص', 'الإجراء التالي']),
  fr: Object.freeze(['CLI de revue', 'lecteur de digest', 'prochaine action']),
  en: Object.freeze(['review CLI', 'digest reader', 'next action'])
});

(function enforceAlpha54BrowserVisibleTextContract() {
  const root = typeof globalThis !== 'undefined' ? globalThis : this;
  const contract = root.Jarbou3iResearchReleaseCopyContract;
  if (!contract) return;

  contract.version = CURRENT_RELEASE_IDENTITY.version;
  contract.release = CURRENT_RELEASE_IDENTITY.release;
  contract.releaseTitle = CURRENT_RELEASE_IDENTITY.release;
  contract.milestone = CURRENT_RELEASE_IDENTITY.title;
  contract.publicVersionLabels = Object.assign({}, contract.publicVersionLabels || {}, {
    en: CURRENT_RELEASE_IDENTITY.publicLabel,
    ar: 'v1.4.0-alpha.54 واجهة مراجعة أدلة القفل وقراءة الملخص',
    fr: 'v1.4.0-alpha.54 CLI de revue des preuves de verrouillage + lecteur de digest'
  });

  contract.requiredVisibleText = Object.assign({}, contract.requiredVisibleText || {}, ALPHA54_BROWSER_VISIBLE_TEXT_CONTRACT);
  contract.expectedCurrentReleaseDescriptionTokens = Object.assign(
    {},
    contract.expectedCurrentReleaseDescriptionTokens || {},
    ALPHA54_BROWSER_VISIBLE_TEXT_CONTRACT
  );

  contract.staleVisibleText = (contract.staleVisibleText || [])
    .filter((token) => ![
      'Evidence Matrix Semantics',
      'دلالات مصفوفة الأدلة',
      'Sémantique de la matrice de preuves'
    ].includes(token));
})();
