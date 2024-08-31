import type { z } from "zod";
import type { combinedConfig } from "./configs/combinedConfigSchema.js";

/**
 * Config Type should be an object of { ConfigName: ConfigValue }
 *
 * DO NOT DELETE THIS IS USED BY CODEGEN MODULE
 * There is no references of this
 */
export type ConfigType = {
  [K in keyof typeof combinedConfig]: z.infer<
    (typeof combinedConfig)[K]["schema"]
  >;
};
