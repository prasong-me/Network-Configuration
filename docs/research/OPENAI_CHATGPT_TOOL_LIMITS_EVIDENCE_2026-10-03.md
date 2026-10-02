# OpenAI / ChatGPT Tool, App, Connector and Limit Evidence

Date: 2026-10-03
Scope: Central Database support evidence for Iris tool-selection and limit handling
Source policy: OFFICIAL OPENAI SOURCES ONLY

## Authority
This record contains source-level facts only. It does not infer the availability of a tool in the current ChatGPT runtime. Runtime availability must be observed from the actual workspace/tool registry and recorded separately.

## Evidence records

| ID | Node | Claim | Source | Source Type | Verification Date | Result | Status |
|---|---|---|---|---|---|---|---|
| OPENAI-CHATGPT-001 | Tool/Limit Model | ChatGPT tool capabilities can have separate usage limits; Free-tier FAQ explicitly states file uploads, image generation, voice, data analysis and other tools have separate usage limits and ChatGPT notifies the user when an applicable limit is reached. | https://help.openai.com/en/articles/9275245-chatgpt-free-tier-faq | Official OpenAI Help Center | 2026-10-03 | Separate tool limits are documented | VERIFIED-SOURCE |
| OPENAI-CHATGPT-002 | App Limits | ChatGPT supports app-specific usage limits; official documentation describes Settings > Usage > App limits and managing an app's weekly usage limit. | https://help.openai.com/en/articles/20001542-using-your-chatgpt-plan-in-other-apps-and-sites | Official OpenAI Help Center | 2026-10-03 | App-specific limits documented | VERIFIED-SOURCE |
| OPENAI-CHATGPT-003 | App Permissions | App permissions determine when ChatGPT can read information from a connected account or take an action on the user's behalf. | https://help.openai.com/en/articles/20001495-managing-app-permissions-in-chatgpt | Official OpenAI Help Center | 2026-10-03 | Permission boundary documented | VERIFIED-SOURCE |
| OPENAI-CHATGPT-004 | Connected Apps | Connected apps work with services connected by the user; changing app permissions does not itself grant access beyond the access the app already has. | https://help.openai.com/en/articles/11487775-connected-apps-in-chatgpt | Official OpenAI Help Center | 2026-10-03 | Access/permission separation documented | VERIFIED-SOURCE |
| OPENAI-CHATGPT-005 | MCP Apps | ChatGPT Developer Mode supports MCP-powered apps that can securely take actions in connected tools, subject to the documented app-permission model. | https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt | Official OpenAI Help Center | 2026-10-03 | MCP/app capability documented | VERIFIED-SOURCE |
| OPENAI-CHATGPT-006 | App Availability | App availability can depend on plan, admin settings, user permissions and data-source entitlements; app connections do not override provider permissions or workspace restrictions. | https://help.openai.com/en/articles/20001063-chatgpt-for-excel-and-google-sheets | Official OpenAI Help Center | 2026-10-03 | Availability dependency documented | VERIFIED-SOURCE |
| OPENAI-CHATGPT-007 | Plugin/App Controls | Workspace/admin controls can govern access to plugins and apps; role-specific access controls apply in supported Enterprise/Edu contexts. | https://help.openai.com/en/articles/11509118-admin-controls-security-and-compliance-for-plugins-and-apps | Official OpenAI Help Center | 2026-10-03 | Administrative boundary documented | VERIFIED-SOURCE |
| OPENAI-CHATGPT-008 | Plan/Limit Variability | OpenAI states that available models and usage limits depend on plan and workspace settings and can change over time. | https://help.openai.com/en/collections/3742473-chatgpt | Official OpenAI Help Center | 2026-10-03 | Limits are dynamic/context-dependent | VERIFIED-SOURCE |

## Operational rules derived only from the above evidence

1. Iris must not assume that ChatGPT tools are unlimited merely because normal conversation remains available.
2. Limit dimensions must be tracked separately: plan/model allowance, app-specific limit, tool-specific limit, provider/service limit, workspace/admin restriction, permission and runtime availability.
3. A limit/permission error must be recorded with its observed source and timestamp. It must not be converted into a permanent tool ban unless a separate project policy explicitly requires that.
4. Connecting an app does not prove that every action of that app is available. Capability and permission must be checked at execution time.
5. Current runtime availability is not proven by OpenAI documentation alone. It requires workspace/tool-registry evidence from the actual runtime.
6. OpenAI documentation is authoritative for OpenAI product behavior; it is not evidence that a third-party connector's backend quota is unlimited.

## Explicit non-claims

- No claim is made that any particular connector/plugin is unlimited.
- No claim is made that every app listed in OpenAI documentation is available in this user's current workspace.
- No claim is made that a ChatGPT plan removes third-party service quotas.
- No global runtime block on remote tools is claimed by this document.

## Reconciliation rule
When runtime evidence conflicts with this source-level record, preserve both records, identify the scope difference, and do not overwrite historical evidence. The runtime observation must be recorded as a new evidence record.
