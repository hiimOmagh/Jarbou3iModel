import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { CURRENT_RELEASE } from './current-release-identity.mjs';

function loadReleaseCopyContract() {
  const source = fs.readFileSync('src/research/release-copy-contract.js', 'utf8');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: 'src/research/release-copy-contract.js' });
  assert.ok(sandbox.Jarbou3iResearchReleaseCopyContract, 'release copy contract must be loadable');
  return sandbox.Jarbou3iResearchReleaseCopyContract;
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
  const locales = ['en', 'ar', 'fr'];
  const failures = [];

  for (const locale of locales) {
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

const releaseCopyContract = loadReleaseCopyContract();
assertVisibleTokenDriftGuard(releaseCopyContract);

expectLocaleDrift(releaseCopyContract, 'ar', 'الأتمتة');
expectLocaleDrift(releaseCopyContract, 'fr', 'automatisation');
expectLocaleDrift(releaseCopyContract, 'en', 'automation');

console.log(`Visible-text token drift guard checks passed for ${CURRENT_RELEASE}.`);
