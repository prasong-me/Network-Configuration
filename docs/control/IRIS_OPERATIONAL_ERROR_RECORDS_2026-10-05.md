# IRIS Operational / Execution Error Records — 2026-10-05

Status: ACTIVE OPERATIONAL RECORD
Purpose: Record errors produced during IRIS execution, including process errors, tool-use errors, implementation errors, and verification mistakes, so each event can produce preventive learning without silently changing Governance.

## Recording Rule

Every material execution error is recorded as an individual event with:
- error_id
- work/test context
- state before
- intended action
- actual action
- error point
- error type/code
- expected
- actual
- evidence/provenance
- root cause
- impact
- containment
- correction/recovery
- verification
- prevention rule
- retry condition
- state after
- resolution/status

An error record is evidence/history. It does not become an active rule until the prevention candidate passes scope, semantic, dependency, conflict, authority, evidence, and regression checks.

---

## OPE-20261005-001 — Sequential Patch-Then-Rerun Process Error

- Work/Test: Android/Web runtime closure
- State before: RUNNING / investigation
- Intended action: Audit the affected source and writing rules broadly, verify references/dependencies, then apply a coherent correction set.
- Actual action: IRIS initially patched individual suspected JSX/string points sequentially and reran after each local correction.
- Error point: Work strategy selected before completing the required broad source/reference audit.
- Error type/code: PROCESS_STRATEGY / PREMATURE_LOCAL_FIX
- Expected: Broad audit -> reference verification -> dependency/build analysis -> batch correction -> full verification.
- Actual: Local patch -> rerun -> discover next issue -> patch again.
- Evidence: User explicitly identified the strategy error; subsequent audit found multiple related JSX/string/regex representation points and external syntax references.
- Root cause: Failure to apply the established Continuous/Multi-Track execution strategy before modifying the source.
- Impact: Extra iterations, avoidable tool/CI usage, increased risk of fixing symptoms independently, and loss of verification efficiency.
- Containment: Stop further one-point patching; perform parallel source audit/reference lookup/build-log inspection before additional modification.
- Correction/Recovery: Switch execution strategy to Multi-Track Continuous Execution with batch correction and post-correction regression.
- Verification: Later web build completed successfully on commit c530c1247ed1a83adc49b77cb975832474447b69; Android APK build remained separately under verification.
- Prevention Rule Candidate: PRC-OPS-001 — Before editing after an execution failure, perform a broad affected-scope audit and classify all related failure points; independent evidence/reference/build tracks may run concurrently.
- Retry condition: Only retry a failed implementation after the failure set and dependencies have been classified, unless a containment action is required for safety.
- State after: VERIFIED_PROCESS_CORRECTED / IMPLEMENTATION_SCOPE_STILL_OPEN
- Status: CLOSED as a process-event correction; prevention candidate pending formal activation checks.

## OPE-20261005-002 — Repository/Ref Selection Error

- Work/Test: Cross-tool source retrieval
- State before: RUNNING
- Intended action: Read Android branch source and workflow from the repository containing feat/android-app-v1.
- Actual action: First fetch attempted against prasong-me/Network-Configuration with ref feat/android-app-v1, although that branch belongs to prasong-me/-Configuration-.
- Error point: Repository and ref were not cross-checked before the read.
- Error type/code: TOOL_CONTEXT / INVALID_REPOSITORY_REF
- Expected: Repository/ref pair resolves before source analysis.
- Actual: GitHub returned 404: No commit found for ref feat/android-app-v1.
- Evidence: Direct GitHub API response from the failed fetch.
- Root cause: Historical project context contained multiple repositories and the Android branch ownership was not revalidated at call time.
- Impact: One failed tool call and temporary interruption of the source-read track.
- Containment: Re-resolve repository ownership, then fetch source from prasong-me/-Configuration- at feat/android-app-v1.
- Correction/Recovery: Subsequent read-back succeeded for WizardApp.jsx and .github/workflows/android.yml.
- Verification: Both files were read successfully from the correct repository/ref; WizardApp.jsx blob SHA 6fdae454796ee2e4c99b1ba0aead7974f3cf7f8a; workflow blob SHA d42873272dfeec2bcc4ef77e43b13584f6ce39b8.
- Prevention Rule Candidate: PRC-OPS-002 — Before repository file operations, validate repository + branch/ref ownership from current repository/branch evidence.
- State after: VERIFIED
- Status: CLOSED.

