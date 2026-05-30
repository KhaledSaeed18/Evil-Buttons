"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export type ProgressButtonStatus = "idle" | "running" | "complete" | "error";

export interface ProgressButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  progress?: number;
  status?: ProgressButtonStatus;
  idleLabel?: React.ReactNode;
  runningLabel?: React.ReactNode;
  completeLabel?: React.ReactNode;
  errorLabel?: React.ReactNode;
  showPercent?: boolean;
}

const clampProgress = (value: number) => Math.min(Math.max(value, 0), 100);

export const ProgressButton = React.forwardRef<
  HTMLButtonElement,
  ProgressButtonProps
>(
  (
    {
      progress = 0,
      status = progress >= 100 ? "complete" : progress > 0 ? "running" : "idle",
      idleLabel = "Export",
      runningLabel = "Exporting",
      completeLabel = "Complete",
      errorLabel = "Failed",
      showPercent = true,
      className,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const safeProgress = clampProgress(progress);
    const isRunning = status === "running";
    const isComplete = status === "complete";
    const isError = status === "error";
    const label = isError
      ? errorLabel
      : isComplete
        ? completeLabel
        : isRunning
          ? runningLabel
          : idleLabel;

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        aria-busy={isRunning}
        aria-live="polite"
        data-state={status}
        className={cn(
          "relative inline-flex min-w-44 items-center justify-center overflow-hidden rounded-md border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm",
          "transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-70",
          isComplete && "border-emerald-500/50 bg-emerald-600 text-white hover:bg-emerald-600",
          isError && "border-red-500/50 bg-red-600 text-white hover:bg-red-600",
          className,
        )}
        {...props}
      >
        <span
          className="sr-only"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={safeProgress}
        >
          {safeProgress}% complete
        </span>
        <motion.span
          aria-hidden
          animate={{ width: `${isError ? 100 : safeProgress}%` }}
          transition={{ type: "spring", stiffness: 170, damping: 26 }}
          className={cn(
            "absolute inset-y-0 left-0 bg-foreground/12",
            isComplete && "bg-white/18",
            isError && "bg-black/20",
          )}
        />
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={`${status}-${label}`}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="relative z-10 inline-flex items-center gap-2"
          >
            <span>{label}</span>
            {showPercent && isRunning ? (
              <span className="font-mono text-xs opacity-75">
                {Math.round(safeProgress)}%
              </span>
            ) : null}
          </motion.span>
        </AnimatePresence>
      </button>
    );
  },
);

ProgressButton.displayName = "ProgressButton";
