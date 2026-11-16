# Frontend design contract

Use this lightweight contract to connect the product brief, implementation choices, and review evidence. It is a working note, not a compliance certificate or a reason to slow down a one-line fix.

## Choose the mode

| Mode | Boundary |
|---|---|
| Create | Define a product-grounded direction, build the requested surface, and review the result. |
| Improve | Change the smallest requested area and preserve the existing system and behavior. |
| Audit | Inspect and report findings; do not edit unless the user authorizes fixes. |
| Plan | Produce sequence, risks, and acceptance checks; do not implement. |

## Discover the existing system

Before choosing tokens or visual direction, check applicable project instructions and the design sources they identify. Look for a project `DESIGN.md` or equivalent, brand guidance, component documentation, and the token files used by the current implementation. Verify documented rules against representative components and the rendered surface. When no design document exists, the current code tokens and established components are the baseline; use platform defaults only where the project has no applicable convention.

If documentation and code disagree, record the source paths and the affected decisions. Preserve working implementation until the user requests a system change or the task requires one, then make the smallest coherent update across documentation and code.

## Contract template

Copy only the fields useful to the task. Keep it in the response or project notes unless the user requests a persistent design document.

```text
Mode:
User outcome:
Audience and user task:
Product facts and where they came from:
Surface, platform, and target sizes:
Existing design-system sources (files, tokens, components) and conflicts:
Constraints (content, accessibility, motion, performance, dependencies):
Visual thesis (one or two sentences):
Information and interaction structure:
Content and asset provenance:
Acceptance checks (observable, not aesthetic adjectives):
Evidence record (check / method / result / status):
Out of scope:
```

For a screenshot or design comparison, also record the source and rendered capture, route, viewport, state, theme, content/data, and any density or crop difference. Compare only aligned evidence. If an important dimension differs or one artifact is missing, mark the comparison not comparable or not checked instead of claiming visual fidelity.

For a visual direction that the user has not specified and the project does not already establish, sketch up to three materially different options. Change more than hue: consider page structure, type character, material, imagery, density, or interaction. Compare each option with the actual audience, task, content, and implementation cost; choose the best fit, not the most unusual. If the user gives a direction or the project already has one, follow it instead of generating alternatives.

Use observable acceptance checks such as “the primary action is visible at 390 px,” “the error is announced without moving focus,” or “no horizontal overflow at supported widths.” Do not turn taste into a numerical score or claim a visual judgment passed because a checklist is complete.

## Evidence status

Use **pass**, **finding**, **not checked**, or **not applicable** for each check. Attach the route, viewport, state, command/tool, and observed result when available. A plan is not a pass. A static scan does not establish that a rendered control works; a screenshot does not establish that a backend operation is truthful.

Keep the note ephemeral for a small fix. Create or update a project `DESIGN.md` only when the user asks for it or when a multi-surface project needs a durable shared direction and its source tokens have been inspected.
