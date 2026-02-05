import type { MetadataRoute } from "next";
import { PATTERN_CATALOG } from "@/shared/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const patternRoutes: MetadataRoute.Sitemap = Object.values(PATTERN_CATALOG)
    .flatMap((patterns) => patterns)
    .map((pattern) => ({
      url: `${baseUrl}/${pattern.category}/${pattern.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: pattern.implemented ? 0.8 : 0.4,
    }));

  return [...staticRoutes, ...patternRoutes];
}
