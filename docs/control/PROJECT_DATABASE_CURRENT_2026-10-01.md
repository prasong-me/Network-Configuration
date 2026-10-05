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
- API 31+ version-specific compatibility matrix: now CLOSED at SOURCE/COMPATIBILITY level for the inspected wrapper surface; runtime remains OPEN.
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

## Autonomous execution reconciliation — 2026-10-03

### Independent CI error handled during project continuation
- Observed historical GitHub Actions failure: Apple Style Guide run #328 (workflow run 36895047204), job 110479811911.
- Root cause: docs/research/OFFICIAL_SOURCE_SNAPSHOT.md contained a lowercase standalone ios, which violated the repository Apple-style validator requiring iOS.
- Correction committed on feat/android-app-v1: commit 684e49e57fbb858f3a5e79e7863dd734208f6012.
- Immediate read-back verified the corrected file has 0 standalone lowercase ios matches and 13 iOS matches.
- Previous status was READ-BACK PASS pending fresh CI.

### Fresh CI verification for correction commit
- Correction commit: 684e49e57fbb858f3a5e79e7863dd734208f6012
- Fresh workflow results for that commit:
  - Apple Style Guide & Grammar Checker — run 346 / 37057619376 — SUCCESS
  - Verify Configuration Platform — run 469 / 37057619787 — SUCCESS
  - CI — run 690 / 37057619698 — SUCCESS
  - Android App — run 21 / 37057619693 — SUCCESS
- Android App build job: 111006096714 — SUCCESS.
- Android App build steps included SDK setup, web bundle build, asset packaging, Gradle installation, debug APK build, and APK upload.
- This upgrades the corrected documentation from READ-BACK-only to CI-VERIFIED for the available workflows.
- Android CI success still establishes build/package evidence only; it does not establish physical runtime, OS acceptance, or complete API 31+ compatibility.

### APK artifact inspection
- Android App run 21 artifact: configuration-android-debug
- Artifact ID: 11179431854
- SHA-256: 4735bd3591c1a0d27794555d105556fe055777a509b5ec177a78cb1d76eaabf
- Artifact contains app-debug.apk with AndroidManifest.xml and packaged web assets under assets/web/.
- Structural artifact inspection confirms the APK was produced and contains the expected packaged web payload.
- This is artifact/build evidence only; it does not replace device/emulator runtime evidence.

### New API 31+ compatibility evidence
- Evidence record: docs/research/ANDROID_API31_COMPATIBILITY_EVIDENCE_2026-10-03.md
- Commit: f086ecec1563fd72de5f5abd495762bf2f523cff
- Official sources verified on 2026-10-03:
  - Android 12/API 31 behavior changes
  - WebView API reference
  - WebSettings API reference
  - OnBackInvokedDispatcher API reference
- Source-level findings:
  - Android 12/API 31 baseline is documented.
  - Existing manifest explicitly sets android:exported=true for the launcher Activity.
  - Existing wrapper uses documented WebView/WebSettings APIs.
  - API 33 OnBackInvokedDispatcher usage is guarded by Build.VERSION.SDK_INT >= 33; API <33 uses the existing onBackPressed path.
- Result: API 31+ SOURCE/COMPATIBILITY evidence CLOSED for the inspected wrapper surface.
- Result: API 31 runtime launch/WebView/interaction/export/permission behavior remains OPEN/UNVERIFIED.

### Continuation state
The project remains OPEN under the existing roadmap. The Android runtime/API 31+ evidence gate is not closed, and no evidence class is promoted to PASS without the corresponding verification layer. No historical evidence was deleted or replaced.

## Official OpenAI Tool/App/Limit Evidence Reconciliation — 2026-10-03

New official-source evidence record committed at:
docs/research/OPENAI_CHATGPT_TOOL_LIMITS_EVIDENCE_2026-10-03.md

Commit: 6ac3ebaf149f6ad8e3c3ce2823f126b5f32482ff

