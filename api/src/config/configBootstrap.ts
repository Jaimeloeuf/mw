import "dotenv/config";
import { z } from "zod";
import { logger } from "../logging/index.js";
import {
  genericMonoRepoConfigSchema,
  genericMonoRepoConfigData,
} from "./configs/genericMonoRepoConfig.js";
import {
  sharedInfraConfigSchema,
  sharedInfraConfigData,
} from "./configs/sharedInfraConfig.js";
import {
  appSpecificConfigSchema,
  appSpecificConfigData,
} from "./configs/appSpecificConfig.js";

function configBootstrap() {
  /**
   * Make sure you define the config in the right schema object
   * Configs are grouped into
   * 1. Generic monorepo config
   * 1. App specific config (group them by app)
   * 1. Shared infra config
   */
  const ConfigSchema = z.object({
    ...genericMonoRepoConfigSchema,
    ...sharedInfraConfigSchema,
    ...appSpecificConfigSchema,
  });

  const { success, data, error } = ConfigSchema.safeParse({
    ...genericMonoRepoConfigData,
    ...sharedInfraConfigData,
    ...appSpecificConfigData,
  } satisfies Record<keyof z.infer<typeof ConfigSchema>, unknown>);

  if (!success) {
    logger.error(configBootstrap.name, `Failed to parse and initialise config`);
    logger.error(configBootstrap.name, error);
    process.exit(1);
  }

  return Object.freeze(data);
}

export const config = configBootstrap();
