import { registerGlobalUncaughtIssueHandlers } from "./registerGlobalUncaughtIssueHandlers.js";
import { bootstrapHttpServer } from "./http/index.js";

/**
 * All bootstrapping calls wrapped in async main function to ensure they run
 * sequentially and only run the next one after each is complete.
 */
async function main() {
  registerGlobalUncaughtIssueHandlers();
  bootstrapHttpServer();
}

main();
