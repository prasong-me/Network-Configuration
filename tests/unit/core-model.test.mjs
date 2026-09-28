import test from 'node:test';
import assert from 'node:assert/strict';

import { createStateEngine, PROCESSING_STATUS } from '../../core/model/state-engine.mjs';
import {
  buildCompileResult,
  assertCompileResult
} from '../../core/model/compile-result.mjs';

const base = {
  targetId: 'test-target',
  checksum: 'checksum-test',
  timestamp: '2026-09-28T00:00:00.000Z'
};

test('IDLE -> PROCESSING is allowed', () => {
  const engine = createStateEngine();
  assert.equal(engine.transition(PROCESSING_STATUS.PROCESSING), 'PROCESSING');
});

test('PROCESSING -> SUCCESS is allowed', () => {
  const engine = createStateEngine();
  engine.transition('PROCESSING');
  assert.equal(engine.transition('SUCCESS'), 'SUCCESS');
});

test('PROCESSING -> FAILED is allowed', () => {
  const engine = createStateEngine();
  engine.transition('PROCESSING');
  assert.equal(engine.transition('FAILED'), 'FAILED');
});

test('FAILED + handled error remains FAILED', () => {
  const engine = createStateEngine();
  engine.transition('PROCESSING');
  assert.equal(engine.fail({ unhandledError: false }), 'FAILED');
});

test('FAILED + unhandled error escalates immediately to BLOCKED', () => {
  const engine = createStateEngine();
  engine.transition('PROCESSING');
  assert.equal(engine.fail({ unhandledError: true }), 'BLOCKED');
});

test('FAILED -> BLOCKED is the only terminal escalation path', () => {
  const engine = createStateEngine();
  engine.transition('PROCESSING');
  engine.transition('FAILED');
  assert.equal(engine.transition('BLOCKED'), 'BLOCKED');
});

test('invalid IDLE -> SUCCESS transition is rejected', () => {
  const engine = createStateEngine();
  assert.throws(() => engine.transition('SUCCESS'), /Invalid state transition/);
});

test('invalid PROCESSING -> BLOCKED transition is rejected', () => {
  const engine = createStateEngine();
  engine.transition('PROCESSING');
  assert.throws(() => engine.transition('BLOCKED'), /Invalid state transition/);
});

test('terminal SUCCESS cannot transition further', () => {
  const engine = createStateEngine();
  engine.transition('PROCESSING');
  engine.transition('SUCCESS');
  assert.throws(() => engine.transition('PROCESSING'), /Invalid state transition/);
});

test('terminal BLOCKED cannot transition further', () => {
  const engine = createStateEngine();
  engine.transition('PROCESSING');
  engine.fail({ unhandledError: true });
  assert.throws(() => engine.transition('FAILED'), /Invalid state transition/);
});

test('CompileResult contains all required own properties', () => {
  const result = buildCompileResult({
    status: 'SUCCESS',
    representation: {},
    diagnostics: [],
    ...base
  });

  assert.equal(Object.hasOwn(result, 'status'), true);
  assert.equal(Object.hasOwn(result, 'representation'), true);
  assert.equal(Object.hasOwn(result, 'diagnostics'), true);
  assert.equal(Object.hasOwn(result, 'metadata'), true);
  assert.equal(Object.hasOwn(result.metadata, 'contractVersion'), true);
  assert.equal(Object.hasOwn(result.metadata, 'timestamp'), true);
  assert.equal(Object.hasOwn(result.metadata, 'targetId'), true);
  assert.equal(Object.hasOwn(result.metadata, 'checksum'), true);
});

test('representation remains present even when empty', () => {
  const result = buildCompileResult({
    status: 'FAILED',
    representation: {},
    diagnostics: [{ code: 'E_TEST', message: 'failure', source: 'unit', impact: 'HIGH', recovery: 'inspect' }],
    ...base
  });

  assert.equal(Object.hasOwn(result, 'representation'), true);
  assert.deepEqual(result.representation, {});
});

test('metadata contract version is frozen at 2.1', () => {
  const result = buildCompileResult({
    status: 'SUCCESS',
    representation: { value: 1 },
    diagnostics: [],
    ...base
  });

  assert.equal(result.metadata.contractVersion, '2.1');
});

test('caller-provided timestamp is preserved', () => {
  const result = buildCompileResult({
    status: 'SUCCESS',
    representation: {},
    diagnostics: [],
    ...base,
    timestamp: '2026-09-28T12:00:00.000Z'
  });

  assert.equal(result.metadata.timestamp, '2026-09-28T12:00:00.000Z');
});

test('missing targetId is rejected', () => {
  assert.throws(() => buildCompileResult({
    status: 'SUCCESS',
    representation: {},
    diagnostics: [],
    checksum: base.checksum,
    timestamp: base.timestamp
  }), /targetId/);
});

test('missing checksum is rejected', () => {
  assert.throws(() => buildCompileResult({
    status: 'SUCCESS',
    representation: {},
    diagnostics: [],
    targetId: base.targetId,
    timestamp: base.timestamp
  }), /checksum/);
});

test('invalid contract version is rejected by the invariant validator', () => {
  const result = buildCompileResult({
    status: 'SUCCESS',
    representation: {},
    diagnostics: [],
    ...base
  });

  const invalid = {
    ...result,
    metadata: { ...result.metadata, contractVersion: '2.0' }
  };

  assert.throws(() => assertCompileResult(invalid), /contractVersion/);
});

test('missing representation is rejected by the invariant validator', () => {
  const result = buildCompileResult({
    status: 'SUCCESS',
    representation: {},
    diagnostics: [],
    ...base
  });

  const invalid = { ...result };
  delete invalid.representation;

  assert.throws(() => assertCompileResult(invalid), /representation/);
});

test('invalid diagnostics shape is rejected', () => {
  assert.throws(() => buildCompileResult({
    status: 'SUCCESS',
    representation: {},
    diagnostics: {},
    ...base
  }), /diagnostics/);
});

test('invalid status is rejected', () => {
  assert.throws(() => buildCompileResult({
    status: 'UNKNOWN',
    representation: {},
    diagnostics: [],
    ...base
  }), /Invalid processing status/);
});

test('array representation is rejected', () => {
  assert.throws(() => buildCompileResult({
    status: 'SUCCESS',
    representation: [],
    diagnostics: [],
    ...base
  }), /representation/);
});

test('validator accepts a valid CompileResult', () => {
  const result = buildCompileResult({
    status: 'BLOCKED',
    representation: { blocked: true },
    diagnostics: [],
    ...base
  });

  assert.equal(assertCompileResult(result), true);
});
