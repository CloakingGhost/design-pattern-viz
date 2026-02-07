"use client";

import React from "react";
import { AdapterAnimation } from "./AdapterAnimation";
import { PatternVisualizerLayout } from "@/widgets/pattern-visualizer-layout";
import { usePatternVisualizer } from "@/shared/hooks";
import type { AdapterAnimationState, AdapterPatternData } from "@/shared/types";

/**
 * AdapterVisualizer 컴포넌트 Props
 */
interface AdapterVisualizerProps {
  /** Adapter 패턴 데이터 */
  patternData: AdapterPatternData;
  className?: string;
}

/**
 * AdapterVisualizer 위젯
 *
 * [역할 - Widgets 레이어]
 * Adapter 패턴의 시각화를 위한 모든 요소를 통합합니다:
 * - 코드 뷰어 (Entity)
 * - 패턴 설명 (Entity)
 * - 애니메이션 컨트롤 (Feature)
 * - 그래픽 애니메이션 (Widget 내부)
 */
export function AdapterVisualizer({
  patternData,
  className = "",
}: AdapterVisualizerProps) {
  const visualizer = usePatternVisualizer<AdapterAnimationState>();

  return (
    <PatternVisualizerLayout
      className={className}
      patternData={patternData}
      visualizer={visualizer}
      animation={<AdapterAnimation state={visualizer.animationState} />}
    />
  );
}
