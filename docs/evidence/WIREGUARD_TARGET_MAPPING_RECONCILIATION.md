# WireGuard Target Mapping Reconciliation

## Status

- Scope: iOS / iPadOS, Android, Windows, macOS, Linux
- Evidence basis: existing WireGuard evidence package and platform identity evidence
- Mapping state: PARTIAL / SOURCE-TRACEABLE
- Target Profile Contract Shape: HOLD
- Phase G adapter: LOCKED
- Runtime validation: PENDING
- Secrets: EXCLUDED

## Purpose

This record separates what is established by the current repository evidence from what still requires target-specific normative evidence.

The existence of an official WireGuard client or userspace interface does **not** establish that every target exposes the same fields, import behavior, lifecycle, DNS behavior, routing behavior, or artifact acceptance rules.

## 1. Common WireGuard Semantic Baseline

The following concepts are already traceable to WireGuard's own configuration/userspace evidence:

| Concept | Current evidence | Mapping classification |
|---|---|---|
| Interface private key | EVD-WG-001, EVD-WG-002, EVD-WG-003 | Core WireGuard semantic |
| Interface listen port | EVD-WG-002, EVD-WG-003 | Core WireGuard semantic |
| Peer public key | EVD-WG-002, EVD-WG-003 | Core WireGuard semantic |
| Peer preshared key | EVD-WG-003 | Optional core semantic |
| Peer allowed IPs | EVD-WG-002, EVD-WG-003, EVD-WG-006, EVD-WG-007 | Core routing semantic |
| Peer endpoint | EVD-WG-002, EVD-WG-003, EVD-WG-007 | Core transport semantic |
| Peer persistent keepalive | EVD-WG-003, EVD-WG-004 | Optional core semantic |
| Address | EVD-WG-005 | wg-quick extension; not universal |
| DNS | EVD-WG-005 | wg-quick extension; target-specific |
| MTU | EVD-WG-005 | wg-quick extension; target-specific |
| Table | EVD-WG-005 | wg-quick extension; target-specific |
| PreUp/PostUp/PreDown/PostDown | EVD-WG-005 | Execution-bearing extension; target-specific |
| SaveConfig | EVD-WG-005 | wg-quick extension; target-specific |

## 2. Target Mapping Matrix

Legend:

- **EVIDENCED** = current repository evidence directly establishes the fact.
- **PENDING** = requires target-specific normative/client evidence.
- **NOT UNIVERSAL** = must not be promoted from wg-quick semantics to all targets.
- **RUNTIME PENDING** = syntax/evidence exists but artifact acceptance or live behavior has not been verified.

| Target | Product identity | Import mechanism | Core interface/peer fields | DNS | Routing | Lifecycle / activation | Artifact acceptance |
|---|---|---|---|---|---|---|---|
| iOS / iPadOS | EVIDENCED | EVIDENCED: archive/file, QR, manual | PENDING target-field reconciliation | PENDING | PENDING | PENDING | RUNTIME PENDING |
| Android | EVIDENCED | PENDING target-specific reconciliation | PENDING target-field reconciliation | PENDING | PENDING | PENDING | RUNTIME PENDING |
| Windows | EVIDENCED | PENDING target-specific reconciliation | PENDING target-field reconciliation | PENDING | PENDING | PENDING | RUNTIME PENDING |
| macOS | EVIDENCED | PENDING target-specific reconciliation | PENDING target-field reconciliation | PENDING | PENDING | PENDING | RUNTIME PENDING |
| Linux | EVIDENCED: userspace/tools | PENDING backend/tool workflow reconciliation | EVIDENCED at wg/userspace semantic layer; target backend still pending | PENDING by backend/workflow | EVIDENCED at WireGuard routing semantic layer; system integration pending | PENDING | RUNTIME PENDING |

## 3. iOS / iPadOS

### Established

The existing platform identity evidence establishes an official WireGuard application for iPhone/iPad and documents tunnel creation/import through archives/files, QR codes, or manual creation.

### Not yet established

The current repository evidence does not establish, at field level:

- exact import/export artifact schema accepted by the current app version;
- whether every core `wg(8)` field maps 1:1 to the app;
- how DNS is represented and applied;
- how routes are represented/applied;
- lifecycle/activation semantics exposed to the generator;
- handling of wg-quick hooks, Table, SaveConfig, or other non-core extensions.

**Decision:** do not implement an iOS WireGuard adapter from product identity alone.

## 4. Android

### Established

The existing platform identity evidence establishes the official Android WireGuard application.

### Not yet established

The current evidence package does not yet provide a target-specific normative mapping for:

- accepted import/export formats;
- interface and peer field mapping;
- DNS behavior;
- route installation behavior;
- activation/lifecycle behavior;
- handling of wg-quick-only extensions.

**Decision:** keep Android mapping UNKNOWN until target-specific evidence is added.

## 5. Windows

### Established

The existing platform identity evidence establishes official WireGuard Windows client installers.

### Not yet established

The current evidence package does not establish the exact client artifact/import contract or the complete field/lifecycle mapping for the installed Windows client.

**Decision:** keep Windows target mapping UNKNOWN until target-specific evidence is added.

## 6. macOS

### Established

The existing platform identity evidence establishes an official WireGuard application for Mac.

### Not yet established

The current evidence package does not establish the exact client artifact/import contract or complete field/lifecycle mapping for the current macOS client.

**Decision:** keep macOS target mapping UNKNOWN until target-specific evidence is added.

## 7. Linux

### Established

