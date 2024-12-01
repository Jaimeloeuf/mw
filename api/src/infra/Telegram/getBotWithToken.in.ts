import getAllBots from "./getBots.in.js";

/**
 * Returns the Bot associated with the given `telegramBotToken`, else returns
 * undefined if token is invalid.
 */
export default async function getBotWithToken(telegramBotToken: string) {
  const cachedBots = await getAllBots();
  return cachedBots[telegramBotToken];
}
