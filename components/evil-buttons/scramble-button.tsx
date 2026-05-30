"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const DEFAULT_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

function randomChar(chars: string) {
  return chars[Math.floor(Math.random() * chars.length)];
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export interface ScrambleButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<unknown>;
  idleLabel?: React.ReactNode;
  scrambledLabel?: React.ReactNode;
  scrambleChars?: string;
  duration?: number;
}

export const ScrambleButton = React.forwardRef<
  HTMLButtonElement,
  ScrambleButtonProps
>(
  (
    {
      onClick,
      idleLabel = "Generate",
      scrambledLabel,
      scrambleChars = DEFAULT_CHARS,
      duration = 700,
      className,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const [phase, setPhase] = React.useState<
      "idle" | "scrambling" | "revealed"
    >("idle");
    const [displayText, setDisplayText] = React.useState("");
    const rafRef = React.useRef<number | null>(null);
    const timeoutRef = React.useRef<number | null>(null);

    const label =
      typeof idleLabel === "string" ? idleLabel : "Generate";
    const target =
      scrambledLabel && typeof scrambledLabel === "string"
        ? String(scrambledLabel)
        : label;

    const clearTimers = React.useCallback(() => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
      rafRef.current = null;
      timeoutRef.current = null;
    }, []);

    React.useEffect(() => clearTimers, [clearTimers]);

    const scramble = React.useCallback(() => {
      clearTimers();
      setPhase("scrambling");
      const start = performance.now();

      const frame = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);
        const visible = Math.floor(eased * target.length);

        const result = target
          .split("")
          .map((ch, i) => (i < visible ? ch : randomChar(scrambleChars)))
          .join("");
        setDisplayText(result);

        if (progress < 1) {
          rafRef.current = window.requestAnimationFrame(frame);
        } else {
          setDisplayText(target);
          setPhase("revealed");
        }
      };
      rafRef.current = window.requestAnimationFrame(frame);
    }, [clearTimers, duration, target, scrambleChars]);

    const reset = React.useCallback(() => {
      clearTimers();
      setPhase("idle");
      setDisplayText(label);
    }, [clearTimers, label]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      onClick?.(e);
      if (phase === "revealed") {
        reset();
      } else if (phase === "idle") {
        scramble();
      }
    };

    React.useEffect(() => {
      if (phase === "idle") setDisplayText(label);
    }, [label, phase]);

    return (
      <button
        ref={ref}
        type={type}
        onClick={handleClick}
        disabled={disabled}
        aria-live="polite"
        data-phase={phase}
        className={cn(
          "relative inline-flex min-w-36 items-center justify-center overflow-hidden rounded-md border bg-background px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60",
          phase === "idle" &&
            "border-border hover:bg-muted",
          phase === "scrambling" &&
            "border-amber-500/50 bg-amber-500/10",
          phase === "revealed" &&
            "border-emerald-500/50 bg-emerald-500/10",
          className,
        )}
        {...props}
      >
        <motion.span
          key={phase + displayText}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
          className="font-mono tracking-widest"
        >
          {phase === "idle" ? label : displayText}
        </motion.span>
      </button>
    );
  },
);

ScrambleButton.displayName = "ScrambleButton";
