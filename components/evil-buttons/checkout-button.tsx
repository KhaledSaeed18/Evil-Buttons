"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export type CheckoutButtonState = "idle" | "processing" | "approved" | "declined";

export interface CheckoutButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  state?: CheckoutButtonState;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => void | Promise<unknown>;
  amount?: React.ReactNode;
  idleLabel?: React.ReactNode;
  processingLabel?: React.ReactNode;
  approvedLabel?: React.ReactNode;
  declinedLabel?: React.ReactNode;
  resetAfter?: number;
}

export const CheckoutButton = React.forwardRef<
  HTMLButtonElement,
  CheckoutButtonProps
>(
  (
    {
      state: controlledState,
      onClick,
      amount = "$24",
      idleLabel = "Pay",
      processingLabel = "Processing",
      approvedLabel = "Approved",
      declinedLabel = "Declined",
      resetAfter = 1800,
      className,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const [internal, setInternal] = React.useState<CheckoutButtonState>("idle");
    const state = controlledState ?? internal;
    const isControlled = controlledState !== undefined;
    const timerRef = React.useRef<number | null>(null);

    React.useEffect(() => {
      return () => {
        if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      };
    }, []);

    React.useEffect(() => {
      if (isControlled || state === "idle" || resetAfter <= 0) return;
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setInternal("idle"), resetAfter);
    }, [isControlled, resetAfter, state]);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (state === "processing") return;
      const result = onClick?.(e);
      if (isControlled) return;

      if (result && typeof (result as Promise<unknown>).then === "function") {
        setInternal("processing");
        try {
          await result;
          setInternal("approved");
        } catch {
          setInternal("declined");
        }
      }
    };

    const isProcessing = state === "processing";
    const isApproved = state === "approved";
    const isDeclined = state === "declined";
    const label = isProcessing
      ? processingLabel
      : isApproved
        ? approvedLabel
        : isDeclined
          ? declinedLabel
          : idleLabel;

    return (
      <button
        ref={ref}
        type={type}
        onClick={handleClick}
        disabled={disabled || isProcessing}
        aria-busy={isProcessing}
        aria-live="polite"
        data-state={state}
        className={cn(
          "relative inline-flex min-w-44 items-center justify-between gap-4 overflow-hidden rounded-md border border-neutral-950 bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors",
          "hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-90",
          "dark:border-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200",
          isApproved && "border-emerald-500 bg-emerald-600 text-white dark:bg-emerald-400 dark:text-emerald-950",
          isDeclined && "border-red-500 bg-red-600 text-white dark:bg-red-500 dark:text-white",
          className,
        )}
        {...props}
      >
        <motion.span
          aria-hidden
          animate={{ x: isProcessing ? ["-120%", "120%"] : "-120%" }}
          transition={{ duration: 1, repeat: isProcessing ? Infinity : 0 }}
          className="absolute inset-y-0 w-1/2 skew-x-[-18deg] bg-white/20 dark:bg-neutral-950/10"
        />
        <span className="relative z-10 inline-flex items-center gap-2">
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={state}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="inline-flex items-center gap-2"
            >
              {isProcessing ? (
                <span className="size-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
              ) : isApproved ? (
                "✓"
              ) : isDeclined ? (
                "×"
              ) : null}
              <span>{label}</span>
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="relative z-10 rounded bg-white/14 px-2 py-1 font-mono text-xs dark:bg-neutral-950/10">
          {amount}
        </span>
      </button>
    );
  },
);

CheckoutButton.displayName = "CheckoutButton";
