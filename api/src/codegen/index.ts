import { logger } from "../logging/index.js";

import { codegenRunAllModules } from "./codegenRunAllModules.js";
import { codegenRunSingleModule } from "./codegenRunSingleModule.js";
import { printCodegenCliHelp } from "./printCodegenCliHelp.js";
import { printAllCodegenModules } from "./printAllCodegenModules.js";
import { genCodegenBarrelFile } from "./genCodegenBarrelFile.js";

async function codegenEntrypoint() {
  // No extra arguments, show help menu
  if (process.argv.length === 2) {
    printCodegenCliHelp();
    return;
  }

  const arg = process.argv.at(-1) ?? "";

  // Help menu
  if (arg === "help") {
    printCodegenCliHelp();
    return;
  }

  // List out all codegen modules
  if (arg === "list") {
    printAllCodegenModules();
    return;
  }

  // Run all codegen modules
  if (arg === "all") {
    await codegenRunAllModules();
    await genCodegenBarrelFile();
    return;
  }

  // Run a single codegen module
  if (arg.startsWith("gen")) {
    await codegenRunSingleModule(arg);
    await genCodegenBarrelFile();
    return;
  }

  logger.error(codegenEntrypoint.name, `Invalid codegen argument: ${arg}\n`);
  printCodegenCliHelp();
}

codegenEntrypoint();