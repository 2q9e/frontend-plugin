# AI Frontend Studio

**Repository description:** Product-aware frontend design, anti-generic review, implementation, and quality workflows for Codex.

AI Frontend Studio is a skills-only plugin package with ten focused skills, original references and examples, an editable SVG mark, and an optional read-only source-signal checker. It helps an agent work in an existing frontend project, preserve its design system, build real interface behavior, and report what it could and could not verify. It does not bundle an MCP server, browser, design editor, image generator, security scanner, backend, or 3D modeling application.

## Capabilities

| User goal | Skill route |
|---|---|
| Build or refine a landing page or site | frontend-router → art-direction + landing-page-builder → rendered-ui-review |
| Improve visual direction or make a UI fit its product | frontend-router → art-direction; add landing-page-builder for implementation and rendered-ui-review for rendered critique |
| Create a logo, favicon, or interface icons | frontend-router → logo-and-icons; add rendered-ui-review if integrated into a page |
| Add loading, upload, checkout, or order behavior | frontend-router → interaction-states; add frontend-security for relevant security boundaries and rendered-ui-review for visual and keyboard checks |
| Add animation, transitions, or scroll effects | frontend-router → motion-and-scroll; add interactive-3d for 3D, frontend-performance for costly effects, and rendered-ui-review to inspect the result |
| Build interactive 3D or a 3D scroll scene | frontend-router → interactive-3d + frontend-performance + rendered-ui-review; add motion-and-scroll for scroll choreography |
| Review frontend security | frontend-router → frontend-security; use a connected scanner only when one is actually available and relevant |
| Measure or improve performance | frontend-router → frontend-performance; add rendered-ui-review when rendering evidence is available |
| Review responsive behavior, accessibility, or visual quality | frontend-router → rendered-ui-review; select other specialists based on findings |
| Compare an implementation with a supplied screenshot or design | frontend-router → rendered-ui-review; add art-direction if the task also changes the visual direction |
| Create, refine, audit, or plan a frontend experience | frontend-router selects the matching work mode; use the design contract for shared acceptance checks |
| Handle another frontend task | frontend-router selects the smallest relevant skill set or works with available host tools and states any coverage gap |

## Design process and anti-generic review

The workflow supports four modes: create, focused improve, audit, and plan. The [design contract](references/design-contract.md) records which project sources define the current system, any conflicts between them, and observable acceptance checks. The [anti-generic review](references/anti-generic-review.md) treats familiar layouts and effects as signals to inspect, not styles to ban. The [design-pattern index](references/design-pattern-index.md) narrows references by task, platform, stack, and interaction need. Screenshot comparisons are meaningful only when route, viewport, state, theme, and content are aligned; unmatched evidence is reported as not comparable.

An optional standard-library Python 3.9+ script scans source for explicit placeholder copy, placeholder image hosts, and empty link targets:

~~~sh
python scripts/check_ui_signals.py /path/to/project/src
python scripts/check_ui_signals.py /path/to/project/src --json
~~~

It is read-only and never edits files. Findings need context review; a clean scan does not establish visual quality, accessibility, or functional correctness. `--fail-on-findings` is available when a project deliberately wants these limited signals to fail a local check.

## First contact and runtime status

The frontend-router defines a short capability menu for an invocation without an actionable task. It also says to show the menu whenever a user asks what the plugin can do without giving a concrete task, even if another task is active. A concrete request skips the menu. A bare plugin mention during active work continues that work unless the user asks to see capabilities.

The manifest points its documented OpenAI onboarding setting at frontend-router and provides a starter prompt for showing the menu. Current packaging documentation describes onboarding skills as running when the user runs plugin setup, and describes default prompts as example prompts. It does not establish that a bare composer mention automatically opens the menu or runs the skill.

**Release gate: unmet / blocker.** This package was not installed and the exact bare-mention flow could not be exercised in the target runtime without changing host configuration. Do not claim that bare invocation works or that the plugin is release-ready. Manual fallback: use the “Show me the AI Frontend Studio capability menu” starter prompt, or ask directly, “What can AI Frontend Studio do?”

