# IRIS Runtime Evidence & Bidirectional Traceability
Date: 2026-10-05
Status: ACTIVE WORKING EVIDENCE RECORD
Repository: prasong-me/Network-Configuration

## Purpose
Build the evidence layer required to verify the project in both directions:
- Requirement -> Project -> Test -> Evidence
- Evidence/Test -> Project -> Requirement

This record is additive. It does not redefine Governance, protected boundaries, contracts, or target capability semantics.

## Evidence rules
1. Structure != Implementation != Execution != Validation.
2. External facts must be tied to an authoritative source.
3. Runtime claims require evidence tied to the exact target/version/run/device where applicable.
4. Historical PASS is not current PASS unless tied to the exact current commit/run.
5. A CI run that is queued/in-progress is not PASS.
6. Unknown or unsupported capability is not silently substituted.
7. Evidence records preserve provenance and are never silently overwritten.

## External Evidence Registry

### EXT-ANDROID-001
Status: VERIFIED
Fact: Android 12 changes WebView SameSite cookie behavior for apps targeting Android 12/API 31+, and Android documentation explicitly recommends testing critical WebView flows on Android 12.
Source: Android Developers — Behavior changes: Apps targeting Android 12
URL: https://developer.android.com/about/versions/12/behavior-changes-12
Applies to: Android Web App wrapper; login/authentication; embedded content; cross-site cookie behavior.
Test implication: Android 12 device test must include loading, authentication/session continuity, embedded content, and any cross-site flow used by the actual Web App.

### EXT-ANDROID-002
Status: VERIFIED
Fact: Android documents usesCleartextTraffic and Network Security Configuration as controls for cleartext network traffic; WebView honors usesCleartextTraffic for apps targeting API 26+.
Source: Android Developers — Application element; Network security configuration
URLs:
https://developer.android.com/guide/topics/manifest/application-element
https://developer.android.com/privacy-and-security/security-config
Applies to: Android wrapper network/security configuration.
Test implication: inspect manifest/network-security configuration and execute a negative HTTP test plus required HTTPS flow.

### EXT-ANDROID-003
Status: VERIFIED
Fact: Android security guidance recommends loading WebView content over HTTPS and controlling native JavaScript bridges when untrusted content could be loaded.
Source: Android Developers — WebView native bridges security
URL: https://developer.android.com/privacy-and-security/risks/insecure-webview-native-bridges
Applies to: WebView boundary/security.
Test implication: verify allowed origin/content boundary, HTTPS loading, and native bridge exposure.

### EXT-APPLE-001
Status: VERIFIED
Fact: Apple documents GlobalHTTPProxy as a dedicated global HTTP proxy payload with explicit manual/automatic fields and states that only one such payload can be present on a device.
Source: Apple Developer Documentation — GlobalHTTPProxy
URL: https://developer.apple.com/documentation/devicemanagement/globalhttpproxy
Applies to: Apple proxy adapter/exporter.
Test implication: generated artifact must validate required fields and the one-payload constraint.

### EXT-APPLE-002
Status: VERIFIED
Fact: Apple lists DNSProxy, GlobalHTTPProxy, and NetworkProxyConfiguration among profile-specific payload types.
Source: Apple Developer Documentation — Profile-specific payload keys
URL: https://developer.apple.com/documentation/devicemanagement/profile-specific-payload-keys
Applies to: target capability mapping and adapter selection.
Test implication: each capability must map to the documented target payload rather than an inferred generic format.

### EXT-APPLE-003
Status: VERIFIED
Fact: Apple VPN DNS configuration has required DNSProtocol and ServerAddresses fields and explicitly documents platform availability.
Source: Apple Developer Documentation — VPN.DNS
URL: https://developer.apple.com/documentation/devicemanagement/vpn/dns-data.dictionary
Applies to: Apple VPN/DNS mapping.
Test implication: required fields, platform availability, and protocol values must be validated against generated artifacts.


