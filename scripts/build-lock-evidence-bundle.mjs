#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import os from 'node:os';

const root = process.cwd();
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const version = pkg.version;
const publicVersionLabel = 'v1.2.0-alpha.8.1 CI Stabilization + Workflow Quarantine';
const release = `v${version} — CI Stabilization + Workflow Quarantine`;
const runId = process.env.GITHUB_RUN_ID || process.env.RUN_ID || 'local-run';
const runAttempt = process.env.GITHUB_RUN_ATTEMPT || 'local-attempt';
const commitSha = process.env.GITHUB_SHA || 'local-sha';
const branch = process.env.GITHUB_REF_NAME || 'local-branch';
const runnerTemp = process.env.RUNNER_TEMP || os.tmpdir();
const evidenceDir = process.env.HOSTED_DEMO_EVIDENCE_DIR || path.join(runnerTemp, 'hosted-demo-evidence');
const inputDir = process.env.LOCK_EVIDENCE_INPUT_DIR || path.join(runnerTemp, 'lock-evidence-input');
const outputRoot = process.env.LOCK_EVIDENCE_BUNDLE_DIR || path.join(runnerTemp, 'lock-evidence-bundle');
const bundleName = `lock-evidence-bundle_${version}_${runId}`;
const bundleDir = path.join(outputRoot, bundleName);
const expectedRootCaptures = ['desktop-first-screen','mobile-first-screen','provider-mode','quality-export'];
const expectedMatrixLocales = ['en','ar','fr'];
const expectedMatrixRows = 39;

