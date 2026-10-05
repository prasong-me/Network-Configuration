import test from 'node:test';
import assert from 'node:assert/strict';

import {
  createDiagnostic
} from '../../validators/diagnostic-factory.mjs';
import {
  OUTPUT_FORMATS,
  validateOutputFormat,
  validateSerializerEntry,
  validateCompileResult
} from '../../validators/contract-validator.mjs';
import { validateInputSchema } from '../../validators/schema-validator.mjs';

const validMetadata = {
  contractVersion: '2.1',
  timestamp: '2026-09-28T12:00:00.000Z',
  targetId: 'test-target',
  checksum: 'caller-supplied-checksum'
};

test('Diagnostic Factory creates exactly the five DiagnosticReport fields', () => {
  const diagnostic = createDiagnostic({
    code: 'TEST_ERR',
    message: 'Test message',
    source: 'test/suite',
    impact: 'HIGH',
    recovery: 'Fix the issue'
  });

  assert.deepEqual(Object.keys(diagnostic), [
    'code',
    'message',
    'source',
    'impact',
    'recovery'
  ]);
});

test('Diagnostic Factory rejects invalid impact', () => {
  assert.throws(() => createDiagnostic({
    code: 'TEST_ERR',
    message: 'Test message',
    source: 'test/suite',
    impact: 'INVALID',
    recovery: 'Fix the issue'
  }), /Invalid diagnostic impact/);
});

test('all six Contract v2.1 output formats are accepted', () => {
  assert.equal(OUTPUT_FORMATS.length, 6);
  for (const format of OUTPUT_FORMATS) {
    assert.equal(validateOutputFormat(format).valid, true);
  }
});

test('unknown output format is rejected', () => {
  const result = validateOutputFormat('INVALID_FORMAT');
  assert.equal(result.valid, false);
  assert.equal(result.diagnostics[0].code, 'ERR_CONTRACT_INVALID_OUTPUT_FORMAT');
});

test('valid SerializerRegistryEntry is accepted', () => {
  const result = validateSerializerEntry({
    format: 'MOBILECONFIG',
    serializerId: 'mobileconfig-v1',
    version: '1.0.0',
    isDeprecated: false
  });

  assert.equal(result.valid, true);
  assert.equal(result.diagnostics.length, 0);
});

test('invalid SerializerRegistryEntry reports every invalid required field', () => {
  const result = validateSerializerEntry({
    format: 'BAD',
    serializerId: '',
    version: 7,
    isDeprecated: 'false'
  });

  assert.equal(result.valid, false);
  assert.equal(result.diagnostics.length, 4);
});

test('CompileResult rejects missing owned representation', () => {
  const result = validateCompileResult({
    status: 'SUCCESS',
    diagnostics: [],
    metadata: validMetadata
  });

  assert.equal(result.valid, false);
  assert.equal(
    result.diagnostics.some(d => d.code === 'ERR_CONTRACT_MISSING_REPRESENTATION'),
    true
  );
});

test('CompileResult rejects missing owned diagnostics', () => {
  const result = validateCompileResult({
    status: 'SUCCESS',
    representation: {},
    metadata: validMetadata
  });

  assert.equal(result.valid, false);
  assert.equal(
    result.diagnostics.some(d => d.code === 'ERR_CONTRACT_MISSING_DIAGNOSTICS'),
    true
  );
});

test('CompileResult validates representation ownership, not inherited properties', () => {
  const prototype = { representation: {} };
  const result = Object.create(prototype);
  result.status = 'SUCCESS';
  result.diagnostics = [];
  result.metadata = validMetadata;

  const validation = validateCompileResult(result);
  assert.equal(validation.valid, false);
  assert.equal(
    validation.diagnostics.some(d => d.code === 'ERR_CONTRACT_MISSING_REPRESENTATION'),
    true
  );
});

test('fully compliant CompileResult is accepted', () => {
  const result = {
    status: 'SUCCESS',
    representation: { networkName: 'test' },
    diagnostics: [],
    metadata: validMetadata
  };

  const validation = validateCompileResult(result);
  assert.equal(validation.valid, true);
  assert.equal(validation.diagnostics.length, 0);
});

test('CompileResult rejects malformed nested DiagnosticReport fields', () => {
  const result = {
    status: 'SUCCESS',
    representation: {},
    diagnostics: [{
      code: '',
      message: 'message',
      source: 'source',
      impact: 'HIGH',
      recovery: 'recover'
    }],
    metadata: validMetadata
  };

  const validation = validateCompileResult(result);
  assert.equal(validation.valid, false);
  assert.equal(
    validation.diagnostics.some(d => d.code === 'ERR_CONTRACT_INVALID_DIAGNOSTIC_REPORT'),
    true
  );
});

test('CompileResult accepts a fully compliant nested DiagnosticReport', () => {
  const result = {
    status: 'SUCCESS',
    representation: {},
    diagnostics: [{
      code: 'TEST_ERR',
      message: 'message',
      source: 'source',
      impact: 'HIGH',
      recovery: 'recover'
    }],
    metadata: validMetadata
  };

  const validation = validateCompileResult(result);
  assert.equal(validation.valid, true);
  assert.equal(validation.diagnostics.length, 0);
});

test('CompileResult rejects wrong contract version', () => {
  const result = {
    status: 'SUCCESS',
    representation: {},
    diagnostics: [],
    metadata: { ...validMetadata, contractVersion: '2.0' }
  };

  assert.equal(validateCompileResult(result).valid, false);
});

test('CompileResult does not prescribe a checksum algorithm', () => {
  const result = {
    status: 'SUCCESS',
    representation: {},
    diagnostics: [],
    metadata: { ...validMetadata, checksum: 'opaque-caller-value' }
  };

  assert.equal(validateCompileResult(result).valid, true);
});

test('invalid root input is rejected', () => {
  const result = validateInputSchema([]);
  assert.equal(result.valid, false);
  assert.equal(result.diagnostics[0].code, 'ERR_SCHEMA_INVALID_INPUT_ROOT');
});

test('input version accepts the contract-neutral string or number shape', () => {
  assert.equal(validateInputSchema({ version: '1.0.0' }).valid, true);
  assert.equal(validateInputSchema({ version: 1 }).valid, true);
});

test('invalid input version is rejected', () => {
  const result = validateInputSchema({ version: true });
  assert.equal(result.valid, false);
  assert.equal(result.diagnostics[0].code, 'ERR_SCHEMA_INVALID_VERSION');
});
