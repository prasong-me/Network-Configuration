# Direct iOS App Integration — Official Evidence Register

## Status

- Evidence register: ACTIVE
- Contract v2.1: FROZEN
- Apple Adapter: LOCKED
- Direct third-party iOS app integration: EVIDENCE-BOUNDED
- Runtime verification: PENDING

## 1. Surge for iOS

### Verified

Official Surge documentation publishes:

`surge:///install-config?url=x`

The `url` parameter must be percent-encoded. The action installs a configuration from a URL.

Official source:
- https://manual.nssurge.com/tools/url-scheme.html

Status: **VERIFIED**

### Boundary

The documentation establishes URL-based configuration installation. It does not by itself prove physical-device runtime success for this project.

## 2. Shadowrocket

### Evidence correction

The supplied specification states:

- `sub://<base64-encoded-url>`
- `shadowrocket://add/<base64-payload>`

The available public documentation I could verify does **not** establish those exact Base64 requirements as an official Shadowrocket specification.

A public Shadowrocket reference instead documents:

- `shadowrocket://add/{url}`
- `shadowrocket://config/add/{url}`
- `shadowrocket://install?module={url}`

These references are not accepted as project-level normative authority.

Status:
**PENDING OFFICIAL SOURCE**

No Base64 transformation is implemented or treated as normative.

## 3. Quantumult X

The supplied specification states:

`quantumult-x://exec?type=update-configuration&remote-resource-url=<encoded-url>`

No authoritative Quantumult X documentation was located in the current evidence search that is sufficient to establish this exact syntax as a normative project source.

Status:
**PENDING OFFICIAL SOURCE**

No integration implementation is authorized from this claim alone.

## 4. Loon

The supplied specification states:

`loon://import?scheme=<encoded-url>`

No authoritative Loon documentation was located in the current evidence search that is sufficient to establish this exact syntax as a normative project source.

Status:
**PENDING OFFICIAL SOURCE**

No integration implementation is authorized from this claim alone.

## 5. Evidence Matrix

| Target | URL Scheme Claim | Official source verified | Implementation |
|---|---|---|---|
| Surge iOS | `surge:///install-config?url=<encoded>` | YES | Evidence-ready |
| Shadowrocket | supplied Base64 schemes | NO | BLOCKED/PENDING |
| Quantumult X | supplied update-configuration scheme | NO | BLOCKED/PENDING |
| Loon | supplied import scheme | NO | BLOCKED/PENDING |

## 6. Required Evidence to Close Remaining Targets

For each remaining app, provide one of:

1. official developer/documentation URL containing the exact URL scheme;
2. official documentation file supplied directly;
3. official source/repository controlled by the vendor that documents the scheme.

Runtime evidence is a separate requirement and should be supplied only when implementation-level runtime validation is required.

## 7. Protected Boundaries

This evidence register does not modify:

- Contract v2.1
- Apple MobileConfig Adapter
- DNS Runtime
- PR #15
- Phase F Target Profile Contract Shape

No third-party app integration implementation is inferred from unverified claims.