## OPE-20261005-003 — JSX String/Regex Representation Error Set

- Work/Test: Web bundle used by Android packaging
- State before: BUILD FAILED in earlier attempts
- Intended action: Produce syntactically valid JSX/JavaScript source and a buildable Web bundle.
- Actual action: Source contained invalid or representation-sensitive JSX/string forms during the correction sequence, including a raw multiline quoted JSX attribute and an incorrect escaped-regex representation observed during audit.
- Error point: JSX/JavaScript source representation.
- Error type/code: IMPLEMENTATION_SYNTAX / JSX_STRING_REGEX
- Expected: JSX quoted attributes remain syntactically valid; JavaScript strings use valid escapes; regex literals use intended escape semantics.
- Actual: Earlier Web build attempts failed at source parsing; audit also identified escape representation that required normalization.
- Evidence: Build failures and source read-back; current source now contains valid textarea placeholder text and valid newline/regex expressions.
- Root cause: Source edits were made without a complete syntax/representation audit of the affected file.
- Impact: Web bundle failure blocked downstream Android APK packaging.
- Containment: Audit JSX attributes, string escapes, regex literals, and build entry points together before rerunning.
- Correction/Recovery: Normalize affected source forms and rerun Web build.
- Verification: Web build passed on commit c530c1247ed1a83adc49b77cb975832474447b69; downstream Gradle APK build was still independently under verification at the time of this record.
- Prevention Rule Candidate: PRC-IMPL-001 — For parser/build failures, inspect the complete affected syntax class and dependent expressions before applying fixes; verify source read-back before rerun.
- State after: WEB_BUILD_VERIFIED / ANDROID_BUILD_PENDING
- Status: OPEN until Android downstream verification completes.

## OPE-20261005-004 — Firecrawl Concurrency Limit

- Work/Test: Parallel external-reference research
- State before: RUNNING / parallel research
- Intended action: Run independent research tracks concurrently.
- Actual action: A 15-request Firecrawl parallel batch exceeded the service rate limit; a 30-request batch exceeded the orchestrator ceiling.
- Error point: Tool/service concurrency boundary.
- Error type/code: RATE_LIMIT / CONCURRENCY_LIMIT
- Expected: Parallelism stays within the observed safe operating range.
- Actual: 15 Firecrawl requests hit rate limiting; 30 were blocked by orchestration ceiling.
- Evidence: Recorded execution results from the concurrency test.
- Root cause: Parallel fan-out exceeded observed service/orchestrator limits.
- Impact: Some research calls were rejected and required a smaller fan-out.
- Correction/Recovery: Reduce practical write/search fan-out and separate independent search/read/analyze tracks.
- Verification: 10 concurrent Firecrawl requests completed successfully; 6 independent tasks also completed concurrently.
- Prevention Rule Candidate: PRC-TOOL-001 — Use bounded concurrency based on observed tool-specific limits; do not seek the absolute ceiling during production work.
- State after: VERIFIED
- Status: CLOSED.

---

## Prevention Candidates

| ID | Scope | Rule | Status |
|---|---|---|---|
| PRC-OPS-001 | Execution strategy | Broad affected-scope audit before local correction; parallel independent tracks; batch correction; regression afterward | PROPOSAL |
| PRC-OPS-002 | Tool context | Validate repository + ref ownership before file operations | VERIFIED-CANDIDATE |
| PRC-IMPL-001 | Source correction | Audit the full syntax class/dependency set before parser/build fixes | PROPOSAL |
| PRC-TOOL-001 | Tool concurrency | Use bounded, observed-safe concurrency per tool | VERIFIED-CANDIDATE |

## Activation Boundary

These records are historical/operational evidence. They must not silently mutate Governance or become active system rules merely because they are written here. Activation requires the existing rule-admission checks and regression evidence.

## Current Summary

- Errors recorded: 4
- Process errors: 1
- Tool-context errors: 1
- Implementation/build errors: 1
- Tool/service limit errors: 1
- Closed: 3
- Open: 1 (downstream Android verification)
