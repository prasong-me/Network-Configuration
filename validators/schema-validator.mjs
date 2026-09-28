/**
 * General input schema validation.
 *
 * This is deliberately a narrow pre-normalization structural gate.
 * It does not invent a domain schema that Contract v2.1 does not define.
 */

import { createDiagnostic } from './diagnostic-factory.mjs';

const SOURCE = 'validators/schema-validator';

export function validateInputSchema(input) {
  const diagnostics = [];

  if (input === null || typeof input !== 'object' || Array.isArray(input)) {
    return {
      valid: false,
      diagnostics: [createDiagnostic({
        code: 'ERR_SCHEMA_INVALID_INPUT_ROOT',
        message: 'Input configuration payload must be a non-null object.',
        source: SOURCE,
        impact: 'CRITICAL',
        recovery: 'Provide a valid object at the root of the input configuration.'
      })]
    };
  }

  if (Object.hasOwn(input, 'version') &&
      typeof input.version !== 'string' &&
      typeof input.version !== 'number') {
    diagnostics.push(createDiagnostic({
      code: 'ERR_SCHEMA_INVALID_VERSION',
      message: 'Input configuration version field must be a string or number.',
      source: SOURCE,
      impact: 'MEDIUM',
      recovery: 'Provide version as a string or number.'
    }));
  }

  return { valid: diagnostics.length === 0, diagnostics };
}
