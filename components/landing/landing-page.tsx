import Image from "next/image";
import Link from "next/link";
import { ButtonShowcaseGrid } from "@/components/landing/button-showcase-grid";
import {
  PageFrame,
  PatternSeparator,
} from "@/components/landing/pattern-separator";
import { FluidGradientText } from "@/components/fluid-gradient-text";
import { ThemeSync } from "@/components/theme-sync";
import { siteConfig } from "@/lib/seo";

const navLinks = [
  { label: "Docs", href: "/docs" },
  { label: "GitHub", href: siteConfig.github, external: true },
];

const footerLinks = [
  { label: "Documentation", href: "/docs" },
  { label: "GitHub", href: siteConfig.github, external: true },
  { label: "Radium Coders", href: siteConfig.author.url, external: true },
];

export function LandingPage() {
  return (
    <div className="landing-page relative h-dvh overflow-y-auto bg-background text-foreground">
      <ThemeSync />

      <PatternSeparator />

      <PageFrame>
        <header>
          <div className="flex items-center justify-between gap-6 px-6 py-5 md:px-8">
            <Link
              href="/"
              className="group flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-muted-foreground"
            >
              <Image
                src="/logo.svg"
                alt="EvilButtons"
                width={22}
                height={22}
                className="dark:invert"
              />
              <span>{siteConfig.shortName}</span>
            </Link>

            <nav className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>

            <Link
              href="/docs"
              className="border border-foreground bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Get Started
            </Link>
          </div>
        </header>

        <PatternSeparator />

        <main>
          <section className="my-16 md:my-24">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-6 text-center md:px-8">
              <div className="inline-flex items-center border border-border px-3 py-1 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                shadcn/ui registry · Motion powered
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl lg:text-6xl">
                  Animated buttons with your taste
                </h1>
                <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                  {siteConfig.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/docs"
                  className="border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
                >
                  Browse docs
                </Link>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  View on GitHub
                </a>
              </div>
              
            </div>
          </section>

          <PatternSeparator />

          <ButtonShowcaseGrid />
        </main>
      </PageFrame>

      <footer className="w-full">
        <PatternSeparator />

        <div className="mt-20 flex flex-col items-center gap-8">
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {footerLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-sm text-muted-foreground">
              Built by{" "}
              <a
                href={siteConfig.author.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-muted-foreground"
              >
                {siteConfig.author.name}
              </a>
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              Press{" "}
              <kbd className="border border-border px-1.5 py-0.5 text-[10px] text-foreground">
                d
              </kbd>{" "}
              to toggle theme
            </p>
          </div>
        </div>
        <div className="w-full py-10 sm:py-0">
          <div className="mx-auto w-full text-foreground h-10 md:h-24 xl:h-48">
            <FluidGradientText text="EVIL BUTTONS" />
          </div>
        </div>
      </footer>
    </div>
  );
}
