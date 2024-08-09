import { logger } from "../logging/index.js";
import { genHttpRoutesTable } from "./genHttpRoutesTable/genHttpRoutesTable.js";

export async function codegenRunAllModules() {
  logger.info(codegenRunAllModules.name, "Running codegen");

  const codegenModulePromises = [
    // List all codegen modules here manually
    // Although they will all run concurrently, they will be called sequentially
    genHttpRoutesTable(),
  ];

  await Promise.all(codegenModulePromises);

  logger.info(
    codegenRunAllModules.name,
    `Codegen completed, ran ${codegenModulePromises.length} modules`
  );
}
