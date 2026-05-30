"use client";

import * as React from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { cn } from "@/lib/utils";

export interface HoldToConfirmButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  holdDuration?: number;
  onConfirm?: () => void;
  idleLabel?: React.ReactNode;
  holdingLabel?: React.ReactNode;
  confirmedLabel?: React.ReactNode;
  destructive?: boolean;
}

type Phase = "idle" | "holding" | "confirmed";

export const HoldToConfirmButton = React.forwardRef<
  HTMLButtonElement,
  HoldToConfirmButtonProps
>(
  (
    {
      holdDuration = 1400,
      onConfirm,
      idleLabel = "Hold to confirm",
      holdingLabel = "Hold...",
      confirmedLabel = "Confirmed",
      destructive = true,
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [phase, setPhase] = React.useState<Phase>("idle");
    const progress = useMotionValue(0);
    const fill = useTransform(progress, (v) => `${v * 100}%`);
    const animationRef = React.useRef<ReturnType<typeof animate> | null>(null);
    const confirmedRef = React.useRef(false);

    const stop = React.useCallback(() => {
      animationRef.current?.stop();
      animationRef.current = null;
    }, []);

    const reset = React.useCallback(() => {
      stop();
      confirmedRef.current = false;
      setPhase("idle");
      animate(progress, 0, { duration: 0.18, ease: "easeOut" });
    }, [progress, stop]);

    React.useEffect(() => () => stop(), [stop]);

    const begin = () => {
      if (disabled || phase === "confirmed") return;
      confirmedRef.current = false;
      setPhase("holding");
      stop();
      const remaining = holdDuration * (1 - progress.get());
      animationRef.current = animate(progress, 1, {
        duration: Math.max(remaining / 1000, 0.05),
        ease: "linear",
        onComplete: () => {
          if (confirmedRef.current) return;
          confirmedRef.current = true;
          setPhase("confirmed");
          onConfirm?.();
        },
      });
    };

    const cancel = () => {
      if (phase !== "holding") return;
      reset();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if ((e.key === " " || e.key === "Enter") && !e.repeat) {
        e.preventDefault();
        begin();
      }
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        cancel();
      }
    };

    const isConfirmed = phase === "confirmed";
    const isHolding = phase === "holding";

    const label = isConfirmed
      ? confirmedLabel
      : isHolding
        ? holdingLabel
        : idleLabel;

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-live="polite"
        data-state={phase}
        onPointerDown={begin}
        onPointerUp={cancel}
        onPointerLeave={cancel}
        onPointerCancel={cancel}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onBlur={cancel}
        className={cn(
          "relative inline-flex select-none items-center justify-center overflow-hidden rounded-md border px-5 py-2.5 text-sm font-semibold uppercase tracking-wide shadow-sm transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:cursor-not-allowed disabled:opacity-60",
          destructive
            ? "border-red-500/40 bg-red-50 text-red-700 dark:border-red-500/30 dark:bg-red-950/40 dark:text-red-300"
            : "border-border bg-background text-foreground",
          isConfirmed && "border-emerald-500/50 bg-emerald-500 text-white",
          className,
        )}
        {...props}
      >
        <motion.span
          aria-hidden
          style={{ width: fill }}
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 z-0",
            destructive
              ? "bg-red-500/90 dark:bg-red-500/80"
              : "bg-foreground/85",
            isConfirmed && "bg-emerald-500",
          )}
        />
        <span
          className={cn(
            "relative z-10 inline-flex items-center gap-2 transition-colors duration-150",
            isHolding && "text-white mix-blend-difference",
          )}
        >
          {isConfirmed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
          )}
          {label}
        </span>
      </button>
    );
  },
);

HoldToConfirmButton.displayName = "HoldToConfirmButton";
