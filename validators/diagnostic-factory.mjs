/**
 * Contract v2.1 DiagnosticReport Factory
 *
 * Normative source: core/contracts/contract-v2.1.d.ts
 * DiagnosticReport fields are exactly:
 * code, message, source, impact, recovery.
 */

export const DIAGNOSTIC_IMPACTS = Object.freeze([
  'CRITICAL',
  'HIGH',
  'MEDIUM',
  'LOW'
]);

export function createDiagnostic({ code, message, source, impact, recovery }) {
  if (typeof code !== 'string' || code.length === 0) {
    throw new TypeError('Diagnostic code must be a non-empty string');
  }
  if (typeof message !== 'string' || message.length === 0) {
    throw new TypeError('Diagnostic message must be a non-empty string');
  }
  if (typeof source !== 'string' || source.length === 0) {
    throw new TypeError('Diagnostic source must be a non-empty string');
  }
  if (!DIAGNOSTIC_IMPACTS.includes(impact)) {
    throw new TypeError(
      `Invalid diagnostic impact '${impact}'. Must be one of: ${DIAGNOSTIC_IMPACTS.join(', ')}`
    );
  }
  if (typeof recovery !== 'string' || recovery.length === 0) {
    throw new TypeError('Diagnostic recovery must be a non-empty string');
  }

  return Object.freeze({
    code,
    message,
    source,
    impact,
    recovery
  });
}
