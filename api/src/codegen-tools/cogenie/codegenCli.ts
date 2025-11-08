import "../../global/bootstrapGlobalDefinitions.js";
import { logger } from "../../logging/index.js";
import { cogenieRunAllSteps } from "./cogenieRunAllSteps.js";
import { cogenieRunOneStep } from "./cogenieRunOneStep.js";
import { printAllCogenieSteps } from "./printAllCogenieSteps.js";
import { printCogenieCliHelp } from "./printCogenieCliHelp.js";
import { showGitStatusOfGeneratedFolder } from "./showGitStatusOfGeneratedFolder.js";
import { validateGeneratedFiles } from "./validateGeneratedFiles.js";

async function codegenCli() {
  // No extra arguments, show help menu
  if (process.argv.length === 2) {
    printCogenieCliHelp();
    return;
  }

  const arg = process.argv.at(-1) ?? "";

  // Help menu
  if (arg === "help") {
    printCogenieCliHelp();
    return;
  }

  // List out all cogenie steps
  if (arg === "list") {
    printAllCogenieSteps();
    return;
  }

  // Validate all existing cogenie generated files
  if (arg === "validate") {
    await validateGeneratedFiles();
    return;
  }

  // Run all cogenie steps
  if (arg === "all") {
    await cogenieRunAllSteps();
    await showGitStatusOfGeneratedFolder();
    return;
  }

  // Run a single cogenie step
  if (arg.startsWith("Gen")) {
    await cogenieRunOneStep(arg);
    await showGitStatusOfGeneratedFolder();
    return;
  }

  logger.error(codegenCli.name, `Invalid codegen argument: ${arg}\n`);
  printCogenieCliHelp();
}

codegenCli();
