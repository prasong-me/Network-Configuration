# Target Profile Evidence Package — Traceability Specification

## Status

- Evidence Preparation: ACTIVE
- Traceability Infrastructure: ACTIVE
- Contract v2.1: FROZEN
- Phase F Contract Shape: HOLD
- Phase G Target Adapter Layer: LOCKED
- Normative source: NOT YET SUPPLIED
- Schema authority: NONE ESTABLISHED BY THIS SPECIFICATION

## 1. Traceability Chain

Every future Target Profile evidence package must preserve this chain:

```
Normative Source
      ↓
Evidence
      ↓
Candidate / Constraint
      ↓
Conflict
      ↓
Reconciliation
      ↓
Phase F-Shape Gate
```

A downstream record must never become normative merely because an upstream record exists. Each transition requires its own evidence and status.

## 2. Artifact Identity

Each artifact receives a stable identifier.

| Artifact | Identifier Pattern | Required Link |
|---|---|---|
| Normative Source | SRC-TP-XXX | Source origin |
| Evidence | EVD-TP-XXX | Source ID |
| Candidate / Constraint | CAND-TP-XXX | Evidence ID(s) |
| Conflict | CON-TP-XXX | Evidence ID(s) |
| Reconciliation | REC-TP-XXX | Evidence and/or Conflict ID(s) |
| Gate Record | GATE-TP-XXX | Reconciliation / evidence package |

Identifiers must not be reused for a different semantic record.

## 3. Source → Evidence

Required relationship:

`EVD.source_id → SRC.source_id`

Minimum traceability requirements:

- Every evidence item identifies its source.
- Every claim records an exact source location when available.
- Retrieval/version context is retained.
- Interpretation is separated from the source-stated claim.
- A source without extracted evidence remains an intake artifact, not a validated basis for contract design.

## 4. Evidence → Candidate / Constraint

Required relationship:

`CAND.evidence_ids[] → EVD.evidence_id`

Rules:

- Every candidate or constraint must cite supporting evidence.
- A candidate with no evidence remains non-normative.
- Multiple evidence items may support one candidate.
- Contradictory evidence must not be discarded; link all relevant evidence.

## 5. Candidate / Constraint → Conflict

Required relationship when disagreement exists:

`CON.evidence_ids[] → EVD.evidence_id`

The conflict record should identify the affected candidate/concept and preserve competing evidence.

A conflict is not resolved by deleting one candidate or evidence item.

## 6. Conflict → Reconciliation

Required relationship:

`REC.conflict_ids[] → CON.conflict_id`

A reconciliation record must document:

- affected concept/path
- evidence considered
- source precedence basis, if explicitly defined
- resulting interpretation
- remaining uncertainty
- contract impact
- protected-boundary impact
- decision authority
- approval reference

If no legitimate reconciliation basis exists, the record remains unresolved.

## 7. Reconciliation → Phase F-Shape Gate

Required relationship:

`GATE.reconciliation_ids[] → REC.reconciliation_id`

The gate must evaluate the complete evidence package, not only the proposed field list.

Minimum gate conditions remain:

1. Normative source identified.
2. Evidence extracted and traceable.
3. Candidate fields traceable.
4. Conflicts reconciled or explicitly unresolved.
5. Unsupported assumptions removed.
6. Contract v2.1 unchanged unless separately governed.
7. Protected boundaries unchanged.
8. Normative baseline explicitly approved.

A failed or incomplete condition keeps the gate at HOLD.

## 8. Package Index

A package should expose a machine-readable inventory conceptually equivalent to:

| Type | IDs | Status |
|---|---|---|
| Sources | SRC-TP-* | |
| Evidence | EVD-TP-* | |
| Candidates / Constraints | CAND-TP-* | |
| Conflicts | CON-TP-* | |
| Reconciliations | REC-TP-* | |
| Gate Records | GATE-TP-* | |

The package index is an inventory, not a substitute for the underlying evidence.

## 9. Traceability Integrity Rules

The following are mandatory:

- No orphan normative claim may enter the candidate matrix.
- No candidate may become normative without traceable evidence.
- No conflict may be silently collapsed.
- No reconciliation may invent source authority.
- No gate PASS may be inferred from missing records.
- No traceability artifact may modify Contract v2.1.
- No traceability artifact may unlock Phase G.
- Missing evidence remains missing.

## 10. Status Semantics

The following statuses retain their established meaning:

- **Verified** — directly supported by authoritative evidence.
- **Compatible** — supported without contradiction but not itself sufficient to establish normative authority.
- **Proposal** — an explicit candidate requiring approval.
- **Hypothesis** — an interpretation requiring validation.
- **Pending** — insufficient evidence or decision authority.
- **Conflict** — materially incompatible evidence or unresolved interpretation.

Status must describe evidence state, not implementation confidence.

## 11. Audit Review Procedure

For any proposed Phase F-Shape decision, reviewers should be able to traverse backward:

```
Gate
 ↓
Reconciliation
 ↓
Conflict / Candidate
 ↓
Evidence
 ↓
Normative Source
```

If any link cannot be followed, the affected decision remains non-normative until the traceability gap is resolved.

## 12. Current Gate

This specification does not constitute a Phase F-Shape approval.

Current state:

- Phase F Contract Shape: HOLD
- Phase G Target Adapter Layer: LOCKED

**No Target Profile schema is defined by this document.**
