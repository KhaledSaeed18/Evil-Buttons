"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface FluxButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  speed?: number;
  colors?: string[];
}

const DEFAULT_COLORS = [
  "#6366f1", // indigo
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#a855f7", // purple
  "#6366f1", // back to indigo
];

export const FluxButton = React.forwardRef<
  HTMLButtonElement,
  FluxButtonProps
>(
  (
    {
      children = "Flux",
      speed = 6,
      colors = DEFAULT_COLORS,
      className,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const [hovered, setHovered] = React.useState(false);

    return (
      <button
        ref={ref}
        type={type}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className={cn(
          "group relative inline-flex items-center justify-center overflow-hidden rounded-md px-6 py-3 text-sm font-semibold text-white shadow-sm transition-shadow",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "hover:shadow-lg",
          className,
        )}
        {...props}
      >
        <span
          aria-hidden
          className="absolute inset-0 animate-flux bg-[length:300%_100%]"
          style={{
            backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
            filter: "saturate(1.2)",
            animationDuration: `${speed}s`,
          }}
        />
        <motion.span
          aria-hidden
          animate={{
            opacity: hovered ? 0.35 : 0.15,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-white"
        />
        <span
          aria-hidden
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.08) 4px, rgba(255,255,255,0.08) 8px)",
          }}
        />
        <motion.span
          animate={{
            boxShadow: hovered
              ? "inset 0 1px 0 rgba(255,255,255,0.4)"
              : "inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
          className="absolute inset-0 rounded-md"
        />
        <span className="relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
          {children}
        </span>
      </button>
    );
  },
);

FluxButton.displayName = "FluxButton";