### EXT-APPLE-004
Status: VERIFIED
Fact: Apple WebClip requires Label and URL; Apple also documents icon/display-name requirements for valid iOS web clip payloads and defines the com.apple.webClip.managed payload type.
Source: Apple Developer Documentation — WebClip
URL: https://developer.apple.com/documentation/DeviceManagement/WebClip
Applies to: Apple Web App/WebClip exporter and validation.
Test implication: validate required Label/URL fields plus iOS display/icon requirements when the project emits a WebClip.

### EXT-GITHUB-001
Status: VERIFIED
Fact: GitHub states that a workflow run is associated with an event commit SHA and that the workflow definition used is the one present at that commit/ref; GITHUB_SHA identifies the commit.
Source: GitHub Docs — Workflows
URL: https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows
Applies to: CI evidence identity.
Test implication: every CI result record must retain workflow, run, ref, and exact commit SHA.

### EXT-GITHUB-002
Status: VERIFIED
Fact: GitHub Actions artifacts can preserve build/test output, logs, screenshots, binaries, coverage and other evidence after a run; artifact provenance can include workflow, repository, environment, commit SHA and triggering event.
Source: GitHub Docs — Workflow artifacts
URL: https://docs.github.com/en/actions/concepts/workflows-and-actions/workflow-artifacts
Applies to: persistent execution evidence.
Test implication: test output and build evidence should be retained as artifacts and linked to the exact run/commit.

## Test Inventory — Runtime / Acceptance Closure

### T-RUN-001 — Target Capability Chain
Requirement: Target Evidence -> Capability -> Authority -> Configuration -> Adapter -> Serializer -> Artifact -> Verification
Project: target capability model + adapters + serializers + verification
Test: trace one representative capability end-to-end through every node.
Evidence required: source evidence, mapping record, generated artifact, verification output.

### T-RUN-002 — Artifact Integrity
Requirement: generated structure must be distinguished from actual artifact and validated artifact.
Project: exporter/serializer
Test: generate artifact; parse/validate it; compare expected vs observed structure.
Evidence required: input snapshot, output artifact hash, validator output, expected/actual comparison.

### T-RUN-003 — Android 12 Real Web App
Requirement: Android wrapper must use the actual Web App source, not a placeholder.
Project: Android wrapper
Test: identify source entry point/assets/build configuration, build wrapper, inspect APK, execute on Android 12.
Evidence required: source commit, build log, APK hash, APK inspection, device/version, runtime result.

### T-RUN-004 — Android WebView Runtime
Requirement: WebView must load and operate the actual Web App.
Project: Android wrapper/WebView
Test: cold launch, page load, navigation, interaction, error/loading states, export path.
Evidence required: device log/output and reproducible test record.

### T-RUN-005 — Android Network Security
Requirement: network behavior must match declared security policy.
Project: Android manifest + Network Security Configuration
Test: required HTTPS flow succeeds; prohibited cleartext flow is rejected; redirects are checked.
Evidence required: configuration snapshot + runtime logs/results.

### T-RUN-006 — Android 12 Cookie/Auth Compatibility
Requirement: WebView authentication/session behavior must survive Android 12 SameSite rules.
Project: actual Web App + wrapper
Test: login, session persistence, cross-site/embedded auth flows used by the app.
Evidence required: device/version, WebView version where relevant, test steps, observed result.

### T-RUN-007 — Apple Payload Conformance
Requirement: target-specific Apple payloads must follow Apple's documented schemas.
Project: Apple adapter/exporter
Test: validate representative DNS/VPN/proxy/WebClip artifacts against authoritative payload requirements.
Evidence required: exact artifact + validator output + source/version.

### T-RUN-008 — CI Identity / Reproducibility
Requirement: CI evidence must identify exact workflow/run/commit.
Project: GitHub Actions
Test: execute or inspect CI run and bind result to exact SHA.
Evidence required: workflow name, run ID/number, SHA, status, artifacts.

### T-RUN-009 — Failure Injection / Recovery
Requirement: material failures must be captured with expected, actual, symptom, cause, correction, verification, prevention and status.
Project: failure/recovery lifecycle
Test: inject representative failure; verify state transition, record creation, recovery, and re-verification.
Evidence required: failure record + recovery record + regression result.

