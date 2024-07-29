import { z, type ZodRawShape } from "zod";

export const genericMonoRepoConfigSchema = {
  /**
   * NODE_ENV
   */
  env: z
    .union([
      z.literal("production"),
      z.literal("development"),
      z.literal("test"),
    ])
    .default("development"),

  /**
   * Version is a string made with build time git branch and commit hash.
   */
  version: z.string().default("DEBUG_MODE_VERSION"),

  /**
   * Port for the HTTP webserver
   */
  port: z.number().positive().default(3000),

  /**
   * Server wide 60 seconds timeout hard limit, should not change this unless
   * absolutely necessary like running the web server in a background job tier
   * or something similar. Web tier should always follow the 60s limit.
   */
  server_timeout: z.number().positive().default(60_000),
} satisfies ZodRawShape;

export const genericMonoRepoConfigData = {
  env: process.env["NODE_ENV"],
  version: process.env["VERSION"],
  port:
    process.env["PORT"] === undefined
      ? undefined
      : parseInt(process.env["PORT"]),
  server_timeout:
    process.env["SERVER_TIMEOUT"] === undefined
      ? undefined
      : parseInt(process.env["SERVER_TIMEOUT"]),
} satisfies Record<keyof typeof genericMonoRepoConfigSchema, unknown>;
