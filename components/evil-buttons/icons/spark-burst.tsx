import { cn } from "@/lib/utils";

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
      {/* Vertical */}
      <rect x="120" y="32" width="16" height="16" rx="1" />
      <rect x="120" y="56" width="16" height="16" rx="1" />
      <rect x="120" y="80" width="16" height="16" rx="1" />
      <rect x="120" y="104" width="16" height="16" rx="1" />
      <rect x="120" y="128" width="16" height="16" rx="1" />
      <rect x="120" y="152" width="16" height="16" rx="1" />
      <rect x="120" y="176" width="16" height="16" rx="1" />
      <rect x="120" y="200" width="16" height="16" rx="1" />

      {/* Horizontal */}
      <rect x="32" y="120" width="16" height="16" rx="1" />
      <rect x="56" y="120" width="16" height="16" rx="1" />
      <rect x="80" y="120" width="16" height="16" rx="1" />
      <rect x="104" y="120" width="16" height="16" rx="1" />
      <rect x="128" y="120" width="16" height="16" rx="1" />
      <rect x="152" y="120" width="16" height="16" rx="1" />
      <rect x="176" y="120" width="16" height="16" rx="1" />
      <rect x="200" y="120" width="16" height="16" rx="1" />

      {/* Diagonal TL → BR */}
      <rect x="72" y="72" width="16" height="16" rx="1" />
      <rect x="92" y="92" width="16" height="16" rx="1" />
      <rect x="148" y="148" width="16" height="16" rx="1" />
      <rect x="168" y="168" width="16" height="16" rx="1" />

      {/* Diagonal TR → BL */}
      <rect x="168" y="72" width="16" height="16" rx="1" />
      <rect x="148" y="92" width="16" height="16" rx="1" />
      <rect x="92" y="148" width="16" height="16" rx="1" />
      <rect x="72" y="168" width="16" height="16" rx="1" />
    </svg>
  );
}
