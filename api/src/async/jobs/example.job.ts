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
  id: "186e39bb-0bd5-451c-8a90-557ae9a54ca8",
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
