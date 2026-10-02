# Network Configuration — Safe Development Evidence Baseline

Date: 2026-10-03
Status: SOURCE/EVIDENCE COLLECTION — VERIFIED WHERE PRIMARY EVIDENCE EXISTS; OPEN ITEMS REMAIN SEPARATE
Scope: complete development and safe-operation evidence map for Network Configuration

## 1. Purpose

This record consolidates the evidence classes required to develop, validate, release and operate the Network Configuration project safely.

It does not declare the project complete. It does not promote unverified implementation/runtime evidence to READY or CLOSED.

## 2. Current project architecture

Canonical pipeline:

INPUT/SOURCE
→ NORMALIZATION/COMMON MODEL
→ SCHEMA/CONTRACT
→ RULE ENGINE
→ CONFLICT ENGINE
→ TARGET SELECTOR
→ TARGET PROFILE
→ COMPATIBILITY CHECK
→ ADAPTER
→ GENERATOR/SERIALIZER
→ VALIDATOR
→ TEST ENGINE
→ ARTIFACT
→ RELEASE

Invariant:

RAW → NORMALIZED → VALIDATED → COMPATIBLE → GENERATED → TESTED → RELEASED

Core control rules:

- Contract v2.1 is frozen.
- Existing components must be reused before creating new components.
- Adapters translate processed data and do not decide truth or create evidence.
- Serializers remain separate from adapters.
- Unsupported capability must fail closed rather than silently inventing a fallback.
- REQUIRED + UNKNOWN is a failure condition.
- Every implementation-relevant handoff carries target and version context.
- Tool success is never treated as correctness.

## 3. Safety domains that must be covered

### A. Core correctness
Required evidence:
- common model schema;
- Contract v2.1;
- normalization;
- semantic validation;
- conflict handling;
- target capability model;
- diagnostics;
- state/error lifecycle;
- deterministic processing.

Current evidence:
- Processing Layer previously recorded complete at core/validation test level.
- Contract v2.1 frozen.
- Registry mechanisms recorded.
Status: VERIFIED at the recorded implementation/test layers; broader project closure remains separate.

### B. Target adapters

Required target families:
- Apple Configuration Profile / mobileconfig;
- Android;
- WireGuard;
- DNS;
- VPN;
- Proxy;
- Routing/Rules;
- Web App;
- Shadowrocket;
- sing-box;
- FoxyProxy;
- Linux/PC where applicable.

Safety rule:
No target-specific field may be invented from a generic model. Target capability and version evidence must exist before implementation is promoted.

### C. Apple

Primary authoritative sources already established:
- Apple Configuration Profile Reference;
- Apple NetworkExtension documentation.

Important documented boundaries include:
- configuration-profile payload keys and availability;
- VPN type/subtype distinctions;
- DNS configuration fields;
- proxy configuration;
- On-Demand matching and routing behavior;
- NetworkExtension VPN/DNS/proxy APIs.

Security-sensitive areas requiring target-specific validation:
- profile signing/encryption where release requires it;
- certificate/identity handling;
- VPN server identity validation;
- proxy credentials;
- DNS proxy/provider identifiers;
- unsupported/OS-version-specific keys.

Current state:
Apple source/contract evidence exists. Runtime/device acceptance and release-specific signing evidence must remain distinct from source evidence.

### D. Android

Authoritative evidence already preserved:
- VpnService;
- ConnectivityManager / LinkProperties / NetworkCapabilities;
- DevicePolicyManager;
- Android 12/API 31 behavior changes;
- WebView/WebSettings;
- OnBackInvokedDispatcher.

Current project wrapper evidence:
- minSdk 31;
- compileSdk 35;
- targetSdk 35;
- Java 17;
- Kotlin 2.0.21;
- WebView-hosted web bundle.

Current state:
- source/build evidence: established;
- API 31 source compatibility for inspected wrapper surface: established;
- Android runtime/WebView interaction/export/permission/OS acceptance: OPEN/UNVERIFIED;
- prior runtime resource failure was recorded as exit code 137/SIGKILL; a replacement run was still non-terminal at the last recorded read.

Safety requirements:
- explicit permissions;
- WebView navigation restrictions;
- local asset boundary;
- no unsafe JavaScript bridge unless explicitly required and verified;
- secure handling of exported components;
- network security configuration review;
- runtime/OS compatibility tests;
- APK artifact verification.

### E. DNS

Normative source family:
- IETF DNS standards and relevant security/privacy specifications.

Required controls:
- validate IPv4/IPv6 syntax;
- distinguish resolver addresses from domain policy;
- prevent malformed/ambiguous routing rules;
- preserve split-DNS semantics;
- never silently replace unsupported DNS policy with a different policy;
- test timeout/failure/fallback behavior;
- record DNS capability by target/version;
- preserve privacy/security implications of DNS transport.

