import { z } from "zod";

import { json } from "../../utils/index.js";
import { createConfig } from "../utils/createConfig.js";

/**
 * Configs for shared infra used across the different apps within the monorepo.
 */
export const sharedInfraConfig = {
  /**
   * Allow users to disable certain HTTP routes using env var like
   * ```.env
   * HTTP_DISABLED_PATHS=["GET /api/","POST /api/v1/blog/subscribe"]
   * ```
   *
   * so that they can either use this during emergencies to shut routes down
   * without code change or to run something in prod first for testing without
   * exposing the HTTP controller publicly.
   */
  http_disabled_paths: createConfig(
    z.set(z.string()),
    function () {
      return new Set(
        json.parse<Array<string>>(process.env["HTTP_DISABLED_PATHS"] ?? "[]"),
      );
    },
    true,
  ),

  /**
   * Enable verbose logs for successful HTTP route registrations
   */
  http_verbose_log_route_registration: createConfig(
    z
      .enum(["true", "false"])
      .default("false")
      .transform((v) => v === "true"),
    function () {
      return process.env["HTTP_VERBOSE_LOG_ROUTE_REGISTRATION"];
    },
    true,
  ),

  /**
   * Github OAuth app client ID
   */
  auth_github_oauth_client_id: createConfig(
    z.string(),
    function () {
      return process.env["AUTH_GITHUB_OAUTH_CLIENT_ID"];
    },
    true,
  ),

  /**
   * Github OAuth app client secret
   */
  auth_github_oauth_client_secret: createConfig(
    z.string(),
    function () {
      return process.env["AUTH_GITHUB_OAUTH_CLIENT_SECRET"];
    },
    true,
  ),

  /**
   * Github OAuth app redirect URI
   */
  auth_github_oauth_redirect_uri: createConfig(
    z.string().url(),
    function () {
      return process.env["AUTH_GITHUB_OAUTH_REDIRECT_URI"];
    },
    true,
  ),

  /**
   * Output verbose logs whenever a df (Data Function) is called.
   */
  df_verbose_log_calls: createConfig(
    z
      .enum(["true", "false"])
      .transform((v) => v === "true")
      .default("false"),
    function () {
      return process.env["DF_VERBOSE_LOG_CALLS"];
    },
    true,
  ),

  /**
   * Database Connection String
   */
  db_conn_string: createConfig(
    z.string(),
    function () {
      return process.env["DB_CONN_STRING"];
    },
    true,
  ),

  /**
   * Use this to log all kysely queries, defaults to false.
   */
  kysely_log_query: createConfig(
    z
      .enum(["true", "false"])
      .transform((v) => v === "true")
      .default("false"),
    function () {
      return process.env["KYSELY_LOG_QUERY"];
    },
    true,
  ),

  /**
   * Use this to log all kysely errors, defaults to false.
   */
  kysely_log_error: createConfig(
    z
      .enum(["true", "false"])
      .transform((v) => v === "true")
      .default("false"),
    function () {
      return process.env["KYSELY_LOG_ERROR"];
    },
    true,
  ),

  /**
   * A string used as part of the URL to form a secret webhook path to prevent
   * the path from getting called maliciously.
   */
  tele_webhook_secret_path: createConfig(
    z.string(),
    function () {
      return process.env["TELE_WEBHOOK_SECRET_PATH"];
    },
    true,
  ),

  /**
   * Telegram bot's token.
   */
  tele_adminbot_token: createConfig(
    z.string(),
    function () {
      return process.env["TELE_ADMINBOT_TOKEN"];
    },
    true,
  ),

  /**
   * Chat ID of the team's telegram admin chat for notifications.
   */
  tele_adminbot_admin_chat_id: createConfig(
    z.string(),
    function () {
      return process.env["TELE_ADMINBOT_ADMIN_CHAT_ID"];
    },
    true,
  ),
} as const;
