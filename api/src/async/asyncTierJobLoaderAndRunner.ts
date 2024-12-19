import { df } from "../__generated/index.js";
import { logger } from "../logging/index.js";
import { noThrowFunction } from "../utils/index.js";
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
    const errMsg = `AsyncJobType ID '${asyncJob.jobTypeID}' not found, it might be deleted`;

    asyncJob.status = AsyncJobStatus.finishFail;
    asyncJob.jobResult = {
      success: false,
      description: errMsg,
    };

    await df.asyncUpdateJob.runAndThrowOnError(asyncJob);

    logger.error(asyncTierJobLoaderAndRunner.name, errMsg);

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

    if (argsParsingErr !== null) {
      const errMsg =
        `Invalid Async Job arguments for '${asyncJobType.name}' ` +
        argsParsingErr.toString();

      asyncJob.status = AsyncJobStatus.finishFail;
      asyncJob.jobResult = {
        success: false,
        description: errMsg,
      };

      await df.asyncUpdateJob.runAndThrowOnError(asyncJob);

      logger.error(asyncTierJobLoaderAndRunner.name, errMsg);

      return;
    }

    jobArguments = args;
  }

  asyncJob.status = AsyncJobStatus.started;
  asyncJob.timeStart = new Date().toISOString();
  await df.asyncUpdateJob.runAndThrowOnError(asyncJob);

  const [runError, runResults] = await noThrowFunction(() =>
    asyncJobType.run(jobArguments),
  );

  if (runError !== null) {
    asyncJob.timeFinish = new Date().toISOString();
    asyncJob.status = AsyncJobStatus.finishFail;
    asyncJob.jobResult = {
      success: false,
      description: runError.message,
    };

    await df.asyncUpdateJob.runAndThrowOnError(asyncJob);

    logger.error(asyncTierJobLoaderAndRunner.name, runError.message);

    return;
  }

  asyncJob.timeFinish = new Date().toISOString();
  asyncJob.jobResult = runResults;
  asyncJob.status = runResults.success
    ? AsyncJobStatus.finishSuccess
    : AsyncJobStatus.finishFail;

  await df.asyncUpdateJob.runAndThrowOnError(asyncJob);

  logger.info(
    asyncTierJobLoaderAndRunner.name,
    `Succesfully completed AsyncJob ${asyncJobType.name}:${asyncJob.id}`,
  );
}
