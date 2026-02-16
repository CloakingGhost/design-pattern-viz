import type { Metadata } from "next";
import { patternDataById } from "@/data";
import {
  DEFAULT_PATTERN_BY_CATEGORY,
  PATTERN_CATALOG,
} from "@/shared/constants";

export type PatternCategory = keyof typeof PATTERN_CATALOG;

const CATEGORY_LABELS: Record<PatternCategory, { en: string; ko: string }> = {
  creational: { en: "Creational Patterns", ko: "생성 패턴" },
  structural: { en: "Structural Patterns", ko: "구조 패턴" },
  behavioral: { en: "Behavioral Patterns", ko: "행위 패턴" },
};

export function patternExists(category: PatternCategory, patternId: string) {
  return PATTERN_CATALOG[category].some((item) => item.id === patternId);
}

export async function getCanonicalPatternId(
  category: PatternCategory,
  patternId: string,
) {
  return patternExists(category, patternId)
    ? patternId
    : DEFAULT_PATTERN_BY_CATEGORY[category];
}

export function resolvePatternMetadata(
  category: PatternCategory,
  patternId: string,
) {
  const patterns = PATTERN_CATALOG[category];
  const catalogItem = patterns.find((item) => item.id === patternId);
  const data = (
    patternDataById as Record<
      string,
      typeof patternDataById[keyof typeof patternDataById]
    >
  )[patternId];

  const nameKo = data?.metadata?.nameKo ?? catalogItem?.nameKo ?? "패턴";
  const name = data?.metadata?.name ?? catalogItem?.name ?? "Pattern";
  const description =
    data?.metadata?.description ?? `${nameKo} 패턴을 학습합니다.`;

  return { nameKo, name, description };
}

export function buildPatternMetadata({
  category,
  patternId,
  baseOrigin,
  ogImageUrl,
}: {
  category: PatternCategory;
  patternId: string;
  baseOrigin: string;
  ogImageUrl?: string;
}): Metadata {
  const { nameKo, name, description } = resolvePatternMetadata(
    category,
    patternId,
  );
  const canonicalUrl = `${baseOrigin}/${category}/${patternId}`;

  return {
    title: `${name} | ${nameKo} - Design Pattern Visualizer`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${name} | ${nameKo} - Design Pattern Visualizer`,
      description,
      url: canonicalUrl,
      type: "article",
      ...(ogImageUrl
        ? {
          images: [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: `${nameKo} (${name}) - Design Pattern Visualizer`,
            },
          ],
        }
        : {}),
    },
  };
}

export function buildPatternJsonLd({
  category,
  patternId,
  baseOrigin,
}: {
  category: PatternCategory;
  patternId: string;
  baseOrigin: string;
}) {
  const { nameKo, name, description } = resolvePatternMetadata(
    category,
    patternId,
  );
  const canonicalUrl = `${baseOrigin}/${category}/${patternId}`;
  const categoryLabel = CATEGORY_LABELS[category];

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Design Pattern Visualizer",
      url: baseOrigin,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${baseOrigin}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: categoryLabel.en,
          item: `${baseOrigin}/${category}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: `${nameKo} (${name})`,
          item: canonicalUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${nameKo} (${name})`,
      description,
      inLanguage: "ko-KR",
      url: canonicalUrl,
      author: {
        "@type": "Organization",
        name: "Design Pattern Visualizer",
      },
      publisher: {
        "@type": "Organization",
        name: "Design Pattern Visualizer",
      },
    },
  ];
}
