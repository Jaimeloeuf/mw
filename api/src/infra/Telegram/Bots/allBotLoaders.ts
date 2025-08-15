import type { TelegramBot } from "../TelegramBot.js";

import { infra } from "../../../__generated/index.js";

/**
 * Add your bot loader to this array at the end after running initial codegen
 * to add your bot to the infra namespace.
 */
export const allBotLoaders: Array<() => TelegramBot> = [
  infra.TelegramBotsMwBot,
  infra.TelegramBotsMuwnoBot,
  infra.TelegramBotsWhatchBot,
  infra.TelegramBotsHabitsBot,
  // Add new bots right above this line following the same format
];
