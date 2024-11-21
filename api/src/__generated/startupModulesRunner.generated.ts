/**
 * ********************* THIS IS A GENERATED FILE *****************************
 * ********************* DO NOT MODIFY OR FORMAT MANUALLY *********************
 *
 * This file is automatically generated with the module:
 * genStartupModuleRunner
 *
 * Generated hash in hex for code after this section is:
 * sha256(6f7a71278a0dff79490c39d57cdacbdeb4a3ebad9f5b9034f4b21527104d3338)
 */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable perfectionist/sort-exports */
import { logger } from "../logging/index.js";
import { unknownCatchToError } from "../utils/index.js";
import { st } from "./startupModulesBarrelFile.generated.js";

/**
 * Runner function that runs all the startup modules concurrently, and stops the
 * process if any of them fails.
 */
export async function startupModuleRunner() {
  try {
    await Promise.all([]);
  } catch (e) {
    const error = unknownCatchToError(e);

    logger.error(
      startupModuleRunner.name,
      "Failed while running Startup Module",
      error,
    );

    // Stop the entire process as this should not continue unless all startup
    // modules completed successfully.
    process.exit(1);
  }
}
