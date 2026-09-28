/**
 * Core Model CompileResult builder.
 *
 * Contract v2.1:
 * - representation is always an own property on every valid result.
 * - metadata.contractVersion is exactly "2.1".
 * - timestamp, targetId and checksum are recorded.
 *
 * Checksum calculation is intentionally NOT defined here because Contract v2.1
 * does not prescribe a checksum algorithm. The caller supplies the checksum.
 */

const CONTRACT_VERSION = '2.1';
const VALID_STATUSES = new Set([
  'IDLE',
  'PROCESSING',
  'SUCCESS',
  'FAILED',
  'BLOCKED'
]);

function assertMetadata(metadata) {
  if (!metadata || typeof metadata !== 'object') {
    throw new TypeError('metadata is required');
  }
  if (metadata.contractVersion !== CONTRACT_VERSION) {
    throw new Error('metadata.contractVersion must be "2.1"');
  }
  if (typeof metadata.timestamp !== 'string' || metadata.timestamp.length === 0) {
    throw new TypeError('metadata.timestamp must be a non-empty string');
  }
  if (typeof metadata.targetId !== 'string' || metadata.targetId.length === 0) {
    throw new TypeError('metadata.targetId must be a non-empty string');
  }
  if (typeof metadata.checksum !== 'string' || metadata.checksum.length === 0) {
    throw new TypeError('metadata.checksum must be a non-empty string');
  }
}

export function buildCompileResult({
  status,
  representation = {},
  diagnostics = [],
  targetId,
  checksum,
  timestamp = new Date().toISOString()
}) {
  if (!VALID_STATUSES.has(status)) {
    throw new TypeError(`Invalid processing status: ${status}`);
  }
  if (!representation || typeof representation !== 'object' || Array.isArray(representation)) {
    throw new TypeError('representation must be a non-array object');
  }
  if (!Array.isArray(diagnostics)) {
    throw new TypeError('diagnostics must be an array');
  }

  const metadata = Object.freeze({
    contractVersion: CONTRACT_VERSION,
    timestamp,
    targetId,
    checksum
  });

  assertMetadata(metadata);

  const result = {
    status,
    representation,
    diagnostics,
    metadata
  };

  if (!Object.hasOwn(result, 'representation')) {
    throw new Error('Invariant violation: representation must be an own property');
  }

  return Object.freeze(result);
}

export function assertCompileResult(result) {
  if (!result || typeof result !== 'object') {
    throw new TypeError('CompileResult must be an object');
  }

  const required = ['status', 'representation', 'diagnostics', 'metadata'];
  for (const key of required) {
    if (!Object.hasOwn(result, key)) {
      throw new Error(`CompileResult invariant violation: missing own property "${key}"`);
    }
  }

  if (!VALID_STATUSES.has(result.status)) {
    throw new Error(`Invalid CompileResult status: ${result.status}`);
  }

  if (!result.representation || typeof result.representation !== 'object' || Array.isArray(result.representation)) {
    throw new Error('CompileResult representation must be an object');
  }

  if (!Array.isArray(result.diagnostics)) {
    throw new Error('CompileResult diagnostics must be an array');
  }

  assertMetadata(result.metadata);
  return true;
}
