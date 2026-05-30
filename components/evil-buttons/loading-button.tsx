"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export type LoadingButtonState = "idle" | "loading" | "success" | "error";

export interface LoadingButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  state?: LoadingButtonState;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => void | Promise<unknown>;
  idleLabel?: React.ReactNode;
  pendingLabel?: React.ReactNode;
  successLabel?: React.ReactNode;
  errorLabel?: React.ReactNode;
  resetAfter?: number;
}

const SPIN_KEYFRAMES = `
@keyframes evilbtn-loading-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;

const Spinner = () => (
  <motion.span
    initial={{ opacity: 0, scale: 0.6 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.6 }}
    transition={{ duration: 0.15 }}
    className="inline-flex size-4 items-center justify-center"
    style={{
      animation: "evilbtn-loading-spin 0.8s linear infinite",
      transformOrigin: "50% 50%",
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      className="size-4"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  </motion.span>
);

const Check = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-4"
    initial={{ opacity: 0, scale: 0.5, rotate: -25 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    exit={{ opacity: 0, scale: 0.5 }}
    transition={{ type: "spring", stiffness: 380, damping: 20 }}
  >
    <path d="M20 6 9 17l-5-5" />
  </motion.svg>
);

const Cross = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-4"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.5 }}
    transition={{ type: "spring", stiffness: 380, damping: 20 }}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </motion.svg>
);

export const LoadingButton = React.forwardRef<
  HTMLButtonElement,
  LoadingButtonProps
>(
  (
    {
      state: controlledState,
      onClick,
      idleLabel = "Submit",
      pendingLabel = "Working...",
      successLabel = "Done",
      errorLabel = "Failed",
      resetAfter = 1800,
      className,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const [internal, setInternal] = React.useState<LoadingButtonState>("idle");
    const state = controlledState ?? internal;
    const isControlled = controlledState !== undefined;
    const timerRef = React.useRef<number | null>(null);

    React.useEffect(() => {
      return () => {
        if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      };
    }, []);

    React.useEffect(() => {
      if (isControlled) return;
      if ((state === "success" || state === "error") && resetAfter > 0) {
        if (timerRef.current !== null) window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(
          () => setInternal("idle"),
          resetAfter,
        );
      }
    }, [state, isControlled, resetAfter]);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (state === "loading") return;
      if (isControlled) {
        onClick?.(e);
        return;
      }
      const result = onClick?.(e);
      if (result && typeof (result as Promise<unknown>).then === "function") {
        setInternal("loading");
        try {
          await result;
          setInternal("success");
        } catch {
          setInternal("error");
        }
      }
    };

    const isLoading = state === "loading";
    const isSuccess = state === "success";
    const isError = state === "error";

    const label = isLoading
      ? pendingLabel
      : isSuccess
        ? successLabel
        : isError
          ? errorLabel
          : idleLabel;

    const icon = isLoading ? (
      <Spinner key="loading" />
    ) : isSuccess ? (
      <Check key="success" />
    ) : isError ? (
      <Cross key="error" />
    ) : null;

    return (
      <>
        <style>{SPIN_KEYFRAMES}</style>
        <button
        ref={ref}
        type={type}
        onClick={handleClick}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        aria-live="polite"
        data-state={state}
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden rounded-md px-5 py-2.5 text-sm font-medium shadow-sm transition-colors",
          "bg-foreground text-background",
          "hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:cursor-not-allowed disabled:opacity-90",
          isSuccess && "bg-emerald-600 text-white hover:bg-emerald-600",
          isError && "bg-red-600 text-white hover:bg-red-600",
          className,
        )}
        {...props}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {icon ? (
            <motion.span
              key="icon-slot"
              initial={{ width: 0, opacity: 0, marginRight: 0 }}
              animate={{ width: 16, opacity: 1, marginRight: 8 }}
              exit={{ width: 0, opacity: 0, marginRight: 0 }}
              transition={{ duration: 0.18 }}
              className="relative inline-flex h-4 items-center justify-center overflow-hidden"
            >
              <AnimatePresence initial={false} mode="wait">
                {icon}
              </AnimatePresence>
            </motion.span>
          ) : null}
        </AnimatePresence>
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={String(state)}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="inline-block"
          >
            {label}
          </motion.span>
        </AnimatePresence>
        </button>
      </>
    );
  },
);

LoadingButton.displayName = "LoadingButton";
