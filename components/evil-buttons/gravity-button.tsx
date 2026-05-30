"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface GravityButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  particleCount?: number;
}

type Particle = {
  id: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
};

const COLORS = [
  "bg-violet-500",
  "bg-fuchsia-500",
  "bg-cyan-500",
  "bg-rose-500",
  "bg-amber-500",
  "bg-lime-500",
];

export const GravityButton = React.forwardRef<
  HTMLButtonElement,
  GravityButtonProps
>(
  (
    {
      children = "Click me",
      particleCount = 6,
      className,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const [mouse, setMouse] = React.useState({ x: 50, y: 50 });
    const [burst, setBurst] = React.useState(false);
    const [burstDir, setBurstDir] = React.useState<{ dx: number; dy: number }[]>([]);
    const tickRef = React.useRef<number | null>(null);
    const mouseRef = React.useRef({ x: 50, y: 50 });

    const particles = React.useMemo<Particle[]>(() => {
      const arr: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        arr.push({
          id: i,
          baseX: (Math.random() - 0.5) * 60,
          baseY: (Math.random() - 0.5) * 60,
          size: 2.5 + Math.random() * 4,
          color: COLORS[i % COLORS.length],
        });
      }
      return arr;
    }, [particleCount]);

    const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      mouseRef.current = { x, y };
      if (tickRef.current === null) {
        tickRef.current = window.requestAnimationFrame(() => {
          setMouse({ ...mouseRef.current });
          tickRef.current = null;
        });
      }
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!burst) {
        const dirs = particles.map(() => ({
          dx: (Math.random() - 0.5) * 140,
          dy: (Math.random() - 0.5) * 140 - 40,
        }));
        setBurstDir(dirs);
        setBurst(true);
        window.setTimeout(() => setBurst(false), 550);
      }
      props.onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type={type}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => {
          mouseRef.current = { x: 50, y: 50 };
          setMouse({ x: 50, y: 50 });
        }}
        onClick={handleClick}
        className={cn(
          "group relative inline-flex min-w-40 items-center justify-center overflow-hidden rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors",
          "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "cursor-pointer select-none",
          className,
        )}
        {...props}
      >
        {particles.map((p, i) => {
          const dx = mouse.x - 50 + p.baseX * 0.04;
          const dy = mouse.y - 50 + p.baseY * 0.04;

          return (
            <motion.span
              key={p.id}
              aria-hidden
              className={cn(
                "pointer-events-none absolute rounded-full",
                p.color,
              )}
              style={{
                width: p.size,
                height: p.size,
                x: -p.size / 2,
                y: -p.size / 2,
              }}
              animate={
                burst
                  ? {
                      x: burstDir[i]?.dx ?? 0,
                      y: burstDir[i]?.dy ?? 0,
                      opacity: 0,
                      scale: 0,
                    }
                  : {
                      x: dx,
                      y: dy,
                      opacity: 0.7,
                      scale: 1,
                    }
              }
              transition={
                burst
                  ? { duration: 0.5, ease: "easeOut" }
                  : {
                      type: "spring",
                      stiffness: 150,
                      damping: 15,
                      mass: 0.3,
                    }
              }
            />
          );
        })}
        <span className="relative z-10">{children}</span>
      </button>
    );
  },
);

GravityButton.displayName = "GravityButton";
