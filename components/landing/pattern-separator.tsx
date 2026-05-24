import { cn } from "@/lib/utils";

type PatternSeparatorProps = {
  className?: string;
};

export function PatternSeparator({ className }: PatternSeparatorProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "h-5 w-full border-y border-border [--pattern:var(--color-border)] bg-[repeating-linear-gradient(315deg,var(--pattern)_0,var(--pattern)_1px,transparent_0,transparent_50%)] bg-[size:10px_10px]",
        className,
      )}
    />
  );
}

export function PageFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-6xl border-x border-border",
        className,
      )}
    >
      {children}
    </div>
  );
}
