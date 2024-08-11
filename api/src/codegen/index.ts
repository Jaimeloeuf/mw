import { logger } from "../logging/index.js";

import { codegenRunAllModules } from "./codegenRunAllModules.js";
import { codegenRunSingleModule } from "./codegenRunSingleModule.js";
import { printAllCodegenModules } from "./printAllCodegenModules.js";

async function codegenEntrypoint() {
  // No extra arguments, run all codegen modules
  if (process.argv.length === 2) {
    await codegenRunAllModules();
    return;
  }

  // List out all codegen modules
  if (arg === "list") {
    printAllCodegenModules();
    return;
  }

  // Run a single codegen module
  if (arg.startsWith("gen")) {
    await codegenRunSingleModule(arg);
    return;
  }

  logger.error(codegenEntrypoint.name, `Invalid codegen argument: ${arg}`);
}

codegenEntrypoint();
