# Network Configuration — Project Database Current State

Date: 2026-10-02
Status: ROUND 2 CLOSED / ROUND 3 OPEN

## Canonical model
Project Database and Central Database are one logical database using one schema. GitHub is the implementation/source/evidence repository for reconciled verified artifacts. Historical evidence remains immutable.

## Operating route
Before each work unit: read current data, roadmap/current node, evidence, blockers, dependencies and protected boundaries; inspect existing source; select one unit; execute; read back; verify; record; close; continue.

## Validation layers
Source/syntax → Schema/contract → Semantic/rule → Target compatibility → Serialization/artifact → Build/CI → OS acceptance → Runtime interoperability.

A pass at one layer is not a pass at a later layer.

## Existing-first
Reuse the existing database, evidence records, roadmap and source. Do not create a second database or duplicate evidence store.

## Round 1 — CLOSED
Control/data reconciliation closed:
- single logical Project/Central Database model;
- Tool Semantic Compatibility baseline;
- Android build-path reconciliation;
- Android 12+ corrected to API 31+;
- MISS-011 Linux runtime reconciled to CLOSED / VERIFIED.

## Round 2 — CLOSED
Android build/source-path evidence unit closed from repository evidence.

Verified evidence:
- Repository: prasong-me/-Configuration-
- Branch: feat/android-app-v1
- Android build file: apps/android/app/build.gradle.kts
- build evidence SHA: 374279d68b83cc4694677e7cfa44547f2b446f9a
- minSdk = 31
- compileSdk = 35
- targetSdk = 35
- JVM toolchain = 17
- Android manifest SHA: 0598e7065eafbd84d839c8a07eb9afc1c70471ab
- MainActivity SHA: 7f7a125b3f117adcfcfa4c38befd1a1589deea36
- MainActivity loads the packaged web asset at file:///android_asset/web/index.html.

Closure meaning:
- Android source/build path is established at source level.
- The Android shell is a WebView host for the existing web application.
- This does not prove Android 12 physical-device/emulator runtime.
- This does not prove compatibility across every API 31+ release.
- This does not close OS acceptance or runtime interoperability.

## Round 3 — CURRENT NODE
ANDROID API 31+ COMPATIBILITY MATRIX

Goal:
Determine and record version-specific compatibility evidence for the supported Android range using existing authoritative/project sources.

First unit:
- identify the actual supported API range from minSdk/build configuration;
- inspect existing project evidence for version-specific behavior and restrictions;
- record only verified API/version facts;
- do not promote compileSdk/targetSdk into runtime compatibility evidence.

Completion gate:
VERSION RANGE → VERSION-SPECIFIC EVIDENCE → MATCH → VERIFY → RECORD → CLOSE

Runtime device/emulator testing remains a separate node and stays NOT VERIFIED until actually executed.