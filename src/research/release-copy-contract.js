const CURRENT_RELEASE_IDENTITY = Object.freeze({
  version: '1.4.0-alpha.47',
  title: 'Patch Package Safety + Release Identity Sweep Guard',
  release: 'v1.4.0-alpha.47 — Patch Package Safety + Release Identity Sweep Guard',
  publicLabel: 'v1.4.0-alpha.47 Patch Package Safety + Release Identity Sweep Guard',
  runtimeScope: 'patch_package_safety_release_identity_sweep_guard'
});

/* Jarbou3i Research Engine release copy contract 1.4.0-alpha.47. */
(function(global){
  'use strict';
  const contract = Object.freeze({
    version: '1.4.0-alpha.47',
    release: 'v1.4.0-alpha.47 — Patch Package Safety + Release Identity Sweep Guard',
    releaseTitle: 'v1.4.0-alpha.47 — Patch Package Safety + Release Identity Sweep Guard',
    milestone: 'Patch Package Safety + Release Identity Sweep Guard',
    publicVersionLabels: Object.freeze({
      en: 'v1.4.0-alpha.47 Patch Package Safety + Release Identity Sweep Guard',
      ar: 'v1.4.0-alpha.47 أمان حزم التصحيح + حارس مسح هوية الإصدار',
      fr: 'v1.4.0-alpha.47 Sécurité des paquets de correctifs + garde de balayage d’identité de release'
    }),
    expectedCurrentReleaseDescriptionTokens: Object.freeze({
      en: Object.freeze(["patch package collision guard","release identity sweep","bulk diagnosis"]),
      ar: Object.freeze(["حارس تصادم حزم التصحيح","مسح هوية الإصدار","تشخيص جماعي"]),
      fr: Object.freeze(["garde anti-collision des paquets de correctifs","balayage d’identité de release","diagnostic groupé"])
    }),
    staleCurrentReleaseDescriptionTokens: Object.freeze([
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
        alphaBadge: 'v1.4.0-alpha.47 Patch Package Safety + Release Identity Sweep Guard · package safety',
        hostedDemoVerificationBody: 'Patch Package Safety + Release Identity Sweep Guard is ready for release evidence: patch package collision guard, release identity sweep, bulk diagnosis, nested ZIP package contract, PACKAGE-MANIFEST.json metadata, README-PACKAGE.md package notes, and root patch artifact hygiene are verified before browser/no-browser gates. Hosted evidence must report 1.4.0-alpha.47 internally while showing v1.4.0-alpha.47 Patch Package Safety + Release Identity Sweep Guard to users. Evidence capture only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, live source fetching, automatic source verification, signoff, export lock, status persistence, batch mutation, navigation-state persistence, cryptographic signature claim, or publication permission is enabled.',
        analysisReleaseNote: '1.4.0-alpha.47 adds patch package collision guard, release identity sweep, bulk diagnosis, and root patch artifact hygiene while remaining no-network.',
        adapterReplayReviewPackPreviewTitle: 'Patch Package Safety + Release Identity Sweep Guard',
        adapterReplayReviewPackPreviewBody: 'Release governance view: patch package collision guard, nested ZIP contract, release identity sweep, bulk diagnosis, and root patch artifact hygiene. No live provider calls.',
        adapterReplayOperatorWorkflowTitle: 'Patch Package Safety + Release Identity Sweep Guard',
        adapterReplayOperatorWorkflowBody: 'Patch Package Safety + Release Identity Sweep Guard: operator control room release-governance stage board only. Metadata-only. No automatic verification, signoff, export lock, persistence, or publication permission.'
      }),
      ar: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.47 أمان حزم التصحيح + حارس مسح هوية الإصدار · أمان الحزم',
        hostedDemoVerificationBody: 'أمان حزم التصحيح + حارس مسح هوية الإصدار جاهز لأدلة الإصدار: يتم التحقق من حارس تصادم حزم التصحيح، ومسح هوية الإصدار، وتشخيص جماعي، وعقد ZIP بمجلد متداخل، وبيانات PACKAGE-MANIFEST.json، وملاحظات README-PACKAGE.md، ونظافة آثار التصحيح في الجذر قبل بوابات المتصفح و no-browser. يجب أن تعلن أدلة الاستضافة داخلياً 1.4.0-alpha.47 مع عرض v1.4.0-alpha.47 أمان حزم التصحيح + حارس مسح هوية الإصدار للمستخدمين. التقاط أدلة فقط: دون نداءات مزوّد حية، دون طلبات شبكة مخفية، دون OAuth أو دورة رموز، دون تخزين بيانات اعتماد، دون جلب مصادر حي، ودون تحقق آلي من المصادر أو توقيع أو قفل تصدير أو حفظ حالة أو تعديل دفعات أو حفظ حالة التنقل أو تصريح نشر.',
        analysisReleaseNote: 'يضيف 1.4.0-alpha.47 حارس تصادم حزم التصحيح، ومسح هوية الإصدار، وتشخيص جماعي، ونظافة آثار التصحيح في الجذر مع البقاء بلا شبكة.',
        adapterReplayReviewPackPreviewTitle: 'أمان حزم التصحيح + حارس مسح هوية الإصدار',
        adapterReplayReviewPackPreviewBody: 'عرض حوكمة الإصدار: حارس تصادم حزم التصحيح، عقد ZIP متداخل، مسح هوية الإصدار، تشخيص جماعي، ونظافة آثار التصحيح في الجذر. دون نداءات مزوّد حية.',
        adapterReplayOperatorWorkflowTitle: 'أمان حزم التصحيح + حارس مسح هوية الإصدار',
        adapterReplayOperatorWorkflowBody: 'أمان حزم التصحيح + حارس مسح هوية الإصدار: لوحة مراحل حوكمة الإصدار فقط. metadata فقط. دون تحقق آلي أو اعتماد أو قفل تصدير أو حفظ حالة أو تصريح نشر.'
      }),
      fr: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.47 Sécurité des paquets de correctifs + garde de balayage d’identité de release · sécurité package',
        hostedDemoVerificationBody: 'Sécurité des paquets de correctifs + garde de balayage d’identité de release est prête pour les preuves de release : garde anti-collision des paquets de correctifs, balayage d’identité de release, diagnostic groupé, contrat ZIP à dossier imbriqué, métadonnées PACKAGE-MANIFEST.json, notes README-PACKAGE.md et hygiène des artefacts de patch à la racine sont vérifiés avant les gates navigateur/no-browser. Les preuves hébergées doivent annoncer 1.4.0-alpha.47 en interne tout en affichant v1.4.0-alpha.47 Sécurité des paquets de correctifs + garde de balayage d’identité de release aux utilisateurs. Capture de preuve uniquement : aucun appel fournisseur réel, requête réseau cachée, OAuth/cycle token, persistance d’identifiants, fetch source live, vérification automatique des sources, visa, verrou d’export, persistance de statut, mutation batch, persistance d’état de navigation, signature cryptographique ou permission de publication.',
        analysisReleaseNote: '1.4.0-alpha.47 ajoute la garde anti-collision des paquets de correctifs, le balayage d’identité de release, le diagnostic groupé et l’hygiène des artefacts de patch à la racine, tout en restant sans réseau.',
        adapterReplayReviewPackPreviewTitle: 'Sécurité des paquets de correctifs + garde de balayage d’identité de release',
        adapterReplayReviewPackPreviewBody: 'Vue gouvernance release : garde anti-collision des paquets de correctifs, contrat ZIP imbriqué, balayage d’identité de release, diagnostic groupé et hygiène des artefacts de patch à la racine. Aucun appel fournisseur réel.',
        adapterReplayOperatorWorkflowTitle: 'Sécurité des paquets de correctifs + garde de balayage d’identité de release',
        adapterReplayOperatorWorkflowBody: 'Sécurité des paquets de correctifs + garde de balayage d’identité de release : stage board gouvernance uniquement. Metadata only. Aucun auto-contrôle, visa, verrou export, persistance ou permission publication.'
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
    ar: (contract.publicVersionLabels && contract.publicVersionLabels.ar
      ? String(contract.publicVersionLabels.ar).replace(/^v1\.4\.0-alpha\.\d+/, 'v1.4.0-alpha.47')
      : CURRENT_RELEASE_IDENTITY.publicLabel),
    fr: (contract.publicVersionLabels && contract.publicVersionLabels.fr
      ? String(contract.publicVersionLabels.fr).replace(/^v1\.4\.0-alpha\.\d+/, 'v1.4.0-alpha.47')
      : CURRENT_RELEASE_IDENTITY.publicLabel)
  });

  if (contract.copy) {
    for (const locale of Object.keys(contract.copy)) {
      const copy = contract.copy[locale];
      if (!copy || typeof copy !== 'object') continue;

      for (const key of Object.keys(copy)) {
        if (typeof copy[key] !== 'string') continue;
        copy[key] = copy[key]
          .replace(/v1\.4\.0-alpha\.44 — Evidence Matrix Semantics \+ Targeted Proof Hardening/g, CURRENT_RELEASE_IDENTITY.release)
          .replace(/v1\.4\.0-alpha\.44 Evidence Matrix Semantics \+ Targeted Proof Hardening/g, CURRENT_RELEASE_IDENTITY.publicLabel)
          .replace(/1\.4\.0-alpha\.44/g, CURRENT_RELEASE_IDENTITY.version)
          .replace(/Evidence Matrix Semantics \+ Targeted Proof Hardening/g, CURRENT_RELEASE_IDENTITY.title);
      }
    }
  }
})();

