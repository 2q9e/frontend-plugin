---
name: frontend-performance
description: Measure, diagnose, or optimize frontend loading, responsiveness, visual stability, images, fonts, JavaScript bundles, CSS motion, or interactive 3D. Use when building or reviewing landing pages and browser applications where performance or animation quality matters.
---

# Frontend Performance

Measure the actual page and its important interactions before optimizing. Separate field evidence from lab diagnostics, set route-specific budgets, and preserve accessibility and visual quality while reducing cost. A Lighthouse score or one fast desktop trace is not proof of good real-user performance.

Use the companion gates and source index:

- [Security and performance gates](../../references/security-performance-gates.md)
- [Source index](../../references/source-index.md)

## Review sequence

### 1. Establish the target and baseline

Inspect project instructions, framework, build scripts, target browsers, routes, available devices, key user journeys, major images/fonts/third-party scripts, and whether the page uses canvas or WebGL. Identify the LCP candidate and interactions likely to be input- or animation-sensitive.

Use existing performance reports or configured tools first. Distinguish:

- **Field data:** real-user measurements from CrUX or a configured RUM collector. Prefer the 75th percentile, segmented by mobile and desktop when the source supports it.
- **Lab data:** Lighthouse, browser traces, or WebPageTest runs under controlled conditions. Use these to reproduce and diagnose; do not label them field results.

As of **November 16, 2026**, Google’s published “good” Core Web Vitals targets are **LCP ≤ 2.5 seconds, INP ≤ 200 milliseconds, and CLS ≤ 0.1 at the 75th percentile**. Confirm the current official thresholds before applying them in later work; metrics and tools can change. A new or low-traffic page may have insufficient field data. State that plainly.

Do not invent a baseline or infer a score from source code. If a runnable URL/build or measurement tool is unavailable, report what is missing and continue with a source-level review clearly labeled as such.

### 2. Set budgets before editing

Use the product’s existing budgets if present. If none exist, propose route-appropriate budgets for critical JavaScript, images, fonts, third-party requests, and 3D assets using the measured baseline and the project’s target devices. Do not claim one universal kilobyte, polygon, draw-call, or FPS budget is appropriate for every site.

If Lighthouse CI is already configured, review its assertions and resource budgets. If the project has no budget, describe an appropriate candidate and its tradeoff before changing CI configuration. Do not install a tool or write remote reports as part of a review.

### 3. Optimize images and fonts by priority

- Give images intrinsic width and height or a stable aspect ratio to reserve layout space. Serve responsive image sizes and modern formats when the build pipeline supports them, while preserving required fallbacks and visual quality.
- Identify the likely LCP image from a real trace/report. Keep its URL discoverable in markup, do not lazy-load it, and consider `fetchpriority="high"` only for the confirmed critical resource. Avoid promoting several unrelated images to high priority.
- Lazy-load below-the-fold images and noncritical embeds when appropriate. Check that image conversion preserves transparency, color, and responsive detail.
- Limit font families, weights, and subsets. Use a reliable fallback stack and an intentional `font-display` strategy. Preload only fonts that are demonstrably critical; preloads compete for bandwidth and may delay more important resources.

### 4. Optimize JavaScript, CSS, and third parties

- Inspect built bundle/resource output and use the available analyzer or browser trace to find unused code, large dependencies, duplicate modules, long tasks, and render-blocking resources.
- Split or defer noncritical code when it reduces work before first interaction. Avoid shipping a large animation or 3D engine on routes that do not need it; lazy-load scene code and assets at the point of use.
- Review third-party scripts for necessity, transferred size, execution cost, and page trust. Do not add trackers or external services as an optimization technique.
- Prefer CSS transforms and opacity for simple movement, but profile actual rendering. Large blurs, filters, shadows, excessive promoted layers, and many simultaneous effects can still be expensive. Do not add `will-change` indiscriminately.

### 5. Profile motion and 3D on target devices

Use browser performance traces and frame/CPU data during scroll, hover, route changes, and key interactions. If using the Long Animation Frames API, feature-detect it; browser support is limited. Treat desktop results as insufficient for mobile GPU and memory behavior.

For WebGL/Three.js scenes:

- Give model, texture, initial-download, and runtime-memory budgets appropriate to target devices.
- Compress geometry and textures only after visual inspection. Tools such as glTF Transform support geometry compression and texture resize/compression pipelines; verify the exact encoder and browser/runtime support.
- Lazy-load scenes, pause or reduce work when offscreen where appropriate, and dispose geometries, materials, textures, render targets, and other owned resources when no longer used.
- Provide a useful non-WebGL fallback or static scene where the effect is nonessential. Honor `prefers-reduced-motion`; offer a static or reduced-motion version of scroll-driven motion. Use CSS scroll-driven animations only when supported by the target browser set or provide a nonanimated fallback.

### 6. Re-measure the same scenario

After a change, repeat the same routes, viewport/device profile, and interaction sequence when tools permit. Compare the relevant field metric or the same lab conditions and inspect for regressions in visual output, accessibility, or behavior. Note test variance and third-party conditions rather than presenting a small score change as conclusive.

## Tool use and reporting

Inspect installed commands and existing project configuration first. Use only available tools, such as the repository’s configured Lighthouse CI, browser DevTools, existing WebPageTest integration, or `web-vitals` instrumentation. Do not run commands that fetch packages implicitly, install new dependencies, publish reports, or upload code/data to an external service without authorization.

For each recommendation or completed optimization, report:

- Route, device/viewport, interaction, and measurement type (field or lab).
- Baseline and after values with units, source/tool, and run conditions.
- The observed bottleneck and evidence that connects it to the code or asset changed.
- The change made or proposed, expected tradeoff, and any behavior or visual checks performed.
- Commands run exactly, results, tools unavailable, data limitations, and unmeasured routes.

If only static source was reviewed, say so. Do not claim that the page meets Core Web Vitals based on a local build score, or that a 3D scene is “optimized” without device or model evidence.

## References

Optional further reading and tool documentation. The metric targets and field-data interpretation are sourced to G1 and G2 in `references/source-index.md`; the other links are tool, API, or asset-processing pointers, not evidence of measurements or checks performed.

- [Google Core Web Vitals guidance](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [PageSpeed Insights: field and lab data](https://developers.google.com/speed/docs/insights/v5/about)
- [GoogleChrome `web-vitals`](https://github.com/GoogleChrome/web-vitals)
- [Lighthouse CI configuration](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md)
- [Chrome DevTools Performance panel reference](https://developer.chrome.com/docs/devtools/performance/reference)
- [Chrome DevTools Performance Monitor](https://developer.chrome.com/docs/devtools/performance-monitor)
- [MDN Long Animation Frames API guide](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/Long_animation_frame_timing)
- [web.dev LCP optimization](https://web.dev/articles/optimize-lcp)
- [web.dev font best practices](https://web.dev/articles/font-best-practices)
- [MDN CSS performance and animation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/CSS)
- [MDN `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion)
- [MDN WebGL best practices](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices)
- [Three.js resource disposal](https://threejs.org/manual/pages/how-to-dispose-of-objects.html)
- [glTF Transform CLI](https://github.com/donmccurdy/glTF-Transform/blob/main/packages/cli/README.md)
- [GoogleChromeLabs Squoosh](https://github.com/GoogleChromeLabs/squoosh)
