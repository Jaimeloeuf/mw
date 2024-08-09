import { logger } from "../logging/index.js";

import { genHttpRoutesTable } from "./genHttpRoutesTable/genHttpRoutesTable.js";

async function codegenEntrypoint() {
  logger.info(codegenEntrypoint.name, "Running codegen");

  const codegenModulePromises = [
    // List all codegen modules here manually
    // Although they will all run concurrently, they will be called sequentially
    genHttpRoutesTable(),
  ];

  await Promise.all(codegenModulePromises);

  logger.info(
    codegenEntrypoint.name,
    `Codegen completed, ran ${codegenModulePromises.length} modules`
  );
}

codegenEntrypoint();
