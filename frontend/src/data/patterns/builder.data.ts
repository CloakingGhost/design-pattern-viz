/**
 * Builder 패턴 데이터
 * 
 * [모킹 전략]
 * Builder 패턴의 핵심: 복잡한 객체의 생성 과정을 단계별로 분리하여 다양한 표현을 생성
 * 
 * 예제: 자동차(Car)와 매뉴얼(Manual) 만들기
 * - Director: 빌더를 사용해 제품을 조립하는 관리자
 * - Builder Interface: 생성 단계들을 정의한 인터페이스
 * - CarBuilder: 실제 Car 객체를 생성하는 구체적 빌더
 * - ManualBuilder: Car 매뉴얼을 생성하는 구체적 빌더
 * - Product: 최종 생성된 제품 (Car, Manual)
 */

import type { BuilderPatternData, BuilderAnimationState } from '@/shared/types';

/**
 * 초기 상태
 */
const initialState: BuilderAnimationState = {
  currentBuilder: null,
  directorActive: false,
  productType: null,
  buildSteps: [],
  isProductComplete: false,
  product: null,
  resultMessage: '재생 버튼을 클릭하여 Builder 패턴의 동작 방식을 확인하세요',
};

/**
 * Builder 패턴 Java 코드
 */
const javaCode = [
  '// Builder Interface: 생성 단계 정의',
  'public interface Builder {',
  '    void reset();',
  '    void setSeats(int number);',
  '    void setEngine(String engine);',
  '    void setTripComputer(boolean hasTripComputer);',
  '    void setGPS(boolean hasGPS);',
  '}',
  '',
  '// Product: Car',
  'public class Car {',
  '    private int seats;',
  '    private String engine;',
  '    private boolean tripComputer;',
  '    private boolean gps;',
  '    ',
  '    // Setters...',
  '    public String getDescription() {',
  '        return "Car with " + seats + " seats, " + engine + " engine";',
  '    }',
  '}',
  '',
  '// ConcreteBuilder: CarBuilder',
  'public class CarBuilder implements Builder {',
  '    private Car car;',
  '    ',
  '    public CarBuilder() {',
  '        this.reset();',
  '    }',
  '    ',
  '    public void reset() {',
  '        this.car = new Car();',
  '    }',
  '    ',
  '    public void setSeats(int number) {',
  '        car.setSeats(number);',
  '    }',
  '    ',
  '    public void setEngine(String engine) {',
  '        car.setEngine(engine);',
  '    }',
  '    ',
  '    public void setTripComputer(boolean hasTripComputer) {',
  '        car.setTripComputer(hasTripComputer);',
  '    }',
  '    ',
  '    public void setGPS(boolean hasGPS) {',
  '        car.setGPS(hasGPS);',
  '    }',
  '    ',
  '    public Car getResult() {',
  '        return this.car;',
  '    }',
  '}',
  '',
  '// ConcreteBuilder: ManualBuilder',
  'public class ManualBuilder implements Builder {',
  '    private Manual manual;',
  '    ',
  '    public ManualBuilder() {',
  '        this.reset();',
  '    }',
  '    ',
  '    public void reset() {',
  '        this.manual = new Manual();',
  '    }',
  '    ',
  '    public void setSeats(int number) {',
  '        manual.addPage("좌석 설치: " + number + "개");',
  '    }',
  '    ',
  '    public void setEngine(String engine) {',
  '        manual.addPage("엔진 설치: " + engine);',
  '    }',
  '    ',
  '    public void setTripComputer(boolean hasTripComputer) {',
  '        if (hasTripComputer) manual.addPage("트립 컴퓨터 설치");',
  '    }',
  '    ',
  '    public void setGPS(boolean hasGPS) {',
  '        if (hasGPS) manual.addPage("GPS 설치");',
  '    }',
  '    ',
  '    public Manual getResult() {',
  '        return this.manual;',
  '    }',
  '}',
  '',
  '// Director: 빌더를 사용해 제품 조립',
  'public class Director {',
  '    public void constructSportsCar(Builder builder) {',
  '        builder.reset();',
  '        builder.setSeats(2);',
  '        builder.setEngine("V8");',
  '        builder.setTripComputer(true);',
  '        builder.setGPS(true);',
  '    }',
  '    ',
  '    public void constructSUV(Builder builder) {',
  '        builder.reset();',
  '        builder.setSeats(7);',
  '        builder.setEngine("V6");',
  '        builder.setTripComputer(true);',
  '        builder.setGPS(false);',
  '    }',
  '}',
  '',
  '// 클라이언트 코드',
  'public class Client {',
  '    public static void main(String[] args) {',
  '        Director director = new Director();',
  '        ',
  '        // CarBuilder로 스포츠카 생성',
  '        CarBuilder carBuilder = new CarBuilder();',
  '        director.constructSportsCar(carBuilder);',
  '        Car car = carBuilder.getResult();',
  '        ',
  '        // ManualBuilder로 매뉴얼 생성',
  '        ManualBuilder manualBuilder = new ManualBuilder();',
  '        director.constructSportsCar(manualBuilder);',
  '        Manual manual = manualBuilder.getResult();',
  '    }',
  '}',
];

