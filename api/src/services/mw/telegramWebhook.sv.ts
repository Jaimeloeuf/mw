import type { TelegramWebhookData } from "../../infra-shared/index.js";

/**
 * Handles incoming messages from MW-Notif telegram bot.
 */
export default async function (update: TelegramWebhookData) {
  return {
    method: "sendMessage",
    chat_id: update.message.chat.id,
    text: "Replies are not supported",
  };
}
