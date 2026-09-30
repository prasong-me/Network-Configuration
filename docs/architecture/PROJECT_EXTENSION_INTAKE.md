# Project Extension Intake Queue

> Status: ACTIVE / NON-NORMATIVE INTAKE
>
> Purpose: track additional projects that may be added to Network-Configuration without reopening the closed DNS + Apple MobileConfig baseline.
>
> This queue uses only evidence already present in the system. It does not retrieve external sources and does not define a Target Profile contract.

## Baseline Boundary

- DNS + Apple MobileConfig: **CLOSED / DO NOT REOPEN**
- Contract v2.1: **FROZEN**
- Apple Adapter: **LOCKED**
- DNS Runtime: **LOCKED**
- Phase F Target Profile Contract Shape: **HOLD**
- Phase G Target Adapters: **LOCKED until Phase F-Shape is approved**

## Extension Intake

| Project / Target | Current evidence state | Integration state | Next allowed work |
|---|---|---|---|
| WireGuard | Configuration/protocol evidence already available | INTAKE READY | Preserve evidence; await approved Target Profile shape |
| Mihomo | Configuration, DNS, routing, proxy-group, provider evidence already available | INTAKE READY | Preserve target-specific semantics; await approved shape |
| Clash Mi | Identity and Mihomo-based capability evidence already available | INTAKE READY | Keep client identity separate from Mihomo core semantics |
| Clash Lite | Identity/capability evidence available; detailed API remains pending | PARTIAL / PENDING | Record missing API evidence without inference |
| ProxyPin | Capability evidence available; exact target serialization not established | INTAKE READY | Preserve capability evidence; do not invent YAML/JSON schema |
| Surge 5 | API/auth/deploy evidence available | INTAKE READY | Preserve credential fields as schema-only; no secrets |
| Rocket Proxy | Repository/App Store evidence available; shared YAML engine not established | INTAKE READY | Treat YAML compatibility as unproven shared implementation |
| Clash Live | Identity unresolved | BLOCKED | Do not substitute another client or infer identity |

## Intake Rules

1. A project entering this queue is not automatically a Target Profile.
2. Evidence does not become Contract v2.1 semantics.
3. Target-specific configuration remains target-specific until reconciliation.
4. Missing API, runtime, or identity evidence remains **PENDING**, **UNKNOWN**, or **BLOCKED** as applicable.
5. No adapter, generator, serializer, or artifact implementation is created from this queue while Phase F-Shape is HOLD.
6. A future project can be appended to this queue without modifying the closed DNS + Apple MobileConfig baseline.
7. When a normative Target Profile source is available, process one project at a time through the existing evidence traceability chain.

## Work Order

For each future project:

```
INTAKE
  ↓
READ EXISTING EVIDENCE
  ↓
CLASSIFY CAPABILITY / TARGET-SPECIFIC DATA
  ↓
CHECK CONFLICTS
  ↓
CHECK PHASE F-SHAPE GATE
  ↓
IMPLEMENT ONLY IF AUTHORIZED
  ↓
VERIFY
  ↓
RECORD / RECONCILE
  ↓
NEXT PROJECT
```

## Non-Goals

This document does not:

- define Target Profile fields;
- define matching, duplicate, or version-selection policy;
- unlock Phase G;
- modify Contract v2.1;
- reopen the closed DNS + Apple MobileConfig implementation;
- claim runtime verification where none exists.
