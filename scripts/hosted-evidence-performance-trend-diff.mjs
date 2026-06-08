#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const HOSTED_EVIDENCE_PERFORMANCE_TREND_DIFF_CONTRACT = Object.freeze({
  version: 2,
  json_file: 'hosted-evidence-performance-trend-diff.json',
  markdown_file: 'hosted-evidence-performance-trend-diff.md',
  default_output_dir: 'performance-trends',
  default_total_warning_threshold_ratio: 0.10,
  default_total_failure_threshold_ratio: 0.20,
  default_phase_warning_threshold_ratio: 0.15,
  default_phase_failure_threshold_ratio: 0.30,
  default_phase_utilization_warning_ratio: 0.75,
  default_phase_utilization_failure_ratio: 0.90,
  stable_band_ratio: 0.05,
  regression_exit_code: 2
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

function policyStatusFromDelta(deltaMs, previous, warningThresholdRatio, failureThresholdRatio, stableBandRatio) {
  const failureLimitMs = previous * failureThresholdRatio;
  const warningLimitMs = previous * warningThresholdRatio;
  const stableBandMs = previous * stableBandRatio;
  if (deltaMs > failureLimitMs) return { timing_status: 'regressed', policy_status: 'fail' };
  if (deltaMs > warningLimitMs) return { timing_status: 'stable', policy_status: 'warn' };
  if (deltaMs < -stableBandMs) return { timing_status: 'improved', policy_status: 'pass' };
  return { timing_status: 'stable', policy_status: 'pass' };
}

function utilizationPolicyStatus(utilization, warningRatio, failureRatio) {
  const ratio = asNumber(utilization);
  if (ratio >= failureRatio) return 'fail';
  if (ratio >= warningRatio) return 'warn';
  return 'pass';
}

function compareDuration(currentDuration, previousDuration, warningThresholdRatio, failureThresholdRatio, stableBandRatio) {
  const current = asNumber(currentDuration);
  const previous = asNumber(previousDuration);
  const deltaMs = current - previous;
  const deltaRatio = previous > 0 ? deltaMs / previous : 0;
  const policy = policyStatusFromDelta(deltaMs, previous, warningThresholdRatio, failureThresholdRatio, stableBandRatio);
  return {
    current_duration_ms: current,
    previous_duration_ms: previous,
    delta_ms: deltaMs,
    delta_ratio: Number(deltaRatio.toFixed(4)),
    delta_percent: Number((deltaRatio * 100).toFixed(2)),
    warning_threshold_ratio: warningThresholdRatio,
    failure_threshold_ratio: failureThresholdRatio,
    regression_threshold_ratio: failureThresholdRatio,
    status: policy.timing_status,
    policy_status: policy.policy_status
  };
}

function worstPolicyStatus(statuses) {
  if (statuses.includes('fail')) return 'fail';
  if (statuses.includes('warn')) return 'warn';
  return 'pass';
}

