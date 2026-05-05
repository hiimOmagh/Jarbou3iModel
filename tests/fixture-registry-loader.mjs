import fs from 'node:fs';

const migrationRegistry = JSON.parse(fs.readFileSync('fixtures/migrations/migration-registry.json', 'utf8'));
const privacyRegistry = JSON.parse(fs.readFileSync('fixtures/privacy/privacy-export-registry.json', 'utf8'));

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

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
