import type { AsyncJob } from "../../../post-processing/async/AsyncJob.js";

import { AsyncJobMachineType } from "../../../post-processing/async/AsyncJobMachineType.js";
import { AsyncJobStatus } from "../../../post-processing/async/AsyncJobStatus.js";
import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

/**
 * DataFn to get a job from DB after marking it as pre-processing in a single
 * transaction.
 */
export default dataFn(async function asyncGetNextJobToProcess(
  machineType: AsyncJobMachineType,
): Promise<null | AsyncJob> {
  const asyncJob = await apiDB.transaction().execute(async (db) => {
    const asyncJob = await db
      .selectFrom("async_job")
      .selectAll()
      .where("machine_type", "=", machineType)
      .orderBy("priority", "asc")
      .limit(1)
      .executeTakeFirst();

    if (asyncJob === undefined) {
      return null;
    }

    return await db
      .updateTable("async_job")
      .where("id", "=", asyncJob.id)
      .set({
        status: AsyncJobStatus.preProcessing,
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  });

  if (asyncJob === null) {
    return null;
  }

  return {
    id: asyncJob.id,
    jobTypeID: asyncJob.job_type_id,
    status: asyncJob.status,
    priority: asyncJob.priority,
    machineType: asyncJob.machine_type,
    caller: asyncJob.caller,
    stackTrace: asyncJob.stack_trace,
    timeout: asyncJob.timeout,
    timeScheduled: asyncJob.time_scheduled.toISOString(),
    timeStart: asyncJob.time_start?.toISOString() ?? null,
    timeFinish: asyncJob.time_finish?.toISOString() ?? null,
    jobArguments:
      asyncJob.job_arguments === null
        ? null
        : JSON.parse(asyncJob.job_arguments),
    jobResult:
      asyncJob.job_result === null ? null : JSON.parse(asyncJob.job_result),
  };
});
