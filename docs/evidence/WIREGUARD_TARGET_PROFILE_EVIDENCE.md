# WireGuard Target Profile Evidence Package

## Status

- Package: WireGuard multi-target
- Evidence state: VERIFIED / SOURCE-TRACEABLE
- Phase F Contract Shape: HOLD
- Phase G Target Adapter: LOCKED
- Contract v2.1: FROZEN
- Runtime validation: PENDING
- Secrets: EXCLUDED

## 1. Normative Source Intake

| Source ID | Source | Authority | Scope | Status |
|---|---|---|---|---|
| SRC-WG-001 | WireGuard Quick Start | WireGuard project | key generation, interface/peer configuration, persistent keepalive | Accepted |
| SRC-WG-002 | WireGuard Cross-platform Interface | WireGuard project | userspace configuration API and peer/interface keys | Accepted |
| SRC-WG-003 | WireGuard protocol paper | WireGuard project | protocol and cryptokey routing model | Accepted |
| SRC-WG-004 | wg(8) configuration format | WireGuard Tools upstream | WIREGUARD_CONF fields and semantics | Accepted |
| SRC-WG-005 | wg-quick(8) configuration format | WireGuard Tools upstream | wg-quick extensions such as Address/DNS/MTU/Table/hooks | Accepted |

References:
- SRC-WG-001: https://www.wireguard.com/quickstart/
- SRC-WG-002: https://www.wireguard.com/xplatform/
- SRC-WG-003: https://www.wireguard.com/papers/wireguard.pdf
- SRC-WG-004: https://www.man7.org/linux/man-pages/man8/wg.8.html
- SRC-WG-005: https://www.man7.org/linux/man-pages/man8/wg-quick.8.html

## 2. Evidence Extraction

| Evidence ID | Source | Claim / observation | Status |
|---|---|---|---|
| EVD-WG-001 | SRC-WG-001 | WireGuard configuration uses interface and peer concepts; keys are generated as public/private key material. | Verified |
| EVD-WG-002 | SRC-WG-004 | Core configuration format contains interface PrivateKey/ListenPort and peer PublicKey/Endpoint/AllowedIPs. | Verified |
| EVD-WG-003 | SRC-WG-002 | Cross-platform userspace API exposes interface private key/listen port and peer public key, preshared key, endpoint, allowed IPs and persistent keepalive. | Verified |
| EVD-WG-004 | SRC-WG-001 | Persistent keepalive is an optional peer setting and 25 seconds is described as a sensible value for NAT/firewall traversal; it is not a universal default requirement. | Verified |
| EVD-WG-005 | SRC-WG-005 | Address, DNS, MTU, Table, PreUp/PostUp/PreDown/PostDown and SaveConfig are wg-quick extensions, not core wg(8) configuration semantics. | Verified |
| EVD-WG-006 | SRC-WG-003 | Cryptokey routing is a core WireGuard concept and AllowedIPs participates in peer routing/selection. | Verified |
| EVD-WG-007 | SRC-WG-004 | Endpoint may use IPv4 or IPv6 endpoint syntax; AllowedIPs are IP/CIDR entries. | Verified |
| EVD-WG-008 | SRC-WG-002 | Protocol version is exposed by the userspace interface but is normally not set by most users and must be 1 when explicitly set. | Verified |

## 3. Candidate / Constraint Matrix

These are evidence-backed candidates. They are NOT yet project-level Target Profile contract fields.

