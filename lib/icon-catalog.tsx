import type { ComponentType } from "react";
import CloudBlocksIcon from "@/components/evil-buttons/icons/cloud-blocks";
import MoonIcon from "@/components/evil-buttons/icons/moon";
import SparkBurstIcon from "@/components/evil-buttons/icons/spark-burst";
import SunDimIcon from "@/components/evil-buttons/icons/sun-dim";

type IconComponentProps = {
  className?: string;
};

export type IconCatalogEntry = {
  category: string;
  componentCode: string;
  description: string;
  slug: string;
  svg: string;
  title: string;
  Component: ComponentType<IconComponentProps>;
};

const sunDimSvg = `<svg width="50" height="50" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.25" aria-label="sun-dim"><rect x="120" y="88" width="14" height="14" rx="1"></rect><rect x="104" y="88" width="14" height="14" rx="1"></rect><rect x="88" y="104" width="14" height="14" rx="1"></rect><rect x="88" y="120" width="14" height="14" rx="1"></rect><rect x="88" y="136" width="14" height="14" rx="1"></rect><rect x="136" y="88" width="14" height="14" rx="1"></rect><rect x="120" y="152" width="14" height="14" rx="1"></rect><rect x="104" y="152" width="14" height="14" rx="1"></rect><rect x="136" y="152" width="14" height="14" rx="1"></rect><rect x="152" y="104" width="14" height="14" rx="1"></rect><rect x="168" y="72" width="14" height="14" rx="1"></rect><rect x="168" y="168" width="14" height="14" rx="1"></rect><rect x="72" y="168" width="14" height="14" rx="1"></rect><rect x="72" y="72" width="14" height="14" rx="1"></rect><rect x="120" y="56" width="14" height="14" rx="1"></rect><rect x="56" y="120" width="14" height="14" rx="1"></rect><rect x="120" y="184" width="14" height="14" rx="1"></rect><rect x="184" y="120" width="14" height="14" rx="1"></rect><rect x="40" y="120" width="14" height="14" rx="1"></rect><rect x="120" y="40" width="14" height="14" rx="1"></rect><rect x="120" y="200" width="14" height="14" rx="1"></rect><rect x="184" y="184" width="14" height="14" rx="1"></rect><rect x="56" y="184" width="14" height="14" rx="1"></rect><rect x="184" y="56" width="14" height="14" rx="1"></rect><rect x="56" y="56" width="14" height="14" rx="1"></rect><rect x="200" y="120" width="14" height="14" rx="1"></rect><rect x="152" y="120" width="14" height="14" rx="1"></rect><rect x="152" y="136" width="14" height="14" rx="1"></rect></svg>`;

const sunDimComponentCode = `import { cn } from "@/lib/utils";

export default function SunDimIcon({ className }: { className?: string }) {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 256 256"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="0.25"
      className={cn("size-7", className)}
      aria-label="sun-dim"
    >
      <rect x="120" y="88" width="14" height="14" rx="1" />
      <rect x="104" y="88" width="14" height="14" rx="1" />
      <rect x="88" y="104" width="14" height="14" rx="1" />
      <rect x="88" y="120" width="14" height="14" rx="1" />
      <rect x="88" y="136" width="14" height="14" rx="1" />
      <rect x="136" y="88" width="14" height="14" rx="1" />
      <rect x="120" y="152" width="14" height="14" rx="1" />
      <rect x="104" y="152" width="14" height="14" rx="1" />
      <rect x="136" y="152" width="14" height="14" rx="1" />
      <rect x="152" y="104" width="14" height="14" rx="1" />
      <rect x="168" y="72" width="14" height="14" rx="1" />
      <rect x="168" y="168" width="14" height="14" rx="1" />
      <rect x="72" y="168" width="14" height="14" rx="1" />
      <rect x="72" y="72" width="14" height="14" rx="1" />
      <rect x="120" y="56" width="14" height="14" rx="1" />
      <rect x="56" y="120" width="14" height="14" rx="1" />
      <rect x="120" y="184" width="14" height="14" rx="1" />
      <rect x="184" y="120" width="14" height="14" rx="1" />
      <rect x="40" y="120" width="14" height="14" rx="1" />
      <rect x="120" y="40" width="14" height="14" rx="1" />
      <rect x="120" y="200" width="14" height="14" rx="1" />
      <rect x="184" y="184" width="14" height="14" rx="1" />
      <rect x="56" y="184" width="14" height="14" rx="1" />
      <rect x="184" y="56" width="14" height="14" rx="1" />
      <rect x="56" y="56" width="14" height="14" rx="1" />
      <rect x="200" y="120" width="14" height="14" rx="1" />
      <rect x="152" y="120" width="14" height="14" rx="1" />
      <rect x="152" y="136" width="14" height="14" rx="1" />
    </svg>
  );
}`;

