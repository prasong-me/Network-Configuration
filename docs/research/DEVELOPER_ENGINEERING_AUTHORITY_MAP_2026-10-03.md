# Developer / Engineering Authority Map — 2026-10-03

Status: SOURCE/EVIDENCE COLLECTION — VERIFIED-SOURCE RECORDS ONLY

Purpose
- Map the official developer, maintainer, engineering authority, or standards authority behind project components.
- Organization-level authority is recorded separately from named individuals.
- Individual engineer names are recorded only when an official primary source explicitly identifies them.
- This document does not infer ownership or identity from community claims.

## Authority Map

### 1. GitHub
- Authority: GitHub.
- Engineering evidence: GitHub publishes an official Engineering category describing work by GitHub's engineering team.
- Official sources:
  - https://github.com/blog/category/engineering
  - https://github.com/
- Result: GitHub organization/platform authority is supported.
- Individual engineer authority: NOT established by the collected sources.

### 2. Apple Configuration Profiles / mobileconfig
- Authority: Apple.
- Technical source: Apple Configuration Profile Reference.
- Official sources:
  - https://developer.apple.com/business/documentation/Configuration-Profile-Reference.pdf
  - https://support.apple.com/guide/apple-configurator-mac/create-and-edit-configuration-profiles-pmd85719196/mac
  - https://support.apple.com/en-gw/guide/deployment/depc0aadd3fe/web
- Supported claim: Apple documents configuration profiles and the .mobileconfig format and provides the authoritative Configuration Profile Reference.
- Individual engineer authority: NOT established.

### 3. Android VpnService / WebView
- Authority: Google / Android platform documentation.
- Official sources:
  - https://developer.android.com/reference/android/net/VpnService
  - https://developer.android.com/reference/android/webkit/WebView
- Supported claim: Android's official API reference defines VpnService as the base class for applications building VPN solutions and documents WebView as the platform web-content component.
- Individual engineer authority: NOT established.

### 4. WireGuard
- Authority: WireGuard project and its official supported repositories.
- Official sources:
  - https://www.wireguard.com/
  - https://www.wireguard.com/protocol/
  - https://www.wireguard.com/repositories/
  - https://www.wireguard.com/papers/wireguard.pdf
- Supported claim: WireGuard publishes its protocol/cryptography documentation and an official list of supported repositories/projects.
- Individual engineer authority: NOT established in this record unless separately sourced from an official WireGuard page.

### 5. sing-box
- Authority: sing-box / SagerNet project.
- Official sources:
  - https://sing-box.sagernet.org/
  - https://sing-box.sagernet.org/configuration/
  - https://sing-box.sagernet.org/clients/
  - https://sing-box.sagernet.org/configuration/service/api/
- Supported claim: The official project documentation identifies sing-box as a universal proxy platform and documents platform clients, configuration, and API.
- Individual engineer authority: NOT established beyond the copyright/contact attribution shown on the official project page; no individual is promoted to engineering authority from that attribution alone.

### 6. Shadowrocket
- Authority: Shadow Launch Technology Limited (developer listed by Apple App Store).
- Official source:
  - https://apps.apple.com/us/app/shadowrocket/id932747118
- Supported claim: Apple App Store lists Shadow Launch Technology Limited as the developer and describes Shadowrocket as a rule-based proxy utility client.
- Individual engineer authority: NOT established by the official source used here.

### 7. FoxyProxy
- Authority: FoxyProxy project / official GitHub organization repositories.
- Official sources:
  - https://github.com/foxyproxy
  - https://github.com/foxyproxy/browser-extension
  - https://github.com/foxyproxy/firefox-extension
  - https://foxyproxy.github.io/browser-extension/src/content/help.html
- Supported claim: The official GitHub organization publishes the browser and Firefox extension repositories; the project documentation describes proxy configuration behavior.
- Individual engineer authority: NOT established.

### 8. DNS / proxy / routing standards
- Authority: IETF standards process and RFC publication system.
- Official sources:
  - https://www.ietf.org/rfc/rfc5625.txt
  - https://datatracker.ietf.org/doc/rfc1035/
  - https://datatracker.ietf.org/doc/html/rfc8499
  - https://datatracker.ietf.org/doc/rfc9484/
