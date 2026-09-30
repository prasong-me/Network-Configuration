# Error / Blocker Report — Clash Mi Target

Date: 2026-09-30
Target: Clash Mi
Work unit: target endpoint/output implementation
Status: BLOCKED
Test/CI: NOT RUN (per current execution order)

## Result

Clash Mi is recorded as the next target-specific work unit, but no target endpoint/adapter/output code is authorized under the current repository gate.

## Blocker

`docs/architecture/PROJECT_EXTENSION_INTAKE.md` records Phase F Target Profile Contract Shape as HOLD and Phase G Target Adapters as LOCKED until the Phase F shape is approved. The intake rules prohibit adapter, generator, serializer, or artifact implementation while that gate remains HOLD.

## Evidence boundary

The system reference database records Clash Mi as an app/client identity with Mihomo-based configuration capability. This does not authorize treating Clash Mi as identical to the Mihomo target, nor does it authorize inventing a separate serialization schema or API.

## Root cause

The target-specific output boundary and approved Target Profile shape are not currently authorized. Client identity must remain separate from Mihomo core semantics until reconciliation and authorization are complete.

## Side effects prevented

- No invented Clash Mi format.
- No invented API or deep-link contract.
- No automatic substitution of Mihomo as the Clash Mi target.
- No Contract v2.1 changes.
- No reopening of closed DNS + Apple MobileConfig work.
- No runtime claim.

## Resolution

Per the one-target block-and-skip protocol, implementation is skipped and the blocker is recorded. Continue to the next target without forcing this gate.

## Round record

Clash Mi: BLOCKED / RECORDED.
No code implementation performed. No test/CI executed.
