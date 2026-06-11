#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const FIELD_MAP_PATH = path.join('docs', 'release', 'release-identity-field-map-latest.json');
const DOC_PATH = path.join('docs', 'release', 'release-identity-field-map.md');

function fail(message) {
  console.error(`Release identity field map check failed: ${message}`);
  process.exit(1);
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    fail(`cannot read valid JSON from ${filePath}: ${error.message}`);
  }
}

if (!fs.existsSync(FIELD_MAP_PATH)) fail(`${FIELD_MAP_PATH} is missing; run node scripts/release-identity-field-map.mjs first`);
if (!fs.existsSync(DOC_PATH)) fail(`${DOC_PATH} is missing`);

const map = readJson(FIELD_MAP_PATH);
const doc = fs.readFileSync(DOC_PATH, 'utf8');

if (map.schema_version !== '1.0.0') fail('unexpected schema_version');
if (map.mode !== 'diagnostic_only_no_release_identity_mutation') fail('field map must be diagnostic-only');
if (map.generated_by !== 'release-identity-field-map.mjs') fail('unexpected generator');
if (!map.current_detected_identity?.version) fail('current detected version is missing');
if (!Array.isArray(map.current_owner_candidate_files) || map.current_owner_candidate_files.length === 0) fail('no current owner candidate files mapped');
if (!Array.isArray(map.tests_asserting_current_identity_files) || map.tests_asserting_current_identity_files.length === 0) fail('no tests asserting current identity mapped');
if (!Array.isArray(map.json_identity_fields) || map.json_identity_fields.length === 0) fail('no JSON identity fields mapped');
if (!Array.isArray(map.blocked_mutation_rules) || map.blocked_mutation_rules.length < 5) fail('blocked mutation rules are incomplete');
if (Array.isArray(map.corruption_findings) && map.corruption_findings.length > 0) fail('corruption findings are present');
if (!map.summary || map.summary.scanned_text_files < 20) fail('field map scanned too few files');

const requiredDocTokens = [
  'diagnostic-only',
  'No global string replacement',
  'v1.4.0-alpha.68 — Release Identity Field Map',
  'v1.4.0-alpha.69 — Structured Release Identity Mutation',
];

for (const token of requiredDocTokens) {
  if (!doc.includes(token)) fail(`documentation missing token: ${token}`);
}

const badPatterns = [
  /RLivel\s+Evideasnce/i,
  /SafLive\s+REvidelnce/i,
  /Performasnce/i,
  /Trentd\s+Dityff/i,
  /\bv1\.4\.0-alpha\.64[0-9]\b/,
];

const filesToInspect = [
  FIELD_MAP_PATH,
  DOC_PATH,
  path.join('scripts', 'release-identity-field-map.mjs'),
  path.join('scripts', 'release-identity-field-map-check.mjs'),
];

for (const file of filesToInspect) {
  const text = fs.readFileSync(file, 'utf8');
  for (const pattern of badPatterns) {
    if (pattern.test(text)) fail(`corruption pattern ${pattern} found in ${file}`);
  }
}

console.log('Release identity field map checks passed.');
console.log(`Mapped current version: ${map.current_detected_identity.version}`);
console.log(`Current owner candidates: ${map.current_owner_candidate_files.length}`);
console.log(`Tests asserting current identity: ${map.tests_asserting_current_identity_files.length}`);
