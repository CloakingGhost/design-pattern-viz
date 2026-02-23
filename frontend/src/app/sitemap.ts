import type { MetadataRoute } from "next";
import { PATTERN_CATALOG } from "@/shared/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN ?? "http://localhost:3000";
  const base = new URL(baseUrl);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base.origin}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base.origin}/creational`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${base.origin}/structural`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${base.origin}/behavioral`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const patternRoutes: MetadataRoute.Sitemap = Object.values(PATTERN_CATALOG)
    .flatMap((patterns) => patterns)
    .map((pattern) => ({
      url: `${base.origin}/${pattern.category}/${pattern.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: pattern.implemented ? 0.8 : 0.4,
    }));

  return [...staticRoutes, ...patternRoutes];
}