import fs from 'node:fs';

const RELEASE_HISTORY_PATH = 'docs/release-history.md';

export function readText(file) {
  return fs.readFileSync(file, 'utf8');
}

export function releaseHistory() {
  return readText(RELEASE_HISTORY_PATH);
}

export function releaseDocExists(file) {
  if (fs.existsSync(file)) return true;
  if (!file.startsWith('docs/')) return false;
  const name = file.slice('docs/'.length);
  if (!fs.existsSync(RELEASE_HISTORY_PATH)) return false;
  return releaseHistory().includes(`<!-- release-file:${name} -->`);
}

export function readReleaseDoc(file) {
  if (fs.existsSync(file)) return readText(file);
  if (!file.startsWith('docs/')) {
    throw new Error(`Not a docs path: ${file}`);
  }
  const name = file.slice('docs/'.length);
  const history = releaseHistory();
  const start = `<!-- release-file:${name} -->`;
  const end = `<!-- /release-file:${name} -->`;
  const startIndex = history.indexOf(start);
  if (startIndex === -1) {
    throw new Error(`Release document not found in ${RELEASE_HISTORY_PATH}: ${file}`);
  }
  const contentStart = startIndex + start.length;
  const endIndex = history.indexOf(end, contentStart);
  if (endIndex === -1) {
    throw new Error(`Release document section is unterminated in ${RELEASE_HISTORY_PATH}: ${file}`);
  }
  return history.slice(contentStart, endIndex).trimStart();
}

export function readProjectDoc(file) {
  if (file.startsWith('docs/v') || file === 'docs/repo-cleanup-audit-v1.0.6.md') {
    return readReleaseDoc(file);
  }
  return readText(file);
}
