import { infra } from "../../__generated/index.js";
import { config } from "../../config/index.js";

/**
 * Register telegram webhook URLs.
 */
export default async function setupTelegramBots() {
  // Manually disable this during development when changes are made that require
  // calling telegram API to make it actually work like changing webhook URL.
  // This is here to prevent the setup call from running too frequently which
  // causes telegram API to error out with 429 rate limiting.
  if (config.env() !== "production") {
    return;
  }

  const bots = await infra.TelegramGetBotsArray();

  await Promise.all(bots.map((bot) => bot.setup()));
}