### T-RUN-010 — Handoff / Resume
Requirement: work must resume from a verified checkpoint without losing state or provenance.
Project: checkpoint/continuity layer
Test: create checkpoint at an intermediate state; interrupt; resume; compare state and provenance before/after.
Evidence required: checkpoint ID, state snapshot, resume result, comparison.

### T-RUN-011 — Bidirectional Traceability
Requirement: every tested requirement must be reachable in both directions.
Project: requirement/project/test/evidence mapping
Test A: Requirement -> Project -> Test -> Evidence.
Test B: Evidence/Test -> Project -> Requirement.
Evidence required: mapping table with stable IDs and no orphan nodes.

### T-RUN-012 — Adversarial Regression
Requirement: previously fixed failures must remain fixed without breaking protected behavior.
Project: regression suite
Test: replay known failure classes plus boundary/conflict/unknown cases.
Evidence required: exact test set, expected results, observed results, regression record.

### T-RUN-013 — History Completeness
Requirement: evidence/history is additive and reversible.
Project: canonical record/history
Test: verify each result references its predecessor/version/commit and that prior evidence remains retrievable.
Evidence required: history chain and read-back.

### T-RUN-014 — Production/Device Acceptance Gate
Requirement: production/device acceptance requires actual execution evidence, not architecture alone.
Project: target runtime(s)
Test: execute all applicable acceptance cases after lower-level tests pass.
Evidence required: device/runtime identity, artifact/build identity, test results, logs, acceptance decision.

## Bidirectional Traceability Matrix

| Requirement | Project Unit | Test IDs | Evidence IDs |
|---|---|---|---|
| Target-specific mapping must be authoritative | Capability Model / Adapters | T-RUN-001, T-RUN-007 | EXT-APPLE-002, EXT-APPLE-003 |
| Generated artifact must be validated | Exporters / Serializers | T-RUN-002, T-RUN-007 | EXT-APPLE-001..003 |
| Android wrapper uses real Web App | Android Wrapper | T-RUN-003, T-RUN-004 | EXT-ANDROID-001..003 |
| Android network security is explicit | Android Wrapper | T-RUN-005 | EXT-ANDROID-002, EXT-ANDROID-003 |
| Android 12 WebView compatibility | Android Wrapper/Web App | T-RUN-006 | EXT-ANDROID-001 |
| CI result is reproducible by exact identity | GitHub Actions | T-RUN-008 | EXT-GITHUB-001, EXT-GITHUB-002 |
| Failure/recovery is auditable | Failure/Recovery Lifecycle | T-RUN-009 | Project failure records |
| Checkpoint resume preserves state | Continuity/Checkpoint | T-RUN-010 | Checkpoint records |
| Bidirectional traceability | Evidence/Traceability Layer | T-RUN-011 | This record + linked test records |
| Regression preserves previous fixes | Regression Layer | T-RUN-012 | Test/result records |
| Historical evidence remains reversible | Canonical History | T-RUN-013 | Versioned records |
| Production acceptance is execution-based | Runtime Acceptance | T-RUN-014 | Device/runtime artifacts |

## Reverse Traversal Requirement

For every evidence item, the project must support:

Evidence ID
-> Test ID
-> Project Unit
-> Requirement ID
-> Source / Authority
-> Version / Commit / Device / Run as applicable

For every requirement, the reverse path must exist:

Requirement ID
-> Project Unit
-> Test ID
-> Evidence ID
-> Result
-> Exact execution identity

Orphan evidence and orphan requirements are defects in the traceability layer.

## Current Execution Order

1. Complete inventory and mappings.
2. Reconcile project details against inventory.
3. Verify traceability in both directions.
4. Run lower-level runtime tests.
5. Run failure/recovery and handoff/resume.
6. Run adversarial regression.
7. Run production/device acceptance.
8. Record final acceptance with exact execution identity.

End of record.
