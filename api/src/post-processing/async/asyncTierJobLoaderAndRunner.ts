import { df } from "../../__generated/index.js";
import { logger } from "../../logging/index.js";
import { AsyncJobMachineType } from "./AsyncJobMachineType.js";
import { AsyncJobStatus } from "./AsyncJobStatus.js";
import { mappingOfAsyncJobs } from "./mappingOfAsyncJobs.js";
import { validateJobArgumentOnRead } from "./validateJobArgumentOnRead.js";

/**
 * Finds and load jobs from DB to run one by one.
 */
export async function asyncTierJobLoaderAndRunner() {
  logger.info(
    asyncTierJobLoaderAndRunner.name,
    "Looking for Async Job to run...",
  );

  const asyncJob = await df.asyncGetNextJobToProcess.runAndThrowOnError({
    machineType: AsyncJobMachineType.web,
  });

  if (asyncJob === null) {
    logger.nonProdVerbose(
      asyncTierJobLoaderAndRunner.name,
      "No Async Job found",
    );
    return;
  }

  logger.info(
    asyncTierJobLoaderAndRunner.name,
    `Found Async Job to run: ${asyncJob.id}`,
  );

  const asyncJobTypeModule = mappingOfAsyncJobs[asyncJob.jobTypeID];

  if (asyncJobTypeModule === undefined) {
    logger.error(
      asyncTierJobLoaderAndRunner.name,
      `AsyncJobType ID '${asyncJob.jobTypeID}' not found, it might be deleted`,
    );
    // @todo Might throw an error instead
    return;
  }

  // Get the default export of the AsyncJobType definition file
  const { default: asyncJobType } = await asyncJobTypeModule();

  let jobArguments = null;

  if (asyncJob.jobArguments !== null) {
    const [argsParsingErr, args] = validateJobArgumentOnRead(
      asyncJobType,
      asyncJob.jobArguments,
    );

    // @todo If args failed validation, write to DB that it failed, then exit...
    if (argsParsingErr !== null) {
      logger.error(
        asyncTierJobLoaderAndRunner.name,
        `Invalid Async Job arguments for '${asyncJobType.name}' ` +
          argsParsingErr.toString(),
      );
      // @todo Might throw an error instead
      return;
    }

    jobArguments = args;
  }

  asyncJob.status = AsyncJobStatus.started;
  asyncJob.timeStart = new Date().toISOString();

  const results = await asyncJobType.run(jobArguments);

  asyncJob.status = results.success
    ? AsyncJobStatus.finishSuccess
    : AsyncJobStatus.finishFail;
  asyncJob.timeFinish = new Date().toISOString();
  asyncJob.jobResult = results;

  // @todo Write the updated jobData object back to DB
  asyncJob;
}
