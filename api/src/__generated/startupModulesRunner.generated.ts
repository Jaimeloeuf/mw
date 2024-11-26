/**
 * ********************* THIS IS A GENERATED FILE *****************************
 * ********************* DO NOT MODIFY OR FORMAT MANUALLY *********************
 *
 * This file is automatically generated with the module:
 * genStartupModuleRunner
 *
 * Generated hash in hex for code after this section is:
 * sha256(42d46156d9f51d93e5b365e47393ad83ef424193a107a6827430822d7ec4b6a2)
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
    logger.info(startupModuleRunner.name, "Running (2) Startup Modules");

    await Promise.all([
      logBeforeRun(st.telegramRegisterAllTelegramBotCommands)(),
      logBeforeRun(st.telegramRegisterAllTelegramBotWebhookUrls)(),
    ]);
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

const logBeforeRun = (fn: () => any) =>
  async function () {
    logger.verbose(`${startupModuleRunner.name}:${fn.name}`, "Start");
    await fn();
    logger.verbose(`${startupModuleRunner.name}:${fn.name}`, "Completed");
  };
