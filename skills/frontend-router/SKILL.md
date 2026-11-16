---
name: frontend-router
description: Route frontend requests to the smallest relevant AI Frontend Studio skills. Use for website, landing page, visual design, logo, interaction, motion, 3D, security, performance, or rendered UI work, and when the user explicitly asks what this plugin can do.
---

# Frontend router

Let the user describe the outcome. Select the workflow and connected tools internally; do not ask the user to choose skills, MCPs, or implementation details.

## First-contact behavior

Apply these rules to the current message and conversation:

1. If the message includes a concrete frontend action, skip the menu and route the task directly, including on the first turn.
2. If the user asks what AI Frontend Studio can do without giving another concrete action, show the menu even if another task is active.
3. If the user invokes AI Frontend Studio without an actionable request and there is no active task in the conversation, show the menu.
4. If the user only mentions the plugin during an active task, continue that task and preserve its scope. Do not interrupt with the menu.
5. If an actionable task lacks a necessary detail, ask only the focused question needed for that task. Do not replace it with the menu.
6. Do not start implementation after showing the menu until the user selects a capability or describes a task.

Show this brief menu:

1. Build or refine a landing page or website.
2. Improve a site's visual direction or make its UI feel specific to the product.
3. Create an original logo, favicon, or interface icon set.
4. Add loading, upload, checkout, or order interactions and feedback.
5. Add purposeful animation, transitions, or scroll-driven effects.
6. Add interactive 3D or a 3D scroll experience.
7. Review frontend security.
8. Measure or improve frontend performance.
9. Review rendered UI for responsive behavior, accessibility, and visual quality.
10. Work on something else in frontend development.

End with: “Which one would you like to work on? Reply with a number or describe the task.”

## Inspect before routing

1. Read applicable repository instructions and identify the project root.
2. Inspect the relevant framework, package manager, routes, components, design tokens, typography, icon system, assets, behavior, and checks.
3. Read the packaged skill descriptions and the full instructions for the smallest set of relevant skills. If the host exposes a documented dynamic skill-loading mechanism, use it. If it does not, consult the available files as instructions and do not claim that they were automatically loaded.
4. Inspect the actual connected-tool inventory for this chat before selecting tools. A package reference or skill does not prove that an MCP, browser, image tool, scanner, filesystem, or command runner is available.
5. Summarize the requested outcome, constraints, target devices, and acceptance criteria. Preserve unrelated existing behavior.

## Skill route map

| User goal | Select these packaged skills |
|---|---|
| New or refined landing page/site | frontend-router → art-direction + landing-page-builder → rendered-ui-review |
| Visual direction or less generic UI | frontend-router → art-direction; include landing-page-builder for implementation and rendered-ui-review for rendered critique |
| Logo, favicon, or interface icons | frontend-router → logo-and-icons; include rendered-ui-review if integrated into a page |
| Loading, upload, order, or checkout flow | frontend-router → interaction-states; add frontend-security for relevant boundaries and rendered-ui-review for visual and keyboard verification |
| Animation, transition, or scroll effect | frontend-router → motion-and-scroll; add interactive-3d for 3D scenes, frontend-performance for costly effects, and rendered-ui-review to inspect the result |
| Interactive 3D or 3D scroll | frontend-router → interactive-3d + frontend-performance + rendered-ui-review; add motion-and-scroll for scroll choreography |
| Frontend security review | frontend-router → frontend-security; use a connected scanner only if it actually exists and is relevant |
| Performance review | frontend-router → frontend-performance + rendered-ui-review when rendering evidence is available |
| Responsive, accessibility, or visual review | frontend-router → rendered-ui-review; load other specialists in response to findings |
| Other frontend work | frontend-router chooses the smallest relevant skill set or uses available host tools and states any coverage gap |

## MCP and host-tool decision map

Choose a tool only after confirming the live inventory and its permitted operations. Candidate categories are optional and are not package dependencies.

| Capability in the current chat | Use when | Fallback |
|---|---|---|
| Figma or another design-context MCP | The user supplied or authorized a design file, variables, or component mapping | Inspect authorized local project context; do not assume account access |
| Browser automation or Chrome DevTools MCP | Rendered screenshots, interactions, traces, or browser diagnostics are needed | Do source-level review and state that rendered behavior was not checked |
| shadcn or another component registry MCP | The existing project uses a compatible registry and a component is relevant | Reuse project components and conventions |
| Security or dependency scanner | A real connected scanner is relevant and its output can be inspected | Perform a scoped source review; do not call it a scan |
| Image-generation integration | A raster image or texture is useful for the task | Use an authored SVG, CSS, code-native graphic, or authorized supplied asset |
| 3D authoring integration | The task requires a new mesh or animation from an actual modeling tool | Reuse an approved asset or state the authoring gap; browser renderers do not prove a modeling application was used |

Use local file and command tools only when the host actually provides them. Combine MCPs only when the task benefits from each one. Never invent a tool, operation, server, endpoint, credential, permission, or result. Do not require a service connection for skills-only work.

## Work sequence and boundaries

1. Make a short, project-aware plan before editing.
2. Ground design in audience, product, goal, brand anchors, real content/proof, and constraints. Do not invent testimonials, metrics, client logos, pricing, guarantees, or features.
3. Preserve established design tokens, components, framework, and working behavior unless the requested change requires otherwise. Avoid unrelated refactors.
4. Implement real, accessible controls and operation states. Use determinate progress only with real progress data. Confirm success only from an authoritative result.
5. Prevent duplicate side effects. After an uncertain order, payment, or upload result, reconcile with authoritative status before retrying. Reuse an idempotency identity only for the same logical request; a changed request needs a new identity.
6. For motion, honor reduced-motion preferences, preserve ordinary scrolling, and clean up listeners, observers, timelines, and animation frames.
7. For 3D, distinguish modeling from rendering; keep meaningful content in HTML, provide a static/poster fallback, lazy-load, reduce idle work, and dispose owned GPU resources.
8. Inspect rendered output at representative wide and narrow sizes when browser tools are available. Otherwise report source-only review.
9. Report changed files, evidence, tools and states actually checked, limitations, and server/owner actions still needed.

## Claims and references

Use [the source index](../../references/source-index.md) to trace these workflows to research inputs and primary guidance. It records contributions and limits. Linked sources are for study; this package redistributes no third-party code or assets.

Never claim that an unavailable tool was used, that a frontend review certifies backend security, that an automated accessibility scan establishes full WCAG conformance, or that a lab score is field Core Web Vitals.
