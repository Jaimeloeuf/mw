import "../../global/bootstrapGlobalDefinitions.js";
import { printGitStatus } from "../../codegen-lib/index.js";
import { logger } from "../../logging/index.js";
import { entSchemaCodegen, codegenCrudOperators } from "./entSchemaCodegen.js";
import { entSchemaCodegenCliHelp } from "./entSchemaCodegenCliHelp.js";
import { generatedSrcDirPathString } from "./generatedSrcDirPath.js";
import { importEntSchema } from "./importEntSchema.js";

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
    const entschema = await importEntSchema(arg);
    // @ts-ignore
    const entSchemaValidatedData = entschema.validateAndSetup();
    // @todo Run codegen in parallel after schema verification
    await entSchemaCodegen(entSchemaValidatedData);
    await codegenCrudOperators(entSchemaValidatedData);
    await printGitStatus(generatedSrcDirPathString);
    return;
  }

  logger.error(entSchemaCodegenCli.name, `Invalid codegen argument: ${arg}\n`);
  entSchemaCodegenCliHelp();
}

entSchemaCodegenCli();
