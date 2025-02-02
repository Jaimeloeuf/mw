import { z } from "zod";

import { createConfig } from "../utils/createConfig.js";

/**
 * Generic config used to configure the monorepo as a whole instead of a
 * specific app or infra.
 */
export const genericMonoRepoConfig = {
  /**
   * NODE_ENV
   */
  env: createConfig(
    z
      .union([
        z.literal("production"),
        z.literal("development"),
        z.literal("test"),
      ])
      .default("development"),
    function () {
      return process.env["NODE_ENV"];
    },
    true,
  ),

  /**
   * Version is a string made with build time git branch and commit hash.
   */
  version: createConfig(
    z.string().default("DEBUG_MODE_VERSION"),
    function () {
      return process.env["VERSION"];
    },
    true,
  ),

  /**
   * Port for the HTTP webserver
   */
  port: createConfig(
    z.number().positive().default(3000),
    function () {
      return process.env["PORT"] === undefined
        ? undefined
        : parseInt(process.env["PORT"]);
    },
    true,
  ),

  /**
   * Server wide 60 seconds timeout hard limit, should not change this unless
   * absolutely necessary like running the web server in a background job tier
   * or something similar. Web tier should always follow the 60s limit.
   */
  server_timeout: createConfig(
    z.number().positive().default(60_000),
    function () {
      return process.env["SERVER_TIMEOUT"] === undefined
        ? undefined
        : parseInt(process.env["SERVER_TIMEOUT"]);
    },
    true,
  ),

  /**
   * The full base URL of the current web process, which can be used as a base
   * URL path for constructing re-directs and etc...
   *
   * This URL will not contain a trailing slash!
   *
   * E.g. <https://example.com>
   */
  base_url_to_self: createConfig(
    z
      .string()
      .url()
      .refine((url) => !url.endsWith("/"), {
        message: "Base URL cannot end with a trailing slash.",
      }),
    function () {
      return process.env["BASE_URL_TO_SELF"];
    },
    true,
  ),

  /**
   * Use this to set if the web tier entrypoint should start running async jobs
   * too, defaults to false.
   */
  run_async_jobs_in_web_tier: createConfig(
    z
      .enum(["true", "false"])
      .transform((v) => v === "true")
      .default("false"),
    function () {
      return process.env["RUN_ASYNC_JOBS_IN_WEB_TIER"];
    },
    true,
  ),
} as const;
