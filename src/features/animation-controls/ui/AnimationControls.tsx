'use client';

import React from 'react';
import { Button } from '@/shared/ui';
import { PLAY_SPEED_OPTIONS } from '@/shared/constants';
import type { UsePatternVisualizerReturn } from '@/shared/hooks';
import { cn } from '@/shared/lib';
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw
} from 'lucide-react';

/**
 * AnimationControls 컴포넌트 Props
 */
interface AnimationControlsProps {
  /** usePatternVisualizer 훅의 반환값 */
  visualizer: UsePatternVisualizerReturn;
  className?: string;
}

/**
 * AnimationControls 컴포넌트
 * 
 * [역할 - Features 레이어]
 * 사용자 인터랙션을 담당하는 피처입니다.
 * 재생/정지, 스텝 이동, 속도 조절 등의 컨트롤을 제공합니다.
 */
export function AnimationControls({
  visualizer,
  className,
}: AnimationControlsProps) {
  const {
    isPlaying,
    playSpeed,
    canGoPrev,
    canGoNext,
    nextStep,
    prevStep,
    togglePlay,
    setPlaySpeed,
    reset,
  } = visualizer;

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {/* 컨트롤 버튼 그룹 */}
      <div className="flex items-center gap-1">
        {/* 리셋 버튼 */}
        <Button
          variant="ghost"
          size="sm"
          onClick={reset}
          title="처음으로"
        >
          <RotateCcw className="w-6 h-6" />
        </Button>

        {/* 이전 스텝 */}
        <Button
          variant="ghost"
          size="sm"
          onClick={prevStep}
          disabled={!canGoPrev}
          title="이전 단계"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        {/* 재생/정지 버튼 */}
        <Button
          variant="ghost"
          size="sm"
          onClick={togglePlay}
          title={isPlaying ? '정지' : '재생'}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </Button>

        {/* 다음 스텝 */}
        <Button
          variant="ghost"
          size="sm"
          onClick={nextStep}
          disabled={!canGoNext}
          title="다음 단계"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* 속도 조절 */}
      <div className="flex items-center gap-1 ml-2 pl-2 border-l border-slate-200">
        {PLAY_SPEED_OPTIONS.map((option) => (
          <Button
            key={option.value}
            variant="ghost"
            size="sm"
            onClick={() => setPlaySpeed(option.value)}
            title={`재생 속도: ${option.label}`}
            className={cn(
              playSpeed === option.value && 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            )}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
