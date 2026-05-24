/* Jarbou3i Research Engine package script compression and CI gate registry v1.1.0. */
(function(global){
  'use strict';
  const root = global.Jarbou3iResearchModules = global.Jarbou3iResearchModules || {};
  const VERSION = '1.3.0-alpha.3';
  const PREVIOUS_VERSION = '1.1.0-alpha.3';
  const FREEZE_BASELINE = '1.0.30';

  const RETENTION_CLASSES = Object.freeze({
    KEEP_ACTIVE:'KEEP_ACTIVE',
    KEEP_SECURITY:'KEEP_SECURITY',
    MERGE_TO_REGISTRY:'MERGE_TO_REGISTRY',
    ARCHIVE_DOCS:'ARCHIVE_DOCS',
    DELETE_ONLY_IF_UNREFERENCED:'DELETE_ONLY_IF_UNREFERENCED'
  });

  const CONSOLIDATION_RULES = Object.freeze([
    {
      rule_id:'runtime-source-active',
      match:'src/**, backend/**, index.html, styles.css',
      retention_class:RETENTION_CLASSES.KEEP_ACTIVE,
      action:'Do not consolidate before runtime behavior and browser evidence are protected.',
      deletion_allowed:false,
      consolidation_allowed:false,
      rationale:'Runtime and UI files define the public demo behavior and must not be reduced during an audit-only release.'
    },
    {
      rule_id:'browser-and-security-tests-active',
      match:'tests/*browser*.mjs, tests/*privacy*.mjs, tests/*provider*.mjs, tests/*backend*.mjs, tests/*source*.mjs',
      retention_class:RETENTION_CLASSES.KEEP_SECURITY,
      action:'Keep as explicit gates until a later registry proves equivalent coverage.',
      deletion_allowed:false,
      consolidation_allowed:false,
      rationale:'These tests guard privacy, provider, source, browser, and hosted-demo boundaries.'
    },
    {
      rule_id:'version-suite-wrappers-candidate',
      match:'tests/v*-no-browser-suite.mjs',
      retention_class:RETENTION_CLASSES.MERGE_TO_REGISTRY,
      action:'Candidate for later parameterized version-suite registry, but do not remove in this release.',
      deletion_allowed:false,
      consolidation_allowed:true,
      rationale:'Many files are thin historical wrappers; they can be reduced only after dependency and CI reference checks.'
    },
    {
      rule_id:'migration-packets-candidate',
      match:'fixtures/migrations/*.json',
      retention_class:RETENTION_CLASSES.MERGE_TO_REGISTRY,
      action:'Candidate for later migration-registry.json consolidation, but keep all packets in this release.',
      deletion_allowed:false,
      consolidation_allowed:true,
      rationale:'Migration packets are the largest historical fixture set and need registry-based compatibility before removal.'
    },
    {
      rule_id:'privacy-fixtures-candidate',
      match:'fixtures/privacy/*.json',
      retention_class:RETENTION_CLASSES.MERGE_TO_REGISTRY,
      action:'Candidate for later privacy-scenario registry consolidation, but keep all fixtures in this release.',
      deletion_allowed:false,
      consolidation_allowed:true,
      rationale:'Privacy fixtures are reusable regression anchors and must be merged only after export gates are remapped.'
    },
    {
      rule_id:'historical-release-docs-candidate',
      match:'docs/v*.md',
      retention_class:RETENTION_CLASSES.ARCHIVE_DOCS,
      action:'Candidate for later release-history timeline archive, but keep all docs in this release.',
      deletion_allowed:false,
      consolidation_allowed:true,
      rationale:'Historical docs can be compressed into a timeline after release gates stop referencing individual pages.'
    },
    {
      rule_id:'generated-artifacts-delete-candidate',
      match:'ci-artifacts/**, playwright-report/**, test-results/**, *.zip',
      retention_class:RETENTION_CLASSES.DELETE_ONLY_IF_UNREFERENCED,
      action:'Delete only when unreferenced and not part of an official release/evidence package.',
      deletion_allowed:false,
      consolidation_allowed:false,
      rationale:'Generated artifacts can pollute releases, but evidence packages may be intentionally archived.'
    }
  ]);

  const REQUIRED_AUDIT_FIELDS = Object.freeze([
    'path','retention_class','candidate_action','deletion_allowed','consolidation_allowed','risk','reason'
  ]);

  function nowIso(){ return new Date().toISOString(); }
  function normalizePath(file){ return String(file || '').replace(/\\/g, '/').replace(/^\.\//, ''); }
  function hasPrefix(file, prefix){ return normalizePath(file).startsWith(prefix); }
  function isVersionSuite(file){ return /^tests\/v[\w.-]+-no-browser-suite\.mjs$/.test(normalizePath(file)); }
  function classifyFile(file){
    const p = normalizePath(file);
    if (!p) return null;
    if (p === 'index.html' || p === 'styles.css' || hasPrefix(p, 'src/') || hasPrefix(p, 'backend/')) {
      return {path:p, retention_class:RETENTION_CLASSES.KEEP_ACTIVE, candidate_action:'keep', deletion_allowed:false, consolidation_allowed:false, risk:'high', reason:'active runtime or UI surface'};
    }
    if (isVersionSuite(p)) {
      return {path:p, retention_class:RETENTION_CLASSES.MERGE_TO_REGISTRY, candidate_action:'merge_later', deletion_allowed:false, consolidation_allowed:true, risk:'medium', reason:'historical version-suite wrapper candidate'};
    }
    if (p.includes('privacy') || p.includes('provider') || p.includes('backend') || p.includes('source') || p.includes('browser') || p.includes('hosted-demo')) {
      if (hasPrefix(p, 'tests/')) return {path:p, retention_class:RETENTION_CLASSES.KEEP_SECURITY, candidate_action:'keep', deletion_allowed:false, consolidation_allowed:false, risk:'high', reason:'active safety/browser/source/provider regression gate'};
    }
    if (hasPrefix(p, 'fixtures/migrations/') && p.endsWith('.json')) {
      return {path:p, retention_class:RETENTION_CLASSES.MERGE_TO_REGISTRY, candidate_action:'merge_later', deletion_allowed:false, consolidation_allowed:true, risk:'medium', reason:'migration packet candidate for registry consolidation'};
    }
    if (hasPrefix(p, 'fixtures/privacy/') && p.endsWith('.json')) {
      return {path:p, retention_class:RETENTION_CLASSES.MERGE_TO_REGISTRY, candidate_action:'merge_later', deletion_allowed:false, consolidation_allowed:true, risk:'medium', reason:'privacy fixture candidate for scenario registry consolidation'};
    }
    if (hasPrefix(p, 'docs/v') && p.endsWith('.md')) {
      return {path:p, retention_class:RETENTION_CLASSES.ARCHIVE_DOCS, candidate_action:'archive_later', deletion_allowed:false, consolidation_allowed:true, risk:'low-medium', reason:'historical release doc candidate for timeline archive'};
    }
    if (hasPrefix(p, 'ci-artifacts/') || hasPrefix(p, 'playwright-report/') || hasPrefix(p, 'test-results/') || p.endsWith('.zip')) {
      return {path:p, retention_class:RETENTION_CLASSES.DELETE_ONLY_IF_UNREFERENCED, candidate_action:'delete_later_if_unreferenced', deletion_allowed:false, consolidation_allowed:false, risk:'medium', reason:'generated/evidence artifact candidate requiring reference check'};
    }
    return {path:p, retention_class:RETENTION_CLASSES.KEEP_ACTIVE, candidate_action:'keep', deletion_allowed:false, consolidation_allowed:false, risk:'unknown', reason:'not classified as safe to reduce'};
  }
  function countBy(items, field){
    return items.reduce((acc, item) => {
      const key = item[field] || 'unknown';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  }
  function buildRepositoryConsolidationAudit(files = [], options = {}){
    const now = options.now || nowIso();
    const normalized = Array.isArray(files) ? files.map(normalizePath).filter(Boolean) : [];
    const entries = normalized.map(classifyFile).filter(Boolean);
    const counts = countBy(entries, 'retention_class');
    const mergeCandidates = entries.filter(entry => entry.retention_class === RETENTION_CLASSES.MERGE_TO_REGISTRY);
    const archiveCandidates = entries.filter(entry => entry.retention_class === RETENTION_CLASSES.ARCHIVE_DOCS);
    const deleteCandidates = entries.filter(entry => entry.retention_class === RETENTION_CLASSES.DELETE_ONLY_IF_UNREFERENCED);
    return {
      repository_consolidation_audit_version:VERSION,
      previous_version:PREVIOUS_VERSION,
      freeze_baseline_version:FREEZE_BASELINE,
      generated_at:now,
      stage:'version_suite_registry_consolidation',
      release_type:'alpha_cleanup_gate',
      audit_only:false,
      implementation_allowed:true,
      runtime_capability_change:false,
      provider_behavior_changed:false,
      oauth_behavior_changed:false,
      backend_behavior_changed:false,
      source_behavior_changed:false,
      storage_behavior_changed:false,
      files_audited:entries.length,
      retention_classes:RETENTION_CLASSES,
      rules:CONSOLIDATION_RULES.slice(),
      required_audit_fields:REQUIRED_AUDIT_FIELDS.slice(),
      retention_summary:counts,
      consolidation_summary:{
        merge_to_registry_count:mergeCandidates.length,
        archive_docs_count:archiveCandidates.length,
        delete_only_if_unreferenced_count:deleteCandidates.length,
        direct_deletion_allowed_count:entries.filter(entry => entry.deletion_allowed).length
      },
      candidates:{
        merge_to_registry:mergeCandidates.map(entry => entry.path),
        archive_docs:archiveCandidates.map(entry => entry.path),
        delete_only_if_unreferenced:deleteCandidates.map(entry => entry.path)
      },
      sample_entries:entries.slice(0, 25),
      completed_actions:['Merged historical tests/v*-no-browser-suite.mjs wrappers into tests/version-suite-registry.json.','Compressed package.json by removing historical numeric test:v* scripts.','Added tests/current-no-browser-suite.mjs as the compact current release gate.'], blocked_actions:[
        'File deletion limited to registry-consolidated version-suite wrapper files.',
        'No runtime behavior consolidation in this release.',
        'No provider/OAuth/backend/source/storage behavior change in this release.',
        'No package script compression before registry replacement tests exist.',
        'No release-doc archive before docs references are mapped.'
      ],
      next_safe_steps:[
        'Next safe step: consolidate versioned release documentation into timeline documents after this version-suite registry patch is green.',
        'Replace thin version-suite wrappers with a parameterized registry only after script references are mapped.',
        'Compress historical docs into a release-history timeline only after release-gate references are proven safe.',
        'Delete generated artifacts only when unreferenced and outside official release evidence packages.'
      ],
      release_gate:'version_suite_registry_consolidated'
    };
  }
  root.repositoryConsolidationAudit = Object.freeze({VERSION, PREVIOUS_VERSION, FREEZE_BASELINE, RETENTION_CLASSES, CONSOLIDATION_RULES, REQUIRED_AUDIT_FIELDS, classifyFile, buildRepositoryConsolidationAudit});
})(typeof window !== 'undefined' ? window : globalThis);
