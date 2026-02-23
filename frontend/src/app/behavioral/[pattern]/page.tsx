import type { Metadata } from "next";
import Script from "next/script";
import { redirect } from "next/navigation";
import { PatternPage } from "@/views";
import {
  buildPatternJsonLd,
  buildPatternMetadata,
  getCanonicalPatternId,
  patternExists,
} from "@/shared/seo/patternSeo";

interface PageProps {
  params: Promise<{ pattern: string }>;
}

const baseUrl = process.env.NEXT_PUBLIC_DOMAIN ?? "http://localhost:3000";
const base = new URL(baseUrl);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { pattern } = await params;
  const canonicalPatternId = await getCanonicalPatternId(
    "behavioral",
    pattern,
  );

  return buildPatternMetadata({
    category: "behavioral",
    patternId: canonicalPatternId,
    baseOrigin: base.origin,
    ogImageUrl: process.env.NEXT_PUBLIC_OG_IMAGE_URL,
  });
}

export default async function Page({ params }: PageProps) {
  const { pattern } = await params;
  if (!patternExists("behavioral", pattern)) {
    redirect(`/behavioral/${getCanonicalPatternId("behavioral", pattern)}`);
  }

  const jsonLd = buildPatternJsonLd({
    category: "behavioral",
    patternId: pattern,
    baseOrigin: base.origin,
  });

  return (
    <>
      <PatternPage category="behavioral" patternId={pattern} />
      <Script id={`jsonld-${pattern}`} type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
    </>
  );
}
