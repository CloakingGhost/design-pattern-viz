"use client";

import Link from "next/link";
import { Header, Footer } from "@/widgets";
import {
  DEFAULT_PATTERN_BY_CATEGORY,
  PATTERN_CATEGORY_LABELS,
} from "@/shared/constants";

/**
 * HomePage 컴포넌트
 *
 * [역할 - Pages 레이어]
 * Pages 레이어는 Widgets를 조합하여 페이지를 구성합니다.
 * 비즈니스 로직 없이 순수하게 레이아웃과 위젯 배치만 담당합니다.
 */
export function HomePage() {
  const categories = ["creational", "structural", "behavioral"] as const;
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 via-white to-blue-50">
      {/* 헤더 */}
      <Header />

      {/* 메인 컨텐츠 */}
      <main className="w-full flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-10">
            디자인 패턴을 카테고리별로 탐색하세요
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
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
      <Footer />
    </div>
  );
}
