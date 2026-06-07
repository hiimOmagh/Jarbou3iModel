import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { CURRENT_RELEASE } from './current-release-identity.mjs';

const LOCALES = ['en', 'ar', 'fr'];

function loadReleaseCopyContract() {
  const source = fs.readFileSync('src/research/release-copy-contract.js', 'utf8');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: 'src/research/release-copy-contract.js' });
  assert.ok(sandbox.Jarbou3iResearchReleaseCopyContract, 'release copy contract must be loadable');
  return sandbox.Jarbou3iResearchReleaseCopyContract;
}

function loadEvidenceMatrixConfig() {
  return JSON.parse(fs.readFileSync('tests/evidence/evidence-matrix.config.json', 'utf8'));
}

function normalizeText(value) {
  return String(value || '')
    .normalize('NFC')
    .replace(/\s+/g, ' ')
    .trim()
    .toLocaleLowerCase('und');
}

function assertVisibleTokenDriftGuard(contract) {
  assert.equal(contract.release, CURRENT_RELEASE, 'visible-token drift guard must inspect the current release contract');
  const expectedByLocale = contract.expectedCurrentReleaseDescriptionTokens || {};
  const copyByLocale = contract.copy || {};
  const failures = [];

  for (const locale of LOCALES) {
    const expectedTokens = expectedByLocale[locale];
    const hostedDemoBody = copyByLocale[locale]?.hostedDemoVerificationBody;
    assert.ok(Array.isArray(expectedTokens), `${locale} expected current-release tokens must be an array`);
    assert.ok(expectedTokens.length > 0, `${locale} expected current-release tokens must not be empty`);
    assert.equal(typeof hostedDemoBody, 'string', `${locale} hosted-demo verification body must be a string`);
    const normalizedBody = normalizeText(hostedDemoBody);
    const seen = new Set();

    for (const token of expectedTokens) {
      const normalizedToken = normalizeText(token);
      assert.ok(normalizedToken.length > 0, `${locale} expected current-release token must not be blank`);
      assert.equal(seen.has(normalizedToken), false, `${locale} expected token must not be duplicated: ${token}`);
      seen.add(normalizedToken);
      if (!normalizedBody.includes(normalizedToken)) {
        failures.push({ locale, token });
      }
    }
  }

  assert.deepEqual(
    failures,
    [],
    `visible-token drift detected before browser evidence: ${failures.map((failure) => `${failure.locale}:${failure.token}`).join(', ')}`
  );
}

function assertEvidenceMatrixPublicLabels(contract, matrixConfig) {
  const configuredLabels = matrixConfig.public_version_labels || {};
  const languageRules = matrixConfig.language_rules || {};
  const failures = [];

  assert.equal(matrixConfig.evidence_matrix_config_version, contract.version, 'evidence matrix config version must match release contract version');
  assert.equal(matrixConfig.internal_build_version, contract.version, 'evidence matrix internal build version must match release contract version');
  const rootPublicLabel = contract.publicLabel || contract.publicVersionLabels?.en;
  assert.equal(typeof rootPublicLabel, 'string', 'release-copy root public version label must be available as publicLabel or publicVersionLabels.en');
  assert.ok(rootPublicLabel.length > 0, 'release-copy root public version label must not be empty');
  assert.equal(matrixConfig.public_version_label, rootPublicLabel, 'evidence matrix public version label must match release contract public label');

  for (const locale of LOCALES) {
    const expected = contract.publicVersionLabels?.[locale] || rootPublicLabel;
    assert.equal(typeof expected, 'string', `${locale} release-copy public version label must be a string`);
    assert.ok(expected.length > 0, `${locale} release-copy public version label must not be empty`);

    if (configuredLabels[locale] !== expected) {
      failures.push({ locale, field: 'public_version_labels', expected, actual: configuredLabels[locale] });
    }

    if (languageRules[locale]?.public_label !== expected) {
      failures.push({ locale, field: 'language_rules.public_label', expected, actual: languageRules[locale]?.public_label });
    }
  }

  assert.deepEqual(
    failures,
    [],
    `evidence-matrix localized public-label drift detected before browser evidence: ${failures.map((failure) => `${failure.locale}:${failure.field}`).join(', ')}`
  );
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function expectLocaleDrift(contract, locale, staleToken) {
  const mutated = clone(contract);
  mutated.expectedCurrentReleaseDescriptionTokens[locale].push(staleToken);
  assert.throws(
    () => assertVisibleTokenDriftGuard(mutated),
    (error) => String(error.message || '').includes(`${locale}:${staleToken}`),
    `${locale} stale-token mutation must fail before hosted-demo browser evidence`
  );
}

function expectPublicLabelDrift(contract, matrixConfig, locale, field, staleLabel) {
  const mutated = clone(matrixConfig);
  if (field === 'public_version_labels') {
    mutated.public_version_labels[locale] = staleLabel;
  } else if (field === 'language_rules.public_label') {
    mutated.language_rules[locale].public_label = staleLabel;
  } else {
    throw new Error(`Unsupported field for public-label drift mutation: ${field}`);
  }

  assert.throws(
    () => assertEvidenceMatrixPublicLabels(contract, mutated),
    (error) => String(error.message || '').includes(`${locale}:${field}`),
    `${locale} stale public-label mutation must fail before hosted-demo browser evidence: ${field}`
  );
}

const releaseCopyContract = loadReleaseCopyContract();
const evidenceMatrixConfig = loadEvidenceMatrixConfig();

assertVisibleTokenDriftGuard(releaseCopyContract);
assertEvidenceMatrixPublicLabels(releaseCopyContract, evidenceMatrixConfig);

expectLocaleDrift(releaseCopyContract, 'ar', 'الأتمتة');
expectLocaleDrift(releaseCopyContract, 'fr', 'automatisation');
expectLocaleDrift(releaseCopyContract, 'en', 'automation');

expectPublicLabelDrift(
  releaseCopyContract,
  evidenceMatrixConfig,
  'ar',
  'public_version_labels',
  'v1.4.0-alpha.58 حارس ميزانية مهلة التقاط أدلة الاستضافة'
);
expectPublicLabelDrift(
  releaseCopyContract,
  evidenceMatrixConfig,
  'fr',
  'public_version_labels',
  'v1.4.0-alpha.58 Garde budget délai capture preuves hébergées'
);
expectPublicLabelDrift(
  releaseCopyContract,
  evidenceMatrixConfig,
  'ar',
  'language_rules.public_label',
  'v1.4.0-alpha.58 حارس ميزانية مهلة التقاط أدلة الاستضافة'
);
expectPublicLabelDrift(
  releaseCopyContract,
  evidenceMatrixConfig,
  'fr',
  'language_rules.public_label',
  'v1.4.0-alpha.58 Garde budget délai capture preuves hébergées'
);

console.log(`Visible-text token drift guard checks passed for ${CURRENT_RELEASE}.`);
