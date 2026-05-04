import type { ReactNode } from "react";

type PreviewCardProps = {
  title?: string;
  note?: string;
  children: ReactNode;
};

export function PreviewCard({
  title = "Preview",
  note = "Preview",
  children,
}: PreviewCardProps) {
  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <p className="font-mono text-xs font-medium capitalize text-muted-foreground">
          {title}
        </p>
        <p className="font-mono text-xs text-muted-foreground">{note}</p>
      </div>
      <div className="mx-2 mb-2 flex min-h-112 items-center justify-center rounded-md bg-background p-8">
        {children}
      </div>
    </div>
  );
}
