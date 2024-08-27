import { z } from "zod";
import { genericMonoRepoConfigSchema } from "./genericMonoRepoConfig.js";
import { sharedInfraConfigSchema } from "./sharedInfraConfig.js";
import { appSpecificConfigSchema } from "./appSpecificConfig.js";

/**
 * Make sure you define the config in the right schema object
 * Configs are grouped into
 * 1. Generic monorepo config
 * 1. App specific config (group them by app)
 * 1. Shared infra config
 */
export const combinedConfigSchema = z.object({
  ...genericMonoRepoConfigSchema,
  ...sharedInfraConfigSchema,
  ...appSpecificConfigSchema,
});
