import type { ProdTelegramBotFF } from "./ProdTelegramBotFF.js";
import { logger } from "../../logging/index.js";

export const MockTelegramBotFF = (() =>
  async function MockTelegramBotService(
    recipientTelegramChatID: string,
    message: string
  ) {
    logger.info(
      MockTelegramBotService.name,
      `Messaging ${recipientTelegramChatID}\n`,
      message
    );

    return true;
  }) satisfies typeof ProdTelegramBotFF;
