import fs from 'node:fs';

const file = 'tests/test-organization-audit-check.mjs';
if (!fs.existsSync(file)) {
  console.error(`Missing ${file}. Run this from the repository root.`);
  process.exit(1);
}

let source = fs.readFileSync(file, 'utf8');

if (!source.includes('function normalizeRegistryPath')) {
  source = source.replace(
    "const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));\n",
    "const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));\n\nfunction normalizeRegistryPath(value){\n  return String(value || '').replace(/\\\\/g, '/');\n}\n"
  );
}

source = source
  .replace(
    "const syntaxMatrixFiles = new Set(registry.syntax_matrix?.files || []);",
    "const syntaxMatrixFiles = new Set((registry.syntax_matrix?.files || []).map(normalizeRegistryPath));"
  )
  .replace(
    "      allChecks.add(file);",
    "      allChecks.add(normalizeRegistryPath(file));"
  )
  .replace(
    "  assert.ok(allChecks.has(requiredCheck), `required alpha.10 check is not registered in CI gate registry: ${requiredCheck}`);",
    "  assert.ok(allChecks.has(normalizeRegistryPath(requiredCheck)), `required alpha.10 check is not registered in CI gate registry: ${requiredCheck}`);"
  )
  .replace(
    "const testFiles = fs.readdirSync('tests').filter((name) => /\\.(mjs|js)$/.test(name)).map((name) => path.join('tests', name));",
    "const testFiles = fs.readdirSync('tests').filter((name) => /\\.(mjs|js)$/.test(name)).map((name) => normalizeRegistryPath(path.join('tests', name)));"
  );

// Avoid duplicate transformations if the script is run more than once.
source = source
  .replace(/\.map\(normalizeRegistryPath\)\.map\(normalizeRegistryPath\)/g, '.map(normalizeRegistryPath)')
  .replace(/normalizeRegistryPath\(normalizeRegistryPath\(([^)]+)\)\)/g, 'normalizeRegistryPath($1)');

fs.writeFileSync(file, source);
console.log('alpha.14 Windows path fix applied: test organization audit now normalizes registry/test paths.');