- Supported claims:
  - RFC 5625 provides DNS proxy implementation guidelines.
  - RFC 1035 specifies the DNS protocol/format.
  - RFC 8499 provides DNS terminology.
  - RFC 9484 specifies proxying IP in HTTP.
- Individual authorship is separate from engineering authority; named RFC authors are not automatically project maintainers.

### 9. Next.js / Vercel
- Authority: Vercel for the Next.js project/platform relationship.
- Official sources:
  - https://nextjs.org/
  - https://nextjs.org/docs
  - https://vercel.com/frameworks/nextjs
  - https://vercel.com/docs/frameworks/full-stack/nextjs
- Supported claim: Next.js is presented as a React framework by Vercel; Vercel documents itself as the native Next.js platform.
- Individual engineer authority: NOT established.

### 10. OpenAI / ChatGPT Apps / MCP
- Authority: OpenAI for ChatGPT and its Apps/MCP platform documentation.
- Official sources:
  - https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt
  - https://openai.com/index/introducing-apps-in-chatgpt/
  - https://developers.openai.com/api/docs/mcp
- Supported claim: OpenAI documents ChatGPT developer mode, MCP-powered apps, and the Apps SDK/MCP integration model.
- Individual engineer authority: NOT established.

## Evidence Registry

| ID | Node | Claim | Source | Source Type | Verification Date | Result | Status |
|---|---|---|---|---|---|---|---|
| DEVENG-001 | GitHub | GitHub publishes official engineering-team material | https://github.com/blog/category/engineering | Official GitHub | 2026-10-03 | Organization engineering authority supported | VERIFIED-SOURCE |
| DEVENG-002 | Apple/mobileconfig | Apple publishes the Configuration Profile Reference | https://developer.apple.com/business/documentation/Configuration-Profile-Reference.pdf | Official Apple | 2026-10-03 | Authoritative platform documentation located | VERIFIED-SOURCE |
| DEVENG-003 | Android/VpnService | Android official API defines VpnService | https://developer.android.com/reference/android/net/VpnService | Official Android | 2026-10-03 | Platform API authority supported | VERIFIED-SOURCE |
| DEVENG-004 | Android/WebView | Android official API defines WebView | https://developer.android.com/reference/android/webkit/WebView | Official Android | 2026-10-03 | Platform API authority supported | VERIFIED-SOURCE |
| DEVENG-005 | WireGuard | WireGuard publishes official protocol and repository documentation | https://www.wireguard.com/repositories/ | Official WireGuard | 2026-10-03 | Project authority supported | VERIFIED-SOURCE |
| DEVENG-006 | sing-box | Official SagerNet documentation identifies sing-box project and clients | https://sing-box.sagernet.org/ | Official project documentation | 2026-10-03 | Project authority supported | VERIFIED-SOURCE |
| DEVENG-007 | Shadowrocket | App Store identifies Shadow Launch Technology Limited as developer | https://apps.apple.com/us/app/shadowrocket/id932747118 | Apple App Store | 2026-10-03 | Developer identity supported | VERIFIED-SOURCE |
| DEVENG-008 | FoxyProxy | Official GitHub organization publishes FoxyProxy repositories | https://github.com/foxyproxy | Official GitHub | 2026-10-03 | Project authority supported | VERIFIED-SOURCE |
| DEVENG-009 | DNS standards | IETF RFC system publishes DNS/proxy standards | https://www.ietf.org/rfc/rfc5625.txt | Official IETF | 2026-10-03 | Standards authority supported | VERIFIED-SOURCE |
| DEVENG-010 | Next.js/Vercel | Vercel documents Next.js as its framework/platform relationship | https://vercel.com/frameworks/nextjs | Official Vercel/Next.js | 2026-10-03 | Platform/project authority supported | VERIFIED-SOURCE |
| DEVENG-011 | OpenAI/ChatGPT Apps | OpenAI documents MCP apps and developer mode | https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt | Official OpenAI | 2026-10-03 | Platform authority supported | VERIFIED-SOURCE |

## Boundary / Missing Evidence
- No individual person is designated as an engineering authority unless a primary source explicitly supports that role.
- Shadowrocket's official App Store developer identity is verified, but no public official API/specification authority was established in this pass.
- FoxyProxy governance/maintainer hierarchy beyond the official organization/repositories is not established here.
- sing-box individual maintainer roles require separate official-source verification if needed.
- This map is an evidence layer; it does not change the Project Roadmap or Contract v2.1.
