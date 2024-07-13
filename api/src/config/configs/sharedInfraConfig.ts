import { z, type ZodRawShape } from "zod";

export const sharedInfraConfigSchema = {
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
  tele_adminbot_token: process.env["TELE_ADMINBOT_TOKEN"],
  tele_adminbot_admin_chat_id: process.env["TELE_ADMINBOT_ADMIN_CHAT_ID"],
} satisfies Record<keyof typeof sharedInfraConfigSchema, unknown>;
