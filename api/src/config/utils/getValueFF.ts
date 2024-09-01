import { z } from "zod";
import type { createConfigMapping } from "./createConfigMapping.js";

/**
 * Get Value factory function, creates and return a memoized function to get the
 * config value by only parsing the value the first time it is requested.
 *
 * The returned `getValue` function can throw if zod throws.
 */
export function getValueFF<
  const ConfigMapping extends ReturnType<typeof createConfigMapping>,
  const ConfigValue extends z.infer<ConfigMapping["schema"]>,
>(configMapping: ConfigMapping) {
  let value: ConfigValue | null = null;

  return function getValue(): ConfigValue {
    if (value === null) {
      // Using parse instead of safe parse to let errors bubble up
      value = configMapping.schema.parse(configMapping.datasource);
    }

    // Using non-null assertion operator here since we are sure after the
    // previous null check that this will definitely be set already.
    return value!;
  };
}