/**
 * 코드 스텝 정의
 */
const codeSteps = [
  {
    stepIndex: 0,
    highlightLines: [2, 3, 4, 5, 6, 7, 8],
    codeContext: 'interface Builder - 생성 단계 정의',
  },
  {
    stepIndex: 1,
    highlightLines: [24, 25, 26, 27, 28, 29],
    codeContext: 'class CarBuilder - 구체적 빌더',
  },
  {
    stepIndex: 2,
    highlightLines: [89, 90],
    codeContext: 'class Director - 조립 관리자',
  },
  {
    stepIndex: 3,
    highlightLines: [113, 114],
    codeContext: 'CarBuilder carBuilder = new CarBuilder();',
  },
  {
    stepIndex: 4,
    highlightLines: [115],
    codeContext: 'director.constructSportsCar(carBuilder);',
  },
  {
    stepIndex: 5,
    highlightLines: [91, 92],
    codeContext: 'builder.reset() - 빌더 초기화',
  },
  {
    stepIndex: 6,
    highlightLines: [93],
    codeContext: 'builder.setSeats(2) - 좌석 2개',
  },
  {
    stepIndex: 7,
    highlightLines: [94],
    codeContext: 'builder.setEngine("V8") - V8 엔진',
  },
  {
    stepIndex: 8,
    highlightLines: [95],
    codeContext: 'builder.setTripComputer(true) - 트립 컴퓨터',
  },
  {
    stepIndex: 9,
    highlightLines: [96],
    codeContext: 'builder.setGPS(true) - GPS',
  },
  {
    stepIndex: 10,
    highlightLines: [116],
    codeContext: 'Car car = carBuilder.getResult();',
  },
];

/**
 * 애니메이션 스텝 정의
 */
