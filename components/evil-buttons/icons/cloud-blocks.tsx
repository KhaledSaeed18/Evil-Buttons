import { cn } from "@/lib/utils";

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
}
