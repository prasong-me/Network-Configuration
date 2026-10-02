# Engineering Role Registry — 2026-10-03

Status: OPERATIONAL TAXONOMY — EVIDENCE-BOUND / NO PERSON INFERENCE

## Purpose

This registry defines the engineering-role dimensions that the Network Configuration Workspace can use for routing work, ownership, review, verification, release, evidence and incident handling.

Important boundary:
- A role category is not proof that a named person holds that role.
- A project may assign a role only when repository, organization, project, or primary-source evidence supports the assignment.
- Tool output is not itself proof of engineering authority.
- Historical evidence is immutable; new verification is appended as a new record.

## Role taxonomy

### A. Authority and governance
1. PLATFORM_AUTHORITY — authority over a platform/API specification.
2. PROJECT_AUTHORITY — authority over a project/product's official implementation.
3. STANDARD_AUTHORITY — authority defined by a standards body or normative specification.
4. MAINTAINER — person/team responsible for maintaining a project or repository.
5. PROJECT_OWNER — operational owner of a project scope.
6. ARCHITECT — responsible for system architecture and protected boundaries.
7. CODE_OWNER — person/team responsible for specific repository paths.
8. REVIEWER — performs technical review before integration.
9. CONTRIBUTOR — supplies implementation changes without implied ownership.

### B. Software engineering
10. SOFTWARE_ENGINEER — implements software behavior.
11. BACKEND_ENGINEER — server/core/data-service implementation.
12. FRONTEND_ENGINEER — UI/client implementation.
13. FULLSTACK_ENGINEER — end-to-end application implementation.
14. MOBILE_ENGINEER — Android/iOS client implementation.
15. PLATFORM_ENGINEER — platform/runtime integration.
16. SDK_API_ENGINEER — SDK/API integration and contract handling.
17. INTEGRATION_ENGINEER — cross-component integration.
18. ADAPTER_ENGINEER — target-specific adapter implementation.
19. SERIALIZATION_ENGINEER — artifact encoding/serialization.
20. VALIDATION_ENGINEER — schema/semantic/compatibility validation.
21. RULE_ENGINEER — rules and policy processing.
22. COMPATIBILITY_ENGINEER — version/target compatibility.
23. DEPENDENCY_ENGINEER — dependency and supply-chain compatibility.

### C. Infrastructure and operations
24. DEVOPS_ENGINEER — build/release/deployment automation.
25. CI_ENGINEER — continuous-integration workflows and gates.
26. BUILD_ENGINEER — reproducible build/package systems.
27. RELEASE_ENGINEER — release artifact and promotion controls.
28. SRE_ENGINEER — reliability, observability and operational resilience.
29. INFRASTRUCTURE_ENGINEER — compute/network/storage infrastructure.
30. NETWORK_ENGINEER — network topology, routing, DNS, VPN and transport.
31. SECURITY_ENGINEER — security controls, threat boundaries and hardening.
32. PRIVACY_ENGINEER — privacy/data-minimization controls.
33. INCIDENT_ENGINEER — incident/error lifecycle and recovery.
34. PERFORMANCE_ENGINEER — performance/resource-budget analysis.

### D. Quality and evidence
35. QA_ENGINEER — functional and regression verification.
36. TEST_ENGINEER — automated/manual test design and execution.
37. RUNTIME_ENGINEER — runtime interoperability and environment verification.
38. COMPATIBILITY_TEST_ENGINEER — target/OS/version matrix testing.
39. ARTIFACT_VALIDATION_ENGINEER — generated-artifact validation.
40. EVIDENCE_ENGINEER — evidence collection, traceability and provenance.
41. DATA_QUALITY_ENGINEER — data integrity, freshness, grain and consistency.
42. DOCUMENTATION_ENGINEER — technical documentation and source traceability.
43. COMPLIANCE_ENGINEER — policy/control requirements and audit evidence.

### E. Domain-specialist roles used by this project
44. APPLE_CONFIGURATION_ENGINEER — Apple Configuration Profile / mobileconfig domain.
45. ANDROID_NETWORK_ENGINEER — Android VpnService, WebView and managed-network domain.
46. DNS_ENGINEER — DNS model, resolver/proxy behavior and DNS evidence.
47. VPN_ENGINEER — VPN transport/tunnel integration.
48. PROXY_ENGINEER — proxy protocol and rule integration.
49. ROUTING_ENGINEER — routing/rule precedence and conflict behavior.
50. WEB_APP_ENGINEER — web application and browser-runtime integration.
51. AI_TOOLING_ENGINEER — AI/tool/MCP execution contracts and runtime controls.
52. WORKSPACE_AUTOMATION_ENGINEER — workspace automation and action routing.

