/* Jarbou3i Research Engine release copy contract 1.4.0-alpha.44. */
(function(global){
  'use strict';
  const contract = Object.freeze({
    version: '1.4.0-alpha.44',
    publicVersionLabels: Object.freeze({
      en: 'v1.4.0-alpha.44 Evidence Matrix Semantics + Targeted Proof Hardening',
      ar: 'v1.4.0-alpha.44 دلالات مصفوفة الأدلة + تقوية الإثبات المستهدف',
      fr: 'v1.4.0-alpha.44 Sémantique de la matrice de preuves + durcissement de la preuve ciblée'
    }),
    expectedCurrentReleaseDescriptionTokens: Object.freeze({
      en: Object.freeze(["Evidence Matrix Semantics","blocking/advisory language semantics","Targeted Proof Hardening","no full-page-only proof"]),
      ar: Object.freeze(["دلالات مصفوفة الأدلة","التمييز بين الحظر والإرشاد","تقوية الإثبات المستهدف","لا دليل بصفحة كاملة فقط"]),
      fr: Object.freeze(["Sémantique de la matrice de preuves","sémantique bloquante et consultative","durcissement de la preuve ciblée","pas de preuve page entière seule"])
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
        alphaBadge: 'v1.4.0-alpha.44 Evidence Matrix Semantics + Targeted Proof Hardening · targeted evidence',
        hostedDemoVerificationBody: 'Evidence Matrix Semantics + Targeted Proof Hardening is ready for release evidence: hosted-demo proof now separates blocking/advisory language semantics, keeps targeted proof hardening, preserves locator-based screenshots, region-to-claim mapping, bounding boxes, expected-token proof, targeted screenshot sanity limits, and a manifest that rejects full-page-only proof with a no full-page-only proof release rule. Hosted evidence must report 1.4.0-alpha.44 internally while showing v1.4.0-alpha.44 Evidence Matrix Semantics + Targeted Proof Hardening to users. Evidence capture only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, live source fetching, automatic source verification, signoff, export lock, status persistence, batch mutation, navigation-state persistence, cryptographic signature claim, or publication permission is enabled. Full-page screenshots remain context only; proof screenshots must target the specific UI region being verified.',
        analysisReleaseNote: '1.4.0-alpha.44 adds Evidence Matrix Semantics + Targeted Proof Hardening: blocking/advisory language semantics, targeted proof screenshots, region-to-claim mapping, expected-token proof, and no full-page-only proof while remaining no-network.',
        adapterReplayReviewPackPreviewTitle: 'Evidence Matrix Semantics + Targeted Proof Hardening',
        adapterReplayReviewPackPreviewBody: 'Evidence capture view: locator-based screenshots, region-to-claim mapping, bounding boxes, expected tokens, targeted screenshot caps, no full-page-only proof, no live provider calls.',
        adapterReplayOperatorWorkflowTitle: 'Evidence Matrix Semantics + Targeted Proof Hardening',
        adapterReplayOperatorWorkflowBody: 'Evidence Matrix Semantics + Targeted Proof Hardening: operator control room stage board no live provider calls. Targeted hosted evidence capture for the public-demo intelligence workspace. Metadata-only. No automatic verification, signoff, export lock, persistence, or publication permission.'
      }),
      ar: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.44 دلالات مصفوفة الأدلة + تقوية الإثبات المستهدف · أدلة مستهدفة',
        hostedDemoVerificationBody: 'التقاط أدلة الاستضافة المستهدفة جاهز لأدلة الإصدار: يجب أن تعتمد أدلة العرض المستضاف الآن على لقطات محددة بالمحدّد، وربط المنطقة بالادعاء، وصناديق حدود، وإثبات رموز متوقعة، وحدود حجم للقطات المستهدفة، واستمرارية لوحة مراحل operator control room، وmanifest يرفض لا دليل بصفحة كاملة فقط. يجب أن تعلن أدلة الاستضافة داخلياً 1.4.0-alpha.44 مع عرض v1.4.0-alpha.44 دلالات مصفوفة الأدلة + التمييز بين الحظر والإرشاد + تقوية الإثبات المستهدف للمستخدمين. التقاط أدلة فقط: دون نداءات مزوّد حية، دون طلبات شبكة مخفية، دون OAuth أو دورة رموز، دون تخزين بيانات اعتماد، دون جلب مصادر حي، ودون تحقق آلي من المصادر أو توقيع أو قفل تصدير أو حفظ حالة أو تعديل دفعات أو حفظ حالة التنقل أو تصريح نشر. تبقى لقطات الصفحة الكاملة سياقاً فقط؛ يجب أن تستهدف لقطات الإثبات منطقة الواجهة المحددة التي يتم التحقق منها.',
        analysisReleaseNote: 'يضيف 1.4.0-alpha.44 دلالات مصفوفة الأدلة والتمييز بين الحظر والإرشاد وتقوية الإثبات المستهدف مع لقطات محددة بالمحدّد وربط المنطقة بالادعاء وصناديق حدود ورموز متوقعة ورفض دليل الصفحة الكاملة فقط مع البقاء بلا شبكة.',
        adapterReplayReviewPackPreviewTitle: 'التقاط أدلة الاستضافة المستهدفة',
        adapterReplayReviewPackPreviewBody: 'عرض التقاط الأدلة: لقطات محددة بالمحدّد، ربط المنطقة بالادعاء، صناديق حدود، رموز متوقعة، حدود للقطات المستهدفة، لا دليل بصفحة كاملة فقط، دون نداءات مزوّد حية.',
        adapterReplayOperatorWorkflowTitle: 'التقاط أدلة الاستضافة المستهدفة',
        adapterReplayOperatorWorkflowBody: 'التقاط أدلة الاستضافة المستهدفة لمساحة ذكاء العرض العام. metadata فقط. دون تحقق آلي أو اعتماد أو قفل تصدير أو حفظ حالة أو تصريح نشر.'
      }),
      fr: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.44 Sémantique de la matrice de preuves + durcissement de la preuve ciblée · preuves ciblées',
        hostedDemoVerificationBody: 'Capture ciblée des preuves hébergées est prête pour les preuves de release : la preuve de démo hébergée exige désormais des captures par sélecteur, une cartographie région-vers-revendication, des boîtes de délimitation, des jetons attendus prouvés, des limites de taille pour capture ciblée, une continuité stage board operator control room et un manifeste qui refuse pas de preuve page entière seule. Les preuves hébergées doivent annoncer 1.4.0-alpha.44 en interne tout en affichant v1.4.0-alpha.44 Sémantique de la matrice de preuves + sémantique bloquante et consultative + durcissement de la preuve ciblée aux utilisateurs. Capture de preuve uniquement : aucun appel fournisseur réel, requête réseau cachée, OAuth/cycle token, persistance d’identifiants, fetch source live, vérification automatique des sources, visa, verrou d’export, persistance de statut, mutation batch, persistance d’état de navigation, signature cryptographique ou permission de publication. Les captures pleine page restent seulement contextuelles ; les captures de preuve doivent cibler la région UI vérifiée.',
        analysisReleaseNote: '1.4.0-alpha.44 ajoute la sémantique de la matrice de preuves, la sémantique bloquante et consultative, et le durcissement de la preuve ciblée avec captures par sélecteur, cartographie région-vers-revendication, boîtes de délimitation, jetons attendus et refus des preuves pleine page seules, tout en restant sans réseau.',
        adapterReplayReviewPackPreviewTitle: 'Capture ciblée des preuves hébergées',
        adapterReplayReviewPackPreviewBody: 'Vue capture de preuve : captures par sélecteur, cartographie région-vers-revendication, boîtes de délimitation, jetons attendus, limites ciblées, pas de preuve page entière seule, aucun appel fournisseur réel.',
        adapterReplayOperatorWorkflowTitle: 'Capture ciblée des preuves hébergées',
        adapterReplayOperatorWorkflowBody: 'Capture ciblée des preuves hébergées pour l’espace de démonstration public. Metadata only. Aucun auto-contrôle, visa, verrou export, persistance ou permission publication.'
      })
    })
  });
  global.Jarbou3iResearchReleaseCopyContract = contract;
})(typeof window !== 'undefined' ? window : globalThis);
