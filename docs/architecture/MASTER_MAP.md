# Master Project Map

> Architecture baseline for the Network-Configuration project.
>
> Status: **Architecture Baseline / Contract v2.1 frozen**
>
> This document defines the system map and boundaries. It is not an implementation specification for any individual target adapter.

## 1. Architectural Center

The project is organized around three stable abstractions:

1. **Common Configuration Model** — target-neutral representation of configuration intent.
2. **Target Capability Model** — describes what a target supports, rejects, constrains, or requires.
3. **Adapter Architecture** — translates the common model into a target-specific representation without coupling the Core to target implementation details.

The Core therefore does not treat iOS, WireGuard, Proxy, DNS, or any other target as the architectural center.

## 2. Master Pipeline

```text
INPUT / SOURCE
      ↓
NORMALIZATION / COMMON MODEL
      ↓
SCHEMA / CONTRACT
      ↓
RULE ENGINE
      ↓
CONFLICT ENGINE
      ↓
TARGET SELECTOR
      ↓
TARGET PROFILE
(Capability / Constraint / Mapping / Version)
      ↓
COMPATIBILITY CHECK
      ↓
ADAPTER
      ↓
GENERATOR / SERIALIZER
      ↓
VALIDATOR
      ↓
TEST ENGINE
      ↓
ARTIFACT
      ↓
RELEASE
```

### Pipeline invariant

Data must not bypass a required stage.

```text
RAW
 → NORMALIZED
 → VALIDATED
 → COMPATIBLE
 → GENERATED
 → TESTED
 → RELEASED
```

Each transition must have a defined contract and an observable diagnostic result.

## 3. Repository Map

```text
Network-Configuration/
│
├── README.md
├── CHANGELOG.md
├── SECURITY.md
├── CONTRIBUTING.md
├── LICENSE
├── .gitignore
│
├── core/
│   ├── model/
│   ├── schema/
│   ├── validation/
│   └── contracts/
│
├── config/
│   ├── defaults/
│   ├── environments/
│   └── profiles/
│
├── rules/
│   ├── dns/
│   ├── routing/
│   ├── proxy/
│   ├── vpn/
│   └── domains/
│
├── targets/
│   ├── ios/                 # Reserved target-definition boundary; Apple Adapter remains protected
│   ├── wireguard/
│   ├── proxy/
│   └── ...
│
├── adapters/
│   ├── ios/                 # Protected; intentionally not implemented
│   ├── wireguard/
│   ├── proxy/
│   └── ...
│
├── profiles/
│   ├── source/
│   ├── templates/
│   └── external/
│
├── generators/
│   ├── mobileconfig/
│   ├── dns/
│   ├── vpn/
│   └── proxy/
│
├── validators/
│   ├── schema/
│   ├── plist/
│   ├── mobileconfig/
│   ├── network/
│   └── compatibility/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── compatibility/
│   ├── fixtures/
│   └── expected/
│
├── tools/
│   ├── inspect/
│   ├── convert/
│   ├── generate/
│   └── validate/
│
├── docs/
│   ├── architecture/
│   ├── protocols/
│   ├── targets/
│   ├── testing/
│   └── decisions/
│
├── scripts/
│   ├── build/
│   ├── test/
│   ├── validate/
│   └── release/
│
└── .github/
    ├── workflows/
    └── ISSUE_TEMPLATE/
```

## 4. Component Responsibilities

| Component | Responsibility | Must not own |
|---|---|---|
| Common Model | Target-neutral configuration intent | Target-specific serialization |
| Schema / Contract | Shape, types, invariants, version compatibility | Runtime behavior |
| Rule Engine | Deterministic configuration rules | Target encoding |
| Conflict Engine | Detect and preserve meaningful conflicts | Silent conflict collapse |
| Target Selector | Select applicable targets | Target implementation details |
| Target Profile | Capability, constraints, mappings, versions, provenance | Core business logic |
| Adapter | Translate Common Model → Target Model | Global configuration policy |
| Generator / Serializer | Produce target artifact | Undocumented semantic changes |
| Validator | Validate structure and compatibility | Silent mutation |
| Test Engine | Unit, integration, compatibility, regression | Production configuration |
| Artifact | Tested generated output | Source-of-truth policy |

