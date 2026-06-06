import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { CURRENT_RELEASE } from './current-release-identity.mjs';

const CHECK = 'tests/bulk-current-no-browser-diagnosis-check.mjs';
const source = fs.readFileSync(CHECK, 'utf8');

for (const token of [
  'DIAGNOSIS_ARTIFACT_CONTRACT',
  '--write-artifacts',
  '--artifact-dir',
  'bulk-current-no-browser-diagnosis-report.json',
  'operator-handoff-snapshot.md',
  'diagnosis-artifact-manifest.json',
  'Operator Handoff Snapshot',
  'renderOperatorHandoffSnapshot',
  'writeDiagnosisArtifacts'
]) {
  assert.ok(source.includes(token), `${CHECK} must expose diagnosis artifact token: ${token}`);
}

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'jarbou3i-diagnosis-artifact-'));
const artifactDir = path.join(tempRoot, 'diagnosis-artifacts');

const result = spawnSync(process.execPath, [
  CHECK,
  '--fixture-failure-report',
  '--fixture-exit-zero',
  '--write-artifacts',
  '--artifact-dir',
  artifactDir
], { encoding: 'utf8' });

assert.equal(result.status, 0, 'fixture artifact export must exit cleanly with --fixture-exit-zero');
assert.ok(result.stdout.includes('Bulk diagnosis operator report'), 'fixture run must still print operator report');

const reportPath = path.join(artifactDir, 'bulk-current-no-browser-diagnosis-report.json');
const handoffPath = path.join(artifactDir, 'operator-handoff-snapshot.md');
const manifestPath = path.join(artifactDir, 'diagnosis-artifact-manifest.json');

for (const file of [reportPath, handoffPath, manifestPath]) {
  assert.ok(fs.existsSync(file), `diagnosis artifact must exist: ${file}`);
}

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
assert.equal(report.release, CURRENT_RELEASE, 'artifact report release must match current release');
assert.equal(report.artifact_contract.version, 1, 'artifact report must expose artifact contract version');
assert.equal(report.artifact_contract.report_json, 'bulk-current-no-browser-diagnosis-report.json', 'artifact report must expose stable JSON filename');
assert.equal(report.artifact_contract.handoff_markdown, 'operator-handoff-snapshot.md', 'artifact report must expose stable handoff filename');
assert.equal(report.total_checks_attempted, 3, 'artifact report must preserve attempted check count');
assert.equal(report.failed_checks, 2, 'artifact report must preserve failed check count');
assert.ok(report.failure_family_summary.length >= 2, 'artifact report must preserve failure-family summary');
assert.ok(report.failed_commands.length === 2, 'artifact report must preserve failed commands');
assert.ok(report.operator_repair_checklist.length >= 2, 'artifact report must preserve repair checklist');

const handoff = fs.readFileSync(handoffPath, 'utf8');
assert.ok(handoff.includes(`# Operator Handoff Snapshot — ${CURRENT_RELEASE}`), 'handoff snapshot must expose current release heading');
assert.ok(handoff.includes('## Gate summary'), 'handoff snapshot must expose gate summary');
assert.ok(handoff.includes('## Failure family summary'), 'handoff snapshot must expose failure-family summary');
assert.ok(handoff.includes('## Failed commands'), 'handoff snapshot must expose failed commands');
assert.ok(handoff.includes('## Operator repair checklist'), 'handoff snapshot must expose operator repair checklist');
assert.ok(handoff.includes('Contract version: 1'), 'handoff snapshot must expose artifact contract version');

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
assert.equal(manifest.release, CURRENT_RELEASE, 'artifact manifest release must match current release');
assert.equal(manifest.artifact_contract.manifest_json, 'diagnosis-artifact-manifest.json', 'artifact manifest must expose stable manifest filename');
assert.ok(manifest.files.report_json.endsWith('bulk-current-no-browser-diagnosis-report.json'), 'artifact manifest must point to report JSON');
assert.ok(manifest.files.handoff_markdown.endsWith('operator-handoff-snapshot.md'), 'artifact manifest must point to handoff Markdown');

fs.rmSync(tempRoot, { recursive: true, force: true });
console.log('Diagnosis report artifact export checks passed.');
