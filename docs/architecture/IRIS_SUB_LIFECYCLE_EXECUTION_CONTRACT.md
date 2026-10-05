# IRIS Sub-Lifecycle Execution Contract

Status: ACTIVE OPERATIONAL CONTRACT
Scope: execution routing and failure-pattern capture only
Governance: unchanged
Date: 2026-10-05

## 1. Purpose

The Main Lifecycle must not lose its execution context when work moves from planning/checking into real implementation, runtime, failure recovery, or verification.

Every selected work unit is routed into exactly one active Sub-Lifecycle before execution.

A Sub-Lifecycle is the operational container for:
- the work unit being executed;
- its fixed entry and exit conditions;
- state/transition history;
- failure patterns;
- recovery;
- regression;
- evidence;
- handoff back to the parent lifecycle.

A new Sub-Lifecycle is created only when no existing Sub-Lifecycle owns the discovered execution boundary or failure pattern.

## 2. Fixed Entry Contract

A Sub-Lifecycle may enter RUNNING only when all Entry conditions are recorded:

1. SUB_LIFECYCLE_ID exists.
2. PARENT_LIFECYCLE_ID exists.
3. WORK_UNIT_ID is exactly one unit.
4. ENTRY_TARGET is stated as one verifiable target.
5. CURRENT_STATE is known.
6. DEPENDENCIES are known or explicitly marked external-blocked.
7. REQUIRED_EVIDENCE is defined.
8. EXIT_TARGET is defined.
9. RECOVERY_PATH is defined.
10. HANDOFF_TARGET is defined.

Entry failure => PENDING or BLOCKED. It must not enter RUNNING by assumption.

## 3. Fixed State Set

Allowed Sub-Lifecycle states:

PENDING
RUNNING
BLOCKED
RECOVERING
VERIFYING
COMPLETED
FAILED

No implicit state is allowed.

## 4. Fixed Transition Contract

Allowed transitions:

PENDING -> RUNNING
PENDING -> BLOCKED
RUNNING -> BLOCKED
RUNNING -> RECOVERING
RUNNING -> VERIFYING
RUNNING -> FAILED
BLOCKED -> RUNNING
BLOCKED -> RECOVERING
RECOVERING -> VERIFYING
RECOVERING -> FAILED
VERIFYING -> RUNNING
VERIFYING -> RECOVERING
VERIFYING -> COMPLETED
VERIFYING -> FAILED

COMPLETED and FAILED are terminal.

A transition must record:
- previous state;
- next state;
- trigger;
- evidence;
- decision;
- timestamp/round identity where available.

No direct transition may skip the required verification state when verification is applicable.

## 5. Execution Loop

For each round:

CREATE/SIMULATE
-> DETECT
-> VERIFY
-> ANALYZE
-> IDENTIFY GAP/FAILURE
-> CORRECT
-> VERIFY CORRECTION
-> REGRESSION
-> CREATE/UPDATE TEST CASE
-> NEXT ROUND

Every round must produce a result and evidence, or an explicit blocked record.

## 6. Fixed Failure Pattern Record

When a material failure is detected, record it inside the active Sub-Lifecycle before continuing:

FAILURE_ID
SUB_LIFECYCLE_ID
WORK_UNIT_ID
ROUND_ID
TRIGGER/CONTEXT
INTENDED
ACTUAL
FIRST_FAILURE_BOUNDARY
OBSERVED_SYMPTOM
EVIDENCE
CANDIDATE_CAUSES
ROOT_CAUSE
IMPACT
CORRECTION
RECOVERY
VERIFICATION
REGRESSION
PREVENTION
STATUS
NEXT_ACTION
HANDOFF

ROOT_CAUSE may be CONFIRMED, REFUTED, PLAUSIBLE, or UNKNOWN. PLAUSIBLE/UNKNOWN must not be represented as confirmed.

## 7. Existing-vs-New Sub-Lifecycle Rule

When a failure appears:

1. Resolve the owning Sub-Lifecycle.
2. If an existing Sub-Lifecycle owns the same execution boundary, append the new Failure Pattern there.
3. If no existing Sub-Lifecycle owns it, create a new Sub-Lifecycle.
4. The first failure encountered in a new Sub-Lifecycle becomes its initial Failure Pattern record.
5. Do not create a separate Sub-Lifecycle merely because a different defect occurred inside an already-owned boundary.

This preserves one operational home for a failure class without creating unnecessary lifecycle fragmentation.

## 8. Fixed Exit Contract

A Sub-Lifecycle may exit only through one of two terminal outcomes:

### COMPLETED

All applicable conditions are true:
- EXIT_TARGET achieved;
- implementation/result read back;
- verification passed;
- failure/recovery obligations closed;
- regression passed;
- required evidence stored and readable;
- forward traceability complete;
- reverse traceability complete;
- HANDOFF_RECORD created.

### FAILED

The target cannot be achieved with available capability, or a terminal failure is explicitly proven.

FAILED must include:
- exact failure boundary;
- evidence;
- unresolved dependency or cause;
- recovery attempts;
- reason recovery cannot continue;
- next owner/action if work can later resume.

A checkpoint or ordinary interruption is never an exit.

## 9. Recovery Contract

BLOCKED/FAILED work must not disappear.

Recovery must preserve:
- last verified state;
- last verified evidence;
- failure IDs;
- attempted corrections;
- unresolved dependencies;
- next executable action;
- exit condition.

Resume starts from the last verified checkpoint, not from memory or a guessed state.

## 10. Handoff Contract

