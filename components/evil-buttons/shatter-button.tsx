"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface ShatterButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  cols?: number;
  rows?: number;
  scatterRadius?: number;
  rebuildAfter?: number;
}

type Shard = {
  key: string;
  row: number;
  col: number;
  dx: number;
  dy: number;
  rotate: number;
  delay: number;
};

const seededRandom = () => Math.random() * 2 - 1;

export const ShatterButton = React.forwardRef<
  HTMLButtonElement,
  ShatterButtonProps
>(
  (
    {
      children,
      className,
      cols = 5,
      rows = 3,
      scatterRadius = 160,
      rebuildAfter = 900,
      onClick,
      ...props
    },
    ref,
  ) => {
    const [shattering, setShattering] = React.useState(false);
    const timerRef = React.useRef<number | null>(null);

    React.useEffect(() => {
      return () => {
        if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      };
    }, []);

    const shards = React.useMemo<Shard[]>(() => {
      const list: Shard[] = [];
      const cx = (cols - 1) / 2;
      const cy = (rows - 1) / 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const dirX = c - cx;
          const dirY = r - cy;
          const mag = Math.max(Math.hypot(dirX, dirY), 0.5);
          const nx = dirX / mag;
          const ny = dirY / mag;
          const radius = scatterRadius * (0.55 + Math.random() * 0.6);
          list.push({
            key: `${r}-${c}`,
            row: r,
            col: c,
            dx: nx * radius + seededRandom() * 18,
            dy: ny * radius + seededRandom() * 18 - 12,
            rotate: seededRandom() * 90,
            delay: Math.random() * 0.05,
          });
        }
      }
      return list;
    }, [cols, rows, scatterRadius, shattering]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (shattering) return;
      onClick?.(e);
      setShattering(true);
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        setShattering(false);
      }, rebuildAfter);
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        data-state={shattering ? "shattering" : "idle"}
        className={cn(
          "relative inline-flex items-center justify-center rounded-md bg-foreground px-7 py-3 text-sm font-semibold uppercase tracking-wider text-background shadow-sm",
          "transition-transform duration-100 hover:bg-foreground/90 active:scale-[0.98]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
        {...props}
      >
        <motion.span
          aria-hidden={shattering}
          animate={{ opacity: shattering ? 0 : 1 }}
          transition={{ duration: shattering ? 0.05 : 0.25, delay: shattering ? 0 : rebuildAfter / 1000 - 0.1 }}
          className="relative z-10"
        >
          {children}
        </motion.span>

        <AnimatePresence>
          {shattering ? (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 grid overflow-visible"
              style={{
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
              }}
            >
              {shards.map((shard) => (
                <motion.span
                  key={shard.key}
                  initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                  animate={{
                    x: shard.dx,
                    y: shard.dy,
                    rotate: shard.rotate,
                    opacity: 0,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.55,
                    ease: [0.2, 0.6, 0.2, 1],
                    delay: shard.delay,
                  }}
                  className="block bg-foreground"
                />
              ))}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </button>
    );
  },
);

ShatterButton.displayName = "ShatterButton";
