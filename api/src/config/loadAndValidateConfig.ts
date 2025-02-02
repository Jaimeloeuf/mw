import "dotenv/config";

import type { ZodIssue } from "zod";

import { ZodError } from "zod";

import type { ConfigType } from "./ConfigType.js";

import { logger } from "../logging/index.js";
import { json } from "../utils/index.js";
import { config } from "./config.js";

/**
 * Given a list of config names, load them using their `configLoader`s and
 * validate them using their zod schema, and record all errors. If there are any
 * errors, log all the errors and quit the current process.
 *
 * Below is a sample function call to be placed in a repo bootstrap function, to
 * only allow the repo to be bootstrapped if all the specified required config
 * values are available.
 * ```typescript
 * validateConfig(["async_token_from_secretservice", "muwno_recaptcha_secret"]);
 * ```
 */
export async function loadAndValidateConfig(
  namesOfConfigToValidate: Array<keyof ConfigType>,
) {
  const errors: Array<ZodIssue | string> = [];

  // Instead of awaiting one by one in a loop, run all of them concurrently.
  const loadAndValidatePromises = namesOfConfigToValidate.map(
    async (configName) => {
      try {
        await config[configName]();
      } catch (error) {
        if (error instanceof ZodError) {
          // Show both the error and what configName the error is for
          errors.push(
            ...error.errors.map((issue) => ({ configName, ...issue })),
          );
        } else {
          errors.push(
            error?.toString() ?? `Unknown Error validating: ${configName}`,
          );
        }
      }
    },
  );

  await Promise.all(loadAndValidatePromises);

  if (errors.length > 0) {
    logger.error(
      loadAndValidateConfig.name,
      `Failed to load and validate config value(s)`,
      json.stringifyPretty(errors),
    );
    process.exit(1);
  }
}
