# Design pattern retrieval index

Use the smallest reference set that fits the user's goal. Filter by product task, platform, existing stack, interaction state, accessibility needs, and performance constraints. These references guide reasoning; they are not a style preset or a source of assets to copy.

| Need | Start with | Add when relevant |
|---|---|---|
| Product-specific direction or a less templated page | [design contract](design-contract.md), [anti-generic review](anti-generic-review.md), [design rubric](design-rubric.md) | `art-direction` and `landing-page-builder` skills |
| Existing interface redesign or focused refinement | Project `DESIGN.md`, tokens, and components first | `art-direction`, `rendered-ui-review` |
| Landing-page story, conversion, or real content | `landing-page-builder`; inspect the project's routes and supplied evidence | `logo-and-icons`, `interaction-states` |
| Loading, upload, checkout, or order states | [interaction-state recipes](interaction-state-recipes.md) and the transaction example | `frontend-security` for trust boundaries; WooCommerce-specific references only in WooCommerce projects |
| Scroll, transitions, or reduced motion | [scroll and 3D patterns](threejs-scroll-patterns.md) | `motion-and-scroll`, `frontend-performance` |
| WebGL, model, or product visualization | `interactive-3d` and its model-loading references | `frontend-performance`, `rendered-ui-review` |
| Framework or component-library decision | Inspect the project's package metadata and conventions; use connected registries only when present | Existing design-system docs and components |
| Accessibility, security, or performance audit | [security and performance gates](security-performance-gates.md) and the actual project implementation | `frontend-security`, `frontend-performance`, `rendered-ui-review` |

When looking beyond this package, search for evidence that matches one dominant task, the platform and stack, the affected interaction state, and the project's constraints rather than importing a large catalog by default. Check that the actual result applies to the current version and product; narrow the query once if it does not. If no relevant source remains, say no verified match was found instead of treating a broad result as guidance. Record the original source, license, version, contribution, and limitation before adopting code or assets. Prefer translating a useful idea into the project's established conventions over adding a dependency or wholesale preset.

The index is intentionally task-oriented, not a ranked collection of “best” designs. A reference can illustrate one technique without proving quality, compatibility, or permission to reuse its materials.
