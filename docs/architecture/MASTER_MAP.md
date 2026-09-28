# Master Project Map

> Architecture baseline for the Network-Configuration project.
>
> Status: **Architecture Baseline / Contract v2.1 reference**
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
│   ├── ios/                 # Reserved; intentionally absent while Apple Adapter is protected
│   ├── wireguard/
│   ├── proxy/
│   └── ...
│
├── adapters/
│   ├── ios/
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

## 11. Protected / Out-of-Scope Areas

The initial implementation must preserve the previously established protection boundary:

- **Apple Adapter** — do not modify during scaffolding/baseline documentation.
- **DNS Runtime** — do not modify during scaffolding/baseline documentation.
- **PR #15** — preserve as an existing protected work item/reference; do not alter or absorb its changes during this phase.

If the current repository does not contain one of these items, its exact source-of-truth location must be verified before any related implementation change.

## 12. Contract Baseline

The project currently treats **Contract v2.1** as the architectural baseline referenced by the project plan.

Important distinction:

- This document records the architectural dependency on that baseline.
- It does **not** invent or redefine Contract v2.1 fields.
- The authoritative Contract v2.1 specification must be linked or imported before implementation code is written against fields not yet present in the repository.

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

The repository has now passed the structural scaffolding phase. The directory structure is represented by structural placeholders where appropriate; this does **not** mean the corresponding implementation exists.

Current state:

- Repository Scaffolding: **COMPLETE**
- Protected Boundary Check: **PASS**
- Contract v2.1 Source-of-Truth: **PENDING**
- Core Model implementation: **NOT STARTED**
- Runtime validation: **NOT STARTED**

The authoritative Contract v2.1 specification has not been located in the repository. Until that source is verified, no Contract v2.1 fields or invariants may be invented from this architecture document.

The next controlled phase is therefore:

```text
Structural Integrity Audit
        ↓
Contract v2.1 Source Reconciliation
        ↓
Contract Freeze / Import
        ↓
Core Model
        ↓
Schema / Contract Validation
```

See `docs/architecture/STRUCTURAL_AUDIT.md` for the verified audit result.