const animationSteps: Array<{ stepIndex: number; state: BuilderAnimationState }> = [
  {
    stepIndex: 0,
    state: {
      currentBuilder: null,
      directorActive: false,
      productType: null,
      buildSteps: [],
      isProductComplete: false,
      product: null,
      resultMessage: 'Builder 인터페이스 정의 - 생성 단계들의 공통 인터페이스',
    },
  },
  {
    stepIndex: 1,
    state: {
      currentBuilder: 'CarBuilder',
      directorActive: false,
      productType: null,
      buildSteps: [],
      isProductComplete: false,
      product: null,
      resultMessage: 'CarBuilder 구체적 빌더 - Car 객체를 생성',
    },
  },
  {
    stepIndex: 2,
    state: {
      currentBuilder: 'CarBuilder',
      directorActive: true,
      productType: null,
      buildSteps: [],
      isProductComplete: false,
      product: null,
      resultMessage: 'Director 생성 - 빌더를 사용해 제품을 조립하는 관리자',
    },
  },
  {
    stepIndex: 3,
    state: {
      currentBuilder: 'CarBuilder',
      directorActive: true,
      productType: null,
      buildSteps: [],
      isProductComplete: false,
      product: null,
      resultMessage: 'CarBuilder 인스턴스 생성',
    },
  },
  {
    stepIndex: 4,
    state: {
      currentBuilder: 'CarBuilder',
      directorActive: true,
      productType: 'SportsCar',
      buildSteps: [],
      isProductComplete: false,
      product: null,
      resultMessage: 'Director가 constructSportsCar 호출 - 스포츠카 조립 시작',
    },
  },
  {
    stepIndex: 5,
    state: {
      currentBuilder: 'CarBuilder',
      directorActive: true,
      productType: 'SportsCar',
      buildSteps: [
        { step: 'reset', completed: true },
      ],
      isProductComplete: false,
      product: null,
      resultMessage: '빌더 초기화 - 새로운 Car 객체 준비',
    },
  },
  {
    stepIndex: 6,
    state: {
      currentBuilder: 'CarBuilder',
      directorActive: true,
      productType: 'SportsCar',
      buildSteps: [
        { step: 'reset', completed: true },
        { step: 'setSeats', value: 2, completed: true },
      ],
      isProductComplete: false,
      product: null,
      resultMessage: '좌석 설정 - 2개의 스포츠카 좌석',
    },
  },
  {
    stepIndex: 7,
    state: {
      currentBuilder: 'CarBuilder',
      directorActive: true,
      productType: 'SportsCar',
      buildSteps: [
        { step: 'reset', completed: true },
        { step: 'setSeats', value: 2, completed: true },
        { step: 'setEngine', value: 'V8', completed: true },
      ],
      isProductComplete: false,
      product: null,
      resultMessage: '엔진 설정 - 강력한 V8 엔진',
    },
  },
  {
    stepIndex: 8,
    state: {
      currentBuilder: 'CarBuilder',
      directorActive: true,
      productType: 'SportsCar',
      buildSteps: [
        { step: 'reset', completed: true },
        { step: 'setSeats', value: 2, completed: true },
        { step: 'setEngine', value: 'V8', completed: true },
        { step: 'setTripComputer', value: 'true', completed: true },
      ],
      isProductComplete: false,
      product: null,
      resultMessage: '트립 컴퓨터 설정 - 주행 정보 표시',
    },
  },
  {
    stepIndex: 9,
    state: {
      currentBuilder: 'CarBuilder',
      directorActive: true,
      productType: 'SportsCar',
      buildSteps: [
        { step: 'reset', completed: true },
        { step: 'setSeats', value: 2, completed: true },
        { step: 'setEngine', value: 'V8', completed: true },
        { step: 'setTripComputer', value: 'true', completed: true },
        { step: 'setGPS', value: 'true', completed: true },
      ],
      isProductComplete: false,
      product: null,
      resultMessage: 'GPS 설정 - 내비게이션 시스템',
    },
  },
  {
    stepIndex: 10,
    state: {
      currentBuilder: 'CarBuilder',
      directorActive: false,
      productType: 'SportsCar',
      buildSteps: [
        { step: 'reset', completed: true },
        { step: 'setSeats', value: 2, completed: true },
        { step: 'setEngine', value: 'V8', completed: true },
        { step: 'setTripComputer', value: 'true', completed: true },
        { step: 'setGPS', value: 'true', completed: true },
      ],
      isProductComplete: true,
      product: 'SportsCar',
      resultMessage: 'getResult 호출 - 완성된 스포츠카 반환',
    },
  },
];

/**
 * Builder 패턴 완전한 데이터 객체
 */
export const builderPatternData: BuilderPatternData = {
  metadata: {
    id: 'builder',
    name: 'Builder',
    nameKo: '빌더',
    category: 'creational',
    description: '복잡한 객체를 단계별로 생성할 수 있도록 하는 생성 디자인 패턴입니다. 동일한 생성 코드를 사용하여 객체의 다양한 타입과 표현을 생성할 수 있습니다.',
    whenToUse: '생성자 매개변수가 많거나, 객체 생성 과정이 복잡할 때 사용합니다. 또한 동일한 생성 과정으로 다른 표현의 객체를 만들어야 할 때 유용합니다.',
    useCases: [
      '복잡한 UI 컴포넌트 생성 (다양한 옵션 조합)',
      'SQL 쿼리 빌더 (동적 쿼리 생성)',
      '문서 변환기 (PDF, HTML 등 다양한 형식)',
      '게임 캐릭터 생성 (다양한 능력치 조합)',
    ],
    pros: [
      '객체를 단계별로 생성하고 생성 단계를 지연시킬 수 있음',
      '동일한 생성 코드를 재사용하여 다양한 표현의 객체 생성 가능',
      '복잡한 생성 로직을 비즈니스 로직에서 분리 (단일 책임 원칙)',
    ],
    cons: [
      '패턴을 적용하려면 여러 새 클래스를 생성해야 하므로 코드 복잡성 증가',
      '간단한 객체에는 과도한 설계',
    ],
    icon: '🔨',
  },
  javaCode,
  codeSteps,
  animationSteps,
  initialState,
};
