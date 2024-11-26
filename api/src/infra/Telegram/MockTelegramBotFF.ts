import type { ProdTelegramBotFF } from "./ProdTelegramBotFF.js";

import { logger } from "../../logging/index.js";
import { prettyPrintJson } from "../../utils/index.js";

export const MockTelegramBotFF = (() =>
  async function MockTelegramBotService(
    recipientTelegramChatID: string,
    message: string,
  ) {
    logger.info(
      MockTelegramBotService.name,
      prettyPrintJson({
        recipientTelegramChatID,
        message,
      }),
    );
  }) satisfies typeof ProdTelegramBotFF;
