"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export type DownloadButtonState = "idle" | "downloading" | "complete" | "error";

export interface DownloadButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  state?: DownloadButtonState;
  progress?: number;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => void | Promise<unknown>;
  idleLabel?: React.ReactNode;
  downloadingLabel?: React.ReactNode;
  completeLabel?: React.ReactNode;
  errorLabel?: React.ReactNode;
  resetAfter?: number;
}

const clamp = (value: number) => Math.min(Math.max(value, 0), 100);

export const DownloadButton = React.forwardRef<
  HTMLButtonElement,
  DownloadButtonProps
>(
  (
    {
      state: controlledState,
      progress: controlledProgress,
      onClick,
      idleLabel = "Download",
      downloadingLabel = "Downloading",
      completeLabel = "Downloaded",
      errorLabel = "Failed",
      resetAfter = 1600,
      className,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const [internalState, setInternalState] =
      React.useState<DownloadButtonState>("idle");
    const [internalProgress, setInternalProgress] = React.useState(0);
    const state = controlledState ?? internalState;
    const progress = clamp(controlledProgress ?? internalProgress);
    const isControlled = controlledState !== undefined;
    const intervalRef = React.useRef<number | null>(null);
    const resetRef = React.useRef<number | null>(null);

    const clearTimers = React.useCallback(() => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
      if (resetRef.current !== null) window.clearTimeout(resetRef.current);
      intervalRef.current = null;
      resetRef.current = null;
    }, []);

    React.useEffect(() => clearTimers, [clearTimers]);

    const resetLater = React.useCallback(() => {
      if (resetAfter <= 0) return;
      resetRef.current = window.setTimeout(() => {
        setInternalState("idle");
        setInternalProgress(0);
      }, resetAfter);
    }, [resetAfter]);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (state === "downloading") return;
      const result = onClick?.(e);
      if (isControlled) return;

      setInternalState("downloading");
      setInternalProgress(8);
      intervalRef.current = window.setInterval(() => {
        setInternalProgress((value) => Math.min(value + 9, 92));
      }, 180);

      try {
        if (result && typeof (result as Promise<unknown>).then === "function") {
          await result;
        } else {
          await new Promise((resolve) => window.setTimeout(resolve, 1400));
        }
        clearTimers();
        setInternalProgress(100);
        setInternalState("complete");
      } catch {
        clearTimers();
        setInternalState("error");
      }
      resetLater();
    };

    const isDownloading = state === "downloading";
    const isComplete = state === "complete";
    const isError = state === "error";
    const label = isDownloading
      ? downloadingLabel
      : isComplete
        ? completeLabel
        : isError
          ? errorLabel
          : idleLabel;

    return (
      <button
        ref={ref}
        type={type}
        onClick={handleClick}
        disabled={disabled || isDownloading}
        aria-busy={isDownloading}
        aria-live="polite"
        data-state={state}
        className={cn(
          "relative inline-flex min-w-44 items-center justify-center gap-2 overflow-hidden rounded-md border border-neutral-950 bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors",
          "hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-90",
          "dark:border-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200",
          isComplete && "border-emerald-500 bg-emerald-600 text-white dark:bg-emerald-400 dark:text-emerald-950",
          isError && "border-red-500 bg-red-600 text-white dark:bg-red-500 dark:text-white",
          className,
        )}
        {...props}
      >
        <motion.span
          aria-hidden
          animate={{ scaleX: isDownloading || isComplete ? progress / 100 : 0 }}
          transition={{ type: "spring", stiffness: 170, damping: 24 }}
          className="absolute inset-x-0 bottom-0 h-1 origin-left bg-white/35 dark:bg-neutral-950/25"
        />
        <span className="relative z-10 inline-flex size-4 items-center justify-center">
          <AnimatePresence initial={false} mode="wait">
            {isComplete ? (
              <motion.span key="done" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                ✓
              </motion.span>
            ) : isError ? (
              <motion.span key="err" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                ×
              </motion.span>
            ) : (
              <motion.svg
                key="arrow"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
                animate={isDownloading ? { y: [0, 3, 0] } : { y: 0 }}
                transition={{ duration: 0.55, repeat: isDownloading ? Infinity : 0 }}
              >
                <path d="M12 3v12" />
                <path d="m7 10 5 5 5-5" />
                <path d="M5 21h14" />
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
            transition={{ duration: 0.16 }}
            className="relative z-10"
          >
            {label}
          </motion.span>
        </AnimatePresence>
        {isDownloading ? (
          <span className="relative z-10 font-mono text-xs opacity-80">
            {Math.round(progress)}%
          </span>
        ) : null}
      </button>
    );
  },
);

DownloadButton.displayName = "DownloadButton";
