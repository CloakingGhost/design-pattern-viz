/**
 * Singleton 패턴 데이터
 * 
 * [모킹 전략 상세 설명]
 * 
 * 이 파일은 Java의 Singleton 패턴 동작을 JSON 형태로 "시나리오화"합니다.
 * 실제 Java 코드가 실행되는 것이 아니라, 각 스텝별로:
 * 1. 어떤 코드 라인이 실행되는지 (highlightLines)
 * 2. 그 때 Java 객체의 상태가 어떤지 (animationState)
 * 를 미리 정의해둡니다.
 * 
 * TypeScript의 역할:
 * - Java의 private static Singleton instance = null → instanceExists: boolean
 * - Java의 getInstance() 호출 → callerId로 누가 호출했는지 추적
 * - Java의 new Singleton() → isCreating: true로 생성 중 표시
 * - Java의 return instance → isReturning: true로 반환 중 표시
 * 
 * 이렇게 하면 사용자는 "마치 Java 코드가 실행되는 것처럼" 시각화를 볼 수 있습니다.
 */

import type { SingletonPatternData, SingletonAnimationState } from '@/shared/types';

/**
 * 초기 상태
 * Java의 static 변수 초기화 상태를 표현
 */
const initialState: SingletonAnimationState = {
  instanceExists: false,      // private static Singleton instance = null
  callerId: null,             // 아직 아무도 호출하지 않음
  isCreating: false,
  isReturning: false,
  message: '시작하려면 재생 버튼을 클릭하세요',
  callHistory: [],
};

/**
 * Singleton 패턴 Java 코드
 * 기본적인 Lazy Initialization Singleton
 */
const javaCode = [
  'public class Singleton {',
  '    // 유일한 인스턴스를 저장할 private static 변수',
  '    private static Singleton instance = null;',
  '',
  '    // 외부에서 직접 생성하지 못하도록 private 생성자',
  '    private Singleton() {',
  '        System.out.println("Singleton 인스턴스 생성!");',
  '    }',
  '',
  '    // 인스턴스를 반환하는 public static 메서드',
  '    public static Singleton getInstance() {',
  '        // 인스턴스가 없으면 생성',
  '        if (instance == null) {',
  '            instance = new Singleton();',
  '        }',
  '        // 기존 인스턴스 반환',
  '        return instance;',
  '    }',
  '}',
  '',
  '// 클라이언트 코드',
  'public class Client {',
  '    public static void main(String[] args) {',
  '        // 첫 번째 호출 - 인스턴스 생성',
  '        Singleton obj1 = Singleton.getInstance();',
  '',
  '        // 두 번째 호출 - 기존 인스턴스 반환',
  '        Singleton obj2 = Singleton.getInstance();',
  '',
  '        // 동일한 인스턴스인지 확인',
  '        System.out.println(obj1 == obj2); // true',
  '    }',
  '}',
];

/**
 * 코드 스텝 정의
 * 각 스텝에서 어떤 라인이 하이라이트되고 어떤 설명이 표시될지 정의
 */
const codeSteps = [
  {
    stepIndex: 0,
    highlightLines: [3],
    codeContext: 'private static Singleton instance = null;',
  },
  {
    stepIndex: 1,
    highlightLines: [25],
    codeContext: 'Singleton obj1 = Singleton.getInstance();',
  },
  {
    stepIndex: 2,
    highlightLines: [11, 13],
    codeContext: 'if (instance == null)',
  },
  {
    stepIndex: 3,
    highlightLines: [13],
    codeContext: 'instance == null → true',
  },
  {
    stepIndex: 4,
    highlightLines: [6, 7, 14],
    codeContext: 'instance = new Singleton();',
  },
  {
    stepIndex: 5,
    highlightLines: [17],
    codeContext: 'return instance;',
  },
  {
    stepIndex: 6,
    highlightLines: [28],
    codeContext: 'Singleton obj2 = Singleton.getInstance();',
  },
  {
    stepIndex: 7,
    highlightLines: [11, 13],
    codeContext: 'if (instance == null)',
  },
  {
    stepIndex: 8,
    highlightLines: [13],
    codeContext: 'instance == null → false',
  },
  {
    stepIndex: 9,
    highlightLines: [17],
    codeContext: 'return instance;',
  },
  {
    stepIndex: 10,
    highlightLines: [31],
    codeContext: 'obj1 == obj2 → true',
  },
];