### Verified source findings
- ChatGPT tools can have separate usage limits; the Free-tier FAQ explicitly documents separate limits for file uploads, image generation, voice, data analysis and other tools.
- ChatGPT supports app-specific usage limits; official documentation describes Settings > Usage > App limits and weekly app usage limits.
- App permissions govern when ChatGPT can read connected-account information or take actions on the user's behalf.
- Connected-app access does not override provider permissions or workspace restrictions.
- MCP apps are supported through the documented Developer Mode/MCP app model.
- App availability can depend on plan, admin settings, user permissions and data-source entitlements.
- OpenAI states that available models and usage limits depend on plan/workspace settings and can change over time.

### Central operating rule
Iris must model limits as separate dimensions rather than one global ChatGPT limit:
plan/model allowance | app limit | tool limit | provider/service limit | workspace/admin restriction | permission | runtime availability

OpenAI documentation proves product-level behavior only. It does NOT prove that a specific connector/plugin is available or unlimited in the current workspace. Current runtime availability must be recorded from actual workspace/tool-registry observation as a separate evidence record.

### Evidence Registry
| ID | Node | Claim | Source | Source Type | Verification Date | Result | Status |
|---|---|---|---|---|---|---|---|
| OPENAI-CHATGPT-001 | Tool/Limit Model | ChatGPT tools have separate usage limits | https://help.openai.com/en/articles/9275245-chatgpt-free-tier-faq | Official OpenAI Help Center | 2026-10-03 | Separate tool limits documented | VERIFIED-SOURCE |
| OPENAI-CHATGPT-002 | App Limits | App-specific usage limits are supported | https://help.openai.com/en/articles/20001542-using-your-chatgpt-plan-in-other-apps-and-sites | Official OpenAI Help Center | 2026-10-03 | App limits documented | VERIFIED-SOURCE |
| OPENAI-CHATGPT-003 | App Permissions | App permissions govern connected-account reads/actions | https://help.openai.com/en/articles/20001495-managing-app-permissions-in-chatgpt | Official OpenAI Help Center | 2026-10-03 | Permission boundary documented | VERIFIED-SOURCE |
| OPENAI-CHATGPT-004 | Connected Apps | Connected apps remain subject to existing access/permission boundaries | https://help.openai.com/en/articles/11487775-connected-apps-in-chatgpt | Official OpenAI Help Center | 2026-10-03 | Access boundary documented | VERIFIED-SOURCE |
| OPENAI-CHATGPT-005 | MCP Apps | MCP-powered apps can take actions subject to the documented permission model | https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt | Official OpenAI Help Center | 2026-10-03 | MCP capability documented | VERIFIED-SOURCE |
| OPENAI-CHATGPT-006 | Availability | App availability depends on plan/admin/user/data-source conditions | https://help.openai.com/en/articles/20001063-chatgpt-for-excel-and-google-sheets | Official OpenAI Help Center | 2026-10-03 | Availability dependencies documented | VERIFIED-SOURCE |
| OPENAI-CHATGPT-007 | Workspace Controls | Workspace/admin controls can govern app/plugin access | https://help.openai.com/en/articles/11509118-admin-controls-security-and-compliance-for-plugins-and-apps | Official OpenAI Help Center | 2026-10-03 | Administrative boundary documented | VERIFIED-SOURCE |
| OPENAI-CHATGPT-008 | Limit Variability | Model/usage limits depend on plan/workspace settings and may change | https://help.openai.com/en/collections/3742473-chatgpt | Official OpenAI Help Center | 2026-10-03 | Dynamic limit behavior documented | VERIFIED-SOURCE |

### Reconciliation result
Official OpenAI source evidence for the previously missing product-level limit/permission model has been added. Third-party connector quotas and current runtime availability remain separate OPEN/OBSERVED evidence classes and must not be inferred from OpenAI documentation.


## Android API 31 runtime execution attempt — 2026-10-03