On terminal completion:

Sub-Lifecycle
-> RESULT
-> EVIDENCE
-> TEST/REGRESSION
-> PARENT_LIFECYCLE

The parent lifecycle may consume only the verified result.

A Sub-Lifecycle must never cause the parent lifecycle to treat:
- execution as verification;
- historical PASS as current PASS;
- partial evidence as PASS;
- plausible cause as confirmed;
- blocked work as complete.

## 11. Mandatory Operational Record

Each Sub-Lifecycle round must be reconstructable as:

PARENT_LIFECYCLE_ID
SUB_LIFECYCLE_ID
WORK_UNIT_ID
ENTRY_TARGET
STATE
TRANSITION
ACTION
OBSERVATION
FAILURE_ID (if applicable)
EVIDENCE
CORRECTION (if applicable)
VERIFICATION
REGRESSION
EXIT_TARGET
HANDOFF
RESULT

## 12. Parent/Child Continuity Rule

The Main Lifecycle owns sequencing and mission completion.

The Sub-Lifecycle owns execution detail and failure-pattern continuity.

Therefore:

MAIN
-> SELECT WORK UNIT
-> RESOLVE SUB-LIFECYCLE
-> ENTER
-> EXECUTE
-> CAPTURE FAILURE PATTERN
-> RECOVER/CORRECT
-> VERIFY
-> REGRESSION
-> EXIT
-> HANDOFF
-> MAIN SELECTS NEXT UNIT

The execution context must never be discarded when moving between these levels.

## 14. Knowledge Acquisition Gate

The Sub-Lifecycle must not enter IMPLEMENTATION when a material technical knowledge gap can change the implementation, test, evidence, security, compatibility, or runtime decision.

Before implementation, resolve the knowledge set for the selected work unit:

SOURCE/AUTHORITY
-> FACT
-> APPLICABILITY
-> VERSION/DATE
-> DEPENDENCY
-> IMPLEMENTATION IMPACT
-> TEST REQUIREMENT
-> EVIDENCE REQUIREMENT
-> CONTRADICTION/UNKNOWN
-> KNOWLEDGE STATUS

The knowledge record must be linked to the Sub-Lifecycle and Work Unit. External research is performed only for missing decision-relevant knowledge; it is not repeated when an applicable verified record already exists.

Knowledge states:
- VERIFIED-SOURCE
- VERIFIED-PROJECT
- HISTORICAL
- SUPERSEDED
- OPEN
- UNKNOWN
- CONFLICTED

OPEN/UNKNOWN/CONFLICTED knowledge that is material to the target blocks implementation of that dependent unit. Independent units may continue.

## 15. Reusable Knowledge Record

Every material research finding used by a Sub-Lifecycle must have a reusable record containing:

KNOWLEDGE_ID
DOMAIN
TOPIC
SOURCE_ID
SOURCE/AUTHORITY
SOURCE_TYPE
FACT
APPLICABILITY
TARGET
VERSION/DATE
DEPENDENCY
IMPLEMENTATION_IMPACT
TEST_REQUIREMENT
EVIDENCE_REQUIREMENT
CONTRADICTION/UNKNOWN
STATUS
VERIFICATION_DATE
RELATED_SUB_LIFECYCLE_ID
RELATED_WORK_UNIT_ID
RELATED_EVIDENCE_ID
SUPERSEDES/SUPERSEDED_BY (when applicable)

The record is knowledge, not a conclusion. It must not be promoted to VERIFIED merely because it was retrieved.

## 16. Knowledge Reuse / Research Suppression Rule

At Sub-Lifecycle entry, search the Central Project Database/evidence records for an applicable verified knowledge record before external research.

If an applicable verified record exists:
- reuse it;
- verify current-state applicability when the fact is time/version sensitive;
- do not perform duplicate external research merely to repeat the same fact.

If no applicable record exists:
- perform targeted authoritative research;
- reconcile it against existing records;
- persist the result before implementation;
- continue into implementation only after the material knowledge gate is closed or explicitly classified as non-blocking.

If new evidence contradicts stored knowledge:
- preserve the old record as historical;
- create/update the new evidence record;
- mark the superseded relationship explicitly;
- reopen dependent work if the contradiction changes the decision.

## 17. Full Operational Chain

The complete execution path is therefore:

CENTRAL DATABASE / CURRENT STATE
-> RESOLVE WORK UNIT
-> RESOLVE EXISTING SUB-LIFECYCLE
-> KNOWLEDGE GATE
-> ENTRY GATE
-> EXECUTE
-> DETECT
-> VERIFY
-> FAILURE PATTERN (if applicable)
-> ANALYZE
-> CORRECT / RECOVER
-> VERIFY CORRECTION
-> REGRESSION
-> UPDATE TEST / EVIDENCE
-> EXIT GATE
-> HANDOFF
-> UPDATE CENTRAL DATABASE
-> MAIN LIFECYCLE

The external web/research layer is a **gap-filling input to the Knowledge Gate**, not the normal working memory of the project.

Once a material fact has been verified and persisted in the Central Database/evidence system, subsequent Sub-Lifecycles must use that stored record as their first knowledge source and only go outside again when the stored record is absent, stale, contradicted, or explicitly requires current external verification.

## 18. Non-Goals

This contract does not:
- redefine Governance;
- change frozen system contracts;
- invent target capability;
- convert unknowns into supported behavior;
- declare project completion.

It only makes the already-required lifecycle execution, knowledge acquisition/reuse, failure/recovery chain, and evidence continuity operational and reconstructable.