const ALPHA47_BROWSER_VISIBLE_TEXT_CONTRACT = Object.freeze({
  ar: Object.freeze(['حارس تصادم حزم التصحيح', 'مسح هوية الإصدار', 'تشخيص جماعي']),
  fr: Object.freeze(['garde anti-collision des paquets de correctifs', 'balayage d’identité de release', 'diagnostic groupé']),
  en: Object.freeze(['patch package collision guard', 'release identity sweep', 'bulk diagnosis'])
});

(function enforceAlpha47BrowserVisibleTextContract() {
  const root = typeof globalThis !== 'undefined' ? globalThis : this;
  const contract = root.Jarbou3iResearchReleaseCopyContract;
  if (!contract) return;

  contract.version = '1.4.0-alpha.47';
  contract.release = 'v1.4.0-alpha.47 — Patch Package Safety + Release Identity Sweep Guard';
  contract.releaseTitle = 'v1.4.0-alpha.47 — Patch Package Safety + Release Identity Sweep Guard';
  contract.milestone = 'Patch Package Safety + Release Identity Sweep Guard';
  contract.publicVersionLabels = Object.assign({}, contract.publicVersionLabels || {}, {
    en: 'v1.4.0-alpha.47 Patch Package Safety + Release Identity Sweep Guard',
    ar: (contract.publicVersionLabels && contract.publicVersionLabels.ar
      ? String(contract.publicVersionLabels.ar).replace(/^v1\.4\.0-alpha\.\d+/, 'v1.4.0-alpha.47')
      : 'v1.4.0-alpha.47 Patch Package Safety + Release Identity Sweep Guard'),
    fr: (contract.publicVersionLabels && contract.publicVersionLabels.fr
      ? String(contract.publicVersionLabels.fr).replace(/^v1\.4\.0-alpha\.\d+/, 'v1.4.0-alpha.47')
      : 'v1.4.0-alpha.47 Patch Package Safety + Release Identity Sweep Guard')
  });

  contract.requiredVisibleText = Object.assign({}, contract.requiredVisibleText || {}, ALPHA47_BROWSER_VISIBLE_TEXT_CONTRACT);
  contract.expectedCurrentReleaseDescriptionTokens = Object.assign(
    {},
    contract.expectedCurrentReleaseDescriptionTokens || {},
    ALPHA47_BROWSER_VISIBLE_TEXT_CONTRACT
  );

  contract.staleVisibleText = (contract.staleVisibleText || [])
    .filter((token) => ![
      'Evidence Matrix Semantics',
      'دلالات مصفوفة الأدلة',
      'Sémantique de la matrice de preuves'
    ].includes(token));
})();
