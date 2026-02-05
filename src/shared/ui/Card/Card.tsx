"use client";

import React from "react";
import { cn } from "@/shared/lib";

/**
 * Card 컴포넌트 Props
 */
interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  noPadding?: boolean;
}

/**
 * 공통 카드 컴포넌트
 * 라이트 모드 테마에 맞춘 깔끔한 카드 디자인
 */
export function Card({
  children,
  className,
  title,
  subtitle,
  noPadding = false,
}: CardProps) {
  return (
    <div className={cn("bg-white pb-15", className)}>
      {/* 카드 헤더 */}
      {(title || subtitle) && (
        <div className="px-5 py-4 border-b border-slate-100">
          {title && (
            <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          )}
        </div>
      )}

      {/* 카드 콘텐츠 */}
      <div className={noPadding ? "" : "p-5"}>{children}</div>
    </div>
  );
}
