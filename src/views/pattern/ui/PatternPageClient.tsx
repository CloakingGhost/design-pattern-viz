"use client";

import { useLayoutEffect } from "react";
import type { AnimationState, PatternData } from "@/shared/types";
import {
  SingletonVisualizer,
  StrategyVisualizer,
  AdapterVisualizer,
  BuilderVisualizer,
} from "@/widgets";
import { patternDataById } from "@/data";
import { useVisualizerStore } from "@/shared/store";

interface PatternPageClientProps {
  patternId: string;
}

type AnyPatternData = PatternData<AnimationState>;
type VisualizerComponent = React.ComponentType<{
  patternData: AnyPatternData;
  className?: string;
}>;

const visualizerMap = {
  singleton: SingletonVisualizer,
  strategy: StrategyVisualizer,
  adapter: AdapterVisualizer,
  builder: BuilderVisualizer,
} as const;

const getPatternData = (id: string) =>
  (patternDataById as Record<string, AnyPatternData>)[id];

export function PatternPageClient({ patternId }: PatternPageClientProps) {
  const { loadPattern } = useVisualizerStore();
  const selectedPatternId = useVisualizerStore(
    (state) => state.player.selectedPatternId,
  );

  useLayoutEffect(() => {
    const patternData = getPatternData(patternId);

    if (patternData) {
      loadPattern(patternData);
    }
  }, [patternId, loadPattern]);

  // useLayoutEffect를 위한 부분
  if (selectedPatternId !== patternId) {
    return null;
  }

  const patternData = getPatternData(patternId);

  if (!patternData) {
    return null;
  }

  const Visualizer = visualizerMap[
    patternId as keyof typeof visualizerMap
  ] as VisualizerComponent;

  if (!Visualizer) {
    return null;
  }

  return <Visualizer patternData={patternData} />;
}
