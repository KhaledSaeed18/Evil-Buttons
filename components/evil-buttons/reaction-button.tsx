"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface ReactionButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  count?: number;
  defaultCount?: number;
  reacted?: boolean;
  defaultReacted?: boolean;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  onReactionChange?: (reacted: boolean, count: number) => void;
}

const burst = Array.from({ length: 8 }).map((_, index) => {
  const angle = (Math.PI * 2 * index) / 8;
  return {
    x: Math.cos(angle) * 34,
    y: Math.sin(angle) * 28,
  };
});

export const ReactionButton = React.forwardRef<
  HTMLButtonElement,
  ReactionButtonProps
>(
  (
    {
      count,
      defaultCount = 24,
      reacted,
      defaultReacted = false,
      label = "Like",
      icon = "♥",
      onReactionChange,
      className,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const [internalReacted, setInternalReacted] = React.useState(defaultReacted);
    const [internalCount, setInternalCount] = React.useState(defaultCount);
    const [burstKey, setBurstKey] = React.useState(0);
    const isControlled = reacted !== undefined || count !== undefined;
    const active = reacted ?? internalReacted;
    const value = count ?? internalCount;

    const handleClick = () => {
      const nextReacted = !active;
      const nextCount = Math.max(value + (nextReacted ? 1 : -1), 0);

      if (!isControlled) {
        setInternalReacted(nextReacted);
        setInternalCount(nextCount);
      }

      if (nextReacted) setBurstKey((current) => current + 1);
      onReactionChange?.(nextReacted, nextCount);
    };

    return (
      <button
        ref={ref}
        type={type}
        onClick={handleClick}
        disabled={disabled}
        aria-pressed={active}
        data-state={active ? "reacted" : "idle"}
        className={cn(
          "relative inline-flex min-w-32 items-center justify-center gap-2 overflow-visible rounded-md border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors",
          "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60",
          active && "border-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-300",
          className,
        )}
        {...props}
      >
        <span className="pointer-events-none absolute left-6 top-1/2">
          <AnimatePresence>
            {active
              ? burst.map((dot, index) => (
                  <motion.span
                    key={`${burstKey}-${index}`}
                    aria-hidden
                    initial={{ x: 0, y: 0, scale: 0.2, opacity: 0.9 }}
                    animate={{ x: dot.x, y: dot.y, scale: 0, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="absolute size-1.5 rounded-full bg-rose-500"
                  />
                ))
              : null}
          </AnimatePresence>
        </span>
        <motion.span
          aria-hidden
          animate={active ? { scale: [1, 1.35, 1] } : { scale: 1 }}
          transition={{ duration: 0.22 }}
          className="relative z-10 text-base leading-none"
        >
          {icon}
        </motion.span>
        <span className="relative z-10">{label}</span>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="relative z-10 rounded bg-foreground/8 px-1.5 py-0.5 font-mono text-xs"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </button>
    );
  },
);

ReactionButton.displayName = "ReactionButton";
