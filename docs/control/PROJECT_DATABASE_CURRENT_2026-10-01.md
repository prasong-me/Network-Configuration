# Network Configuration — Project Database Current State

Date: 2026-10-03
Status: ROUND 2 — ANDROID TARGET EVIDENCE RECONCILIATION / API 31+ COMPATIBILITY OPEN

## Canonical model
Project Database and Central Database are one logical database using one schema. GitHub is the implementation/source/evidence repository for reconciled verified artifacts. Historical evidence remains immutable.

## Current correction
The previous closure of Round 2 was too broad. The repository/source evidence itself was not lost, but the closure state incorrectly treated source/build evidence as sufficient to close the wider Android evidence target. The closure was therefore reopened and is being reconciled against the historical evidence already stored in the accessible project evidence base.

## Evidence already preserved

### Repository / build evidence
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

### Historical Android authoritative evidence already stored
The accessible project evidence database contains the original historical Android platform evidence record inside:
NETWORK_CONFIGURATION_REFERENCE_EVIDENCE_COMPLETE.md
SOURCE RECORD: STEP_3_ANDROID_PLATFORM_EVIDENCE.md
Date: 2026-09-30
Status: STEP 3 — ANDROID EVIDENCE BASELINE COMPLETE

Verified evidence units found in that stored record include:
- ANDROID-VPN-001 — VpnService
  Official Android API Reference:
  https://developer.android.com/reference/android/net/VpnService
  Documents Android app-level VPN provider capability, virtual interface/routing behavior, BIND_VPN_SERVICE requirement, and always-on/lockdown boundaries.
- ANDROID-NET-001 — ConnectivityManager / LinkProperties / NetworkCapabilities
  Official Android Developer Documentation:
  https://developer.android.com/develop/connectivity/network-ops/reading-network-state
  Documents network-state observation and the distinction between observing network properties and mutating system configuration.
- ANDROID-DNS-001 — Private DNS
  Official Android API Reference:
  https://developer.android.com/reference/android/app/admin/DevicePolicyManager
  Documents Private DNS modes and management APIs, including management-role/API constraints.
- ANDROID-MGMT-001 — DevicePolicyManager
  Official Android API Reference:
  https://developer.android.com/reference/android/app/admin/DevicePolicyManager
  Documents device/profile-owner management capabilities and restrictions relevant to network policy.
- ANDROID-VPN-002 — Always-on VPN / lockdown
  Official Android API Reference:
  https://developer.android.com/reference/android/app/admin/DevicePolicyManager
  Documents setAlwaysOnVpnPackage and management-authority boundaries.

The stored evidence also records the architecture distinction:
Network observation → ConnectivityManager / NetworkCapabilities / LinkProperties
VPN execution → VpnService
Managed system policy → DevicePolicyManager
Private DNS management → DevicePolicyManager APIs with API-level and management-role restrictions

The stored record explicitly states that Android does not provide a universal Apple-mobileconfig-equivalent format for arbitrary network settings and that unsupported or management-required capabilities must remain explicit.

## Evidence reconciliation result
The historical Android authoritative capability baseline was NOT missing from the project evidence base. It was found in the existing stored evidence after re-reading the historical database.

Therefore:
- Android authoritative platform/capability evidence baseline: CLOSED at SOURCE/EVIDENCE level.
- Historical evidence artifact: FOUND and retained; it must not be recreated or replaced with a new summary.
- Source/build evidence: CLOSED at SOURCE/BUILD level.
- Android runtime evidence: still OPEN/UNVERIFIED.
- API 31+ version-specific compatibility matrix: still OPEN.
- Physical-device/emulator runtime: still OPEN/BLOCKED where required.
- OS acceptance/runtime interoperability: still OPEN.
- Permission/runtime behavior, WebView compatibility, storage/network/background behavior, security/limitations: remain open only where project-specific verification is required and not already proven by the stored evidence.

## Round 2 — CURRENT NODE
ANDROID API 31+ COMPATIBILITY EVIDENCE

The roadmap remains unchanged. No new roadmap is created.

Start from the already preserved source/build evidence and the already stored Android authoritative platform evidence. Determine which required compatibility facts are already proven and which require additional verification.

## Evidence rule
Do not delete, overwrite, or replace historical evidence with a narrower summary. Preserve the original evidence record and attach new evidence to the same Android target. A missing evidence class remains OPEN/UNKNOWN; it is not converted to PASS.

## Validation layers
Source/syntax → Schema/contract → Semantic/rule → Target compatibility → Serialization/artifact → Build/CI → OS acceptance → Runtime interoperability.

A pass at one layer is not a pass at a later layer.

## Historical commit trail
- 6c3726b8bc3e76ea63e82a88166f511ff6de4a9b — prior control reconciliation record.
- bac5424f6d7a396e820620d03a1e08f8bd850594 — prior Round 2 closure / Round 3 opening; retained as historical process evidence.
- 76febc2edd7bfcbb15fd23f71f1d948637d2faf7 — reopened Round 2 after detecting the over-broad closure.

## Completion gate
ALL REQUIRED EVIDENCE CLASSES → MATCH → VERIFY → RECORD → READ-BACK → CLOSE
