import { infra } from "../../__generated/index.js";
import { config } from "../../config/index.js";

/**
 * Register telegram webhook URLs.
 */
export default async function registerAllTelegramBotWebhookUrls() {
  // Only register URLs in production mode, for development, this can be done
  // manually with a test bot, and test ngrok tunnels.
  if (config.env() !== "production") {
    return;
  }

  const bots = await infra.TelegramGetBotsArray();

  await Promise.all(bots.map((bot) => bot.registerTelegramWebhookUrl()));
}
