"use client";

import React from "react";
import { BuilderAnimation } from "./BuilderAnimation";
import { PatternVisualizerLayout } from "@/widgets/pattern-visualizer-layout";
import { usePatternVisualizer } from "@/shared/hooks";
import type { BuilderAnimationState, BuilderPatternData } from "@/shared/types";

/**
 * BuilderVisualizer 컴포넌트 Props
 */
interface BuilderVisualizerProps {
  /** Builder 패턴 데이터 */
  patternData: BuilderPatternData;
  className?: string;
}

/**
 * BuilderVisualizer 위젯
 *
 * [역할 - Widgets 레이어]
 * Builder 패턴의 시각화를 위한 모든 요소를 통합합니다:
 * - 코드 뷰어 (Entity)
 * - 패턴 설명 (Entity)
 * - 애니메이션 컨트롤 (Feature)
 * - 그래픽 애니메이션 (Widget 내부)
 */
export function BuilderVisualizer({
  patternData,
  className = "",
}: BuilderVisualizerProps) {
  const visualizer = usePatternVisualizer<BuilderAnimationState>();

  return (
    <PatternVisualizerLayout
      className={className}
      patternData={patternData}
      visualizer={visualizer}
      animation={<BuilderAnimation state={visualizer.animationState} />}
    />
  );
}
