import { logger } from "../logging/index.js";

import { genHttpRoutesTable } from "./genHttpRoutesTable/genHttpRoutesTable.js";

async function codegenEntrypoint() {
  logger.info(codegenEntrypoint.name, "Running codegen");

  await genHttpRoutesTable();
}

codegenEntrypoint();
