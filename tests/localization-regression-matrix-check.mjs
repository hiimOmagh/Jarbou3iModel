import assert from 'node:assert/strict';
import fs from 'node:fs';
const matrix=fs.readFileSync('docs/localization-regression-matrix.md','utf8');
for (const token of ['visible-text-ar.json','visible-text-fr.json','visible-text-en.json','JSON','OAuth','PKCE','BYOK','OpenAI']) assert.ok(matrix.includes(token), token);
const spec=fs.readFileSync('tests/hosted-demo-browser-evidence.spec.mjs','utf8');
for (const token of ['collectVisibleTextSnapshot','visible-text-ar.json','visible-text-fr.json','visible-text-en.json','unexpected_english_residuals']) assert.ok(spec.includes(token), token);
console.log('Localization regression matrix checks passed.');
