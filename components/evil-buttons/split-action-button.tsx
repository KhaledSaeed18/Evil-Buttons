"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export type SplitActionItem = {
  label: React.ReactNode;
  value: string;
  description?: React.ReactNode;
  onSelect?: (value: string) => void;
};

export interface SplitActionButtonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  label?: React.ReactNode;
  items?: SplitActionItem[];
  onPrimary?: () => void;
  onSelect?: (value: string) => void;
  align?: "left" | "right";
  disabled?: boolean;
}

const defaultItems: SplitActionItem[] = [
  { label: "Save draft", value: "draft", description: "Keep it private" },
  { label: "Schedule", value: "schedule", description: "Publish later" },
  { label: "Publish now", value: "publish", description: "Go live" },
];

export const SplitActionButton = React.forwardRef<
  HTMLDivElement,
  SplitActionButtonProps
>(
  (
    {
      label = "Publish",
      items = defaultItems,
      onPrimary,
      onSelect,
      align = "right",
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    const menuRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
      if (!open) return;
      const close = (event: PointerEvent) => {
        if (!menuRef.current?.contains(event.target as Node)) {
          setOpen(false);
        }
      };

      window.addEventListener("pointerdown", close);
      return () => window.removeEventListener("pointerdown", close);
    }, [open]);

    React.useEffect(() => {
      if (!open) return;
      const closeOnEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") setOpen(false);
      };

      window.addEventListener("keydown", closeOnEscape);
      return () => window.removeEventListener("keydown", closeOnEscape);
    }, [open]);

    const handleSelect = (item: SplitActionItem) => {
      item.onSelect?.(item.value);
      onSelect?.(item.value);
      setOpen(false);
    };

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex", className)}
        {...props}
      >
        <div
          ref={menuRef}
          className="inline-flex overflow-visible rounded-md shadow-sm"
        >
          <button
            type="button"
            disabled={disabled}
            onClick={onPrimary}
            className="inline-flex min-w-28 items-center justify-center rounded-l-md border border-neutral-950 bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60 dark:border-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
          >
            {label}
          </button>
          <button
            type="button"
            disabled={disabled}
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex items-center justify-center rounded-r-md border border-l-0 border-neutral-950 bg-neutral-950 px-2.5 py-2.5 text-white transition-colors hover:bg-neutral-800 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60 dark:border-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.18 }}
            >
              <path d="m6 9 6 6 6-6" />
            </motion.svg>
          </button>
          <AnimatePresence>
            {open ? (
              <motion.div
                role="menu"
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.16 }}
                className={cn(
                  "absolute top-full z-50 mt-2 w-56 overflow-hidden rounded-md border border-border bg-background p-1 shadow-xl",
                  align === "right" ? "right-0" : "left-0",
                )}
              >
                {items.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    role="menuitem"
                    onClick={() => handleSelect(item)}
                    className="flex w-full flex-col rounded px-3 py-2 text-left text-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="font-medium text-foreground">
                      {item.label}
                    </span>
                    {item.description ? (
                      <span className="text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    ) : null}
                  </button>
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    );
  },
);

SplitActionButton.displayName = "SplitActionButton";
