# Motion, scroll, and 3D implementation patterns

Use the least complex technique that meets the brief. A design can remain strong without animation or WebGL.

## Choose the renderer

- **CSS transitions/keyframes or scroll timelines:** small state changes and simple progress-linked effects. Keep a normal-flow fallback.
- **Motion or GSAP:** choreographed timelines, gesture interactions, or multi-step scroll scenes when the project already uses them or the added dependency is justified. Clean up framework effects and review license conditions for the intended use.
- **`<model-viewer>`:** one interactive product model with camera controls, poster, lazy loading, and fallback.
- **Three.js/React Three Fiber:** custom scene graph, multiple models, shaders, configurators, or DOM/WebGL coordination. Set device-appropriate budgets and render only as needed.
- **Blender or another modeling tool:** authoring/editing meshes and animations. Export glTF/GLB for the browser renderer; rendering libraries do not create the source mesh.

## Scroll choreography

1. Keep document scrolling native. Do not hijack the wheel or block the user’s ability to skip a scene.
2. Prefer CSS scroll/view timelines for simple effects. Use `IntersectionObserver`-style triggers for chapter changes; use scrubbed JavaScript only when the design needs continuous control.
3. Keep text and controls in semantic DOM. Layer 3D as progressive enhancement, and preserve content when WebGL is disabled.
4. Test mobile/touch, orientation, viewport resize, browser back/forward where navigation changes, and `prefers-reduced-motion`.
5. If reduced motion is enabled, remove large parallax/camera movement or replace it with brief state feedback/static imagery.

## 3D lifecycle

- Supply a correctly sized poster image and meaningful `alt` description. Lazy-load below-the-fold scenes and display actual loading/error states.
- Do not show invented download progress. Bytes may be unavailable when the server does not expose a content length; use an indeterminate state then.
- Reuse geometry/material/texture resources where possible. Dispose resources and event listeners on replacement/unmount; removing a mesh alone may not release GPU memory.
- Check model transfer size, texture dimensions, draw calls, animation cost, decoder startup, memory, frame pacing, and mobile thermal impact.
- Provide keyboard/DOM controls and equivalent product information outside canvas. Preserve a static poster on low-power devices or when WebGL fails.

## Source references

The links below are optional further reading and implementation examples. The direct scroll-timeline and 3D lifecycle sources used by this reference are recorded as W4 and D1–D3 in `source-index.md`; the other links are not dependencies or tested compatibility claims.

- [CSS scroll-driven animation guide](https://developer.chrome.com/docs/css-ui/scroll-driven-animations)
- [Scrollama](https://github.com/russellsamora/scrollama) for step-based narratives
- [14islands R3F Scroll Rig](https://github.com/14islands/r3f-scroll-rig) for DOM-synchronized scenes; heed its mobile guidance
- [React Three Fiber performance guidance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- [Three.js disposal manual](https://threejs.org/manual/pages/how-to-dispose-of-objects.html)
- [`<model-viewer>` loading example](https://modelviewer.dev/examples/loading/index.html)
- [glTF Transform](https://gltf-transform.dev/) for repeatable asset processing
