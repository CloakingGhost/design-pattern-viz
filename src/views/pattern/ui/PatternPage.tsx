import {
  SingletonVisualizer,
  StrategyVisualizer,
  PatternSidebar,
} from "@/widgets";
import { patternDataById } from "@/data";
import { PATTERN_CATALOG, PATTERN_CATEGORY_LABELS } from "@/shared/constants";
import type { PatternCategory } from "@/shared/types";
import { BookOpen } from "lucide-react";
import Link from "next/link";

interface PatternPageProps {
  category: PatternCategory;
  patternId: string;
}

const visualizerMap = {
  singleton: (data: (typeof patternDataById)["singleton"]) => (
    <SingletonVisualizer patternData={data} />
  ),
  strategy: (data: (typeof patternDataById)["strategy"]) => (
    <StrategyVisualizer patternData={data} />
  ),
};

export function PatternPage({ category, patternId }: PatternPageProps) {
  const patterns = PATTERN_CATALOG[category];
  const selectedPattern =
    patterns.find((pattern) => pattern.id === patternId) ?? patterns[0];

  const patternData = (
    patternDataById as Record<
      string,
      (typeof patternDataById)[keyof typeof patternDataById]
    >
  )[selectedPattern.id];

  const isImplemented = Boolean(patternData);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 헤더 */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center gap-3 w-fit">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">
                Design Pattern Visualizer
              </h1>
              <p className="text-xs text-slate-500">
                디자인 패턴을 시각적으로 이해하세요
              </p>
            </div>
          </Link>
        </div>
      </header>

      {/* 메인 레이아웃: 사이드바 + 콘텐츠 */}
      <div className="flex flex-1">
        {/* 사이드바 */}
        <PatternSidebar
          currentCategory={category}
          currentPatternId={patternId}
        />

        {/* 메인 콘텐츠 */}
        <main className="flex-1 overflow-y-auto bg-linear-to-br from-slate-50 via-white to-blue-50">
          <div className="w-full mx-auto">
            {/* 선택된 패턴 */}
            {isImplemented &&
              selectedPattern.id in visualizerMap &&
              visualizerMap[selectedPattern.id as keyof typeof visualizerMap](
                patternData as never,
              )}

            {!isImplemented && (
              <div className="bg-white border border-slate-200 shadow-sm p-10 text-center">
                <div className="text-4xl mb-4">🚧</div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">
                  {selectedPattern.nameKo} 패턴은 준비 중입니다
                </h2>
                <p className="text-slate-500">다른 패턴을 선택해 주세요.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* 푸터 */}
      {/* <footer className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-sm text-slate-500">
            <p>
              디자인 패턴 시각화 학습 서비스
            </p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
