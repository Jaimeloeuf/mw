import { z, type ZodRawShape } from "zod";

export const sharedInfraConfigSchema = {
  /**
   * Database Connection String
   */
  db_conn_string: z.string(),

  /**
   * Telegram bot's token.
   * Placeholder can be used for development environments as it will be mocked.
   */
  tele_adminbot_token: z.string(),

  /**
   * Chat ID of the team's telegram admin chat for notifications.
   * Placeholder can be used for development environments as it will be mocked.
   */
  tele_adminbot_admin_chat_id: z.string(),
} satisfies ZodRawShape;

export const sharedInfraConfigData = {
  db_conn_string: process.env["DB_CONN_STRING"],
  tele_adminbot_token: process.env["TELE_ADMINBOT_TOKEN"],
  tele_adminbot_admin_chat_id: process.env["TELE_ADMINBOT_ADMIN_CHAT_ID"],
} satisfies Record<keyof typeof sharedInfraConfigSchema, unknown>;
