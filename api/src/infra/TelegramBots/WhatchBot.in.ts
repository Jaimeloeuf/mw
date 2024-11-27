import type { TelegramWebhookData } from "../index.js";
import type { CommandData } from "./CommandData.js";

import { sv } from "../../__generated/index.js";
import { config } from "../../config/index.js";
import { TelegramBot } from "./TelegramBot.js";

class WhatchBot extends TelegramBot {
  override async getToken() {
    return config.whatch_tele_bot_token();
  }

  override commands = [
    {
      command: "eating",
      description: "Get a random video to watch while eating",
      async onCommand(data: CommandData, update: TelegramWebhookData) {
        const videoLink = await sv.whatchGetVideoForEating(
          update.message.from.id,
          data.args,
        );

        return {
          method: "sendMessage",
          chat_id: update.message.chat.id,
          text: videoLink,
        };
      },
    },
  ];
}

let cachedBot: WhatchBot | null = null;

export default function () {
  if (cachedBot === null) {
    cachedBot = new WhatchBot();
  }
  return cachedBot;
}
