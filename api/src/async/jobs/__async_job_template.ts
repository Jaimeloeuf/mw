import { z } from "zod";

import { AsyncJobMachineType } from "../AsyncJobMachineType.js";
import { AsyncJobPriority } from "../AsyncJobPriority.js";
import { defineAsyncJobType } from "../defineAsyncJobType.js";

/**
 * @todo
 */
export default defineAsyncJobType({
  /**
   * Unique ID for this job type, this should **NEVER CHANGE** once it is used.
   */
  id: "__generated_async_job_type_id__",
  name: "AsyncJobTemplate",
  machineType: AsyncJobMachineType.web,
  priority: AsyncJobPriority.p1,
  argumentValidator: z.object({
    yourArgumentValue: z.string(),
  }),
  async run(args) {
    // @todo Write your AsyncJob here
    args;

    return {
      success: true,
      details: "success",
    };
  },
});
