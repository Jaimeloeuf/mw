import { logger } from "../logging/index.js";
import type { CodegenFunction } from "./CodegenFunction.js";

export async function runCodegenModules(
  ...codegenModules: Array<CodegenFunction>
) {
  logger.info(runCodegenModules.name, "Running codegen");

  // Run all the codegen modules asynchronously since they MUST be independent
  await Promise.all(codegenModules.map((codegenModule) => codegenModule()));

  logger.info(
    runCodegenModules.name,
    `Codegen completed, ran ${codegenModules.length} modules`
  );
}
