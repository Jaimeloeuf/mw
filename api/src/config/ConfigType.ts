import type { z } from "zod";

import type { combinedConfig } from "./configMappings/combinedConfig.js";

/**
 * DO NOT DELETE THIS, THIS IS USED BY CODEGEN STEP (genServerConfigDoc)
 */
export type ConfigType = {
  [K in keyof typeof combinedConfig]: (
    forceReload?: true,
  ) => (typeof combinedConfig)[K]["configLoaderType"] extends "sync"
    ? z.infer<(typeof combinedConfig)[K]["schema"]>
    : Promise<z.infer<(typeof combinedConfig)[K]["schema"]>>;
};
