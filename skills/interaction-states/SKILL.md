---
name: interaction-states
description: Design and implement clear, accessible pending, progress, success, error, cancellation, and retry feedback for asynchronous front-end actions such as uploads, saves, checkout, and payments.
---

# Interaction states

Use this skill whenever a user action waits on an asynchronous operation or changes important data. The visual treatment should feel deliberate and fit the product, while the state must describe what the operation has actually confirmed.

## Workflow

1. **Inspect the operation contract.** Find the callback/API, its authoritative success response, failure modes, cancellation behavior, retry guarantees, and any idempotency support. Do not infer server state from a spinner, a click, an HTTP request starting, or an optimistic UI update.
2. **Map the states before styling.** Use the state table below and identify the transitions the operation can really support. Keep the user’s input and context available through failure and retry.
3. **Implement the controls and feedback.** Use the project’s existing framework, form conventions, tokens, and icon set. Use a clear text label; do not use emoji as a substitute for an action icon or status.
4. **Check accessibility and edge cases.** Verify keyboard operation, status announcements, focus after errors and completion, reduced-motion behavior, duplicate submission protection, and what the UI says when the result is uncertain.
5. **Report what was verified.** Do not claim the operation succeeded, was cancelled, or was tested unless the application’s authoritative result or an actual verification supports that claim.

## State model

| State | Meaning and UI behavior |
| --- | --- |
| `idle` | The user can review or edit the input and submit once. |
| `pending` | The action was accepted locally and is starting. Prevent a second submit immediately, including with a synchronous in-flight guard. |
| `running` | The operation is still unresolved. Show a concise status and, only when supplied by the operation, real progress. |
| `success` | The operation’s authoritative result confirms completion. Show a truthful confirmation or the returned result. Do not create a success state from an optimistic update. |
| `error` | The operation reports a known failure. Explain what the user can do, preserve the input, and offer retry only when the failure is safe to retry. |
| `cancelling` | A cancellation request was sent; the outcome is not yet known. Keep duplicate submission blocked while waiting for the operation’s result. |
| `cancelled` | Cancellation is confirmed by the operation. Preserve input. Offer retry only if the operation confirms retry is safe. |
| `unknown` | The client lost the result, timed out, or aborted while the server may still have completed the work. Say that the outcome could not be confirmed and reconcile with the server before offering another submission. |

Use transitions the underlying operation supports. A typical flow is `idle → pending → running → success|error|unknown`; cancellation is `running → cancelling → cancelled|success|error|unknown`. A retry begins a new `pending` attempt from a known, retryable `error` or `cancelled` state.

### Progress and transaction truth

- Show a determinate bar or numeric progress only when the operation reports a real current value and a real total/max. Validate that the values are finite and within range. Do not invent percentages, elapsed-time estimates, stages, or completion points to make an animation look active.
- When progress is real but has no known total, use an indeterminate native `<progress>` element or a concise status message. Omit `value`; do not simulate a percentage. If the operation exposes no progress, show only an honest pending/running message.
- Do not announce every progress tick to assistive technology. Announce the start and meaningful stage changes; keep stage labels stable across numeric updates and expose the changing value through the progress element. Keep a persistent polite status region for state changes.
- Treat a rejected request or an aborted `fetch` as potentially ambiguous if the server could already have committed the action. For purchases, payments, uploads, or other side effects, show `unknown` and query the order/job status or use the server’s idempotency mechanism before retrying. An `AbortSignal` stops or requests cancellation of client work; it does not prove a server-side rollback.
- Show success only after the authoritative API confirms it. In checkout, distinguish validation, payment processing, accepted order, and completion/redirect. A successful pre-payment hook is not proof that payment was taken.
- Mark submit unavailable while an attempt is pending/running/cancelling and guard the submit handler synchronously. Use `aria-disabled` when preserving focus requires the control to stay focusable. For side-effecting APIs, also use server-side idempotency; a disabled button alone cannot prevent duplicate requests from reloads or multiple tabs.
- On a known failure, preserve the user’s values. Retry with the same intent and idempotency key when the backend supports it. Bind that key to the logical request payload: a changed request must use a new identity. Do not silently clear or reinitialize a form on failure.

## Accessibility and motion

- Prefer native `<form>`, `<button>`, `<fieldset>`, labels, and `<progress>` semantics. Every field needs a visible, programmatic label and useful validation text.
- Put `aria-busy="true"` on the region that is actually updating, not on a parent that contains the live region. Use a persistent `role="status"` / polite live region for non-urgent pending and progress messages. Keep progress output separately labeled; a native `<progress>` element has progress semantics and should not be given `role="status"`.
- When a known error needs action, show it beside the form and announce it through the persistent status region. On confirmed completion, announce the result there as well. Keep focus in its current place while async states change; do not move focus to report a transition.
- Do not communicate state by color or animation alone. Keep status text visible, maintain contrast, and preserve the user’s current input and place in the form.
- Respect `prefers-reduced-motion`. Avoid essential information conveyed only by motion, avoid looping animation when motion is reduced, and keep a stable non-animated status treatment available.

## Reference implementation

Use [the React/TypeScript transaction-state example](../../examples/transaction-states.tsx) as a reference template, not as a production drop-in. Its optional [stylesheet](../../examples/transaction-states.css) demonstrates a restrained pending spinner, progress treatment, and success reveal that appears only after confirmed completion; adapt its tokens to the project design system. Its operation callback is expected to classify confirmed success, known failure, confirmed cancellation, and unknown outcomes. When the operation can have committed despite a lost response, provide its optional `checkStatus` adapter and query with a stable order/job/idempotency key; the example blocks another submission while the result is unknown. Without an adapter, the form stays locked until the owning application reconciles the operation and replaces or remounts the workflow from confirmed state.

For deeper visual patterns, consult the plugin’s [interaction-state recipes](../../references/interaction-state-recipes.md).

## References

- W3C, [WAI-ARIA 1.2: `progressbar` role](https://www.w3.org/TR/wai-aria-1.2/#progressbar).
- W3C, [WCAG 2.2 Understanding Success Criterion 4.1.3: Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html).
- WooCommerce, [How the Checkout block processes an order](https://developer.woocommerce.com/docs/block-development/extensible-blocks/cart-and-checkout-blocks/how-checkout-processes-an-order/). The documented flow distinguishes pre-payment work from the request that attempts payment and only reaches `complete` after successful processing.
- WooCommerce, [Checkout Store reference](https://developer.woocommerce.com/docs/block-development/reference/data-store/checkout/). Documents the checkout statuses and their meanings.

W3 and WC1–WC2 in `references/source-index.md` record the direct ARIA and WooCommerce sources. The broader related links in `interaction-state-recipes.md` are optional examples and further reading.
