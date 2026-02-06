"use client";

import React from "react";
import { CodeViewer } from "@/entities/code-viewer";
import { PatternDescription } from "@/entities/pattern-description";
import { AnimationControls } from "@/features/animation-controls";
import { ProgressBar } from "@/shared/ui";
import type { AnimationState, PatternData } from "@/shared/types";
import type { UsePatternVisualizerReturn } from "@/shared/hooks";

/**
 * PatternVisualizerLayout 컴포넌트 Props
 */
export interface PatternVisualizerLayoutProps<
  T extends AnimationState = AnimationState,
> {
  /** 패턴 데이터 */
  patternData: PatternData<T>;
  /** visualizer 훅 반환값 */
  visualizer: UsePatternVisualizerReturn<T>;
  /** 좌측 애니메이션 영역 */
  animation: React.ReactNode;
  className?: string;
}

/**
 * PatternVisualizerLayout
 *
 * [역할]
 * 시각화 + 코드 + 설명 레이아웃을 공통화하여 재사용합니다.
 */
export function PatternVisualizerLayout<
  T extends AnimationState = AnimationState,
>({
  patternData,
  visualizer,
  animation,
  className = "",
}: PatternVisualizerLayoutProps<T>) {
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
            {animation}
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
