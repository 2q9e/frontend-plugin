import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

export type OperationProgress = {
  /**
   * A truthful stage label, such as "Uploading invoice.pdf". Keep it stable
   * across numeric progress updates; it is also used for live announcements.
   */
  label: string;
  /** Real completed work reported by the operation. Omit if unknown. */
  value?: number;
  /** Real total work reported by the operation. Omit if unknown. */
  max?: number;
};

/**
 * `cancelled` must mean cancellation is confirmed by the operation. If the client
 * only stopped waiting, return `unknown` instead.
 */
/** `retryable` is a safety decision for known error/cancellation outcomes. */
export type OperationOutcome<TResult> =
  | { status: "success"; result: TResult }
  | { status: "error"; message: string; retryable: boolean }
  | { status: "cancelled"; message: string; retryable: boolean }
  | { status: "unknown"; message: string };

export type StatusReconciliation<TResult> =
  | { status: "success"; result: TResult }
  | { status: "error"; message: string; retryable: boolean }
  | { status: "cancelled"; message: string; retryable: boolean }
  | { status: "pending"; message: string }
  | { status: "unknown"; message: string };

export type OperationContext = {
  signal: AbortSignal;
  onProgress: (progress: OperationProgress) => void;
};

type ViewState<TInput, TResult> =
  | { status: "idle" }
  | { status: "pending" }
  | { status: "running"; progress?: OperationProgress }
  | { status: "cancelling" }
  | { status: "reconciling"; inputSnapshot: TInput }
  | { status: "success"; result: TResult }
  | { status: "error"; message: string; retryable: boolean }
  | { status: "cancelled"; message: string; retryable: boolean }
  | { status: "unknown"; message: string; inputSnapshot: TInput };

type RenderFieldsArgs<TInput> = {
  input: TInput;
  setInput: (nextInput: TInput) => void;
  /**
   * Keep controls focusable while locked. Use native readOnly where supported;
   * guard changes on other controls and expose aria-disabled instead of
   * disabling them.
   */
  readOnly: boolean;
};

export type TransactionStatesProps<TInput, TResult> = {
  initialInput: TInput;
  /** Return labeled controlled controls that honor readOnly during an active request. */
  renderFields: (args: RenderFieldsArgs<TInput>) => ReactNode;
  /**
   * Resolve with `success` only when the authoritative operation confirms success.
   * Return `unknown` when a timeout, disconnect, or client abort leaves the server
   * outcome uncertain. Messages must be safe and useful to show to the user.
   * Bind any idempotency key to the logical request payload: a changed payload
   * must use a new key, while a safe retry of the same request may reuse it.
   */
  runOperation: (
    input: TInput,
    context: OperationContext,
  ) => Promise<OperationOutcome<TResult>>;
  /**
   * Query authoritative application/server state after an ambiguous result.
   * Use a stable order/job/idempotency key carried by input or persisted by the
   * adapter. Return `success`, `error`, or `cancelled` only when confirmed;
   * report `pending` or `unknown` while another submission is still unsafe.
   */
  checkStatus?: (
    input: TInput,
    context: { signal: AbortSignal },
  ) => Promise<StatusReconciliation<TResult>>;
  /** Render the actual confirmed result; do not invent a receipt or order number. */
  renderSuccess: (result: TResult) => ReactNode;
  submitLabel?: string;
  /** Show Cancel only when runOperation can meaningfully observe the AbortSignal. */
  allowCancel?: boolean;
};

function normalizeProgress(
  progress: OperationProgress,
): OperationProgress | undefined {
  const label =
    typeof progress.label === "string" ? progress.label.trim() : "";
  const hasValue = typeof progress.value === "number";
  const hasMax = typeof progress.max === "number";

  if (!hasValue && !hasMax) {
    return { label: label || "Operation in progress" };
  }

  if (
    hasValue &&
    hasMax &&
    Number.isFinite(progress.value) &&
    Number.isFinite(progress.max) &&
    progress.max! > 0 &&
    progress.value! >= 0 &&
    progress.value! <= progress.max!
  ) {
    return {
      label: label || "Operation progress",
      value: progress.value,
      max: progress.max,
    };
  }

  // A partial or impossible range is not safe to present as determinate progress.
  return undefined;
}

/**
 * Reference template, not a production checkout component. The adapter owns API,
 * validation, idempotency, and truthful outcome classification.
 */
