import "dotenv/config";
import { z } from "zod";
import { logger } from "../logging/index.js";
import { genericMonoRepoConfigData } from "./configs/genericMonoRepoConfig.js";
import { sharedInfraConfigData } from "./configs/sharedInfraConfig.js";
import { appSpecificConfigData } from "./configs/appSpecificConfig.js";
import { combinedConfigSchema } from "./configs/combinedConfigSchema.js";

function configBootstrap() {
  const { success, data, error } = combinedConfigSchema.safeParse({
    ...genericMonoRepoConfigData,
    ...sharedInfraConfigData,
    ...appSpecificConfigData,
  } satisfies Record<keyof z.infer<typeof combinedConfigSchema>, unknown>);

  if (!success) {
    logger.error(configBootstrap.name, `Failed to parse and initialise config`);
    logger.error(configBootstrap.name, error);
    process.exit(1);
  }

  return Object.freeze(data);
}

export const config = configBootstrap();