The existing evidence establishes WireGuard's userspace configuration semantics and distinguishes `wg(8)` from `wg-quick(8)`.

### Boundary

Linux is not treated as a single universal runtime target. The eventual adapter must distinguish at least:

- WireGuard protocol/configuration semantics;
- `wg` tooling;
- `wg-quick` extensions;
- system/network-manager integration where applicable.

**Decision:** core `wg` semantics can be mapped at the protocol/tooling layer, while system integration remains UNKNOWN until its concrete backend is selected and evidenced.

## 8. Fail-Closed Rules

Until a target-specific mapping is proven:

1. Do not silently translate an unmapped field.
2. Do not treat wg-quick extensions as universal client capabilities.
3. Preserve `UNKNOWN` during processing when capability is not established.
4. If the requested capability is required and remains unknown, emit the project's existing incompatibility/unsupported diagnostic rather than generating a misleading artifact.
5. Never place real private keys or preshared keys in fixtures, evidence, tests, or documentation.

## 9. Gate Result

| Gate | Result |
|---|---|
| Common WireGuard semantic baseline | PASS |
| Platform identity evidence | PASS |
| Target-specific mapping completeness | HOLD |
| Contract v2.1 change required | NO |
| Target Profile Contract Shape | HOLD |
| Adapter implementation authorized | NO |
| Runtime verification | PENDING |

## 10. Next Evidence Work

The next evidence package should obtain target-specific, versioned client documentation or directly inspect accepted artifacts for each target, then reconcile:

1. import/export contract;
2. interface fields;
3. peer fields;
4. DNS;
5. routing;
6. activation/lifecycle;
7. unsupported fields/extensions;
8. artifact validation and runtime acceptance.

Only fields supported by target evidence should graduate from UNKNOWN to a concrete capability/mapping record.


## 11. Five-Target Phase-F Mapping Record

This section is the phase-level handoff for the five planned WireGuard targets.

### iOS / iPadOS

- Identity: **VERIFIED**
- Tunnel import entry points: **VERIFIED** at product level (archive/file, QR, manual)
- Core interface/peer semantic mapping: **CANDIDATE / NOT YET CLIENT-VERIFIED**
- DNS: **UNKNOWN**
- Routing: **UNKNOWN**
- Lifecycle/activation: **UNKNOWN**
- wg-quick hooks/Table/SaveConfig: **NOT UNIVERSAL**
- Runtime artifact acceptance: **PENDING**

### Android

- Identity: **VERIFIED**
- Tunnel import/export contract: **UNKNOWN**
- Core interface/peer semantic mapping: **CANDIDATE / NOT YET CLIENT-VERIFIED**
- DNS: **UNKNOWN**
- Routing: **UNKNOWN**
- Lifecycle/activation: **UNKNOWN**
- wg-quick hooks/Table/SaveConfig: **NOT UNIVERSAL**
- Runtime artifact acceptance: **PENDING**

### Windows PC

- Identity: **VERIFIED**
- Tunnel import/export contract: **UNKNOWN**
- Core interface/peer semantic mapping: **CANDIDATE / NOT YET CLIENT-VERIFIED**
- DNS: **UNKNOWN**
- Routing: **UNKNOWN**
- Lifecycle/activation: **UNKNOWN**
- wg-quick hooks/Table/SaveConfig: **NOT UNIVERSAL**
- Runtime artifact acceptance: **PENDING**

### macOS

- Identity: **VERIFIED**
- Tunnel import/export contract: **UNKNOWN**
- Core interface/peer semantic mapping: **CANDIDATE / NOT YET CLIENT-VERIFIED**
- DNS: **UNKNOWN**
- Routing: **UNKNOWN**
- Lifecycle/activation: **UNKNOWN**
- wg-quick hooks/Table/SaveConfig: **NOT UNIVERSAL**
- Runtime artifact acceptance: **PENDING**

### Linux

- Identity / userspace interface: **VERIFIED**
- `wg` core interface/peer semantics: **EVIDENCED**
- `wg-quick` extensions: **EVIDENCED AS EXTENSIONS**
- System/network-manager backend mapping: **UNKNOWN**
- DNS system integration: **UNKNOWN**
- Routing system integration: **PARTIAL / BACKEND-DEPENDENT**
- Lifecycle/activation: **BACKEND-DEPENDENT / PENDING**
- Runtime artifact acceptance: **PENDING**

## 12. Phase-F Workstream Closure

The planned five-target **mapping workstream** is now structurally reconciled in one traceable record. This closes the mapping inventory without converting unverified capability into support.

### Phase-F boundary

**CLOSED FOR MAPPING INVENTORY**

The following five targets have an explicit record:

1. iOS / iPadOS
2. Android
3. Windows PC
4. macOS
5. Linux

Each record distinguishes identity, known WireGuard semantics, unknown target-specific behavior, non-universal wg-quick extensions, and runtime verification requirements.

### Phase-F Contract-Shape gate

**REMAINS HOLD**

The mapping inventory does not authorize invention of a project-wide Target Profile Contract Shape. No new contract field or enum is introduced by this document.

### Phase-G consequence

**ADAPTERS REMAIN LOCKED**

No executable adapter is added until the project-level Target Profile Shape is satisfied and the target-specific mappings needed by that adapter are evidenced.

## 13. Handoff to the Next Gate

The next permitted implementation gate is:

`Target Profile Contract Shape → capability record schema → five target profile records → mapping tests → adapters`

The current repository state intentionally stops before executable adapter implementation. This is a fail-closed boundary, not an omitted implementation.

