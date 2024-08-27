import type { z } from "zod";
import type { combinedConfigSchema } from "./configs/combinedConfigSchema.js";

/**
 * Use Zod to infer the TS type of all the config values.
 */
export type ConfigType = z.infer<typeof combinedConfigSchema>;
