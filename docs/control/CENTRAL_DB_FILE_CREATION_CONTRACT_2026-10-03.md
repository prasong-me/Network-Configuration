# Central Database — File Creation Contract / Expandable Domain Model

Date: 2026-10-03
Status: PROPOSAL — RECORDED FOR RECONCILIATION

## Purpose

Preserve the design decision discussed on 2026-10-03 before implementation details are lost.

The Central Database must be expandable by domain while maintaining strict, deterministic file-creation rules. The physical file/folder layout is an implementation detail; the authoritative constraint is the File Creation Contract.

## Core principles

1. Central Database is the shared logical database.
2. Domains may be added in the future without redesigning the whole database.
3. Each domain/storage boundary has a deterministic canonical file type and creation rule.
4. Iris and every Adapter are Writers; they do not invent their own file format.
5. Every Writer must follow the same applicable File Creation Contract.
6. A file that fails the contract must not enter the canonical database.
7. Code, data, documents, evidence, media, execution records, and other categories remain distinguishable by explicit type/domain metadata.
8. File structure itself is not the source of truth; the creation contract is.
9. Existing evidence remains immutable. New records are additive and related to prior records rather than overwriting them.
10. Iris ID identifies/accesses the applicable context; it is not a substitute for the knowledge record itself.

## Logical model

```
CENTRAL DB
|
+-- DOMAIN
|     |
|     +-- canonical records/files
|     +-- index
|     +-- relations
|     +-- versions
|     +-- provenance
|
+-- FILE CREATION CONTRACT
|     +-- type
|     +-- naming
|     +-- location
|     +-- schema
|     +-- encoding
|     +-- ID
|     +-- version
|     +-- relation
|     +-- validation
|
+-- ACCESS / IRIS CONTEXT
```

## Writer boundary

```
IRIS / ADAPTER / FUTURE WRITER
        |
        v
FILE CREATION CONTRACT
        |
        v
CONTRACT VALIDATION
        |
        +-- FAIL --> REJECT / RECORD ERROR
        |
        +-- PASS --> CREATE / UPDATE RECORD
                         |
                         v
                    VERIFY / RECORD
```

No Writer should bypass the contract and write arbitrary files directly into the canonical data area.

## Required contract dimensions

Each File Creation Contract should explicitly define, as applicable:

- DOMAIN
- RECORD_TYPE
- FILE_TYPE / EXTENSION
- FILE_NAMING_RULE
- LOCATION_RULE
- SCHEMA_VERSION
- ENCODING
- ID_RULE
- VERSION_RULE
- RELATION_RULE
- REQUIRED_FIELDS
- VALIDATION_RULE
- IMMUTABILITY / UPDATE_RULE
- PROVENANCE_RULE
- STATUS_RULE
- SEARCH_INDEX_FIELDS

## Separation of concerns

The following must remain separate:

```
FILE CREATION RULE
!= FILE CONTENT
!= BUSINESS KNOWLEDGE
!= EVIDENCE
!= VERIFICATION
!= PROVENANCE
```

A PDF, for example, describes a media/file representation. It does not by itself determine whether the content is a book, specification, evidence artifact, or other document class.

## Searchability

The database must not depend on scanning an undifferentiated file pile.

Search should be addressable through indexed identity and classification fields such as:

- IRIS_ID
- DOMAIN_ID
- RECORD_ID
- RECORD_TYPE
- TOPIC_ID
- SOURCE_ID
- EVIDENCE_ID
- VERSION_ID
- STATUS
- UPDATED_AT

Example query context:

```
IRIS_ID
+ DOMAIN
+ RECORD_TYPE
+ TOPIC
+ STATUS
+ VERSION
        |
        v
Relevant Records
        |
        +--> Evidence
        +--> Provenance
        +--> Version
```

## Expandability rule

Adding a future domain must not require changing the meaning of existing records.

The expected pattern is:

```
CENTRAL DB
  |
  +-- DOMAIN A -> Contract A -> Canonical File Type A
  +-- DOMAIN B -> Contract B -> Canonical File Type B
  +-- DOMAIN C -> Contract C -> Canonical File Type C
  +-- FUTURE DOMAIN -> New Contract -> New Canonical File Type
```

The central indexing, identity, provenance, verification, and access model remains shared.

## Status and evidence boundary

This document records the design decision as a proposal for reconciliation. It is not evidence that the corresponding schema or runtime Writer enforcement has already been implemented.

Implementation must first inspect the existing Architecture, Contract, Dependency, and source, then proceed through:

```
Verify
-> Record
-> Update State
-> Implement
-> Test
-> Verify
-> Record Evidence
-> Update Central Database
```

## Relationship to existing project controls

This record is intended to remain compatible with:

- Contract v2.1 frozen boundary.
- Central Database / Project Database as one logical database.
- Immutable historical evidence.
- Evidence Registry requirements.
- Tool semantic boundary:
  EXECUTED != OUTPUT_PRESENT != OUTPUT_VALID != MATCHED != VERIFIED.
- Existing-first implementation.
- Roadmap authority: this record does not change the Project Roadmap by itself.

## Current implementation status

- Design captured: RECORDED
- Repository persistence: PENDING VERIFICATION
- Contract implementation: NOT IMPLEMENTED BY THIS RECORD
- Writer enforcement: NOT VERIFIED
- Central DB schema migration: NOT VERIFIED
- Runtime Iris/Adapter integration: NOT VERIFIED

