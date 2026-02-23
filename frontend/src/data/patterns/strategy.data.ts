/**
 * Strategy 패턴 데이터
 * 
 * [모킹 전략 상세 설명]
 * 
 * Strategy 패턴은 알고리즘을 캡슐화하여 런타임에 교체할 수 있게 합니다.
 * Java의 동작을 TypeScript 상태 객체로 시뮬레이션합니다:
 * 
 * - Strategy 인터페이스 → availableStrategies 배열
 * - ConcreteStrategy 클래스들 → 각 전략의 이름과 동작
 * - Context 클래스 → currentStrategy와 isExecuting 상태
 * - setStrategy() → 전략 교체 시뮬레이션
 * - executeStrategy() → 전략 실행 시뮬레이션
 */

import type { StrategyPatternData, StrategyAnimationState } from '@/shared/types';

/**
 * 초기 상태
 */
const initialState: StrategyAnimationState = {
  currentStrategy: null,
  availableStrategies: ['CreditCardPayment', 'PayPalPayment', 'BitcoinPayment'],
  isExecuting: false,
  contextActive: false,
  resultMessage: '시작하려면 재생 버튼을 클릭하세요',
};

/**
 * Strategy 패턴 Java 코드
 * 결제 시스템을 예로 한 Strategy 패턴 구현
 */
const javaCode = [
  '// Strategy 인터페이스',
  'public interface PaymentStrategy {',
  '    void pay(int amount);',
  '}',
  '',
  '// ConcreteStrategy 1: 신용카드 결제',
  'public class CreditCardPayment implements PaymentStrategy {',
  '    private String cardNumber;',
  '',
  '    public CreditCardPayment(String cardNumber) {',
  '        this.cardNumber = cardNumber;',
  '    }',
  '',
  '    @Override',
  '    public void pay(int amount) {',
  '        System.out.println(amount + "원을 신용카드로 결제합니다.");',
  '    }',
  '}',
  '',
  '// ConcreteStrategy 2: PayPal 결제',
  'public class PayPalPayment implements PaymentStrategy {',
  '    private String email;',
  '',
  '    public PayPalPayment(String email) {',
  '        this.email = email;',
  '    }',
  '',
  '    @Override',
  '    public void pay(int amount) {',
  '        System.out.println(amount + "원을 PayPal로 결제합니다.");',
  '    }',
  '}',
  '',
  '// Context 클래스',
  'public class ShoppingCart {',
  '    private PaymentStrategy paymentStrategy;',
  '',
  '    public void setPaymentStrategy(PaymentStrategy strategy) {',
  '        this.paymentStrategy = strategy;',
  '    }',
  '',
  '    public void checkout(int amount) {',
  '        paymentStrategy.pay(amount);',
  '    }',
  '}',
  '',
  '// 클라이언트 코드',
  'public class Client {',
  '    public static void main(String[] args) {',
  '        ShoppingCart cart = new ShoppingCart();',
  '',
  '        // 신용카드 결제 전략 선택',
  '        cart.setPaymentStrategy(new CreditCardPayment("1234-5678"));',
  '        cart.checkout(50000);',
  '',
  '        // 런타임에 PayPal 결제로 전략 변경!',
  '        cart.setPaymentStrategy(new PayPalPayment("user@email.com"));',
  '        cart.checkout(30000);',
  '    }',
  '}',
];

/**
 * 코드 스텝 정의
 */
const codeSteps = [
  {
    stepIndex: 0,
    highlightLines: [2, 3, 4],
    codeContext: 'interface PaymentStrategy',
  },
  {
    stepIndex: 1,
    highlightLines: [7, 14, 15, 16, 17],
    codeContext: 'class CreditCardPayment implements PaymentStrategy',
  },
  {
    stepIndex: 2,
    highlightLines: [21, 28, 29, 30, 31],
    codeContext: 'class PayPalPayment implements PaymentStrategy',
  },
  {
    stepIndex: 3,
    highlightLines: [35, 36, 38, 39, 40],
    codeContext: 'class ShoppingCart (Context)',
  },
  {
    stepIndex: 4,
    highlightLines: [49],
    codeContext: 'ShoppingCart cart = new ShoppingCart()',
  },
  {
    stepIndex: 5,
    highlightLines: [52],
    codeContext: 'setPaymentStrategy(new CreditCardPayment(...))',
  },
  {
    stepIndex: 6,
    highlightLines: [42, 43, 44, 53],
    codeContext: 'cart.checkout(50000) → CreditCardPayment.pay()',
  },
  {
    stepIndex: 7,
    highlightLines: [56],
    codeContext: 'setPaymentStrategy(new PayPalPayment(...))',
  },
  {
    stepIndex: 8,
    highlightLines: [42, 43, 44, 57],
    codeContext: 'cart.checkout(30000) → PayPalPayment.pay()',
  },
  {
    stepIndex: 9,
    highlightLines: [38, 39, 40, 42, 43, 44],
    codeContext: 'Strategy Pattern Complete',
  },
];

/**
 * 애니메이션 스텝 정의
 */
