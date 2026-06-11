#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const SCRIPT_NAME = 'release-identity-field-map.mjs';
const OUTPUT_PATH = path.join('docs', 'release', 'release-identity-field-map-latest.json');

const EXCLUDED_DIRS = new Set([
  '.git',
  'node_modules',
  'dist',
  'build',
  'coverage',
  'playwright-report',
  'test-results',
  'ci-artifacts',
  'hosted-demo-evidence-local',
  '.next',
  '.turbo',
]);

const TEXT_EXTENSIONS = new Set([
  '.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx',
  '.json', '.md', '.txt', '.yml', '.yaml',
  '.html', '.css', '.scss', '.csv', '.ps1', '.sh',
]);

const KNOWN_CURRENT_OWNER_FILES = new Set([
  'package.json',
  'package-lock.json',
  'MANIFEST.json',
  'tests/current-release-identity.mjs',
  'tests/current-release-contract.json',
  'tests/ci-gate-registry.json',
  'tests/version-suite-registry.json',
  'tests/evidence/evidence-matrix.config.json',
]);

const KNOWN_DOC_SURFACES = new Set([
  'README.md',
  'PUBLIC_DEMO.md',
  'CHANGELOG.md',
  'docs/current-release.md',
  'docs/qa-matrix.md',
  'docs/release-and-evidence.md',
  'docs/release-history.md',
  'docs/roadmap.md',
  'docs/release/current-release-and-truth.md',
  'docs/engineering/qa-and-evidence-gates.md',
  'docs/engineering/operator-runbook.md',
  'docs/product/current-public-surface.md',
  'docs/strategy/roadmap.md',
]);

const VERSION_RE = /\bv\d+\.\d+\.\d+(?:-[A-Za-z0-9.-]+)?\b/g;
const IDENTITY_LABEL_RE = /\bv\d+\.\d+\.\d+(?:-[A-Za-z0-9.-]+)?\s+—\s+[^\r\n"`'<>{}\[\]]{3,140}/g;
const CORRUPTION_PATTERNS = [
  /RLivel\s+Evideasnce/i,
  /SafLive\s+REvidelnce/i,
  new RegExp('Performa' + 'snce', 'i'),
  /Trentd\s+Dityff/i,
  new RegExp('UpBund' + 'atler', 'i'),
  /\bv\d+\.\d+\.\d+-alpha\.(?:64|66|67|68)\d+\b/i,
  /\bv1\.4\.0-alpha\.64[0-9]\b/,
];

function relPath(filePath) {
  return path.relative(process.cwd(), filePath).split(path.sep).join('/');
}

function readTextFile(filePath) {
  const buf = fs.readFileSync(filePath);
  if (buf.includes(0)) return null;
  return buf.toString('utf8');
}

function isCandidateTextFile(filePath) {
  const rel = relPath(filePath);
  const ext = path.extname(filePath);
  if (KNOWN_CURRENT_OWNER_FILES.has(rel) || KNOWN_DOC_SURFACES.has(rel)) return true;
  if (!TEXT_EXTENSIONS.has(ext)) return false;
  const size = fs.statSync(filePath).size;
  return size <= 1_500_000;
}

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (EXCLUDED_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, acc);
      continue;
    }
    if (!entry.isFile()) continue;
    if (isCandidateTextFile(full)) acc.push(full);
  }
  return acc;
}

function safeGit(args, fallback = null) {
  try {
    return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return fallback;
  }
}

function collectJsonStringFields(value, prefix = '$', acc = []) {
  if (typeof value === 'string') {
    acc.push({ json_path: prefix, value });
    return acc;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectJsonStringFields(item, `${prefix}[${index}]`, acc));
    return acc;
  }
  if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) {
      const escaped = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key) ? `.${key}` : `[${JSON.stringify(key)}]`;
      collectJsonStringFields(item, `${prefix}${escaped}`, acc);
    }
  }
  return acc;
}

function uniqueSorted(values) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

function lineForIndex(text, index) {
  return text.slice(0, index).split(/\r\n|\n|\r/).length;
}

function contextLine(text, line) {
  const lines = text.split(/\r\n|\n|\r/);
  return lines[line - 1]?.trim() ?? '';
}

