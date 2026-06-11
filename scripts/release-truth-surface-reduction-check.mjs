import fs from 'node:fs';

const requiredFiles = [
  'docs/release/current-release-and-truth.md',
  'docs/engineering/qa-and-evidence-gates.md',
  'docs/product/current-public-surface.md',
  'docs/engineering/operator-runbook.md',
  'docs/strategy/roadmap.md'
];

const forbiddenBehaviorClaims = [
  /live scraping is enabled/i,
  /production oauth is enabled/i,
  /real oauth is enabled/i,
  /real api keys are enabled/i,
  /cryptographic signing is enabled/i,
  /backend storage is enabled/i,
  /provider execution is enabled/i
];

function fail(message) {
  console.error(`Release truth surface reduction check failed: ${message}`);
  process.exit(1);
}

function read(file) {
  if (!fs.existsSync(file)) {
    fail(`missing required canonical file: ${file}`);
  }

  const text = fs.readFileSync(file, 'utf8');
  if (!text.trim()) {
    fail(`canonical file is empty: ${file}`);
  }

  return text;
}

const texts = new Map(requiredFiles.map((file) => [file, read(file)]));
const combined = [...texts.values()].join('\n\n');

for (const token of [
  'v1.4.0-alpha.67 — Release Truth Surface Reduction',
  'v1.4.0-alpha.66 — Repository Truth Surface Consolidation Audit',
  'v1.3.0 — Stable Manual Workflow Release',
  'v1.4.0-alpha.64 — Live Evidence Performance Trend Diff Bundle Inclusion',
  'No-behavior-change validation',
  'no runtime behavior change',
  'no provider behavior change',
  'no OAuth behavior change',
  'no backend behavior change',
  'no storage behavior change',
  'no source behavior change',
  'no live scraping',
  'no real API keys',
  'no cryptographic signing claims'
]) {
  if (!combined.includes(token)) {
    fail(`canonical truth surface missing token: ${token}`);
  }
}

const releaseTruth = texts.get('docs/release/current-release-and-truth.md');
for (const token of [
  'Release truth rules',
  'Stable baselines preserved',
  'Wrapper migration plan'
]) {
  if (!releaseTruth.includes(token)) {
    fail(`release truth document missing section token: ${token}`);
  }
}

const qa = texts.get('docs/engineering/qa-and-evidence-gates.md');
for (const token of [
  'npm run test:current:no-browser',
  'npm run test:ci:no-browser',
  'Git Bash',
  'effective-diff'
]) {
  if (!qa.includes(token)) {
    fail(`QA/evidence document missing operator token: ${token}`);
  }
}

const publicSurface = texts.get('docs/product/current-public-surface.md');
for (const token of [
  'public surface',
  'Capability boundaries',
  'Documentation relationship'
]) {
  if (!publicSurface.includes(token)) {
    fail(`public surface document missing token: ${token}`);
  }
}

const roadmap = texts.get('docs/strategy/roadmap.md');
for (const token of [
  'Phase 1 — Canonical surfaces',
  'Phase 2 — Legacy wrapper conversion',
  'Phase 3 — Release-truth test simplification',
  'Phase 4 — Product workflow work resumes'
]) {
  if (!roadmap.includes(token)) {
    fail(`strategy roadmap missing phase token: ${token}`);
  }
}

for (const [file, text] of texts) {
  for (const pattern of forbiddenBehaviorClaims) {
    if (pattern.test(text)) {
      fail(`${file} contains forbidden behavior-expansion claim: ${pattern}`);
    }
  }
}

console.log('Release truth surface reduction checks passed.');