const animationSteps: Array<{ stepIndex: number; state: StrategyAnimationState }> = [
  {
    stepIndex: 0,
    state: {
      currentStrategy: null,
      availableStrategies: ['CreditCardPayment', 'PayPalPayment', 'BitcoinPayment'],
      isExecuting: false,
      contextActive: false,
      resultMessage: '📋 Strategy 인터페이스 정의 - 모든 전략의 공통 계약',
    },
  },
  {
    stepIndex: 1,
    state: {
      currentStrategy: null,
      availableStrategies: ['CreditCardPayment', 'PayPalPayment', 'BitcoinPayment'],
      isExecuting: false,
      contextActive: false,
      resultMessage: '💳 CreditCardPayment 전략 구현 완료',
    },
  },
  {
    stepIndex: 2,
    state: {
      currentStrategy: null,
      availableStrategies: ['CreditCardPayment', 'PayPalPayment', 'BitcoinPayment'],
      isExecuting: false,
      contextActive: false,
      resultMessage: '🅿️ PayPalPayment 전략 구현 완료',
    },
  },
  {
    stepIndex: 3,
    state: {
      currentStrategy: null,
      availableStrategies: ['CreditCardPayment', 'PayPalPayment', 'BitcoinPayment'],
      isExecuting: false,
      contextActive: false,
      resultMessage: '🛒 ShoppingCart(Context) 클래스 준비 완료',
    },
  },
  {
    stepIndex: 4,
    state: {
      currentStrategy: null,
      availableStrategies: ['CreditCardPayment', 'PayPalPayment', 'BitcoinPayment'],
      isExecuting: false,
      contextActive: true,
      resultMessage: '🛒 ShoppingCart 인스턴스 생성!',
    },
  },
  {
    stepIndex: 5,
    state: {
      currentStrategy: 'CreditCardPayment',
      availableStrategies: ['CreditCardPayment', 'PayPalPayment', 'BitcoinPayment'],
      isExecuting: false,
      contextActive: true,
      resultMessage: '💳 신용카드 결제 전략 주입 완료!',
    },
  },
  {
    stepIndex: 6,
    state: {
      currentStrategy: 'CreditCardPayment',
      availableStrategies: ['CreditCardPayment', 'PayPalPayment', 'BitcoinPayment'],
      isExecuting: true,
      contextActive: true,
      resultMessage: '💳 신용카드로 50,000원 결제 중...',
    },
  },
  {
    stepIndex: 7,
    state: {
      currentStrategy: 'PayPalPayment',
      availableStrategies: ['CreditCardPayment', 'PayPalPayment', 'BitcoinPayment'],
      isExecuting: false,
      contextActive: true,
      resultMessage: '🔄 런타임에 전략 변경! → PayPal 결제',
    },
  },
  {
    stepIndex: 8,
    state: {
      currentStrategy: 'PayPalPayment',
      availableStrategies: ['CreditCardPayment', 'PayPalPayment', 'BitcoinPayment'],
      isExecuting: true,
      contextActive: true,
      resultMessage: '🅿️ PayPal로 30,000원 결제 중...',
    },
  },
  {
    stepIndex: 9,
    state: {
      currentStrategy: 'PayPalPayment',
      availableStrategies: ['CreditCardPayment', 'PayPalPayment', 'BitcoinPayment'],
      isExecuting: false,
      contextActive: true,
      resultMessage: '✨ 완료! 같은 인터페이스로 다른 알고리즘 실행',
    },
  },
];

/**
 * Strategy 패턴 완전한 데이터 객체
 */
export const strategyPatternData: StrategyPatternData = {
  metadata: {
    id: 'strategy',
    name: 'Strategy',
    nameKo: '전략',
    category: 'behavioral',
    description: '알고리즘을 캡슐화하여 동일 계열의 알고리즘군을 정의하고, 각 알고리즘을 상호 교환 가능하게 만듭니다. 클라이언트와 독립적으로 알고리즘을 변경할 수 있습니다.',
    whenToUse: '동일한 문제를 해결하는 여러 알고리즘이 있고, 런타임에 알고리즘을 선택하거나 교체해야 할 때 사용합니다. 조건문(if-else)으로 알고리즘을 선택하는 코드를 제거하고 싶을 때 유용합니다.',
    useCases: [
      '결제 시스템 (신용카드, PayPal, 암호화폐 등)',
      '정렬 알고리즘 선택 (퀵소트, 머지소트, 버블소트)',
      '압축 방식 선택 (ZIP, RAR, 7z)',
      '인증 방식 (OAuth, JWT, Session)',
    ],
    pros: [
      '런타임에 알고리즘 교체 가능',
      '알고리즘 코드를 분리하여 단일 책임 원칙 준수',
      '새로운 전략 추가가 용이 (개방-폐쇄 원칙)',
      '조건문 제거로 코드 가독성 향상',
    ],
    cons: [
      '전략 개수만큼 클래스 증가',
      '클라이언트가 전략들의 차이를 알아야 함',
      '간단한 알고리즘엔 오버엔지니어링일 수 있음',
    ],
    icon: '♟️',
  },
  javaCode,
  codeSteps,
  animationSteps,
  initialState,
};