## 5. Target Profile Model

Every target should be representable without requiring the Core to know its implementation.

Conceptually:

```text
Target Profile
├── identity
├── version
├── capabilities
├── constraints
├── mappings
├── unsupported features
├── required fields
├── serializer / adapter reference
├── validation rules
└── provenance / source metadata
```

A target profile is descriptive data. The adapter is executable translation logic.

## 6. Adapter Boundary

The intended boundary is:

```text
Common Configuration Model
          │
          ▼
    Target Profile
          │
          ▼
       Adapter
          │
          ▼
 Target Representation
          │
          ▼
 Generator / Serializer
```

Adding a new target should normally require a new Target Profile and Adapter rather than modification of Core semantics.

## 7. Conflict Model

Conflict is information.

The system must not silently erase contradictory inputs merely to obtain a single output.

A conflict record should retain, where applicable:

- conflicting values
- affected field/path
- source of each value
- rule or precedence involved
- target impact
- resolution state
- resolution rationale

The Conflict Engine therefore participates in the data pipeline instead of being treated as an exceptional afterthought.

## 8. Diagnostic Contract

Errors and warnings should be structured around:

```text
WHAT
WHERE
WHY
SOURCE
IMPACT
RECOVERY
```

This is the minimum diagnostic model for actionable failures.

Diagnostics should distinguish at least:

- schema failure
- normalization failure
- rule conflict
- target incompatibility
- adapter failure
- serialization failure
- artifact validation failure
- test/regression failure

## 9. Validation Layers

Validation is layered rather than represented by one final check:

```text
Input Validation
      ↓
Schema Validation
      ↓
Semantic / Rule Validation
      ↓
Target Compatibility Validation
      ↓
Serialization Validation
      ↓
Artifact Validation
      ↓
Regression / Compatibility Tests
```

A syntactically valid artifact is not automatically semantically compatible with its target.

## 10. Testing Architecture

```text
CODE / CONFIG
     │
     ├── Unit Tests
     ├── Integration Tests
     ├── Schema Tests
     ├── Compatibility Tests
     ├── Regression Tests
     └── Target Tests
             ↓
        Release Gate
```

Release artifacts must be traceable to the validation and test results that produced them.

For the current Core Model and Validation Layer, the repository has independent primary and backup execution paths:

1. `npm test` — complete Core + Validation gate
2. `npm run test:core` — Core Model suite
3. `npm run test:validation` — Schema / Contract Validation suite
4. `npm run test:direct` — standalone Core backup runner
5. `npm run test:validation:direct` — standalone Validation backup runner

GitHub Actions runs the complete gate plus the standalone Core backup runner. The 26-item Test Matrix remains a separate pending source and has not been inferred or reconstructed.

## 11. Protected / Out-of-Scope Areas

The implementation must preserve the established protection boundary:

- **Apple Adapter** — locked; no implementation added or modified.
- **DNS Runtime** — locked; no runtime implementation added or modified.
- **PR #15** — preserve as a protected work item/reference; do not alter or absorb its changes.

If the current repository does not contain one of these items, its exact source-of-truth location must be verified before any related implementation change.

## 12. Contract Baseline

**Contract v2.1 is now frozen as the authoritative export-boundary baseline.**

Frozen source:

`core/contracts/contract-v2.1.d.ts`

Reconciliation record:

`docs/architecture/CONTRACT_V2_1_RECONCILIATION.md`

The contract was imported from the authoritative baseline supplied for this phase. No additional contract fields, enum values, output formats, or invariants were inferred from architecture documents.

The frozen baseline contains:

- `ContractVersion`
- `ProcessingStatus`
- `DiagnosticReport`
- `CompileResult`
- `OUTPUT_FORMATS` / `OutputFormat`
- `SerializerRegistryEntry`
- 3 explicitly declared core invariants

A separate 26-item Test Matrix was referenced during handoff but was not included in the authoritative source supplied for this phase. It remains a test-source dependency and is not reconstructed by inference.

## 13. Change-Control Rules

Before changing Core semantics:

1. identify the affected contract;
2. identify dependent profiles/adapters/generators;
3. evaluate backward compatibility;
4. update tests/fixtures;
5. record the architectural decision;
6. only then implement.

