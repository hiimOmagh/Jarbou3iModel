import assert from 'node:assert/strict';
import fs from 'node:fs';
import zlib from 'node:zlib';
import { migrationRegistry, privacyRegistry, getMigrationFixture, getPrivacyFixture } from './fixture-registry-loader.mjs';

const VERSION = '1.1.0-alpha.22';
const TITLE = 'Evidence Pack Export v3 + Brief Traceability';
const REGISTRY_BUDGET_BYTES = 900 * 1024;
const MIN_SIZE_REDUCTION_RATIO = 4;
const registries = [
  {
    label: 'migration',
    path: 'fixtures/migrations/migration-registry.json',
    registry: migrationRegistry,
    expectedEntries: 58,
    currentFixture: () => getMigrationFixture('fixtures/migrations/v1.1.0-alpha.22-packet.json')
  },
  {
    label: 'privacy',
    path: 'fixtures/privacy/privacy-export-registry.json',
    registry: privacyRegistry,
    expectedEntries: 48,
    currentFixture: () => getPrivacyFixture('fixtures/privacy/browser-generated-export-v1.1.0-alpha.22.json')
  }
];

for (const item of registries) {
  const rawText = fs.readFileSync(item.path, 'utf8');
  const rawRegistry = JSON.parse(rawText);
  const currentBytes = Buffer.byteLength(rawText, 'utf8');
  const previousBytes = rawRegistry.payload_compression?.raw_registry_bytes_before_alpha8;

  assert.equal(rawRegistry.registry_version, VERSION, `${item.label} registry version mismatch`);
  assert.equal(rawRegistry.release_title, `v${VERSION} — ${TITLE}`, `${item.label} registry title mismatch`);
  assert.equal(rawRegistry.payload_encoding, 'gzip+base64+json', `${item.label} registry must declare compressed payload encoding`);
  assert.equal(rawRegistry.entry_count, item.expectedEntries, `${item.label} registry entry count mismatch`);
  assert.equal(rawRegistry.entries.length, item.expectedEntries, `${item.label} registry entries length mismatch`);
  assert.ok(currentBytes <= REGISTRY_BUDGET_BYTES, `${item.label} registry exceeds alpha.10 byte budget: ${currentBytes}`);
  assert.ok(previousBytes >= currentBytes * MIN_SIZE_REDUCTION_RATIO, `${item.label} registry did not shrink enough: ${previousBytes} -> ${currentBytes}`);
  assert.equal(rawRegistry.payload_compression.semantic_thinning, false, `${item.label} registry must not semantically thin fixtures`);
  assert.equal(rawRegistry.payload_compression.loader, 'tests/fixture-registry-loader.mjs', `${item.label} registry loader declaration mismatch`);

  for (const [index, entry] of rawRegistry.entries.entries()) {
    assert.equal(Object.hasOwn(entry, 'packet'), false, `${item.label} raw registry entry ${index} must not embed expanded packet payload`);
    assert.equal(entry.payload_encoding, 'gzip+base64+json', `${item.label} raw registry entry ${index} encoding mismatch`);
    assert.ok(typeof entry.packet_gzip_base64 === 'string' && entry.packet_gzip_base64.length > 100, `${item.label} raw registry entry ${index} missing compressed payload`);
    const decoded = JSON.parse(zlib.gunzipSync(Buffer.from(entry.packet_gzip_base64, 'base64')).toString('utf8'));
    assert.ok(decoded && typeof decoded === 'object' && typeof decoded.workflow_version === 'string', `${item.label} decoded fixture missing workflow_version for ${entry.file}`);
  }

  assert.equal(item.registry.entry_count, item.expectedEntries, `${item.label} expanded registry entry count mismatch`);
  assert.equal(item.registry.entries.length, item.expectedEntries, `${item.label} expanded registry entries length mismatch`);
  assert.ok(item.registry.entries.every((entry) => entry.packet && typeof entry.packet === 'object'), `${item.label} expanded registry must expose packet objects`);

  const currentFixture = item.currentFixture();
  assert.equal(currentFixture.workflow_version, VERSION, `${item.label} current fixture must load through compressed registry`);
  assert.equal(currentFixture.release_notes.release_title, `v${VERSION} — ${TITLE}`, `${item.label} current fixture release title mismatch`);
}

console.log('Fixture payload budget checks passed.');
process.exit(0);
