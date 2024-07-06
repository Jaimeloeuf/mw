import "dotenv/config";
import { z } from "zod";
import { logger } from "../logging/index.js";

function configBootstrap() {
  const ConfigSchema = z.object({
    /**
     * NODE_ENV
     */
    env: z
      .union([z.literal("production"), z.literal("development")])
      .default("development"),

    /**
     * Port for the HTTP webserver
     */
    port: z.number().positive().default(3000),
  });

  const { success, data, error } = ConfigSchema.safeParse({
    env: process.env["NODE_ENV"],
    port:
      process.env["PORT"] === undefined
        ? undefined
        : parseInt(process.env["PORT"]),
  } satisfies Record<keyof z.infer<typeof ConfigSchema>, unknown>);

  if (!success) {
    logger.error(configBootstrap.name, `Failed to parse and initialise config`);
    logger.error(configBootstrap.name, error);
    process.exit(1);
  }

  return data;
}

export const config = configBootstrap();
