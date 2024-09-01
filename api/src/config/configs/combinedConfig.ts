import { genericMonoRepoConfig } from "./genericMonoRepoConfig.js";
import { sharedInfraConfig } from "./sharedInfraConfig.js";
import { appSpecificConfig } from "./appSpecificConfig.js";

/**
 * Make sure you define the config in the right mapping file
 * Configs are grouped into
 * 1. Generic monorepo configs
 * 1. App specific configs (grouped by app)
 * 1. Shared infra configs
 */
export const combinedConfig = {
  ...genericMonoRepoConfig,
  ...sharedInfraConfig,
  ...appSpecificConfig,
};
