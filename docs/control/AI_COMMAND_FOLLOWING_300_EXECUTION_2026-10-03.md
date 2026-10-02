# AI Command-Following — 300-Round Automated Execution Registry

Date: 2026-10-03
Scope: Command Following only
Authorization: APPROVED by user for 300 automated rounds
Target: Duck.ai public chat via Browser Use
Criterion: PASS only when every explicit command requirement is obeyed; otherwise FAIL
Difficulty: strictly increasing by the approved six-stage schedule

## Execution State

- Planned rounds: 300
- Completed rounds: 0 confirmed in this registry at creation time
- Active browser run: `69caf88c-5c8c-4e57-a181-401c7c494c9e`
- Browser execution state at last verification: non-terminal / `unknown`
- Therefore: 300-round completion is NOT claimed.

## Difficulty Schedule

1. Rounds 1-50: single explicit output constraints
2. Rounds 51-100: multiple simultaneous constraints
3. Rounds 101-150: ordered multi-step constraints
4. Rounds 151-200: prohibitions plus stop conditions
5. Rounds 201-250: nested constraints preserving prior constraints
6. Rounds 251-300: complex combined format/count/order/prohibition/continuation constraints

## Required Per-Round Record

Each completed round must preserve:
- round
- command
- observed response
- expected response/constraints
- PASS/FAIL
- exact deviation when FAIL
- runtime/access limitation when applicable
- evidence/source
- verification status

## Evidence Boundary

RUNNING or tool success is not a command-following PASS.
The final 300-round result may only be recorded after the external execution reaches a terminal state and the returned per-round evidence is read back.

## Current Evidence

| ID | Node | Claim | Source | Source Type | Verification Date | Result | Status |
|---|---|---|---|---|---|---|---|
| AICF-300-001 | AI-CF-300 | User approved an automated 300-round command-following test | Current project instruction | User authorization | 2026-10-03 | 300 rounds authorized | VERIFIED-AUTHORIZATION |
| AICF-300-002 | AI-CF-300 | Automated external execution was started | Browser Use run 69caf88c-5c8c-4e57-a181-401c7c494c9e | External runtime execution | 2026-10-03 | Non-terminal at last check | OPEN-RUNTIME |

## Closure Rule

Do not mark the 300-round test COMPLETE/CLOSED until:
Verify → Record all completed rounds → Calculate PASS/FAIL → Read-back → Update State → Verify Repository.