Target-specific changes must remain isolated from Core unless the change is genuinely target-neutral.

## 14. Implementation Order

The implementation sequence is:

```text
A. Architecture Documentation
        ↓
B. Repository Scaffolding
        ↓
C. Core Model
        ↓
D. Schema / Contract Validation
        ↓
E. Serializer Registry
        ↓
F. Target Profile / Capability Registry
        ↓
G. Adapter Layer
        ↓
H. Generators
        ↓
I. Validators
        ↓
J. Test / Compatibility Harness
        ↓
K. Release Pipeline
```

No target-specific implementation should be used to define the Common Model retroactively. The Common Model and contracts are established first.

## 15. Source-of-Truth Policy

The repository is the implementation source of truth once a decision has been frozen into the project.

Until then, architecture discussion may contain:

- **Verified** — confirmed by repository/source evidence.
- **Proposal** — agreed design direction not yet implemented.
- **Hypothesis** — requires validation.
- **Pending** — required information is missing.
- **Conflict** — sources disagree and must be reconciled.

The status of a component must never be inferred solely from memory.

## 16. Current Baseline State

The repository has passed the structural scaffolding, Contract v2.1 reconciliation, and initial Core Model runtime implementation phases.

Current state:

- Repository Scaffolding: **COMPLETE**
- Structural Integrity Audit: **PASS**
- Protected Boundary Check: **PASS**
- Contract v2.1 Authoritative Source: **PROVIDED**
- Contract v2.1 Field Reconciliation: **PASS**
- Contract v2.1 Freeze / Import: **COMPLETE**
- Core Model State Engine: **IMPLEMENTED**
- Core Model CompileResult Builder: **IMPLEMENTED**
- Core Model invariant tests: **IMPLEMENTED**
- Primary + backup test runners: **IMPLEMENTED**
- GitHub Actions Core Model and Validation test workflow: **IMPLEMENTED**
- Schema / Contract Validation Layer: **IMPLEMENTED**
- DiagnosticReport Factory: **IMPLEMENTED**
- Input Schema Validator: **IMPLEMENTED**
- Contract Validator tests: **IMPLEMENTED**
- 26-item Test Matrix Source: **PENDING**
- Schema / Contract Validation: **IMPLEMENTED**
- Serializer Registry: **IMPLEMENTED**
- Target Profile Contract Shape: **HOLD / PENDING NORMATIVE SOURCE**
- Target Profile Registry Mechanism: **IMPLEMENTED**
- Runtime validation: **NOT STARTED**
- Target-specific Target Profile semantics: **NOT STARTED / BLOCKED BY MISSING NORMATIVE SOURCE**

### Core Model invariants implemented

1. Processing flow permits `IDLE → PROCESSING → SUCCESS / FAILED`.
2. An unhandled processing failure escalates to `BLOCKED`.
3. `CompileResult` always owns `representation`; runtime verification uses `Object.hasOwn()`.
4. `metadata.contractVersion` is fixed to `'2.1'`.
5. `timestamp`, `targetId`, and `checksum` are required.
6. Core Model contains no Apple Adapter or DNS Runtime dependency.

Checksum generation remains deliberately unspecified because Contract v2.1 does not define a checksum algorithm; the current builder records a caller-supplied checksum rather than inventing a normative algorithm.

### Test verification

The implementation was executed locally against an equivalent reconstructed test harness because the execution environment cannot reach GitHub's network endpoint. The verification run completed with:

- 8/8 smoke/invariant tests passed
- 0 failed
- 0 skipped
- the same suite passed twice through the direct Node test runner

This local verification is evidence of runtime behavior of the committed implementation, but it is not claimed as a GitHub Actions run. The repository workflow is configured to execute the authoritative committed suite on GitHub.

Controlled transition:

```text
Structural Integrity Audit       PASS
        ↓
Contract v2.1 Reconciliation    PASS
        ↓
Contract Freeze / Import        COMPLETE
        ↓
Core Model                      IMPLEMENTED
        ↓
Core Model Tests                IMPLEMENTED
        ↓
Schema / Contract Validation    IMPLEMENTED
        ↓
Serializer Registry              IMPLEMENTED
        ↓
Target Profile Registry Mechanism    IMPLEMENTED
        ↓
Target Profile Contract Shape        HOLD / PENDING NORMATIVE SOURCE
        ↓
Phase G Adapter Layer                LOCKED / BLOCKED BY PHASE F SHAPE
```

