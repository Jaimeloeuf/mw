import { z } from "zod";
import {
  genericMonoRepoConfigSchema,
  genericMonoRepoConfig,
} from "./genericMonoRepoConfig.js";
import {
  sharedInfraConfigSchema,
  sharedInfraConfig,
} from "./sharedInfraConfig.js";
import {
  appSpecificConfigSchema,
  appSpecificConfig,
} from "./appSpecificConfig.js";

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

export const combinedConfig = {
  ...genericMonoRepoConfig,
  ...sharedInfraConfig,
  ...appSpecificConfig,
};