## Project-specific routing model

Work must be routed by capability, not by job title alone:

Task → Capability → Required Role(s) → Evidence/Authority Check → Execute → Verify → Record → State Update

Examples:
- Contract change → ARCHITECT + VALIDATION_ENGINEER + REVIEWER.
- Apple profile change → APPLE_CONFIGURATION_ENGINEER + SERIALIZATION_ENGINEER + ARTIFACT_VALIDATION_ENGINEER.
- Android runtime change → ANDROID_NETWORK_ENGINEER + MOBILE_ENGINEER + RUNTIME_ENGINEER + TEST_ENGINEER.
- DNS change → DNS_ENGINEER + NETWORK_ENGINEER + RULE_ENGINEER + VALIDATION_ENGINEER.
- CI/runtime failure → CI_ENGINEER + BUILD_ENGINEER + INCIDENT_ENGINEER + RUNTIME_ENGINEER.
- New official source → EVIDENCE_ENGINEER + DOCUMENTATION_ENGINEER + relevant DOMAIN role.
- Release decision → RELEASE_ENGINEER + CODE_OWNER/MAINTAINER + required reviewer evidence.

## Authority evidence rules

The following are evidence-backed controls:
- GitHub CODEOWNERS identifies people or teams responsible for specific files/directories and can automatically request their review.
- Required code-owner approval can be enforced when repository settings enable required reviews.
- Therefore CODEOWNER is a repository governance signal, not proof of universal platform authority.
- Platform/specification authority must come from the platform owner or normative standards source.
- Individual engineering authority must not be inferred from commit count, username, social profile, community reputation, or tool output alone.

Official source:
- https://docs.github.com/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
- https://docs.github.com/pull-requests/reference/pull-request-reviews

## Current mapping to Network Configuration

Primary authority map:
docs/research/DEVELOPER_ENGINEERING_AUTHORITY_MAP_2026-10-03.md

This registry does not replace that authority map. It provides the role vocabulary used to classify and route work.

Protected boundaries remain unchanged:
- Contract v2.1
- Apple MobileConfig Adapter
- DNS Runtime
- PR #15 boundary
- target-specific adapter implementation boundary

## Evidence Registry

| ID | Node | Claim | Source | Source Type | Verification Date | Result | Status |
|---|---|---|---|---|---|---|---|
| ENGROLE-001 | Engineering role taxonomy | The project can classify work using the role dimensions in this registry without assigning a person to a role | Project governance design | Project control | 2026-10-03 | Taxonomy recorded | VERIFIED-DESIGN |
| ENGROLE-002 | Code ownership | GitHub CODEOWNERS identifies people/teams responsible for specific files/directories and can trigger review requests | https://docs.github.com/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners | Official GitHub | 2026-10-03 | Code-owner mechanism documented | VERIFIED-SOURCE |
| ENGROLE-003 | Required review | GitHub documents pull-request reviews and code-owner review behavior | https://docs.github.com/pull-requests/reference/pull-request-reviews | Official GitHub | 2026-10-03 | Review mechanism documented | VERIFIED-SOURCE |

## Open evidence classes

The following remain OPEN until primary evidence establishes them:
- named individual engineers for each project component;
- current maintainer hierarchy for components where official governance is not published;
- project-specific CODEOWNERS assignments unless read from the repository;
- workspace-specific role assignments;
- authority that exceeds the scope of the source that established it.

## Control rule

No named engineer is promoted to AUTHORITATIVE solely because the person:
- appears in a commit;
- is listed as a contributor;
- is mentioned in community material;
- is returned by a search engine;
- is associated with a company;
- is associated with a tool.

A named role requires a primary-source record with scope and verification date.

## Verification / Readiness tier model

The Workspace must separate what is known, what is verified, and what is ready for implementation. These states must never be collapsed.

### Tier V0 — UNVERIFIED
Search result, community statement, inference, or unverified attribution. Research lead only. MUST NOT be normative implementation authority.

### Tier V1 — SOURCE-IDENTIFIED
A primary source has been located and identity/scope is known, but the specific claim has not yet been fully checked. Research routing only.

### Tier V2 — VERIFIED-SOURCE
Primary source inspected and the specific claim directly supported. Source type, verification date, scope and result recorded. May be used as evidence.

### Tier V3 — VERIFIED-ROLE
A specific person/team/organization has a directly supported role. Identity + role + scope + effective context established. May be used for responsibility routing.