See `docs/architecture/STRUCTURAL_AUDIT.md` and `docs/architecture/CONTRACT_V2_1_RECONCILIATION.md` for the audit and reconciliation records.


### Serializer Registry Phase E

The Serializer Registry is implemented as a pure mechanism layer.

Implemented source:
- `core/registry/serializer-registry.mjs`
- `tests/unit/serializer-registry.test.mjs`

The registry:
- validates `SerializerRegistryEntry` through `validateSerializerEntry()` before registration;
- stores metadata/reference entries only;
- supports lookup by `serializerId`;
- supports format lookup with an explicit `includeDeprecated` mechanism option;
- exposes registration presence and current size;
- does not execute generators, serializers, adapters, or artifact creation.

The frozen Contract v2.1 remains the normative shape source. Duplicate handling, version-selection policy, and other registry policies are intentionally not inferred from the contract.

The complete test gate now includes the Serializer Registry unit suite via `npm run test:registry`. GitHub Actions is configured to include `core/registry/**` and execute the expanded `npm test` gate. CI remains **CONFIGURED** until an actual GitHub Actions runner result is observed.


### Phase F Gate Baseline — Target Profile Registry

The Phase F boundary is explicitly split between an unresolved Contract Shape and an approved mechanism.

**Target Profile Contract Shape: HOLD / PENDING NORMATIVE SOURCE**

No Target Profile interface, schema, field set, capability semantics, matching rule, default target, duplicate policy, version-selection policy, or compatibility policy is declared from architecture inference alone.

**Target Profile Registry Mechanism: APPROVED / BOUNDARY LOCKED**

Implemented source:
- `core/registry/target-profile-registry.mjs`
- `tests/unit/target-profile-registry.test.mjs`

The mechanism is intentionally schema-independent. It:
- stores an opaque profile value under a caller-supplied `targetId` registry key;
- supports lookup by that key;
- supports presence checks and enumeration;
- does not validate or infer Target Profile fields;
- does not define matching or selection algorithms;
- does not define default-target behavior;
- does not define a normative duplicate policy;
- does not execute adapters, generators, serializers, or artifact creation.

The use of `targetId` here is a registry lookup key only. It must not be interpreted as establishing `targetId` as a Target Profile Contract field.

Protected boundaries remain untouched:
- Apple Adapter
- DNS Runtime
- PR #15

CI remains evidence-driven: workflow configuration is not equivalent to a passed runner result.

## 17. Repository Housekeeping / Export Surface

The Core registry implementations expose a centralized public API without extending or modifying Contract v2.1 semantics.

### Public export surfaces

- `core/registry/index.mjs` — registry barrel export index.
- `core/index.mjs` — Core public entry point re-exporting the registry barrel.
- Exported registry mechanisms:
  - `SerializerRegistry`
  - `TargetProfileRegistry`

These exports are composition-only. They do not introduce Contract v2.1 fields, enum values, invariants, duplicate policies, matching rules, or target-specific semantics.

### Verified repository evidence

| Item | Evidence |
|---|---|
| Contract baseline | `core/contracts/contract-v2.1.d.ts` — frozen |
| Phase F mechanism baseline | `7102aa21d8490ff29a08f0d065ad1ac8ee7b35df` |
| Registry barrel commit | `5fbf90bef148a53fc14770cc6cd8e1dacafff52a` |
| Core public API commit | `dc2d7fba873d1806ac1b533a2b2c8b37ef56303b` |
| Master Map synchronization commit | `89cbf33c5a8c838d98f75273b3aeeab257da4458` |
| Latest CI head SHA | `5fbf90bef148a53fc14770cc6cd8e1dacafff52a` |
| Latest CI | Run #12 — completed / success |

### CI verification

