"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface TwoStepButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  onConfirm?: () => void;
  onArm?: () => void;
  idleLabel?: React.ReactNode;
  armedLabel?: React.ReactNode;
  confirmedLabel?: React.ReactNode;
  armDuration?: number;
  resetAfter?: number;
  destructive?: boolean;
}

export const TwoStepButton = React.forwardRef<
  HTMLButtonElement,
  TwoStepButtonProps
>(
  (
    {
      onConfirm,
      onArm,
      idleLabel = "Deploy",
      armedLabel = "Click again",
      confirmedLabel = "Confirmed",
      armDuration = 2600,
      resetAfter = 1200,
      destructive = false,
      className,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const [state, setState] = React.useState<"idle" | "armed" | "confirmed">(
      "idle",
    );
    const timerRef = React.useRef<number | null>(null);

    const clearTimer = React.useCallback(() => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }, []);

    React.useEffect(() => clearTimer, [clearTimer]);

    const handleClick = () => {
      if (state === "confirmed") return;

      if (state === "armed") {
        clearTimer();
        setState("confirmed");
        onConfirm?.();
        if (resetAfter > 0) {
          timerRef.current = window.setTimeout(
            () => setState("idle"),
            resetAfter,
          );
        }
        return;
      }

      setState("armed");
      onArm?.();
      timerRef.current = window.setTimeout(() => setState("idle"), armDuration);
    };

    const isArmed = state === "armed";
    const isConfirmed = state === "confirmed";

    return (
      <button
        ref={ref}
        type={type}
        onClick={handleClick}
        disabled={disabled || isConfirmed}
        aria-live="polite"
        data-state={state}
        className={cn(
          "relative inline-flex min-w-40 items-center justify-center overflow-hidden rounded-md border px-5 py-2.5 text-sm font-semibold shadow-sm transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-default",
          destructive
            ? "border-red-500/40 bg-red-600 text-white hover:bg-red-700"
            : "border-border bg-background text-foreground hover:bg-muted",
          isArmed && "border-amber-500/50 bg-amber-500 text-black hover:bg-amber-400",
          isConfirmed && "border-emerald-500/50 bg-emerald-600 text-white",
          className,
        )}
        {...props}
      >
        {isArmed ? (
          <motion.span
            aria-hidden
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: armDuration / 1000, ease: "linear" }}
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
            className={cn(
              "relative z-10",
              isConfirmed && "text-white",
              isArmed && "text-neutral-950",
              !isArmed && !isConfirmed && destructive && "text-white",
              !isArmed && !isConfirmed && !destructive && "text-foreground",
            )}
          >
            {isConfirmed ? confirmedLabel : isArmed ? armedLabel : idleLabel}
          </motion.span>
        </AnimatePresence>
      </button>
    );
  },
);

TwoStepButton.displayName = "TwoStepButton";
