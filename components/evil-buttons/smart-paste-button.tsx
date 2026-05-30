"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export type SmartPasteState = "idle" | "reading" | "valid" | "invalid" | "error";

export interface SmartPasteButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onPaste"> {
  validate?: (value: string) => boolean;
  transform?: (value: string) => string;
  onPaste?: (value: string) => void;
  idleLabel?: React.ReactNode;
  readingLabel?: React.ReactNode;
  validLabel?: React.ReactNode;
  invalidLabel?: React.ReactNode;
  errorLabel?: React.ReactNode;
  resetAfter?: number;
}

export const SmartPasteButton = React.forwardRef<
  HTMLButtonElement,
  SmartPasteButtonProps
>(
  (
    {
      validate = (value) => value.trim().length > 0,
      transform = (value) => value.trim(),
      onPaste,
      idleLabel = "Paste",
      readingLabel = "Reading",
      validLabel = "Accepted",
      invalidLabel = "Invalid",
      errorLabel = "No access",
      resetAfter = 1600,
      className,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const [state, setState] = React.useState<SmartPasteState>("idle");
    const timerRef = React.useRef<number | null>(null);

    React.useEffect(() => {
      return () => {
        if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      };
    }, []);

    const resetSoon = React.useCallback(() => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        setState("idle");
        timerRef.current = null;
      }, resetAfter);
    }, [resetAfter]);

    const handleClick = async () => {
      if (state === "reading") return;
      setState("reading");

      try {
        if (
          typeof navigator === "undefined" ||
          !navigator.clipboard?.readText
        ) {
          throw new Error("Clipboard API unavailable");
        }

        const value = transform(await navigator.clipboard.readText());
        if (!validate(value)) {
          setState("invalid");
          resetSoon();
          return;
        }

        onPaste?.(value);
        setState("valid");
      } catch {
        setState("error");
      }

      resetSoon();
    };

    const isReading = state === "reading";
    const isValid = state === "valid";
    const isInvalid = state === "invalid";
    const isError = state === "error";
    const label = isReading
      ? readingLabel
      : isValid
        ? validLabel
        : isInvalid
          ? invalidLabel
          : isError
            ? errorLabel
            : idleLabel;

    return (
      <button
        ref={ref}
        type={type}
        onClick={handleClick}
        disabled={disabled || isReading}
        aria-busy={isReading}
        aria-live="polite"
        data-state={state}
        className={cn(
          "group relative inline-flex min-w-36 items-center justify-center gap-2 overflow-hidden rounded-md border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors",
          "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-80",
          isValid && "border-emerald-500/50 bg-emerald-600 text-white hover:bg-emerald-600",
          (isInvalid || isError) && "border-red-500/50 bg-red-600 text-white hover:bg-red-600",
          className,
        )}
        {...props}
      >
        <span className="relative z-10 inline-flex size-4 items-center justify-center">
          <AnimatePresence initial={false} mode="wait">
            {isReading ? (
              <motion.span
                key="reading"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="size-4 rounded-full border-2 border-current border-t-transparent"
              />
            ) : isValid ? (
              <motion.svg
                key="valid"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
              >
                <path d="M20 6 9 17l-5-5" />
              </motion.svg>
            ) : isInvalid || isError ? (
              <motion.svg
                key="error"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </motion.svg>
            ) : (
              <motion.svg
                key="paste"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
                initial={{ y: 3, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -3, opacity: 0 }}
              >
                <path d="M8 4h8" />
                <path d="M9 2h6v4H9z" />
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <path d="M8 13h8" />
                <path d="M8 17h5" />
              </motion.svg>
            )}
          </AnimatePresence>
        </span>
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={state}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="relative z-10"
          >
            {label}
          </motion.span>
        </AnimatePresence>
      </button>
    );
  },
);

SmartPasteButton.displayName = "SmartPasteButton";