### Implementation/CI changes in related Android source repository
- Existing workflow `.github/workflows/android.yml` was extended rather than creating a parallel workflow.
- Commit `f4d7a88463d95c676c74f3890c0e8e18489d3771`: added an API 31 emulator runtime gate.
- Commit `36fd920a3e5badf52ae5852d69a99d7f29033c84`: corrected emulator binary PATH and bounded emulator startup.
- Commit `932491340ca261ac5f2414a1e34959a230dc77d7`: added explicit startup time bounds and software acceleration fallback.
- Commit `ab26cbda433393f4cb6d644b11c4750883f47baa`: replaced manual emulator startup with the existing workflow's runtime job using `reactivecircus/android-emulator-runner@v2`.

### Evidence and error lifecycle
- Run #28 / `37066978718`: build succeeded; runtime job failed before launch because the `emulator` executable was not on PATH. Root cause verified from job log: `emulator: command not found`. This was corrected in `36fd920...`.
- Run #31 / `37067369185`: build succeeded; manual emulator startup reached the runtime start step but did not produce a terminal runtime result. This attempt is retained as historical execution evidence, not PASS.
- Run #33 / `37068015953`: build succeeded; manual emulator startup remained non-terminal, so it was not promoted to runtime PASS.
- Current Run #35 / `37068549440`: build job succeeded; runtime job is still in progress at `Run API 31 emulator`. No runtime result is promoted until the job reaches a terminal state and the required WebView/runtime assertions are observed.

### Current Android evidence state
- SOURCE/COMPATIBILITY: CLOSED for the inspected wrapper surface.
- BUILD/PACKAGE: VERIFIED by CI.
- API 31 emulator launch: OPEN / UNVERIFIED.
- WebView asset load: OPEN / UNVERIFIED.
- Web app interaction/export: OPEN / UNVERIFIED.
- Permission/runtime behavior: OPEN / UNVERIFIED.
- OS acceptance/runtime interoperability: OPEN / UNVERIFIED.

### Evidence Registry additions
| ID | Node | Claim | Source | Source Type | Verification Date | Result | Status |
|---|---|---|---|---|---|---|---|
| ANDROID-CI-031-001 | Android API 31 runtime | API 31 runtime gate was added to the existing Android workflow | `-Configuration-/.github/workflows/android.yml` @ `f4d7a88463d95c676c74f3890c0e8e18489d3771` | Repository / CI configuration | 2026-10-03 | Runtime gate present | VERIFIED-CONFIG |
| ANDROID-CI-031-002 | Android API 31 runtime | First runtime attempt failed because emulator binary was not on PATH | GitHub Actions Run `37066978718`, job `111037947989` | CI execution log | 2026-10-03 | Root cause observed and corrected | VERIFIED-ERROR |
| ANDROID-CI-031-003 | Android API 31 runtime | Managed emulator runner is now the current runtime path | `-Configuration-` commit `ab26cbda433393f4cb6d644b11c4750883f47baa` | Repository / CI configuration | 2026-10-03 | Current run executing | OPEN-RUNTIME |

### Continuation rule
Do not mark Android runtime VERIFIED until Run #35 (or a subsequent replacement run) reaches a terminal result with successful API 31 launch plus WebView UI evidence. The project remains OPEN under the existing Roadmap.

## Android API 31 runtime error lifecycle — 2026-10-03 continuation

### ERROR
- Node: ANDROID API 31+ COMPATIBILITY EVIDENCE / runtime gate
- Run: 37068549440 / Android App #35
- Job: 111042893654 / runtime-api31
- Failed step: Run API 31 emulator
- Terminal result: /usr/bin/sh exited with code 137
- Verified interpretation: exit code 137 = process terminated by SIGKILL (9). Public job evidence identifies the immediate failure as the shell/emulator workload being killed, not the configured workflow timeout.

### ROOT CAUSE
- The API 31 emulator workload exceeded the available runner/container memory envelope during the runtime step.
- This is an execution-resource failure, not evidence that the Android application itself failed to launch or that WebView compatibility failed.
- Runtime correctness therefore remains UNKNOWN/UNVERIFIED.

### SIDE EFFECT
- Build job 111042261462 succeeded.
- APK build/package evidence remains valid.
- Runtime launch, WebView asset load, interaction/export, permission behavior and OS acceptance remain OPEN/UNVERIFIED.

