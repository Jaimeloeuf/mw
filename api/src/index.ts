import { startupModuleRunner } from "./__generated/index.js";
import { config } from "./config/index.js";
import { bootstrapDal } from "./dal/index.js";
import { bootstrapHttpServer } from "./http/index.js";
import { logger } from "./logging/index.js";
import { registerGlobalUncaughtIssueHandlers } from "./registerGlobalUncaughtIssueHandlers.js";

/**
 * All bootstrapping calls wrapped in async main function to ensure they run
 * sequentially and only run the next one after each is complete.
 */
async function main() {
  registerGlobalUncaughtIssueHandlers();

  // config bootstrapper is ran as part of import process, it is used here to
  // prevent unused variable linting issue.
  logger.info(main.name, `Env: ${config.env()}`);

  await bootstrapDal();

  await startupModuleRunner();

  bootstrapHttpServer();
}

main();
