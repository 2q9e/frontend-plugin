---
name: landing-page-builder
description: Build or refine a responsive marketing, product, or campaign landing page in an existing frontend project. Use when page structure, real content, responsive behavior, or conversion flow needs implementation; use art-direction when the visual direction is not yet grounded.
---

# Landing Page Builder

Build a complete page around the user's product and audience. A landing page is a guided story and working interface, not a collection of generic sections.

For work spanning multiple sections or states, use the [design contract](../../references/design-contract.md) as a concise acceptance plan. For a focused page change, keep the plan in the response and avoid creating project-wide design files.

## Workflow

1. **Inspect before editing.** Identify the framework, route structure, existing layouts, components, design tokens, typography, icon system, image pipeline, CSS conventions, and available run/render tools. Read any project-specific instructions relevant to the target files. Preserve the existing design system and reuse its components. Avoid replacing the stack, adding a competing component library, or refactoring unrelated areas.

2. **Ground the page in real context.** From the brief and existing product, identify the audience, the task or decision this page supports, the main value proposition, the primary action, approved proof, brand constraints, and any device or accessibility requirements. Do not invent outcomes, customer names, testimonials, pricing, guarantees, security claims, or capabilities. Do not use lorem ipsum or generic filler. If an important fact is missing, ask a focused question or leave it out and report what content is needed.

3. **Plan the story before styling.** Draft a page outline that answers the audience's likely questions in an order that fits the product: what it is, who it helps, why it matters, how it works, what evidence supports it, and what the next step is. Choose only sections that earn their place. There is no mandatory hero-plus-three-cards-plus-testimonials formula; familiar patterns are fine when they serve the message. Use concise, specific copy drawn from approved facts. Check for template-shaped section sequences and repeated claims with the [anti-generic review](../../references/anti-generic-review.md), but keep patterns that are a good fit.

4. **Set or confirm art direction.** If the brief and existing interface do not establish a direction, use [art-direction](../art-direction/SKILL.md) to define one before building. Keep the direction consistent across typography, color, grid, imagery, surfaces, components, and motion. Use the shared [design rubric](../../references/design-rubric.md) when evaluating tradeoffs.

5. **Implement the page with real content and assets.** Use semantic landmarks and headings, a clear primary action, working navigation, and actual product information. Use images from the project, user-provided sources, or an available generation tool when appropriate; verify rights and provenance. Do not ship unrelated stock imagery or fake customer/proof content. Give meaningful images useful alt text, and mark decorative visuals appropriately. Use responsive image sizing and loading behavior; preserve the hero image's loading priority when it is the likely LCP element.

6. **Build responsive and interactive behavior.** Check the page at mobile, tablet, and desktop widths. Reflow content instead of merely shrinking it; check heading wraps, navigation, cards, image crops, spacing, buttons, and forms. Every visible control must work. Forms need useful validation and clear pending, error, and success feedback; do not show a successful order, payment, or submission animation until the trusted operation has actually succeeded. Keep motion purposeful, provide a reduced-motion path, and ensure essential meaning is available without animation.

7. **Use designed icons.** Do not use emoji or Unicode pictographs as interface icons, and do not use a text arrow as a decorative CTA substitute. Prefer the project's icon package or a licensed SVG icon. Keep one consistent size and stroke/fill vocabulary; label icon-only buttons and hide purely decorative icons from assistive technology.

8. **Render, inspect, and refine.** If local run commands and a browser/rendering tool are available, start the project using its documented workflow and inspect the finished page at representative mobile and desktop sizes. Follow the main CTA, open navigation, and submit forms where safe; inspect hover, keyboard focus, disabled, loading, error, and success states that exist. Compare the rendered result with the page story and design rubric, fix the most visible mismatch, and review again. If a browser or screenshot tool is unavailable, inspect the code and responsive rules, state that visual review could not be completed, and do not claim the page was rendered or tested.

9. **Report the result accurately.** Summarize the page story and visual choices, files changed, responsive or interaction states reviewed, available checks performed, missing content or assets, and any areas that could not be verified. Distinguish source inspection from browser rendering and measured performance results.

## Reference use and limits

- Use the shared [source index](../../references/source-index.md) for source-available landing pages, design systems, and interaction examples. Study their composition, tokens, and state handling; do not copy their code, wording, logos, or media wholesale. Re-check licenses and asset provenance before reuse.
- Use the [design-pattern index](../../references/design-pattern-index.md) to find stack- and task-relevant guidance. Prefer the project's own components and references over importing a large style catalog or preset.
- Use only browser, design, image, and local development tools available in the current environment. Do not claim Figma inspection, image generation, browser rendering, accessibility scanning, or performance measurement unless that action actually occurred.
- A landing page review does not establish backend security, payment correctness, accessibility conformance, or field performance. Report only the behavior and evidence that were actually inspected.
