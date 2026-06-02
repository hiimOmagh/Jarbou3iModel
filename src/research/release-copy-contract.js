/* Jarbou3i Research Engine release copy contract 1.4.0-alpha.40. */
(function(global){
  'use strict';
  const contract = Object.freeze({
    version: '1.4.0-alpha.40',
    publicVersionLabels: Object.freeze({
      en: 'v1.4.0-alpha.40 Source-to-Brief Publication Readiness Suite',
      ar: 'v1.4.0-alpha.40 مجموعة جاهزية النشر من المصدر إلى الموجز',
      fr: 'v1.4.0-alpha.40 Suite de préparation à la publication source-vers-brief'
    }),
    expectedCurrentReleaseDescriptionTokens: Object.freeze({
      en: Object.freeze(['Source-to-Brief Publication Readiness Suite','publication risk matrix','claim-boundary checklist','source coverage digest','no live provider calls']),
      ar: Object.freeze(['مجموعة جاهزية النشر','مصفوفة مخاطر النشر','قائمة حدود الادعاءات','ملخص تغطية المصادر','دون نداءات مزوّد حية']),
      fr: Object.freeze(['Suite de préparation à la publication','matrice de risque publication','checklist de limites des affirmations','digest de couverture des sources','aucun appel fournisseur réel'])
    }),
    staleCurrentReleaseDescriptionTokens: Object.freeze([
      'v1.4.0-alpha.39 Source-to-Brief Operator Control Room',
      'v1.4.0-alpha.39 — Source-to-Brief Operator Control Room',
      'v1.4.0-alpha.39 غرفة تحكم المشغّل من المصدر إلى الموجز',
      'v1.4.0-alpha.39 Salle de contrôle opérateur source-vers-brief',
      'Source-to-Brief Operator Control Room is ready for release evidence',
      'صندوق رمل محوّل المزوّد اليدوي + عقد الاستدعاء العابر جاهز لأدلة الإصدار',
      'قمرة أمان التنفيذ اليدوي + سجل الجلسة جاهزة لأدلة الإصدار',
      'النموذج الأولي المحدود للتنفيذ الحي اليدوي جاهز لأدلة الإصدار',
      'غرفة تحكم المشغّل من المصدر إلى الموجز جاهزة لأدلة الإصدار',
      'Salle de contrôle opérateur source-vers-brief est prête pour les preuves de release',
      'v1.4.0-alpha.38 Source-to-Brief Operator Continuity Console',
      'v1.4.0-alpha.38 Console de continuité opérateur source-vers-brief',
      'v1.4.0-alpha.38 وحدة استمرارية المشغّل من المصدر إلى الموجز',
      'v1.4.0-alpha.37 Adapter Replay Review Pack Compact Navigation UX',
      'v1.4.0-alpha.37 تجربة التنقل المختصر لحزمة مراجعة إعادة التشغيل',
      'v1.4.0-alpha.37 UX de navigation compacte du pack de revue de rejeu',
      'v1.4.0-alpha.36 Adapter Replay Review Pack Operator Review Console',
      'v1.4.0-alpha.35 Adapter Replay Review Pack Handoff Dossier',
      'v1.4.0-alpha.34 Adapter Replay Review Pack Triage Workbench',
      'v1.4.0-alpha.33 Adapter Replay Review Pack Decision Queue',
      'v1.4.0-alpha.32 Adapter Replay Review Pack Evidence Trace Reader',
      'v1.4.0-alpha.30 Release Identity Single Source Contract',
      'v1.4.0-alpha.29 Adapter Replay Review Pack UI Polish + Export Preview'
    ]),
    copy: Object.freeze({
      en: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.40 Source-to-Brief Publication Readiness Suite · publication readiness',
        hostedDemoVerificationBody: 'Source-to-Brief Publication Readiness Suite is ready for release evidence: it converts the source-to-brief control room into a manual publication risk matrix, claim-boundary checklist, source coverage digest, unresolved-gap blocker map, evidence sufficiency bands, operator publication decision summary, and export-ready readiness report over the operator control room stage board without changing provider execution. Hosted evidence must report 1.4.0-alpha.40 internally while showing v1.4.0-alpha.40 Source-to-Brief Publication Readiness Suite to users. Publication readiness only: no live provider calls, hidden network requests, OAuth/token lifecycle, credential persistence, live source fetching, automatic source verification, signoff, export lock, status persistence, batch mutation, navigation-state persistence, cryptographic signature claim, or publication permission is enabled.',
        analysisReleaseNote: '1.4.0-alpha.40 adds a metadata-only source-to-brief publication readiness suite with publication risk matrix, claim-boundary checklist, source coverage digest, blocker map, sufficiency bands, decision summary, and readiness report while remaining no-network.',
        adapterReplayReviewPackPreviewTitle: 'Source-to-Brief Publication Readiness Suite',
        adapterReplayReviewPackPreviewBody: 'Publication readiness view: publication risk matrix, claim-boundary checklist, source coverage digest, unresolved-gap blocker map, evidence sufficiency bands, operator decision summary, export-ready readiness report, no live provider calls.',
        adapterReplayOperatorWorkflowTitle: 'Source-to-Brief Publication Readiness Suite',
        adapterReplayOperatorWorkflowBody: 'Manual publication readiness suite for source-to-brief control. Metadata-only. No automatic verification, signoff, export lock, or publication permission.'
      }),
      ar: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.40 مجموعة جاهزية النشر من المصدر إلى الموجز · جاهزية النشر',
        hostedDemoVerificationBody: 'مجموعة جاهزية النشر من المصدر إلى الموجز جاهزة لأدلة الإصدار: تحول غرفة التحكم إلى مصفوفة مخاطر النشر وقائمة حدود الادعاءات وملخص تغطية المصادر وخريطة عوائق الفجوات المفتوحة ونطاقات كفاية الأدلة وملخص قرار نشر يدوي وتقرير جاهزية للتصدير فوق لوحة المراحل في غرفة التحكم دون تغيير تنفيذ المزوّد. يجب أن تعلن أدلة الاستضافة داخلياً 1.4.0-alpha.40 مع عرض v1.4.0-alpha.40 مجموعة جاهزية النشر من المصدر إلى الموجز للمستخدمين. جاهزية نشر بلا شبكة فقط: دون نداءات مزوّد حية، دون طلبات شبكة مخفية، دون OAuth أو دورة رموز، دون تخزين بيانات اعتماد، دون جلب مصادر حي، ودون تحقق آلي من المصادر أو توقيع أو قفل تصدير أو حفظ حالة أو تعديل دفعات أو حفظ حالة التنقل أو تصريح نشر.',
        analysisReleaseNote: 'يضيف 1.4.0-alpha.40 مجموعة جاهزية نشر metadata فقط مع مصفوفة مخاطر النشر وقائمة حدود الادعاءات وملخص تغطية المصادر وخريطة العوائق ونطاقات الكفاية وملخص القرار وتقرير الجاهزية مع البقاء بلا شبكة.',
        adapterReplayReviewPackPreviewTitle: 'مجموعة جاهزية النشر من المصدر إلى الموجز',
        adapterReplayReviewPackPreviewBody: 'عرض جاهزية النشر: مصفوفة مخاطر النشر، قائمة حدود الادعاءات، ملخص تغطية المصادر، خريطة عوائق الفجوات، نطاقات كفاية الأدلة، ملخص قرار المشغّل، تقرير جاهز للتصدير، دون نداءات مزوّد حية.',
        adapterReplayOperatorWorkflowTitle: 'مجموعة جاهزية النشر من المصدر إلى الموجز',
        adapterReplayOperatorWorkflowBody: 'مجموعة يدوية لجاهزية النشر من المصدر إلى الموجز. metadata فقط. دون تحقق آلي أو اعتماد أو قفل تصدير أو تصريح نشر.'
      }),
      fr: Object.freeze({
        alphaBadge: 'v1.4.0-alpha.40 Suite de préparation à la publication source-vers-brief · préparation publication',
        hostedDemoVerificationBody: 'Suite de préparation à la publication source-vers-brief est prête pour les preuves de release : elle transforme la salle de contrôle en matrice de risque publication, checklist de limites des affirmations, digest de couverture des sources, carte des bloqueurs d’écarts ouverts, bandes de suffisance des preuves, résumé de décision publication opérateur et rapport de préparation prêt pour export au-dessus du tableau des étapes de la salle de contrôle opérateur sans changer l’exécution fournisseur. Les preuves hébergées doivent annoncer 1.4.0-alpha.40 en interne tout en affichant v1.4.0-alpha.40 Suite de préparation à la publication source-vers-brief aux utilisateurs. Préparation publication sans réseau uniquement : aucun appel fournisseur réel, requête réseau cachée, OAuth/cycle token, persistance d’identifiants, fetch source live, vérification automatique des sources, visa, verrou d’export, persistance de statut, mutation batch, persistance d’état de navigation, signature cryptographique ou permission de publication.',
        analysisReleaseNote: '1.4.0-alpha.40 ajoute une suite metadata-only de préparation publication avec matrice de risque publication, checklist de limites, digest de couverture, carte des bloqueurs, bandes de suffisance, résumé décisionnel et rapport prêt pour export, tout en restant sans réseau.',
        adapterReplayReviewPackPreviewTitle: 'Suite de préparation à la publication source-vers-brief',
        adapterReplayReviewPackPreviewBody: 'Vue préparation publication : matrice de risque publication, checklist de limites des affirmations, digest de couverture des sources, carte des bloqueurs, bandes de suffisance, résumé décisionnel, rapport prêt pour export, aucun appel fournisseur réel.',
        adapterReplayOperatorWorkflowTitle: 'Suite de préparation à la publication source-vers-brief',
        adapterReplayOperatorWorkflowBody: 'Suite manuelle de préparation publication source-vers-brief. Metadata only. Aucun auto-contrôle, visa, verrou export ou permission publication.'
      })
    })
  });
  global.Jarbou3iResearchReleaseCopyContract = contract;
})(typeof window !== 'undefined' ? window : globalThis);
