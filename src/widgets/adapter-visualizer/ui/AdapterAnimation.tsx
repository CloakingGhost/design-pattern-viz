"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AdapterAnimationState } from "@/data/patterns/adapter.data";

/**
 * AdapterAnimation 컴포넌트 Props
 */
interface AdapterAnimationProps {
  /** 현재 애니메이션 상태 */
  state: AdapterAnimationState | null;
  className?: string;
}

/**
 * AdapterAnimation 컴포넌트
 *
 * [역할]
 * Adapter 패턴: 호환되지 않는 인터페이스를 가진 객체들이 협력할 수 있도록 변환하는 패턴
 *
 * [시각 구조]
 * Step 0-3: 구성 요소 정의 (RoundPeg 인터페이스, SquarePeg, SquarePegAdapter, RoundHole)
 * Step 4: RoundHole 인스턴스 생성
 * Step 5-6: 호환되는 RoundPeg로 테스트 (성공)
 * Step 7: 호환되지 않는 SquarePeg 생성
 * Step 8-9: SquarePegAdapter로 감싸서 변환 (getRadius() 호출)
 * Step 10: 어댑터를 통해 호환성 해결 (성공)
 */
export function AdapterAnimation({
  state,
  className = "",
}: AdapterAnimationProps) {
  if (!state) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <p className="text-base text-slate-400">패턴을 선택해주세요</p>
      </div>
    );
  }

  return (
    <div
      className={`h-175 relative bg-linear-to-br from-slate-50 to-blue-50 rounded-xl border border-slate-200 overflow-hidden ${className}`}
    >
      {/* 메인 컨텐츠 */}
      <div className="relative z-10 h-full p-8 flex flex-col">
        {/* 섹션 1: 구성 요소 정의 (Step 0-3) */}
        <div className="mb-8">
          <div className="grid grid-cols-2 gap-6">
            {/* RoundPeg (Target Interface) */}
            <AnimatePresence>
              {state.roundPegRadius !== undefined && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-purple-50 border-2 border-purple-300 rounded-lg p-4"
                >
                  <div className="text-center">
                    <p className="text-xs font-bold text-purple-600 mb-2">
                      Target Interface
                    </p>
                    <h3 className="text-base font-bold text-purple-900 mb-2">
                      RoundPeg
                    </h3>
                    <code className="text-sm text-purple-700">
                      int getRadius()
                    </code>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SquarePeg (Adaptee) */}
            <AnimatePresence>
              {state.squarePegWidth !== undefined && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-red-50 border-2 border-red-300 rounded-lg p-4"
                >
                  <div className="text-center">
                    <p className="text-xs font-bold text-red-600 mb-2">
                      Incompatible Class
                    </p>
                    <h3 className="text-base font-bold text-red-900 mb-2">
                      SquarePeg
                    </h3>
                    <code className="text-sm text-red-700">int getWidth()</code>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 섹션 2: 객체 인스턴스 (Step 4-10) */}
        <div className="flex-1 flex items-center justify-between gap-8">
          {/* 왼쪽: RoundHole (Client) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-24 h-24 rounded-full border-4 border-blue-500 flex items-center justify-center bg-blue-50 shadow-md">
              <div className="text-5xl">⭕</div>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-blue-900">RoundHole</h3>
              <p className="text-blue-700 font-medium">
                radius: {state.roundPegRadius ?? "-"}
              </p>
            </div>
            <span className="font-medium text-slate-500">Client</span>
          </motion.div>

          {/* 중앙: 호환성 상태 표시 */}
          <div className="flex-1 flex flex-col items-center justify-center gap-6">
            {/* 호환되는 객체 테스트 (Step 5-6) */}
            <AnimatePresence>
              {state.roundPegRadius !== null &&
                state.roundPegRadius > 0 &&
                !state.adapterActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="w-full"
                  >
                    <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 text-center">
                      <p className="text-sm font-bold text-green-900 mb-2">
                        RoundPeg Test
                      </p>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <span className="text-3xl">✅</span>
                      </motion.div>
                      <p className="text-sm text-green-700 font-medium mt-2">
                        Compatible!
                      </p>
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>

            {/* 어댑터 변환 중 (Step 8-9) */}
            <AnimatePresence>
              {state.adapterActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="w-full flex flex-col items-center"
                >
                  {/* 변환 상태 */}
                  <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-4 w-full text-center">
                    <p className="font-bold text-amber-900 mb-2">
                      Adapting Interface
                    </p>
                    <code className="text-amber-700">
                      width {state.squarePegWidth} → radius{" "}
                      {state.roundPegRadius}
                    </code>
                    <p className="text-amber-600 mt-2">
                      Formula: width × √2 ÷ 2
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 어댑터 변환 후 (Step 10) */}
            <AnimatePresence>
              {state.adapterActive &&
                state.fits !== null &&
                state.fits === true && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="w-full"
                  >
                    <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 text-center">
                      <p className="font-bold text-green-900 mb-2">
                        SquarePeg with Adapter Test
                      </p>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      ></motion.div>
                      <p className="text-green-700 font-medium mt-2">
                        Now Compatible!
                      </p>
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>
          </div>

          {/* 오른쪽: SquarePeg & Adapter */}
          <div className="flex flex-col items-center gap-6">
            {/* SquarePeg */}
            <AnimatePresence>
              {state.squarePegWidth !== null && (
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-20 h-20 rounded border-4 border-red-500 flex items-center justify-center bg-red-50 shadow-md">
                    <div className="text-4xl">⬜</div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-base font-bold text-red-900">
                      SquarePeg
                    </h3>
                    <p className="text-red-700 font-medium">
                      width: {state.squarePegWidth}
                    </p>
                  </div>
                  <span className="font-medium text-slate-500">Adaptee</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Adapter (SquarePeg 변환) */}
            <AnimatePresence>
              {state.adapterActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  className="flex flex-col items-center gap-3"
                >
                  <motion.div
                    animate={
                      state.isConverting
                        ? {
                            boxShadow: [
                              "0 0 0 0 rgba(34, 197, 94, 0.7)",
                              "0 0 0 12px rgba(34, 197, 94, 0)",
                            ],
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.6,
                      repeat: state.isConverting ? Infinity : 0,
                    }}
                    className="w-20 h-20 rounded-full border-4 border-green-500 flex items-center justify-center bg-green-50 shadow-md"
                  >
                    <div className="text-3xl">🔌</div>
                  </motion.div>
                  <div className="text-center">
                    <h3 className="font-bold text-green-900">Adapter</h3>
                    <p className="text-green-700 font-medium">
                      radius: {state.roundPegRadius}
                    </p>
                  </div>
                  <span className="font-medium text-slate-500">Adapter</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 하단: 상태 메시지 */}
        <motion.div
          className="absolute bottom-4 left-4 right-4 p-3 bg-white/90 backdrop-blur rounded-lg border border-slate-200 shadow-sm"
          key={state.resultMessage}
        >
          <p className="text-slate-700 font-medium text-center">
            {state.resultMessage}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
