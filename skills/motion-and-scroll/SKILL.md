---
name: motion-and-scroll
description: Design or implement interface motion, page transitions, scroll-driven effects, and loading, upload, checkout, or order feedback. Choose CSS first for simple effects; use GSAP/ScrollTrigger, Scrollama, or View Transitions when their added control solves a concrete need.
---

# Motion and scroll

Use motion to explain hierarchy, continuity, and state. Keep content and controls understandable when every animation is removed.

## 1. Inspect the interface

- Read the relevant routes, components, styles, and async handlers. Identify the framework, router, installed motion libraries, server-rendering constraints, and existing motion tokens before choosing an implementation.
- List the state changes the user can observe: navigation, loading, validation, upload progress, payment/order submission, completion, failure, cancellation, and retry.
- Check the product's supported browsers, keyboard and touch paths, and existing `prefers-reduced-motion` behavior. If these are unspecified, choose a progressive enhancement with a static or immediate fallback.
- Consult [Three.js and scroll patterns](../../references/threejs-scroll-patterns.md) and the [source index](../../references/source-index.md) when a reference implementation would help. Treat references as examples; check their current APIs and licenses before adopting a dependency or asset.

## 2. Choose the smallest suitable technique

| Need | Start with | Add another library/API when |
|---|---|---|
| Hover, pressed, disclosure, or short enter/exit feedback | CSS transitions and keyframes | The sequence must coordinate many elements or needs interruptible timelines. |
| A decorative reveal or progress effect tied to scroll | CSS scroll-driven animations with a static fallback | The supported browser set lacks the needed timeline behavior or the effect needs complex state. |
| Long, reversible, pinned, or choreographed scroll sequences | GSAP with ScrollTrigger, if already present or deliberately selected | Its timeline control materially reduces custom scroll code. Keep ordinary page scrolling intact. |
| Step-based editorial storytelling | Scrollama / IntersectionObserver-style step observation | A step callback is enough; avoid continuous per-frame work for discrete sections. |
| A route or document transition | View Transitions API with feature detection | The route lifecycle and browser support fit the API; retain normal navigation as fallback. |

Do not assume a package, polyfill, browser capability, or build tool is installed. Inspect the project first. State any dependency that must be added and why. Prefer CSS for simple effects and keep content available without JavaScript.

## 3. Define choreography from real state

- Write down the start state, user action, authoritative completion signal, visible result, failure result, cancellation behavior, and retry path before animating an async action.
- For uploads, distinguish file selection, validation, transfer, server-side processing, completion, failure, and cancellation. Show a percentage only when the transport provides meaningful progress; otherwise use an indeterminate status. Never simulate progress that implies a real transfer rate or completion.
- For checkout and order placement, show submitting or payment-pending while awaiting the application/server result. Show an order as confirmed only when trusted application state confirms it. Keep retry behavior safe from accidental duplicate submission.
- Keep useful status text visible and expose concise changes through an appropriate live region. Do not send every progress tick to screen readers; throttle announcements or announce meaningful milestones. Use `aria-busy` only while the relevant region is actually busy.
- Motion should clarify cause and result. Reuse the product's duration/easing tokens, keep related elements coordinated, and avoid decorative sequences that delay reading or action. Use real vector or raster logo/icon assets for marks and arrows; do not substitute emoji glyphs.

## 4. Implement with accessible fallbacks and clean lifecycles

- Prefer `transform` and `opacity` for frequent animation. Avoid scroll handlers that repeatedly measure layout or cause layout/paint work. Use CSS timelines, IntersectionObserver, or a library's maintained scroll integration where they fit.
- Respect `prefers-reduced-motion`: remove nonessential travel, parallax, scrubbing, autoplay, and large scale/zoom effects. Keep the state change and result immediate or use a restrained opacity/color change. Honor an in-product motion preference if one exists.
- Make every action available by keyboard and touch. Do not make hover the only way to reveal content or controls. Preserve visible focus; do not animate focus off-screen, trap keyboard input, or prevent ordinary scrolling.
- On navigation, manage focus and scroll according to the router's established behavior. A transition must not hide the destination, duplicate focus, or leave the previous page interactive. Announce a meaningful page change when the app's navigation model requires it.
- Clean up timelines, triggers, event listeners, observers, timers, and animation frames when the component unmounts or the route changes. In React, scope and revert GSAP work in the component lifecycle; avoid stale closures and duplicate triggers after remounts. Refresh measurements after meaningful layout changes only when needed.
- For View Transitions, feature-detect the API and allow ordinary navigation if unavailable or interrupted. Keep transition callbacks short and do not put essential rendering or network work inside them.

## 5. Review the experience

Check the actual interaction at narrow and wide viewports, with keyboard only, touch input, reduced motion, slow or failed network, and the supported browsers. Verify that:

- text, controls, and completion/error status remain understandable with motion disabled;
- scroll remains user-controlled, sticky/pinned sections release correctly, and content is not hidden behind animation;
- progress is truthful, errors and cancellation are actionable, retries work, and order confirmation comes from trusted state;
- focus remains visible and predictable through dialogs, route changes, and asynchronous completion;
- animations remain smooth on a representative lower-powered device and leave no listeners or timelines running after navigation.
