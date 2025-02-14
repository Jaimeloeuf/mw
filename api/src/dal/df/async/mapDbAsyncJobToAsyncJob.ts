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
    timeScheduled: job.time_scheduled.toISOString(),
    timeStartAfter: job.time_start_after?.toISOString() ?? null,
    timePreprocess: job.time_preprocess?.toISOString() ?? null,
    timeStart: job.time_start?.toISOString() ?? null,
    timeFinish: job.time_finish?.toISOString() ?? null,
    timeCancelled: job.time_cancelled?.toISOString() ?? null,
    jobArguments:
      job.job_arguments === null ? null : json.parse(job.job_arguments),
    jobResult: job.job_result === null ? null : json.parse(job.job_result),
    cancellationData:
      job.cancellation_data === null ? null : json.parse(job.cancellation_data),
  };
}