- Historical Run #12: completed / success — retained as historical evidence.
- Current repository head: `11190d6181f8883e66338cefc75dd14767858532`.
- Current CI Run #33: completed / success.
- GitHub Actions run ID: `36649970862`.
- Validation job: `109681594314` — completed / success.
- Verified steps: Checkout, Setup Node.js 20, complete `npm test` gate, and Core Model backup runner all completed successfully.

The current Run #33 result is the latest CI evidence for the JSON_RAW test-gate commit. Runtime interoperability remains a separate evidence layer.

## 18. Current Gate State

- Contract v2.1: **FROZEN**
- Phase E Serializer Registry: **IMPLEMENTED / VERIFIED**
- Phase F Registry Mechanism: **IMPLEMENTED / VERIFIED**
- Phase F Contract Shape: **HOLD / PENDING NORMATIVE SOURCE**
- Task 1 — Registry Barrel Export: **COMPLETE**
- Task 1 Extension — Core Public API: **COMPLETE**
- Task 3 — Master Map Synchronization: **COMPLETE**
- Apple MobileConfig Adapter Layer: **LOCKED**
- DNS Runtime Subsystem: **LOCKED**
- PR #15 Integration Boundary: **LOCKED**
- Phase G Target Adapter Layer: **LOCKED / BLOCKED BY PHASE F SHAPE**

### Next Allowed Gate

The next implementation gate is **Phase F-Shape / Target Profile Contract Shape**, but only after a normative source is supplied and reconciled. No Phase G adapter implementation is authorized before that gate passes.


## 19. Research Evidence Handoff — 2026-09-30

The official-source research baseline has been completed in the research workstream and reconciled into an implementation handoff. This handoff does **not** itself authorize a Target Profile Contract Shape or Phase G adapter implementation.

### Evidence now available for Phase F-Shape reconciliation

- WireGuard — official protocol/configuration/platform evidence collected.
- Surge 5 — official API/CLI/auth/deploy evidence collected.
- ProxyPin — official repository/wiki/release/App Store capability evidence collected.
- Mihomo core — official configuration, DNS, routing, proxy-group, and provider evidence collected.
- Clash Mi — official App Store/site identity and Mihomo-based capability evidence collected; client behavior remains separate from core behavior.
- Clash Lite — official App Store identity/capability evidence collected; detailed API evidence remains pending.
- Rocket Proxy — official repository/App Store evidence collected; YAML compatibility is not treated as proof of a shared engine.
- Clash Live — identity remains unresolved and is not substituted with another client.

### Reconciliation rules carried into implementation

1. Common semantics may be promoted only where semantics are stable and target mappings are explicit.
2. Target-specific behavior remains inside Target Profiles / Adapters.
3. UNKNOWN is not a fallback.
4. Required capability + UNKNOWN blocks compilation according to Contract v2.1 semantics.
5. No target mapping for an advanced required capability returns UNSUPPORTED_CAPABILITY rather than an invented representation.
6. Format compatibility does not imply shared implementation.
7. Documentation/source evidence does not become runtime verification automatically.
8. Secrets and user-specific credentials remain outside public evidence/config fixtures.

### Current gate disposition

**Phase F-Shape remains HOLD.** The research evidence is now available as source material for reconciliation, but the project still does not have an authoritative project-level Target Profile Contract Shape. Therefore no Target Profile schema, field set, matching policy, duplicate policy, version-selection policy, or Phase G adapter implementation is inferred or introduced from the research alone.

### Research/runtime boundary

The research baseline closes the reference/evidence collection work. Runtime gaps remain explicit and are not promoted to verified status:

- Apple physical-device installation/runtime evidence
- Apple entitlement/account approval evidence
- Android runtime evidence
- Windows CSP/MDM runtime evidence
- Linux multi-backend runtime evidence

This section is a project-state synchronization record only; it does not change the frozen Contract v2.1 or protected Apple Adapter / DNS Runtime / PR #15 boundaries.

## 20. Continuous Work Execution Protocol

This is the operational rule for continuing implementation without inventing blocked work.

### 20.1 Work-unit rule