export function TransactionStates<TInput, TResult>({
  initialInput,
  renderFields,
  runOperation,
  checkStatus,
  renderSuccess,
  submitLabel = "Submit",
  allowCancel = false,
}: TransactionStatesProps<TInput, TResult>) {
  const [input, setInputState] = useState<TInput>(() => initialInput);
  const [state, setState] = useState<ViewState<TInput, TResult>>({ status: "idle" });
  const [retryInProgress, setRetryInProgress] = useState(false);
  const [retainCancelFocus, setRetainCancelFocus] = useState(false);
  const [retainCheckStatusFocus, setRetainCheckStatusFocus] = useState(false);
  const id = useId();
  const progressId = `${id}-progress`;
  const formRef = useRef<HTMLFormElement>(null);
  const mountedRef = useRef(false);
  const inFlightRef = useRef(false);
  const completedRef = useRef(false);
  const attemptIdRef = useRef(0);
  const activeAttemptRef = useRef<{
    id: number;
    controller: AbortController;
  } | null>(null);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      attemptIdRef.current += 1;
      activeAttemptRef.current?.controller.abort();
      activeAttemptRef.current = null;
      inFlightRef.current = false;
    };
  }, []);

  const isBusy =
    state.status === "pending" ||
    state.status === "running" ||
    state.status === "cancelling" ||
    state.status === "reconciling";
  const retryLocked =
    (state.status === "error" || state.status === "cancelled") &&
    !state.retryable;
  const inputLocked =
    state.status === "success" ||
    state.status === "unknown" ||
    retryLocked;

  const updateInput = (nextInput: TInput) => {
    if (
      !inFlightRef.current &&
      !completedRef.current &&
      !inputLocked
    ) {
      setInputState(() => nextInput);
    }
  };

  const execute = async (inputSnapshot: TInput) => {
    // State alone is not a synchronous lock: two submit events can arrive before
    // React commits the busy UI. Keep this ref guard as well.
    if (
      inFlightRef.current ||
      completedRef.current ||
      state.status === "unknown" ||
      state.status === "reconciling" ||
      retryLocked
    ) return;

    if (state.status === "error" || state.status === "cancelled") {
      setRetryInProgress(true);
    }

    inFlightRef.current = true;
    const attemptId = ++attemptIdRef.current;
    const controller = new AbortController();
    activeAttemptRef.current = { id: attemptId, controller };
    setState({ status: "pending" });

    let initialProgress: OperationProgress | undefined;
    const onProgress = (update: OperationProgress) => {
      if (
        !mountedRef.current ||
        controller.signal.aborted ||
        attemptIdRef.current !== attemptId ||
        activeAttemptRef.current?.id !== attemptId
      ) {
        return;
      }

      const normalized = normalizeProgress(update);
      if (!normalized) return;

      // Preserve a progress callback that fires synchronously while the adapter
      // starts, before the UI has moved from pending to running.
      initialProgress = normalized;
      setState({ status: "running", progress: normalized });
    };

    try {
      const operation = runOperation(inputSnapshot, {
        signal: controller.signal,
        onProgress,
      });

      if (mountedRef.current && attemptIdRef.current === attemptId) {
        setState({ status: "running", progress: initialProgress });
      }

      const outcome = await operation;
      if (!mountedRef.current || attemptIdRef.current !== attemptId) return;

      switch (outcome.status) {
        case "success":
          completedRef.current = true;
          setState({ status: "success", result: outcome.result });
          break;
        case "error":
          setState({
            status: "error",
            message: outcome.message,
            retryable: outcome.retryable,
          });
          break;
        case "cancelled":
          setState({
            status: "cancelled",
            message: outcome.message,
            retryable: outcome.retryable,
          });
          break;
        case "unknown":
          setState({
            status: "unknown",
            message: outcome.message,
            inputSnapshot,
          });
          break;
        default:
          setState({
            status: "unknown",
            message: "We could not confirm the outcome. Check its status before trying again.",
            inputSnapshot,
          });
      }
    } catch {
      // A thrown error may mean the response was lost after the server committed
      // the operation. Treat it as uncertain; an adapter can return `error`
      // only when it knows the operation failed and retrying is safe.
      if (mountedRef.current && attemptIdRef.current === attemptId) {
        setState({
          status: "unknown",
          message:
            "We could not confirm the outcome. Check its status before trying again.",
          inputSnapshot,
        });
      }
    } finally {
      if (activeAttemptRef.current?.id === attemptId) {
        activeAttemptRef.current = null;
        inFlightRef.current = false;
      }
      if (mountedRef.current) setRetryInProgress(false);
    }
  };

  const reconcileUnknown = async (inputSnapshot: TInput) => {
    if (!checkStatus || inFlightRef.current || completedRef.current) return;

    inFlightRef.current = true;
    const attemptId = ++attemptIdRef.current;
    const controller = new AbortController();
    activeAttemptRef.current = { id: attemptId, controller };
    setState({ status: "reconciling", inputSnapshot });

    try {
      const outcome = await checkStatus(inputSnapshot, {
        signal: controller.signal,
      });
      if (!mountedRef.current || attemptIdRef.current !== attemptId) return;

      switch (outcome.status) {
        case "success":
          completedRef.current = true;
          setState({ status: "success", result: outcome.result });
          break;
        case "error":
          setState({
            status: "error",
            message: outcome.message,
            retryable: outcome.retryable,
          });
          break;
        case "cancelled":
          setState({
            status: "cancelled",
            message: outcome.message,
            retryable: outcome.retryable,
          });
          break;
        case "pending":
        case "unknown":
          setState({
            status: "unknown",
            message: outcome.message,
            inputSnapshot,
          });
          break;
        default:
          setState({
            status: "unknown",
            message: "We could not confirm the outcome. Check its status before trying again.",
            inputSnapshot,
          });
      }
    } catch {
      if (mountedRef.current && attemptIdRef.current === attemptId) {
        setState({
          status: "unknown",
          message:
            "We still could not confirm the outcome. Check again before trying again.",
          inputSnapshot,
        });
      }
    } finally {
      if (activeAttemptRef.current?.id === attemptId) {
        activeAttemptRef.current = null;
        inFlightRef.current = false;
      }
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void execute(input);
  };

  const requestCancel = () => {
    const active = activeAttemptRef.current;
    if (!active || active.controller.signal.aborted) return;

    setState({ status: "cancelling" });
    active.controller.abort();
  };

  const canRetry =
    (state.status === "error" || state.status === "cancelled") &&
    state.retryable;
  let submitText = submitLabel;
  if (state.status === "pending") {
    submitText = retryInProgress ? "Retrying…" : "Starting…";
  } else if (state.status === "running") {
    submitText = retryInProgress ? "Retrying…" : "Processing…";
  } else if (state.status === "cancelling") {
    submitText = "Cancellation requested";
  } else if (state.status === "reconciling") {
    submitText = "Checking status…";
  } else if (state.status === "success") {
    submitText = "Completed";
  } else if (state.status === "error" || state.status === "cancelled") {
    submitText = canRetry ? "Retry" : "Retry unavailable";
  }

  let liveMessage = "";
  if (state.status === "pending") {
    liveMessage = retryInProgress ? "Retrying request." : "Starting request.";
  }
  if (state.status === "running") {
    // A stable stage label is announced when it changes; percentage ticks do
    // not cause extra announcements when the operation keeps the same label.
    liveMessage = state.progress?.label
      ? `${state.progress.label}. Submitted fields are read-only.`
      : "Request in progress. Submitted fields are read-only.";
  }
  if (state.status === "cancelling") {
    liveMessage = "Cancellation requested. Waiting to confirm the outcome.";
  }
  if (state.status === "reconciling") {
    liveMessage = "Checking the confirmed status of the previous request.";
  }
  if (state.status === "success") liveMessage = "Request completed.";
  if (state.status === "error") {
    liveMessage = `The request could not be completed. ${state.message}`;
  }
  if (state.status === "cancelled") {
    liveMessage = `The operation was cancelled. ${state.message}`;
  }
  if (state.status === "unknown") {
    liveMessage = `We could not confirm the outcome. ${state.message}`;
  }

  let outcomeHeading = "";
  let outcomeMessage = "";
  if (state.status === "error") {
    outcomeHeading = "The request could not be completed";
    outcomeMessage = state.message;
  } else if (state.status === "cancelled") {
    outcomeHeading = "The operation was cancelled";
    outcomeMessage = state.message;
  } else if (state.status === "unknown") {
    outcomeHeading = "We could not confirm the outcome";
    outcomeMessage = state.message;
  } else if (state.status === "reconciling") {
    outcomeHeading = "Checking the previous request status";
    outcomeMessage = "Another submission stays blocked while we check.";
  }

  const hasDeterminateProgress =
    state.status === "running" &&
    typeof state.progress?.value === "number" &&
    typeof state.progress.max === "number";
  const showOutcome =
    state.status === "error" ||
    state.status === "cancelled" ||
    state.status === "unknown" ||
    state.status === "reconciling";
  const showCancelControl =
    allowCancel &&
    (state.status === "pending" ||
      state.status === "running" ||
      state.status === "cancelling" ||
      retainCancelFocus);
  const showCheckStatusControl =
    Boolean(checkStatus) &&
    (state.status === "unknown" ||
      state.status === "reconciling" ||
      retainCheckStatusFocus);

  return (
    <form
      ref={formRef}
      className="transaction-states"
      data-state={state.status}
      onSubmit={handleSubmit}
    >
      <fieldset
        className="transaction-states__fields"
        aria-disabled={inputLocked || isBusy}
        aria-busy={isBusy}
        aria-describedby={`${id}-status`}
      >
        {renderFields({
          input,
          setInput: updateInput,
          readOnly: inputLocked || isBusy,
        })}
      </fieldset>

      <div className="transaction-states__actions">
        <button
          className="transaction-states__submit"
          type="submit"
          aria-disabled={inputLocked || isBusy}
        >
          {submitText}
        </button>

        {showCancelControl && (
          <button
            className="transaction-states__cancel"
            type="button"
            aria-disabled={state.status !== "pending" && state.status !== "running"}
            onFocus={() => setRetainCancelFocus(true)}
            onBlur={() => setRetainCancelFocus(false)}
            onClick={requestCancel}
          >
            {state.status === "pending" || state.status === "running"
              ? "Cancel request"
              : state.status === "cancelling"
                ? "Cancellation requested"
                : state.status === "cancelled"
                  ? "Cancellation confirmed"
                  : "Cancellation unavailable"}
          </button>
        )}
      </div>

      <p
        id={`${id}-status`}
        className="transaction-states__status"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {liveMessage}
      </p>

      {state.status === "running" && state.progress && (
        <div className="transaction-states__progress-wrap">
          <label
            className="transaction-states__progress-label"
            htmlFor={progressId}
          >
            {state.progress.label || "Operation progress"}
          </label>
          {hasDeterminateProgress ? (
            <progress
              className="transaction-states__progress"
              id={progressId}
              value={state.progress.value}
              max={state.progress.max}
            />
          ) : (
            // Omitting `value` intentionally exposes indeterminate progress.
            <progress className="transaction-states__progress" id={progressId} />
          )}
          {state.progress.label && <p>{state.progress.label}</p>}
        </div>
      )}

      {state.status === "success" && (
        <section
          className="transaction-states__outcome"
          data-outcome="success"
          aria-labelledby={`${id}-success-heading`}
        >
          <h2 id={`${id}-success-heading`}>
            <span
              className="transaction-states__success-mark"
              aria-hidden="true"
            />
            Completed
          </h2>
          {renderSuccess(state.result)}
        </section>
      )}

      {showOutcome && (
        <section
          className="transaction-states__outcome"
          data-outcome={state.status}
          aria-labelledby={`${id}-outcome-heading`}
        >
          <h2 id={`${id}-outcome-heading`}>
            {outcomeHeading}
          </h2>
          <p>{outcomeMessage}</p>
          {showCheckStatusControl && (
            <button
              className="transaction-states__check-status"
              type="button"
              aria-disabled={state.status !== "unknown"}
              onFocus={() => setRetainCheckStatusFocus(true)}
              onBlur={() => setRetainCheckStatusFocus(false)}
              onClick={() => {
                if (state.status === "unknown") {
                  void reconcileUnknown(state.inputSnapshot);
                }
              }}
            >
              {state.status === "reconciling"
                ? "Checking status…"
                : state.status === "unknown"
                  ? "Check status"
                  : "Status checked"}
            </button>
          )}
          {state.status === "unknown" && !checkStatus && (
            <p>
              A status-check adapter is required before this form can accept
              another submission.
            </p>
          )}
        </section>
      )}
    </form>
  );
}
