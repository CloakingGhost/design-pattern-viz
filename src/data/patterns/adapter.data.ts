/**
 * Adapter 패턴 데이터
 * 
 * [모킹 전략]
 * 어댑터 패턴의 핵심: 호환되지 않는 인터페이스를 가진 객체들이 협력할 수 있게 해주는 패턴
 * 
 * 예제: 둥근 못을 정사각형 못으로 변환하기
 * - Client: RoundHole (둥근 구멍)
 * - Target Interface: RoundPeg (둥근 못 인터페이스)
 * - Adaptee: SquarePeg (정사각형 못 - 호환되지 않는 인터페이스)
 * - Adapter: SquarePegAdapter (정사각형 못을 둥근 못으로 변환)
 */

import type { PatternData, AdapterAnimationState } from '@/shared/types';

/**
 * Adapter 패턴 애니메이션 상태
 */
// AdapterAnimationState는 pattern.types.ts에서 정의됨

/**
 * 초기 상태
 */
const initialState: AdapterAnimationState = {
  squarePegWidth: undefined,
  roundPegRadius: undefined,
  adapterActive: false,
  isConverting: false,
  fits: null,
  resultMessage: '재생 버튼을 클릭하여 Adapter 패턴의 동작 방식을 확인하세요',
};

/**
 * Adapter 패턴 Java 코드
 */
const javaCode = [
  '// Target Interface: 클라이언트가 원하는 인터페이스',
  'public interface RoundPeg {',
  '    int getRadius();',
  '}',
  '',
  '// 기존의 호환되는 구현체',
  'public class ConcreteRoundPeg implements RoundPeg {',
  '    private int radius;',
  '',
  '    public ConcreteRoundPeg(int radius) {',
  '        this.radius = radius;',
  '    }',
  '',
  '    public int getRadius() {',
  '        return radius;',
  '    }',
  '}',
  '',
  '// Adaptee: 호환되지 않는 기존 클래스',
  'public class SquarePeg {',
  '    private int width;',
  '',
  '    public SquarePeg(int width) {',
  '        this.width = width;',
  '    }',
  '',
  '    public int getWidth() {',
  '        return width;',
  '    }',
  '}',
  '',
  '// Adapter: 호환되지 않는 인터페이스를 변환',
  'public class SquarePegAdapter implements RoundPeg {',
  '    private SquarePeg peg;',
  '',
  '    public SquarePegAdapter(SquarePeg peg) {',
  '        this.peg = peg;',
  '    }',
  '',
  '    @Override',
  '    public int getRadius() {',
  '        // 정사각형 못의 너비를 둥근 못의 반지름으로 변환',
  '        return (int)(peg.getWidth() * Math.sqrt(2) / 2);',
  '    }',
  '}',
  '',
  '// Client: 라운드 인터페이스만 사용',
  'public class RoundHole {',
  '    private int radius;',
  '',
  '    public RoundHole(int radius) {',
  '        this.radius = radius;',
  '    }',
  '',
  '    public int getRadius() {',
  '        return radius;',
  '    }',
  '',
  '    public boolean fits(RoundPeg peg) {',
  '        return this.radius >= peg.getRadius();',
  '    }',
  '}',
  '',
  '// 사용 예제',
  'public class Client {',
  '    public static void main(String[] args) {',
  '        RoundHole hole = new RoundHole(5);',
  '',
  '        // 호환되는 둥근 못',
  '        RoundPeg roundPeg = new ConcreteRoundPeg(5);',
  '        System.out.println(hole.fits(roundPeg)); // true',
  '',
  '        // 호환되지 않는 정사각형 못',
  '        SquarePeg squarePeg = new SquarePeg(5);',
  '        SquarePegAdapter adapter = new SquarePegAdapter(squarePeg);',
  '        System.out.println(hole.fits(adapter)); // true',
  '    }',
  '}',
];

/**
 * 코드 스텝 정의
 * 각 단계는 애니메이션과 정확히 동기화됨
 */
const codeSteps = [
  {
    stepIndex: 0,
    highlightLines: [2, 3, 4],
    codeContext: 'interface RoundPeg - 타겟 인터페이스 정의',
  },
  {
    stepIndex: 1,
    highlightLines: [20, 27],
    codeContext: 'class SquarePeg - 호환되지 않는 기존 클래스',
  },
  {
    stepIndex: 2,
    highlightLines: [33, 41, 43],
    codeContext: 'class SquarePegAdapter - 호환되지 않는 인터페이스를 변환',
  },
  {
    stepIndex: 3,
    highlightLines: [48, 55, 59],
    codeContext: 'class RoundHole - RoundPeg만 이해하는 클라이언트',
  },
  {
    stepIndex: 4,
    highlightLines: [65, 67],
    codeContext: 'RoundHole hole = new RoundHole(5); - 클라이언트 인스턴스 생성',
  },
  {
    stepIndex: 5,
    highlightLines: [69, 70],
    codeContext: 'RoundPeg roundPeg = new ConcreteRoundPeg(5); - 호환되는 객체 생성',
  },
  {
    stepIndex: 6,
    highlightLines: [71, 60],
    codeContext: 'hole.fits(roundPeg) - 호환되는 인터페이스 테스트 (성공)',
  },
  {
    stepIndex: 7,
    highlightLines: [74],
    codeContext: 'SquarePeg squarePeg = new SquarePeg(5); - 호환되지 않는 객체 생성',
  },
  {
    stepIndex: 8,
    highlightLines: [75, 33, 36],
    codeContext: 'SquarePegAdapter adapter = new SquarePegAdapter(squarePeg); - 어댑터로 감싸기',
  },
  {
    stepIndex: 9,
    highlightLines: [42, 43],
    codeContext: 'adapter.getRadius() = width U+0078 √2 ÷ 2 - 인터페이스 변환 완료',
  },
  {
    stepIndex: 10,
    highlightLines: [76, 60],
    codeContext: 'hole.fits(adapter) - 어댑터를 통한 호환성 해결',
  },
];

