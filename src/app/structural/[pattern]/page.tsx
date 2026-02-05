import { redirect } from "next/navigation";
import { PatternPage } from "@/views";
import { DEFAULT_PATTERN_BY_CATEGORY, PATTERN_CATALOG } from "@/shared/constants";

interface PageProps {
  params: { pattern: string };
}

export default async function Page({ params }: PageProps) {
  const { pattern } = await params;
  const patterns = PATTERN_CATALOG.structural;
  const exists = patterns.some((item) => item.id === pattern);

  if (!exists) {
    redirect(`/structural/${DEFAULT_PATTERN_BY_CATEGORY.structural}`);
  }

  return <PatternPage category="structural" patternId={pattern} />;
}
