# Runtime evaluation scenarios

These are manual acceptance cases, not benchmark results. Run them only in an already available target host without installing the plugin or changing host configuration. Record the host surface/build, prompt, available skills/tools, actual response, files changed, states exercised, and evidence. A static package check cannot pass a runtime case.

## Release gate

**Scenario 1 is a release gate and is currently unmet.** The target runtime was not available with this package installed, and the build prompt prohibited installing it or changing host configuration. Do not claim bare-invocation support or release readiness until the exact flow passes in the target host.

## Cases

1. **Bare invocation.** Start a fresh chat and invoke AI Frontend Studio without an action. Pass only if the host actually displays the ten-item capability menu and the question asking what the user wants to work on. A default prompt button, onboarding skill description, or this evaluation document does not count. Current result: not run; unmet release blocker.

2. **Active task and capability question.** During an existing task, mention AI Frontend Studio without changing the request. Pass if work continues without an unsolicited menu. Then ask “what can you do?” without adding an action. Pass if the menu appears.

3. **Direct landing-page request.** Request a landing page with enough context to start. Pass if the menu is skipped and routing selects frontend-router → art-direction + landing-page-builder → rendered-ui-review. If one material detail is missing, ask only the focused question needed.

4. **Mixed page, logo, and 3D request.** Ask for a landing page with an original logo and scroll-driven 3D. Pass if routing selects art-direction, landing-page-builder, logo-and-icons, interactive-3d, frontend-performance, motion-and-scroll, and rendered-ui-review as needed. Select only the relevant connected tools; never ask the user to choose tool names.

5. **Connected design and build tools.** Supply a live tool inventory containing Figma, browser diagnostics, and a compatible component registry. Pass if design context is used only for the supplied/authorized design, browser diagnostics are used for rendered review, and the registry is used only if the project supports it. No service is exposed as a user choice.

6. **Empty or incomplete MCP inventory.** Provide an inventory with no relevant external tools. Pass if the workflow proceeds with available project tools, does not invent an MCP, and identifies only the specific rendering, design, scan, measurement, or authoring evidence it could not obtain.

7. **Established design system.** Use a project with existing tokens, typography, and components. Pass if they remain the foundation and no unrelated wholesale replacement occurs.

8. **Content and icons.** Request a design implementation. Pass if it uses supplied/project-grounded content and original or licensed SVG iconography; no fabricated proof, emoji icons, or decorative Unicode arrows appear.

9. **Ambiguous side-effect result.** Simulate an order/payment/upload response lost after the request may have reached the server. Pass if the result stays unconfirmed, another side effect is blocked, and reconciliation uses an authoritative status mechanism or the same idempotency identity for the same logical request. A changed request must receive a new idempotency identity. No payment, upload, or production mutation may be used for this evaluation.

10. **Integrated quality review.** Review reduced-motion behavior, narrow mobile layout, 3D poster/static fallback, resource cleanup, frontend/server security boundaries, and performance baseline plus remeasurement. Pass only for the checks actually performed; report unavailable browser, device, scanner, server, or field data as unverified.

## Evidence record

For each run, record:

- Host, surface, and exact version if exposed.
- Whether the scenario was a live host run, a local simulation, or a source-only review.
- Skills selected and connected-tool inventory at the time.
- Screenshots, interaction results, command/tool versions, measured values, and observed issues.
- Criteria not reached and the reason. Do not mark a case passed from expected behavior alone.
