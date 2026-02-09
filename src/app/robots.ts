import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN ?? "http://localhost:3000";
  const base = new URL(baseUrl);

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [`${base.origin}/sitemap.xml`],
    host: base.host,
  };
}
