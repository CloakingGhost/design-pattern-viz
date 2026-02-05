"use client";

import Link from "next/link";
import { Navigation } from "@/widgets";
import { DEFAULT_PATTERN_BY_CATEGORY, PATTERN_CATEGORY_LABELS } from "@/shared/constants";
import { BookOpen } from "lucide-react";

/**
 * HomePage 컴포넌트
 *
 * [역할 - Pages 레이어]
 * Pages 레이어는 Widgets를 조합하여 페이지를 구성합니다.
 * 비즈니스 로직 없이 순수하게 레이아웃과 위젯 배치만 담당합니다.
 */
export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 via-white to-blue-50">
      {/* 헤더 */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* 로고 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">
                  Design Pattern Visualizer
                </h1>
                <p className="text-xs text-slate-500">
                  디자인 패턴을 시각적으로 이해하세요
                </p>
              </div>
            </div>

            {/* 네비게이션 */}
            <Navigation />
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="w-full flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-10">
            디자인 패턴을 카테고리별로 탐색하세요
          </h2>


          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {([
              "creational",
              "structural",
              "behavioral",
            ] as const).map((category) => (
              <Link
                key={category}
                href={`/${category}/${DEFAULT_PATTERN_BY_CATEGORY[category]}`}
                className="group rounded-xl border border-slate-200 bg-slate-50 p-5 transition-all hover:border-blue-200 hover:bg-blue-50"
              >
                <div className="text-center text-sm font-semibold text-blue-600">
                  {PATTERN_CATEGORY_LABELS[category]}
                </div>

              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-slate-500">
            <p>
              🎓 디자인 패턴 시각화 학습 서비스 | Built with Next.js +
              TypeScript
            </p>
            <p className="mt-1">
              Java 코드의 동작을 TypeScript로 모킹하여 시각화합니다
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
