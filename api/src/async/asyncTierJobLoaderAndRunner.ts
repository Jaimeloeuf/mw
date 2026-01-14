import { df, asyncJobTypeMapping } from "../__generated/index.js";
import { simpleLogger } from "../logging/index.js";
import { AsyncJobMachine } from "./AsyncJobMachine.js";
import { AsyncJobStatus } from "./AsyncJobStatus.js";
import { validateJobArgumentOnRead } from "./validateJobArgumentOnRead.js";

/**
 * Finds and load jobs from DB to run one by one.
 */
export async function asyncTierJobLoaderAndRunner() {
  simpleLogger.info(
    asyncTierJobLoaderAndRunner.name,
    "Looking for Async Job to run...",
  );

  const asyncJob = await df.asyncGetNextJobToProcess.runAndThrowOnError({
    machineType: AsyncJobMachine.web,
  });

  if (asyncJob === null) {
    simpleLogger.nonProdVerbose(
      asyncTierJobLoaderAndRunner.name,
      "No Async Job found",
    );
    return;
  }

  simpleLogger.info(
    asyncTierJobLoaderAndRunner.name,
    `Found Async Job to run: ${asyncJob.id}`,
  );

  const asyncJobTypeModule = asyncJobTypeMapping[asyncJob.jobTypeID];

  if (asyncJobTypeModule === undefined) {
    const errMsg = `AsyncJobType ID '${asyncJob.jobTypeID}' not found, it might be deleted`;

    asyncJob.status = AsyncJobStatus.finishFail;
    asyncJob.jobResult = {
      success: false,
      description: errMsg,
    };

    await df.asyncUpdateJob.runAndThrowOnError(asyncJob);

    simpleLogger.error(asyncTierJobLoaderAndRunner.name, errMsg);

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

      simpleLogger.error(asyncTierJobLoaderAndRunner.name, errMsg);

      return;
    }

    jobArguments = args;
  }

  asyncJob.status = AsyncJobStatus.started;
  asyncJob.timeStart = $DateTime.now.asIsoDateTime();
  await df.asyncUpdateJob.runAndThrowOnError(asyncJob);

  // @todo
  // Re-implement loader and runner to run jobs in child process to implement
  // timeouts (asyncJob.timeout) by killing child process at point of timeout,
  // since there is no primitives for doing this well in the same JS process.

  const [runError, runResults] = await $runAsyncFnSafely(
    asyncJobType.run.bind(asyncJobType, jobArguments),
  );

  if (runError !== null) {
    asyncJob.timeFinish = $DateTime.now.asIsoDateTime();
    asyncJob.status = AsyncJobStatus.finishFail;
    asyncJob.jobResult = {
      success: false,
      description: runError.message,
    };

    await df.asyncUpdateJob.runAndThrowOnError(asyncJob);

    simpleLogger.error(asyncTierJobLoaderAndRunner.name, runError.message);

    return;
  }

  asyncJob.timeFinish = $DateTime.now.asIsoDateTime();
  asyncJob.jobResult = runResults;
  asyncJob.status = runResults.success
    ? AsyncJobStatus.finishSuccess
    : AsyncJobStatus.finishFail;

  await df.asyncUpdateJob.runAndThrowOnError(asyncJob);

  simpleLogger.info(
    asyncTierJobLoaderAndRunner.name,
    `Succesfully completed AsyncJob ${asyncJobType.name}:${asyncJob.id}`,
  );
}
