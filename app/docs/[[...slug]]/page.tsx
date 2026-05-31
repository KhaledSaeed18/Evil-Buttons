import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsPageActions } from "@/components/docs-page-actions";
import { getMDXComponents } from "@/components/mdx";
import { PageToc } from "@/components/page-toc";
import { JsonLd } from "@/components/seo/json-ld";
import { getPageMarkdown } from "@/lib/markdown";
import { source } from "@/lib/source";
import {
  absoluteUrl,
  createBreadcrumbJsonLd,
  createDocsPageMetadata,
  createTechArticleJsonLd,
  getDocsBreadcrumbs,
  siteConfig,
} from "@/lib/seo";

type DocsPageProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

export default async function DocsPage({ params }: DocsPageProps) {
  const resolved = await params;
  const page = getDocsPage(resolved.slug);

  if (!page) notFound();

  const MDX = page.data.body;
  const breadcrumbs = getDocsBreadcrumbs(page.url, page.data.title);

  const markdown = (await getPageMarkdown(page.slugs)) ?? "";
  const rawPath = `/raw/${page.slugs.join("/")}`;

  return (
    <div className="relative mx-auto w-full max-w-3xl px-6 pb-10 pt-14 md:px-8 md:pt-10 xl:max-w-6xl xl:pr-56">
      <JsonLd
        data={[
          createTechArticleJsonLd({
            title: page.data.title,
            description: page.data.description,
            path: page.url,
          }),
          createBreadcrumbJsonLd(breadcrumbs),
        ]}
      />
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          {page.data.title}
        </h1>
        <DocsPageActions
          markdown={markdown}
          githubUrl={`${siteConfig.github}/blob/main/content/docs/${page.path}`}
          markdownUrl={rawPath}
          markdownAbsoluteUrl={absoluteUrl(rawPath)}
        />
      </div>
      <article className="docs-content min-w-0">
        <MDX components={getMDXComponents()} />
      </article>
      <aside className="fixed top-8 right-6 hidden w-44 xl:block">
        <div className="flex max-h-[calc(100dvh-4rem)] flex-col gap-2 overflow-y-auto pl-4">
          <p className="text-xs text-muted-foreground">On this page</p>
          <PageToc />
        </div>
      </aside>
    </div>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({
  params,
}: DocsPageProps): Promise<Metadata> {
  const resolved = await params;
  const page = getDocsPage(resolved.slug);

  if (!page) {
    return {};
  }

  return createDocsPageMetadata({
    title: page.data.title,
    description: page.data.description,
    path: page.url,
  });
}

function getDocsPage(slug?: string[]) {
  if (slug && slug.length > 0) {
    return source.getPage(slug);
  }

  const defaultPage = source
    .getPages()
    .filter(
      (page) =>
        !page.url.startsWith("/docs/icons") &&
        !page.url.startsWith("/docs/logos") &&
        !page.url.startsWith("/docs/scroll-bars"),
    )
    .sort((a, b) => a.url.localeCompare(b.url))[0];

  return defaultPage ?? source.getPages().sort((a, b) => a.url.localeCompare(b.url))[0] ?? null;
}
