import "../../global/bootstrapGlobalDefinitions.js";
import { logger } from "../../logging/index.js";
import { printGitStatus } from "../../utils/printGitStatus.js";
import { entSchemaCodegenCliHelp } from "./entSchemaCodegenCliHelp.js";
import { generatedSrcDirPathString } from "./generatedSrcDirPath.js";

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
    await printGitStatus(generatedSrcDirPathString);
    return;
  }

  logger.error(entSchemaCodegenCli.name, `Invalid codegen argument: ${arg}\n`);
  entSchemaCodegenCliHelp();
}

entSchemaCodegenCli();
