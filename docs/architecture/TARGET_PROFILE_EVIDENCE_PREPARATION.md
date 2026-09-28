# Target Profile Evidence Preparation

> Status: **PREPARATION READY / PHASE F-SHAPE HOLD**
>
> Contract v2.1 remains frozen. This document defines the evidence workflow only; it does not declare a Target Profile contract.

## Purpose

Prepare a deterministic intake and reconciliation path for a future normative Target Profile source without inferring missing schema semantics.

## Evidence Pipeline

```
NORMATIVE SOURCE INTAKE
        ↓
EVIDENCE EXTRACTION
        ↓
FIELD / CONSTRAINT MATRIX
        ↓
CONFLICT REGISTER
        ↓
RECONCILIATION RECORD
        ↓
PHASE F-SHAPE GATE
```

## 1. Normative Source Intake

For each supplied source, record:

| Item | Required evidence |
|---|---|
| Source identity | Name, version/revision, origin |
| Retrieval context | Date/context supplied |
| Scope | Target, platform, version, feature area |
| Authority basis | Why the source is considered normative/candidate-normative |
| Raw source reference | File, URL, document section, or supplied artifact |
| Integrity | Hash or repository evidence when available |
| Status | Candidate / Accepted / Rejected / Superseded |

A source is **not** normative merely because it describes the desired architecture.

## 2. Evidence Extraction

Extract only claims directly supported by the source.

Each extracted item should contain:

- evidence ID
- source reference
- exact location within source
- subject
- claim
- evidence type
- confidence/status
- interpretation notes

No inferred field, enum, default, matching rule, or compatibility behavior may be promoted to normative evidence without source support.

## 3. Field / Constraint Matrix

The matrix will classify discovered target-profile information without prematurely turning it into Contract v2.1:

| Evidence ID | Candidate element | Category | Required? | Constraint | Source | Status |
|---|---|---|---|---|---|---|
| pending | pending | pending | pending | pending | pending | pending |

Allowed categories include:

- identity
- version
- capability
- constraint
- mapping
- unsupported feature
- required input
- serializer/adapter reference
- validation rule
- provenance

These categories are analytical classifications, not a declaration that the eventual contract must contain identically named fields.

## 4. Conflict Register

Conflicts are preserved as information.

For every disagreement, record:

- conflict ID
- evidence items involved
- affected concept/path
- source precedence, if explicitly defined
- nature of conflict
- target/version scope
- impact
- resolution state
- resolution rationale
- decision authority

No conflict may be silently collapsed merely to produce a cleaner schema.

## 5. Reconciliation Record

Reconciliation must distinguish:

- **Verified** — directly supported by authoritative evidence.
- **Compatible** — supported by multiple non-conflicting sources.
- **Proposal** — design proposal awaiting approval.
- **Hypothesis** — requires further evidence.
- **Pending** — required evidence is absent.
- **Conflict** — authoritative or relevant sources disagree.

The reconciliation record must explicitly identify any information that remains unresolved.

## 6. Phase F-Shape Gate

Phase F-Shape may advance only when:

1. the normative source is identified;
2. relevant evidence has been extracted;
3. candidate fields/constraints are traceable to evidence;
4. conflicts have been recorded and reconciled or explicitly left unresolved;
5. unsupported assumptions are removed;
6. the proposed Target Profile shape does not silently modify Contract v2.1;
7. protected boundaries remain untouched;
8. the resulting proposal is explicitly approved as the next normative baseline.

Until all applicable conditions are satisfied:

```
Phase F Contract Shape = HOLD
Phase G Adapter Layer  = LOCKED
```

## 7. Protected Boundaries

This preparation work must not modify:

- Contract v2.1 frozen semantics
- Apple MobileConfig Adapter Layer
- DNS Runtime Subsystem
- PR #15 integration boundary
- Target-specific adapter implementation

## 8. Next Handoff

When a normative Target Profile source is supplied, begin at **Normative Source Intake** and generate the evidence matrix before proposing any contract shape.

No schema is created by this preparation document.
