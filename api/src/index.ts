import { registerGlobalUncaughtIssueHandlers } from "./registerGlobalUncaughtIssueHandlers.js";
import { config } from "./config/index.js";
import { bootstrapHttpServer } from "./http/index.js";

/**
 * All bootstrapping calls wrapped in async main function to ensure they run
 * sequentially and only run the next one after each is complete.
 */
async function main() {
  registerGlobalUncaughtIssueHandlers();

  // config bootstrapper is ran as part of import process, it is used here to
  // prevent unused variable linting issue.
  config;

  bootstrapHttpServer();
}

main();
