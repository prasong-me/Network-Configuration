import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

const output = execFileSync(process.execPath, ['tools/runtime/linux-runtime-probe.mjs'], {
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'pipe'],
});

const report = JSON.parse(output);
assert.equal(report.metadata.contractVersion, '2.1');
assert.equal(report.metadata.targetId, 'linux-runtime');
assert.equal(typeof report.metadata.checksum, 'string');
assert.ok(Object.hasOwn(report, 'representation'));
assert.ok(Array.isArray(report.representation.backends));
assert.ok(Array.isArray(report.diagnostics));
console.log('linux-runtime-probe contract test: PASS');
