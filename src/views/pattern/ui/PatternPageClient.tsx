"use client";

import type { AnimationState, PatternData } from "@/shared/types";
import {
  SingletonAnimation,
  StrategyAnimation,
  AdapterAnimation,
  BuilderAnimation,
} from "@/widgets";
import { usePatternVisualizer } from "@/shared/hooks";
import { PatternVisualizerLayout } from "@/widgets/pattern-visualizer-layout";

interface PatternPageClientProps {
  patternData: PatternData<AnimationState>;
  className?: string;
}

type AnimationComponent = React.ComponentType<{ state: AnimationState | null }>;

const animationMap = {
  singleton: SingletonAnimation,
  strategy: StrategyAnimation,
  adapter: AdapterAnimation,
  builder: BuilderAnimation,
} as const;

export function PatternPageClient({
  patternData,
  className,
}: PatternPageClientProps) {
  const visualizer = usePatternVisualizer(patternData);

  if (visualizer.selectedPatternId !== patternData.metadata.id) {
    return (
      <div className="w-full px-10 py-16 text-center text-slate-500">
        로딩 중...
      </div>
    );
  }

  const Animation = animationMap[
    patternData.metadata.id as keyof typeof animationMap
  ] as AnimationComponent | undefined;

  if (!Animation) {
    return null;
  }

  return (
    <PatternVisualizerLayout
      className={className}
      patternData={patternData}
      visualizer={visualizer}
      animation={<Animation state={visualizer.animationState} />}
    />
  );
}
