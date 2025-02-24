import { z } from "zod";

import { logger } from "../../logging/index.js";
import { json } from "../../utils/index.js";
import { AsyncJobMachine } from "../AsyncJobMachine.js";
import { AsyncJobPriority } from "../AsyncJobPriority.js";
import { defineAsyncJobType } from "../defineAsyncJobType.js";

/**
 * Example Job for reference and demo.
 */
export default defineAsyncJobType({
  /**
   * Unique ID for this job type, this should **NEVER CHANGE** once it is used.
   */
  id: "3h1s",
  name: "ExampleJob",
  machineType: AsyncJobMachine.web,
  priority: AsyncJobPriority.p1,
  argumentValidator: z.object({
    test: z.string(),
  }),
  async run(args) {
    logger.verbose(
      this.name,
      `Doing some compute in async tier, received args: ${json.stringifySafely(args)}`,
    );

    return {
      success: true,
      details: "success",
    };
  },
});
