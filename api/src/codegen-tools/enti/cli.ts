import "../../global/bootstrapGlobalDefinitions.js";
import { printGitStatus } from "../../codegen-lib/index.js";
import { logger } from "../../logging/index.js";
import { entSchemaCodegen, codegenCrudOperators } from "./entSchemaCodegen.js";
import { entSchemaCodegenCliHelp } from "./entSchemaCodegenCliHelp.js";
import { generatedSrcDirPathString } from "./generatedSrcDirPath.js";

async function entSchemaCodegenCli() {
  // @todo WIP TESTING ONLY
  if (true == true) {
    const { EntJohariSchema } = await import(
      "../../entschema/EntJohariSchema.js"
    );
    const entSchemaValidatedData = EntJohariSchema.validateAndSetup();
    // @todo Run codegen in parallel after schema verification
    await entSchemaCodegen(entSchemaValidatedData);
    await codegenCrudOperators(entSchemaValidatedData);
    return;
  }

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
