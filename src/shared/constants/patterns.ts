import type { PatternCategory } from "@/shared/types";

export type PatternNavItem = {
  id: string;
  name: string;
  nameKo: string;
  category: PatternCategory;
  implemented: boolean;
};

export const PATTERN_CATALOG: Record<PatternCategory, PatternNavItem[]> = {
  creational: [
    {
      id: "singleton",
      name: "Singleton",
      nameKo: "싱글톤",
      category: "creational",
      implemented: true,
    },
    {
      id: "factory-method",
      name: "Factory Method",
      nameKo: "팩토리 메서드",
      category: "creational",
      implemented: false,
    },
    {
      id: "abstract-factory",
      name: "Abstract Factory",
      nameKo: "추상 팩토리",
      category: "creational",
      implemented: false,
    },
    {
      id: "builder",
      name: "Builder",
      nameKo: "빌더",
      category: "creational",
      implemented: true,
    },
    {
      id: "prototype",
      name: "Prototype",
      nameKo: "프로토타입",
      category: "creational",
      implemented: false,
    },
  ],
  structural: [
    {
      id: "adapter",
      name: "Adapter",
      nameKo: "어댑터",
      category: "structural",
      implemented: true,
    },
    {
      id: "bridge",
      name: "Bridge",
      nameKo: "브리지",
      category: "structural",
      implemented: false,
    },
    {
      id: "composite",
      name: "Composite",
      nameKo: "컴포지트",
      category: "structural",
      implemented: false,
    },
    {
      id: "decorator",
      name: "Decorator",
      nameKo: "데코레이터",
      category: "structural",
      implemented: false,
    },
    {
      id: "facade",
      name: "Facade",
      nameKo: "퍼사드",
      category: "structural",
      implemented: false,
    },
    {
      id: "flyweight",
      name: "Flyweight",
      nameKo: "플라이웨이트",
      category: "structural",
      implemented: false,
    },
    {
      id: "proxy",
      name: "Proxy",
      nameKo: "프록시",
      category: "structural",
      implemented: false,
    },
  ],
  behavioral: [
    {
      id: "strategy",
      name: "Strategy",
      nameKo: "전략",
      category: "behavioral",
      implemented: true,
    },
    {
      id: "observer",
      name: "Observer",
      nameKo: "옵저버",
      category: "behavioral",
      implemented: false,
    },
    {
      id: "command",
      name: "Command",
      nameKo: "커맨드",
      category: "behavioral",
      implemented: false,
    },
    {
      id: "state",
      name: "State",
      nameKo: "상태",
      category: "behavioral",
      implemented: false,
    },
    {
      id: "template-method",
      name: "Template Method",
      nameKo: "템플릿 메서드",
      category: "behavioral",
      implemented: false,
    },
    {
      id: "chain-of-responsibility",
      name: "Chain of Responsibility",
      nameKo: "책임 연쇄",
      category: "behavioral",
      implemented: false,
    },
    {
      id: "mediator",
      name: "Mediator",
      nameKo: "중재자",
      category: "behavioral",
      implemented: false,
    },
    {
      id: "memento",
      name: "Memento",
      nameKo: "메멘토",
      category: "behavioral",
      implemented: false,
    },
    {
      id: "interpreter",
      name: "Interpreter",
      nameKo: "인터프리터",
      category: "behavioral",
      implemented: false,
    },
    {
      id: "iterator",
      name: "Iterator",
      nameKo: "반복자",
      category: "behavioral",
      implemented: false,
    },
    {
      id: "visitor",
      name: "Visitor",
      nameKo: "방문자",
      category: "behavioral",
      implemented: false,
    },
  ],
};

export const DEFAULT_PATTERN_BY_CATEGORY: Record<PatternCategory, string> = {
  creational: "singleton",
  structural: "adapter",
  behavioral: "strategy",
};
