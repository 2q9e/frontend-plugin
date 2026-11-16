---
name: rendered-ui-review
description: Use after building or changing frontend UI, or when the user asks for visual, responsive, interaction, accessibility, anti-generic, or quality review of a web page.
---

# Rendered UI review

Judge the actual interface against the task and design brief, not against source code alone or a trend checklist.

## Prepare the review

1. Read project instructions, the task brief, relevant implementation, and available acceptance checks.
2. Detect available browser/screenshot, accessibility, and performance tools. Do not assume a browser or plugin integration exists.
3. Identify the task mode (create, focused improve, audit, or plan) and honor its boundary. An audit is read-only unless fixes are authorized; a plan is not implementation.
4. Identify changed routes and states: initial, loading, pending, progress, success, error, retry, cancel, empty, disabled, and responsive states as applicable.
5. If a screenshot or design reference exists, align the source and implementation by route, viewport, theme, content/data, and interaction state before comparing. Normalize crop and device density when possible, and inspect both artifacts together when the host supports it. If a meaningful mismatch remains, report the comparison as not comparable; do not infer pixel-level fidelity from unmatched captures.

## Inspect the page

- Capture or render at a desktop viewport and a narrow mobile viewport. Also inspect the project’s supported breakpoints when relevant.
- Review hierarchy, content fit, typography, line lengths, spacing, contrast, focus, overflow, image crop, icon consistency, and whether the page fits its product and audience.
- Separate objective mismatches with the brief or source design from subjective polish suggestions. Tie each finding to a visible location and evidence; keep a deliberate deviation when the product or implementation constraints support it.
- Use the [anti-generic review](../../references/anti-generic-review.md) to inspect clusters of templated structure, ornament, copy, or interaction. Treat each as a signal with a product-specific exception, not a style ban.
- If local command execution is available and source review is useful, run the packaged [read-only source-signal checker](../../scripts/check_ui_signals.py) against the relevant project source. Check every result in context. It catches only explicit placeholder copy, placeholder image hosts, and empty link targets; it does not judge aesthetics or behavior.
- Check concrete layout and design-contract criteria at the relevant viewport, such as overflow, target visibility, line wrapping, alignment, and required states. Mark checks unverified when the necessary rendering or device evidence is unavailable.
- Activate each changed control with mouse, keyboard, and touch simulation where available. Confirm that visible state reflects the real operation response.
- Review reduced-motion behavior and confirm large movement is removed or simplified without deleting essential feedback.
- If 3D is present, inspect loading, poster/static fallback, controls, low-power/mobile path, errors, and cleanup after leaving the route.
- Run automated accessibility/performance tools only if available. Include their actual scope and output; automated passes do not prove WCAG conformance or field performance.

## Fix and report

Fix concrete issues that are within the requested scope. Keep findings specific: location, reproduction, observed behavior, impact, and change made. Do not claim visual fidelity, keyboard support, accessibility, performance, or security was verified when the relevant state/tool was not checked.

Report screenshots or recordings if produced, viewports and routes covered, controls/states exercised, tools and versions, issues repaired, and remaining manual or backend checks.

See [`../../references/design-rubric.md`](../../references/design-rubric.md) and [`../../references/security-performance-gates.md`](../../references/security-performance-gates.md).
