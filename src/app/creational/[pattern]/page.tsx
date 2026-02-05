import { redirect } from "next/navigation";
import { PatternPage } from "@/views";
import { DEFAULT_PATTERN_BY_CATEGORY, PATTERN_CATALOG } from "@/shared/constants";

interface PageProps {
  params: { pattern: string };
}

export default async function Page({ params }: PageProps) {
  const { pattern } = await params;
  const patterns = PATTERN_CATALOG.creational;
  const exists = patterns.some((item) => item.id === pattern);

  if (!exists) {
    redirect(`/creational/${DEFAULT_PATTERN_BY_CATEGORY.creational}`);
  }

  return <PatternPage category="creational" patternId={pattern} />;
}
