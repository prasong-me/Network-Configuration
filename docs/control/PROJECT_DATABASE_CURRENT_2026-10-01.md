# Network Configuration — Project Database Current State

Date: 2026-10-02
Status: CURRENT CONTROL BASELINE — ROUND 1 CLOSED / ROUND 2 OPEN

## Canonical model
Project Database and Central Database are one logical database using one schema. They are not two independently synchronized databases. Project records, evidence, decisions, errors, dependencies, verification, and state changes belong to the same canonical data model and remain portable across workspace/account/repository boundaries.

GitHub is the implementation/source/evidence repository for reconciled verified artifacts. WIP remains outside the canonical repository until verified and reconciled.

## Roadmaps
- Project Roadmap: public project structure, architecture, work breakdown, dependencies, and planned gates.
- Working Route: internal execution route for the current task/Node; it is not a project artifact and must not be promoted into the Project Roadmap merely because it was used.

## Mandatory preflight
Before every work operation: read current central/project data; read Project Roadmap/current Node; read latest Evidence, Error, Blocker, Dependency and protected boundaries; inspect existing repository/source; then define Working Route internally.

No implementation, test, PASS, VERIFIED, or COMPLETE claim may be based only on memory.

## Evidence Completion
When a Target is selected, collect the complete relevant Developer/Organization/Platform ecosystem, not only the first error encountered. Cover specifications, documentation, APIs/interfaces, SDKs, build toolchains, versions, compatibility, security, permissions, testing, deployment, official examples and limitations.

Evidence is immutable historical data. New verified evidence creates a new record and may supersede an older active basis; old evidence is never silently overwritten.

## Provenance and compatibility graph
Developer → Platform → Version → Target → Capability → Evidence → SDK/API → Tool → Command/Interface → Source Code → Build → Runtime → Verification Evidence

An unmatched record is not implementation-ready.

## Tool Semantic Compatibility
Tool names and function names are not semantic guarantees. Similar functions such as run/build/test/search can have different meanings, input/output contracts and side effects.

Before project use, identify Tool ID, Provider, Function, Version/revision where available, Semantic Meaning, Input Contract, Output Contract, Success/Failure/Empty semantics, Side Effects, Target Scope, Evidence and Verification state.

Execution chain: Task Intent → Capability → Tool → Contract Check → Execute → Raw Output → Output Validation → Target/Version Match → Evidence Match → Handoff

## Tool result integrity
Separate EXECUTED, OUTPUT_PRESENT, OUTPUT_VALID, MATCHED, VERIFIED and PASS.

RUN SUCCESS does not imply OUTPUT VALID, MATCHED, VERIFIED or project completion. If a tool reports success but returns no usable data, record NO_OUTPUT and do not pass the result into Database, Code or another Tool as valid input.

## Android support policy
Android 12 and later means minimum OS/API 31 and an API 31+ compatibility matrix, not Android 12 alone. Each supported release needs version-specific evidence for relevant API behavior, permissions, manifest rules, WebView, storage/network/background behavior and compatibility constraints.

Current implementation evidence on prasong-me/-Configuration-, branch feat/android-app-v1: minSdk=31, compileSdk=35, targetSdk=35, Java 17, Kotlin 2.0.21, Android WebView host, CI APK packaging path.

This proves the current build configuration/path only. Android 12 physical-device/emulator runtime remains unverified, and a newer compile/target SDK is not runtime evidence for every supported OS release.

## Android/Web App boundary
The Android wrapper hosts the existing apps/web application. The Android shell must not duplicate Core/Target/Exporter semantics already owned by the web/application layer.

Build path: apps/web build → package web assets into Android assets → Android APK build → device/emulator runtime verification.

## Validation layers
Source/syntax → Schema/contract → Semantic/rule → Target compatibility → Serialization/artifact → Build/CI → OS acceptance → Runtime interoperability.

A pass at one layer must not be promoted to a later layer.

## Test discipline
Before a real test run inspect central data twice: (1) Test Status, Dependency, Requirement, Latest Evidence; (2) Current State, Latest Changes, Blocker, Current Roadmap Node. Then run, record the actual result, reconcile state, and continue.

## Error lifecycle
ERROR → Root Cause → Side Effect → Fix → Verify → Evidence → Update State → Continue.

## Existing-first
Inspect Project Database, Evidence, Project Roadmap and Repository Source Tree before creating a component. Reuse existing components when they serve the required purpose. If replacement/rework is necessary, record the reason and dependency impact.

## Repository reconciliation
READ OLD → MERGE NEW → PRESERVE HISTORY → WRITE AUTHORITATIVE RECORD → READ BACK → VERIFY

When newer authoritative repository evidence conflicts with older summaries, retain the historical state and use the newer evidence for Current State.

## Round 1 — closure
Closed at this round:
- Project Database/Central Database single-schema reconciliation.
- Tool Semantic Compatibility baseline.
- Android build-path reconciliation.
- Android 12+ requirement corrected to API 31+.
- Historical MISS-011 Linux runtime state reconciled to CLOSED / VERIFIED.

Closure boundary:
- This round closes the control/data reconciliation work only.
- It does not claim Android runtime verification.
- It does not claim full Android target-evidence completion.
- It does not reopen the already closed reference/evidence baseline Steps 1A–12.

## Round 2 — current node
ANDROID API 31+ COMPATIBILITY EVIDENCE

Goal:
Convert the existing Android-12-only evidence into a versioned API 31+ compatibility set using the existing evidence/database structure.

First unit:
- inspect existing Android evidence records and current feat/android-app-v1 implementation;
- identify the exact supported API/version range already evidenced;
- close only the version-compatibility evidence that can be verified from existing authoritative/project sources;
- leave physical-device/emulator runtime as NOT VERIFIED until actually executed.

Completion gate:
SOURCE → MATCH → VERSIONED EVIDENCE → READ-BACK → VERIFY → RECORD → CLOSE

Do not create a second database, second roadmap, or duplicate evidence store.