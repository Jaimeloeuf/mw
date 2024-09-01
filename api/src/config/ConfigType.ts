import type { z } from "zod";
import type { combinedConfig } from "./configs/combinedConfig.js";

/**
 * Config Type should be an object of { ConfigName: ConfigValue }
 *
 * DO NOT DELETE THIS, THIS IS USED BY CODEGEN STEP (genServerConfigDoc)
 */
export type ConfigType = {
  [K in keyof typeof combinedConfig]: z.infer<
    (typeof combinedConfig)[K]["schema"]
  >;
};
