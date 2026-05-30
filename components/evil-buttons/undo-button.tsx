"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface UndoButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  onCommit?: () => void;
  onUndo?: () => void;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  idleLabel?: React.ReactNode;
  pendingLabel?: React.ReactNode;
  undoLabel?: React.ReactNode;
  committedLabel?: React.ReactNode;
  undoWindow?: number;
  resetAfter?: number;
  destructive?: boolean;
}

export const UndoButton = React.forwardRef<HTMLButtonElement, UndoButtonProps>(
  (
    {
      onCommit,
      onUndo,
      onClick,
      idleLabel = "Archive",
      pendingLabel = "Archived",
      undoLabel = "Undo",
      committedLabel = "Done",
      undoWindow = 5000,
      resetAfter = 1400,
      destructive = false,
      className,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const [state, setState] = React.useState<"idle" | "pending" | "done">(
      "idle",
    );
    const commitTimer = React.useRef<number | null>(null);
    const resetTimer = React.useRef<number | null>(null);

    const clearTimers = React.useCallback(() => {
      if (commitTimer.current !== null) window.clearTimeout(commitTimer.current);
      if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
      commitTimer.current = null;
      resetTimer.current = null;
    }, []);

    React.useEffect(() => clearTimers, [clearTimers]);

    const resetLater = React.useCallback(() => {
      if (resetAfter <= 0) return;
      resetTimer.current = window.setTimeout(() => setState("idle"), resetAfter);
    }, [resetAfter]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (state === "pending") {
        clearTimers();
        setState("idle");
        onUndo?.();
        return;
      }

      if (state === "done") return;

      onClick?.(e);
      setState("pending");
      commitTimer.current = window.setTimeout(() => {
        setState("done");
        onCommit?.();
        resetLater();
      }, undoWindow);
    };

    const isPending = state === "pending";
    const isDone = state === "done";

    return (
      <button
        ref={ref}
        type={type}
        onClick={handleClick}
        disabled={disabled || isDone}
        aria-live="polite"
        data-state={state}
        className={cn(
          "relative inline-flex min-w-36 items-center justify-center overflow-hidden rounded-md border px-5 py-2.5 text-sm font-semibold shadow-sm transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-default",
          destructive
            ? "border-red-500/40 bg-red-600 text-white hover:bg-red-700"
            : "border-border bg-foreground text-background hover:bg-foreground/90",
          isPending && "border-amber-500/40 bg-amber-500 text-black hover:bg-amber-400",
          isDone && "border-emerald-500/40 bg-emerald-600 text-white",
          className,
        )}
        {...props}
      >
        {isPending ? (
          <motion.span
            key="progress"
            aria-hidden
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: undoWindow / 1000, ease: "linear" }}
            className="absolute inset-x-0 bottom-0 h-1 origin-left bg-black/25"
          />
        ) : null}
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={state}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="relative z-10 inline-flex items-center gap-2"
          >
            {isPending ? (
              <>
                <span>{pendingLabel}</span>
                <span className="rounded bg-black/15 px-1.5 py-0.5 text-xs">
                  {undoLabel}
                </span>
              </>
            ) : isDone ? (
              committedLabel
            ) : (
              idleLabel
            )}
          </motion.span>
        </AnimatePresence>
      </button>
    );
  },
);

UndoButton.displayName = "UndoButton";
