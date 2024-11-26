import type { z } from "zod";

import type { createConfig } from "./createConfig.js";

/**
 * Get Value factory function, creates and return a 'getValue' function that
 * 1. Loads the config value with `configLoader` and run zod schema validation.
 * 1. Caches the config value for subsequent requests, unless user requests for
 * a `forceReload`.
 * 1. Returned function will either be sync/async depending on the
 * `configLoaderType` defined with `createConfig`.
 *
 * Note that the returned function can throw if either `configLoader` or `zod`
 * throws.
 */
export function getValueFF<
  const ConfigMapping extends ReturnType<typeof createConfig>,
  const ConfigType extends z.infer<ConfigMapping["schema"]>,
  const ConfigValueType extends
    () => ConfigMapping["configLoaderType"] extends "sync"
      ? ConfigType
      : Promise<ConfigType>,
>(configMapping: ConfigMapping) {
  if (configMapping.configLoaderType === "sync") {
    let value: ConfigValueType | null = null;

    return function (forceReload?: true): ConfigValueType {
      if (forceReload || value === null) {
        // Using parse instead of safe parse to let errors bubble up
        value = configMapping.schema.parse(configMapping.configLoader());
      }

      // Using non-null assertion operator here since we are sure after the
      // previous null check that this will definitely be set already.
      return value!;
    };
  }

  /* For async config loaders */
  let value: ConfigValueType | null = null;

  return function (forceReload?: true): ConfigValueType {
    if (forceReload || value === null) {
      value = configMapping
        .configLoader()
        .then((result: Awaited<ConfigValueType>) =>
          // Using parse instead of safe parse to let errors bubble up
          configMapping.schema.parse(result),
        );
    }

    // Using non-null assertion operator here since we are sure after the
    // previous null check that this will definitely be set already.
    return value!;
  };
}
