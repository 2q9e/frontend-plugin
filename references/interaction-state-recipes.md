# Interaction-state recipes

Model the operation first; choose animation after the state and source of truth are clear.

## Typical state set

```text
idle
  -> submitting
  -> uploading(progress only when real bytes/steps exist)
  -> processing
  -> success | error | cancelled
error -> retry -> submitting
```

Some operations need fewer states. Do not invent upload or order states the backend does not expose.

## Operation contract

- Use one operation identity and one state record. A loading toast/button may transition to success/error; do not create a success notification separate from the operation that completed.
- Prevent duplicate submissions. Disable the submit control while the server request is in flight or use a server-supported idempotency mechanism.
- Bind an idempotency key to one logical request payload. Reuse it only for a retry of that same request; generate a new key when the user changes the request.
- Use `AbortController` only when cancellation is meaningful and the operation can safely stop. Explain when canceling only hides the UI while server processing continues.
- Show determinate progress only from real measured progress. Otherwise use an indeterminate indicator and concise text such as “Uploading…” or “Processing your order…”.
- Keep user input available after recoverable failure. Preserve file selection/order details where safe and provide retry/correct-action affordances.
- On an order flow, distinguish order creation, payment pending, payment confirmation, and final success if the backend distinguishes them. A redirect or ended animation is not confirmation.
- If the result is unknown, block edits and resubmission until the owning application reconciles that same request. Do not reuse its key for a changed payload.

## Accessibility and motion

- Use semantic buttons/forms and keep keyboard focus stable through every async transition. Announce meaningful changes in a persistent polite status region instead of moving focus to report a transition.
- Expose progress with native `<progress>` or an equivalent role and a separate, concise `role="status"` region for meaningful updates. A changed `aria-valuenow` alone may not be announced.
- Mount the status region before updates. Avoid announcing every rapid percentage; announce start, meaningful milestones, completion, and errors.
- Respect `prefers-reduced-motion`. Keep text/status visible if an animation is removed.
- Confetti or decorative animation may follow confirmed success, but never substitute for the success message or backend result.

## Review cases

Inspect success, retryable error, fatal error, cancel, slow/network-lost response, duplicate click, and unmount/navigation behavior. For upload, include rejected file and server validation failures. For checkout, include payment-pending and payment-failed responses when supported.

Optional related examples: [W3C ARIA25 progress status](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA25), [runnable upload-progress example](https://www.w3.org/WAI/WCAG22/working-examples/aria-progressbar-status-message/), [WooCommerce order-processing flow](https://developer.woocommerce.com/docs/block-development/extensible-blocks/cart-and-checkout-blocks/how-checkout-processes-an-order/), and [WooCommerce Checkout Store statuses](https://developer.woocommerce.com/docs/block-development/reference/data-store/checkout/). W1–W3 and WC1–WC2 in `source-index.md` identify the direct sources for this package’s accessibility and checkout claims; the runnable page is an example, not copied production code.
