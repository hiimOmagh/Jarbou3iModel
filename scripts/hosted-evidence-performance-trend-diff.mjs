#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const HOSTED_EVIDENCE_PERFORMANCE_TREND_DIFF_CONTRACT = Object.freeze({
  version: 1,
  json_file: 'hosted-evidence-performance-trend-diff.json',
  markdown_file: 'hosted-evidence-performance-trend-diff.md',
  default_output_dir: 'performance-trends',
  default_total_regression_threshold_ratio: 0.15,
  default_phase_regression_threshold_ratio: 0.25,
  stable_band_ratio: 0.05
});

function fail(message) {
  throw new Error(`hosted evidence performance trend diff failed: ${message}`);
}

function readJson(file) {
  if (!file || !fs.existsSync(file)) fail(`missing ledger file: ${file}`);
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

function asNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function asRatio(value, fallback) {
  if (value === null || value === undefined || value === '') return fallback;
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : fallback;
}

function entryFromLedger(ledger, label) {
  const entry = ledger?.current_entry || ledger;
  if (!entry || typeof entry !== 'object') fail(`${label} ledger missing current_entry`);
  if (!Array.isArray(entry.phase_records)) fail(`${label} ledger missing phase_records`);
  return entry;
}

function phaseMap(entry) {
  return new Map(entry.phase_records.map((record) => [String(record.phase || 'unknown'), record]));
}

function compareDuration(currentDuration, previousDuration, regressionThresholdRatio, stableBandRatio) {
  const current = asNumber(currentDuration);
  const previous = asNumber(previousDuration);
  const deltaMs = current - previous;
  const deltaRatio = previous > 0 ? deltaMs / previous : 0;
  const regressionLimitMs = previous * regressionThresholdRatio;
  const stableBandMs = previous * stableBandRatio;
  let status = 'stable';
  if (deltaMs > regressionLimitMs) status = 'regressed';
  else if (deltaMs < -stableBandMs) status = 'improved';
  return {
    current_duration_ms: current,
    previous_duration_ms: previous,
    delta_ms: deltaMs,
    delta_ratio: Number(deltaRatio.toFixed(4)),
    delta_percent: Number((deltaRatio * 100).toFixed(2)),
    regression_threshold_ratio: regressionThresholdRatio,
    status
  };
}

export function buildHostedEvidencePerformanceTrendDiff({
  currentLedger,
  previousLedger,
  totalRegressionThresholdRatio = HOSTED_EVIDENCE_PERFORMANCE_TREND_DIFF_CONTRACT.default_total_regression_threshold_ratio,
  phaseRegressionThresholdRatio = HOSTED_EVIDENCE_PERFORMANCE_TREND_DIFF_CONTRACT.default_phase_regression_threshold_ratio,
  stableBandRatio = HOSTED_EVIDENCE_PERFORMANCE_TREND_DIFF_CONTRACT.stable_band_ratio
}) {
  const currentEntry = entryFromLedger(currentLedger, 'current');
  const previousEntry = entryFromLedger(previousLedger, 'previous');
  const currentPhases = phaseMap(currentEntry);
  const previousPhases = phaseMap(previousEntry);
  const phaseNames = [...new Set([...currentPhases.keys(), ...previousPhases.keys()])].sort();
  const phaseDiffs = phaseNames.map((phase) => {
    const current = currentPhases.get(phase) || { phase, duration_ms: 0, budget_ms: 0, within_budget: false };
    const previous = previousPhases.get(phase) || { phase, duration_ms: 0, budget_ms: 0, within_budget: false };
    const duration = compareDuration(current.duration_ms, previous.duration_ms, phaseRegressionThresholdRatio, stableBandRatio);
    return {
      phase,
      ...duration,
      current_budget_ms: asNumber(current.budget_ms),
      previous_budget_ms: asNumber(previous.budget_ms),
      current_within_budget: current.within_budget === true,
      previous_within_budget: previous.within_budget === true
    };
  });
  const total = compareDuration(
    currentEntry.total_duration_ms,
    previousEntry.total_duration_ms,
    totalRegressionThresholdRatio,
    stableBandRatio
  );
  const regressedPhases = phaseDiffs.filter((record) => record.status === 'regressed').map((record) => record.phase);
  const improvedPhases = phaseDiffs.filter((record) => record.status === 'improved').map((record) => record.phase);
  const status = total.status === 'regressed' || regressedPhases.length > 0 ? 'regressed' : total.status === 'improved' || improvedPhases.length > 0 ? 'improved' : 'stable';
  return {
    hosted_evidence_performance_trend_diff_version: HOSTED_EVIDENCE_PERFORMANCE_TREND_DIFF_CONTRACT.version,
    generated_at: new Date().toISOString(),
    comparison_policy: 'current-vs-previous-hosted-evidence-performance-ledger',
    thresholds: {
      total_regression_threshold_ratio: totalRegressionThresholdRatio,
      phase_regression_threshold_ratio: phaseRegressionThresholdRatio,
      stable_band_ratio: stableBandRatio
    },
    current: {
      version: currentEntry.version || currentLedger.version || null,
      release: currentEntry.release || currentLedger.release || null,
      run_id: currentEntry.run_id || null,
      commit_sha: currentEntry.commit_sha || null,
      ref_name: currentEntry.ref_name || null
    },
    previous: {
      version: previousEntry.version || previousLedger.version || null,
      release: previousEntry.release || previousLedger.release || null,
      run_id: previousEntry.run_id || null,
      commit_sha: previousEntry.commit_sha || null,
      ref_name: previousEntry.ref_name || null
    },
    total_duration_diff: total,
    phase_diffs: phaseDiffs,
    regression_guard: {
      status,
      passed: status !== 'regressed',
      total_status: total.status,
      regressed_phases: regressedPhases,
      improved_phases: improvedPhases,
      phase_count: phaseDiffs.length
    }
  };
}

export function renderHostedEvidencePerformanceTrendDiffMarkdown(diff) {
  return [
    `# Hosted Evidence Performance Trend Diff — ${diff.current.release || diff.current.version || 'current'}`,
    '',
    `- Previous: \`${diff.previous.release || diff.previous.version || 'unknown'}\``,
    `- Current: \`${diff.current.release || diff.current.version || 'unknown'}\``,
    `- Regression guard: \`${diff.regression_guard.status}\``,
    `- Passed: \`${diff.regression_guard.passed}\``,
    `- Total duration delta: \`${diff.total_duration_diff.delta_ms}ms\` (${diff.total_duration_diff.delta_percent}%)`,
    `- Total status: \`${diff.total_duration_diff.status}\``,
    '',
    '## Phase trend diff',
    '',
    '| Phase | Previous ms | Current ms | Delta ms | Delta % | Status |',
    '|---|---:|---:|---:|---:|---|',
    ...diff.phase_diffs.map((record) => `| ${record.phase} | ${record.previous_duration_ms} | ${record.current_duration_ms} | ${record.delta_ms} | ${record.delta_percent} | ${record.status} |`),
    ''
  ].join('\n');
}

export function writeHostedEvidencePerformanceTrendDiff({ currentLedgerFile, previousLedgerFile, outputDir, thresholds = {} }) {
  const diff = buildHostedEvidencePerformanceTrendDiff({
    currentLedger: readJson(currentLedgerFile),
    previousLedger: readJson(previousLedgerFile),
    totalRegressionThresholdRatio: asRatio(thresholds.totalRegressionThresholdRatio, HOSTED_EVIDENCE_PERFORMANCE_TREND_DIFF_CONTRACT.default_total_regression_threshold_ratio),
    phaseRegressionThresholdRatio: asRatio(thresholds.phaseRegressionThresholdRatio, HOSTED_EVIDENCE_PERFORMANCE_TREND_DIFF_CONTRACT.default_phase_regression_threshold_ratio),
    stableBandRatio: asRatio(thresholds.stableBandRatio, HOSTED_EVIDENCE_PERFORMANCE_TREND_DIFF_CONTRACT.stable_band_ratio)
  });
  const jsonPath = path.join(outputDir, HOSTED_EVIDENCE_PERFORMANCE_TREND_DIFF_CONTRACT.json_file);
  const markdownPath = path.join(outputDir, HOSTED_EVIDENCE_PERFORMANCE_TREND_DIFF_CONTRACT.markdown_file);
  writeJson(jsonPath, diff);
  writeText(markdownPath, renderHostedEvidencePerformanceTrendDiffMarkdown(diff));
  return { diff, jsonPath, markdownPath };
}

function readArg(name) {
  const exact = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (exact) return exact.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  if (index >= 0 && process.argv[index + 1]) return process.argv[index + 1];
  return null;
}

function hasFlag(name) {
  return process.argv.includes(name);
}

function main() {
  const currentLedgerFile = readArg('--current-ledger') || readArg('--current');
  const previousLedgerFile = readArg('--previous-ledger') || readArg('--previous');
  const outputDir = readArg('--output-dir') || path.join(process.cwd(), HOSTED_EVIDENCE_PERFORMANCE_TREND_DIFF_CONTRACT.default_output_dir);
  if (!currentLedgerFile || !previousLedgerFile) {
    fail('usage: node scripts/hosted-evidence-performance-trend-diff.mjs --current-ledger <file> --previous-ledger <file> [--output-dir <dir>] [--json]');
  }
  const result = writeHostedEvidencePerformanceTrendDiff({
    currentLedgerFile,
    previousLedgerFile,
    outputDir,
    thresholds: {
      totalRegressionThresholdRatio: readArg('--total-regression-threshold-ratio'),
      phaseRegressionThresholdRatio: readArg('--phase-regression-threshold-ratio'),
      stableBandRatio: readArg('--stable-band-ratio')
    }
  });
  if (hasFlag('--json')) {
    console.log(JSON.stringify(result.diff, null, 2));
  } else {
    console.log(`Hosted evidence performance trend diff written: ${result.jsonPath}`);
    console.log(`Regression guard: ${result.diff.regression_guard.status}`);
    console.log(`Total duration delta: ${result.diff.total_duration_diff.delta_ms}ms`);
    if (result.diff.regression_guard.regressed_phases.length) {
      console.log(`Regressed phases: ${result.diff.regression_guard.regressed_phases.join(', ')}`);
    }
  }
  if (result.diff.regression_guard.status === 'regressed') process.exit(2);
}

if (path.resolve(process.argv[1] || '') === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    console.error(error?.message || error);
    process.exit(1);
  }
}
