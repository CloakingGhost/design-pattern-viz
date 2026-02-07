import { useLayoutEffect, useEffect, useRef } from "react";
import { useVisualizerStore } from "@/shared/store";
import type { AnimationState, PatternData } from "@/shared/types";

/**
 * usePatternVisualizer 커스텀 훅
 *
 * [역할]
 * - 애니메이션 재생 타이머 관리
 * - 스토어와 UI 컴포넌트 연결
 * - 자동 재생 로직 처리
 *
 * [모킹 전략]
 * 이 훅은 Java 런타임의 실행 흐름을 시뮬레이션합니다.
 * setInterval을 통해 일정 간격으로 nextStep()을 호출하면,
 * 마치 Java 코드가 한 줄씩 실행되는 것처럼 시각화됩니다.
 */
export function usePatternVisualizer<T extends AnimationState = AnimationState>(
  patternData?: PatternData<T>,
): UsePatternVisualizerReturn<T> {
  // 스토어에서 상태와 액션 가져오기
  const {
    patternData: storePatternData,
    player,
    loadPattern,
    nextStep,
    prevStep,
    goToStep,
    play,
    pause,
    togglePlay,
    setPlaySpeed,
    reset,
    getCurrentCodeStep,
  } = useVisualizerStore();

  // 타이머 참조 (메모리 누수 방지)
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * 패턴 데이터가 변경되면 스토어에 로드
   */
  useLayoutEffect(() => {
    const currentPatternId = patternData?.metadata?.id;
    if (!currentPatternId) return;

    loadPattern(patternData);
  }, [patternData, loadPattern]);

  /**
   * 자동 재생 로직
   * isPlaying이 true일 때:
   * 1. 첫 시작은 바로 nextStep() 호출 (지연 없음)
   * 2. 그 이후부터는 playSpeed 간격으로 nextStep 호출
   */
  useEffect(() => {
    // 이전 타이머 정리
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // 재생 중이면 바로 첫 스텝 실행, 그 다음부터 타이머 시작
    if (player.isPlaying) {
      nextStep(); // 첫 시작은 지연 없이 바로 실행
      timerRef.current = setInterval(() => {
        nextStep();
      }, player.playSpeed);
    }

    // 클린업 함수
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [player.isPlaying, player.playSpeed, nextStep]);

  /**
   * 현재 코드 스텝 정보
   */
  const codeStepInfo = getCurrentCodeStep();

  /**
   * 진행률 계산 (0-100)
   */
  const progress =
    player.totalSteps > 0
      ? Math.round((player.currentStep / (player.totalSteps - 1)) * 100)
      : 0;

  /**
   * 이전 스텝 가능 여부
   */
  const canGoPrev = player.currentStep > 0;

  /**
   * 다음 스텝 가능 여부
   */
  const canGoNext = player.currentStep < player.totalSteps - 1;

  return {
    // 상태
    patternData: storePatternData,
    currentStep: player.currentStep,
    totalSteps: player.totalSteps,
    isPlaying: player.isPlaying,
    playSpeed: player.playSpeed,
    selectedPatternId: player.selectedPatternId,
    highlightLines: codeStepInfo?.highlightLines ?? [],
    progress,
    canGoPrev,
    canGoNext,

    // 액션
    nextStep,
    prevStep,
    goToStep,
    play,
    pause,
    togglePlay,
    setPlaySpeed,
    reset,
  };
}

export type UsePatternVisualizerReturn<
  T extends AnimationState = AnimationState,
> = {
  // 상태
  patternData: PatternData | null;
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  playSpeed: number;
  selectedPatternId: string | null;
  animationState: T | null;
  highlightLines: number[];
  progress: number;
  canGoPrev: boolean;
  canGoNext: boolean;

  // 액션
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setPlaySpeed: (speed: number) => void;
  reset: () => void;
};
