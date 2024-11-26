import type { TelegramWebhookData } from "../../infra/index.js";

/**
 * Handles incoming messages from whatch telegram bot.
 */
export default async function (update: TelegramWebhookData) {
  return {
    method: "sendMessage",
    chat_id: update.message.chat.id,
    text: "Message received",
  };
}
