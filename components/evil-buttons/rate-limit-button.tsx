"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface RateLimitButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  maxUses?: number;
  cooldownSeconds?: number;
  idleLabel?: React.ReactNode;
  cooldownLabel?: React.ReactNode;
  readyLabel?: React.ReactNode;
  showUses?: boolean;
  formatCooldown?: (remainingSeconds: number) => React.ReactNode;
  onTrigger?: (
    e: React.MouseEvent<HTMLButtonElement>,
    usesLeft: number,
  ) => void | Promise<unknown>;
  onRefresh?: () => void;
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

export const RateLimitButton = React.forwardRef<
  HTMLButtonElement,
  RateLimitButtonProps
>(
  (
    {
      maxUses = 3,
      cooldownSeconds = 12,
      idleLabel = "Generate",
      cooldownLabel = "Cooling down",
      readyLabel = "Refilled",
      showUses = true,
      formatCooldown = formatTime,
      onTrigger,
      onRefresh,
      className,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const [usesLeft, setUsesLeft] = React.useState(maxUses);
    const [remaining, setRemaining] = React.useState(0);
    const [phase, setPhase] = React.useState<"ready" | "cooldown" | "refilled">(
      "ready",
    );
    const intervalRef = React.useRef<number | null>(null);
    const resetRef = React.useRef<number | null>(null);

    const clearTimers = React.useCallback(() => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
      if (resetRef.current !== null) window.clearTimeout(resetRef.current);
      intervalRef.current = null;
      resetRef.current = null;
    }, []);

    React.useEffect(() => clearTimers, [clearTimers]);

    const startCooldown = React.useCallback(() => {
      clearTimers();
      setPhase("cooldown");
      setRemaining(cooldownSeconds);
      const startedAt = Date.now();

      intervalRef.current = window.setInterval(() => {
        const elapsed = Math.floor((Date.now() - startedAt) / 1000);
        const next = Math.max(cooldownSeconds - elapsed, 0);
        setRemaining(next);

        if (next <= 0) {
          clearTimers();
          setUsesLeft(maxUses);
          setPhase("refilled");
          onRefresh?.();
          resetRef.current = window.setTimeout(() => {
            setPhase("ready");
            resetRef.current = null;
          }, 1000);
        }
      }, 250);
    }, [clearTimers, cooldownSeconds, maxUses, onRefresh]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (phase === "cooldown") return;
      const nextUses = Math.max(usesLeft - 1, 0);
      setUsesLeft(nextUses);
      onTrigger?.(e, nextUses);

      if (nextUses <= 0) {
        startCooldown();
      }
    };

    const isCooldown = phase === "cooldown";
    const isRefilled = phase === "refilled";
    const label = isCooldown
      ? cooldownLabel
      : isRefilled
        ? readyLabel
        : idleLabel;
    const progress = isCooldown
      ? 1 - remaining / Math.max(cooldownSeconds, 1)
      : usesLeft / Math.max(maxUses, 1);

    return (
      <button
        ref={ref}
        type={type}
        onClick={handleClick}
        disabled={disabled || isCooldown}
        aria-live="polite"
        data-state={phase}
        className={cn(
          "relative inline-flex min-w-44 items-center justify-center overflow-hidden rounded-md border border-neutral-950 bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors",
          "hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed",
          "dark:border-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200",
          isCooldown && "bg-neutral-700 text-white dark:bg-neutral-300 dark:text-neutral-950",
          isRefilled && "border-emerald-500 bg-emerald-600 text-white dark:bg-emerald-400 dark:text-emerald-950",
          className,
        )}
        {...props}
      >
        <motion.span
          aria-hidden
          animate={{ scaleX: progress }}
          transition={{ type: "spring", stiffness: 160, damping: 24 }}
          className="absolute inset-x-0 bottom-0 h-1 origin-left bg-white/35 dark:bg-neutral-950/25"
        />
        <span className="relative z-10 inline-flex items-center gap-3">
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={phase}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.16 }}
            >
              {label}
            </motion.span>
          </AnimatePresence>
          {showUses ? (
            <span className="inline-flex items-center gap-1">
              {Array.from({ length: maxUses }).map((_, index) => (
                <span
                  key={index}
                  aria-hidden
                  className={cn(
                    "size-1.5 rounded-full bg-current opacity-25",
                    index < usesLeft && !isCooldown && "opacity-90",
                  )}
                />
              ))}
            </span>
          ) : null}
          {isCooldown ? (
            <span className="font-mono text-xs opacity-80">
              {formatCooldown(remaining)}
            </span>
          ) : null}
        </span>
      </button>
    );
  },
);

RateLimitButton.displayName = "RateLimitButton";
