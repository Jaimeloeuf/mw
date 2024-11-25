import { config } from "../../config/index.js";
import { dataOrThrow } from "../../utils/index.js";
import { registerTelegramWebhookUrl } from "./registerTelegramWebhookUrl.js";

/**
 * Register telegram webhook URLs.
 */
export default async function registerAllTelegramBotWebhookUrls() {
  // Only register URLs in production mode, for development, this can be done
  // manually with a test bot, and test ngrok tunnels.
  if (config.env !== "production") {
    return;
  }

  await Promise.all([
    registerTelegramWebhookUrl("MW Admin Bot", config.tele_adminbot_token),
    registerTelegramWebhookUrl(
      "Muwno Bot",
      dataOrThrow(config.muwno_tele_bot_token),
    ),
    registerTelegramWebhookUrl(
      "Whatch Bot",
      dataOrThrow(config.whatch_tele_bot_token),
    ),
  ]);
}
