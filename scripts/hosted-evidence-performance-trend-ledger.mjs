#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const HOSTED_EVIDENCE_PERFORMANCE_TREND_LEDGER_CONTRACT = Object.freeze({
  version: 1,
  json_file: 'hosted-evidence-performance-trend-ledger.json',
  markdown_file: 'hosted-evidence-performance-trend-ledger.md',
  default_output_dir: 'performance-trends',
  required_timing_field: 'timing_budget_guard'
});

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n');
}

function writeText(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, value);
}

function fail(message) {
  throw new Error(`hosted evidence trend diff ledger failed: ${message}`);
}

function asNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function findSlowestPhase(records) {
  const sorted = [...records].sort((a, b) => asNumber(b.duration_ms) - asNumber(a.duration_ms));
  return sorted[0] || null;
}

function normalizePhaseRecord(record) {
  const duration = asNumber(record.duration_ms);
  const budget = asNumber(record.budget_ms);
  return {
    phase: String(record.phase || 'unknown'),
    duration_ms: duration,
    budget_ms: budget,
    within_budget: record.within_budget === true && duration <= budget,
    budget_utilization: budget > 0 ? Number((duration / budget).toFixed(4)) : null
  };
}

export function buildHostedEvidencePerformanceTrendLedger({ bundleDir, metadataFile, manifestFile }) {
  const metadataPath = metadataFile || path.join(bundleDir || '', 'hosted-demo-evidence', 'hosted-demo-metadata.json');
  if (!metadataPath || !fs.existsSync(metadataPath)) fail(`missing hosted evidence metadata: ${metadataPath}`);
  const metadata = readJson(metadataPath);
  const timing = metadata?.timing_budget_guard;
  if (!timing || !Array.isArray(timing.phase_records)) fail('hosted-demo metadata missing timing_budget_guard.phase_records');

  const manifestPath = manifestFile || (bundleDir ? path.join(bundleDir, 'evidence-manifest.json') : null);
  const manifest = manifestPath && fs.existsSync(manifestPath) ? readJson(manifestPath) : {};
  const version = metadata.evidence_review_version || manifest.version || metadata.page?.app_version;
  const release = manifest.release || (version ? `v${version}` : 'unknown-release');
  const publicVersionLabel = manifest.public_version_label || metadata.public_version_label || null;
  const phaseRecords = timing.phase_records.map(normalizePhaseRecord);
  const slowestPhase = findSlowestPhase(phaseRecords);
  const overBudgetPhases = phaseRecords.filter((record) => record.within_budget !== true).map((record) => record.phase);
  const totalDurationMs = asNumber(timing.total_duration_ms);
  const totalBudgetMs = asNumber(timing.total_capture_budget_ms);
  const currentEntry = {
    version,
    release,
    public_version_label: publicVersionLabel,
    run_id: manifest.run_id || null,
    run_attempt: manifest.run_attempt || null,
    commit_sha: manifest.commit_sha || null,
    ref_name: manifest.branch || null,
    generated_at: metadata.generated_at || null,
    total_duration_ms: totalDurationMs,
    total_capture_budget_ms: totalBudgetMs,
    total_within_budget: timing.total_within_budget === true && totalDurationMs <= totalBudgetMs,
    phase_count: phaseRecords.length,
    all_phases_within_budget: phaseRecords.every((record) => record.within_budget === true),
    slowest_phase: slowestPhase,
    over_budget_phases: overBudgetPhases,
    phase_records: phaseRecords
  };

  return {
    hosted_evidence_performance_trend_ledger_version: HOSTED_EVIDENCE_PERFORMANCE_TREND_LEDGER_CONTRACT.version,
    generated_from: 'hosted-demo-metadata.timing_budget_guard',
    generated_at: new Date().toISOString(),
    release,
    version,
    public_version_label: publicVersionLabel,
    ledger_policy: 'single-current-entry-ledger-inside-lock-bundle; external operators may concatenate entries across releases',
    current_entry: currentEntry,
    trend_window: [currentEntry],
    regression_guard: {
      status: currentEntry.total_within_budget && currentEntry.all_phases_within_budget ? 'passed' : 'failed',
      total_within_budget: currentEntry.total_within_budget,
      all_phases_within_budget: currentEntry.all_phases_within_budget,
      slowest_phase_within_budget: slowestPhase ? slowestPhase.within_budget === true : false,
      trend_entry_count: 1
    }
  };
}

