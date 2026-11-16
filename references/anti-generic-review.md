# Anti-generic interface review

Use these signals to find decisions that may have come from a default template rather than the product. They are questions, not bans. A familiar pattern is appropriate when it helps this audience complete this task.

| Signal to inspect | Ask | Keep it when |
|---|---|---|
| The same hero, three-card grid, metric row, and closing CTA appear by habit | Does this structure answer the visitor's actual questions in the right order? What product-specific structure would work better? | The product's information genuinely fits that sequence and it reads clearly. |
| Decorative eyebrow labels, highlighted headline words, arrows, glows, and badges accumulate | Does each element carry information, aid navigation, or support the brand? | It has a clear role, works with the existing visual system, and does not crowd content. |
| A palette, font, or effect is chosen before product context | Which real audience, use case, brand cue, or content makes this choice useful? | The project already uses it or the brief supports it. A common font or gradient is not a defect by itself. |
| Copy uses placeholder phrases, repeats labels, or invents proof | Can every product claim be traced to supplied content or the repository? Is the same fact repeated without helping a decision? | Sample content is clearly labeled and intentional, or repeated information is needed in that context. |
| Controls look finished but have no meaningful action or state | What happens on activation, failure, retry, cancellation, and an uncertain response? | The control is intentionally unavailable and communicates why, or its behavior is verified. |
| Motion, parallax, or 3D draws attention without helping the task | Does it explain hierarchy, progress, cause and effect, or product function? Does the page remain usable with reduced motion and without WebGL? | It adds meaning, has an accessible fallback, and stays within the user's performance constraints. |
| Every section uses the same density, alignment, and component recipe | Does hierarchy reflect the importance and type of each piece of information? | Repetition creates useful consistency and is not flattening distinct content. |

## Review method

1. Read the brief and existing system. Record the audience, primary task, product evidence, and explicit visual cues in the [design contract](design-contract.md).
2. Look for clusters of signals, not one isolated choice. A familiar card, default font, or gradient may be fully intentional. Treat a source-checker hit as a candidate for review, not an automatic defect.
3. For each concern, inspect the source context and rendered result when available. Name the location, explain the mismatch with the product or task, and suggest one concrete alternative. Preserve a pattern that fits the product and record the reason when it is useful. Do not substitute a universal “anti-slop” style.
4. Confirm the chosen direction in rendered desktop and narrow layouts when a browser is available. Review real copy, hierarchy, controls, focus, motion preferences, and state behavior. Otherwise label the result source-only.
5. Separate observed issues from aesthetic preference. Preserve intentional exceptions and the evidence for them.

The optional [`check_ui_signals.py`](../scripts/check_ui_signals.py) script finds only a few explicit source placeholders and empty links. It does not identify visual quality or prove a page is generic. Read its findings and verify the context before acting.
