---
name: frontend-security
description: Review or implement browser-side security for websites and frontend applications. Use when generating or reviewing HTML, CSS, JavaScript, TypeScript, client-side forms, uploads, redirects, third-party scripts, dependencies, or deployment security headers. This skill does not certify an application or replace server-side controls.
---

# Frontend Security

Review the browser-facing code and its deployment boundary for concrete security risks. Treat generated code, URL values, API responses, uploaded content, and third-party scripts as separate trust boundaries. Report evidence and scope; do not claim that a frontend review proves the whole application secure.

Use the companion gates and source index:

- [Security and performance gates](../../references/security-performance-gates.md)
- [Source index](../../references/source-index.md)

## Review sequence

### 1. Establish the scope

Inspect the repository instructions, framework, package manager and lockfile, build output location, routing approach, hosting configuration, and any existing lint or security scripts. Identify whether the task is a static landing page, a client-side application, or a frontend connected to an API.

Record the target browsers and any declared server or payment integrations. Do not infer that a frontend-only repository contains the server-side controls required for orders, authentication, payments, or file processing. Do not install tools, update dependencies, or change unrelated files just to complete a review.

### 2. Trace untrusted values to browser sinks

Look for untrusted values from form fields, URL path/query/hash, `postMessage`, local or session storage, API responses, files, and third-party sources. Follow where they are rendered, used in URLs, or passed to executable browser APIs.

Prioritize these patterns:

- Avoid `eval`, `new Function`, and string arguments to `setTimeout` or `setInterval`. Parse data as data; use fixed dispatch maps and function callbacks.
- Do not send untrusted strings to `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write`, `srcdoc`, inline event-handler attributes, or equivalent framework escape hatches. Prefer framework text rendering, `textContent`, and DOM APIs with fixed tag and attribute names.
- If rich HTML is a required feature, use a maintained allowlist sanitizer such as DOMPurify, configure a narrowly scoped Trusted Types policy when supported, and audit the policy. Sanitization does not make arbitrary scripts or URLs safe.
- Validate URL schemes and destinations before navigation or resource loading. Reject `javascript:` and other unexpected schemes; allow only the protocols and origins required by the feature. Avoid assigning attacker-controlled values to script, iframe, form-action, or redirect destinations.
- For links opened in a new browsing context, use safe `rel` values such as `noopener` and `noreferrer` where appropriate.
- Inspect SVG and uploaded markup as active content when it can be rendered inline. Prefer image decoding or a constrained format allowlist when full SVG behavior is unnecessary.

Use static search as a lead, not proof: a match may be safe static markup, while a clean search does not establish that all data flows are safe. Tie each finding to the source value, sink, and relevant file/line evidence.

### 3. Check client-visible secrets and browser requests

Inspect source files, configuration, and built client assets when available for private API keys, credentials, signing secrets, payment secrets, private tokens, or server-only environment values. Treat any value bundled into browser code as public, including values exposed through framework-prefixed environment variables. Public, intentionally publishable keys should be clearly identified as such.

Review third-party scripts and dynamic script injection. Record each external script origin and why it is needed. Prefer a small, reviewed set of dependencies. Use Subresource Integrity for fixed cross-origin scripts or stylesheets when supported; it does not protect dynamic content or replace dependency review.

Use the package manager that matches the committed lockfile. If a compatible audit tool is already installed, inspect its version/help and run the repository's configured dependency audit without changing the lockfile. Suitable examples include the configured package-manager audit command or an available OSV-Scanner. Do not use `npx` or another command that may fetch and execute a tool that is not installed. Report the exact command and whether it completed.

### 4. Review forms, uploads, and transaction boundaries

Frontend validation is for immediate user feedback. Make clear that the server must independently enforce authentication, authorization, input validation, upload type and size restrictions, file storage and processing safety, CSRF protections where applicable, order totals, inventory, and payment status.

For upload UI, use an explicit allowlist, readable size/type constraints, safe filenames, progress, cancellation/retry behavior where supported, and meaningful error states. Treat client-provided file names and MIME types as untrusted. Do not claim a client-side extension check is security enforcement.

For order or checkout UI, use an established payment provider's supported client integration when applicable. Never place a secret payment key or authoritative price, order status, or authorization decision in client code. Display success only after the trusted service confirms success; identify missing server/API integration as a blocker or dependency.

### 5. Review policy and deployment controls

Check whether the hosting/server configuration can deliver security headers. Where the repository controls deployment, review CSP, frame restrictions, HTTPS behavior, and any relevant permissions policy. CSP should be application-specific and delivered as an HTTP response header when possible. Use report-only mode to evaluate a new policy before enforcement; do not add a broad policy that silently breaks the application.

Treat CSP and Trusted Types as defense in depth. Do not present a meta tag, static scan, sanitizer, or hosting default as a substitute for safe rendering and server controls. If headers are controlled outside the repository, state that this portion could not be verified and name the deployment configuration needed.

### 6. Run only available checks

Inspect existing project scripts and installed tools before running anything. Prefer configured lint, type, or security-check commands and scanners already present. ESLint rules such as `no-eval`, `no-new-func`, and `no-implied-eval` are useful narrow checks; a JavaScript/TypeScript CodeQL scan can add data-flow findings if the CLI or service is configured.

Do not install dependencies, upload source to a hosted scanner, publish scan results, or contact external services unless the user has authorized that exact action. If a tool is unavailable or not configured, report it as not run; do not imply a clean result.

## Findings and report

For every finding, include:

1. Severity and user impact, calibrated to reachable code and data.
2. File and line, or another precise source location.
3. The input/trust boundary and the sink or missing enforcement.
4. A concrete, framework-appropriate fix.
5. Whether the issue was confirmed in code, flagged by a tool, or is an integration requirement.

Separate confirmed issues, tool leads requiring review, and controls outside the frontend repository. Include checks run, exact commands and results, tools unavailable, and files or routes not inspected. Never say “secure,” “OWASP compliant,” or “certified” based only on this review.

## References

Optional further reading and tool documentation. The directly used OWASP sources are listed as S1 and S2 in `references/source-index.md`; the other links are pointers for later project-specific work, not evidence that a scanner was run or that a project is secure.

- [OWASP ASVS](https://asvs.owasp.org/)
- [OWASP JavaScript and TypeScript Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/JavaScript_and_TypeScript_Security_Cheat_Sheet.html)
- [OWASP Cross-Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [OWASP DOM-based XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html)
- [OWASP File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)
- [OWASP Third-Party JavaScript Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Third_Party_Javascript_Management_Cheat_Sheet.html)
- [MDN Content Security Policy guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)
- [MDN Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Subresource_Integrity)
- [DOMPurify project documentation](https://github.com/cure53/DOMPurify)
- [ESLint `no-implied-eval`](https://eslint.org/docs/latest/rules/no-implied-eval)
- [CodeQL query help for JavaScript and TypeScript](https://codeql.github.com/codeql-query-help/javascript/)
- [Google OSV-Scanner](https://github.com/google/osv-scanner)