const moonSvg = `<svg width="50" height="50" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.25" aria-label="moon"><rect x="104" y="56" width="14" height="14" rx="1"></rect><rect x="88" y="56" width="14" height="14" rx="1"></rect><rect x="72" y="72" width="14" height="14" rx="1"></rect><rect x="88" y="72" width="14" height="14" rx="1"></rect><rect x="88" y="88" width="14" height="14" rx="1"></rect><rect x="72" y="88" width="14" height="14" rx="1"></rect><rect x="56" y="104" width="14" height="14" rx="1"></rect><rect x="88" y="104" width="14" height="14" rx="1"></rect><rect x="72" y="104" width="14" height="14" rx="1"></rect><rect x="56" y="136" width="14" height="14" rx="1"></rect><rect x="88" y="136" width="14" height="14" rx="1"></rect><rect x="72" y="136" width="14" height="14" rx="1"></rect><rect x="56" y="120" width="14" height="14" rx="1"></rect><rect x="88" y="120" width="14" height="14" rx="1"></rect><rect x="104" y="120" width="14" height="14" rx="1"></rect><rect x="72" y="120" width="14" height="14" rx="1"></rect><rect x="88" y="56" width="14" height="14" rx="1"></rect><rect x="104" y="136" width="14" height="14" rx="1"></rect><rect x="72" y="152" width="14" height="14" rx="1"></rect><rect x="104" y="152" width="14" height="14" rx="1"></rect><rect x="120" y="136" width="14" height="14" rx="1"></rect><rect x="88" y="152" width="14" height="14" rx="1"></rect><rect x="168" y="152" width="14" height="14" rx="1"></rect><rect x="184" y="136" width="14" height="14" rx="1"></rect><rect x="120" y="152" width="14" height="14" rx="1"></rect><rect x="152" y="152" width="14" height="14" rx="1"></rect><rect x="136" y="152" width="14" height="14" rx="1"></rect><rect x="72" y="168" width="14" height="14" rx="1"></rect><rect x="104" y="168" width="14" height="14" rx="1"></rect><rect x="88" y="168" width="14" height="14" rx="1"></rect><rect x="168" y="168" width="14" height="14" rx="1"></rect><rect x="120" y="168" width="14" height="14" rx="1"></rect><rect x="152" y="168" width="14" height="14" rx="1"></rect><rect x="136" y="168" width="14" height="14" rx="1"></rect><rect x="104" y="184" width="14" height="14" rx="1"></rect><rect x="120" y="184" width="14" height="14" rx="1"></rect><rect x="136" y="184" width="14" height="14" rx="1"></rect><rect x="184" y="152" width="14" height="14" rx="1"></rect></svg>`;

