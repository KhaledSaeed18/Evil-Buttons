"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface BreatheButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  speed?: number;
  amplitude?: number;
}

export const BreatheButton = React.forwardRef<
  HTMLButtonElement,
  BreatheButtonProps
>(
  (
    {
      children = "Breathe",
      speed = 3600,
      amplitude = 1.025,
      className,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const [hovered, setHovered] = React.useState(false);
    const [clicked, setClicked] = React.useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setClicked(true);
      window.setTimeout(() => setClicked(false), 400);
      props.onClick?.(e);
    };

    return (
      <motion.button
        ref={ref}
        type={type}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        onClick={handleClick}
        animate={
          clicked
            ? {
                scale: [1, 0.96, 1.04, 1],
              }
            : hovered
              ? {
                  scale: 1.04,
                }
              : {
                  scale: [1, amplitude, 1],
                }
        }
        transition={
          clicked
            ? { duration: 0.35, ease: "easeInOut" }
            : hovered
              ? { duration: 0.25, ease: "easeOut" }
              : {
                  duration: speed / 1000,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
        }
        aria-label={typeof children === "string" ? children : undefined}
        className={cn(
          "inline-flex items-center justify-center rounded-full border border-emerald-500/20 bg-gradient-to-b from-emerald-50 to-emerald-100 px-6 py-3 text-sm font-semibold text-emerald-800 shadow-sm",
          "hover:from-emerald-100 hover:to-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
          "cursor-pointer select-none dark:from-emerald-950 dark:to-emerald-900 dark:text-emerald-200 dark:hover:from-emerald-900 dark:hover:to-emerald-800",
          className,
        )}
      >
        <motion.span
          aria-hidden
          animate={
            hovered || clicked
              ? { opacity: 0.6 }
              : {
                  opacity: [0.3, 0.6, 0.3],
                }
          }
          transition={
            hovered || clicked
              ? { duration: 0.2 }
              : {
                  duration: speed / 1000,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className="absolute inset-0 rounded-full bg-gradient-to-t from-emerald-300/20 to-transparent dark:from-emerald-400/10"
        />
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  },
);

BreatheButton.displayName = "BreatheButton";
