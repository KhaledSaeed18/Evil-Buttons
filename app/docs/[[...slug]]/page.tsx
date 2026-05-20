import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/components/mdx";
import { PageToc } from "@/components/page-toc";
import { JsonLd } from "@/components/seo/json-ld";
import { source } from "@/lib/source";
import {
  createBreadcrumbJsonLd,
  createDocsPageMetadata,
  createTechArticleJsonLd,
  getDocsBreadcrumbs,
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

  return (
    <div className="relative mx-auto w-full max-w-6xl px-6 pt-16 pb-8 md:py-8 xl:pr-64">
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
      <article className="docs-content mx-auto min-w-0 max-w-3xl">
        <MDX components={getMDXComponents()} />
      </article>
      <aside className="fixed top-10 right-8 hidden w-48 xl:block">
        <div className="flex max-h-[calc(100dvh-5rem)] flex-col gap-3 overflow-y-auto border-l border-border pl-5">
          <p className="text-xs font-semibold text-muted-foreground">On This Page</p>
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