/**
 * 애니메이션 스텝 정의
 * 각 단계에서 코드 하이라이트와 동기화된 상태 변경
 */
const animationSteps: Array<{ stepIndex: number; state: AdapterAnimationState }> = [
  {
    stepIndex: 0,
    state: {
      squarePegWidth: undefined,
      roundPegRadius: undefined,
      adapterActive: false,
      isConverting: false,
      fits: null,
      resultMessage: 'RoundPeg 인터페이스 정의 - 모든 라운드 객체가 구현해야 할 계약',
    },
  },
  {
    stepIndex: 1,
    state: {
      squarePegWidth: undefined,
      roundPegRadius: undefined,
      adapterActive: false,
      isConverting: false,
      fits: null,
      resultMessage: 'SquarePeg 클래스 - 호환되지 않는 인터페이스 (getWidth만 있음)',
    },
  },
  {
    stepIndex: 2,
    state: {
      squarePegWidth: undefined,
      roundPegRadius: undefined,
      adapterActive: false,
      isConverting: false,
      fits: null,
      resultMessage: 'SquarePegAdapter - 호환되지 않는 인터페이스를 RoundPeg로 변환',
    },
  },
  {
    stepIndex: 3,
    state: {
      squarePegWidth: undefined,
      roundPegRadius: undefined,
      adapterActive: false,
      isConverting: false,
      fits: null,
      resultMessage: 'RoundHole 클라이언트 - RoundPeg 인터페이스만 이해 가능',
    },
  },
  {
    stepIndex: 4,
    state: {
      squarePegWidth: undefined,
      roundPegRadius: undefined,
      adapterActive: false,
      isConverting: false,
      fits: null,
      resultMessage: 'RoundHole 인스턴스 생성 - radius 5',
    },
  },
  {
    stepIndex: 5,
    state: {
      squarePegWidth: undefined,
      roundPegRadius: 5,
      adapterActive: false,
      isConverting: false,
      fits: null,
      resultMessage: 'RoundPeg 인스턴스 생성 - radius 5 (호환되는 인터페이스)',
    },
  },
  {
    stepIndex: 6,
    state: {
      squarePegWidth: undefined,
      roundPegRadius: 5,
      adapterActive: false,
      isConverting: false,
      fits: true,
      resultMessage: 'hole.fits(roundPeg) = true ✅ - 인터페이스가 호환되므로 성공',
    },
  },
  {
    stepIndex: 7,
    state: {
      squarePegWidth: 5,
      roundPegRadius: undefined,
      adapterActive: false,
      isConverting: false,
      fits: null,
      resultMessage: 'SquarePeg 인스턴스 생성 - width 5 (호환되지 않는 인터페이스)',
    },
  },
  {
    stepIndex: 8,
    state: {
      squarePegWidth: 5,
      roundPegRadius: undefined,
      adapterActive: true,
      isConverting: true,
      fits: null,
      resultMessage: 'SquarePegAdapter로 감싸기 - 호환되지 않는 인터페이스 변환 중',
    },
  },
  {
    stepIndex: 9,
    state: {
      squarePegWidth: 5,
      roundPegRadius: 4,
      adapterActive: true,
      isConverting: false,
      fits: null,
      resultMessage: 'adapter.getRadius() = 5 U+0078 √2 ÷ 2 ≈ 3.5 - 인터페이스 변환 완료',
    },
  },
  {
    stepIndex: 10,
    state: {
      squarePegWidth: 5,
      roundPegRadius: 4,
      adapterActive: true,
      isConverting: false,
      fits: true,
      resultMessage: 'hole.fits(adapter) = true ✅ - 어댑터를 통해 호환성 해결',
    },
  },
];

/**
 * Adapter 패턴 완전한 데이터 객체
 */
export const adapterPatternData: PatternData<AdapterAnimationState> = {
  metadata: {
    id: 'adapter',
    name: 'Adapter',
    nameKo: '어댑터',
    category: 'structural',
    description: '호환되지 않는 인터페이스를 가진 객체들이 협력할 수 있도록 하는 구조적 디자인 패턴입니다. 어댑터는 한 객체의 인터페이스를 다른 객체가 이해할 수 있도록 변환하는 중간 역할을 합니다.',
    whenToUse: '기존 클래스를 사용하고 싶지만 그 인터페이스가 나머지 코드와 호환되지 않을 때 사용합니다. 또한 타사 라이브러리나 레거시 코드를 새 시스템과 통합할 때 유용합니다.',
    useCases: [
      '서로 다른 API를 가진 타사 라이브러리 통합 (예: 음악 플레이어 라이브러리)',
      '레거시 코드와 새 코드 통합',
      '데이터 형식 변환 (XML을 JSON으로 변환)',
      '다국어 지원 (Character encoding 변환)',
    ],
    pros: [
      '기본 비즈니스 로직에서 인터페이스 변환 코드를 분리 (단일 책임 원칙)',
      '기존 클라이언트 코드를 손상시키지 않고 새로운 어댑터 추가 가능 (개방-폐쇄 원칙)',
      '호환되지 않는 인터페이스를 가진 객체들의 협력 가능',
    ],
    cons: [
      '다수의 새로운 인터페이스와 클래스가 필요하므로 코드 복잡성 증가',
      '때로는 서비스 클래스를 직접 변경하는 것이 더 간단할 수 있음',
    ],
    icon: '🔌',
  },
  javaCode,
  codeSteps,
  animationSteps,
  initialState,
};
