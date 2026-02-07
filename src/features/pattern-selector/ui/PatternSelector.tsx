"use client";

import React from "react";
import Link from "next/link";
import type { PatternNavItem } from "@/shared/constants/patterns";

/**
 * PatternSelector 컴포넌트 Props
 */
interface PatternSelectorProps {
  /** 사용 가능한 패턴 목록 */
  patterns: PatternNavItem[];
  /** 현재 선택된 패턴 ID */
  selectedPatternId: string | null;
  className?: string;
}

/**
 * PatternSelector 컴포넌트
 *
 * [역할 - Features 레이어]
 * 사용자가 학습할 디자인 패턴을 선택하는 인터랙션 피처입니다.
 * 패턴 목록을 보여주고 선택 이벤트를 처리합니다.
 */
export function PatternSelector({
  patterns,
  selectedPatternId,
  className = "",
}: PatternSelectorProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 shadow-sm p-4 ${className}`}
    >
      <h3 className="text-sm font-semibold text-slate-700 mb-3">
        📚 디자인 패턴 선택
      </h3>

      {/* 패턴 버튼들 */}
      <div className="flex flex-wrap gap-2">
        {patterns.map((pattern) => {
          const isSelected = pattern.id === selectedPatternId;
          const baseClass = `
            flex items-center gap-2 px-3 py-2 rounded-lg
            text-sm font-medium transition-all duration-200 border
          `;

          if (!pattern.implemented) {
            return (
              <span
                key={pattern.id}
                className={`${baseClass} bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed`}
              >
                <span>{pattern.nameKo}</span>
                <span className="text-xs text-slate-400">준비 중</span>
              </span>
            );
          }

          return (
            <Link
              key={pattern.id}
              href={`/${pattern.category}/${pattern.id}`}
              className={`
                ${baseClass}
                ${
                  isSelected
                    ? "bg-blue-100 text-blue-700 border-blue-500"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                }
              `}
            >
              <span>{pattern.nameKo}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