### FIX
- Existing workflow was modified in prasong-me/-Configuration- rather than creating a parallel workflow.
- Fix commit: af8a16848fafc03cdce92fb401276bb09839cb6f
- Emulator resource bounds added: cores=2, ram-size=1536M, heap-size=256M.
- Software-rendering mode made explicit with -gpu swiftshader_indirect.
- Runtime assertions were tightened to verify process, focused Activity, window focus and android.webkit.WebView presence rather than requiring page text that may not be exposed by UI automation.
- Runtime evidence capture expanded to include WebView diagnostics and logcat.

### VERIFICATION STATE
- Immediate read-back of .github/workflows/android.yml: MATCHED to fix commit.
- Replacement workflow run: 37070390629 / Android App #36
- Head SHA: af8a16848fafc03cdce92fb401276bb09839cb6f
- At last read: status in_progress; no runtime PASS recorded.
- Therefore the fix is READ-BACK VERIFIED, but runtime result remains OPEN/UNVERIFIED.

### Evidence Registry
| ID | Node | Claim | Source | Source Type | Verification Date | Result | Status |
|---|---|---|---|---|---|---|---|
| ANDROID-CI-031-004 | Android API 31 runtime | Run #35 runtime step terminated with shell exit code 137 / SIGKILL | GitHub Actions Run 37068549440, Job 111042893654 | CI execution evidence | 2026-10-03 | Resource-kill failure observed | VERIFIED-ERROR |
| ANDROID-CI-031-005 | Android API 31 runtime | Resource-bounded emulator fix committed to existing workflow | -Configuration- commit af8a16848fafc03cdce92fb401276bb09839cb6f | Repository / CI configuration | 2026-10-03 | Read-back matched | VERIFIED-CONFIG |
| ANDROID-CI-031-006 | Android API 31 runtime | Replacement runtime verification is executing against the fixed workflow | GitHub Actions Run 37070390629 | CI execution | 2026-10-03 | In progress | OPEN-RUNTIME |

### Current state after fix
SOURCE/COMPATIBILITY = CLOSED
BUILD/PACKAGE = VERIFIED
RUNTIME RESOURCE FIX = READ-BACK VERIFIED
API 31 EMULATOR RUNTIME = OPEN/UNVERIFIED
WEBVIEW UI = OPEN/UNVERIFIED
INTERACTION/EXPORT = OPEN/UNVERIFIED
PERMISSION/OS ACCEPTANCE = OPEN/UNVERIFIED

No closure promotion is made until the replacement run reaches a terminal result with the required runtime assertions.


## AI Command-Following — 300-Round Automated Execution

### Authorization / current node
- User authorization: APPROVED for 300 automated rounds.
- Node: AI-CF-300.
- Scope: command following only; no quality/intelligence scoring.
- PASS: every explicit command requirement obeyed.
- FAIL: at least one explicit command requirement not obeyed.
- Difficulty schedule: 1-50 single constraints; 51-100 multiple constraints; 101-150 ordered constraints; 151-200 prohibitions/stop conditions; 201-250 nested/preserved constraints; 251-300 complex combined constraints.

### Execution evidence
- Runner/external execution: Browser Use on Duck.ai public chat.
- Active run: 69caf88c-5c8c-4e57-a181-401c7c494c9e.
- Last observed execution state: non-terminal / unknown.
- Therefore 300-round completion is NOT VERIFIED and no final rate is claimed.
- Execution registry: docs/control/AI_COMMAND_FOLLOWING_300_EXECUTION_2026-10-03.md
- Registry commit: 994d54633a9a7c9a601322f0ad270eb19ec2014a

### Evidence Registry
| ID | Node | Claim | Source | Source Type | Verification Date | Result | Status |
|---|---|---|---|---|---|---|---|
| AICF-300-001 | AI-CF-300 | User approved an automated 300-round command-following test | Current project instruction | User authorization | 2026-10-03 | 300 rounds authorized | VERIFIED-AUTHORIZATION |
| AICF-300-002 | AI-CF-300 | Automated external execution was started | Browser Use run 69caf88c-5c8c-4e57-a181-401c7c494c9e | External runtime execution | 2026-10-03 | Non-terminal at last check | OPEN-RUNTIME |

