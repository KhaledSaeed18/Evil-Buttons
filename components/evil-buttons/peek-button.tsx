"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface PeekButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  peek?: React.ReactNode;
  side?: "top" | "bottom";
}

export const PeekButton = React.forwardRef<HTMLButtonElement, PeekButtonProps>(
  (
    {
      children = "Inspect",
      peek = "Last updated 2m ago",
      side = "top",
      className,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);

    return (
      <button
        ref={ref}
        type={type}
        onPointerEnter={() => setOpen(true)}
        onPointerLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        data-state={open ? "open" : "closed"}
        className={cn(
          "group relative inline-flex min-w-36 items-center justify-center rounded-md border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors",
          "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60",
          className,
        )}
        {...props}
      >
        <AnimatePresence>
          {open ? (
            <motion.span
              role="status"
              initial={{ opacity: 0, y: side === "top" ? 6 : -6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: side === "top" ? 6 : -6, scale: 0.96 }}
              transition={{ duration: 0.16 }}
              className={cn(
                "pointer-events-none absolute z-20 max-w-56 whitespace-nowrap rounded-md border border-border bg-foreground px-3 py-1.5 text-xs font-medium text-background shadow-lg",
                side === "top" ? "bottom-full mb-2" : "top-full mt-2",
              )}
            >
              {peek}
            </motion.span>
          ) : null}
        </AnimatePresence>
        <span className="relative z-10 inline-flex items-center gap-2">
          <span>{children}</span>
          <motion.span
            aria-hidden
            animate={{ x: open ? 2 : 0 }}
            transition={{ duration: 0.16 }}
          >
            →
          </motion.span>
        </span>
      </button>
    );
  },
);

PeekButton.displayName = "PeekButton";