/**
 * 애니메이션 스텝 정의
 * 각 스텝에서의 시각적 상태를 정의
 */
const animationSteps = [
  {
    stepIndex: 0,
    state: {
      instanceExists: false,
      callerId: null,
      isCreating: false,
      isReturning: false,
      message: '📦 Singleton 클래스 로드 - instance는 null입니다',
      callHistory: [],
    } as SingletonAnimationState,
  },
  {
    stepIndex: 1,
    state: {
      instanceExists: false,
      callerId: 'Client-A',
      isCreating: false,
      isReturning: false,
      message: '👤 Client-A이 getInstance()를 호출합니다',
      callHistory: [
        { callerId: 'Client-A', action: 'check' as const, timestamp: 1 },
      ],
    } as SingletonAnimationState,
  },
  {
    stepIndex: 2,
    state: {
      instanceExists: false,
      callerId: 'Client-A',
      isCreating: false,
      isReturning: false,
      message: '🔍 instance == null 체크 중...',
      callHistory: [
        { callerId: 'Client-A', action: 'check' as const, timestamp: 1 },
      ],
    } as SingletonAnimationState,
  },
  {
    stepIndex: 3,
    state: {
      instanceExists: false,
      callerId: 'Client-A',
      isCreating: false,
      isReturning: false,
      message: '✅ 조건 true: 인스턴스가 없으므로 생성이 필요합니다',
      callHistory: [
        { callerId: 'Client-A', action: 'check' as const, timestamp: 1 },
      ],
    } as SingletonAnimationState,
  },
  {
    stepIndex: 4,
    state: {
      instanceExists: false,
      callerId: 'Client-A',
      isCreating: true,
      isReturning: false,
      message: '🔨 new Singleton() - 인스턴스 생성 중!',
      callHistory: [
        { callerId: 'Client-A', action: 'check' as const, timestamp: 1 },
        { callerId: 'Client-A', action: 'create' as const, timestamp: 2 },
      ],
    } as SingletonAnimationState,
  },
  {
    stepIndex: 5,
    state: {
      instanceExists: true,
      callerId: 'Client-A',
      isCreating: false,
      isReturning: true,
      message: '🎉 인스턴스 생성 완료! Client-A에게 반환합니다',
      callHistory: [
        { callerId: 'Client-A', action: 'check' as const, timestamp: 1 },
        { callerId: 'Client-A', action: 'create' as const, timestamp: 2 },
        { callerId: 'Client-A', action: 'return' as const, timestamp: 3 },
      ],
    } as SingletonAnimationState,
  },
  {
    stepIndex: 6,
    state: {
      instanceExists: true,
      callerId: 'Client-B',
      isCreating: false,
      isReturning: false,
      message: '👤 Client-B가 getInstance()를 호출합니다',
      callHistory: [
        { callerId: 'Client-A', action: 'check' as const, timestamp: 1 },
        { callerId: 'Client-A', action: 'create' as const, timestamp: 2 },
        { callerId: 'Client-A', action: 'return' as const, timestamp: 3 },
        { callerId: 'Client-B', action: 'check' as const, timestamp: 4 },
      ],
    } as SingletonAnimationState,
  },
  {
    stepIndex: 7,
    state: {
      instanceExists: true,
      callerId: 'Client-B',
      isCreating: false,
      isReturning: false,
      message: '🔍 instance == null 체크 중...',
      callHistory: [
        { callerId: 'Client-A', action: 'check' as const, timestamp: 1 },
        { callerId: 'Client-A', action: 'create' as const, timestamp: 2 },
        { callerId: 'Client-A', action: 'return' as const, timestamp: 3 },
        { callerId: 'Client-B', action: 'check' as const, timestamp: 4 },
      ],
    } as SingletonAnimationState,
  },
  {
    stepIndex: 8,
    state: {
      instanceExists: true,
      callerId: 'Client-B',
      isCreating: false,
      isReturning: false,
      message: '❌ 조건 false: 이미 인스턴스가 존재합니다!',
      callHistory: [
        { callerId: 'Client-A', action: 'check' as const, timestamp: 1 },
        { callerId: 'Client-A', action: 'create' as const, timestamp: 2 },
        { callerId: 'Client-A', action: 'return' as const, timestamp: 3 },
        { callerId: 'Client-B', action: 'check' as const, timestamp: 4 },
      ],
    } as SingletonAnimationState,
  },
  {
    stepIndex: 9,
    state: {
      instanceExists: true,
      callerId: 'Client-B',
      isCreating: false,
      isReturning: true,
      message: '🔄 기존 인스턴스를 Client-B에게 반환합니다',
      callHistory: [
        { callerId: 'Client-A', action: 'check' as const, timestamp: 1 },
        { callerId: 'Client-A', action: 'create' as const, timestamp: 2 },
        { callerId: 'Client-A', action: 'return' as const, timestamp: 3 },
        { callerId: 'Client-B', action: 'check' as const, timestamp: 4 },
        { callerId: 'Client-B', action: 'return' as const, timestamp: 5 },
      ],
    } as SingletonAnimationState,
  },
  {
    stepIndex: 10,
    state: {
      instanceExists: true,
      callerId: null,
      isCreating: false,
      isReturning: false,
      message: '✨ obj1 == obj2 → true! 두 클라이언트가 같은 인스턴스를 공유합니다',
      callHistory: [
        { callerId: 'Client-A', action: 'check' as const, timestamp: 1 },
        { callerId: 'Client-A', action: 'create' as const, timestamp: 2 },
        { callerId: 'Client-A', action: 'return' as const, timestamp: 3 },
        { callerId: 'Client-B', action: 'check' as const, timestamp: 4 },
        { callerId: 'Client-B', action: 'return' as const, timestamp: 5 },
      ],
    } as SingletonAnimationState,
  },
];

