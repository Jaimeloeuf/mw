import type { AsyncJob } from "../../../async/AsyncJob.js";
import type { CreateAsyncJob } from "../../kysely/index.js";

import { json } from "../../../utils/index.js";

export function mapAsyncJobToDbAsyncJob(job: AsyncJob): CreateAsyncJob {
  return {
    id: job.id,
    job_type_id: job.jobTypeID,
    status: job.status,
    priority: job.priority,
    machine_type: job.machineType,
    caller: job.caller,
    stack_trace: job.stackTrace,
    timeout: job.timeout,
    time_scheduled: job.timeScheduled,
    time_start_after: job.timeStartAfter,
    time_start: job.timeStart,
    time_finish: job.timeFinish,
    job_arguments:
      job.jobArguments === null ? null : json.stringify(job.jobArguments),
    job_result: job.jobResult === null ? null : json.stringify(job.jobResult),
  };
}
