"use client";

import React from "react";
import { StrategyAnimation } from "./StrategyAnimation";
import { PatternVisualizerLayout } from "@/widgets/pattern-visualizer-layout";
import { usePatternVisualizer } from "@/shared/hooks";
import type { StrategyAnimationState, StrategyPatternData } from "@/shared/types";

/**
 * StrategyVisualizer 컴포넌트 Props
 */
interface StrategyVisualizerProps {
  /** Strategy 패턴 데이터 */
  patternData: StrategyPatternData;
  className?: string;
}

/**
 * StrategyVisualizer 위젯
 *
 * [역할 - Widgets 레이어]
 * Strategy 패턴의 시각화를 위한 모든 요소를 통합합니다:
 * - 코드 뷰어 (Entity)
 * - 패턴 설명 (Entity)
 * - 애니메이션 컨트롤 (Feature)
 * - 그래픽 애니메이션 (Widget 내부)
 */
export function StrategyVisualizer({
  patternData,
  className = "",
}: StrategyVisualizerProps) {
  const visualizer = usePatternVisualizer<StrategyAnimationState>();

  return (
    <PatternVisualizerLayout
      className={className}
      patternData={patternData}
      visualizer={visualizer}
      animation={<StrategyAnimation state={visualizer.animationState} />}
    />
  );
}
