import "../../global/bootstrapGlobalDefinitions.js";
import { logger } from "../../logging/index.js";
import { entSchemaCodegenCliHelp } from "./entSchemaCodegenCliHelp.js";

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

  logger.error(entSchemaCodegenCli.name, `Invalid codegen argument: ${arg}\n`);
  entSchemaCodegenCliHelp();
}

entSchemaCodegenCli();
