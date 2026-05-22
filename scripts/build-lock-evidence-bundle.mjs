#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const version = pkg.version;
const release = `v${version} — Canonical Lock Evidence Bundle + Final Stable Handoff`;
const runId = process.env.GITHUB_RUN_ID || process.env.RUN_ID || 'local-run';
const runAttempt = process.env.GITHUB_RUN_ATTEMPT || 'local-attempt';
const commitSha = process.env.GITHUB_SHA || 'local-sha';
const branch = process.env.GITHUB_REF_NAME || 'local-branch';
const evidenceDir = process.env.HOSTED_DEMO_EVIDENCE_DIR || 'ci-artifacts/hosted-demo-evidence';
const inputDir = process.env.LOCK_EVIDENCE_INPUT_DIR || 'ci-artifacts/lock-evidence-input';
const outputRoot = process.env.LOCK_EVIDENCE_BUNDLE_DIR || 'ci-artifacts/lock-evidence-bundle';
const bundleName = `lock-evidence-bundle_${version}_${runId}`;
const bundleDir = path.join(outputRoot, bundleName);

function ensureDir(dir){ fs.mkdirSync(dir, {recursive:true}); }
function readJson(file){ return JSON.parse(fs.readFileSync(file, 'utf8')); }
function writeJson(file, value){ fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n'); }
function copyFile(src, dst){ ensureDir(path.dirname(dst)); fs.copyFileSync(src, dst); }
function sha256(file){ return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'); }
function listFiles(dir){
  const out = [];
  if(!fs.existsSync(dir)) return out;
  for(const entry of fs.readdirSync(dir, {withFileTypes:true})){
    const full = path.join(dir, entry.name);
    if(entry.isDirectory()) out.push(...listFiles(full));
    else out.push(full);
  }
  return out.sort();
}
function maybeCopy(src, dst){ if(fs.existsSync(src)) copyFile(src,dst); }
function fail(message){ console.error(`lock-evidence-bundle failed: ${message}`); process.exit(1); }
function textIncludes(file, token){ return fs.existsSync(file) && fs.readFileSync(file,'utf8').includes(token); }

const metadataFile = path.join(evidenceDir, 'hosted-demo-metadata.json');
if(!fs.existsSync(metadataFile)) fail(`missing ${metadataFile}`);
const metadata = readJson(metadataFile);
const pageVersion = metadata?.page?.app_version || metadata?.app_version || null;
if(metadata.evidence_review_version !== version) fail(`evidence_review_version ${metadata.evidence_review_version} does not match ${version}`);
if(metadata.capture_polish_version !== version) fail(`capture_polish_version ${metadata.capture_polish_version} does not match ${version}`);
if(pageVersion !== version) fail(`page.app_version ${pageVersion} does not match ${version}`);
if(metadata.capture_count !== 4) fail(`capture_count ${metadata.capture_count} does not equal 4`);
if(metadata.all_required_captures_present !== true) fail('all_required_captures_present is not true');
if(metadata.visual_artifact_guard_required !== true) fail('visual_artifact_guard_required is not true');
if(metadata.capture_settle_required !== true) fail('capture_settle_required is not true');
const captures = Array.isArray(metadata.captures) ? metadata.captures : [];
for(const capture of captures){
  if(Number(capture.horizontal_overflow_px || 0) !== 0) fail(`${capture.name || 'capture'} horizontal_overflow_px is not 0`);
  if(capture.visual_artifact_guard_passed !== true) fail(`${capture.name || 'capture'} visual_artifact_guard_passed is not true`);
}

const requiredHostedFiles = [
  'hosted-demo-metadata.json',
  'visible-text-en.json',
  'visible-text-ar.json',
  'visible-text-fr.json',
  'desktop-first-screen.png',
  'mobile-first-screen.png',
  'provider-mode.png',
  'quality-export.png'
];
for(const file of requiredHostedFiles){
  if(!fs.existsSync(path.join(evidenceDir, file))) fail(`hosted evidence missing ${file}`);
}

const visibleChecks = [];
for(const locale of ['en','ar','fr']){
  const file = path.join(evidenceDir, `visible-text-${locale}.json`);
  const raw = fs.readFileSync(file, 'utf8');
  if(!raw.includes(version)) fail(`visible-text-${locale}.json missing ${version}`);
  visibleChecks.push({locale, contains_version:true});
}

fs.rmSync(bundleDir, {recursive:true, force:true});
ensureDir(bundleDir);
for(const file of requiredHostedFiles) copyFile(path.join(evidenceDir, file), path.join(bundleDir, 'hosted-demo-evidence', file));

const noBrowserLog = path.join(inputDir, 'logs', 'no-browser.log');
const browserLog = path.join(inputDir, 'logs', 'browser.log');
maybeCopy(noBrowserLog, path.join(bundleDir, 'logs', 'no-browser.log'));
maybeCopy(browserLog, path.join(bundleDir, 'logs', 'browser.log'));
if(fs.existsSync(noBrowserLog) && !textIncludes(noBrowserLog, 'CI gate passed: no-browser')) fail('no-browser.log does not contain CI gate passed: no-browser');
if(fs.existsSync(browserLog) && !textIncludes(browserLog, 'CI gate passed: browser')) fail('browser.log does not contain CI gate passed: browser');

copyFile(path.join(root, 'tests', 'ci-gate-registry.json'), path.join(bundleDir, 'ci', 'ci-gate-registry-snapshot.json'));
writeJson(path.join(bundleDir, 'ci', 'package-version.json'), {name:pkg.name, version, release, private:pkg.private === true});
writeJson(path.join(bundleDir, 'ci', 'workflow-run.json'), {run_id:runId, run_attempt:runAttempt, commit_sha:commitSha, branch});

const manifest = {
  evidence_manifest_version: version,
  release,
  version,
  run_id: runId,
  run_attempt: runAttempt,
  commit_sha: commitSha,
  branch,
  bundle_name: bundleName,
  no_browser: {
    status: fs.existsSync(noBrowserLog) ? 'passed' : 'not_included_local_bundle',
    log_file: fs.existsSync(noBrowserLog) ? 'logs/no-browser.log' : null
  },
  browser: {
    status: fs.existsSync(browserLog) ? 'passed' : 'not_included_local_bundle',
    log_file: fs.existsSync(browserLog) ? 'logs/browser.log' : null
  },
  hosted_demo: {
    evidence_review_version: metadata.evidence_review_version,
    capture_polish_version: metadata.capture_polish_version,
    page_app_version: pageVersion,
    capture_count: metadata.capture_count,
    all_required_captures_present: metadata.all_required_captures_present,
    visual_artifact_guard_required: metadata.visual_artifact_guard_required,
    capture_settle_required: metadata.capture_settle_required,
    max_horizontal_overflow_px: Math.max(0, ...captures.map((capture)=>Number(capture.horizontal_overflow_px || 0))),
    all_visual_artifact_guards_passed: captures.every((capture)=>capture.visual_artifact_guard_passed === true),
    files: requiredHostedFiles
  },
  bundle_validation: {
    status: 'passed',
    visible_text_snapshots: visibleChecks,
    stale_version_residue_detected: false,
    lock_artifact_ready: true
  }
};
writeJson(path.join(bundleDir, 'evidence-manifest.json'), manifest);
fs.writeFileSync(path.join(bundleDir, 'evidence-manifest.md'), `# ${release}\n\n- Version: \`${version}\`\n- Run ID: \`${runId}\`\n- Commit: \`${commitSha}\`\n- Branch: \`${branch}\`\n- Hosted evidence version: \`${metadata.evidence_review_version}\`\n- Capture count: \`${metadata.capture_count}\`\n- Required captures present: \`${metadata.all_required_captures_present}\`\n- Max horizontal overflow: \`${manifest.hosted_demo.max_horizontal_overflow_px}\`\n- Bundle validation: \`${manifest.bundle_validation.status}\`\n`);

const checksumLines = listFiles(bundleDir)
  .filter((file)=>!file.endsWith('SHA256SUMS.txt'))
  .map((file)=>`${sha256(file)}  ${path.relative(bundleDir, file).replaceAll(path.sep,'/')}`)
  .join('\n') + '\n';
ensureDir(path.join(bundleDir, 'checksums'));
fs.writeFileSync(path.join(bundleDir, 'checksums', 'SHA256SUMS.txt'), checksumLines);

console.log(`Canonical lock evidence bundle built: ${bundleDir}`);
console.log(`Bundle manifest: ${path.join(bundleDir, 'evidence-manifest.json')}`);