| Candidate ID | Concept | Evidence | Category | Status |
|---|---|---|---|---|
| CAND-WG-001 | interface.privateKey | EVD-WG-001,002,003 | Required secret input | Verified |
| CAND-WG-002 | interface.listenPort | EVD-WG-002,003 | Interface mapping | Verified |
| CAND-WG-003 | peer.publicKey | EVD-WG-002,003 | Required peer identity | Verified |
| CAND-WG-004 | peer.presharedKey | EVD-WG-003 | Optional peer secret | Verified |
| CAND-WG-005 | peer.allowedIPs | EVD-WG-002,003,006,007 | Routing mapping | Verified |
| CAND-WG-006 | peer.endpoint | EVD-WG-002,003,007 | Peer transport mapping | Verified |
| CAND-WG-007 | peer.persistentKeepalive | EVD-WG-003,004 | Optional NAT traversal control | Verified |
| CAND-WG-008 | interface.address | EVD-WG-005 | wg-quick-only extension | Verified |
| CAND-WG-009 | interface.dns | EVD-WG-005 | wg-quick-only extension | Verified |
| CAND-WG-010 | interface.mtu | EVD-WG-005 | wg-quick-only extension | Verified |
| CAND-WG-011 | interface.table | EVD-WG-005 | wg-quick-only extension | Verified |
| CAND-WG-012 | lifecycle hooks | EVD-WG-005 | Execution-bearing extension | Verified |
| CAND-WG-013 | saveConfig | EVD-WG-005 | State persistence extension | Verified |
| CAND-WG-014 | protocolVersion | EVD-WG-008 | Protocol constraint | Verified |

## 4. Important Boundary Decisions

1. `WIREGUARD_CONF` is the frozen Contract v2.1 output format identifier; this package does not add another format.
2. Core WireGuard semantics and wg-quick extensions remain distinct.
3. A field being representable in wg-quick does not prove that every WireGuard client/platform supports it.
4. PrivateKey and PresharedKey are secret-bearing inputs and must never be committed as real credentials.
5. Runtime/platform support is not inferred from syntax compatibility.
6. iOS, Android, Windows, macOS and Linux remain separate target capability questions.
7. Missing target mapping must remain `UNKNOWN` / `UNSUPPORTED_CAPABILITY` according to the existing processing rules.

## 5. Multi-Target Mapping Worklist

| Target | Evidence state | Mapping state | Runtime state |
|---|---|---|---|
| iOS | Source evidence available | Pending target-specific reconciliation | Pending |
| Android | Source evidence available | Pending target-specific reconciliation | Pending |
| Windows PC | Source evidence available | Pending target-specific reconciliation | Pending |
| macOS | Source evidence available | Pending target-specific reconciliation | Pending |
| Linux | Source evidence available | Pending target-specific reconciliation | Pending |

## 6. Reconciliation

### Stable common semantics

The following are suitable candidates for the target-neutral WireGuard configuration model because they are directly represented by WireGuard's own configuration/API concepts:

- peer public key
- allowed IPs
- endpoint
- optional preshared key
- optional persistent keepalive
- interface private key
- interface listen port

Decision state: **Compatible / Proposal for Common Model promotion**.

### Target-specific semantics

The following must remain target-specific until each platform's official client/API evidence is reconciled:

- import mechanism
- tunnel activation lifecycle
- platform-specific DNS handling
- platform-specific routes
- provider/network-extension integration
- UI/client-specific options
- file import/export behavior

Decision state: **Pending**.

### wg-quick-only semantics

Address, DNS, MTU, Table, lifecycle hooks and SaveConfig are explicitly treated as wg-quick-layer semantics. They must not be promoted to universal WireGuard client capabilities.

Decision state: **Verified boundary**.

## 7. Phase F-Shape Gate

| Criterion | Result |
|---|---|
| Normative WireGuard sources identified | PASS |
| Evidence extracted and traceable | PASS |
| Candidates traceable | PASS |
| Core vs wg-quick semantics separated | PASS |
| Secrets excluded from fixtures | PASS |
| Contract v2.1 unchanged | PASS |
| Protected boundaries unchanged | PASS |
| Project-level Target Profile Contract Shape explicitly approved | HOLD |
| Platform-specific mappings reconciled | HOLD |
| Runtime evidence available | HOLD |

### Gate Decision

**HOLD**

The WireGuard evidence package is complete enough to proceed into target-specific reconciliation, but it does not by itself establish a project-wide Target Profile Contract Shape or runtime capability matrix.

## 8. Next Permitted Work

1. Reconcile iOS WireGuard client/platform mapping.
2. Reconcile Android WireGuard client/platform mapping.
3. Reconcile Windows PC mapping.
4. Reconcile macOS mapping.
5. Reconcile Linux mapping.
6. Build target-specific capability records.
7. Run mapping/contract tests.
8. Only after the Target Profile Shape gate is explicitly satisfied, implement adapters.
