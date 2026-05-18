import fs from 'node:fs';
import zlib from 'node:zlib';

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function decodePacket(entry, registryPath) {
  if (entry.packet && typeof entry.packet === 'object') return clone(entry.packet);
  if (entry.payload_encoding === 'gzip+base64+json' && typeof entry.packet_gzip_base64 === 'string') {
    const compressed = Buffer.from(entry.packet_gzip_base64, 'base64');
    const json = zlib.gunzipSync(compressed).toString('utf8');
    return JSON.parse(json);
  }
  throw new Error(`Unsupported fixture registry payload encoding in ${registryPath}#${entry.file || entry.version || 'unknown'}`);
}

function makeEntry(rawEntry, registryPath) {
  let decodedPacket = null;
  let decoded = false;
  const entry = {
    file: rawEntry.file,
    version: rawEntry.version,
    path: rawEntry.path,
    payload_encoding: rawEntry.payload_encoding || 'json',
    uncompressed_bytes: rawEntry.uncompressed_bytes,
    compressed_bytes: rawEntry.compressed_bytes
  };
  Object.defineProperty(entry, 'packet', {
    enumerable: true,
    get() {
      if (!decoded) {
        decodedPacket = decodePacket(rawEntry, registryPath);
        decoded = true;
      }
      return decodedPacket;
    }
  });
  return entry;
}

function readRegistry(registryPath) {
  const raw = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  if (!Array.isArray(raw.entries)) throw new Error(`Fixture registry entries must be an array: ${registryPath}`);

  return {
    ...raw,
    entries: raw.entries.map((entry) => makeEntry(entry, registryPath))
  };
}

const migrationRegistry = readRegistry('fixtures/migrations/migration-registry.json');
const privacyRegistry = readRegistry('fixtures/privacy/privacy-export-registry.json');

function normalizeMigrationKey(input) {
  let key = String(input || '').trim();
  key = key.replace(/^fixtures\/migrations\//, '');
  key = key.replace(/-packet\.json$/, '');
  key = key.replace(/^v/, '');
  return key;
}

function normalizePrivacyKey(input) {
  let key = String(input || '').trim();
  key = key.replace(/^fixtures\/privacy\//, '');
  key = key.replace(/^browser-generated-export-/, '');
  key = key.replace(/\.json$/, '');
  key = key.replace(/^v/, '');
  return key;
}

function findEntry(registry, key) {
  return registry.entries.find((entry) => {
    const candidates = [entry.version, entry.file, entry.path].map((value) => String(value || '').replace(/^v/, ''));
    return candidates.includes(key) || candidates.some((candidate) => candidate.endsWith(key));
  });
}

export function migrationFixtureEntries() {
  return migrationRegistry.entries.map((entry) => ({ ...entry, packet: clone(entry.packet) }));
}

export function privacyFixtureEntries() {
  return privacyRegistry.entries.map((entry) => ({ ...entry, packet: clone(entry.packet) }));
}

export function getMigrationFixture(input) {
  const key = normalizeMigrationKey(input);
  const entry = findEntry(migrationRegistry, key);
  if (!entry) throw new Error(`Missing migration fixture registry entry: ${input}`);
  return clone(entry.packet);
}

export function getPrivacyFixture(input) {
  const key = normalizePrivacyKey(input);
  const entry = findEntry(privacyRegistry, key);
  if (!entry) throw new Error(`Missing privacy fixture registry entry: ${input}`);
  return clone(entry.packet);
}

export function registryHasMigrationFixture(input) {
  return !!findEntry(migrationRegistry, normalizeMigrationKey(input));
}

export function registryHasPrivacyFixture(input) {
  return !!findEntry(privacyRegistry, normalizePrivacyKey(input));
}

export { migrationRegistry, privacyRegistry };

export function fixturePathExists(input) {
  const text = String(input || '');
  if (text.startsWith('fixtures/migrations/') && text.endsWith('-packet.json')) return registryHasMigrationFixture(text);
  if (text.startsWith('fixtures/privacy/browser-generated-export-') && text.endsWith('.json')) return registryHasPrivacyFixture(text);
  return fs.existsSync(text);
}