Work is executed **one target / one concrete work unit at a time**.

    READ CURRENT STATE
          ↓
    IDENTIFY NEXT ALLOWED WORK
          ↓
    CHECK DEPENDENCIES / PROTECTED BOUNDARIES
          ↓
    IMPLEMENT ONLY IF ALLOWED
          ↓
    VERIFY IMMEDIATELY
          ↓
    IF BLOCKED → RECORD BLOCK + SKIP
          ↓
    MOVE TO NEXT ALLOWED WORK UNIT
          ↓
    RECONCILE RESULT
          ↓
    UPDATE ROADMAP / MASTER MAP
          ↓
    UPDATE MASTER DATABASE / EVIDENCE SOURCE
          ↓
    READ-BACK VERIFICATION
          ↓
    CONTINUE

### 20.2 Block-and-skip rule

A work unit is **BLOCKED** when its required normative source, contract shape, protected dependency, runtime capability, or other mandatory prerequisite is unavailable.

When blocked:
1. Do not invent fields, mappings, defaults, compatibility rules, or implementation behavior.
2. Record the exact blocker and affected work unit.
3. Mark the work unit BLOCKED, PENDING, UNKNOWN, or RUNTIME_UNVERIFIED as appropriate.
4. Skip that work unit.
5. Continue to the next independent work unit that is currently allowed.
6. Revisit the blocked unit only when its prerequisite becomes available.

A blocked unit must never stall unrelated work.

### 20.3 Completion rule

A work unit is not called complete merely because code exists.

Completion requires:
- implementation or documented result exists;
- immediate verification was performed;
- protected boundaries remain intact;
- no unsupported semantics were introduced;
- evidence/status is recorded;
- Roadmap/Plan is reconciled;
- Master Database/evidence record is reconciled;
- repository read-back confirms the committed state.

### 20.4 Failure rule

If verification fails:

    FAIL
     ↓
    DIAGNOSE
     ↓
    FIX IF WITHIN AUTHORIZED SCOPE
     ↓
    VERIFY AGAIN

If the failure depends on a blocked prerequisite:

    FAIL → BLOCKED → RECORD → SKIP → NEXT WORK UNIT

No failure is converted into PASS by omission.

### 20.5 Repository write rule

New verified information must be merged into the existing authoritative record where that record is designated as the Master Database/evidence source.

The write sequence is:

    READ OLD
     → MERGE NEW
     → PRESERVE OLD
     → WRITE SAME AUTHORITATIVE FILE
     → READ BACK
     → VERIFY

Do not create a parallel database merely to avoid reconciling the existing one.

### 20.6 Status vocabulary

Use only evidence-backed states:
- COMPLETE
- IMPLEMENTED
- VERIFIED
- PARTIAL
- PENDING
- BLOCKED
- UNKNOWN
- RUNTIME_UNVERIFIED
- UNSUPPORTED_CAPABILITY
- LOCKED

UNKNOWN is never a fallback representation.

### 20.7 Final handoff rule

Do not return a progress report after every trivial sub-step.

Continue through all currently allowed work units, skipping only genuinely blocked units, and return a consolidated handoff containing:
1. completed work;
2. skipped/blocked work and exact reason;
3. verification evidence;
4. Roadmap/Plan reconciliation;
5. Master Database/evidence reconciliation;
6. latest repository snapshot;
7. the next allowed gate.

This protocol does not override Contract v2.1, protected boundaries, or normative-source requirements.

## 21. Project Extension Intake Queue

Additional projects are tracked as **non-normative intake** and may be added incrementally without reopening the closed DNS + Apple MobileConfig baseline.

Current intake set:

- WireGuard — evidence available; integration awaits approved Target Profile shape.
- Mihomo — configuration/DNS/routing/provider evidence available; integration awaits approved shape.
- Clash Mi — identity and Mihomo-based capability evidence available; client behavior remains separate from core behavior.
- Clash Lite — identity/capability evidence available; detailed API remains PENDING.
- ProxyPin — capability evidence available; target serialization is not inferred.
- Surge 5 — API/auth/deploy evidence available; credentials remain schema-only and secrets are excluded.
- Rocket Proxy — evidence available; shared YAML engine is not inferred.
- Clash Live — identity unresolved; remains BLOCKED and is not substituted.

Intake records are maintained in docs/architecture/PROJECT_EXTENSION_INTAKE.md.

This queue does not define Target Profile fields, modify Contract v2.1, unlock Phase G, or reopen the closed DNS + Apple MobileConfig implementation.
