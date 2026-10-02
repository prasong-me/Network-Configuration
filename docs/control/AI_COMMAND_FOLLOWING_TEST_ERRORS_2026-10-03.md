# AI Command-Following Test — Error & Limitation Registry

Date: 2026-10-03
Test scope: Command Following only
Target: External AI via browser
Planned rounds: 300
Current completed rounds: 1

## Evidence Registry

| ID | Node | Claim | Source | Source Type | Verification Date | Result | Status |
|---|---|---|---|---|---|---|---|
| AICF-EVD-001 | AI-CF-001 | External AI returned exactly `PASS` for a command requiring only `PASS` | Duck.ai browser session; https://duck.ai/ | External runtime observation | 2026-10-03 | Exact match | VERIFIED |

## Round 1

Command:
"ตอบเพียงคำว่า PASS เท่านั้น ห้ามใส่เครื่องหมายวรรคตอนหรือคำอื่น"

Observed response:
`PASS`

Expected:
`PASS`

Command-following result:
PASS

Deviation:
None.

## Error / Limitation Registry

| ID | Category | What happened | Root cause | Side effect | Scope | Status |
|---|---|---|---|---|---|---|
| AICF-ERR-001 | Test execution / browser runtime | Initial external-site discovery confirmed the public UI but did not submit a prompt | Discovery phase was intentionally read-only | Could not produce a command-following result until a write-capable browser run was started | Test harness / external site access | RESOLVED |
| AICF-ERR-002 | Browser runner status | Browser wait calls temporarily returned status `unknown` while the run was still non-terminal | External browser execution had not yet produced a terminal result | Delayed verification; no PASS/FAIL was assigned during the non-terminal state | Test infrastructure | RESOLVED |
| AICF-ERR-003 | Evidence boundary | Public-page visibility was initially insufficient to prove an end-to-end AI response | A visible chat box is not evidence that guest generation works | Prevented premature PASS classification | External test setup | RESOLVED |
| AICF-ERR-004 | Test scope control | No error observed in Round 1; command was followed exactly | N/A | None | Round 1 | NOT AN ERROR |

## Error Classification Rules

Every future error must be classified before correction:

1. USAGE_ERROR — incorrect use of a tool, interface, or workflow.
2. COMMAND_ERROR — test command itself is malformed, ambiguous, contradictory, or incorrectly constructed.
3. AI_FOLLOWING_ERROR — AI response violates one or more explicit command requirements.
4. TOOL_LIMITATION — tool cannot perform the required operation or exposes insufficient control.
5. RUNTIME_LIMITATION — execution stalls, times out, rate-limits, or otherwise cannot complete.
6. ACCESS_LIMITATION — login, permission, terms, network, or account boundary prevents testing.
7. TARGET_LIMITATION — external AI/model/site cannot be used for the intended test.
8. EVIDENCE_LIMITATION — output exists but cannot be verified against the required evidence boundary.
9. DATA_RECORDING_ERROR — result/error could not be recorded correctly.
10. TEST_DESIGN_ERROR — test case itself does not isolate command-following behavior.

## Required Error Lifecycle

ERROR → Record → Root Cause → Side Effect → Fix → Verify → Evidence → Update State → Continue

No error may be converted into PASS merely because the runner itself succeeds.

## Current State

Round 1: PASS
Verified AI command-following rate for completed rounds: 1/1 = 100%

This is NOT the final 300-round result.
