"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SingletonAnimationState } from "@/shared/types";
// 향후 확장을 위한 상수들 (현재 미사용)
// import { ANIMATION_CONFIG, THEME_COLORS } from '@/shared/constants';

/**
 * SingletonAnimation 컴포넌트 Props
 */
interface SingletonAnimationProps {
  /** 현재 애니메이션 상태 */
  state: SingletonAnimationState | null;
  className?: string;
}

/**
 * SingletonAnimation 컴포넌트
 *
 * [역할]
 * Singleton 패턴의 동작을 시각적으로 표현합니다.
 *
 * [모킹 전략]
 * Java의 Singleton 패턴 동작을 시각화합니다:
 * 1. getInstance() 호출 → 호출자(Client)가 Singleton 클래스로 요청
 * 2. instance == null 체크 → 조건 분기 표시
 * 3. new Singleton() → 인스턴스 생성 애니메이션
 * 4. return instance → 기존/새 인스턴스 반환
 *
 * TypeScript의 state 객체가 Java의 static 변수 상태를 대체합니다.
 */
export function SingletonAnimation({
  state,
  className = "",
}: SingletonAnimationProps) {
  if (!state) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <p className="text-slate-400">패턴을 선택해주세요</p>
      </div>
    );
  }

  const callHistory = Array.isArray(state.callHistory) ? state.callHistory : [];

  return (
    <div
      className={`relative h-130 bg-linear-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 overflow-hidden ${className}`}
    >
      {/* 메인 컨텐츠 */}
      <div className="relative z-10 h-full flex items-center justify-center gap-8 p-8">
        {/* 클라이언트 (호출자) */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ClientNode
            callerId={state.callerId}
            isActive={state.callerId !== null}
          />
          <span className="text-xs font-medium text-slate-500">Client</span>
        </motion.div>

        {/* 화살표 (요청) */}
        <AnimatePresence mode="wait">
          {state.callerId && (
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="flex items-center"
                animate={{ x: state.isReturning ? [-5, 0] : [0, 5, 0] }}
                transition={{
                  duration: 0.5,
                  repeat: state.isReturning ? 0 : Infinity,
                  repeatType: "reverse",
                }}
              >
                <div
                  className={`w-20 h-0.5 ${state.isReturning ? "bg-green-500" : "bg-blue-500"}`}
                />
                <div
                  className={`w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent ${
                    state.isReturning
                      ? "border-l-green-500 rotate-180"
                      : "border-l-blue-500"
                  }`}
                  style={
                    state.isReturning
                      ? { marginRight: "80px", marginLeft: "-88px" }
                      : {}
                  }
                />
              </motion.div>
              <span
                className={`text-xs font-medium ${state.isReturning ? "text-green-600" : "text-blue-600"}`}
              >
                {state.isReturning ? "return instance" : "getInstance()"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Singleton 클래스 */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SingletonClassNode
            instanceExists={state.instanceExists}
            isCreating={state.isCreating}
          />
          <span className="text-xs font-medium text-slate-500">
            Singleton Class
          </span>
        </motion.div>
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

      {/* 호출 히스토리 */}
      <div className="absolute top-4 right-4 bg-white/80 backdrop-blur rounded-lg p-3 border border-slate-200 max-w-50">
        <h4 className="text-xs font-semibold text-slate-600 mb-2">
          📋 호출 기록
        </h4>
        <div className="space-y-1 max-h-24 overflow-y-auto">
          {callHistory.length === 0 ? (
            <p className="text-xs text-slate-400">아직 호출 기록이 없습니다</p>
          ) : (
            callHistory.slice(-3).map((call) => (
              <motion.div
                key={`${call.callerId}-${call.timestamp}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs text-slate-600 flex items-center gap-1"
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    call.action === "create"
                      ? "bg-purple-500"
                      : call.action === "return"
                        ? "bg-green-500"
                        : "bg-blue-500"
                  }`}
                />
                <span>
                  {call.callerId}: {call.action}
                </span>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * 클라이언트 노드 컴포넌트
 */
function ClientNode({
  callerId,
  isActive,
}: {
  callerId: string | null;
  isActive: boolean;
}) {
  return (
    <motion.div
      className={`
        w-20 h-20 rounded-xl flex flex-col items-center justify-center
        border-2 shadow-lg transition-colors duration-300
        ${
          isActive
            ? "bg-blue-500 border-blue-600 text-white"
            : "bg-white border-slate-300 text-slate-600"
        }
      `}
      animate={
        isActive
          ? {
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 4px 6px rgba(59, 130, 246, 0.2)",
                "0 8px 12px rgba(59, 130, 246, 0.3)",
                "0 4px 6px rgba(59, 130, 246, 0.2)",
              ],
            }
          : {}
      }
      transition={{
        duration: 0.5,
        repeat: isActive ? Infinity : 0,
        repeatType: "reverse",
      }}
    >
      <span className="text-2xl mb-1">👤</span>
      <span className="text-xs font-medium">{callerId || "Ready"}</span>
    </motion.div>
  );
}

/**
 * Singleton 클래스 노드 컴포넌트
 */
function SingletonClassNode({
  instanceExists,
  isCreating,
}: {
  instanceExists: boolean;
  isCreating: boolean;
}) {
  return (
    <motion.div
      className={`
        relative w-28 h-28 rounded-2xl flex flex-col items-center justify-center
        border-2 shadow-xl transition-colors duration-300
        ${
          instanceExists
            ? "bg-purple-500 border-purple-600"
            : "bg-white border-slate-300"
        }
      `}
    >
      {/* 생성 중 애니메이션 */}
      <AnimatePresence>
        {isCreating && (
          <motion.div
            className="absolute inset-0 rounded-2xl border-4 border-purple-400"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [1, 1.2, 1.4],
              opacity: [1, 0.5, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        )}
      </AnimatePresence>

      {/* 인스턴스 표시 */}
      <motion.div
        className={`text-center ${instanceExists ? "text-white" : "text-slate-600"}`}
        animate={instanceExists ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5 }}
      >
        <span className="text-3xl mb-1 block">
          {instanceExists ? "🔮" : "📦"}
        </span>
        <span className="text-xs font-medium">
          {isCreating ? "Creating..." : instanceExists ? "Instance" : "null"}
        </span>
      </motion.div>

      {/* private static instance 표시 */}
      <div
        className={`
        absolute -bottom-15 left-1/2 -translate-x-1/2 
        px-2 py-0.5 rounded-xl text-xs font-mono
        w-35 text-center
        ${
          instanceExists
            ? "bg-purple-200 text-purple-700"
            : "bg-slate-200 text-slate-600"
        }
      `}
      >
        static instance
      </div>
    </motion.div>
  );
}
