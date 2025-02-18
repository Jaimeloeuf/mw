import type { z } from "zod";

import type { ConfigLoader } from "../ConfigLoader.js";
import type { createConfig } from "./createConfig.js";

import { isPromise } from "../../utils/isPromise.js";

/**
 * Get Value factory function, creates and return a 'getValue' function that
 * 1. Loads the config value with `configLoader` and run zod schema validation.
 * 1. Caches the config value for subsequent requests, unless user requests for
 * a `forceReload`.
 *
 * Note that the returned function can throw if either `configLoader` or `zod`
 * throws.
 */
export function getValueFF<
  const ConfigMapping extends ReturnType<typeof createConfig>,
  const ConfigLoaderReturnType extends ReturnType<
    ConfigMapping["configLoader"]
  >,
  const ConfigValueType extends ConfigLoaderReturnType extends Promise<unknown>
    ? Promise<z.infer<ConfigMapping["schema"]>>
    : z.infer<ConfigMapping["schema"]>,
>(
  configName: string,
  configMapping: ConfigMapping,
): ConfigLoader<ConfigValueType> {
  /* For async config loaders */
  let value: $Nullable<ConfigValueType> = null;

  const getValue = (forceReload?: true): ConfigValueType => {
    if (forceReload || value === null) {
      const configLoaderResult = configMapping.configLoader();

      if (isPromise(configLoaderResult)) {
        value = configLoaderResult.then(
          (result: Awaited<ConfigLoaderReturnType>) =>
            // Using parse instead of safe parse to let errors bubble up
            configMapping.schema.parse(result),
        );
      } else {
        // Using parse instead of safe parse to let errors bubble up
        value = configMapping.schema.parse(configLoaderResult);
      }
    }

    // Using non-null assertion operator here since we are sure after the
    // previous null check that this will definitely be set already.
    return value!;
  };

  // Set function name to be `configName` so that users can dynamically use
  // .name to get the correct name instead of 'getValue' or 'anonymous'.
  // Equivalent to `getValue.name = configName;` but since name is readonly,
  // have to use object property definition.
  Object.defineProperty(getValue, "name", {
    value: configName,
    writable: false,
  });

  return getValue;
}
