---
name: interactive-3d
description: Plan and build web experiences with interactive 3D models or scenes, including asset preparation, renderer selection, loading, accessibility, performance budgets, and cleanup. Separate model authoring from the web renderer and provide a useful non-WebGL fallback.
---

# Interactive 3D

Use 3D when rotation, depth, spatial explanation, or scene interaction improves the task. Treat a static image or video as the default fallback, and keep essential product information and actions in ordinary HTML.

## 1. Inspect the project and the asset

- Read the target page, framework, routing/build setup, installed packages, existing canvas/WebGL usage, asset pipeline, and supported devices before selecting a renderer. Do not assume Blender, Three.js, React Three Fiber (R3F), `<model-viewer>`, compression decoders, or a particular browser capability is available.
- Clarify the scene's purpose and interactions: product orbit/zoom, configurator, animated illustration, scroll-linked story, or full 3D environment. Decide whether the same task works better as a poster, video, CSS, SVG, or standard DOM.
- Inspect each model's file format, dimensions, scale, coordinate orientation, pivot, materials, animation clips, texture sizes, provenance, and license. Do not reuse an asset whose rights or attribution requirements are unknown.
- Use [Three.js and scroll patterns](../../references/threejs-scroll-patterns.md) and the [source index](../../references/source-index.md) for implementation references. Check current project/API versions and asset licenses; a tool's license does not license its example models or textures.

## 2. Separate model authoring from rendering

- Keep source modeling in the appropriate authoring tool or pipeline, such as Blender or CAD when available; keep browser renderer code responsible for loading, materials, camera, controls, and scene behavior. Do not build a complex authored object from ad hoc renderer primitives.
- Establish an asset contract before export: real-world scale or a documented unit convention, orientation, origin/pivot, stable object and animation-clip names, material naming, texture/color-space expectations, and a target file-size budget.
- Export portable web assets such as GLB/glTF when suitable. Bake unnecessary material complexity, remove unused nodes and animations, use sensible texture dimensions, and retain the source plus attribution/license metadata. Apply geometry or texture compression only when the matching decoder is included and supported by the app's loading path.
- Export animation clips with intentional names and timing. Drive them from user actions or meaningful interface states where practical; pause autoplay for reduced motion and when the scene is not visible.

## 3. Select the renderer

| Situation | Suitable starting point | Limits to account for |
|---|---|---|
| A single product model with orbit/zoom and standard materials | `<model-viewer>` when it is already available or deliberately adopted | It is a focused model viewer, not a general scene graph or custom multi-object experience. Confirm framework/build integration and browser support. |
| A custom camera, lighting, multiple objects, or bespoke interactions | Three.js for direct control; R3F when the project already uses React and its ecosystem | Adds WebGL, GPU, asset-loading, and lifecycle responsibilities. R3F is not a reason to convert a non-React page. |
| Decorative motion with no real 3D interaction | Prefer CSS, SVG, or video | Canvas/WebGL cost and fallback complexity are not justified by a static effect. |

Choose one renderer for the feature and avoid loading parallel render stacks. If a needed package is absent, implement a suitable existing-stack fallback or state the required dependency and its tradeoff; do not silently add it.

## 4. Build progressively and accessibly

- Render an appropriately sized poster first and reserve its layout space to prevent layout shift. Lazy-load the 3D runtime and model when the scene approaches the viewport or the user asks to interact. Avoid downloading a large scene before it is needed.
- Keep the HTML title, description, price, options, and actions outside the canvas. Give a decorative canvas an empty accessible treatment; for meaningful 3D, provide a concise text description and equivalent controls or product information in DOM.
- Provide visible control instructions and accessible names. Ensure rotate/zoom/configuration actions are operable by keyboard and touch, with buttons or other native controls as appropriate. Do not make drag the only route to inspect or select something; preserve page scrolling and avoid scroll hijacking.
- Provide a reduced-motion mode that stops automatic rotation, parallax, and scroll-scrubbing. Leave a user-requested, discrete model rotation under the user's control when the design allows. Respect browser and in-product motion preferences.
- Handle loading, progress, ready, unsupported WebGL, decode failure, network failure, and retry states. Show a determinate percentage only when the loader can report meaningful progress; otherwise show an indeterminate status. Preserve the poster and useful product information when WebGL or the model fails.

## 5. Budget and manage resources

- Set a project-specific budget before optimizing: initial transfer size, texture memory, scene complexity, time to usable controls, and target-device frame rate. Measure on representative mobile hardware and a throttled connection; there is no single safe model-size or triangle-count threshold for every product.
- Use GLB/glTF preprocessing and compression only after checking visual quality, decode cost, decoder availability, deployment paths, and licensing. Use lower-resolution textures, simpler materials, level of detail, instancing, or baked lighting only where measurements show benefit.
- Avoid rendering an idle scene continuously. Pause or use on-demand frames when static, suspend work while offscreen or in a background tab where applicable, and cap device pixel ratio and expensive effects on constrained devices.
- On teardown, stop animation mixers/actions and render loops, cancel pending loads where supported, remove listeners and observers, and dispose renderer-owned geometries, materials, and textures when they are no longer shared. Reuse shared resources deliberately and do not dispose assets still used elsewhere.
- Follow the selected renderer's current guidance for color management, shadow maps, texture decoding, GPU limits, context loss, and framework cleanup. Do not copy code or bundled assets from references; link to the source and preserve required notices when incorporating a dependency.

## 6. Review fallbacks and interaction

Review the feature with WebGL unavailable, a slow or failed model request, reduced motion, keyboard-only use, touch, narrow layout, and a representative lower-powered device. Confirm that the poster reserves space, meaningful information and actions remain available without the scene, control instructions are clear, loading/error feedback is truthful, motion can be stopped, and navigating away releases GPU and event resources.
