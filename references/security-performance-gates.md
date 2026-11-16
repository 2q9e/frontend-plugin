# Security, accessibility, and performance gates

Use only the checks the project and host can run. Record tool/version, route, state, and output. Do not infer assurance from a clean automated report.

## Frontend security

- Search/render paths for untrusted HTML sinks, dynamic evaluation, unsafe URL construction, client-visible secrets, and unreviewed third-party scripts.
- Review dependency advisories and lockfile changes with available tooling; inspect reachability and remediation instead of blindly upgrading everything.
- Review redirects, navigation destinations, and user-controlled URLs for scheme and origin constraints.
- Treat authentication, authorization, payment, order status, upload type/size/content, rate limits, and storage policy as server responsibilities.
- Report findings with file/line, source-to-sink path when established, exploit preconditions, severity rationale, and a concrete safe alternative.
- Never say “secure” or “certified” from a frontend-only pass. Separate confirmed issues, potential issues, and backend requirements.

## Accessibility

- Use semantic controls, labels, visible focus, keyboard operation, zoom/reflow, and sufficient text/UI contrast.
- Represent upload progress semantically and provide a separate concise live status when needed. Avoid noisy repeated announcements.
- Announce meaningful pending/success/error changes without moving focus unnecessarily.
- Test reduced-motion paths and ensure the remaining feedback is understandable.
- Automated scans cover only some accessibility issues. Add keyboard, visual, and assistive-technology review where available.

## Performance

- Baseline before changing: capture Core Web Vitals field data when available; label Lighthouse/DevTools values as lab measurements.
- Google documents “good” Core Web Vitals thresholds of LCP ≤ 2.5 seconds, INP ≤ 200 milliseconds, and CLS ≤ 0.1 at the 75th percentile. Recheck official documentation because thresholds can change.
- Inspect largest content, JavaScript/network cost, fonts, image dimensions/formats, long tasks/frames, layout shifts, third-party code, and route-specific assets.
- Lazy-load below-the-fold media and 3D; retain a useful poster/static state. Avoid preloading fonts or assets without measuring priority and layout-shift effects.
- For 3D, inspect compressed file size, texture memory, draw calls, frame rate, decode work, and cleanup on target mobile hardware. Keep a non-WebGL path.
- Use repeatable budgets and screenshots where the project supports them. Do not claim a field improvement from lab-only results.

## Status reporting

Label each item as **checked**, **not checked**, **not applicable**, or **requires server/owner action**. Attach evidence and reproduction steps. Distinguish source review, automated checks, rendered behavior, and manual review.