function parseJsonIfPossible(file, text) {
  if (!file.endsWith('.json')) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function detectCurrentReleaseIdentity(rootTextByFile) {
  const packageText = rootTextByFile.get('package.json');
  const contractText = rootTextByFile.get('tests/current-release-contract.json');
  const manifestText = rootTextByFile.get('MANIFEST.json');

  const candidates = [];

  function pushJsonCandidate(file, text, paths) {
    if (!text) return;
    const json = parseJsonIfPossible(file, text);
    if (!json) return;
    for (const { json_path, value } of collectJsonStringFields(json)) {
      if (paths.some((needle) => json_path.toLowerCase().includes(needle))) {
        candidates.push({ source: file, json_path, value });
      }
    }
  }

  pushJsonCandidate('package.json', packageText, ['version', 'description']);
  pushJsonCandidate('tests/current-release-contract.json', contractText, ['version', 'title', 'label', 'release']);
  pushJsonCandidate('MANIFEST.json', manifestText, ['version', 'title', 'label', 'release']);

  const packageJson = packageText ? parseJsonIfPossible('package.json', packageText) : null;
  const currentVersion =
    packageJson?.version ??
    candidates.find((candidate) => /^\d+\.\d+\.\d+/.test(candidate.value))?.value ??
    null;

  const contractJson = contractText ? parseJsonIfPossible('tests/current-release-contract.json', contractText) : null;
  const contractStrings = contractJson ? collectJsonStringFields(contractJson) : [];
  const identityCandidate = contractStrings
    .map((field) => field.value)
    .find((value) => typeof value === 'string' && IDENTITY_LABEL_RE.test(value));
  IDENTITY_LABEL_RE.lastIndex = 0;

  const labelFromText = [...rootTextByFile.values()]
    .flatMap((text) => {
      const matches = text.match(IDENTITY_LABEL_RE) ?? [];
      IDENTITY_LABEL_RE.lastIndex = 0;
      return matches;
    })
    .find((label) => currentVersion && label.includes(`v${currentVersion}`));

  return {
    version: currentVersion,
    npm_package_version: packageJson?.version ?? null,
    contract_identity_label: identityCandidate ?? labelFromText ?? null,
    candidate_sources: candidates,
  };
}

function classifyOccurrence(file, text, match, index, current) {
  const line = lineForIndex(text, index);
  const lineText = contextLine(text, line);
  const containsCurrentVersion = current.version ? match.includes(current.version) || match.includes(`v${current.version}`) : false;
  const containsCurrentIdentity = current.contract_identity_label ? match.includes(current.contract_identity_label) : false;
  const isKnownOwner = KNOWN_CURRENT_OWNER_FILES.has(file);
  const isKnownDoc = KNOWN_DOC_SURFACES.has(file);
  const isTest = file.startsWith('tests/');
  const role =
    isKnownOwner && containsCurrentVersion ? 'current_identity_owner_candidate' :
    isTest && containsCurrentVersion ? 'current_identity_assertion_candidate' :
    isKnownDoc && containsCurrentVersion ? 'current_visible_surface_candidate' :
    containsCurrentVersion ? 'current_identity_reference_candidate' :
    'historical_or_background_reference';

  return { file, line, value: match.trim(), line_text: lineText, role, contains_current_version: containsCurrentVersion, contains_current_identity: containsCurrentIdentity };
}

const cwd = process.cwd();
const files = walk(cwd);
const rootTextByFile = new Map();
const readErrors = [];

for (const full of files) {
  const rel = relPath(full);
  try {
    const text = readTextFile(full);
    if (text !== null) rootTextByFile.set(rel, text);
  } catch (error) {
    readErrors.push({ file: rel, error: String(error?.message ?? error) });
  }
}

const current = detectCurrentReleaseIdentity(rootTextByFile);
const versionOccurrences = [];
const identityLabelOccurrences = [];
const jsonIdentityFields = [];
const corruptionFindings = [];

for (const [file, text] of rootTextByFile) {
  for (const pattern of CORRUPTION_PATTERNS) {
    const matches = text.match(pattern);
    if (matches) {
      corruptionFindings.push({ file, pattern: String(pattern), sample: matches[0] });
    }
  }

  for (const match of text.matchAll(VERSION_RE)) {
    versionOccurrences.push(classifyOccurrence(file, text, match[0], match.index ?? 0, current));
  }

  for (const match of text.matchAll(IDENTITY_LABEL_RE)) {
    identityLabelOccurrences.push(classifyOccurrence(file, text, match[0], match.index ?? 0, current));
  }

  const json = parseJsonIfPossible(file, text);
  if (json) {
    for (const field of collectJsonStringFields(json)) {
      const includesVersion = current.version ? field.value.includes(current.version) || field.value.includes(`v${current.version}`) : false;
      const includesIdentity = current.contract_identity_label ? field.value.includes(current.contract_identity_label) : false;
      const releaseishPath = /version|release|title|label|identity|registry|description|name/i.test(field.json_path);
      if (includesVersion || includesIdentity || releaseishPath && /\d+\.\d+\.\d+/.test(field.value)) {
        jsonIdentityFields.push({
          file,
          json_path: field.json_path,
          value: field.value,
          safe_update_class:
            KNOWN_CURRENT_OWNER_FILES.has(file) && includesVersion ? 'candidate_current_identity_field' :
            includesVersion ? 'requires_review_before_update' :
            'historical_or_noncurrent_field',
        });
      }
    }
  }
}

const currentOwnerCandidates = uniqueSorted(
  [
    ...jsonIdentityFields
      .filter((field) => field.safe_update_class === 'candidate_current_identity_field')
      .map((field) => field.file),
    ...identityLabelOccurrences
      .filter((occurrence) => occurrence.role.includes('current'))
      .map((occurrence) => occurrence.file),
    ...versionOccurrences
      .filter((occurrence) => KNOWN_CURRENT_OWNER_FILES.has(occurrence.file) && occurrence.contains_current_version)
      .map((occurrence) => occurrence.file),
  ]
);

const historicalReferenceCandidates = uniqueSorted(
  [
    ...identityLabelOccurrences
      .filter((occurrence) => occurrence.role === 'historical_or_background_reference')
      .map((occurrence) => occurrence.file),
    ...versionOccurrences
      .filter((occurrence) => occurrence.role === 'historical_or_background_reference')
      .map((occurrence) => occurrence.file),
  ]
);

const testsAssertingCurrent = uniqueSorted(
  [
    ...versionOccurrences.filter((occurrence) => occurrence.file.startsWith('tests/') && occurrence.contains_current_version).map((occurrence) => occurrence.file),
    ...identityLabelOccurrences.filter((occurrence) => occurrence.file.startsWith('tests/') && occurrence.contains_current_version).map((occurrence) => occurrence.file),
  ]
);

const labels = uniqueSorted(identityLabelOccurrences.map((occurrence) => occurrence.value.replace(/\s+/g, ' ')));
const versions = uniqueSorted(versionOccurrences.map((occurrence) => occurrence.value));

const fieldMap = {
  schema_version: '1.0.0',
  generated_at: new Date().toISOString(),
  generated_by: SCRIPT_NAME,
  mode: 'diagnostic_only_no_release_identity_mutation',
  git: {
    branch: safeGit(['branch', '--show-current']),
    head: safeGit(['rev-parse', 'HEAD']),
    status_short: safeGit(['status', '--short'], ''),
  },
  current_detected_identity: current,
  summary: {
    scanned_text_files: rootTextByFile.size,
    read_errors: readErrors.length,
    distinct_versions_found: versions.length,
    distinct_identity_labels_found: labels.length,
    current_owner_candidate_files: currentOwnerCandidates.length,
    historical_reference_candidate_files: historicalReferenceCandidates.length,
    tests_asserting_current_identity_files: testsAssertingCurrent.length,
    corruption_findings: corruptionFindings.length,
  },
  release_versions_found: versions,
  release_identity_labels_found: labels,
  current_owner_candidate_files: currentOwnerCandidates,
  tests_asserting_current_identity_files: testsAssertingCurrent,
  historical_reference_candidate_files: historicalReferenceCandidates,
  json_identity_fields: jsonIdentityFields,
  current_version_occurrences: versionOccurrences.filter((occurrence) => occurrence.contains_current_version),
  current_identity_label_occurrences: identityLabelOccurrences.filter((occurrence) => occurrence.contains_current_version || occurrence.contains_current_identity),
  historical_identity_label_occurrences: identityLabelOccurrences.filter((occurrence) => !(occurrence.contains_current_version || occurrence.contains_current_identity)).slice(0, 250),
  blocked_mutation_rules: [
    'Do not run global string replacement for release versions or release titles.',
    'Do not rewrite historical release-history, changelog, roadmap, or evidence narrative records unless a test explicitly declares them current identity owners.',
    'Do not compose a new title by replacing words inside an old title.',
    'Do not infer title fields from prose; update exact JSON fields or exported constants only.',
    'Do not mutate lock evidence bundles from prior releases.',
    'Do not commit package handoff files or generated Playwright/test artifacts.',
  ],
  proposed_next_step: {
    release: 'v1.4.0-alpha.69 — Structured Release Identity Mutation',
    condition: 'Only after this field map is reviewed and the safe-update allowlist is encoded from json_identity_fields and known exported constants.',
  },
  corruption_findings: corruptionFindings,
  read_errors: readErrors,
};

fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(fieldMap, null, 2) + '\n');

console.log('Release identity field map generated.');
console.log(`Output: ${OUTPUT_PATH}`);
console.log(`Current detected version: ${current.version ?? 'unknown'}`);
console.log(`Identity labels found: ${labels.length}`);
console.log(`Current owner candidate files: ${currentOwnerCandidates.length}`);
console.log(`Tests asserting current identity: ${testsAssertingCurrent.length}`);
console.log(`Corruption findings: ${corruptionFindings.length}`);
if (corruptionFindings.length > 0) {
  console.error('Corruption-like strings were found. Inspect the generated field map before proceeding.');
  process.exitCode = 1;
}
