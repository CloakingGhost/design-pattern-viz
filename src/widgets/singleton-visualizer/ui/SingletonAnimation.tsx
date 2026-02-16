"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { SingletonAnimationState } from "@/shared/types";

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
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!state) {
    return (
      <section
        className={`flex items-center justify-center min-h-64 ${className}`}
        aria-label="Singleton 패턴 애니메이션"
      >
        <p className="text-slate-400">패턴을 선택해주세요</p>
      </section>
    );
  }

  const callHistory = Array.isArray(state.callHistory) ? state.callHistory : [];

  return (
    <section
      className={`relative min-h-[32rem] sm:h-[32rem] bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 overflow-hidden touch-manipulation ${className}`}
      aria-label="Singleton 패턴 시각화"
    >
      {/* 메인 컨텐츠 */}
      <div className="relative z-10 h-full flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 p-4 sm:p-8">
        {/* 클라이언트 (호출자) */}
        <motion.div
          className="flex flex-col items-center gap-2 sm:gap-4"
          initial={
            prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -50 }
          }
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
        >
          <ClientNode
            callerId={state.callerId}
            isActive={state.callerId !== null}
            prefersReducedMotion={prefersReducedMotion}
          />
          <span className="text-xs font-medium text-slate-600">Client</span>
        </motion.div>

        {/* 화살표 (요청) */}
        <AnimatePresence mode="wait">
          {state.callerId && (
            <motion.div
              className="flex flex-col sm:flex-row items-center gap-2"
              initial={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 0, scale: 0.8 }
              }
              animate={{ opacity: 1, scale: 1 }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
              role="status"
              aria-label={
                state.isReturning ? "인스턴스 반환 중" : "getInstance 호출 중"
              }
            >
              <motion.div
                className="flex items-center rotate-90 sm:rotate-0"
                animate={
                  prefersReducedMotion
                    ? {}
                    : { x: state.isReturning ? [-5, 0] : [0, 5, 0] }
                }
                transition={{
                  duration: 0.5,
                  repeat:
                    state.isReturning || prefersReducedMotion ? 0 : Infinity,
                  repeatType: "reverse",
                }}
              >
                <div
                  className={`w-12 sm:w-20 h-0.5 ${state.isReturning ? "bg-green-600" : "bg-blue-600"}`}
                  aria-hidden="true"
                />
                <div
                  className={`w-0 h-0 border-t-6 border-b-6 border-l-10 border-transparent ${
                    state.isReturning
                      ? "border-l-green-600 rotate-180 -ms-21 me-21"
                      : "border-l-blue-600"
                  }`}
                  aria-hidden="true"
                />
              </motion.div>
              <span
                className={`text-xs sm:text-sm font-semibold ${state.isReturning ? "text-green-700" : "text-blue-700"}`}
              >
                {state.isReturning ? "return instance" : "getInstance()"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Singleton 클래스 */}
        <motion.div
          className="flex flex-col items-center gap-2 sm:gap-4"
          initial={
            prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 50 }
          }
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.5,
            delay: prefersReducedMotion ? 0 : 0.2,
          }}
        >
          <SingletonClassNode
            instanceExists={state.instanceExists}
            isCreating={state.isCreating}
            prefersReducedMotion={prefersReducedMotion}
          />
          <span className="text-xs font-medium text-slate-600">
            Singleton Class
          </span>
        </motion.div>
      </div>

      {/* 상태 메시지 */}
      <motion.div
        className="absolute bottom-4 left-4 right-4 p-3 bg-white/90 backdrop-blur rounded-lg border border-slate-200 shadow-sm"
        key={state.resultMessage}
        role="status"
        aria-live="polite"
      >
        <p className="text-sm sm:text-base text-slate-700 font-medium text-center">
          {state.resultMessage}
        </p>
      </motion.div>

      {/* 호출 히스토리 */}
      <aside
        className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-lg p-3 border border-slate-200 max-w-[12rem] sm:max-w-[14rem]"
        aria-label="호출 기록"
      >
        <h2 className="text-xs font-semibold text-slate-700 mb-2">
          <span aria-hidden="true">📋</span> 호출 기록
        </h2>
        <div className="space-y-1 max-h-24 overflow-y-auto overscroll-contain">
          {callHistory.length === 0 ? (
            <p className="text-xs text-slate-500">아직 호출 기록이 없습니다</p>
          ) : (
            <ul className="space-y-1">
              {callHistory.slice(-3).map((call) => (
                <motion.li
                  key={`${call.callerId}-${call.timestamp}`}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0, x: 10 }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xs text-slate-700 flex items-center gap-1"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      call.action === "create"
                        ? "bg-purple-600"
                        : call.action === "return"
                          ? "bg-green-600"
                          : "bg-blue-600"
                    }`}
                    aria-hidden="true"
                  />
                  <span className="truncate">
                    {call.callerId}: {call.action}
                  </span>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </section>
  );
}

/**
 * 클라이언트 노드 컴포넌트
 */
function ClientNode({
  callerId,
  isActive,
  prefersReducedMotion,
}: {
  callerId: string | null;
  isActive: boolean;
  prefersReducedMotion: boolean;
}) {
  return (
    <motion.div
      className={`
        w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex flex-col items-center justify-center
        border-2 shadow-lg transition-all duration-300 touch-manipulation
        ${
          isActive
            ? "bg-blue-600 border-blue-700 text-white hover:bg-blue-700 hover:border-blue-800"
            : "bg-white border-slate-300 text-slate-600 hover:border-slate-400"
        }
      `}
      animate={
        isActive && !prefersReducedMotion
          ? {
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 4px 6px rgba(37, 99, 235, 0.3)",
                "0 8px 12px rgba(37, 99, 235, 0.4)",
                "0 4px 6px rgba(37, 99, 235, 0.3)",
              ],
            }
          : {}
      }
      transition={{
        duration: 0.5,
        repeat: isActive && !prefersReducedMotion ? Infinity : 0,
        repeatType: "reverse",
      }}
      role="img"
      aria-label={`클라이언트 ${callerId || "대기 중"}`}
    >
      <span className="text-xl sm:text-2xl mb-1" aria-hidden="true">
        👤
      </span>
      <span className="text-xs font-semibold">{callerId || "Ready"}</span>
    </motion.div>
  );
}

/**
 * Singleton 클래스 노드 컴포넌트
 */
function SingletonClassNode({
  instanceExists,
  isCreating,
  prefersReducedMotion,
}: {
  instanceExists: boolean;
  isCreating: boolean;
  prefersReducedMotion: boolean;
}) {
  return (
    <motion.div
      className={`
        relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex flex-col items-center justify-center
        border-2 shadow-xl transition-all duration-300 touch-manipulation
        ${
          instanceExists
            ? "bg-purple-600 border-purple-700 hover:bg-purple-700 hover:border-purple-800"
            : "bg-white border-slate-300 hover:border-slate-400"
        }
      `}
      role="img"
      aria-label={`Singleton 인스턴스 ${isCreating ? "생성 중" : instanceExists ? "존재함" : "없음"}`}
    >
      {/* 생성 중 애니메이션 */}
      <AnimatePresence>
        {isCreating && !prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 rounded-2xl border-4 border-purple-400"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [1, 1.2, 1.4],
              opacity: [1, 0.5, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, repeat: Infinity }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* 인스턴스 표시 */}
      <motion.div
        className={`text-center ${instanceExists ? "text-white" : "text-slate-600"}`}
        animate={
          instanceExists && !prefersReducedMotion ? { scale: [1, 1.1, 1] } : {}
        }
        transition={{ duration: 0.5 }}
      >
        <span className="text-2xl sm:text-3xl mb-1 block" aria-hidden="true">
          {instanceExists ? "🔮" : "📦"}
        </span>
        <span className="text-xs font-semibold">
          {isCreating ? "Creating…" : instanceExists ? "Instance" : "null"}
        </span>
      </motion.div>

      {/* private static instance 표시 */}
      <div
        className={`
        absolute -bottom-12 sm:-bottom-14 left-1/2 -translate-x-1/2 
        px-2 py-0.5 rounded-lg text-[10px] sm:text-xs font-mono
        w-32 sm:w-36 text-center
        ${
          instanceExists
            ? "bg-purple-100 text-purple-800"
            : "bg-slate-100 text-slate-700"
        }
      `}
        aria-label="static instance 변수"
      >
        static instance
      </div>
    </motion.div>
  );
}