### Closure gate
The 300-round node remains OPEN until the external execution reaches a terminal state, all completed rounds are recorded, results are read back, PASS/FAIL is calculated from exact command compliance, and the repository state is verified.


## Developer / Engineering Authority Evidence — 2026-10-03

New evidence map:
- File: docs/research/DEVELOPER_ENGINEERING_AUTHORITY_MAP_2026-10-03.md
- Commit: 5cc920be3803cad4caf8742156364b005ffdbd27

Scope covered in ordered layers:
1. GitHub
2. Apple Configuration Profiles / mobileconfig
3. Android VpnService / WebView
4. WireGuard
5. sing-box
6. Shadowrocket
7. FoxyProxy
8. IETF DNS / proxy / routing standards
9. Next.js / Vercel
10. OpenAI / ChatGPT Apps / MCP

Result:
- Organization/project/standards authority evidence was found for the listed components from primary official sources.
- Individual engineer authority was not inferred where primary-source evidence did not establish the role.
- Shadowrocket developer identity is supported by the Apple App Store listing as Shadow Launch Technology Limited.
- This evidence layer does not modify Project Roadmap, Contract v2.1, or protected boundaries.
- Additional individual-maintainer/governance evidence remains OPEN where the primary source does not establish it.

Evidence Registry:
- DEVENG-001 through DEVENG-011 are recorded in the new evidence map with ID, Node, Claim, Source, Source Type, Verification Date, Result, Status.


## Tool Control / Execution Architecture Evidence — 2026-10-03

Recorded source map:
- docs/control/TOOL_CONTROL_EXECUTION_ARCHITECTURE_EVIDENCE_2026-10-03.md
- Commit: 8a0f8b24edb800f673adcda439b4b4114ad39807

Evidence IDs:
- CTRL-ARCH-001 through CTRL-ARCH-007

Coverage:
1. MCP client/server and capability structure
2. MCP authorization
3. OpenAI MCP tool approval / authorization
4. OpenAI MCP server-side authorization
5. GitHub Actions workflow/permission controls
6. GitHub OIDC identity controls
7. Browser Use managed execution architecture

Control conclusion:
- User authorization to use tools is one permission layer; it does not erase platform/connector/runtime/rate-limit boundaries.
- Tool execution must remain separated from output validation and verification.
- The project's existing execution contract remains authoritative and unchanged.


## Engineering Role Registry — 2026-10-03

### Node
ENGINEERING ROLE / AUTHORITY CLASSIFICATION

### New artifact
- `docs/research/ENGINEERING_ROLE_REGISTRY_2026-10-03.md`
- Commit: `476f74bf4e7c49499f08179125902b7b982b967e`

### Authority map linkage
- Updated `docs/research/DEVELOPER_ENGINEERING_AUTHORITY_MAP_2026-10-03.md`
- Commit: `4a3a1d183c6c09dc6d2b2b93e45807cbb737b9e0`
- Read-back blob SHA: `9c8eae294a600260f278b98e02b14db45973a34c`

### Coverage
The registry provides a machine-usable role vocabulary across:
- authority/governance;
- software engineering;
- infrastructure/operations;
- quality/evidence;
- Apple/Android/DNS/VPN/Proxy/Routing/Web/AI/Workspace domain specialists.

### Control boundary
- Role taxonomy does not assign named people.
- Platform/project authority remains evidence-bound to primary sources.
- CODEOWNERS is treated as repository ownership/review evidence, not universal engineering authority.
- Individual engineer authority remains OPEN unless primary evidence establishes identity, role, scope and current context.
- No roadmap, Contract v2.1 or protected boundary was changed.

