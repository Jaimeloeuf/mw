import { df } from "../../../__generated/index.js";
import { AsyncJobStatus } from "../../../async/AsyncJobStatus.js";
import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";
import { mapDbAsyncJobToAsyncJob } from "./mapDbAsyncJobToAsyncJob.js";

export default dataFn(async function asyncCancelJob(
  jobID: string,
  cancellationData?: string,
) {
  const updatedJob = await apiDB
    .updateTable("async_job")
    .where("id", "=", jobID)
    .where("status", "=", AsyncJobStatus.queued)
    .set({
      status: AsyncJobStatus.cancelled,
      time_cancelled: $DateTime.now.asIsoDateTime(),
      cancellation_data: cancellationData,
    })
    .returningAll()
    .executeTakeFirst();

  if (updatedJob === undefined) {
    return df.asyncGetJob.runAndThrowOnError(jobID);
  }

  return mapDbAsyncJobToAsyncJob(updatedJob);
});
