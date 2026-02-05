import { singletonPatternData } from "./singleton.data";
import { strategyPatternData } from "./strategy.data";

export const patternDataById = {
  singleton: singletonPatternData,
  strategy: strategyPatternData,
} as const;

export type ImplementedPatternId = keyof typeof patternDataById;
