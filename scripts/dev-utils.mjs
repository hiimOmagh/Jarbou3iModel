import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

export const VERSION = '1.4.0-alpha.43';
export const RELEASE_TITLE = 'v1.4.0-alpha.43 — Targeted Hosted Evidence Capture';
export const DIST_DIR = 'dist';

export function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

export function ensureDist() {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

export function writeJson(file, value) {
  ensureDist();
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

export function writeMarkdown(file, title, lines) {
  ensureDist();
  fs.writeFileSync(file, [`# ${title}`, '', ...lines].join('\n') + '\n');
}

export function packageScripts() {
  return Object.keys(readJson('package.json').scripts || {});
}

export function registry() {
  return readJson('tests/ci-gate-registry.json');
}

export function changedFilesFromArgs(args = process.argv.slice(2)) {
  const direct = args.filter((arg) => arg && !arg.startsWith('--'));
  if (direct.length) return direct;
  const git = spawnSync('git', ['diff', '--name-only'], { encoding: 'utf8' });
  if (git.status === 0) return git.stdout.split('\n').map((line) => line.trim()).filter(Boolean);
  return [];
}

export const IMPACT_RULES = [
  { pattern: /^src\/research\/provider-execution-(threat-model|preflight)\.js$/, gates: ['provider-execution-threat-model-check', 'provider-execution-preflight-check', 'test:current:no-browser'], risk: 'provider/source execution preflight boundary' },
  { pattern: /^src\/research\/render-helpers\.js$/, gates: ['language-description-audit-check', 'provider-mode-browser', 'hosted-demo-browser-evidence', 'quality-export'], risk: 'visible multilingual rendering' },
  { pattern: /^src\/research-engine\.js$/, gates: ['research-module-check', 'language-description-audit-check', 'hosted-demo-browser-evidence'], risk: 'runtime orchestration and visible copy' },
  { pattern: /^src\/styles\.css$/, gates: ['browser-layout-persistence', 'browser-visual-regression', 'hosted-demo-browser-evidence'], risk: 'layout, RTL/LTR, visual regressions' },
  { pattern: /^tests\//, gates: ['test:current:no-browser'], risk: 'test contract or registry coverage' },
  { pattern: /^fixtures\//, gates: ['fixtures-check', 'fixture-payload-budget-check', 'migration-check', 'privacy-release-gate-check'], risk: 'fixture/schema regression' },
  { pattern: /^docs\//, gates: ['docs/release audit', 'release gate'], risk: 'release truthfulness and handoff clarity' },
  { pattern: /^package(-lock)?\.json$/, gates: ['ci-gate-registry-check', 'version-suite-registry-check', 'node24-ci-compat-check'], risk: 'script surface or dependency drift' },
  { pattern: /^\.github\//, gates: ['ci-workflow-install-check', 'node24-ci-compat-check'], risk: 'CI runtime drift' }
];

export function impactForFiles(files) {
  const impacts = [];
  for (const file of files) {
    const matches = IMPACT_RULES.filter((rule) => rule.pattern.test(file));
    impacts.push({
      file,
      gates: [...new Set(matches.flatMap((match) => match.gates))],
      risks: matches.map((match) => match.risk)
    });
  }
  return impacts;
}

export function gateCount() {
  const gates = registry().gates || {};
  return Object.fromEntries(Object.entries(gates).map(([name, gate]) => [name, (gate.node_checks || []).length]));
}
