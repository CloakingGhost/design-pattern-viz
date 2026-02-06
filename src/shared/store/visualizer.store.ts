import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { PatternData, AnimationState, PlayerState } from "@/shared/types";

/**
 * 패턴 시각화 스토어 인터페이스
 *
 * [설계 원칙]
 * 1. 단일 진실 공급원: 모든 애니메이션/코드 상태를 한 곳에서 관리
 * 2. 동기화: nextStep()은 코드 하이라이팅과 애니메이션 상태를 동시에 업데이트
 * 3. 불변성: 상태 변경은 항상 새 객체를 반환
 */
interface VisualizerStore {
  // ==================== 상태 ====================
  /** 현재 로드된 패턴 데이터 */
  patternData: PatternData | null;

  /** 플레이어 상태 */
  player: PlayerState;

  /** 현재 애니메이션 상태 (패턴별로 다름) */
  currentAnimationState: AnimationState | null;

  // ==================== 액션 ====================
  /** 패턴 데이터 로드 */
  loadPattern: (pattern: PatternData) => void;

  /** 다음 스텝으로 이동 */
  nextStep: () => void;

  /** 이전 스텝으로 이동 */
  prevStep: () => void;

  /** 특정 스텝으로 이동 */
  goToStep: (step: number) => void;

  /** 재생 시작 */
  play: () => void;

  /** 재생 정지 */
  pause: () => void;

  /** 재생 토글 */
  togglePlay: () => void;

  /** 재생 속도 변경 */
  setPlaySpeed: (speed: number) => void;

  /** 처음으로 리셋 */
  reset: () => void;

  /** 현재 코드 스텝 정보 가져오기 */
  getCurrentCodeStep: () => { highlightLines: number[] } | null;
}

/** 기본 플레이어 상태 */
const initialPlayerState: PlayerState = {
  currentStep: 0,
  totalSteps: 0,
  isPlaying: false,
  playSpeed: 2000, // 2초 기본값
  selectedPatternId: null,
};

/**
 * 패턴 시각화 Zustand 스토어
 *
 * [모킹 전략]
 * - Java 코드의 실행을 시뮬레이션
 * - 각 스텝은 Java 코드의 한 단계 실행을 의미
 * - animationSteps 배열의 state가 해당 시점의 Java 객체 상태를 표현
 */
export const useVisualizerStore = create<VisualizerStore>()(
  devtools(
    (set, get) => ({
      // 초기 상태
      patternData: null,
      player: initialPlayerState,
      currentAnimationState: null,

      /**
       * 패턴 데이터 로드
       * 새로운 패턴을 선택했을 때 호출
       */
      loadPattern: (pattern) => {
        set(
          {
            patternData: pattern,
            player: {
              ...initialPlayerState,
              totalSteps: pattern.animationSteps.length,
              selectedPatternId: pattern.metadata.id,
            },
            // 초기 상태로 설정
            currentAnimationState: pattern.initialState,
          },
          false,
          "loadPattern",
        );
      },

      /**
       * 다음 스텝으로 이동
       * 코드 하이라이팅 인덱스와 애니메이션 상태를 동시에 업데이트
       */
      nextStep: () => {
        const { patternData, player } = get();
        if (!patternData) return;

        const nextStepIndex = player.currentStep + 1;

        // 마지막 스텝이면 재생 중지
        if (nextStepIndex >= player.totalSteps) {
          set(
            {
              player: { ...player, isPlaying: false },
            },
            false,
            "nextStep/end",
          );
          return;
        }

        // 다음 스텝의 애니메이션 상태 가져오기
        const nextAnimationStep = patternData.animationSteps[nextStepIndex];

        set(
          {
            player: { ...player, currentStep: nextStepIndex },
            currentAnimationState: nextAnimationStep.state,
          },
          false,
          "nextStep",
        );
      },

      /**
       * 이전 스텝으로 이동
       */
      prevStep: () => {
        const { patternData, player } = get();
        if (!patternData) return;

        const prevStepIndex = player.currentStep - 1;

        // 첫 스텝 이전으로 갈 수 없음
        if (prevStepIndex < 0) return;

        const prevAnimationStep = patternData.animationSteps[prevStepIndex];

        set(
          {
            player: { ...player, currentStep: prevStepIndex },
            currentAnimationState: prevAnimationStep.state,
          },
          false,
          "prevStep",
        );
      },

      /**
       * 특정 스텝으로 이동
       */
      goToStep: (step) => {
        const { patternData, player } = get();
        if (!patternData) return;

        // 유효 범위 검증
        if (step < 0 || step >= player.totalSteps) return;

        const targetAnimationStep = patternData.animationSteps[step];

        set(
          {
            player: { ...player, currentStep: step, isPlaying: false },
            currentAnimationState: targetAnimationStep.state,
          },
          false,
          "goToStep",
        );
      },

      /**
       * 재생 시작
       */
      play: () => {
        const { player } = get();

        // 마지막 스텝이면 처음부터 시작
        if (player.currentStep >= player.totalSteps - 1) {
          get().reset();
        }

        set(
          {
            player: { ...get().player, isPlaying: true },
          },
          false,
          "play",
        );
      },

      /**
       * 재생 정지
       */
      pause: () => {
        set(
          {
            player: { ...get().player, isPlaying: false },
          },
          false,
          "pause",
        );
      },

      /**
       * 재생 토글
       */
      togglePlay: () => {
        const { player } = get();
        if (player.isPlaying) {
          get().pause();
        } else {
          get().play();
        }
      },

      /**
       * 재생 속도 변경
       */
      setPlaySpeed: (speed) => {
        set(
          {
            player: { ...get().player, playSpeed: speed },
          },
          false,
          "setPlaySpeed",
        );
      },

      /**
       * 처음으로 리셋
       */
      reset: () => {
        const { patternData } = get();
        if (!patternData) return;

        set(
          {
            player: {
              ...get().player,
              currentStep: 0,
              isPlaying: false,
            },
            currentAnimationState: patternData.initialState,
          },
          false,
          "reset",
        );
      },

      /**
       * 현재 코드 스텝 정보 가져오기
       */
      getCurrentCodeStep: () => {
        const { patternData, player } = get();
        if (!patternData) return null;

        const codeStep = patternData.codeSteps[player.currentStep];
        if (!codeStep) return null;

        return {
          highlightLines: codeStep.highlightLines,
        };
      },
    }),
    { name: "visualizer-store" },
  ),
);
