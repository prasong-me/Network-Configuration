# WireGuard Platform Identity Evidence

## Status

- Evidence package: VERIFIED / SOURCE-TRACEABLE
- Scope: product/platform identity only
- Target Profile Contract Shape: HOLD
- Phase G adapter: LOCKED
- Runtime capability: PENDING

## Evidence

| ID | Target | Official source | Verified observation | Status |
|---|---|---|---|---|
| EVD-WG-009 | iOS / iPadOS | https://apps.apple.com/us/app/wireguard/id1441195209 | Official WireGuard app is listed for iPhone/iPad; listing states tunnels can be imported from archives/files, QR codes, or created manually. | Verified |
| EVD-WG-010 | macOS | https://apps.apple.com/us/developer/wireguard-development-team/id1441195208 | WireGuard Development Team lists an official WireGuard app for Mac. | Verified |
| EVD-WG-011 | Android | https://play.google.com/store/apps/details?id=com.wireguard.android | Google Play identifies WireGuard Development Team's app as the official app for managing WireGuard VPN tunnels. | Verified |
| EVD-WG-012 | Windows | https://download.wireguard.com/windows-client/ | WireGuard's official download site publishes Windows client installers. | Verified |
| EVD-WG-013 | Linux / userspace | https://www.wireguard.com/xplatform/ | Official WireGuard cross-platform interface documents userspace configuration semantics. | Verified |

## Mapping Boundary

Product identity does not establish identical platform capability.

Therefore:

- iOS/iPadOS: product identity verified; field-level client mapping pending.
- Android: product identity verified; field-level client mapping pending.
- Windows: product identity verified; field-level client mapping pending.
- macOS: product identity verified; field-level client mapping pending.
- Linux: WireGuard tools/userspace semantics verified; runtime/backend mapping pending.

## Next Reconciliation Records

The next work unit must map, separately per target:

1. tunnel import/export mechanism
2. interface fields
3. peer fields
4. DNS behavior
5. routing behavior
6. lifecycle / activation
7. unsupported fields
8. artifact acceptance/runtime verification

No adapter is authorized from product identity evidence alone.
