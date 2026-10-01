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

## 2. Quantumult X

### Verified

The official `crossutility/Quantumult-X` repository contains `url-scheme.md` and documents:

`quantumult-x:///update-configuration?remote-resource=url-encoded-json`

It also documents:

`quantumult-x:///add-resource?remote-resource=url-encoded-json`

The documented `update-configuration` action replaces existing resources, while `add-resource` keeps existing resources.

The documented JSON payload is URL-encoded and can contain resource arrays such as:

```json
{
  "server_remote": [
    "https://example.com/server.snippet, tag=Sample-01"
  ]
}
```

Official source:
- https://github.com/crossutility/Quantumult-X/blob/master/url-scheme.md

Status: **VERIFIED**

### Evidence correction

The previously supplied claim:

`quantumult-x://exec?type=update-configuration&remote-resource-url=<encoded-url>`

does **not** match the exact syntax documented by the official repository source located in this verification pass.

The normative syntax for this project is therefore the official repository form above. No `exec` transformation is inferred.

### Boundary

The repository documents the URL scheme and payload format. It does not by itself prove physical-device runtime success for this project.

## 3. Loon

### Verified

Official Loon documentation documents resource import using URL-encoded resource URLs:

- Remote configuration: `loon://import?sub=encode(url)`
- Node subscription: `loon://import?nodelist=encode(url)`
- Rule subscription: `loon://import?rules=encode(url)`
- Plugin: `loon://import?plugin=encode(url)`
- Icon set: `loon://import?iconset=encode(url)`
- GeoIP database: `loon://import?geoip=encode(url)`
- Parser: `loon://import?parser=encode(url)`

Official source:
- https://nsloon.app/en/docs/Scheme/

Status: **VERIFIED**

### Evidence correction

The previously supplied claim:

`loon://import?scheme=<encoded-url>`

is not the resource-import parameter documented by the official Loon source located in this verification pass.

For configuration delivery, the verified parameter is `sub`; for node subscriptions it is `nodelist`.

### Boundary

The documentation establishes the URL scheme and import categories. It does not by itself prove physical-device runtime success for this project.

## 4. Shadowrocket

### Evidence correction

The supplied specification states:

- `sub://<base64-encoded-url>`
- `shadowrocket://add/<base64-payload>`

No official Shadowrocket repository or documentation page was located that establishes those exact Base64 requirements as a normative iOS URL-scheme specification.

Public third-party references were found previously, but they are not accepted as project-level normative authority.

Status:
**PENDING OFFICIAL SOURCE**

No Base64 transformation is implemented or treated as normative.

### Manual integration fallback

A manual `.conf` import can remain a future delivery path if an independently verified Shadowrocket configuration format is available. This is separate from URL-scheme integration and does not authorize changes to the protected Apple Adapter.

## 5. Evidence Matrix

| Target | Exact official scheme verified | Official source | Implementation authorization |
|---|---|---|---|
| Surge iOS | `surge:///install-config?url=<percent-encoded-url>` | YES | Evidence-ready |
| Quantumult X | `quantumult-x:///update-configuration?remote-resource=<url-encoded-json>`; `add-resource` also verified | YES | Evidence-ready |
| Loon | `loon://import?sub=<encoded-url>`; `nodelist`, `rules`, `plugin` and other import types verified | YES | Evidence-ready |
| Shadowrocket | No authoritative URL-scheme source verified | NO | BLOCKED/PENDING |

## 6. Required Evidence to Close Shadowrocket

Provide one of:

1. an official Shadowrocket developer/documentation URL containing the exact URL scheme;
2. an official documentation file supplied directly;
3. an official vendor-controlled source that documents the scheme.

Runtime evidence remains a separate requirement and should be supplied only when implementation-level runtime validation is required.

## 7. Protected Boundaries

This evidence register does not modify:

- Contract v2.1
- Apple MobileConfig Adapter
- DNS Runtime
- PR #15
- Phase F Target Profile Contract Shape

No third-party app integration implementation is inferred from unverified claims.
