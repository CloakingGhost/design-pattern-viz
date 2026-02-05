"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { PATTERN_CATALOG, PATTERN_CATEGORY_LABELS } from "@/shared/constants";
import type { PatternCategory } from "@/shared/types";
import { useState } from "react";
import { cn } from "@/shared/lib";

interface PatternSidebarProps {
  currentCategory: PatternCategory;
  currentPatternId: string;
}

export function PatternSidebar({
  currentCategory,
  currentPatternId,
}: PatternSidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<PatternCategory[]>([
    currentCategory,
  ]);

  const toggleCategory = (category: PatternCategory) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 sticky top-0 h-screen overflow-y-auto">
      <div className="p-4">
        {(["creational", "structural", "behavioral"] as const).map((category) => {
          const isExpanded = expandedCategories.includes(category);
          const patterns = PATTERN_CATALOG[category];

          return (
            <div key={category} className="mb-4">
              {/* 카테고리 헤더 */}
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700"
              >
                <span>{PATTERN_CATEGORY_LABELS[category]}</span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform",
                    isExpanded ? "rotate-180" : ""
                  )}
                />
              </button>

              {/* 패턴 목록 */}
              {isExpanded && (
                <div className="mt-1 ml-2 space-y-1 border-l border-slate-200">
                  {patterns.map((pattern) => {
                    const isSelected = currentPatternId === pattern.id;

                    if (!pattern.implemented) {
                      return (
                        <div
                          key={pattern.id}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 cursor-not-allowed opacity-60"
                        >
                          <span className="w-5 text-center">{pattern.icon}</span>
                          <span>{pattern.nameKo}</span>
                          <span className="ml-auto text-xs">준비 중</span>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={pattern.id}
                        href={`/${category}/${pattern.id}`}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                          isSelected
                            ? "bg-blue-100 text-blue-700 font-medium"
                            : "text-slate-600 hover:bg-slate-50"
                        )}
                      >
                        <span className="w-5 text-center">{pattern.icon}</span>
                        <span>{pattern.nameKo}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
