import { performance } from "perf_hooks";

import type { CodegenFunction } from "./CodegenFunction.js";

import { logger } from "../../logging/index.js";

export async function runCodegenModules(
  ...codegenFunctions: Array<CodegenFunction>
) {
  const codegenFunctionNames = codegenFunctions.map((fn) => fn.name).join(", ");

  logger.info(
    runCodegenModules.name,
    `Running codegen(s): ${codegenFunctionNames}`,
  );

  const startTime = performance.now();

  // Run all the codegen modules asynchronously since they MUST be independent
  await Promise.all(codegenFunctions.map((codegenModule) => codegenModule()));

  const endTime = performance.now();

  logger.info(
    runCodegenModules.name,
    `Codegen completed, took ${Math.ceil(endTime - startTime)} ms to run ${codegenFunctions.length} modules`,
  );
}
