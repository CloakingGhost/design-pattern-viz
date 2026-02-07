"use client";

import React from "react";
import { SingletonAnimation } from "./SingletonAnimation";
import { PatternVisualizerLayout } from "@/widgets/pattern-visualizer-layout";
import { usePatternVisualizer } from "@/shared/hooks";
import type { SingletonAnimationState, SingletonPatternData } from "@/shared/types";

/**
 * SingletonVisualizer 컴포넌트 Props
 */
interface SingletonVisualizerProps {
  /** Singleton 패턴 데이터 */
  patternData: SingletonPatternData;
  className?: string;
}

/**
 * SingletonVisualizer 위젯
 *
 * [역할 - Widgets 레이어]
 * Widgets는 Entities와 Features를 조합하여 완전한 UI 블록을 구성합니다.
 * 이 컴포넌트는 Singleton 패턴의 시각화를 위한 모든 요소를 통합합니다:
 * - 코드 뷰어 (Entity)
 * - 패턴 설명 (Entity)
 * - 애니메이션 컨트롤 (Feature)
 * - 그래픽 애니메이션 (Widget 내부)
 */
export function SingletonVisualizer({
  patternData,
  className = "",
}: SingletonVisualizerProps) {
  const visualizer = usePatternVisualizer<SingletonAnimationState>();

  return (
    <PatternVisualizerLayout
      className={className}
      patternData={patternData}
      visualizer={visualizer}
      animation={<SingletonAnimation state={visualizer.animationState} />}
    />
  );
}
