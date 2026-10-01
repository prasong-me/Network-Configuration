# Network Configuration — Tool Semantic Compatibility Baseline

Date: 2026-10-01
Status: CONTROL BASELINE

## Required registry fields
Tool ID; Provider; Function; Version/revision; Semantic meaning; Input contract; Output contract; Success semantics; Failure semantics; Empty-output semantics; Side effects; Target scope; Evidence; Verification status; Last verified date.

## Execution contract
Task Intent → Capability → Tool Selection → Contract Check → Execute → Raw Output → Output Contract Validation → Target/Version Match → Evidence Match → Handoff

## Status rules
EXECUTED ≠ OUTPUT_PRESENT
OUTPUT_PRESENT ≠ OUTPUT_VALID
OUTPUT_VALID ≠ MATCHED
MATCHED ≠ VERIFIED
VERIFIED ≠ PROJECT_COMPLETE

## Empty result rule
If a tool reports execution success but produces no usable output, record NO_OUTPUT. Do not treat it as project data and do not pass it to another tool as valid input.

## Substitution rule
Tools with similar names, especially run/execute/build/test/search, must not be substituted unless their Input Contract, Output Contract, semantic meaning, side effects and verification boundary are compatible and recorded.

## Target/version rule
Every implementation-relevant handoff must carry Target and Version context. An output that cannot be matched to the requested Target/Version/Evidence basis is UNMATCHED and cannot become implementation input.
