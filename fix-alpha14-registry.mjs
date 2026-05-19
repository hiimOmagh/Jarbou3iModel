import fs from 'node:fs';

const registryPath = 'tests/ci-gate-registry.json';
const qaSuitePath = 'tests/no-browser-qa-suite.mjs';
const evidenceCheck = 'tests/evidence-workspace-check.mjs';
const evidenceModule = 'src/research/evidence-workspace.js';

function assertFile(path) {
  if (!fs.existsSync(path)) {
    console.error(`Missing required file: ${path}`);
    process.exit(1);
  }
}

function addUnique(array, value, afterValue = null) {
  if (!Array.isArray(array)) return [value];
  if (array.includes(value)) return array;
  const next = array.slice();
  const afterIndex = afterValue ? next.indexOf(afterValue) : -1;
  if (afterIndex >= 0) next.splice(afterIndex + 1, 0, value);
  else next.push(value);
  return next;
}

assertFile(registryPath);
assertFile(qaSuitePath);
assertFile(evidenceCheck);
assertFile(evidenceModule);

const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

for (const gateName of ['no-browser', 'current-no-browser', 'source', 'release']) {
  if (!registry.gates?.[gateName]) {
    console.error(`Missing registry gate: ${gateName}`);
    process.exit(1);
  }
  registry.gates[gateName].node_checks = addUnique(
    registry.gates[gateName].node_checks || [],
    evidenceCheck,
    'tests/prompt-compiler-check.mjs'
  );
}

registry.syntax_matrix = registry.syntax_matrix || { files: [] };
registry.syntax_matrix.files = addUnique(
  registry.syntax_matrix.files || [],
  evidenceModule,
  'src/research/evidence-scorer.js'
);
registry.syntax_matrix.files = addUnique(
  registry.syntax_matrix.files || [],
  evidenceCheck,
  'tests/evidence-scoring-check.mjs'
);

fs.writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`);

let qaSuite = fs.readFileSync(qaSuitePath, 'utf8');
if (!qaSuite.includes(`'${evidenceCheck}'`) && !qaSuite.includes(`"${evidenceCheck}"`)) {
  const anchor = "  'tests/evidence-scoring-check.mjs',";
  if (!qaSuite.includes(anchor)) {
    console.error(`Could not find insertion anchor in ${qaSuitePath}: ${anchor}`);
    process.exit(1);
  }
  qaSuite = qaSuite.replace(anchor, `${anchor}\n  '${evidenceCheck}',`);
  fs.writeFileSync(qaSuitePath, qaSuite);
}

console.log('alpha.14 registry fix applied: evidence workspace check registered in CI registry, syntax matrix, and no-browser QA suite.');
