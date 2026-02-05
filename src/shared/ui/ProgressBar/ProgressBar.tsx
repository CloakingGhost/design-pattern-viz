'use client';

import React from 'react';
import { cn } from '@/shared/lib';

/**
 * ProgressBar 컴포넌트 Props
 */
interface ProgressBarProps {
  /** 현재 진행률 (0-100) */
  value: number;
  /** 진행 바 높이 */
  height?: 'sm' | 'md' | 'lg';
  /** 표시할 라벨 */
  label?: string;
  /** 현재 스텝 / 총 스텝 표시 */
  showSteps?: boolean;
  currentStep?: number;
  totalSteps?: number;
  className?: string;
}

/**
 * 진행률 표시 바 컴포넌트
 */
export function ProgressBar({
  value,
  height = 'md',
  label,
  showSteps = false,
  currentStep = 0,
  totalSteps = 0,
  className,
}: ProgressBarProps) {
  // 높이별 스타일
  const heightStyles = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  // 0-100 범위로 제한
  const normalizedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn('w-full', className)}>
      {/* 라벨 및 스텝 표시 */}
      {(label || showSteps) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-slate-600">{label}</span>
          )}
          {showSteps && (
            <span className="text-sm text-slate-500">
              {currentStep + 1} / {totalSteps}
            </span>
          )}
        </div>
      )}

      {/* 진행 바 */}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${heightStyles[height]}`}>
        <div
          className="h-full bg-linear-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${normalizedValue}%` }}
        />
      </div>
    </div>
  );
}
