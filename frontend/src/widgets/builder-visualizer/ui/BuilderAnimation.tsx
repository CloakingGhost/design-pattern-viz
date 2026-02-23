"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { BuilderAnimationState } from "@/shared/types";

/**
 * BuilderAnimation 컴포넌트 Props
 */
interface BuilderAnimationProps {
  /** 현재 애니메이션 상태 */
  state: BuilderAnimationState | null;
  className?: string;
}

/**
 * BuilderAnimation 컴포넌트
 *
 * [역할]
 * Builder 패턴: 복잡한 객체를 단계별로 생성하는 패턴
 *
 * [시각 구조]
 * - Director (상단): 빌더를 사용해 제품을 조립
 * - Builder (중앙 좌측): 생성 단계를 정의한 인터페이스
 * - Product (중앙 우측): 생성 중인 제품
 * - Build Steps (하단): 단계별 진행 상황
 */
export function BuilderAnimation({
  state,
  className = "",
}: BuilderAnimationProps) {
  if (!state) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <p className="text-base text-slate-400">패턴을 선택해주세요</p>
      </div>
    );
  }

  return (
    <div
      className={`relative bg-linear-to-br from-slate-50 to-amber-50 rounded-xl border border-slate-200 overflow-hidden ${className}`}
      style={{ height: "700px" }}
    >
      {/* 메인 컨텐츠 */}
      <div className="relative z-10 h-full p-8 flex flex-col gap-6">
        {/* Director (상단) */}
        <div className="flex justify-center">
          <AnimatePresence>
            {state.directorActive && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-[var(--color-secondary-bg)] border-2 border-[var(--color-secondary)] rounded-lg p-4 shadow-lg"
              >
                <div className="text-center">
                  <h3 className="text-base font-bold text-[var(--color-secondary)] mb-1">
                    Director
                  </h3>
                  <p className="text-sm text-[var(--color-secondary-hover)]">
                    {state.productType === "SportsCar"
                      ? "constructSportsCar()"
                      : state.productType === "SUV"
                        ? "constructSUV()"
                        : "조립 관리자"}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Builder & Product (중앙) */}
        <div className="flex-1 grid grid-cols-2 gap-8 items-center">
          {/* 왼쪽: Builder */}
          <div className="flex flex-col items-center gap-4">
            <AnimatePresence>
              {state.currentBuilder && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="w-full"
                >
                  <div
                    className={`
                    rounded-lg p-6 border-2 shadow-lg
                    ${
                      state.currentBuilder === "CarBuilder"
                        ? "bg-blue-50 border-blue-400"
                        : "bg-green-50 border-green-400"
                    }
                  `}
                  >
                    <h3
                      className={`text-base font-bold text-center mb-4
                      ${
                        state.currentBuilder === "CarBuilder"
                          ? "text-blue-900"
                          : "text-green-900"
                      }
                    `}
                    >
                      {state.currentBuilder}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <code className="block text-slate-700">+ reset()</code>
                      <code className="block text-slate-700">
                        + setSeats(n)
                      </code>
                      <code className="block text-slate-700">
                        + setEngine(e)
                      </code>
                      <code className="block text-slate-700">
                        + setTripComputer()
                      </code>
                      <code className="block text-slate-700">+ setGPS()</code>
                      <code className="block text-slate-700">
                        + getResult()
                      </code>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 오른쪽: Product */}
          <div className="flex flex-col items-center">
            <AnimatePresence>
              {state.productType && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="w-full"
                >
                  <div
                    className={`
                    rounded-lg p-6 border-2 shadow-lg transition-all
                    ${
                      state.isProductComplete
                        ? "bg-linear-to-br from-green-50 to-emerald-50 border-green-500"
                        : "bg-white border-slate-300"
                    }
                  `}
                  >
                    <div className="text-center">
                      <motion.div
                        className="text-5xl mb-3"
                        animate={
                          state.isProductComplete ? { scale: [1, 1.1, 1] } : {}
                        }
                        transition={{ duration: 0.5 }}
                      >
                        {state.productType === "SportsCar" ? "🏎️" : "🚙"}
                      </motion.div>
                      <h3 className="text-base font-bold text-slate-900 mb-2">
                        {state.productType}
                      </h3>
                      {state.isProductComplete && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm text-green-700 font-medium"
                        >
                          생성 완료
                        </motion.p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Build Steps (하단) */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-700 text-center">
            Build Steps
          </h4>
          <div className="grid grid-cols-5 gap-2">
            {[
              "reset",
              "setSeats",
              "setEngine",
              "setTripComputer",
              "setGPS",
            ].map((stepName) => {
              const step = state.buildSteps.find((s) => s.step === stepName);
              const isCompleted = step?.completed || false;

              return (
                <motion.div
                  key={stepName}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`
                    rounded-lg p-3 border-2 text-center transition-all
                    ${
                      isCompleted
                        ? "bg-green-100 border-green-400"
                        : "bg-slate-100 border-slate-300"
                    }
                  `}
                >
                  <div className="text-2xl mb-1">{isCompleted ? "✓" : "○"}</div>
                  <p className="text-xs font-medium text-slate-700">
                    {stepName === "reset"
                      ? "초기화"
                      : stepName === "setSeats"
                        ? "좌석"
                        : stepName === "setEngine"
                          ? "엔진"
                          : stepName === "setTripComputer"
                            ? "트립컴퓨터"
                            : "GPS"}
                  </p>
                  {step?.value && (
                    <p className="text-xs text-slate-600 mt-1">{step.value}</p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 상태 메시지 */}
        <motion.div
          key={state.resultMessage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="p-4 bg-slate-100 border border-slate-300 rounded-lg text-center"
        >
          <p className="text-sm font-medium text-slate-800">
            {state.resultMessage}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
