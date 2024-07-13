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
} satisfies ZodRawShape;

export const genericMonoRepoConfigData = {
  env: process.env["NODE_ENV"],
  version: process.env["VERSION"],
  port:
    process.env["PORT"] === undefined
      ? undefined
      : parseInt(process.env["PORT"]),
} satisfies Record<keyof typeof genericMonoRepoConfigSchema, unknown>;
