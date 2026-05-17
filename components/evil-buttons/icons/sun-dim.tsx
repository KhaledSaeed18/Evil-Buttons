import { cn } from "@/lib/utils";

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
}
