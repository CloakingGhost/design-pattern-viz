import type {
  FactoryMethodPatternData,
  FactoryMethodAnimationState,
} from "@/shared/types";

/**
 * 초기 상태
 */
const initialState: FactoryMethodAnimationState = {
  currentFactory: null,
  paymentType: null,
  financialInfo: null,
  createdPayment: null,
  paymentResult: null,
  resultMessage: "팩토리 메서드 패턴: 객체 생성을 서브클래스에 위임합니다.",
};

/**
 * Factory Method 패턴 Java 코드
 */
const javaCode = [
  "// 1. Payment Interface",
  "interface Payment {",
  "    void processPayment();",
  "}",
  "",
  "// 2. Concrete Product",
  "class CreditCardPayment implements Payment {",
  "    public CreditCardPayment(String cardNumber) { ... }",
  "    public void processPayment() {",
  '        System.out.println("신용카드 결제 완료");',
  "    }",
  "}",
  "",
  "class PayPalPayment implements Payment {",
  "    public PayPalPayment(String email) { ... }",
  "    public void processPayment() {",
  '        System.out.println("PayPal 결제 완료");',
  "    }",
  "}",
  "",
  "// 3. Abstract Factory",
  "abstract class PaymentFactory {",
  "    abstract Payment createPayment(FinancialInfo info);",
  "}",
  "",
  "// 4. Concrete Factory",
  "class CreditCardFactory extends PaymentFactory {",
  "    Payment createPayment(FinancialInfo info) {",
  "        return new CreditCardPayment(info.cardNumber);",
  "    }",
  "}",
  "",
  "class PayPalFactory extends PaymentFactory {",
  "    Payment createPayment(FinancialInfo info) {",
  "        return new PayPalPayment(info.email);",
  "    }",
  "}",
  "",
  "// Client Code",
  "class Client {",
  "    void main() {",
  "        // 데이터 준비",
  "        FinancialInfo info = new FinancialInfo(...);",
  "",
  "        // 팩토리 선택 및 생성 요청",
  "        PaymentFactory factory = new CreditCardFactory();",
  "        Payment payment = factory.createPayment(info);",
  "        payment.processPayment();",
  "",
  "        // 팩토리 변경",
  "        factory = new PayPalFactory();",
  "        payment = factory.createPayment(info);",
  "        payment.processPayment();",
  "    }",
  "}",
];

/**
 * 코드 스텝 정의
 */
const codeSteps = [
  {
    stepIndex: 0,
    highlightLines: [2, 3, 4],
    codeContext: "Payment 인터페이스 정의",
  },
  {
    stepIndex: 1,
    highlightLines: [7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19],
    codeContext: "Concrete Product 정의",
  },
  {
    stepIndex: 2,
    highlightLines: [41, 42, 43],
    codeContext: "FinancialInfo 클래스",
  },
  {
    stepIndex: 3,
    highlightLines: [21, 22, 23],
    codeContext: "Abstract Factory 정의",
  },
  {
    stepIndex: 4,
    highlightLines: [26, 27, 28, 29, 30, 31, 33, 34, 35, 36, 37],
    codeContext: "Concrete Factory 정의",
  },
  {
    stepIndex: 5,
    highlightLines: [42, 43],
    codeContext: "Client: 데이터 준비",
  },
  {
    stepIndex: 6,
    highlightLines: [46],
    codeContext: "Client: 신용카드 팩토리 선택",
  },
  {
    stepIndex: 7,
    highlightLines: [47],
    codeContext: "Client: 생성 요청 (createPayment)",
  },
  {
    stepIndex: 8,
    highlightLines: [28, 29],
    codeContext: "Factory: 객체 생성 (new CreditCardPayment)",
  },
  {
    stepIndex: 9,
    highlightLines: [47],
    codeContext: "Client: 생성된 객체 수령",
  },
  {
    stepIndex: 10,
    highlightLines: [48],
    codeContext: "Client: 결제 실행 (processPayment)",
  },
  {
    stepIndex: 11,
    highlightLines: [51],
    codeContext: "Client: 팩토리 변경 (PayPal)",
  },
  {
    stepIndex: 12,
    highlightLines: [52],
    codeContext: "Client: 생성 요청 (PayPal)",
  },
  {
    stepIndex: 13,
    highlightLines: [35, 36],
    codeContext: "Factory: 객체 생성 (new PayPalPayment)",
  },
  {
    stepIndex: 14,
    highlightLines: [53],
    codeContext: "Client: 결제 실행 (PayPal)",
  },
];

/**
 * 애니메이션 스텝 정의 (15단계)
 */