### Evidence Registry
| ID | Node | Claim | Source | Source Type | Verification Date | Result | Status |
|---|---|---|---|---|---|---|---|
| ENGROLE-001 | Engineering role taxonomy | Operational engineering-role taxonomy recorded for workspace routing without assigning people | `docs/research/ENGINEERING_ROLE_REGISTRY_2026-10-03.md` | Project control | 2026-10-03 | Taxonomy recorded | VERIFIED-DESIGN |
| ENGROLE-002 | Code ownership | GitHub CODEOWNERS identifies people/teams responsible for specific files/directories and can trigger review requests | https://docs.github.com/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners | Official GitHub | 2026-10-03 | Code-owner mechanism documented | VERIFIED-SOURCE |
| ENGROLE-003 | Pull-request review | GitHub documents pull-request reviews and code-owner review behavior | https://docs.github.com/pull-requests/reference/pull-request-reviews | Official GitHub | 2026-10-03 | Review mechanism documented | VERIFIED-SOURCE |

### State
- Engineering role taxonomy: VERIFIED-DESIGN
- Official GitHub code-owner/review evidence: VERIFIED-SOURCE
- Named individual engineer authority: OPEN
- Workspace-specific role assignment: OPEN until repository/organization evidence is read
- Project Roadmap: UNCHANGED

## Engineering Verification / Readiness Layers — 2026-10-03

### Node
ENGINEERING AUTHORITY + ROLE + READINESS CLASSIFICATION

### Registry update
- `docs/research/ENGINEERING_ROLE_REGISTRY_2026-10-03.md`
- Commit: `a0bada35189a2a0c1b6c8cbf1d3186aef59b4c94`
- Read-back blob SHA: `862627e52d6736cfff11165012ee621801d9b2ce`

### Required layers
- V0 UNVERIFIED
- V1 SOURCE-IDENTIFIED
- V2 VERIFIED-SOURCE
- V3 VERIFIED-ROLE
- V4 IMPLEMENTATION-READY
- V5 VERIFIED-IMPLEMENTATION
- V6 RELEASE-READY
- V7 CLOSED

### Control
V2 VERIFIED-SOURCE does NOT mean implementation-ready. A record must satisfy role/authority, normative source, target/version, dependency, contract, validation and blocker gates before V4.

Named engineer authority remains OPEN unless primary evidence establishes identity + role + scope + current context.

### Current classification
The current 10 authority domains in the engineering map are classified V2 VERIFIED-SOURCE:
GitHub, Apple mobileconfig, Android, WireGuard, sing-box, Shadowrocket developer identity, FoxyProxy, DNS/IETF, Next.js/Vercel, OpenAI/MCP.

This classification does not promote any domain to READY and does not alter the Project Roadmap.

### New Evidence
| ID | Node | Claim | Source | Source Type | Verification Date | Result | Status |
|---|---|---|---|---|---|---|---|
| ENGROLE-004 | Verification tiers | Workspace needs independent verification/readiness layers | Engineering Role Registry | Project control | 2026-10-03 | V0-V7 recorded | VERIFIED-DESIGN |
| ENGROLE-005 | Promotion control | Weak evidence or tool/test success cannot independently promote a record to READY/CLOSED | Existing project controls | Project control | 2026-10-03 | Promotion rules recorded | VERIFIED-DESIGN |
| ENGROLE-006 | Authority classification | Current authority domains are V2 VERIFIED-SOURCE; individual roles remain open | Authority Map + official sources | Evidence synthesis | 2026-10-03 | Classification recorded | VERIFIED-DESIGN |

## Engineering Record Dimensions — 2026-10-03

### Node
ENGINEERING IDENTITY / ROLE / AUTHORITY / EVIDENCE DATA MODEL

### Registry
- `docs/research/ENGINEERING_ROLE_REGISTRY_2026-10-03.md`
- Commit: `a000045470840499d0d4ad1987cecd825cf55e59`
- Read-back blob SHA: `bde8f1a36f0300fc4d86d42c72ae8a7a55ad6b13`

### Added dimensions
1. Identity
2. Role
3. Authority
4. Technical responsibility
5. Evidence/provenance
6. Operational status
7. Security/trust boundary
8. Assignment/history/relation
9. Negative evidence / unresolved state
10. Conflict and reconciliation

