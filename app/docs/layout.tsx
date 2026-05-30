import type { ReactNode } from "react";
import { DocsShell } from "@/components/docs-shell";
import { source } from "@/lib/source";

export default function DocsLayout({ children }: { children: ReactNode }) {
  const pages = source.getPages().map((page) => ({
    title: page.data.title ?? page.slugs.at(-1) ?? "Untitled",
    url: page.url,
    badge: page.data.badge,
  }));
  const componentPages = pages.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <DocsShell componentPages={componentPages}>
      {children}
    </DocsShell>
  );
}