/**
 * Singleton 패턴 완전한 데이터 객체
 */
export const singletonPatternData: SingletonPatternData = {
  metadata: {
    id: 'singleton',
    name: 'Singleton',
    nameKo: '싱글톤',
    category: 'creational',
    description: '클래스의 인스턴스가 오직 하나만 생성되도록 보장하고, 어디서든 그 인스턴스에 접근할 수 있는 전역적인 접근점을 제공하는 패턴입니다.',
    whenToUse: '애플리케이션 전체에서 단 하나의 인스턴스만 필요할 때 사용합니다. 예를 들어, 설정 정보, 로그 관리, 데이터베이스 연결 풀 등 공유 자원을 관리할 때 유용합니다.',
    useCases: [
      '데이터베이스 연결 풀 (Connection Pool)',
      '로깅 시스템 (Logger)',
      '애플리케이션 설정 관리 (Configuration)',
      '캐시 관리자 (Cache Manager)',
    ],
    pros: [
      '인스턴스가 하나만 존재함을 보장',
      '전역 접근점 제공으로 어디서든 접근 가능',
      '인스턴스가 필요할 때만 생성 (Lazy Initialization)',
      '메모리 절약 효과',
    ],
    cons: [
      '전역 상태로 인한 테스트 어려움',
      '멀티스레드 환경에서 동기화 필요',
      '의존성 주입(DI) 패턴과 충돌 가능',
      '단일 책임 원칙(SRP) 위반 가능성',
    ],
    icon: '🔮',
  },
  javaCode,
  codeSteps,
  animationSteps,
  initialState,
};
