"use client";

import React from "react";
import Link from "next/link";
import { DEFAULT_PATTERN_BY_CATEGORY } from "@/shared/constants";
import type { PatternCategory } from "@/shared/types";
import { cn } from "@/shared/lib";

/**
 * 네비게이션 탭 정의
 */
const navTabs: Array<{
  id: PatternCategory;
  label: string;
  description: string;
}> = [
  {
    id: "creational",
    label: "생성 패턴",

    description: "객체 생성 메커니즘",
  },
  {
    id: "structural",
    label: "구조 패턴",

    description: "클래스/객체 구성",
  },
  {
    id: "behavioral",
    label: "행위 패턴",

    description: "객체 간 상호작용",
  },
];

/**
 * Navigation 컴포넌트 Props
 */
interface NavigationProps {
  className?: string;
}

/**
 * Navigation 컴포넌트
 *
 * [역할 - Widgets 레이어]
 * 전역 네비게이션을 담당하는 위젯입니다.
 * 홈, 생성 패턴, 구조 패턴, 행위 패턴 탭을 제공합니다.
 */
export function Navigation({ className }: NavigationProps) {
  return (
    <nav className={cn("flex items-center gap-1", className)}>
      {navTabs.map((tab) => {
        const tapHref = `${tab.id}/${DEFAULT_PATTERN_BY_CATEGORY[tab.id]}`;

        return (
          <Link
            key={tab.id}
            href={tapHref}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 text-slate-800 hover:bg-slate-100 hover:text-black"
          >
            <span className="hidden sm:inline">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
