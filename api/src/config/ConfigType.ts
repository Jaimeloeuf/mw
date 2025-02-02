import type { z } from "zod";

import type { combinedConfig } from "./configMappings/combinedConfig.js";

/**
 * DO NOT DELETE THIS, THIS IS ALSO USED BY CODEGEN STEP (genServerConfigDoc)
 */
export type ConfigType = {
  [K in keyof typeof combinedConfig]: (
    forceReload?: true,
  ) => ReturnType<
    (typeof combinedConfig)[K]["configLoader"]
  > extends Promise<unknown>
    ? Promise<z.infer<(typeof combinedConfig)[K]["schema"]>>
    : z.infer<(typeof combinedConfig)[K]["schema"]>;
};
