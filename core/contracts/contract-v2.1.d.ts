/**
 * Network-Configuration Contract v2.1 Baseline Specification
 * Version: 2.1.0
 * Status: NORMATIVE / AUTHORITATIVE BASELINE
 *
 * Imported from the authoritative baseline supplied for
 * Contract v2.1 reconciliation and freeze.
 */

export interface ContractVersion {
  major: 2;
  minor: 1;
  patch: number;
  tag?: string;
}

export type ProcessingStatus = 'IDLE' | 'PROCESSING' | 'SUCCESS' | 'FAILED' | 'BLOCKED';

export interface DiagnosticReport {
  code: string;
  message: string;
  source: string;
  impact: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  recovery: string;
}

export interface CompileResult {
  status: ProcessingStatus;
  /**
   * Hard Invariant:
   * Object.hasOwn(compileResult, "representation") MUST evaluate to true on all valid outputs.
   */
  representation: Record<string, unknown>;
  diagnostics: DiagnosticReport[];
  metadata: {
    contractVersion: '2.1';
    timestamp: string;
    targetId: string;
    checksum: string;
  };
}

export const OUTPUT_FORMATS = [
  'MOBILECONFIG',
  'WIREGUARD_CONF',
  'CLASH_YAML',
  'SING_BOX_JSON',
  'DNS_ZONE',
  'JSON_RAW'
] as const;

export type OutputFormat = typeof OUTPUT_FORMATS[number];

export interface SerializerRegistryEntry {
  format: OutputFormat;
  serializerId: string;
  version: string;
  isDeprecated: boolean;
}

/**
 * Core Contract Invariants:
 * 1. State Transition: Processing state 'FAILED' MUST transition to 'BLOCKED' if errors are unhandled.
 * 2. Structure Integrity: 'representation' field existence must be verified via Object.hasOwn().
 * 3. Scope Isolation: Apple Adapter, DNS Runtime, and PR #15 are strictly isolated and locked.
 */
