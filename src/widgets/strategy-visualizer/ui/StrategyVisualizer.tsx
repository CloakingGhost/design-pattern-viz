"use client";

import React from "react";
import { StrategyAnimation } from "./StrategyAnimation";
import { CodeViewer } from "@/entities/code-viewer";
import { PatternDescription } from "@/entities/pattern-description";
import { AnimationControls } from "@/features/animation-controls";
import { ProgressBar } from "@/shared/ui";
import { usePatternVisualizer } from "@/shared/hooks";
import type {
  StrategyPatternData,
  StrategyAnimationState,
} from "@/shared/types";

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
  const visualizer = usePatternVisualizer(patternData);

  // 현재 애니메이션 상태를 StrategyAnimationState로 캐스팅
  const animationState =
    visualizer.animationState as StrategyAnimationState | null;
  return (
    <div className={className}>
      {/* 시각화 + 코드 통합 박스 */}
      <div className="bg-white">
        {/* ProgressBar */}
        <ProgressBar
          value={visualizer.progress}
          height="md"
          showSteps={false}
          currentStep={visualizer.currentStep}
          totalSteps={visualizer.totalSteps}
        />

        {/* 컨텐츠 영역 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-x divide-slate-200">
          {/* 왼쪽: 애니메이션 뷰 */}
          <div className="flex flex-col gap-4 p-4">
            {/* 컨트롤 */}
              <AnimationControls visualizer={visualizer} />
              <StrategyAnimation state={animationState} />
          </div>

          {/* 오른쪽: 코드 뷰 */}
          <div className="p-4">
            <div className="mb-2 flex items-center justify-between py-2">
              <h3 className="text-xl font-semibold text-slate-900">
                Java 코드
              </h3>
              <p className="text-slate-500">
                하이라이트된 라인이 현재 실행 중인 코드입니다
              </p>
            </div>
            <CodeViewer
              code={patternData.javaCode}
              highlightLines={visualizer.highlightLines}
              language="java"
              maxHeight="400px"
            />
          </div>
        </div>
      </div>

      {/* 하단: 패턴 설명 */}
      <PatternDescription metadata={patternData.metadata} />
    </div>
  );
}
