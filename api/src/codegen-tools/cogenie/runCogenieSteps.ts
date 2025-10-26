import { performance } from "perf_hooks";

import type { ConcreteCogenieStep } from "./CogenieStep.js";

import { logger } from "../../logging/index.js";

export async function runCogenieSteps(
  ...CogenieSteps: Array<ConcreteCogenieStep>
) {
  const cogenieStepNames = CogenieSteps.map((step) => step.name).join(", ");

  logger.info(
    runCogenieSteps.name,
    `Running cogenie step(s): ${cogenieStepNames}`,
  );

  const startTime = performance.now();

  // Run all cogenie steps asynchronously since they MUST be independent
  await Promise.all(
    CogenieSteps.map(async (CogenieStep) => {
      const cogenieStep = new CogenieStep();
      await cogenieStep.generate();
    }),
  );

  const endTime = performance.now();

  logger.info(
    runCogenieSteps.name,
    `Cogenie codegen completed, took ${Math.ceil(endTime - startTime)} ms to run ${CogenieSteps.length} modules`,
  );
}