const moonComponentCode = `import { cn } from "@/lib/utils";

export default function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 256 256"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="0.25"
      className={cn("size-7", className)}
      aria-label="moon"
    >
      <rect x="104" y="56" width="14" height="14" rx="1" />
      <rect x="88" y="56" width="14" height="14" rx="1" />
      <rect x="72" y="72" width="14" height="14" rx="1" />
      <rect x="88" y="72" width="14" height="14" rx="1" />
      <rect x="88" y="88" width="14" height="14" rx="1" />
      <rect x="72" y="88" width="14" height="14" rx="1" />
      <rect x="56" y="104" width="14" height="14" rx="1" />
      <rect x="88" y="104" width="14" height="14" rx="1" />
      <rect x="72" y="104" width="14" height="14" rx="1" />
      <rect x="56" y="136" width="14" height="14" rx="1" />
      <rect x="88" y="136" width="14" height="14" rx="1" />
      <rect x="72" y="136" width="14" height="14" rx="1" />
      <rect x="56" y="120" width="14" height="14" rx="1" />
      <rect x="88" y="120" width="14" height="14" rx="1" />
      <rect x="104" y="120" width="14" height="14" rx="1" />
      <rect x="72" y="120" width="14" height="14" rx="1" />
      <rect x="88" y="56" width="14" height="14" rx="1" />
      <rect x="104" y="136" width="14" height="14" rx="1" />
      <rect x="72" y="152" width="14" height="14" rx="1" />
      <rect x="104" y="152" width="14" height="14" rx="1" />
      <rect x="120" y="136" width="14" height="14" rx="1" />
      <rect x="88" y="152" width="14" height="14" rx="1" />
      <rect x="168" y="152" width="14" height="14" rx="1" />
      <rect x="184" y="136" width="14" height="14" rx="1" />
      <rect x="120" y="152" width="14" height="14" rx="1" />
      <rect x="152" y="152" width="14" height="14" rx="1" />
      <rect x="136" y="152" width="14" height="14" rx="1" />
      <rect x="72" y="168" width="14" height="14" rx="1" />
      <rect x="104" y="168" width="14" height="14" rx="1" />
      <rect x="88" y="168" width="14" height="14" rx="1" />
      <rect x="168" y="168" width="14" height="14" rx="1" />
      <rect x="120" y="168" width="14" height="14" rx="1" />
      <rect x="152" y="168" width="14" height="14" rx="1" />
      <rect x="136" y="168" width="14" height="14" rx="1" />
      <rect x="104" y="184" width="14" height="14" rx="1" />
      <rect x="120" y="184" width="14" height="14" rx="1" />
      <rect x="136" y="184" width="14" height="14" rx="1" />
      <rect x="184" y="152" width="14" height="14" rx="1" />
    </svg>
  );
}`;

const sparkBurstSvg = `<svg viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.25" aria-label="spark-burst"><rect x="120" y="24" width="16" height="16" rx="1"></rect><rect x="120" y="56" width="16" height="16" rx="1"></rect><rect x="120" y="88" width="16" height="16" rx="1"></rect><rect x="120" y="120" width="16" height="16" rx="1"></rect><rect x="120" y="152" width="16" height="16" rx="1"></rect><rect x="120" y="184" width="16" height="16" rx="1"></rect><rect x="120" y="216" width="16" height="16" rx="1"></rect><rect x="24" y="120" width="16" height="16" rx="1"></rect><rect x="56" y="120" width="16" height="16" rx="1"></rect><rect x="88" y="120" width="16" height="16" rx="1"></rect><rect x="152" y="120" width="16" height="16" rx="1"></rect><rect x="184" y="120" width="16" height="16" rx="1"></rect><rect x="216" y="120" width="16" height="16" rx="1"></rect><rect x="72" y="72" width="16" height="16" rx="1"></rect><rect x="88" y="88" width="16" height="16" rx="1"></rect><rect x="152" y="88" width="16" height="16" rx="1"></rect><rect x="168" y="72" width="16" height="16" rx="1"></rect><rect x="72" y="168" width="16" height="16" rx="1"></rect><rect x="88" y="152" width="16" height="16" rx="1"></rect><rect x="152" y="152" width="16" height="16" rx="1"></rect><rect x="168" y="168" width="16" height="16" rx="1"></rect></svg>`;

const sparkBurstComponentCode = `import { cn } from "@/lib/utils";

export default function SparkBurstIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="0.25"
      className={cn("size-7", className)}
      aria-label="spark-burst"
    >
      <rect x="120" y="24" width="16" height="16" rx="1" />
      <rect x="120" y="56" width="16" height="16" rx="1" />
      <rect x="120" y="88" width="16" height="16" rx="1" />
      <rect x="120" y="120" width="16" height="16" rx="1" />
      <rect x="120" y="152" width="16" height="16" rx="1" />
      <rect x="120" y="184" width="16" height="16" rx="1" />
      <rect x="120" y="216" width="16" height="16" rx="1" />
      <rect x="24" y="120" width="16" height="16" rx="1" />
      <rect x="56" y="120" width="16" height="16" rx="1" />
      <rect x="88" y="120" width="16" height="16" rx="1" />
      <rect x="152" y="120" width="16" height="16" rx="1" />
      <rect x="184" y="120" width="16" height="16" rx="1" />
      <rect x="216" y="120" width="16" height="16" rx="1" />
      <rect x="72" y="72" width="16" height="16" rx="1" />
      <rect x="88" y="88" width="16" height="16" rx="1" />
      <rect x="152" y="88" width="16" height="16" rx="1" />
      <rect x="168" y="72" width="16" height="16" rx="1" />
      <rect x="72" y="168" width="16" height="16" rx="1" />
      <rect x="88" y="152" width="16" height="16" rx="1" />
      <rect x="152" y="152" width="16" height="16" rx="1" />
      <rect x="168" y="168" width="16" height="16" rx="1" />
    </svg>
  );
}`;

