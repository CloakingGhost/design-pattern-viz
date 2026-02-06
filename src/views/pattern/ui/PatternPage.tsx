import {
  SingletonVisualizer,
  StrategyVisualizer,
  AdapterVisualizer,
  PatternSidebar,
} from "@/widgets";
import { patternDataById } from "@/data";
import { PATTERN_CATALOG } from "@/shared/constants";
import type { PatternCategory } from "@/shared/types";

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
  adapter: (data: (typeof patternDataById)["adapter"]) => (
    <AdapterVisualizer patternData={data} />
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
    </div>
  );
}