Current project evidence:
- DNS export testing recorded as passed/closed for the tested scenarios;
- fail-closed behavior uses UNSUPPORTED_CAPABILITY when advanced mapping is unavailable.

This is test evidence for the tested scope, not universal DNS interoperability evidence.

### F. VPN

Required controls:
- protocol-specific authoritative evidence;
- endpoint identity;
- authentication method;
- certificate/credential handling;
- route/include/exclude semantics;
- DNS behavior inside/outside tunnel;
- always-on/lockdown semantics where supported;
- kill-switch/fail-closed behavior where target supports it;
- reconnect and failure behavior;
- target/version capability matrix.

WireGuard source authority is established at source level; individual maintainer authority and target-specific implementation evidence remain separate.

### G. Proxy

Required controls:
- explicit proxy type;
- host/port validation;
- authentication secret handling;
- PAC URL validation;
- direct-fallback behavior;
- DNS resolution behavior;
- rule precedence;
- loop detection where relevant;
- unsupported proxy features must not silently degrade.

Apple evidence explicitly documents proxy fallback-related fields and semantics.

### H. Routing / Rules

Required controls:
- deterministic precedence;
- explicit conflict resolution;
- domain/IP/CIDR parsing;
- rule ordering;
- target-specific syntax conversion;
- no implicit fallback;
- regression tests for representative and adversarial rule sets.

Historical wizard test failure involving DOMAIN-SUFFIX syntax is retained as regression evidence and must not be silently normalized away.

### I. Web application

Required controls:
- strict input validation;
- output encoding;
- CSP and security headers;
- CSRF protections where applicable;
- authentication/authorization if stateful features are introduced;
- safe file generation/download behavior;
- no arbitrary remote URL fetching from user-controlled input unless explicitly required and protected;
- dependency vulnerability monitoring;
- secret isolation;
- production error handling without secret leakage;
- secure logging.

Next.js/Vercel official source authority is established at source level. Task/version-specific implementation evidence remains separate.

### J. Supply chain / CI/CD

Required controls:
- least-privilege GitHub Actions permissions;
- pinned/reproducible dependencies where practical;
- secret isolation;
- OIDC only for narrowly scoped trust;
- artifact provenance;
- immutable release evidence;
- dependency review;
- build/test separation;
- security scanning;
- branch/review protections;
- CODEOWNERS where applicable.

Existing project evidence:
- GitHub Actions permission/OIDC controls documented;
- tool execution architecture documented;
- CI successes are treated as build/test evidence, not automatic correctness.

### K. Serialization / artifact integrity

Required controls:
- schema validation before serialization;
- deterministic serialization;
- encoding correctness;
- XML/JSON structural validation;
- artifact hash/provenance;
- target-specific parser validation;
- no hidden/default fields;
- no credentials in logs/artifacts;
- release artifact linked to exact source and test evidence.

### L. Secrets / credentials

Never place secrets in:
- source code;
- configuration templates committed to Git;
- test fixtures unless deliberately synthetic;
- logs;
- generated evidence snapshots;
- client-side bundles;
- public artifacts.

Required secret lifecycle:
SOURCE → SECRET STORE → AUTHORIZED BUILD/RUNTIME USE → REDACTED LOGGING → ROTATION/REVOCATION

Credentials must be classified by target and capability.

### M. Privacy

Required controls:
- data minimization;
- explicit purpose for telemetry;
- no unnecessary network metadata collection;
- redaction;
- retention limits;
- user-controlled export;
- clear provenance for external data.

### N. Diagnostics and error handling

Minimum diagnostic contract:
WHAT, WHERE, WHY, SOURCE, IMPACT, RECOVERY

Error lifecycle:
ERROR → Record → Root Cause → Side Effect → Fix → Verify → Evidence → Update State → Continue

Security failures must fail closed where a permissive fallback could change the intended network policy.

## 4. Verification/readiness layers

V0 UNVERIFIED
V1 SOURCE-IDENTIFIED
V2 VERIFIED-SOURCE
V3 VERIFIED-ROLE
V4 IMPLEMENTATION-READY
V5 VERIFIED-IMPLEMENTATION
V6 RELEASE-READY
V7 CLOSED

Promotion must be evidence-driven.

Forbidden:
- tool success → READY;
- URL-only → VERIFIED-SOURCE;
- generated code → VERIFIED-IMPLEMENTATION;
- test execution success → CLOSED.

Independent axes:
SOURCE_STATUS
ROLE_STATUS
NORMATIVE_STATUS
TARGET_VERSION_STATUS
DEPENDENCY_STATUS
IMPLEMENTATION_STATUS
VALIDATION_STATUS
RELEASE_STATUS
CLOSURE_STATUS

## 5. Current evidence classes

