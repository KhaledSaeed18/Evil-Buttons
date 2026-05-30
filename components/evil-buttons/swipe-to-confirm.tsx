"use client";

import * as React from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export interface SwipeToConfirmButtonProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
  > {
  onConfirm?: () => void;
  idleLabel?: React.ReactNode;
  confirmedLabel?: React.ReactNode;
  threshold?: number;
  width?: number | string;
  destructive?: boolean;
}

export const SwipeToConfirmButton = React.forwardRef<
  HTMLDivElement,
  SwipeToConfirmButtonProps
>(
  (
    {
      onConfirm,
      idleLabel = "Swipe to confirm",
      confirmedLabel = "Confirmed",
      threshold = 0.85,
      width = 280,
      destructive = false,
      className,
      ...props
    },
    ref,
  ) => {
    const trackRef = React.useRef<HTMLDivElement | null>(null);
    const x = useMotionValue(0);
    const [maxX, setMaxX] = React.useState(0);
    const [confirmed, setConfirmed] = React.useState(false);
    const handleSize = 44;

    React.useImperativeHandle(ref, () => trackRef.current as HTMLDivElement);

    React.useEffect(() => {
      const el = trackRef.current;
      if (!el) return;
      const measure = () => {
        const inner = el.clientWidth - handleSize - 8;
        setMaxX(Math.max(inner, 0));
      };
      measure();
      const ro = new ResizeObserver(measure);
      ro.observe(el);
      return () => ro.disconnect();
    }, []);

    const fillWidth = useTransform(x, (v) => {
      const total = maxX + handleSize;
      const filled = Math.min(v + handleSize, total);
      return `${filled}px`;
    });

    const labelOpacity = useTransform(
      x,
      [0, Math.max(maxX * 0.6, 1)],
      [1, 0],
    );

    const reset = () => {
      animate(x, 0, { type: "spring", stiffness: 380, damping: 32 });
    };

    const handleDragEnd = () => {
      if (confirmed) return;
      if (x.get() / Math.max(maxX, 1) >= threshold) {
        animate(x, maxX, {
          type: "spring",
          stiffness: 420,
          damping: 30,
          onComplete: () => {
            setConfirmed(true);
            onConfirm?.();
          },
        });
      } else {
        reset();
      }
    };

    return (
      <div
        ref={trackRef}
        data-state={confirmed ? "confirmed" : "idle"}
        className={cn(
          "relative inline-flex h-12 select-none items-center overflow-hidden rounded-full border bg-muted",
          destructive
            ? "border-red-500/40 bg-red-50 dark:bg-red-950/40"
            : "border-border",
          confirmed && "border-emerald-500/50",
          className,
        )}
        style={{ width }}
        {...props}
      >
        <motion.div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 rounded-full",
            destructive ? "bg-red-500/80" : "bg-foreground/85",
            confirmed && "bg-emerald-500",
          )}
          style={{ width: fillWidth }}
        />
        <motion.span
          aria-hidden
          style={{ opacity: labelOpacity }}
          className={cn(
            "pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-sm font-medium tracking-wide",
            destructive ? "text-red-700 dark:text-red-300" : "text-muted-foreground",
          )}
        >
          {idleLabel}
        </motion.span>
        {confirmed ? (
          <motion.span
            aria-live="polite"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-20 flex items-center justify-center text-sm font-semibold text-white"
          >
            {confirmedLabel}
          </motion.span>
        ) : null}
        <motion.button
          type="button"
          drag={confirmed ? false : "x"}
          dragConstraints={{ left: 0, right: maxX }}
          dragElastic={0}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          style={{ x, width: handleSize, height: handleSize }}
          whileTap={{ scale: 0.96 }}
          aria-label={typeof idleLabel === "string" ? idleLabel : "Swipe to confirm"}
          className={cn(
            "relative z-30 ml-1 inline-flex shrink-0 items-center justify-center rounded-full bg-background text-foreground shadow-md ring-1 ring-border",
            confirmed
              ? "cursor-default"
              : "cursor-grab touch-none active:cursor-grabbing",
          )}
        >
          {confirmed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5 text-emerald-600 dark:text-emerald-400"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <path d="m9 18 6-6-6-6" />
              <path d="m15 18 6-6-6-6" opacity={0.5} />
            </svg>
          )}
        </motion.button>
      </div>
    );
  },
);

SwipeToConfirmButton.displayName = "SwipeToConfirmButton";
