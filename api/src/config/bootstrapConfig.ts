import "dotenv/config";

import type { ConfigType } from "./ConfigType.js";

import { combinedConfig } from "./configMappings/combinedConfig.js";
import { getValueFF } from "./utils/getValueFF.js";

export function bootstrapConfig() {
  const config: Partial<ConfigType> = {};

  for (const configName in combinedConfig) {
    const configMapping =
      combinedConfig[configName as keyof typeof combinedConfig];

    // @ts-ignore
    // Have to ts-ignore here in order for the type to work easily, see
    // https://github.com/microsoft/TypeScript/issues/32811
    // https://github.com/Microsoft/TypeScript/pull/12253#issuecomment-263132208
    // https://www.totaltypescript.com/iterate-over-object-keys-in-typescript#solution-1-cast-to-keyof-typeof
    // https://stackoverflow.com/questions/72282500/for-in-loop-converting-typescript-types-to-intersection
    // https://stackoverflow.com/questions/61829651/how-can-i-iterate-over-record-keys-in-a-proper-type-safe-way
    config[configName as keyof typeof combinedConfig] = getValueFF(
      configName,
      configMapping,
    );
  }

  return Object.freeze(config as ConfigType);
}
