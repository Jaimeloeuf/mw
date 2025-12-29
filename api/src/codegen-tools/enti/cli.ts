import "../../global/bootstrapGlobalDefinitions.js";
import { logger } from "../../logging/index.js";
import { entSchemaCodegenCliHelp } from "./entSchemaCodegenCliHelp.js";
import { printGitStatusOfGeneratedFolder } from "./printGitStatusOfGeneratedFolder.js";

async function entSchemaCodegenCli() {
  // No extra arguments, show help menu
  if (process.argv.length === 2) {
    entSchemaCodegenCliHelp();
    return;
  }

  const arg = process.argv.at(-1) ?? "";

  // Help menu
  if (arg === "help") {
    entSchemaCodegenCliHelp();
    return;
  }

  // Codegen a single EntSchema
  if (arg.startsWith("Ent") && arg.endsWith("Schema")) {
    await printGitStatusOfGeneratedFolder();
    return;
  }

  logger.error(entSchemaCodegenCli.name, `Invalid codegen argument: ${arg}\n`);
  entSchemaCodegenCliHelp();
}

entSchemaCodegenCli();
