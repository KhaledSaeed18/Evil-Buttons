"use client";

import Link from "next/link";
import { ClickPowerUp } from "@/components/evil-buttons/click-powerup";
import StickyButton from "@/components/evil-buttons/sticky";
import ShinyButton from "@/components/evil-buttons/shiny-button";
import MoviePassButton from "@/components/evil-buttons/movie-pass";
import MinimalButton from "@/components/evil-buttons/minimal";
import GridButton from "@/components/evil-buttons/grid-button";
import DitherButton from "@/components/evil-buttons/dither-button";
import EvilEyeButton from "@/components/evil-buttons/evil-eye-button";
import TrollButton from "@/components/evil-buttons/troll-button";
import ChromeButton from "@/components/evil-buttons/chrome-button";
import { PatternSeparator } from "@/components/landing/pattern-separator";
import {
  buttonShowcaseItems,
  type ButtonRenderer,
} from "@/lib/buttons-catalog";

const buttonRenderers: Record<string, ButtonRenderer> = {
  "click-power-up": (label) => (
    <ClickPowerUp className="w-full">{label}</ClickPowerUp>
  ),
  "sticky-button": (label) => <StickyButton>{label}</StickyButton>,
  "shiny-button": (label) => <ShinyButton>{label}</ShinyButton>,
  "movie-pass": (label) => <MoviePassButton>{label}</MoviePassButton>,
  "minimal-button": (label) => (
    <MinimalButton className="w-full">{label}</MinimalButton>
  ),
  "grid-button": (label) => <GridButton>{label}</GridButton>,
  "dither-button": (label) => (
    <DitherButton className="w-full">{label}</DitherButton>
  ),
  "evil-eye-button": (label) => (
    <EvilEyeButton >
      {label}
    </EvilEyeButton>
  ),
  "troll-button": (label) => <TrollButton>{label}</TrollButton>,
  "chrome-button": (label) => (
    <ChromeButton>{label}</ChromeButton>
  ),
};

export function ButtonShowcaseGrid() {
  return (
    <section className="py-20 md:py-28">
      <div className="px-6 md:px-8">
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-3 text-center md:mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            10 components
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Every button, live in the grid
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            Tap, hover, and drag. Each cell is a real registry component — open
            the docs to install with one command.
          </p>
        </div>

        <PatternSeparator className="mb-8 md:mb-10" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
          {buttonShowcaseItems.map((item) => (
            <article
              key={item.slug}
              className="group flex min-h-56 flex-col overflow-hidden border border-border sm:min-h-60 lg:min-h-64"
            >
              <div className="shrink-0 px-4 py-3 text-center">
                <Link
                  href={`/docs/${item.slug}`}
                  className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.name}
                </Link>
              </div>

              <div className="relative min-h-0 flex-1 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden p-4">
                  <div
                    className={
                      item.slug === "evil-eye-button" ||
                      item.slug === "troll-button" ||
                      item.slug === "sticky-button"
                        ? "h-full w-full overflow-hidden flex items-center justify-center"
                        : "max-w-full overflow-hidden"
                    }
                  >
                    {buttonRenderers[item.slug]?.(item.label)}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
