import "../../../global/bootstrapGlobalDefinitions.js";
import { logger } from "../../../logging/index.js";
import { codegenRunAllModules } from "./codegenRunAllModules.js";
import { codegenRunSingleModule } from "./codegenRunSingleModule.js";
import { printAllCodegenModules } from "./printAllCodegenModules.js";
import { printCodegenCliHelp } from "./printCodegenCliHelp.js";
import { showGitStatusOfGeneratedFolder } from "./showGitStatusOfGeneratedFolder.js";
import { validateGeneratedFiles } from "./validateGeneratedFiles.js";

async function codegenCli() {
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

  // Validate all existing generated files
  if (arg === "validate") {
    await validateGeneratedFiles();
    return;
  }

  // Run all codegen modules
  if (arg === "all") {
    await codegenRunAllModules();
    await showGitStatusOfGeneratedFolder();
    return;
  }

  // Run a single codegen module
  if (arg.startsWith("gen")) {
    await codegenRunSingleModule(arg);
    await showGitStatusOfGeneratedFolder();
    return;
  }

  logger.error(codegenCli.name, `Invalid codegen argument: ${arg}\n`);
  printCodegenCliHelp();
}

codegenCli();
