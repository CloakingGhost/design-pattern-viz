"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { StrategyAnimationState } from "@/shared/types";

/**
 * StrategyAnimation 컴포넌트 Props
 */
interface StrategyAnimationProps {
  /** 현재 애니메이션 상태 */
  state: StrategyAnimationState | null;
  className?: string;
}

/**
 * 전략별 아이콘 및 색상
 */
const strategyStyles: Record<
  string,
  { icon: string; color: string; bgColor: string }
> = {
  CreditCardPayment: {
    icon: "💳",
    color: "text-blue-600",
    bgColor: "bg-blue-500",
  },
  PayPalPayment: {
    icon: "🅿️",
    color: "text-indigo-600",
    bgColor: "bg-indigo-500",
  },
  BitcoinPayment: {
    icon: "₿",
    color: "text-orange-600",
    bgColor: "bg-orange-500",
  },
};

/**
 * StrategyAnimation 컴포넌트
 *
 * [역할]
 * Strategy 패턴의 동작을 시각적으로 표현합니다.
 *
 * [참고]
 * refactoring.guru의 Strategy 패턴 구조를 기반으로:
 * 1. Strategy Interface (상단) - 공통 인터페이스
 * 2. Concrete Strategies (중앙 왼쪽) - 구체적인 전략 구현체들
 * 3. Context (중앙 오른쪽) - 전략을 사용하는 객체
 * 4. Client (하단) - 전략을 선택하고 설정하는 주체
 */
export function StrategyAnimation({
  state,
  className = "",
}: StrategyAnimationProps) {
  if (!state || !Array.isArray(state.availableStrategies)) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <p className="text-slate-400">패턴을 선택해주세요</p>
      </div>
    );
  }

  return (
    <div
      className={`relative h-170 bg-linear-to-br from-slate-50 to-blue-50 rounded-xl border border-slate-200 overflow-hidden ${className}`}
    >
      {/* 메인 컨텐츠 */}
      <div className="relative z-10 h-full p-8">
        {/* 1. Strategy Interface (상단) */}
        <div className="flex justify-center mb-8">
          <motion.div
            className="bg-white rounded-lg p-4 border-2 border-blue-400 shadow-lg"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="text-center">
              <h3 className="font-bold text-blue-900">
                &laquo; interface &raquo;
              </h3>
              <h4 className="text-base font-semibold text-blue-700">
                PaymentStrategy
              </h4>
              <code className="text-sm text-slate-600">
                + pay(amount): void
              </code>
            </div>
          </motion.div>
        </div>

        {/* 2 & 3. Concrete Strategies + Context (중앙) */}
        <div className="grid grid-cols-2 gap-12 h-70">
          {/* 왼쪽: Concrete Strategies */}
          <div className="flex flex-col gap-3 justify-center">
            <h3 className="font-semibold text-slate-500 mb-2 text-center">
              Concrete Strategies
            </h3>
            {state.availableStrategies.map((strategy, index) => {
              const style = strategyStyles[strategy] || {
                icon: "📦",
                color: "text-gray-600",
                bgColor: "bg-gray-500",
              };
              const isActive = state.currentStrategy === strategy;

              return (
                <motion.div
                  key={strategy}
                  className={`
                    relative p-3 rounded-lg border-2 transition-all duration-300
                    ${
                      isActive
                        ? `bg-linear-to-r ${style.bgColor} to-${style.bgColor}/80 text-white border-transparent shadow-lg scale-105`
                        : "bg-white text-slate-700 border-slate-200"
                    }
                  `}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-3xl w-10 text-center me-2">
                      {style.icon}
                    </span>
                    <div className="flex-1">
                      <h4
                        className={`text-sm font-bold ${isActive ? "text-white" : style.color}`}
                      >
                        {strategy}
                      </h4>
                      <code
                        className={`text-sm ${isActive ? "text-white/80" : "text-slate-500"}`}
                      >
                        + pay(amount)
                      </code>
                    </div>
                  </div>

                  {/* 활성 표시 */}
                  {isActive && (
                    <>
                      <motion.div
                        className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <span className="text-white text-xs">✓</span>
                      </motion.div>

                      {/* Context로 향하는 연결선 */}
                      <motion.div
                        className="absolute top-1/2 -translate-y-1/2 -right-12 w-12 h-1 bg-indigo-500"
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.div
                        className="absolute top-1/2 -translate-y-1/2 -right-13"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="w-0 h-0 border-t-6 border-b-6 border-l-8 border-transparent border-l-indigo-500" />
                      </motion.div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* 오른쪽: Context */}
          <div className="flex justify-center">
            <motion.div
              className={`
                relative w-60 h-48 rounded-2xl flex flex-col items-center justify-center
                border-4 shadow-2xl transition-all duration-500
                ${
                  state.contextActive
                    ? "bg-linear-to-br from-white to-indigo-50 border-indigo-500"
                    : "bg-white border-slate-300"
                }
              `}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                boxShadow: state.contextActive
                  ? [
                      "0 10px 30px rgba(99, 102, 241, 0.2)",
                      "0 20px 50px rgba(99, 102, 241, 0.4)",
                      "0 10px 30px rgba(99, 102, 241, 0.2)",
                    ]
                  : "0 10px 30px rgba(0, 0, 0, 0.1)",
              }}
              transition={{
                scale: { duration: 0.5 },
                boxShadow: {
                  duration: 2,
                  repeat: state.contextActive ? Infinity : 0,
                },
              }}
            >
              <span className="text-5xl mb-3">🛒</span>
              <h4 className="text-sm font-bold text-slate-900">Context</h4>
              <h5 className="text-xs font-semibold text-indigo-600">
                ShoppingCart
              </h5>
              <div className="mt-2 text-sm text-slate-500 text-center">
                <code>- strategy: PaymentStrategy</code>
                <br />
                <code>+ setStrategy(s)</code>
                <br />
                <code>+ checkout()</code>
              </div>

              {/* 현재 전략 표시 */}
              {state.currentStrategy && (
                <motion.div
                  className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-500 text-white text-sm font-bold rounded-full whitespace-nowrap"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {strategyStyles[state.currentStrategy]?.icon} Using:&nbsp;
                  {state.currentStrategy.replace("Payment", "")}
                </motion.div>
              )}

              {/* 실행 중 효과 */}
              <AnimatePresence>
                {state.isExecuting && (
                  <>
                    {/* 결과로 향하는 화살표 */}
                    <motion.div
                      className="absolute -bottom-18 left-1/2 -translate-x-1/2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="text-3xl">⬇️</div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* 실행 결과 (Context 중앙 기준) */}
              <AnimatePresence>
                {state.isExecuting && (
                  <motion.div
                    className="absolute -bottom-42 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <div className="bg-linear-to-r from-green-400 to-emerald-500 rounded-xl px-6 py-4 shadow-2xl border-2 border-green-300">
                      <div className="flex items-center">
                        <motion.span
                          className="text-3xl"
                          animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          💰
                        </motion.span>
                        <div className="text-white w-25">
                          <h4 className="text-sm font-bold">결제 처리 중...</h4>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 상태 메시지 */}
      <motion.div
        className="absolute bottom-4 left-4 right-4 p-3 bg-white/90 backdrop-blur rounded-lg border border-slate-200 shadow-sm"
        key={state.resultMessage}
      >
        <p className="text-slate-700 font-medium text-center">
          {state.resultMessage}
        </p>
      </motion.div>
    </div>
  );
}
