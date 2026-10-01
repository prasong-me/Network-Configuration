# MISS-011 — Linux Multi-Backend Runtime Evidence

## Status

**CLOSED — VERIFIED**

## Scope

Linux runtime integration for:

- iproute2
- NetworkManager
- systemd-resolved
- nftables
- WireGuard
- OpenVPN
- `/dev/net/tun`
- interface / route / routing-policy / DNS inspection

## Implementation

- `tools/runtime/linux-runtime-probe.mjs`
- `tests/runtime/linux-runtime-probe.test.mjs`
- `.github/workflows/linux-runtime-tests.yml`

The probe emits Contract v2.1-compatible `representation`, diagnostics, metadata and a SHA-256 checksum. It is fail-closed when required runtime capabilities are unavailable.

## Verification

GitHub Actions:

- Workflow: **Linux Runtime Tests**
- Run: **#1**
- Run ID: **36880334118**
- Commit: **ba6d038ed342e97aad2d43a11ac8e9d928107ddc**
- Job: **110430180369**
- Result: **success**
- Runtime probe step: **success**
- Runtime assertion: **success**
- Evidence artifact: **linux-runtime-evidence**
- Artifact ID: **11170667493**
- Artifact SHA-256: **155eb7b5bd83aa99b8787150c359b45da5765372b23ea5aede6cfb1a2bb9c2da**

## Closure Decision

The previous state was:

`MISS-011 → CODE IMPLEMENTED + TEST VERIFIED / RUNTIME BLOCKED`

The blocking runtime environment has now been provisioned in the GitHub Linux runner and the complete runtime gate has executed successfully.

Therefore:

`MISS-011 → CLOSED / VERIFIED`

No simulated runtime result was used.
