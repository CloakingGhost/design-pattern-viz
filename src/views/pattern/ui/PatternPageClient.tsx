"use client";

import { useLayoutEffect } from "react";
import {
  SingletonVisualizer,
  StrategyVisualizer,
  AdapterVisualizer,
  BuilderVisualizer,
} from "@/widgets";
import { patternDataById } from "@/data";
import { useVisualizerStore } from "@/shared/store";

const getPatternData = (id: string) =>
  (
    patternDataById as Record<
      string,
      (typeof patternDataById)[keyof typeof patternDataById]
    >
  )[id];

interface PatternPageClientProps {
  patternId: string;
}

const visualizerMap = {
  singleton: SingletonVisualizer,
  strategy: StrategyVisualizer,
  adapter: AdapterVisualizer,
  builder: BuilderVisualizer,
};

export function PatternPageClient({ patternId }: PatternPageClientProps) {
  const { loadPattern } = useVisualizerStore();
  const selectedPatternId = useVisualizerStore(
    (state) => state.player.selectedPatternId,
  );

  // 패턴 변경 시 스토어 상태를 먼저 업데이트
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

  const Visualizer = visualizerMap[patternId as keyof typeof visualizerMap];

  if (!Visualizer) {
    return null;
  }

  return <Visualizer patternData={patternData} />;
}
