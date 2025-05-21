import type { AsyncJob } from "../../../async/AsyncJob.js";
import type { AsyncJob as DBAsyncJob } from "../../kysely/index.js";

import { json } from "../../../utils/index.js";

export function mapDbAsyncJobToAsyncJob(job: DBAsyncJob): AsyncJob {
  return {
    id: job.id,
    jobTypeID: job.job_type_id,
    status: job.status,
    priority: job.priority,
    machineType: job.machine_type,
    caller: job.caller,
    stackTrace: job.stack_trace,
    timeout: job.timeout,
    timeScheduled: $DateTime.ISO.DateTime.fromNullableDateObject(
      job.time_scheduled,
    ),
    timeStartAfter: $DateTime.ISO.DateTime.fromNullableDateObject(
      job.time_start_after,
    ),
    timePreprocess: $DateTime.ISO.DateTime.fromNullableDateObject(
      job.time_preprocess,
    ),
    timeStart: $DateTime.ISO.DateTime.fromNullableDateObject(job.time_start),
    timeFinish: $DateTime.ISO.DateTime.fromNullableDateObject(job.time_finish),
    timeCancelled: $DateTime.ISO.DateTime.fromNullableDateObject(
      job.time_cancelled,
    ),
    jobArguments:
      job.job_arguments === null ? null : json.parse(job.job_arguments),
    jobResult: job.job_result === null ? null : json.parse(job.job_result),
    cancellationData:
      job.cancellation_data === null ? null : json.parse(job.cancellation_data),
  };
}
