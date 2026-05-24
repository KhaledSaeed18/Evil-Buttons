import type { ReactNode } from "react";

export type ButtonShowcaseItem = {
  name: string;
  slug: string;
  label: string;
};

export const buttonShowcaseItems: ButtonShowcaseItem[] = [
  { name: "ClickPowerUp", slug: "click-power-up", label: "Deploy Doom" },
  { name: "StickyButton", slug: "sticky-button", label: "Deploy Doom" },
  { name: "ShinyButton", slug: "shiny-button", label: "Deploy Doom" },
  { name: "MoviePassButton", slug: "movie-pass", label: "Deploy Doom" },
  { name: "MinimalButton", slug: "minimal-button", label: "Deploy Doom" },
  { name: "GridButton", slug: "grid-button", label: "Deploy Doom" },
  { name: "DitherButton", slug: "dither-button", label: "Deploy Doom" },
  { name: "EvilEyeButton", slug: "evil-eye-button", label: "I SEE YOU" },
  { name: "TrollButton", slug: "troll-button", label: "Catch Me" },
  { name: "ChromeButton", slug: "chrome-button", label: "Deploy Doom" },
  { name: "BrutalButton", slug: "brutal-button", label: "Deploy Doom" },
];

export type ButtonRenderer = (label: string) => ReactNode;
