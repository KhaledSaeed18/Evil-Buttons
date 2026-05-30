"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface CountdownButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  cooldownSeconds?: number;
  autoStart?: boolean;
  idleLabel?: React.ReactNode;
  readyLabel?: React.ReactNode;
  readyDuration?: number;
  formatCooldown?: (remainingSeconds: number) => React.ReactNode;
  onTrigger?: (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => void | Promise<unknown>;
  onComplete?: () => void;
}

type Phase = "idle" | "cooldown" | "ready";

const defaultFormat = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `Wait ${m}:${s.toString().padStart(2, "0")}`;
};

export const CountdownButton = React.forwardRef<
  HTMLButtonElement,
  CountdownButtonProps
>(
  (
    {
      cooldownSeconds = 30,
      autoStart = false,
      idleLabel = "Resend code",
      readyLabel = "Ready",
      readyDuration = 900,
      formatCooldown = defaultFormat,
      onTrigger,
      onComplete,
      className,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const [phase, setPhase] = React.useState<Phase>(
      autoStart ? "cooldown" : "idle",
    );
    const [remaining, setRemaining] = React.useState(
      autoStart ? cooldownSeconds : 0,
    );
    const tickRef = React.useRef<number | null>(null);
    const readyTimerRef = React.useRef<number | null>(null);

    const stop = React.useCallback(() => {
      if (tickRef.current !== null) {
        window.clearInterval(tickRef.current);
        tickRef.current = null;
      }
    }, []);

    React.useEffect(() => {
      return () => {
        stop();
        if (readyTimerRef.current !== null) {
          window.clearTimeout(readyTimerRef.current);
        }
      };
    }, [stop]);

    const start = React.useCallback(() => {
      stop();
      if (readyTimerRef.current !== null) {
        window.clearTimeout(readyTimerRef.current);
        readyTimerRef.current = null;
      }
      setPhase("cooldown");
      setRemaining(cooldownSeconds);
      const startedAt = Date.now();
      tickRef.current = window.setInterval(() => {
        const elapsed = Math.floor((Date.now() - startedAt) / 1000);
        const next = Math.max(cooldownSeconds - elapsed, 0);
        setRemaining(next);
        if (next <= 0) {
          stop();
          setPhase("ready");
          onComplete?.();
          readyTimerRef.current = window.setTimeout(() => {
            setPhase("idle");
            readyTimerRef.current = null;
          }, readyDuration);
        }
      }, 250);
    }, [cooldownSeconds, onComplete, readyDuration, stop]);

    React.useEffect(() => {
      if (autoStart) start();
    }, [autoStart, start]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (phase !== "idle") return;
      onTrigger?.(e);
      start();
    };

    const isCoolingDown = phase === "cooldown";
    const isReady = phase === "ready";
    const label = isCoolingDown
      ? formatCooldown(remaining)
      : isReady
        ? readyLabel
        : idleLabel;
    const progress = isCoolingDown ? 1 - remaining / cooldownSeconds : 0;

    return (
      <button
        ref={ref}
        type={type}
        onClick={handleClick}
        disabled={disabled || isCoolingDown}
        aria-live="polite"
        data-state={phase}
        className={cn(
          "relative inline-flex min-w-[160px] items-center justify-center overflow-hidden rounded-md border bg-background px-5 py-2.5 text-sm font-medium shadow-sm",
          "transition-[color,border-color] duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:cursor-not-allowed",
          phase === "idle" && "border-border text-foreground hover:bg-muted",
          phase === "cooldown" && "border-border text-muted-foreground",
          phase === "ready" &&
            "border-emerald-500/60 text-emerald-700 dark:text-emerald-300",
          className,
        )}
        {...props}
      >
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-0"
          animate={{
            width: isCoolingDown
              ? `${progress * 100}%`
              : isReady
                ? "100%"
                : "0%",
            backgroundColor: isReady
              ? "rgba(16, 185, 129, 0.22)"
              : "var(--muted)",
            opacity: isReady ? 0 : 1,
          }}
          transition={
            isReady
              ? {
                  backgroundColor: { duration: 0.15, ease: "easeOut" },
                  opacity: {
                    duration: readyDuration / 1000,
                    ease: "easeOut",
                  },
                  width: { duration: 0.2, ease: "easeOut" },
                }
              : { duration: 0.25, ease: "linear" }
          }
        />
        <AnimatePresence>
          {isReady ? (
            <motion.span
              key="ready-glow"
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(16,185,129,0.35), transparent 70%)",
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 0.9, 0], scale: [0.6, 1.05, 1.1] }}
              exit={{ opacity: 0 }}
              transition={{ duration: readyDuration / 1000, ease: "easeOut" }}
            />
          ) : null}
        </AnimatePresence>
        <span className="relative z-10 inline-flex items-center justify-center tabular-nums">
          <motion.span
            aria-hidden
            animate={{
              width: isReady ? 16 : 0,
              marginRight: isReady ? 6 : 0,
              opacity: isReady ? 1 : 0,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="inline-flex h-4 items-center justify-center overflow-hidden"
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
              animate={{
                scale: isReady ? 1 : 0.4,
                rotate: isReady ? 0 : -20,
              }}
              transition={{ type: "spring", stiffness: 420, damping: 22 }}
            >
              <path d="M20 6 9 17l-5-5" />
            </motion.svg>
          </motion.span>
          <span className="relative inline-flex items-center justify-center">
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={phase}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="whitespace-nowrap"
              >
                {label}
              </motion.span>
            </AnimatePresence>
          </span>
        </span>
      </button>
    );
  },
);

CountdownButton.displayName = "CountdownButton";
