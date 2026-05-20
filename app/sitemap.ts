import type { MetadataRoute } from "next";
import { source } from "@/lib/source";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = source.getPages();
  const now = new Date();

  const docEntries: MetadataRoute.Sitemap = pages.map((page) => ({
    url: absoluteUrl(page.url),
    lastModified: now,
    changeFrequency: "weekly",
    priority: page.url === "/docs" ? 1 : 0.8,
  }));

  const seen = new Set(docEntries.map((entry) => entry.url));

  if (!seen.has(absoluteUrl("/docs"))) {
    docEntries.unshift({
      url: absoluteUrl("/docs"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    });
  }

  return docEntries;
}

export const dynamic = "force-static";
