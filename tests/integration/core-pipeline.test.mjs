import test from 'node:test';
import assert from 'node:assert/strict';

import { createStateEngine } from '../../core/model/state-engine.mjs';
import { buildCompileResult, assertCompileResult } from '../../core/model/compile-result.mjs';
import { SerializerRegistry } from '../../core/registry/serializer-registry.mjs';
import { validateCompileResult } from '../../validators/contract-validator.mjs';
import { serializeJsonRaw } from '../../generators/json-raw/json-raw-serializer.mjs';

test('core pipeline integrates state, contract, registry, validation, and serialization', () => {
  const registry = new SerializerRegistry();
  const registration = registry.register({
    format: 'JSON_RAW',
    serializerId: 'json-raw-v1',
    version: '1.0.0',
    isDeprecated: false
  });

  assert.equal(registration.success, true);
  assert.equal(registry.has('json-raw-v1'), true);

  const engine = createStateEngine();
  assert.equal(engine.transition('PROCESSING'), 'PROCESSING');
  assert.equal(engine.transition('SUCCESS'), 'SUCCESS');

  const result = buildCompileResult({
    status: engine.getStatus(),
    representation: { target: 'integration-test', enabled: true },
    diagnostics: [],
    targetId: 'integration-test',
    checksum: 'integration-checksum',
    timestamp: '2026-10-05T00:00:00.000Z'
  });

  assert.equal(assertCompileResult(result), true);
  assert.equal(validateCompileResult(result).valid, true);

  const artifact = serializeJsonRaw(result.representation);
  assert.equal(artifact.includes('"target": "integration-test"'), true);
});

test('unhandled execution failure is fail-closed into BLOCKED', () => {
  const engine = createStateEngine();
  engine.transition('PROCESSING');
  assert.equal(engine.fail({ unhandledError: true }), 'BLOCKED');
  assert.equal(engine.getStatus(), 'BLOCKED');
});