The target surface available during package work was Codex desktop. Its exact application build was not exposed, and no runtime or plugin installation test was performed. The package structure follows the current official [plugin packaging guide](https://developers.openai.com/plugins/build/plugins) and [skills guide](https://developers.openai.com/plugins/build/skills), accessed November 16, 2026.

## How skill and tool selection works

The user describes the frontend outcome they want. The router reads the packaged skill descriptions and the tools actually exposed by the current host, then chooses the smallest sufficient workflow internally. It does not ask the user to pick a skill, MCP, or implementation tool.

The skills provide instructions and examples. Host tools provide file access, command execution, design context, browser inspection, scanning, or generation. A tool named in a reference is not presumed to be connected. If the host does not support dynamically loading a skill, use the available files as instructions and say that automatic loading was unavailable.

| Tool category | Use when connected and relevant | Fallback and limit |
|---|---|---|
| Figma or design-context integration | The user supplied or authorized a design file, variables, or component mapping | Inspect authorized files and project tokens; never infer access to a Figma account |
| Browser automation or DevTools | Rendered screenshots, interaction checks, traces, or performance diagnostics are needed | Do source-level review and mark rendering or measurement as unverified |
| Component registry such as shadcn | The project already uses a compatible registry and the requested component fits | Use existing project components or implement with its conventions |
| Security or dependency scanner | A connected scanner is available, in scope, and its results can be inspected | Perform a scoped source review; do not call it a scan |
| Image generation | A raster image or texture would improve the requested result | Use an authored SVG, CSS, code-native visual, or user-provided asset |
| 3D authoring integration | The user needs a new mesh or animation authored in a real modeling tool | Use approved existing assets or a proportionate procedural scene; browser renderers do not prove a modeling application was used |

No connection is required for the skills-only workflows. Report missing capabilities only when they limit the requested work.

## Quality rules

- Inspect project instructions, framework, tokens, typography, components, icons, assets, and existing behavior before changing implementation.
- Ground visual decisions in the real audience, product, page goal, supplied content, proof, and constraints. Do not fabricate testimonials, metrics, logos, pricing, or capabilities.
- Keep existing design conventions unless the requested outcome requires a change. Do not impose a universal style blacklist.
- Make controls work and model pending, progress, success, failure, cancellation, retry, and uncertain states only as the operation supports them.
- Show determinate progress only when real progress values exist. Show success only after authoritative confirmation.
- Keep keyboard focus in its current place during asynchronous state changes; announce meaningful updates through a persistent polite status region.
- Prevent duplicate side effects. After an uncertain result, reconcile with an authoritative status source before retrying. Reuse an idempotency identity only for the same logical request; a changed request requires a new identity.
- Keep frontend guidance separate from server authorization, payment, order, upload-validation, storage, and secret-management requirements.
- Use authored or licensed SVG iconography. Do not substitute emoji or decorative Unicode arrows for icons.
- Respect reduced-motion preferences and provide static or simpler fallbacks. For 3D, retain meaningful HTML and a poster, lazy-load scenes, avoid idle rendering, and clean up owned GPU resources.
- Establish a performance baseline and compare the same scenario after a change. Label lab results and field data separately.
- Treat automated accessibility and security output as scoped evidence, not proof of conformance or certification.

## Package contents

~~~text
plugin.json
LICENSE
README.md
assets/ai-frontend-studio.svg
skills/<module>/SKILL.md
references/
scripts/
examples/
evaluations/scenarios.md
~~~

The ten skills are frontend-router, art-direction, landing-page-builder, logo-and-icons, interaction-states, motion-and-scroll, interactive-3d, frontend-security, frontend-performance, and rendered-ui-review. Optional, no-dependency scripts provide narrow source signals; they do not replace rendered review.

Keep the package together when distributing it. Skills link to shared files in references and examples, so a single SKILL.md is not a complete export.

## Source and licensing

The workflow is derived from the project’s research findings, reference catalog, plugin blueprint, existing skills-only prototype, and a comparative review of publicly inspectable design-agent sources with different license terms. See [references/source-index.md](references/source-index.md) for the capability-to-source map, license classifications, source contributions, evidence limits, and reuse notes. No third-party skill text, code, checker, database, or design assets were copied into this package.

This repository uses the custom source-available [SAVL-1.0 license](LICENSE), not an open-source license. Its terms allow narrow viewing for personal evaluation but restrict copying, modification, deployment, and use of covered material by AI systems. That AI-use restriction conflicts with using this package as a Codex plugin unless the rights holder separately authorizes that use or revises the terms. Resolve this before installing or distributing the package for AI use.

The license applies only to material 2q9e owns or is authorized to license. The original prototype’s files do not state an independent license, so confirm the rights for any retained prototype material before broader distribution. No third-party skill text, code, screenshots, data, fonts, logos, icons, images, or 3D models are bundled. External projects in the source index are links for further study only; check their source and asset terms separately before adopting anything.

## Package and compatibility

The canonical manifest is the root plugin.json using the portable Agent Plugins schema. OpenAI-specific presentation and onboarding settings live under extensions.com.openai in that same manifest. The custom license is identified as `LicenseRef-SAVL-1.0`; the identifier does not change or broaden the rights in the root LICENSE. There is no duplicate Codex overlay, empty MCP server, or runtime dependency.

The package has not been installed, uploaded, submitted, or published. Local static checks can establish manifest shape, skill metadata, and internal paths; they cannot establish host loading or the bare-invocation release gate above.
