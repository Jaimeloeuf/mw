import type { AsyncJobMachineType } from "../../../async/AsyncJobMachine.js";

import { AsyncJobStatus } from "../../../async/AsyncJobStatus.js";
import { InvalidInternalStateException } from "../../../exceptions/index.js";
import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

/**
 * DataFn to get a job from DB after marking it as pre-processing in a single
 * transaction.
 */
export default dataFn(async function asyncGetNumberOfJobsQueued(
  machineType: AsyncJobMachineType,
): Promise<number> {
  const asyncJob = await apiDB
    .selectFrom("async_job")
    .select((eb) => eb.fn.count<string>("id").as("jobs"))
    .where("status", "=", AsyncJobStatus.queued)
    .where("machine_type", "=", machineType)
    .where("time_start_after", "<=", $DateTime.now.asIsoDateTime())
    .executeTakeFirst();

  if (asyncJob?.jobs === undefined) {
    throw new InvalidInternalStateException(
      "Unable to load number of AsyncJobs in Queue",
    );
  }

  return parseInt(asyncJob.jobs, 10);
});
