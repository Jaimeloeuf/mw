import { logger } from "../logging/index.js";

import { codegenRunAllModules } from "./codegenRunAllModules.js";

async function codegenEntrypoint() {
  // No extra arguments, run all codegen modules
  if (process.argv.length === 2) {
    await codegenRunAllModules();
    return;
  }

  logger.error(codegenEntrypoint.name, `Invalid codegen argument: ${arg}`);
}

codegenEntrypoint();
