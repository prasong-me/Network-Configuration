# Contract v2.1 Field-by-Field Reconciliation

Status: **FROZEN / AUTHORITATIVE BASELINE**

Source: authoritative Contract v2.1 baseline supplied for this reconciliation.

## Reconciliation Result

The supplied TypeScript declaration is accepted as the normative Contract v2.1 export-boundary baseline and imported to:

`core/contracts/contract-v2.1.d.ts`

No additional fields, enum values, output formats, or invariants have been inferred from architecture documents.

## Field Matrix

| Contract element | Result | Evidence |
|---|---|---|
| `ContractVersion.major` | PASS | Explicit literal `2` |
| `ContractVersion.minor` | PASS | Explicit literal `1` |
| `ContractVersion.patch` | PASS | Explicit numeric field |
| `ContractVersion.tag` | PASS | Explicit optional string |
| `ProcessingStatus` | PASS | Five explicit states |
| `DiagnosticReport.code` | PASS | Explicit string field |
| `DiagnosticReport.message` | PASS | Explicit string field |
| `DiagnosticReport.source` | PASS | Explicit string field |
| `DiagnosticReport.impact` | PASS | Four explicit severity values |
| `DiagnosticReport.recovery` | PASS | Explicit string field |
| `CompileResult.status` | PASS | References `ProcessingStatus` |
| `CompileResult.representation` | PASS | Required record field + hard invariant |
| `CompileResult.diagnostics` | PASS | Required diagnostic array |
| `CompileResult.metadata` | PASS | Required metadata object |
| `metadata.contractVersion` | PASS | Literal `'2.1'` |
| `metadata.timestamp` | PASS | Explicit string field |
| `metadata.targetId` | PASS | Explicit string field |
| `metadata.checksum` | PASS | Explicit string field |
| `OUTPUT_FORMATS` | PASS | Six explicit formats |
| `OutputFormat` | PASS | Derived union from registry constant |
| `SerializerRegistryEntry.format` | PASS | References `OutputFormat` |
| `SerializerRegistryEntry.serializerId` | PASS | Explicit string field |
| `SerializerRegistryEntry.version` | PASS | Explicit string field |
| `SerializerRegistryEntry.isDeprecated` | PASS | Explicit boolean field |

## Explicit Invariants

1. An unhandled `FAILED` processing state MUST transition to `BLOCKED`.
2. Valid `CompileResult` output MUST own a `representation` property; verification is explicitly required via `Object.hasOwn()`.
3. Apple Adapter, DNS Runtime, and PR #15 are isolated and locked.

## Non-Inference Rule

The following are intentionally **not** added to the contract because they are not present in the supplied authoritative declaration:

- Common Model fields
- Target Profile fields
- Conflict object schema
- provenance object schema
- additional diagnostic fields
- compatibility matrix fields
- serializer implementation behavior
- target-specific capability fields
- undocumented default values

## Test-Matrix Reconciliation

The supplied baseline explicitly defines 3 core invariants. A separate 26-item Test Matrix was referenced in the handoff, but its 26 test definitions were not included in the authoritative source supplied in this turn.

Therefore:

- Contract freeze: **PASS**
- Field reconciliation: **PASS**
- Invariant extraction: **PASS (3/3 explicit invariants)**
- 26-item Test Matrix execution: **PENDING TEST-MATRIX SOURCE**

The missing 26-item matrix is not invented or reconstructed from the contract.

## Freeze Boundary

This file records the reconciliation decision. The frozen contract source is:

`core/contracts/contract-v2.1.d.ts`

The contract is now the source of truth for subsequent Core Model and schema-validation implementation, subject to the protected-boundary invariants above.
