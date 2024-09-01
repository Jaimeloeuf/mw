import { z } from "zod";
import { createConfigMapping } from "../utils/createConfigMapping.js";

/**
 * Generic config used to configure the monorepo as a whole instead of a
 * specific app or infra.
 */
export const genericMonoRepoConfig = {
  /**
   * NODE_ENV
   */
  env: createConfigMapping(
    z
      .union([
        z.literal("production"),
        z.literal("development"),
        z.literal("test"),
      ])
      .default("development"),
    process.env["NODE_ENV"],
  ),

  /**
   * Version is a string made with build time git branch and commit hash.
   */
  version: createConfigMapping(
    z.string().default("DEBUG_MODE_VERSION"),
    process.env["VERSION"],
  ),

  /**
   * Port for the HTTP webserver
   */
  port: createConfigMapping(
    z.number().positive().default(3000),
    process.env["PORT"] === undefined
      ? undefined
      : parseInt(process.env["PORT"]),
  ),

  /**
   * Server wide 60 seconds timeout hard limit, should not change this unless
   * absolutely necessary like running the web server in a background job tier
   * or something similar. Web tier should always follow the 60s limit.
   */
  server_timeout: createConfigMapping(
    z.number().positive().default(60_000),
    process.env["SERVER_TIMEOUT"] === undefined
      ? undefined
      : parseInt(process.env["SERVER_TIMEOUT"]),
  ),
} as const;
