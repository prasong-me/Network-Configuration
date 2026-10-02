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
