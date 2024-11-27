import { config } from "../../config/index.js";
import { setCommands } from "../../infra/Telegram/setCommands.js";
import { dataOrThrow } from "../../utils/index.js";

/**
 * Register telegram bot commands.
 */
export default async function registerAllTelegramBotCommands() {
  // Only register URLs in production mode, for development, this can be done
  // manually with a test bot, and test ngrok tunnels.
  if (config.env() !== "production") {
    return;
  }

  await setCommands(dataOrThrow(config.whatch_tele_bot_token()), [
    {
      command: "eating",
      description: "Get a random video to watch while eating",
    },
  ]);
}