### Verified source families
- GitHub governance/platform;
- Apple Configuration Profiles / NetworkExtension;
- Android networking/WebView/management APIs;
- WireGuard;
- sing-box project source;
- Shadowrocket developer identity only;
- FoxyProxy project source;
- IETF DNS/proxy/routing standards;
- Next.js/Vercel;
- OpenAI/MCP/tool execution controls.

These are V2 source-level classifications unless a stronger task-specific record exists.

### Verified implementation/test areas already recorded
- Contract v2.1;
- Processing Layer;
- serializer registry;
- target profile registry mechanism;
- selected DNS/export scenarios;
- CI/build evidence;
- Android APK structural artifact evidence.

### Open or blocked safety-critical areas
- Android API 31 runtime and WebView interaction;
- Android physical/runtime acceptance;
- complete permission behavior;
- target/version interoperability beyond inspected scope;
- release-stage Apple signing/encryption where required;
- complete security testing of the web application;
- dependency/supply-chain security verification for release;
- end-to-end release provenance;
- any component whose current normative target/version evidence is not yet recorded.

## 6. Safety acceptance gate

A component may be considered implementation-ready only when:
1. authoritative source is identified and verified;
2. target and version are explicit;
3. required role/authority is established or the task does not require named authority;
4. contract/dependency/protected boundaries are checked;
5. unsupported behavior is explicit;
6. validation and failure semantics are defined;
7. security/privacy impact is assessed;
8. implementation evidence exists;
9. target-specific tests pass;
10. artifact/provenance evidence is recorded.

Release-ready additionally requires:
- regression evidence;
- compatibility evidence;
- security review/testing appropriate to the component;
- artifact integrity;
- release controls;
- rollback/revocation plan where applicable.

## 7. External research limitation

A current official-source search was attempted for the expanded security/development evidence set. One broad official-source search returned substantial Apple/IETF material, but subsequent targeted searches encountered a Firecrawl HTTP 429 rate limit.

Therefore:
- no claim is made that every external source was freshly re-fetched in this node;
- existing project-stored primary-source evidence remains the basis for previously verified claims;
- rate-limited topics remain OPEN for a later evidence-collection node rather than being guessed.

## 8. Roadmap control

This document is an evidence/research artifact only.

No Project Roadmap, Contract v2.1, protected boundary, or existing historical evidence is changed by this record.

## 9. Evidence Registry

| ID | Node | Claim | Source | Source Type | Verification Date | Result | Status |
|---|---|---|---|---|---|---|---|
| SAFEDEV-001 | Safe development baseline | Project requires separate evidence layers from source through closure | Existing project control / readiness registry | Project control | 2026-10-03 | Baseline recorded | VERIFIED-DESIGN |
| SAFEDEV-002 | Apple safety | Apple configuration/VPN/DNS/proxy capabilities must follow documented target-specific keys and availability | Apple Configuration Profile Reference / NetworkExtension | Official Apple | 2026-10-03 | Source evidence available | VERIFIED-SOURCE |
| SAFEDEV-003 | Android safety | Android networking, VPN, WebView and management capabilities are API/role/version bounded | Official Android documentation + stored project evidence | Official Android / Project evidence | 2026-10-03 | Boundaries recorded | VERIFIED-SOURCE |
| SAFEDEV-004 | DNS safety | DNS behavior must preserve standards-based semantics and fail closed on unsupported target mapping | IETF evidence + project DNS tests | Standards / Project evidence | 2026-10-03 | Scope recorded | VERIFIED-SOURCE |
| SAFEDEV-005 | Tool safety | Tool execution and output verification are separate control boundaries | Tool Semantic Compatibility Baseline / Tool Control Evidence | Project control | 2026-10-03 | Control verified | VERIFIED-DESIGN |
| SAFEDEV-006 | Android runtime gate | Android API 31 runtime remains open after resource-kill failure and non-terminal replacement run | GitHub Actions project evidence | CI execution evidence | 2026-10-03 | Runtime not yet verified | OPEN-RUNTIME |
| SAFEDEV-007 | Artifact safety | APK structural inspection proves artifact existence/content but not device/runtime acceptance | Project CI artifact evidence | CI/artifact evidence | 2026-10-03 | Boundary recorded | VERIFIED-SOURCE |
| SAFEDEV-008 | Supply-chain safety | CI permissions, OIDC, provenance and least privilege must remain separate release controls | GitHub/tool-control evidence | Official GitHub / Project control | 2026-10-03 | Control scope recorded | VERIFIED-SOURCE |
| SAFEDEV-009 | Readiness | V2 source verification must not promote a component to V4 implementation-ready without task-specific gates | Engineering Role Registry | Project control | 2026-10-03 | Promotion rule recorded | VERIFIED-DESIGN |
| SAFEDEV-010 | Research limitation | Rate-limited fresh searches must remain explicit rather than being replaced with inferred evidence | Current execution record | Runtime evidence | 2026-10-03 | Limitation recorded | VERIFIED-DESIGN |
