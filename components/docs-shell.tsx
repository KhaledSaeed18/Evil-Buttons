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
    <div className="flex h-dvh overflow-hidden dark:bg-[#090b0c] bg-background text-foreground">
      <ThemeSync />
      <DocsSidebar
        componentPages={componentPages}
        brand={
          <Link
            href="/"
            className="group flex items-center gap-2 text-lg font-bold tracking-tight text-foreground transition-colors hover:text-muted-foreground"
          >
            <Image
              src="/logo.svg"
              alt="EvilButtons"
              width={24}
              height={24}
              className="dark:invert"
            />
            <span>EvilButtons</span>
          </Link>
        }
      />
      <div className="min-w-0 flex-1 overflow-hidden dark:bg-#161b1d bg-background m-2 rounded border-border md:border">
        <div className="h-full min-w-0 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
