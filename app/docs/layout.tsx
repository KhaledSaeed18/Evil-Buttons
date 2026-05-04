import type { ReactNode } from "react";
import { DocsShell } from "@/components/docs-shell";
import { source } from "@/lib/source";

export default function DocsLayout({ children }: { children: ReactNode }) {
  const pages = source.getPages().map((page) => ({
    title: page.data.title ?? page.slugs.at(-1) ?? "Untitled",
    url: page.url,
  }));
  const logoPages = pages
    .filter((page) => page.url.startsWith("/docs/logos"))
    .sort((a, b) => a.title.localeCompare(b.title));
  const scrollBarsPages = pages
    .filter((page) => page.url.startsWith("/docs/scroll-bars"))
    .sort((a, b) => a.title.localeCompare(b.title));
  const componentPages = pages
    .filter(
      (page) =>
        !page.url.startsWith("/docs/logos") &&
        !page.url.startsWith("/docs/scroll-bars"),
    )
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <DocsShell
      componentPages={componentPages}
      logoPages={logoPages}
      scrollBarsPages={scrollBarsPages}
    >
      {children}
    </DocsShell>
  );
}
