import { z } from "zod";
import { createConfigMapping } from "../utils/createConfigMapping.js";

/**
 * Configs for shared infra used across the different apps within the monorepo.
 */
export const sharedInfraConfig = {
  /**
   * Database Connection String
   */
  db_conn_string: createConfigMapping(
    z.string(),
    process.env["DB_CONN_STRING"],
  ),

  /**
   * Telegram bot's token.
   * Placeholder can be used for development environments as it will be mocked.
   */
  tele_adminbot_token: createConfigMapping(
    z.string(),
    process.env["TELE_ADMINBOT_TOKEN"],
  ),

  /**
   * Chat ID of the team's telegram admin chat for notifications.
   * Placeholder can be used for development environments as it will be mocked.
   */
  tele_adminbot_admin_chat_id: createConfigMapping(
    z.string(),
    process.env["TELE_ADMINBOT_ADMIN_CHAT_ID"],
  ),
} as const;
