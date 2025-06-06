import "./global/bootstrapGlobalDefinitions.js";

// Import these after global import which runs global side effects
import { startupModuleRunner } from "./__generated/index.js";
import { bootstrapAsyncJobForWebTier } from "./async/bootstrapAsyncJobForWebTier.js";
import {
  loadAndValidateRequiredConfigsOnStartup,
  config,
} from "./config/index.js";
import { bootstrapDal } from "./dal/index.js";
import { registerGlobalUncaughtIssueHandlers } from "./global/index.js";
import { bootstrapHttpServer } from "./http/index.js";
import { logger } from "./logging/index.js";

/**
 * All bootstrapping calls wrapped in async main function to ensure they run
 * sequentially and only run the next one after each is complete.
 */
async function main() {
  registerGlobalUncaughtIssueHandlers();

  await loadAndValidateRequiredConfigsOnStartup();

  logger.info(main.name, `Env: ${config.env()}`);

  await bootstrapDal();

  await startupModuleRunner();

  await bootstrapHttpServer();

  await bootstrapAsyncJobForWebTier();
}

main();
