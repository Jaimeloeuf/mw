import type { TelegramBot } from "./TelegramBot.js";

import { config } from "../../config/index.js";
import { logger } from "../../logging/index.js";
import { allBotLoaders } from "./Bots/allBotLoaders.js";

/**
 * Cached telegramBotToken->TelegramBot mapping
 */
let cachedBots: $Nullable<Record<string, TelegramBot>> = null;

/**
 * Returns a object of `TelegramBotToken->Bot`, for all available telegram bots
 * (bots whose token is available via their `getToken` methods).
 */
export default async function getAllBots() {
  if (cachedBots === null) {
    cachedBots = {};

    // @todo This can be done concurrently
    for (const botLoader of allBotLoaders) {
      const bot = botLoader();

      // Try to load the bot token, assume that if the bot token is loaded, it
      // means that the bot is available and vice versa.
      const [error, botToken] = await $runAsyncFnSafely(bot.getToken.bind(bot));

      if (error !== null && config.env() === "production") {
        logger.error(
          getAllBots.name,
          `In 'production' env, all telegram bot tokens should be available.`,
          `Skipping Telegram Bot '${bot.constructor.name}' because of`,
          error,
        );
      }

      if (botToken !== null) {
        cachedBots[botToken] = bot;
      }
    }

    // Log out all the bots that are successfully registered on first load in
    // non production environments, since in non production environments we
    // expect only some bots for development/testing use case to be available.
    logger.nonProdVerbose(
      getAllBots.name,
      "All the available bots:",
      Object.values(cachedBots).map((bot) => bot.constructor.name),
    );
  }

  return cachedBots;
}
