import { z } from "zod";

import { AsyncJobMachine } from "../AsyncJobMachine.js";
import { AsyncJobPriority } from "../AsyncJobPriority.js";
import { defineAsyncJobType } from "../defineAsyncJobType.js";

/**
 * @todo
 * Write a easy to understand description for what your Async Job does.
 */
export default defineAsyncJobType({
  /**
   * Unique ID for this job type, this should **NEVER CHANGE** once it is used.
   */
  id: "__generated_async_job_type_id__",
  name: "AsyncJobTemplate",
  machineType: AsyncJobMachine.web,
  priority: AsyncJobPriority.p1,
  argumentValidator: z.object({
    yourArgumentValue: z.string(),
  }),
  async run(args) {
    // @todo Write your AsyncJob here
    args.yourArgumentValue;

    return {
      success: true,
      details: "success",
    };
  },
});
