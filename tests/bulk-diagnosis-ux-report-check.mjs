import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { CURRENT_RELEASE } from './current-release-identity.mjs';

const CHECK = 'tests/bulk-current-no-browser-diagnosis-check.mjs';
const source = fs.readFileSync(CHECK, 'utf8');

for (const token of [
  'Bulk diagnosis operator report',
  'Failure family summary',
  'Failed commands',
  'Operator repair checklist',
  'likely_root_cause',
  'recommended_next_command',
  'affected_files',
  'total_checks_attempted',
  'BULK_DIAGNOSIS_REPORT_JSON_START',
  '--fixture-failure-report'
]) {
  assert.ok(source.includes(token), `${CHECK} must expose diagnosis UX token: ${token}`);
}

const listResult = spawnSync(process.execPath, [CHECK, '--list'], { encoding: 'utf8' });
assert.equal(listResult.status, 0, '--list must exit cleanly');
const listPayload = JSON.parse(listResult.stdout);
assert.equal(listPayload.release, CURRENT_RELEASE, '--list release must match current release');
assert.ok(listPayload.check_count > 0, '--list must expose checks');
assert.ok(listPayload.checks.every((check) => check !== CHECK), '--list must exclude the diagnosis checker itself from execution');

const fixtureResult = spawnSync(process.execPath, [CHECK, '--fixture-failure-report'], { encoding: 'utf8' });
assert.notEqual(fixtureResult.status, 0, 'fixture failure mode must exit non-zero to prove real failure behavior');
assert.ok(fixtureResult.stdout.includes('Bulk diagnosis operator report'), 'fixture report must render an operator heading');
assert.ok(fixtureResult.stdout.includes('Failure family summary'), 'fixture report must render family summary');
assert.ok(fixtureResult.stdout.includes('Failed commands'), 'fixture report must render failed commands');
assert.ok(fixtureResult.stdout.includes('Operator repair checklist'), 'fixture report must render repair checklist');
assert.ok(fixtureResult.stdout.includes('Recommended next command'), 'fixture report must render next command guidance');

const match = fixtureResult.stdout.match(/BULK_DIAGNOSIS_REPORT_JSON_START\n([\s\S]+?)\nBULK_DIAGNOSIS_REPORT_JSON_END/);
assert.ok(match, 'fixture report must expose parseable JSON payload between markers');
const report = JSON.parse(match[1]);
assert.equal(report.release, CURRENT_RELEASE, 'fixture report release must match current release');
assert.equal(report.total_checks_attempted, 3, 'fixture report must count attempted checks');
assert.equal(report.passed_checks, 1, 'fixture report must count passed checks');
assert.equal(report.failed_checks, 2, 'fixture report must count failed checks');
assert.ok(Array.isArray(report.failure_family_summary), 'fixture report must expose family summary array');
assert.ok(report.failure_family_summary.length >= 2, 'fixture report must group multiple failure families');
assert.ok(report.failed_commands.length === 2, 'fixture report must expose failed commands');
assert.ok(report.operator_repair_checklist.length >= 2, 'fixture report must expose repair checklist items');

for (const family of report.failure_family_summary) {
  assert.ok(family.family, 'family summary must expose machine family id');
  assert.ok(family.label, 'family summary must expose human label');
  assert.ok(family.failure_count > 0, 'family summary must expose failure count');
  assert.ok(family.affected_checks.length > 0, 'family summary must expose affected checks');
  assert.ok(family.affected_files.length > 0, 'family summary must expose affected files');
  assert.ok(family.likely_root_cause.length > 20, 'family summary must expose likely root cause');
  assert.ok(family.recommended_next_command.length > 5, 'family summary must expose recommended next command');
}

const families = report.failure_family_summary.map((family) => family.family);
assert.ok(families.includes('current_release_identity_drift'), 'fixture must classify current release identity drift');
assert.ok(families.includes('repo_hygiene_package_artifact_pollution'), 'fixture must classify package artifact pollution');
assert.ok(report.failure_family_summary.some((family) => family.affected_files.includes('MANIFEST.json')), 'fixture must extract affected manifest file');
assert.ok(report.failure_family_summary.some((family) => family.affected_files.includes('src/research/release-copy-contract.js')), 'fixture must extract affected release-copy file');

console.log('Bulk diagnosis UX report checks passed.');