### Tier V4 — IMPLEMENTATION-READY
Required authority/role evidence exists; applicable normative specification is verified; target/version is identified; dependencies and protected boundaries are checked; required contract/evidence records exist; no unresolved blocker prevents the intended implementation.

### Tier V5 — VERIFIED-IMPLEMENTATION
V4 was executed; output passed required validation layers; target/version/evidence match was verified; repository artifact and evidence were recorded.

### Tier V6 — RELEASE-READY
V5 is complete; release artifact, regression/compatibility evidence, provenance and release controls are verified.

### Tier V7 — CLOSED
Verify → Record → Update Database → Reconcile → Repository → Verify Repository → Closure has completed and closure evidence exists.

### Promotion rules

Allowed: V0 → V1 → V2 → V3 → V4 → V5 → V6 → V7.

A tier may be skipped only when its condition is genuinely not applicable and the evidence explicitly explains why.

Forbidden:
- V0 → READY
- V1 → READY
- tool success → READY
- contributor/commit → VERIFIED-ROLE
- URL-only reference → VERIFIED-SOURCE
- generated code → VERIFIED-IMPLEMENTATION
- test execution success → CLOSED

### Independent status axes

Workspace records should maintain:
SOURCE_STATUS, ROLE_STATUS, NORMATIVE_STATUS, TARGET_VERSION_STATUS, DEPENDENCY_STATUS, IMPLEMENTATION_STATUS, VALIDATION_STATUS, RELEASE_STATUS, CLOSURE_STATUS.

A strong result on one axis must not promote the whole record.

## Current engineering authority classification

| Domain | Authority/Source | Current tier | Usable for | Open |
|---|---|---|---|---|
| GitHub | Official GitHub documentation/platform | V2 VERIFIED-SOURCE | Repository governance, CODEOWNERS/review controls | Named engineer authority |
| Apple mobileconfig | Apple Configuration Profile Reference | V2 VERIFIED-SOURCE | Configuration Profile contract/reference | Named Apple engineer authority |
| Android | Official Android API documentation | V2 VERIFIED-SOURCE | VpnService/WebView API constraints | Named Android engineer authority |
| WireGuard | Official WireGuard project documentation | V2 VERIFIED-SOURCE | Protocol/repository reference | Individual maintainer-role evidence |
| sing-box | Official SagerNet/sing-box documentation/repository | V2 VERIFIED-SOURCE | Configuration/platform reference | Current named role hierarchy |
| Shadowrocket | Apple App Store developer listing | V2 VERIFIED-SOURCE | Developer identity | Public API/spec authority and named engineer roles |
| FoxyProxy | Official project GitHub organization/repositories | V2 VERIFIED-SOURCE | Project/repository reference | Maintainer hierarchy |
| DNS/IETF | IETF RFCs | V2 VERIFIED-SOURCE | Normative DNS/proxy standards | Individual engineering authority |
| Next.js/Vercel | Official Next.js/Vercel documentation | V2 VERIFIED-SOURCE | Framework/platform reference | Named individual role |
| OpenAI/MCP | Official OpenAI documentation | V2 VERIFIED-SOURCE | ChatGPT/MCP platform behavior | Named individual engineer authority |

The domains above are NOT marked READY. V2 means source claims are verified. Implementation readiness requires task-specific target/version, dependency, contract and evidence gates.

## Evidence Registry extension

| ID | Node | Claim | Source | Source Type | Verification Date | Result | Status |
|---|---|---|---|---|---|---|---|
| ENGROLE-004 | Verification tiers | Workspace needs independent tiers from unverified source through closure | Project control + execution contract | Project control | 2026-10-03 | Tier model recorded | VERIFIED-DESIGN |
| ENGROLE-005 | Promotion control | Tool success, URL-only evidence, contributor status and test execution cannot independently promote a record to READY/CLOSED | Existing project control baseline | Project control | 2026-10-03 | Promotion rules recorded | VERIFIED-DESIGN |
| ENGROLE-006 | Authority classification | Current 10 authority domains are V2 VERIFIED-SOURCE while named individual roles remain open unless primary evidence establishes them | Authority map + official sources | Evidence synthesis | 2026-10-03 | Classified without overclaiming | VERIFIED-DESIGN |

## Additional engineering record dimensions

To make the registry usable by the Workspace without mixing evidence types, each named engineer/team/organization record should be capable of storing these independent dimensions.

### Identity
- ENTITY_ID
- ENTITY_TYPE: PERSON | TEAM | ORGANIZATION | PROJECT | MAINTAINER_GROUP
- DISPLAY_NAME
- OFFICIAL_IDENTIFIER
- OFFICIAL_PROFILE_URL
- SOURCE_ID

