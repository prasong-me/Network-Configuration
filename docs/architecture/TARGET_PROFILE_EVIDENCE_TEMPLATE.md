# Target Profile Evidence Intake & Reconciliation Template

## Status

- Document role: Evidence intake and reconciliation working template
- Phase F Contract Shape: HOLD
- Phase G Target Adapter Layer: LOCKED
- Contract v2.1: FROZEN
- Normative source status: NOT YET SUPPLIED
- Schema authority: NONE ESTABLISHED BY THIS TEMPLATE

## 1. Normative Source Intake

Use one intake record per source.

| Field | Value |
|---|---|
| Source ID | SRC-TP-XXX |
| Source name | |
| Source version / revision | |
| Publisher / authority | |
| Retrieval date | |
| Retrieval context | |
| Scope | |
| Authority basis | |
| Raw source reference | |
| Integrity / hash | |
| Source status | Pending / Accepted / Rejected |
| Notes | |

### Intake Rules

1. Preserve the source reference exactly as received.
2. Record version and retrieval context when available.
3. Do not infer authority, precedence, or semantics from naming alone.
4. Do not convert source material into a contract field at intake time.

---

## 2. Evidence Extraction

Use one evidence record for each independently traceable claim.

| Field | Value |
|---|---|
| Evidence ID | EVD-TP-XXX |
| Source ID | |
| Exact source location | |
| Subject | |
| Claim / observation | |
| Evidence type | Normative / Descriptive / Constraint / Mapping / Example / Unsupported |
| Confidence / status | Verified / Compatible / Proposal / Hypothesis / Pending / Conflict |
| Interpretation notes | |
| Extracted by | |
| Extraction date | |

### Evidence Rules

- Keep claims atomic where practical.
- Preserve exact source location so the claim can be re-verified.
- Separate what the source states from interpretation.
- Examples are not normative requirements unless the source explicitly makes them normative.
- Missing information remains missing; do not fill gaps by convention.

---

## 3. Field / Constraint Matrix

Do not treat this matrix as the Target Profile schema. It is an evidence-backed candidate inventory.

| Candidate ID | Concept / Path | Evidence IDs | Category | Source-stated requirement | Constraint | Status | Provenance | Notes |
|---|---|---|---|---|---|---|---|---|
| CAND-TP-XXX | | | Identity / Version / Capability / Constraint / Mapping / Unsupported Feature / Required Input / Serializer Reference / Adapter Reference / Validation Rule | | | Pending | | |

### Matrix Rules

1. Every candidate must trace to one or more evidence records.
2. A candidate without normative evidence cannot become an approved contract field.
3. Conflicting evidence must remain linked to all relevant evidence IDs.
4. Constraints must not be silently converted into implementation behavior.
5. Contract v2.1 remains unchanged unless a separately governed change process explicitly authorizes it.

---

## 4. Conflict Register

Record conflicts instead of collapsing them.

| Conflict ID | Evidence IDs | Affected concept / path | Conflict nature | Scope | Impact | Precedence explicitly defined? | Resolution state | Rationale / unresolved question |
|---|---|---|---|---|---|---|---|---|
| CON-TP-XXX | | | | | | Yes / No | Open / Reconciled / Accepted Unresolved | |

### Conflict Rules

- Do not select a winner unless source authority or an approved reconciliation decision establishes precedence.
- Preserve incompatible alternatives when reconciliation is not yet justified.
- An unresolved conflict blocks normative promotion of the affected concept.
- Conflict is information, not an error to be erased.

---

## 5. Reconciliation Record

Use one record per reconciled concept or conflict.

| Field | Value |
|---|---|
| Reconciliation ID | REC-TP-XXX |
| Related evidence IDs | |
| Related conflict IDs | |
| Affected concept / path | |
| Decision state | Verified / Compatible / Proposal / Hypothesis / Pending / Conflict |
| Source precedence basis | |
| Reconciled interpretation | |
| Remaining uncertainty | |
| Contract impact | None / Review Required |
| Protected-boundary impact | None / Review Required |
| Decision authority | |
| Decision date | |
| Approval reference | |

### Reconciliation Rules

- Reconciliation must be traceable to evidence.
- A Proposal or Hypothesis is not a normative contract decision.
- Any Contract v2.1 impact requires explicit governance outside this template.
- Protected boundaries cannot be changed through evidence reconciliation alone.

---

## 6. Phase F-Shape Gate Record

The gate is not passed by completion of documentation alone.

| Gate Criterion | Evidence / Reference | Result |
|---|---|---|
| Normative source identified | | PASS / HOLD |
| Evidence extracted and traceable | | PASS / HOLD |
| Candidate fields traceable to evidence | | PASS / HOLD |
| Conflicts reconciled or explicitly unresolved | | PASS / HOLD |
| Unsupported assumptions removed | | PASS / HOLD |
| Contract v2.1 unchanged | | PASS / HOLD |
| Protected boundaries unchanged | | PASS / HOLD |
| Normative baseline explicitly approved | | PASS / HOLD |

### Gate Decision

- Gate status: HOLD
- Decision reference:
- Decision authority:
- Decision date:
- Notes:

**Default rule:** The gate remains HOLD until every required criterion is supported by auditable evidence and the normative baseline is explicitly approved.

---

## 7. Evidence Package Index

When a normative source arrives, maintain a package index linking all artifacts.

| Artifact Type | Identifier / Path | Status |
|---|---|---|
| Normative Source | | |
| Evidence Extraction | | |
| Field / Constraint Matrix | | |
| Conflict Register | | |
| Reconciliation Record | | |
| Phase F-Shape Gate | | |

---

## 8. Handoff Rules

### Current state

- Evidence Preparation: ACTIVE
- Phase F Contract Shape: HOLD
- Phase G Target Adapter Layer: LOCKED

### Next permitted action

When a normative Target Profile source is supplied:

1. Create the Normative Source Intake record.
2. Extract traceable evidence.
3. Populate the Field / Constraint Matrix.
4. Register conflicts without collapsing them.
5. Reconcile only where source authority or explicit governance supports reconciliation.
6. Evaluate the Phase F-Shape Gate.
7. Only after an approved normative baseline may Target Profile contract work proceed.
8. Phase G remains locked until the Phase F-Shape Gate is passed.

**This template does not define the Target Profile schema and must not be used as evidence that a schema has been approved.**
