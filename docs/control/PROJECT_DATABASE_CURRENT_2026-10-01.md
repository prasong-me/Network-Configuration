# Network Configuration — Project Database Current State

Date: 2026-10-03
Status: ROUND 2 REOPENED / EVIDENCE RECONCILIATION IN PROGRESS

## Canonical model
Project Database and Central Database are one logical database using one schema. GitHub is the implementation/source/evidence repository for reconciled verified artifacts. Historical evidence remains immutable.

## Current correction
The previous closure of Round 2 was too broad. The repository/source evidence itself was not lost, but the closure state incorrectly treated source/build evidence as sufficient to close the wider Android evidence target. That closure is REOPENED and must not be used as proof of complete Android target evidence.

## Evidence already preserved
- Repository: prasong-me/-Configuration-
- Branch: feat/android-app-v1
- apps/android/app/build.gradle.kts SHA: 374279d68b83cc4694677e7cfa44547f2b446f9a
- minSdk = 31
- compileSdk = 35
- targetSdk = 35
- JVM toolchain = 17
- AndroidManifest.xml SHA: 0598e7065eafbd84d839c8a07eb9afc1c70471ab
- MainActivity.kt SHA: 7f7a125b3f117adcfcfa4c38befd1a1589deea36
- MainActivity loads file:///android_asset/web/index.html

These records remain valid as SOURCE/BUILD evidence. They are not runtime, OS acceptance, or complete API 31+ compatibility evidence.

## Round 2 — REOPENED
ANDROID TARGET EVIDENCE COMPLETION

Root cause of reopening:
Source/build evidence was closed as a work unit, but the broader Android target evidence required additional evidence classes. The closure must therefore be split instead of discarded.

Completed within Round 2:
- source/build configuration evidence: CLOSED

Still OPEN:
- Android API 31+ compatibility evidence
- Android version-specific behavior/restrictions
- permission/runtime behavior
- WebView compatibility relevant to the app
- storage/network/background behavior where applicable
- security and limitations evidence
- build/CI evidence where not already reconciled
- OS acceptance
- physical-device/emulator runtime
- runtime interoperability

## Evidence rule
Do not delete or overwrite the source/build evidence. Keep it as historical verified evidence and attach new evidence to the same Android target. A missing evidence class remains OPEN/UNKNOWN; it is not converted to PASS.

## Next work unit
ANDROID API 31+ COMPATIBILITY EVIDENCE

Start from the preserved source/build evidence above, then collect and verify the missing evidence classes one by one. Close each class only after SOURCE → MATCH → VERIFY → RECORD. Do not close the Android target until all required classes are satisfied or explicitly recorded as NOT VERIFIABLE with the required blocker/next action.

## Validation layers
Source/syntax → Schema/contract → Semantic/rule → Target compatibility → Serialization/artifact → Build/CI → OS acceptance → Runtime interoperability.

A pass at one layer is not a pass at a later layer.

## Historical commit trail
- 6c3726b8bc3e76ea63e82a88166f511ff6de4a9b — prior control reconciliation record.
- bac5424f6d7a396e820620d03a1e08f8bd850594 — prior Round 2 closure / Round 3 opening; this remains historical evidence of the process event, not current proof of completion.

## Completion gate
ALL REQUIRED EVIDENCE CLASSES → MATCH → VERIFY → RECORD → READ-BACK → CLOSE