export function buildHostedEvidencePerformanceTrendDiff({
  currentLedger,
  previousLedger,
  totalWarningThresholdRatio = HOSTED_EVIDENCE_PERFORMANCE_TREND_DIFF_CONTRACT.default_total_warning_threshold_ratio,
  totalFailureThresholdRatio = HOSTED_EVIDENCE_PERFORMANCE_TREND_DIFF_CONTRACT.default_total_failure_threshold_ratio,
  phaseWarningThresholdRatio = HOSTED_EVIDENCE_PERFORMANCE_TREND_DIFF_CONTRACT.default_phase_warning_threshold_ratio,
  phaseFailureThresholdRatio = HOSTED_EVIDENCE_PERFORMANCE_TREND_DIFF_CONTRACT.default_phase_failure_threshold_ratio,
  phaseUtilizationWarningRatio = HOSTED_EVIDENCE_PERFORMANCE_TREND_DIFF_CONTRACT.default_phase_utilization_warning_ratio,
  phaseUtilizationFailureRatio = HOSTED_EVIDENCE_PERFORMANCE_TREND_DIFF_CONTRACT.default_phase_utilization_failure_ratio,
  stableBandRatio = HOSTED_EVIDENCE_PERFORMANCE_TREND_DIFF_CONTRACT.stable_band_ratio,
  totalRegressionThresholdRatio,
  phaseRegressionThresholdRatio
}) {
  const totalFailure = asRatio(totalRegressionThresholdRatio, totalFailureThresholdRatio);
  const phaseFailure = asRatio(phaseRegressionThresholdRatio, phaseFailureThresholdRatio);
  const currentEntry = entryFromLedger(currentLedger, 'current');
  const previousEntry = entryFromLedger(previousLedger, 'previous');
  const currentPhases = phaseMap(currentEntry);
  const previousPhases = phaseMap(previousEntry);
  const phaseNames = [...new Set([...currentPhases.keys(), ...previousPhases.keys()])].sort();
  const phaseDiffs = phaseNames.map((phase) => {
    const current = currentPhases.get(phase) || { phase, duration_ms: 0, budget_ms: 0, within_budget: false, budget_utilization: 0 };
    const previous = previousPhases.get(phase) || { phase, duration_ms: 0, budget_ms: 0, within_budget: false, budget_utilization: 0 };
    const duration = compareDuration(current.duration_ms, previous.duration_ms, phaseWarningThresholdRatio, phaseFailure, stableBandRatio);
    const currentBudgetMs = asNumber(current.budget_ms);
    const utilization = currentBudgetMs > 0
      ? Number((duration.current_duration_ms / currentBudgetMs).toFixed(4))
      : asNumber(current.budget_utilization);
    const utilizationStatus = utilizationPolicyStatus(utilization, phaseUtilizationWarningRatio, phaseUtilizationFailureRatio);
    return {
      phase,
      ...duration,
      current_budget_ms: currentBudgetMs,
      previous_budget_ms: asNumber(previous.budget_ms),
      current_budget_utilization: utilization,
      previous_budget_utilization: asNumber(previous.budget_utilization),
      utilization_policy_status: utilizationStatus,
      phase_policy_status: worstPolicyStatus([duration.policy_status, utilizationStatus]),
      current_within_budget: current.within_budget === true,
      previous_within_budget: previous.within_budget === true
    };
  });
  const total = compareDuration(
    currentEntry.total_duration_ms,
    previousEntry.total_duration_ms,
    totalWarningThresholdRatio,
    totalFailure,
    stableBandRatio
  );
  const regressedPhases = phaseDiffs.filter((record) => record.phase_policy_status === 'fail').map((record) => record.phase);
  const warningPhases = phaseDiffs.filter((record) => record.phase_policy_status === 'warn').map((record) => record.phase);
  const improvedPhases = phaseDiffs.filter((record) => record.status === 'improved').map((record) => record.phase);
  const policyStatus = worstPolicyStatus([total.policy_status, ...phaseDiffs.map((record) => record.phase_policy_status)]);
  const status = policyStatus === 'fail'
    ? 'regressed'
    : policyStatus === 'warn'
      ? 'warning'
      : total.status === 'improved' || improvedPhases.length > 0
        ? 'improved'
        : 'stable';
  return {
    hosted_evidence_performance_trend_diff_version: HOSTED_EVIDENCE_PERFORMANCE_TREND_DIFF_CONTRACT.version,
    generated_at: new Date().toISOString(),
    comparison_policy: 'current-vs-previous-hosted-evidence-performance-ledger',
    thresholds: {
      total_warning_threshold_ratio: totalWarningThresholdRatio,
      total_failure_threshold_ratio: totalFailure,
      phase_warning_threshold_ratio: phaseWarningThresholdRatio,
      phase_failure_threshold_ratio: phaseFailure,
      phase_utilization_warning_ratio: phaseUtilizationWarningRatio,
      phase_utilization_failure_ratio: phaseUtilizationFailureRatio,
      stable_band_ratio: stableBandRatio
    },
    threshold_policy: {
      status: policyStatus,
      passed: policyStatus !== 'fail',
      warned: policyStatus === 'warn',
      failed: policyStatus === 'fail',
      total_policy_status: total.policy_status,
      warning_phases: warningPhases,
      failed_phases: regressedPhases,
      exit_code_on_failure: HOSTED_EVIDENCE_PERFORMANCE_TREND_DIFF_CONTRACT.regression_exit_code
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
      passed: policyStatus !== 'fail',
      total_status: total.status,
      total_policy_status: total.policy_status,
      warning_phases: warningPhases,
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
    `- Threshold policy: \`${diff.threshold_policy.status}\``,
    `- Policy passed: \`${diff.threshold_policy.passed}\``,
    `- Regression guard: \`${diff.regression_guard.status}\``,
    `- Passed: \`${diff.regression_guard.passed}\``,
    `- Total duration delta: \`${diff.total_duration_diff.delta_ms}ms\` (${diff.total_duration_diff.delta_percent}%)`,
    `- Total policy: \`${diff.total_duration_diff.policy_status}\``,
    `- Total status: \`${diff.total_duration_diff.status}\``,
    '',
    '## Threshold policy',
    '',
    `- Total warning threshold: \`${diff.thresholds.total_warning_threshold_ratio}\``,
    `- Total failure threshold: \`${diff.thresholds.total_failure_threshold_ratio}\``,
    `- Phase warning threshold: \`${diff.thresholds.phase_warning_threshold_ratio}\``,
    `- Phase failure threshold: \`${diff.thresholds.phase_failure_threshold_ratio}\``,
    `- Phase utilization warning: \`${diff.thresholds.phase_utilization_warning_ratio}\``,
    `- Phase utilization failure: \`${diff.thresholds.phase_utilization_failure_ratio}\``,
    '',
    '## Phase trend diff',
    '',
    '| Phase | Previous ms | Current ms | Delta ms | Delta % | Timing | Policy | Utilization |',
    '|---|---:|---:|---:|---:|---|---|---:|',
    ...diff.phase_diffs.map((record) => `| ${record.phase} | ${record.previous_duration_ms} | ${record.current_duration_ms} | ${record.delta_ms} | ${record.delta_percent} | ${record.status} | ${record.phase_policy_status} | ${record.current_budget_utilization} |`),
    ''
  ].join('\n');
}

export function writeHostedEvidencePerformanceTrendDiff({ currentLedgerFile, previousLedgerFile, outputDir, thresholds = {} }) {
  const diff = buildHostedEvidencePerformanceTrendDiff({
    currentLedger: readJson(currentLedgerFile),
    previousLedger: readJson(previousLedgerFile),
    totalWarningThresholdRatio: asRatio(thresholds.totalWarningThresholdRatio, HOSTED_EVIDENCE_PERFORMANCE_TREND_DIFF_CONTRACT.default_total_warning_threshold_ratio),
    totalFailureThresholdRatio: asRatio(thresholds.totalFailureThresholdRatio, HOSTED_EVIDENCE_PERFORMANCE_TREND_DIFF_CONTRACT.default_total_failure_threshold_ratio),
    phaseWarningThresholdRatio: asRatio(thresholds.phaseWarningThresholdRatio, HOSTED_EVIDENCE_PERFORMANCE_TREND_DIFF_CONTRACT.default_phase_warning_threshold_ratio),
    phaseFailureThresholdRatio: asRatio(thresholds.phaseFailureThresholdRatio, HOSTED_EVIDENCE_PERFORMANCE_TREND_DIFF_CONTRACT.default_phase_failure_threshold_ratio),
    phaseUtilizationWarningRatio: asRatio(thresholds.phaseUtilizationWarningRatio, HOSTED_EVIDENCE_PERFORMANCE_TREND_DIFF_CONTRACT.default_phase_utilization_warning_ratio),
    phaseUtilizationFailureRatio: asRatio(thresholds.phaseUtilizationFailureRatio, HOSTED_EVIDENCE_PERFORMANCE_TREND_DIFF_CONTRACT.default_phase_utilization_failure_ratio),
    totalRegressionThresholdRatio: thresholds.totalRegressionThresholdRatio,
    phaseRegressionThresholdRatio: thresholds.phaseRegressionThresholdRatio,
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
      totalWarningThresholdRatio: readArg('--total-warning-threshold-ratio'),
      totalFailureThresholdRatio: readArg('--total-failure-threshold-ratio'),
      phaseWarningThresholdRatio: readArg('--phase-warning-threshold-ratio'),
      phaseFailureThresholdRatio: readArg('--phase-failure-threshold-ratio'),
      phaseUtilizationWarningRatio: readArg('--phase-utilization-warning-ratio'),
      phaseUtilizationFailureRatio: readArg('--phase-utilization-failure-ratio'),
      totalRegressionThresholdRatio: readArg('--total-regression-threshold-ratio'),
      phaseRegressionThresholdRatio: readArg('--phase-regression-threshold-ratio'),
      stableBandRatio: readArg('--stable-band-ratio')
    }
  });
  if (hasFlag('--json')) {
    console.log(JSON.stringify(result.diff, null, 2));
  } else {
    console.log(`Hosted evidence performance trend diff written: ${result.jsonPath}`);
    console.log(`Threshold policy: ${result.diff.threshold_policy.status}`);
    console.log(`Regression guard: ${result.diff.regression_guard.status}`);
    console.log(`Total duration delta: ${result.diff.total_duration_diff.delta_ms}ms`);
    if (result.diff.threshold_policy.warning_phases.length) {
      console.log(`Warning phases: ${result.diff.threshold_policy.warning_phases.join(', ')}`);
    }
    if (result.diff.threshold_policy.failed_phases.length) {
      console.log(`Failed phases: ${result.diff.threshold_policy.failed_phases.join(', ')}`);
    }
  }
  if (result.diff.threshold_policy.status === 'fail') process.exit(HOSTED_EVIDENCE_PERFORMANCE_TREND_DIFF_CONTRACT.regression_exit_code);
}

if (path.resolve(process.argv[1] || '') === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    console.error(error?.message || error);
    process.exit(1);
  }
}
