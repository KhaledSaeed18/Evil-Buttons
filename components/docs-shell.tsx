import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { DocsSidebar } from "@/components/docs-sidebar";
import { ThemeSync } from "@/components/theme-sync";

type DocsNavPage = {
  title: string;
  url: string;
};

type DocsShellProps = {
  children: ReactNode;
  componentPages: DocsNavPage[];
};

export function DocsShell({
  children,
  componentPages,
}: DocsShellProps) {
  return (
    <div className="flex h-dvh overflow-hidden bg-background text-foreground">
      <ThemeSync />
      <DocsSidebar
        componentPages={componentPages}
        brand={
          <Link
            href="/"
            className="group flex items-center gap-2 text-base font-semibold tracking-tight text-foreground transition-colors hover:text-muted-foreground"
          >
            <Image
              src="/logo.svg"
              alt="EvilButtons"
              width={22}
              height={22}
              className="dark:invert"
            />
            <span>EvilButtons</span>
          </Link>
        }
      />
      <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