function ensureDir(dir){ fs.mkdirSync(dir, {recursive:true}); }
function readJson(file){ return JSON.parse(fs.readFileSync(file, 'utf8')); }
function writeJson(file, value){ fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n'); }
function copyFile(src, dst){ ensureDir(path.dirname(dst)); fs.copyFileSync(src, dst); }
function sha256(file){ return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'); }
function listFiles(dir){ const out=[]; if(!fs.existsSync(dir)) return out; for(const entry of fs.readdirSync(dir,{withFileTypes:true})){ const full=path.join(dir,entry.name); if(entry.isDirectory()) out.push(...listFiles(full)); else out.push(full); } return out.sort(); }
function copyDir(src, dst){ if(!fs.existsSync(src)) return; for(const file of listFiles(src)){ const rel=path.relative(src,file); copyFile(file,path.join(dst,rel)); } }
function maybeCopy(src, dst){ if(fs.existsSync(src)) copyFile(src,dst); }
function fail(message){ console.error(`lock-evidence-bundle failed: ${message}`); process.exit(1); }
function textIncludes(file, token){ return fs.existsSync(file) && fs.readFileSync(file,'utf8').includes(token); }
function maxOverflow(rows){ return Math.max(0, ...rows.map((row)=>Number(row.horizontal_overflow_px || row.horizontal_overflow_max_px || 0))); }
function normalizeCaptureSanity(metadata){
  if(Array.isArray(metadata?.evidence_matrix?.captures)) return metadata.evidence_matrix.captures.map((row)=>({
    name: row.matrix_id || `${row.surface || 'surface'}-${row.locale || 'locale'}`,
    horizontal_overflow_px: Number(row.horizontal_overflow_px || 0),
    capture_settled: row.capture_settled !== false,
    visual_artifact_guard_passed: row.visual_artifact_guard_passed === true,
    language_purity_passed: row.language_purity_passed !== false,
    required_copy_present: row.required_copy_present !== false,
    pass: row.pass === true,
    matrix_row: true
  }));
  if(Array.isArray(metadata?.screenshot_sanity)) return metadata.screenshot_sanity.map((row)=>({
    name: row.name || 'screenshot_sanity',
    horizontal_overflow_px: Number(row.horizontal_overflow_px || 0),
    capture_settled: row.capture_settled !== false,
    visual_artifact_guard_passed: row.visual_artifact_guard_passed === true,
    language_purity_passed: true,
    required_copy_present: true,
    pass: row.pass !== false,
    matrix_row: false
  }));
  if(Array.isArray(metadata?.captures)) return metadata.captures.map((row)=>({
    name: row.name || 'capture',
    horizontal_overflow_px: Number(row.horizontal_overflow_px || 0),
    capture_settled: row.capture_settled ?? row.settle?.settled ?? true,
    visual_artifact_guard_passed: row.visual_artifact_guard_passed ?? row.artifact_guard?.visual_artifact_guard_passed ?? false,
    language_purity_passed: true,
    required_copy_present: true,
    pass: row.pass !== false,
    matrix_row: false
  }));
  return [];
}

const metadataFile = path.join(evidenceDir, 'hosted-demo-metadata.json');
if(!fs.existsSync(metadataFile)) fail(`missing ${metadataFile}`);
const metadata = readJson(metadataFile);
const pageVersion = metadata?.page?.app_version || metadata?.app_version || null;
if(metadata.evidence_review_version !== version) fail(`evidence_review_version ${metadata.evidence_review_version} does not match ${version}`);
if(metadata.capture_polish_version !== version) fail(`capture_polish_version ${metadata.capture_polish_version} does not match ${version}`);
if(pageVersion !== version) fail(`page.app_version ${pageVersion} does not match ${version}`);
if(metadata.capture_count !== 4) fail(`capture_count ${metadata.capture_count} does not equal 4 root captures`);
if(metadata.all_required_captures_present !== true) fail('all_required_captures_present is not true');
if(metadata.visual_artifact_guard_required !== true) fail('visual_artifact_guard_required is not true');
if(metadata.capture_settle_required !== true) fail('capture_settle_required is not true');

const normalizedCaptures = normalizeCaptureSanity(metadata);
if(!normalizedCaptures.length) fail('no normalized capture sanity records found');
for(const capture of normalizedCaptures){
  if(Number(capture.horizontal_overflow_px || 0) !== 0) fail(`${capture.name || 'capture'} horizontal_overflow_px is not 0`);
  if(capture.capture_settled !== true) fail(`${capture.name || 'capture'} capture_settled is not true`);
  if(capture.visual_artifact_guard_passed !== true) fail(`${capture.name || 'capture'} visual_artifact_guard_passed is not true`);
  if(capture.language_purity_passed !== true) fail(`${capture.name || 'capture'} language_purity_passed is not true`);
  if(capture.required_copy_present !== true) fail(`${capture.name || 'capture'} required_copy_present is not true`);
  if(capture.pass !== true) fail(`${capture.name || 'capture'} pass is not true`);
}

const matrixSummaryPath = path.join(evidenceDir, 'matrix-summary.json');
if(!fs.existsSync(matrixSummaryPath)) fail('hosted evidence missing matrix-summary.json');
const matrixSummary = readJson(matrixSummaryPath);
if(matrixSummary.internal_build_version !== version) fail(`matrix internal_build_version ${matrixSummary.internal_build_version} does not match ${version}`);
if(matrixSummary.public_version_label !== publicVersionLabel) fail(`matrix public_version_label ${matrixSummary.public_version_label} does not match ${publicVersionLabel}`);
if(matrixSummary.expected_rows !== expectedMatrixRows) fail(`matrix expected_rows ${matrixSummary.expected_rows} does not equal ${expectedMatrixRows}`);
if(matrixSummary.actual_rows !== expectedMatrixRows) fail(`matrix actual_rows ${matrixSummary.actual_rows} does not equal ${expectedMatrixRows}`);
if(matrixSummary.passed_rows !== expectedMatrixRows) fail(`matrix passed_rows ${matrixSummary.passed_rows} does not equal ${expectedMatrixRows}`);
if(matrixSummary.failed_rows !== 0) fail(`matrix failed_rows ${matrixSummary.failed_rows} does not equal 0`);
if(matrixSummary.language_purity_passed !== true) fail('matrix language_purity_passed is not true');
if(matrixSummary.visual_guard_passed !== true) fail('matrix visual_guard_passed is not true');
if(Number(matrixSummary.horizontal_overflow_max_px || 0) !== 0) fail('matrix horizontal_overflow_max_px is not 0');
if(matrixSummary.stale_version_residue_detected !== false) fail('matrix stale_version_residue_detected is not false');
for(const locale of expectedMatrixLocales){ if(!matrixSummary.languages?.includes(locale)) fail(`matrix missing locale ${locale}`); }

const requiredHostedFiles = ['hosted-demo-metadata.json','matrix-summary.json','visible-text-en.json','visible-text-ar.json','visible-text-fr.json','desktop-first-screen.png','mobile-first-screen.png','provider-mode.png','quality-export.png'];
for(const file of requiredHostedFiles){ if(!fs.existsSync(path.join(evidenceDir, file))) fail(`hosted evidence missing ${file}`); }
for(const locale of expectedMatrixLocales){
  for(const row of matrixSummary.rows.filter((item)=>item.locale === locale)){
    for(const rel of [row.screenshot,row.visible_text_file,row.dom_facts_file,`${locale}/${row.surface}.validation.json`]) if(!fs.existsSync(path.join(evidenceDir, rel))) fail(`matrix row missing ${rel}`);
  }
}
for(const file of ['export-pack-v3-manifest.json','golden-workflow-export-validation.json','publication-review-report.json','export-artifact-consistency.json']){
  if(!fs.existsSync(path.join(evidenceDir, 'exports', file))) fail(`export evidence missing ${file}`);
}

const visibleChecks=[];
for(const locale of expectedMatrixLocales){
  const file=path.join(evidenceDir, `visible-text-${locale}.json`);
  const raw=fs.readFileSync(file,'utf8');
  if(!raw.includes(version)) fail(`visible-text-${locale}.json missing ${version}`);
  visibleChecks.push({locale, contains_version:true});
}

fs.rmSync(bundleDir, {recursive:true, force:true});
ensureDir(bundleDir);
copyDir(evidenceDir, path.join(bundleDir, 'hosted-demo-evidence'));
copyDir(path.join(evidenceDir, 'exports'), path.join(bundleDir, 'exports'));

const noBrowserLog=path.join(inputDir,'logs','no-browser.log');
const browserLog=path.join(inputDir,'logs','browser.log');
maybeCopy(noBrowserLog,path.join(bundleDir,'logs','no-browser.log'));
maybeCopy(browserLog,path.join(bundleDir,'logs','browser.log'));
if(fs.existsSync(noBrowserLog) && !textIncludes(noBrowserLog,'CI gate passed: no-browser')) fail('no-browser.log does not contain CI gate passed: no-browser');
if(fs.existsSync(browserLog) && !textIncludes(browserLog,'CI gate passed: browser')) fail('browser.log does not contain CI gate passed: browser');

copyFile(path.join(root,'tests','ci-gate-registry.json'), path.join(bundleDir,'ci','ci-gate-registry-snapshot.json'));
writeJson(path.join(bundleDir,'ci','package-version.json'), {name:pkg.name, version, release, public_version_label:publicVersionLabel, private:pkg.private === true});
writeJson(path.join(bundleDir,'ci','workflow-run.json'), {run_id:runId, run_attempt:runAttempt, commit_sha:commitSha, branch});
writeJson(path.join(bundleDir,'ci','test-summary.json'), {no_browser_log_present:fs.existsSync(noBrowserLog), browser_log_present:fs.existsSync(browserLog), matrix_rows:matrixSummary.actual_rows, normalized_capture_count:normalizedCaptures.length});

const manifest={
  evidence_manifest_version: version,
  release,
  internal_build_version: version,
  public_version_label: publicVersionLabel,
  version,
  run_id: runId,
  run_attempt: runAttempt,
  commit_sha: commitSha,
  branch,
  bundle_name: bundleName,
  no_browser:{ status:fs.existsSync(noBrowserLog) ? 'passed' : 'not_included_local_bundle', log_file:fs.existsSync(noBrowserLog) ? 'logs/no-browser.log' : null },
  browser:{ status:fs.existsSync(browserLog) ? 'passed' : 'not_included_local_bundle', log_file:fs.existsSync(browserLog) ? 'logs/browser.log' : null },
  hosted_demo:{ evidence_review_version:metadata.evidence_review_version, capture_polish_version:metadata.capture_polish_version, page_app_version:pageVersion, capture_count:metadata.capture_count, all_required_captures_present:metadata.all_required_captures_present, visual_artifact_guard_required:metadata.visual_artifact_guard_required, capture_settle_required:metadata.capture_settle_required, max_horizontal_overflow_px:maxOverflow(normalizedCaptures), all_visual_artifact_guards_passed:normalizedCaptures.every((capture)=>capture.visual_artifact_guard_passed === true), files:requiredHostedFiles },
  evidence_matrix:{ languages:matrixSummary.languages, surface_count:matrixSummary.surface_count, expected_rows:matrixSummary.expected_rows, actual_rows:matrixSummary.actual_rows, passed_rows:matrixSummary.passed_rows, failed_rows:matrixSummary.failed_rows, language_purity_passed:matrixSummary.language_purity_passed, visual_guard_passed:matrixSummary.visual_guard_passed, horizontal_overflow_max_px:matrixSummary.horizontal_overflow_max_px, stale_version_residue_detected:matrixSummary.stale_version_residue_detected },
  exports:{ export_pack_v3_valid:matrixSummary.export_pack_v3_valid === true, golden_workflow_valid:matrixSummary.golden_workflow_loaded === true || matrixSummary.golden_workflow_valid === true, publication_review_valid:matrixSummary.publication_review_valid === true },
  bundle_validation:{ status:'passed', visible_text_snapshots:visibleChecks, stale_version_residue_detected:false, lock_artifact_ready:true, lockable:true }
};
writeJson(path.join(bundleDir,'evidence-manifest.json'), manifest);
fs.writeFileSync(path.join(bundleDir,'evidence-manifest.md'), `# ${release}\n\n- Internal build version: \`${version}\`\n- Public version label: \`${publicVersionLabel}\`\n- Run ID: \`${runId}\`\n- Commit: \`${commitSha}\`\n- Branch: \`${branch}\`\n- Hosted evidence version: \`${metadata.evidence_review_version}\`\n- Root capture count: \`${metadata.capture_count}\`\n- Evidence matrix rows: \`${matrixSummary.passed_rows}/${matrixSummary.expected_rows}\`\n- Required captures present: \`${metadata.all_required_captures_present}\`\n- Max horizontal overflow: \`${manifest.evidence_matrix.horizontal_overflow_max_px}\`\n- Language purity: \`${manifest.evidence_matrix.language_purity_passed}\`\n- Bundle validation: \`${manifest.bundle_validation.status}\`\n`);

const checksumLines=listFiles(bundleDir).filter((file)=>!file.endsWith('SHA256SUMS.txt')).map((file)=>`${sha256(file)}  ${path.relative(bundleDir,file).replaceAll(path.sep,'/')}`).join('\n') + '\n';
ensureDir(path.join(bundleDir,'checksums'));
fs.writeFileSync(path.join(bundleDir,'checksums','SHA256SUMS.txt'), checksumLines);
console.log(`Canonical lock evidence bundle built: ${bundleDir}`);
console.log(`Bundle manifest: ${path.join(bundleDir,'evidence-manifest.json')}`);
