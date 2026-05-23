"use client";

import { cn } from "@/lib/utils";
import EvilEye, { type EvilEyeProps } from "../EvilEye";
import {
  type ButtonHTMLAttributes,
  type CSSProperties,
  type ReactNode,
  useSyncExternalStore,
} from "react";

type EvilEyeTuningProps = Pick<
  EvilEyeProps,
  | "eyeColor"
  | "intensity"
  | "pupilSize"
  | "irisWidth"
  | "glowIntensity"
  | "scale"
  | "noiseScale"
  | "pupilFollow"
  | "flameSpeed"
  | "backgroundColor"
>;

export type EvilEyeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  EvilEyeTuningProps & {
    children: ReactNode;
    effectClassName?: string;
    effectOpacity?: number;
    labelClassName?: string;
  };

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => undefined;
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function getServerReducedMotionSnapshot() {
  return false;
}

function ReducedMotionEye({
  backgroundColor,
  eyeColor,
}: {
  backgroundColor: string;
  eyeColor: string;
}) {
  const style = {
    "--evil-eye-bg": backgroundColor,
    "--evil-eye-color": eyeColor,
  } as CSSProperties;

  return (
    <div
      aria-hidden
      style={style}
      className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--evil-eye-color)_0%,color-mix(in_oklab,var(--evil-eye-color)_65%,white)_9%,transparent_10%),radial-gradient(ellipse_at_center,black_0_7%,transparent_8%),radial-gradient(ellipse_at_center,transparent_0_20%,color-mix(in_oklab,var(--evil-eye-color)_78%,transparent)_21%_36%,transparent_39%),conic-gradient(from_90deg_at_50%_50%,transparent_0deg,color-mix(in_oklab,var(--evil-eye-color)_70%,transparent)_62deg,transparent_118deg,color-mix(in_oklab,var(--evil-eye-color)_65%,transparent)_243deg,transparent_318deg),linear-gradient(var(--evil-eye-bg),var(--evil-eye-bg))]"
    />
  );
}

function EvilEyeButton({
  children,
  className,
  effectClassName,
  effectOpacity = 0.95,
  labelClassName,
  eyeColor = "#ff6f37",
  intensity = 1.65,
  pupilSize = 0.62,
  irisWidth = 0.22,
  glowIntensity = 0.56,
  scale = 1.15,
  noiseScale = 1,
  pupilFollow = 0.55,
  flameSpeed = 0.8,
  backgroundColor = "#050000",
  ...props
}: EvilEyeButtonProps) {
  const reduceMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );

  return (
    <button
      {...props}
      className={cn(
        "group relative inline-flex min-h-16 min-w-52 items-center justify-center overflow-hidden rounded-full border border-orange-200/25 bg-black px-9 py-4 font-mono text-sm font-black uppercase tracking-widest text-orange-50 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_18px_50px_rgba(255,83,20,0.2),inset_0_0_28px_rgba(255,111,55,0.18)] transition-all duration-200 hover:border-orange-200/60 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_22px_70px_rgba(255,83,20,0.35),inset_0_0_34px_rgba(255,111,55,0.28)] active:translate-y-0.5 active:scale-[0.98]",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_0_34%,rgba(0,0,0,0.12)_40%,rgba(0,0,0,0.82)_88%),linear-gradient(90deg,rgba(255,255,255,0.16),transparent_18%,transparent_82%,rgba(255,255,255,0.08))] opacity-90"
      />
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-[-18%] z-0 -translate-y-1 transition-transform duration-500 group-hover:scale-110",
          effectClassName,
        )}
        style={{ opacity: effectOpacity }}
      >
        {reduceMotion ? (
          <ReducedMotionEye
            backgroundColor={backgroundColor}
            eyeColor={eyeColor}
          />
        ) : (
          <EvilEye
            backgroundColor={backgroundColor}
            eyeColor={eyeColor}
            flameSpeed={flameSpeed}
            glowIntensity={glowIntensity}
            intensity={intensity}
            irisWidth={irisWidth}
            noiseScale={noiseScale}
            pupilFollow={pupilFollow}
            pupilSize={pupilSize}
            scale={scale}
          />
        )}
      </span>
      <span
        className={cn(
          "relative z-20 inline-flex w-full items-center justify-center whitespace-nowrap text-center text-orange-50 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] [text-shadow:0_1px_0_rgba(255,255,255,0.25),0_0_14px_rgba(255,111,55,0.75),0_0_2px_black] [&>p]:!m-0 [&>p]:!inline [&>p]:!text-sm [&>p]:!font-black [&>p]:!leading-5 [&>p]:!text-inherit",
          labelClassName,
        )}
      >
        {children}
      </span>
    </button>
  );
}

export default EvilEyeButton;