### Separation rule
Identity, role, authority, capability, evidence, assignment, status, history, relation and security scope are separate record types. No record type may overwrite another.

### State rule
Unknown and unverified conditions are stored explicitly. They are not treated as empty fields and are never converted to VERIFIED by inference.

### Evidence
| ID | Node | Claim | Source | Source Type | Verification Date | Result | Status |
|---|---|---|---|---|---|---|---|
| ENGROLE-007 | Engineering record schema | Engineering identity/role/authority/capability/evidence/status/security dimensions are independently addressable | Engineering Role Registry | Project control | 2026-10-03 | Schema recorded | VERIFIED-DESIGN |
| ENGROLE-008 | Record separation | Engineering record types must not overwrite one another | Project governance | Project control | 2026-10-03 | Separation recorded | VERIFIED-DESIGN |
| ENGROLE-009 | Negative evidence | Unknown/unverified conditions must be explicit | Project evidence rules | Project control | 2026-10-03 | Negative-state model recorded | VERIFIED-DESIGN |
| ENGROLE-010 | Conflict handling | Conflicting sources must be preserved and reconciled | Project evidence rules | Project control | 2026-10-03 | Conflict model recorded | VERIFIED-DESIGN |

### Roadmap / protected boundaries
No Project Roadmap, Contract v2.1 or protected boundary was changed.

## Safe Development Evidence Baseline — 2026-10-03

### Node
SAFE DEVELOPMENT / SECURITY / RELEASE EVIDENCE COLLECTION

### Artifact
- `docs/research/SAFE_DEVELOPMENT_EVIDENCE_BASELINE_2026-10-03.md`
- Commit: `75160c6a9586306da58fcb43ff5cfbeba08937e1`

### Scope recorded
Core correctness; Apple; Android; DNS; VPN; Proxy; Routing/Rules; Web App; Serialization; Artifact integrity; CI/CD; Supply Chain; Secrets; Privacy; Diagnostics; Verification/Readiness; Release controls.

### Current state
- Existing verified source and implementation evidence was consolidated without overwriting historical evidence.
- Android API 31 runtime remains OPEN/UNVERIFIED.
- Release-stage and project-specific security verification remains separate from source-level evidence.
- No component is promoted to READY merely because source documentation or CI execution exists.

### External research limitation
A broad official-source search returned substantial Apple/IETF evidence. Subsequent targeted searches encountered HTTP 429 rate limiting. The limitation is recorded explicitly; missing fresh evidence remains OPEN rather than inferred.

### Evidence Registry
| ID | Node | Claim | Source | Source Type | Verification Date | Result | Status |
|---|---|---|---|---|---|---|---|
| SAFEDEV-001 | Safe development baseline | Project requires evidence layers from source through closure | Existing project control / readiness registry | Project control | 2026-10-03 | Baseline recorded | VERIFIED-DESIGN |
| SAFEDEV-002 | Apple safety | Apple target capabilities must follow documented keys and availability | Apple Configuration Profile Reference / NetworkExtension | Official Apple | 2026-10-03 | Source evidence available | VERIFIED-SOURCE |
| SAFEDEV-003 | Android safety | Android networking/VPN/WebView/management capabilities are API/role/version bounded | Official Android documentation + stored project evidence | Official Android / Project evidence | 2026-10-03 | Boundaries recorded | VERIFIED-SOURCE |
| SAFEDEV-004 | DNS safety | DNS behavior must preserve standards semantics and fail closed on unsupported target mapping | IETF evidence + project DNS tests | Standards / Project evidence | 2026-10-03 | Scope recorded | VERIFIED-SOURCE |
| SAFEDEV-005 | Tool safety | Tool execution and output verification remain separate | Tool Semantic Compatibility Baseline / Tool Control Evidence | Project control | 2026-10-03 | Control verified | VERIFIED-DESIGN |
| SAFEDEV-006 | Android runtime gate | API 31 runtime remains open after recorded resource-kill failure and non-terminal replacement run | GitHub Actions evidence | CI execution evidence | 2026-10-03 | Runtime not verified | OPEN-RUNTIME |
| SAFEDEV-007 | Artifact safety | APK structural inspection proves artifact content, not runtime acceptance | CI artifact evidence | CI/artifact evidence | 2026-10-03 | Boundary recorded | VERIFIED-SOURCE |
| SAFEDEV-008 | Supply-chain safety | CI permissions, OIDC, provenance and least privilege are release controls | GitHub/tool-control evidence | Official GitHub / Project control | 2026-10-03 | Control scope recorded | VERIFIED-SOURCE |
| SAFEDEV-009 | Readiness | V2 source verification cannot independently promote a component to V4 | Engineering Role Registry | Project control | 2026-10-03 | Promotion rule recorded | VERIFIED-DESIGN |
| SAFEDEV-010 | Research limitation | Rate-limited searches must remain explicit rather than inferred | Current execution record | Runtime evidence | 2026-10-03 | Limitation recorded | VERIFIED-DESIGN |

