import type { ConfigType } from "./ConfigType.js";

import { combinedConfig } from "./configMappings/combinedConfig.js";
import { loadAndValidateConfig } from "./loadAndValidateConfig.js";

/**
 * Run this on startup/bootstrap to load and validate all the required configs.
 *
 * Required configs are configs created with 'loadOnStartup' set to true in
 * `createConfig`.
 */

export function loadAndValidateRequiredConfigsOnStartup() {
  const configsToLoadAndValidateOnStartup = Object.entries(combinedConfig)
    .filter(([_, config]) => config.loadOnStartup)
    .map(([configName]) => configName as keyof ConfigType);

  return loadAndValidateConfig(configsToLoadAndValidateOnStartup);
}
