import type { AsyncJob } from "../../../async/AsyncJob.js";
import type { AsyncJobMachineType } from "../../../async/AsyncJobMachine.js";
import type { AsyncJobPriorityType } from "../../../async/AsyncJobPriority.js";

import { AsyncJobStatus } from "../../../async/AsyncJobStatus.js";
import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";
import { mapDbAsyncJobToAsyncJob } from "./mapDbAsyncJobToAsyncJob.js";

/**
 * DataFn to get a job from DB after marking it as pre-processing in a single
 * transaction.
 */
export default dataFn(async function asyncGetNextJobToProcess({
  machineType,
  priority,
}: {
  machineType: AsyncJobMachineType;
  priority?: AsyncJobPriorityType;
}): Promise<$Nullable<AsyncJob>> {
  const asyncJob = await apiDB.transaction().execute(async (db) => {
    let asyncJobQuery = db
      .selectFrom("async_job")
      .selectAll()
      .where("status", "=", AsyncJobStatus.queued)
      .where("machine_type", "=", machineType)
      .where("time_start_after", "<=", $DateTime.now.asIsoDateTime())
      .limit(1);

    // If `priority` is specified, filter for that specific priority, else grab
    // the job of the highest priority.
    if (priority) {
      asyncJobQuery = asyncJobQuery.where("priority", "=", priority);
    } else {
      asyncJobQuery = asyncJobQuery.orderBy("priority", "asc");
    }

    const asyncJob = await asyncJobQuery.executeTakeFirst();

    if (asyncJob === undefined) {
      return null;
    }

    return await db
      .updateTable("async_job")
      .where("id", "=", asyncJob.id)
      .set({
        status: AsyncJobStatus.preProcessing,
        time_preprocess: $DateTime.now.asIsoDateTime(),
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  });

  if (asyncJob === null) {
    return null;
  }

  return mapDbAsyncJobToAsyncJob(asyncJob);
});