### Roadmap control
Project Roadmap, Contract v2.1 and protected boundaries are unchanged.



## Core Execution / Integration Closure — 2026-10-05

### Node
CORE MODEL + VALIDATION + INTEGRATION EXECUTION

### Correction implemented
The previously unverified execution/integration gap was corrected by promoting the verification changes into the main repository path.

- Verification branch: `verify/round9-completion-20261005`
- Verification head before merge: `2cc61524c3f341af1e9d9a95be116674b6dedd2c`
- Pull Request: #3
- Merge method: squash
- Main merge commit: `0bec5d73c60839c96ef605c7c4ffa6b9adb7b696`

### Implementation changes
1. Added `workflow_dispatch` to `.github/workflows/core-model-tests.yml` so the complete gate has an explicit execution path.
2. Added `tests/integration/core-pipeline.test.mjs`.
3. Added integration coverage across:
   State Engine → CompileResult → Contract Validation → Serializer → Artifact.
4. Added fail-closed regression coverage:
   PROCESSING → unhandled failure → BLOCKED.
5. Added the integration regression test to the CI gate.

### Direct execution evidence
Verification workflow:
- Run #34: `37249051836`
- Head SHA: `a8fdac8139ef944fa202d3aec487159462a5d512`
- Complete test gate: SUCCESS
- Core Model backup runner: SUCCESS

Final regression workflow after integration coverage was added:
- Run #35: `37249095342`
- Head SHA: `2cc61524c3f341af1e9d9a95be116674b6dedd2c`
- Complete test gate: SUCCESS
- Integration regression: SUCCESS
- Core Model backup runner: SUCCESS
- Overall conclusion: SUCCESS

### Verification conclusion
The previous gaps for this core test scope are now closed with current execution evidence:
- Execute: VERIFIED
- Output: VERIFIED through passing test gate and integration assertions
- Integration: VERIFIED by dedicated integration regression
- Failure/Recovery/Regression: VERIFIED for the covered fail-closed transition
- CI reproducibility: VERIFIED by successful GitHub Actions execution

### Central evidence rule
The CI run and merge commit are the authoritative current evidence for this closure. Historical Android runtime evidence remains a separate node and is not promoted by this change.

### Current state
CORE EXECUTION = CLOSED
CORE INTEGRATION = CLOSED
FAILURE/REGRESSION COVERAGE = CLOSED for the implemented core scope
ANDROID RUNTIME = remains separately OPEN/UNVERIFIED as previously recorded
AUTOMATIC ERROR MEMORY = remains separately DEFERRED as instructed



### Final main-branch verification — 2026-10-05
- Main branch head after promotion: `0bec5d73c60839c96ef605c7c4ffa6b9adb7b696`.
- Main-branch GitHub Actions Core Model and Validation Tests run #37: `37249177244`.
- Run head SHA: `0bec5d73c60839c96ef605c7c4ffa6b9adb7b696`.
- Overall conclusion: SUCCESS.
- This is the final current-main execution evidence for the promoted core integration gate.
- Central record read-back after update: MATCHED.
