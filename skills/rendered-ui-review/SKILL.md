---
name: rendered-ui-review
description: Use after building or changing frontend UI, or when the user asks for a visual, responsive, interaction, accessibility, or quality review of a web page.
---

# Rendered UI review

Judge the actual interface against the task and design brief, not against source code alone or a trend checklist.

## Prepare the review

1. Read project instructions, the task brief, relevant implementation, and available acceptance checks.
2. Detect available browser/screenshot, accessibility, and performance tools. Do not assume a browser or plugin integration exists.
3. Identify changed routes and states: initial, loading, pending, progress, success, error, retry, cancel, empty, disabled, and responsive states as applicable.
4. If a screenshot or design reference exists, use visual comparison when the host provides a suitable tool; otherwise compare manually and state the method.

## Inspect the page

- Capture or render at a desktop viewport and a narrow mobile viewport. Also inspect the project’s supported breakpoints when relevant.
- Review hierarchy, content fit, typography, line lengths, spacing, contrast, focus, overflow, image crop, icon consistency, and whether the page fits its product and audience.
- Activate each changed control with mouse, keyboard, and touch simulation where available. Confirm that visible state reflects the real operation response.
- Review reduced-motion behavior and confirm large movement is removed or simplified without deleting essential feedback.
- If 3D is present, inspect loading, poster/static fallback, controls, low-power/mobile path, errors, and cleanup after leaving the route.
- Run automated accessibility/performance tools only if available. Include their actual scope and output; automated passes do not prove WCAG conformance or field performance.

## Fix and report

Fix concrete issues that are within the requested scope. Keep findings specific: location, reproduction, observed behavior, impact, and change made. Do not claim visual fidelity, keyboard support, accessibility, performance, or security was verified when the relevant state/tool was not checked.

Report screenshots or recordings if produced, viewports and routes covered, controls/states exercised, tools and versions, issues repaired, and remaining manual or backend checks.

See [`../../references/design-rubric.md`](../../references/design-rubric.md) and [`../../references/security-performance-gates.md`](../../references/security-performance-gates.md).
