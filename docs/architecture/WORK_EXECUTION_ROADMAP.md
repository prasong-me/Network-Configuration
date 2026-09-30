# Mandatory Work Execution Roadmap

## Operating rule

Every implementation session must begin with a roadmap. Work is executed strictly one work unit at a time. One command/action is issued for one unit, the result is recorded, and only then may the next unit begin.

## Required sequence

1. READ — read the latest repository state and the authoritative reference database relevant to the work unit.
2. ROADMAP — define the ordered work units before changing files.
3. SELECT ONE — choose exactly one currently allowed work unit.
4. CHECK GATES — verify dependencies, protected boundaries, evidence, and authorization.
5. IMPLEMENT — change only the selected unit.
6. READ-BACK — read the changed file(s) immediately after writing.
7. VERIFY — run the smallest appropriate verification for that unit.
8. ERROR RECORD — if anything is wrong, record WHAT HAPPENED, ROOT CAUSE, IMPACT, CORRECTION, VERIFICATION, and PREVENTION RULE.
9. ROUND RECORD — record the unit result, evidence, changed files, and unresolved blockers.
10. NEXT UNIT — only after the previous unit is complete/verified or explicitly blocked, select the next unit.
11. FINAL SUMMARY — after all allowed units are completed, provide a concise completion summary and the latest repository snapshot.

## One-at-a-time constraint

- Never combine unrelated work units into one implementation step.
- Never report a later unit as complete before its own verification.
- Never run parallel repository mutations for separate units.
- If a unit is blocked, record the exact blocker and skip only that unit; continue with the next independent unit.
- Do not invent missing target formats, mappings, schema fields, defaults, or runtime claims.

## Evidence rule

The latest stored Network Configuration reference/evidence database is consulted before completing a file whose semantics depend on that evidence.

Repository source-of-truth and evidence layers remain distinct:

`REFERENCE/EVIDENCE → ROADMAP → IMPLEMENTATION → READ-BACK → VERIFICATION → RESULT RECORD`

CI status is always tied to an exact run and commit SHA. A configured, queued, or in-progress run is never recorded as PASS.

## Completion rule

A work unit is complete only when implementation/result, immediate read-back, verification, error recording (when applicable), and round record are all present.

The session is complete only after the final summary and latest repository snapshot are recorded.
