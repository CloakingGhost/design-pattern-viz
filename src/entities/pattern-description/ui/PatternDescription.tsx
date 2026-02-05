"use client";

import React from "react";
import { Card } from "@/shared/ui";
import type { PatternMetadata } from "@/shared/types";
import { PATTERN_CATEGORY_LABELS } from "@/shared/constants";
import { ThumbsUp, ThumbsDown, Lightbulb } from "lucide-react";

/**
 * PatternDescription 컴포넌트 Props
 */
interface PatternDescriptionProps {
  /** 패턴 메타데이터 */
  metadata: PatternMetadata;
  className?: string;
}

/**
 * PatternDescription 컴포넌트
 *
 * [역할 - Entities 레이어]
 * 패턴에 대한 설명을 표시하는 비즈니스 엔티티입니다.
 * 패턴 정보, 장단점, 현재 실행 중인 스텝의 설명을 보여줍니다.
 */
export function PatternDescription({
  metadata,
  className = "",
}: PatternDescriptionProps) {
  const categoryLabel = PATTERN_CATEGORY_LABELS[metadata.category];

  return (
    <Card className={className}>
      {/* 패턴 헤더 */}
      <div className="flex items-start gap-4 mb-4">
        {/* 아이콘 */}
        <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-2xl">
          {metadata.icon}
        </div>

        {/* 패턴 이름 및 카테고리 */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-slate-800">
              {metadata.nameKo}
            </h2>
            <span className="text-sm text-slate-500">({metadata.name})</span>
          </div>
          <span className="inline-block px-2 py-0.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
            {categoryLabel}
          </span>
        </div>
      </div>

      {/* 패턴 설명 */}
      <p className="text-slate-600 leading-relaxed mb-4">
        {metadata.description}
      </p>

      {/* 상세 정보 */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        {/* 언제 사용하나요? */}
        {metadata.whenToUse && (
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-500" /> 언제 사용하나요?
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {metadata.whenToUse}
            </p>
          </div>
        )}

        {/* 사용 사례 */}
        <div>
          <h4 className="text-sm font-semibold text-slate-700 mb-2">
            💡 실제 사용 사례
          </h4>
          <ul className="space-y-1">
            {metadata.useCases.map((useCase, index) => (
              <li
                key={index}
                className="text-sm text-slate-600 flex items-start gap-2"
              >
                <span className="text-blue-500 mt-1">•</span>
                {useCase}
              </li>
            ))}
          </ul>
        </div>

        {/* 장단점 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 장점 */}
          {metadata.pros && metadata.pros.length > 0 && (
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <h4 className="text-sm font-semibold text-green-700 mb-2 flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" /> 장점
              </h4>
              <ul className="space-y-1">
                {metadata.pros.map((pro, index) => (
                  <li key={index} className="flex text-sm items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 단점 */}
          {metadata.cons && metadata.cons.length > 0 && (
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <h4 className="text-sm font-semibold text-red-700 mb-2 flex items-center gap-2">
                <ThumbsDown className="w-4 h-4" /> 단점
              </h4>
              <ul className="space-y-1">
                {metadata.cons.map((con, index) => (
                  <li key={index} className="flex text-sm items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
