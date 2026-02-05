import { singletonPatternData } from "./singleton.data";
import { strategyPatternData } from "./strategy.data";
import { adapterPatternData } from "./adapter.data";

export const patternDataById = {
  singleton: singletonPatternData,
  strategy: strategyPatternData,
  adapter: adapterPatternData,
} as const;

export type ImplementedPatternId = keyof typeof patternDataById;
