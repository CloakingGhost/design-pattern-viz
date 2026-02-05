/**
 * 디자인 패턴 시각화를 위한 타입 정의
 *
 * [모킹 전략 설명]
 * Java 백엔드 없이 프론트엔드에서 디자인 패턴의 동작을 시뮬레이션합니다.
 * 각 패턴의 실행 단계를 JSON으로 정의하고, TypeScript로 상태 변화를 추적합니다.
 *
 * 예: Singleton 패턴
 * - Java에서는 private static instance를 통해 구현
 * - 우리는 animationState 객체로 instance 존재 여부를 추적
 * - 각 step마다 상태가 변경되며, UI가 이를 반영
 */

// ============================================
// 패턴 메타데이터 타입
// ============================================

/** 디자인 패턴의 분류 카테고리 */
export type PatternCategory = "creational" | "structural" | "behavioral";

/** 패턴 기본 정보 */
export interface PatternMetadata {
  /** 패턴 고유 식별자 */
  id: string;
  /** 패턴 이름 (영문) */
  name: string;
  /** 패턴 이름 (한글) */
  nameKo: string;
  /** 패턴 분류 */
  category: PatternCategory;
  /** 패턴 설명 */
  description: string;
  /** 이 패턴이 필요한 상황 */
  whenToUse: string;
  /** 실제 사용 사례 */
  useCases: string[];
  /** 장점 */
  pros: string[];
  /** 단점 */
  cons: string[];
  /** 패턴 아이콘 (이모지 또는 아이콘 이름) */
  icon: string;
}

// ============================================
// 코드 시각화 타입
// ============================================

/** 코드 라인 하나의 정보 */
export interface CodeLine {
  /** 라인 번호 (1부터 시작) */
  lineNumber: number;
  /** 실제 코드 내용 */
  content: string;
  /** 들여쓰기 레벨 (스페이스 수) */
  indentation: number;
}

/** 코드 스텝 - 특정 시점에 하이라이트할 코드 정보 */
export interface CodeStep {
  /** 스텝 인덱스 */
  stepIndex: number;
  /** 하이라이트할 라인 번호들 */
  highlightLines: number[];
  /** 실행 중인 코드의 의미 */
  codeContext: string;
}

// ============================================
// 애니메이션 상태 타입
// ============================================

/**
 * 모든 애니메이션 상태의 베이스 인터페이스
 * 각 패턴의 상태가 확장하는 기본 구조
 */
export interface BaseAnimationState {
  /** 현재 상태를 설명하는 메시지 */
  resultMessage: string;
}

/**
 * 싱글톤 패턴의 애니메이션 상태
 * Java의 Singleton 동작을 시뮬레이션
 */
export interface SingletonAnimationState extends BaseAnimationState {
  /** 인스턴스 존재 여부 (Java의 private static instance != null) */
  instanceExists: boolean;
  /** 현재 호출자 ID */
  callerId: string | null;
  /** 인스턴스 생성 중인지 */
  isCreating: boolean;
  /** 인스턴스 반환 중인지 */
  isReturning: boolean;
  /** 호출 히스토리 */
  callHistory: Array<{
    callerId: string;
    action: "check" | "create" | "return";
    timestamp: number;
  }>;
}

/**
 * 전략 패턴의 애니메이션 상태
 * Java의 Strategy 동작을 시뮬레이션
 */
export interface StrategyAnimationState extends BaseAnimationState {
  /** 현재 선택된 전략 이름 */
  currentStrategy: string | null;
  /** 사용 가능한 전략 목록 */
  availableStrategies: string[];
  /** 전략 실행 중인지 */
  isExecuting: boolean;
  /** Context 객체 활성화 여부 */
  contextActive: boolean;
}

/**
 * Adapter 패턴의 애니메이션 상태
 * 호환되지 않는 인터페이스를 가진 객체들의 변환을 시뮬레이션
 */
export interface AdapterAnimationState extends BaseAnimationState {
  /** 정사각형 못의 너비 - undefined: 미생성, number: 생성된 상태 */
  squarePegWidth: number | undefined;
  /** 둥근 못의 반지름 - undefined: 미생성, number: 생성/변환된 값 */
  roundPegRadius: number | undefined;
  /** 어댑터 활성화 여부 */
  adapterActive: boolean;
  /** 변환 중인지 */
  isConverting: boolean;
  /** 구멍에 맞는지 */
  fits: boolean | null;
}

/** 모든 패턴의 애니메이션 상태를 포괄하는 유니온 타입 */
export type AnimationState = SingletonAnimationState | StrategyAnimationState | AdapterAnimationState;

// ============================================
// 애니메이션 스텝 타입
// ============================================

/** 하나의 애니메이션 스텝 정의 */
export interface AnimationStep<T extends AnimationState = AnimationState> {
  /** 스텝 인덱스 */
  stepIndex: number;
  /** 이 스텝에서의 애니메이션 상태 */
  state: T;
  /** 이 스텝의 지속 시간 (ms) - 기본값 사용 시 undefined */
  duration?: number;
  /** 스텝 전환 시 효과음 키 (선택적) */
  soundEffect?: string;
}

// ============================================
// 전체 패턴 데이터 타입
// ============================================

/** 전체 패턴 데이터 스키마 */
export interface PatternData<T extends AnimationState = AnimationState> {
  /** 패턴 메타데이터 */
  metadata: PatternMetadata;
  /** Java 코드 (문자열 배열 - 각 요소가 한 라인) */
  javaCode: string[];
  /** 코드 스텝 정보 배열 */
  codeSteps: CodeStep[];
  /** 애니메이션 스텝 정보 배열 */
  animationSteps: AnimationStep<T>[];
  /** 초기 애니메이션 상태 */
  initialState: T;
}

/** Singleton 패턴 데이터 타입 */
export type SingletonPatternData = PatternData<SingletonAnimationState>;

/** Strategy 패턴 데이터 타입 */
export type StrategyPatternData = PatternData<StrategyAnimationState>;

/** Adapter 패턴 데이터 타입 */
export type AdapterPatternData = PatternData<AdapterAnimationState>;

// ============================================
// 플레이어 상태 타입
// ============================================

/** 애니메이션 재생 상태 */
export interface PlayerState {
  /** 현재 스텝 인덱스 */
  currentStep: number;
  /** 총 스텝 수 */
  totalSteps: number;
  /** 재생 중인지 */
  isPlaying: boolean;
  /** 재생 속도 (ms) - 스텝 간 간격 */
  playSpeed: number;
  /** 선택된 패턴 ID */
  selectedPatternId: string | null;
}

/** 지원되는 재생 속도 옵션 */
export const PLAY_SPEEDS = {
  SLOW: 3000,
  NORMAL: 2000,
  FAST: 1000,
  VERY_FAST: 500,
} as const;

export type PlaySpeedKey = keyof typeof PLAY_SPEEDS;
