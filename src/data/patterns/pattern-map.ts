import { singletonPatternData } from "./singleton.data";
import { strategyPatternData } from "./strategy.data";
import { adapterPatternData } from "./adapter.data";
import { builderPatternData } from "./builder.data";

export const patternDataById = {
  singleton: singletonPatternData,
  strategy: strategyPatternData,
  adapter: adapterPatternData,
  builder: builderPatternData,
} as const;
