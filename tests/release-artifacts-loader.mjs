import fs from 'node:fs';

const ROOT_RELEASE_ARTIFACT_MAP = new Map([
  ['BROWSER_EVIDENCE.md', 'docs/release-and-evidence.md'],
  ['HOSTED_DEMO_VERIFICATION.md', 'docs/release-and-evidence.md'],
  ['RELEASE_MANIFEST.md', 'docs/current-release.md'],
  ['RELEASE_NOTES.md', 'docs/current-release.md'],
  ['MANIFEST.md', 'docs/release-and-evidence.md'],
  ['CHANGED_FILES_MANIFEST.json', 'MANIFEST.json'],
  ['DELETE_FILES_MANIFEST.json', 'MANIFEST.json']
]);

export function releaseArtifactReplacement(file) {
  return ROOT_RELEASE_ARTIFACT_MAP.get(file) || null;
}

export function releaseArtifactExists(file) {
  if (fs.existsSync(file)) return true;
  const replacement = releaseArtifactReplacement(file);
  return Boolean(replacement && fs.existsSync(replacement));
}

export function readReleaseArtifact(file) {
  if (fs.existsSync(file)) return fs.readFileSync(file, 'utf8');
  const replacement = releaseArtifactReplacement(file);
  if (replacement && fs.existsSync(replacement)) {
    return fs.readFileSync(replacement, 'utf8');
  }
  return fs.readFileSync(file, 'utf8');
}

export function assertRootReleaseArtifactsConsolidated() {
  for (const legacy of ROOT_RELEASE_ARTIFACT_MAP.keys()) {
    if (legacy === 'CHANGED_FILES_MANIFEST.json' || legacy === 'DELETE_FILES_MANIFEST.json') continue;
    if (fs.existsSync(legacy)) {
      throw new Error(`legacy root release artifact should be consolidated: ${legacy}`);
    }
  }
}