const animationSteps: Array<{
  stepIndex: number;
  state: FactoryMethodAnimationState;
}> = [
  {
    stepIndex: 0,
    state: {
      ...initialState,
      resultMessage: "Payment 인터페이스: 모든 결제 수단의 공통 규약입니다.",
    },
  },
  {
    stepIndex: 1,
    state: {
      ...initialState,
      resultMessage:
        "Concrete Product: 실제 결제 기능을 구현하는 클래스들입니다.",
    },
  },
  {
    stepIndex: 2,
    state: {
      ...initialState,
      resultMessage: "Financial Info: 결제에 필요한 데이터 구조입니다.",
    },
  },
  {
    stepIndex: 3,
    state: {
      ...initialState,
      resultMessage:
        "Abstract Factory: 객체 생성 메서드(createPayment)를 선언합니다.",
    },
  },
  {
    stepIndex: 4,
    state: {
      ...initialState,
      resultMessage: "Concrete Factory: 각 제품에 맞는 생성 로직을 구현합니다.",
    },
  },
  {
    stepIndex: 5,
    state: {
      ...initialState,
      financialInfo: { cardNumber: "1234-5678", email: "user@example.com" },
      resultMessage: "Client가 결제 정보를 준비합니다.",
    },
  },
  {
    stepIndex: 6,
    state: {
      ...initialState,
      financialInfo: { cardNumber: "1234-5678", email: "user@example.com" },
      currentFactory: "CreditCardPaymentFactory",
      resultMessage: "Client가 신용카드 팩토리를 선택(생성)합니다.",
    },
  },
  {
    stepIndex: 7,
    state: {
      ...initialState,
      financialInfo: { cardNumber: "1234-5678", email: "user@example.com" },
      currentFactory: "CreditCardPaymentFactory",
      resultMessage: "Client가 factory.createPayment()를 호출합니다.",
    },
  },
  {
    stepIndex: 8,
    state: {
      ...initialState,
      financialInfo: { cardNumber: "1234-5678", email: "user@example.com" },
      currentFactory: "CreditCardPaymentFactory",
      paymentType: "CreditCardPayment", // 생성 중 시각화
      resultMessage:
        "Factory가 내부적으로 new CreditCardPayment()를 호출합니다.",
    },
  },
  {
    stepIndex: 9,
    state: {
      ...initialState,
      financialInfo: { cardNumber: "1234-5678", email: "user@example.com" },
      currentFactory: "CreditCardPaymentFactory",
      createdPayment: "CreditCardPayment",
      resultMessage: "생성된 신용카드 결제 객체가 Client에게 반환됩니다.",
    },
  },
  {
    stepIndex: 10,
    state: {
      ...initialState,
      financialInfo: { cardNumber: "1234-5678", email: "user@example.com" },
      currentFactory: "CreditCardPaymentFactory",
      createdPayment: "CreditCardPayment",
      paymentResult: "신용카드 결제 완료: 10,000원",
      resultMessage: "Client가 payment.processPayment()를 실행합니다.",
    },
  },
  {
    stepIndex: 11,
    state: {
      ...initialState,
      financialInfo: { cardNumber: "1234-5678", email: "user@example.com" },
      currentFactory: "PayPalPaymentFactory",
      resultMessage: "Client가 PayPal 팩토리로 교체합니다.",
    },
  },
  {
    stepIndex: 12,
    state: {
      ...initialState,
      financialInfo: { cardNumber: "1234-5678", email: "user@example.com" },
      currentFactory: "PayPalPaymentFactory",
      resultMessage: "Client가 다시 createPayment()를 호출합니다.",
    },
  },
  {
    stepIndex: 13,
    state: {
      ...initialState,
      financialInfo: { cardNumber: "1234-5678", email: "user@example.com" },
      currentFactory: "PayPalPaymentFactory",
      paymentType: "PayPalPayment",
      resultMessage: "이번에는 Factory가 new PayPalPayment()를 생성합니다.",
    },
  },
  {
    stepIndex: 14,
    state: {
      ...initialState,
      financialInfo: { cardNumber: "1234-5678", email: "user@example.com" },
      currentFactory: "PayPalPaymentFactory",
      createdPayment: "PayPalPayment",
      paymentResult: "PayPal 결제 완료: $10.00",
      resultMessage: "생성된 PayPal 객체로 결제를 실행합니다.",
    },
  },
];

export const factoryMethodPatternData: FactoryMethodPatternData = {
  metadata: {
    id: "factory-method",
    name: "Factory Method",
    nameKo: "팩토리 메서드",
    category: "creational",
    description:
      "객체 생성을 서브클래스에 위임하여, 부모 클래스가 구체적인 제품 클래스를 몰라도 객체를 생성할 수 있게 하는 패턴입니다.",
    whenToUse:
      "생성할 객체의 클래스를 예측할 수 없거나, 객체 생성을 서브클래스에게 위임하고 싶을 때 사용합니다.",
    useCases: [
      "다양한 문서 포맷(PDF, HTML) 생성기",
      "다양한 결제 수단 처리 시스템",
      "크로스 플랫폼 UI 컴포넌트 생성",
    ],
    pros: [
      "객체 생성 코드를 한 곳(Factory)으로 분리하여 결합도를 낮춤",
      "새로운 제품(Product) 추가 시 클라이언트 코드를 수정할 필요 없음 (OCP)",
    ],
    cons: [
      "패턴을 적용하면 많은 클래스(ConcreteFactory)가 생성되어 구조가 복잡해질 수 있음",
    ],
    icon: "🏭",
  },
  javaCode,
  codeSteps,
  animationSteps,
  initialState,
};
