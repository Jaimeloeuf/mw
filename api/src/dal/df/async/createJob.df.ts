import type { AsyncJob } from "../../../async/AsyncJob.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

export default dataFn(async function asyncCreateJob(job: AsyncJob) {
  await apiDB
    .insertInto("async_job")
    .values({
      id: job.id,
      job_type_id: job.jobTypeID,
      status: job.status,
      priority: job.priority,
      machine_type: job.machineType,
      caller: job.caller,
      stack_trace: job.stackTrace,
      timeout: job.timeout,
      time_scheduled: job.timeScheduled,
      time_start: job.timeStart,
      time_finish: job.timeFinish,
      job_arguments:
        job.jobArguments === null ? null : JSON.stringify(job.jobArguments),
      job_result: job.jobResult === null ? null : JSON.stringify(job.jobResult),
    })
    .returningAll()
    .executeTakeFirstOrThrow();
});