const cloudBlocksSvg = `<svg viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.25" aria-label="cloud-blocks"><rect x="56" y="136" width="18" height="18" rx="1"></rect><rect x="74" y="118" width="18" height="18" rx="1"></rect><rect x="92" y="100" width="18" height="18" rx="1"></rect><rect x="110" y="82" width="18" height="18" rx="1"></rect><rect x="128" y="82" width="18" height="18" rx="1"></rect><rect x="146" y="100" width="18" height="18" rx="1"></rect><rect x="164" y="100" width="18" height="18" rx="1"></rect><rect x="182" y="118" width="18" height="18" rx="1"></rect><rect x="182" y="136" width="18" height="18" rx="1"></rect><rect x="164" y="154" width="18" height="18" rx="1"></rect><rect x="146" y="154" width="18" height="18" rx="1"></rect><rect x="128" y="154" width="18" height="18" rx="1"></rect><rect x="110" y="154" width="18" height="18" rx="1"></rect><rect x="92" y="154" width="18" height="18" rx="1"></rect><rect x="74" y="154" width="18" height="18" rx="1"></rect></svg>`;

const cloudBlocksComponentCode = `import { cn } from "@/lib/utils";

export default function CloudBlocksIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="0.25"
      className={cn("size-7", className)}
      aria-label="cloud-blocks"
    >
      <rect x="56" y="136" width="18" height="18" rx="1" />
      <rect x="74" y="118" width="18" height="18" rx="1" />
      <rect x="92" y="100" width="18" height="18" rx="1" />
      <rect x="110" y="82" width="18" height="18" rx="1" />
      <rect x="128" y="82" width="18" height="18" rx="1" />
      <rect x="146" y="100" width="18" height="18" rx="1" />
      <rect x="164" y="100" width="18" height="18" rx="1" />
      <rect x="182" y="118" width="18" height="18" rx="1" />
      <rect x="182" y="136" width="18" height="18" rx="1" />
      <rect x="164" y="154" width="18" height="18" rx="1" />
      <rect x="146" y="154" width="18" height="18" rx="1" />
      <rect x="128" y="154" width="18" height="18" rx="1" />
      <rect x="110" y="154" width="18" height="18" rx="1" />
      <rect x="92" y="154" width="18" height="18" rx="1" />
      <rect x="74" y="154" width="18" height="18" rx="1" />
    </svg>
  );
}`;

export const iconCatalog: IconCatalogEntry[] = [
  {
    slug: "sun-dim",
    title: "Sun Dim",
    description: "A chunky low-res sun icon with ring detail and square rays.",
    category: "Theme",
    svg: sunDimSvg,
    componentCode: sunDimComponentCode,
    Component: SunDimIcon,
  },
  {
    slug: "moon-chunk",
    title: "Moon Chunk",
    description: "A chunky moon icon with a bold block silhouette for theme toggles.",
    category: "Theme",
    svg: moonSvg,
    componentCode: moonComponentCode,
    Component: MoonIcon,
  },
  {
    slug: "spark-burst",
    title: "Spark Burst",
    description: "A sharp utility spark for badges, highlights, and celebratory accents.",
    category: "UI",
    svg: sparkBurstSvg,
    componentCode: sparkBurstComponentCode,
    Component: SparkBurstIcon,
  },
  {
    slug: "cloud-blocks",
    title: "Cloud Blocks",
    description: "A compact retro cloud icon that still reads clearly at small sizes.",
    category: "Weather",
    svg: cloudBlocksSvg,
    componentCode: cloudBlocksComponentCode,
    Component: CloudBlocksIcon,
  },
];

export function getIconBySlug(slug: string) {
  return iconCatalog.find((icon) => icon.slug === slug) ?? null;
}
