import type { TelegramBot } from "./TelegramBot.js";

import getAllBots from "./getBots.in.js";

let cachedBotsAsAnArray: $Nullable<Array<TelegramBot>> = null;

/**
 * Get all the available telegram bots (bots whose token is available via their
 * `getToken` methods) as an array.
 */
export default async function getBotsArray() {
  if (cachedBotsAsAnArray === null) {
    const cachedBots = await getAllBots();
    cachedBotsAsAnArray = Object.values(cachedBots);
  }

  return cachedBotsAsAnArray;
}
