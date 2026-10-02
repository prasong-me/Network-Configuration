# Tool Control / Execution Architecture Evidence — 2026-10-03

Status: EVIDENCE COLLECTION / VERIFIED-SOURCE LAYER

Purpose
- Document the structural control points that govern tool exposure, authorization, execution, permissions, and verification.
- This is an evidence map, not an assertion that every control is implemented identically in this project.

## 1. MCP control plane
Official sources:
- https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture
- https://modelcontextprotocol.io/specification/2026-07-28/server/tools
- https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization
Evidence:
- MCP separates client/server roles and exposes server capabilities such as tools, resources, and prompts.
- MCP authorization is defined at the transport level for restricted servers.
Control implication:
- Tool availability and authorization are distinct from model intent.
- Invocation authority must be checked at the client/server boundary.

## 2. OpenAI tool/MCP control
Official sources:
- https://developers.openai.com/api/docs/guides/tools-connectors-mcp
- https://developers.openai.com/plugins/build/mcp-server
- https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt
Evidence:
- OpenAI documents MCP tool calls as either automatically allowed or restricted to explicit developer approval depending on configuration/server.
- MCP servers are expected to enforce authorization for requests.
- ChatGPT developer mode is documented as a mechanism for MCP-powered apps to take actions in connected tools.
Control implication:
- User authorization, application/tool permissions, server-side authorization, and actual execution are separate control layers.

## 3. GitHub Actions control
Official sources:
- https://docs.github.com/actions/reference/workflow-syntax-for-github-actions
- https://docs.github.com/en/actions/concepts/security/openid-connect
- https://docs.github.com/enterprise-cloud@latest/admin/enforcing-policies/enforcing-policies-for-your-enterprise/enforcing-policies-for-github-actions-in-your-enterprise
Evidence:
- Workflows are configured automated processes defined in workflow files.
- GitHub documents permission controls and short-lived OIDC tokens.
- Enterprise policy documentation describes restrictions on workflow permissions and execution.
Control implication:
- Workflow definition, trigger authorization, token permissions, and external trust are separate control boundaries.

## 4. Browser execution control
Official source:
- https://browser-use.com/posts/production-architecture-browser-use
Evidence:
- Browser Use describes a managed cloud browser execution architecture for browser-agent tasks.
Control implication:
- A browser task can remain non-terminal even after submission; execution state must be distinguished from final result.
- Runtime state must not be promoted to PASS without terminal evidence.

## 5. Project control model alignment
Existing project source:
- docs/control/TOOL_SEMANTIC_COMPATIBILITY_BASELINE_2026-10-01.md
Established internal rule:
Task Intent → Capability → Tool Selection → Contract Check → Execute → Raw Output → Output Contract Validation → Target/Version Match → Evidence Match → Handoff

State separation:
EXECUTED ≠ OUTPUT_PRESENT ≠ OUTPUT_VALID ≠ MATCHED ≠ VERIFIED ≠ PROJECT_COMPLETE

## Evidence Registry

| ID | Node | Claim | Source | Source Type | Verification Date | Result | Status |
|---|---|---|---|---|---|---|---|
| CTRL-ARCH-001 | MCP architecture | MCP defines client/server architecture and server-exposed capabilities | https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture | Official MCP | 2026-10-03 | Architecture source located | VERIFIED-SOURCE |
| CTRL-ARCH-002 | MCP authorization | MCP defines transport-level authorization for restricted servers | https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization | Official MCP | 2026-10-03 | Authorization layer supported | VERIFIED-SOURCE |
| CTRL-ARCH-003 | OpenAI MCP | OpenAI documents automatic vs explicit approval for MCP tool calls | https://developers.openai.com/api/docs/guides/tools-connectors-mcp | Official OpenAI | 2026-10-03 | Approval control supported | VERIFIED-SOURCE |
| CTRL-ARCH-004 | OpenAI MCP server | OpenAI requires authorization enforcement in MCP server guidance | https://developers.openai.com/plugins/build/mcp-server | Official OpenAI | 2026-10-03 | Server-side control supported | VERIFIED-SOURCE |
| CTRL-ARCH-005 | GitHub Actions | Workflow configuration and permissions are explicit control surfaces | https://docs.github.com/actions/reference/workflow-syntax-for-github-actions | Official GitHub | 2026-10-03 | Workflow control supported | VERIFIED-SOURCE |
| CTRL-ARCH-006 | GitHub OIDC | GitHub documents short-lived OIDC tokens for hardened/verifiable workflow identity | https://docs.github.com/en/actions/concepts/security/openid-connect | Official GitHub | 2026-10-03 | Identity-control layer supported | VERIFIED-SOURCE |
| CTRL-ARCH-007 | Browser runtime | Browser Use documents managed cloud browser execution architecture | https://browser-use.com/posts/production-architecture-browser-use | Official Browser Use | 2026-10-03 | Runtime-control evidence located | VERIFIED-SOURCE |

## Boundary
- These sources establish documented control mechanisms, not the exact hidden implementation of this ChatGPT runtime.
- User authorization to use tools does not override platform, connector, rate-limit, permission, or runtime constraints.
- Tool execution success remains distinct from output validity and verification.
