---
name: logo-and-icons
description: Use when the user asks for a logo, brand mark, favicon, app icon, navigation arrow, or consistent interface iconography in a web project.
---

# Logo and icons

Create original, usable vector assets and keep brand marks separate from interface iconography.

## Logo workflow

1. Inspect existing brand assets, product name, audience, use cases, and project conventions. Use an image or vector tool only if the host exposes one; otherwise create editable SVG source directly.
2. Define a short brief: what the product does, its tone, where the mark appears, required text, and constraints. Do not invent company claims or imitate another brand.
3. Offer two or three distinct concept directions when exploration is useful. Explain each concept in terms of the brief; do not present a generic pile of style presets.
4. Build the selected direction as a clean, scalable SVG. Keep paths, `viewBox`, fills, and strokes understandable. Avoid embedding raster screenshots or unlicensed fonts.
5. Export a symbol-only mark and a wordmark/lockup when requested. Provide monochrome, reverse, and light/dark variants only as needed.
6. Inspect the vector at 16, 24, 32, and 64 CSS pixels and on light and dark backgrounds. Check silhouette, counters, stroke weight, clear space, and one-color legibility.
7. If a browser or rasterizer exists, render and inspect the SVG. Otherwise report that visual rendering was not checked.
8. Do not promise trademark clearance or claim a mark is legally unique. Recommend human/legal review before commercial brand adoption.

## Interface icon workflow

- Use an existing project icon library first. If none exists, choose one source such as Lucide, Heroicons, Tabler, or Phosphor and keep its grid, stroke/fill weight, and optical size consistent.
- Use a specific SVG icon for arrows and controls. Never use emoji or emoji-style Unicode as interface iconography.
- Use directional arrows only where they communicate navigation or movement; do not append them decoratively to every call to action.
- Make icon-only controls keyboard operable and give each a meaningful accessible name. Mark purely decorative SVGs hidden from assistive technology.
- Check contrast, hit target, focus indicator, and alignment with adjacent type.

## Deliverables

Return the editable SVG source, requested variants, preview/context if available, and a short note listing assets or fonts that still need a license check. Keep source and output files in the project’s existing asset convention.

See [`../../references/design-rubric.md`](../../references/design-rubric.md) and [`../../references/source-index.md`](../../references/source-index.md).
