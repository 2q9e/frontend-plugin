---
name: art-direction
description: Set a product- and audience-grounded visual direction for frontend work when the brief or existing UI does not already define one. Use before implementation or to diagnose generic visual output; pair with landing-page-builder when building a full page.
---

# Art Direction

Turn the brief and the existing product into a small, usable visual direction. The aim is a coherent interface with a reason behind its choices, not novelty for its own sake.

## Workflow

1. **Assign each visual input a role.** Read the user's wording and label each supplied image as a target reference, current result, alternate state, or general inspiration. Never assume two screenshots show the same page or state. If the roles cannot be inferred and would change the work, ask one focused question; otherwise state the mapping and continue. For a target/current pair, keep the target beside the rendered result during review.

2. **Inspect the project first.** Read the relevant routes and components, then identify the framework, design tokens, typography, spacing, color conventions, icon set, image assets, and responsive patterns already in use. Keep the established system intact. Extend it with a small number of tokens or components only where the work needs them; do not replace the design system or add a library just to change the look.

3. **Ground the direction in the product.** Establish the intended audience, their task, the page or feature goal, the product's actual distinguishing qualities, brand tone, content available, and practical constraints. Use the user brief and repository as evidence. Do not invent customer logos, testimonials, metrics, pricing, certifications, or product capabilities. If a missing fact would change the direction materially, ask one focused question; otherwise state a modest assumption and continue.

4. **Read the reference as a composition.** For a target screenshot, record its focal object, scale and placement, text hierarchy, type character, negative space, edge annotations, lighting/material, and visible interaction. Separate these transferable relationships from source-specific wording, logos, and assets. A reference can define concrete layout and interaction acceptance criteria; “inspiration only” does not mean replacing its composition with a generic page template.

5. **Write a visual thesis.** In one or two sentences, connect the intended feeling and hierarchy to the audience and product. Decide what users should notice first, what should feel trustworthy or distinctive, and what visual evidence supports that impression. Do not use a fixed anti-style blacklist: a pattern is suitable when it serves this product and audience, and unsuitable when it does not.

6. **Translate the thesis into usable rules.** Choose a restrained set of decisions for:
   - type roles, scale, line length, and emphasis;
   - semantic colors, contrast, and dark/light surfaces where needed;
   - spacing, content width, grid, and responsive reflow;
   - image, illustration, or product-demo treatment;
   - borders, elevation, shapes, and component density;
   - icon style and any motion that clarifies hierarchy or feedback.

   Reuse project tokens and components before proposing new ones. Make each choice work with real content, keyboard focus, narrow screens, and reduced-motion preferences.

7. **Keep interface symbols deliberate.** Do not use emoji or Unicode pictographs as interface icons, and do not substitute a text arrow for a designed CTA icon. Use the existing icon family, a licensed SVG asset, or a purpose-made SVG mark. Keep size, stroke/fill, optical alignment, and color treatment consistent. Hide decorative SVGs from assistive technology; give icon-only controls an accessible name.

8. **Hand off a concise direction.** Record the visual thesis and the handful of rules that implementation needs. If the user asked for design only, show the direction and key examples before expanding it into a full system. If implementation is authorized, apply the rules directly in the relevant components and tokens without unrelated refactoring. Preserve the reference's composition and interaction when requested, while retaining the user's real brand and content. Do not copy source logos, exact copy, or protected media.

9. **Review the rendered result.** When a browser or screenshot tool is available, render the relevant page at representative desktop and mobile sizes, inspect hierarchy, contrast, real copy, spacing, focus, and responsive behavior, then adjust the largest mismatch and review again. For a target screenshot, align viewport, scroll position, and interaction state as closely as possible, compare the target directly with the output, and fix the largest structural mismatch before polishing. If rendering is unavailable, say so and perform source-level review only; do not claim visual verification.

## Sources and review

- Use the shared [design rubric](../../references/design-rubric.md) to check fit, hierarchy, accessibility, and coherence.
- Use the [source index](../../references/source-index.md) for public examples of design systems, landing pages, and visual workflows. Treat references as pattern inspiration, not permission to copy code, copy, logos, illustrations, photographs, or other assets. Verify the source's current license and asset terms before reuse.
- Use only tools that are actually available in the current host. Figma, browser rendering, screenshot capture, and image generation are optional capabilities. State the limitation and use the best available fallback rather than implying a tool was used.

## Finish criteria

- The visual choices can be explained from the brief, audience, and existing product.
- Existing design tokens and components remain the foundation.
- Typography, color, layout, assets, icons, and motion feel like one system and remain usable at narrow widths.
- No unsupported product claims or unlicensed assets have been introduced.
- The rendered work has been reviewed when rendering tools are available, and any unverified areas are named.

