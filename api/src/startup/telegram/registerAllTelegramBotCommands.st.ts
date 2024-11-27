import { infra } from "../../__generated/index.js";
import { config } from "../../config/index.js";

/**
 * Register telegram bot commands.
 */
export default async function registerAllTelegramBotCommands() {
  // Only register URLs in production mode, for development, this can be done
  // manually with a test bot, and test ngrok tunnels.
  if (config.env() !== "production") {
    return;
  }

  await Promise.all([
    infra.TelegramBotsMwBot.getSingleton().setCommands(),
    infra.TelegramBotsMuwnoBot.getSingleton().setCommands(),
    infra.TelegramBotsWhatchBot.getSingleton().setCommands(),
  ]);
}