export function renderHostedEvidencePerformanceTrendLedgerMarkdown(ledger) {
  const entry = ledger.current_entry;
  const slowest = entry.slowest_phase || {};
  return [
    `# Hosted Evidence Performance Trend Ledger — ${ledger.release}`,
    '',
    `- Version: \`${ledger.version}\``,
    `- Run: \`${entry.run_id || 'unknown'}\` attempt \`${entry.run_attempt || 'unknown'}\``,
    `- Commit: \`${entry.commit_sha || 'unknown'}\``,
    `- Ref: \`${entry.ref_name || 'unknown'}\``,
    `- Regression guard: \`${ledger.regression_guard.status}\``,
    '',
    '## Current entry',
    '',
    `- Total duration: \`${entry.total_duration_ms}ms\``,
    `- Total budget: \`${entry.total_capture_budget_ms}ms\``,
    `- Total within budget: \`${entry.total_within_budget}\``,
    `- Phase count: \`${entry.phase_count}\``,
    `- All phases within budget: \`${entry.all_phases_within_budget}\``,
    `- Slowest phase: \`${slowest.phase || 'unknown'}\``,
    `- Slowest phase duration: \`${slowest.duration_ms ?? 'unknown'}ms\``,
    `- Slowest phase budget: \`${slowest.budget_ms ?? 'unknown'}ms\``,
    '',
    '## Phase records',
    '',
    '| Phase | Duration ms | Budget ms | Within budget | Utilization |',
    '|---|---:|---:|---|---:|',
    ...entry.phase_records.map((record) => `| ${record.phase} | ${record.duration_ms} | ${record.budget_ms} | ${record.within_budget} | ${record.budget_utilization ?? 'n/a'} |`),
    ''
  ].join('\n');
}

export function writeHostedEvidencePerformanceTrendLedger(bundleDir, outputDir = path.join(bundleDir, HOSTED_EVIDENCE_PERFORMANCE_TREND_LEDGER_CONTRACT.default_output_dir)) {
  const ledger = buildHostedEvidencePerformanceTrendLedger({ bundleDir });
  const jsonPath = path.join(outputDir, HOSTED_EVIDENCE_PERFORMANCE_TREND_LEDGER_CONTRACT.json_file);
  const markdownPath = path.join(outputDir, HOSTED_EVIDENCE_PERFORMANCE_TREND_LEDGER_CONTRACT.markdown_file);
  writeJson(jsonPath, ledger);
  writeText(markdownPath, renderHostedEvidencePerformanceTrendLedgerMarkdown(ledger));
  return { ledger, jsonPath, markdownPath };
}

function readArg(name) {
  const exact = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (exact) return exact.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  if (index >= 0 && process.argv[index + 1]) return process.argv[index + 1];
  return null;
}

function main() {
  const bundleDir = readArg('--bundle-dir');
  const metadataFile = readArg('--metadata-file');
  const outputDir = readArg('--output-dir') || (bundleDir ? path.join(bundleDir, 'performance-trends') : null);
  if ((!bundleDir && !metadataFile) || !outputDir) fail('usage: node scripts/hosted-evidence-performance-trend-ledger.mjs --bundle-dir <bundleDir> [--output-dir <dir>]');
  const ledger = metadataFile
    ? buildHostedEvidencePerformanceTrendLedger({ metadataFile })
    : buildHostedEvidencePerformanceTrendLedger({ bundleDir });
  const jsonPath = path.join(outputDir, HOSTED_EVIDENCE_PERFORMANCE_TREND_LEDGER_CONTRACT.json_file);
  const markdownPath = path.join(outputDir, HOSTED_EVIDENCE_PERFORMANCE_TREND_LEDGER_CONTRACT.markdown_file);
  writeJson(jsonPath, ledger);
  writeText(markdownPath, renderHostedEvidencePerformanceTrendLedgerMarkdown(ledger));
  console.log(`Hosted evidence trend diff ledger written: ${jsonPath}`);
  console.log(`Slowest phase: ${ledger.current_entry.slowest_phase?.phase || 'unknown'}`);
  console.log(`Regression guard: ${ledger.regression_guard.status}`);
}

if (path.resolve(process.argv[1] || '') === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    console.error(error?.message || error);
    process.exit(1);
  }
}
