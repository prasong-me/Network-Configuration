/**
 * Contract v2.1 Validation Layer
 *
 * Normative source: core/contracts/contract-v2.1.d.ts
 * This layer validates contract structures only. It does not mutate input.
 */

import { createDiagnostic } from './diagnostic-factory.mjs';

export const OUTPUT_FORMATS = Object.freeze([
  'MOBILECONFIG',
  'WIREGUARD_CONF',
  'CLASH_YAML',
  'SING_BOX_JSON',
  'DNS_ZONE',
  'JSON_RAW'
]);

export const VALID_STATUSES = Object.freeze([
  'IDLE',
  'PROCESSING',
  'SUCCESS',
  'FAILED',
  'BLOCKED'
]);

const SOURCE = 'validators/contract-validator';

function invalid(code, message, impact, recovery) {
  return createDiagnostic({ code, message, source: SOURCE, impact, recovery });
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function requireString(value, code, field, impact = 'HIGH') {
  if (typeof value !== 'string' || value.length === 0) {
    return invalid(
      code,
      `Field "${field}" must be a non-empty string.`,
      impact,
      `Provide a non-empty string for "${field}".`
    );
  }
  return null;
}

export function validateOutputFormat(format) {
  const diagnostics = [];

  if (!OUTPUT_FORMATS.includes(format)) {
    diagnostics.push(invalid(
      'ERR_CONTRACT_INVALID_OUTPUT_FORMAT',
      `Format '${format}' is not a recognized Contract v2.1 OutputFormat.`,
      'CRITICAL',
      `Specify one of the valid output formats: ${OUTPUT_FORMATS.join(', ')}`
    ));
  }

  return { valid: diagnostics.length === 0, diagnostics };
}

export function validateSerializerEntry(entry) {
  const diagnostics = [];

  if (!isObject(entry)) {
    return {
      valid: false,
      diagnostics: [invalid(
        'ERR_CONTRACT_NULL_SERIALIZER_ENTRY',
        'SerializerRegistryEntry must be a non-null object.',
        'CRITICAL',
        'Provide an object containing format, serializerId, version, and isDeprecated.'
      )]
    };
  }

  diagnostics.push(...validateOutputFormat(entry.format).diagnostics);

  for (const [field, code] of [
    ['serializerId', 'ERR_CONTRACT_INVALID_SERIALIZER_ID'],
    ['version', 'ERR_CONTRACT_INVALID_SERIALIZER_VERSION']
  ]) {
    const diagnostic = requireString(entry[field], code, field);
    if (diagnostic) diagnostics.push(diagnostic);
  }

  if (typeof entry.isDeprecated !== 'boolean') {
    diagnostics.push(invalid(
      'ERR_CONTRACT_INVALID_DEPRECATION_FLAG',
      'Field "isDeprecated" must be a boolean value.',
      'MEDIUM',
      'Set isDeprecated explicitly to true or false.'
    ));
  }

  return { valid: diagnostics.length === 0, diagnostics };
}

export function validateCompileResult(result) {
  const diagnostics = [];

  if (!isObject(result)) {
    return {
      valid: false,
      diagnostics: [invalid(
        'ERR_CONTRACT_NULL_RESULT',
        'CompileResult must be a non-null object.',
        'CRITICAL',
        'Ensure Core returns a valid CompileResult structure.'
      )]
    };
  }

  for (const field of ['status', 'representation', 'diagnostics', 'metadata']) {
    if (!Object.hasOwn(result, field)) {
      diagnostics.push(invalid(
        `ERR_CONTRACT_MISSING_${field.toUpperCase()}`,
        `CompileResult is missing required owned property "${field}".`,
        'CRITICAL',
        `Ensure "${field}" is defined as an own property of CompileResult.`
      ));
    }
  }

  if (Object.hasOwn(result, 'status') && !VALID_STATUSES.includes(result.status)) {
    diagnostics.push(invalid(
      'ERR_CONTRACT_INVALID_STATUS',
      `Status '${result.status}' is not a valid ProcessingStatus.`,
      'CRITICAL',
      `Set status to one of: ${VALID_STATUSES.join(', ')}`
    ));
  }

  if (Object.hasOwn(result, 'representation')) {
    if (!isObject(result.representation)) {
      diagnostics.push(invalid(
        'ERR_CONTRACT_INVALID_REPRESENTATION_TYPE',
        'Property "representation" must be a non-null object (Record<string, unknown>).',
        'CRITICAL',
        'Set representation to an object payload.'
      ));
    }
  }

  if (Object.hasOwn(result, 'diagnostics') && !Array.isArray(result.diagnostics)) {
    diagnostics.push(invalid(
      'ERR_CONTRACT_INVALID_DIAGNOSTICS',
      'Property "diagnostics" must be an array of DiagnosticReport objects.',
      'CRITICAL',
      'Provide diagnostics as an array.'
    ));
  }

  if (Object.hasOwn(result, 'metadata')) {
    if (!isObject(result.metadata)) {
      diagnostics.push(invalid(
        'ERR_CONTRACT_INVALID_METADATA',
        'CompileResult metadata must be a non-null object.',
        'CRITICAL',
        'Provide metadata containing contractVersion, timestamp, targetId, and checksum.'
      ));
    } else {
      if (result.metadata.contractVersion !== '2.1') {
        diagnostics.push(invalid(
          'ERR_CONTRACT_VERSION_MISMATCH',
          `Expected contractVersion '2.1', received '${result.metadata.contractVersion}'.`,
          'CRITICAL',
          'Ensure metadata.contractVersion is exactly "2.1".'
        ));
      }

      for (const [field, code] of [
        ['timestamp', 'ERR_CONTRACT_INVALID_TIMESTAMP'],
        ['targetId', 'ERR_CONTRACT_INVALID_TARGET_ID'],
        ['checksum', 'ERR_CONTRACT_INVALID_CHECKSUM']
      ]) {
        const diagnostic = requireString(result.metadata[field], code, field);
        if (diagnostic) diagnostics.push(diagnostic);
      }
    }
  }

  return { valid: diagnostics.length === 0, diagnostics };
}