### Role
- ROLE_ID
- ROLE_NAME
- ROLE_SCOPE
- COMPONENT_SCOPE
- REPOSITORY_SCOPE
- PLATFORM_SCOPE
- START_DATE if officially documented
- END_DATE if officially documented
- CURRENT_STATUS

### Authority
- AUTHORITY_TYPE: PLATFORM | PROJECT | REPOSITORY | PATH | STANDARD | REVIEW | RELEASE | OPERATIONAL
- AUTHORITY_LEVEL
- AUTHORITY_SCOPE
- AUTHORITY_SOURCE
- AUTHORITY_EVIDENCE_ID
- LIMITATIONS

### Technical responsibility
- COMPONENT
- CAPABILITY
- API_OR_SPEC
- TARGET
- VERSION
- DEPENDENCY
- PROTECTED_BOUNDARY
- REQUIRED_REVIEW_ROLE

### Evidence and provenance
- EVIDENCE_ID
- SOURCE_TYPE
- SOURCE_URL_OR_REFERENCE
- SOURCE_VERSION
- PUBLISHED_AT if known
- RETRIEVED_AT
- VERIFIED_AT
- VERIFICATION_METHOD
- CLAIM
- RESULT
- STATUS
- SUPERSEDES / SUPERSEDED_BY
- PROVENANCE_RECORD

### Operational status
- SOURCE_STATUS
- ROLE_STATUS
- NORMATIVE_STATUS
- TARGET_VERSION_STATUS
- DEPENDENCY_STATUS
- IMPLEMENTATION_STATUS
- VALIDATION_STATUS
- RELEASE_STATUS
- CLOSURE_STATUS

### Security / trust boundary
- TRUST_LEVEL
- AUTHORIZATION_SCOPE
- CREDENTIAL_REQUIRED: YES | NO | UNKNOWN
- SENSITIVE_DATA_ACCESS: YES | NO | UNKNOWN
- WRITE_ACCESS: YES | NO | UNKNOWN
- RELEASE_ACCESS: YES | NO | UNKNOWN

These fields are a data model for evidence-bound records. They do not create authority merely by being populated.

## Record separation rules

The Workspace must keep these as separate record types:

1. ENGINEER_IDENTITY
2. ENGINEER_ROLE
3. ENGINEER_AUTHORITY
4. ENGINEER_CAPABILITY
5. ENGINEER_EVIDENCE
6. ENGINEER_ASSIGNMENT
7. ENGINEER_STATUS
8. ENGINEER_HISTORY
9. ENGINEER_RELATION
10. ENGINEER_SECURITY_SCOPE

One record must not overwrite another record type.

Example relationship:

ENTITY → ROLE → AUTHORITY → COMPONENT → TARGET/VERSION → EVIDENCE → VERIFICATION → STATUS

## Negative evidence / unresolved data

The Workspace should also record what is NOT established:

- identity not verified;
- role not verified;
- authority scope unknown;
- current employment/affiliation not established;
- maintainer hierarchy not published;
- public API/specification not available;
- target/version compatibility not verified;
- dependency ownership unknown.

These are explicit states, not empty fields and not assumptions.

## Conflict handling

When two sources disagree:
- preserve both source records;
- create a CONFLICT record;
- identify the exact conflicting claim/field;
- record source authority and dates;
- do not silently select one source;
- create a reconciliation record;
- only promote the resolved claim when the reconciliation has adequate evidence.

## Evidence Registry extension

| ID | Node | Claim | Source | Source Type | Verification Date | Result | Status |
|---|---|---|---|---|---|---|---|
| ENGROLE-007 | Engineering record schema | Identity, role, authority, capability, evidence, status and security scope must remain independently addressable | Project control | Project control | 2026-10-03 | Schema dimensions recorded | VERIFIED-DESIGN |
| ENGROLE-008 | Record separation | Engineering identity, role, authority, evidence and status must not overwrite one another | Project governance | Project control | 2026-10-03 | Separation rule recorded | VERIFIED-DESIGN |
| ENGROLE-009 | Negative evidence | Unknown/unverified authority and role conditions must be represented explicitly rather than inferred | Project evidence rules | Project control | 2026-10-03 | Negative-state model recorded | VERIFIED-DESIGN |
| ENGROLE-010 | Conflict handling | Conflicting source claims must be preserved and reconciled rather than silently overwritten | Project evidence rules | Project control | 2026-10-03 | Conflict rule recorded | VERIFIED-DESIGN |
