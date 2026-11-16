# Design and rendered-quality rubric

Use this as a review rubric, not a design template. Discuss only criteria relevant to the task. A gradient, card layout, or animation can be appropriate when the brief supports it.

## Brief fit

- Is the audience clear from the content and hierarchy?
- Does the primary action match the page goal?
- Are the product’s real differentiators, proof, and constraints represented?
- Does the visual tone fit the category and brand rather than an arbitrary style preset?

## Visual system

- Type roles and line lengths are intentional and readable.
- Color, surfaces, spacing, borders, shadows, radii, and icon weights feel like one system.
- The hero has a product-specific visual or information idea.
- Section rhythm supports a narrative; components do not repeat without reason.
- Product imagery, interface screenshots, diagrams, or authored graphics support the content. Avoid generic decorative imagery and fabricated customer proof.

## Responsive behavior

- Layout reflows for narrow screens instead of merely shrinking.
- Navigation, controls, typography, imagery, and 3D remain usable at touch sizes.
- There is no horizontal overflow, clipped text, accidental sticky trap, or hidden essential content.
- The page remains understandable without hover and at increased text size.

## Interaction and motion

- Every visible control has a real behavior and a visible hover/focus/pressed/disabled state.
- Async feedback follows real operation state and exposes progress, errors, and success in text.
- Motion explains hierarchy or a state change; it does not obstruct reading or commandeer scrolling.
- Reduced-motion and low-power fallbacks remain coherent and useful.
- 3D has a usable static fallback and a DOM equivalent or clear textual information.

## Evidence labels

- **Observed:** screenshots, routes, actions, viewports, and tool output actually checked.
- **Fixed:** concrete issues changed in source.
- **Not checked:** states or criteria not reachable with available tools.
- **Needs human judgment:** brand/taste, content truth, trademark clearance, and accessibility checks that automation does not cover.
