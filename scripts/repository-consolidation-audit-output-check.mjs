import fs from 'node:fs';

const requiredFiles = [
  'docs/audit/repo-audit-latest.json',
  'docs/audit/repo-audit-latest.md',
  'docs/audit/doc-consolidation-draft.md',
  'docs/audit/cleanup-proposal.ps1',
  'docs/audit/file-reference-index.json'
];

function fail(message) {
  console.error(`Repository consolidation audit output check failed: ${message}`);
  process.exit(1);
}

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    fail(`missing required audit artifact: ${file}`);
  }

  const stat = fs.statSync(file);
  if (stat.size <= 0) {
    fail(`audit artifact is empty: ${file}`);
  }
}

const audit = JSON.parse(fs.readFileSync('docs/audit/repo-audit-latest.json', 'utf8'));

if (!audit.file_inventory && !audit.inventory && !audit.summary) {
  fail('repo-audit-latest.json does not expose an inventory/summary structure');
}

const markdown = fs.readFileSync('docs/audit/repo-audit-latest.md', 'utf8');

for (const token of [
  'Repository Audit Report',
  'Documentation consolidation buckets',
  'Recommended next move'
]) {
  if (!markdown.includes(token)) {
    fail(`repo-audit-latest.md missing token: ${token}`);
  }
}

const consolidation = fs.readFileSync('docs/audit/doc-consolidation-draft.md', 'utf8');

for (const token of [
  'docs/release/current-release-and-truth.md',
  'docs/engineering/qa-and-evidence-gates.md',
  'docs/product/current-public-surface.md'
]) {
  if (!consolidation.includes(token)) {
    fail(`doc-consolidation-draft.md missing target: ${token}`);
  }
}

const cleanup = fs.readFileSync('docs/audit/cleanup-proposal.ps1', 'utf8');

if (!cleanup.includes('# Remove-Item')) {
  fail('cleanup proposal must remain non-destructive with commented Remove-Item commands');
}

console.log('Repository consolidation audit output checks passed.');
